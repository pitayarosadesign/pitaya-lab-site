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
            <!-- Imagen principal con sobrepuesto de notas del aroma -->
            <div class="aspect-square rounded-3xl overflow-hidden bg-earth-50 shadow-sm border border-earth-100 relative">
              <img
                v-if="activeImage"
                :src="activeImage"
                :alt="activeImageAlt"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-earth-300">
                <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>

              <!-- 🌸 Sobre puesto de aroma: variante, colección, hotel y notas -->
              <div
                v-if="selectedFragrance && (selectedFragrance.name || selectedFragrance.notesList.length)"
                class="absolute bottom-4 left-4 right-4"
              >
                <div class="bg-white/85 backdrop-blur-xl rounded-2xl shadow-2xl shadow-earth-900/10 border border-earth-100 overflow-hidden">
                  <!-- Header: nombre del aroma + badges discretos -->
                  <div class="px-5 pt-4 pb-3 flex items-center justify-between gap-3">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <span v-if="selectedFragrance.emoji" class="text-2xl leading-none flex-shrink-0 drop-shadow-sm">{{ selectedFragrance.emoji }}</span>
                      <div class="min-w-0">
                        <p class="text-sm font-serif font-bold text-earth-900 leading-tight truncate">{{ selectedFragrance.name }}</p>
                        <p v-if="selectedFragrance.subtitle" class="text-[10px] text-earth-500 italic leading-tight truncate">{{ selectedFragrance.subtitle }}</p>
                      </div>
                    </div>
                    <div class="flex flex-col items-end gap-1 flex-shrink-0">
                      <span
                        v-if="selectedFragrance.collection"
                        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-earth-200 bg-earth-50/80 text-earth-600 text-[10px] font-medium tracking-wide"
                        :title="`Colección ${selectedFragrance.collection.name}`"
                      >
                        {{ selectedFragrance.collection.icon || '🖇️' }}
                        {{ selectedFragrance.collection.name }}
                      </span>
                      <span
                        v-if="selectedFragrance.hotelReference"
                        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-amber-200 bg-amber-50/80 text-amber-700 text-[10px] font-medium"
                        :title="'Hotel inspirado'"
                      >
                        ✨ {{ selectedFragrance.hotelReference }}
                      </span>
                    </div>
                  </div>

                  <!-- Separador fino -->
                  <div v-if="selectedFragrance.notesList.length" class="mx-5 border-t border-earth-100"></div>

                  <!-- Cuerpo: notas aromáticas -->
                  <div v-if="selectedFragrance.notesList.length" class="px-5 py-3">
                    <!-- Notas estructuradas (SAL/COR/FONDO) -->
                    <div v-if="selectedFragrance.notesList.length > 1" class="flex flex-wrap gap-1.5">
                      <span
                        v-for="note in selectedFragrance.notesList"
                        :key="note.label"
                        class="inline-flex items-baseline gap-1 px-2 py-1 rounded-lg border border-earth-100 bg-white/60"
                      >
                        <span class="text-[9px] font-semibold text-primary-600 uppercase tracking-wider">{{ note.label }}</span>
                        <span class="text-[11px] text-earth-700 font-medium leading-snug">{{ note.values }}</span>
                      </span>
                    </div>
                    <!-- Notas simples (texto libre) -->
                    <div v-else class="flex items-baseline gap-1.5">
                      <span class="text-[9px] font-semibold text-primary-600 uppercase tracking-wider flex-shrink-0">Notas</span>
                      <span class="text-[11px] text-earth-700 font-medium leading-snug">{{ selectedFragrance.notesList[0].values }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Thumbnails: imágenes del producto + imágenes de cada variante -->
            <div v-if="allGalleryImages.length > 1" class="flex gap-3 overflow-x-auto pb-2">
              <button
                v-for="(img, index) in allGalleryImages"
                :key="img.key"
                @click="selectGalleryImage(index)"
                class="w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all relative"
                :class="activeGalleryIndex === index ? 'border-primary-500 shadow-md' : 'border-earth-200 hover:border-earth-300'"
              >
                <img :src="img.url" :alt="img.alt || product.name" class="w-full h-full object-cover" />
                <!-- Etiqueta si es imagen de una variante -->
                <span v-if="img.variantName" class="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] py-0.5 text-center truncate">
                  {{ img.variantName }}
                </span>
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

            <!-- Precio (usando la variante seleccionada si tiene precio propio) -->
            <div class="flex items-baseline gap-3 mb-6">
              <span class="text-3xl font-bold text-earth-900">${{ formatPrice(activePrice) }}</span>
              <span v-if="activeCompareAtPrice" class="text-lg text-earth-400 line-through">${{ formatPrice(activeCompareAtPrice) }}</span>
              <span v-if="activeDiscountPercent > 0" class="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                -{{ activeDiscountPercent }}%
              </span>
              <span v-if="selectedVariant?.name" class="text-xs text-earth-400 mt-1">
                ※ {{ selectedVariant.name }}
              </span>
            </div>
            <!-- Precio base del producto (referencia "desde") -->
            <p v-if="showFromPrice" class="text-sm text-earth-400 -mt-4 mb-6">
              Precio base del producto: <span class="font-semibold text-earth-600">${{ formatPrice(product.price) }}</span>
            </p>

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
                  @click="selectVariant(variant)"
                  class="px-4 py-2.5 rounded-xl text-sm font-medium transition-all border-2"
                  :class="selectedVariant?.id === variant.id
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-earth-200 bg-white text-earth-600 hover:border-earth-300'"
                >
                  {{ variant.name }}
                </button>
              </div>

              <!-- 🌸 Experiencia olfativa del aroma seleccionado (sincronizada con catálogo) -->
              <div
                v-if="selectedFragrance && (selectedFragrance.experience || selectedFragrance.description || selectedFragrance.subtitle)"
                class="mt-4 p-5 rounded-2xl bg-earth-50/70 border border-earth-100"
              >
                <div class="flex flex-wrap items-center gap-2 mb-2">
                  <span v-if="selectedFragrance.emoji" class="text-xl leading-none">{{ selectedFragrance.emoji }}</span>
                  <p class="text-sm font-serif font-bold text-earth-900">{{ selectedFragrance.name }}</p>
                  <span
                    v-if="selectedFragrance.collection"
                    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-earth-200 bg-white text-earth-600 text-[10px] font-medium"
                  >
                    {{ selectedFragrance.collection.icon || '🖇️' }}
                    {{ selectedFragrance.collection.name }}
                  </span>
                  <span
                    v-if="selectedFragrance.hotelReference"
                    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-amber-200 bg-white text-amber-700 text-[10px] font-medium"
                  >
                    ✨ {{ selectedFragrance.hotelReference }}
                  </span>
                </div>
                <p v-if="selectedFragrance.experience" class="text-sm text-earth-600 leading-relaxed">
                  {{ selectedFragrance.experience }}
                </p>
                <p v-if="selectedFragrance.description" class="text-xs text-earth-500 leading-relaxed mt-1">
                  {{ selectedFragrance.description }}
                </p>
              </div>
            </div>

            <!-- Stock y envío -->
            <div class="flex flex-wrap items-center gap-4 mb-8 text-sm">
              <!-- En stock -->
              <span v-if="currentStock > 0" class="flex items-center gap-1.5 text-green-600">
                <span class="w-2 h-2 rounded-full bg-green-500"></span>
                {{ productConfig.in_stock_label }} ({{ currentStock }} disponibles)
              </span>
              <!-- Sobre pedido (sin stock) -->
              <span v-if="currentStock <= 0" class="flex items-center gap-1.5 text-amber-600">
                <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                {{ productConfig.backorder_message }}
              </span>
              <span v-if="product.freeShipping" class="flex items-center gap-1.5 text-primary-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                </svg>
                Envío gratis
              </span>
            </div>

            <!-- 🏷️ Badges de confianza dinámicos -->
            <div class="flex flex-wrap gap-2 mb-6">
              <!-- 🔥 Stock bajo -->
              <span v-if="currentStock > 0 && currentStock <= 5"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-semibold animate-pulse">
                🔥 {{ productConfig.low_stock_label.replace('X', currentStock) }}
              </span>
              <!-- 🆕 Producto nuevo -->
              <span v-if="isNewProduct"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold">
                🆕 Nuevo
              </span>
              <!-- ⭐ Bestseller -->
              <span v-if="isBestseller"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs font-semibold">
                ⭐ Bestseller
              </span>
              <!-- 🎁 Envío gratis -->
              <span v-if="product.freeShipping"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-600 text-xs font-semibold">
                🎁 Envío gratis
              </span>
              <!-- 💎 Artesanal -->
              <span v-if="product.artisanal"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-600 text-xs font-semibold">
                💎 Hecho a mano
              </span>
            </div>

            <!-- Botones de acción -->
            <div class="space-y-3">
              <!-- Agregar al carrito -->
              <button
                @click="addToCart"
                class="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all hover:shadow-xl hover:shadow-primary-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                :disabled="!isPurchasable"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
                </svg>
                {{ buttonLabel }}
              </button>

              <!-- 🔒 Confianza de pago -->
              <div class="bg-earth-50/70 rounded-2xl p-4 border border-earth-100">
                <!-- Pago seguro -->
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-earth-800">Pago 100% seguro</p>
                    <p class="text-xs text-earth-500">Tus datos están protegidos con cifrado SSL</p>
                  </div>
                </div>

                <!-- Métodos de pago (Stripe: tarjetas de crédito/débito) -->
                <div class="flex flex-wrap items-center gap-1.5 mb-3">
                  <span class="inline-flex items-center px-2 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-700">VISA</span>
                  <span class="inline-flex items-center px-2 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-700">MasterCard</span>
                  <span class="inline-flex items-center px-2 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-700">AMEX</span>
                </div>

                <!-- Garantías -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-earth-100">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                    </svg>
                    <span class="text-[11px] text-earth-600">Envío a todo México</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    <span class="text-[11px] text-earth-600">Devoluciones fáciles</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    <span class="text-[11px] text-earth-600">Compra protegida</span>
                  </div>
                </div>
              </div>
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

            <!-- SKU y GTIN (usa los de la variante seleccionada si existe) -->
            <div class="mt-8 pt-6 border-t border-earth-100">
              <div class="flex flex-wrap gap-6 text-xs text-earth-400">
                <span v-if="activeSku">SKU: {{ activeSku }}</span>
                <span v-if="activeGtin">GTIN: {{ activeGtin }}</span>
                <span v-if="product.brand">Marca: {{ product.brand }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 🎉 Toast de confirmación al agregar al carrito -->
      <Teleport to="body">
        <Transition
          enter-from-class="opacity-0 translate-y-4"
          enter-active-class="transition-all duration-300"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-4"
        >
          <div
            v-if="showAddToast && toastProduct"
            class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] w-[calc(100%-2rem)] max-w-md"
          >
            <div class="bg-white rounded-2xl shadow-2xl border border-earth-100 p-4 flex items-center gap-4">
              <!-- Miniatura del producto -->
              <div class="w-14 h-14 rounded-xl overflow-hidden bg-earth-50 flex-shrink-0">
                <img
                  v-if="toastProduct.image"
                  :src="toastProduct.image"
                  :alt="toastProduct.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-earth-300 text-xl">📦</div>
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-green-600 flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  ¡Agregado al carrito!
                </p>
                <p class="text-xs text-earth-500 truncate">{{ toastProduct.name }}</p>
                <p v-if="toastProduct.variant" class="text-[11px] text-earth-400">{{ toastProduct.variant.name }}</p>
              </div>

              <!-- Acciones -->
              <div class="flex flex-col gap-1.5 flex-shrink-0">
                <button
                  @click="cart.openCart()"
                  class="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-lg transition-all whitespace-nowrap"
                >
                  Ver carrito
                </button>
                <button
                  @click="showAddToast = false"
                  class="px-3 py-1.5 text-earth-500 hover:text-earth-700 text-xs font-medium rounded-lg transition-all whitespace-nowrap"
                >
                  Seguir viendo
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

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
const cart = useCartStore()

// Utilidades compartidas de fragancia (notas, experiencia).
// Auto-importadas desde composables/useFragrance.ts:
// const fragranceOfVariant = (v: any) => ...  → disponible como import automático

const product = ref(null)
const loading = ref(true)
const error = ref(false)
const activeImageIndex = ref(0)
const selectedVariant = ref(null)

// Configuración editable de la página de producto (desde site_config key "product_page").
// Permite personalizar mensajes de stock / sobre pedido desde el panel admin.
const productConfig = reactive({
  backorder_message: 'Preparación sobre pedido: se elabora artesanalmente en taller (3-4 días), puede tardar más según demanda',
  backorder_button_label: 'Agregar al carrito (sobre pedido)',
  in_stock_label: 'En stock',
  low_stock_label: '¡Solo quedan X!',
})

// Cargar configuración editable desde site_config
async function loadProductConfig() {
  try {
    if (!supabase) return
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'product_page')
      .single()
    if (error) throw error
    if (data?.value) {
      Object.assign(productConfig, data.value)
    }
  } catch (e) {
    console.warn('Usando configuración por defecto de la página de producto:', e.message)
  }
}

