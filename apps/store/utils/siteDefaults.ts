// Valores por defecto del sitio. Se usan ÚNICAMENTE como fallback cuando
// Supabase (tabla site_config) no responde o no tiene el registro esperado.
// La fuente de verdad es site_config; estos defaults evitan que la UI se
// rompa sin conexión a la base de datos. No duplicar estos valores en los
// componentes: impórtalos desde aquí.

export const defaultBrand = {
  name: 'PITAYA LAB',
  tagline: 'Fragancias que conectan',
  logo_url: '/images/brand/logo-pitayalab.png',
  logo_svg: '',
  logo_color: '',
}

export const defaultFooter = {
  description: 'Productos botánicos biodegradables que transforman tu hogar en una experiencia sensorial única.',
  amazon_link: 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329?',
  stripe_link: 'https://climate.stripe.com/Ul0lzt',
  show_stripe: true,
}

export const defaultShippingBar = {
  enabled: false,
  free_shipping_min: 200,
  shipping_fee: 50,
  bg_color: '',
  text_color: '',
  speed: 6, // segundos por mensaje en la cinta en movimiento
  messages: [
    { text: 'Envío gratis en compras mayores a {monto}', link: '', label: '' },
  ],
  start_at: '',
  end_at: '',
}

// Enlaces del menú superior (configurables en el admin vía site_config.nav_links).
export const defaultNavLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/about', label: 'Sobre Nosotros' },
  { path: '/philosophy', label: 'Nuestra Filosofía' },
  { path: '/catalog', label: 'Catálogo' },
  { path: '/catalog?categoria=recuerdos', label: 'Recuerdos' },
  { path: '/b2b', label: 'Mayoreo & Corporativo' },
]
