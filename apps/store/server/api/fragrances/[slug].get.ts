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
      .select('*, collections(*)')
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
        hotel_reference: profile.hotel_reference,
        image_url: profile.image_url,
        emoji: profile.emoji,
        collection: profile.collections ? {
          id: profile.collections.id,
          slug: profile.collections.slug,
          name: profile.collections.name,
          subtitle: profile.collections.subtitle,
          description: profile.collections.description,
          image_url: profile.collections.image_url,
        } : null,
      },
    }
  } catch (e) {
    if (e.statusCode) throw e
    throw createError({ statusCode: 500, message: e.message })
  }
})
