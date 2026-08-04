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
    const { id, ...fields } = body

    if (!id) throw createError({ statusCode: 400, message: 'Falta el id del envase' })

    // Preparar campos a actualizar
    const updateData: any = { updated_at: new Date().toISOString() }
    if (fields.slug !== undefined) updateData.slug = fields.slug
    if (fields.nombre !== undefined) updateData.nombre = fields.nombre
    if (fields.descripcion !== undefined) updateData.descripcion = fields.descripcion
    if (fields.capacidad !== undefined) updateData.capacidad = fields.capacidad
    if (fields.material !== undefined) updateData.material = fields.material
    if (fields.precio_base !== undefined) updateData.precio_base = parseFloat(fields.precio_base)
    if (fields.stock !== undefined) updateData.stock = parseInt(fields.stock)
    if (fields.ficha_tecnica !== undefined) updateData.ficha_tecnica = fields.ficha_tecnica
    if (fields.is_active !== undefined) updateData.is_active = fields.is_active
    if (fields.sort_order !== undefined) updateData.sort_order = parseInt(fields.sort_order)

    // Subir nueva imagen si viene
    if (fields.image) {
      const ext = (fields.image.name || 'png').split('.').pop()
      const filePath = `recuerdo-envases/${id}.${ext}`

      const base64Data = fields.image.data.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')

      const { error: uploadError } = await supabaseAdmin.storage
        .from('product-images')
        .upload(filePath, buffer, {
          contentType: fields.image.type,
          cacheControl: '31536000',
          upsert: true,
        })

      if (uploadError) throw uploadError

      const { data: publicUrl } = supabaseAdmin.storage
        .from('product-images')
        .getPublicUrl(filePath)

      updateData.image_url = publicUrl.publicUrl
    }

    const { data, error } = await supabaseAdmin
      .from('recuerdo_envases')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return { success: true, envase: data }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
