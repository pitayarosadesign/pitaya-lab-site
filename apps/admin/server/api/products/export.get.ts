import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    // Obtener todos los productos con todas las columnas + categoría
    const { data: products, error } = await supabaseAdmin
      .from('products')
      .select('*, product_categories(name, slug)')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Obtener todas las imágenes de los productos
    const productIds = (products || []).map(p => p.id)
    const { data: allImages } = await supabaseAdmin
      .from('product_images')
      .select('product_id, url, alt_text, is_primary, sort_order')
      .in('product_id', productIds)
      .order('product_id', { ascending: true })

    // Agrupar imágenes por producto (URLs separadas por |, primaria al inicio)
    const imagesByProduct = {}
    for (const img of allImages || []) {
      if (!imagesByProduct[img.product_id]) imagesByProduct[img.product_id] = []
      imagesByProduct[img.product_id].push(img)
    }

    // Definir todas las columnas del CSV (máxima información útil)
    const headers = [
      'id', 'sku', 'nombre', 'subtitulo', 'slug',
      'categoria', 'categoria_slug',
      'descripcion', 'descripcion_larga',
      'precio', 'precio_comparativa', 'costo', 'stock',
      'gtin', 'mpn', 'brand', 'google_condition', 'google_product_category',
      'peso_kg', 'largo_cm', 'ancho_cm', 'alto_cm',
      'envio_gratis', 'requiere_envio',
      'img_primaria', 'imagenes_extra',
      'amazon_asin', 'amazon_link', 'amazon_price',
      'is_featured', 'is_active', 'created_at'
    ]

    const rows = (products || []).map(p => {
      const imgs = imagesByProduct[p.id] || []
      const primary = imgs.find(i => i.is_primary) || imgs[0]
      const extra = imgs.filter(i => !(i.is_primary && primary?.id === i.id))

      return [
        p.id,
        p.sku || '',
        p.name || '',
        p.subtitle || '',
        p.slug || '',
        p.product_categories?.name || '',
        p.product_categories?.slug || '',
        p.description || '',
        p.long_description || '',
        p.price ?? '',
        p.compare_at_price ?? '',
        p.cost_price ?? '',
        p.stock ?? '',
        p.gtin || '',
        p.mpn || '',
        p.brand || 'PITAYA LAB',
        p.google_condition || 'new',
        p.google_product_category || '',
        p.weight_kg ?? '',
        p.length_cm ?? '',
        p.width_cm ?? '',
        p.height_cm ?? '',
        p.free_shipping ? 'si' : 'no',
        p.requires_shipping === false ? 'no' : 'si',
        primary?.url || '',
        extra.map(e => e.url).join(' | '),
        p.amazon_asin || '',
        p.amazon_link || '',
        p.amazon_price ?? '',
        p.is_featured ? 'si' : 'no',
        p.is_active ? 'si' : 'no',
        p.created_at || '',
      ]
    })

    // Función para escapar valores CSV (comillas, comas, saltos de línea)
    const escape = (val) => {
      if (val === null || val === undefined) return ''
      const s = String(val)
      if (/[",\n\r]/.test(s)) {
        return '"' + s.replace(/"/g, '""') + '"'
      }
      return s
    }

    // Construir CSV con BOM para Excel
    let csv = '\ufeff' + headers.join(',') + '\n'
    for (const row of rows) {
      csv += row.map(escape).join(',') + '\n'
    }

    // Devolver como archivo descargable
    setHeader(event, 'Content-Type', 'text/csv; charset=utf-8')
    setHeader(event, 'Content-Disposition', `attachment; filename="productos-pitayalab-${new Date().toISOString().split('T')[0]}.csv"`)
    return csv
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
