import { createClient } from '@supabase/supabase-js'

// GET /api/aromas/export-csv
// Exporta el catálogo maestro de aromas a CSV (para rectificar/re-importar).
// Columnas: name,slug,subtitle,experience,notes,inspiracion,image_url,
//           olfactive_family,collection_tag,is_active
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { data, error } = await supabaseAdmin
      .from('fragrance_profiles')
      .select('name, slug, subtitle, experience, notes, inspiracion, image_url, olfactive_family, collection_tag, is_active')
      .order('name', { ascending: true })

    if (error) throw error

    const rows = data || []
    const esc = (v = '') => {
      const s = String(v ?? '')
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s
    }

    const header = 'name,slug,subtitle,experience,notes,inspiracion,image_url,olfactive_family,collection_tag,is_active'
    const lines = rows.map(r => [
      esc(r.name),
      esc(r.slug),
      esc(r.subtitle),
      esc(r.experience),
      esc(r.notes),
      esc(r.inspiracion),
      esc(r.image_url),
      esc(r.olfactive_family),
      esc(r.collection_tag),
      esc(r.is_active ? 'true' : 'false'),
    ].join(','))

    const csv = [header, ...lines].join('\n')
    return csv
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
