import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { data, error } = await supabaseAdmin
      .from('inventory_movements')
      .select('*, product:product_id(name)')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw error

    return data || []
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
