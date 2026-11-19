import { createClient } from '@supabase/supabase-js'

// Cotización B2B / evento: guarda la solicitud en `orders` como status='quote'
// (sin cobro en línea). El admin la revisa y responde con cotización por
// WhatsApp/correo. No se crea sesión de Stripe ni se dispara fulfillment.
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const {
      items,
      customerEmail,
      customerName,
      customerPhone,
      orderType = 'wholesale',   // 'wholesale' | 'event'
      eventDate = null,
      customDesign = null,
      customText = null,
      premiumKit = false,
      b2bDiscountPercent = 0,
      leadTimeDays = null,
      notes = null,
      total = null,
    } = body

    if (!items || items.length === 0) {
      throw createError({ statusCode: 400, message: 'La cotización está vacía' })
    }

    // Número de orden (mismo formato PIT-XXXX)
    const { data: lastOrder } = await supabaseAdmin
      .from('orders')
      .select('order_number')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    let nextNumber = 1001
    if (lastOrder?.order_number) {
      const lastNum = parseInt(String(lastOrder.order_number).replace('PIT-', ''), 10)
      if (!isNaN(lastNum)) nextNumber = lastNum + 1
    }
    const orderNumber = `PIT-${nextNumber}`

    // items.price viene en centavos
    const subtotal = (items || []).reduce(
      (sum: number, i: any) => sum + (Number(i.price) / 100) * (i.quantity || 1),
      0,
    )
    const totalAmount = total != null ? Number(total) : subtotal

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_email: customerEmail || 'cotizacion@pitayalab.com.mx',
        customer_name: customerName || 'Cotización B2B',
        customer_phone: customerPhone || null,
        status: 'quote',
        payment_status: 'unpaid',
        items,
        subtotal,
        total: totalAmount,
        shipping_address: {},
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

    if (error) throw error

    return { ok: true, orderNumber, orderId: order?.id || null }
  } catch (e) {
    console.error('Error creando cotización B2B:', e)
    if (e.statusCode) throw e
    throw createError({ statusCode: 500, message: e.message })
  }
})
