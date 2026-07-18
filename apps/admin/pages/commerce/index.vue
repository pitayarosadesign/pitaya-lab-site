<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">🏪 Showroom / Comercios</h1>
        <p class="text-sm text-gray-500 mt-1">Hoteles, tiendas y puntos de venta físicos</p>
      </div>
      <button
        @click="showForm = true; editingStore = null; form = getDefaultForm()"
        class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        + Registrar comercio
      </button>
    </div>

    <!-- Formulario -->
    <div v-if="showForm" class="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">{{ editingStore ? '✏️ Editar comercio' : '🏪 Registrar comercio' }}</h3>
      <form @submit.prevent="saveStore" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-xs font-medium text-gray-600 mb-1">Nombre del comercio *</label>
          <input v-model="form.name" type="text" placeholder="Ej: Hotel Xcaret México" required
            class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Tipo</label>
          <select v-model="form.type"
            class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400">
            <option value="hotel">🏨 Hotel</option>
            <option value="store">🛍️ Tienda</option>
            <option value="spa">💆 Spa</option>
            <option value="restaurant">🍽️ Restaurante</option>
            <option value="other">📌 Otro</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Comisión (%)</label>
          <input v-model="form.commission" type="number" min="0" max="100" step="0.5"
            class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Contacto</label>
          <input v-model="form.contact_name" type="text" placeholder="Nombre del contacto"
            class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Teléfono</label>
          <input v-model="form.phone" type="tel" placeholder="9981234567"
            class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Email</label>
          <input v-model="form.email" type="email" placeholder="compras@ejemplo.com"
            class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Código de ubicación</label>
          <input v-model="form.location_code" type="text" placeholder="XCA-SW-01"
            class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
          <p class="text-xs text-gray-400 mt-1">Identificador único para inventario</p>
        </div>
        <div class="md:col-span-2">
          <label class="block text-xs font-medium text-gray-600 mb-1">Dirección</label>
          <input v-model="form.address" type="text" placeholder="Calle, colonia, ciudad, estado"
            class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-xs font-medium text-gray-600 mb-1">Notas / Referencia</label>
          <textarea v-model="form.notes" rows="2" placeholder="Información adicional..."
            class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400" />
        </div>
        <div class="flex items-center gap-3">
          <label class="flex items-center gap-2 cursor-pointer">
            <input v-model="form.is_active" type="checkbox" class="rounded text-primary-600 focus:ring-primary-100" />
            <span class="text-sm text-gray-700">Activo</span>
          </label>
        </div>
        <div class="flex items-center justify-end gap-3 md:col-span-2 pt-2 border-t border-gray-100">
          <button type="button" @click="showForm = false" class="text-sm text-gray-500 hover:text-gray-700 font-medium">Cancelar</button>
          <button type="submit" :disabled="saving"
            class="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors">
            {{ saving ? 'Guardando...' : editingStore ? 'Actualizar comercio' : 'Registrar comercio' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-20">
      <div class="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-gray-500">Cargando comercios...</p>
    </div>

    <!-- Grid de comercios -->
    <div v-else-if="stores.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="store in stores" :key="store.id"
        class="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all"
        :class="{ 'opacity-60': !store.is_active }"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="text-2xl">{{ typeIcon(store.type) }}</span>
            <div>
              <h3 class="font-semibold text-gray-900">{{ store.name }}</h3>
              <p class="text-xs text-gray-400">{{ typeLabel(store.type) }}</p>
            </div>
          </div>
          <span v-if="!store.is_active" class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inactivo</span>
        </div>

        <div class="space-y-1.5 text-sm text-gray-600">
          <p v-if="store.contact_name">👤 {{ store.contact_name }}</p>
          <p v-if="store.phone">📞 {{ store.phone }}</p>
          <p v-if="store.email">✉️ {{ store.email }}</p>
          <p v-if="store.location_code">📍 Código: <span class="font-mono text-xs">{{ store.location_code }}</span></p>
          <p v-if="store.commission != null" class="font-medium text-primary-600">💰 Comisión: {{ store.commission }}%</p>
        </div>

        <div class="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <NuxtLink :to="`/commerce/${store.id}`" class="text-xs text-primary-600 hover:text-primary-700 font-medium">
            Ver detalle →
          </NuxtLink>
          <div class="flex gap-2">
            <button @click="editStore(store)" class="text-xs text-gray-500 hover:text-gray-700 font-medium">Editar</button>
            <button @click="toggleActive(store)" class="text-xs font-medium" :class="store.is_active ? 'text-yellow-600 hover:text-yellow-700' : 'text-green-600 hover:text-green-700'">
              {{ store.is_active ? 'Desactivar' : 'Activar' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20 bg-white rounded-2xl border border-gray-200">
      <p class="text-4xl mb-3">🏪</p>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">No hay comercios registrados</h3>
      <p class="text-sm text-gray-500">Agrega hoteles, tiendas o puntos de venta</p>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Comercios | PITAYA LAB' })

const supabase = useSupabase()

const loading = ref(true)
const saving = ref(false)
const showForm = ref(false)
const editingStore = ref(null)
const stores = ref([])

const form = reactive(getDefaultForm())

function getDefaultForm() {
  return {
    name: '',
    type: 'store',
    commission: 20,
    contact_name: '',
    phone: '',
    email: '',
    location_code: '',
    address: '',
    notes: '',
    is_active: true,
  }
}

function typeLabel(type) {
  const labels = { hotel: 'Hotel', store: 'Tienda', spa: 'Spa', restaurant: 'Restaurante', other: 'Otro' }
  return labels[type] || type
}

function typeIcon(type) {
  const icons = { hotel: '🏨', store: '🛍️', spa: '💆', restaurant: '🍽️', other: '📌' }
  return icons[type] || '🏪'
}

onMounted(async () => {
  await loadStores()
})

async function loadStores() {
  try {
    const { data } = await supabase
      .from('commerce_stores')
      .select('*')
      .order('name')

    stores.value = data || []
  } catch (e) {
    console.error('Error cargando comercios:', e)
  } finally {
    loading.value = false
  }
}

async function saveStore() {
  if (!form.name) return
  saving.value = true

  try {
    const payload = { ...form, commission: Number(form.commission) }

    if (editingStore.value) {
      await supabase.from('commerce_stores').update(payload).eq('id', editingStore.value.id)
    } else {
      await supabase.from('commerce_stores').insert(payload)
    }

    showForm.value = false
    editingStore.value = null
    await loadStores()
  } catch (e) {
    alert('Error: ' + e.message)
  } finally {
    saving.value = false
  }
}

function editStore(store) {
  editingStore.value = store
  Object.assign(form, {
    name: store.name,
    type: store.type,
    commission: store.commission,
    contact_name: store.contact_name || '',
    phone: store.phone || '',
    email: store.email || '',
    location_code: store.location_code || '',
    address: store.address || '',
    notes: store.notes || '',
    is_active: store.is_active,
  })
  showForm.value = true
}

async function toggleActive(store) {
  const newStatus = !store.is_active
  const { error } = await supabase
    .from('commerce_stores')
    .update({ is_active: newStatus })
    .eq('id', store.id)

  if (!error) store.is_active = newStatus
}
</script>
