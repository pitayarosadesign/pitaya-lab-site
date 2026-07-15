import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { category, featured, limit } = getQuery(event)

  // Cliente con service role para leer productos (incluyendo inactivos si es necesario)
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    let query = supabase
      .from('products')
      .select('*, product_categories(name, slug), product_images(url, alt_text, sort_order, is_primary)')
      .eq('is_active', true)
      .order('sort_order', { ascending: true, nullsFirst: false })

    // Filtro por categoría
    if (category) {
      query = query.eq('product_categories.slug', category)
    }

    // Solo destacados
    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }

    // Límite
    if (limit) {
      query = query.limit(parseInt(limit))
    }

    const { data: products, error } = await query

    if (error) throw error

    // Formatear respuesta
    const formatted = (products || []).map(p => {
      const images = p.product_images || []
      const primaryImage = images.find(img => img.is_primary) || images[0]

      return {
        id: p.id,
        sku: p.sku,
        name: p.name,
        slug: p.slug,
        subtitle: p.subtitle,
        description: p.description,
        longDescription: p.long_description,
        price: p.price,
        compareAtPrice: p.compare_at_price,
        category: p.product_categories?.name || '',
        categorySlug: p.product_categories?.slug || '',
        image: primaryImage?.url || null,
        images: images.map(img => ({
          url: img.url,
          altText: img.alt_text,
          isPrimary: img.is_primary,
        })),
        stock: p.stock,
        isFeatured: p.is_featured,
        amazonLink: p.amazon_link,
        amazonAsin: p.amazon_asin,
        amazonPrice: p.amazon_price,
        weightKg: p.weight_kg,
        requiresShipping: p.requires_shipping,
        freeShipping: p.free_shipping,
        gtin: p.gtin,
        brand: p.brand,
        publishedAt: p.published_at,
      }
    })

    return { products: formatted }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
