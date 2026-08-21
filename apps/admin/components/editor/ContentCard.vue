<template>
  <div class="bg-white rounded-xl border border-gray-200 p-6">
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-base font-semibold text-gray-900">{{ title }}</h3>
        <p class="text-sm text-gray-400 mt-0.5">{{ desc }}</p>
      </div>
      <button
        @click="$emit('save')"
        class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-shrink-0"
        :disabled="saving"
      >
        {{ saving ? 'Guardando...' : 'Guardar' }}
      </button>
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  desc: { type: String, default: '' },
  saving: { type: Boolean, default: false },
})
defineEmits(['save'])
</script>
