import { createClient } from '@supabase/supabase-js'

// PUT /api/olfactive/classifications
// Actualiza un EJE de clasificación olfativa (rename, toggle activo/filtro, etc.)
// body: { id, ...fields }
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const { id, ...fields } = body
  if (!id) throw createError({ statusCode: 400, message: 'Falta el id del eje' })
  if (!Object.keys(fields).length) throw createError({ statusCode: 400, message: 'Sin cambios' })

  const { data, error } = await supabase
    .from('olfactive_classifications')
    .update(fields)
    .eq('id', id)
    .select()
    .single()

  if (error) throw createError({ statusCode: 500, message: error.message })
  return { success: true, classification: data }
})
