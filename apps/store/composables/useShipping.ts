/**
 * 🚚 PITAYA LAB — Envíos (fuente única de verdad)
 * ===============================================
 * Expone las reglas de envío de `site_config.shipping` (cargadas por el
 * `useSiteConfigStore`) junto con los cálculos derivados (progreso hacia el
 * envío gratis, "te faltan $X", costo estándar y mínimo de Punto Post).
 *
 * Carrito, checkout y ficha de producto DEBEN usar estos mismos valores para
 * que el mensaje y el cálculo sean idénticos en toda la tienda.
 */
export function useShipping() {
  const site = useSiteConfigStore()
  const cart = useCartStore()

  // Asegura que la config esté cargada (el store deduplica la consulta).
  site.fetchConfig()

  const freeShippingMin = computed(() => Number(site.shipping.free_shipping_min) || 799)
  const shippingFee = computed(() => Number(site.shipping.shipping_fee) || 99)
  const pointPostMin = computed(() => Number(site.shipping.point_post_min) || 250)

  const subtotal = computed(() => cart.totalPrice)

  const remainingForFreeShipping = computed(() => Math.max(0, freeShippingMin.value - subtotal.value))
  const freeShippingUnlocked = computed(() => subtotal.value >= freeShippingMin.value)
  const freeShippingProgress = computed(() => Math.min(100, (subtotal.value / freeShippingMin.value) * 100))
  const standardShippingCost = computed(() => (freeShippingUnlocked.value ? 0 : shippingFee.value))
  const pointPostBelowMinimum = computed(() => subtotal.value < pointPostMin.value)

  return {
    freeShippingMin,
    shippingFee,
    pointPostMin,
    subtotal,
    remainingForFreeShipping,
    freeShippingUnlocked,
    freeShippingProgress,
    standardShippingCost,
    pointPostBelowMinimum,
  }
}
