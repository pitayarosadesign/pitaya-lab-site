import { createClient } from '@supabase/supabase-js'

// GET /robots.txt
// Sirve el contenido crudo configurable desde el admin
// (site_config.seo_global.robots_txt). Si no hay config, usa las reglas
// por defecto de PITAYA LAB.
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey || '',
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const DEFAULT = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /checkout/',
    'Disallow: /api/',
    '',
    'User-agent: Googlebot',
    'Allow: /',
  ].join('\n')

  let content = DEFAULT
  try {
    const { data } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'seo_global')
      .maybeSingle()
    const raw = data?.value?.robots_txt
    if (typeof raw === 'string' && raw.trim()) content = raw
  } catch (e) {
    // Fallback silencioso a las reglas por defecto.
  }

  setHeader(event, 'Content-Type', 'text/plain; charset=UTF-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  return content
})
