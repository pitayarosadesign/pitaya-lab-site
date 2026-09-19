<template>
  <section class="py-20" :class="sectionBg">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Encabezado -->
      <div v-if="content.title || content.subtitle || content.description" class="text-center mb-10">
        <span v-if="content.subtitle" class="text-primary-600 font-semibold text-sm uppercase tracking-wider">
          {{ content.subtitle }}
        </span>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
          {{ content.title || 'Galería' }}
        </h2>
        <p v-if="content.description" class="text-earth-600 max-w-2xl mx-auto">
          {{ content.description }}
        </p>
      </div>

      <!-- Carrusel -->
      <div
        v-if="slides.length"
        class="relative overflow-hidden rounded-3xl border border-earth-200 bg-earth-900 shadow-lg"
        :style="{ aspectRatio: aspect }"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
      >
        <div
          v-for="(slide, i) in slides"
          :key="i"
          class="absolute inset-0 transition-opacity duration-700"
          :class="i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'"
        >
          <component
            :is="slide.link ? 'a' : 'div'"
            v-bind="slide.link ? { href: slide.link, target: '_blank', rel: 'noopener noreferrer' } : {}"
            class="absolute inset-0 block"
            :aria-label="slide.caption || 'Slide ' + (i + 1)"
          >
            <!-- Video (solo se monta/reproduce el slide activo) -->
            <template v-if="slide.type === 'video'">
              <video
                v-if="i === current"
                :src="slide.media_url"
                :poster="slide.poster_url || undefined"
                autoplay
                muted
                loop
                playsinline
                class="w-full h-full object-cover"
              ></video>
              <img
                v-else-if="slide.poster_url"
                :src="slide.poster_url"
                class="w-full h-full object-cover"
                :alt="slide.caption || ''"
                loading="lazy"
              />
              <div v-else class="w-full h-full"></div>
            </template>
            <!-- Imagen -->
            <img
              v-else
              :src="slide.media_url"
              class="w-full h-full object-cover"
              :alt="slide.caption || ''"
              loading="lazy"
            />

            <!-- Caption -->
            <div
              v-if="slide.caption"
              class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-6 pt-16 pb-6"
            >
              <p class="text-white text-lg md:text-2xl font-serif font-semibold max-w-xl drop-shadow">{{ slide.caption }}</p>
            </div>
          </component>
        </div>

        <!-- Flechas -->
        <button
          v-if="showArrows && slides.length > 1"
          type="button"
          @click="prev()"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-earth-800 flex items-center justify-center shadow transition-colors"
          aria-label="Slide anterior"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          v-if="showArrows && slides.length > 1"
          type="button"
          @click="next()"
          class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-earth-800 flex items-center justify-center shadow transition-colors"
          aria-label="Slide siguiente"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Puntos -->
        <div v-if="showDots" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          <button
            v-for="(s, i) in slides"
            :key="i"
            type="button"
            @click="go(i)"
            class="h-2 rounded-full transition-all"
            :class="i === current ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'"
            :aria-label="'Ir a slide ' + (i + 1)"
          ></button>
        </div>
      </div>

      <p v-else class="text-center text-earth-400 text-sm">
        Agrega imágenes o videos desde el panel de administración.
      </p>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

const current = ref(0)
const paused = ref(false)
let timer = null

const slides = computed(() =>
  (props.content.slides || []).filter(s => s && s.media_url)
)
const aspect = computed(() => props.settings.aspect || '16 / 9')
const showArrows = computed(() => props.settings.show_arrows !== false)
const showDots = computed(() => props.settings.show_dots !== false && slides.value.length > 1)
const intervalMs = computed(() => {
  const s = Number(props.settings.interval)
  return s > 0 ? s * 1000 : 5000
})
const sectionBg = computed(() =>
  props.settings.background === 'dark' ? 'bg-earth-900' : 'bg-white'
)

function go(i) {
  current.value = (i + slides.value.length) % slides.value.length
}
function next() {
  go(current.value + 1)
}
function prev() {
  go(current.value - 1)
}

function startTimer() {
  stopTimer()
  if (current.value >= slides.value.length) current.value = 0
  if (slides.value.length > 1 && props.settings.autoplay !== false) {
    timer = setInterval(() => {
      if (!paused.value) next()
    }, intervalMs.value)
  }
}
function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

watch(slides, startTimer)
onMounted(startTimer)
onUnmounted(stopTimer)
</script>
