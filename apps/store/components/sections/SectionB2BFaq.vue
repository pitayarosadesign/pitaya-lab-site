<template>
  <section class="py-16 md:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-serif font-bold text-earth-900 text-center mb-10">{{ title }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div v-for="(faq, i) in faqs" :key="i" class="p-6 rounded-2xl border border-earth-100 bg-earth-50/40">
          <p class="font-semibold text-earth-800 mb-2">{{ faq.q }}</p>
          <p class="text-sm text-earth-500 leading-relaxed">{{ faq.a }}</p>
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

const title = computed(() => props.content?.title || 'Preguntas frecuentes B2B')

const faqs = computed(() => {
  const items = props.content?.faqs || []
  if (items.length) return items
  // Fallback por defecto
  return [
    { q: '¿Cuál es el mínimo para mayoreo comercial?', a: 'A partir de 20 piezas surtidas. El descuento aumenta de 25% (20–49 pzas) a 30% (51–99 pzas) y 35% (100+ pzas).' },
    { q: '¿Cuál es el mínimo para recuerdos personalizados?', a: 'A partir de 30 piezas del mismo diseño. Los precios unitarios bajan con el volumen (hasta $45–50 c/u en 100+ piezas).' },
    { q: '¿Cuánto tiempo tarda un pedido personalizado?', a: 'Hasta 15 días hábiles, según demanda. Te avisamos con antelación la programación y entrega estimada por correo.' },
    { q: '¿Puedo poner mi propia marca (etiquetado privado)?', a: 'Sí. Ofrecemos etiquetado privado con tu logotipo para que vendas las fragancias bajo tu propia marca.' },
    { q: '¿Se pueden mezclar productos para el mayoreo?', a: 'Sí. Las 20–30 piezas mínimas pueden ser surtidas entre brumas, velas y aceites.' },
    { q: '¿El envío está incluido en el mayoreo?', a: 'Los precios de mayoreo no incluyen IVA ni envío. El envío se cotiza por separado según volumen y destino.' },
  ]
})
</script>
