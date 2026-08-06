import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { slug } = event.context.params

  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    // Normalizar slug: quitar guiones al inicio/final y espacios
    const cleanSlug = slug.trim().replace(/^-+|-+$/g, '')

    const { data: product, error } = await supabase
      .from('products')
      .select('*, product_categories(name, slug), product_images(url, alt_text, sort_order, is_primary), product_variants(*, product_id)')
      .eq('slug', cleanSlug)
      .eq('is_active', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        throw createError({ statusCode: 404, message: 'Producto no encontrado' })
      }
      throw error
    }

    const images = product.product_images || []
    const primaryImage = images.find(img => img.is_primary) || images[0]
    const variants = product.product_variants || []

    return {
      product: {
        id: product.id,
        sku: product.sku,
        name: product.name,
        slug: product.slug,
        subtitle: product.subtitle,
        description: product.description,
        longDescription: product.long_description,
        price: product.price,
        compareAtPrice: product.compare_at_price,
        category: product.product_categories?.name || '',
        categorySlug: product.product_categories?.slug || '',
        image: primaryImage?.url || null,
        images: images.map(img => ({
          id: img.id,
          url: img.url,
          altText: img.alt_text,
          isPrimary: img.is_primary,
        })),
        variants: variants.map(v => ({
          id: v.id,
          name: v.name,
          sku: v.sku,
          description: v.description,
          imageUrl: v.image_url,
          colorHex: v.color_hex,
          price: v.price,
          compareAtPrice: v.compare_at_price,
          stock: v.stock,
          isActive: v.is_active,
        })),
        stock: product.stock,
        isFeatured: product.is_featured,
        amazonLink: product.amazon_link,
        amazonAsin: product.amazon_asin,
        amazonPrice: product.amazon_price,
        weightKg: product.weight_kg,
        lengthCm: product.length_cm,
        widthCm: product.width_cm,
        heightCm: product.height_cm,
        requiresShipping: product.requires_shipping,
        freeShipping: product.free_shipping,
        gtin: product.gtin,
        brand: product.brand,
        features: [],
      }
    }
  } catch (e) {
    if (e.statusCode) throw e
    throw createError({ statusCode: 500, message: e.message })
  }
})
