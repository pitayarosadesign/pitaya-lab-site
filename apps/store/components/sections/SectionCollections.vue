<template>
  <section class="py-20 bg-white/70">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <span v-if="content.subtitle" class="text-primary-600 font-semibold text-sm uppercase tracking-wider">{{ content.subtitle }}</span>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
          {{ content.title || 'El arte de la fragancia' }}
        </h2>
        <p v-if="content.description" class="text-earth-600 max-w-2xl mx-auto">
          {{ content.description }}
        </p>
      </div>

      <!-- Grid de colecciones -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="collection in collections"
          :key="collection.id"
          :to="`/colecciones/${collection.slug}`"
          class="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-earth-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
        >
          <!-- Imagen de fondo -->
          <img
            v-if="collection.image_url"
            :src="collection.image_url"
            :alt="collection.name"
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div v-else class="w-full h-full bg-gradient-to-br from-primary-100 to-amber-100 flex items-center justify-center">
            <span class="text-6xl">{{ collection.icon || '🌸' }}</span>
          </div>

          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-earth-900/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

          <!-- Contenido -->
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <span class="text-2xl mb-2 block">{{ collection.icon }}</span>
            <h3 class="text-white font-semibold text-xl font-serif">{{ collection.name }}</h3>
            <p v-if="collection.subtitle" class="text-white/70 text-xs mt-1">{{ collection.subtitle }}</p>
            <p class="text-white/80 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              {{ collection.description }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <p v-if="content.show_all" class="text-center text-earth-500 text-sm mt-8">
        ✨ Todos los aromas disponibles en todas las presentaciones
      </p>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

const supabase = useNuxtApp().$supabase
const collections = ref([])

async function loadCollections() {
  if (!supabase) return

  try {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    if (data) collections.value = data
  } catch (e) {
    console.warn('Error cargando colecciones:', e.message)
  }
}

onMounted(loadCollections)
</script>
