<template>
  <div>
    <!-- Carga -->
    <div v-if="primerCarga" class="bg-white rounded-3xl border border-earth-100 shadow-lg p-10 text-center text-earth-400 text-sm">
      <div class="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-3"></div>
      Cargando recuerdos para eventos…
    </div>

    <!-- Sin recuerdos -->
    <div v-else-if="!recuerdos.length" class="bg-white rounded-3xl border border-earth-100 shadow-lg p-12 text-center">
      <p class="text-5xl mb-4">💍</p>
      <h3 class="text-xl font-serif font-bold text-earth-900 mb-1">Aún no hay recuerdos publicados</h3>
      <p class="text-sm text-earth-400 max-w-md mx-auto">Estamos preparando los recuerdos para eventos. Escríbenos por WhatsApp y los cotizamos a tu medida.</p>
    </div>

    <!-- Paso 0 · Elige recuerdo -->
    <div v-else-if="!productoElegido" class="bg-white rounded-3xl border border-earth-100 shadow-lg overflow-hidden">
      <div class="bg-gradient-to-r from-primary-900 to-earth-900 text-white px-6 md:px-10 py-8">
        <div class="max-w-2xl">
          <p class="text-amber-300 font-semibold text-sm uppercase tracking-widest mb-2">Recuerdos para Eventos</p>
          <h2 class="text-2xl md:text-3xl font-serif font-bold">Arma tu Recuerdo personalizado</h2>
          <p class="text-primary-200 mt-2 text-sm md:text-base">Elige un recuerdo de nuestro catálogo especial, toma su aroma y la cantidad que necesites. Personaliza tu etiqueta y cotiza directo.</p>
        </div>
      </div>

      <div class="p-6 md:p-10">
        <!-- ⏱️ Leyenda de anticipación (visible antes de elegir recuerdo) -->
        <div class="mb-6 flex items-start gap-3 rounded-2xl bg-amber-50 border border-amber-200 px-5 py-4">
          <span class="text-2xl leading-none mt-0.5">⏱️</span>
          <div>
            <p class="font-semibold text-amber-800 text-sm">Pide con anticipación</p>
            <p class="text-amber-700 text-sm leading-relaxed">
              Recomendamos pedir con <strong>15 días de anticipación</strong> (mínimo <strong>10 días antes</strong> de tu evento) para garantizar la entrega.
            </p>
          </div>
        </div>

        <div class="mb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <div class="flex items-center gap-2 text-primary-600 text-sm font-semibold">
              <span class="w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-bold">1</span>
              Elige tu recuerdo
            </div>
            <p class="text-sm text-earth-400 mt-1">Toca una tarjeta para elegir su aroma y personalizarlo.</p>
          </div>
          <a :href="whatsappUrl" target="_blank" class="text-xs font-semibold text-green-700 underline flex-shrink-0">¿Necesitas algo distinto? Cotízalo por WhatsApp</a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <article v-for="r in recuerdos" :key="r.id" class="group relative bg-white rounded-2xl overflow-hidden border border-earth-200 transition-all duration-300 flex flex-col hover:border-primary-300 hover:shadow-lg">
            <div class="absolute top-3 left-3 z-10">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide" :class="maxStock(r) > 0 ? 'bg-emerald-600/90 text-white' : 'bg-amber-500/90 text-white'">
                {{ maxStock(r) > 0 ? 'Disponible' : 'Agotado' }}
              </span>
            </div>
            <button type="button" :disabled="maxStock(r) <= 0" @click="seleccionarProducto(r)" class="block w-full aspect-square bg-earth-50 overflow-hidden text-left relative">
              <img v-if="r.image" :src="r.image" :alt="r.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 group-disabled:grayscale" loading="lazy" />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-earth-100"><span class="text-6xl">🧴</span></div>
            </button>
            <div class="p-4 flex-1 flex flex-col">
              <span v-if="r.subtitle" class="self-start mb-1 text-[10px] font-bold uppercase tracking-wider text-primary-700 bg-primary-50 border border-primary-100 px-2 py-0.5 rounded-full">{{ r.subtitle }}</span>
              <h5 class="text-base font-serif font-bold text-earth-900 leading-tight">{{ r.name }}</h5>
              <p class="text-xs text-earth-500 mt-1 line-clamp-2 leading-relaxed flex-grow">{{ r.description }}</p>
              <div class="mt-3 flex items-center justify-between">
                <div>
                  <p class="text-[11px] text-earth-400">Pieza desde</p>
                  <p class="text-lg font-extrabold text-earth-900">{{ formatMXN(minUnit(r)) }}</p>
                </div>
                <button type="button" :disabled="maxStock(r) <= 0" @click="seleccionarProducto(r)"
                  class="px-3 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  :class="maxStock(r) > 0 ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-earth-100 text-earth-400'">
                  {{ maxStock(r) > 0 ? 'Personalizar ▸' : 'Agotado' }}
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- Configurador de un recuerdo -->
    <div v-else class="bg-white rounded-3xl border-2 border-primary-200 shadow-2xl overflow-hidden">
      <div class="bg-primary-900 text-white px-6 md:px-10 py-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div class="flex items-center gap-4 flex-1">
          <div class="w-14 h-14 rounded-2xl overflow-hidden bg-white flex-shrink-0">
            <img v-if="productoElegido.image" :src="productoElegido.image" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-2xl">🧴</div>
          </div>
          <div>
            <button type="button" @click="cerrarConfigurador" class="text-[11px] text-primary-200 hover:text-white underline">← Elegir otro recuerdo</button>
            <h4 class="text-xl font-serif font-bold leading-tight">{{ productoElegido.name }}</h4>
            <p v-if="productoElegido.subtitle" class="text-xs text-primary-300">{{ productoElegido.subtitle }}</p>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-[11px] text-primary-200">Pieza</p>
          <p class="text-2xl font-extrabold text-amber-300">{{ formatMXN(minUnit(productoElegido)) }}</p>
        </div>
      </div>

      <div class="p-6 md:p-8 space-y-7">
        <!-- steps -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1">
          <template v-for="(s, i) in pasos" :key="s.id">
            <div class="flex items-center gap-2 px-3 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all"
              :class="pasoActual === i ? 'bg-primary-600 text-white' : i < pasoActual ? 'bg-primary-100 text-primary-700' : 'bg-earth-50 text-earth-400'">
              <span class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-bold">{{ i + 2 }}</span>
              {{ s.label }}
            </div>
            <svg v-if="i < pasos.length - 1" class="w-4 h-4 text-earth-300 flex-shrink-0 mx-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </template>
        </div>

        <!-- 2 · aroma -->
        <section v-if="pasoActual === 0">
          <p class="text-xs font-bold uppercase tracking-wider text-primary-600 mb-1">Paso 1 de 3 · aroma</p>
          <h3 class="text-lg font-semibold text-earth-800">¿Qué aroma llevará?</h3>
          <p class="text-sm text-earth-400 mb-5">Fragancia insignia de nuestro catálogo para tus recuerdos.</p>

          <div v-if="aromasDisponibles.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <button v-for="ar in aromasDisponibles" :key="ar._key" type="button" @click="seleccionarAroma(ar)"
              class="text-left rounded-2xl p-3 border-2 transition-all duration-200"
              :class="esAromaSeleccionado(ar) ? 'border-primary-500 bg-primary-50 shadow-md ring-2 ring-primary-100' : 'border-earth-200 bg-white hover:border-primary-300'">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-full bg-earth-50 flex items-center justify-center overflow-hidden flex-shrink-0 border border-earth-100">
                  <img v-if="ar.image" :src="ar.image" :alt="ar.name" class="w-full h-full object-cover" />
                  <span v-else class="text-base">{{ ar.emoji || '🌸' }}</span>
                </span>
                <span class="flex-1 min-w-0">
                  <span class="block font-semibold text-earth-800 text-sm leading-tight truncate">{{ ar.name }}</span>
                  <span v-if="ar.subtitle" class="block text-[10px] uppercase tracking-wider text-primary-600 font-semibold truncate">{{ ar.subtitle }}</span>
                </span>
                <svg v-if="esAromaSeleccionado(ar)" class="w-5 h-5 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
              </div>
            </button>
          </div>
          <div v-else class="rounded-xl border border-earth-100 bg-earth-50 p-6 text-left text-sm text-earth-400">
            Este recuerdo aún no tiene aromas asignados. Puedes continuar y lo aclaramos por WhatsApp, o consúltanos directo. ✨
          </div>

          <div class="flex justify-end mt-6">
            <button type="button" @click="pasoActual = 1" :disabled="aromasDisponibles.length && !form.aroma"
              class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all active:scale-95">
              Continuar a cantidad →
            </button>
          </div>
        </section>

        <!-- 3 · cantidad -->
        <section v-else-if="pasoActual === 1">
          <p class="text-xs font-bold uppercase tracking-wider text-primary-600 mb-1">Paso 2 de 3 · cantidad</p>
          <h3 class="text-lg font-semibold text-earth-800">¿Cuántos recuerdos necesitas?</h3>
          <p class="text-sm text-earth-400 mb-5">Precio por pieza fijo: <strong>{{ formatMXN(minUnit(productoElegido)) }}</strong>. No hay mínimos ocultos.</p>

          <div class="max-w-xl">
            <label class="block text-sm font-medium text-earth-700 mb-2">Número de piezas</label>
            <input v-model.number="formText.cantidad" type="number" min="1" placeholder="Ej. 60"
              class="w-full px-4 py-3 text-lg font-semibold rounded-xl border border-earth-200 focus:border-primary-400 outline-none transition-all" />
            <p v-if="stockTotal > 0 && Number(formText.cantidad) > stockTotal" class="text-xs font-semibold text-red-500 mt-2">⚠️ Solo tenemos {{ stockTotal }} piezas de este recuerdo.</p>
            <p class="text-xs text-earth-400 mt-3">Cantidades sugeridas:
              <span v-for="n in sugerencias" :key="n" @click="formText.cantidad = n"
                class="inline-block mx-0.5 px-2.5 py-1 rounded-full bg-earth-100 hover:bg-primary-100 text-earth-600 hover:text-primary-700 text-xs font-semibold cursor-pointer transition-colors">{{ n }}</span>
            </p>
          </div>

          <div class="mt-7 rounded-2xl border border-primary-100 bg-primary-50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p class="text-xs text-primary-700">{{ cantidadValida ? formText.cantidad : 0 }} pzas · {{ productoElegido.name }}{{ form.aroma?.name ? ' · ' + form.aroma.name : '' }}</p>
              <p class="text-3xl font-extrabold text-primary-700">{{ formatMXN(subtotal) }}</p>
            </div>
            <button type="button" :disabled="!cantidadValida" @click="pasoActual = 2"
              class="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 rounded-xl transition-all active:scale-95">
              Personalizar etiqueta →
            </button>
          </div>
        </section>

        <!-- 4 · etiqueta + acciones -->
        <section v-else>
          <p class="text-xs font-bold uppercase tracking-wider text-primary-600 mb-1">Paso 3 de 3 · personaliza tu etiqueta</p>
          <h3 class="text-lg font-semibold text-earth-800">Diseño, nombres y fecha</h3>
          <p class="text-sm text-earth-400 mb-4">{{ labelSpecs }}</p>

          <div class="flex flex-wrap gap-2 mb-5">
            <button type="button" @click="modoDiseno = 'subir'" class="px-4 py-2 rounded-full text-sm font-medium border-2 transition-all"
              :class="modoDiseno === 'subir' ? 'border-primary-500 bg-primary-600 text-white' : 'border-earth-200 text-earth-600 hover:border-primary-300'">📤 Subir mi diseño</button>
            <button type="button" @click="modoDiseno = 'plantilla'" class="px-4 py-2 rounded-full text-sm font-medium border-2 transition-all"
              :class="modoDiseno === 'plantilla' ? 'border-primary-500 bg-primary-600 text-white' : 'border-earth-200 text-earth-600 hover:border-primary-300'">🎨 Plantilla preestablecida</button>
          </div>

          <div v-if="modoDiseno === 'subir'">
            <div class="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all bg-earth-50/50"
              :class="archivo ? 'border-primary-400 bg-primary-50' : 'border-earth-300 hover:border-primary-400'" @click="inputArchivo?.click()">
              <template v-if="archivo">
                <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-lg mx-auto mb-2">🖼️</div>
                <p class="text-sm font-semibold text-primary-700">{{ archivo }}</p>
                <p class="text-xs text-earth-500 underline mt-1">Clic para reemplazar archivo</p>
              </template>
              <template v-else>
                <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                </div>
                <p class="font-semibold text-earth-800">Clic para seleccionar tu diseño</p>
                <p class="text-xs text-earth-400 mt-1">{{ labelSize }} · PNG/PDF · 300 dpi</p>
              </template>
              <input ref="inputArchivo" type="file" accept="image/png,image/jpeg,image/webp,application/pdf" class="hidden" @change="onArchivo" />
            </div>
          </div>

          <div v-if="modoDiseno === 'plantilla'">
            <p class="text-sm text-earth-500 mb-3">Elige una base preestablecida para tu etiqueta.</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              <button v-for="t in plantillas" :key="t.id" type="button" @click="seleccionarPlantilla(t)"
                class="rounded-xl p-2.5 border-2 transition-all text-left"
                :class="plantilla?.id === t.id ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-100' : 'border-earth-200 bg-white hover:border-primary-300'">
                <div class="aspect-square rounded-lg bg-earth-50 flex items-center justify-center overflow-hidden mb-2 border border-earth-100">
                  <span class="text-3xl">{{ t.emoji || '🎨' }}</span>
                </div>
                <p class="text-sm font-semibold text-earth-800 leading-tight">{{ t.name }}</p>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <label class="block text-sm font-medium text-earth-700 mb-1">Nombre(s) o texto a la etiqueta</label>
              <input v-model="formText.texto" type="text" placeholder="Ej. María & José · Con amor" class="w-full px-4 py-2.5 rounded-lg border border-earth-200 focus:border-primary-400 outline-none transition-all" />
            </div>
            <div>
              <label class="block text-sm font-medium text-earth-700 mb-1">Fecha de tu evento</label>
              <input v-model="formText.eventDate" type="date" class="w-full px-4 py-2.5 rounded-lg border border-earth-200 focus:border-primary-400 outline-none transition-all" />
            </div>
          </div>

          <!-- ⏱️ Recordatorio de anticipación -->
          <div class="mt-6 flex items-start gap-2.5 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
            <span class="text-lg leading-none mt-0.5">⏱️</span>
            <p class="text-xs text-amber-800 leading-relaxed">
              <strong>Recuerda:</strong> pide con <strong>15 días de anticipación</strong> (mínimo <strong>10 días antes</strong> de tu evento) para garantizar la entrega.
            </p>
          </div>

          <div class="mt-7 rounded-2xl border border-primary-100 bg-primary-50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p class="text-sm text-primary-800">{{ formText.cantidad }} pzas · <strong>{{ productoElegido.name }}</strong>{{ form.aroma?.name ? ' · ' + form.aroma.name : '' }}</p>
              <p class="text-[11px] text-earth-500 mt-0.5">{{ formatMXN(minUnit(productoElegido)) }}/pza · incluye etiqueta {{ labelSize }} · sin IVA</p>
              <p class="text-3xl font-extrabold text-primary-700 mt-1">{{ formatMXN(subtotal) }}</p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
              <a :href="whatsappResumen" target="_blank" class="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-5 rounded-xl transition-all hover:shadow-lg active:scale-95">💬 Cotizar por WhatsApp</a>
              <button type="button" :disabled="!cantidadValida" @click="abrirCheckoutEvento" class="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:shadow-lg active:scale-95">🛍️ Pagar y apartar · {{ formatMXN(subtotal) }}</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { formatMXN, WHATSAPP_URL } from '~/composables/useB2B'
