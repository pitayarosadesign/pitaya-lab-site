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
    const { data: store, error } = await supabaseAdmin
      .from('commerce_stores')
      .update({
        name: body.name,
        type: body.type,
        commission: Number(body.commission),
        contact_name: body.contact_name || null,
        phone: body.phone || null,
        email: body.email || null,
        location_code: body.location_code || null,
        address: body.address || null,
        notes: body.notes || null,
        is_active: body.is_active !== false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', body.id)
      .select()
      .single()

    if (error) throw error

    // Sincronizar nombre en inventory_locations
    await supabaseAdmin
      .from('inventory_locations')
      .update({
        name: store.name,
        short_name: store.location_code || store.name.substring(0, 10),
        is_active: store.is_active,
      })
      .eq('store_id', store.id)

    return { success: true, store }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
