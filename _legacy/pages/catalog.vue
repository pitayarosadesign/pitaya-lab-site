<template>
  <div class="min-h-screen">
    <!-- Header -->
    <section class="relative py-24 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">Catálogo</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-earth-900 mt-3 mb-6">
            Nuestros <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-amber-500">Productos</span>
          </h1>
          <p class="text-lg text-earth-600 leading-relaxed">
            Descubre nuestra colección completa de velas de soya, aceites aromáticos y brumas. 
            Cada producto elaborado con ingredientes botánicos para cuidar de ti y del planeta.
          </p>
        </div>
      </div>
    </section>

    <!-- Filtros de categoría -->
    <section class="py-8 bg-white border-b border-earth-100 sticky top-20 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-center justify-center gap-3">
          <button
            @click="activeCategory = 'all'"
            :class="[
              'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
              activeCategory === 'all'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-earth-50 text-earth-600 hover:bg-earth-100'
            ]"
          >
            Todos
          </button>
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="activeCategory = cat.id"
            :class="[
              'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
              activeCategory === cat.id
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-earth-50 text-earth-600 hover:bg-earth-100'
            ]"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Grid de productos -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Sin resultados -->
        <div v-if="filteredProducts.length === 0" class="text-center py-20">
          <p class="text-earth-500 text-lg">No hay productos en esta categoría.</p>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="cursor-pointer"
            @click="selectedProduct = product"
          >
            <ProductCard
              :product-name="`${product.name}${product.subtitle ? ' – ' + product.subtitle : ''}`"
              :short-description="`${product.description} (${product.size})`"
              :image-url="product.image"
              :amazon-link="product.amazonLink"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Modal selector de aromas -->
    <Teleport to="body">
      <div
        v-if="selectedProduct"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        @click.self="selectedProduct = null"
      >
        <div class="bg-white rounded-3xl p-8 md:p-10 max-w-2xl w-full shadow-2xl relative animate-fadeIn">
          <!-- Botón cerrar -->
          <button
            @click="selectedProduct = null"
            class="absolute top-4 right-4 w-10 h-10 rounded-full bg-earth-100 hover:bg-earth-200 flex items-center justify-center transition-colors"
          >
            <svg class="w-5 h-5 text-earth-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Header del modal -->
          <div class="text-center mb-8">
            <h3 class="text-2xl font-serif font-bold text-earth-900 mb-2">
              {{ selectedProduct.name }}
            </h3>
            <p class="text-earth-400 text-sm">
              Elige tu aroma favorito ✨
            </p>
          </div>

          <!-- Círculos de aromas (solo con imagen) -->
          <div class="flex flex-wrap justify-center gap-6">
            <div
              v-for="scent in scentsWithImage"
              :key="scent.id"
              class="group flex flex-col items-center gap-2 cursor-pointer"
              @click="goToAmazon(selectedProduct)"
            >
              <div class="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary-400 group-hover:scale-105">
                <img
                  :src="scent.image"
                  :alt="`Aroma ${scent.name}`"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span class="text-sm font-medium text-earth-700 group-hover:text-primary-600 transition-colors">
                {{ scent.name }}
              </span>
              <span class="text-[10px] text-earth-400 text-center leading-tight max-w-[100px]">
                {{ scent.description }}
              </span>
            </div>
          </div>

          <!-- Link a Amazon -->
          <div class="mt-8 text-center">
            <a
              :href="selectedProduct.amazonLink"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-amber-200"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a1.375 1.375 0 0 0 0 1.994l2.414 2.585a1.375 1.375 0 0 0 1.994 0l3.779-3.788-3.787 3.787-2.414-2.585a1.374 1.374 0 0 1 0-1.994l3.705-3.964 3.675-3.675a1.375 1.375 0 0 0-.044-1.92A1.374 1.374 0 0 0 13.483 0zm-1.587 2.585-3.673 3.675 3.673 3.675h7.252v-1.53h-5.733l-2.358-2.585 2.358-2.585h5.733v-1.53h-7.252z"/>
              </svg>
              Ver todos en Amazon
            </a>
          </div>

          <!-- Disclaimer aromas -->
          <p class="mt-6 text-[10px] text-earth-400 text-center leading-tight max-w-md mx-auto">
            * Los aromas "Xcaret" y "Vidanta" son referencias inspiracionales y descriptivas de la experiencia sensorial que evocan. PITAYA LAB no tiene afiliación, vínculo, patrocinio o asociación con los hoteles, marcas turísticas o titulares de dichos nombres. El uso de estas referencias se realiza con fines meramente descriptivos.
          </p>
        </div>
      </div>
    </Teleport>

    <!-- Tabla informativa de productos -->
    <section class="py-16 bg-white/70">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-serif font-bold text-earth-900 text-center mb-8">
          Guía Rápida de Productos
        </h2>
        <div class="overflow-x-auto rounded-2xl shadow-sm border border-earth-100">
          <table class="w-full text-sm">
            <thead class="bg-earth-50">
              <tr>
                <th class="px-4 py-3 text-left font-semibold text-earth-700">Producto</th>
                <th class="px-4 py-3 text-left font-semibold text-earth-700">Presentación</th>
                <th class="px-4 py-3 text-left font-semibold text-earth-700">Uso</th>
                <th class="px-4 py-3 text-left font-semibold text-earth-700">Aromas</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-earth-100">
              <tr v-for="product in products" :key="product.id" class="hover:bg-earth-50/50 transition-colors">
                <td class="px-4 py-3 font-medium text-earth-800">{{ product.name }}</td>
                <td class="px-4 py-3 text-earth-600">{{ product.size }}</td>
                <td class="px-4 py-3 text-earth-600">{{ product.subtitle || 'Uso general' }}</td>
                <td class="px-4 py-3">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="scentId in product.scents"
                      :key="scentId"
                      class="inline-block px-2 py-0.5 bg-primary-50 text-primary-700 text-xs rounded-full"
                    >
                      {{ getScentById(scentId)?.name }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="text-[10px] text-earth-400 text-center py-3 px-4 border-t border-earth-100">
            * Los aromas Xcaret y Vidanta son referencias inspiracionales. PITAYA LAB no tiene afiliación con los hoteles o marcas de dichos nombres.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Amazon -->
    <section class="py-16 bg-gradient-to-r from-primary-900 to-earth-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-serif font-bold text-white mb-4">
          ¡Todos disponibles en Amazon!
        </h2>
        <p class="text-primary-200 mb-8">
          Haz clic en cualquier producto o visita nuestra tienda oficial en Amazon México.
        </p>
        <a
          :href="AMAZON_LINK"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-xl hover:shadow-amber-900/30"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a1.375 1.375 0 0 0 0 1.994l2.414 2.585a1.375 1.375 0 0 0 1.994 0l3.779-3.788-3.787 3.787-2.414-2.585a1.374 1.374 0 0 1 0-1.994l3.705-3.964 3.675-3.675a1.375 1.375 0 0 0-.044-1.92A1.374 1.374 0 0 0 13.483 0zm-1.587 2.585-3.673 3.675 3.673 3.675h7.252v-1.53h-5.733l-2.358-2.585 2.358-2.585h5.733v-1.53h-7.252z"/>
          </svg>
          Ir a la Tienda en Amazon
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { products, SCENTS, getScentById } from '~/products/data'

useSeoMeta({
  title: 'Catálogo de Productos | PITAYA LAB',
  description: 'Explora nuestro catálogo completo de velas de soya perfumadas, aceites aromáticos para difusores y brumas aromáticas. Productos botánicos biodegradables.',
  ogTitle: 'Catálogo PITAYA LAB | Velas, Aceites y Brumas',
  ogDescription: 'Descubre todos nuestros productos: velas de soya clásicas y místicas, aceites aromáticos y brumas. Hecho en México.',
})

const AMAZON_LINK = 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329?'

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'velas', label: 'Velas' },
  { id: 'aceites', label: 'Aceites' },
  { id: 'brumas', label: 'Brumas' },
]

const activeCategory = ref('all')
const selectedProduct = ref(null)
const scentsWithImage = SCENTS.filter(s => s.image)

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') return products
  return products.filter(p => p.category === activeCategory.value)
})

function goToAmazon(product) {
  window.open(product.amazonLink, '_blank', 'noopener,noreferrer')
}
</script>
