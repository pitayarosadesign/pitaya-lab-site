<template>
  <div class="space-y-6">
    <HeaderEditor :model="model" />

    <!-- Banner Prime -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">📦</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Banner Prime</h3>
          <p class="text-sm text-gray-500">Banner promocional de envío Prime</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <label class="flex items-center gap-2 cursor-pointer">
          <input v-model="model.prime_banner.enabled" type="checkbox" class="rounded text-primary-600 focus:ring-primary-100" />
          <span class="text-sm text-gray-700">{{ model.prime_banner.enabled ? 'Activo' : 'Inactivo' }}</span>
        </label>
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input v-model="model.prime_banner.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Texto</label>
            <textarea v-model="model.prime_banner.text" rows="3" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">❓</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Preguntas Frecuentes</h3>
          <p class="text-sm text-gray-500">Acordeones de preguntas y respuestas</p>
        </div>
      </div>
      <div class="p-6">
        <div class="flex items-center justify-between mb-3">
          <button @click="addFaq" class="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Agregar pregunta</button>
        </div>
        <div v-for="(faq, index) in model.faqs" :key="index" class="p-4 bg-gray-50 rounded-lg space-y-3 mb-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Pregunta {{ index + 1 }}</span>
            <button @click="model.faqs.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Pregunta</label>
            <input v-model="faq.question" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Respuesta (HTML)</label>
            <textarea v-model="faq.answer" rows="4" class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-mono" />
          </div>
        </div>
      </div>
    </div>

    <!-- Footer / CTA -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">💬</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Sección final</h3>
          <p class="text-sm text-gray-500">"¿Aún tienes dudas?"</p>
        </div>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="model.footer.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="model.footer.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
          <input v-model="model.footer.button_text" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const model = defineModel({ type: Object, required: true })

function addFaq() {
  if (!Array.isArray(model.value.faqs)) {
    model.value.faqs = []
  }
  model.value.faqs.push({ question: '', answer: '' })
}
</script>
