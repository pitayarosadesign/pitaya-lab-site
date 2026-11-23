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

          <!-- Origen del stock y método de pago -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Almacén de origen</label>
              <select v-model="form.warehouseId"
                class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400">
                <option value="almacen_central">🏢 Almacén Central - Envía Fulfillment</option>
                <option value="almacen_local">📍 Bodega Local - Gestión externa</option>
              </select>
              <p class="text-[11px] text-gray-400 mt-1">Central dispara Envía Fulfillment al pagar; Local solo descuenta stock local.</p>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Método de pago</label>
              <select v-model="form.paymentMethod"
                class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400">
                <option value="clip">💳 Link de pago Clip</option>
                <option value="spei">🏦 Transferencia SPEI</option>
                <option value="cash">💵 Efectivo / Contra entrega</option>
                <option value="stripe">🛒 Stripe</option>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-xs font-medium text-gray-600 mb-1">Referencia de pago</label>
              <input v-model="form.paymentReference" type="text" placeholder="Folio Clip o clave de rastreo SPEI (opcional)"
                class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
            </div>
          </div>

          <!-- Dirección de envío -->
          <div>
            <p class="text-xs font-medium text-gray-600 mb-2">Dirección de envío</p>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div class="col-span-2 sm:col-span-1">
                <label class="block text-xs font-medium text-gray-500 mb-1">Código Postal</label>
                <input v-model="form.postalCode" type="text" maxlength="5" inputmode="numeric" placeholder="00000"
                  class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
                <p v-if="Number(form.shippingCost) > 0 && !/^\d{5}$/.test(form.postalCode)" class="text-[11px] text-amber-600 mt-1">Obligatorio cuando hay envío</p>
              </div>
              <div class="col-span-2">
                <label class="block text-xs font-medium text-gray-500 mb-1">Calle y número</label>
                <input v-model="form.street" type="text" placeholder="Calle y número"
                  class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
              </div>
              <div class="col-span-2">
                <label class="block text-xs font-medium text-gray-500 mb-1">Colonia</label>
                <input v-model="form.district" type="text" placeholder="Colonia"
                  class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
              </div>
              <div class="col-span-2 sm:col-span-3">
                <label class="block text-xs font-medium text-gray-500 mb-1">Ciudad</label>
                <input v-model="form.city" type="text" placeholder="Ciudad"
                  class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
              </div>
              <div class="col-span-2 sm:col-span-2">
                <label class="block text-xs font-medium text-gray-500 mb-1">Estado</label>
                <input v-model="form.state" type="text" placeholder="Ej. Jalisco"
                  class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
              </div>
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
  warehouseId: 'almacen_central',
  paymentMethod: 'clip',
  paymentReference: '',
  postalCode: '',
  street: '',
  district: '',
  city: '',
  state: '',
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

  const shippingCost = Number(form.shippingCost) || 0
  const postalCode = String(form.postalCode || '').replace(/\D/g, '').slice(0, 5)
  if (shippingCost > 0 && !/^\d{5}$/.test(postalCode)) {
    alert('El código postal (5 dígitos) es obligatorio cuando hay costo de envío.')
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
        shippingCost,
        paymentStatus: form.paymentStatus,
        status: form.status,
        warehouseId: form.warehouseId,
        paymentMethod: form.paymentMethod,
        paymentReference: form.paymentReference,
        postalCode,
        street: form.street,
        district: form.district,
        city: form.city,
        state: form.state,
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
