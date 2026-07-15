import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { data: products, error } = await supabaseAdmin
      .from('products')
      .select('*, product_categories(name, slug)')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Obtener imágenes principales
    const productsWithImages = await Promise.all((products || []).map(async (p) => {
      let image = null
      const { data: images } = await supabaseAdmin
        .from('product_images')
        .select('url')
        .eq('product_id', p.id)
        .eq('is_primary', true)
        .limit(1)
      if (images && images.length > 0) image = images[0].url
      return {
        id: p.id,
        name: p.name,
        category: p.product_categories?.name || '',
        category_slug: p.product_categories?.slug || '',
        sku: p.sku,
        price: p.price,
        stock: p.stock,
        image,
        is_active: p.is_active,
      }
    }))

    return productsWithImages
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
