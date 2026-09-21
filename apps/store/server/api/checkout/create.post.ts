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
    const { items, successUrl, cancelUrl, customerEmail, shippingCost, shippingLabel, shippingMethod, shippingAddress, orderNote, isGift, giftMessage } = body

    if (!items || items.length === 0) {
      throw createError({ statusCode: 400, message: 'El carrito está vacío' })
    }

    // Rango de días hábiles de entrega para la descripción del envío en Stripe.
    // Se lee de site_config (clave delivery_estimates, la misma que usa el carrito)
    // para que el texto del checkout sea consistente con la tienda.
    let deliveryTotalMin = 3
    let deliveryTotalMax = 5
    try {
      const { data: deliveryCfg, error: deliveryErr } = await supabaseAdmin
        .from('site_config')
        .select('value')
        .eq('key', 'delivery_estimates')
        .maybeSingle()
      if (!deliveryErr && deliveryCfg?.value) {
        const v = deliveryCfg.value
        const prepMin = typeof v.prepDaysMin === 'number' ? v.prepDaysMin : 1
        const prepMax = typeof v.prepDaysMax === 'number' ? v.prepDaysMax : 2
        const trMin = typeof v.transitDaysMin === 'number' ? v.transitDaysMin : 2
        const trMax = typeof v.transitDaysMax === 'number' ? v.transitDaysMax : 3
        deliveryTotalMin = prepMin + trMin
        deliveryTotalMax = prepMax + trMax
      }
    } catch (e) {
      // fallback silencioso a 3-5 días hábiles
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
      const shipLabel = shippingLabel || 'Envío estándar'
      lineItems.push({
        price_data: {
          currency: 'mxn',
          product_data: {
            name: shipLabel,
            description: `Costo de envío a todo México (${deliveryTotalMin}-${deliveryTotalMax} días hábiles)`,
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
      // Nombre, teléfono, email y dirección los captura NUESTRO checkout;
      // Stripe solo cobra la tarjeta. billing en 'auto' para que pida la
      // dirección de facturación únicamente cuando la red de la tarjeta lo exija.
      billing_address_collection: 'auto',
      locale: 'es',
      metadata: {
        source: 'pitayalab-store',
        items_json: JSON.stringify(items.map(i => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        }))),
        // Nota general del pedido (opcional). Stripe limita cada valor de
        // metadata a 500 caracteres, por eso acotamos aquí.
        order_note: (orderNote || '').slice(0, 500),
        // Regalo + dedicatoria
        is_gift: isGift ? '1' : '0',
        gift_message: (giftMessage || '').slice(0, 500),
        // Método de envío elegido y dirección (para guardar en la orden vía webhook)
        shipping_method: (shippingLabel || shippingMethod || '').slice(0, 100),
        shipping_address: JSON.stringify(shippingAddress || {}).slice(0, 500),
        pickup_branch: ((shippingAddress && shippingAddress.pickupBranch) || '').slice(0, 200),
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
