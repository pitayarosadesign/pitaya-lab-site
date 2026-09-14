// Valores por defecto del sitio. Se usan ÚNICAMENTE como fallback cuando
// Supabase (tabla site_config) no responde o no tiene el registro esperado.
// La fuente de verdad es site_config; estos defaults evitan que la UI se
// rompa sin conexión a la base de datos. No duplicar estos valores en los
// componentes: impórtalos desde aquí.

export const defaultBrand = {
  name: 'PITAYA LAB',
  tagline: 'Fragancias que conectan',
  logo_url: '/images/brand/logo-pitayalab.png',
}

export const defaultShippingBar = {
  enabled: false,
  free_shipping_min: 200,
  shipping_fee: 50,
  couriers: ['Paquete Express', 'Estafeta', 'FedEx'],
  delivery_days: '3 a 5 días hábiles',
}

// Enlaces del menú superior (configurables en el admin vía site_config.nav_links).
export const defaultNavLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/about', label: 'Sobre Nosotros' },
  { path: '/philosophy', label: 'Nuestra Filosofía' },
  { path: '/fragrancias', label: 'Guía de Fragancias' },
  { path: '/catalog', label: 'Catálogo' },
  { path: '/catalog?categoria=recuerdos', label: 'Recuerdos' },
  { path: '/b2b', label: 'Mayoreo & Corporativo' },
]
