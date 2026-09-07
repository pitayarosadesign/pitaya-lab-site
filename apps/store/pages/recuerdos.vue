<template>
  <div class="min-h-screen bg-white">
    <!-- HERO -->
    <section class="relative bg-gradient-to-br from-primary-900 via-earth-900 to-primary-900 text-white overflow-hidden">
      <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 20% 50%, #fff 0, transparent 40%), radial-gradient(circle at 80% 20%, #fff 0, transparent 35%);"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div class="max-w-3xl">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-amber-300 text-sm font-medium mb-6">
            💍 Recuerdos para Eventos
          </span>
          <h1 class="font-serif font-bold text-4xl md:text-6xl leading-tight mb-6">
            Arma tu recuerdo<br />personalizado
          </h1>
          <p class="text-lg md:text-xl text-primary-100 leading-relaxed mb-8 max-w-2xl">
            Bodas, XV años, baby showers y eventos corporativos. Elige tu envase, aroma, diseño y cantidad. Personaliza tu etiqueta y cotiza directo.
          </p>

          <!-- ⏱️ Leyenda de anticipación -->
          <div class="inline-flex items-start gap-3 rounded-2xl bg-amber-400/15 border border-amber-300/30 px-5 py-4 max-w-xl">
            <span class="text-2xl leading-none mt-0.5">⏱️</span>
            <div>
              <p class="font-semibold text-amber-200 text-sm">Pide con anticipación</p>
              <p class="text-amber-100/90 text-sm leading-relaxed">
                Recomendamos pedir con <strong class="text-white">15 días de anticipación</strong> (mínimo <strong class="text-white">10 días antes</strong> de tu evento) para garantizar la entrega.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cotizador de recuerdos -->
    <section class="py-14 md:py-20 bg-earth-50/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CotizadorRecuerdos @order="onOrderRequested" />
      </div>
    </section>

    <!-- CTA WhatsApp -->
    <section class="py-16 bg-gradient-to-r from-primary-900 to-earth-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl md:text-3xl font-serif font-bold text-white mb-3">¿Tienes un evento especial o un diseño propio?</h2>
        <p class="text-primary-100 mb-8 max-w-2xl mx-auto">
          Cuéntanos tu idea y armamos una propuesta a tu medida. Respondemos rápido por WhatsApp.
        </p>
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-4 rounded-full transition-all hover:shadow-xl"
        >
          💬 Cotizar por WhatsApp
        </a>
      </div>
    </section>

    <!-- Botón flotante WhatsApp -->
    <BotWhatsApp :message="'¡Hola PITAYA LAB! Me interesa cotizar recuerdos para mi evento.'" />

    <!-- Modal de checkout -->
    <CheckoutModalB2B
      :open="checkoutOpen"
      :order="pendingOrder"
      cancel-url="/recuerdos"
      @close="checkoutOpen = false"
      @complete="onCheckoutComplete"
    />
  </div>
</template>

<script setup lang="ts">
import { WHATSAPP_URL } from '~/composables/useB2B'
import CotizadorRecuerdos from '~/components/b2b/CotizadorRecuerdos.vue'
import CheckoutModalB2B from '~/components/b2b/CheckoutModalB2B.vue'

useSeoMeta({
  title: 'Recuerdos Personalizados para Eventos | PITAYA LAB',
  description: 'Recuerdos personalizados para bodas, XV años, baby showers y eventos corporativos. Elige envase, aroma y diseño. Pide con 15 días de anticipación.',
  ogTitle: 'Recuerdos Personalizados para Eventos | PITAYA LAB',
  ogDescription: 'Arma tu recuerdo personalizado: elige envase, aroma, diseño y cantidad. Ideal para bodas y eventos.',
})

const whatsappUrl = WHATSAPP_URL()

// Estado del checkout (reutiliza el modal B2B de eventos)
const checkoutOpen = ref(false)
const pendingOrder = ref<any | null>(null)

function onOrderRequested(payload: any) {
  pendingOrder.value = payload
  checkoutOpen.value = true
}

function onCheckoutComplete(info: any) {
  checkoutOpen.value = false
  navigateTo(`/b2b/gracias?order=${info.orderNumber || ''}&type=event`)
}
</script>
