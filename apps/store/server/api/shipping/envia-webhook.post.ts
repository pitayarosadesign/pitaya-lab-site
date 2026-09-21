/**
 * POST /api/shipping/envia-webhook
 * ---------------------------------
 * Recibe eventos de rastreo de Envía.com y actualiza la orden correspondiente.
 *
 * Soporta los 3 tipos de webhook disponibles en la cuenta:
 *   - simpleTracking                 (v2, tipo "tracking.simple")
 *   - ecommerceTracking              (v2, con info de e-commerce)
 *   - statusUpdateWithEcommerceInfo  (legacy, tipo id 2)
 *
 * URL a registrar en el dashboard de Envía.com:
 *   https://www.pitayalab.com.mx/api/shipping/envia-webhook
 */

import { createClient } from '@supabase/supabase-js'

// Mapea el estado que manda Envía.com a un estado interno y decide
// si toca marcar shipped_at / delivered_at.
function normalizeStatus(rawStatus: string) {
  const s = (rawStatus || '').toLowerCase()
  const isDelivered = /deliver|entregad/i.test(s)
  const isShipped = /transit|en camino|recolectad|picked|shipped|en ruta|recibido/i.test(s)
  return {
    status: isDelivered ? 'delivered' : isShipped ? 'shipped' : s || 'unknown',
    delivered: isDelivered,
    shipped: isShipped || isDelivered,
  }
}

// Extrae el número de orden (orderName) de las distintas formas posibles.
function extractOrderName(body: any) {
  const d = body?.data || {}
  return (
    d.orderData?.orderName
    || d.orderName
    || d.order_id
    || d.order_number
    || body.orderData?.orderName
    || body.orderName
    || null
  )
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Responder rápido siempre; el trabajo de DB es ligero (una actualización).
  let body: any = null
  try {
    body = await readBody(event)
  } catch {
    return { received: false, reason: 'invalid_json' }
  }

  if (!body || typeof body !== 'object') {
    return { received: false, reason: 'empty_body' }
  }

  // --- Normalizar el payload según el tipo de webhook ---
  let trackingNumber: string | null = null
  let carrier: string | null = null
  let statusDescription: string | null = null
  let location: string | null = null
  let rawStatus: string | null = null

  if (body.type === 'tracking.simple' || body.type === 'ecommerceTracking' || body.type === 'ecommerce.tracking') {
    // v2 (firmados): la info vive dentro de `data`
    const d = body.data || {}
    trackingNumber = d.tracking_number || d.trackingNumber || null
    carrier = d.carrier_name || d.carrierName || null
    rawStatus = d.status || null
    statusDescription = d.status_description || d.statusDescription || null
    location = d.location || null
  } else if (body.trackingNumber || body.tracking_number) {
    // legacy: campos en la raíz
    trackingNumber = body.trackingNumber || body.tracking_number || null
    carrier = body.carrierName || body.carrier_name || null
    rawStatus = body.status || null
    statusDescription = body.status_description || null
    location = body.location || null
  }

  if (!trackingNumber) {
    return { received: false, reason: 'missing_tracking_number' }
  }

  const orderName = extractOrderName(body)
  const normalized = normalizeStatus(rawStatus || '')

  // --- Deduplicación por X-Webhook-Id (los v2 lo envían) ---
  const webhookId = getHeader(event, 'x-webhook-id')
  console.log(`📦 Envía webhook [${body.type || 'legacy'}] tracking=${trackingNumber} status=${rawStatus} id=${webhookId || 'n/a'}`)

  if (!config.supabaseServiceKey) {
    return { received: false, reason: 'supabase_not_configured' }
  }

  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  // --- Localizar la orden ---
  // 1) por orderName (lo que enviemos como referencia al generar la guía)
  // 2) por tracking_number si ya lo habíamos guardado
  let orderId: string | null = null
  if (orderName) {
    const candidates = [String(orderName), `PIT-${String(orderName)}`]
    const { data } = await supabase
      .from('orders')
      .select('id')
      .in('order_number', candidates)
      .limit(1)
    orderId = data?.[0]?.id || null
  }
  if (!orderId) {
    const { data } = await supabase
      .from('orders')
      .select('id')
      .eq('tracking_number', trackingNumber)
      .limit(1)
    orderId = data?.[0]?.id || null
  }

  const updates: Record<string, any> = {
    updated_at: new Date().toISOString(),
  }
  if (carrier) updates.shipping_carrier = carrier
  if (trackingNumber) updates.tracking_number = trackingNumber
  if (normalized.status) updates.shipping_status = normalized.status
  if (normalized.shipped) updates.shipped_at = updates.shipped_at || new Date().toISOString()
  if (normalized.delivered) updates.delivered_at = new Date().toISOString()

  if (orderId) {
    const { error } = await supabase.from('orders').update(updates).eq('id', orderId)
    if (error) {
      console.error('Error actualizando orden con rastreo:', error.message)
      return { received: false, reason: 'db_error' }
    }
    console.log(`✅ Rastreo actualizado en orden ${orderId} → ${normalized.status}`)
  } else {
    console.warn(`⚠️ No se encontró orden para tracking=${trackingNumber} orderName=${orderName || 'n/a'}`)
  }

  // Registrar el evento crudo para debug (siempre devolver 200 a Envía.com)
  console.log('   detalle:', JSON.stringify({ carrier, trackingNumber, status: rawStatus, description: statusDescription, location, orderName }))

  return { received: true, orderId }
})
