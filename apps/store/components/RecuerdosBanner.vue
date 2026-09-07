<template>
  <section class="py-16 bg-gradient-to-br from-primary-900 via-earth-900 to-primary-900 text-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Encabezado -->
      <div class="text-center mb-10">
        <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-amber-300 text-sm font-medium mb-4">
          💍 Recuerdos para Eventos
        </span>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
          Cotiza Recuerdos para tus Eventos
        </h2>
        <p class="text-primary-100 max-w-2xl mx-auto">
          Bodas, XV años, baby showers y eventos corporativos. Personaliza tu recuerdo con tu aroma y diseño favorito.
        </p>
      </div>

      <!-- Carrusel de recuerdos -->
      <div v-if="recuerdos.length > 0" class="relative">
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-out"
            :style="{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }"
          >
            <div
              v-for="recuerdo in recuerdos"
              :key="recuerdo.id"
              class="px-3 flex-shrink-0"
              :style="{ width: `${100 / visibleCount}%` }"
            >
              <NuxtLink
                to="/recuerdos"
                class="block bg-white/10 backdrop-blur-sm border border-white/15 rounded-3xl overflow-hidden hover:bg-white/15 hover:border-amber-300/40 transition-all group h-full"
              >
                <div class="aspect-square overflow-hidden bg-white/5">
                  <img
                    v-if="recuerdo.image"
                    :src="recuerdo.image"
                    :alt="recuerdo.name"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center text-5xl">💍</div>
                </div>
                <div class="p-4">
                  <h3 class="font-serif font-bold text-white mb-1 line-clamp-1">{{ recuerdo.name }}</h3>
                  <p v-if="recuerdo.subtitle" class="text-xs text-primary-200 line-clamp-1 mb-2">{{ recuerdo.subtitle }}</p>
                  <p v-if="recuerdo.price" class="text-amber-300 font-semibold text-sm">
                    desde {{ formatMXN(recuerdo.price) }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Flechas de navegación -->
        <button
          v-if="recuerdos.length > visibleCount"
          @click="prev"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center transition-all"
          aria-label="Anterior"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          v-if="recuerdos.length > visibleCount"
          @click="next"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center transition-all"
          aria-label="Siguiente"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <!-- CTA principal -->
      <div class="text-center mt-10">
        <NuxtLink
          to="/recuerdos"
          class="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-earth-900 font-semibold px-8 py-4 rounded-full transition-all hover:shadow-xl hover:shadow-amber-500/30"
        >
          💍 Arma tu recuerdo personalizado
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { formatMXN } from '~/composables/useB2B'

const recuerdos = ref([])
const currentIndex = ref(0)

// Número de tarjetas visibles según el ancho de pantalla
const visibleCount = ref(4)

function updateVisibleCount() {
  if (typeof window === 'undefined') return
  const w = window.innerWidth
  if (w < 640) visibleCount.value = 1
  else if (w < 1024) visibleCount.value = 2
  else if (w < 1280) visibleCount.value = 3
  else visibleCount.value = 4
}

function next() {
  const maxIndex = Math.max(0, recuerdos.value.length - visibleCount.value)
  currentIndex.value = currentIndex.value >= maxIndex ? 0 : currentIndex.value + 1
}

function prev() {
  const maxIndex = Math.max(0, recuerdos.value.length - visibleCount.value)
  currentIndex.value = currentIndex.value <= 0 ? maxIndex : currentIndex.value - 1
}

// Cargar recuerdos (products con canal 'evento')
async function loadRecuerdos() {
  try {
    const res = await $fetch('/api/products', { query: { channel: 'evento' } })
    recuerdos.value = (res?.products || []).map(p => ({
      id: p.id,
      name: p.name,
      subtitle: p.subtitle || '',
      image: p.image || null,
      price: p.price || 0,
    }))
  } catch (e) {
    console.warn('Error cargando recuerdos:', e.message)
    recuerdos.value = []
  }
}

onMounted(() => {
  updateVisibleCount()
  window.addEventListener('resize', updateVisibleCount)
  loadRecuerdos()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateVisibleCount)
})
</script>
