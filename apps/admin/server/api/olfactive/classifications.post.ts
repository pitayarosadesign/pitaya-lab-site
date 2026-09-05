import { createClient } from '@supabase/supabase-js'

// POST /api/olfactive/classifications
// Crea un nuevo EJE de clasificación olfativa (familia nueva, tipo de inspiración, etc.)
// body: { key, name, singular, emoji, description, is_filter, is_active }
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const name = (body?.name || '').trim()
  if (!name) throw createError({ statusCode: 400, message: 'El nombre es obligatorio' })

  const autoKey = String(name).toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_').replace(/(^_+|_+$)/g, '')
  const key = (body?.key || autoKey).trim() || autoKey
  if (!key) throw createError({ statusCode: 400, message: 'La clave (key) es obligatoria' })

  const payload = {
    key,
    name,
    singular: body?.singular?.trim() || name,
    emoji: body?.emoji || null,
    description: body?.description || null,
    is_filter: body?.is_filter !== false,
    is_active: body?.is_active !== false,
    sort_order: Number(body?.sort_order || 0),
  }

  try {
    const { data, error } = await supabase.from('olfactive_classifications').insert(payload).select().single()
    if (error) throw error
    return { success: true, classification: data }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
