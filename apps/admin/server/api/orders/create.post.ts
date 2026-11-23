import { createClient } from '@supabase/supabase-js'
import { maybeCreateEnviaFulfillmentOrder } from '../../utils/manualOrderFulfillment'

// 🧾 Punto de venta manual: crea una orden por una venta hecha fuera de la
// tienda en línea (WhatsApp, Facebook, otro). Alimenta las tablas `orders` y
// `customers` para que las métricas y reportes reflejen todas las ventas.

const CHANNELS = ['tienda_online', 'whatsapp', 'facebook', 'otro']
const ORDER_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
const PAYMENT_STATUSES = ['paid', 'pending', 'failed']
const WAREHOUSES = ['almacen_central', 'almacen_local']
const PAYMENT_METHODS = ['clip', 'spei', 'cash', 'stripe']

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event).catch(() => ({}))

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const customerName = String(body.customerName || '').trim()
  const customerPhone = String(body.customerPhone || '').trim()
  const customerEmail = String(body.customerEmail || '').trim()
  const channel = String(body.salesChannel || '').trim().toLowerCase()
  const salesChannel = CHANNELS.includes(channel) ? channel : 'otro'

  if (!customerName) {
    throw createError({ statusCode: 400, message: 'El nombre del cliente es obligatorio.' })
  }

  // Los precios llegan en PESOS desde el formulario; se guardan en CENTAVOS
  // en `items` para mantener la misma convención del webhook de Stripe.
  const rawItems = Array.isArray(body.items) ? body.items : []
  const items = rawItems
    .map((it) => ({
      product_id: it && it.product_id ? it.product_id : null,
      name: String(it && it.name ? it.name : '').trim(),
      quantity: Math.max(1, Number(it && it.quantity) || 1),
      price: Math.max(0, Number(it && it.price) || 0),
    }))
    .filter((it) => it.name)

  if (items.length === 0) {
    throw createError({ statusCode: 400, message: 'Agrega al menos un producto.' })
  }

  const subtotal = Math.round(items.reduce((sum, it) => sum + it.price * it.quantity, 0) * 100) / 100
  const shippingCost = Math.max(0, Math.round((Number(body.shippingCost) || 0) * 100) / 100)
  const total = Math.round((subtotal + shippingCost) * 100) / 100

  const paymentStatus = PAYMENT_STATUSES.includes(body.paymentStatus) ? body.paymentStatus : 'paid'
  const orderStatus = ORDER_STATUSES.includes(body.status) ? body.status : 'confirmed'
  const warehouseId = WAREHOUSES.includes(body.warehouseId) ? body.warehouseId : 'almacen_central'
  const paymentMethod = PAYMENT_METHODS.includes(body.paymentMethod) ? body.paymentMethod : null
  const paymentReference = String(body.paymentReference || '').trim() || null

  // CP obligatorio cuando hay envío (para la guía). 5 dígitos.
  const postalCode = String(body.postalCode || '').replace(/\D/g, '').slice(0, 5)
  if (shippingCost > 0 && !/^\d{5}$/.test(postalCode)) {
    throw createError({ statusCode: 400, message: 'El código postal es obligatorio cuando hay costo de envío.' })
  }

  // Email sintético cuando no hay correo, para que el upsert de clientes
  // siga funcionando y se deduplique por teléfono.
  const phoneDigits = customerPhone.replace(/\D/g, '')
  const email = customerEmail || (phoneDigits
    ? `whatsapp+${phoneDigits}@manual.pitayalab.mx`
    : `manual+${Date.now()}@manual.pitayalab.mx`)

  const shippingAddress = {
    name: customerName,
    phone: customerPhone,
    email,
    postalCode,
    street: String(body.street || '').trim(),
    district: String(body.district || '').trim(),
    city: String(body.city || '').trim(),
    state: String(body.state || '').trim(),
  }

  // Número de orden secuencial PIT-XXXX (igual que el webhook de Stripe)
  const { data: lastOrder } = await supabaseAdmin
    .from('orders')
    .select('order_number')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  let nextNumber = 1001
  const lastNum = lastOrder && lastOrder.order_number
    ? parseInt(String(lastOrder.order_number).replace('PIT-', ''), 10)
    : NaN
  if (!isNaN(lastNum)) nextNumber = lastNum + 1
  const orderNumber = `PIT-${nextNumber}`

  const itemsJson = items.map((it) => ({
    product_id: it.product_id,
    name: it.name,
    quantity: it.quantity,
    price: Math.round(it.price * 100), // centavos
  }))

  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .insert({
      order_number: orderNumber,
      customer_email: email,
      customer_name: customerName,
      customer_phone: customerPhone || null,
      status: orderStatus,
      items: itemsJson,
      subtotal,
      shipping_cost: shippingCost,
      total,
      payment_status: paymentStatus,
      sales_channel: salesChannel,
      warehouse_id: warehouseId,
      payment_method: paymentMethod,
      payment_reference: paymentReference,
      shipping_address: shippingAddress,
      notes: String(body.notes || '').trim() || null,
      paid_at: paymentStatus === 'paid' ? new Date().toISOString() : null,
    })
    .select('id, order_number, sales_channel')
    .single()

  if (error) {
    console.error('Error creando orden manual:', error)
    throw createError({ statusCode: 500, message: 'No se pudo crear la orden: ' + error.message })
  }

  // Upsert del cliente (misma lógica del webhook de Stripe)
  const nameParts = customerName.split(' ')
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ') || ''

  const { data: existing } = await supabaseAdmin
    .from('customers')
    .select('id, total_orders, total_spent, phone')
    .eq('email', email)
    .limit(1)

  if (existing && existing[0]) {
    await supabaseAdmin
      .from('customers')
      .update({
        first_name: firstName || existing[0].first_name,
        last_name: lastName || existing[0].last_name,
        phone: customerPhone || existing[0].phone,
        total_orders: (existing[0].total_orders || 0) + 1,
        total_spent: (existing[0].total_spent || 0) + total,
        last_order_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing[0].id)
  } else {
    await supabaseAdmin
      .from('customers')
      .insert({
        email,
        first_name: firstName,
        last_name: lastName,
        phone: customerPhone || null,
        total_orders: 1,
        total_spent: total,
        last_order_at: new Date().toISOString(),
      })
  }

  // Stock: solo Bodega Local descuenta inventario local. En Almacén Central
  // el stock lo gobierna Envía Fulfillment (no se toca products.stock).
  if (warehouseId === 'almacen_local') {
    for (const it of items.filter((i) => i.product_id)) {
      const { error: stockError } = await supabaseAdmin.rpc('decrement_location_stock', {
        p_product_id: it.product_id,
        p_location_id: 'almacen_local',
        p_qty: it.quantity,
      })
      if (stockError) {
        console.error('Error descontando stock local de', it.product_id, stockError)
      }
    }
  }

  // Envía Fulfillment: solo central + pagado (el helper valida las condiciones).
  let fulfillment = null
  if (order && order.id) {
    fulfillment = await maybeCreateEnviaFulfillmentOrder(order.id)
  }

  return { success: true, order, fulfillment }
})
