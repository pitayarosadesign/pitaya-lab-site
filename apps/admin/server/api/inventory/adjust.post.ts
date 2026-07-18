import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const movement = {
      product_id: body.productId || body.product_id,
      type: body.type,
      quantity: Number(body.quantity || body.qty),
      reason: body.reason,
      note: body.note || null,
      from_location: body.fromLocation || body.from_location || null,
      to_location: body.toLocation || body.to_location || null,
      created_by: 'admin',
    }

    if (!movement.product_id) {
      throw new Error('product_id es requerido')
    }

    const { data, error } = await supabaseAdmin
      .from('inventory_movements')
      .insert(movement)
      .select()

    if (error) throw error

    return { success: true, movement: data }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
