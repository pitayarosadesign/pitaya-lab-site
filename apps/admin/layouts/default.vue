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
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="isActive(item.to) ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
        >
          <span class="text-lg">{{ item.icon }}</span>
          {{ item.label }}
        </NuxtLink>
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

const navItems = [
  { icon: '📊', label: 'Dashboard', to: '/dashboard' },
  { icon: '📦', label: 'Productos', to: '/products' },
  { icon: '🛒', label: 'Órdenes', to: '/orders' },
  { icon: '👥', label: 'Clientes', to: '/customers' },
  { icon: '🏷️', label: 'Cupones', to: '/coupons' },
  { icon: '🎨', label: 'Editar Sitio Web', to: '/site' },
  { icon: '📈', label: 'Analíticas', to: '/analytics' },
  { icon: '📡', label: 'Catálogos', to: '/catalog-feeds' },
  { icon: '⚙️', label: 'Configuración', to: '/settings' },
]

const pageTitle = computed(() => {
  const item = navItems.find(i => route.path.startsWith(i.to))
  return item?.label || 'Panel de Administración'
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