// 🎉 Toast de confirmación al agregar al carrito
const showAddToast = ref(false)
const toastProduct = ref(null)
const toastTimer = ref(null)

// ===== Galería combinada: imágenes del producto + imágenes de cada variante =====
// Construye una lista unificada de todas las imágenes disponibles para que el
// usuario pueda deslizar entre las del producto y las de cada aroma.
const allGalleryImages = computed(() => {
  if (!product.value) return []
  const list = []

  // Imágenes generales del producto
  if (product.value.images && product.value.images.length > 0) {
    product.value.images.forEach((img, i) => {
      list.push({
        key: `product-${img.id || i}`,
        url: img.url,
        alt: img.altText || product.value.name,
        variantName: null,
      })
    })
  } else if (product.value.image) {
    list.push({
      key: 'product-main',
      url: product.value.image,
      alt: product.value.name,
      variantName: null,
    })
  }

  // Imágenes de cada variante (aroma) que tengan imagen propia
  if (product.value.variants && product.value.variants.length > 0) {
    product.value.variants.forEach(v => {
      if (v.imageUrl) {
        list.push({
          key: `variant-${v.id}`,
          url: v.imageUrl,
          alt: `${product.value.name} – ${v.name}`,
          variantName: v.name,
        })
      }
    })
  }

  return list
})

