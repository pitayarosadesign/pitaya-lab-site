import { createClient } from '@supabase/supabase-js'

// GET /api/site/seo
// Devuelve:
//   - value:  mapa de SEO por ruta desde `site_config` (clave `page_seo`)
//   - global: SEO por defecto de todo el sitio (clave `seo_global`)
// usando service_role (salta RLS). La tienda usa ambos: la página toma su
// override si existe y, si no, cae al global.
export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey || '',
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('key, value')
      .in('key', ['page_seo', 'seo_global'])

    if (error) throw error

    const rows = Array.isArray(data) ? data : []
    const pageSeo = rows.find(r => r.key === 'page_seo')?.value || null
    const seoGlobal = rows.find(r => r.key === 'seo_global')?.value || null

    return { value: pageSeo, global: seoGlobal }
  } catch (e) {
    // Nunca romper la página; fallback vacío silencioso
    return { value: null, global: null }
  }
})
