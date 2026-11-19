/**
 * POST /api/shipping/envia-fulfillment-webhook
 * ---------------------------------------------------
 * Webhook de Envía Fulfillment (estados de órdenes de fulfillment).
 *
 * STUB inicial: registra esta URL en Envía y deja que llegue el primer evento
 * de prueba; lo registramos en logs para inspeccionar el payload real antes de
 * mapear estados (created / picked / packed / shipped / delivered) a `orders`.
 *
 * URL a registrar en Envía (Configuración → Webhooks):
 *   https://www.pitayalab.com.mx/api/shipping/envia-fulfillment-webhook
 */
export default defineEventHandler(async (event) => {
  let body: any = null
  try {
    body = await readBody(event)
  } catch {
    body = null
  }

  // Registramos el payload crudo para aprender el contrato exacto de Envía.
  console.log('[envia-fulfillment-webhook:onOrderUpdate] payload:', JSON.stringify(body))

  // Siempre respondemos 200 para que Envía considere el evento entregado.
  return { received: true }
})
