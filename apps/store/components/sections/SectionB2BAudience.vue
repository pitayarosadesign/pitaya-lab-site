<template>
  <section class="py-16 md:py-20 bg-earth-50/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 text-center mb-2">{{ title }}</h2>
      <p class="text-center text-earth-500 mb-12 max-w-2xl mx-auto">{{ subtitle }}</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(card, i) in cards"
          :key="i"
          class="group bg-white rounded-3xl p-8 border border-earth-100 hover:shadow-xl transition-all flex flex-col"
          :class="card.highlight ? 'hover:border-amber-400 ring-1 ring-amber-200/50' : 'hover:border-primary-300'"
        >
          <div class="text-4xl mb-4">{{ card.icon }}</div>
          <h3 class="text-xl font-serif font-bold text-earth-900 mb-2">{{ card.title }}</h3>
          <p class="text-sm text-earth-500 leading-relaxed flex-grow mb-4">{{ card.description }}</p>
          <div class="space-y-1.5 mb-4 text-sm">
            <p v-for="(point, j) in card.points" :key="j" class="flex items-center gap-2 text-earth-600">
              {{ point }}
            </p>
          </div>
          <a
            v-if="card.link"
            :href="card.link"
            class="font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all"
            :class="card.highlight ? 'text-amber-600' : 'text-primary-600'"
          >
            {{ card.cta_text || 'Cotizar →' }}
          </a>
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

const title = computed(() => props.content?.title || '¿Para quién es PITAYA LAB B2B?')
const subtitle = computed(() => props.content?.subtitle || 'Tres formas de trabajar juntos, según tu tipo de negocio o evento.')

const cards = computed(() => {
  const items = props.content?.cards || []
  if (items.length) return items
  // Fallback por defecto
  return [
    {
      icon: '📦',
      title: 'Mayoreo Comercial',
      description: 'Para tiendas boutique, cafeterías de especialidad y distribuidores que revenden nuestra línea regular. Descuento fijo por volumen sobre el precio público.',
      points: ['🎯 Mínimo: 20 piezas surtidas', '💸 Hasta 35% dto.', '🔥 Margen de ganancia saludable para ti'],
      link: '#calculadora-mayoreo',
      cta_text: 'Cotizar →',
      highlight: false,
    },
    {
      icon: '💍',
      title: 'Recuerdos & Eventos',
      description: 'Bodas, XV años, eventos corporativos. Recuerdos personalizados con tu diseño o nuestras plantillas, en envases perfumero con tu fragancia insignia.',
      points: ['💍 Mínimo: 30 piezas', '🏷️ Etiqueta 5×5 personalizada', '🎁 Kit premium opcional'],
      link: '#cotizador-eventos',
      cta_text: 'Arma tu recuerdo →',
      highlight: true,
    },
    {
      icon: '🏷️',
      title: 'Etiquetado Privado',
      description: 'Tu marca, nuestros productos. Personalizamos etiquetas con tu logotipo para que ofrezcas fragancias PITAYA LAB bajo tu propia marca.',
      points: ['🏷️ Diseño de etiquetas propio', '🔒 Exclusividad por zona', '🤝 Contacto directo'],
      link: '#contacto',
      cta_text: 'Hablemos →',
      highlight: false,
    },
  ]
})
</script>
