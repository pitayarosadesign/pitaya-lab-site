import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  )

  try {
    const { name, slug, description } = body

    if (!name || !slug) {
      throw createError({
        statusCode: 400,
        message: 'Nombre y slug son obligatorios',
      })
    }

    // Obtener el siguiente sort_order
    const { data: maxCat } = await supabaseAdmin
      .from('product_categories')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)

    const nextOrder = (maxCat?.[0]?.sort_order ?? 0) + 1

    const { data, error } = await supabaseAdmin
      .from('product_categories')
      .insert({
        name,
        slug,
        description: description || null,
        sort_order: nextOrder,
        is_active: true,
      })
      .select()
      .single()

    if (error) throw error

    return { success: true, category: data }
  } catch (e) {
    throw createError({
      statusCode: 500,
      message: e.message,
    })
  }
})
