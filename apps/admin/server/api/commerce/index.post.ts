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
    const { data, error } = await supabaseAdmin
      .from('commerce_stores')
      .insert({
        name: body.name,
        type: body.type || 'store',
        commission: Number(body.commission) || 20,
        contact_name: body.contact_name || null,
        phone: body.phone || null,
        email: body.email || null,
        location_code: body.location_code || null,
        address: body.address || null,
        notes: body.notes || null,
        is_active: body.is_active !== false,
      })
      .select()
      .single()

    if (error) throw error

    return { success: true, store: data }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
