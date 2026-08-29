// 💬 Admin - Actualizar reseña (aprobar)
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, message: 'Falta el id de la reseña' })
  }

  if (!config.public.supabaseUrl || !config.supabaseServiceKey) {
    throw createError({ statusCode: 500, message: 'Supabase no configurado' })
  }

  const body = await readBody(event)
  const status = body.status || 'approved' // 'approved' | 'pending'

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const { data, error } = await supabaseAdmin
    .from('reviews')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    console.error('Error actualizando reseña:', error)
    throw createError({ statusCode: 500, message: error.message })
  }

  return { review: data }
})
