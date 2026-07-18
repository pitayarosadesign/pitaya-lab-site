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
          <div v-for="(img, index) in form.images" :key="img.id || index" class="relative group aspect-square rounded-lg overflow-hidden border border-gray-200" :class="{ 'ring-2 ring-primary-500': img.is_primary }">
            <img :src="img.url || img.preview" :alt="'Imagen ' + (index + 1)" class="w-full h-full object-cover" />
            <div v-if="img.is_primary" class="absolute top-1 left-1 bg-primary-600 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">Principal</div>
            <button type="button" @click="removeImage(index)" class="absolute top-1 right-1 bg-white/90 text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <button v-if="!img.is_primary" type="button" @click="setPrimary(index)" class="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-[10px] py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Hacer principal</button>
          </div>
        </div>

        <!-- Subir nueva -->
        <div class="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary-300 hover:bg-primary-50/30 transition-all cursor-pointer" @click="triggerUpload" @dragover.prevent @drop.prevent="handleDrop">
          <input ref="fileInput" type="file" accept="image/png,image/jpeg,image/webp" class="hidden" @change="handleFileSelect" />
          <svg class="w-10 h-10 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <p class="text-sm text-gray-500">Arrastra imágenes o haz clic para subir</p>
        </div>
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
  </div>
</template>

<script setup>
const supabase = useSupabase()
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
})

async function loadProduct() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', route.params.id)
      .single()
    if (error) throw error

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

    // Cargar imágenes
    const { data: images } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', data.id)
      .order('sort_order', { ascending: true })
    form.images = images || []
  } catch (e) {
    console.error('Error:', e)
  } finally {
    loading.value = false
  }
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
        },
        images,
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
    const { error } = await supabase
      .from('products')
      .insert({
        name: `${form.name} (copia)`,
        slug: `${form.slug}-copia-${Date.now()}`,
        sku: form.sku ? `${form.sku}-COPY` : null,
        subtitle: product.value.subtitle,
        description: form.description,
        long_description: product.value.long_description,
        price: parseFloat(form.price),
        compare_at_price: form.compare_at_price ? parseFloat(form.compare_at_price) : null,
        cost: product.value.cost,
        stock: parseInt(form.stock) || 0,
        category: product.value.category,
        category_slug: product.value.category_slug,
        image: product.value.image,
        images: product.value.images,
        is_active: false,
        is_featured: false,
        amazon_link: form.amazon_link || null,
        amazon_asin: form.amazon_asin || null,
        amazon_price: product.value.amazon_price,
        weight_kg: product.value.weight_kg,
        length_cm: product.value.length_cm,
        width_cm: product.value.width_cm,
        height_cm: product.value.height_cm,
        requires_shipping: product.value.requires_shipping,
        free_shipping: form.free_shipping,
        gtin: form.gtin || null,
        brand: product.value.brand,
      })
    if (error) throw error
    alert('✅ Producto duplicado. Ve a la lista para editarlo.')
  } catch (e) {
    alert('Error al duplicar: ' + e.message)
  }
}

onMounted(() => {
  loadProduct()
})
</script>
