import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { sections } = body

  if (!Array.isArray(sections)) {
    throw createError({
      statusCode: 400,
      message: 'Se esperaba un array de secciones',
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
    // Actualizar el sort_order de cada sección
    for (let i = 0; i < sections.length; i++) {
      const { error } = await supabaseAdmin
        .from('page_sections')
        .update({ sort_order: i + 1 })
        .eq('id', sections[i].id)
      if (error) throw error
    }
    return { success: true }
  } catch (e) {
    throw createError({
      statusCode: 500,
      message: e.message,
    })
  }
})
