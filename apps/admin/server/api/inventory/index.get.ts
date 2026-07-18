import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    // Obtener ubicaciones
    const { data: locations, error: locError } = await supabaseAdmin
      .from('inventory_locations')
      .select('*')
      .order('name')

    if (locError) throw new Error(`Error locations: ${locError.message}`)

    // Obtener productos
    const { data: products, error: prodError } = await supabaseAdmin
      .from('products')
      .select('id, name, sku, stock, price, is_active')
      .order('name')

    if (prodError) throw new Error(`Error products: ${prodError.message}`)

    // Obtener imágenes principales
    const { data: allImages, error: imgError } = await supabaseAdmin
      .from('product_images')
      .select('product_id, url')
      .eq('is_primary', true)

    if (imgError) throw new Error(`Error images: ${imgError.message}`)

    // Mapa de imágenes por producto
    const imageMap = {}
    for (const img of allImages || []) {
      if (!imageMap[img.product_id]) {
        imageMap[img.product_id] = img.url
      }
    }

    // Obtener stocks por ubicación
    const { data: locationStocks, error: stockError } = await supabaseAdmin
      .from('inventory_by_location')
      .select('*')

    if (stockError) throw new Error(`Error stocks: ${stockError.message}`)

    return {
      locations: locations || [],
      products: (products || []).map(p => ({
        ...p,
        image: imageMap[p.id] || null,
        location_stocks: (locationStocks || []).filter(ls => ls.product_id === p.id),
        web_reserved: (locationStocks || [])
          .filter(ls => ls.product_id === p.id && ls.location_id === 'web_reserved')
          .reduce((sum, ls) => sum + (ls.stock || 0), 0),
      })),
    }
  } catch (e) {
    console.error('Error en API inventory:', e)
    throw createError({ statusCode: 500, message: e.message })
  }
})
