import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Crear cliente con service role (salta RLS)
  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  )

  try {
    // 1. Insertar producto
    const { data: product, error } = await supabaseAdmin
      .from('products')
      .insert(body.product)
      .select()
      .single()

    if (error) throw error

    // 2. Subir imágenes si hay
    const images = []
    if (body.images && body.images.length > 0) {
      for (let i = 0; i < body.images.length; i++) {
        const img = body.images[i]
        const ext = img.name.split('.').pop()
        const filePath = `${product.id}/${i}.${ext}`
        
        // Convertir base64 a buffer
        const base64Data = img.data.replace(/^data:image\/\w+;base64,/, '')
        const buffer = Buffer.from(base64Data, 'base64')

        const { error: uploadError } = await supabaseAdmin.storage
          .from('product-images')
          .upload(filePath, buffer, {
            contentType: img.type,
            cacheControl: '31536000',
            upsert: false,
          })

        if (uploadError) throw uploadError

        const { data: publicUrl } = supabaseAdmin.storage
          .from('product-images')
          .getPublicUrl(filePath)

        images.push({
          product_id: product.id,
          url: publicUrl.publicUrl,
          alt_text: body.product.name,
          sort_order: i,
          is_primary: i === 0,
        })
      }

      if (images.length > 0) {
        const { error: imgError } = await supabaseAdmin
          .from('product_images')
          .insert(images)
        if (imgError) throw imgError
      }
    }

    // 3. Insertar variantes
    if (body.variants && body.variants.length > 0) {
      const variants = body.variants.map(v => ({
        product_id: product.id,
        name: v.name,
        sku: `${body.product.sku}-${v.sku}`,
        price: v.price ? parseFloat(v.price) : null,
        sort_order: body.variants.indexOf(v),
      }))

      const { error: varError } = await supabaseAdmin
        .from('product_variants')
        .insert(variants)
      if (varError) throw varError
    }

    return { success: true, product }
  } catch (e) {
    throw createError({
      statusCode: 500,
      message: e.message,
    })
  }
})
