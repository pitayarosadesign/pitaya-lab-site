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
  social: [],
}

// Datos de contacto (fuente única de verdad): site_config.contact.
// El footer, el botón flotante de WhatsApp y B2B deben leer de aquí.
export const defaultContact = {
  email: 'contacto@pitayalab.com.mx',
  phone: '',
  whatsapp: '523333856064',
}

export const defaultShippingBar = {
  enabled: false,
  bg_color: '',
  text_color: '',
  speed: 6, // segundos por mensaje en la cinta en movimiento
  messages: [
    { text: 'Envío gratis en compras mayores a {monto}', link: '', label: '' },
  ],
  start_at: '',
  end_at: '',
}

// Reglas de envío (fuente única de verdad). Configurables en el admin vía
// site_config.shipping. La cinta promocional usa `free_shipping_min` para el
// token {monto}; el checkout/carrito/ficha usan estos mismos números.
export const defaultShipping = {
  free_shipping_min: 799, // envío estándar gratis a partir de este monto (MXN)
  shipping_fee: 99,       // costo del envío estándar cuando no se alcanza el mínimo
  point_post_min: 250,    // ticket mínimo para poder elegir Punto Post
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
