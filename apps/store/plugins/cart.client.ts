/**
 * 🛒 PITAYA LAB - Plugin de Carrito
 * Inicializa el store de carrito al cargar la app
 */

export default defineNuxtPlugin(() => {
  // Esperar a que Pinia esté listo
  const nuxtApp = useNuxtApp()

  nuxtApp.hook('app:mounted', () => {
    const cart = useCartStore()
    cart.init()
  })

  // Exponer el store globalmente para acceso fácil
  return {
    provide: {
      cart: () => useCartStore(),
    },
  }
})
