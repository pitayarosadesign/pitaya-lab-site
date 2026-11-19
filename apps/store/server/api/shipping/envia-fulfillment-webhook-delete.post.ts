/**
 * POST /api/shipping/envia-fulfillment-webhook-delete
 * ---------------------------------------------------
 * Webhook de Envía Fulfillment: onOrderDelete (orden borrada/cancelada en el almacén).
 *
 * STUB inicial: registra el payload crudo para inspeccionar el contrato exacto
 * antes de mapear a `orders` (marcar la orden local como cancelada).
 */
export default defineEventHandler(async (event) => {
  let body: any = null
  try {
    body = await readBody(event)
  } catch {
    body = null
  }

  console.log('[envia-fulfillment-webhook:onOrderDelete] payload:', JSON.stringify(body))

  return { received: true }
})
