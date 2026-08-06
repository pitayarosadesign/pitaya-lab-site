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
      .from('collections')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return { collections: data || [] }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
