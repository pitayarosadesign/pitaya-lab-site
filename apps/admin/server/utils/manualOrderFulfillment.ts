import { createClient } from '@supabase/supabase-js'
import { createEnviaFulfillmentOrder, getEnviaFulfillmentWarehouseId } from './enviaFulfillment'

// Dispara la creación de una orden en Envía Fulfillment para una venta manual.
// Solo cuando se cumplen las 3 condiciones:
//   1. warehouse_id = 'almacen_central'
//   2. payment_status = 'paid'
//   3. sin envia_fulfillment_order_id ni tracking_number previos
// Devuelve { enviaOrderId, note } o { error } o null si no corresponde disparar.

function buildShippingAddress(raw: any) {
  const a = raw || {}
  const name = String(a.name || '').trim() || 'Cliente'
  const parts = name.split(' ')
  const firstName = parts[0] || 'Cliente'
  const lastName = parts.slice(1).join(' ')
  return {
    name,
    first_name: firstName,
    last_name: lastName,
    address1: String(a.street || '').trim(),
    address2: '',
    district: String(a.district || a.neighborhood || '').trim(),
    city: String(a.city || '').trim(),
    state: { code: '', name: String(a.state || '').trim() },
    country: { code: 'MX', name: 'México' },
    postalCode: String(a.postalCode || a.cp || '').replace(/\D/g, ''),
    phone: String(a.phone || '').trim(),
    references: String(a.references || '').slice(0, 100),
  }
}

async function readAdminNotes(supabase: any, orderId: string): Promise<string> {
  const { data } = await supabase.from('orders').select('admin_notes').eq('id', orderId).single()
  return data?.admin_notes || ''
}

export async function maybeCreateEnviaFulfillmentOrder(orderId: string) {
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const { data: order, error } = await supabase.from('orders').select('*').eq('id', orderId).single()
  if (error || !order) return null

  if (order.warehouse_id !== 'almacen_central') return null
  if (order.payment_status !== 'paid') return null
  if (order.envia_fulfillment_order_id || order.tracking_number) return null
  if (String(order.admin_notes || '').includes('Envía Fulfillment: orden')) return null

  let items = order.items
  if (typeof items === 'string') {
    try { items = JSON.parse(items) } catch { items = [] }
  }
  if (!Array.isArray(items) || items.length === 0) return null

  const productIds = [...new Set((items || []).filter((i: any) => i.product_id).map((i: any) => i.product_id))]
  const variantMap = new Map<string, number | null>()
  if (productIds.length) {
    const { data: products } = await supabase.from('products').select('id, envia_variant_id').in('id', productIds)
    for (const p of products || []) variantMap.set(p.id, p.envia_variant_id)
  }

  const products: any[] = []
  for (const item of items) {
    const enviaVariantId = item.product_id ? variantMap.get(item.product_id) : null
    if (!enviaVariantId) continue
    products.push({
      variantId: enviaVariantId,
      quantity: Number(item.quantity) || 1,
      // El Punto de venta guarda los precios en centavos (misma convención de Stripe).
      price: Number(((Number(item.price) || 0) / 100).toFixed(2)),
      discount: 0,
    })
  }

  if (products.length === 0) {
    const note = 'Envía Fulfillment: sin productos con variantId, no se envía'
    await supabase.from('orders').update({
      admin_notes: `${await readAdminNotes(supabase, orderId)}\n${note}`.trim(),
    }).eq('id', orderId)
    return null
  }

  const total = products.reduce((s, p) => s + p.price * p.quantity, 0)
  const payload: any = {
    warehouseId: Number(await getEnviaFulfillmentWarehouseId()),
    orderIdentifier: order.order_number,
    ecommerceStatus: 'paid',
    total: Number(total.toFixed(2)),
    currency: 'MXN',
    email: order.customer_email || '',
    products,
    shippingAddress: buildShippingAddress(order.shipping_address),
  }
  if (config.enviaFulfillmentShopId) payload.shopId = Number(config.enviaFulfillmentShopId)

  try {
    const res = await createEnviaFulfillmentOrder(payload)
    const created = Array.isArray(res) ? res[0] : res
    const enviaOrderId = created?.orderId || created?.id || created?.identifier || null
    const numericId = enviaOrderId != null ? Number(enviaOrderId) : null
    const note = enviaOrderId
      ? `Envía Fulfillment: orden ${enviaOrderId} creada`
      : `Envía Fulfillment: orden creada (${JSON.stringify(res).slice(0, 120)})`

    await supabase.from('orders').update({
      envia_fulfillment_order_id: Number.isFinite(numericId) ? numericId : null,
      fulfillment_status: 'created',
      admin_notes: `${await readAdminNotes(supabase, orderId)}\n${note}`.trim(),
    }).eq('id', orderId)

    return { enviaOrderId, note }
  } catch (e: any) {
    const note = `Envía Fulfillment ERROR: ${(e?.message || e || '').toString().slice(0, 200)}`
    await supabase.from('orders').update({
      fulfillment_status: 'error',
      admin_notes: `${await readAdminNotes(supabase, orderId)}\n${note}`.trim(),
    }).eq('id', orderId)
    return { error: note }
  }
}
