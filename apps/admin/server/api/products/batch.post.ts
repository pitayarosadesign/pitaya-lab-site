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
    const { action, ids } = body

    if (!ids || ids.length === 0) {
      throw new Error('No se seleccionaron productos')
    }

    let result

    switch (action) {
      case 'activate':
        result = await supabaseAdmin
          .from('products')
          .update({ is_active: true })
          .in('id', ids)
        break

      case 'deactivate':
        result = await supabaseAdmin
          .from('products')
          .update({ is_active: false })
          .in('id', ids)
        break

      case 'delete':
        // Eliminar imágenes primero
        for (const id of ids) {
          await supabaseAdmin
            .from('product_images')
            .delete()
            .eq('product_id', id)
        }
        // Eliminar el producto
        result = await supabaseAdmin
          .from('products')
          .delete()
          .in('id', ids)
        break

      default:
        throw new Error(`Acción "${action}" no válida`)
    }

    if (result.error) throw result.error

    return {
      success: true,
      action,
      count: ids.length,
    }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
