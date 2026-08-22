<template>
  <Teleport to="body">
    <!-- Overlay (z-[60] para estar arriba del navbar z-50) -->
    <div
      v-if="cart.isOpen && isMounted"
      class="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity"
      @click="cart.closeCart()"
    ></div>

    <!-- Sidebar (z-[60]) -->
    <div
      v-if="isMounted"
      class="fixed top-0 right-0 z-[60] h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out"
      :class="cart.isOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-earth-100">
        <div>
          <h2 class="text-lg font-serif font-bold text-earth-900">Carrito</h2>
          <p v-if="cart.hasItems" class="text-sm text-earth-400">
            {{ cart.totalItems }} {{ cart.totalItems === 1 ? 'producto' : 'productos' }}
          </p>
        </div>
        <button
          @click="cart.closeCart()"
          class="w-10 h-10 rounded-full bg-earth-100 hover:bg-earth-200 flex items-center justify-center transition-colors"
        >
          <svg class="w-5 h-5 text-earth-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Contenido + Footer en flex col -->
      <div class="flex flex-col h-[calc(100%-73px)]">
        <!-- 🚚 Barra de progreso para envío gratis -->
        <div v-if="cart.hasItems" class="px-6 pt-4 pb-2">
          <div v-if="remainingForFreeShipping > 0" class="bg-primary-50/70 rounded-xl p-3">
            <div class="flex items-center justify-between mb-1.5">
              <p v-if="remainingForFreeShipping <= 60" class="text-xs text-primary-700 font-medium">
                🔥 <span>¡Ya casi! Te faltan <strong>${{ formatPrice(remainingForFreeShipping) }}</strong> para envío gratis</span>
              </p>
              <p v-else-if="freeShippingProgress > 0" class="text-xs text-primary-700 font-medium">
                🚚 <span>Te faltan <strong>${{ formatPrice(remainingForFreeShipping) }}</strong> para envío gratis</span>
              </p>
              <p v-else class="text-xs text-primary-700 font-medium">
                🚚 <span>Añade <strong>${{ formatPrice(remainingForFreeShipping) }}</strong> más y el envío es gratis</span>
              </p>
            </div>
            <!-- Barra de progreso animada -->
            <div class="w-full h-2 bg-primary-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500"
                :class="remainingForFreeShipping <= 60 ? 'animate-pulse' : ''"
                :style="{ width: freeShippingProgress + '%' }"
              ></div>
            </div>
            <p v-if="remainingForFreeShipping <= 60" class="text-[11px] text-primary-500 mt-1.5 font-medium">
              Agrega 1 producto más y llévate el envío sin costo 🎁
            </p>
          </div>
          <div v-else class="bg-green-50 rounded-xl p-3">
            <p class="text-xs text-green-700 font-medium flex items-center gap-1.5">
              <span>✅</span>
              <span>¡Envío gratis garantizado!</span>
            </p>
          </div>
        </div>

        <!-- Items del carrito (scroll) -->
        <div v-if="cart.hasItems" class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div
            v-for="(item, index) in cart.items"
            :key="`${item.id}-${item.variant?.id || 'default'}`"
            class="flex gap-4 p-3 rounded-xl bg-earth-50/50 hover:bg-earth-50 transition-colors group"
          >
            <!-- Imagen miniatura -->
            <div class="w-20 h-20 rounded-lg overflow-hidden bg-earth-100 flex-shrink-0">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-earth-300 text-2xl">
                📦
              </div>
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-semibold text-earth-800 truncate">{{ item.name }}</h4>
              <p v-if="item.variant" class="text-xs text-earth-400">{{ item.variant.name }}</p>
              <p class="text-sm font-medium text-earth-900 mt-1">${{ formatPrice(item.price) }}</p>

              <!-- Cantidad -->
              <div class="flex items-center gap-2 mt-2">
                <button
                  @click="cart.updateQuantity(item.id, item.quantity - 1, item.variant?.id)"
                  class="w-7 h-7 rounded-full bg-white border border-earth-200 flex items-center justify-center text-earth-500 hover:text-earth-700 hover:border-earth-300 transition-all"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                  </svg>
                </button>
                <span class="text-sm font-medium text-earth-800 w-6 text-center">{{ item.quantity }}</span>
                <button
                  @click="cart.updateQuantity(item.id, item.quantity + 1, item.variant?.id)"
                  class="w-7 h-7 rounded-full bg-white border border-earth-200 flex items-center justify-center text-earth-500 hover:text-earth-700 hover:border-earth-300 transition-all"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Precio total y eliminar -->
            <div class="text-right flex flex-col items-end justify-between">
              <button
                @click="cart.removeItem(item.id, item.variant?.id)"
                :title="'Eliminar ' + item.name"
                class="text-earth-300 hover:text-red-500 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
              <p class="text-sm font-bold text-earth-900">${{ formatPrice(item.price * item.quantity) }}</p>
            </div>
          </div>

          <!-- ✨ Upsell: productos sugeridos para completar/combinar -->
          <div v-if="suggestedProducts.length > 0" class="pt-4 mt-2 border-t border-earth-100">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-lg">✨</span>
              <h4 class="text-sm font-bold text-earth-800">También te puede gustar</h4>
            </div>
            <div class="space-y-2.5">
              <div
                v-for="sug in suggestedProducts"
                :key="sug.id"
                class="flex items-center gap-3 p-2 rounded-xl bg-white border border-earth-100 hover:border-primary-200 shadow-sm transition-all"
              >
                <NuxtLink :to="`/product/${sug.slug}`" class="w-14 h-14 rounded-lg overflow-hidden bg-earth-50 flex-shrink-0">
                  <img v-if="sug.image" :src="sug.image" :alt="sug.name" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center text-earth-300">📦</div>
                </NuxtLink>
                <div class="flex-1 min-w-0">
                  <NuxtLink :to="`/product/${sug.slug}`" class="block text-sm font-semibold text-earth-800 truncate hover:text-primary-600">
                    {{ sug.name }}
                  </NuxtLink>
                  <p class="text-sm font-bold text-earth-900">${{ formatPrice(sug.price) }}</p>
                </div>
                <button
                  @click="addSuggestedToCart(sug)"
                  class="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-all hover:shadow-md active:scale-95 flex-shrink-0"
                  title="Agregar al carrito"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Carrito vacío -->
        <div v-else class="flex-1 flex items-center justify-center">
          <div class="text-center">
            <p class="text-5xl mb-4">🛒</p>
            <h3 class="text-lg font-semibold text-earth-800 mb-2">Tu carrito está vacío</h3>
            <p class="text-sm text-earth-400 mb-6">Agrega productos para empezar a comprar</p>
            <button
              @click="cart.closeCart()"
              class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all"
            >
              Explorar catálogo →
            </button>
          </div>
        </div>

        <!-- Footer con total y checkout (STICKY - siempre visible) -->
        <div v-if="cart.hasItems" class="border-t border-earth-100 px-6 py-4 bg-white flex-shrink-0 pb-6 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
          <!-- ✅ Total + selector de pago compacto -->
          <div class="flex items-center justify-between mb-3">
            <div>
              <span class="text-sm font-medium text-earth-500">Total</span>
              <p class="text-xl font-bold text-earth-900">${{ formatPrice(cart.totalPrice + shippingCost) }}</p>
            </div>
            <!-- Selector de pago compacto (solo iconos) -->
            <div v-if="availableProviders.length > 1" class="flex items-center gap-1.5">
              <button
                v-for="prov in availableProviders"
                :key="prov.value"
                @click="paymentProvider = prov.value"
                :title="prov.label"
                class="w-9 h-9 rounded-lg border-2 flex items-center justify-center transition-all"
                :class="paymentProvider === prov.value
                  ? prov.value === 'mercadopago'
                    ? 'border-[#009EE3] bg-[#009EE3]/10 text-[#009EE3]'
                    : 'border-primary-600 bg-primary-50 text-primary-700'
                  : 'border-earth-200 bg-white text-earth-400 hover:border-earth-300'"
              >
                <svg v-if="prov.value === 'mercadopago'" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 8.5c-.1 1.5-1.1 2.4-2.7 2.9-.9.3-1.9.4-2.9.5v2.6c0 .9.5 1.4 1.4 1.4.8 0 1.3-.4 1.4-1.2h2.1c-.1 1.8-1.5 2.9-3.5 2.9-2.1 0-3.5-1.2-3.5-3.3V8.5c0-2.1 1.4-3.3 3.5-3.3 2 0 3.4 1.2 3.5 3.3h-2.1c-.1-.8-.6-1.2-1.4-1.2-.8 0-1.4.4-1.4 1.2v2.6c1 .1 2 .2 2.9-.5 1.6-.5 2.6-1.4 2.7-2.9h2.5z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- 🔒 Confianza compacta en una línea -->
          <div class="flex items-center justify-center gap-3 mb-3 text-[11px] text-earth-500">
            <span class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              Pago seguro
            </span>
            <span class="text-earth-200">|</span>
            <span class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
              </svg>
              Envío a todo MX
            </span>
            <span class="text-earth-200">|</span>
            <span class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Devoluciones
            </span>
          </div>

          <!-- Botón de pago SIEMPRE visible -->
          <button
            @click="handleCheckout"
            :disabled="checkoutLoading"
            class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-primary-200 flex items-center justify-center gap-2 text-base"
          >
            <svg v-if="checkoutLoading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            {{ checkoutLoading ? 'Procesando...' : 'Proceder al pago' }}
          </button>

          <!-- 🧾 Desglose detallado (colapsable) -->
          <div class="mt-2">
            <button
              @click="showPaymentDetails = !showPaymentDetails"
              class="w-full flex items-center justify-between text-xs font-medium text-earth-500 hover:text-primary-600 transition-colors py-1.5"
              aria-expanded="showPaymentDetails"
            >
              <span>{{ showPaymentDetails ? 'Ocultar detalles' : 'Ver detalles de la compra' }}</span>
              <svg
                class="w-4 h-4 transition-transform duration-300"
                :class="showPaymentDetails ? 'rotate-180' : ''"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <div v-if="showPaymentDetails" class="pt-2">
              <!-- Subtotal -->
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-earth-600">Subtotal</span>
                <span class="text-base font-semibold text-earth-900">${{ cart.formattedTotal }}</span>
              </div>
              <!-- Envío -->
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-earth-600">Envío</span>
                <span v-if="shippingCost > 0" class="text-sm font-medium text-earth-900">${{ formatPrice(shippingCost) }}</span>
                <span v-else class="text-sm font-medium text-green-600">Gratis</span>
              </div>
              <div class="flex items-center justify-between mb-2 pt-2 border-t border-earth-100">
                <span class="text-base font-bold text-earth-800">Total</span>
                <span class="text-base font-bold text-earth-900">${{ formatPrice(cart.totalPrice + shippingCost) }}</span>
              </div>
              <p class="text-[11px] text-earth-400 mb-2">
                IVA incluido · Envío a todo México
              </p>
              <!-- Info de envío -->
              <div class="bg-primary-50 rounded-xl p-3 mb-3 text-xs text-primary-700">
                <p class="flex items-center gap-1.5 font-medium">
                  <span>🚚</span>
                  <span>Envío gratis en compras mayores a <strong>${{ formatPrice(FREE_SHIPPING_THRESHOLD) }} MXN</strong></span>
                </p>
                <p class="text-primary-500 mt-0.5">Menores a ${{ formatPrice(FREE_SHIPPING_THRESHOLD) }}: solo ${{ formatPrice(SHIPPING_COST) }}</p>
              </div>
            </div>
          </div>

          <!-- Seguir comprando -->
          <button
            @click="cart.closeCart()"
            class="w-full mt-1 inline-flex items-center justify-center gap-2 text-xs font-medium text-earth-500 hover:text-primary-600 py-1.5 rounded-xl transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16m0 0l-6-6m6 6l-6 6"/>
            </svg>
            Seguir comprando
          </button>
        </div>
      </div>
      <!-- /Contenido + Footer -->
    </div>
  </Teleport>
