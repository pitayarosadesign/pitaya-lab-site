import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const id = query.id

  if (!id) {
    throw createError({ statusCode: 400, message: 'Falta el id de la página' })
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    // Obtener el slug antes de borrar para limpiar sus secciones
    const { data: page } = await supabaseAdmin
      .from('pages')
      .select('slug')
      .eq('id', id)
      .maybeSingle()

    // Borrar la página
    const { error: delError } = await supabaseAdmin
      .from('pages')
      .delete()
      .eq('id', id)
    if (delError) throw delError

    // Borrar sus secciones asociadas (page = slug)
    if (page?.slug) {
      const { error: secError } = await supabaseAdmin
        .from('page_sections')
        .delete()
        .eq('page', page.slug)
      if (secError) throw secError
    }

    return { success: true }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
