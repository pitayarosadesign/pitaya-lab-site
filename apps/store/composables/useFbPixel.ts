// Helper de eventos de Facebook/Meta Pixel.
// - Dispara el píxel del navegador (window.fbq).
// - Reenvía el mismo evento por el API de conversiones (CAPI, server-to-server)
//   con el mismo event_id para que Meta deduplique. El token vive en el servidor.
export function trackFbEvent(name, params = {}) {
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
  sendToCapi(name, params, eventId)
}

function sendToCapi(name, params, eventId) {
  if (!import.meta.client) return
  try {
    $fetch('/api/meta/capi', {
      method: 'POST',
      body: {
        event_name: name,
        event_id: eventId,
        event_source_url: window.location.href,
        custom_data: params,
        user_data: {
          fbp: getCookie('_fbp'),
          fbc: getCookie('_fbc'),
        },
      },
    }).catch(() => {
      // Silencioso: el píxel del navegador ya cubre el evento si CAPI falla.
    })
  } catch (e) {
    console.warn('CAPI send error:', e.message)
  }
}

function getCookie(name) {
  if (!import.meta.client) return undefined
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return m ? decodeURIComponent(m[1]) : undefined
}
