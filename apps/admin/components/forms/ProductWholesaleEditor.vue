<template>
  <div class="space-y-4">
    <!-- Interruptor principal -->
    <label class="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        :checked="value.enabled"
        @change="setEnabled($event.target.checked)"
        class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-400"
      />
      <span class="text-sm font-medium text-gray-700">Este producto tiene precio de negocio (mayoreo)</span>
    </label>

    <template v-if="value.enabled">
      <!-- Tipo de descuento -->
      <div class="flex items-center gap-2">
        <label class="text-xs font-medium text-gray-500 w-32">Tipo de descuento</label>
        <div class="flex rounded-lg border border-gray-200 overflow-hidden">
          <button
            type="button"
            @click="setDiscountType('percent')"
            class="px-4 py-2 text-sm font-medium transition-colors"
            :class="value.discountType === 'percent' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
          >Porcentaje (%)</button>
          <button
            type="button"
            @click="setDiscountType('fixed')"
            class="px-4 py-2 text-sm font-medium transition-colors"
            :class="value.discountType === 'fixed' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
          >Monto fijo ($)</button>
        </div>
      </div>

      <!-- Tramos de cantidad -->
      <div class="border border-gray-100 rounded-xl p-4 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-gray-800">Tramos por cantidad</h3>
          <button
            type="button"
            @click="addTier"
            class="text-xs font-medium text-primary-600 hover:text-primary-700"
          >+ Agregar tramo</button>
        </div>
        <p class="text-xs text-gray-400">
          El cliente obtiene el descuento del tramo según cuántas piezas compre. Cuanto más compra, mayor descuento.
        </p>

        <div v-if="tiers.length === 0" class="text-sm text-gray-400">
          Aún no hay tramos. Agrega al menos uno.
        </div>

        <div v-for="(t, ti) in tiers" :key="ti" class="flex items-center gap-2">
          <span class="text-xs text-gray-500 whitespace-nowrap">Desde</span>
          <input
            :value="t.min"
            @input="setTier(ti, 'min', $event.target.value)"
            type="number"
            min="1"
            placeholder="20"
            class="w-24 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
          />
          <span class="text-xs text-gray-500 whitespace-nowrap">pzas →</span>
          <span class="text-sm font-semibold text-primary-700">{{ value.discountType === 'percent' ? '−' : '−$' }}</span>
          <input
            :value="t.value"
            @input="setTier(ti, 'value', $event.target.value)"
            type="number"
            min="0"
            step="0.01"
            :placeholder="value.discountType === 'percent' ? '15' : '20'"
            class="w-24 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
          />
          <span class="text-xs text-gray-500">{{ value.discountType === 'percent' ? '%' : 'MXN' }}</span>
          <button
            type="button"
            @click="removeTier(ti)"
            class="text-gray-400 hover:text-red-500 px-1 ml-auto"
            aria-label="Quitar tramo"
          >✕</button>
        </div>
      </div>
    </template>

    <p v-else class="text-xs text-gray-400">
      Actívalo para mostrar automáticamente el "precio negocio" en el catálogo y aplicar descuentos por volumen.
    </p>
  </div>
</template>

<script setup>
/**
 * 💼 Editor de Mayoreo / Precio de Negocio (tramos por cantidad)
 * -------------------------------------------------------------
 * Cada producto define tramos por cantidad, al estilo Mercado Libre:
 *   { min: 20, value: 15 }  → desde 20 pzas, −15% (o −$15 si es fijo)
 *
 * Se guarda en products.wholesale_tiers (JSONB):
 * { enabled, discountType: 'percent'|'fixed', tiers: [{ min, value }] }
 */
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Object, default: null },
})

const emit = defineEmits(['update:modelValue'])

const DEFAULTS = {
  enabled: false,
  discountType: 'percent',
  tiers: [],
}

// Estado normalizado.
const value = computed(() => {
  const v = props.modelValue || {}
  return {
    enabled: !!v.enabled,
    discountType: v.discountType === 'fixed' ? 'fixed' : 'percent',
    tiers: Array.isArray(v.tiers) ? v.tiers : [],
  }
})

// Tramos (se muestran tal cual se capturan; el ordenamiento para cálculo se
// hace en el composable useWholesale).
const tiers = computed(() => value.value.tiers)

function emitValue(next) {
  emit('update:modelValue', { ...DEFAULTS, ...next })
}

function setEnabled(enabled) {
  emitValue({ ...value.value, enabled })
}

function setDiscountType(discountType) {
  emitValue({ ...value.value, discountType })
}

function addTier() {
  emitValue({
    ...value.value,
    tiers: [...value.value.tiers, { min: '', value: '' }],
  })
}

function setTier(index, field, val) {
  const next = value.value.tiers.map((t, i) =>
    i === index
      ? {
          ...t,
          [field]: val === ''
            ? ''
            : (field === 'min' ? (parseInt(val) || 0) : (parseFloat(val) || 0)),
        }
      : t
  )
  emitValue({ ...value.value, tiers: next })
}

function removeTier(index) {
  emitValue({
    ...value.value,
    tiers: value.value.tiers.filter((_, i) => i !== index),
  })
}
</script>
