import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { id } = body

    // Obtener producto original
    const { data: original, error: fetchError } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // Crear duplicado
    const { data: newProduct, error: insertError } = await supabaseAdmin
      .from('products')
      .insert({
        name: `${original.name} (copia)`,
        slug: `${original.slug}-copia-${Date.now()}`,
        sku: original.sku ? `${original.sku}-COPY` : null,
        subtitle: original.subtitle,
        description: original.description,
        long_description: original.long_description,
        price: original.price,
        compare_at_price: original.compare_at_price,
        cost: original.cost,
        stock: original.stock || 0,
        category: original.category,
        category_slug: original.category_slug,
        image: original.image,
        images: original.images,
        is_active: false,
        is_featured: false,
        amazon_link: original.amazon_link,
        amazon_asin: original.amazon_asin,
        amazon_price: original.amazon_price,
        weight_kg: original.weight_kg,
        length_cm: original.length_cm,
        width_cm: original.width_cm,
        height_cm: original.height_cm,
        requires_shipping: original.requires_shipping,
        free_shipping: original.free_shipping,
        gtin: original.gtin,
        brand: original.brand,
      })
      .select()
      .single()

    if (insertError) throw insertError

    return { success: true, product: newProduct }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
