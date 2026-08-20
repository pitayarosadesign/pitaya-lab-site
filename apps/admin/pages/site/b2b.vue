<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <!-- Encabezado -->
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">🏢 Página Mayoreo & Corporativo</h1>
        <p class="text-sm text-gray-400 mt-1">
          Gestiona las secciones de la página B2B. Arrastra para reordenar, haz clic para editar.
        </p>
      </div>
      <a
        :href="storeUrl + '/b2b'"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
        Ver página B2B
      </a>
    </div>

    <!-- Navegación por páginas -->
    <EditorPageTabs active="b2b" />

    <!-- Editor de secciones dinámicas -->
    <EditorSectionsEditor page="b2b" />
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const storeUrl = config.public.storeUrl
</script>
