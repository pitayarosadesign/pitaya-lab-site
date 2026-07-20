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

        <NuxtLink to="/inventory"
          class="block w-full text-center mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors">
          Ir a inventario
        </NuxtLink>
      </div>

      <!-- Historial de transferencias y ventas -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Vales de transferencia -->
        <div class="bg-white rounded-2xl border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-sm font-bold text-gray-900 uppercase tracking-wider">📋 Vales de Transferencia</h2>
          </div>

          <div v-if="transfers.length === 0" class="text-center py-8 text-gray-400">
            <p class="text-sm">No hay transferencias registradas a este showroom</p>
          </div>
          <div v-else class="space-y-3">
            <div v-for="group in transfers" :key="group.id"
              class="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-start justify-between">
                <div class="flex items-start gap-3">
                  <span class="text-xl mt-0.5">{{ reasonIcon(group.reason) }}</span>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ reasonLabel(group.reason) }}</p>
                    <p class="text-xs text-gray-500">{{ formatDate(group.date) }} • {{ group.totalQty }} pieza(s) • {{ group.products.length }} producto(s)</p>
                    <p v-if="group.note" class="text-xs text-gray-400 mt-0.5">{{ group.note }}</p>
                    <div class="flex flex-wrap gap-1.5 mt-2">
                      <span v-for="p in group.products" :key="p.name"
                        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-50 text-xs text-gray-600 border border-gray-200"
                      >
                        {{ p.name }} × {{ p.quantity }}
                      </span>
                    </div>
                  </div>
                </div>
                <button @click="downloadVale(group)" class="text-xs bg-primary-50 hover:bg-primary-100 text-primary-700 px-2.5 py-1 rounded-lg font-medium transition-colors flex-shrink-0">
                  📄 Vale
                </button>
              </div>
            </div>
          </div>
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
const transfers = ref([])
const sales = ref([])

function typeLabel(type) {
  const labels = { hotel: 'Hotel', store: 'Tienda', spa: 'Spa', restaurant: 'Restaurante', other: 'Otro' }
  return labels[type] || type
}

function typeIcon(type) {
  const icons = { hotel: '🏨', store: '🛍️', spa: '💆', restaurant: '🍽️', other: '📌' }
  return icons[type] || '🏪'
}

function reasonIcon(reason) {
  const icons = { exhibition: '🎯', sale: '🛒', sample: '🎁', transfer: '📦' }
  return icons[reason] || '📋'
}

function reasonLabel(reason) {
  const labels = { exhibition: 'Exhibición / Muestrario', sale: 'Venta en showroom', sample: 'Cortesía / Muestra', transfer: 'Transferencia general' }
  return labels[reason] || reason
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatPrice(price) {
  return Number(price || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })
}

function downloadVale(group) {
  generateTransferPdf({
    movements: group.products.map(p => ({
      productName: p.name,
      sku: p.sku || '',
      quantity: p.quantity,
    })),
    toLocationName: store.value?.name || 'Showroom',
    reason: group.reason,
    note: group.note || undefined,
    date: new Date(group.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }),
  })
}

onMounted(async () => {
  try {
    const data = await $fetch(`/api/commerce/detail?id=${route.params.id}`)
    store.value = data.store
    transfers.value = data.transfers || []
    sales.value = data.sales || []
  } catch (e) {
    console.error('Error:', e)
  } finally {
    loading.value = false
  }
})
</script>
