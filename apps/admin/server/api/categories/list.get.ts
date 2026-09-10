import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { data, error } = await supabaseAdmin
      .from('product_categories')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error

    // Conteo de productos por categoría (para mostrar en la tabla y validar borrado)
    const { data: products } = await supabaseAdmin
      .from('products')
      .select('category_id')

    const counts = {}
    for (const p of products || []) {
      if (p.category_id) counts[p.category_id] = (counts[p.category_id] || 0) + 1
    }

    const categories = (data || []).map(c => ({
      ...c,
      product_count: counts[c.id] || 0,
    }))

    return { categories }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