import { useB2BConfig } from '~/composables/useB2BConfig'

const emit = defineEmits<{ (e: 'order', payload: any): void }>()

/* Script inicial de plantillas y enlaces */
const plantillas = ref([
  { id: 'minimalista', name: 'Minimalista', emoji: '🤍' },
  { id: 'botanico', name: 'Botánico', emoji: '🌿' },
  { id: 'dorado', name: 'Detalle dorado', emoji: '✨' },
  { id: 'bohemio', name: 'Bohemio', emoji: '🪶' },
])

/* Config recuerdos dinámica */
const config = reactive({
  label_specs: 'Incluye etiqueta personalizada con tu diseño o nuestra plantilla. Sube tu diseño en PNG/PDF a 300 dpi o escribe los nombres y fecha.',
  label_size: 'estándar',
  lead_time_days: 15,
})
const labelSpecs = computed(() => config.label_specs)
const labelSize = computed(() => config.label_size)

const leadTimeDays = computed(() => Number(config.lead_time_days) || 15)

/* Carga de recuerdos: products con canal 'evento' */
const primerCarga = ref(true)
const recuerdos = ref<any[]>([])
const errorCarga = ref<string | null>(null)

async function cargarRecuerdos() {
  primerCarga.value = true
  errorCarga.value = null
  try {
    const cfg = await useB2BConfig()
    if (cfg.recuerdos) {
      if (cfg.recuerdos.label_specs) config.label_specs = cfg.recuerdos.label_specs
      if (cfg.recuerdos.label_size) config.label_size = cfg.recuerdos.label_size
      if (cfg.recuerdos.lead_time_days) config.lead_time_days = cfg.recuerdos.lead_time_days
    }
    const res: any = await $fetch('/api/products?channel=evento')
    const list = res?.products || []
    // Solo activos y con precio de pieza positivo
    recuerdos.value = list.filter((p: any) => Number(p.price) > 0)
  } catch (e: any) {
    console.error('Error cargando recuerdos', e)
    errorCarga.value = e?.data?.message || e?.message || 'No se pudieron cargar los recuerdos.'
    recuerdos.value = []
  } finally {
    primerCarga.value = false
  }
}