// Índice activo en la galería combinada
const activeGalleryIndex = ref(0)

// Imagen activa: la del índice activo de la galería combinada
const activeImage = computed(() => {
  const img = allGalleryImages.value[activeGalleryIndex.value]
  return img?.url || product.value?.image || null
})

// Alt de la imagen activa
const activeImageAlt = computed(() => {
  const img = allGalleryImages.value[activeGalleryIndex.value]
  return img?.alt || product.value?.name || ''
})

// Al seleccionar una imagen de la galería, actualizar el índice y, si es de una
// variante, seleccionar esa variante.
function selectGalleryImage(index) {
  activeGalleryIndex.value = index
  const img = allGalleryImages.value[index]
  if (img?.variantName && product.value?.variants) {
    const v = product.value.variants.find(x => x.name === img.variantName)
    if (v) selectedVariant.value = v
  }
}

// Al seleccionar una variante, mostrar su imagen en la galería (si tiene).
function selectVariant(variant) {
  selectedVariant.value = variant
  if (variant?.imageUrl) {
    const idx = allGalleryImages.value.findIndex(img => img.key === `variant-${variant.id}`)
    if (idx !== -1) activeGalleryIndex.value = idx
  }
}

// ===== 🌸 Experiencia olfativa de la variante seleccionada =====
// Deriva la información del perfil aromático vinculado (notas, experiencia,
// emoji) para mostrarlas junto al selector de aroma. Las mismas notas que
// aparecen en el catálogo ("Explora por aroma").
const selectedFragrance = computed(() => {
  if (!selectedVariant.value) return null
  const frag = fragranceOfVariant(selectedVariant.value)
  if (frag) return frag
  // Fallback: si la variante no está vinculada a un perfil, derivar de su nombre
  return {
    id: selectedVariant.value.id,
    name: selectedVariant.value.name,
    emoji: '🌸',
    subtitle: '',
    description: '',
    experience: '',
    notes: '',
    notesList: [],
    hotelReference: '',
    image: selectedVariant.value.imageUrl || null,
    slug: '',
  }
})

