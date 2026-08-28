import { createClient } from '@supabase/supabase-js'

// 📦 Obtiene el detalle de una orden por ID (usa service_role para saltar RLS)
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw new Error(error.message)

    return { order: data }
  } catch (e) {
    console.error('Error en API order detail:', e)
    throw createError({ statusCode: 500, message: e.message })
  }
})
