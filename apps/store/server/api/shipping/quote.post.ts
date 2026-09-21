/**
 * POST /api/shipping/quote
 * ------------------------
 * Cotiza en vivo con Envía.com los 3 métodos de envío preferidos:
 *   1. Paquete Express   -> paquetexpress / ground      (puerta a puerta)
 *   2. Envío Estándar    -> paquetexpress / ground_do   (sucursal -> domicilio)
 *   3. Punto Post        -> puntopost    / Send C2C     (sucursal -> sucursal)
 *
 * Origen (bodega PITAYA LAB) definido como constantes. El destino se recibe
 * como código postal y se resuelve a ciudad/estado con el Geocodes API de
 * Envía.com, de modo que el checkout solo pida el CP.
 */

const ENVIA_SHIPPING_API = 'https://api.envia.com'
const ENVIA_GEOCODES_API = 'https://geocodes.envia.com'

// Bodega PITAYA LAB (Zapopan, Jalisco)
const ORIGIN = {
  name: 'Pitaya Lab',
  phone: '3312345678',
  street: 'Av. Mariano Otero',
  number: '',
  district: 'Mariano Otero',
  city: 'Zapopan',
  state: 'JA',
  country: 'MX',
  postalCode: '45236',
  phone_code: 'MX',
}

// Respaldo cuando un producto no tiene medidas de envío (todos deberían tenerlas).
const DEFAULT_PACKAGE = { weightKg: 1, lengthCm: 20, widthCm: 20, heightCm: 15 }

// Métodos preferidos -> servicio a extraer de la respuesta de Envía.com
const METHODS = {
  express: { carrier: 'paquetexpress', service: 'ground', label: 'Paquete Express' },
  standard: { carrier: 'paquetexpress', service: 'ground_do', label: 'Envío Estándar' },
  pointPost: { carrier: 'puntopost', service: 'Send C2C', label: 'Punto Post' },
}

function enviaHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    // Cloudflare en Envía.com bloquea user-agents de bots (p. ej. undici).
    'User-Agent': 'PitayaLab/1.0 (https://www.pitayalab.com.mx)',
  }
}

// Resuelve CP -> { city, state, country } usando el Geocodes API de Envía.com
async function resolveZipcode(zipcode: string, token: string) {
  const res = await fetch(`${ENVIA_GEOCODES_API}/zipcode/MX/${encodeURIComponent(zipcode)}`, {
    headers: enviaHeaders(token),
  })
  const json = await res.json()
  if (json?.success && json?.data) {
    return { city: json.data.city, state: json.data.state, country: json.data.country || 'MX' }
  }
  return null
}

// Cotiza un carrier y devuelve el rate que coincide con el servicio deseado
async function quoteCarrier(carrier: string, service: string, payload: any, token: string) {
  const body = { ...payload, shipment: { type: 1, import: 0, carrier } }
  const res = await fetch(`${ENVIA_SHIPPING_API}/ship/rate/`, {
    method: 'POST',
    headers: enviaHeaders(token),
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (!res.ok || json?.error) {
    return { error: json?.error?.message || `HTTP ${res.status}` }
  }
  const rates = Array.isArray(json?.data) ? json.data : []
  const match = rates.find(r => r.service === service)
  if (!match) {
    return { error: `Servicio ${service} no disponible` }
  }
  return {
    carrier,
    service: match.service,
    serviceDescription: match.serviceDescription || '',
    dropOffDescription: match.dropOffDescription || '',
    deliveryEstimate: match.deliveryEstimate || '',
    deliveryDate: match.deliveryDate?.date || null,
    price: match.totalPrice ?? match.basePrice ?? 0,
    currency: match.currency || 'MXN',
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = config.enviaApiKey

  if (!token) {
    throw createError({ statusCode: 503, message: 'Envía.com no está configurado' })
  }

  const body = await readBody(event)
  const postalCode = String(body?.postalCode || '').trim()
  const items = Array.isArray(body?.items) ? body.items : []

  if (!/^\d{5}$/.test(postalCode)) {
    throw createError({ statusCode: 400, message: 'Código postal inválido' })
  }

  // Resolver ciudad/estado desde el CP (o usar lo que mande el cliente)
  const resolved = await resolveZipcode(postalCode, token)
  if (!resolved && !body?.state) {
    throw createError({ statusCode: 404, message: 'No se pudo validar el código postal' })
  }

  const destination = {
    name: body?.name || 'Cliente',
    phone: body?.phone || '0000000000',
    street: body?.street || 'Por confirmar',
    number: body?.number || '',
    district: body?.district || resolved?.city || '',
    city: body?.city || resolved?.city || '',
    state: body?.state || resolved?.state || '',
    country: 'MX',
    postalCode,
    phone_code: 'MX',
  }

  // Un paquete por ítem; medidas por defecto si el producto no las trae.
  const packages = items.map((item: any) => {
    const weight = Number(item?.weightKg) > 0 ? Number(item.weightKg) : DEFAULT_PACKAGE.weightKg
    const length = Number(item?.lengthCm) > 0 ? Number(item.lengthCm) : DEFAULT_PACKAGE.lengthCm
    const width = Number(item?.widthCm) > 0 ? Number(item.widthCm) : DEFAULT_PACKAGE.widthCm
    const height = Number(item?.heightCm) > 0 ? Number(item.heightCm) : DEFAULT_PACKAGE.heightCm
    return {
      type: 'box',
      content: item?.name ? String(item.name).slice(0, 50) : 'Producto Pitaya Lab',
      amount: Math.max(1, Number(item?.quantity) || 1),
      name: item?.name ? String(item.name).slice(0, 50) : 'Paquete estándar',
      declaredValue: Number(item?.price) > 0 ? Math.round(Number(item.price)) : 0,
      lengthUnit: 'CM',
      weightUnit: 'KG',
      weight,
      dimensions: { length, width, height },
    }
  })

  const payload = {
    origin: ORIGIN,
    destination,
    packages,
    settings: { currency: 'MXN' },
  }

  // Cotizar los 3 métodos en paralelo
  const [express, standard, pointPost] = await Promise.all([
    quoteCarrier(METHODS.express.carrier, METHODS.express.service, payload, token),
    quoteCarrier(METHODS.standard.carrier, METHODS.standard.service, payload, token),
    quoteCarrier(METHODS.pointPost.carrier, METHODS.pointPost.service, payload, token),
  ])

  return {
    postalCode,
    destination: { city: destination.city, state: destination.state, country: 'MX' },
    methods: {
      express: { ...METHODS.express, ...express },
      standard: { ...METHODS.standard, ...standard },
      pointPost: { ...METHODS.pointPost, ...pointPost },
    },
  }
})