// Precio activo: prioriza el precio de la variante seleccionada
const activePrice = computed(() => {
  if (selectedVariant.value?.price != null) {
    return selectedVariant.value.price
  }
  return product.value?.price || 0
})

// Compare-at price activo
const activeCompareAtPrice = computed(() => {
  if (selectedVariant.value?.compareAtPrice != null) {
    return selectedVariant.value.compareAtPrice
  }
  return product.value?.compareAtPrice || null
})

// Mostrar el precio base del producto como referencia "desde" cuando la
// variante seleccionada tiene un precio propio distinto al del producto.
const showFromPrice = computed(() => {
  if (!product.value) return false
  // Solo si hay variantes y la seleccionada tiene precio propio
  if (!selectedVariant.value || selectedVariant.value.price == null) return false
  // Mostrar solo si el precio de la variante difiere del precio del producto
  return Number(selectedVariant.value.price) !== Number(product.value.price)
})

// SKU activo (el de la variante si existe)
const activeSku = computed(() => {
  if (selectedVariant.value?.sku) return selectedVariant.value.sku
  return product.value?.sku || ''
})

// GTIN activo (el de la variante si existe)
const activeGtin = computed(() => {
  if (selectedVariant.value?.gtin) return selectedVariant.value.gtin
  return product.value?.gtin || ''
})

