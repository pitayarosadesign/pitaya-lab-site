<template>
  <div class="space-y-6">
    <!-- Mensaje sobre pedido (sin stock) -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">🧵</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Mensaje de "Sobre pedido"</h3>
          <p class="text-sm text-gray-500">Leyenda que se muestra cuando un aroma no tiene stock</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Leyenda completa</label>
          <textarea
            v-model="model.backorder_message"
            rows="3"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
            placeholder="Preparación sobre pedido: se elabora artesanalmente en taller (3-4 días), puede tardar más según demanda"
          />
          <p class="text-xs text-gray-400 mt-1">Aparece en ámbar junto al stock cuando el aroma se hace sobre pedido.</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto corto del botón (sobre pedido)</label>
          <input
            v-model="model.backorder_button_label"
            type="text"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
            placeholder="Agregar al carrito (sobre pedido)"
          />
        </div>
      </div>
    </div>

    <!-- Textos de disponibilidad -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">📦</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Mensajes de stock</h3>
          <p class="text-sm text-gray-500">Textos de disponibilidad de la página de producto</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">En stock</label>
          <input
            v-model="model.in_stock_label"
            type="text"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
            placeholder="En stock"
          />
          <p class="text-xs text-gray-400 mt-1">Puedes dejar vacío para ocultar la parte "en stock".</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Stock bajo (badge)</label>
          <input
            v-model="model.low_stock_label"
            type="text"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
            placeholder="¡Solo quedan X!"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const model = defineModel({ type: Object, required: true })
</script>
