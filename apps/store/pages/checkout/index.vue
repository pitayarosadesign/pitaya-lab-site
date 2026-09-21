<template>
  <div class="min-h-screen bg-earth-50/60">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Encabezado -->
      <div class="mb-8">
        <NuxtLink to="/catalog" class="text-sm text-earth-500 hover:text-primary-600 transition-colors">
          ← Volver a la tienda
        </NuxtLink>
        <h1 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2">Finalizar compra</h1>
        <p class="text-earth-500 mt-1">Datos de envío y método de entrega</p>
      </div>

      <!-- Carrito vacío -->
      <div v-if="!cart.hasItems" class="bg-white rounded-2xl border border-earth-100 p-10 text-center">
        <p class="text-5xl mb-4">🛒</p>
        <h2 class="text-xl font-serif font-bold text-earth-900 mb-2">Tu carrito está vacío</h2>
        <p class="text-earth-500 mb-6">Agrega productos antes de continuar con el pago.</p>
        <NuxtLink to="/catalog" class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all">
          Explorar catálogo
        </NuxtLink>
      </div>

      <!-- Checkout -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <!-- Columna izquierda: formulario + método de envío -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Contacto y dirección -->
          <div class="bg-white rounded-2xl border border-earth-100 p-6 space-y-4">
            <h2 class="text-lg font-serif font-bold text-earth-900">1. Datos de envío</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-earth-700 mb-1">Nombre completo *</label>
                <input v-model="form.name" type="text" placeholder="Nombre y apellido" class="w-full px-4 py-2.5 rounded-xl border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
              </div>
              <div>
                <label class="block text-sm font-medium text-earth-700 mb-1">Teléfono *</label>
                <input v-model="form.phone" type="tel" placeholder="10 dígitos" class="w-full px-4 py-2.5 rounded-xl border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-earth-700 mb-1">Email *</label>
                <input v-model="form.email" type="email" placeholder="tu@correo.com" class="w-full px-4 py-2.5 rounded-xl border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
              </div>
              <div>
                <label class="block text-sm font-medium text-earth-700 mb-1">Código postal *</label>
                <input
                  v-model="form.postalCode"
                  type="text"
                  inputmode="numeric"
                  maxlength="5"
                  placeholder="00000"
                  class="w-full px-4 py-2.5 rounded-xl border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all"
                  @input="form.postalCode = form.postalCode.replace(/\D/g, '').slice(0, 5)"
                />
                <p v-if="resolvedLocation" class="text-xs text-primary-600 mt-1">
                  📍 {{ resolvedLocation.city }}, {{ resolvedLocation.state }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-earth-700 mb-1">Calle y número <span class="text-earth-400 font-normal">(para domicilio)</span></label>
                <input v-model="form.street" type="text" placeholder="Calle, número" class="w-full px-4 py-2.5 rounded-xl border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-earth-700 mb-1">Colonia / referencias <span class="text-earth-400 font-normal">(para domicilio)</span></label>
                <input v-model="form.district" type="text" placeholder="Colonia, referencias" class="w-full px-4 py-2.5 rounded-xl border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
              </div>
            </div>
          </div>

          <!-- Método de envío -->
          <div class="bg-white rounded-2xl border border-earth-100 p-6 space-y-4">
            <h2 class="text-lg font-serif font-bold text-earth-900">2. Método de envío</h2>

            <div v-if="quoteLoading" class="text-center py-8">
              <div class="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-3"></div>
              <p class="text-sm text-earth-500">Cotizando envío a tu código postal…</p>
            </div>

            <p v-else-if="quoteError" class="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
              {{ quoteError }}
            </p>

            <div v-else-if="quote" class="space-y-3">
              <button
                v-for="m in shippingMethods"
                :key="m.key"
                type="button"
                @click="selectedMethod = m.key"
                class="w-full text-left flex items-start gap-3 p-4 rounded-xl border-2 transition-all"
                :class="selectedMethod === m.key ? 'border-primary-500 bg-primary-50/60' : 'border-earth-100 hover:border-primary-200 bg-white'"
              >
                <span class="w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  :class="selectedMethod === m.key ? 'border-primary-600' : 'border-earth-300'">
                  <span v-if="selectedMethod === m.key" class="w-2.5 h-2.5 rounded-full bg-primary-600"></span>
                </span>
                <span class="flex-1">
                  <span class="flex items-center justify-between gap-2">
                    <span class="font-semibold text-earth-900 text-sm">{{ m.label }}</span>
                    <span class="text-sm font-bold" :class="m.price > 0 ? 'text-earth-900' : 'text-green-600'">
                      {{ m.price > 0 ? formatPrice(m.price) : 'Gratis' }}
                    </span>
                  </span>
                  <span class="block text-xs text-earth-500 mt-0.5">
                    {{ m.description }} · Entrega {{ m.deliveryEstimate }}
                    <template v-if="m.deliveryDate"> ({{ formatDate(m.deliveryDate) }})</template>
                  </span>
                </span>
              </button>
            </div>

            <p v-if="!form.postalCode || form.postalCode.length < 5" class="text-xs text-earth-400">
              Escribe tu código postal para ver las opciones y costos de envío.
            </p>
          </div>
        </div>

        <!-- Columna derecha: resumen -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl border border-earth-100 p-6 space-y-4 lg:sticky lg:top-6">
            <h2 class="text-lg font-serif font-bold text-earth-900">Resumen</h2>

            <ul class="space-y-3 max-h-72 overflow-y-auto pr-1">
              <li v-for="item in cart.items" :key="item.id + (item.variant?.id || '')" class="flex items-center gap-3">
                <div class="w-14 h-14 rounded-lg overflow-hidden bg-earth-50 flex-shrink-0">
                  <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" loading="lazy" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-earth-900 truncate">{{ item.name }}{{ item.variant ? ' · ' + item.variant.name : '' }}</p>
                  <p class="text-xs text-earth-400">Cant. {{ item.quantity }}</p>
                </div>
                <span class="text-sm font-semibold text-earth-900">${{ formatPrice(item.price * item.quantity) }}</span>
              </li>
            </ul>

            <div class="border-t border-earth-100 pt-3 space-y-2 text-sm">
              <div class="flex items-center justify-between">
                <span class="text-earth-600">Subtotal</span>
                <span class="font-semibold text-earth-900">${{ cart.formattedTotal }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-earth-600">Envío</span>
                <span v-if="!selectedQuote" class="text-earth-400 text-xs">se calcula al pagar</span>
                <span v-else-if="shippingPrice > 0" class="font-semibold text-earth-900">${{ formatPrice(shippingPrice) }}</span>
                <span v-else class="font-semibold text-green-600">Gratis</span>
              </div>
              <div class="flex items-center justify-between pt-2 border-t border-earth-100 text-base">
                <span class="font-bold text-earth-800">Total</span>
                <span class="font-bold text-earth-900">${{ formatPrice(cart.totalPrice + shippingPrice) }}</span>
              </div>
              <p class="text-[11px] text-earth-400">IVA incluido</p>
            </div>

            <button
              @click="handlePay"
              :disabled="!canPay || checkoutLoading"
              class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <svg v-if="checkoutLoading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <span v-else>🔒</span>
              {{ checkoutLoading ? 'Procesando…' : 'Pagar con Stripe' }}
            </button>
            <p class="text-center text-[11px] text-earth-400 flex items-center justify-center gap-1">
              <svg class="w-3.5 h-3.5 text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
              Pago 100% seguro con tarjeta
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
usePageSeo('/checkout', {
  title: 'Finalizar compra | PITAYA LAB',
  description: 'Elige tu método de envío y completa tu compra de forma segura.',
})

const cart = useCartStore()

const form = reactive({
  name: '',
  phone: '',
  email: '',
  postalCode: '',
  street: '',
  district: '',
})

const quote = ref(null)
const resolvedLocation = ref(null)
const quoteLoading = ref(false)
const quoteError = ref('')
const selectedMethod = ref('pointPost')
const checkoutLoading = ref(false)

// Umbral de envío gratis (site_config > shipping_bar)
const FREE_SHIPPING_THRESHOLD = ref(799)

async function loadShippingConfig() {
  try {
    const supabase = useNuxtApp()?.$supabase
    if (!supabase) return
    const { data } = await supabase.from('site_config').select('value').eq('key', 'shipping_bar').single()
    if (data?.value?.free_shipping_min) FREE_SHIPPING_THRESHOLD.value = data.value.free_shipping_min
  } catch (e) {
    // fallback silencioso a $799
  }
}

// Métodos en el orden que se muestran
const shippingMethods = computed(() => {
  if (!quote.value?.methods) return []
  const m = quote.value.methods
  return [
    { key: 'express', label: m.express?.label || 'Paquete Express', price: methodPrice('express'), description: m.express?.dropOffDescription || 'Puerta a puerta', deliveryEstimate: m.express?.deliveryEstimate || '', deliveryDate: m.express?.deliveryDate },
    { key: 'standard', label: m.standard?.label || 'Envío Estándar', price: methodPrice('standard'), description: m.standard?.dropOffDescription || 'Sucursal → domicilio', deliveryEstimate: m.standard?.deliveryEstimate || '', deliveryDate: m.standard?.deliveryDate },
    { key: 'pointPost', label: m.pointPost?.label || 'Punto Post', price: 0, description: m.pointPost?.dropOffDescription || 'Sucursal → sucursal', deliveryEstimate: m.pointPost?.deliveryEstimate || '', deliveryDate: m.pointPost?.deliveryDate },
  ]
})

// Precio mostrado/cobrado según reglas:
//  - Punto Post siempre gratis
//  - Estándar gratis si el subtotal alcanza el umbral
//  - Express siempre con costo real
function methodPrice(key) {
  if (!quote.value?.methods) return 0
  const raw = quote.value.methods[key]?.price || 0
  if (key === 'pointPost') return 0
  if (key === 'standard' && cart.totalPrice >= FREE_SHIPPING_THRESHOLD.value) return 0
  return raw
}

const selectedQuote = computed(() => {
  if (!quote.value?.methods) return null
  return shippingMethods.value.find(m => m.key === selectedMethod.value) || null
})

const shippingPrice = computed(() => selectedQuote.value?.price || 0)

const canPay = computed(() => {
  return form.name.trim().length > 1 && form.email.includes('@') && form.postalCode.length === 5 && !!selectedQuote.value && !quoteLoading.value
})

// Cotizar en cuanto el CP tenga 5 dígitos (debounce)
let quoteTimer = null
watch(() => form.postalCode, (cp) => {
  if (quoteTimer) clearTimeout(quoteTimer)
  quote.value = null
  resolvedLocation.value = null
  quoteError.value = ''
  if (cp.length !== 5) return
  quoteTimer = setTimeout(fetchQuote, 500)
})

async function fetchQuote() {
  const cp = form.postalCode
  if (cp.length !== 5) return
  quoteLoading.value = true
  try {
    const res = await $fetch('/api/shipping/quote', {
      method: 'POST',
      body: {
        postalCode: cp,
        name: form.name || 'Cliente',
        phone: form.phone || undefined,
        street: form.street || undefined,
        district: form.district || undefined,
        items: cart.items.map(i => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
          weightKg: i.weightKg,
          lengthCm: i.lengthCm,
          widthCm: i.widthCm,
          heightCm: i.heightCm,
        })),
      },
    })
    quote.value = res
    resolvedLocation.value = res.destination || null
  } catch (e) {
    quoteError.value = e?.data?.message || 'No pudimos cotizar tu envío. Intenta de nuevo.'
  } finally {
    quoteLoading.value = false
  }
}

