<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-earth-900 via-primary-900 to-earth-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <!-- Columna izquierda: propuesta de valor -->
        <div>
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-primary-200 text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
            {{ badge }}
          </span>

          <h1 class="font-serif font-bold text-white leading-tight text-4xl md:text-5xl mb-5">
            {{ title }}
          </h1>
          <p class="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
            {{ subtitle }}
          </p>

          <!-- Micro-beneficios (value proposition badges) -->
          <div v-if="badges.length" class="flex flex-wrap gap-3 mb-8">
            <div
              v-for="b in badges"
              :key="b.text"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-sm text-white/90"
            >
              <span class="text-base">{{ b.icon }}</span>
              <span>{{ b.text }}</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <NuxtLink
              :to="primaryCta.link"
              class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-all hover:shadow-lg hover:shadow-primary-500/30"
            >
              {{ primaryCta.text }}
            </NuxtLink>
            <NuxtLink
              :to="secondaryCta.link"
              class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 text-white font-semibold transition-all"
            >
              {{ secondaryCta.text }}
            </NuxtLink>
          </div>
        </div>

        <!-- Columna derecha: buscador + atajos -->
        <div class="bg-white rounded-3xl p-6 shadow-2xl border border-earth-100">
          <p class="text-sm font-semibold text-earth-800 mb-3">{{ search.title }}</p>
          <form @submit.prevent="jumpToCalculator" class="relative mb-4">
            <input
              v-model="query"
              @input="onSearchInput"
              type="text"
              :placeholder="search.placeholder"
              class="w-full px-4 py-3 pr-12 rounded-xl border border-earth-200 focus:border-primary-400 outline-none transition-all text-sm"
            />
            <button type="submit" class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-colors" aria-label="Buscar">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
          </form>

          <!-- Atajos rápidos por categoría -->
          <p class="text-xs font-semibold uppercase tracking-wider text-earth-400 mb-2">{{ search.categoriesLabel }}</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="c in quickCategories"
              :key="c"
              type="button"
              @click="pickCategory(c)"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-earth-50 border border-earth-200 hover:border-primary-300 hover:bg-primary-50 text-xs font-medium text-earth-700 transition-colors"
            >
              {{ c }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: 'Fragancias que conectan a tu negocio y tus eventos' },
  subtitle: { type: String, default: 'Lleva la alta hotelería a tu tienda, hotel, bodas y eventos corporativos. Precios de mayoreo por volumen, recuerdos personalizados y etiquetado privado.' },
  badge: { type: String, default: '🏢 Mayoreo & Corporativo' },
  badges: { type: Array, default: () => [
    { icon: '📉', text: 'Descuentos automáticos por volumen (-25% a -35%)' },
    { icon: '🏷️', text: 'Etiquetado privado disponible' },
    { icon: '🚚', text: 'Envíos seguros a todo México' },
  ] },
  primaryCta: { type: Object, default: () => ({ text: '📦 Cotizar mayoreo', link: '#calculadora-mayoreo' }) },
  secondaryCta: { type: Object, default: () => ({ text: '💍 Recuerdos para eventos', link: '#cotizador-eventos' }) },
  search: { type: Object, default: () => ({
    title: 'Encuentra tu producto y cotiza',
    placeholder: 'Buscar por producto o categoría…',
    categoriesLabel: 'Categorías rápidas',
  }) },
  quickCategories: { type: Array, default: () => ['🕯️ Velas de Soya', '🌿 Brumas Aromáticas', '💧 Aceites Aromáticos', '🪵 Difusores', '🧴 Jabones y Cremas'] },
})

const query = useB2BSearch().query

function jumpToCalculator() {
  document.getElementById('calculadora-mayoreo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Escribir en el buscador baja a la calculadora (filtro en vivo).
// Solo se hace scroll al pasar de vacío a texto, para no "saltar" en cada tecla.
let lastQuery = ''
function onSearchInput() {
  if (lastQuery === '' && query.value !== '') {
    jumpToCalculator()
  }
  lastQuery = query.value
}

// Los chips son atajos por keyword: filtran la calculadora en vivo.
function pickCategory(label) {
  query.value = label.replace(/^[^a-zA-ZñÑáéíóúüÁÉÍÓÚÜ]+\s*/, '')
  jumpToCalculator()
}
</script>
