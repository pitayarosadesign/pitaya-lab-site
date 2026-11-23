import { createClient } from '@supabase/supabase-js'
import { maybeCreateEnviaFulfillmentOrder } from '../../utils/manualOrderFulfillment'

// 📦 Actualiza una orden (guía de rastreo, estado, pago, etc.) usando service_role.
// Si el pago pasa a 'paid', intenta crear la orden en Envía Fulfillment
// (solo Almacén Central; el helper valida las condiciones y evita duplicados).
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const updatePayload: any = { ...body, updated_at: new Date().toISOString() }
    if (body?.payment_status === 'paid' && !updatePayload.paid_at) {
      updatePayload.paid_at = new Date().toISOString()
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)

    let fulfillment = null
    if (data && data.payment_status === 'paid') {
      fulfillment = await maybeCreateEnviaFulfillmentOrder(data.id)
    }

    return { order: data, fulfillment }
  } catch (e) {
    console.error('Error en API order update:', e)
    throw createError({ statusCode: 500, message: e.message })
  }
})