</template>

<script setup>
const cart = useCartStore()
const checkoutLoading = ref(false)
const isMounted = ref(false)

// Controla el desglose de la compra (subtotal/envío) colapsable en el footer
const showPaymentDetails = ref(false)

// 💳 Proveedor de pago seleccionado ('stripe' | 'mercadopago')
const paymentProvider = ref('mercadopago')

const config = useRuntimeConfig()

// 💳 Configuración de métodos de pago (cargada desde site_config)
const paymentConfig = reactive({
  mercadopago: {
    enabled: true,
    trustMessage: 'Paga con tarjeta, SPEI o efectivo (OXXO) de forma segura',
  },
  stripe: {
    enabled: true,
    trustMessage: 'Pago 100% seguro con Stripe',
  },
  defaultProvider: 'mercadopago',
})

// Proveedores disponibles según la configuración
const availableProviders = computed(() => {
  const opts = []
  if (paymentConfig.mercadopago.enabled) opts.push({ value: 'mercadopago', label: 'Mercado Pago' })
  if (paymentConfig.stripe.enabled) opts.push({ value: 'stripe', label: 'Tarjeta' })
  return opts
})

// Valores por defecto
const FREE_SHIPPING_THRESHOLD = ref(200)
const SHIPPING_COST = ref(75)

