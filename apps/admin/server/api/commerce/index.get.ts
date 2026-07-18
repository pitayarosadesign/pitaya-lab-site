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
      .from('commerce_stores')
      .select('*')
      .order('name')

    if (error) throw error

    return data || []
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
