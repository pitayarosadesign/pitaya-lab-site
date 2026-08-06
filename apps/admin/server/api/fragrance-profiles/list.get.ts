import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { data, error } = await supabaseAdmin
      .from('fragrance_profiles')
      .select('*, collections(id, name, slug)')
      .order('sort_order', { ascending: true })

    if (error) throw error

    const profiles = (data || []).map(p => ({
      ...p,
      collection_name: p.collections?.name || '',
      collection_slug: p.collections?.slug || '',
      collection: p.collections ? { id: p.collections.id, name: p.collections.name, slug: p.collections.slug } : null,
    }))

    return { profiles }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
