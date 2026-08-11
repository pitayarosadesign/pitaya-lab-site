<template>
  <div class="space-y-6">
    <HeaderEditor :model="model" />

    <!-- Secciones legales -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">📜</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Secciones del documento</h3>
          <p class="text-sm text-gray-500">Cada sección tiene un título y contenido (HTML permitido)</p>
        </div>
      </div>
      <div class="p-6">
        <div class="flex items-center justify-between mb-3">
          <button @click="addSection" class="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Agregar sección</button>
        </div>
        <div v-for="(section, index) in model.sections" :key="index" class="p-4 bg-gray-50 rounded-lg space-y-3 mb-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Sección {{ index + 1 }}</span>
            <button @click="model.sections.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Título</label>
            <input v-model="section.title" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Contenido (HTML)</label>
            <textarea v-model="section.content" rows="6" class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-mono" />
          </div>
        </div>
      </div>
    </div>

    <!-- Nota final -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">📌</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Nota destacada</h3>
          <p class="text-sm text-gray-500">Caja resaltada al final del documento</p>
        </div>
      </div>
      <div class="p-6">
        <label class="block text-sm font-medium text-gray-700 mb-1">Nota (HTML)</label>
        <textarea v-model="model.note" rows="3" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-mono" />
      </div>
    </div>
  </div>
</template>

<script setup>
const model = defineModel({ type: Object, required: true })

function addSection() {
  if (!Array.isArray(model.value.sections)) {
    model.value.sections = []
  }
  model.value.sections.push({ title: '', content: '' })
}
</script>
