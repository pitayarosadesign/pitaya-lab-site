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
          Ver en Amazon →
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

      <!-- Botón Amazon -->
      <a
        :href="amazonLink"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-amber-200 mt-auto"
        itemprop="offers"
        itemscope
        itemtype="https://schema.org/Offer"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a1.375 1.375 0 0 0 0 1.994l2.414 2.585a1.375 1.375 0 0 0 1.994 0l3.779-3.788-3.787 3.787-2.414-2.585a1.374 1.374 0 0 1 0-1.994l3.705-3.964 3.675-3.675a1.375 1.375 0 0 0-.044-1.92A1.374 1.374 0 0 0 13.483 0zm-1.587 2.585-3.673 3.675 3.673 3.675h7.252v-1.53h-5.733l-2.358-2.585 2.358-2.585h5.733v-1.53h-7.252z"/>
        </svg>
        Comprar en Amazon
        <meta itemprop="priceCurrency" content="MXN" />
        <meta itemprop="availability" content="https://schema.org/InStock" />
      </a>
    </div>
  </article>
</template>

<script setup>
defineProps({
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
  }
})
</script>
