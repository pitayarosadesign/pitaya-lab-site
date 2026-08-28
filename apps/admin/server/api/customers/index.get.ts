import { createClient } from '@supabase/supabase-js'

// 👥 Lista todos los clientes (usa service_role para saltar RLS)
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { data, error } = await supabaseAdmin
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)

    return { customers: data || [] }
  } catch (e) {
    console.error('Error en API customers:', e)
    throw createError({ statusCode: 500, message: e.message })
  }
})
