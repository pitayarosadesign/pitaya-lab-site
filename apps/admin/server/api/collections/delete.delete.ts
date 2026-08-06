import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { id } = body
  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  if (!id) throw createError({ statusCode: 400, message: 'Falta el id de la colección' })

  try {
    const { error } = await supabaseAdmin.from('collections').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
