<template>

  <section v-if="values.length" class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <span v-if="content.subtitle" class="text-amber-600 font-semibold text-sm uppercase tracking-wider">{{ content.subtitle }}</span>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
          {{ content.title || '¿Por qué elegir PITAYA LAB?' }}
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(value, index) in values"
          :key="index"
          class="text-center p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-earth-100 hover:border-primary-200 transition-all hover:shadow-lg"
        >
          <div class="w-14 h-14 mx-auto mb-5 bg-gradient-to-br from-primary-100 to-amber-100 rounded-2xl flex items-center justify-center">
            <svg v-if="value.icon === 'leaf'" class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.372 7.264a6.5 6.5 0 0 1 9.615-4.934A6.5 6.5 0 0 1 21 8.5c0 5.63-9 12.5-9 12.5S3 14.13 3 8.5c0-.443.044-.878.128-1.3"/>
            </svg>
            <svg v-else-if="value.icon === 'shield'" class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <svg v-else-if="value.icon === 'heart'" class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z"/>
            </svg>
            <svg v-else class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-earth-800 mb-3">{{ value.title }}</h3>
          <p class="text-sm text-earth-500 leading-relaxed">{{ value.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

// Contenido por defecto desde site_config (editable en el panel admin)
const defaultValues = ref([])
const loadedDefaults = ref(false)

async function loadDefaults() {
  if (loadedDefaults.value) return
  loadedDefaults.value = true
  const defaults = await useSectionDefaults('values', null)
  if (defaults?.values && Array.isArray(defaults.values)) {
    defaultValues.value = defaults.values
  }
}

onMounted(loadDefaults)

const values = computed(() => {
  if (Array.isArray(props.content.values) && props.content.values.length > 0) {
    return props.content.values
  }
  // Fallback: contenido editable desde site_config (si no hay configuración, se oculta la sección)
  return defaultValues.value
})
</script>
