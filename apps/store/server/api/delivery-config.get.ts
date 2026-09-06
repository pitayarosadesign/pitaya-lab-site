import { createClient } from '@supabase/supabase-js'

// GET /api/delivery-config
// Devuelve la configuración de "entrega estimada" desde `site_config`
// usando service_role (salta RLS) para que el store no dependa de políticas
// de lectura anónimas (el cliente público daba 406 al select de 'value').
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
      .eq('key', 'delivery_estimates')
      .maybeSingle()

    if (error) throw error
    return { value: data?.value || null }
  } catch (e) {
    // Nunca romper el carrito; fallback vacío silencioso
    return { value: null }
  }
})