// Descuento porcentual (usa precio activo y compare-at activo)
const activeDiscountPercent = computed(() => {
  if (!activeCompareAtPrice.value) return 0
  const base = Number(activeCompareAtPrice.value)
  if (base <= 0) return 0
  const diff = base - Number(activePrice.value)
  return Math.round((diff / base) * 100)
})

// Stock actual: el de la variante seleccionada si existe, si no el general
const currentStock = computed(() => {
  if (!product.value) return 0
  if (selectedVariant.value && selectedVariant.value.stock !== undefined) {
    return selectedVariant.value.stock
  }
  return product.value.stock
})

// ¿Se puede comprar? Siempre se puede agregar al carrito.
// Si no hay stock, se trata como pedido sobre pedido (preparación en taller).
const isPurchasable = computed(() => {
  return !!product.value
})

// 🏷️ Badges de confianza
// ¿Es un producto nuevo? (creado hace menos de 30 días)
const isNewProduct = computed(() => {
  if (!product.value?.created_at) return false
  const created = new Date(product.value.created_at)
  const now = new Date()
  const daysDiff = (now - created) / (1000 * 60 * 60 * 24)
  return daysDiff <= 30
})

// ¿Es un bestseller? (más de 50 ventas o marcado como tal)
const isBestseller = computed(() => {
  if (!product.value) return false
  // Si el producto tiene un campo sales_count o is_bestseller
  if (product.value.is_bestseller) return true
  if (product.value.sales_count && product.value.sales_count >= 50) return true
  return false
})

// Texto del botón según estado
const buttonLabel = computed(() => {
  if (!product.value) return 'Agregar al carrito'
  if (currentStock.value > 0) return 'Agregar al carrito'
  return productConfig.backorder_button_label || 'Agregar al carrito (sobre pedido)'
})

// Productos relacionados (misma categoría)
const relatedProducts = ref([])

