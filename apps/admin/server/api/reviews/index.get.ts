// 💬 Admin - Listar reseñas de clientes (todas, incluyendo pendientes)
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.public.supabaseUrl || !config.supabaseServiceKey) {
    throw createError({ statusCode: 500, message: 'Supabase no configurado' })
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const query = getQuery(event)
  const status = query.status || null // 'pending' | 'approved' | null (todas)

  let supabaseQuery = supabaseAdmin
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })

  if (status && (status === 'pending' || status === 'approved')) {
    supabaseQuery = supabaseQuery.eq('status', status)
  }

  const { data, error } = await supabaseQuery

  if (error) {
    console.error('Error listando reseñas:', error)
    throw createError({ statusCode: 500, message: error.message })
  }

  return { reviews: data || [] }
})
