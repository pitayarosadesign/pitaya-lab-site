<template>
  
  <header class="fixed top-0 left-0 right-0 z-50">
    <!-- ✅ Barra promocional de envíos (configurable desde el admin).
         Se oculta al hacer scroll para no tapar contenido en móvil/desktop. -->
    <div
      v-if="shippingBarActive && !scrolled"
      class="text-white text-center text-xs sm:text-sm py-2 px-4 leading-relaxed transition-all duration-300 overflow-hidden"
      :class="[
        scrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-16 opacity-100',
        !shippingBar.bg_color ? 'bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900' : '',
      ]"
      :style="shippingBar.bg_color ? { background: shippingBar.bg_color } : null"
    >
      <p class="flex items-center justify-center gap-1.5 flex-wrap">
        <span class="hidden sm:inline">🚚</span>
        <span class="font-semibold">{{ shippingBarMessage }}</span>
        <a
          v-if="shippingBar.cta_text && shippingBar.cta_link"
          :href="shippingBar.cta_link"
          class="font-semibold underline underline-offset-2 hover:opacity-80"
        >{{ shippingBar.cta_text }}</a>
      </p>
    </div>
    <div class="bg-white/90 backdrop-blur-md border-b border-earth-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 md:gap-3 group min-w-0">
          <BrandLogo
            :brand="brand"
            class="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover shadow-md group-hover:shadow-lg transition-all flex-shrink-0"
          />
          <div class="hidden sm:block min-w-0">
            <h1 class="text-lg md:text-xl font-serif font-bold text-earth-800 leading-tight truncate">{{ brand.name }}</h1>
            <p class="text-xs text-earth-500 -mt-1 truncate max-w-[40vw]">{{ brand.tagline }}</p>
          </div>
        </NuxtLink>

        <!-- Navegación desktop -->
        <nav class="hidden md:flex items-center gap-7">
          <div
            v-for="(link, index) in navLinks"
            :key="link.path"
            class="relative"
            @mouseenter="hoverMenuIndex = index"
            @mouseleave="hoverMenuIndex = null"
          >
            <!-- Con submenú: botón que abre el dropdown con hover o clic -->
            <button
              v-if="hasChildren(link)"
              type="button"
              @click.stop="clickMenuIndex = clickMenuIndex === index ? null : index"
              class="inline-flex items-center gap-1 text-sm font-medium text-earth-600 hover:text-primary-600 transition-colors pb-1"
            >
              {{ link.label }}
              <svg class="w-3 h-3 opacity-60 transition-transform" :class="isMenuOpen(index) ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <!-- Sin submenú: enlace normal -->
            <NuxtLink
              v-else
              :to="link.path"
              class="text-sm font-medium text-earth-600 hover:text-primary-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-500 after:transition-all hover:after:w-full pb-1"
            >
              {{ link.label }}
            </NuxtLink>

            <!-- Submenú -->
            <div
              v-if="hasChildren(link)"
              v-show="isMenuOpen(index)"
              class="absolute left-0 top-full pt-3 z-50"
              @click.stop
            >
              <div class="bg-white rounded-xl border border-earth-100 shadow-lg py-2 min-w-[220px]">
                <NuxtLink
                  v-for="child in link.children"
                  :key="child.path"
                  :to="child.path"
                  @click.stop="clickMenuIndex = null"
                  class="block px-4 py-2 text-sm text-earth-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                >
                  {{ child.label }}
                </NuxtLink>
              </div>
            </div>
          </div>
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
          <template v-for="link in navLinks" :key="link.path">
            <NuxtLink
              :to="link.path"
              @click="mobileMenuOpen = false"
              class="block py-3 text-earth-700 hover:text-primary-600 font-medium transition-colors border-b border-earth-50"
            >
              {{ link.label }}
            </NuxtLink>
            <NuxtLink
              v-for="child in link.children || []"
              :key="child.path"
              :to="child.path"
              @click="mobileMenuOpen = false"
              class="block py-2 pl-5 text-sm text-earth-500 hover:text-primary-600 transition-colors border-b border-earth-50"
            >
              {{ child.label }}
            </NuxtLink>
          </template>
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
import { defaultBrand, defaultShippingBar, defaultNavLinks } from '~/utils/siteDefaults'

const cart = useCartStore()
const AMAZON_LINK = 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329?'

const mobileMenuOpen = ref(false)
// Submenú desktop: `hoverMenuIndex` se abre al pasar el mouse y `clickMenuIndex`
// al hacer clic (pantallas táctiles). Se combinan en `isMenuOpen`; separarlos
// evita que el hover deje de responder después de navegar con un filtro.
const hoverMenuIndex = ref(null)
const clickMenuIndex = ref(null)

function isMenuOpen(index) {
  return hoverMenuIndex.value === index || clickMenuIndex.value === index
}

function onDocClick() {
  clickMenuIndex.value = null
}

// 🚚 Barra de envíos (configurable desde el admin). Por defecto DESACTIVADA
// hasta que se cargue el registro `shipping_bar` de Supabase. Si no existe ese
// registro, la barra NO se muestra.
const shippingBar = reactive({ ...defaultShippingBar })

// 🏷️ Marca (logo, nombre, eslogan) configurable desde el admin
const brand = reactive({ ...defaultBrand })

// 🧭 Enlaces del menú (configurables desde el admin). El fallback vive en
// utils/siteDefaults.ts y solo aplica si no hay `nav_links` en Supabase.
const navLinks = ref(defaultNavLinks.map(link => ({ ...link })))

// Indica si un enlace tiene sub-enlaces (submenú) para renderizar el dropdown.
function hasChildren(link) {
  return Array.isArray(link.children) && link.children.length > 0
}

// Estado de scroll: al bajar unos px se oculta la barra promocional y
// se mantiene compacta la navbar para no tapar el contenido en móvil.
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 12
}

function formatPrice(price) {
  return Number(price).toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

// Mensaje de la barra promocional. `shippingBar.message` es una plantilla
// editable en el editor de sitio; se sustituyen {monto} y {mensajerias}.
const shippingBarMessage = computed(() => {
  const tpl = shippingBar.message || 'Envío gratis en compras mayores a {monto}'
  const monto = `$${formatPrice(shippingBar.free_shipping_min)} MXN`
  const mensajerias = (shippingBar.couriers || []).join(', ')
  return tpl
    .replace(/\{monto\}/g, monto)
    .replace(/\{mensajerias\}/g, mensajerias)
})

// Barra activa solo si está habilitada y dentro de su rango de fechas (si lo tiene).
const shippingBarActive = computed(() => {
  if (!shippingBar.enabled) return false
  const now = Date.now()
  if (shippingBar.start_at && new Date(shippingBar.start_at).getTime() > now) return false
  if (shippingBar.end_at && new Date(shippingBar.end_at).getTime() < now) return false
  return true
})

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
  document.addEventListener('click', onDocClick)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onDocClick)
})

watch(mobileMenuOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>
