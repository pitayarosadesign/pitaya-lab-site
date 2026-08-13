import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

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
      .insert(body)
      .select()
      .single()

    if (error) throw error
    return { success: true, section: data }
  } catch (e) {
    throw createError({
      statusCode: 500,
      message: e.message,
    })
  }
})
