<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h1 class="text-2xl font-bold text-gray-900">📦 Productos</h1>
        <span class="text-sm text-gray-400">({{ products.length }} total — {{ inactiveCount }} inactivos)</span>
      </div>
      <div class="flex items-center gap-3">
        <button @click="showImportModal = true" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors">
          📥 Importar CSV
        </button>
        <NuxtLink to="/products/new" class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Nuevo Producto
        </NuxtLink>
      </div>
    </div>

    <!-- Filtros -->
    <div class="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
      <div class="flex items-center gap-3 flex-wrap">
        <div class="relative flex-1 min-w-[200px]">
          <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input v-model="search" type="text" placeholder="Buscar por nombre o SKU..." class="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <select v-model="filterCategory" class="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-400">
          <option value="">Todas las categorías</option>
          <option value="velas">Velas</option>
          <option value="aceites">Aceites</option>
          <option value="brumas">Brumas</option>
        </select>
        <div class="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
          <button @click="filterStatus = ''" class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors" :class="filterStatus === '' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'">Todos</button>
          <button @click="filterStatus = 'active'" class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors" :class="filterStatus === 'active' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'">🟢 Activos</button>
          <button @click="filterStatus = 'inactive'" class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors" :class="filterStatus === 'inactive' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'">🔴 Inactivos</button>
        </div>
        <select v-model="filterImage" class="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-400">
          <option value="">Todas</option>
          <option value="with">Con imagen</option>
          <option value="without">Sin imagen</option>
        </select>
      </div>
      <!-- Acciones masivas -->
      <div v-if="selectedIds.length > 0" class="flex items-center gap-2 pt-2 border-t border-gray-100">
        <span class="text-sm text-gray-500">{{ selectedIds.length }} seleccionados</span>
        <button @click="batchAction('activate')" class="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-lg hover:bg-green-100 transition-colors">✅ Activar</button>
        <button @click="batchAction('deactivate')" class="px-3 py-1.5 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-lg hover:bg-yellow-100 transition-colors">⏸️ Desactivar</button>
        <button @click="confirmDelete" class="px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors">🗑️ Eliminar</button>
        <button @click="selectedIds = []" class="px-3 py-1.5 text-gray-400 text-xs font-medium hover:text-gray-600">Deseleccionar</button>
      </div>
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-4 py-3 w-10">
                <input type="checkbox" :checked="allSelected" @change="toggleAll" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              </th>
              <th class="px-4 py-3 text-left font-medium text-gray-500">Producto</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500">SKU</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500">Precio</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500">Stock</th>
              <th class="px-4 py-3 text-center font-medium text-gray-500">⭐</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500">Estado</th>
              <th class="px-4 py-3 text-right font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50 transition-colors" :class="{ 'bg-gray-50': !product.is_active }">
              <td class="px-4 py-3">
                <input type="checkbox" :checked="selectedIds.includes(product.id)" @change="toggleSelect(product.id)" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    <img v-if="product.image" :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-lg">📷</div>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ product.name }}</p>
                    <p class="text-xs text-gray-400">{{ product.category }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-gray-600 font-mono text-xs">{{ product.sku || '—' }}</td>
              <td class="px-4 py-3 text-gray-900 font-medium">${{ formatPrice(product.price) }}</td>
              <td class="px-4 py-3">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="product.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'">
                  {{ product.stock > 0 ? `${product.stock} en stock` : 'Agotado' }}
                </span>
              </td>
              <td class="px-4 py-3">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="product.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'">
                  {{ product.is_active ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="px-4 py-3 text-right">
                <NuxtLink :to="`/products/${product.id}`" class="text-primary-600 hover:text-primary-700 text-xs font-medium">Editar →</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filteredProducts.length === 0 && !loading" class="text-center py-16">
        <p class="text-4xl mb-3">📦</p>
        <p class="text-gray-500 font-medium">{{ search || filterCategory || filterStatus || filterImage ? 'No hay productos con esos filtros' : 'No hay productos aún' }}</p>
        <p class="text-sm text-gray-400 mt-1">Importa un CSV o crea tu primer producto</p>
      </div>
      <div v-if="loading" class="text-center py-16">
        <p class="text-gray-400">Cargando productos...</p>
      </div>
    </div>

    <!-- Modal Importar CSV -->
    <div v-if="showImportModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="showImportModal = false">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 space-y-5">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">📥 Importar productos desde CSV</h2>
          <button @click="showImportModal = false; importResult = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="space-y-4">
          <div class="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-700 space-y-2">
            <p class="font-medium">📌 Instrucciones:</p>
            <ol class="list-decimal list-inside space-y-1 text-blue-600">
              <li>Descarga la plantilla CSV</li>
              <li>Llena los datos en Excel o Google Sheets</li>
              <li><strong>nombre, sku, precio, categoria</strong> son obligatorios</li>
              <li>Sube el archivo y se importarán todos los productos</li>
              <li>Después puedes editar cada uno para agregar imágenes</li>
            </ol>
          </div>

          <a :href="templateCsvUrl" download="plantilla-productos-pitayalab.csv" class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border-2 border-dashed border-primary-200 text-primary-600 hover:bg-primary-50 hover:border-primary-300 transition-all font-medium text-sm">
            📄 Descargar plantilla CSV
          </a>

          <div class="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary-300 hover:bg-primary-50/30 transition-all cursor-pointer" @click="fileInput?.click()" @dragover.prevent @drop.prevent="handleDrop">
            <input ref="fileInput" type="file" accept=".csv" class="hidden" @change="handleFileSelect" />
            <svg class="w-10 h-10 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            <p class="text-sm text-gray-500">
              <span v-if="!selectedFile">Arrastra tu CSV aquí o <span class="text-primary-600 font-medium">haz clic para subir</span></span>
              <span v-else class="text-primary-600 font-medium">{{ selectedFile.name }}</span>
            </p>
          </div>

          <div v-if="importResult" class="space-y-2">
            <div v-if="importResult.imported > 0" class="bg-green-50 border border-green-100 rounded-lg p-3 text-sm text-green-700">✅ {{ importResult.imported }} de {{ importResult.total }} productos importados</div>
            <div v-if="importResult.errors > 0" class="bg-red-50 border border-red-100 rounded-lg p-3 text-sm text-red-600">
              ❌ {{ importResult.errors }} errores
              <ul v-if="importResult.errorDetails" class="mt-1 list-disc list-inside text-xs max-h-32 overflow-y-auto">
                <li v-for="(err, i) in importResult.errorDetails" :key="i">{{ err }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button @click="showImportModal = false; importResult = null" class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cerrar</button>
          <button @click="handleImport" :disabled="!selectedFile || importing" class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors">
            {{ importing ? 'Importando...' : 'Importar productos' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const products = ref([])
const loading = ref(true)
const selectedIds = ref([])

// Filtros
const search = ref('')
const filterCategory = ref('')
const filterStatus = ref('')
const filterImage = ref('')

// Importación
const showImportModal = ref(false)
const fileInput = ref(null)
const selectedFile = ref(null)
const importing = ref(false)
const importResult = ref(null)
const templateCsvUrl = ref('')

// Productos filtrados
const filteredProducts = computed(() => {
  let result = products.value

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(p => p.name.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q)))
  }

  if (filterCategory.value) {
    result = result.filter(p => p.category_slug === filterCategory.value)
  }

  if (filterStatus.value === 'active') {
    result = result.filter(p => p.is_active)
  } else if (filterStatus.value === 'inactive') {
    result = result.filter(p => !p.is_active)
  }

  if (filterImage.value === 'with') {
    result = result.filter(p => p.image)
  } else if (filterImage.value === 'without') {
    result = result.filter(p => !p.image)
  }

  return result
})

const inactiveCount = computed(() => products.value.filter(p => !p.is_active).length)

const allSelected = computed(() => {
  return filteredProducts.value.length > 0 && filteredProducts.value.every(p => selectedIds.value.includes(p.id))
})

function toggleAll() {
  if (allSelected.value) {
    selectedIds.value = selectedIds.value.filter(id => !filteredProducts.value.some(p => p.id === id))
  } else {
    const ids = filteredProducts.value.map(p => p.id)
    selectedIds.value = [...new Set([...selectedIds.value, ...ids])]
  }
}

function toggleSelect(id) {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter(i => i !== id)
  } else {
    selectedIds.value.push(id)
  }
}

async function batchAction(action) {
  if (selectedIds.value.length === 0) return
  const actionName = action === 'activate' ? 'Activar' : action === 'deactivate' ? 'Desactivar' : 'Eliminar'
  if (!confirm(`¿${actionName} ${selectedIds.value.length} producto(s)?`)) return

  try {
    await $fetch('/api/products/batch', {
      method: 'POST',
      body: { action, ids: selectedIds.value },
    })
    selectedIds.value = []
    loadProducts()
  } catch (e) {
    alert('Error: ' + (e.data?.message || e.message))
  }
}

function confirmDelete() {
  if (selectedIds.value.length === 0) return
  if (confirm(`⚠️ ¿Eliminar permanentemente ${selectedIds.value.length} producto(s)? Esta acción no se puede deshacer.`)) {
    batchAction('delete')
  }
}

// Importación
function generateTemplateUrl() {
  const categorias = [
    '# 🏷️ CATEGORÍAS VÁLIDAS (columna "categoria"):',
    '#   velas   → Velas de Soya',
    '#   aceites → Aceites Aromáticos',
    '#   brumas  → Brumas Aromáticas',
    '',
    '# 💡 Columnas requeridas: nombre, sku, precio, categoria',
    '# 💡 Las demás columnas son opcionales',
    '',
  ].join('\n')

  const headers = [
    'nombre', 'sku', 'slug', 'subtitulo', 'descripcion', 'descripcion_larga',
    'precio', 'precio_comparativa', 'costo', 'stock', 'categoria',
    'gtin', 'amazon_asin', 'amazon_link', 'amazon_precio',
    'peso_kg', 'largo_cm', 'ancho_cm', 'alto_cm',
    'envio_gratis', 'marca', 'categoria_google', 'condicion', 'activo',
  ].join(',')

  const ejemplo = [
    '"Aceite Aromático Xcaret"', '"ACE-XCA"', '"aceite-aromatico-xcaret"', '"Aceite para difusores"',
    '"Aceite aromático concentrado con esencia Xcaret."', '""',
    '"180"', '"250"', '"90"', '"50"', '"aceites"',
    '"7501234567890"', '"B0XXXXX"', '"https://amazon.com.mx/dp/B0XXXXX"', '"199"',
    '"0.05"', '"8"', '"4"', '"12"',
    '"no"', '"PITAYA LAB"', '"Home & Garden > Home Decor > Candles"', '"new"', '"si"',
  ].join(',')

  const csv = categorias + headers + '\n' + ejemplo + '\n'
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
  templateCsvUrl.value = URL.createObjectURL(blob)
}

function handleFileSelect(e) {
  const file = e.target.files?.[0]
  if (file) { selectedFile.value = file; importResult.value = null }
}

function handleDrop(e) {
  const file = e.dataTransfer.files?.[0]
  if (file && file.name.endsWith('.csv')) { selectedFile.value = file; importResult.value = null }
}

async function handleImport() {
  if (!selectedFile.value) return
  importing.value = true
  importResult.value = null
  try {
    const text = await selectedFile.value.text()
    const data = await $fetch('/api/products/import-csv', { method: 'POST', body: { csv: text } })
    importResult.value = data
    if (data.imported > 0) setTimeout(() => loadProducts(), 1500)
  } catch (e) {
    importResult.value = { imported: 0, errors: 1, total: 0, errorDetails: [e.data?.message || e.message] }
  } finally {
    importing.value = false
    selectedFile.value = null
    if (fileInput.value) fileInput.value.value = ''
  }
}

async function loadProducts() {
  loading.value = true
  try {
    const data = await $fetch('/api/products/list')
    products.value = data || []
  } catch (e) {
    console.error('Error:', e)
    products.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProducts()
  generateTemplateUrl()
})

function formatPrice(price) {
  return Number(price).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

async function duplicateProduct(product) {
  if (!confirm(`¿Duplicar "${product.name}"? Se creará una copia con el sufijo "(copia)"`)) return
  try {
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: `${product.name} (copia)`,
        slug: `${product.slug}-copia-${Date.now()}`,
        sku: product.sku ? `${product.sku}-COPY` : null,
        subtitle: product.subtitle,
        description: product.description,
        long_description: product.long_description,
        price: product.price,
        compare_at_price: product.compare_at_price,
        cost: product.cost,
        stock: product.stock || 0,
        category: product.category,
        category_slug: product.category_slug,
        image: product.image,
        images: product.images,
        is_active: false,
        is_featured: false,
        amazon_link: product.amazon_link,
        amazon_asin: product.amazon_asin,
        amazon_price: product.amazon_price,
        weight_kg: product.weight_kg,
        length_cm: product.length_cm,
        width_cm: product.width_cm,
        height_cm: product.height_cm,
        requires_shipping: product.requires_shipping,
        free_shipping: product.free_shipping,
        gtin: product.gtin,
        brand: product.brand,
      })

    if (error) throw error
    await loadProducts()
    alert(`✅ "${product.name}" duplicado correctamente`)
  } catch (e) {
    alert('Error al duplicar: ' + e.message)
  }
}

async function toggleFeatured(product) {
  try {
    const { error } = await supabase
      .from('products')
      .update({ is_featured: !product.is_featured })
      .eq('id', product.id)

    if (error) throw error
    product.is_featured = !product.is_featured
  } catch (e) {
    alert('Error al cambiar destacado: ' + e.message)
  }
}
</script>
