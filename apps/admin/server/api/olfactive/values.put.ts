import { createClient } from '@supabase/supabase-js'

// PUT /api/olfactive/values
// Actualiza un valor de clasificación olfativa.
// body: { id, ...fields } → ej. { name, emoji, short_desc, sort_order, is_active }
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const { id, ...fields } = body
  if (!id) throw createError({ statusCode: 400, message: 'Falta el id del valor' })
  if (!Object.keys(fields).length) throw createError({ statusCode: 400, message: 'Sin cambios' })

  const { data, error } = await supabase
    .from('olfactive_classification_values')
    .update(fields)
    .eq('id', id)
    .select()
    .single()

  if (error) throw createError({ statusCode: 500, message: error.message })
  return { success: true, value: data }
})
