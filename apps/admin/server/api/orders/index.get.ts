import { createClient } from '@supabase/supabase-js'

// 📦 Lista todas las órdenes (usa service_role para saltar RLS)
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw new Error(error.message)

    return { orders: data || [] }
  } catch (e) {
    console.error('Error en API orders:', e)
    throw createError({ statusCode: 500, message: e.message })
  }
})
