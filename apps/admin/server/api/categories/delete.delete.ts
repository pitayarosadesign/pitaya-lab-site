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
    if (!id) {
      throw createError({ statusCode: 400, message: 'El id de la categoría es obligatorio' })
    }

    // No permitir eliminar si tiene productos asociados
    const { count: productCount } = await supabaseAdmin
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', id)

    if (productCount && productCount > 0) {
      throw createError({
        statusCode: 400,
        message: `No se puede eliminar: hay ${productCount} producto(s) en esta categoría. Reasígnalos primero.`,
      })
    }

    // No permitir eliminar si tiene subcategorías
    const { count: childCount } = await supabaseAdmin
      .from('product_categories')
      .select('id', { count: 'exact', head: true })
      .eq('parent_id', id)

    if (childCount && childCount > 0) {
      throw createError({
        statusCode: 400,
        message: `No se puede eliminar: tiene ${childCount} subcategoría(s). Elimínalas o reasígnalas primero.`,
      })
    }

    const { error } = await supabaseAdmin
      .from('product_categories')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (e) {
    throw createError({ statusCode: e.statusCode || 500, message: e.message })
  }
})
