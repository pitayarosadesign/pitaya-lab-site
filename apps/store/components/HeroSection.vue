<template>
  <section class="relative min-h-[85vh] flex items-center overflow-hidden">
    <div class="absolute inset-0 w-full h-full">
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
      <div class="absolute inset-0 bg-gradient-to-r from-earth-950/70 via-earth-950/50 to-transparent"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
      <div class="max-w-3xl">
        <div
          v-if="badge"
          class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10"
        >
          <span class="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
          {{ badge }}
        </div>

        <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
          {{ title }}
        </h1>

        <p class="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl drop-shadow-lg">
          {{ subtitle }}
        </p>

        <div class="flex flex-wrap gap-4">
          <NuxtLink
            :to="cta_link"
            class="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full text-base font-semibold transition-all hover:shadow-xl hover:shadow-primary-500/30"
          >
            {{ cta_text || 'Explorar catálogo' }}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>

          <a
            v-if="cta_secondary_text"
            :href="cta_secondary_link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-full text-base font-semibold transition-all"
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
  title: { type: String, default: 'Fragancias que\nconectan\ncon la naturaleza' },
  subtitle: { type: String, default: '' },
  badge: { type: String, default: '100% Natural · Biodegradable · Hecho en México' },
  cta_text: { type: String, default: 'Explorar catálogo' },
  cta_link: { type: String, default: '/catalog' },
  cta_secondary_text: { type: String, default: 'Tienda Amazon' },
  cta_secondary_link: { type: String, default: 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329' },
  media_type: { type: String, default: 'video' },
  media_url: { type: String, default: '/images/brand/hero-video.mp4' },
  poster: { type: String, default: '/images/brand/hero-bruma.png' },
})

// Si viene una imagen en media_url pero media_type dice 'video' (o vacío),
// inferimos el tipo correcto para que la imagen se muestre.
const resolvedMediaType = computed(() => {
  const type = props.media_type || (props.media_url ? inferType(props.media_url) : 'video')
  return type
})

// URL de media con fallback a los valores por defecto de la marca
const mediaUrl = computed(() => {
  if (props.media_url) return props.media_url
  return resolvedMediaType.value === 'image'
    ? '/images/brand/hero-bruma.png'
    : '/images/brand/hero-video.mp4'
})

// URL del poster con fallback
const poster = computed(() => props.poster || '/images/brand/hero-bruma.png')

function inferType(url) {
  const ext = (url || '').split('?')[0].split('.').pop()?.toLowerCase()
  return ['mp4', 'webm', 'mov'].includes(ext) ? 'video' : 'image'
}
</script>

