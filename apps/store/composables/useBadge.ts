// Distintivo de producto (badge): etiqueta visible y su color.
// Un solo badge por producto; si está vacío y el producto es destacado,
// se muestra "Best Seller". La lógica vive aquí para no duplicarla entre
// la tarjeta y la página de detalle.

export function badgeLabel(badge, isFeatured) {
  return badge || (isFeatured ? 'Best Seller' : '')
}

export function badgeClass(badge) {
  const b = (badge || '').toLowerCase()
  if (b.includes('nuevo')) return 'bg-emerald-500'
  if (b.includes('best') || b.includes('más vendido') || b.includes('mas vendido')) return 'bg-amber-500'
  if (b.includes('edición') || b.includes('edicion') || b.includes('limitada')) return 'bg-violet-600'
  if (b.includes('última') || b.includes('ultima') || b.includes('piezas')) return 'bg-rose-500'
  return 'bg-primary-600'
}
