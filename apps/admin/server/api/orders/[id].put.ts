import { createClient } from '@supabase/supabase-js'

// 📦 Actualiza una orden (guía de rastreo, estado, etc.) usando service_role
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
    const { data, error } = await supabaseAdmin
      .from('orders')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)

    return { order: data }
  } catch (e) {
    console.error('Error en API order update:', e)
    throw createError({ statusCode: 500, message: e.message })
  }
})
