<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Cupones</h1>
        <p class="text-sm text-gray-500 mt-1">Crea y gestiona códigos de descuento</p>
      </div>
      <button
        @click="showForm = true; editingCoupon = null; form = getDefaultForm()"
        class="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Nuevo cupón
      </button>
    </div>

    <!-- Formulario -->
    <div v-if="showForm" class="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">{{ editingCoupon ? 'Editar cupón' : 'Nuevo cupón' }}</h3>
      <form @submit.prevent="saveCoupon" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Código *</label>
          <div class="flex gap-2">
            <input
              v-model="form.code"
              type="text"
              placeholder="BIENVENIDO10"
              required
              class="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400 uppercase"
            />
            <button type="button" @click="generateCode" class="text-xs text-primary-600 hover:text-primary-700 font-medium whitespace-nowrap">
              Generar
            </button>
          </div>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Tipo</label>
          <select
            v-model="form.type"
            class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400"
          >
            <option value="percentage">Porcentaje (%)</option>
            <option value="fixed">Monto fijo ($)</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Valor *</label>
          <input
            v-model="form.value"
            type="number"
            :placeholder="form.type === 'percentage' ? 'Ej: 10' : 'Ej: 50'"
            required
            min="0"
            class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Compra mínima ($)</label>
          <input
            v-model="form.minPurchase"
            type="number"
            placeholder="0 = sin mínimo"
            min="0"
            class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Usos máximos</label>
          <input
            v-model="form.maxUses"
            type="number"
            placeholder="0 = ilimitado"
            min="0"
            class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Fecha de expiración</label>
          <input
            v-model="form.expiresAt"
            type="date"
            class="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400"
          />
        </div>
        <div class="flex items-center gap-3 pt-6">
          <label class="flex items-center gap-2 cursor-pointer">
            <input v-model="form.isActive" type="checkbox" class="rounded text-primary-600 focus:ring-primary-100" />
            <span class="text-sm text-gray-700">Activo</span>
          </label>
        </div>
        <div class="flex items-center gap-3 pt-6 md:col-span-2 lg:col-span-1">
          <button
            type="submit"
            :disabled="saving"
            class="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {{ saving ? 'Guardando...' : editingCoupon ? 'Actualizar' : 'Crear cupón' }}
          </button>
          <button
            type="button"
            @click="showForm = false"
            class="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-20">
      <div class="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-gray-500">Cargando cupones...</p>
    </div>

    <!-- Tabla -->
    <div v-else-if="coupons.length > 0" class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200">
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Código</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Descuento</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Usos</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Expira</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Estado</th>
            <th class="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="coupon in coupons" :key="coupon.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <span class="font-mono text-sm font-bold text-gray-900">{{ coupon.code }}</span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
              {{ coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}` }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ coupon.current_uses || 0 }}{{ coupon.max_uses ? ` / ${coupon.max_uses}` : '' }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ coupon.expires_at ? formatDate(coupon.expires_at) : '—' }}
            </td>
            <td class="px-6 py-4">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="coupon.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'"
              >
                {{ coupon.is_active ? 'Activo' : 'Inactivo' }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button @click="editCoupon(coupon)" class="text-sm text-primary-600 hover:text-primary-700 font-medium mr-3">
                Editar
              </button>
              <button @click="deleteCoupon(coupon.id)" class="text-sm text-red-500 hover:text-red-600 font-medium">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center py-20 bg-white rounded-2xl border border-gray-200">
      <p class="text-5xl mb-4">🏷️</p>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">No hay cupones</h3>
      <p class="text-sm text-gray-500">Crea tu primer cupón de descuento.</p>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()

const loading = ref(true)
const saving = ref(false)
const showForm = ref(false)
const editingCoupon = ref(null)
const coupons = ref([])

const form = reactive(getDefaultForm())

function getDefaultForm() {
  return {
    code: '',
    type: 'percentage',
    value: '',
    minPurchase: 0,
    maxUses: 0,
    expiresAt: '',
    isActive: true,
  }
}

function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  form.code = code
}

onMounted(async () => {
  await loadCoupons()
})

async function loadCoupons() {
  try {
    const { data } = await supabase
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false })

    coupons.value = data || []
  } catch (e) {
    console.error('Error cargando cupones:', e)
  } finally {
    loading.value = false
  }
}

async function saveCoupon() {
  if (!form.code) return
  saving.value = true

  try {
    const payload = {
      code: form.code.toUpperCase(),
      type: form.type,
      value: Number(form.value),
      min_purchase: Number(form.minPurchase) || 0,
      max_uses: Number(form.maxUses) || null,
      expires_at: form.expiresAt || null,
      is_active: form.isActive,
    }

    if (editingCoupon.value) {
      await supabase.from('coupons').update(payload).eq('id', editingCoupon.value.id)
    } else {
      await supabase.from('coupons').insert(payload)
    }

    showForm.value = false
    editingCoupon.value = null
    await loadCoupons()
  } catch (e) {
    alert('Error al guardar cupón: ' + e.message)
  } finally {
    saving.value = false
  }
}

function editCoupon(coupon) {
  editingCoupon.value = coupon
  form.code = coupon.code
  form.type = coupon.type
  form.value = coupon.value
  form.minPurchase = coupon.min_purchase
  form.maxUses = coupon.max_uses
  form.expiresAt = coupon.expires_at ? coupon.expires_at.split('T')[0] : ''
  form.isActive = coupon.is_active
  showForm.value = true
}

async function deleteCoupon(id) {
  if (!confirm('¿Eliminar este cupón?')) return
  try {
    await supabase.from('coupons').delete().eq('id', id)
    coupons.value = coupons.value.filter(c => c.id !== id)
  } catch (e) {
    alert('Error al eliminar cupón: ' + e.message)
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
