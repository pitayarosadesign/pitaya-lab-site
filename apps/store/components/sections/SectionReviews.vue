<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <span class="text-amber-600 font-semibold text-sm uppercase tracking-wider">Reseñas</span>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
          {{ content.title || 'Lo que dicen nuestros clientes' }}
        </h2>
        <p v-if="content.subtitle" class="text-earth-600 max-w-2xl mx-auto">
          {{ content.subtitle }}
        </p>
      </div>

      <!-- Carrusel horizontal -->
      <div class="relative">
        <button
          v-if="reviews.length > 3"
          @click="scrollReviews(-1)"
          class="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-earth-200 shadow-lg hover:bg-primary-50 hover:border-primary-300 flex items-center justify-center text-earth-600 hover:text-primary-600 transition-all"
          aria-label="Ver reseñas anteriores"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <div
          ref="reviewsContainer"
          class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-thin scrollbar-thumb-earth-200 scrollbar-track-earth-50"
          style="scrollbar-width: thin;"
        >
          <div
            v-for="(review, index) in reviews"
            :key="index"
            class="flex-shrink-0 w-full sm:w-[380px] md:w-[400px] snap-start bg-white rounded-2xl border border-earth-100 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
          >
            <div v-if="review.image" class="aspect-[4/3] overflow-hidden bg-earth-50">
              <img
                :src="review.image"
                :alt="`Reseña de ${review.author}`"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div class="p-6 flex flex-col flex-grow">
              <div class="flex items-center gap-1 mb-3">
                <svg v-for="n in 5" :key="n" class="w-4 h-4" :class="n <= review.rating ? 'text-amber-400' : 'text-earth-200'" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="text-xs text-earth-400 ml-1">{{ review.rating }}.0</span>
              </div>

              <p class="text-earth-600 text-sm leading-relaxed flex-grow mb-4">
                "{{ review.text }}"
              </p>

              <div class="flex items-center gap-3 pt-4 border-t border-earth-100">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-amber-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">
                  {{ (review.author || '?').charAt(0) }}
                </div>
                <div>
                  <p class="text-sm font-semibold text-earth-800">{{ review.author }}</p>
                  <p v-if="review.product" class="text-xs text-earth-400">{{ review.product }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          v-if="reviews.length > 3"
          @click="scrollReviews(1)"
          class="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-earth-200 shadow-lg hover:bg-primary-50 hover:border-primary-300 flex items-center justify-center text-earth-600 hover:text-primary-600 transition-all"
          aria-label="Ver más reseñas"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

// Defaults desde site_config (editable en el panel admin)
const defaultReviews = ref([])
const loadedDefaults = ref(false)

async function loadDefaults() {
  if (loadedDefaults.value) return
  loadedDefaults.value = true
  // Cargar todos los defaults de una sola vez (compartido entre secciones)
  const defaults = await useSectionDefaultsShared()
  const sectionDefaults = defaults?.reviews
  if (sectionDefaults?.items && Array.isArray(sectionDefaults.items)) {
    defaultReviews.value = sectionDefaults.items
  }
}

onMounted(loadDefaults)

const reviews = computed(() => {
  if (Array.isArray(props.content.items) && props.content.items.length > 0) {
    return props.content.items
  }
  // Fallback: contenido editable desde site_config
  return defaultReviews.value
})

const reviewsContainer = ref(null)

function scrollReviews(direction) {
  const container = reviewsContainer.value
  if (!container) return
  const cardWidth = container.querySelector('.snap-start')?.offsetWidth || 400
  const gap = 24
  container.scrollBy({
    left: direction * (cardWidth + gap),
    behavior: 'smooth',
  })
}
</script>
