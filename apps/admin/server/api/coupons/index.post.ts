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
    const { data: coupon, error } = await supabaseAdmin
      .from('coupons')
      .insert({
        code: String(body.code || '').trim().toUpperCase(),
        discount_type: body.discount_type,
        discount_value: Number(body.discount_value),
        minimum_order_amount: Number(body.minimum_order_amount) || 0,
        usage_limit: Number(body.usage_limit) || null,
        ends_at: body.ends_at || null,
        is_active: body.is_active !== false,
      })
      .select()
      .single()

    if (error) throw error

    return { success: true, coupon }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
