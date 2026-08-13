<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/products" class="text-gray-400 hover:text-gray-600 transition-colors">
          ← Volver
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-900" v-if="product">✏️ {{ product.name }}</h1>
        <h1 class="text-2xl font-bold text-gray-900" v-else>✏️ Editar Producto</h1>
      </div>
      <button
        v-if="product"
        type="button"
        @click="duplicateHere"
        class="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-all"
      >
        📋 Duplicar producto
      </button>
    </div>

    <div v-if="loading" class="text-center py-16">
      <p class="text-gray-400">Cargando producto...</p>
    </div>

    <form v-else-if="product" @submit.prevent="handleSave" class="space-y-6">
      <!-- Info básica -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">Información del Producto</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input v-model="form.name" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">SKU</label>
            <input v-model="form.sku" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all font-mono" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <div class="flex items-center gap-2">
              <select v-model="form.category" class="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all">
                <option value="">Sin categoría</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.slug">{{ cat.name }}</option>
              </select>
              <button
                type="button"
                @click="openCategoryModal"
                class="flex-shrink-0 px-3 py-2.5 rounded-lg border border-dashed border-primary-300 text-primary-600 hover:bg-primary-50 text-sm font-medium transition-colors"
                title="Agregar nueva categoría"
              >
                + Nueva
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input v-model="form.slug" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all font-mono text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Precio</label>
            <div class="relative">
              <span class="absolute left-3 top-2.5 text-gray-400">$</span>
              <input v-model="form.price" type="number" step="0.01" class="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input v-model="form.stock" type="number" min="0" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">GTIN (código barras)</label>
            <input v-model="form.gtin" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all font-mono" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ASIN Amazon</label>
            <input v-model="form.amazon_asin" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all font-mono" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="form.description" rows="3" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
        </div>
      </div>

      <!-- Estado y Configuración -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">⚙️ Estado y Configuración</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select v-model="form.is_active" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all">
              <option :value="true">🟢 Activo (visible en tienda)</option>
              <option :value="false">🔴 Inactivo (oculto)</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">⭐ Destacado</label>
            <div class="flex items-center gap-3 h-[42px]">
              <button
                type="button"
                @click="form.is_featured = !form.is_featured"
                class="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all"
                :class="form.is_featured ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'"
              >
                <span class="text-lg">{{ form.is_featured ? '⭐' : '☆' }}</span>
                {{ form.is_featured ? 'Destacado' : 'Marcar como destacado' }}
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Categoría de Google</label>
            <select v-model="form.google_category" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all">
              <option value="">Seleccionar</option>
              <option value="Home & Garden > Home Decor > Candles">Hogar > Decoración > Velas</option>
              <option value="Health & Beauty > Aromatherapy > Essential Oils">Salud > Aromaterapia > Aceites</option>
              <option value="Home & Garden > Home Decor > Home Fragrance Accessories">Hogar > Fragancias</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Envío gratis</label>
            <select v-model="form.free_shipping" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all">
              <option :value="false">No</option>
              <option :value="true">Sí</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Link Amazon</label>
            <input v-model="form.amazon_link" type="url" placeholder="https://amazon.com.mx/..." class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Precio comparativa ($)</label>
            <input v-model="form.compare_at_price" type="number" step="0.01" placeholder="Precio tachado" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Costo ($)</label>
            <input v-model="form.cost_price" type="number" step="0.01" placeholder="Solo admin" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
          </div>
        </div>
      </div>

      <!-- Imágenes -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">📸 Imágenes</h2>
        
        <!-- Imágenes existentes -->
        <div v-if="form.images.length > 0" class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
          <div
            v-for="(img, index) in form.images"
            :key="img.id || index"
            class="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 cursor-grab active:cursor-grabbing transition-all"
            :class="{ 'ring-2 ring-primary-500': img.is_primary, 'opacity-50': dragIndex === index }"
            draggable="true"
            @dragstart="onDragStart(index)"
            @dragover.prevent="onDragOver(index)"
            @dragend="onDragEnd"
            @drop.prevent="onDrop(index)"
          >
            <img :src="img.url || img.preview" :alt="'Imagen ' + (index + 1)" class="w-full h-full object-cover pointer-events-none" />
            <div v-if="img.is_primary" class="absolute top-1 left-1 bg-primary-600 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">Principal</div>
            <button type="button" @click="removeImage(index)" class="absolute top-1 right-1 bg-white/90 text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <button v-if="!img.is_primary" type="button" @click="setPrimary(index)" class="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-[10px] py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Hacer principal</button>
            <!-- Indicador de arrastre -->
            <div class="absolute top-1 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              ⠿ Arrastrar
            </div>
          </div>
        </div>
        <p v-if="form.images.length > 1" class="text-xs text-gray-400">💡 Arrastra las imágenes para reordenarlas. La primera será la principal en la tienda.</p>

        <!-- Subir nueva -->
        <div class="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary-300 hover:bg-primary-50/30 transition-all cursor-pointer" @click="triggerUpload" @dragover.prevent @drop.prevent="handleDrop">
          <input ref="fileInput" type="file" accept="image/png,image/jpeg,image/webp" class="hidden" @change="handleFileSelect" />
          <svg class="w-10 h-10 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <p class="text-sm text-gray-500">Arrastra imágenes o haz clic para subir</p>
        </div>
      </div>

      <!-- Variantes (Aromas) -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">🧴 Disponible en estos Aromas</h2>
            <p class="text-sm text-gray-400 mt-0.5">Selecciona en cuáles perfiles aromáticos estará disponible este producto</p>
          </div>
          <span class="text-xs font-medium px-3 py-1 rounded-full bg-primary-50 text-primary-700">
            {{ selectedScentCount }} / {{ allScents.length }} seleccionados
          </span>
        </div>

        <div v-if="loadingProfiles" class="py-8 text-center text-gray-400 text-sm">
          Cargando perfiles aromáticos...
        </div>

        <!-- Agrupado por colección -->
        <div v-else class="space-y-6">
          <div v-for="group in scentGroups" :key="group.collection.id || group.collection.name" class="border border-gray-100 rounded-xl overflow-hidden">
            <div class="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
              <span class="text-lg">{{ group.collection.icon || '🌸' }}</span>
              <div>
                <h3 class="text-sm font-semibold text-gray-800">{{ group.collection.name }}</h3>
                <p v-if="group.collection.subtitle" class="text-xs text-gray-400">{{ group.collection.subtitle }}</p>
              </div>
              <div class="ml-auto">
                <button
                  type="button"
                  @click="toggleAllInGroup(group)"
                  class="text-xs font-medium text-primary-600 hover:text-primary-700"
                >
                  {{ group.selectedCount === group.scents.length ? 'Quitar todos' : 'Seleccionar todos' }}
                </button>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
              <label
                v-for="scent in group.scents"
                :key="scent.id"
                class="flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer"
                :class="isScentSelected(scent.id) ? 'border-primary-400 bg-primary-50/60' : 'border-gray-200 hover:border-gray-300'"
              >
                <input
                  type="checkbox"
                  :checked="isScentSelected(scent.id)"
                  @change="toggleScent(scent.id)"
                  class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-gray-800 truncate">{{ scent.name }}</span>
                    <span v-if="scent.emoji" class="text-base">{{ scent.emoji }}</span>
                  </div>
                  <p v-if="scent.subtitle" class="text-xs text-gray-400 truncate">{{ scent.subtitle }}</p>
                  <p v-if="scent.experience" class="text-xs text-earth-500 truncate">{{ scent.experience }}</p>
                </div>
              </label>
            </div>
          </div>

          <div v-if="allScents.length === 0" class="py-8 text-center border-2 border-dashed border-gray-200 rounded-xl">
            <p class="text-3xl mb-2">🌸</p>
            <p class="text-sm text-gray-400">No hay perfiles aromáticos configurados.</p>
            <p class="text-xs text-gray-400 mt-1">Crea perfiles aromáticos desde Colecciones en el panel.</p>
          </div>
        </div>

        <p class="text-xs text-gray-400">
          💡 Los aromas seleccionados se guardarán como variantes del producto y aparecerán como opciones de compra en la tienda.
        </p>
      </div>

      <!-- Botones -->
      <div class="flex items-center justify-end gap-3">
        <NuxtLink to="/products" class="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800">
          Cancelar
        </NuxtLink>
        <button type="submit" class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors" :disabled="saving">
          {{ saving ? 'Guardando...' : 'Guardar cambios' }}
        </button>
      </div>
    </form>

    <div v-else-if="!loading" class="text-center py-16">
      <p class="text-gray-400">Producto no encontrado</p>
      <NuxtLink to="/products" class="text-primary-600 hover:text-primary-700 text-sm mt-2 inline-block">← Volver a productos</NuxtLink>
    </div>

    <!-- Modal: Nueva categoría -->
    <div v-if="showCategoryModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/40" @click="showCategoryModal = false"></div>
      <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">➕ Nueva Categoría</h3>
          <button @click="showCategoryModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input v-model="newCategory.name" type="text" placeholder="Ej: Kits de Regalo" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Slug (URL) *</label>
          <input v-model="newCategory.slug" type="text" placeholder="kits-de-regalo" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-mono text-sm" />
          <p class="text-xs text-gray-400 mt-1">Se genera automáticamente desde el nombre</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="newCategory.description" rows="2" placeholder="Descripción breve de la categoría" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button @click="showCategoryModal = false" class="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800">Cancelar</button>
          <button
            @click="createCategory"
            :disabled="creatingCategory"
            class="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {{ creatingCategory ? 'Creando...' : 'Crear categoría' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const product = ref(null)
