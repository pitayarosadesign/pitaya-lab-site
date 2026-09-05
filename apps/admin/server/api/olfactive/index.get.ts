import { createClient } from '@supabase/supabase-js'

// GET /api/olfactive
// Lista los ejes de clasificación olfativa (familia, inspiración, estación, …)
// con sus valores permitidos.
//
// Importante: devuelve SIEMPRE un JSON utilizable. Si la migración
// 022 (estructura de catálogo olfativo) aún NO fue aplicada en la BD,
// responde { applied: false, classifications: [] } en vez de lanzar un 500,
// para que la página pueda mostrar un aviso de "migración pendiente".
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { data, error } = await supabase
      .from('olfactive_classifications')
      .select('*, olfactive_classification_values(id, name, slug, emoji, short_desc, sort_order, is_active)')
      .order('sort_order', { ascending: true })

    if (error) {
      const msg = error.message || ''
      // Fallback ante tablas aún no creadas (migración 022 pendiente)
      if (/relation ".+olfactive/.exec(msg) || /does not exist/.test(msg)) {
        return { applied: false, classifications: [] }
      }
      throw error
    }

    const classifications = (data || []).map(c => ({
      ...c,
      values: (c.olfactive_classification_values || []).sort((a, b) => a.sort_order - b.sort_order),
    }))

    return { applied: true, classifications }
  } catch (e) {
    // Última red: nunca romper el panel si algo anda mal. Se avisa sutilmente.
    return { applied: false, classifications: [], error: e.message }
  }
})
