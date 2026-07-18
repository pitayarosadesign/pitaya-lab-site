<teestomplate>
  <Teleport to=tar al panel de administrador de la tienda.. "body">
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
              <p class="text-xs text-primary-700 font-medium">
                🚚 <span>Te faltan <strong>${{ formatPrice(remainingForFreeShipping) }}</strong> para envío gratis</span>
              </p>
            </div>
            <!-- Barra de progreso -->
            <div class="w-full h-2 bg-primary-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500"
                :style="{ width: freeShippingProgress + '%' }"
              ></div>
            </div>
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
                class="text-earth-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
              <p class="text-sm font-bold text-earth-900">${{ formatPrice(item.price * item.quantity) }}</p>
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

        <!-- Footer con total y checkout -->
        <div v-if="cart.hasItems" class="border-t border-earth-100 px-6 py-5 bg-white flex-shrink-0 pb-8">
          <!-- Subtotal -->
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-earth-600">Subtotal</span>
            <span class="text-base font-semibold text-earth-900">${{ cart.formattedTotal }}</span>
          </div>
          <!-- Envío -->
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-medium text-earth-600">Envío</span>
            <span v-if="shippingCost > 0" class="text-sm font-medium text-earth-900">${{ formatPrice(shippingCost) }}</span>
            <span v-else class="text-sm font-medium text-green-600">Gratis</span>
          </div>
          <!-- Total -->
          <div class="flex items-center justify-between mb-3 pt-3 border-t border-earth-100">
            <span class="text-base font-bold text-earth-800">Total</span>
            <span class="text-xl font-bold text-earth-900">${{ formatPrice(cart.totalPrice + shippingCost) }}</span>
          </div>
          <p class="text-[11px] text-earth-400 mb-3">
            IVA incluido · Envío a todo México
          </p>
          <!-- Info de envío -->
          <div class="bg-primary-50 rounded-xl p-3 mb-4 text-xs text-primary-700">
            <p class="flex items-center gap-1.5 font-medium">
              <span>🚚</span>
              <span>Envío gratis en compras mayores a <strong>$200 MXN</strong></span>
            </p>
            <p class="text-primary-500 mt-0.5">Menores a $200: solo $50 · 3 a 5 días hábiles</p>
          </div>
          <button
            @click="handleCheckout"
            :disabled="checkoutLoading"
            class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-2xl transition-all hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg v-if="checkoutLoading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ checkoutLoading ? 'Procesando...' : 'Proceder al pago' }}
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

const config = useRuntimeConfig()

// Valores por defecto
const FREE_SHIPPING_THRESHOLD = ref(200)
const SHIPPING_COST = ref(75)

// Cargar configuración desde Supabase
async function loadShippingConfig() {
  if (!import.meta.client) return
  try {
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
})

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
    const response = await $fetch('/api/checkout/create', {
      method: 'POST',
      body: {
        items: cart.getCheckoutItems(),
        shippingCost: shippingCost.value, // ← Enviamos el costo de envío
        successUrl: `${window.location.origin}/checkout/success`,
        cancelUrl: `${window.location.origin}/checkout/cancel`,
      },
    })

    if (response?.url) {
      // Redirigir a Stripe Checkout
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
