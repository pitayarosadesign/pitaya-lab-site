<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
      <!-- Ícono de éxito -->
      <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      </div>

      <h1 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mb-4">
        ¡Gracias por tu pedido B2B! 🎉
      </h1>

      <!-- Número de pedido -->
      <div v-if="orderNumber" class="p-6 rounded-2xl bg-earth-50 border border-earth-100 mb-6">
        <p class="text-sm text-earth-500 mb-1">Tu número de pedido</p>
        <p class="text-3xl font-mono font-bold text-primary-700">{{ orderNumber }}</p>
      </div>

      <!-- Estado de pedido personalizado -->
      <div v-if="isEvent" class="text-left p-6 rounded-2xl bg-amber-50 border border-amber-200 mb-6">
        <h2 class="font-semibold text-amber-800 mb-2">⏱️ Sobre tu pedido personalizado</h2>
        <p class="text-sm text-amber-800 leading-relaxed">
          Tu recuerdo personalizado puede tardar hasta <strong>15 días hábiles</strong> en fabricarse (y más si hay alta demanda).
          Te enviaremos la <strong>programación y entrega estimada por correo electrónico</strong> para que estés al tanto.
        </p>
      </div>
      <div v-else class="p-6 rounded-2xl bg-earth-50 border border-earth-100 mb-6">
        <h2 class="font-semibold text-earth-800 mb-2">📦 Sobre tu pedido de mayoreo</h2>
        <p class="text-sm text-earth-600 leading-relaxed">
          Te contactaremos por correo para coordinar la <strong>elaboración del envío y confirmar la programación de entrega</strong>.
        </p>
      </div>

      <p class="text-earth-500 mb-8">
        Recibirás un correo electrónico con los detalles de tu pedido. Si tienes dudas, escríbenos.
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4 mb-10">
        <NuxtLink
          to="/b2b"
          class="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
        >
          ← Volver a B2B
        </NuxtLink>
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-all"
        >
          💬 Contactar por WhatsApp
        </a>
      </div>

      <NuxtLink to="/" class="text-sm text-earth-400 hover:text-earth-600 underline">
        Ir a la tienda
      </NuxtLink>
    </div>

    <!-- Botón flotante WhatsApp -->
    <BotWhatsApp :message="'¡Hola PITAYA LAB! Acabo de hacer un pedido B2B y tengo una duda.'" />
  </div>
</template>

<script setup lang="ts">
import { WHATSAPP_URL } from '~/composables/useB2B'

const route = useRoute()

const orderNumber = ref(route.query.order || '')
// Detectar tipo de pedido (event | wholesale) desde el query
const isEvent = ref(route.query.type === 'event' || route.query.type === 'recuerdos')

// Obtener session y detectar si es pedido de evento
onMounted(async () => {
  const sessionId = route.query.session_id
  if (sessionId) {
    try {
      const data: any = await $fetch('/api/checkout/session', { query: { session_id: sessionId } })
      if (data?.data?.orderNumber) {
        orderNumber.value = data.data.orderNumber
      }
      // Si no venía el tipo en el query, intentar desde la sesión
      if (!route.query.type && typeof data?.type !== 'undefined') {
        isEvent.value = data.type === 'event'
      }
    } catch (e) {
      console.warn('No se pudo obtener la sesión:', e.message)
    }
  }
})

const whatsappUrl = WHATSAPP_URL()
</script>