// Formatear precio
function formatPrice(price) {
  return Number(price).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Agregar al carrito
function addToCart() {
  if (!product.value || !isPurchasable.value) return

  const cartStore = useCartStore()

  const cartItem = {
    id: product.value.id,
    slug: product.value.slug,
    name: product.value.name,
    subtitle: product.value.subtitle,
    // Precio: el de la variante seleccionada si existe, si no el del producto
    price: selectedVariant.value?.price ?? product.value.price,
    // Imagen: la de la variante seleccionada si existe, si no la del producto
    image: selectedVariant.value?.imageUrl || product.value.image,
    variant: selectedVariant.value ? {
      id: selectedVariant.value.id,
      name: selectedVariant.value.name,
      sku: selectedVariant.value.sku,
    } : null,
    quantity: 1,
  }

  cartStore.addItem(cartItem)

  // 🎉 Toast de confirmación con miniatura y acciones
  showAddToast.value = true
  toastProduct.value = cartItem
  clearTimeout(toastTimer.value)
  toastTimer.value = setTimeout(() => {
    showAddToast.value = false
  }, 3500)
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
      // Seleccionar la variante del aroma indicado en la URL (?aroma=...)
      // si viene desde el catálogo; si no, la primera variante por defecto.
      if (data.product.variants?.length > 0) {
        const requestedAroma = route.query.aroma
        let initial = data.product.variants[0]

        if (requestedAroma) {
          const requested = String(requestedAroma).toLowerCase()
          const match = data.product.variants.find(v => {
            const prog = v.fragrance
            // Coincidir por slug del perfil o por nombre del aroma/variante
            if (prog) {
              if (prog.slug && prog.slug.toLowerCase() === requested) return true
              if (prog.name && prog.name.toLowerCase() === requested) return true
            }
            if (v.name && v.name.toLowerCase() === requested) return true
            return false
          })
          if (match) initial = match
        }

        selectedVariant.value = initial
        if (initial?.imageUrl) {
          // Esperar a que se construya la galería para ubicar el índice
          await nextTick()
          const idx = allGalleryImages.value.findIndex(img => img.key === `variant-${initial.id}`)
          if (idx !== -1) activeGalleryIndex.value = idx
        }
      }
      // Cargar relacionados
      await loadRelatedProducts(data.product.categorySlug, data.product.id)
    } else {
      error.value = true
    }
  } catch (e) {
    // El producto solo proviene de Supabase (vía API). Si no existe o hay un
    // error de red, se muestra el estado de error (sin inventar datos estáticos).
    console.warn('Error cargando producto:', e.message)
    error.value = true
  } finally {
    loading.value = false
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

// 🏷️ JSON-LD Product Schema para Google Rich Results
const productSchema = computed(() => {
  if (!product.value) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.value.name}${product.value.subtitle ? ' – ' + product.value.subtitle : ''}`,
    description: product.value.description || product.value.name,
    sku: product.value.sku || undefined,
    gtin: product.value.gtin || undefined,
    mpn: product.value.sku || undefined,
    brand: {
      '@type': 'Brand',
      name: product.value.brand || 'PITAYA LAB',
    },
    image: product.value.image || undefined,
    offers: {
      '@type': 'Offer',
      url: `https://www.pitayalab.com.mx/product/${route.params.slug}`,
      priceCurrency: 'MXN',
      price: product.value.price || 0,
      availability: product.value.stock > 0
        ? 'https://schema.org/InStock'
        : (product.value.allowBackorder ? 'https://schema.org/PreOrder' : 'https://schema.org/OutOfStock'),
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'MX',
        returnPolicyCategory: 'https://schema.org/MerchantReturnUnspecified',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'MX',
        },
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: product.value.freeShipping ? '0' : '75',
          currency: 'MXN',
        },
      },
    },
    ...(product.value.variants?.length > 0 ? {
      additionalProperty: product.value.variants.map(v => ({
        '@type': 'PropertyValue',
        name: 'Aroma',
        value: v.name,
      })),
    } : {}),
  }
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify(productSchema.value, null, 2)),
    },
  ],
})

onMounted(() => {
  loadProductConfig()
  loadProduct()
})

onUnmounted(() => {
  clearTimeout(toastTimer.value)
})
</script>
