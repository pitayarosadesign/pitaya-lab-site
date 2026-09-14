/**
 * 💼 useWholesale — Precio de negocio (mayoreo) por tramos de cantidad
 * -------------------------------------------------------------------
 * Cada producto puede definir tramos de descuento por volumen al estilo
 * Mercado Libre, guardados en products.wholesale_tiers (JSONB):
 *
 *   {
 *     enabled: true,
 *     discountType: 'percent' | 'fixed',
 *     tiers: [ { min: 20, value: 15 }, { min: 50, value: 25 }, ... ]
 *   }
 *
 * Estas funciones son puras (sin dependencias de Vue/entorno) para poder
 * usarse tanto en componentes como en endpoints Nitro.
 */

export interface WholesaleTier {
  min: number
  value: number
}

export interface WholesaleConfig {
  enabled: boolean
  discountType: 'percent' | 'fixed'
  tiers: WholesaleTier[]
}

/** Normaliza la config de mayoreo (acepta null/undefined/parcial). */
export function normalizeWholesale(raw: any): WholesaleConfig | null {
  if (!raw || typeof raw !== 'object') return null
  if (!raw.enabled) return null
  const tiers = Array.isArray(raw.tiers)
    ? raw.tiers
        .map((t: any) => ({ min: Number(t?.min) || 0, value: Number(t?.value) || 0 }))
        .filter((t: WholesaleTier) => t.min > 0 && t.value > 0)
        .sort((a: WholesaleTier, b: WholesaleTier) => a.min - b.min)
    : []
  if (tiers.length === 0) return null
  return {
    enabled: true,
    discountType: raw.discountType === 'fixed' ? 'fixed' : 'percent',
    tiers,
  }
}

/**
 * Devuelve el tramo aplicable para una cantidad dada: el tramo con el `min`
 * más alto que sea menor o igual a la cantidad. Si ninguno aplica, null.
 */
export function getTierForQty(config: WholesaleConfig | null, qty: number): WholesaleTier | null {
  if (!config || !config.enabled) return null
  const n = Number(qty) || 0
  let best: WholesaleTier | null = null
  for (const t of config.tiers) {
    if (n >= t.min) best = t
  }
  return best
}

/**
 * Calcula el precio unitario de mayoreo para una cantidad.
 * - percent: retail * (1 - value/100)
 * - fixed:   max(0, retail - value)
 * Devuelve el precio retail si no aplica mayoreo.
 */
export function getWholesaleUnitPrice(retailPrice: number, config: WholesaleConfig | null, qty: number): number {
  const retail = Number(retailPrice) || 0
  const tier = getTierForQty(config, qty)
  if (!tier) return retail
  let unit: number
  if (config!.discountType === 'fixed') {
    unit = retail - tier.value
  } else {
    unit = retail * (1 - tier.value / 100)
  }
  return Math.max(0, Math.round(unit * 100) / 100)
}

/** Porcentaje de descuento efectivo del tramo (para mostrar "−25%"). */
export function getTierDiscountLabel(config: WholesaleConfig | null, tier: WholesaleTier | null): string {
  if (!config || !tier) return ''
  return config.discountType === 'fixed' ? `−$${tier.value}` : `−${tier.value}%`
}

/** Precio unitario mínimo de mayoreo (el tramo más alto). */
export function getBestWholesaleUnitPrice(retailPrice: number, config: WholesaleConfig | null): number {
  if (!config || !config.enabled || config.tiers.length === 0) return Number(retailPrice) || 0
  const top = config.tiers[config.tiers.length - 1]
  return getWholesaleUnitPrice(retailPrice, config, top.min)
}
