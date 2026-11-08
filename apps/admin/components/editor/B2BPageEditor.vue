<template>
  <div class="space-y-6">
    <!-- Hero compacto -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">🎯</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Hero compacto (Mayoreo)</h3>
          <p class="text-sm text-gray-500">Título, subtítulo y micro-beneficios de la parte superior</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Badge</label>
            <input v-model="model.hero.badge" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input v-model="model.hero.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
          <textarea v-model="model.hero.subtitle" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <p class="text-sm font-medium text-gray-700 mb-2">Micro-beneficios</p>
          <div v-for="(b, i) in model.hero.badges" :key="i" class="flex items-center gap-2 mb-2">
            <input v-model="b.icon" type="text" class="w-12 px-2 py-2 rounded-lg border border-gray-200 text-center focus:border-primary-400 outline-none text-sm" />
            <input v-model="b.text" type="text" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>
        </div>
      </div>
    </div>

    <!-- Kit de Muestras -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">🧴</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Kit de Muestras B2B</h3>
          <p class="text-sm text-gray-500">Lead magnet para clientes nuevos</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Eyebrow</label>
            <input v-model="model.sampleKit.eyebrow" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input v-model="model.sampleKit.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="model.sampleKit.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
          <input v-model="model.sampleKit.buttonText" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nota (reembolso)</label>
          <input v-model="model.sampleKit.note" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const model = defineModel({ type: Object, required: true })

if (!model.value.hero || typeof model.value.hero !== 'object') {
  model.value.hero = { badge: '', title: '', subtitle: '', badges: [] }
}
if (!Array.isArray(model.value.hero.badges)) {
  model.value.hero.badges = []
}
if (!model.value.sampleKit || typeof model.value.sampleKit !== 'object') {
  model.value.sampleKit = { eyebrow: '', title: '', description: '', buttonText: '', note: '', aromas: [] }
}
</script>
