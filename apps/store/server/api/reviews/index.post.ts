import { createClient } from '@supabase/supabase-js'

// ⭐ PITAYA LAB — API de reseñas (store)
// Recibe la reseña que el cliente envía desde la página /resena y la guarda
// en la tabla `reviews` de Supabase con status='pending' (pendiente de aprobación).
// Si el cliente sube una foto, la sube al bucket público 'product-images' de
// Supabase Storage y guarda su URL. La dueña la aprueba desde el panel admin.

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.public.supabaseUrl || !config.supabaseServiceKey) {
    console.warn('Supabase no configurado, no se puede guardar la reseña')
    throw createError({ statusCode: 500, message: 'El sistema de reseñas no está configurado. Intenta más tarde.' })
  }

  const body = await readBody(event).catch(() => ({}))
  const name = (body.name || '').trim()
  const comment = (body.comment || '').trim()
  const rating = Math.min(5, Math.max(1, Number(body.rating) || 5))

  // Validar campos obligatorios
  if (!name) {
    throw createError({ statusCode: 400, message: 'El nombre es obligatorio.' })
  }
  if (!comment) {
    throw createError({ statusCode: 400, message: 'El comentario es obligatorio.' })
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  // Subir la foto si el cliente la proporcionó (base64)
  let imageUrl = null
  const photo = body.photo // { name, data (base64) }
  if (photo?.data && photo?.name) {
    try {
      const ext = (photo.name.split('.').pop() || 'jpg').toLowerCase()
      const allowedExt = ['png', 'jpeg', 'jpg', 'webp', 'gif']
      if (allowedExt.includes(ext)) {
        const base64Data = photo.data.replace(/^data:.*?;base64,/, '')
        const buffer = Buffer.from(base64Data, 'base64')
        const timestamp = Date.now()
        const sanitized = photo.name.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase()
        const filePath = `reviews/${timestamp}-${sanitized}`

        const contentTypeMap = {
          png: 'image/png', jpeg: 'image/jpeg', jpg: 'image/jpeg',
          webp: 'image/webp', gif: 'image/gif',
        }

        const { error: uploadError } = await supabaseAdmin.storage
          .from('product-images')
          .upload(filePath, buffer, {
            contentType: contentTypeMap[ext] || 'application/octet-stream',
            cacheControl: '31536000',
            upsert: false,
          })

        if (!uploadError) {
          const { data: publicUrl } = supabaseAdmin.storage
            .from('product-images')
            .getPublicUrl(filePath)
          imageUrl = publicUrl?.publicUrl || null
        } else {
          console.error('Error subiendo foto de reseña:', uploadError)
        }
      }
    } catch (uploadEx) {
      console.error('Error procesando foto de reseña:', uploadEx)
    }
  }

  // Guardar la reseña en la tabla (status default 'pending')
  const { data, error } = await supabaseAdmin
    .from('reviews')
    .insert({
      name,
      email: (body.email || '').trim() || null,
      product: (body.product || '').trim() || null,
      rating,
      comment,
      image_url: imageUrl,
      status: 'pending',
    })
    .select('id, status')
    .single()

  if (error) {
    console.error('Error guardando reseña:', error)
    throw createError({ statusCode: 500, message: 'No se pudo guardar tu reseña. Intenta más tarde.' })
  }

  return { success: true, id: data?.id, status: data?.status, message: 'Reseña recibida. ¡Gracias!' }
})
