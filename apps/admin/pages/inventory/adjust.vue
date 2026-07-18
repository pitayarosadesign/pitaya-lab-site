<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink to="/inventory" class="text-gray-400 hover:text-gray-600 transition-colors">
        ← Volver a inventario
      </NuxtLink>
      <h1 class="text-2xl font-bold text-gray-900">📦 Ajustar Inventario</h1>
    </div>

    <div class="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
      <!-- Seleccionar producto -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Producto</label>
        <select
          v-model="form.productId"
          class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
          @change="loadProductStock"
        >
          <option value="">Seleccionar producto...</option>
          <option v-for="p in products" :key="p.id" :value="p.id">
            {{ p.name }} ({{ p.sku || 'sin SKU' }}) - Stock: {{ p.stock }}
          </option>
        </select>
      </div>

      <div v-if="selectedProduct" class="border-t border-gray-100 pt-6 space-y-5">
        <div class="bg-gray-50 rounded-xl p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-semibold text-gray-900">{{ selectedProduct.name }}</p>
              <p class="text-xs text-gray-500">SKU: {{ selectedProduct.sku || '—' }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs text-gray-500">Stock actual</p>
              <p class="text-2xl font-bold text-gray-900">{{ selectedProduct.stock }}</p>
            </div>
          </div>
        </div>

        <!-- Tipo de ajuste -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de movimiento</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              @click="form.type = 'in'"
              class="p-4 rounded-xl border-2 text-left transition-all"
              :class="form.type === 'in' ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300'"
            >
              <span class="text-2xl block mb-1">📥</span>
              <p class="text-sm font-medium text-gray-900">Entrada</p>
              <p class="text-xs text-gray-500">Compra, devolución, ajuste positivo</p>
            </button>
            <button
              type="button"
              @click="form.type = 'out'"
              class="p-4 rounded-xl border-2 text-left transition-all"
              :class="form.type === 'out' ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'"
            >
              <span class="text-2xl block mb-1">📤</span>
              <p class="text-sm font-medium text-gray-900">Salida</p>
              <p class="text-xs text-gray-500">Venta, merma, transferencia, ajuste negativo</p>
            </button>
            <button
              type="button"
              @click="form.type = 'transfer'"
              class="p-4 rounded-xl border-2 text-left transition-all col-span-2"
              :class="form.type === 'transfer' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300'"
            >
              <span class="text-2xl block mb-1">🔄</span>
              <p class="text-sm font-medium text-gray-900">Transferencia entre ubicaciones</p>
              <p class="text-xs text-gray-500">Mover stock de un almacén/showroom a otro</p>
            </button>
          </div>
        </div>

        <!-- Ubicación origen (para salida/transferencia) -->
        <div v-if="form.type === 'out' || form.type === 'transfer'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Desde (ubicación origen)</label>
          <select
            v-model="form.fromLocation"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
          >
            <option value="">Seleccionar ubicación...</option>
            <option value="almacen_central">🏭 Almacén Central</option>
            <option v-for="loc in locations" :key="loc.id" :value="loc.id">🏪 {{ loc.name }}</option>
          </select>
        </div>

        <!-- Ubicación destino (para entrada/transferencia) -->
        <div v-if="form.type === 'in' || form.type === 'transfer'">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ form.type === 'transfer' ? 'Hacia (ubicación destino)' : 'Ubicación destino' }}
          </label>
          <select
            v-model="form.toLocation"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
          >
            <option value="">Seleccionar ubicación...</option>
            <option value="almacen_central">🏭 Almacén Central</option>
            <option v-for="loc in locations" :key="loc.id" :value="loc.id">🏪 {{ loc.name }}</option>
          </select>
        </div>

        <!-- Cantidad -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
          <input
            v-model="form.quantity"
            type="number"
            min="1"
            placeholder="Ej: 10"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
          />
        </div>

        <!-- Razón -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Motivo del ajuste</label>
          <select
            v-model="form.reason"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
          >
            <option value="">Seleccionar motivo...</option>
            <optgroup label="Entradas">
              <option value="purchase">Compra a proveedor</option>
              <option value="return">Devolución de cliente</option>
              <option value="adjustment_in">Ajuste positivo (conteo físico)</option>
              <option value="production">Producción / Fabricación</option>
            </optgroup>
            <optgroup label="Salidas">
              <option value="sale">Venta</option>
              <option value="waste">Merma / Dañado</option>
              <option value="adjustment_out">Ajuste negativo (conteo físico)</option>
              <option value="sample">Muestra / Cortesía</option>
            </optgroup>
            <optgroup label="Transferencias">
              <option value="transfer">Transferencia entre ubicaciones</option>
            </optgroup>
          </select>
        </div>

        <!-- Nota -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nota (opcional)</label>
          <textarea
            v-model="form.note"
            rows="2"
            placeholder="Detalles adicionales sobre este movimiento..."
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
          />
        </div>
      </div>

      <!-- Botones -->
      <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <NuxtLink to="/inventory" class="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">
          Cancelar
        </NuxtLink>
        <button
          @click="submitAdjustment"
          :disabled="!canSubmit || saving"
          class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          {{ saving ? 'Procesando...' : 'Registrar movimiento' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Ajustar Inventario | PITAYA LAB' })

const route = useRoute()
const saving = ref(false)
const products = ref([])
const selectedProduct = ref(null)
const locations = ref([])

const form = reactive({
  productId: route.query.product || '',
  type: 'in',
  fromLocation: '',
  toLocation: '',
  quantity: 1,
  reason: '',
  note: '',
})

const canSubmit = computed(() => {
  if (!form.productId || !form.quantity || !form.reason) return false
  if (form.type === 'transfer' && (!form.fromLocation || !form.toLocation)) return false
  if (form.type === 'in' && !form.toLocation) return false
  if (form.type === 'out' && !form.fromLocation) return false
  if (form.fromLocation === form.toLocation) return false
  return true
})

async function loadProductStock() {
  if (!form.productId) {
    selectedProduct.value = null
    return
  }
  const data = await $fetch(`/api/inventory/products?productId=${form.productId}`)
  selectedProduct.value = data
}

async function submitAdjustment() {
  if (!canSubmit.value) return
  saving.value = true

  try {
    const { error } = await $fetch('/api/inventory/adjust', {
      method: 'POST',
      body: { ...form },
    })

    alert('✅ Movimiento registrado correctamente')
    navigateTo('/inventory')
  } catch (e) {
    alert('Error al registrar movimiento: ' + e.message)
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  try {
    const data = await $fetch('/api/inventory/products')
    products.value = data.products || []
    locations.value = data.locations || []

    if (form.productId) await loadProductStock()
  } catch (e) {
    console.error('Error cargando datos:', e)
  } finally {
    loading.value = false
  }
})

// Agregar loading ref si no existe
const loading = ref(false)
</script>
