<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">📋 Movimientos de Inventario</h1>
        <p class="text-sm text-gray-500 mt-1">Historial completo de entradas, salidas y transferencias</p>
      </div>
      <NuxtLink to="/inventory/adjust" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors">
        + Nuevo movimiento
      </NuxtLink>
    </div>

    <!-- Filtros -->
    <div class="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div class="flex items-center gap-3 flex-wrap">
        <select v-model="filterType" class="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-400">
          <option value="">Todos los tipos</option>
          <option value="in">📥 Entradas</option>
          <option value="out">📤 Salidas</option>
          <option value="transfer">🔄 Transferencias</option>
        </select>
        <input v-model="dateFrom" type="date" class="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none" />
        <input v-model="dateTo" type="date" class="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none" />
        <button @click="exportCSV" class="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
          📥 Exportar CSV
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-20">
      <div class="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-gray-500">Cargando movimientos...</p>
    </div>

    <!-- Tabla -->
    <div v-else-if="movements.length > 0" class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-4 py-3 text-left font-medium text-gray-500">Fecha</th>
            <th class="px-4 py-3 text-left font-medium text-gray-500">Producto</th>
            <th class="px-4 py-3 text-center font-medium text-gray-500">Tipo</th>
            <th class="px-4 py-3 text-center font-medium text-gray-500">Cantidad</th>
            <th class="px-4 py-3 text-left font-medium text-gray-500">Desde</th>
            <th class="px-4 py-3 text-left font-medium text-gray-500">Hacia</th>
            <th class="px-4 py-3 text-left font-medium text-gray-500">Motivo</th>
            <th class="px-4 py-3 text-left font-medium text-gray-500">Nota</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="mov in movements" :key="mov.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{{ formatDate(mov.created_at) }}</td>
            <td class="px-4 py-3 font-medium text-gray-900">{{ mov.product?.name || '—' }}</td>
            <td class="px-4 py-3 text-center">
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                :class="mov.type === 'in' ? 'bg-green-50 text-green-700' : mov.type === 'out' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'"
              >
                {{ mov.type === 'in' ? '📥 Entrada' : mov.type === 'out' ? '📤 Salida' : '🔄 Transferencia' }}
              </span>
            </td>
            <td class="px-4 py-3 text-center font-bold text-gray-900">{{ mov.quantity }}</td>
            <td class="px-4 py-3 text-sm text-gray-600">{{ getLocationName(mov.from_location) || '—' }}</td>
            <td class="px-4 py-3 text-sm text-gray-600">{{ getLocationName(mov.to_location) || '—' }}</td>
            <td class="px-4 py-3 text-sm text-gray-500">{{ reasonLabels[mov.reason] || mov.reason }}</td>
            <td class="px-4 py-3 text-sm text-gray-400 max-w-[200px] truncate">{{ mov.note || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center py-20 bg-white rounded-2xl border border-gray-200">
      <p class="text-4xl mb-3">📋</p>
      <p class="text-gray-500 font-medium">No hay movimientos registrados</p>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Movimientos | PITAYA LAB' })

const supabase = useSupabase()

const loading = ref(true)
const movements = ref([])
const locations = ref([])
const filterType = ref('')
const dateFrom = ref('')
const dateTo = ref('')

const reasonLabels = {
  purchase: 'Compra a proveedor',
  return: 'Devolución',
  adjustment_in: 'Ajuste positivo',
  production: 'Fabricación',
  sale: 'Venta',
  waste: 'Merma',
  adjustment_out: 'Ajuste negativo',
  sample: 'Muestra/Cortesía',
  transfer: 'Transferencia',
}

function getLocationName(id) {
  if (!id) return null
  if (id === 'almacen_central') return '🏭 Almacén Central'
  const loc = locations.value.find(l => l.id === id)
  return loc ? `🏪 ${loc.name}` : id
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

function exportCSV() {
  let csv = 'Fecha,Producto,Tipo,Cantidad,Desde,Hacia,Motivo,Nota\n'
  for (const mov of movements.value) {
    csv += `"${formatDate(mov.created_at)}","${mov.product?.name || ''}","${mov.type}","${mov.quantity}","${getLocationName(mov.from_location) || ''}","${getLocationName(mov.to_location) || ''}","${reasonLabels[mov.reason] || mov.reason}","${mov.note || ''}"\n`
  }
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `movimientos-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(async () => {
  try {
    const { data: locs } = await supabase
      .from('commerce_stores')
      .select('id, name')
      .eq('is_active', true)

    locations.value = locs || []

    const { data: movs } = await supabase
      .from('inventory_movements')
      .select('*, product:product_id(name)')
      .order('created_at', { ascending: false })
      .limit(100)

    movements.value = movs || []
  } catch (e) {
    console.error('Error cargando movimientos:', e)
  } finally {
    loading.value = false
  }
})
</script>
