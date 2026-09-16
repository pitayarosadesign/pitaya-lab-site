// Redirecciones 301 de los productos base que fueron separados por aroma.
// Las URLs antiguas (/product/<slug-base>) ahora apuntan al catálogo, a la
// categoría correspondiente de cada línea (o al catálogo general si no tiene).

const LEGACY_SLUGS: Record<string, string> = {
  'Pitaya-Lab-Bruma-Aromática-225-Ml': '/catalog?categoria=brumas',
  'PitayA-Lab-Jabón-líquido-de-manos-Solara-500-ml': '/catalog',
  'soy-wax-candle': '/catalog?categoria=velas',
  'aceite-aromatico': '/catalog?categoria=aceites',
  'pitaya-lab-vela-100-g': '/catalog?categoria=velas',
  'crema-de-manos': '/catalog?categoria=Crema',
  'reed-diffuser-100': '/catalog?categoria=difusores',
  'room-spray-125': '/catalog?categoria=brumas',
}

export default defineEventHandler((event) => {
  const method = (event.method || 'GET').toUpperCase()
  if (method !== 'GET' && method !== 'HEAD') return

  // Decodificar para que coincidan también los slugs con acentos, sin importar
  // si el request llega percent-encoded o ya decodificado.
  let path = (event.path || '').split('?')[0]
  try {
    path = decodeURIComponent(path)
  } catch {
    return
  }
  path = path.replace(/\/+$/, '') || '/'

  const match = path.match(/^\/product\/([^/]+)$/)
  if (!match) return

  const target = LEGACY_SLUGS[match[1]]
  if (!target) return

  return sendRedirect(event, target, 301)
})
