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
    const storeId = query.id

    // Información del comercio
    const { data: store } = await supabaseAdmin
      .from('commerce_stores')
      .select('*')
      .eq('id', storeId)
      .single()

    // Inventario del showroom
    const { data: inventory } = await supabaseAdmin
      .from('inventory_by_location')
      .select('*, product:product_id(name, sku, stock)')
      .eq('location_id', storeId)

    // Ventas
    const { data: sales } = await supabaseAdmin
      .from('commerce_sales')
      .select('*')
      .eq('store_id', storeId)
      .order('created_at', { ascending: false })
      .limit(20)

    return { store, inventory: inventory || [], sales: sales || [] }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
