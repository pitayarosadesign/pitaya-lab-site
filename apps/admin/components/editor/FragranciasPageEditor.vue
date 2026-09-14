<template>
  <div class="space-y-6">
    <HeaderEditor :model="model" />

    <div class="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 leading-relaxed">
      💡 Las tarjetas de fragancias se cargan automáticamente desde el catálogo de fragancias.
      Aquí solo se edita el encabezado de esta página.
    </div>
  </div>
</template>

<script setup>
defineProps({
  model: { type: Object, required: true },
})
</script>
