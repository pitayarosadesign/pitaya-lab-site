<template>
  <section class="py-20" :class="sectionBg">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Encabezado -->
      <div class="text-center mb-10">
        <span v-if="content.subtitle" class="text-primary-600 font-semibold text-sm uppercase tracking-wider">
          {{ content.subtitle }}
        </span>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
          {{ content.title || 'Encuéntranos en marketplaces' }}
        </h2>
        <p v-if="content.description" class="text-earth-600 max-w-2xl mx-auto">
          {{ content.description }}
        </p>
      </div>

      <!-- Tarjetas de canales de venta -->
      <div v-if="channels.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <a
          v-for="(ch, i) in channels"
          :key="i"
          :href="ch.link"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-4 bg-white rounded-2xl border border-earth-200 p-5 hover:shadow-lg hover:border-primary-300 transition-all"
        >
          <span class="w-12 h-12 rounded-xl bg-earth-50 flex items-center justify-center text-2xl flex-shrink-0">
            {{ ch.icon || '🛍️' }}
          </span>
          <span class="flex-1 min-w-0">
            <span class="block font-semibold text-earth-800 group-hover:text-primary-600 transition-colors truncate">
              {{ ch.name || 'Visitar tienda' }}
            </span>
            <span class="block text-xs text-earth-400">Comprar ahora</span>
          </span>
          <svg class="w-4 h-4 text-earth-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      <p v-else class="text-center text-earth-400 text-sm">
        Agrega tus canales de venta desde el panel de administración.
      </p>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

const channels = computed(() =>
  (props.content.channels || []).filter(c => c && (c.name || c.link))
)

const sectionBg = computed(() =>
  props.settings.background === 'dark' ? 'bg-earth-900' : 'bg-white'
)
</script>
