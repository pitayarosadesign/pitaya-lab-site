<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink to="/products" class="text-gray-400 hover:text-gray-600 transition-colors">
        ← Volver
      </NuxtLink>
      <h1 class="text-2xl font-bold text-gray-900">Nuevo Producto</h1>
    </div>

    <form @submit.prevent="handleSave" class="space-y-6">
      <!-- INFO BASICA -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">Información del Producto</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del producto *</label>
            <input v-model="form.name" type="text" required placeholder="Ej: Vela Aromática Clásica" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
            <input v-model="form.sku" type="text" required placeholder="Ej: VCL-250" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-mono" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
            <select v-model="form.category" required class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all">
              <option value="">Seleccionar</option>
              <option value="velas">Velas</option>
              <option value="aceites">Aceites</option>
              <option value="brumas">Brumas</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción corta</label>
          <textarea v-model="form.description" rows="2" placeholder="Descripción breve para tarjetas de producto" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción larga</label>
          <textarea v-model="form.long_description" rows="4" placeholder="Descripción detallada para la página del producto" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>

      <!-- IMAGENES -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">📸 Imágenes del Producto</h2>
        <p class="text-sm text-gray-400">Sube imágenes del producto. La primera será la imagen principal.</p>
        <div class="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary-300 hover:bg-primary-50/30 transition-all cursor-pointer" @click="triggerUpload" @dragover.prevent @drop.prevent="handleDrop">
          <input ref="fileInput" type="file" multiple accept="image/png,image/jpeg,image/webp" class="hidden" @change="handleFileSelect" />
          <svg class="w-10 h-10 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <p class="text-sm text-gray-500">Arrastra imágenes aquí o <span class="text-primary-600 font-medium">haz clic para subir</span></p>
          <p class="text-xs text-gray-400 mt-1">PNG, JPG o WebP · Max 5MB</p>
        </div>
        <div v-if="form.images.length > 0" class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
          <div v-for="(img, index) in form.images" :key="index" class="relative group aspect-square rounded-lg overflow-hidden border border-gray-200" :class="{ 'ring-2 ring-primary-500': index === 0 }">
            <img :src="img.preview" :alt="'Imagen ' + (index + 1)" class="w-full h-full object-cover" />
            <div v-if="index === 0" class="absolute top-1 left-1 bg-primary-600 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">Principal</div>
            <button type="button" @click="removeImage(index)" class="absolute top-1 right-1 bg-white/90 text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <button v-if="index > 0" type="button" @click="setPrimary(index)" class="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-[10px] py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Hacer principal</button>
          </div>
        </div>
      </div>

      <!-- PRECIOS -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">Precios</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Precio de venta *</label>
            <div class="relative">
              <span class="absolute left-3 top-2.5 text-gray-400">$</span>
              <input v-model="form.price" type="number" required min="0" step="0.01" placeholder="0.00" class="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Precio comparativa</label>
            <div class="relative">
              <span class="absolute left-3 top-2.5 text-gray-400">$</span>
              <input v-model="form.compare_at_price" type="number" min="0" step="0.01" placeholder="0.00" class="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
            </div>
            <p class="text-xs text-gray-400 mt-1">Precio tachado "antes"</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Costo</label>
            <div class="relative">
              <span class="absolute left-3 top-2.5 text-gray-400">$</span>
              <input v-model="form.cost_price" type="number" min="0" step="0.01" placeholder="0.00" class="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
            </div>
            <p class="text-xs text-gray-400 mt-1">Solo visible en admin (margen de ganancia)</p>
          </div>
        </div>
      </div>

      <!-- INVENTARIO -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">Inventario</h2>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
          <input v-model="form.stock" type="number" min="0" placeholder="0" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>

      <!-- ENVIO -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">Configuración de Envío</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label><input v-model="form.weight_kg" type="number" min="0" step="0.01" placeholder="0.00" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Largo (cm)</label><input v-model="form.length_cm" type="number" min="0" step="0.1" placeholder="0" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Ancho (cm)</label><input v-model="form.width_cm" type="number" min="0" step="0.1" placeholder="0" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Alto (cm)</label><input v-model="form.height_cm" type="number" min="0" step="0.1" placeholder="0" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div>
        </div>
        <label class="flex items-center gap-2">
          <input v-model="form.free_shipping" type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
          <span class="text-sm text-gray-700">Producto elegible para envío gratis</span>
        </label>
      </div>

      <!-- SEO & CATALOGOS -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">🌐 SEO & Catálogos de Venta</h2>
        <p class="text-sm text-gray-400">Configura cómo aparece tu producto en Google, Pinterest, Instagram y Amazon.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Slug (URL del producto)</label>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-400 font-mono">pitayalab.com.mx/productos/</span>
              <input v-model="form.slug" type="text" placeholder="vela-aromatica-clasica" class="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-mono text-sm" />
            </div>
            <p class="text-xs text-gray-400 mt-1">Se genera automáticamente desde el nombre</p>
          </div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Meta Title</label><input v-model="form.meta_title" type="text" placeholder="Vela Aromática Clásica | PITAYA LAB" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Meta Description</label><input v-model="form.meta_description" type="text" placeholder="Vela de soya perfumada 100% natural..." class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div>
        </div>

        <!-- Google Merchant -->
        <div class="pt-4 border-t border-gray-100">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-lg">🐱</span>
            <h3 class="text-sm font-semibold text-gray-700">Google Merchant Center</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Categoría Google</label>
              <select v-model="form.google_category" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all">
                <option value="">Seleccionar</option>
                <option value="Home & Garden > Home Decor > Candles">Hogar > Decoración > Velas</option>
                <option value="Health & Beauty > Aromatherapy > Essential Oils">Salud > Aromaterapia > Aceites</option>
                <option value="Home & Garden > Home Decor > Home Fragrance Accessories">Hogar > Fragancias</option>
              </select>
            </div>
            <div><label class="block text-sm font-medium text-gray-700 mb-1">GTIN (código barras)</label><input v-model="form.gtin" type="text" placeholder="7501234567890" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-mono" /></div>
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Condición</label>
              <select v-model="form.google_condition" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all">
                <option value="new">Nuevo</option>
                <option value="refurbished">Reacondicionado</option>
                <option value="used">Usado</option>
              </select>
            </div>
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Marca</label><input v-model="form.brand" type="text" placeholder="PITAYA LAB" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div>
          </div>
        </div>

        <!-- Pinterest/Instagram -->
        <div class="pt-4 border-t border-gray-100">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-lg">📌</span>
            <h3 class="text-sm font-semibold text-gray-700">Pinterest & Instagram Shopping</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Categoría Pinterest</label>
              <select v-model="form.pinterest_category" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all">
                <option value="">Seleccionar</option>
                <option value="Home Decor">Hogar > Decoración</option>
                <option value="Candles & Home Fragrance">Velas y Fragancias</option>
                <option value="Health & Wellness">Salud y Bienestar</option>
              </select>
            </div>
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Tipo Instagram</label>
              <select v-model="form.instagram_type" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all">
                <option value="">Seleccionar</option>
                <option value="product">Producto</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Amazon -->
        <div class="pt-4 border-t border-gray-100">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-lg">🛒</span>
            <h3 class="text-sm font-semibold text-gray-700">Amazon</h3>
            <span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Canal secundario</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label class="block text-sm font-medium text-gray-700 mb-1">ASIN</label><input v-model="form.amazon_asin" type="text" placeholder="B0XXXXXX" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-mono" /></div>
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Precio Amazon</label><div class="relative"><span class="absolute left-3 top-2.5 text-gray-400">$</span><input v-model="form.amazon_price" type="number" min="0" step="0.01" placeholder="0.00" class="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div></div>
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Link Amazon</label><input v-model="form.amazon_link" type="url" placeholder="https://amazon.com.mx/..." class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div>
          </div>
          <label class="flex items-center gap-2 mt-3">
            <input v-model="form.sync_amazon" type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <span class="text-sm text-gray-700">Sincronizar inventario con Amazon</span>
          </label>
        </div>
      </div>

      <!-- VARIANTES -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">Variantes (Aromas)</h2>
          <button type="button" @click="addVariant" class="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Agregar aroma</button>
        </div>
        <div v-for="(variant, index) in form.variants" :key="index" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div class="flex-1 grid grid-cols-3 gap-3">
            <input v-model="variant.name" type="text" placeholder="Nombre del aroma" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <input v-model="variant.sku" type="text" placeholder="SKU variante" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono" />
            <input v-model="variant.price" type="number" placeholder="Precio" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>
          <button type="button" @click="removeVariant(index)" class="text-red-400 hover:text-red-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>

      <!-- BOTONES -->
      <div class="flex items-center justify-end gap-3">
        <NuxtLink to="/products" class="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">Cancelar</NuxtLink>
        <button type="submit" class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors">Guardar Producto</button>
      </div>
    </form>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const fileInput = ref(null)

