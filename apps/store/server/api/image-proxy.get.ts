import { createClient } from '@supabase/supabase-js'
import sharp from 'sharp'

/**
 * Proxy de imágenes que redimensiona y optimiza (WebP) las imágenes
 * de productos almacenadas en Supabase Storage.
 *
 * Uso: /api/image-proxy?path=<ruta-en-bucket>&w=400&h=400
 *
 * Esto reduce drásticamente el peso de las imágenes en móvil y escritorio,
 * mejorando el tiempo de carga de la tienda sin depender de la
 * transformación de imágenes de Supabase.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { path, w, h, q } = getQuery(event)

  if (!path) {
    throw createError({ statusCode: 400, message: 'Falta el parámetro path' })
  }

  const width = parseInt(w) || 600
  const height = parseInt(h) || 600
  const quality = parseInt(q) || 80

  // Clave de cache única por imagen y tamaño
  const cacheKey = `img:${path}:${width}x${height}:q${quality}`

  // Intentar servir desde cache
  const storage = useStorage('cache')
  const cached = await storage.getItemRaw(cacheKey)
  if (cached) {
    setResponseHeader(event, 'Content-Type', 'image/webp')
    setResponseHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
    return cached
  }

  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    // Descargar la imagen original desde Supabase Storage
    const { data, error } = await supabase.storage
      .from('product-images')
      .download(String(path))

    if (error || !data) {
      throw createError({ statusCode: 404, message: 'Imagen no encontrada' })
    }

    const buffer = Buffer.from(await data.arrayBuffer())

    // Redimensionar y convertir a WebP
    const optimized = await sharp(buffer)
      .resize(width, height, { fit: 'cover', withoutEnlargement: true })
      .webp({ quality })
      .toBuffer()

    // Guardar en cache
    await storage.setItemRaw(cacheKey, optimized)

    // Devolver la imagen optimizada
    setResponseHeader(event, 'Content-Type', 'image/webp')
    setResponseHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
    return optimized
  } catch (e) {
    if (e.statusCode) throw e
    throw createError({ statusCode: 500, message: e.message })
  }
})
