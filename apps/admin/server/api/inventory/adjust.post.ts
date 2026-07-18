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
      product_id: body.productId,
      type: body.type,
      quantity: Number(body.quantity),
      reason: body.reason,
      note: body.note || null,
      from_location: body.fromLocation || null,
      to_location: body.toLocation || null,
      created_by: 'admin',
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
