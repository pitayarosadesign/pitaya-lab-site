<template>
  <div class="relative w-full h-16 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden pointer-events-none">
    <!-- Hero / banda con texto centrado -->
    <template v-if="kind === 'hero'">
      <div class="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-br from-primary-100 to-primary-200"></div>
      <div class="absolute inset-x-0 top-[55%] flex flex-col items-center gap-1 px-4">
        <div class="h-1.5 w-2/3 bg-gray-300 rounded"></div>
        <div class="h-1 w-1/2 bg-gray-300/80 rounded"></div>
      </div>
    </template>

    <!-- Banner de página: banda + título + botón -->
    <template v-else-if="kind === 'banner'">
      <div class="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-primary-100 to-white"></div>
      <div class="absolute inset-x-0 top-3 flex flex-col items-center gap-1 px-4">
        <div class="h-1.5 w-3/4 bg-earth-300 rounded"></div>
        <div class="h-1 w-1/2 bg-earth-200 rounded"></div>
        <div class="h-1.5 w-8 mt-1 bg-primary-300 rounded-full"></div>
      </div>
    </template>

    <!-- Texto centrado -->
    <template v-else-if="kind === 'text'">
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4">
        <div class="h-1.5 w-3/4 bg-earth-300 rounded"></div>
        <div class="h-1 w-2/3 bg-gray-300 rounded"></div>
        <div class="h-1 w-1/2 bg-gray-300/80 rounded"></div>
      </div>
    </template>

    <!-- Imagen + texto -->
    <template v-else-if="kind === 'split'">
      <div class="absolute left-0 top-0 bottom-0 w-2/5 bg-gradient-to-br from-primary-100 to-primary-200"></div>
      <div class="absolute right-2 left-[45%] top-1/2 -translate-y-1/2 flex flex-col gap-1">
        <div class="h-1.5 w-full bg-earth-300 rounded"></div>
        <div class="h-1 w-4/5 bg-gray-300 rounded"></div>
        <div class="h-1 w-3/5 bg-gray-300/80 rounded"></div>
      </div>
    </template>

    <!-- Grid de imágenes -->
    <template v-else-if="kind === 'grid'">
      <div class="absolute inset-0 grid grid-cols-3 gap-1 p-1.5">
        <div v-for="i in 6" :key="i" class="rounded-sm bg-gradient-to-br from-primary-100 to-primary-200"></div>
      </div>
    </template>

    <!-- Carrusel con puntos -->
    <template v-else-if="kind === 'carousel'">
      <div class="absolute inset-x-0 top-0 bottom-3 bg-gradient-to-br from-primary-100 to-primary-200"></div>
      <div class="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
        <span class="w-1 h-1 rounded-full bg-primary-400"></span>
        <span class="w-1 h-1 rounded-full bg-gray-300"></span>
        <span class="w-1 h-1 rounded-full bg-gray-300"></span>
      </div>
    </template>

    <!-- Tarjetas (productos / valores) -->
    <template v-else-if="kind === 'cards'">
      <div class="absolute inset-0 grid grid-cols-3 gap-1 p-1.5">
        <div v-for="i in 3" :key="i" class="flex flex-col gap-0.5">
          <div class="flex-1 rounded-sm bg-gradient-to-br from-primary-100 to-primary-200"></div>
          <div class="h-1 w-3/4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </template>

    <!-- Lista (icono + línea) -->
    <template v-else-if="kind === 'list'">
      <div class="absolute inset-0 flex flex-col justify-center gap-1.5 px-2.5">
        <div v-for="i in 3" :key="i" class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-primary-200 flex-shrink-0"></span>
          <div class="h-1 flex-1 bg-gray-300 rounded"></div>
        </div>
      </div>
    </template>

    <!-- Reseña con estrellas -->
    <template v-else-if="kind === 'review'">
      <div class="absolute inset-3 rounded-md bg-white border border-gray-200 flex flex-col justify-center gap-1 px-2">
        <div class="flex gap-0.5">
          <span v-for="i in 5" :key="i" class="w-1.5 h-1.5 rounded-full bg-amber-300"></span>
        </div>
        <div class="h-1 w-full bg-gray-300 rounded"></div>
        <div class="h-1 w-2/3 bg-gray-300/80 rounded"></div>
      </div>
    </template>

    <!-- CTA centrado -->
    <template v-else-if="kind === 'cta'">
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
        <div class="h-1.5 w-2/3 bg-earth-300 rounded"></div>
        <div class="h-1 w-1/2 bg-gray-300 rounded"></div>
        <div class="h-1.5 w-10 bg-primary-400 rounded-full"></div>
      </div>
    </template>

    <!-- Formulario (newsletter / calculadora) -->
    <template v-else-if="kind === 'form'">
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-4">
        <div class="h-1.5 w-3/4 bg-earth-300 rounded"></div>
        <div class="flex items-center gap-1 w-4/5">
          <div class="h-3 flex-1 rounded bg-white border border-gray-200"></div>
          <div class="h-3 w-8 rounded bg-primary-300"></div>
        </div>
      </div>
    </template>

    <!-- Estadísticas -->
    <template v-else-if="kind === 'stats'">
      <div class="absolute inset-0 grid grid-cols-3 gap-1.5 p-2 items-center">
        <div v-for="i in 3" :key="i" class="flex flex-col items-center gap-0.5">
          <div class="h-2 w-6 bg-primary-300 rounded"></div>
          <div class="h-1 w-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </template>

    <!-- Acordeón -->
    <template v-else-if="kind === 'accordion'">
      <div class="absolute inset-0 flex flex-col justify-center gap-1 px-2.5">
        <div v-for="i in 3" :key="i" class="flex items-center gap-1.5">
          <div class="h-1 flex-1 bg-gray-300 rounded"></div>
          <span class="w-2 h-2 text-[8px] leading-none text-gray-400">+</span>
        </div>
      </div>
    </template>

    <!-- Fallback -->
    <template v-else>
      <div class="absolute inset-0 flex items-center justify-center text-gray-300 text-xs">•</div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  type: { type: String, required: true },
})

const KINDS = {
  hero: 'hero',
  page_header: 'banner',
  text: 'text',
  html: 'text',
  image_text: 'split',
  gallery: 'grid',
  instagram: 'grid',
  media_carousel: 'carousel',
  products: 'cards',
  scents: 'cards',
  values: 'cards',
  b2b_audience: 'cards',
  trust: 'list',
  marketplaces: 'list',
  reviews: 'review',
  cta: 'cta',
  newsletter: 'form',
  b2b_calculator: 'form',
  b2b_recuerdos: 'form',
  b2b_stats: 'stats',
  b2b_faq: 'accordion',
}

const kind = computed(() => KINDS[props.type] || 'text')
</script>