const loading = ref(true)
const saving = ref(false)
const fileInput = ref(null)

const form = reactive({
  name: '', sku: '', slug: '', description: '', price: '', stock: 0,
  gtin: '', amazon_asin: '', images: [],
  is_active: true, is_featured: false, google_category: '', free_shipping: false,
  amazon_link: '', compare_at_price: '', cost_price: '',
  category: '',
})

// Categorías cargadas dinámicamente desde la base de datos
const categories = ref([])

// Modal de nueva categoría
const showCategoryModal = ref(false)
const creatingCategory = ref(false)
const newCategory = reactive({ name: '', slug: '', description: '' })

// ===== Variantes (perfiles aromáticos) =====
const selectedScents = ref(new Set())
const scentGroups = ref([])
const allScents = ref([])
const loadingProfiles = ref(false)
const selectedScentCount = computed(() => selectedScents.value.size)

async function loadCategories() {
  try {
    const data = await $fetch('/api/categories/list')
    categories.value = data.categories || []
  } catch (e) {
    console.warn('No se pudieron cargar las categorías:', e.message)
    categories.value = []
  }
}

function openCategoryModal() {
  newCategory.name = ''
  newCategory.slug = ''
  newCategory.description = ''
  showCategoryModal.value = true
}

async function createCategory() {
  if (!newCategory.name) {
    alert('El nombre de la categoría es obligatorio')
    return
  }
  creatingCategory.value = true
  try {
    const res = await $fetch('/api/categories/create', {
      method: 'POST',
      body: {
        name: newCategory.name,
        slug: newCategory.slug || newCategory.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim(),
        description: newCategory.description,
      },
    })
    if (res?.category) {
      categories.value.push(res.category)
      form.category = res.category.slug
      showCategoryModal.value = false
      alert('✅ Categoría creada correctamente')
    }
  } catch (e) {
    alert('Error al crear la categoría: ' + (e.data?.message || e.message))
  } finally {
    creatingCategory.value = false
  }
}