/* Selección */
const productoElegido = ref<any>(null)
const pasoActual = ref(0)
const pasos = [
  { id: 'aroma', label: 'Aroma' },
  { id: 'cantidad', label: 'Cantidad' },
  { id: 'etiqueta', label: 'Etiqueta' },
]

const form = reactive<{ aroma: any }>({ aroma: null })
const formText = reactive({
  cantidad: 50,
  texto: '',
  eventDate: '',
})
const modoDiseno = ref<'subir' | 'plantilla'>('subir')
const archivo = ref<string | null>(null)
const plantilla = ref<{ id: string; name: string; emoji?: string } | null>(null)
const inputArchivo = ref<HTMLInputElement | null>(null)

/* Precio/stock unit de un recuerdo */
function minUnit(p: any) {
  const price = Number(p?.price)
  return Number.isFinite(price) ? price : 0
}
function maxStock(r: any) {
  return Number(r?.stock) > 0 ? Number(r.stock) : 0
}
const stockTotal = computed(() => {
  // stock es del recuerdo (si el producto-aro son variantes, vemos stock del padre)
  return maxStock(productoElegido.value)
})

const sugerencias = [30, 50, 100, 150, 200]

function seleccionarProducto(r: any) {
  if (maxStock(r) <= 0) return
  productoElegido.value = r
  form.aroma = null
  modoDiseno.value = 'subir'
  archivo.value = null
  plantilla.value = null
  formText.texto = ''
  formText.eventDate = ''
  formText.cantidad = 50
  pasoActual.value = 0
}
function cerrarConfigurador() {
  productoElegido.value = null
  pasoActual.value = 0
  form.aroma = null
}
function seleccionarAroma(ar: any) {
  form.aroma = ar
}

