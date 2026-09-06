/**
 * 🌸 PITAYA LAB - Composables de Fragancia
 * =========================================
 * Utilidades compartidas entre el catálogo y la página de producto para
 * mantener SIEMPRE sincronizada la presentación de notas aromáticas y
 * experiencias olfativas.
 */

/**
 * Parsear notas aromáticas (SAL/COR/FONDO o formato simple).
 * @returns Array [{ label: 'SAL'|'COR'|'FONDO'|'Notas', values }]
 */
export function parseNotes(notes: string): Array<{ label: string; values: string }> {
  if (!notes) return []
  const raw = notes.split('/').map(n => n.trim()).filter(Boolean)
  const order = ['SAL', 'COR', 'FONDO']
  const ordered = order
    .map(label => {
      const found = raw.find(r => r.toUpperCase().startsWith(label))
      if (!found) return null
      return { label, values: found.replace(new RegExp(`^${label}\\.?\\s*`, 'i'), '') }
    })
    .filter(Boolean)

  // Si hay notas en formato SAL/COR/FONDO, usarlas
  if (ordered.length > 0) return ordered as Array<{ label: string; values: string }>

  // Fallback: si las notas están en formato simple, agruparlas en una sola
  if (raw.length > 0) {
    return [{ label: 'Notas', values: raw.join(', ') }]
  }

  return []
}

/**
 * Normalizar un fragmento de datos de fragancia (perfil aromático) a la forma
 * uniforme usada tanto en el catálogo como en la página de producto.
 */
export function normalizeFragrance(profile: any) {
  if (!profile) return null
  return {
    id: profile.id,
    name: profile.name,
    emoji: profile.emoji || '🌸',
    subtitle: profile.subtitle || '',
    description: profile.description || '',
    experience: profile.experience || '',
    notes: profile.notes || '',
    notesList: parseNotes(profile.notes),
    hotelReference: profile.hotelReference || profile.inspiracion || profile.hotel_reference || '',
    image: profile.image || profile.image_url || null,
    slug: profile.slug || '',
    collection: profile.collection || normalizeCollection(profile.collections),
  }
}

/**
 * Normalizar una colección (catálogo o producto) a la forma uniforme.
 */
export function normalizeCollection(col: any) {
  if (!col) return null
  return {
    id: col.id,
    name: col.name || '',
    slug: col.slug || '',
    icon: col.icon || '',
  }
}

/**
 * Obtener el fragmento de fragancia de una variante (si existe).
 */
export function fragranceOfVariant(variant: any) {
  if (!variant) return null
  if (variant.fragrance) return normalizeFragrance(variant.fragrance)
  if (variant.fragrance_profiles) return normalizeFragrance(variant.fragrance_profiles)
  return null
}

