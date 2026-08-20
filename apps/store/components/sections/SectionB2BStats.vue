<template>
  <section class="bg-white border-b border-earth-100">
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

const stats = computed(() => {
  const items = props.content?.stats || []
  if (items.length) return items
  // Fallback por defecto
  return [
    { value: '25–35%', label: 'Dto. por volumen B2B' },
    { value: '30+', label: 'Recuerdos personalizados' },
    { value: '100%', label: 'Botánico y biodegradable' },
    { value: '≤15 d', label: 'Días hábiles entrega' },
  ]
})
</script>
