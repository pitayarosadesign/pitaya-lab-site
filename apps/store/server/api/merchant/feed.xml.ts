/**
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
    // Obtener productos activos
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

    // Generar XML del feed
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
    xml += `<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n`
    xml += `  <channel>\n`
    xml += `    <title>PITAYA LAB - Productos</title>\n`
    xml += `    <link>${BASE_URL}</link>\n`
    xml += `    <description>Feed de productos PITAYA LAB para Google Merchant Center</description>\n`

    for (const product of products) {
      if (!product.price || product.price <= 0) continue

      const images = product.product_images || []
      const primaryImage = images.find(img => img.is_primary) || images[0]
      const imageLink = primaryImage?.url
        ? (primaryImage.url.startsWith('http') ? primaryImage.url : `${BASE_URL}${primaryImage.url}`)
        : `${BASE_URL}/images/brand/logo-pitayalab.png`


      const productUrl = `${BASE_URL}/product/${product.slug}`

      xml += `    <item>\n`
      xml += `      <g:id>${product.sku || product.id}</g:id>\n`
      xml += `      <g:title><![CDATA[${product.name}${product.subtitle ? ' - ' + product.subtitle : ''}]]></g:title>\n`
      xml += `      <g:description><![CDATA[${product.long_description || product.description || product.name}]]></g:description>\n`
      xml += `      <g:link>${productUrl}</g:link>\n`
      xml += `      <g:image_link>${imageLink}</g:image_link>\n`
      xml += `      <g:availability>${product.stock > 0 ? 'in_stock' : 'out_of_stock'}</g:availability>\n`
      xml += `      <g:price>${product.price} MXN</g:price>\n`

      if (product.compare_at_price && product.compare_at_price > product.price) {
        xml += `      <g:sale_price>${product.price} MXN</g:sale_price>\n`
      }

      xml += `      <g:brand>${product.brand || 'PITAYA LAB'}</g:brand>\n`
      xml += `      <g:condition>${product.google_condition || 'new'}</g:condition>\n`

      if (product.gtin) {
        xml += `      <g:gtin>${product.gtin}</g:gtin>\n`
      }

      if (product.mpn) {
        xml += `      <g:mpn>${product.mpn}</g:mpn>\n`
      }

      if (product.google_product_category) {
        xml += `      <g:google_product_category>${product.google_product_category}</g:google_product_category>\n`
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
