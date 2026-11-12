// Helper de eventos de Facebook/Meta Pixel.
// - Dispara el píxel del navegador (window.fbq).
// - Reenvía el mismo evento por el API de conversiones (CAPI, server-to-server)
//   con el mismo event_id para que Meta deduplique. El token vive en el servidor.
// - userData.email / userData.phone se hashean con SHA-256 (em/ph) para mejorar
//   la proporción de coincidencias (Dataset Quality).
export function trackFbEvent(name, params = {}, userData = {}) {
  if (!import.meta.client) return

  const eventId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

  // 1) Píxel del navegador (con eventID para deduplicar contra CAPI)
  const fbq = (window as any).fbq
  if (typeof fbq === 'function') {
    try {
      fbq('track', name, params, { eventID: eventId })
    } catch (e) {
      console.warn('fbq track error:', e.message)
    }
  }

  // 2) API de conversiones (server-to-server), fire-and-forget
  sendToCapi(name, params, eventId, userData)
}

async function sendToCapi(name, params, eventId, userData) {
  if (!import.meta.client) return
  try {
    const [em, ph] = await Promise.all([
      sha256Hex(normalizeEmail(userData.email)),
      sha256Hex(normalizePhone(userData.phone)),
    ])

    await $fetch('/api/meta/capi', {
      method: 'POST',
      body: {
        event_name: name,
        event_id: eventId,
        event_source_url: window.location.href,
        custom_data: params,
        user_data: {
          fbp: getCookie('_fbp'),
          fbc: getCookie('_fbc'),
          ...(em ? { em: [em] } : {}),
          ...(ph ? { ph: [ph] } : {}),
        },
      },
    })
  } catch (e) {
    // Silencioso: el píxel del navegador ya cubre el evento si CAPI falla.
    console.warn('CAPI send error:', e.message)
  }
}

function getCookie(name) {
  if (!import.meta.client) return undefined
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return m ? decodeURIComponent(m[1]) : undefined
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function normalizePhone(phone) {
  let d = String(phone || '').replace(/\D/g, '')
  if (d.startsWith('52') && d.length === 12) d = d.slice(2)
  if (d.length === 10) d = '52' + d
  return d
}

async function sha256Hex(value) {
  if (!value || !import.meta.client) return undefined
  try {
    const data = new TextEncoder().encode(value)
    const digest = await window.crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(digest))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  } catch {
    return undefined
  }
}
