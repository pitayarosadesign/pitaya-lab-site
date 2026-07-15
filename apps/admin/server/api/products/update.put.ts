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
    const { id, product, images } = body

    // 1. Actualizar producto
    const { error } = await supabaseAdmin
      .from('products')
      .update(product)
      .eq('id', id)

    if (error) throw error

    // 2. Si hay imágenes nuevas para subir
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const img = images[i]

        if (img._new && img.data) {
          const ext = (img.name || 'image.png').split('.').pop()
          const filePath = `${id}/${Date.now()}.${ext}`
          const base64Data = img.data.replace(/^data:image\/\w+;base64,/, '')
          const buffer = Buffer.from(base64Data, 'base64')

          const { error: uploadError } = await supabaseAdmin.storage
            .from('product-images')
            .upload(filePath, buffer, {
              contentType: img.type || 'image/png',
              cacheControl: '31536000',
              upsert: false,
            })

          if (uploadError) throw uploadError

          const { data: publicUrl } = supabaseAdmin.storage
            .from('product-images')
            .getPublicUrl(filePath)

          await supabaseAdmin.from('product_images').insert({
            product_id: id,
            url: publicUrl.publicUrl,
            alt_text: product.name || '',
            sort_order: 999,
            is_primary: img.is_primary || false,
          })
        }
      }
    }

    // 3. Actualizar is_primary de imágenes existentes
    if (images) {
      for (const img of images) {
        if (img.id && !img._new) {
          await supabaseAdmin
            .from('product_images')
            .update({ is_primary: img.is_primary })
            .eq('id', img.id)
        }
      }
    }

    return { success: true }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
