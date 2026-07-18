<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Órdenes</h1>
        <p class="text-sm text-gray-500 mt-1">Gestiona los pedidos de tus clientes</p>
      </div>
      <div class="flex items-center gap-3">
        <select
          v-model="filterStatus"
          class="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400"
        >
          <option value="">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="confirmed">Confirmada</option>
          <option value="shipped">Enviada</option>
          <option value="delivered">Entregada</option>
          <option value="cancelled">Cancelada</option>
        </select>
        <select
          v-model="filterPayment"
          class="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400"
        >
          <option value="">Todos los pagos</option>
          <option value="paid">Pagado</option>
          <option value="pending">Pendiente</option>
          <option value="failed">Fallido</option>
          <option value="refunded">Reembolsado</option>
        </select>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-20">
      <div class="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-gray-500">Cargando órdenes...</p>
    </div>

    <!-- Tabla -->
    <div v-else-if="filteredOrders.length > 0" class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200">
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pedido</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pago</th>
            <th class="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="order in filteredOrders"
            :key="order.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-4">
              <NuxtLink :to="`/orders/${order.id}`" class="font-mono text-sm font-medium text-primary-600 hover:text-primary-700">
                {{ order.order_number }}
              </NuxtLink>
            </td>
            <td class="px-6 py-4">
              <p class="text-sm font-medium text-gray-900">{{ order.customer_name || '—' }}</p>
              <p class="text-xs text-gray-500">{{ order.customer_email }}</p>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ formatDate(order.created_at) }}
            </td>
            <td class="px-6 py-4 text-sm font-semibold text-gray-900">
              ${{ formatPrice(order.total) }}
            </td>
            <td class="px-6 py-4">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="statusBadge(order.status)"
              >
                {{ statusLabel(order.status) }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="paymentBadge(order.payment_status)"
              >
                {{ paymentLabel(order.payment_status) }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <NuxtLink
                :to="`/orders/${order.id}`"
                class="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Ver detalle →
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Vacío -->
    <div v-else class="text-center py-20 bg-white rounded-2xl border border-gray-200">
      <p class="text-5xl mb-4">📦</p>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">No hay órdenes</h3>
      <p class="text-sm text-gray-500">Cuando los clientes realicen compras, aparecerán aquí.</p>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()

const loading = ref(true)
const orders = ref([])
const filterStatus = ref('')
const filterPayment = ref('')

const filteredOrders = computed(() => {
  return orders.value.filter(o => {
    if (filterStatus.value && o.status !== filterStatus.value) return false
    if (filterPayment.value && o.payment_status !== filterPayment.value) return false
    return true
  })
})

onMounted(async () => {
  try {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    orders.value = data || []
  } catch (e) {
    console.error('Error cargando órdenes:', e)
  } finally {
    loading.value = false
  }
})

function formatPrice(price) {
  return Number(price || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })
}

function formatDate(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function statusLabel(status) {
  const labels = { pending: 'Pendiente', confirmed: 'Confirmada', shipped: 'Enviada', delivered: 'Entregada', cancelled: 'Cancelada' }
  return labels[status] || status
}

function statusBadge(status) {
  const colors = {
    pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    confirmed: 'bg-blue-50 text-blue-700 border border-blue-200',
    shipped: 'bg-purple-50 text-purple-700 border border-purple-200',
    delivered: 'bg-green-50 text-green-700 border border-green-200',
    cancelled: 'bg-red-50 text-red-700 border border-red-200',
  }
  return colors[status] || 'bg-gray-50 text-gray-600 border border-gray-200'
}

function paymentLabel(status) {
  const labels = { paid: 'Pagado', pending: 'Pendiente', failed: 'Fallido', refunded: 'Reembolsado' }
  return labels[status] || status
}

function paymentBadge(status) {
  const colors = {
    paid: 'bg-green-50 text-green-700 border border-green-200',
    pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    failed: 'bg-red-50 text-red-700 border border-red-200',
    refunded: 'bg-orange-50 text-orange-700 border border-orange-200',
  }
  return colors[status] || 'bg-gray-50 text-gray-600 border border-gray-200'
}
</script>
