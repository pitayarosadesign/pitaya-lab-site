<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white px-4">
    <div class="max-w-lg mx-auto text-center">
      <div class="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
        <svg class="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </div>
      <h1 class="text-3xl font-serif font-bold text-earth-900 mb-3">
        Pago cancelado
      </h1>
      <p class="text-lg text-earth-600 mb-6">
        No te preocupes, tu carrito sigue guardado. Puedes intentarlo de nuevo cuando quieras.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <NuxtLink
          to="/catalog"
          class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all"
        >
          ← Volver al catálogo
        </NuxtLink>
        <button
          @click="cart.openCart()"
          class="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all"
        >
          🛒 Ver carrito
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const cart = useCartStore()

useSeoMeta({
  title: 'Pago Cancelado | PITAYA LAB',
  description: 'El pago fue cancelado. Tu carrito sigue guardado para cuando quieras intentarlo de nuevo.',
  robots: 'noindex, nofollow',
})
</script>
