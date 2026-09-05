import { createClient } from '@supabase/supabase-js'

// POST /api/olfactive/values
// Da de alta un nuevo valor dentro de un eje de clasificación olfativa.
// body: { classification_id, name, slug?, emoji?, is_active = true }
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const classification_id = body?.classification_id
  if (!classification_id) {
    throw createError({ statusCode: 400, message: 'Falta classification_id' })
  }
  const name = (body?.name || '').trim()
  if (!name) {
    throw createError({ statusCode: 400, message: 'El nombre es obligatorio' })
  }

  const payload = {
    classification_id,
    name,
    slug: (body?.slug || slugify(name)).trim(),
    emoji: body?.emoji || null,
    short_desc: body?.short_desc || null,
    sort_order: Number(body?.sort_order || 0),
    is_active: body?.is_active !== false,
  }
  // Evitar slugs duplicados dentro del mismo eje si ya existen
  payload.slug = await ensureUniqueSlug(supabase, classification_id, payload.slug)

  try {
    const { data, error } = await supabase.from('olfactive_classification_values').insert(payload).select().single()
    if (error) throw error
    return { success: true, value: data }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})

function slugify(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || 'valor'
}

async function ensureUniqueSlug(supabase, classification_id, slug) {
  const { data, error } = await supabase
    .from('olfactive_classification_values')
    .select('slug')
    .eq('classification_id', classification_id)
    .eq('slug', slug)
  if (error || !data || data.length === 0) return slug
  return `${slug}-${Date.now().toString(36)}`
}
