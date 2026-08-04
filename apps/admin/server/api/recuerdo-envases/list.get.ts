import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const { data, error } = await supabaseAdmin
    .from('recuerdo_envases')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw createError({ statusCode: 500, message: error.message })

  return data || []
})
