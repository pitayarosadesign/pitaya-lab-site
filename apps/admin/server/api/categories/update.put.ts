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
    const { id, name, slug, description, image_url, parent_id, is_active } = body

    if (!id) {
      throw createError({ statusCode: 400, message: 'El id de la categoría es obligatorio' })
    }
    if (!name || !slug) {
      throw createError({ statusCode: 400, message: 'Nombre y slug son obligatorios' })
    }

    // Evitar que una categoría sea su propia madre
    if (parent_id && parent_id === id) {
      throw createError({ statusCode: 400, message: 'Una categoría no puede ser su propia categoría padre' })
    }

    const { data, error } = await supabaseAdmin
      .from('product_categories')
      .update({
        name,
        slug,
        description: description || null,
        image_url: image_url || null,
        parent_id: parent_id || null,
        is_active: is_active !== false,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return { success: true, category: data }
  } catch (e) {
    throw createError({ statusCode: e.statusCode || 500, message: e.message })
  }
})
