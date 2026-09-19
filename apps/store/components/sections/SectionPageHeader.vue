<template>
  <section class="relative overflow-hidden" :class="sectionBg">
    <!-- Imagen de fondo opcional -->
    <img
      v-if="content.image_url"
      :src="content.image_url"
      alt=""
      class="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
    />
    <div v-if="content.image_url" class="absolute inset-0" :class="content.overlay || 'bg-earth-950/60'"></div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" :class="compact ? 'py-8 md:py-10' : 'py-16 md:py-24'">
      <div class="max-w-3xl" :class="content.alignment === 'left' ? 'text-left' : 'mx-auto text-center'">
        <span
          v-if="content.badge"
          class="inline-block font-semibold text-sm uppercase tracking-wider mb-3"
          :class="onDark ? 'text-primary-200' : 'text-primary-600'"
        >{{ content.badge }}</span>

        <h1 class="font-serif font-bold" :class="[compact ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl', onDark ? 'text-white' : 'text-earth-900']">
          {{ content.title || 'Encabezado de página' }}<span v-if="content.highlight" :class="onDark ? 'text-primary-300' : 'text-primary-600'"> {{ content.highlight }}</span>
        </h1>

        <p v-if="content.description" class="mt-4 leading-relaxed" :class="[compact ? 'text-base' : 'text-lg', onDark ? 'text-white/90' : 'text-earth-600']">
          {{ content.description }}
        </p>

        <div v-if="content.cta_text && content.cta_link" class="mt-8">
          <a
            :href="content.cta_link"
            class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-base font-semibold transition-all"
          >
            {{ content.cta_text }}
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

const onDark = computed(() => !!props.content.image_url || props.settings.background === 'dark')
const compact = computed(() => props.settings.compact === true)

const sectionBg = computed(() => {
  if (props.content.image_url) return 'bg-earth-900'
  return props.settings.background === 'dark' ? 'bg-earth-900' : 'bg-gradient-to-b from-primary-50 to-white'
})
</script>
