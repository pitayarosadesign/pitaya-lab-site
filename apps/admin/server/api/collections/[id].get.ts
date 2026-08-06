import { createClient } from '@supabase/supabase-js'

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
      .from('collections')
      .select('*, fragrance_profiles(*)')
      .eq('id', id)
      .single()

    if (error) throw error
    return { collection: data }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
