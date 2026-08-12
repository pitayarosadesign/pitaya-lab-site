<template>
  <section class="py-20 bg-white/70">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <span v-if="content.subtitle" class="text-primary-600 font-semibold text-sm uppercase tracking-wider">{{ content.subtitle }}</span>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
          {{ content.title || 'Galería' }}
        </h2>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="group relative rounded-2xl overflow-hidden aspect-square bg-earth-100 cursor-pointer"
        >
          <img
            :src="image.url"
            :alt="image.alt || 'Imagen'"
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div v-if="image.caption" class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-earth-900/80 to-transparent">
            <p class="text-white text-sm font-medium">{{ image.caption }}</p>
          </div>
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

const images = computed(() => {
  if (Array.isArray(props.content.images) && props.content.images.length > 0) {
    return props.content.images
  }
  return []
})
</script>
