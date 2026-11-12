/**
 * useOptimizedImage
 * ----------------
 * Optimiza URLs de imágenes de Supabase Storage usando las transformaciones
 * de imagen del servidor (render/image). Esto reduce drásticamente el peso
 * de las imágenes que se sirven al navegador y acelera la carga de la tienda.
 *
 * IMPORTANTE sobre `resize=contain`:
 * Supabase Image Transformations NO mantiene la proporción si solo se pasa
 * `width` (p. ej. width=200 en una imagen de 2400x1792 devuelve 200x1792,
 * deformando la imagen). Por eso usamos `resize=contain`, que sí mantiene la
 * proporción original y solo limita la imagen para que quepa en el ancho/alto
 * dados. Esto evita que las miniaturas y tarjetas se vean "con zoom/alargadas".
 *
 * CONSOLIDACIÓN DE TAMAÑOS (para frenar el consumo de la cuota de Supabase):
 * Cada combinación única de (ancho x calidad x formato) cuenta como una
 * transformación. Por eso normalizamos:
 *   - Ancho al bucket estándar más cercano por arriba: 160 / 400 / 800 / 1600 px.
 *   - Calidad fija 80 y formato WebP en todas las imágenes.
 * Así todo el sitio usa solo 4 recetas en lugar de ~12 tamaños distintos.
 *
 * Solo transforma URLs que apunten al endpoint público de Supabase Storage
 * (`/storage/v1/object/public/`). Cualquier otra URL (externa, /images/ local,
 * etc.) se devuelve tal cual.
 *
 * Uso:
 *   const src = useOptimizedImage(url, { width: 800 })
 *   // o en template: :src="useOptimizedImage(imageUrl, { width: 600 })"
 */

const SUPABASE_STORAGE_MARKER = '/storage/v1/object/public/'
const STANDARD_WIDTHS = [160, 400, 800, 1600]

function nearestStandardWidth(width?: number): number {
  if (!width || width <= 0) return 0
  for (const w of STANDARD_WIDTHS) {
    if (width <= w) return w
  }
  return STANDARD_WIDTHS[STANDARD_WIDTHS.length - 1]
}

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

  // Normalizar el ancho a un bucket estándar (reduce transformaciones únicas)
  const width = nearestStandardWidth(opts.width)
  if (width) params.set('width', String(width))

  // Receta única: calidad 80 + WebP
  params.set('quality', '80')
  params.set('format', 'webp')

  // Convertir /storage/v1/object/public/ → /storage/v1/render/image/public/
  const optimized = url.replace(SUPABASE_STORAGE_MARKER, '/storage/v1/render/image/public/')

  return `${optimized}?${params.toString()}`
}
