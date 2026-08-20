<template>
  <div>
    <!-- Sección principal de la calculadora -->
    <div class="bg-white rounded-3xl border border-earth-100 shadow-lg overflow-hidden">
      <div class="bg-gradient-to-r from-primary-900 to-earth-900 text-white px-6 md:px-10 py-8">
        <h3 class="text-2xl md:text-3xl font-serif font-bold">📦 Calculadora de Mayoreo</h3>
        <p class="text-primary-200 mt-2 text-sm md:text-base max-w-2xl">
          Selecciona los productos y cantidades. El descuento se aplica automáticamente según el volumen (25% a 35%).
        </p>
      </div>

      <!-- Cuerpo -->
      <div class="p-6 md:p-10">
        <!-- Selección de productos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            v-for="prod in products"
            :key="prod.key"
            class="border rounded-2xl p-4 transition-all"
            :class="prod.qty > 0 ? 'border-primary-400 bg-primary-50/40 shadow-sm' : 'border-earth-200 hover:border-earth-300'"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="font-semibold text-earth-800 text-sm leading-tight">{{ prod.label }}</span>
              <span class="text-xs text-earth-400">{{ prod.size }}</span>
            </div>

            <!-- Precio retail y cantidad -->
            <div class="flex items-center gap-2 mb-3">
              <div class="text-2xl font-bold text-earth-900">{{ formatMXN(prod.qty > 0 ? subTotalFor(prod) / Math.max(prod.qty, 1) : prod.retailPrice) }}</div>
            </div>
            <div class="text-xs text-earth-400 mb-4">Retail {{ formatMXN(prod.retailPrice) }}</div>

            <!-- Control de cantidad -->
            <div class="flex items-center justify-center gap-2">
              <button
                @click="decrement(prod.key)"
                class="w-9 h-9 rounded-lg border border-earth-200 hover:border-primary-300 text-earth-600 hover:text-primary-700 font-bold transition-all active:scale-95"
                aria-label="Disminuir"
              >−</button>
              <input
                :value="prod.qty"
                @input="onQtyInput(prod.key, $event)"
                type="number"
                min="0"
                placeholder="0"
                class="w-16 text-center font-semibold text-earth-800 text-lg py-1.5 rounded-lg border border-earth-200 focus:border-primary-400 outline-none"
              />
              <button
                @click="increment(prod.key)"
                class="w-9 h-9 rounded-lg border border-earth-200 hover:border-primary-300 text-earth-600 hover:text-primary-700 font-bold transition-all active:scale-95"
                aria-label="Aumentar"
              >+</button>
            </div>
          </div>
        </div>

        <!-- Total piezas y tier aplicado -->
        <div v-if="totalPieces > 0" class="p-5 rounded-2xl bg-earth-50 border border-earth-100 mb-8">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p class="text-sm text-earth-500">Total de piezas</p>
              <p class="text-3xl font-bold text-earth-900">{{ totalPieces }}</p>
            </div>
            <div v-if="currentTier" class="text-center">
              <p class="text-sm text-earth-500 mb-1">Descuento aplicado</p>
              <p class="text-3xl font-bold text-primary-600">−{{ currentTier.discount_percent }}%</p>
              <p class="text-xs text-earth-400 mt-1">{{ currentTier.label }} · Mín {{ currentTier.min }} pzas</p>
            </div>
            <div v-else class="text-center">
              <p class="text-sm text-earth-500 mb-1">Descuento</p>
              <p class="text-3xl font-bold text-earth-400">0%</p>
              <p class="text-xs text-earth-400 mt-1">Mínimo 20 piezas</p>
            </div>
          </div>
        </div>

        <!-- Escala de tiers -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div
            v-for="tier in tiers"
            :key="tier.label"
            class="rounded-2xl border p-5 transition-all"
            :class="currentTier?.label === tier.label
              ? 'border-primary-500 bg-primary-50 shadow-md'
              : 'border-earth-200 bg-white'"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold text-earth-800">{{ tier.label }}</span>
              <span class="font-bold text-primary-700">−{{ tier.discount_percent }}%</span>
            </div>
            <p class="text-sm text-earth-500 mb-1">{{ tier.min }} a {{ tier.max ? tier.max + ' piezas' : 'piezas en adelante' }}</p>
            <p class="text-xs text-earth-400">{{ tier.description }}</p>
          </div>
        </div>

        <!-- Resumen y acción -->
        <div v-if="totalPieces > 0" class="border-t border-earth-100 pt-6">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div>
              <div class="flex items-center justify-between gap-8 mb-1">
                <span class="text-earth-500">Subtotal (retail)</span>
                <span class="text-earth-700 line-through">{{ formatMXN(retailSubtotal) }}</span>
              </div>
              <div class="flex items-center justify-between gap-8 mb-1">
                <span class="text-earth-500">Descuento</span>
                <span class="text-green-600">−{{ formatMXN(retailSubtotal - wholesaleTotal) }}</span>
              </div>
              <div class="flex items-center justify-between gap-8">
                <span class="font-semibold text-earth-800 text-lg">Total mayoreo</span>
                <span class="text-3xl font-bold text-earth-900">{{ formatMXN(wholesaleTotal) }}</span>
              </div>
              <p class="text-xs text-earth-400 mt-1">Precios por mayoreo, IVA no incluido. Envío se cotiza por separado.</p>
            </div>
          </div>

          <!-- Botones de acción -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              @click="solicitarPorWhatsApp"
              class="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all hover:shadow-lg"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Cotizar por WhatsApp
            </button>
            <button
              @click="proceedToCustomOrder"
              class="flex-1 inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all hover:shadow-lg"
            >
              🛍️ Agregar a mi pedido
            </button>
          </div>
          <p class="text-xs text-earth-400 text-center mt-4">
            ¿Tienes dudas? Escríbenos directo por WhatsApp o usa el botón "Cotizar" para recibir una propuesta formal.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getWholesalePrice, formatMXN, WHATSAPP_URL } from '~/composables/useB2B'

