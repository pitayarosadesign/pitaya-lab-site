import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    // Si viene un productId, devolver solo ese producto
    if (query.productId) {
      const { data } = await supabaseAdmin
        .from('products')
        .select('id, name, sku, stock')
        .eq('id', query.productId)
        .single()

      return data
    }

    const { data: products } = await supabaseAdmin
      .from('products')
      .select('id, name, sku, stock')
      .order('name')

    // Ubicaciones físicas para movimientos (Almacén Central, Bodega Local, …).
    const { data: locations } = await supabaseAdmin
      .from('inventory_locations')
      .select('id, name')
      .order('name')

    return {
      products: products || [],
      locations: locations || [],
    }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
