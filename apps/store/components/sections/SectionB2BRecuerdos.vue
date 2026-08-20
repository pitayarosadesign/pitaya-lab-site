<template>
  <section id="cotizador-eventos" class="py-16 md:py-20 bg-earth-50/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mb-10">
        <p class="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-2">{{ eyebrow }}</p>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900">{{ title }}</h2>
        <p class="text-earth-500 mt-3">{{ subtitle }}</p>
      </div>

      <CotizadorRecuerdos @order="$emit('order', $event)" />
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

defineEmits(['order'])

const eyebrow = computed(() => props.content?.eyebrow || 'Recuerdos para Eventos')
const title = computed(() => props.content?.title || 'Arma tu Recuerdo paso a paso')
const subtitle = computed(() => props.content?.subtitle || 'Elige tu envase, fragancia, diseño y cantidad. El precio se ajusta según el volumen. ¿Prefieres cotizar directo? Escríbenos.')
</script>
