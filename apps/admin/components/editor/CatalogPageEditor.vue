<template>
  <div class="space-y-6">
    <!-- Header de la página -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">🛍️</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Encabezado del Catálogo</h3>
          <p class="text-sm text-gray-500">Título y descripción de la parte superior de la página</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Badge</label>
            <input v-model="model.header.badge" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input v-model="model.header.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Palabra resaltada</label>
            <input v-model="model.header.highlight" type="text" placeholder="Productos" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
            <p class="text-xs text-gray-400 mt-1">Se muestra con degradado de color en el título</p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="model.header.description" rows="3" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
      </div>
    </div>

    <!-- Guía de Aromas -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">🌿</span>
        <div class="flex-1">
          <h3 class="text-lg font-bold text-gray-900">Guía de Aromas</h3>
          <p class="text-sm text-gray-500">La tabla de aromas al final del catálogo</p>
        </div>
        <!-- Toggle para mostrar/ocultar la sección -->
        <label class="flex items-center gap-2 cursor-pointer select-none">
          <span class="text-sm font-medium text-gray-600">Mostrar</span>
          <button
            type="button"
            @click="model.scent_guide.enabled = !model.scent_guide.enabled"
            class="relative w-11 h-6 rounded-full transition-colors"
            :class="model.scent_guide.enabled ? 'bg-primary-600' : 'bg-gray-300'"
          >
            <span
              class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
              :class="model.scent_guide.enabled ? 'translate-x-5' : ''"
            />
          </button>
        </label>
      </div>
      <div v-if="model.scent_guide.enabled" class="p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Badge</label>
            <input v-model="model.scent_guide.badge" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input v-model="model.scent_guide.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="model.scent_guide.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Disclaimer (nota legal)</label>
          <textarea v-model="model.scent_guide.disclaimer" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          <p class="text-xs text-gray-400 mt-1">Se muestra debajo de la tabla de aromas</p>
        </div>
      </div>
    </div>

    <!-- CTA Amazon -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">🚀</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">CTA Final (Amazon)</h3>
          <p class="text-sm text-gray-500">Banner de llamada a la acción al final de la página</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="model.cta.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="model.cta.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
            <input v-model="model.cta.button_text" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Link del botón</label>
            <input v-model="model.cta.button_link" type="url" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const model = defineModel({ type: Object, required: true })
</script>