const emit = defineEmits<{
  (e: 'order', payload: any): void
}>()

// Config por defecto
const tiers = [
  { min: 20, max: 49, discount_percent: 25, label: 'Nivel 1', description: 'Boutiques y cafeterías probando inventario inicial' },
  { min: 51, max: 99, discount_percent: 30, label: 'Nivel 2', description: 'Resurtido fuerte o tiendas con mayor rotación' },
  { min: 100, max: null, discount_percent: 35, label: 'Nivel 3', description: 'Socios comerciales grandes o compras recurrentes' },
]

// Fallback estático si no hay productos con mayoreo habilitado
const FALLBACK_PRODUCTS = [
  { key: 'bruma', label: 'Bruma Aromática', size: '225 ml', retailPrice: 299, qty: 0, wholesalePrice: null, wholesaleMinQty: 20 },
  { key: 'aceite', label: 'Aceite Aromático', size: '15 ml', retailPrice: 249, qty: 0, wholesalePrice: null, wholesaleMinQty: 20 },
  { key: 'velaClasica', label: 'Vela Clásica', size: '250g', retailPrice: 349, qty: 0, wholesalePrice: null, wholesaleMinQty: 20 },
  { key: 'velaMistica', label: 'Vela Mística', size: '350g', retailPrice: 499, qty: 0, wholesalePrice: null, wholesaleMinQty: 20 },
]

// Productos disponibles para mayoreo (cargados desde Supabase)
const products = ref([])
const loadingProducts = ref(true)

