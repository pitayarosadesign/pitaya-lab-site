<template>
  <div class="space-y-6">
    <!-- Tarjetas de resumen -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="(card, index) in summaryCards"
        :key="index"
        class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-500">{{ card.label }}</span>
          <span class="text-2xl">{{ card.icon }}</span>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ card.value }}</p>
        <p v-if="card.change" class="text-xs mt-1" :class="card.change > 0 ? 'text-green-600' : 'text-red-500'">
          {{ card.change > 0 ? '↑' : '↓' }} {{ Math.abs(card.change) }}% vs mes anterior
        </p>
      </div>
    </div>

    <!-- Últimas órdenes -->
    <div class="bg-white rounded-xl border border-gray-200">
      <div class="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Últimas Órdenes</h3>
        <NuxtLink to="/orders" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Ver todas →
        </NuxtLink>
      </div>
      <div class="p-6">
        <div v-if="recentOrders.length === 0" class="text-center py-12 text-gray-400">
          <p class="text-4xl mb-3">🛒</p>
          <p class="text-sm">No hay órdenes aún</p>
          <p class="text-xs mt-1">Las órdenes aparecerán aquí cuando los clientes comiencen a comprar</p>
        </div>
        <div v-else class="space-y-3">
          <!-- Lista de órdenes -->
        </div>
      </div>
    </div>

    <!-- Acceso rápido -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <NuxtLink
        to="/products/new"
        class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all hover:border-primary-200 group"
      >
        <span class="text-3xl block mb-3">📦</span>
        <h4 class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">Nuevo Producto</h4>
        <p class="text-sm text-gray-500 mt-1">Agrega un producto al catálogo</p>
      </NuxtLink>
      <NuxtLink
        to="/site"
        class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all hover:border-primary-200 group"
      >
        <span class="text-3xl block mb-3">🎨</span>
        <h4 class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">Editar Sitio Web</h4>
        <p class="text-sm text-gray-500 mt-1">Modifica el contenido de la tienda</p>
      </NuxtLink>
      <NuxtLink
        to="/catalog-feeds"
        class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all hover:border-primary-200 group"
      >
        <span class="text-3xl block mb-3">📡</span>
        <h4 class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">Catálogos</h4>
        <p class="text-sm text-gray-500 mt-1">Sincroniza con Google, Pinterest e Instagram</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Dashboard | Panel Administrativo | PITAYA LAB'
})

const summaryCards = [
  { icon: '📦', label: 'Productos', value: '4', change: 0 },
  { icon: '🛒', label: 'Órdenes del mes', value: '0', change: null },
  { icon: '💰', label: 'Ventas del mes', value: '$0 MXN', change: null },
  { icon: '👥', label: 'Clientes', value: '0', change: null },
]

const recentOrders = []
</script>
