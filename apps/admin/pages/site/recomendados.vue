<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">🌐 Editor del Sitio Web</h1>
      <a :href="storeUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
        Ver sitio
      </a>
    </div>

    <EditorPageTabs active="recomendados" />

    <div>
      <h2 class="text-lg font-semibold text-gray-900">🏆 Recomendados</h2>
      <p class="text-sm text-gray-400 mt-0.5">Selecciona y ordena los productos recomendados que se muestran en la portada.</p>
    </div>

    <RecommendedProductsEditor />
  </div>
</template>

<script setup>
const runtime = useRuntimeConfig()
const storeUrl = runtime.public.storeUrl
</script>
