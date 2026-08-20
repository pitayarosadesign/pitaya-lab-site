/**
 * 
 * 📤 PITAYA LAB - Google Merchant Center Feed
 * =============================================
 * Genera el feed XML de productos para Google Merchant Center
 * Ruta: GET /api/merchant/feed.xml
 */

import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Solo permitir acceso desde Google (o deshabilitar para pruebas)
  // En producción, puedes agregar verificación de IP

  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    // Obtener productos activos con sus variantes
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        product_categories(name, slug),
        product_images(url, alt_text, sort_order, is_primary),
        product_variants(id, name, sku, gtin, price, compare_at_price, stock, image_url, is_active)
      `)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error

    const BASE_URL = 'https://www.pitayalab.com.mx'

    // 🛡️ Escapar caracteres XML especiales en campos que NO usan CDATA
    const escapeXml = (str: string = '') =>
      String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')

    // Generar XML del feed
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
    xml += `<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n`
    xml += `  <channel>\n`
    xml += `    <title>PITAYA LAB - Productos</title>\n`
    xml += `    <link>${escapeXml(BASE_URL)}</link>\n`
    xml += `    <description>Feed de productos PITAYA LAB para Google Merchant Center</description>\n`

    for (const product of products) {
      if (!product.price || product.price <= 0) continue

      const images = product.product_images || []
      const primaryImage = images.find(img => img.is_primary) || images[0]
      const productImageLink = primaryImage?.url
        ? (primaryImage.url.startsWith('http') ? primaryImage.url : `${BASE_URL}${primaryImage.url}`)
        : `${BASE_URL}/images/brand/logo-pitayalab.png`

      const productUrl = `${BASE_URL}/product/${product.slug}`
      const variants = (product.product_variants || []).filter(v => v.is_active !== false)

      // Si el producto tiene variantes activas, generar un <item> por cada variante
      if (variants.length > 0) {
        for (const variant of variants) {
          // Usar precio de la variante si existe, si no el del producto
          const price = variant.price || product.price
          if (!price || price <= 0) continue

          const compareAtPrice = variant.compare_at_price || product.compare_at_price
          const variantImage = variant.image_url
            ? (variant.image_url.startsWith('http') ? variant.image_url : `${BASE_URL}${variant.image_url}`)
            : productImageLink
          const variantSku = variant.sku || product.sku
          const variantGtin = variant.gtin || null
          const variantStock = variant.stock ?? product.stock

          xml += `    <item>\n`
          xml += `      <g:id>${escapeXml(variantSku)}</g:id>\n`
          xml += `      <g:title><![CDATA[${product.name} - ${variant.name}]]></g:title>\n`
          xml += `      <g:description><![CDATA[${product.long_description || product.description || product.name}]]></g:description>\n`
          xml += `      <g:link>${escapeXml(productUrl)}</g:link>\n`
          xml += `      <g:image_link>${escapeXml(variantImage)}</g:image_link>\n`
          const availability = variantStock > 0
            ? 'in_stock'
            : (product.allow_backorder ? 'preorder' : 'out_of_stock')
          xml += `      <g:availability>${availability}</g:availability>\n`
          xml += `      <g:price>${escapeXml(price)} MXN</g:price>\n`

          if (compareAtPrice && compareAtPrice > price) {
            xml += `      <g:sale_price>${escapeXml(price)} MXN</g:sale_price>\n`
          }

          xml += `      <g:brand>${escapeXml(product.brand || 'PITAYA LAB')}</g:brand>\n`
          xml += `      <g:condition>${escapeXml(product.google_condition || 'new')}</g:condition>\n`

          if (variantGtin) {
            xml += `      <g:gtin>${escapeXml(variantGtin)}</g:gtin>\n`
          }

          if (product.mpn) {
            xml += `      <g:mpn>${escapeXml(product.mpn)}</g:mpn>\n`
          }

          if (product.google_product_category) {
            xml += `      <g:google_product_category>${escapeXml(product.google_product_category)}</g:google_product_category>\n`
          }

          // Categoría personalizada
          if (product.product_categories?.name) {
            xml += `      <g:product_type><![CDATA[Home & Garden > Home Decor > ${product.product_categories.name}]]></g:product_type>\n`
          }

          // Envío
          if (product.requires_shipping !== false) {
            xml += `      <g:shipping>\n`
            xml += `        <g:country>MX</g:country>\n`
            xml += `        <g:service>Estándar</g:service>\n`
            xml += `        <g:price>${product.free_shipping ? '0.00' : '75.00'} MXN</g:price>\n`
            xml += `      </g:shipping>\n`
          }

          // Peso y dimensiones
          if (product.weight_kg) {
            xml += `      <g:shipping_weight>${product.weight_kg} kg</g:shipping_weight>\n`
          }

          xml += `    </item>\n`
        }
      } else {
        // Producto sin variantes: usar datos del producto principal
        xml += `    <item>\n`
        xml += `      <g:id>${escapeXml(product.sku || product.id)}</g:id>\n`
        xml += `      <g:title><![CDATA[${product.name}${product.subtitle ? ' - ' + product.subtitle : ''}]]></g:title>\n`
        xml += `      <g:description><![CDATA[${product.long_description || product.description || product.name}]]></g:description>\n`
        xml += `      <g:link>${escapeXml(productUrl)}</g:link>\n`
        xml += `      <g:image_link>${escapeXml(productImageLink)}</g:image_link>\n`
        const availability = product.stock > 0
          ? 'in_stock'
          : (product.allow_backorder ? 'preorder' : 'out_of_stock')
        xml += `      <g:availability>${availability}</g:availability>\n`
        xml += `      <g:price>${escapeXml(product.price)} MXN</g:price>\n`

        if (product.compare_at_price && product.compare_at_price > product.price) {
          xml += `      <g:sale_price>${escapeXml(product.price)} MXN</g:sale_price>\n`
        }

        xml += `      <g:brand>${escapeXml(product.brand || 'PITAYA LAB')}</g:brand>\n`
        xml += `      <g:condition>${escapeXml(product.google_condition || 'new')}</g:condition>\n`

        if (product.gtin) {
          xml += `      <g:gtin>${escapeXml(product.gtin)}</g:gtin>\n`
        }

        if (product.mpn) {
          xml += `      <g:mpn>${escapeXml(product.mpn)}</g:mpn>\n`
        }

        if (product.google_product_category) {
          xml += `      <g:google_product_category>${escapeXml(product.google_product_category)}</g:google_product_category>\n`
        }

        // Categoría personalizada
        if (product.product_categories?.name) {
          xml += `      <g:product_type><![CDATA[Home & Garden > Home Decor > ${product.product_categories.name}]]></g:product_type>\n`
        }

        // Envío
        if (product.requires_shipping !== false) {
          xml += `      <g:shipping>\n`
          xml += `        <g:country>MX</g:country>\n`
          xml += `        <g:service>Estándar</g:service>\n`
          xml += `        <g:price>${product.free_shipping ? '0.00' : '75.00'} MXN</g:price>\n`
          xml += `      </g:shipping>\n`
        }

        // Peso y dimensiones
        if (product.weight_kg) {
          xml += `      <g:shipping_weight>${product.weight_kg} kg</g:shipping_weight>\n`
        }

        xml += `    </item>\n`
      }
    }

    xml += `  </channel>\n`
    xml += `</rss>`

    // Configurar headers para XML
    setHeader(event, 'Content-Type', 'application/xml; charset=UTF-8')
    setHeader(event, 'Cache-Control', 'public, max-age=3600') // Cache 1 hora

    return xml
  } catch (e) {
    console.error('Error generando feed Google Merchant:', e)
    throw createError({ statusCode: 500, message: 'Error generando feed' })
  }
})
