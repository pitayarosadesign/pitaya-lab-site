// 💬 Admin - Eliminar reseña
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

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const { error } = await supabaseAdmin
    .from('reviews')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error eliminando reseña:', error)
    throw createError({ statusCode: 500, message: error.message })
  }

  return { success: true }
})
