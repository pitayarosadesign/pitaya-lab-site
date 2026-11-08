<template>
  <div class="min-h-screen">
    <!-- Header (configurable desde site_config > aromas_page) -->
    <section
      v-if="config.blocks.header.enabled"
      class="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white"
      :class="config.blocks.header.compact ? 'py-10' : 'py-24'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">{{ config.header.badge }}</span>
          <h1
            class="font-serif font-bold text-earth-900 mt-3 mb-6"
            :class="config.blocks.header.compact ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'"
          >
            {{ config.header.title }}
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-amber-500">{{ config.header.highlight }}</span>
          </h1>
          <p v-if="!config.blocks.header.compact" class="text-lg text-earth-600 leading-relaxed">
            {{ config.header.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Chips de familia olfativa (navegación por anclas) -->
    <div
      v-if="config.blocks.families.enabled && familyGroups.length > 1"
      class="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-earth-100"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2 overflow-x-auto py-3">
          <a
            v-for="g in familyGroups"
            :key="g.key"
            :href="`#familia-${g.key}`"
            class="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border shrink-0 bg-white text-earth-600 border-earth-200 hover:border-primary-300"
          >
            {{ g.emoji }} {{ g.label }} <span class="opacity-70 text-xs">({{ g.aromas.length }})</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Secciones por familia -->
    <section
      v-for="g in familyGroups"
      :id="`familia-${g.key}`"
      :key="g.key"
      class="py-12 scroll-mt-24"
      :class="g.key !== familyGroups[0]?.key ? 'border-t border-earth-100' : ''"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between mb-8">
          <div>
            <h2 class="text-2xl md:text-3xl font-serif font-bold text-earth-900">
              {{ g.emoji }} {{ g.label }}
            </h2>
            <p class="text-earth-500 mt-1">
              {{ g.aromas.length }} {{ g.aromas.length === 1 ? 'aroma' : 'aromas' }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <article
            v-for="aroma in g.aromas"
            :key="aroma.id"
            class="group bg-white rounded-3xl border border-earth-100 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300 flex flex-col"
          >
            <!-- Imagen del aroma -->
            <button type="button" @click="openAroma(aroma)" class="block w-full text-left">
              <div class="aspect-[4/3] overflow-hidden bg-earth-100 relative">
                <img
                  v-if="aroma.image"
                  :src="useOptimizedImage(aroma.image, { width: 600, quality: 80 })"
                  :alt="`Aroma ${aroma.name} - PITAYA LAB`"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-amber-100">
                  <span class="text-6xl">{{ aroma.emoji }}</span>
                </div>
              </div>
            </button>

            <!-- Contenido de la ficha -->
            <div class="p-5 flex flex-col flex-1">
              <div class="flex items-start justify-between gap-2">
                <div class="min-w-0">
                  <h3 class="font-serif font-bold text-lg text-earth-900 group-hover:text-primary-600 transition-colors truncate">{{ aroma.name }}</h3>
                  <p v-if="aroma.subtitle" class="text-sm text-earth-500 truncate">{{ aroma.subtitle }}</p>
                </div>
                <span
                  v-if="aroma.hotel_reference"
                  class="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold"
                >✨ {{ aroma.hotel_reference }}</span>
              </div>

              <p v-if="aroma.experience" class="text-sm text-earth-600 leading-relaxed mt-3 line-clamp-3">
                {{ aroma.experience }}
              </p>

              <div v-if="config.blocks.notes.enabled && aroma.notesList.length" class="mt-3 flex flex-wrap gap-1.5">
                <span
                  v-for="note in aroma.notesList"
                  :key="note.label"
                  class="inline-flex items-baseline gap-1 px-2 py-1 rounded-lg bg-primary-50 border border-primary-100 text-[11px]"
                >
                  <span class="font-semibold text-primary-600 uppercase">{{ note.label }}</span>
                  <span class="text-earth-700">{{ note.values }}</span>
                </span>
              </div>

              <div class="mt-auto pt-4 flex items-center gap-2">
                <NuxtLink
                  :to="`/catalog?aroma=${aroma.slug}`"
                  class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors"
                >
                  {{ config.cta.label }} <span class="opacity-80">({{ (productsByAroma[aroma.id] || []).length }})</span>
                </NuxtLink>
                <button
                  type="button"
                  @click="openAroma(aroma)"
                  class="px-4 py-2.5 rounded-xl border border-earth-200 text-sm font-medium text-earth-700 hover:border-primary-300 hover:text-primary-700 transition-colors"
                >
                  Detalle
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Estado vacío -->
    <section v-if="!loading && aromas.length === 0" class="py-20 text-center">
      <p class="text-5xl mb-4">🌸</p>
      <p class="text-earth-500">Aún no hay aromas publicados.</p>
    </section>

    <!-- Modal de detalle del aroma -->
    <Teleport to="body">
      <div v-if="selected" class="fixed inset-0 z-[80] flex items-end sm:items-center justify-center sm:p-4">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="selected = null"></div>
        <div class="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl">
          <div v-if="selected">
            <!-- Imagen -->
            <div class="relative aspect-[16/10] sm:aspect-[2/1] bg-earth-100">
              <img
                v-if="selected.image"
                :src="useOptimizedImage(selected.image, { width: 1000, quality: 80 })"
                :alt="selected.name"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div v-else class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-100 to-amber-100">
                <span class="text-7xl">{{ selected.emoji }}</span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <button
                type="button"
                @click="selected = null"
                class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-earth-600 hover:text-earth-900 shadow transition-colors"
                aria-label="Cerrar"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <div class="absolute bottom-4 left-5 right-5">
                <span v-if="selected.hotel_reference" class="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[10px] font-semibold uppercase tracking-wide backdrop-blur mb-2">
                  ✨ {{ selected.hotel_reference }}
                </span>
                <h2 class="text-2xl font-serif font-bold text-white">{{ selected.name }}</h2>
                <p v-if="selected.subtitle" class="text-sm text-white/90 font-medium">{{ selected.subtitle }}</p>
              </div>
            </div>

            <!-- Cuerpo -->
            <div class="p-6 sm:p-8 space-y-6">
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold">
                  {{ familyEmoji(selected.family) }} {{ familyLabel(selected.family) }}
                </span>
              </div>

              <div>
                <p v-if="selected.experience" class="text-earth-700 leading-relaxed">{{ selected.experience }}</p>
                <p v-if="selected.description" class="text-earth-500 text-sm leading-relaxed mt-2">{{ selected.description }}</p>
              </div>

              <!-- Notas aromáticas -->
              <div v-if="selected.notesList.length" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  v-for="note in selected.notesList"
                  :key="note.label"
                  class="p-3 rounded-xl bg-gradient-to-br from-primary-50 to-amber-50 border border-primary-100"
                >
                  <p class="text-[10px] font-bold text-primary-600 uppercase tracking-wider mb-1">{{ note.label }}</p>
                  <p class="text-xs text-earth-700 font-medium">{{ note.values }}</p>
                </div>
              </div>

              <!-- Productos disponibles -->
              <div v-if="config.blocks.products.enabled">
                <p class="text-sm font-semibold text-earth-800 mb-3">
                  Disponible en {{ (productsByAroma[selected.id] || []).length }} {{ (productsByAroma[selected.id] || []).length === 1 ? 'producto' : 'productos' }}:
                </p>
                <div v-if="(productsByAroma[selected.id] || []).length" class="flex flex-wrap gap-2">
                  <NuxtLink
                    v-for="product in productsByAroma[selected.id]"
                    :key="product.id"
                    :to="`/product/${product.slug}?aroma=${selected.slug}`"
                    class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-earth-50 hover:bg-primary-50 border border-earth-100 hover:border-primary-200 transition-all group"
                  >
                    <div class="w-9 h-9 rounded-lg overflow-hidden bg-earth-100 flex-shrink-0">
                      <img v-if="product.image" :src="useOptimizedImage(product.image, { width: 200, quality: 80 })" :alt="product.name" class="w-full h-full object-cover" />
                      <div v-else class="w-full h-full flex items-center justify-center text-earth-300 text-xs">📦</div>
                    </div>
                    <div class="text-left">
                      <p class="text-xs font-semibold text-earth-800 group-hover:text-primary-700">{{ product.name }}</p>
                      <p class="text-[10px] text-earth-400">${{ formatPrice(product.price) }} MXN</p>
                    </div>
                  </NuxtLink>
                </div>
                <NuxtLink
                  :to="`/catalog?aroma=${selected.slug}`"
                  class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700"
                >
                  Ver todos los productos de este aroma →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { mapAroma, familyLabel, familyEmoji, GALLERY_FAMILIES } from '~/composables/aromaCatalog'

usePageSeo('/aromas', {
  title: 'Guía de Aromas | PITAYA LAB',
  description: 'Descubre cada aroma de PITAYA LAB: familia olfativa, notas, experiencia y en qué productos está disponible.',
  ogTitle: 'Guía de Aromas | PITAYA LAB',
  ogDescription: 'Explora nuestra colección de aromas: notas de salida, corazón y fondo, y encuentra el producto ideal para ti.',
})

// Configuración editable desde site_config (key: aromas_page)
const config = reactive({
  header: {
    badge: 'Explora por aroma',
    title: 'Encuentra tu',
    highlight: 'Aroma',
    description: 'Cada aroma tiene su propia historia. Descubre su familia olfativa, sus notas y en qué productos puedes llevarlo.',
  },
  blocks: {
    header: { enabled: true, compact: false },
    families: { enabled: true },
    notes: { enabled: true },
    products: { enabled: true },
  },
  cta: {
    label: 'Ver productos',
  },
  seo: {
    title: 'Guía de Aromas | PITAYA LAB',
    description: 'Descubre cada aroma de PITAYA LAB: familia olfativa, notas, experiencia y en qué productos está disponible.',
  },
})

const { data: configData } = await useAsyncData('aromas-page-config', async () => {
  const supabase = useNuxtApp().$supabase
  if (!supabase) return null
  const { data, error } = await supabase
    .from('site_config')
    .select('value')
    .eq('key', 'aromas_page')
    .maybeSingle()
  if (error || !data?.value) return null
  return data.value
})

if (configData.value) {
  const v = configData.value
  if (v.header) Object.assign(config.header, v.header)
  if (v.blocks) {
    Object.keys(config.blocks).forEach((k) => {
      const b = v.blocks[k]
      config.blocks[k] = typeof b === 'object' && b ? { enabled: true, ...b } : { enabled: true }
    })
  }
  if (v.cta) Object.assign(config.cta, v.cta)
}

// Perfiles aromáticos activos (SSR).
const { data: aromasData } = await useAsyncData('aromas-page-profiles', async () => {
  const supabase = useNuxtApp().$supabase
  if (!supabase) return []
  const { data, error } = await supabase
    .from('fragrance_profiles')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  if (error) return []
  return data || []
})

const aromas = computed(() => (aromasData.value || []).map(mapAroma))

// Productos (para cruzar aromas con disponibilidad).
const { data: productsData, pending: productsPending } = await useFetch('/api/products', {
  default: () => ({ products: [] }),
})
const products = computed(() => productsData.value?.products || [])
const loading = computed(() => productsPending.value)

// Productos disponibles por aroma (por id de perfil aromático).
const productsByAroma = computed(() => {
  const map = {}
  for (const a of aromas.value) {
    map[a.id] = products.value.filter(p => (p.fragrances || []).some(f => f.id === a.id))
  }
  return map
})

// Agrupar aromas por familia olfativa, preservando el orden conocido.
const familyGroups = computed(() => {
  const known = Object.keys(GALLERY_FAMILIES)
  const groups = []
  known.forEach((key) => {
    const list = aromas.value.filter(a => a.family === key)
    if (list.length) groups.push({ key, label: familyLabel(key), emoji: familyEmoji(key), aromas: list })
  })
  const others = aromas.value.filter(a => !known.includes(a.family))
  if (others.length) groups.push({ key: 'otras', label: 'Otras', emoji: '🌸', aromas: others })
  return groups
})

// Modal de detalle
const selected = ref(null)
function openAroma(aroma) {
  selected.value = aroma
}

// Formatear precio
function formatPrice(price) {
  return Number(price).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>
