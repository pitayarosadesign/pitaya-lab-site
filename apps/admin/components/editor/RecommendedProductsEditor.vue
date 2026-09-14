<template>
  <div class="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold text-gray-900">🏆 Productos recomendados</h2>
        <p class="text-sm text-gray-500 mt-0.5">
          Se muestran en la sección de productos de la portada, en este orden.
        </p>
      </div>
      <button
        @click="save"
        :disabled="saving"
        class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
      >
        {{ saving ? 'Guardando...' : '💾 Guardar recomendados' }}
      </button>
    </div>

    <!-- Seleccionados (en orden) -->
    <div v-if="selectedProducts.length" class="space-y-1.5">
      <div
        v-for="(p, i) in selectedProducts"
        :key="p.id"
        class="flex items-center gap-3 p-2 rounded-lg border border-primary-200 bg-primary-50/60"
      >
        <img v-if="p.image" :src="p.image" alt="" class="w-9 h-9 rounded-md object-cover border border-primary-100 flex-shrink-0" />
        <div v-else class="w-9 h-9 rounded-md bg-gray-100 border border-primary-100 flex items-center justify-center text-gray-300 text-sm flex-shrink-0">📦</div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-800 truncate">{{ p.name }}</p>
          <p class="text-[11px] text-gray-400 truncate">{{ p.category || '—' }}</p>
        </div>
        <div class="flex items-center gap-1 flex-shrink-0">
          <button type="button" @click="move(i, -1)" :disabled="i === 0" class="text-gray-400 hover:text-gray-600 disabled:opacity-25 text-xs px-1" title="Subir">↑</button>
          <button type="button" @click="move(i, 1)" :disabled="i === selectedProducts.length - 1" class="text-gray-400 hover:text-gray-600 disabled:opacity-25 text-xs px-1" title="Bajar">↓</button>
          <button type="button" @click="remove(p.id)" class="text-red-400 hover:text-red-600 text-xs px-1" title="Quitar">✕</button>
        </div>
      </div>
    </div>
    <p v-else class="text-sm text-gray-400">
      No hay productos recomendados. Se mostrarán los primeros productos activos automáticamente.
    </p>

    <!-- Selector de productos -->
    <div class="border border-gray-200 rounded-xl p-2 bg-gray-50/50 max-h-64 overflow-y-auto">
      <p v-if="loading" class="text-sm text-gray-400 px-2 py-3">Cargando productos…</p>
      <template v-else-if="choosableProducts.length">
        <label
          v-for="p in choosableProducts"
          :key="p.id"
          class="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-white cursor-pointer"
        >
          <input type="checkbox" class="text-primary-600 rounded" @change="toggle(p)" />
          <img v-if="p.image" :src="p.image" alt="" class="w-7 h-7 rounded object-cover flex-shrink-0" />
          <div v-else class="w-7 h-7 rounded bg-gray-100 flex items-center justify-center text-gray-300 text-sm flex-shrink-0">📦</div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-gray-700 truncate">{{ p.name }}</p>
            <p class="text-[11px] text-gray-400 truncate">{{ p.category || p.sku || '—' }}</p>
          </div>
        </label>
      </template>
      <p v-else class="text-sm text-gray-400 px-2 py-3">No hay más productos disponibles.</p>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()

const saving = ref(false)
const loading = ref(false)
const selectedIds = ref([])
const products = ref([])

const selectedProducts = computed(() =>
  selectedIds.value.map(id => products.value.find(p => p.id === id)).filter(Boolean)
)

const choosableProducts = computed(() =>
  products.value.filter(p => !selectedIds.value.includes(p.id))
)

async function load() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'recommended_products')
      .maybeSingle()
    if (error) throw error
    const ids = data?.value
    selectedIds.value = Array.isArray(ids) ? ids.filter(Boolean) : []
  } catch (e) {
    console.warn('Error cargando recomendados:', e.message)
    selectedIds.value = []
  }

  try {
    const list = await $fetch('/api/products/list') || []
    products.value = (list || []).map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      sku: p.sku,
      price: p.price,
      image: p.image || null,
      category: p.category || '',
    }))
  } catch (e) {
    console.warn('Error cargando productos para recomendados:', e.message)
    products.value = []
  } finally {
    loading.value = false
  }
}

function toggle(p) {
  const i = selectedIds.value.indexOf(p.id)
  if (i >= 0) selectedIds.value.splice(i, 1)
  else selectedIds.value.push(p.id)
}

function remove(id) {
  const i = selectedIds.value.indexOf(id)
  if (i >= 0) selectedIds.value.splice(i, 1)
}

function move(index, delta) {
  const to = index + delta
  if (to < 0 || to >= selectedIds.value.length) return
  const [moved] = selectedIds.value.splice(index, 1)
  selectedIds.value.splice(to, 0, moved)
}

async function save() {
  saving.value = true
  try {
    await $fetch('/api/site/config', {
      method: 'PUT',
      body: { entries: [{ key: 'recommended_products', value: selectedIds.value }] },
    })
    alert('✅ Productos recomendados guardados')
  } catch (e) {
    console.error('Error guardando recomendados:', e)
    alert('Error al guardar: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
