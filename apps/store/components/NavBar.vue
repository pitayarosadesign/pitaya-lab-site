<template>
  
  <header class="fixed top-0 left-0 right-0 z-50">
    <!-- ✅ Barra promocional de envíos (configurable desde el admin).
         Se oculta al hacer scroll para no tapar contenido en móvil/desktop. -->
    <div
      v-if="shippingBar.enabled && !scrolled"
      class="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white text-center text-xs sm:text-sm py-2 px-4 leading-relaxed transition-all duration-300 overflow-hidden"
      :class="scrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-16 opacity-100'"
    >
      <p class="flex items-center justify-center gap-1.5 flex-wrap">
        <span class="hidden sm:inline">🚚</span>
        <span class="font-semibold">Envío gratis</span>
        <span>en compras mayores a</span>
        <span class="font-bold text-amber-300">${{ formatPrice(shippingBar.free_shipping_min) }} MXN</span>
        <span class="hidden sm:inline">• {{ shippingBar.couriers.join(', ') }}</span>
      </p>
    </div>
    <div class="bg-white/90 backdrop-blur-md border-b border-earth-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 md:gap-3 group min-w-0">
          <img
            :src="brand.logo_url"
            :alt="brand.name"
            class="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover shadow-md group-hover:shadow-lg transition-all flex-shrink-0"
          />
          <div class="hidden sm:block min-w-0">
            <h1 class="text-lg md:text-xl font-serif font-bold text-earth-800 leading-tight truncate">{{ brand.name }}</h1>
            <p class="text-xs text-earth-500 -mt-1 truncate max-w-[40vw]">{{ brand.tagline }}</p>
          </div>
        </NuxtLink>

        <!-- Navegación desktop -->
        <nav class="hidden md:flex items-center gap-7">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-sm font-medium text-earth-600 hover:text-primary-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-500 after:transition-all hover:after:w-full pb-1"
          >
            {{ link.label }}
          </NuxtLink>
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

        <!-- Acciones móvil (carrito + menú) -->
        <div class="flex items-center gap-1 md:hidden">
          <button
            @click="cart.openCart()"
            class="relative p-2 rounded-lg text-earth-600 hover:bg-earth-100 transition-colors"
            aria-label="Abrir carrito"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
            </svg>
            <span
              v-if="cart.totalItems > 0"
              class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
            >
              {{ cart.totalItems > 9 ? '9+' : cart.totalItems }}
            </span>
          </button>
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="p-2 rounded-lg text-earth-600 hover:bg-earth-100 transition-colors"
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
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-earth-100 shadow-xl max-h-[calc(100dvh-4rem)] overflow-y-auto">
        <nav class="px-4 py-2 space-y-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            @click="mobileMenuOpen = false"
            class="block py-3 text-earth-700 hover:text-primary-600 font-medium transition-colors border-b border-earth-50"
          >
            {{ link.label }}
          </NuxtLink>
          <button
            @click="mobileMenuOpen = false; cart.openCart()"
            class="flex items-center justify-between w-full py-3 text-earth-700 hover:text-primary-600 font-medium transition-colors"
          >
            <span>🛒 Carrito</span>
            <span v-if="cart.totalItems > 0" class="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
              {{ cart.totalItems }}
            </span>
          </button>
        </nav>
      </div>
    </Transition>
  </header>

  <ClientOnly>
    <!-- Cart Sidebar -->
    <CartSidebar />
  </ClientOnly>
</template>

<script setup>
const cart = useCartStore()
const AMAZON_LINK = 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329?'

const mobileMenuOpen = ref(false)

// 🚚 Barra de envíos (configurable desde el admin). Por defecto DESACTIVADA
// hasta que se cargue el registro `shipping_bar` de Supabase. Si no existe ese
// registro, la barra NO se muestra (evita que una barra "fija" no poder quitar).
const shippingBar = reactive({
  enabled: false,
  free_shipping_min: 200,
  shipping_fee: 50,
  couriers: ['Paquete Express', 'Estafeta', 'FedEx'],
  delivery_days: '3 a 5 días hábiles',
})

// 🏷️ Marca (logo, nombre, eslogan) configurable desde el admin
const brand = reactive({
  name: 'PITAYA LAB',
  tagline: 'Fragancias que conectan',
  logo_url: '/images/brand/logo-pitayalab.png',
})

// 🧭 Enlaces del menú (configurables desde el admin)
const navLinks = ref([
  { path: '/', label: 'Inicio' },
  { path: '/about', label: 'Sobre Nosotros' },
  { path: '/philosophy', label: 'Nuestra Filosofía' },
  { path: '/fragrancias', label: 'Guía de Fragancias' },
  { path: '/catalog', label: 'Catálogo' },
  { path: '/b2b', label: 'Mayoreo & Corporativo' },
])

// Estado de scroll: al bajar unos px se oculta la barra promocional y
// se mantiene compacta la navbar para no tapar el contenido en móvil.
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 12
}

function formatPrice(price) {
  return Number(price).toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

// Cargar configuración de envíos desde Supabase
async function loadShippingBar() {
  if (!import.meta.client) return
  try {
    const supabase = useNuxtApp().$supabase
    if (!supabase) return
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'shipping_bar')
      .single()
    if (data?.value) {
      // El campo `enabled` del registro es la fuente de verdad. Al hacer merge
      // con el estado actual (enabled:false por defecto) la barra solo se verá
      // si realmente está activada en el admin.
      Object.assign(shippingBar, { ...shippingBar, ...data.value })
    }
  } catch (e) {
    console.warn('Usando valores por defecto de la barra de envíos')
  }
}

// Cargar marca y enlaces de navegación desde Supabase
async function loadBrandAndNav() {
  if (!import.meta.client) return
  try {
    const supabase = useNuxtApp().$supabase
    if (!supabase) return
    const { data, error } = await supabase.from('site_config').select('key, value')

    const rows = Array.isArray(data) ? data : []
    const brandRow = rows.find(r => r.key === 'brand')
    const navRow = rows.find(r => r.key === 'nav_links')

    if (brandRow?.value) Object.assign(brand, brandRow.value)
    if (navRow?.value && Array.isArray(navRow.value) && navRow.value.length) {
      navLinks.value = navRow.value
    }
  } catch (e) {
    console.warn('Usando valores por defecto de marca y navegación')
  }
}

onMounted(() => {
  Promise.all([loadShippingBar(), loadBrandAndNav()])
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

watch(mobileMenuOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>
