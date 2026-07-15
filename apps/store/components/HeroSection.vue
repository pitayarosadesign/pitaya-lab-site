<template>
  <section class="relative min-h-[85vh] flex items-center overflow-hidden">
    <div class="absolute inset-0 w-full h-full">
      <video
        autoplay
        muted
        loop
        playsinline
        poster="/images/brand/hero-bruma.png"
        class="w-full h-full object-cover"
      >
        <source src="/images/brand/hero-video.mp4" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-gradient-to-r from-earth-950/70 via-earth-950/50 to-transparent"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10">
          <span class="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
          100% Natural · Biodegradable · Hecho en México
        </div>

        <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
          {{ title }}
        </h1>

        <p class="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl drop-shadow-lg">
          {{ subtitle }}
        </p>

        <div class="flex flex-wrap gap-4">
          <NuxtLink
            to="/catalog"
            class="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full text-base font-semibold transition-all hover:shadow-xl hover:shadow-primary-500/30"
          >
            {{ cta_text || 'Explorar catálogo' }}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
          <a
            :href="cta_link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full text-base font-semibold transition-all hover:shadow-lg"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a1.375 1.375 0 0 0 0 1.994l2.414 2.585a1.375 1.375 0 0 0 1.994 0l3.779-3.788-3.787 3.787-2.414-2.585a1.374 1.374 0 0 1 0-1.994l3.705-3.964 3.675-3.675a1.375 1.375 0 0 0-.044-1.92A1.374 1.374 0 0 0 13.483 0zm-1.587 2.585-3.673 3.675 3.673 3.675h7.252v-1.53h-5.733l-2.358-2.585 2.358-2.585h5.733v-1.53h-7.252z"/>
            </svg>
            {{ cta_secondary || 'Tienda Amazon' }}
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
  cta_text: { type: String, default: 'Explorar catálogo' },
  cta_link: { type: String, default: 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329?' },
  cta_secondary: { type: String, default: 'Tienda Amazon' },
})
</script>
