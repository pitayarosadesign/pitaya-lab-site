import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const page = query.page || 'home'

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
    const { data, error } = await supabaseAdmin
      .from('page_sections')
      .select('*')
      .eq('page', page)
      .order('sort_order', { ascending: true })

    if (error) throw error

    // Normalizar contenido: asegurar que los heroes tengan el array 'slides'
    const sections = (data || []).map(s => {
      if (s.type === 'hero' && s.content && !Array.isArray(s.content.slides)) {
        s.content.slides = []
      }
      return s
    })

    return { success: true, sections }
  } catch (e) {
    throw createError({
      statusCode: 500,
      message: e.message,
    })
  }
})
