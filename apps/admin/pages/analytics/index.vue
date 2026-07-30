<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">📈 Analíticas</h1>
      <p class="text-sm text-gray-500 mt-1">Estadísticas de ventas y rendimiento de la tienda</p>
    </div>

    <!-- Cards resumen -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl border border-gray-200 p-6">
        <p class="text-sm text-gray-500 mb-1">Ventas hoy</p>
        <p class="text-2xl font-bold text-gray-900">${{ todaySales.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }} MXN</p>
      </div>
      <div class="bg-white rounded-xl border border-gray-200 p-6">
        <p class="text-sm text-gray-500 mb-1">Ventas esta semana</p>
        <p class="text-2xl font-bold text-gray-900">${{ weekSales.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }} MXN</p>
      </div>
      <div class="bg-white rounded-xl border border-gray-200 p-6">
        <p class="text-sm text-gray-500 mb-1">Ventas este mes</p>
        <p class="text-2xl font-bold text-gray-900">${{ monthSales.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }} MXN</p>
      </div>
      <div class="bg-white rounded-xl border border-gray-200 p-6">
        <p class="text-sm text-gray-500 mb-1">Ticket promedio</p>
        <p class="text-2xl font-bold text-gray-900">${{ avgTicket.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }} MXN</p>
      </div>
    </div>

    <div v-if="loading" class="text-center py-12 text-gray-400">
      <p class="text-sm">Cargando datos...</p>
    </div>
    <div v-else class="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-200">
      <p class="text-4xl mb-3">📊</p>
      <p class="text-sm text-gray-600">Más gráficas disponibles próximamente</p>
      <p class="text-xs mt-1">Pronto: gráfica de ventas por mes, productos más vendidos, embudo de conversión</p>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Analíticas | Panel Administrativo | PITAYA LAB' })

const supabase = useSupabase()
const loading = ref(true)

const todaySales = ref(0)
const weekSales = ref(0)
const monthSales = ref(0)
const avgTicket = ref(0)

onMounted(async () => {
  try {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    startOfWeek.setHours(0, 0, 0, 0)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const { data: allOrders } = await supabase
      .from('orders')
      .select('total, created_at')
      .eq('payment_status', 'paid')

    if (allOrders) {
      todaySales.value = allOrders
        .filter(o => new Date(o.created_at) >= startOfDay)
        .reduce((sum, o) => sum + Number(o.total), 0)

      weekSales.value = allOrders
        .filter(o => new Date(o.created_at) >= startOfWeek)
        .reduce((sum, o) => sum + Number(o.total), 0)

      monthSales.value = allOrders
        .filter(o => new Date(o.created_at) >= startOfMonth)
        .reduce((sum, o) => sum + Number(o.total), 0)

      const paidOrders = allOrders.filter(o => Number(o.total) > 0)
      avgTicket.value = paidOrders.length > 0
        ? paidOrders.reduce((sum, o) => sum + Number(o.total), 0) / paidOrders.length
        : 0
    }
  } catch (e) {
    console.error('Error cargando analytics:', e)
  } finally {
    loading.value = false
  }
})
</script>
