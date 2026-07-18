<template>
  <div v-if="order">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <NuxtLink to="/orders" class="hover:text-primary-600">Órdenes</NuxtLink>
      <span>/</span>
      <span class="text-gray-900 font-medium">{{ order.order_number }}</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Columna principal -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Info de la orden -->
        <div class="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Información del pedido</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Número de pedido</p>
              <p class="text-sm font-mono font-semibold text-gray-900 mt-1">{{ order.order_number }}</p>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</p>
              <p class="text-sm text-gray-900 mt-1">{{ formatDate(order.created_at) }}</p>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</p>
              <p class="mt-1">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="statusBadge(order.status)">
                  {{ statusLabel(order.status) }}
                </span>
              </p>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Pago</p>
              <p class="mt-1">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="paymentBadge(order.payment_status)">
                  {{ paymentLabel(order.payment_status) }}
                </span>
              </p>
            </div>
          </div>
        </div>

        <!-- Productos -->
        <div class="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Productos</h2>
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-100">
                <th class="text-left pb-3 text-xs font-semibold text-gray-500 uppercase">Producto</th>
                <th class="text-center pb-3 text-xs font-semibold text-gray-500 uppercase">Cant.</th>
                <th class="text-right pb-3 text-xs font-semibold text-gray-500 uppercase">Precio</th>
                <th class="text-right pb-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in orderItems" :key="i" class="border-b border-gray-50">
                <td class="py-3 text-sm text-gray-900">{{ item.name }}</td>
                <td class="py-3 text-sm text-center text-gray-600">{{ item.quantity }}</td>
                <td class="py-3 text-sm text-right text-gray-600">${{ formatPrice(item.price) }}</td>
                <td class="py-3 text-sm text-right font-semibold text-gray-900">${{ formatPrice(item.price * item.quantity) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="pt-3 text-sm text-gray-500 text-right">Subtotal</td>
                <td class="pt-3 text-sm font-semibold text-gray-900 text-right">${{ formatPrice(order.subtotal) }}</td>
              </tr>
              <tr v-if="order.shipping_cost">
                <td colspan="3" class="text-sm text-gray-500 text-right">Envío</td>
                <td class="text-sm font-semibold text-gray-900 text-right">${{ formatPrice(order.shipping_cost) }}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-sm font-bold text-gray-900 text-right pt-2 border-t border-gray-200">Total</td>
                <td class="text-sm font-bold text-gray-900 text-right pt-2 border-t border-gray-200">${{ formatPrice(order.total) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <!-- Columna lateral -->
      <div class="space-y-6">
        <!-- Cliente -->
        <div class="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 class="text-sm font-bold text-gray-900 mb-3">👤 Cliente</h3>
          <p class="text-sm font-medium text-gray-900">{{ order.customer_name || '—' }}</p>
          <p class="text-sm text-gray-500">{{ order.customer_email }}</p>
          <p v-if="order.customer_phone" class="text-sm text-gray-500">{{ order.customer_phone }}</p>
        </div>

        <!-- Dirección de envío -->
        <div class="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 class="text-sm font-bold text-gray-900 mb-3">🚚 Dirección de envío</h3>
          <p v-if="shippingAddress" class="text-sm text-gray-600">
            {{ shippingAddress.line1 }}<br>
            <template v-if="shippingAddress.line2">{{ shippingAddress.line2 }}<br></template>
            {{ shippingAddress.city }}, {{ shippingAddress.state }}<br>
            CP: {{ shippingAddress.postal_code }}
          </p>
          <p v-else class="text-sm text-gray-400">Sin dirección registrada</p>
        </div>

        <!-- Guía de rastreo -->
        <div class="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 class="text-sm font-bold text-gray-900 mb-3">📦 Guía de rastreo</h3>
          
          <div v-if="order.tracking_number" class="mb-4">
            <p class="text-xs text-gray-500 uppercase font-medium">Paquetería</p>
            <p class="text-sm font-medium text-gray-900">{{ order.tracking_carrier || '—' }}</p>
            <p class="text-xs text-gray-500 uppercase font-medium mt-2">Número de guía</p>
            <p class="text-sm font-mono font-medium text-primary-600">{{ order.tracking_number }}</p>
          </div>

          <form @submit.prevent="submitTracking" class="space-y-3">
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Paquetería</label>
              <select
                v-model="trackingForm.carrier"
                class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400"
              >
                <option value="">Seleccionar</option>
                <option value="PaqueteExpress">PaqueteExpress</option>
                <option value="Estafeta">Estafeta</option>
                <option value="FedEx">FedEx</option>
                <option value="DHL">DHL</option>
                <option value="RedPack">RedPack</option>
                <option value="OTRA">Otra</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Número de guía</label>
              <input
                v-model="trackingForm.trackingNumber"
                type="text"
                placeholder="Ej: 1234567890"
                class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400"
              />
            </div>
            <div v-if="order.tracking_number">
              <button
                type="button"
                @click="sendTrackingNotification"
                :disabled="sendingNotification"
                class="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {{ sendingNotification ? 'Enviando...' : '📧 Notificar al cliente' }}
              </button>
            </div>
            <button
              type="submit"
              :disabled="savingTracking"
              class="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {{ savingTracking ? 'Guardando...' : order.tracking_number ? 'Actualizar guía' : 'Guardar guía' }}
            </button>
          </form>
        </div>

        <!-- Cambiar estado -->
        <div class="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 class="text-sm font-bold text-gray-900 mb-3">🔄 Cambiar estado</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="st in availableStatuses"
              :key="st.value"
              @click="changeStatus(st.value)"
              :disabled="order.status === st.value || changingStatus"
              class="px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :class="order.status === st.value ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
            >
              {{ st.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading -->
  <div v-else-if="loading" class="text-center py-20">
    <div class="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
    <p class="text-gray-500">Cargando orden...</p>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const route = useRoute()

const loading = ref(true)
const savingTracking = ref(false)
const changingStatus = ref(false)
const sendingNotification = ref(false)
const order = ref(null)

const trackingForm = reactive({
  carrier: '',
  trackingNumber: '',
})

const availableStatuses = [
  { value: 'pending', label: '⏳ Pendiente' },
  { value: 'confirmed', label: '✅ Confirmada' },
  { value: 'shipped', label: '📦 Enviada' },
  { value: 'delivered', label: '🎉 Entregada' },
  { value: 'cancelled', label: '❌ Cancelada' },
]

const orderItems = computed(() => {
  if (!order.value?.items) return []
  if (typeof order.value.items === 'string') return JSON.parse(order.value.items)
  return order.value.items
})

const shippingAddress = computed(() => {
  if (!order.value?.shipping_address) return null
  if (typeof order.value.shipping_address === 'string') return JSON.parse(order.value.shipping_address)
  return order.value.shipping_address
})

onMounted(async () => {
  try {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('id', route.params.id)
      .single()

    order.value = data
    if (data?.tracking_carrier) trackingForm.carrier = data.tracking_carrier
    if (data?.tracking_number) trackingForm.trackingNumber = data.tracking_number
  } catch (e) {
    console.error('Error cargando orden:', e)
  } finally {
    loading.value = false
  }
})

async function submitTracking() {
  if (!trackingForm.carrier || !trackingForm.trackingNumber) return
  savingTracking.value = true

  try {
    const { error } = await supabase
      .from('orders')
      .update({
        tracking_carrier: trackingForm.carrier,
        tracking_number: trackingForm.trackingNumber,
        status: order.value.status === 'confirmed' ? 'shipped' : order.value.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.value.id)

    if (error) throw error
    order.value.tracking_carrier = trackingForm.carrier
    order.value.tracking_number = trackingForm.trackingNumber
    if (order.value.status === 'confirmed') order.value.status = 'shipped'
    alert('✅ Guía guardada correctamente')
  } catch (e) {
    alert('Error al guardar guía: ' + e.message)
  } finally {
    savingTracking.value = false
  }
}

async function changeStatus(status) {
  changingStatus.value = true
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', order.value.id)

    if (error) throw error
    order.value.status = status
  } catch (e) {
    alert('Error al cambiar estado: ' + e.message)
  } finally {
    changingStatus.value = false
  }
}

async function sendTrackingNotification() {
  if (!order.value.tracking_number) return
  sendingNotification.value = true
  try {
    // Llamar al API para enviar correo de notificación
    const { error } = await supabase.functions.invoke('send-tracking-email', {
      body: {
        orderNumber: order.value.order_number,
        customerEmail: order.value.customer_email,
        customerName: order.value.customer_name,
        trackingNumber: order.value.tracking_number,
        trackingCarrier: order.value.tracking_carrier,
      }
    })
    if (error) throw error
    alert('✅ Notificación enviada al cliente')
  } catch (e) {
    alert('Error al enviar notificación: ' + e.message)
  } finally {
    sendingNotification.value = false
  }
}

function formatPrice(price) {
  return Number(price || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })
}

function formatDate(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('es-MX', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
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
  return status === 'paid' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
}
</script>
