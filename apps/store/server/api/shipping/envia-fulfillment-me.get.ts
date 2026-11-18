/**
 * GET /api/shipping/envia-fulfillment-me
 * --------------------------------------
 * Prueba de conexión con Envía Fulfillment: devuelve las compañías asociadas
 * al token y el companyId resuelto. Sirve para validar las credenciales sin
 * exponer el token (se lee del servidor).
 */
export default defineEventHandler(async () => {
  try {
    const companies = await listEnviaFulfillmentCompanies()
    return { ok: true, companyId: companies[0]?.id ?? null, companies }
  } catch (e: any) {
    throw createError({
      statusCode: e?.statusCode || 500,
      message: e?.message || 'Error de conexión con Envía Fulfillment',
    })
  }
})
