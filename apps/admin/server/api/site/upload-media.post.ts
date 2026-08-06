import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { file } = body

  if (!file?.data || !file?.name) {
    throw createError({
      statusCode: 400,
      message: 'No se recibió ningún archivo',
    })
  }

  // Validar tipo de archivo permitido
  const ext = (file.name.split('.').pop() || '').toLowerCase()
  const allowedExt = ['png', 'jpeg', 'jpg', 'webp', 'gif', 'mp4', 'webm', 'mov', 'avif']
  if (!allowedExt.includes(ext)) {
    throw createError({
      statusCode: 400,
      message: `Tipo de archivo .${ext} no permitido. Usa: ${allowedExt.join(', ')}`,
    })
  }

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
    // Decodificar base64 (soporta data URL o base64 puro)
    const base64Data = file.data.replace(/^data:.*?;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    // Ruta única para evitar colisiones
    const isVideo = ext === 'mp4' || ext === 'webm' || ext === 'mov'
    const typePrefix = isVideo ? 'video' : 'image'
    const timestamp = Date.now()
    const sanitized = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase()
    const filePath = `site-media/${typePrefix}-${timestamp}-${sanitized}`

    const contentTypeMap = {
      png: 'image/png',
      jpeg: 'image/jpeg',
      jpg: 'image/jpeg',
      webp: 'image/webp',
      gif: 'image/gif',
      avif: 'image/avif',
      mp4: 'video/mp4',
      webm: 'video/webm',
      mov: 'video/quicktime',
    }

    const { error: uploadError } = await supabaseAdmin.storage
      .from('product-images')
      .upload(filePath, buffer, {
        contentType: contentTypeMap[ext] || 'application/octet-stream',
        cacheControl: '31536000',
        upsert: false,
      })

    if (uploadError) throw uploadError

    const { data: publicUrl } = supabaseAdmin.storage
      .from('product-images')
      .getPublicUrl(filePath)

    return { success: true, url: publicUrl.publicUrl }
  } catch (e) {
    console.error('Error subiendo media del sitio:', e)
    throw createError({
      statusCode: 500,
      message: e.message || 'Error al subir el archivo',
    })
  }
})
