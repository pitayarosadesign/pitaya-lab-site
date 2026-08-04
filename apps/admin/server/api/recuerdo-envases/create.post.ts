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
    // 1. Insertar envase
    const { data: envase, error } = await supabaseAdmin
      .from('recuerdo_envases')
      .insert({
        slug: body.slug,
        nombre: body.nombre,
        descripcion: body.descripcion || null,
        capacidad: body.capacidad || null,
        material: body.material || null,
        precio_base: parseFloat(body.precio_base) || 85,
        stock: parseInt(body.stock) || 0,
        ficha_tecnica: body.ficha_tecnica || null,
        is_active: body.is_active !== false,
        sort_order: parseInt(body.sort_order) || 0,
      })
      .select()
      .single()

    if (error) throw error

    // 2. Subir imagen si hay
    if (body.image) {
      const ext = (body.image.name || 'png').split('.').pop()
      const filePath = `recuerdo-envases/${envase.id}.${ext}`

      const base64Data = body.image.data.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')

      const { error: uploadError } = await supabaseAdmin.storage
        .from('product-images')
        .upload(filePath, buffer, {
          contentType: body.image.type,
          cacheControl: '31536000',
          upsert: true,
        })

      if (uploadError) throw uploadError

      const { data: publicUrl } = supabaseAdmin.storage
        .from('product-images')
        .getPublicUrl(filePath)

      // Actualizar envase con la URL de la imagen
      await supabaseAdmin
        .from('recuerdo_envases')
        .update({ image_url: publicUrl.publicUrl, updated_at: new Date().toISOString() })
        .eq('id', envase.id)

      envase.image_url = publicUrl.publicUrl
    }

    return { success: true, envase }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
