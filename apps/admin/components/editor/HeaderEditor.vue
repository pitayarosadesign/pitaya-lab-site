<template>
  <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
    <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
      <span class="text-2xl">🔝</span>
      <div>
        <h3 class="text-lg font-bold text-gray-900">Encabezado de la página</h3>
        <p class="text-sm text-gray-500">Badge, título y descripción mostrados en la parte superior</p>
      </div>
    </div>
    <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Badge <span class="text-gray-400 text-xs">(etiqueta superior)</span>
        </label>
        <input v-model="model.header.badge" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Título <span class="text-gray-400 text-xs">(parte antes del destacado)</span>
        </label>
        <input v-model="model.header.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Palabra destacada <span class="text-gray-400 text-xs">(resaltada en la portada)</span>
        </label>
        <input v-model="model.header.highlight" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        <p class="text-xs text-gray-400 mt-1">Ej: "PITAYA LAB" se muestra con gradiente de color</p>
      </div>
      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea v-model="model.header.description" rows="3" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  model: { type: Object, required: true },
})
</script>

