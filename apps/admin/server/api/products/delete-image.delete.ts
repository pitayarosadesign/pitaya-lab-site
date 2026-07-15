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
    const { imageId, imageUrl } = body

    // Eliminar registro de la BD
    const { error } = await supabaseAdmin
      .from('product_images')
      .delete()
      .eq('id', imageId)

    if (error) throw error

    // También intentar eliminar del storage si tenemos la URL
    if (imageUrl) {
      const path = imageUrl.split('/product-images/')[1]
      if (path) {
        await supabaseAdmin.storage
          .from('product-images')
          .remove([path])
      }
    }

    return { success: true }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
