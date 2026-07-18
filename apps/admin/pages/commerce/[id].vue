<template>
  <div v-if="store">
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink to="/commerce" class="text-gray-400 hover:text-gray-600 transition-colors">← Comercios</NuxtLink>
      <h1 class="text-2xl font-bold text-gray-900">{{ typeIcon(store.type) }} {{ store.name }}</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Info del comercio -->
      <div class="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-sm font-bold text-gray-900 uppercase tracking-wider">Información</h2>
        <div class="space-y-3">
          <div>
            <p class="text-xs text-gray-500 uppercase font-medium">Tipo</p>
            <p class="text-sm text-gray-900">{{ typeLabel(store.type) }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 uppercase font-medium">Código de ubicación</p>
            <p class="text-sm font-mono text-gray-900">{{ store.location_code || '—' }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 uppercase font-medium">Contacto</p>
            <p class="text-sm text-gray-900">{{ store.contact_name || '—' }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 uppercase font-medium">Teléfono</p>
            <p class="text-sm text-gray-900">{{ store.phone || '—' }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 uppercase font-medium">Email</p>
            <p class="text-sm text-gray-900">{{ store.email || '—' }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 uppercase font-medium">Comisión</p>
            <p class="text-sm font-bold text-primary-600">{{ store.commission }}%</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 uppercase font-medium">Estado</p>
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
              :class="store.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'">
              {{ store.is_active ? 'Activo' : 'Inactivo' }}
            </span>
          </div>
          <div>
            <p class="text-xs text-gray-500 uppercase font-medium">Dirección</p>
            <p class="text-sm text-gray-600">{{ store.address || '—' }}</p>
          </div>
        </div>

        <NuxtLink :to="`/inventory/adjust?product=&location=${store.id}`"
          class="block w-full text-center mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors">
          + Transferir inventario aquí
        </NuxtLink>
      </div>

      <!-- Inventario en este showroom -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-2xl border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-sm font-bold text-gray-900 uppercase tracking-wider">📦 Inventario en este showroom</h2>
            <button @click="exportCSV" class="text-xs text-primary-600 hover:text-primary-700 font-medium">📥 Exportar CSV</button>
          </div>

          <div v-if="inventory.length === 0" class="text-center py-8 text-gray-400">
            <p class="text-sm">No hay productos asignados a este showroom</p>
          </div>
          <table v-else class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-100">
                <th class="text-left pb-3 font-medium text-gray-500">Producto</th>
                <th class="text-center pb-3 font-medium text-gray-500">SKU</th>
                <th class="text-center pb-3 font-medium text-gray-500">Stock aquí</th>
                <th class="text-center pb-3 font-medium text-gray-500">Stock total</th>
                <th class="text-right pb-3 font-medium text-gray-500">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in inventory" :key="item.product_id" class="border-b border-gray-50">
                <td class="py-3 text-gray-900 font-medium">{{ item.product?.name || '—' }}</td>
                <td class="py-3 text-center text-xs font-mono text-gray-500">{{ item.product?.sku || '—' }}</td>
                <td class="py-3 text-center">
                  <span class="font-bold" :class="{'text-green-600': item.stock > 5, 'text-yellow-600': item.stock <= 5 && item.stock > 0, 'text-red-600': item.stock <= 0}">
                    {{ item.stock }}
                  </span>
                </td>
                <td class="py-3 text-center text-gray-500">{{ item.product?.stock || 0 }}</td>
                <td class="py-3 text-right">
                  <NuxtLink :to="`/inventory/adjust?product=${item.product_id}`" class="text-xs text-primary-600 hover:text-primary-700 font-medium">
                    Ajustar
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Ventas recientes -->
        <div class="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">🛒 Ventas recientes</h2>

          <div v-if="sales.length === 0" class="text-center py-8 text-gray-400">
            <p class="text-sm">No hay ventas registradas</p>
          </div>
          <table v-else class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-100">
                <th class="text-left pb-3 font-medium text-gray-500">Fecha</th>
                <th class="text-left pb-3 font-medium text-gray-500">Producto</th>
                <th class="text-center pb-3 font-medium text-gray-500">Cant.</th>
                <th class="text-right pb-3 font-medium text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sale in sales" :key="sale.id" class="border-b border-gray-50">
                <td class="py-3 text-xs text-gray-500">{{ formatDate(sale.created_at) }}</td>
                <td class="py-3 text-gray-900">{{ sale.product_name }}</td>
                <td class="py-3 text-center text-gray-900">{{ sale.quantity }}</td>
                <td class="py-3 text-right font-medium text-gray-900">${{ formatPrice(sale.total) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="loading" class="text-center py-20">
    <div class="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
    <p class="text-gray-500">Cargando comercio...</p>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Detalle de Comercio | PITAYA LAB' })

const route = useRoute()

const loading = ref(true)
const store = ref(null)
const inventory = ref([])
const sales = ref([])

function typeLabel(type) {
  const labels = { hotel: 'Hotel', store: 'Tienda', spa: 'Spa', restaurant: 'Restaurante', other: 'Otro' }
  return labels[type] || type
}

function typeIcon(type) {
  const icons = { hotel: '🏨', store: '🛍️', spa: '💆', restaurant: '🍽️', other: '📌' }
  return icons[type] || '🏪'
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })
}

function formatPrice(price) {
  return Number(price || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })
}

function exportCSV() {
  let csv = 'Producto,SKU,Stock aquí,Stock total\n'
  for (const item of inventory.value) {
    csv += `"${item.product?.name || ''}","${item.product?.sku || ''}",${item.stock},${item.product?.stock || 0}\n`
  }
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `inventario-${store.value?.location_code || store.value?.id}-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(async () => {
  try {
    const data = await $fetch(`/api/commerce/detail?id=${route.params.id}`)
    store.value = data.store
    inventory.value = data.inventory || []
    sales.value = data.sales || []
  } catch (e) {
    console.error('Error:', e)
  } finally {
    loading.value = false
  }
})
</script>
