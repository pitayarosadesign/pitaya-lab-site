/**
 * useOptimizedImage
 * ----------------
 * Optimiza URLs de imágenes de Supabase Storage usando las transformaciones
 * de imagen del servidor (render/image). Esto reduce drásticamente el peso
 * de las imágenes que se sirven al navegador (p. ej. una imagen de 572 KB
 * pasa a ~41 KB con width=400&quality=80), acelerando la carga de la tienda.
 *
 * IMPORTANTE sobre `resize=contain`:
 * Supabase Image Transformations NO mantiene la proporción si solo se pasa
 * `width` (p. ej. width=200 en una imagen de 2400x1792 devuelve 200x1792,
 * deformando la imagen). Por eso usamos `resize=contain`, que sí mantiene la
 * proporción original y solo limita la imagen para que quepa en el ancho/alto
 * dados. Esto evita que las miniaturas y tarjetas se vean "con zoom/alargadas".
 *
 * Solo transforma URLs que apunten al endpoint público de Supabase Storage
 * (`/storage/v1/object/public/`). Cualquier otra URL (externa, /images/ local,
 * etc.) se devuelve tal cual.
 *
 * Uso:
 *   const src = useOptimizedImage(url, { width: 800, quality: 80 })
 *   // o en template: :src="useOptimizedImage(imageUrl, { width: 600 })"
 */

const SUPABASE_STORAGE_MARKER = '/storage/v1/object/public/'

export function useOptimizedImage(
  url?: string | null,
  opts: { width?: number; height?: number; quality?: number; format?: string } = {}
): string {
  if (!url) return ''

  // Solo optimizar URLs de Supabase Storage público
  if (!url.includes(SUPABASE_STORAGE_MARKER)) return url

  // Si la URL ya tiene parámetros de transformación, no duplicar
  if (url.includes('?')) return url

  const params = new URLSearchParams()

  // `resize=contain` mantiene la proporción original (clave para no deformar)
  params.set('resize', 'contain')

  if (opts.width) params.set('width', String(opts.width))
  if (opts.height) params.set('height', String(opts.height))
  if (opts.quality) params.set('quality', String(opts.quality))
  if (opts.format) params.set('format', opts.format)

  // Convertir /storage/v1/object/public/ → /storage/v1/render/image/public/
  const optimized = url.replace(SUPABASE_STORAGE_MARKER, '/storage/v1/render/image/public/')

  const qs = params.toString()
  return qs ? `${optimized}?${qs}` : optimized
}