// Cargar configuración desde Supabase
async function loadShippingConfig() {
  if (!import.meta.client) return
  try {
    const supabase = useNuxtApp()?.$supabase
    if (!supabase) return
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'shipping_bar')
      .single()
    if (data?.value) {
      FREE_SHIPPING_THRESHOLD.value = data.value.free_shipping_min || 200
      SHIPPING_COST.value = data.value.shipping_fee || 75
    }
  } catch (e) {
    console.warn('Usando valores por defecto de envío')
  }
}

// Cargar configuración de métodos de pago desde site_config
async function loadPaymentConfig() {
  if (!import.meta.client) return
  try {
    const supabase = useNuxtApp()?.$supabase
    if (!supabase) return
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'payment_config')
      .single()
    if (data?.value) {
      if (data.value.mercadopago) Object.assign(paymentConfig.mercadopago, data.value.mercadopago)
      if (data.value.stripe) Object.assign(paymentConfig.stripe, data.value.stripe)
      if (data.value.defaultProvider) paymentConfig.defaultProvider = data.value.defaultProvider
    }
    // Establecer el proveedor por defecto
    paymentProvider.value = paymentConfig.defaultProvider
  } catch (e) {
    console.warn('Usando configuración de pagos por defecto')
  }
}

// ---------- Upsell: productos sugeridos ----------
const suggestedProducts = ref([])

