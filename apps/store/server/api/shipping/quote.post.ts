import { createClient } from '@supabase/supabase-js'
import { quoteSkydropx } from '../../utils/skydropx'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.skydropxApiKey || !config.skydropxApiSecretKey) {
    throw createError({ statusCode: 500, message: 'Envío no configurado (Skydropx)' })
  }

  const body = await readBody(event)
  const { postal_code, area_level1, area_level2, area_level3, items } = body || {}

  if (!postal_code || !area_level1 || !area_level2 || !area_level3) {
    throw createError({ statusCode: 400, message: 'Completa tu dirección de entrega' })
  }
  if (!items || items.length === 0) {
    throw createError({ statusCode: 400, message: 'El carrito está vacío' })
  }

  // Peso y dimensiones de cada producto para armar los paquetes.
  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const ids = [...new Set(items.map((i: any) => String(i.id)))]
  const { data: products, error } = await supabaseAdmin
    .from('products')
    .select('id, weight_kg, length_cm, width_cm, height_cm')
    .in('id', ids)

  if (error) {
    throw createError({ statusCode: 500, message: 'No se pudieron cargar los productos' })
  }

  const byId = new Map((products || []).map((p: any) => [String(p.id), p]))

  // Un paquete por línea de carrito, sumando el peso de las cantidades.
  const parcels = items.map((item: any) => {
    const p = byId.get(String(item.id))
    const qty = Math.max(1, Number(item.quantity) || 1)
    return {
      length: Number(p?.length_cm) || 15,
      width: Number(p?.width_cm) || 15,
      height: Number(p?.height_cm) || 15,
      weight: Number((((p?.weight_kg ?? 0.5) * qty) * 1).toFixed(2)),
    }
  })

  const rates = await quoteSkydropx(
    { postal_code, area_level1, area_level2, area_level3 },
    parcels
  )

  return { rates, parcels_count: parcels.length }
})