const form = reactive({
  name: '',
  sku: '',
  category: '',
  description: '',
  long_description: '',
  images: [],
  price: '',
  compare_at_price: '',
  cost_price: '',
  stock: 0,
  weight_kg: '',
  length_cm: '',
  width_cm: '',
  height_cm: '',
  free_shipping: false,
  slug: '',
  meta_title: '',
  meta_description: '',
  google_category: '',
  gtin: '',
  google_condition: 'new',
  brand: 'PITAYA LAB',
  pinterest_category: '',
  instagram_type: '',
  amazon_asin: '',
  amazon_price: '',
  amazon_link: '',
  sync_amazon: false,
  variants: []
})

watch(() => form.name, (name) => {
  if (name && !form.slug) {
    form.slug = name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
  }
})

function triggerUpload() { fileInput.value?.click() }
function handleFileSelect(e) { addImages(Array.from(e.target.files || [])) }
function handleDrop(e) { addImages(Array.from(e.dataTransfer.files || [])) }

function addImages(files) {
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue
    if (file.size > 5 * 1024 * 1024) continue
    form.images.push({ file, preview: URL.createObjectURL(file), name: file.name })
  }
}

function removeImage(index) {
  const img = form.images[index]
  if (img?.preview) URL.revokeObjectURL(img.preview)
  form.images.splice(index, 1)
}

