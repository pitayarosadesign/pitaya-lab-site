import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Validar que Stripe esté configurado
  if (!config.stripeSecretKey || config.stripeSecretKey === 'sk_test_...') {
    return {
      error: 'Stripe no está configurado. Por favor configura las claves en el .env',
      fallback: true,
    }
  }

  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: '2026-06-24.dahlia',
  })

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { items, successUrl, cancelUrl, customerEmail, shippingCost } = body

    if (!items || items.length === 0) {
      throw createError({ statusCode: 400, message: 'El carrito está vacío' })
    }

    // Crear line items para Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'mxn',
        product_data: {
          name: item.name,
          description: item.description || undefined,
          images: item.image ? [item.image] : undefined,
          metadata: {
            product_id: item.id || '',
          },
        },
        unit_amount: item.price, // ya viene en centavos
      },
      quantity: item.quantity,
    }))

    // Agregar costo de envío si aplica
    if (shippingCost && shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'mxn',
          product_data: {
            name: 'Envío estándar',
            description: 'Costo de envío a todo México (3-5 días hábiles)',
          },
          unit_amount: Math.round(shippingCost * 100), // convertir a centavos
        },
        quantity: 1,
      })
    }

    // Configurar la sesión de Stripe Checkout
    const successWithOrder = body.successUrl || `${event.node.req.headers.origin || 'http://localhost:3002'}/checkout/success`
    const successUrlWithOrder = `${successWithOrder}${successWithOrder.includes('?') ? '&' : '?'}session_id={CHECKOUT_SESSION_ID}`

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: lineItems,
      success_url: successUrlWithOrder,
      cancel_url: cancelUrl || `${event.node.req.headers.origin || 'http://localhost:3002'}/checkout/cancel`,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['MX'],
      },
      locale: 'es',
      metadata: {
        source: 'pitayalab-store',
        items_json: JSON.stringify(items.map(i => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        }))),
      },
    }

    // Agregar email del cliente si se proporcionó
    if (customerEmail) {
      sessionParams.customer_email = customerEmail
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    // ⚠️ NO se crea la orden aquí. La orden se crea SOLO cuando Stripe
    // confirma el pago vía webhook (checkout.session.completed).
    // Esto evita que el panel se llene de órdenes pendientes/canceladas
    // de checkouts abandonados o pruebas.

    return {
      url: session.url,
      sessionId: session.id,
    }
  } catch (e) {
    console.error('Error creando checkout:', e)
    if (e.statusCode) throw e
    throw createError({ statusCode: 500, message: e.message })
  }
})
