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
    const {
      items,
      successUrl,
      cancelUrl,
      customerEmail,
      customerName,
      customerPhone,
      orderType = 'retail',          // 'wholesale' | 'event' | 'retail'
      eventDate = null,              // para eventos/recuerdos
      customDesign = null,           // diseño/plantilla
      customText = null,             // texto personalizado de etiqueta
      premiumKit = false,            // addon kit premium
      b2bDiscountPercent = 0,        // % de descuento B2B aplicado
      leadTimeDays = null,           // tiempo de fabricación (ej. 15)
      notes = null,
    } = body

    if (!items || items.length === 0) {
      throw createError({ statusCode: 400, message: 'El pedido está vacío' })
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
            order_type: orderType,
          },
        },
        unit_amount: item.price, // ya viene en centavos
      },
      quantity: item.quantity,
    }))

    // Agregar costo de envío si aplica (B2B se cotiza aparte, pero incluimos base de $0 como referencia)
    // Nota: Para pedidos B2B/eventos el envío se cotiza por separado, no se cobra aquí automáticamente.

    // Generar número de orden ANTES de construir la URL
    const { data: lastOrder } = await supabaseAdmin
      .from('orders')
      .select('order_number')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    let nextNumber = 1001
    if (lastOrder?.order_number) {
      const lastNum = parseInt(lastOrder.order_number.replace('PIT-', ''), 10)
      if (!isNaN(lastNum)) nextNumber = lastNum + 1
    }
    const orderNumber = `PIT-${nextNumber}`

    // Configurar la sesión de Stripe Checkout
    const successWithOrder = successUrl || `${event.node.req.headers.origin || 'http://localhost:3002'}/b2b/gracias`
    const separator = successWithOrder.includes('?') ? '&' : '?'
    const successUrlWithOrder = `${successWithOrder}${separator}session_id={CHECKOUT_SESSION_ID}&order=${orderNumber}&type=${encodeURIComponent(orderType)}`

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: lineItems,
      success_url: successUrlWithOrder,
      cancel_url: cancelUrl || `${event.node.req.headers.origin || 'http://localhost:3002'}/b2b`,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['MX'],
      },
      locale: 'es',
      metadata: {
        source: 'pitayalab-b2b',
        order_type: orderType,
        items_json: JSON.stringify(items.map(i => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        }))),
      },
    }

    if (customerEmail) {
      sessionParams.customer_email = customerEmail
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    // Guardar la sesión en la BD como orden pendiente
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_email: customerEmail || 'pendiente@checkout.com',
        customer_name: customerName || 'Pendiente',
        customer_phone: customerPhone || null,
        status: 'pending',
        payment_status: 'pending',
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent as string || null,
        items: items,
        subtotal: session.amount_subtotal ? session.amount_subtotal / 100 : 0,
        total: session.amount_total ? session.amount_total / 100 : 0,
        shipping_address: {},
        // Campos B2B nuevos
        order_type: orderType,
        event_date: eventDate || null,
        custom_design_url: customDesign || null,
        preferred_delivery: notes || null,
        lead_time_days: leadTimeDays || null,
        b2b_discount_percent: b2bDiscountPercent || 0,
        admin_notes: notes || null,
      })
      .select()
      .single()

    if (orderError) {
      console.error('Error guardando orden B2B:', orderError)
    }

    return {
      url: session.url,
      sessionId: session.id,
      orderNumber: orderNumber,
    }
  } catch (e) {
    console.error('Error creando checkout B2B:', e)
    if (e.statusCode) throw e
    throw createError({ statusCode: 500, message: e.message })
  }
})
