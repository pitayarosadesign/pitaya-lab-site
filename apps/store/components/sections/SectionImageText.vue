<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" :class="imageOnRight ? '' : 'lg:[&>*:first-child]:order-2'">
        <!-- Imagen -->
        <div class="relative">
          <img
            v-if="content.image_url"
            :src="content.image_url"
            :alt="content.title || 'Imagen'"
            class="w-full h-[400px] object-cover rounded-2xl shadow-lg"
            loading="lazy"
          />
          <div v-else class="w-full h-[400px] bg-gradient-to-br from-primary-100 to-amber-100 rounded-2xl flex items-center justify-center">
            <span class="text-6xl">🖼️</span>
          </div>
        </div>

        <!-- Texto -->
        <div>
          <span v-if="content.subtitle" class="text-primary-600 font-semibold text-sm uppercase tracking-wider">{{ content.subtitle }}</span>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
            {{ content.title }}
          </h2>
          <div v-if="content.body" class="prose prose-lg max-w-none text-earth-600" v-html="content.body"></div>
          <a
            v-if="content.button_text"
            :href="content.button_link || '#'"
            class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-base font-semibold transition-all mt-6"
          >
            {{ content.button_text }}
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

const imageOnRight = computed(() => props.settings.image_position !== 'left')
</script>
