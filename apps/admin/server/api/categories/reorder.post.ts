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
    // `order` es un arreglo de ids en el orden deseado
    const { order } = body
    if (!Array.isArray(order)) {
      throw createError({ statusCode: 400, message: 'Se esperaba un arreglo "order" con los ids' })
    }

    // Actualizar sort_order según la posición
    await Promise.all(order.map((id, index) =>
      supabaseAdmin
        .from('product_categories')
        .update({ sort_order: index })
        .eq('id', id)
    ))

    return { success: true }
  } catch (e) {
    throw createError({ statusCode: e.statusCode || 500, message: e.message })
  }
})
