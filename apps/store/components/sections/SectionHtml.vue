<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- HTML libre -->
      <div v-if="content.html" v-html="content.html"></div>
      <div v-else class="text-center text-earth-400">
        <p>Sección HTML vacía. Agrega contenido desde el panel admin.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})
</script>
