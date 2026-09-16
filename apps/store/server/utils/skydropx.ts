// Integración con Skydropx (https://api-pro.skydropx.com/api/v1)
// - Autenticación OAuth client_credentials (token cacheado, expira en 2 h).
// - Cotización de envíos: crea una quotation y hace polling hasta completarse.
// - Origen: plantilla de dirección "from" por defecto de la cuenta Skydropx.

const SKYDROPX_BASE = 'https://api-pro.skydropx.com/api/v1'
const PREFERRED_CARRIERS = ['paquetexpress', 'estafeta', 'fedex']

let tokenCache: { token: string; expiresAt: number } | null = null
let originTemplateId: string | null = null

async function skydropxFetch<T = any>(
  path: string,
  token: string,
  options: { method?: string; body?: any } = {}
): Promise<T> {
  const res = await fetch(`${SKYDROPX_BASE}${path}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  const text = await res.text()
  let data: any = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }

  if (!res.ok) {
    const detail = (data?.message || data?.error || text || '').toString().slice(0, 200)
    throw createError({ statusCode: 502, message: `Skydropx: ${res.status} ${detail}` })
  }

  return data as T
}

export async function getSkydropxToken(): Promise<string> {
  const config = useRuntimeConfig()
  const now = Date.now()
  if (tokenCache && tokenCache.expiresAt > now + 60_000) return tokenCache.token

  const data = await skydropxFetch<{ access_token: string; expires_in?: number }>(
    '/oauth/token',
    '',
    {
      method: 'POST',
      body: {
        grant_type: 'client_credentials',
        client_id: config.skydropxApiKey,
        client_secret: config.skydropxApiSecretKey,
      },
    }
  )

  tokenCache = { token: data.access_token, expiresAt: now + (data.expires_in || 7200) * 1000 }
  return tokenCache.token
}

async function getOriginTemplateId(): Promise<string> {
  if (originTemplateId) return originTemplateId

  const token = await getSkydropxToken()
  const res = await skydropxFetch<{ data: any[] }>('/address_templates', token)
  const list = res?.data || []
  const from =
    list.find((a) => a.address_type === 'from' && a.default) ||
    list.find((a) => a.address_type === 'from')

  originTemplateId = from?.id || null
  if (!originTemplateId) {
    throw createError({ statusCode: 400, message: 'No hay dirección de origen configurada en Skydropx' })
  }
  return originTemplateId
}

export interface SkydropxParcel {
  length: number
  width: number
  height: number
  weight: number
}

export interface SkydropxRate {
  id: string
  carrier: string
  carrierDisplay: string
  service: string
  days: number | null
  total: number
}

export async function quoteSkydropx(
  address: { postal_code: string; area_level1: string; area_level2: string; area_level3: string },
  parcels: SkydropxParcel[]
): Promise<SkydropxRate[]> {
  const token = await getSkydropxToken()
  const fromId = await getOriginTemplateId()

  const created = await skydropxFetch<any>('/quotations', token, {
    method: 'POST',
    body: {
      quotation: {
        address_from: { address_template_id: fromId },
        address_to: {
          country_code: 'MX',
          postal_code: address.postal_code,
          area_level1: address.area_level1,
          area_level2: address.area_level2,
          area_level3: address.area_level3,
        },
        parcels,
        requested_carriers: PREFERRED_CARRIERS,
      },
    },
  })

  const quotationId = created?.id
  if (!quotationId) {
    throw createError({ statusCode: 502, message: 'Skydropx no devolvió una cotización válida' })
  }

  // Skydropx calcula las tarifas de forma asíncrona; se consultan hasta completarse.
  for (let i = 0; i < 10; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const q = await skydropxFetch<any>(`/quotations/${quotationId}`, token)
    if (q?.is_completed) {
      return (q.rates || [])
        .filter((r: any) => r.success && r.total != null)
        .map((r: any) => ({
          id: r.id,
          carrier: r.provider_name,
          carrierDisplay: r.provider_display_name,
          service: r.provider_service_name,
          days: r.days,
          total: Number(r.total),
        }))
    }
  }

  throw createError({ statusCode: 502, message: 'La cotización de Skydropx no se completó a tiempo' })
}

export interface SkydropxShipmentResult {
  id: string
  carrier: string
  trackingNumber: string | null
  status: string | null
}

export async function createSkydropxShipment(params: {
  rateId: string
  packageCount: number
  recipient: { name: string; street: string; phone: string; email: string }
}): Promise<SkydropxShipmentResult> {
  const token = await getSkydropxToken()
  const fromId = await getOriginTemplateId()

  const packages = Array.from({ length: Math.max(1, params.packageCount) }, (_, i) => ({
    package_number: String(i + 1),
    package_protected: false,
  }))

  const res = await skydropxFetch<any>('/shipments', token, {
    method: 'POST',
    body: {
      shipment: {
        rate_id: params.rateId,
        unique_shipment: true,
        printing_format: 'standard',
        address_from: { address_template_id: fromId },
        address_to: {
          name: params.recipient.name,
          street1: params.recipient.street,
          phone: params.recipient.phone,
          email: params.recipient.email,
          company: params.recipient.name,
        },
        packages,
      },
    },
  })

  const attrs = res?.data?.attributes || res?.attributes || res || {}
  return {
    id: attrs.id || res?.data?.id || '',
    carrier: attrs.carrier_name || '',
    trackingNumber: attrs.master_tracking_number || null,
    status: attrs.workflow_status || null,
  }
}
