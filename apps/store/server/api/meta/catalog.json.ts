/**
 * 📤 PITAYA LAB - Meta Catalog Feed (Instagram/Facebook Shopping)
 * ===============================================================
 * Genera el feed JSON de productos para el catálogo de Meta
 * Ruta: GET /api/meta/catalog.json
 */

import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        product_categories(name, slug),
        product_images(url, alt_text, sort_order, is_primary)
      `)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error

    const BASE_URL = 'https://www.pitayalab.com.mx'
    const NOW = new Date().toISOString()

    const feed = {
      id: 'pitaya-lab-catalog',
      title: 'PITAYA LAB - Catálogo de Productos',
      description: 'Productos botánicos biodegradables: velas de soya, aceites aromáticos y brumas.',
      link: BASE_URL,
      updated: NOW,
      items: products
        .filter(p => p.price > 0)
        .map(product => {
          const images = product.product_images || []
          const primaryImage = images.find(img => img.is_primary) || images[0]
          const imageLink = primaryImage?.url
            ? (primaryImage.url.startsWith('http') ? primaryImage.url : `${BASE_URL}${primaryImage.url}`)
            : `${BASE_URL}/images/brand/logo-pitayalab.png`

          return {
            id: product.sku || product.id,
            title: `${product.name}${product.subtitle ? ' - ' + product.subtitle : ''}`,
            description: product.long_description || product.description || product.name,
            link: `${BASE_URL}/product/${product.slug}`,
            image_link: imageLink,
            additional_image_links: images
              .filter(img => !img.is_primary && img.url)
              .map(img => img.url.startsWith('http') ? img.url : `${BASE_URL}${img.url}`),
            availability: product.stock > 0
              ? 'in stock'
              : (product.allow_backorder ? 'preorder' : 'out of stock'),
            price: `${product.price} MXN`,
            sale_price: product.compare_at_price && product.compare_at_price > product.price
              ? `${product.price} MXN`
              : undefined,
            brand: product.brand || 'PITAYA LAB',
            condition: product.google_condition || 'new',
            gtin: product.gtin || undefined,
            mpn: product.mpn || undefined,
            google_product_category: product.google_product_category || undefined,
            product_type: product.product_categories?.name || undefined,
            shipping: {
              country: 'MX',
              service: product.free_shipping ? 'Gratis' : 'Estándar',
              price: product.free_shipping ? '0.00 MXN' : '75.00 MXN',
            },
            shipping_weight: product.weight_kg ? `${product.weight_kg} kg` : undefined,
            custom_label_0: product.is_featured ? 'Destacado' : undefined,
            custom_label_1: product.product_categories?.slug || undefined,
          }
        }),
    }

    setHeader(event, 'Content-Type', 'application/json; charset=UTF-8')
    setHeader(event, 'Cache-Control', 'public, max-age=3600')

    return feed
  } catch (e) {
    console.error('Error generando feed Meta:', e)
    throw createError({ statusCode: 500, message: 'Error generando feed' })
  }
})
