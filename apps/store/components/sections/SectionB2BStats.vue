<template>
  <section v-if="stats.length" class="bg-white border-b border-earth-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div v-for="(stat, i) in stats" :key="i">
          <p class="text-3xl font-bold text-primary-600">{{ stat.value }}</p>
          <p class="text-xs text-earth-400 mt-1">{{ stat.label }}</p>
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
const defaultStats = ref([])
const loadedDefaults = ref(false)

async function loadDefaults() {
  if (loadedDefaults.value) return
  loadedDefaults.value = true
  // Cargar todos los defaults de una sola vez (compartido entre secciones)
  const defaults = await useSectionDefaultsShared()
  const sectionDefaults = defaults?.['b2b_stats']
  if (sectionDefaults?.stats && Array.isArray(sectionDefaults.stats)) {
    defaultStats.value = sectionDefaults.stats
  }
}

onMounted(loadDefaults)

const stats = computed(() => {
  const items = props.content?.stats || []
  if (items.length) return items
  // Fallback: contenido editable desde site_config (si no hay configuración, se oculta la sección)
  return defaultStats.value
})
</script>
