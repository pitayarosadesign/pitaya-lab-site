<template>
  <article
    class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-earth-100 hover:border-primary-200 flex flex-col"
    itemscope
    itemtype="https://schema.org/Product"
  >
    <!-- Imagen del producto (link al detalle) -->
    <NuxtLink
      v-if="productSlug"
      :to="`/product/${productSlug}`"
      class="relative overflow-hidden aspect-square bg-earth-50 block"
    >
      <img
        :src="imageUrl"
        :alt="`${productName} - PITAYA LAB`"
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        loading="lazy"
        itemprop="image"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-earth-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </NuxtLink>
    <div v-else class="relative overflow-hidden aspect-square bg-earth-50">
      <img
        :src="imageUrl"
        :alt="`${productName} - PITAYA LAB`"
        class="w-full h-full object-cover"
        loading="lazy"
        itemprop="image"
      />
    </div>

    <!-- Información del producto -->
    <div class="p-5 flex flex-col flex-grow">
      <!-- Nombre (link al detalle si tiene slug) -->
      <NuxtLink
        v-if="productSlug"
        :to="`/product/${productSlug}`"
        class="text-lg font-serif font-bold text-earth-800 mb-2 line-clamp-2 hover:text-primary-600 transition-colors"
        itemprop="name"
      >
        {{ productName }}
      </NuxtLink>
      <h3 v-else class="text-lg font-serif font-bold text-earth-800 mb-2 line-clamp-2" itemprop="name">
        {{ productName }}
      </h3>

      <!-- Descripción corta -->
      <p
        class="text-sm text-earth-500 mb-3 line-clamp-2 flex-grow"
        itemprop="description"
      >
        {{ shortDescription }}
      </p>

      <!-- PRECIO -->
      <div class="mb-4" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
        <p class="text-xl font-bold text-earth-900">
          ${{ formatPrice(price) }} <span class="text-sm font-normal text-earth-400">MXN</span>
        </p>
        <meta itemprop="price" :content="String(price)" />
        <meta itemprop="priceCurrency" content="MXN" />
        <meta itemprop="availability" content="https://schema.org/InStock" />
      </div>

      <!-- Botones de acción -->
      <div class="mt-auto flex gap-2">
        <!-- Botón Ver detalle (outline) -->
        <NuxtLink
          v-if="productSlug"
          :to="`/product/${productSlug}`"
          class="flex-1 inline-flex items-center justify-center gap-2 border-2 border-earth-200 hover:border-primary-300 text-earth-600 hover:text-primary-700 bg-white hover:bg-primary-50/50 px-4 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
          Ver detalle
        </NuxtLink>

        <!-- Botón Agregar al carrito (icono verde tipo Amazon) -->
        <button
          @click="addToCart"
          class="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-600 hover:bg-primary-700 text-white transition-all hover:shadow-lg hover:shadow-primary-200 active:scale-95 flex-shrink-0"
          :title="'Agregar al carrito'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
          </svg>
        </button>

        <!-- Botón Amazon (solo icono) -->
        <a
          v-if="amazonLink"
          :href="amazonLink"
          target="_blank"
          rel="noopener noreferrer"
          class="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-amber-300 hover:border-amber-500 bg-amber-50 hover:bg-amber-100 transition-all flex-shrink-0 active:scale-95"
          :title="'Comprar en Amazon'"
        >
          <img
            src="/images/amazon-tile.svg"
            alt="Amazon"
            class="w-6 h-6"
          />
        </a>
      </div>

      <!-- Toast de confirmación -->
      <Transition
        enter-from-class="opacity-0 translate-y-2"
        enter-active-class="transition-all duration-300"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
      >
        <div
          v-if="showToast"
          class="absolute bottom-20 left-4 right-4 bg-earth-900 text-white text-xs text-center py-2 px-3 rounded-lg shadow-lg"
        >
          ✅ Agregado al carrito
        </div>
      </Transition>
    </div>
  </article>
</template>

<script setup>
const cart = useCartStore()

const props = defineProps({
  productName: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  amazonLink: {
    type: String,
    default: null
  },
  productSlug: {
    type: String,
    default: null
  },
  productId: {
    type: [String, Number],
    default: null
  },
  price: {
    type: Number,
    default: 0
  },
})

const showToast = ref(false)

function formatPrice(price) {
  return Number(price).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function addToCart() {
  cart.addItem({
    id: String(props.productId || props.productSlug || props.productName),
    slug: props.productSlug || '',
    name: props.productName,
    subtitle: '',
    price: props.price,
    image: props.imageUrl,
    variant: null,
    quantity: 1,
  })

  // Mostrar toast
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 2000)
}
</script>