async function loadProduct() {
  loading.value = true
  try {
    const data = await $fetch(`/api/products/${route.params.id}`)

    product.value = data
    form.name = data.name
    form.sku = data.sku
    form.slug = data.slug
    form.description = data.description || ''
    form.price = data.price
    form.stock = data.stock || 0
    form.gtin = data.gtin || ''
    form.amazon_asin = data.amazon_asin || ''
    form.is_active = data.is_active !== false
    form.is_featured = data.is_featured || false
    form.google_category = data.google_product_category || ''
    form.free_shipping = data.free_shipping || false
    form.amazon_link = data.amazon_link || ''
    form.compare_at_price = data.compare_at_price || ''
    form.cost_price = data.cost_price || ''
    form.images = data.images || []

    // Pre-seleccionar las variantes (aromas) existentes del producto
    if (data.variants && data.variants.length > 0) {
      const profileIds = data.variants
        .filter(v => v.fragrance_profile_id)
        .map(v => v.fragrance_profile_id)
      selectedScents.value = new Set(profileIds)
      updateGroupCounts()
    }

    // Resolver el slug de la categoría a partir del category_id
    if (data.category_id) {
      const cat = categories.value.find(c => c.id === data.category_id)
      form.category = cat?.slug || ''
    }
  } catch (e) {
    console.error('Error:', e)
  } finally {
    loading.value = false
  }
}

