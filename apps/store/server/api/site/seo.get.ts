import { createClient } from '@supabase/supabase-js'

// GET /api/site/seo
// Devuelve el mapa de SEO por ruta desde `site_config` (clave `page_seo`)
// usando service_role (salta RLS). La tienda lo usa para permitir editar
// títulos y descripciones de páginas fijas sin tocar código.
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
      .select('value')
      .eq('key', 'page_seo')
      .maybeSingle()

    if (error) throw error
    return { value: data?.value || null }
  } catch (e) {
    // Nunca romper la página; fallback vacío silencioso
    return { value: null }
  }
})
