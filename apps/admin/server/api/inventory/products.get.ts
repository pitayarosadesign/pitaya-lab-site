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

    const { data: stores } = await supabaseAdmin
      .from('commerce_stores')
      .select('id, name, is_active')
      .order('name')

    return {
      products: products || [],
      locations: stores || [],
    }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
