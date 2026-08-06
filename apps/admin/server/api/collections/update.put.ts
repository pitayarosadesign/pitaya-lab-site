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

  if (!id) throw createError({ statusCode: 400, message: 'Falta el id de la colección' })

  try {
    const { data, error } = await supabaseAdmin
      .from('collections')
      .update(fields)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { success: true, collection: data }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
