<template>
  <section
    class="relative min-h-[85vh] flex items-center overflow-hidden"
    :class="bgClasses"
  >
    <!-- Capa de media de fondo (video / imagen / carrusel) -->
    <div v-if="hasBackgroundMedia" class="absolute inset-0 w-full h-full">
      <!-- Video de fondo (si está configurado) -->
      <video
        v-if="resolvedMediaType === 'video'"
        autoplay
        muted
        loop
        playsinline
        :poster="poster"
        class="w-full h-full object-cover"
      >
        <source :src="mediaUrl" type="video/mp4" />
      </video>
      <!-- Imagen de fondo (si está configurada) -->
      <img
        v-else-if="mediaUrl && resolvedMediaType === 'image'"
        :src="mediaUrl"
        :alt="title"
        class="w-full h-full object-cover"
      />
      <!-- Carrusel de fondo -->
      <template v-else-if="resolvedMediaType === 'carousel' && slides.length">
        <div
          v-for="(slide, i) in slides"
          :key="i"
          class="absolute inset-0 transition-opacity duration-1000"
          :class="i === currentSlide ? 'opacity-100' : 'opacity-0'"
        >
          <a
            v-if="slide.link"
            :href="slide.link"
            :target="isExternal(slide.link) ? '_blank' : undefined"
            :rel="isExternal(slide.link) ? 'noopener noreferrer' : undefined"
            class="block w-full h-full"
          >
            <img :src="slide.image" :alt="title" class="w-full h-full object-cover" />
          </a>
          <img v-else :src="slide.image" :alt="title" class="w-full h-full object-cover" />
        </div>
        <!-- Indicadores del carrusel -->
        <div v-if="slides.length > 1" class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          <button
            v-for="(slide, i) in slides"
            :key="'dot' + i"
            @click="currentSlide = i"
            class="w-2.5 h-2.5 rounded-full transition-all"
            :class="i === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'"
            :aria-label="'Ir al slide ' + (i + 1)"
          ></button>
        </div>
      </template>
      <!-- Overlay / gradiente de legibilidad (configurable) -->
      <div v-if="overlay_enabled" class="absolute inset-0" :class="overlayClass"></div>
    </div>

    <!-- Contenido -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full" :class="contentAlignmentClass">
      <div :class="contentMaxWidthClass">
        <div
          v-if="badge"
          :class="['inline-flex items-center rounded-full text-sm font-medium mb-6', badgeClass]"
        >
          <span v-if="show_badge_dot" class="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
          {{ badge }}
        </div>

        <h1 :class="titleClass">
          {{ title }}
        </h1>

        <p :class="subtitleClass">
          {{ subtitle }}
        </p>

        <div class="flex flex-wrap gap-4" :class="ctaAlignClass">
          <NuxtLink
            v-if="cta_text"
            :to="cta_link"
            :class="primaryCtaClass"
          >
            {{ cta_text }}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>

          <a
            v-if="cta_secondary_text"
            :href="cta_secondary_link"
            :target="isExternal(cta_secondary_link) ? '_blank' : undefined"
            :rel="isExternal(cta_secondary_link) ? 'noopener noreferrer' : undefined"
            :class="secondaryCtaClass"
          >
            {{ cta_secondary_text }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  // Textos (el padre/editor decide los defaults)
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  badge: { type: String, default: '' },
  cta_text: { type: String, default: '' },
  cta_link: { type: String, default: '/catalog' },
  cta_secondary_text: { type: String, default: '' },
  cta_secondary_link: { type: String, default: '' },

  // Media de fondo ('none' por defecto para NO heredar el video de la portada)
  media_type: { type: String, default: 'none' },
  media_url: { type: String, default: '' },
  poster: { type: String, default: '' },
  slides: { type: Array, default: () => [] },

  // Fondo de color sólido / degradado (cuando no hay media)
  bg_color: { type: String, default: 'bg-gradient-to-br from-earth-900 via-primary-900 to-earth-900' },

  // Overlay de legibilidad (desactivable con '' o 'none')
  overlay_gradient: { type: String, default: 'bg-gradient-to-r from-earth-950/70 via-earth-950/50 to-transparent' },

  // Alineación del contenido
  text_align: { type: String, default: 'left' },
  content_max_width: { type: String, default: 'max-w-3xl' },

  // Estilos de texto / CTAs
  badge_style: { type: String, default: 'bg-white/20 backdrop-blur-sm border border-white/10 text-white' },
  title_style: { type: String, default: 'text-4xl md:text-6xl lg:text-7xl' },
  subtitle_style: { type: String, default: 'text-lg md:text-xl' },
  subtitle_color: { type: String, default: 'text-white/80' },
  primary_cta_style: { type: String, default: 'bg-primary-500 hover:bg-primary-600 text-white hover:shadow-primary-500/30' },
  secondary_cta_style: { type: String, default: 'bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white' },
  show_badge_dot: { type: Boolean, default: true },
})

