<template>
  <div class="space-y-6">
    <HeaderEditor :model="model" />

    <!-- Tarjetas de información -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">💡</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Tarjetas de información</h3>
          <p class="text-sm text-gray-500">Los 3 bloques de información bajo el formulario</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div class="flex items-center justify-between">
          <button @click="addCard" class="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Agregar tarjeta</button>
        </div>
        <div v-for="(card, index) in model.info_cards" :key="index" class="p-4 bg-gray-50 rounded-lg space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Tarjeta {{ index + 1 }}</span>
            <button @click="model.info_cards.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input v-model="card.icon" type="text" placeholder="Icono (clock/box/shield)" class="px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            <input v-model="card.title" type="text" placeholder="Título" class="px-3 py-2 rounded-lg border border-gray-200 text-sm md:col-span-2" />
          </div>
          <input v-model="card.description" type="text" placeholder="Descripción" class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
        </div>
      </div>
    </div>

    <!-- Mensaje de éxito -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">✅</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Mensaje de éxito</h3>
          <p class="text-sm text-gray-500">Se muestra al enviar el formulario correctamente</p>
        </div>
      </div>
      <div class="p-6 grid grid-cols-1 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="model.success.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="model.success.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const model = defineModel({ type: Object, required: true })

function addCard() {
  if (!Array.isArray(model.value.info_cards)) {
    model.value.info_cards = []
  }
  model.value.info_cards.push({ icon: 'clock', title: '', description: '' })
}
</script>
