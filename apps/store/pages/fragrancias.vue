<template>
  <div class="min-h-screen bg-white">
    <!-- 🧭 Header editorial -->
    <section class="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <span class="inline-flex items-center gap-1.5 text-primary-600 font-semibold text-sm uppercase tracking-wider">
            🌸 Guía de Fragancias
          </span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-earth-900 mt-3 mb-6 leading-tight">
            Encuentra tu <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-amber-500">aroma ideal</span>
          </h1>
          <p class="text-lg text-earth-600 leading-relaxed">
            Nuestras fragancias no son solo un producto: cada una es una historia sensorial. Aquí puedes
            descubrirlas por su personalidad y ver <strong class="text-earth-800">en qué formato llevarla</strong>
            (vela, aceite, bruma, jabón o crema).
          </p>
        </div>
      </div>
    </section>

    <!-- Cargando -->
    <div v-if="loading" class="text-center py-24">
      <div class="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-earth-500">Cargando la guía de fragancias…</p>
    </div>

    <template v-else>
      <!-- 🔎 Filtro por colección -->
      <div v-if="fragrances.length" class="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-earth-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto">
          <button
            v-for="f in filtros"
            :key="f.key"
            @click="activeFiltro = f.key"
            class="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border"
            :class="activeFiltro === f.key
              ? 'bg-primary-600 text-white border-primary-600'
              : 'bg-white text-earth-600 border-earth-200 hover:border-primary-300'"
          >
            {{ f.emoji }} {{ f.label }} <span class="opacity-70 text-xs">({{ f.count }})</span>
          </button>
        </div>
      </div>

      <!-- 🧬 Tarjetas de fragancia -->
      <section class="py-14">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div v-if="filteredFragrances.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <article
              v-for="fr in filteredFragrances"
              :key="fr.id"
              class="group bg-white rounded-3xl border border-earth-200/80 overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
            >
              <!-- Imagen/Cabecera del aroma -->
              <NuxtLink :to="`/colecciones/${fr.slug}`" class="relative block aspect-[4/3] overflow-hidden bg-earth-50">
                <img
                  v-if="fr.image_url"
                  :src="fr.image_url"
                  :alt="fr.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div v-else class="absolute inset-0 flex items-center justify-center">
                  <span class="text-7xl opacity-70">{{ fr.emoji || '🌸' }}</span>
                </div>
                <div v-if="fr.collection" class="absolute top-3 left-3 inline-flex items-center bg-black/55 backdrop-blur text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                  {{ fr.collection.icon || '🖇️' }} {{ fr.collection.name }}
                </div>
                <div v-if="fr.hotel_reference" class="absolute top-3 right-3 inline-flex items-center bg-amber-500/90 text-white text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
                  ✨ {{ fr.hotel_reference }}
                </div>
              </NuxtLink>

              <!-- Contenido -->
              <div class="p-5 flex-1 flex flex-col">
                <h2 class="text-xl font-serif font-bold text-earth-900 group-hover:text-primary-600 transition-colors">
                  {{ fr.name }}
                </h2>
                <p v-if="fr.subtitle" class="text-sm font-medium text-primary-600 mt-0.5">{{ fr.subtitle }}</p>
                <p v-if="fr.experience" class="text-sm text-earth-500 mt-2 line-clamp-3 leading-relaxed">{{ fr.experience }}</p>

                <!-- Notas -->
                <div v-if="fr.notesList.length" class="mt-3 flex flex-wrap gap-1.5">
                  <span
                    v-for="(nota, i) in fr.notesList"
                    :key="i"
                    class="inline-flex items-center px-2 py-1 rounded-lg bg-earth-50 border border-earth-100 text-[10px] text-earth-600 font-medium"
                  >
                    {{ nota }}
                  </span>
                </div>

                <!-- Presentaciones disponibles -->
                <div class="mt-4 pt-4 border-t border-earth-100">
                  <p class="text-[11px] font-semibold text-earth-500 uppercase tracking-wider mb-2">
                    Disponible en {{ fr.presentaciones }} {{ fr.presentaciones === 1 ? 'formato' : 'formatos' }}
                  </p>
                  <div v-if="fr.disponibles.length" class="flex flex-wrap gap-1.5">
                    <button
                      v-for="prod in fr.disponibles"
                      :key="prod.id"
                      @click="goToProduct(prod.slug, fr.slug)"
                      class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-earth-200 bg-white text-xs text-earth-700 font-medium hover:border-primary-400 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                      :title="prod.name"
                    >
                      {{ prod.emoji }} {{ prod.presentacion }}
                    </button>
                  </div>
                </div>

                <!-- Acciones -->
                <div v-if="fr.disponibles.length" class="mt-auto pt-5 flex gap-3">
                  <button
                    @click="goToProduct(fr.disponibles[0].slug, fr.slug)"
                    class="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
                  >
                    Comprar {{ fr.disponibles[0].presentacion }}
                  </button>
                  <NuxtLink
                    :to="`/colecciones/${fr.slug}`"
                    class="flex-1 border border-earth-200 text-earth-700 hover:border-primary-400 hover:text-primary-700 font-semibold py-2.5 rounded-xl text-sm transition-colors text-center"
                  >
                    Conocerla
                  </NuxtLink>
                </div>
              </div>
            </article>
          </div>
          <div v-else class="text-center py-20">
            <p class="text-5xl mb-4">🌵</p>
            <p class="text-earth-500">No hay fragancias que coincidan con este filtro.</p>
            <button @click="activeFiltro = 'todas'" class="mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm">Ver todas</button>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
const loading = ref(true)
const fragrances = ref([])
const activeFiltro = ref('todas')

// Filtros: "Todas" + una por colección
const filtros = computed(() => {
  const map = new Map()
  map.set('todas', { key: 'todas', label: 'Todas', emoji: '🌸', count: fragrances.value.length })
  fragrances.value.forEach(fr => {
    const c = fr.collection
    if (!c) return
    if (!map.has(c.slug)) map.set(c.slug, { key: c.slug, label: c.name, emoji: c.icon || '🖇️', count: 0 })
    map.get(c.slug).count++
  })
  return Array.from(map.values())
})

const filteredFragrances = computed(() => {
  if (activeFiltro.value === 'todas') return fragrances.value
  return fragrances.value.filter(fr => fr.collection && fr.collection.slug === activeFiltro.value)
})

function goToProduct(slug, aromaSlug) {
  navigateTo(`/product/${slug}?aroma=${aromaSlug}`)
}

async function loadFragrances() {
  loading.value = true
  try {
    const data = await $fetch('/api/fragrances')
    fragrances.value = data.fragrances || []
  } catch (e) {
    fragrances.value = []
    console.warn('No se pudo cargar la guía de fragancias:', e.message)
  } finally {
    loading.value = false
  }
}

onMounted(loadFragrances)
</script>
