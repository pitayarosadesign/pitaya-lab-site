<template>
  <section v-if="features.length" class="py-16 bg-gradient-to-b from-white to-primary-50/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <span v-if="content.subtitle" class="text-primary-600 font-semibold text-sm uppercase tracking-wider">{{ content.subtitle }}</span>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
          {{ content.title || 'Envíos seguros a todo México' }}
        </h2>
        <p v-if="content.subtitle" class="text-earth-600 max-w-2xl mx-auto">
          {{ content.subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="text-center p-6 rounded-2xl bg-white border border-earth-100 hover:border-primary-200 transition-all hover:shadow-lg"
        >
          <div class="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-primary-100 to-green-100 rounded-2xl flex items-center justify-center">
            <svg v-if="feature.icon === 'truck'" class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-1h12l2 1"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10h4l3 3v3h-1"/>
            </svg>
            <svg v-else-if="feature.icon === 'package'" class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            <svg v-else-if="feature.icon === 'clock'" class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <svg v-else-if="feature.icon === 'shield'" class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <svg v-else class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-earth-800 mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-earth-500 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>

      <p v-if="content.couriers" class="text-center text-earth-400 text-sm mt-8">
        📦 {{ content.couriers }}
      </p>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

// Contenido por defecto desde site_config (editable en el panel admin)
const defaultFeatures = ref([])
const loadedDefaults = ref(false)

async function loadDefaults() {
  if (loadedDefaults.value) return
  loadedDefaults.value = true
  // Cargar todos los defaults de una sola vez (compartido entre secciones)
  const defaults = await useSectionDefaultsShared()
  const sectionDefaults = defaults?.trust
  if (sectionDefaults?.features && Array.isArray(sectionDefaults.features)) {
    defaultFeatures.value = sectionDefaults.features
  }
}

onMounted(loadDefaults)

const features = computed(() => {
  if (Array.isArray(props.content.features) && props.content.features.length > 0) {
    return props.content.features
  }
  // Fallback: contenido editable desde site_config (si no hay configuración, se oculta la sección)
  return defaultFeatures.value
})
</script>
