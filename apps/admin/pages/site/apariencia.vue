<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <!-- Encabezado -->
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">🎨 Apariencia del Sitio</h1>
        <p class="text-sm text-gray-400 mt-1">
          Personaliza la paleta de colores y la apariencia general de tu tienda.
        </p>
      </div>
      <a
        :href="storeUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
        Ver sitio
      </a>
    </div>

    <!-- Navegación por páginas -->
    <EditorPageTabs active="apariencia" />

    <!-- Editor de paleta de colores -->
    <ThemeEditor />
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Apariencia | PITAYA LAB' })

const config = useRuntimeConfig()
const storeUrl = config.public.storeUrl
</script>
