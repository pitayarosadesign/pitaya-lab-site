// 🎉 Envía el correo de confirmación de entrega al cliente
// Este endpoint hace la llamada al store desde el servidor (sin CORS)
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const storeUrl = (config.public.storeUrl || 'https://www.pitayalab.com.mx').replace(/\/+$/, '')

  try {
    const res = await fetch(storeUrl + '/api/admin/send-delivered-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    return data
  } catch (e) {
    console.error('Error enviando correo de entrega:', e)
    throw createError({ statusCode: 500, message: e.message || 'Error enviando correo' })
  }
})
