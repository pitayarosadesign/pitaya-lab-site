// Helper de eventos de Facebook Pixel (solo cliente).
// El código base vive en app.vue (useHead) y define window.fbq.
export function trackFbEvent(name, params = {}) {
  if (!import.meta.client) return
  const fbq = (window as any).fbq
  if (typeof fbq === 'function') {
    try {
      fbq('track', name, params)
    } catch (e) {
      // Nunca bloquear la UX por un error del píxel.
      console.warn('fbq track error:', e.message)
    }
  }
}
