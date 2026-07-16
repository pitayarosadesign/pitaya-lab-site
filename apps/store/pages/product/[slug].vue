<template>
  <div class="min-h-screen bg-white">
    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-earth-500">Cargando producto...</p>
      </div>
    </div>

    <!-- Error / No encontrado -->
    <div v-else-if="error" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center max-w-md mx-auto px-4">
        <p class="text-6xl mb-4">🔍</p>
        <h1 class="text-2xl font-serif font-bold text-earth-900 mb-2">Producto no encontrado</h1>
        <p class="text-earth-500 mb-6">El producto que buscas no existe o ha sido removido.</p>
        <NuxtLink to="/catalog" class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all">
          ← Volver al catálogo
        </NuxtLink>
      </div>
    </div>

    <!-- Producto -->
    <template v-else-if="product">
      <!-- Breadcrumb -->
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <ol class="flex items-center gap-2 text-sm text-earth-400">
          <li><NuxtLink to="/" class="hover:text-primary-600 transition-colors">Inicio</NuxtLink></li>
          <li>/</li>
          <li><NuxtLink to="/catalog" class="hover:text-primary-600 transition-colors">Catálogo</NuxtLink></li>
          <li>/</li>
          <li v-if="product.category" class="text-earth-600">{{ product.category }}</li>
          <li v-if="product.category">/</li>
          <li class="text-earth-800 font-medium truncate max-w-[200px]">{{ product.name }}</li>
        </ol>
      </nav>

      <!-- Contenido principal -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Columna izquierda: Imágenes -->
          <div class="space-y-4">
            <!-- Imagen principal -->
            <div class="aspect-square rounded-3xl overflow-hidden bg-earth-50 shadow-sm border border-earth-100">
              <img
                v-if="product.image"
                :src="activeImage"
                :alt="product.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-earth-300">
                <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>

            <!-- Thumbnails -->
            <div v-if="product.images && product.images.length > 1" class="flex gap-3 overflow-x-auto pb-2">
              <button
                v-for="(img, index) in product.images"
                :key="img.id || index"
                @click="activeImageIndex = index"
                class="w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all"
                :class="activeImageIndex === index ? 'border-primary-500 shadow-md' : 'border-earth-200 hover:border-earth-300'"
              >
                <img :src="img.url" :alt="img.altText || product.name" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Columna derecha: Información -->
          <div class="flex flex-col">
            <!-- Categoría -->
            <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">
              {{ product.category || 'Producto' }}
            </span>

            <!-- Nombre -->
            <h1 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mb-2">
              {{ product.name }}
            </h1>

            <!-- Subtítulo -->
            <p v-if="product.subtitle" class="text-lg text-earth-500 mb-4">
              {{ product.subtitle }}
            </p>

            <!-- Precio -->
            <div class="flex items-baseline gap-3 mb-6">
              <span class="text-3xl font-bold text-earth-900">${{ formatPrice(product.price) }}</span>
              <span v-if="product.compareAtPrice" class="text-lg text-earth-400 line-through">${{ formatPrice(product.compareAtPrice) }}</span>
              <span v-if="discountPercent > 0" class="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                -{{ discountPercent }}%
              </span>
            </div>

            <!-- Descripción -->
            <p class="text-earth-600 leading-relaxed mb-6">
              {{ product.description }}
            </p>

            <!-- Descripción larga -->
            <div v-if="product.longDescription" class="bg-earth-50 rounded-2xl p-5 mb-6">
              <p class="text-sm text-earth-600 leading-relaxed">
                {{ product.longDescription }}
              </p>
            </div>

            <!-- Variantes (Aromas) -->
            <div v-if="product.variants && product.variants.length > 0" class="mb-6">
              <h3 class="text-sm font-semibold text-earth-700 mb-3">Elige tu aroma:</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="variant in product.variants"
                  :key="variant.id"
                  @click="selectedVariant = variant"
                  class="px-4 py-2.5 rounded-xl text-sm font-medium transition-all border-2"
                  :class="selectedVariant?.id === variant.id
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-earth-200 bg-white text-earth-600 hover:border-earth-300'"
                >
                  {{ variant.name }}
                </button>
              </div>
            </div>

            <!-- Stock y envío -->
            <div class="flex flex-wrap items-center gap-4 mb-8 text-sm">
              <span v-if="product.stock > 0" class="flex items-center gap-1.5 text-green-600">
                <span class="w-2 h-2 rounded-full bg-green-500"></span>
                En stock ({{ product.stock }} disponibles)
              </span>
              <span v-else class="flex items-center gap-1.5 text-red-500">
                <span class="w-2 h-2 rounded-full bg-red-400"></span>
                Agotado temporalmente
              </span>
              <span v-if="product.freeShipping" class="flex items-center gap-1.5 text-primary-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                </svg>
                Envío gratis
              </span>
            </div>

            <!-- Botones de acción -->
            <div class="space-y-3">
              <!-- Agregar al carrito -->
              <button
                @click="addToCart"
                class="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all hover:shadow-xl hover:shadow-primary-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                :disabled="product.stock === 0"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
                </svg>
                {{ product.stock === 0 ? 'Agotado' : 'Agregar al carrito' }}
              </button>

              <!-- Comprar en Amazon -->
              <a
                v-if="product.amazonLink"
                :href="product.amazonLink"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all hover:shadow-lg hover:shadow-amber-200"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a1.375 1.375 0 0 0 0 1.994l2.414 2.585a1.375 1.375 0 0 0 1.994 0l3.779-3.788-3.787 3.787-2.414-2.585a1.374 1.374 0 0 1 0-1.994l3.705-3.964 3.675-3.675a1.375 1.375 0 0 0-.044-1.92A1.374 1.374 0 0 0 13.483 0zm-1.587 2.585-3.673 3.675 3.673 3.675h7.252v-1.53h-5.733l-2.358-2.585 2.358-2.585h5.733v-1.53h-7.252z"/>
                </svg>
                Comprar en Amazon México
              </a>
            </div>

            <!-- Características -->
            <div v-if="product.features && product.features.length > 0" class="mt-10 border-t border-earth-100 pt-8">
              <h3 class="text-lg font-semibold text-earth-800 mb-4">Características</h3>
              <ul class="space-y-3">
                <li v-for="(feature, i) in product.features" :key="i" class="flex items-start gap-3 text-earth-600">
                  <svg class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>

            <!-- SKU y GTIN -->
            <div class="mt-8 pt-6 border-t border-earth-100">
              <div class="flex flex-wrap gap-6 text-xs text-earth-400">
                <span v-if="product.sku">SKU: {{ product.sku }}</span>
                <span v-if="product.gtin">GTIN: {{ product.gtin }}</span>
                <span v-if="product.brand">Marca: {{ product.brand }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Productos relacionados -->
      <section v-if="relatedProducts.length > 0" class="bg-earth-50/50 py-16 mt-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-2xl font-serif font-bold text-earth-900 mb-8 text-center">
            Productos relacionados
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard
              v-for="rp in relatedProducts"
              :key="rp.id"
              :product-name="`${rp.name}${rp.subtitle ? ' – ' + rp.subtitle : ''}`"
              :short-description="rp.description || ''"
              :image-url="rp.image"
              :amazon-link="rp.amazonLink"
              :product-slug="rp.slug"
              :price="rp.price"
              :product-id="rp.id"
            />
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
const route = useRoute()
const supabase = useNuxtApp().$supabase

const product = ref(null)
const loading = ref(true)
const error = ref(false)
const activeImageIndex = ref(0)
const selectedVariant = ref(null)

// Imagen activa
const activeImage = computed(() => {
  if (product.value?.images && product.value.images.length > 0) {
    return product.value.images[activeImageIndex.value]?.url || product.value.image
  }
  return product.value?.image
})

// Descuento porcentual
const discountPercent = computed(() => {
  if (!product.value?.compareAtPrice) return 0
  const diff = product.value.compareAtPrice - product.value.price
  return Math.round((diff / product.value.compareAtPrice) * 100)
})

// Productos relacionados (misma categoría)
const relatedProducts = ref([])

// Formatear precio
function formatPrice(price) {
  return Number(price).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Agregar al carrito
function addToCart() {
  if (!product.value || product.value.stock === 0) return

  const cartItem = {
    id: product.value.id,
    slug: product.value.slug,
    name: product.value.name,
    subtitle: product.value.subtitle,
    price: product.value.price,
    image: product.value.image,
    variant: selectedVariant.value ? {
      id: selectedVariant.value.id,
      name: selectedVariant.value.name,
    } : null,
    quantity: 1,
  }

  // Usar el store de carrito (si existe) o emitir evento
  const nuxtApp = useNuxtApp()
  if (nuxtApp.$cart) {
    nuxtApp.$cart.addItem(cartItem)
  } else {
    // Fallback: usar localStorage
    const existing = JSON.parse(localStorage.getItem('pitaya-cart') || '[]')
    existing.push(cartItem)
    localStorage.setItem('pitaya-cart', JSON.stringify(existing))
  }

  // Feedback visual
  useNuxtApp().$toast?.success?.(`${product.value.name} agregado al carrito`)

  // Si no hay toast, mostrar alerta simple
  if (!useNuxtApp().$toast) {
    alert(`✅ "${product.value.name}" agregado al carrito`)
  }
}

// Cargar producto
async function loadProduct() {
  loading.value = true
  error.value = false

  try {
    // Intentar desde API
    const data = await $fetch(`/api/products/${route.params.slug}`)
    if (data?.product) {
      product.value = data.product
      if (data.product.variants?.length > 0) {
        selectedVariant.value = data.product.variants[0]
      }
      // Cargar relacionados
      await loadRelatedProducts(data.product.categorySlug, data.product.id)
    } else {
      error.value = true
    }
  } catch (e) {
    if (e.status === 404) {
      error.value = true
    } else {
      // Fallback: buscar en datos estáticos
      console.warn('Error cargando producto, intentando con datos estáticos:', e.message)
      await loadStaticProduct()
    }
  } finally {
    loading.value = false
  }
}

// Fallback a datos estáticos
async function loadStaticProduct() {
  try {
    const { products: staticProducts, getProductById } = await import('~/products/data')
    const found = staticProducts.find(p => p.id === route.params.slug || p.slug === route.params.slug)
    if (found) {
      const { SCENTS } = await import('~/products/data')
      product.value = {
        id: found.id,
        sku: found.id?.toUpperCase(),
        name: found.name,
        slug: found.id,
        subtitle: found.subtitle || '',
        description: found.description || '',
        longDescription: found.longDescription || '',
        price: 0,
        category: found.category || '',
        categorySlug: found.category || '',
        image: found.image || null,
        images: found.image ? [{ url: found.image, isPrimary: true }] : [],
        variants: (found.scents || []).map((scentId, i) => {
          const scent = SCENTS.find(s => s.id === scentId)
          return {
            id: scentId,
            name: scent?.name || scentId,
            description: scent?.description || '',
            imageUrl: scent?.image || null,
            stock: 10,
            isActive: true,
          }
        }),
        stock: 10,
        features: found.features || [],
        amazonLink: found.amazonLink || null,
        brand: 'PITAYA LAB',
      }
      if (product.value.variants?.length > 0) {
        selectedVariant.value = product.value.variants[0]
      }
      relatedProducts.value = staticProducts
        .filter(p => p.category === found.category && p.id !== found.id)
        .slice(0, 4)
        .map(p => ({
          ...p,
          slug: p.id,
          categorySlug: p.category,
        }))
    } else {
      error.value = true
    }
  } catch (e2) {
    console.error('Error en fallback:', e2)
    error.value = true
  }
}

// Cargar productos relacionados
async function loadRelatedProducts(categorySlug, currentId) {
  if (!categorySlug) return
  try {
    const data = await $fetch('/api/products', {
      query: { category: categorySlug, limit: 4 }
    })
    if (data?.products) {
      relatedProducts.value = data.products.filter(p => p.id !== currentId).slice(0, 4)
    }
  } catch (e) {
    console.warn('No se pudieron cargar relacionados:', e.message)
  }
}

// SEO dinámico
const seoTitle = computed(() => {
  if (!product.value) return 'Producto | PITAYA LAB'
  return `${product.value.name}${product.value.subtitle ? ' – ' + product.value.subtitle : ''} | PITAYA LAB`
})

const seoDescription = computed(() => {
  if (!product.value) return ''
  return product.value.description || `Compra ${product.value.name} de PITAYA LAB. Productos botánicos biodegradables.`
})

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogImage: activeImage,
})

onMounted(() => {
  loadProduct()
})
</script>
