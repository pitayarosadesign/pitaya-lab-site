\<template>
  <div>
    <div class="bg-white rounded-3xl border border-earth-100 shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-primary-900 to-earth-900 text-white px-6 md:px-10 py-8">
        <h3 class="text-2xl md:text-3xl font-serif font-bold">💍 Arma tu Recuerdo</h3>
        <p class="text-primary-200 mt-2 text-sm md:text-base max-w-2xl">
          Cotiza y aparta tus recuerdos personalizados para bodas, XV años y eventos corporativos. El precio se ajusta automáticamente según la cantidad.
        </p>
      </div>

      <div class="p-6 md:p-10">
        <!-- Indicador de pasos -->
        <div class="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <div
            v-for="(step, i) in steps"
            :key="step.id"
            class="flex items-center gap-2 flex-shrink-0"
          >
            <div
              class="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all cursor-default"
              :class="currentStep === i
                ? 'bg-primary-600 text-white'
                : i < currentStep
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-earth-50 text-earth-400'"
            >
              <span class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">{{ i + 1 }}</span>
              {{ step.label }}
            </div>
            <svg v-if="i < steps.length - 1" class="w-4 h-4 text-earth-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>

        <!-- PASO 1: Envase -->
        <div v-if="currentStep === 0">
          <h4 class="text-lg font-semibold text-earth-800 mb-1">1. Elige tu envase</h4>
          <p class="text-sm text-earth-400 mb-5">Selecciona el tipo de botella para tus recuerdos</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              v-for="envase in envases"
              :key="envase.id"
              @click="form.envase = envase.id"
              class="border-2 rounded-2xl p-4 cursor-pointer transition-all text-center"
              :class="form.envase === envase.id ? 'border-primary-500 bg-primary-50 shadow-md' : 'border-earth-200 hover:border-earth-300'"
            >
              <div class="w-full aspect-square rounded-xl bg-earth-50 flex items-center justify-center mb-3 overflow-hidden">
                <img v-if="envase.image" :src="envase.image" :alt="envase.nombre" class="w-full h-full object-cover" />
                <span v-else class="text-5xl">{{ envase.emoji }}</span>
              </div>
              <h5 class="font-semibold text-earth-800 text-sm">{{ envase.nombre }}</h5>
              <p class="text-xs text-earth-400 mt-1">{{ envase.descripcion }}</p>
              <p v-if="envase.capacidad" class="text-xs font-semibold text-primary-600 mt-2">{{ envase.capacidad }}</p>
            </div>
          </div>
        </div>

        <!-- PASO 2: Fragancia -->
        <div v-else-if="currentStep === 1">
          <h4 class="text-lg font-semibold text-earth-800 mb-1">2. Selecciona tu fragancia insignia</h4>
          <p class="text-sm text-earth-400 mb-5">Inspiradas en la alta hospitalidad</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              v-for="scent in fragancias"
              :key="scent.id"
              @click="form.fragancia = scent.id"
              class="border-2 rounded-2xl p-4 cursor-pointer transition-all text-center"
              :class="form.fragancia === scent.id ? 'border-primary-500 bg-primary-50 shadow-md' : 'border-earth-200 hover:border-earth-300'"
            >
              <div class="w-16 h-16 rounded-full mx-auto bg-earth-50 flex items-center justify-center overflow-hidden mb-3">
                <img v-if="scent.image" :src="scent.image" :alt="scent.nombre" class="w-full h-full object-cover" />
                <span v-else class="text-2xl">🌸</span>
              </div>
              <h5 class="font-semibold text-earth-800 text-sm">{{ scent.nombre }}</h5>
              <p class="text-xs text-earth-400 mt-1 leading-relaxed">{{ scent.descripcion }}</p>
            </div>
          </div>
        </div>

        <!-- PASO 3: Diseño -->
        <div v-else-if="currentStep === 2">
          <h4 class="text-lg font-semibold text-earth-800 mb-1">3. Tu etiqueta personalizada</h4>
          <p class="text-xs text earth-400 mb-5">{{ labelSpecs }}</p>

          <!-- Opciones: subir diseño o plantilla -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Subir diseño -->
            <div
              class="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all"
              :class="form.mododeDiseño === 'upload' ? 'border-primary-500 bg-primary-50' : 'border-earth-200 hover:border-primary-300'"
              @click="selectDesignMode('upload')"
            >
              <div class="w-12 h-12 mx-auto mb-3 bg-primary-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
              </div>
              <h5 class="font-semibold text-earth-800 mb-1">Subir mi diseño</h5>
              <p class="text-xs text-earth-400 mb-3">PNG/PDF · 300 dpi · 5x5 cm</p>
              <div v-if="form.mododeDiseño === 'upload'" class="text-left mt-3">
                <input
                  @change="onFileUpload"
                  type="file"
                  accept="image/png,image/jpeg,application/pdf"
                  class="w-full text-xs text-earth-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                />
                <div v-if="form.designFileName" class="mt-2 flex items-center gap-2 text-sm text-green-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  {{ form.designFileName }}
                </div>
              </div>
            </div>

            <!-- Plantillas -->
            <div class="space-y-3">
              <h5 class="font-semibold text-earth-800">o elige una plantilla</h5>
              <div
                v-for="plantilla in plantillas"
                :key="plantilla.id"
                @click="selectTemplate(plantilla)"
                class="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all"
                :class="form.mododeDiseño === 'template' && form.plantilla === plantilla.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-earth-200 hover:border-earth-300'"
              >
                <div class="w-12 h-12 rounded-lg bg-earth-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img v-if="plantilla.image_url" :src="plantilla.image_url" class="w-full h-full object-cover" />
                  <span v-else class="text-xl">🎨</span>
                </div>
                <div>
                  <p class="text-sm font-semibold text-earth-800">{{ plantilla.name }}</p>
                  <p class="text-xs text-earth-400">{{ plantilla.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Campos para personalizar (nombres / fecha) -->
          <div v-if="form.mododeDiseño === 'template'" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <label class="block text-sm font-medium text-earth-700 mb-1">Nombre(s) para la etiqueta</label>
              <input v-model="form.textoPersonalizado" type="text" placeholder="Ej. María & José · 15.08.2025" class="w-full px-4 py-2.5 rounded-lg border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
            </div>
            <div>
              <label class="block text-sm font-medium text-earth-700 mb-1">Fecha / detalle adicional</label>
              <input v-model="form.fechaEvento" type="text" placeholder="Ej. 15 de agosto de 2025" class="w-full px-4 py-2.5 rounded-lg border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
            </div>
          </div>
        </div>

        <!-- PASO 4: Cantidad y Precio -->
        <div v-else-if="currentStep === 3">
          <h4 class="text-lg font-semibold text-earth-800 mb-1">4. Define la cantidad y cotiza</h4>
          <p class="text-sm text-earth-400 mb-5">A mayor volumen, menor precio unitario</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium text-earth-700 mb-2">Número de piezas *</label>
              <div class="flex items-center gap-2">
                <input
                  v-model.number="form.cantidad"
                  type="number"
                  min="1"
                  placeholder="Ej. 60"
                  class="w-full px-4 py-3 text-lg font-semibold rounded-xl border border-earth-200 focus:border-primary-400 outline-none transition-all"
                />
              </div>
              <p class="text-xs text-earth-400 mt-2">Mínimo de 30 piezas para pedidos personalizados</p>
              <p v-if="envaseSeleccionado && form.cantidad > stockDisponible" class="text-xs font-semibold text-red-500 mt-1">
                ⚠️ Solo tenemos {{ stockDisponible }} piezas disponibles de este envase
              </p>
              <p v-else-if="envaseSeleccionado && stockDisponible <= 20" class="text-xs font-semibold text-amber-600 mt-1">
                🔥 Solo quedan {{ stockDisponible }} piezas de este envase
              </p>
            </div>
            <div class="p-4 rounded-2xl border border-earth-100 bg-earth-50 flex flex-col justify-center">
              <p class="text-sm text-earth-500 mb-1">Precio unitario estimado</p>
              <p class="text-3xl font-bold text-primary-700">${{ formatMXN(precioUnitario) }}</p>
              <p class="text-xs text-earth-400">{{ pricingTier.label }} · {{ pricingTier.min }} a {{ pricingTier.max ? pricingTier.max + ' pzas' : 'pzas+' }}</p>
            </div>
          </div>

          <!-- Add-on Kit Premium -->
          <div class="p-4 rounded-2xl border border-earth-100 mb-6">
            <label class="flex items-center justify-between gap-3 cursor-pointer">
              <div>
                <p class="font-semibold text-earth-800">🎁 Kit de Recuerdo Premium</p>
                <p class="text-xs text-earth-400 mt-1">Caja de regalo individual + bolsa de manta + dije decorativo por recuerdo</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-sm font-semibold text-primary-700">+${{ formatMXN(addonPremium) }}</span>
                <input
                  v-model="form.premiumKit"
                  type="checkbox"
                  class="w-5 h-5 rounded text-primary-600 focus:ring-primary-500"
                />
              </div>
            </label>
          </div>

          <!-- Fecha del evento -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-earth-700 mb-1">Fecha aproximada de tu evento</label>
            <input
              v-model="form.eventDate"
              type="date"
              class="w-full px-4 py-2.5 rounded-lg border border-earth-200 focus:border-primary-400 outline-none transition-all"
            />
            <p class="text-xs text-earth-400 mt-1">Para planear la programación de tu pedido (toma hasta {{ leadTimeDays }} días hábiles)</p>
          </div>

          <!-- Resumen -->
          <div class="border-t border-earth-100 pt-5 space-y-2 mb-6">
            <div class="flex items-center justify-between text-sm">
              <span class="text-earth-500">Piezas</span>
              <span class="text-earth-800 font-medium">{{ form.cantidad || 0 }}</span>
            </div>
            <div v-if="form.premiumKit" class="flex items-center justify-between text-sm">
              <span class="text-earth-500">Precio unitario (premium)</span>
              <span class="text-earth-800 font-medium">${{ formatMXN(precioUnitario + addonPremium) }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="font-semibold text-earth-800 text-lg">Total estimado</span>
              <span class="text-3xl font-bold text-earth-900">${{ formatMXN(totalCotizacion) }}</span>
            </div>
            <p class="text-xs text-earth-400 text-right">Precio estimado sin iva · Incluye etiqueta 5x5</p>
          </div>

          <!-- Botones -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              @click="cotizarPorWhatsApp"
              class="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all hover:shadow-lg"
            >
              💬 Cotizar por WhatsApp
            </button>
            <button
              @click="apartarPedido"
              class="flex-1 inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all hover:shadow-lg"
            >
              🛍️ Pagar y apartar
            </button>
          </div>
        </div>

        <!-- Navegación entre pasos -->
        <div class="flex items-center justify-between mt-8 pt-6 border-t border-earth-100">
          <button
            @click="currentStep > 0 ? currentStep-- : null"
            :disabled="currentStep === 0"
            class="px-5 py-2.5 rounded-lg text-sm font-medium text-earth-600 hover:text-earth-800 border border-earth-200 hover:border-earth-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>
          <button
            v-if="currentStep < steps.length - 1"
            @click="canAdvance(currentStep) ? currentStep++ : alert('Completa los campos requeridos para continuar')"
            :disabled="!canAdvance(currentStep)"
            class="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRecuerdoPricing, formatMXN, useB2BConfig, WHATSAPP_URL } from '~/composables/useB2B'

const emit = defineEmits<{
  (e: 'order', payload: any): void
}>()

// Config
const config = reactive({
  min_pieces: 30,
  pricing_by_volume: [
    { min: 30, max: 50, price_from: 65, price_to: 75, label: 'Eventos íntimos' },
    { min: 51, max: 100, price_from: 55, price_to: 62, label: 'Descuento por volumen' },
    { min: 101, max: null, price_from: 45, price_to: 50, label: 'Precio preferencial' },
  ],
  premium_kit_addon_from: 15,
  premium_kit_addon_to: 25,
  label_specs: 'Sube tu diseño en formato PNG/PDF a 300 dpi, medida exacta 5x5 cm',
  label_size: '5x5 cm',
  lead_time_days: 15,
  whatsapp: '523333856064',
})

// Cargar config
async function loadConfig() {
  const cfg = await useB2BConfig()
  Object.assign(config, cfg.recuerdos)
}
onMounted(loadConfig)

// Envases disponibles (nueva línea de recuerdos)
// ⚠️ IMPORTANTE SOBRE STOCK Y PRECIO:
// - "stock": disponibilidad que PITAYA LAB ofrece al público (piezas máx. resueltas internamente).
//   Ajusta este número a tu inventario controlado (p. ej. expones 90 aunque tu proveedor tenga 97).
// - "precioBase": PRECIO AL PÚBLICO "TODO EN UNO" (envase + fragancia + etiqueta personalizada).
//   NUNCA revela el costo del envase por separado ni al proveedor.
// - El NOMBRE COMERCIAL no revela el proveedor (evita "Jasmar de Velasco").
// - "proveedor_ref" va SOLO como referencia interna (para ti); JAMÁS se muestra al cliente en el sitio.
const envases = [
  {
    id: 'perfumero-cuadrado-dorado',
    nombre: 'Perfumero Premium',
    descripcion: 'Vidrio cuadrado con atomizador y tapa dorada',
    capacidad: '30 ml',
    stock: 90, // ← existencias de PITAYA LAB que expones
    precioBase: 85, // ← precio al público "todo en uno" (30 ml)
    image: null,
    emoji: '✨',
    proveedor_ref: 'https://envasesvelasco.com/products/envase-vidrio-perfumero-cuadrado-jasmar-con-atomizador-y-tapa-de-aluminio',
  },
  {
    id: 'perfumero-cuadrado-dorado-60',
    nombre: 'Perfumero Grain de Riz',
    descripcion: 'Vidrio cuadrado con atomizador, tapa dorada',
    capacidad: '60 ml',
    stock: 149,
    precioBase: 115, // ← precio al público "todo en uno" (60 ml)
    image: null,
    emoji: '🧴',
  },
  {
    id: 'frasco-ambar',
    nombre: 'Frasco Ámbar Esencial',
    descripcion: 'Vidrio ámbar con atomizador · clásico y elegante',
    capacidad: '30 ml',
    stock: 120,
    precioBase: 85, // ← precio al público "todo en uno" (30 ml)
    image: null,
    emoji: '🫙',
  },
  {
    id: 'perfumero-cilindrico',
    nombre: 'Perfumero Cilíndrico',
    descripcion: 'Vidrio transparente, minimalista',
    capacidad: '50 ml',
    stock: 80,
    precioBase: 100, // ← precio al público "todo en uno" (50 ml)
    image: null,
    emoji: '🧪',
  },
]

// Fragancias insignia
const fragancias = [
  { id: 'xcaret', nombre: 'Xcaret', descripcion: 'Lujo y naturaleza tropical', image: '/images/scents/aroma-xcaret.png' },
  { id: 'vidanta', nombre: 'Vidanta', descripcion: 'Resort costero relajante', image: '/images/scents/aroma-vidanta.png' },
  { id: 'solara', nombre: 'Solara', descripcion: 'Cítrico floral vibrante', image: '/images/scents/aroma-solara.png' },
  { id: 'kiyosumi', nombre: 'Kiyosumi', descripcion: 'Serenidad japonesa zen', image: null },
]

// Plantillas
const plantillas = ref([
  { id: 'minimalist-elegance', name: 'Minimalist Elegance', description: 'Tipografía fina centrada', image_url: null },
  { id: 'botanical-garden', name: 'Botanical Garden', description: 'Hojas botánicas delicadas', image_url: null },
  { id: 'modern-luxury', name: 'Modern Luxury', description: 'Detalles dorados y geométricos', image_url: null },
])

// Cargar plantillas de Supabase
async function loadPlantillas() {
  const supabase = useNuxtApp()?.$supabase
  if (!supabase) return
  try {
    const { data } = await supabase.from('label_templates').select('*').eq('is_active', true)
    if (data?.length) {
      plantillas.value = data.map(t => ({ id: t.slug, name: t.name, description: t.description, image_url: t.image_url }))
    }
  } catch (e) {
    console.warn('Usando plantillas por defecto:', e.message)
  }
}
onMounted(loadPlantillas)

// Formulario
const currentStep = ref(0)
const form = reactive({
  envase: null,
  fragancia: null,
  mododeDiseño: null, // 'upload' | 'template'
  plantilla: null,
  designFileName: null,
  textoPersonalizado: '',
  fechaEvento: '',
  cantidad: 0,
  premiumKit: false,
  eventDate: '',
})

const steps = [
  { id: 'envase', label: 'Envase' },
  { id: 'fragancia', label: 'Fragancia' },
  { id: 'diseno', label: 'Etiqueta' },
  { id: 'cantidad', label: 'Cantidad' },
]

// Validación por paso
function canAdvance(step) {
  if (step === 0) return !!form.envase
  if (step === 1) return !!form.fragancia
  if (step === 2) {
    if (form.mododeDiseño === 'template') return !!form.plantilla
    if (form.mododeDiseño === 'upload') return !!form.designFileName
    return false
  }
  return form.cantidad >= config.min_pieces
}

// Envase seleccionado
const envaseSeleccionado = computed(() => envases.find(e => e.id === form.envase) || null)

// Descuento por volumen (porcentaje según cantidad)
function descuentoPorVolumen(cantidad) {
  if (cantidad >= 101) return 0.25 // 25% dto
  if (cantidad >= 51) return 0.15 // 15% dto
  if (cantidad >= 30) return 0.05 // 5% dto
  return 0
}

// Precio unitario "todo en uno" según envase + volumen
const precioUnitario = computed(() => {
  const base = envaseSeleccionado.value?.precioBase || 85
  if (form.cantidad <= 0) return base
  const dto = descuentoPorVolumen(form.cantidad)
  return Math.round(base * (1 - dto))
})

// Precio unitario + addon premium (rango medio)
const addonPremium = computed(() => Math.round((config.premium_kit_addon_from + config.premium_kit_addon_to) / 2))

const pricingTier = computed(() => {
  const c = form.cantidad || 30
  if (c >= 101) return { label: 'Precio preferencial', min: 101, max: null }
  if (c >= 51) return { label: 'Descuento por volumen', min: 51, max: 100 }
  return { label: 'Eventos íntimos', min: 30, max: 50 }
})

const totalCotizacion = computed(() =>
  form.cantidad * (precioUnitario.value + (form.premiumKit ? addonPremium.value : 0))
)

// Stock disponible del envase seleccionado
const stockDisponible = computed(() => envaseSeleccionado.value?.stock || 0)

const leadTimeDays = computed(() => config.lead_time_days || 15)

// File upload
function onFileUpload(event) {
  const file = event.target.files?.[0]
  if (file) {
    form.designFileName = file.name
    form.mododeDiseño = 'upload'
  }
}

function selectDesignMode(mode) {
  form.mododeDiseño = mode
  if (mode === 'upload') form.plantilla = null
}

function selectTemplate(plantilla) {
  form.mododeDiseño = 'template'
  form.plantilla = plantilla.id
  form.designFileName = null
}

// Construir mensaje de WhatsApp
function buildMessage() {
  const envase = envases.find(e => e.id === form.envase)?.nombre
  const fragancia = fragancias.find(s => s.id === form.fragancia)?.nombre
  const disenio = form.mododeDiseño === 'template'
    ? plantillas.value.find(p => p.id === form.plantilla)?.name
    : 'Mi diseño (' + form.designFileName + ')'

  return `¡Hola PITAYA LAB! 👋 Quiero cotizar recuerdos para mi evento:\n\n🧴 Envase: ${envase}\n🌸 Fragancia: ${fragancia}\n🏷️ Etiqueta: ${disenio}${form.textoPersonalizado ? '\nTexto: ' + form.textoPersonalizado : ''}\n📦 Cantidad: ${form.cantidad} pzas\n${form.premiumKit ? '🎁 Kit Premium: Sí\n' : ''}${form.eventDate ? '📅 Evento: ' + form.eventDate + '\n' : ''}💰 Total estimado: $${formatMXN(totalCotizacion.value)}\n\n¿Me pueden confirmar disponibilidad y programación?`
}

function cotizarPorWhatsApp() {
  window.open(WHATSAPP_URL() + '?text=' + encodeURIComponent(buildMessage()), '_blank')
}

// Emitir pedido completo para pago
function apartarPedido() {
  if (form.cantidad < config.min_pieces) {
    alert(`El mínimo para recuerdos personalizados es de ${config.min_pieces} piezas.`)
    return
  }
  if (form.cantidad > stockDisponible.value) {
    alert(`Solo tenemos ${stockDisponible.value} piezas disponibles de este envase. Ajusta la cantidad o elige otro envase.`)
    return
  }
  emit('order', {
    type: 'event',
    cantidad: form.cantidad,
    envase: envases.find(e => e.id === form.envase),
    fragancia: fragancias.find(s => s.id === form.fragancia),
    disenio: form.mododeDiseño === 'template'
      ? plantillas.value.find(p => p.id === form.plantilla)
      : { id: 'custom', name: 'Mi diseño', fileName: form.designFileName },
    textoPersonalizado: form.textoPersonalizado,
    fechaEvento: form.fechaEvento,
    eventDate: form.eventDate,
    premiumKit: form.premiumKit,
    precioUnitario: precioUnitario.value,
    addonPremium: addonPremium.value,
    total: totalCotizacion.value,
    leadTimeDays: leadTimeDays.value,
  })
}
</script>
