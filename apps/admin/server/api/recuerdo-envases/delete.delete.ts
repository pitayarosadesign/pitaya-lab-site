import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const id = query.id as string

  if (!id) throw createError({ statusCode: 400, message: 'Falta el id del envase' })

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  // Obtener envase para eliminar su imagen del storage
  const { data: envase } = await supabaseAdmin
    .from('recuerdo_envases')
    .select('image_url')
    .eq('id', id)
    .single()

  if (envase?.image_url) {
    const path = envase.image_url.split('/product-images/')[1]
    if (path) {
      await supabaseAdmin.storage
        .from('product-images')
        .remove([path])
    }
  }

  const { error } = await supabaseAdmin
    .from('recuerdo_envases')
    .delete()
    .eq('id', id)

  if (error) throw createError({ statusCode: 500, message: error.message })

  return { success: true }
})
