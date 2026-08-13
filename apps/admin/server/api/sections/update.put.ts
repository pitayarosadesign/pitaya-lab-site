import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { id, ...updates } = body

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Falta el id de la sección',
    })
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  )

  try {
    const { error } = await supabaseAdmin
      .from('page_sections')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (e) {
    throw createError({
      statusCode: 500,
      message: e.message,
    })
  }
})
