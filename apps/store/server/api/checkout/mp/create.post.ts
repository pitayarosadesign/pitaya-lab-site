import { createClient } from '@supabase/supabase-js'

/**
 * 💚 MERCADO PAGO - Crear preferencia de pago
 * ============================================
 * Crea una preferencia de pago en Mercado Pago (Checkout Pro)
 * y redirige al cliente al flujo de pago hosteado por MP.
 * Acepta tarjetas, SPEI y efectivo (OXXO, etc.)
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Validar que Mercado Pago esté configurado
  if (!config.mercadoPagoAccessToken || config.mercadoPagoAccessToken === 'TEST-...') {
    return {
      error: 'Mercado Pago no está configurado. Por favor configura las claves en el .env',
      fallback: true,
    }
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { items, successUrl, cancelUrl, customerEmail, customerName, shippingCost } = body

    if (!items || items.length === 0) {
      throw createError({ statusCode: 400, message: 'El carrito está vacío' })
    }

    // Generar número de orden ANTES de construir la preferencia
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

    // Construir items para Mercado Pago (precios en pesos MXN, no centavos)
    const mpItems = items.map(item => ({
      id: item.id || '',
      title: item.name,
      description: item.description || '',
      picture_url: item.image || undefined,
      quantity: item.quantity,
      unit_price: Number((item.price / 100).toFixed(2)), // convertir de centavos a pesos
      currency_id: 'MXN',
    }))

    // Agregar costo de envío si aplica
    if (shippingCost && shippingCost > 0) {
      mpItems.push({
        id: 'shipping',
        title: 'Envío estándar',
        description: 'Costo de envío a todo México (3-5 días hábiles)',
        quantity: 1,
        unit_price: Number(shippingCost.toFixed(2)),
        currency_id: 'MXN',
      })
    }

    // Calcular total en pesos
    const totalPesos = mpItems.reduce((sum, item) => sum + item.unit_price * item.quantity, 0)

    // URL de retorno con orderNumber
    const successWithOrder = successUrl || `${event.node.req.headers.origin || 'http://localhost:3002'}/checkout/success`
    const separator = successWithOrder.includes('?') ? '&' : '?'
    const successUrlWithOrder = `${successWithOrder}${separator}order=${orderNumber}&provider=mercadopago`

    // Construir la preferencia de Mercado Pago
    const preference = {
      items: mpItems,
      payer: {
        email: customerEmail || undefined,
        name: customerName || undefined,
      },
      back_urls: {
        success: successUrlWithOrder,
        failure: cancelUrl || `${event.node.req.headers.origin || 'http://localhost:3002'}/checkout/cancel`,
        pending: cancelUrl || `${event.node.req.headers.origin || 'http://localhost:3002'}/checkout/cancel`,
      },
      auto_return: 'approved',
      notification_url: `${event.node.req.headers.origin || 'https://www.pitayalab.com.mx'}/api/checkout/mp/webhook`,
      external_reference: orderNumber,
      statement_descriptor: 'PITAYA LAB',
      metadata: {
        source: 'pitayalab-store',
        order_number: orderNumber,
        items_json: JSON.stringify(items.map(i => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        }))),
      },
      payment_methods: {
        installments: 12, // hasta 12 meses sin intereses (si aplica)
      },
    }

    // Llamar a la API de Mercado Pago para crear la preferencia
    const mpResponse = await $fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.mercadoPagoAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: preference,
    })

    const preferenceId = mpResponse?.id
    const initPoint = mpResponse?.init_point

    if (!preferenceId || !initPoint) {
      throw createError({ statusCode: 500, message: 'No se pudo crear la preferencia de Mercado Pago' })
    }

    // Guardar la orden como pendiente en la BD
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_email: customerEmail || 'pendiente@checkout.com',
        customer_name: customerName || 'Pendiente',
        status: 'pending',
        payment_status: 'pending',
        mp_preference_id: preferenceId,
        items: items,
        subtotal: totalPesos,
        total: totalPesos,
        shipping_address: {},
        payment_provider: 'mercadopago',
      })
      .select()
      .single()

    if (orderError) {
      console.error('Error guardando orden Mercado Pago:', orderError)
    }

    return {
      url: initPoint,
      preferenceId: preferenceId,
      orderNumber: orderNumber,
      provider: 'mercadopago',
    }
  } catch (e) {
    console.error('Error creando preferencia Mercado Pago:', e)
    if (e.statusCode) throw e
    throw createError({ statusCode: 500, message: e.message })
  }
})
