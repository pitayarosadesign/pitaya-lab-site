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

    <!-- Toolbar -->
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

    <!-- Acciones masivas -->
    <div v-if="selectedIds.size > 0" class="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-4 flex items-center justify-between">
      <p class="text-sm text-primary-800 font-medium">{{ selectedIds.size }} producto(s) seleccionado(s)</p>
      <div class="flex items-center gap-3">
        <select v-model="bulkAction" class="px-3 py-2 rounded-lg border border-primary-200 text-sm outline-none bg-white">
          <option value="">Acción...</option>
          <option value="transfer">🔄 Transferir a showroom</option>
          <option value="adjust_in">📥 Entrada masiva</option>
          <option value="adjust_out">📤 Salida masiva</option>
        </select>
        <button v-if="bulkAction === 'transfer'" @click="openTransferModal" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors">
          Continuar
        </button>
        <button @click="selectedIds.clear()" class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 font-medium">
          Cancelar
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
              <th class="px-2 py-3 text-center">
                <input type="checkbox" @change="toggleAll" :checked="allSelected" class="rounded text-primary-600 focus:ring-primary-100" />
              </th>
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
              <td class="px-2 py-3 text-center">
                <input type="checkbox" :checked="selectedIds.has(item.id)" @change="toggleItem(item.id)" class="rounded text-primary-600 focus:ring-primary-100" />
              </td>
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

    <!-- Modal de transferencia masiva -->
    <div v-if="showTransferModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="showTransferModal = false">
      <div class="bg-white rounded-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-100">
          <h3 class="text-lg font-bold text-gray-900">🔄 Transferir productos a showroom</h3>
          <p class="text-sm text-gray-500 mt-1">{{ selectedIds.size }} producto(s) seleccionado(s)</p>
        </div>
        <div class="p-6 space-y-5">
          <!-- Productos y cantidades -->
          <div class="space-y-3">
            <p class="text-sm font-medium text-gray-700">Cantidad a transferir por producto:</p>
            <div v-for="item in transferProducts" :key="item.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ item.name }}</p>
                <p class="text-xs text-gray-500">Stock en Central: <strong>{{ getCentralStock(item) }}</strong></p>
              </div>
              <div class="flex items-center gap-2 ml-4">
                <button @click="decrementQty(item.id)" class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100">−</button>
                <input v-model.number="transferQtys[item.id]" type="number" min="0" :max="getCentralStock(item)" class="w-16 text-center px-2 py-1.5 rounded-lg border border-gray-200 text-sm outline-none" />
                <button @click="incrementQty(item.id)" class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100">+</button>
              </div>
            </div>
          </div>

          <!-- Ubicación destino -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Transferir a:</label>
            <select v-model="transferToLocation" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm">
              <option value="">Seleccionar showroom...</option>
              <option v-for="loc in locations" :key="loc.id" :value="loc.id">🏪 {{ loc.name }}</option>
            </select>
          </div>

          <!-- Motivo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Motivo:</label>
            <select v-model="transferReason" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm">
              <option value="exhibition">🎯 Exhibición / Muestrario</option>
              <option value="sale">🛒 Venta en showroom</option>
              <option value="sample">🎁 Cortesía / Muestra</option>
              <option value="transfer">📦 Transferencia general</option>
            </select>
          </div>

          <!-- Nota -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nota (opcional):</label>
            <textarea v-model="transferNote" row
              s="2" placeholder="Ej: Exhibición por temporada..." class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>
        </div>
        <div class="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
          <button @click="showTransferModal = false" class="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 font-medium">Cancelar</button>
          <button @click="executeTransfer" :disabled="!canTransfer || savingTransfer"
            class="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
          >
            {{ savingTransfer ? 'Transfiriendo...' : 'Transferir a showroom' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Inventario | PITAYA LAB' })

const router = useRouter()
const loading = ref(true)
const savingTransfer = ref(false)
const search = ref('')
const filterLocation = ref('')
const filterStock = ref('')
const inventory = ref([])
const locations = ref([])
const selectedIds = ref(new Set())
const bulkAction = ref('')
const showTransferModal = ref(false)
const transferToLocation = ref('')
const transferReason = ref('exhibition')
const transferNote = ref('')
const transferQtys = ref({})

const allSelected = computed(() => {
  return filteredInventory.value.length > 0 && filteredInventory.value.every(i => selectedIds.value.has(i.id))
})

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

const transferProducts = computed(() => {
  return inventory.value.filter(i => selectedIds.value.has(i.id))
})

const canTransfer = computed(() => {
  if (!transferToLocation.value) return false
  const hasQtys = Object.values(transferQtys.value).some(q => q > 0)
  return hasQtys
})

function formatPrice(price) {
  return Number(price || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })
}

function getCentralStock(item) {
  if (!item.location_stocks) return 0
  const loc = item.location_stocks.find(l => l.location_id === 'almacen_central')
  return loc?.stock || 0
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

function toggleAll(e) {
  if (e.target.checked) {
    filteredInventory.value.forEach(i => selectedIds.value.add(i.id))
  } else {
    selectedIds.value.clear()
  }
  selectedIds.value = new Set(selectedIds.value)
}

function toggleItem(id) {
  const newSet = new Set(selectedIds.value)
  if (newSet.has(id)) newSet.delete(id)
  else newSet.add(id)
  selectedIds.value = newSet
}

function manageInventory(item) {
  router.push(`/inventory/adjust?product=${item.id}`)
}

function openTransferModal() {
  transferQtys.value = {}
  for (const item of transferProducts.value) {
    transferQtys.value[item.id] = Math.min(1, getCentralStock(item))
  }
  showTransferModal.value = true
}

function incrementQty(id) {
  const item = inventory.value.find(i => i.id === id)
  const max = getCentralStock(item)
  if (transferQtys.value[id] < max) transferQtys.value[id]++
}

function decrementQty(id) {
  if (transferQtys.value[id] > 0) transferQtys.value[id]--
}

async function executeTransfer() {
  if (!canTransfer.value) return
  savingTransfer.value = true

  try {
    const movements = []
    for (const item of transferProducts.value) {
      const qty = transferQtys.value[item.id]
      if (!qty || qty <= 0) continue

      movements.push({
        product_id: item.id,
        type: 'transfer',
        quantity: qty,
        reason: transferReason.value,
        note: transferNote.value || null,
        from_location: 'almacen_central',
        to_location: transferToLocation.value,
        created_by: 'admin',
      })
    }

    if (movements.length === 0) {
      alert('No hay productos con cantidad para transferir')
      return
    }

    for (const mov of movements) {
      await $fetch('/api/inventory/adjust', { method: 'POST', body: mov })
    }

    // Generar PDF
    const locName = transferToLocation.value === 'almacen_central'
      ? 'Almacén Central'
      : locations.value.find(l => l.id === transferToLocation.value)?.name || transferToLocation.value

    generateTransferPdf({
      movements: movements.map(m => ({
        productName: inventory.value.find(i => i.id === m.product_id)?.name || m.product_id,
        sku: inventory.value.find(i => i.id === m.product_id)?.sku || '',
        quantity: m.quantity,
        note: m.note || undefined,
      })),
      toLocationName: locName,
      reason: transferReason.value,
      note: transferNote.value || undefined,
      date: new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }),
    })

    alert(`✅ ${movements.length} producto(s) transferido(s) correctamente`)
    showTransferModal.value = false
    selectedIds.value = new Set()
    bulkAction.value = ''

    // Recargar datos
    const data = await $fetch('/api/inventory')
    inventory.value = data.products || []
  } catch (e) {
    alert('Error: ' + (e.data?.message || e.message))
  } finally {
    savingTransfer.value = false
  }
}

function exportCSV() {
  const isFiltered = filterLocation.value
  let csv = ''

  if (isFiltered) {
    const locName = isFiltered === 'almacen_central' ? 'Central' : locations.value.find(l => l.id === isFiltered)?.name || isFiltered
    csv = `Producto,SKU,Precio,Stock en ${locName}\n`
    for (const item of filteredInventory.value) {
      const stock = getLocationStock(item, isFiltered)
      csv += `"${item.name}","${item.sku || ''}",${item.price || 0},${stock}\n`
    }
  } else {
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
