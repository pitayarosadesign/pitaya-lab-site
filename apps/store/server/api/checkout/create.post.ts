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
    apiVersion: '2025-03-31.preview',
  })

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { items, successUrl, cancelUrl, customerEmail } = body

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

    // Configurar la sesión de Stripe Checkout
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: lineItems,
      success_url: successUrl || `${event.node.req.headers.origin || 'http://localhost:3002'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
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

    // Guardar la sesión en la BD como orden pendiente
    const orderNumber = `PIT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`

    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_email: customerEmail || 'pendiente@checkout.com',
        customer_name: 'Pendiente',
        status: 'pending',
        payment_status: 'pending',
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent as string || null,
        items: items,
        subtotal: session.amount_subtotal ? session.amount_subtotal / 100 : 0,
        total: session.amount_total ? session.amount_total / 100 : 0,
        shipping_address: {},
      })
      .select()
      .single()

    if (orderError) {
      console.error('Error guardando orden:', orderError)
    }

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
