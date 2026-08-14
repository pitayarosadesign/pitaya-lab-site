import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { category, featured, limit, search } = getQuery(event)

  // Cliente con service role para leer productos (incluyendo inactivos si es necesario)
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    let query = supabase
      .from('products')
      .select('*, product_categories(name, slug), product_images(url, alt_text, sort_order, is_primary), product_variants(id, name, image_url, fragrance_profile_id, fragrance_profiles(name, emoji, subtitle, slug, image_url, experience, notes, description))')
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

      // Fragancias disponibles del producto (desde sus variantes vinculadas a perfiles aromáticos)
      const variants = p.product_variants || []
      const fragrances = variants
        .filter(v => v.fragrance_profiles)
        .map(v => ({
          id: v.fragrance_profiles.id,
          name: v.fragrance_profiles.name,
          slug: v.fragrance_profiles.slug,
          emoji: v.fragrance_profiles.emoji || '',
          subtitle: v.fragrance_profiles.subtitle || '',
          image: v.fragrance_profiles.image_url || null,
          experience: v.fragrance_profiles.experience || '',
          notes: v.fragrance_profiles.notes || '',
          description: v.fragrance_profiles.description || '',
        }))

      // Nombres de todas las variantes (para filtrado por coincidencia de aroma)
      const variantNames = variants.map(v => v.name).filter(Boolean)

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
        fragrances,
        variantNames,
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


