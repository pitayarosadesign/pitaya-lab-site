<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <!-- Encabezado -->
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">🌐 Editor del Sitio Web</h1>
        <p class="text-sm text-gray-400 mt-1">
          Gestiona las páginas y las secciones de tu tienda. Arrastra para reordenar, haz clic para editar.
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
    <EditorPageTabs active="home" />

    <!-- Editor de secciones dinámicas (la portada se arma desde page_sections) -->
    <EditorSectionsEditor page="home" />
  </div>
</template>

<script setup>
// La página de portada se edita mediante el sistema dinámico de secciones (page_sections).
// SectionsEditor gestiona crear, editar, reordenar, activar y eliminar cada sección.
// Las secciones de la promoción / historically hardcodeadas viven ahora en page_sections.

// URL de la tienda pública (para el link "Ver sitio")
const config = useRuntimeConfig()
const storeUrl = config.public.storeUrl
</script>
