<template>
  <div>
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <NuxtLink to="/orders" class="hover:text-primary-600">Órdenes</NuxtLink>
      <span>/</span>
      <span class="text-gray-900 font-medium">Nueva venta</span>
    </div>

    <div class="max-w-3xl">
      <div class="bg-white rounded-2xl border border-gray-200 p-6">
        <h1 class="text-xl font-bold text-gray-900 mb-1">🧾 Nueva venta manual</h1>
        <p class="text-sm text-gray-500 mb-6">Registra una venta hecha por WhatsApp, Facebook u otro canal fuera de la tienda en línea.</p>

        <form @submit.prevent="save" class="space-y-5">
          <!-- Canal -->
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Canal de venta *</label>
            <select
              v-model="form.salesChannel"
              class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400"
            >
              <option value="whatsapp">💬 WhatsApp</option>
              <option value="facebook">📘 Facebook</option>
              <option value="otro">🧾 Otro</option>
              <option value="tienda_online">🛒 Tienda en línea</option>
            </select>
          </div>

          <!-- Cliente -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Nombre *</label>
              <input v-model="form.customerName" type="text" placeholder="Nombre del cliente"
                class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Teléfono</label>
              <input v-model="form.customerPhone" type="tel" placeholder="Ej: 3312345678"
                class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Email</label>
              <input v-model="form.customerEmail" type="email" placeholder="Opcional"
                class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
            </div>
          </div>

          <!-- Productos -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-xs font-medium text-gray-600">Productos *</label>
              <button type="button" @click="addItem"
                class="text-xs font-medium text-primary-600 hover:text-primary-700">+ Agregar producto</button>
            </div>

            <div class="space-y-2">
              <div v-for="(item, i) in form.items" :key="i" class="grid grid-cols-12 gap-2 items-center">
                <select
                  v-model="item.product_id"
                  @change="onProductChange(item)"
                  class="col-span-12 sm:col-span-4 text-sm border border-gray-200 rounded-lg px-2 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400"
                >
                  <option value="">— Producto libre —</option>
                  <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }} ({{ p.sku }})</option>
                </select>
                <input v-model="item.name" type="text" placeholder="Nombre del producto"
                  class="col-span-12 sm:col-span-4 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
                <input v-model.number="item.quantity" type="number" min="1" placeholder="Cant."
                  class="col-span-3 sm:col-span-1 text-sm border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
                <input v-model.number="item.price" type="number" min="0" step="0.01" placeholder="Precio MXN"
                  class="col-span-6 sm:col-span-2 text-sm border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
                <button type="button" @click="removeItem(i)"
                  class="col-span-3 sm:col-span-1 text-sm text-red-400 hover:text-red-600 font-medium">Quitar</button>
              </div>
            </div>
          </div>

          <!-- Envío / estados / notas -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Costo de envío (MXN)</label>
              <input v-model.number="form.shippingCost" type="number" min="0" step="0.01" placeholder="0"
                class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Estado del pago</label>
              <select v-model="form.paymentStatus"
                class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400">
                <option value="paid">Pagado</option>
                <option value="pending">Pendiente</option>
                <option value="failed">Fallido</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Estado del pedido</label>
              <select v-model="form.status"
                class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400">
                <option value="confirmed">Confirmada</option>
                <option value="delivered">Entregada</option>
                <option value="shipped">Enviada</option>
                <option value="pending">Pendiente</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Notas</label>
            <textarea v-model="form.notes" rows="2" placeholder="Opcional"
              class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400"></textarea>
          </div>

          <!-- Total -->
          <div class="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-5 py-4">
            <span class="text-sm text-gray-600">Total</span>
            <span class="text-lg font-bold text-gray-900">${{ total.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }} MXN</span>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <NuxtLink to="/orders" class="text-sm text-gray-500 hover:text-gray-700 font-medium">Cancelar</NuxtLink>
            <button type="submit" :disabled="saving"
              class="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors">
              {{ saving ? 'Guardando...' : 'Guardar venta' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Nueva venta | Panel Administrativo | PITAYA LAB' })

const products = ref([])
const saving = ref(false)

const form = reactive({
  salesChannel: 'whatsapp',
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  items: [],
  shippingCost: 0,
  paymentStatus: 'paid',
  status: 'confirmed',
  notes: '',
})

const total = computed(() => {
  const subtotal = form.items.reduce((sum, it) => sum + (Number(it.price) || 0) * (Number(it.quantity) || 0), 0)
  const shipping = Number(form.shippingCost) || 0
  return Math.round((subtotal + shipping) * 100) / 100
})

function emptyItem() {
  return { product_id: '', name: '', quantity: 1, price: 0 }
}

function addItem() {
  form.items.push(emptyItem())
}

function removeItem(i) {
  form.items.splice(i, 1)
}

function onProductChange(item) {
  const p = products.value.find((p) => p.id === item.product_id)
  if (p) {
    item.name = p.name
    item.price = Number(p.price) || 0
  }
}

onMounted(async () => {
  addItem()
  try {
    products.value = await $fetch('/api/products/list')
  } catch (e) {
    console.error('Error cargando productos:', e)
  }
})

async function save() {
  if (!form.customerName.trim()) {
    alert('El nombre del cliente es obligatorio.')
    return
  }
  const validItems = form.items.filter((it) => String(it.name || '').trim())
  if (validItems.length === 0) {
    alert('Agrega al menos un producto con nombre.')
    return
  }

  saving.value = true
  try {
    const res = await $fetch('/api/orders/create', {
      method: 'POST',
      body: {
        salesChannel: form.salesChannel,
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        customerEmail: form.customerEmail,
        items: validItems,
        shippingCost: form.shippingCost,
        paymentStatus: form.paymentStatus,
        status: form.status,
        notes: form.notes,
      },
    })

    if (res && res.success) {
      navigateTo(`/orders/${res.order.id}`)
    } else {
      throw new Error(res?.message || 'Respuesta inesperada del servidor')
    }
  } catch (e) {
    alert('Error al guardar la venta: ' + (e?.data?.message || e.message))
  } finally {
    saving.value = false
  }
}
</script>
