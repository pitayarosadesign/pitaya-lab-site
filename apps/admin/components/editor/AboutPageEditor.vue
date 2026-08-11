<template>
  <div class="space-y-6">
    <HeaderEditor :model="model" />

    <!-- Nuestra Historia -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">📖</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Nuestra Historia</h3>
          <p class="text-sm text-gray-500">Sección principal de la página con imágenes y párrafos</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Badge</label>
            <input v-model="model.story.badge" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input v-model="model.story.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Imagen principal (URL)</label>
            <input v-model="model.story.image_url" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Imagen secundaria (URL)</label>
            <input v-model="model.story.secondary_image_url" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Alt imagen principal</label>
            <input v-model="model.story.image_alt" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Alt imagen secundaria</label>
            <input v-model="model.story.secondary_image_alt" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-medium text-gray-700">Párrafos de la historia</label>
            <button @click="addParagraph" class="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Agregar párrafo</button>
          </div>
          <div v-for="(p, index) in model.story.paragraphs" :key="index" class="flex items-start gap-2 mb-2">
            <textarea v-model="model.story.paragraphs[index]" rows="2" class="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
            <button @click="model.story.paragraphs.splice(index, 1)" class="text-red-400 hover:text-red-600 mt-2 text-sm">✕</button>
          </div>
          <p class="text-xs text-gray-400">Puedes usar <code class="bg-gray-100 px-1 rounded">&lt;strong&gt;</code> para resaltar texto.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const model = defineModel({ type: Object, required: true })

function addParagraph() {
  if (!Array.isArray(model.value.story.paragraphs)) {
    model.value.story = { ...model.value.story, paragraphs: [] }
  }
  model.value.story.paragraphs.push('')
}
</script>