/* Aromas disponibles del recuerdo, sin duplicados y con clave estable.
   El API puede devolver el mismo perfil aromático en varias variantes, o
   (por compatibilidad) sin id; por eso deduplicamos por id -> slug -> name
   y garantizamos una clave única para el v-for y la comparación de selección. */
function aromaKey(ar: any) {
  if (ar?.id != null && ar.id !== '') return String(ar.id)
  if (ar?.slug) return String(ar.slug)
  if (ar?.name) return String(ar.name)
  return 'aroma-' + Math.random().toString(36).slice(2, 8)
}

const aromasDisponibles = computed(() => {
  const raw = productoElegido.value?.fragrances || []
  const seen = new Set<string>()
  const out: any[] = []
  for (const ar of raw) {
    const key = aromaKey(ar)
    if (seen.has(key)) continue
    seen.add(key)
    out.push({ ...ar, _key: key })
  }
  return out
})

function esAromaSeleccionado(ar: any) {
  const sel = form.aroma
  if (!sel) return false
  return aromaKey(sel) === aromaKey(ar)
}

const cantidadNum = computed(() => Number(formText.cantidad))

const cantidadValida = computed(() => {
  const c = cantidadNum.value
  if (!Number.isFinite(c) || c < 1) return false
  if (stockTotal.value > 0 && c > stockTotal.value) return false
  return true
})