// Cargar productos sugeridos (excluye los que ya están en el carrito)
async function loadSuggestedProducts() {
  try {
    const inCartIds = new Set(cart.items.map(i => String(i.id)))
    const inCartSlugs = new Set(cart.items.map(i => i.slug).filter(Boolean))

    const res = await $fetch('/api/products', {
      query: { limit: 12 },
    })
    const all = res?.products || []
    const filtered = all.filter(p => !inCartIds.has(String(p.id)) && !inCartSlugs.has(p.slug))
    suggestedProducts.value = filtered.slice(0, 4)
  } catch (e) {
    console.warn('No se pudieron cargar productos sugeridos:', e)
  }
}

function addSuggestedToCart(product) {
  cart.addItem({
    id: String(product.id),
    slug: product.slug || '',
    name: product.name,
    subtitle: product.subtitle || '',
    price: product.price,
    image: product.image || null,
    variant: null,
    quantity: 1,
  })
  // Refrescar sugerencias para quitar el que se acaba de agregar
  loadSuggestedProducts()
}

const remainingForFreeShipping = computed(() => {
  return Math.max(0, FREE_SHIPPING_THRESHOLD.value - cart.totalPrice)
})

const freeShippingProgress = computed(() => {
  return Math.min(100, (cart.totalPrice / FREE_SHIPPING_THRESHOLD.value) * 100)
})

const shippingCost = computed(() => {
  return cart.totalPrice >= FREE_SHIPPING_THRESHOLD.value ? 0 : SHIPPING_COST.value
})
function formatPrice(price) {
  return Number(price).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Bloquear scroll del body cuando el carrito está abierto
watch(() => cart.isOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

onMounted(() => {
  isMounted.value = true
  loadShippingConfig()
  loadPaymentConfig()
  loadSuggestedProducts()
})

// Refrescar sugerencias cuando se abre el carrito o cambia el contenido
watch(
  () => [cart.isOpen, cart.itemCount],
  () => {
    if (cart.isOpen) loadSuggestedProducts()
  }
)

// Limpiar al desmontar
onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})

async function handleCheckout() {
  if (cart.items.length === 0) return
  checkoutLoading.value = true

  try {
    // Validar que el proveedor seleccionado esté activo
    const activeProvider = availableProviders.value.find(p => p.value === paymentProvider.value)
    const provider = activeProvider ? activeProvider.value : (availableProviders.value[0]?.value || 'stripe')

    // Elegir el endpoint según el proveedor de pago seleccionado
    const endpoint = provider === 'mercadopago'
      ? '/api/checkout/mp/create'
      : '/api/checkout/create'

    const response = await $fetch(endpoint, {
      method: 'POST',
      body: {
        items: cart.getCheckoutItems(),
        shippingCost: shippingCost.value, // ← Enviamos el costo de envío
        successUrl: `${window.location.origin}/checkout/success`,
        cancelUrl: `${window.location.origin}/checkout/cancel`,
      },
    })

    if (response?.url) {
      // Redirigir al checkout del proveedor (Stripe o Mercado Pago)
      window.location.href = response.url
    } else if (response?.error) {
      throw new Error(response.error)
    }
  } catch (e) {
    console.error('Error en checkout:', e)
    alert('Error al procesar el pago. Intenta de nuevo.')
  } finally {
    checkoutLoading.value = false
  }
}
</script>