// Cargar productos con mayoreo habilitado desde la BD
async function loadProducts() {
  loadingProducts.value = true
  try {
    const supabase = useNuxtApp()?.$supabase
    if (!supabase) {
      products.value = FALLBACK_PRODUCTS.map(p => ({ ...p }))
      return
    }

    const { data, error } = await supabase
      .from('products')
      .select('id, sku, name, subtitle, price, wholesale_price, wholesale_min_qty, product_categories(name)')
      .eq('is_active', true)
      .eq('wholesale_enabled', true)
      .order('sort_order', { ascending: true })

    if (error) throw error

    if (data && data.length > 0) {
      products.value = data.map(p => ({
        key: p.id,
        label: p.name,
        size: p.subtitle || p.product_categories?.name || '',
        retailPrice: Number(p.price) || 0,
        wholesalePrice: p.wholesale_price ? Number(p.wholesale_price) : null,
        wholesaleMinQty: p.wholesale_min_qty || 20,
        qty: 0,
      }))
    } else {
      products.value = FALLBACK_PRODUCTS.map(p => ({ ...p }))
    }
  } catch (e) {
    console.warn('Error cargando productos de mayoreo:', e.message)
    products.value = FALLBACK_PRODUCTS.map(p => ({ ...p }))
  } finally {
    loadingProducts.value = false
  }
}

// Cargar config de tiers desde Supabase si está disponible
async function loadConfig() {
  const supabase = useNuxtApp()?.$supabase
  if (!supabase) return
  try {
    const { data } = await supabase.from('site_config').select('value').eq('key', 'b2b_comercial').single()
    if (data?.value?.tiers) {
      tiers.splice(0, tiers.length, ...data.value.tiers)
    }
  } catch (e) {
    console.warn('Usando tiers por defecto:', e.message)
  }
}

onMounted(async () => {
  await Promise.all([loadProducts(), loadConfig()])
})

// Total piezas
const totalPieces = computed(() => products.value.reduce((sum, p) => sum + p.qty, 0))

// Tier actual
const currentTier = computed(() => {
  if (totalPieces.value <= 0) return null
  return getWholesalePrice(1, totalPieces.value, tiers).tier
})

// Subtotal retail
const retailSubtotal = computed(() =>
  products.value.reduce((sum, p) => sum + p.retailPrice * p.qty, 0)
)

// Total con descuento (aplicando tier al total consolidado)
const wholesaleTotal = computed(() => {
  const total = retailSubtotal.value
  const { price } = getWholesalePrice(total, totalPieces.value, tiers)
  return price
})

// Subtotal unitario para un producto (con el tier de TODO el pedido)
function subTotalFor(prod) {
  const total = retailSubtotal.value
  const { price } = getWholesalePrice(total, totalPieces.value, tiers)
  const ratio = (prod.retailPrice * prod.qty) / (total || 1)
  return price * ratio
}

// Controles
function increment(key) {
  const p = products.value.find(x => x.key === key)
  if (p) p.qty += 1
}
function decrement(key) {
  const p = products.value.find(x => x.key === key)
  if (p && p.qty > 0) p.qty -= 1
}
function onQtyInput(key, event) {
  const p = products.value.find(x => x.key === key)
  if (p) p.qty = Math.max(0, parseInt(event.target.value) || 0)
}

// Acciones
function buildOrderPayload() {
  return {
    type: 'wholesale',
    items: products.value.filter(p => p.qty > 0).map(p => ({
      key: p.key,
      label: p.label,
      retailPrice: p.retailPrice,
      qty: p.qty,
      subtotal: p.retailPrice * p.qty,
    })),
    totalPieces: totalPieces.value,
    retailSubtotal: retailSubtotal.value,
    wholesaleTotal: wholesaleTotal.value,
    discountPercent: currentTier.value?.discount_percent || 0,
    tier: currentTier.value,
  }
}

function solicitarPorWhatsApp() {
  const payload = buildOrderPayload()
  const lines = payload.items.map(i => `• ${i.qty} × ${i.label} (a $${i.retailPrice})`)
  const msg = `¡Hola PITAYA LAB! 👋 Quiero una cotización de mayoreo:\n\n${lines.join('\n')}\n\nTotal piezas: ${payload.totalPieces}\nDescuento estimado: ${payload.discountPercent}%\nTotal estimado: $${formatMXN(payload.wholesaleTotal)}\n\n¿Me pueden confirmar disponibilidad y envío?`
  window.open(WHATSAPP_URL() + '?text=' + encodeURIComponent(msg), '_blank')
}

function proceedToCustomOrder() {
  emit('order', buildOrderPayload())
}
</script>
