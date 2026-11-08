<template>
  <div>
    <!-- Tarjeta principal -->
    <div class="bg-white rounded-3xl border border-earth-100 shadow-lg overflow-hidden">
      <div class="bg-gradient-to-r from-primary-900 to-earth-900 text-white px-6 md:px-10 py-8">
        <h3 class="text-2xl md:text-3xl font-serif font-bold">📦 Calculadora de Mayoreo</h3>
        <p class="text-primary-200 mt-2 text-sm md:text-base max-w-2xl">
          Abre una categoría, escribe tus cantidades y el descuento se aplica automáticamente según el volumen (25% a 35%).
        </p>
      </div>

      <div class="p-6 md:p-10">
        <!-- Estado de carga -->
        <div v-if="loadingProducts" class="py-10 text-center text-earth-400 text-sm">
          Cargando catálogo de mayoreo…
        </div>

        <!-- Acordeones por categoría -->
        <div v-else class="space-y-3">
          <!-- Buscador interno + indicador de resultados -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-3">
            <div class="relative flex-1 max-w-md">
              <input
                v-model="query"
                type="text"
                placeholder="Filtrar por producto o categoría…"
                class="w-full px-4 py-2.5 pr-16 rounded-xl border border-earth-200 focus:border-primary-400 outline-none transition-all text-sm"
              />
              <button
                v-if="query"
                type="button"
                @click="query = ''"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary-600 hover:text-primary-700"
              >Limpiar</button>
            </div>
            <p v-if="query" class="text-xs text-earth-400">
              {{ filteredProducts.length }} {{ filteredProducts.length === 1 ? 'resultado' : 'resultados' }} para "{{ query }}"
            </p>
          </div>

          <!-- Sin resultados -->
          <div v-if="groupedProducts.length === 0" class="py-8 text-center text-earth-400 text-sm">
            No encontramos productos para "{{ query }}". Prueba con otra palabra.
          </div>

          <div
            v-for="group in groupedProducts"
            :key="group.category"
            class="border rounded-2xl overflow-hidden transition-colors"
            :class="isOpen(group.category) ? 'border-primary-300' : 'border-earth-200'"
          >
            <!-- Encabezado del acordeón -->
            <button
              type="button"
              @click="toggleCategory(group.category)"
              class="w-full flex items-center justify-between gap-3 px-4 py-4 bg-earth-50/60 hover:bg-earth-50 transition-colors text-left"
            >
              <div class="flex items-center gap-3">
                <span class="text-xl">{{ categoryIcon(group.category) }}</span>
                <div>
                  <p class="font-semibold text-earth-800">{{ group.category }}</p>
                  <p class="text-xs text-earth-400">{{ group.items.length }} {{ group.items.length === 1 ? 'producto' : 'productos' }}</p>
                </div>
              </div>
              <span class="text-earth-400 transition-transform" :class="isOpen(group.category) ? 'rotate-180' : ''">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </span>
            </button>

            <!-- Cuerpo del acordeón -->
            <div v-if="isOpen(group.category)" class="p-4">
              <div class="space-y-2">
                <div
                  v-for="prod in group.items"
                  :key="prod.key"
                  class="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl transition-colors"
                  :class="prod.qty > 0 ? 'bg-primary-50/50 border border-primary-100' : 'bg-white border border-earth-100'"
                >
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-earth-800 text-sm leading-tight">{{ prod.label }}</p>
                    <p class="text-xs text-earth-400">{{ prod.size }}</p>
                  </div>

                  <div class="flex items-center gap-4 sm:gap-6">
                    <div class="text-right">
                      <p class="text-[10px] uppercase tracking-wide text-earth-400">Retail</p>
                      <p class="text-sm text-earth-500 line-through">{{ formatMXN(prod.retailPrice) }}</p>
                    </div>
                    <div class="text-right">
                      <p class="text-[10px] uppercase tracking-wide text-primary-500 font-semibold">Mayoreo est.</p>
                      <p class="text-sm font-bold text-earth-900">{{ formatMXN(unitWholesale(prod)) }}</p>
                    </div>

                    <!-- Input numérico directo -->
                    <div class="flex items-center gap-1.5">
                      <button
                        type="button"
                        @click="decrement(prod.key)"
                        class="w-8 h-8 rounded-lg border border-earth-200 hover:border-primary-300 text-earth-600 font-bold transition-all active:scale-95"
                        aria-label="Disminuir"
                      >−</button>
                      <input
                        :value="prod.qty"
                        @input="onQtyInput(prod.key, $event)"
                        type="number"
                        min="0"
                        placeholder="0"
                        class="w-16 text-center font-semibold text-earth-800 py-1.5 rounded-lg border border-earth-200 focus:border-primary-400 outline-none"
                      />
                      <button
                        type="button"
                        @click="increment(prod.key)"
                        class="w-8 h-8 rounded-lg border border-earth-200 hover:border-primary-300 text-earth-600 font-bold transition-all active:scale-95"
                        aria-label="Aumentar"
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Escala de niveles -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
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

        <!-- Resumen inline (visible en desktop) -->
        <div v-if="totalPieces > 0" class="mt-8 border-t border-earth-100 pt-6">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center justify-between gap-8">
                <span class="text-earth-500">Subtotal (retail)</span>
                <span class="text-earth-700 line-through">{{ formatMXN(retailSubtotal) }}</span>
              </div>
              <div class="flex items-center justify-between gap-8">
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
        </div>
      </div>
    </div>

    <!-- Barra resumen flotante (sticky) -->
    <div class="h-0"></div>
    <Transition
      enter-from-class="translate-y-full"
      enter-active-class="transition-transform duration-300"
      enter-to-class="translate-y-0"
      leave-active-class="transition-transform duration-300"
      leave-to-class="translate-y-full"
    >
      <div
        v-if="totalPieces > 0"
        class="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-earth-200 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
      >
        <div class="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3">
          <div class="flex items-center gap-6 flex-wrap justify-center sm:justify-start">
            <div>
              <p class="text-[10px] uppercase tracking-wide text-earth-400">Piezas</p>
              <p class="text-lg font-bold text-earth-900 leading-none">{{ totalPieces }}</p>
            </div>
            <div>
              <p class="text-[10px] uppercase tracking-wide text-earth-400">Nivel</p>
              <p class="text-sm font-bold leading-none" :class="currentTier ? 'text-primary-600' : 'text-earth-400'">
                {{ currentTier ? `${currentTier.label} · −${currentTier.discount_percent}%` : 'Mín 20 pzas' }}
              </p>
            </div>
            <div>
              <p class="text-[10px] uppercase tracking-wide text-earth-400">Total est.</p>
              <p class="text-lg font-bold text-earth-900 leading-none">{{ formatMXN(wholesaleTotal) }}</p>
            </div>
          </div>

          <div class="flex items-center gap-2 flex-1 sm:justify-end w-full sm:w-auto">
            <button
              @click="solicitarPorWhatsApp"
              class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-all text-sm"
            >
              Cotizar
            </button>
            <button
              @click="proceedToCustomOrder"
              class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm"
            >
              Generar cotización →
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Espaciador para que la barra sticky no tape contenido -->
    <div v-if="totalPieces > 0" class="h-20"></div>
  </div>
