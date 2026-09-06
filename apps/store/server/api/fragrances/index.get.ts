import { createClient } from '@supabase/supabase-js'

// GET /api/fragrances — GUÍA de fragancias
// Devuelve TODOS los perfiles aromáticos activos y, para cada uno, en qué
// PRODUCTOS (presentaciones) está disponible, agrupando por la relación
// product_variants.fragrance_profile_id (misma fragancia en vela/aceite/bruma/...).
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    // 1) Perfiles aromáticos activos
    const { data: profiles, error: profilesError } = await supabase
      .from('fragrance_profiles')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (profilesError) throw profilesError

    // 2) Productos (presentaciones) que ofrecen cada fragancia activa y publicada
    const { data: rows, error: rowsError } = await supabase
      .from('product_variants')
      .select(`
        fragrance_profile_id,
        products(id, name, subtitle, slug, category_id, price, is_active)
      `)
      .not('fragrance_profile_id', 'is', null)

    if (rowsError) throw rowsError

    // Índice de emoji de presentaciones según pistas del nombre del producto
    function presentacionMeta(name = '') {
      const s = String(name).toLowerCase()
      if (s.includes('vela')) return { emoji: '🕯️', tipo: 'Vela' }
      if (s.includes('aceite')) return { emoji: '🧴', tipo: 'Aceite' }
      if (s.includes('bruma')) return { emoji: '🌫️', tipo: 'Bruma' }
      if (s.includes('jabón') || s.includes('jabon')) return { emoji: '🧼', tipo: 'Jabón' }
      if (s.includes('crema')) return { emoji: '🧴', tipo: 'Crema' }
      return { emoji: '', tipo: s.split(',')[0] || 'Producto' }
    }

    // Agrupar productos disponibles por perfume (solo publicados/activos)
    const disponiblesPorPerfil = new Map()

    ;(rows || []).forEach(r => {
      const p = r.products
      if (!r.fragrance_profile_id || !p || p.is_active === false) return
      if (!disponiblesPorPerfil.has(r.fragrance_profile_id)) disponiblesPorPerfil.set(r.fragrance_profile_id, [])
      const existing = disponiblesPorPerfil.get(r.fragrance_profile_id)
      const key = p.id
      if (!existing.some(e => e.id === key)) {
        const meta = presentacionMeta(p.name || p.subtitle)
        existing.push({
          id: p.id,
          slug: p.slug,
          name: p.name,
          subtitle: p.subtitle,
          image: p.image || null,
          price: p.price,
          presentacion: meta.tipo,
          emoji: meta.emoji,
        })
      }
    })

    // Convertir a lista ordenada alfabéticamente por presentación
    ;(disponiblesPorPerfil).forEach((list) => {
      list.sort((a, b) => a.presentacion.localeCompare(b.presentacion))
    })

    const all = (profiles || []).map(pr => {
      const disponibles = (disponiblesPorPerfil.get(pr.id) || [])
      return {
        id: pr.id,
        slug: pr.slug,
        name: pr.name,
        subtitle: pr.subtitle,
        description: pr.description,
        experience: pr.experience,
        notes: pr.notes,
        notesList: (pr.notes || '').split('/').map(n => n.trim()).filter(Boolean),
        hotel_reference: pr.hotel_reference,
        image_url: pr.image_url,
        emoji: pr.emoji,
        short_desc: pr.short_desc,
        // Clasificación limpia por aroma desde admin
        family: pr.olfactive_family || null,
        collectionTag: pr.collection_tag || null,
        presentaciones: disponibles.length,
        disponibles,
      }
    })

    return { fragrances: all }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
