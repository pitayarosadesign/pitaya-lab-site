import { createClient } from '@supabase/supabase-js'

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
    const { error } = await supabaseAdmin
      .from('coupons')
      .update({
        code: String(body.code || '').trim().toUpperCase(),
        discount_type: body.discount_type,
        discount_value: Number(body.discount_value),
        minimum_order_amount: Number(body.minimum_order_amount) || 0,
        usage_limit: Number(body.usage_limit) || null,
        ends_at: body.ends_at || null,
        is_active: body.is_active !== false,
      })
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
