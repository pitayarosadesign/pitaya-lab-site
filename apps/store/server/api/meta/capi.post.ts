/**
 * 📊 PITAYA LAB - Meta Conversions API (CAPI)
 * ===========================================================
 * Reenvía eventos del píxel por servidor (server-to-server) para
 * anuncios dinámicos y mejor atribución. El token vive solo en el
 * servidor (runtimeConfig.metaCapiToken) y nunca se expone al cliente.
 *
 * Ruta: POST /api/meta/capi
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = config.metaCapiToken
  const pixelId = config.public.fbPixelId || '1031196445800113'

  if (!token) {
    return { ok: false, reason: 'no-token' }
  }

  const body = await readBody(event).catch(() => ({}))
  if (!body?.event_name) {
    return { ok: false, reason: 'missing-event-name' }
  }

  const headers = getHeaders(event)
  const forwarded = (headers['x-forwarded-for'] || '').split(',')[0].trim()
  const socketIp = (event.node?.req?.socket?.remoteAddress) || ''
  const ip = forwarded || headers['x-real-ip'] || socketIp || ''
  const ua = headers['user-agent'] || ''

  // Solo aceptamos los campos que el cliente está autorizado a enviar.
  const userData = body.user_data || {}
  const payload = {
    data: [
      {
        event_name: body.event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.event_id || undefined,
        action_source: 'website',
        event_source_url: body.event_source_url || headers.referer || '',
        user_data: {
          ...(Array.isArray(userData.em) ? { em: userData.em } : {}),
          ...(Array.isArray(userData.ph) ? { ph: userData.ph } : {}),
          ...(userData.fbp ? { fbp: userData.fbp } : {}),
          ...(userData.fbc ? { fbc: userData.fbc } : {}),
          ...(ip ? { client_ip_address: ip } : {}),
          ...(ua ? { client_user_agent: ua } : {}),
        },
        custom_data: body.custom_data || {},
      },
    ],
  }

  try {
    const res = await $fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )
    return { ok: true, meta: res }
  } catch (e) {
    console.error('Meta CAPI error:', e?.data?.error || e.message)
    return { ok: false, reason: 'meta-error' }
  }
})