const subtotal = computed(() => {
  const c = cantidadValida.value ? cantidadNum.value : 1
  return c * minUnit(productoElegido.value)
})

/* Qué se mostrará como "diseño" en el resumen */
const disenioResumen = computed(() => {
  if (modoDiseno.value === 'subir') {
    return archivo.value ? archivo.value : 'Mi diseño (pendiente adjuntarlo)'
  }
  return plantilla.value?.name ? `Plantilla: ${plantilla.value.name}` : 'Usar plantilla de nuestra línea'
})

const textoResumen = computed(() => {
  const parts: string[] = []
  if (formText.texto) parts.push(formText.texto)
  if (formText.eventDate) parts.push(formText.eventDate)
  return parts.join(' · ')
})

/* WhatsApp resumen */
const whatsappUrl = computed(() => WHATSAPP_URL())

const whatsappResumen = computed(() => {
  const lines = [
    '¡Hola PITAYA LAB! 👋 Quiero cotizar recuerdos:',
    `🧴 Recuerdo: ${productoElegido.value?.name || ''}${productoElegido.value?.subtitle ? ' (' + productoElegido.value.subtitle + ')' : ''}`,
    `🌸 Aroma: ${form.aroma?.name || 'Por definir'}`,
    `📦 Cantidad: ${formText.cantidad} pzas`,
    `🏷️ Etiqueta: ${disenioResumen.value}${textoResumen.value ? ' · ' + textoResumen.value : ''}`,
    `📅 Evento: ${formText.eventDate || 'Por definir'}`,
    `💰 Total estimado: ${formatMXN(subtotal.value)}`,
    '',
    '¿Me confirman disponibilidad y programación?',
  ]
  return `${whatsappUrl.value}?text=${encodeURIComponent(lines.join('\n'))}`
})