// ===== Carga de perfiles aromáticos (variantes) =====
async function loadScentProfiles() {
  loadingProfiles.value = true
  try {
    const res = await $fetch('/api/fragrance-profiles/list')
    const profiles = res.profiles || []

    const activeProfiles = profiles.filter(p => p.is_active !== false)

    const groups = []
    const groupMap = new Map()
    for (const p of activeProfiles) {
      const colData = p.collection || p.collections
      const colKey = colData?.id || p.collection_id || 'sin-coleccion'
      const colName = colData?.name || p.collection_name || 'Otros aromas'
      const colIcon = colData?.icon || '🌸'
      const colSubtitle = colData?.subtitle || ''

      if (!groupMap.has(colKey)) {
        const g = {
          collection: { id: colKey, name: colName, icon: colIcon, subtitle: colSubtitle },
          scents: [],
          selectedCount: 0,
        }
        groupMap.set(colKey, g)
        groups.push(g)
      }
      groupMap.get(colKey).scents.push({
        id: p.id,
        name: p.name,
        subtitle: p.subtitle,
        experience: p.experience,
        emoji: p.emoji,
        collection_id: p.collection_id,
      })
    }

    scentGroups.value = groups
    allScents.value = activeProfiles.map(p => ({
      id: p.id,
      name: p.name,
      subtitle: p.subtitle,
      experience: p.experience,
      emoji: p.emoji,
      collection_id: p.collection_id,
    }))
  } catch (e) {
    console.error('Error cargando perfiles aromáticos:', e)
  } finally {
    loadingProfiles.value = false
  }
}

function isScentSelected(scentId) { return selectedScents.value.has(scentId) }

function toggleScent(scentId) {
  selectedScents.value.has(scentId) ? selectedScents.value.delete(scentId) : selectedScents.value.add(scentId)
  updateGroupCounts()
}

function toggleAllInGroup(group) {
  const allSelected = group.scents.every(s => selectedScents.value.has(s.id))
  group.scents.forEach(s => allSelected ? selectedScents.value.delete(s.id) : selectedScents.value.add(s.id))
  updateGroupCounts()
}

function updateGroupCounts() {
  scentGroups.value.forEach(g => {
    g.selectedCount = g.scents.filter(s => selectedScents.value.has(s.id)).length
  })
}

function triggerUpload() { fileInput.value?.click() }

function handleFileSelect(e) {
  const files = Array.from(e.target.files || [])
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue
    form.images.push({
      file,
      preview: URL.createObjectURL(file),
      is_primary: form.images.length === 0,
      _new: true,
    })
  }
}

