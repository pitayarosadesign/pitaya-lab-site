<template>
  <div class="space-y-6">
    <HeaderEditor :model="model" />

    <!-- Mensaje de éxito -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">✅</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Mensaje de éxito</h3>
          <p class="text-sm text-gray-500">Se muestra después de enviar la reseña</p>
        </div>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="model.success.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="model.success.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
          <input v-model="model.success.button_text" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Link del botón</label>
          <input v-model="model.success.button_link" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  model: { type: Object, required: true },
})
</script>
