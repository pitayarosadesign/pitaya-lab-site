import { createClient } from '@supabase/supabase-js'

// DELETE /api/olfactive/values?id=xxx
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { id } = getQuery(event)
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  if (!id) throw createError({ statusCode: 400, message: 'Falta el id del valor' })

  const { error } = await supabase.from('olfactive_classification_values').delete().eq('id', id)
  if (error) throw createError({ statusCode: 500, message: error.message })
  return { success: true }
})
