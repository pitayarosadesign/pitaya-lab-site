<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">📦 Inventario</h1>
        <p class="text-sm text-gray-500 mt-1">Stock total y por ubicación</p>
      </div>
      <div class="flex items-center gap-3">
        <NuxtLink to="/inventory/movements"
          class="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
        >
          📋 Movimientos
        </NuxtLink>
        <NuxtLink to="/inventory/adjust"
          class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Ajustar inventario
        </NuxtLink>
      </div>
    </div>

    <!-- Filtros -->
    <div class="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div class="flex items-center gap-3 flex-wrap">
        <div class="relative flex-1 min-w-[200px]">
          <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input v-model="search" type="text" placeholder="Buscar producto..." class="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <select v-model="filterLocation" class="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-400">
          <option value="">Todas las ubicaciones</option>
          <option value="almacen_central">🏭 Central</option>
          <option v-for="loc in locations" :key="loc.id" :value="loc.id">
            🏪 {{ loc.name }}
          </option>
        </select>
        <select v-model="filterStock" class="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-400">
          <option value="">Todos</option>
          <option value="low">⚠️ Stock bajo (≤5)</option>
          <option value="out">❌ Sin stock</option>
          <option value="over">✅ Con stock</option>
        </select>
        <button @click="exportCSV" class="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
          📥 Exportar CSV
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-20">
      <div class="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-gray-500">Cargando inventario...</p>
    </div>

    <!-- Tabla -->
    <div v-else-if="filteredInventory.length > 0" class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-4 py-3 text-left font-medium text-gray-500">Producto</th>
              <th class="px-4 py-3 text-center font-medium text-gray-500">SKU</th>
              <th class="px-4 py-3 text-right font-medium text-gray-500">Precio</th>
              <th class="px-4 py-3 text-center font-medium text-gray-500">Stock Total</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500">Ubicación</th>
              <th class="px-4 py-3 text-right font-medium text-gray-500">Acción</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="item in filteredInventory" :key="item.id"
              class="hover:bg-gray-50 transition-colors"
              :class="{ 'bg-red-50': item.stock <= 0, 'bg-yellow-50': item.stock > 0 && item.stock <= 5 }"
            >
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-sm">📷</div>
                  </div>
                  <NuxtLink :to="`/products/${item.id}`" class="font-medium text-gray-900 hover:text-primary-600">
                    {{ item.name }}
                  </NuxtLink>
                </div>
              </td>
              <td class="px-4 py-3 text-center font-mono text-xs text-gray-500">{{ item.sku || '—' }}</td>
              <td class="px-4 py-3 text-right font-medium text-gray-900">${{ formatPrice(item.price) }}</td>
              <td class="px-4 py-3 text-center">
                <span class="font-bold text-lg" :class="{'text-red-600': item.stock <= 0, 'text-yellow-600': item.stock > 0 && item.stock <= 5}">
                  {{ item.stock }}
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="loc in getItemLocations(item)"
                    :key="loc.id"
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                    :class="loc.stock > 0 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-400 border border-gray-200'"
                  >
                    {{ loc.icon }} {{ loc.name }}: {{ loc.stock }}
                  </span>
                </div>
              </td>
              <td class="px-4 py-3 text-right">
                <button @click="manageInventory(item)" class="text-xs bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">
                  Gestionar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="text-center py-20 bg-white rounded-2xl border border-gray-200">
      <p class="text-4xl mb-3">📦</p>
      <p class="text-gray-500 font-medium">No hay productos en el inventario</p>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Inventario | PITAYA LAB' })

const router = useRouter()
const loading = ref(true)
const search = ref('')
const filterLocation = ref('')
const filterStock = ref('')
const inventory = ref([])
const locations = ref([])

const filteredInventory = computed(() => {
  let result = inventory.value

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(i => i.name.toLowerCase().includes(q) || (i.sku && i.sku.toLowerCase().includes(q)))
  }

  if (filterLocation.value) {
    result = result.filter(i => {
      const stocks = i.location_stocks || []
      const loc = stocks.find(l => l.location_id === filterLocation.value)
      return loc && loc.stock > 0
    })
  }

  if (filterStock.value === 'low') result = result.filter(i => i.stock > 0 && i.stock <= 5)
  if (filterStock.value === 'out') result = result.filter(i => i.stock <= 0)
  if (filterStock.value === 'over') result = result.filter(i => i.stock > 5)

  return result
})

function formatPrice(price) {
  return Number(price || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })
}

function getItemLocations(item) {
  const result = []
  const stocks = item.location_stocks || []

  const central = stocks.find(l => l.location_id === 'almacen_central')
  if (central) result.push({ id: 'almacen_central', name: 'Central', icon: '🏭', stock: central.stock })

  for (const loc of locations.value) {
    const stock = stocks.find(l => l.location_id === loc.id)
    if (stock) result.push({ id: loc.id, name: loc.short_name || loc.name, icon: '🏪', stock: stock.stock })
  }

  const web = stocks.find(l => l.location_id === 'web_reserved')
  if (web) result.push({ id: 'web_reserved', name: 'Web', icon: '🌐', stock: web.stock })

  return result
}

function manageInventory(item) {
  router.push(`/inventory/adjust?product=${item.id}`)
}

function exportCSV() {
  const isFiltered = filterLocation.value
  let csv = ''

  if (isFiltered) {
    // Exportar solo la ubicación filtrada
    const locName = isFiltered === 'almacen_central' ? 'Central' : locations.value.find(l => l.id === isFiltered)?.name || isFiltered
    csv = `Producto,SKU,Precio,Stock en ${locName}\n`
    for (const item of filteredInventory.value) {
      const stock = getLocationStock(item, isFiltered)
      csv += `"${item.name}","${item.sku || ''}",${item.price || 0},${stock}\n`
    }
  } else {
    // Exportar todas las ubicaciones como columnas
    const headers = ['Producto', 'SKU', 'Precio', 'Stock Total']
    const locHeaders = []
    locHeaders.push('🏭 Central')
    for (const loc of locations.value) {
      locHeaders.push(`🏪 ${loc.short_name || loc.name}`)
    }
    locHeaders.push('🌐 Web')
    csv = [...headers, ...locHeaders].join(',') + '\n'

    for (const item of filteredInventory.value) {
      const row = [`"${item.name}"`, `"${item.sku || ''}"`, item.price || 0, item.stock]
      row.push(getLocationStock(item, 'almacen_central'))
      for (const loc of locations.value) {
        row.push(getLocationStock(item, loc.id))
      }
      row.push(getLocationStock(item, 'web_reserved'))
      csv += row.join(',') + '\n'
    }
  }

  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  const suffix = isFiltered ? `-${filterLocation.value}` : ''
  a.download = `inventario${suffix}-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function getLocationStock(item, locationId) {
  if (!item.location_stocks) return 0
  const loc = item.location_stocks.find(l => l.location_id === locationId)
  return loc?.stock || 0
}

onMounted(async () => {
  try {
    const data = await $fetch('/api/inventory')
    locations.value = data.locations?.filter(l => l.id !== 'almacen_central' && l.id !== 'web_reserved') || []
    inventory.value = data.products || []
  } catch (e) {
    console.error('Error cargando inventario:', e)
  } finally {
    loading.value = false
  }
})
</script>
