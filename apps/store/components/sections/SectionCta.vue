<template>
  <section class="py-20 bg-gradient-to-r from-primary-900 to-earth-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
        {{ content.title || '¿Listo para transformar tu hogar?' }}
      </h2>
      <p v-if="content.description" class="text-primary-200 text-lg mb-8 max-w-2xl mx-auto">
        {{ content.description }}
      </p>
      <a
        :href="content.button_link || 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329'"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 px-10 py-5 rounded-full transition-all hover:shadow-xl hover:shadow-amber-900/30"
      >
        <img
          src="/images/amazon-logo.svg"
          alt="Amazon México"
          class="h-8 w-auto"
        />
      </a>
    </div>
  </section>
</template>

<script setup>
defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})
</script>
