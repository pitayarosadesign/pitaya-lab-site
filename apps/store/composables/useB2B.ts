/**
 * 🎯 PITAYA LAB - Composables B2B
 * ==================================
 * Estado y lógica compartida para el segmento
 * "Mayoreo & Corporativo" (B2B).
 * Carga config desde Supabase (site_config) con fallback estático.
 */

// Precios retail vigentes (confirmados por Estephany)
export const RETAIL_PRICES = {
  bruma: 299,       // 225 ml
  aceite: 249,      // 15 ml
  velaClasica: 349, // 250g
  velaMistica: 499, // 350g
}

// Config por defecto (fallback si Supabase no tiene datos)
export const DEFAULT_B2B = {
  comercial: {
    enabled: true,
    min_pieces: 20,
    tiers: [
      { min: 20, max: 49, discount_percent: 25, label: 'Nivel 1', description: 'Boutiques y cafeterías probando inventario inicial' },
      { min: 51, max: 99, discount_percent: 30, label: 'Nivel 2', description: 'Resurtido fuerte o tiendas con mayor rotación' },
      { min: 100, max: null, discount_percent: 35, label: 'Nivel 3', description: 'Socios comerciales grandes o compras recurrentes' },
    ],
    whatsapp: '523333856064',
  },
  recuerdos: {
    enabled: true,
    min_pieces: 30,
    pricing_by_volume: [
      { min: 30, max: 50, price_from: 65, price_to: 75, label: 'Eventos íntimos' },
      { min: 51, max: 100, price_from: 55, price_to: 62, label: 'Descuento por volumen' },
      { min: 101, max: null, price_from: 45, price_to: 50, label: 'Precio preferencial' },
    ],
    premium_kit_addon_from: 15,
    premium_kit_addon_to: 25,
    label_specs: 'Sube tu diseño en formato PNG/PDF a 300 dpi, medida exacta 5x5 cm',
    label_size: '5x5 cm',
    lead_time_days: 15,
    whatsapp: '523333856064',
  },
  contacto: {
    email: 'contacto@pitayalab.com.mx',
    whatsapp: '523333856064',
    lead_time_message: 'Los pedidos personalizados pueden tardar hasta 15 días hábiles en entregarse. Si hay mucha demanda, puede extenderse unos días más. Te avisaremos con antelación la programación y entrega estimada por correo electrónico.',
  },
}

// Número de WhatsApp (compartido)
export const WHATSAPP = '523333856064'
export const WHATSAPP_URL = () => `https://wa.me/${WHATSAPP}`

// Enlace de WhatsApp prefilled (para mensaje de cotización)
export function whatsappLinkWithMessage(message: string = '') {
  const q = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP}${q ? `?text=${q}` : ''}`
}

/**
 * Cargar la configuración B2B desde Supabase (site_config)
 */
export async function useB2BConfig() {
  const supabase = useNuxtApp()?.$supabase

  const config = {
    comercial: DEFAULT_B2B.comercial,
    recuerdos: DEFAULT_B2B.recuerdos,
    contacto: DEFAULT_B2B.contacto,
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('site_config')
        .select('key, value')
        .in('key', ['b2b_comercial', 'b2b_recuerdos', 'b2b_contacto'])

      if (!error && data) {
        data.forEach(item => {
          if (item.key === 'b2b_comercial' && item.value?.enabled !== false) {
            config.comercial = { ...config.comercial, ...item.value, tiers: item.value.tiers || config.comercial.tiers }
          }
          if (item.key === 'b2b_recuerdos' && item.value?.enabled !== false) {
            config.recuerdos = { ...config.recuerdos, ...item.value, pricing_by_volume: item.value.pricing_by_volume || config.recuerdos.pricing_by_volume }
          }
          if (item.key === 'b2b_contacto') {
            config.contacto = { ...config.contacto, ...item.value }
          }
        })
      }
    } catch (e) {
      console.warn('Usando config B2B estática (fallback):', e.message)
    }
  }

  return config
}

/**
 * Obtener precio mayoreo comercial (B2B) aplicando descuento por tier
 * @param retailPrice precio público
 * @param quantity cantidad
 * @param tiers tiers de descuento
 */
export function getWholesalePrice(retailPrice: number, quantity: number, tiers = DEFAULT_B2B.comercial.tiers): { price: number; discountPercent: number; tier: any } {
  if (quantity <= 0) return { price: retailPrice, discountPercent: 0, tier: null }

  // Encontrar el tier aplicable (el más alto que cumpla min)
  let applicable = null
  for (const t of [...tiers].sort((a, b) => b.min - a.min)) {
    if (quantity >= t.min) {
      applicable = t
      break
    }
  }

  if (!applicable) return { price: retailPrice, discountPercent: 0, tier: null }

  const discount = applicable.discount_percent
  const price = retailPrice * (1 - discount / 100)
  return { price: parseFloat(price.toFixed(2)), discountPercent: discount, tier: applicable }
}

/**
 * Obtener precio unitario para recuerdos por volumen
 * @param quantity cantidad de piezas
 * @param pricingByVolume rangos de la config
 */
export function getRecuerdoPricing(quantity: number, pricingByVolume = DEFAULT_B2B.recuerdos.pricing_by_volume): { priceFrom: number; priceTo: number; tier: any } {
  if (quantity <= 0) return { priceFrom: pricingByVolume[0].price_from, priceTo: pricingByVolume[0].price_to, tier: pricingByVolume[0] }

  let applicable = pricingByVolume[0]
  for (const range of [...pricingByVolume].sort((a, b) => b.min - a.min)) {
    if (quantity >= range.min) {
      applicable = range
      break
    }
  }

  return {
    priceFrom: applicable.price_from,
    priceTo: applicable.price_to,
    tier: applicable,
  }
}

/**
 * Formatear precio en MXN
 */
export function formatMXN(price: number) {
  return Number(price).toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 })
}