/* Archivo etiqueta */
function onArchivo(ev: Event) {
  const file = (ev.target as HTMLInputElement)?.files?.[0]
  if (file) {
    archivo.value = file.name
    plantilla.value = null
    modoDiseno.value = 'subir'
  }
}
function seleccionarPlantilla(t: any) {
  plantilla.value = t
  archivo.value = null
  modoDiseno.value = 'plantilla'
}

/* Abrir checkout event via emit -> B2B modal en la página */
function abrirCheckoutEvento() {
  if (!cantidadValida.value || !productoElegido.value) return

  const payload = {
    type: 'event',
    envase: { nombre: productoElegido.value.name },
    fragancia: {
      nombre: form.aroma?.name || 'Por definir',
    },
    disenio: {
      id: modoDiseno.value === 'subir' ? 'custom' : 'plantilla',
      name: modoDiseno.value === 'subir' ? 'Diseño propio' : (plantilla.value?.name || 'Plantilla'),
      fileName: archivo.value,
    },
    textoPersonalizado: textoResumen.value || (formText.texto ? formText.texto : null),
    cantidad: cantidadNum.value,
    precioUnitario: minUnit(productoElegido.value),
    addonPremium: 0,
    premiumKit: false,
    total: subtotal.value,
    eventDate: formText.eventDate || null,
    leadTimeDays: leadTimeDays.value,
  }

  emit('order', payload)
}

onMounted(cargarRecuerdos)
</script>
