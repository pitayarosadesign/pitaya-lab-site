import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const id = body?.id
  if (!id) {
    throw createError({ statusCode: 400, message: 'Se requiere el id del comercio.' })
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    // Limpiar stock por ubicación del comercio (location_id es texto, sin FK).
    await supabaseAdmin
      .from('inventory_by_location')
      .delete()
      .eq('location_id', id)

    // Borrar el comercio. El FK de inventory_locations.store_id y
    // commerce_sales.store_id es ON DELETE CASCADE, así que se limpian solos.
    const { error } = await supabaseAdmin
      .from('commerce_stores')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
