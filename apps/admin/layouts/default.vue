<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0"
      :class="[sidebarOpen ? 'translate-x-0' : '-translate-x-full']"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center px-6 border-b border-gray-100">
        <NuxtLink to="/dashboard" class="flex items-center gap-3">
          <img
            src="/images/logo-pitayalab.png"
            alt="PITAYA LAB"
            class="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <h1 class="text-sm font-bold text-gray-900 leading-tight">PITAYA LAB</h1>
            <p class="text-[10px] text-gray-400">Administración</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Navegación -->
      <nav class="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
        <template v-for="group in navGroups" :key="group.label">
          <!-- Grupo con submenú -->
          <div v-if="group.children">
            <button
              type="button"
              @click="toggleGroup(group.label)"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              :class="isGroupActive(group) ? 'text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
            >
              <span class="text-lg">{{ group.icon }}</span>
              <span class="flex-1 text-left">{{ group.label }}</span>
              <svg
                class="w-4 h-4 transition-transform"
                :class="openGroups.includes(group.label) ? 'rotate-90' : ''"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
            <div v-show="openGroups.includes(group.label)" class="mt-0.5 ml-4 pl-3 border-l border-gray-100 space-y-0.5">
              <NuxtLink
                v-for="item in group.children"
                :key="item.to"
                :to="item.to"
                class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors"
                :class="isActive(item.to) ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'"
              >
                <span class="text-base">{{ item.icon }}</span>
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>

          <!-- Enlace simple -->
          <NuxtLink
            v-else
            :to="group.to"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
            :class="isActive(group.to) ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
          >
            <span class="text-lg">{{ group.icon }}</span>
            {{ group.label }}
          </NuxtLink>
        </template>
      </nav>
    </aside>

    <!-- Overlay móvil -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-30 bg-black/20 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col lg:pl-64">
      <!-- Header -->
      <header class="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div class="flex items-center justify-between h-full px-4 lg:px-8">
          <div class="flex items-center gap-4">
            <!-- Botón menú móvil -->
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>

            <!-- Título de página -->
            <h2 class="text-lg font-semibold text-gray-900">{{ pageTitle }}</h2>
          </div>

          <!-- Perfil del admin -->
          <div class="flex items-center gap-4">
            <button
              @click="handleLogout"
              class="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              Salir
            </button>
          </div>
        </div>
      </header>

      <!-- Contenido -->
      <main class="flex-1 p-4 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const supabase = useSupabase()
const sidebarOpen = ref(false)

// Navegación agrupada. Los grupos con `children` se muestran como submenús.
const navGroups = [
  { icon: '📊', label: 'Dashboard', to: '/dashboard' },
  {
    icon: '📦', label: 'Productos',
    children: [
      { icon: '📦', label: 'Todos los productos', to: '/products' },
      { icon: '🗂️', label: 'Categorías', to: '/categories' },
      { icon: '🌾', label: 'Aromas', to: '/aromas' },
      { icon: '🧴', label: 'Envases Recuerdos', to: '/recuerdo-envases' },
      { icon: '📦', label: 'Inventario', to: '/inventory' },
    ],
  },
  {
    icon: '🛒', label: 'Ventas',
    children: [
      { icon: '🛒', label: 'Órdenes', to: '/orders' },
      { icon: '👥', label: 'Clientes', to: '/customers' },
      { icon: '🏷️', label: 'Cupones', to: '/coupons' },
      { icon: '🏪', label: 'Showroom', to: '/commerce' },
    ],
  },
  {
    icon: '🎨', label: 'Sitio Web',
    children: [
      { icon: '🎨', label: 'Editar Sitio Web', to: '/site' },
      { icon: '📄', label: 'Páginas', to: '/paginas' },
      { icon: '💬', label: 'Reseñas', to: '/reviews' },
    ],
  },
  {
    icon: '📈', label: 'Análisis',
    children: [
      { icon: '📈', label: 'Analíticas', to: '/analytics' },
      { icon: '📡', label: 'Catálogos', to: '/catalog-feeds' },
    ],
  },
  { icon: '⚙️', label: 'Configuración', to: '/settings' },
]

// Grupos abiertos (submenús desplegados)
const openGroups = ref([])

function toggleGroup(label) {
  const i = openGroups.value.indexOf(label)
  if (i === -1) openGroups.value.push(label)
  else openGroups.value.splice(i, 1)
}

function isGroupActive(group) {
  return group.children?.some(c => isActive(c.to))
}

// Abrir automáticamente el grupo que contiene la ruta activa
watchEffect(() => {
  for (const g of navGroups) {
    if (g.children && isGroupActive(g) && !openGroups.value.includes(g.label)) {
      openGroups.value.push(g.label)
    }
  }
})

const pageTitle = computed(() => {
  for (const g of navGroups) {
    if (g.children) {
      const child = g.children.find(c => route.path.startsWith(c.to))
      if (child) return child.label
    } else if (route.path.startsWith(g.to)) {
      return g.label
    }
  }
  return 'Panel de Administración'
})

function isActive(path) {
  if (path === '/dashboard') return route.path === '/dashboard'
  return route.path.startsWith(path)
}

async function handleLogout() {
  await supabase.auth.signOut()
  navigateTo('/login')
}
</script>

