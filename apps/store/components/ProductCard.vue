<template>
  <article
    class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-earth-100 hover:border-primary-200 flex flex-col"
    itemscope
    itemtype="https://schema.org/Product"
  >
    <!-- Imagen del producto -->
    <div class="relative overflow-hidden aspect-square bg-earth-50">
      <img
        :src="imageUrl"
        :alt="`${productName} - PITAYA LAB`"
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        loading="lazy"
        itemprop="image"
      />
      
      <!-- Overlay en hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-earth-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
        <span class="text-white text-sm font-medium bg-primary-600/80 backdrop-blur-sm px-3 py-1 rounded-full">
          Ver detalle →
        </span>
      </div>
    </div>

    <!-- Información del producto -->
    <div class="p-5 flex flex-col flex-grow">
      <!-- Nombre -->
      <h3
        class="text-lg font-serif font-bold text-earth-800 mb-2 line-clamp-2"
        itemprop="name"
      >
        {{ productName }}
      </h3>

      <!-- Descripción corta -->
      <p
        class="text-sm text-earth-500 mb-4 line-clamp-3 flex-grow"
        itemprop="description"
      >
        {{ shortDescription }}
      </p>

      <!-- Botones de acción -->
      <div class="mt-auto flex gap-2">
        <!-- Botón Agregar al carrito / Ver detalle -->
        <NuxtLink
          v-if="detailLink"
          :to="detailLink"
          class="flex-1 inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary-200"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
          </svg>
          Agregar
        </NuxtLink>

        <!-- Botón Amazon (solo icono) -->
        <a
          v-if="amazonLink"
          :href="amazonLink"
          target="_blank"
          rel="noopener noreferrer"
          class="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-amber-300 hover:border-amber-500 bg-amber-50 hover:bg-amber-100 transition-all flex-shrink-0"
          itemprop="offers"
          itemscope
          itemtype="https://schema.org/Offer"
          :title="'Comprar en Amazon'"
        >
          <img
            src="/images/amazon-tile.svg"
            alt="Amazon"
            class="w-6 h-6"
          />
          <meta itemprop="priceCurrency" content="MXN" />
          <meta itemprop="availability" content="https://schema.org/InStock" />
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
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
    required: true
  },
  productSlug: {
    type: String,
    default: null
  },
  showDetailLink: {
    type: Boolean,
    default: false
  }
})

const detailLink = computed(() => {
  if (props.productSlug) return `/product/${props.productSlug}`
  return null
})
</script>