function handleDrop(e) {
  const files = Array.from(e.dataTransfer.files || [])
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue
    form.images.push({
      file,
      preview: URL.createObjectURL(file),
      is_primary: form.images.length === 0,
      _new: true,
    })
  }
}

async function removeImage(index) {
  const img = form.images[index]
  if (img.id) {
    try {
      await $fetch('/api/products/delete-image', {
        method: 'DELETE',
        body: { imageId: img.id, imageUrl: img.url },
      })
    } catch (e) {
      console.error('Error eliminando imagen:', e)
    }
  }
  if (img.preview) URL.revokeObjectURL(img.preview)
  form.images.splice(index, 1)
}

async function setPrimary(index) {
  // Quitar primary de todas
  form.images.forEach(i => i.is_primary = false)
  form.images[index].is_primary = true
}

// Drag & drop para reordenar imágenes
const dragIndex = ref(null)

function onDragStart(index) {
  dragIndex.value = index
}

function onDragOver(index) {
  // Prevenir default para permitir drop
}

function onDragEnd() {
  dragIndex.value = null
}

function onDrop(targetIndex) {
  if (dragIndex.value === null || dragIndex.value === targetIndex) {
    dragIndex.value = null
    return
  }

  const from = dragIndex.value
  const to = targetIndex

  // Mover la imagen
  const [moved] = form.images.splice(from, 1)
  form.images.splice(to, 0, moved)

  // Si la imagen movida era la principal, mantenerla como principal
  // Si no, la primera imagen se convierte en principal si no hay ninguna
  if (!form.images.some(i => i.is_primary)) {
    form.images[0].is_primary = true
  }

  dragIndex.value = null
}

async function handleSave() {
  saving.value = true
  try {
    // Convertir imágenes nuevas a base64
    const images = []
    for (const img of form.images) {
      if (img._new && img.file) {
        const base64 = await fileToBase64(img.file)
        images.push({
          _new: true,
          name: img.file.name,
          type: img.file.type,
          data: base64,
          is_primary: img.is_primary,
        })
      } else {
        images.push({
          id: img.id,
          _new: false,
          is_primary: img.is_primary,
        })
      }
    }

    // Resolver category_id a partir del slug seleccionado
    const selectedCat = categories.value.find(c => c.slug === form.category)
    const categoryId = selectedCat?.id || null

    await $fetch('/api/products/update', {
      method: 'PUT',
      body: {
        id: route.params.id,
        product: {
          name: form.name,
          sku: form.sku,
          slug: form.slug,
          description: form.description,
          price: parseFloat(form.price),
          stock: parseInt(form.stock) || 0,
          gtin: form.gtin || null,
          amazon_asin: form.amazon_asin || null,
          is_active: form.is_active,
          is_featured: form.is_featured,
          google_product_category: form.google_category || null,
          free_shipping: form.free_shipping,
          amazon_link: form.amazon_link || null,
          compare_at_price: form.compare_at_price ? parseFloat(form.compare_at_price) : null,
          cost_price: form.cost_price ? parseFloat(form.cost_price) : null,
          category_id: categoryId,
        },
        images,
        variantProfileIds: Array.from(selectedScents.value),
      },
    })

    alert('✅ Cambios guardados')
    navigateTo('/products')
  } catch (e) {
    alert('Error: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

async function duplicateHere() {
  if (!confirm(`¿Duplicar "${product.value.name}"?`)) return
  try {
    await $fetch('/api/products/duplicate', {
      method: 'POST',
      body: { id: route.params.id },
    })
    alert('✅ Producto duplicado. Ve a la lista para editarlo.')
  } catch (e) {
    alert('Error al duplicar: ' + (e.data?.message || e.message))
  }
}

onMounted(async () => {
  // Cargar categorías y perfiles aromáticos en paralelo
  loadCategories()
  await loadScentProfiles()
  // Cargar el producto después de tener los perfiles aromáticos
  // para poder pre-seleccionar sus variantes correctamente
  loadProduct()
})
</script>
