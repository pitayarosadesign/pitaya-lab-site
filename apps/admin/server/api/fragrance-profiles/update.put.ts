import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { id, ...fields } = body
  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  if (!id) throw createError({ statusCode: 400, message: 'Falta el id del perfil' })

  try {
    const { data, error } = await supabaseAdmin
      .from('fragrance_profiles')
      .update(fields)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { success: true, profile: data }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
