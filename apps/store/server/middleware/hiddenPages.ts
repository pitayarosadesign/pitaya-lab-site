import { createClient } from '@supabase/supabase-js'

// Middleware de servidor: aplica la visibilidad de páginas fijas definida en
// site_config.pages_visibility = { hidden: string[], redirects: Record<path, target> }.
//   - hidden    -> responde 404
//   - redirects -> responde 301 al destino
// La config se cachea en memoria (TTL corto) para no consultar Supabase en cada request.
//
// Nota: las rutas prerenderizadas (/, /about, /philosophy, /catalog) se sirven como
// estáticos y no pasan por aquí en un hit directo; el resto de páginas sí.

const cache = { value: null as any, at: 0 }
const TTL_MS = 30_000

async function getVisibility(config: any) {
  if (cache.at && Date.now() - cache.at < TTL_MS) return cache.value

  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey || '',
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'pages_visibility')
      .maybeSingle()
    if (error) throw error
    cache.value = data?.value || null
    cache.at = Date.now()
    return cache.value
  } catch {
    return cache.value
  }
}

export default defineEventHandler(async (event) => {
  const method = (event.method || 'GET').toUpperCase()
  if (method !== 'GET' && method !== 'HEAD') return

  // Solo rutas de página (sin API, sin assets, sin internos de Nuxt).
  const rawPath = (event.path || '').split('?')[0]
  if (rawPath.startsWith('/api/') || rawPath.startsWith('/_nuxt/') || rawPath.startsWith('/__')) return
  if (/\.[a-zA-Z0-9]{1,6}$/.test(rawPath)) return

  const path = rawPath.replace(/\/+$/, '') || '/'

  const config = useRuntimeConfig()
  const vis = await getVisibility(config)
  if (!vis) return

  const hidden = Array.isArray(vis.hidden) ? vis.hidden : []
  const redirects = vis.redirects && typeof vis.redirects === 'object' ? vis.redirects : {}

  if (hidden.includes(path)) {
    throw createError({ statusCode: 404, statusMessage: 'Página no encontrada' })
  }

  if (redirects[path]) {
    await sendRedirect(event, redirects[path], 301)
  }
})
