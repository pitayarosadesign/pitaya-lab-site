import { createClient } from '@supabase/supabase-js'
import { parse } from 'csv-parse/sync'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    // Parsear CSV
    const records = parse(body.csv, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
    })

    // Validar que no esté vacío
    if (!records || records.length === 0) {
      throw new Error('El archivo CSV está vacío o no tiene datos válidos')
    }

    const results = { success: [], errors: [] }

    // Obtener mapeo de categorías
    const { data: categories } = await supabaseAdmin
      .from('product_categories')
      .select('id, slug')

    const categoryMap = {}
    if (categories) {
      categories.forEach(c => { categoryMap[c.slug] = c.id })
    }

    // Procesar cada fila
    for (let i = 0; i < records.length; i++) {
      const row = records[i]
      const rowNum = i + 2 // +2 porque la fila 1 es header

      try {
        // Validar campos requeridos
        if (!row.nombre) throw new Error(`Fila ${rowNum}: El campo "nombre" es requerido`)
        if (!row.sku) throw new Error(`Fila ${rowNum}: El campo "sku" es requerido`)
        if (!row.precio) throw new Error(`Fila ${rowNum}: El campo "precio" es requerido`)

        const precio = parseFloat(row.precio)
        if (isNaN(precio) || precio <= 0) throw new Error(`Fila ${rowNum}: Precio inválido`)

        const categoriaSlug = (row.categoria || '').toLowerCase().trim()
        const categoryId = categoryMap[categoriaSlug] || null

        if (!categoryId) {
          console.warn(`Fila ${rowNum}: Categoría "${row.categoria}" no encontrada, se deja sin categoría`)
        }

        // Generar slug si no viene
        const slug = row.slug || row.nombre
          .toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
          .substring(0, 255)

        // Verificar si el SKU ya existe
        const { data: existing } = await supabaseAdmin
          .from('products')
          .select('id')
          .eq('sku', row.sku)
          .maybeSingle()

        if (existing) {
          results.errors.push(`Fila ${rowNum}: El SKU "${row.sku}" ya existe (producto existente)`)
          continue
        }

        // Insertar producto
        const { data: product, error } = await supabaseAdmin
          .from('products')
          .insert({
            sku: row.sku,
            name: row.nombre,
            slug,
            subtitle: row.subtitulo || null,
            description: row.descripcion || null,
            long_description: row.descripcion_larga || null,
            category_id: categoryId,
            price: precio,
            compare_at_price: row.precio_comparativa ? parseFloat(row.precio_comparativa) : null,
            cost_price: row.costo ? parseFloat(row.costo) : null,
            stock: row.stock ? parseInt(row.stock) : 0,
            weight_kg: row.peso_kg ? parseFloat(row.peso_kg) : null,
            length_cm: row.largo_cm ? parseFloat(row.largo_cm) : null,
            width_cm: row.ancho_cm ? parseFloat(row.ancho_cm) : null,
            height_cm: row.alto_cm ? parseFloat(row.alto_cm) : null,
            free_shipping: row.envio_gratis === 'si' || row.envio_gratis === 'true',
            google_product_category: row.categoria_google || null,
            gtin: row.gtin || null,
            google_condition: row.condicion || 'new',
            brand: row.marca || 'PITAYA LAB',
            amazon_asin: row.amazon_asin || null,
            amazon_price: row.amazon_precio ? parseFloat(row.amazon_precio) : null,
            amazon_link: row.amazon_link || null,
            is_active: row.activo !== 'no',
            published_at: new Date().toISOString(),
          })
          .select('id, name, sku')
          .single()

        if (error) throw new Error(`Fila ${rowNum}: ${error.message}`)

        results.success.push({
          id: product.id,
          name: product.name,
          sku: product.sku,
          row: rowNum,
        })

      } catch (e) {
        results.errors.push(e.message)
      }
    }

    return {
      success: true,
      total: records.length,
      imported: results.success.length,
      errors: results.errors.length,
      products: results.success,
      errorDetails: results.errors,
    }

  } catch (e) {
    throw createError({
      statusCode: 400,
      message: e.message,
    })
  }
})
