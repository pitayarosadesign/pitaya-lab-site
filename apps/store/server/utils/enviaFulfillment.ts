// Integración con Envía Fulfillment (https://apifulfillment.envia.com)
// - Autenticación: Bearer Token (Authorization: Bearer <token>).
// - TODAS las rutas llevan prefijo /company/{companyId}.
// - companyId se obtiene de GET /auth/me (companies[].id) y se cachea en memoria.

const ENVIA_FULFILLMENT_PROD = 'https://apifulfillment.envia.com'

let cachedCompanyId: string | null = null
let cachedWarehouseId: string | null = null

function enviaFulfillmentBase(): string {
  const config = useRuntimeConfig()
  return config.enviaFulfillmentApiBase || ENVIA_FULFILLMENT_PROD
}

async function enviaFulfillmentFetch<T = any>(
  path: string,
  options: { method?: string; body?: any } = {}
): Promise<T> {
  const config = useRuntimeConfig()
  const token = config.enviaFulfillmentToken
  if (!token) {
    throw createError({ statusCode: 500, message: 'ENVIA_FULFILLMENT_TOKEN no está configurado.' })
  }

  const res = await fetch(`${enviaFulfillmentBase()}${path}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
    throw createError({ statusCode: 502, message: `Envía Fulfillment: ${res.status} ${detail}` })
  }

  return data as T
}

export async function listEnviaFulfillmentCompanies(): Promise<any[]> {
  const me = await enviaFulfillmentFetch<any>('/auth/me')
  if (Array.isArray(me)) return me
  const companies = me?.companies || me?.data?.companies || me?.user?.companies || []
  return Array.isArray(companies) ? companies : []
}

export async function getEnviaFulfillmentCompanyId(): Promise<string> {
  const config = useRuntimeConfig()
  if (config.enviaFulfillmentCompanyId) return config.enviaFulfillmentCompanyId
  if (cachedCompanyId) return cachedCompanyId

  const companies = await listEnviaFulfillmentCompanies()
  const id = companies[0]?.id ?? null
  if (!id) {
    throw createError({ statusCode: 500, message: 'No se pudo obtener companyId desde GET /auth/me.' })
  }
  cachedCompanyId = String(id)
  return cachedCompanyId
}

export async function createEnviaFulfillmentOrder(payload: Record<string, any>): Promise<any> {
  const companyId = await getEnviaFulfillmentCompanyId()
  // La API recibe un arreglo de órdenes; mandamos una sola.
  return enviaFulfillmentFetch(`/company/${companyId}/client/order/create`, {
    method: 'POST',
    body: [payload],
  })
}

export async function getEnviaFulfillmentWarehouseId(): Promise<string> {
  const config = useRuntimeConfig()
  if (config.enviaFulfillmentWarehouseId) return String(config.enviaFulfillmentWarehouseId)
  if (cachedWarehouseId) return cachedWarehouseId

  const me = await enviaFulfillmentFetch<any>('/auth/me')
  const warehouses =
    me?.companies?.[0]?.warehouses || me?.warehouses || me?.data?.warehouses || []
  const id = warehouses[0]?.id ?? null
  if (!id) {
    throw createError({ statusCode: 500, message: 'No se pudo obtener warehouseId.' })
  }
  cachedWarehouseId = String(id)
  return cachedWarehouseId
}

export async function fetchEnviaFulfillmentInventoryRaw(): Promise<any> {
  const companyId = await getEnviaFulfillmentCompanyId()
  const warehouseId = await getEnviaFulfillmentWarehouseId()
  return enviaFulfillmentFetch<any>(
    `/company/${companyId}/warehouse/inventory?warehouseId=${warehouseId}`
  )
}

export async function listEnviaFulfillmentInventory(): Promise<any[]> {
  const res = await fetchEnviaFulfillmentInventoryRaw()
  if (Array.isArray(res)) return res
  return res?.products || res?.data || res?.items || res?.inventory || []
}
