<template>
  <section id="calculadora-mayoreo" class="py-16 md:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mb-10">
        <p class="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">{{ eyebrow }}</p>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900">{{ title }}</h2>
        <p class="text-earth-500 mt-3">{{ subtitle }}</p>
      </div>

      <CalculadoraMayoreo @order="$emit('order', $event)" />
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

defineEmits(['order'])

const eyebrow = computed(() => props.content?.eyebrow || 'Mayoreo Comercial')
const title = computed(() => props.content?.title || 'Calculadora de Mayoreo')
const subtitle = computed(() => props.content?.subtitle || 'Cotiza tu pedido al instante. El descuento se aplica automáticamente según el volumen total.')
</script>

