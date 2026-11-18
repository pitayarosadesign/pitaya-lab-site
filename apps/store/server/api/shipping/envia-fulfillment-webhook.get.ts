/**
 * GET /api/shipping/envia-fulfillment-webhook
 * ------------------------------------------
 * Health check: confirma que el endpoint está desplegado. El webhook real de
 * Envía llega por POST (ver envia-fulfillment-webhook.post.ts).
 */
export default defineEventHandler(() => {
  return {
    ok: true,
    service: 'envia-fulfillment-webhook',
    hint: 'Este endpoint recibe eventos de Envía Fulfillment por POST.',
  }
})
