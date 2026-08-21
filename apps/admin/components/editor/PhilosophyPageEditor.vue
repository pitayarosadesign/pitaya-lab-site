<template>
  <div class="space-y-6">
    <HeaderEditor :model="model" />

    <!-- Manifiesto -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">🌿</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Manifiesto PITAYA LAB</h3>
          <p class="text-sm text-gray-500">Los 5 pilares de nuestra filosofía</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div>
          <EditorImageUrlField v-model="model.manifesto.image_url" label="Imagen del sello ecológico" />
        </div>
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-medium text-gray-700">Pilares del manifiesto</label>
            <button @click="addManifestoItem" class="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Agregar pilar</button>
          </div>
          <div v-for="(item, index) in model.manifesto.items" :key="index" class="p-4 bg-gray-50 rounded-lg space-y-3 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">Pilar {{ index + 1 }}</span>
              <button @click="model.manifesto.items.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input v-model="item.icon" type="text" placeholder="Emoji (ej: 🌱)" class="px-3 py-2 rounded-lg border border-gray-200 text-sm" />
              <input v-model="item.title" type="text" placeholder="Título" class="px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            </div>
            <textarea v-model="item.description" rows="2" placeholder="Descripción" class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
        </div>
      </div>
    </div>

    <!-- Compromiso Ambiental -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">🌎</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Compromiso Ambiental</h3>
          <p class="text-sm text-gray-500">Sección de eco-compromiso con lista de compromisos</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Badge</label>
            <input v-model="model.eco.badge" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input v-model="model.eco.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
          </div>
          <div class="md:col-span-2">
            <EditorImageUrlField v-model="model.eco.image_url" label="Imagen (compromiso ecológico)" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Texto introductorio</label>
            <textarea v-model="model.eco.intro" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-medium text-gray-700">Compromisos</label>
            <button @click="model.eco.commitments.push('')" class="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Agregar compromiso</button>
          </div>
          <div v-for="(item, index) in model.eco.commitments" :key="index" class="flex items-center gap-2 mb-2">
            <input v-model="model.eco.commitments[index]" type="text" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            <button @click="model.eco.commitments.splice(index, 1)" class="text-red-400 hover:text-red-600 text-sm">✕</button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto de cierre</label>
          <textarea v-model="model.eco.outro" rows="3" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">🚀</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Call to Action</h3>
          <p class="text-sm text-gray-500">Sección final de la página</p>
        </div>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="model.cta.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="model.cta.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
          <input v-model="model.cta.button_text" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const model = defineModel({ type: Object, required: true })

function addManifestoItem() {
  if (!Array.isArray(model.value.manifesto.items)) {
    model.value.manifesto = { ...model.value.manifesto, items: [] }
  }
  model.value.manifesto.items.push({ icon: '✨', title: '', description: '' })
}
</script>