</template>

<script setup lang="ts">
import { getWholesalePrice, formatMXN, WHATSAPP_URL } from '~/composables/useB2B'

const { query } = useB2BSearch()

const emit = defineEmits<{
  (e: 'order', payload: any): void
}>()

// Config por defecto
const tiers = [
  { min: 20, max: 49, discount_percent: 25, label: 'Nivel 1', description: 'Boutiques y cafeterías probando inventario inicial' },
  { min: 51, max: 99, discount_percent: 30, label: 'Nivel 2', description: 'Resurtido fuerte o tiendas con mayor rotación' },
  { min: 100, max: null, discount_percent: 35, label: 'Nivel 3', description: 'Socios comerciales grandes o compras recurrentes' },
]

// Fallback estático si no hay productos de catálogo disponibles
const FALLBACK_PRODUCTS = [
  { key: 'bruma', label: 'Bruma Aromática', size: '225 ml', category: 'Brumas Aromáticas', retailPrice: 299, qty: 0 },
  { key: 'aceite', label: 'Aceite Aromático', size: '15 ml', category: 'Aceites Aromáticos', retailPrice: 249, qty: 0 },
  { key: 'velaClasica', label: 'Vela Clásica', size: '250g', category: 'Velas de Soya', retailPrice: 349, qty: 0 },
  { key: 'velaMistica', label: 'Vela Mística', size: '350g', category: 'Velas de Soya', retailPrice: 499, qty: 0 },
]

const products = ref([])
const loadingProducts = ref(true)

// Cargar productos de catálogo (canal directa) para la calculadora de mayoreo.
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
      .select('id, sku, name, subtitle, price, product_categories(name)')
      .eq('sales_channel', 'directa')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error

    if (data && data.length > 0) {
      products.value = data.map(p => ({
        key: p.id,
        label: p.name,
        size: p.subtitle || p.product_categories?.name || '',
        category: p.product_categories?.name || 'Otros',
        retailPrice: Number(p.price) || 0,
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

// Filtro predictivo por búsqueda (nombre, subtítulo o categoría)
const filteredProducts = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return products.value
  return products.value.filter(p =>
    (p.label || '').toLowerCase().includes(q) ||
    (p.size || '').toLowerCase().includes(q) ||
    (p.category || '').toLowerCase().includes(q)
  )
})

// Agrupar productos por categoría (para los acordeones)
const groupedProducts = computed(() => {
  const map = new Map()
  for (const p of filteredProducts.value) {
    const cat = p.category || 'Otros'
    if (!map.has(cat)) map.set(cat, [])
    map.get(cat).push(p)
  }
  return Array.from(map, ([category, items]) => ({ category, items }))
})

// Estado de acordeones abiertos (la primera categoría inicia abierta)
const openCategories = ref(new Set())
function isOpen(cat) {
  return openCategories.value.has(cat)
}
function toggleCategory(cat) {
  const next = new Set(openCategories.value)
  if (next.has(cat)) next.delete(cat)
  else next.add(cat)
  openCategories.value = next
}
// Al buscar, abrir todas las categorías con resultados; sin búsqueda, dejar
// abierta la primera.
watch([groupedProducts, query], ([groups, q]) => {
  const active = (q || '').trim().toLowerCase()
  if (active) {
    openCategories.value = new Set(groups.map(g => g.category))
  } else if (groups.length && openCategories.value.size === 0) {
    openCategories.value = new Set([groups[0].category])
  }
}, { immediate: true })

// Icono por categoría (heurística sencilla por nombre)
function categoryIcon(name) {
  const n = (name || '').toLowerCase()
  if (n.includes('vela')) return '🕯️'
  if (n.includes('bruma') || n.includes('spray')) return '🌿'
  if (n.includes('jabon') || n.includes('crema')) return '🧴'
  if (n.includes('aceite')) return '💧'
  if (n.includes('difusor') || n.includes('reed')) return '🪵'
  return '📦'
}

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

// Precio unitario mayoreo estimado para un producto (según el tier del pedido)
function unitWholesale(prod) {
  const { price } = getWholesalePrice(prod.retailPrice, totalPieces.value, tiers)
  return price
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
