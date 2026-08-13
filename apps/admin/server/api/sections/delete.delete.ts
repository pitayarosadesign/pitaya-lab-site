import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const id = query.id

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
      .delete()
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
