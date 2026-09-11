import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { data: product, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    // Obtener imágenes
    const { data: images } = await supabaseAdmin
      .from('product_images')
      .select('*')
      .eq('product_id', id)
      .order('sort_order', { ascending: true })

    // Obtener variantes (aromas y/o dimensiones)
    const { data: variants } = await supabaseAdmin
      .from('product_variants')
      .select('*')
      .eq('product_id', id)
      .order('sort_order', { ascending: true })

    const variantList = variants || []

    // Reconstruir las dimensiones (modelo flexible) a partir de las variantes
    // guardadas, para que el editor de variantes del admin las pre-cargue.
    // Solo aplica si las variantes usan option_type_1/2 (no el modelo de aroma).
    const variantOptions = buildVariantOptions(variantList)

    return { ...product, images: images || [], variants: variantList, variantOptions }
  } catch (e) {
    throw createError({ statusCode: 404, message: 'Producto no encontrado' })
  }
})

// Reconstruye { type1, type2, dimensions, combinations } desde las variantes
// con dimensiones (option_type_1/2). Devuelve null si el producto no usa el
// modelo flexible (ej. solo aromas legacy).
function buildVariantOptions(variants) {
  const withOptions = variants.filter(v => v.option_type_1 || v.option_type_2)
  if (withOptions.length === 0) return null

  const type1 = withOptions.find(v => v.option_type_1)?.option_type_1 || null
  const type2 = withOptions.find(v => v.option_type_2)?.option_type_2 || null

  // Valores únicos preservando el orden de aparición
  const values1 = []
  const values2 = []
  for (const v of withOptions) {
    if (v.option_value_1 && !values1.includes(v.option_value_1)) values1.push(v.option_value_1)
    if (v.option_value_2 && !values2.includes(v.option_value_2)) values2.push(v.option_value_2)
  }

  const dimensions = [{
    type: type1 === 'Aroma' ? 'Aroma' : 'custom',
    customName: type1 === 'Aroma' ? '' : (type1 || ''),
    scentIds: [],           // se rellena en el cliente (requiere catálogo de aromas)
    customValues: type1 === 'Aroma' ? [] : values1,
    newValue: '',
  }]
  if (type2) {
    dimensions.push({
      type: type2 === 'Aroma' ? 'Aroma' : 'custom',
      customName: type2 === 'Aroma' ? '' : type2,
      scentIds: [],
      customValues: type2 === 'Aroma' ? [] : values2,
      newValue: '',
    })
  }

  return {
    type1,
    type2,
    dimensions,
    combinations: withOptions.map(v => ({
      value1: v.option_value_1 ?? null,
      value2: v.option_value_2 ?? null,
      label: v.name,
      sku: v.sku,
      price: v.price,
      stock: v.stock,
    })),
  }
}
