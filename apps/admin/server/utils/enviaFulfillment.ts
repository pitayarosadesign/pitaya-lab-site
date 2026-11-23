// Integración con Envía Fulfillment (https://apifulfillment.envia.com)
// Copia ligera del cliente del store, para que el panel admin pueda crear
// órdenes de fulfillment (3PL) desde una venta manual.
// - Autenticación: Bearer Token.
// - Rutas con prefijo /company/{companyId}.
// - companyId se obtiene de GET /auth/me (companies[].id) y se cachea.

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

async function listEnviaFulfillmentCompanies(): Promise<any[]> {
  const me = await enviaFulfillmentFetch<any>('/auth/me')
  return me?.companies || me?.data?.companies || me?.data || []
}

export async function getEnviaFulfillmentCompanyId(): Promise<string> {
  const config = useRuntimeConfig()
  if (config.enviaFulfillmentCompanyId) return String(config.enviaFulfillmentCompanyId)
  if (cachedCompanyId) return cachedCompanyId
  const companies = await listEnviaFulfillmentCompanies()
  const id = companies?.[0]?.id ?? null
  if (id == null) {
    throw createError({ statusCode: 500, message: 'No se pudo resolver el companyId de Envía Fulfillment.' })
  }
  cachedCompanyId = String(id)
  return cachedCompanyId
}

export async function getEnviaFulfillmentWarehouseId(): Promise<string> {
  const config = useRuntimeConfig()
  if (config.enviaFulfillmentWarehouseId) return String(config.enviaFulfillmentWarehouseId)
  if (cachedWarehouseId) return cachedWarehouseId
  const me = await enviaFulfillmentFetch<any>('/auth/me')
  const warehouses = me?.companies?.[0]?.warehouses || me?.warehouses || me?.data?.warehouses || []
  const id = warehouses[0]?.id ?? null
  if (id == null) {
    throw createError({ statusCode: 500, message: 'No se pudo resolver el warehouseId de Envía Fulfillment.' })
  }
  cachedWarehouseId = String(id)
  return cachedWarehouseId
}

export async function createEnviaFulfillmentOrder(payload: any): Promise<any> {
  const companyId = await getEnviaFulfillmentCompanyId()
  return enviaFulfillmentFetch<any>(`/company/${companyId}/client/order/create`, {
    method: 'POST',
    body: payload,
  })
}
