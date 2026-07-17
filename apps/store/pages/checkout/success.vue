<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4 py-20">
    <div class="max-w-lg mx-auto text-center">
      <div class="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h1 class="text-3xl font-serif font-bold text-earth-900 mb-3">
        ¡Pedido confirmado! 🎉
      </h1>

      <!-- Número de pedido -->
      <div class="inline-block bg-primary-50 border border-primary-200 rounded-xl px-6 py-3 mb-6">
        <p class="text-xs text-primary-600 font-medium uppercase tracking-wider">Número de pedido</p>
        <p class="text-2xl font-bold text-primary-800 font-mono">{{ orderNumber }}</p>
      </div>

      <p class="text-lg text-earth-600 mb-6">
        Gracias por tu compra. Te hemos enviado un correo con los detalles de tu pedido.<br>
        <span class="text-sm text-earth-400">Te notificaremos cuando sea enviado con el número de guía para seguimiento.</span>
      </p>

      <div class="bg-white rounded-2xl border border-earth-100 p-6 mb-8 shadow-sm">
        <h2 class="text-sm font-semibold text-earth-700 mb-3">¿Qué sigue?</h2>
        <ul class="text-sm text-earth-500 space-y-2 text-left">
          <li class="flex items-start gap-3">
            <span class="text-green-500 font-bold">1.</span>
            Recibirás un correo de confirmación en unos minutos
          </li>
          <li class="flex items-start gap-3">
            <span class="text-green-500 font-bold">2.</span>
            Preparamos tu pedido con mucho cuidado (1-2 días hábiles)
          </li>
          <li class="flex items-start gap-3">
            <span class="text-green-500 font-bold">3.</span>
            Te enviaremos el número de rastreo cuando sea despachado
          </li>
          <li class="flex items-start gap-3">
            <span class="text-green-500 font-bold">4.</span>
            ¡Disfruta tus productos PITAYA LAB! ✨
          </li>
        </ul>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <NuxtLink
          to="/catalog"
          class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all"
        >
          Seguir comprando
        </NuxtLink>
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-earth-600 hover:text-earth-800 px-8 py-3 rounded-full text-sm font-semibold transition-all"
        >
          Volver al inicio
        </NuxtLink>
      </div>

      <!-- Contacto -->
      <div class="mt-10 pt-6 border-t border-earth-100">
        <p class="text-xs text-earth-400">
          ¿Tienes dudas sobre tu pedido?
          <NuxtLink to="/contact" class="text-primary-600 hover:text-primary-700 underline">
            Contáctanos a través de nuestro buzón de mensajes
          </NuxtLink>
          y te responderemos en menos de 24 horas.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const cart = useCartStore()
const route = useRoute()

// Obtener número de orden de la URL (session_id)
const orderNumber = ref('PIT-XXXX')

onMounted(async () => {
  // Limpiar carrito
  cart.clearCart()

  // Stripe puede pasar session_id como query param o como hash fragment
  let sessionId = route.query.session_id

  // También podemos recibir el orderNumber directo en la URL
  const orderFromUrl = route.query.order

  // Si no está en query, revisar el hash de la URL
  if (!sessionId && typeof window !== 'undefined') {
    const hash = window.location.hash
    if (hash) {
      const params = new URLSearchParams(hash.replace('#', ''))
      sessionId = params.get('session_id') || ''
    }
  }

  // Si tenemos orderNumber directo, usarlo inmediatamente
  if (orderFromUrl) {
    orderNumber.value = orderFromUrl
  }

  if (sessionId) {
    try {
      const { data } = await $fetch(`/api/checkout/session?session_id=${sessionId}`)
      if (data?.orderNumber) {
        orderNumber.value = data.orderNumber
      }
    } catch (e) {
      console.warn('No se pudo obtener el número de orden')
    }
  }
})

useSeoMeta({
  title: 'Compra Exitosa | PITAYA LAB',
  description: 'Gracias por tu compra en PITAYA LAB. Recibirás la confirmación por correo.',
  robots: 'noindex, nofollow',
})
</script>
