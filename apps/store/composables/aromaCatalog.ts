// Helpers compartidos para las "fichas de aroma" (perfiles olfativos).
// Mantienen la MISMA forma de datos que ya usa /catalog para que la
// experiencia sea consistente en toda la tienda.

export const GALLERY_FAMILIES = {
  floral: { label: 'Floral', emoji: '🌸' },
  oriental: { label: 'Oriental', emoji: '✨' },
  amaderada: { label: 'Amaderada', emoji: '🪵' },
  citrica: { label: 'Cítrica', emoji: '🍋' },
}

// Etiqueta y emoji legibles para una clave de familia olfativa.
export function familyLabel(key) {
  return GALLERY_FAMILIES[key]?.label || 'Otras'
}

export function familyEmoji(key) {
  return GALLERY_FAMILIES[key]?.emoji || '🌸'
}

// Parsear notas aromáticas (SAL/COR/FONDO o formato simple separado por /).
export function parseNotes(notes) {
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

  if (ordered.length > 0) return ordered

  // Fallback: notas en formato simple agrupadas en una sola entrada.
  if (raw.length > 0) {
    return [{ label: 'Notas', values: raw.join(', ') }]
  }

  return []
}

// Mapear un perfil aromático crudo (fragrance_profiles) a la forma de ficha.
export function mapAroma(p) {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug || '',
    emoji: p.emoji || '🌸',
    family: p.olfactive_family || '',
    description: p.experience || p.subtitle || p.description || '',
    image: p.image_url,
    subtitle: p.subtitle || '',
    experience: p.experience || '',
    notes: p.notes || '',
    hotel_reference: p.inspiracion || '',
    category: p.slug || '',
    categoryLabel: p.name || 'Perfil',
    vibe: p.experience || p.subtitle || '',
    bestFor: p.notes || p.description || p.inspiracion || '',
    notesList: parseNotes(p.notes),
  }
}
