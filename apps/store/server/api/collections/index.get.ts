import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    // Colecciones activas con sus perfiles aromáticos activos
    const { data: collections, error } = await supabase
      .from('collections')
      .select('*, fragrance_profiles(*)')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error

    const formatted = (collections || []).map(c => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      subtitle: c.subtitle,
      description: c.description,
      icon: c.icon,
      image_url: c.image_url,
      accent_color: c.accent_color,
      profiles: (c.fragrance_profiles || [])
        .filter(p => p.is_active)
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(p => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          subtitle: p.subtitle,
          description: p.description,
          experience: p.experience,
          notes: p.notes,
          hotel_reference: p.hotel_reference,
          image_url: p.image_url,
          emoji: p.emoji,
        })),
    }))

    return { collections: formatted }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
