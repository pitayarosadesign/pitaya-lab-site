/**
 * Utilidades para optimizar imágenes servidas desde Supabase Storage.
 *
 * Las imágenes de productos se sirven a través de un proxy local
 * (/api/image-proxy) que las redimensiona y convierte a WebP con `sharp`,
 * reduciendo drásticamente su peso en móvil y escritorio.
 */

/**
 * Convierte una URL pública de Supabase Storage (object/public) a una URL
 * del proxy de imágenes optimizado.
 *
 * Si la URL no pertenece a Supabase Storage (p. ej. una URL externa o local),
 * se devuelve tal cual.
 *
 * @param url URL original de la imagen
 * @param width Ancho objetivo en px
 * @param height Alto objetivo en px
 * @returns URL optimizada
 */
export function optimizeImageUrl(url: string | null | undefined, width = 600, height = 600): string {
  if (!url) return ''

  // Solo transformar URLs de Supabase Storage
  const marker = '/storage/v1/object/public/'
  const idx = url.indexOf(marker)
  if (idx === -1) return url

  // Extraer la ruta dentro del bucket (product-images/<path>)
  const fullPath = url.slice(idx + marker.length)

  // Quitar el prefijo del bucket "product-images/" para obtener el path real
  const bucketPrefix = 'product-images/'
  const path = fullPath.startsWith(bucketPrefix)
    ? fullPath.slice(bucketPrefix.length)
    : fullPath

  // Construir URL del proxy de imágenes
  return `/api/image-proxy?path=${encodeURIComponent(path)}&w=${width}&h=${height}`
}

/**
 * Versión para listas/thumbnails (más pequeña).
 */
export function optimizeThumbUrl(url: string | null | undefined): string {
  return optimizeImageUrl(url, 400, 400)
}

/**
 * Versión para imagen principal / detalle (mediana).
 */
export function optimizeDetailUrl(url: string | null | undefined): string {
  return optimizeImageUrl(url, 800, 800)
}