function setPrimary(index) {
  const img = form.images.splice(index, 1)[0]
  form.images.unshift(img)
}

function addVariant() { form.variants.push({ name: '', sku: '', price: '' }) }
function removeVariant(index) { form.variants.splice(index, 1) }

async function handleSave() {
  try {
    // Obtener category_id
    const { data: catData } = await supabase
      .from('product_categories')
      .select('id')
      .eq('slug', form.category)
      .single()

    // Preparar imágenes como base64 para el API
    const images = []
    for (const img of form.images) {
      const base64 = await fileToBase64(img.file)
      images.push({
        name: img.file.name,
        type: img.file.type,
        data: base64,
      })
    }

    const { data, error } = await $fetch('/api/products/create', {
      method: 'POST',
      body: {
        product: {
          sku: form.sku,
          name: form.name,
          slug: form.slug,
          subtitle: form.subtitle || null,
          description: form.description,
          long_description: form.long_description,
          category_id: catData?.id || null,
          price: parseFloat(form.price),
          compare_at_price: form.compare_at_price ? parseFloat(form.compare_at_price) : null,
          cost_price: form.cost_price ? parseFloat(form.cost_price) : null,
          stock: parseInt(form.stock) || 0,
          weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
          length_cm: form.length_cm ? parseFloat(form.length_cm) : null,
          width_cm: form.width_cm ? parseFloat(form.width_cm) : null,
          height_cm: form.height_cm ? parseFloat(form.height_cm) : null,
          free_shipping: form.free_shipping,
          google_product_category: form.google_category,
          gtin: form.gtin,
          google_condition: form.google_condition,
          brand: form.brand,
          pinterest_product_category: form.pinterest_category,
          instagram_product_type: form.instagram_type,
          amazon_asin: form.amazon_asin,
          amazon_price: form.amazon_price ? parseFloat(form.amazon_price) : null,
          amazon_link: form.amazon_link,
          sync_amazon: form.sync_amazon,
          is_active: true,
          published_at: new Date().toISOString(),
        },
        images,
        variants: form.variants.map(v => ({
          name: v.name,
          sku: v.sku,
          price: v.price,
        })),
      },
    })

    if (error) throw new Error(error)
    await navigateTo('/products')
  } catch (e) {
    console.error('Error:', e)
    alert('Error al guardar: ' + e.message)
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

onUnmounted(() => {
  form.images.forEach(img => { if (img.preview) URL.revokeObjectURL(img.preview) })
})
</script>
