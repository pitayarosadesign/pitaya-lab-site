<template>
  <div class="flex items-center gap-1 flex-wrap bg-white border border-gray-200 rounded-xl p-1">
    <button
      v-for="tab in tabs"
      :key="tab.to"
      @click="go(tab.to)"
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

const router = useRouter()

// Navegación programática robusta. Se usa router.push en lugar de navigateTo()
// porque navigateTo() en un handler de clic (sin await/return) no siempre
// dispara la navegación de forma inmediata en Nuxt.
function go(to) {
  router.push(to)
}

const tabs = [
  { key: 'home', label: 'Portada', icon: '🏠', to: '/site' },
  { key: 'catalog', label: 'Catálogo', icon: '🛍️', to: '/site/catalog' },
  { key: 'product', label: 'Producto', icon: '🏷️', to: '/site/product' },
  { key: 'about', label: 'Sobre Nosotros', icon: '📖', to: '/site/about' },
  { key: 'philosophy', label: 'Filosofía', icon: '🌿', to: '/site/philosophy' },
  { key: 'b2b', label: 'Mayoreo B2B', icon: '🏢', to: '/site/b2b' },
  { key: 'faq', label: 'FAQ', icon: '❓', to: '/site/faq' },
  { key: 'contact', label: 'Contacto', icon: '✉️', to: '/site/contact' },
  { key: 'contenido', label: 'Contenido', icon: '🧩', to: '/site/contenido' },
  { key: 'legal', label: 'Legal', icon: '📜', to: '/site/legal' },
  { key: 'apariencia', label: 'Apariencia', icon: '🎨', to: '/site/apariencia' },
]
</script>

