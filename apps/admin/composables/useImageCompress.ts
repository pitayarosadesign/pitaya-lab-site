// Utilidad compartida para optimizar imágenes en el navegador antes de
// subirlas al servidor (redimensiona a un máximo y comprime a JPEG/PNG).
//
// Motivación: subir las fotos originales de cámara/teléfono (varios MB cada
// una) en base64 provoca el error 413 (Payload Too Large) al guardar. Al
// optimizarlas en el cliente, el body se mantiene pequeño y la tienda recibe
// imágenes en tamaño/peso justos.

/**
 * Redimensiona y comprime una imagen manteniendo su relación de aspecto.
 * @param file Archivo de imagen original.
 * @param maxSize Lado mayor máximo en píxeles (por defecto 1600).
 * @returns Objeto con dataUrl (imagen optimizada), ancho y alto.
 */
export async function compressImageFile(file: File, maxSize = 1600): Promise<{ dataUrl: string; width: number; height: number }> {
  const original = await readFileAsDataURL(file)
  const img = await loadImage(original)
  let { width, height } = img

  if (width > maxSize || height > maxSize) {
    const scale = maxSize / Math.max(width, height)
    width = Math.round(width * scale)
    height = Math.round(height * scale)
  }
  width = Math.max(2, Math.round(width))
  height = Math.max(2, Math.round(height))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas no soportado en este navegador')
  // Fondo blanco para evitar transparencias negras en PNG con alfa.
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)

  if (img.width > maxSize || img.height > maxSize) {
    const ratio = Math.min(width / img.width, height / img.height)
    const w = img.width * ratio
    const h = img.height * ratio
    ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h)
  } else {
    ctx.drawImage(img, 0, 0)
  }

  // PNG solo si el original tenía transparencia; si no, JPEG 0.85.
  const isPng = /png/i.test(file.type) || /\.png$/i.test(file.name)
  const mime = isPng ? 'image/png' : 'image/jpeg'
  const dataUrl = canvas.toDataURL(mime, isPng ? 0.92 : 0.85)
  return { dataUrl, width, height }
}

/**
 * Convierte una imagen optimizada (data URL) a base64 listo para enviar al API.
 * Devuelve el string base64 (sin el prefijo `data:...;base64,`).
 */
export function compressedDataUrlToBase64(dataUrl: string): string {
  return dataUrl.replace(/^data:image\/\w+;base64,/, '')
}

/**
 * Optimiza un archivo de imagen y devuelve directamente su base64.
 * Si la optimización falla, cae al base64 del original como respaldo.
 */
export async function optimizeImageToBase64(file: File, maxSize = 1600): Promise<string> {
  try {
    const { dataUrl } = await compressImageFile(file, maxSize)
    return compressedDataUrlToBase64(dataUrl)
  } catch (err) {
    console.warn('No se pudo optimizar la imagen, se usará el original:', err)
    const original = await readFileAsDataURL(file)
    return compressedDataUrlToBase64(original)
  }
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error || new Error('No se pudo leer el archivo'))
    reader.readAsDataURL(file)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Imagen inválida'))
    img.src = src
  })
}
