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
    const { error } = await supabaseAdmin
      .from('coupons')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
