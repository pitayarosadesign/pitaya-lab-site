// Integración con Skydropx (https://api-pro.skydropx.com/api/v1)
// - Autenticación OAuth client_credentials (token cacheado, expira en 2 h).
// - Guarda la dirección de entrega del cliente en la libreta de direcciones
//   para que el admin genere la guía manualmente con la paquetería que elija.

const SKYDROPX_BASE = 'https://api-pro.skydropx.com/api/v1'

let tokenCache: { token: string; expiresAt: number } | null = null

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

export async function createSkydropxAddressTemplate(params: {
  alias: string
  address: {
    name: string
    street1: string
    postal_code: string
    area_level1: string
    area_level2: string
    area_level3: string
    phone: string
    email: string
    reference: string
  }
}): Promise<{ id: string }> {
  const token = await getSkydropxToken()

  const res = await skydropxFetch<any>('/address_templates', token, {
    method: 'POST',
    body: {
      address_template: {
        alias_name: params.alias,
        address_type: 'to',
        default: false,
        address_attributes: {
          name: params.address.name,
          street1: params.address.street1,
          postal_code: params.address.postal_code,
          area_level1: params.address.area_level1,
          area_level2: params.address.area_level2,
          area_level3: params.address.area_level3,
          country_code: 'MX',
          phone: params.address.phone,
          email: params.address.email,
          reference: params.address.reference,
        },
      },
    },
  })

  return { id: res?.data?.id || res?.id || '' }
}
