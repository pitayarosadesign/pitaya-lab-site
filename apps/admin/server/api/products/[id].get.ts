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

    // Obtener variantes (aromas)
    const { data: variants } = await supabaseAdmin
      .from('product_variants')
      .select('*')
      .eq('product_id', id)
      .order('sort_order', { ascending: true })

    return { ...product, images: images || [], variants: variants || [] }
  } catch (e) {
    throw createError({ statusCode: 404, message: 'Producto no encontrado' })
  }
})
