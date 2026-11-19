/**
 * POST /api/shipping/envia-fulfillment-webhook-inventory
 * ------------------------------------------------------
 * Webhook de Envía Fulfillment: onInventoryModification (cambios de stock en el almacén).
 *
 * STUB inicial: registra el payload crudo para inspeccionar el contrato exacto
 * antes de mapear a `products.stock` / `product_variants.stock`.
 */
export default defineEventHandler(async (event) => {
  let body: any = null
  try {
    body = await readBody(event)
  } catch {
    body = null
  }

  console.log('[envia-fulfillment-webhook:onInventoryModification] payload:', JSON.stringify(body))

  return { received: true }
})
