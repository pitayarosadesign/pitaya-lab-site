que <template>
  <header class="fixed top-0 left-0 right-0 z-50">
    <!-- ✅ Barra promocional de envíos -->
    <div class="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white text-center text-xs sm:text-sm py-2.5 px-4 leading-relaxed">
      <p class="flex items-center justify-center gap-1.5 flex-wrap">
        <span class="hidden sm:inline">🚚</span>
        <span class="font-semibold">Envío gratis</span>
        <span>en compras mayores a</span>
        <span class="font-bold text-amber-300">$200 MXN</span>
        <span class="hidden sm:inline">• Paquete Express, Estafeta y FedEx</span>
        <span class="hidden sm:inline">|</span>
        <span>Menores: solo</span>
        <span class="font-bold text-amber-300">$50</span>
        <span class="hidden xs:inline">|</span>
        <span class="text-primary-200">3 a 5 días hábiles</span>
      </p>
    </div>
    <div class="bg-white/90 backdrop-blur-md border-b border-earth-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <img
            src="/images/brand/logo-pitayalab.png"
            alt="PITAYA LAB"
            class="h-10 w-10 rounded-full object-cover shadow-md group-hover:shadow-lg transition-all"
          />
          <div class="hidden sm:block">
            <h1 class="text-xl font-serif font-bold text-earth-800 leading-tight">PITAYA LAB</h1>
            <p class="text-xs text-earth-500 -mt-1">Fragancias que conectan</p>
          </div>
        </NuxtLink>

        <!-- Navegación desktop -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-sm font-medium text-earth-600 hover:text-primary-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-500 after:transition-all hover:after:w-full pb-1"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            :href="AMAZON_LINK"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-amber-200"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a1.375 1.375 0 0 0 0 1.994l2.414 2.585a1.375 1.375 0 0 0 1.994 0l3.779-3.788-3.787 3.787-2.414-2.585a1.374 1.374 0 0 1 0-1.994l3.705-3.964 3.675-3.675a1.375 1.375 0 0 0-.044-1.92A1.374 1.374 0 0 0 13.483 0zm-1.587 2.585-3.673 3.675 3.673 3.675h7.252v-1.53h-5.733l-2.358-2.585 2.358-2.585h5.733v-1.53h-7.252z"/>
            </svg>
            Tienda Amazon
          </a>
          <!-- Carrito -->
          <button
            @click="cart.openCart()"
            class="relative p-2.5 rounded-xl text-earth-600 hover:text-primary-600 hover:bg-primary-50 transition-all"
            aria-label="Abrir carrito"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
            </svg>
            <span
              v-if="cart.totalItems > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
            >
              {{ cart.totalItems > 9 ? '9+' : cart.totalItems }}
            </span>
          </button>
        </nav>

        <!-- Botón menú móvil -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg text-earth-600 hover:bg-earth-100 transition-colors"
          aria-label="Abrir menú"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      </div>
    </div>

    <!-- Menú móvil -->
    <Transition
      enter-from-class="opacity-0 -translate-y-4"
      enter-active-class="transition-all duration-300"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-earth-100 shadow-lg">
        <div class="px-4 py-4 space-y-3">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            @click="mobileMenuOpen = false"
            class="block py-2 text-earth-700 hover:text-primary-600 font-medium transition-colors"
          >
            {{ link.label }}
          </NuxtLink>
          <button
            @click="mobileMenuOpen = false; cart.openCart()"
            class="flex items-center justify-between w-full py-2 text-earth-700 hover:text-primary-600 font-medium transition-colors"
          >
            <span>🛒 Carrito</span>
            <span v-if="cart.totalItems > 0" class="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
              {{ cart.totalItems }}
            </span>
          </button>
          <a
            :href="AMAZON_LINK"
            target="_blank"
            rel="noopener noreferrer"
            class="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-full font-semibold transition-all"
          >
            🛒 Compra en Amazon
          </a>
        </div>
      </div>
    </Transition>
  </header>

  <!-- Cart Sidebar -->
  <CartSidebar />
</template>

<script setup>
const cart = useCartStore()
const AMAZON_LINK = 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329?'

const mobileMenuOpen = ref(false)

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/about', label: 'Sobre Nosotros' },
  { path: '/philosophy', label: 'Nuestra Filosofía' },
  { path: '/catalog', label: 'Catálogo' },
]

watch(mobileMenuOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>
