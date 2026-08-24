<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <label class="text-sm font-medium text-gray-700">{{ label }}</label>
      <span class="text-xs text-gray-400 font-mono">{{ activeShade }}</span>
    </div>

    <!-- Selector de tono principal -->
    <div class="flex items-center gap-3">
      <input
        type="color"
        :value="modelValue[500] || modelValue[600] || '#000000'"
        @input="updateBaseColor($event.target.value)"
        class="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer flex-shrink-0"
      />
      <div class="flex-1">
        <input
          type="text"
          :value="modelValue[500] || modelValue[600] || ''"
          @input="updateBaseColor($event.target.value)"
          class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono"
          placeholder="#22c55e"
        />
      </div>
    </div>

    <!-- Escala de tonos -->
    <div class="space-y-1.5">
      <div
        v-for="shade in shades"
        :key="shade"
        class="flex items-center gap-2 group"
      >
        <span class="w-8 text-[11px] text-gray-400 font-mono flex-shrink-0">{{ shade }}</span>
        <div
          class="w-8 h-8 rounded-lg border border-gray-200 flex-shrink-0"
          :style="{ backgroundColor: modelValue[shade] || '#ffffff' }"
        ></div>
        <input
          type="color"
          :value="modelValue[shade] || '#ffffff'"
          @input="updateShade(shade, $event.target.value)"
          class="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer flex-shrink-0 opacity-0 absolute pointer-events-none"
          :id="`color-${label}-${shade}`"
        />
        <input
          type="text"
          :value="modelValue[shade] || ''"
          @input="updateShade(shade, $event.target.value)"
          class="flex-1 px-2 py-1.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-xs font-mono"
          :placeholder="defaultScale[shade] || ''"
        />
        <button
          @click="resetShade(shade)"
          class="p-1 text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Restablecer tono"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Barra de escala visual -->
    <div class="flex rounded-lg overflow-hidden border border-gray-200">
      <div
        v-for="shade in shades"
        :key="shade"
        class="flex-1 h-6"
        :style="{ backgroundColor: modelValue[shade] || '#ffffff' }"
        :title="`${shade}: ${modelValue[shade] || ''}`"
      ></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Object, required: true },
  label: { type: String, default: '' },
  defaultScale: { type: Object, required: true },
})

const emit = defineEmits(['update:modelValue'])

const shades = computed(() => {
  return Object.keys(props.defaultScale).sort((a, b) => Number(a) - Number(b))
})

const activeShade = computed(() => {
  return props.modelValue[500] || props.modelValue[600] || ''
})

function updateShade(shade, value) {
  const updated = { ...props.modelValue, [shade]: value }
  emit('update:modelValue', updated)
}

function updateBaseColor(value) {
  // Actualizar el tono base (500) y generar variaciones automáticamente
  const updated = { ...props.modelValue, 500: value }
  emit('update:modelValue', updated)
}

function resetShade(shade) {
  const updated = { ...props.modelValue, [shade]: props.defaultScale[shade] }
  emit('update:modelValue', updated)
}
</script>

