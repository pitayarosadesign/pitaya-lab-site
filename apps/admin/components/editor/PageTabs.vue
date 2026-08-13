<template>
  <div class="flex items-center gap-1 flex-wrap bg-white border border-gray-200 rounded-xl p-1">
    <button
      v-for="tab in tabs"
      :key="tab.to"
      @click="navigateTo(tab.to)"
      class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      :class="active === tab.key
        ? 'bg-primary-600 text-white shadow-sm'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
    >
      <span class="mr-1.5">{{ tab.icon }}</span>{{ tab.label }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  active: { type: String, required: true },
})

const tabs = [
  { key: 'home', label: 'Portada', icon: '🏠', to: '/site' },
  { key: 'catalog', label: 'Catálogo', icon: '🛍️', to: '/site/catalog' },
  { key: 'about', label: 'Sobre Nosotros', icon: '📖', to: '/site/about' },
  { key: 'philosophy', label: 'Filosofía', icon: '🌿', to: '/site/philosophy' },
  { key: 'faq', label: 'FAQ', icon: '❓', to: '/site/faq' },
  { key: 'contact', label: 'Contacto', icon: '✉️', to: '/site/contact' },
  { key: 'legal', label: 'Legal', icon: '📜', to: '/site/legal' },
]
</script>