const currentSlide = ref(0)

// Clases condicionales derivadas
const hasBackgroundMedia = computed(() => {
  if (props.media_type === 'none') return false
  if (props.media_type === 'carousel') return Array.isArray(props.slides) && props.slides.length > 0
  return Boolean(props.media_url)
})

const bgClasses = computed(() => (!hasBackgroundMedia.value ? props.bg_color : ''))
const overlay_enabled = computed(() => {
  if (!hasBackgroundMedia.value) return false
  const g = props.overlay_gradient
  return Boolean(g) && g !== 'none'
})
const overlayClass = computed(() => (overlay_enabled.value ? props.overlay_gradient : ''))

const contentAlignmentClass = computed(() => (props.text_align === 'center' ? 'text-center' : ''))
const contentMaxWidthClass = computed(() => (props.text_align === 'center' ? `mx-auto ${props.content_max_width}` : props.content_max_width))
const ctaAlignClass = computed(() => (props.text_align === 'center' ? 'justify-center' : ''))

const badgeClass = computed(() => `inline-flex items-center gap-2 px-4 py-2 ${props.badge_style}`)
const titleClass = computed(() => `font-serif font-bold text-white leading-tight mb-6 ${props.title_style}`)
const subtitleClass = computed(() => `leading-relaxed mb-10 max-w-2xl drop-shadow-lg ${props.subtitle_style} ${props.subtitle_color}`)
const primaryCtaClass = computed(() => `inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all hover:shadow-xl ${props.primary_cta_style}`)
const secondaryCtaClass = computed(() => `inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all ${props.secondary_cta_style}`)

// Autoplay del carrusel
let carouselTimer = null
function startCarousel() {
  stopCarousel()
  if (props.slides.length > 1) {
    carouselTimer = setInterval(() => {
      currentSlide.value = (currentSlide.value + 1) % props.slides.length
    }, 5000)
  }
}
function stopCarousel() {
  if (carouselTimer) {
    clearInterval(carouselTimer)
    carouselTimer = null
  }
}

watch(
  () => props.slides,
  (val) => {
    if (val && val.length) {
      currentSlide.value = 0
      startCarousel()
    } else {
      stopCarousel()
    }
  },
  { immediate: true }
)

onBeforeUnmount(stopCarousel)

function isExternal(link) {
  return /^https?:\/\//i.test(link || '')
}

// Determina el tipo de media real ('none' | 'image' | 'video' | 'carousel')
const resolvedMediaType = computed(() => {
  let type = props.media_type || (props.media_url ? inferType(props.media_url) : 'none')
  if (type === 'carousel') return type
  if (type === 'video' && props.media_url && inferType(props.media_url) === 'image') {
    return 'image'
  }
  if ((type === 'image' || type === 'video') && !props.media_url) return 'none'
  return type
})

const mediaUrl = computed(() => props.media_url || '')
const poster = computed(() => props.poster || '')

function inferType(url) {
  const ext = (url || '').split('?')[0].split('.').pop()?.toLowerCase()
  return ['mp4', 'webm', 'mov'].includes(ext) ? 'video' : 'image'
}
</script>

