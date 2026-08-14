import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  // Aumentar el límite del body a 50MB para permitir subir varias imágenes
  // (producto + variantes) en base64 sin que falle el guardado.
  const body = await readBody(event, { sizeLimit: 50 * 1024 * 1024 })

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

    // 3. Insertar variantes basadas en perfiles aromáticos seleccionados
    const profileIds = body.variantProfileIds || []
    if (profileIds.length > 0) {
      const { data: profiles, error: pError } = await supabaseAdmin
        .from('fragrance_profiles')
        .select('id, name, slug, subtitle')
        .in('id', profileIds)
        .eq('is_active', true)

      if (pError) throw pError

      const variants = (profiles || []).map((p, i) => ({
        product_id: product.id,
        name: p.name,
        sku: `${body.product.sku}-${p.slug.toUpperCase()}`,
        description: p.subtitle || null,
        fragrance_profile_id: p.id,
        sort_order: i,
        is_active: true,
        stock: parseInt(body.product.stock) || 0,
      }))

      if (variants.length > 0) {
        const { error: varError } = await supabaseAdmin
          .from('product_variants')
          .insert(variants)
        if (varError) throw varError
      }
    } else if (body.variants && body.variants.length > 0) {
      // Compatibilidad: variantes manuales (formato texto libre)
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
