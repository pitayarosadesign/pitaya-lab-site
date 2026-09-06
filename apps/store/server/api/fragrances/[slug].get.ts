import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug')
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { data: profile, error } = await supabase
      .from('fragrance_profiles')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error || !profile) {
      throw createError({ statusCode: 404, message: 'Perfil aromático no encontrado' })
    }

    return {
      profile: {
        id: profile.id,
        slug: profile.slug,
        name: profile.name,
        subtitle: profile.subtitle,
        description: profile.description,
        experience: profile.experience,
        notes: profile.notes,
        inspiracion: profile.inspiracion,
        image_url: profile.image_url,
        emoji: profile.emoji,
        family: profile.olfactive_family || null,
        collection_tag: profile.collection_tag || null,
      },
    }
  } catch (e) {
    if (e.statusCode) throw e
    throw createError({ statusCode: 500, message: e.message })
  }
})