async function handlePay() {
  if (!canPay.value) return
  checkoutLoading.value = true
  try {
    const response = await $fetch('/api/checkout/create', {
      method: 'POST',
      body: {
        items: cart.getCheckoutItems(),
        shippingCost: shippingPrice.value,
        shippingLabel: selectedQuote.value?.label || 'Envío',
        shippingMethod: selectedMethod.value,
        customerEmail: form.email,
        orderNote: cart.orderNote || '',
        shippingAddress: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          postalCode: form.postalCode,
          city: resolvedLocation.value?.city || '',
          state: resolvedLocation.value?.state || '',
          street: form.street || '',
          district: form.district || '',
        },
        successUrl: `${window.location.origin}/checkout/success`,
        cancelUrl: `${window.location.origin}/checkout/cancel`,
      },
    })
    if (response?.url) {
      window.location.href = response.url
    } else if (response?.error) {
      throw new Error(response.error)
    }
  } catch (e) {
    const msg = e?.data?.message || e?.message || 'Ocurrió un error al procesar el pago.'
    alert(msg)
  } finally {
    checkoutLoading.value = false
  }
}

function formatPrice(price) {
  return Number(price).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })
  } catch {
    return dateStr
  }
}

onMounted(() => {
  cart.init()
  loadShippingConfig()
})
</script>
