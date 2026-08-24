<template>
  <div class="bg-[#f0f0f0] rounded-2xl overflow-hidden shadow-inner">
    <!-- Barra de navegación simulada -->
    <div class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-full" :style="{ backgroundColor: theme.primary[600] }"></span>
        <span class="font-serif font-bold text-sm" :style="{ color: theme.earth[900] }">PITAYA LAB</span>
      </div>
      <div class="hidden md:flex items-center gap-5">
        <span v-for="item in ['Inicio', 'Catálogo', 'B2B', 'Nosotros']" :key="item"
          class="text-xs font-medium"
          :style="{ color: item === 'Inicio' ? theme.primary[600] : theme.earth[600] }">
          {{ item }}
        </span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-xs font-medium flex items-center gap-1.5" :style="{ color: theme.earth[700] }">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          Carrito
        </span>
        <span class="text-xs font-semibold px-3 py-1.5 rounded-full text-white"
          :style="{ backgroundColor: theme.primary[600] }">
          Comprar
        </span>
      </div>
    </div>

    <!-- Hero simulado -->
    <div class="relative overflow-hidden px-6 py-14 md:px-14 md:py-20">
      <!-- Fondo degradado -->
      <div class="absolute inset-0"
        :style="{ background: `linear-gradient(135deg, ${theme.earth[900]} 0%, ${theme.primary[900]} 50%, ${theme.earth[900]} 100%)` }">
      </div>
      <!-- Orbes decorativos -->
      <div class="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-40"
        :style="{ backgroundColor: theme.primary[600] }"></div>
      <div class="absolute top-20 left-1/3 w-40 h-40 rounded-full blur-3xl opacity-30"
        :style="{ backgroundColor: theme.amber[500] }"></div>

      <!-- Contenido del hero -->
      <div class="relative max-w-2xl">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 mb-6">
          <span class="w-2 h-2 rounded-full animate-pulse" :style="{ backgroundColor: theme.amber[400] }"></span>
          <span class="text-sm font-medium text-white">Aromas de hotel de lujo</span>
        </div>
        <h2 class="font-serif font-bold text-3xl md:text-5xl text-white leading-tight mb-6">
          Velas de soya y aromas que transforman tu espacio
        </h2>
        <p class="text-white/80 text-base md:text-lg leading-relaxed mb-10">
          Sumérgete en fragancias inspiradas en los mejores resorts de México. Hechas a mano con cera de soya 100% vegana.
        </p>
        <div class="flex flex-wrap gap-4">
          <span class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all shadow-lg"
            :style="{ backgroundColor: theme.primary[500], boxShadow: `0 10px 25px -5px ${theme.primary[500]}40` }">
            Explorar productos
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </span>
          <span class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/30">
            Ver B2B
          </span>
        </div>
      </div>
    </div>

    <!-- Sección de productos simulada -->
    <div class="py-8 px-6 md:px-14" :style="{ backgroundColor: `${theme.primary[50]}88` }">
      <div class="text-center mb-6">
        <span class="text-xs font-semibold uppercase tracking-wider" :style="{ color: theme.primary[600] }">Lo más vendido</span>
        <h3 class="font-serif font-bold text-xl md:text-2xl mt-1" :style="{ color: theme.earth[900] }">Nuestros Productos</h3>
      </div>

      <!-- Grid de productos -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="product in mockProducts" :key="product.name"
          class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
          <div class="h-28 md:h-32 bg-gradient-to-br flex items-center justify-center"
            :style="{ background: `linear-gradient(135deg, ${product.gradient[0]} 0%, ${product.gradient[1]} 100%)` }">
            <span class="text-2xl">🕯️</span>
          </div>
          <div class="p-3">
            <p class="font-semibold text-xs md:text-sm truncate" :style="{ color: theme.earth[900] }">{{ product.name }}</p>
            <p class="text-[10px] mt-0.5 truncate" :style="{ color: theme.earth[600] }">{{ product.fragrance }}</p>
            <div class="flex items-center justify-between mt-2">
              <span class="text-xs font-bold" :style="{ color: theme.primary[700] }">{{ product.price }}</span>
              <span class="text-[10px] font-semibold px-2 py-1 rounded-full"
                :style="{ backgroundColor: theme.primary[50], color: theme.primary[700] }">
                + Info
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Enlace "Ver catálogo" -->
      <div class="text-center mt-6">
        <span class="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
          :style="{ color: theme.primary[600] }">
          Ver catálogo completo
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </span>
      </div>
    </div>

    <!-- Banda de confianza -->
    <div class="px-6 md:px-14 py-6 grid grid-cols-2 md:grid-cols-4 gap-4"
      :style="{ backgroundColor: theme.earth[50] }">
      <div v-for="item in trustItems" :key="item.label" class="flex items-center gap-2">
        <span class="text-lg">{{ item.icon }}</span>
        <div>
          <p class="text-xs font-semibold" :style="{ color: theme.earth[900] }">{{ item.label }}</p>
          <p class="text-[10px]" :style="{ color: theme.earth[600] }">{{ item.sub }}</p>
        </div>
      </div>
    </div>

    <!-- CTA final -->
    <div class="px-6 md:px-14 py-8 text-center">
      <div class="rounded-xl px-6 py-8"
        :style="{ background: `linear-gradient(135deg, ${theme.primary[700]} 0%, ${theme.amber[500]} 100%)` }">
        <h4 class="text-white font-serif font-bold text-lg md:text-xl mb-2">¿Buscas mayoreo o recuerdos para eventos?</h4>
        <p class="text-white/80 text-xs mb-4 max-w-md mx-auto">Ofrecemos precios especiales por volumen y kits personalizados para bodas, spas y hoteles.</p>
        <span class="inline-block px-5 py-2.5 rounded-full bg-white text-sm font-semibold"
          :style="{ color: theme.primary[800] }">
          Cotizar ahora
        </span>
      </div>
    </div>

    <!-- Footer simulado -->
    <div class="px-6 md:px-14 py-5 text-center border-t border-gray-200 bg-white">
      <p class="text-xs" :style="{ color: theme.earth[900] }">PITAYA LAB · Aromas que despiertan tus sentidos</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  theme: { type: Object, required: true },
})

const mockProducts = [
  { name: 'Vela Clásica', fragrance: 'Xcaret · Tabaco y vainilla', price: '$349', gradient: [ '#fdf8f0', '#f3e5d0' ] },
  { name: 'Vela Mística', fragrance: 'Vidanta · Jazmín y sándalo', price: '$449', gradient: [ '#f0f7f7', '#d8e8e6' ] },
  { name: 'Aceite Difusor', fragrance: 'Solara · Cítricos', price: '$289', gradient: [ '#fef6e4', '#f9e3b3' ] },
  { name: 'Bruma Ambiental', fragrance: 'Maderas del Edén', price: '$329', gradient: [ '#f0f4ec', '#dce8d4' ] },
]

const trustItems = [
  { icon: '🕯️', label: '100% Soya', sub: 'Cera vegana' },
  { icon: '🚚', label: 'Envío rápido', sub: 'Toda México' },
  { icon: '🔒', label: 'Pago seguro', sub: 'Stripe' },
  { icon: '🌿', label: 'Ecológico', sub: 'Vela limpia' },
]
</script>
