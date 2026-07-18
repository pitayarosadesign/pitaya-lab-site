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
          <div v-for="order in recentOrders" :key="order.id"
            class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div>
              <NuxtLink :to="`/orders/${order.id}`" class="font-mono text-sm font-medium text-primary-600">
                {{ order.order_number }}
              </NuxtLink>
              <p class="text-xs text-gray-500 mt-0.5">{{ order.customer_name || '&mdash;' }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-900">${{ formatPrice(order.total) }}</p>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                :class="statusBadge(order.status)">
                {{ statusLabel(order.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Productos con stock bajo -->
    <div class="bg-white rounded-xl border border-gray-200">
      <div class="p-6 border-b border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900">⚠️ Productos con stock bajo</h3>
      </div>
      <div class="p-6">
        <div v-if="lowStockProducts.length === 0" class="text-center py-8 text-gray-400">
          <p class="text-sm">✅ Todos los productos tienen stock suficiente</p>
        </div>
        <div v-else class="space-y-3">
          <div v-for="product in lowStockProducts" :key="product.id"
            class="flex items-center justify-between p-3 rounded-lg bg-red-50"
          >
            <div>
              <NuxtLink :to="`/products/${product.id}`" class="text-sm font-medium text-gray-900">
                {{ product.name }}
              </NuxtLink>
              <p class="text-xs text-red-600">Stock: {{ product.stock }} unidades</p>
            </div>
            <NuxtLink :to="`/products/${product.id}`" class="text-xs text-primary-600 font-medium">
              Ir al producto →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Acceso rápido -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <NuxtLink to="/products/new"
        class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all hover:border-primary-200 group"
      >
        <span class="text-3xl block mb-3">📦</span>
        <h4 class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">Nuevo Producto</h4>
        <p class="text-sm text-gray-500 mt-1">Agrega un producto al catálogo</p>
      </NuxtLink>
      <NuxtLink to="/coupons"
        class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all hover:border-primary-200 group"
      >
        <span class="text-3xl block mb-3">🏷️</span>
        <h4 class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">Cupones</h4>
        <p class="text-sm text-gray-500 mt-1">Crea promociones y descuentos</p>
      </NuxtLink>
      <NuxtLink to="/orders"
        class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all hover:border-primary-200 group"
      >
        <span class="text-3xl block mb-3">🛒</span>
        <h4 class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">Órdenes</h4>
        <p class="text-sm text-gray-500 mt-1">Gestiona pedidos y guías de rastreo</p>
      </NuxtLink>
      <NuxtLink to="/site"
        class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all hover:border-primary-200 group"
      >
        <span class="text-3xl block mb-3">🎨</span>
        <h4 class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">Editar Sitio Web</h4>
        <p class="text-sm text-gray-500 mt-1">Modifica el contenido de la tienda</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Dashboard | Panel Administrativo | PITAYA LAB' })

const supabase = useSupabase()

const summaryCards = ref([
  { icon: '📦', label: 'Productos', value: '...' },
  { icon: '🛒', label: 'Órdenes del mes', value: '...' },
  { icon: '💰', label: 'Ventas del mes', value: '...' },
  { icon: '👥', label: 'Clientes', value: '...' },
])

const recentOrders = ref([])
const lowStockProducts = ref([])

onMounted(async () => {
  try {
    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
    summaryCards.value[0].value = productCount || 0

    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { data: monthOrders } = await supabase
      .from('orders')
      .select('*')
      .gte('created_at', startOfMonth.toISOString())
      .order('created_at', { ascending: false })

    summaryCards.value[1].value = monthOrders?.length || 0

    const totalSales = (monthOrders || []).reduce((sum, o) => sum + Number(o.total || 0), 0)
    summaryCards.value[2].value = `$${formatPrice(totalSales)} MXN`

    const { data: allOrders } = await supabase
      .from('orders')
      .select('customer_email')

    const uniqueClients = new Set((allOrders || []).map(o => o.customer_email).filter(Boolean))
    summaryCards.value[3].value = uniqueClients.size

    const { data: lastOrders } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    recentOrders.value = lastOrders || []

    const { data: products } = await supabase
      .from('products')
      .select('id, name, stock')
      .lte('stock', 5)
      .order('stock', { ascending: true })

    lowStockProducts.value = products?.filter(p => p.stock >= 0) || []
  } catch (e) {
    console.error('Error cargando dashboard:', e)
  }
})

function formatPrice(price) {
  return Number(price || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })
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
</script>
