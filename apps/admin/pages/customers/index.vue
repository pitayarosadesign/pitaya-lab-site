<template>
  <div class="max-w-6xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">👥 Clientes</h1>
        <p class="text-sm text-gray-500 mt-1">Gestiona los clientes registrados en la tienda</p>
      </div>
      <div class="text-sm text-gray-400">
        Total: <span class="font-semibold text-gray-900">{{ customers.length }}</span>
      </div>
    </div>

    <div v-if="loading" class="text-center py-20 text-gray-400">
      <p class="text-4xl mb-3">⏳</p>
      <p class="text-sm">Cargando clientes...</p>
    </div>

    <div v-else-if="customers.length === 0" class="text-center py-20 text-gray-400">
      <p class="text-4xl mb-3">👥</p>
      <p class="text-sm font-medium text-gray-600">No hay clientes registrados</p>
      <p class="text-xs mt-1">Los clientes aparecerán aquí cuando realicen una compra</p>
    </div>

    <div v-else class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="text-left px-6 py-3 font-medium text-gray-500">Cliente</th>
              <th class="text-left px-6 py-3 font-medium text-gray-500">Email</th>
              <th class="text-left px-6 py-3 font-medium text-gray-500">Teléfono</th>
              <th class="text-center px-6 py-3 font-medium text-gray-500">Órdenes</th>
              <th class="text-right px-6 py-3 font-medium text-gray-500">Total gastado</th>
              <th class="text-right px-6 py-3 font-medium text-gray-500">Registro</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="customer in customers" :key="customer.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="font-medium text-gray-900">{{ customer.first_name || customer.last_name ? `${customer.first_name || ''} ${customer.last_name || ''}`.trim() : '—' }}</div>
              </td>
              <td class="px-6 py-4 text-gray-500">{{ customer.email }}</td>
              <td class="px-6 py-4 text-gray-500">{{ customer.phone || '—' }}</td>
              <td class="px-6 py-4 text-center text-gray-900 font-medium">{{ customer.total_orders || 0 }}</td>
              <td class="px-6 py-4 text-right text-gray-900 font-medium">${{ Number(customer.total_spent || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 }) }} MXN</td>
              <td class="px-6 py-4 text-right text-gray-400 text-xs">
                {{ new Date(customer.created_at).toLocaleDateString('es-MX') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Clientes | Panel Administrativo | PITAYA LAB' })

const supabase = useSupabaseAdmin()
const loading = ref(true)
const customers = ref([])

onMounted(async () => {
  try {
    const { data } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) customers.value = data
  } catch (e) {
    console.error('Error cargando clientes:', e)
  } finally {
    loading.value = false
  }
})
</script>
