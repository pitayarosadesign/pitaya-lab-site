<template>
  <div class="space-y-4">
    <!-- Pregunta: ¿tiene variantes? -->
    <div class="flex items-center gap-4">
      <span class="text-sm font-medium text-gray-700">¿Este producto tiene variantes?</span>
      <div class="flex rounded-lg border border-gray-200 overflow-hidden">
        <button
          type="button"
          @click="setHasVariants(false)"
          class="px-4 py-2 text-sm font-medium transition-colors"
          :class="!hasVariants ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
        >No</button>
        <button
          type="button"
          @click="setHasVariants(true)"
          class="px-4 py-2 text-sm font-medium transition-colors"
          :class="hasVariants ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
        >Sí</button>
      </div>
    </div>

    <template v-if="hasVariants">
      <!-- Lista de dimensiones (hasta 2) -->
      <div v-for="(dim, di) in dimensions" :key="di" class="border border-gray-100 rounded-xl p-4 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-gray-800">
            {{ dim.type === 'Aroma' ? 'Aroma' : (dim.customName || 'Opción') }}
          </h3>
          <button type="button" @click="removeDimension(di)" class="text-xs text-red-500 hover:text-red-700 font-medium">Quitar</button>
        </div>

        <!-- Tipo de dimensión -->
        <div class="flex items-center gap-2">
          <label class="text-xs font-medium text-gray-500 w-24">Tipo</label>
          <select v-model="dim.type" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm">
            <option value="custom">Otra (personalizada)</option>
            <option v-if="allowAroma" value="Aroma">Aroma</option>
          </select>
        </div>

        <!-- Si es personalizada, pedir nombre del tipo -->
        <div v-if="dim.type === 'custom'" class="flex items-center gap-2">
          <label class="text-xs font-medium text-gray-500 w-24">Nombre</label>
          <input
            v-model="dim.customName"
            type="text"
            placeholder="Ej: Color, Tamaño, Presentación…"
            class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
          />
        </div>

        <!-- Valores de la dimensión -->
        <div class="flex items-start gap-2">
          <label class="text-xs font-medium text-gray-500 w-24 pt-2">Valores</label>
          <div class="flex-1 space-y-2">
            <!-- Selector de aromas (si tipo = Aroma) -->
            <div v-if="dim.type === 'Aroma'">
              <div v-if="loadingProfiles" class="text-sm text-gray-400">Cargando aromas...</div>
              <div v-else-if="scents.length === 0" class="text-sm text-gray-400">No hay perfiles aromáticos configurados.</div>
              <div v-else class="flex flex-wrap gap-2">
                <button
                  v-for="scent in scents"
                  :key="scent.id"
                  type="button"
                  @click="toggleDimScent(di, scent)"
                  class="px-3 py-1.5 rounded-lg border text-sm transition-all"
                  :class="dim.scentIds.includes(scent.id)
                    ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'"
                >
                  {{ scent.emoji }} {{ scent.name }}
                </button>
              </div>
            </div>

            <!-- Valores personalizados (si tipo = custom) -->
            <div v-else>
              <div v-if="dim.customValues.length > 0" class="flex flex-wrap gap-2">
                <span
                  v-for="(val, vi) in dim.customValues"
                  :key="vi"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 border border-primary-200 text-primary-700 text-sm"
                >
                  {{ val }}
                  <button type="button" @click="dim.customValues.splice(vi, 1)" class="text-primary-400 hover:text-primary-700">✕</button>
                </span>
              </div>
              <div class="flex gap-2 mt-2">
                <input
                  v-model="dim.newValue"
                  type="text"
                  :placeholder="`Ej: ${dim.customName || 'valor'}…`"
                  class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
                  @keyup.enter="addDimValue(di)"
                />
                <button type="button" @click="addDimValue(di)" class="px-3 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700">+ Agregar</button>
                <button
                  type="button"
                  @click="toggleBulk(di)"
                  class="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
                >{{ dim.bulkOpen ? 'Ocultar' : 'Carga masiva' }}</button>
              </div>

              <!-- Carga masiva: pega varios valores (coma o salto de línea) -->
              <div v-if="dim.bulkOpen" class="mt-2 rounded-lg border border-primary-100 bg-primary-50/40 p-3 space-y-2">
                <p class="text-xs text-gray-500">
                  Pega tus valores separados por <b>coma</b> o <b>salto de línea</b>:
                </p>
                <textarea
                  v-model="dim.bulkText"
                  rows="5"
                  placeholder="Rojo&#10;Azul&#10;Verde&#10;&#10;O: Rojo, Azul, Verde"
                  class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"
                ></textarea>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    @click="applyBulk(di)"
                    class="px-3 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700"
                  >Agregar todos</button>
                  <button
                    type="button"
                    @click="dim.bulkOpen = false"
                    class="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50"
                  >Cancelar</button>
                  <span class="text-xs text-gray-400 ml-auto">{{ bulkCount(dim) }} valor(es) detectado(s)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón agregar dimensión -->
      <button
        v-if="dimensions.length < 2"
        type="button"
        @click="addDimension()"
        class="text-sm font-medium text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
      >
        + Agregar {{ dimensions.length === 0 ? 'dimensión' : '2ª dimensión' }} (ej. Color, Tamaño…)
      </button>

      <!-- Combinaciones generadas -->
      <div v-if="combos.length > 0" class="border border-gray-100 rounded-xl overflow-hidden">
        <div class="px-4 py-3 bg-gray-50 border-b border-gray-100">
          <h3 class="text-sm font-semibold text-gray-800">Combinaciones ({{ combos.length }})</h3>
          <p class="text-xs text-gray-400 mt-0.5">Cada combinación tendrá su propio precio, stock y SKU en la tienda.</p>
        </div>
        <div class="divide-y divide-gray-100">
          <div v-for="combo in combos" :key="combo.label" class="px-4 py-3 flex items-center gap-3">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800">{{ combo.label }}</p>
              <p class="text-[10px] text-gray-400 font-mono">{{ combo.sku }}</p>
            </div>
            <div class="flex items-center gap-2">
              <input
                :value="comboMeta[combo.label]?.price ?? ''"
                @input="setComboField(combo.label, 'price', $event.target.value)"
                type="number"
                min="0"
                step="0.01"
                placeholder="Precio"
                class="w-24 px-2 py-1.5 rounded-md border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
              />
              <input
                :value="comboMeta[combo.label]?.stock ?? ''"
                @input="setComboField(combo.label, 'stock', $event.target.value)"
                type="number"
                min="0"
                placeholder="Stock"
                class="w-20 px-2 py-1.5 rounded-md border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </template>

    <p v-if="!hasVariants" class="text-xs text-gray-400">
      Sin variantes, el producto se vende tal cual con su precio y stock generales.
    </p>
  </div>
</template>

<script setup>
/**
 * 🧩 Editor de Variantes por Dimensiones (reutilizable)
 * ---------------------------------------------------
 * Permite crear hasta 2 dimensiones de variante por producto. Cada dimensión
 * puede ser "Aroma" (biblioteca de fragancias) o personalizada (valores
 * libres: Color, Tamaño, Tipo…), generando combinaciones con precio/stock.
 *
 * Uso:
 *   <FormsVariantOptionsEditor
 *     v-model:has-variants="hasVariants"
 *     v-model:dimensions="dimensions"
 *     v-model:combo-meta="comboMeta"
 *     :scents="allScents"
 *     :allow-aroma="false"
 *     :base-sku="form.sku"
 *   />
 *
 * El padre controla el estado. `buildPayload()` (vía ref) devuelve el objeto
 * `variantOptions` listo para enviar al API. `comboMeta` guarda
 * { price, stock } por etiqueta de combinación.
 */
import { ref, computed, watch } from 'vue'

const props = defineProps({
  hasVariants: { type: Boolean, default: false },
  dimensions: { type: Array, default: () => [] },
  /** Mapa { label: { price, stock } } con los valores por combinación */
  comboMeta: { type: Object, default: () => ({}) },
  /** Perfiles aromáticos disponibles para la dimensión "Aroma" */
  scents: { type: Array, default: () => [] },
  /** Si se permite la dimensión especial "Aroma" */
  allowAroma: { type: Boolean, default: false },
  /** SKU base del producto (para prefijar el SKU de cada combinación) */
  baseSku: { type: String, default: '' },
  /** Cargando perfiles aromáticos */
  loadingProfiles: { type: Boolean, default: false },
})

const emit = defineEmits([
  'update:hasVariants',
  'update:dimensions',
  'update:comboMeta',
])

// Estado local espejo (se sincroniza con el padre vía watch + emit)
const hasVariants = ref(props.hasVariants)
const dimensions = ref(props.dimensions || [])
const comboMeta = ref({ ...(props.comboMeta || {}) })

// Sincronía entrante (padre -> componente)
watch(() => props.hasVariants, (v) => { hasVariants.value = v })
watch(() => props.dimensions, (v) => { if (v !== dimensions.value) dimensions.value = v })
watch(() => props.comboMeta, (v) => { comboMeta.value = { ...v } }, { deep: true })

// Sincronía saliente (componente -> padre)
watch(hasVariants, (v) => emit('update:hasVariants', v))
watch(dimensions, (v) => emit('update:dimensions', v), { deep: true })
watch(comboMeta, (v) => emit('update:comboMeta', { ...v }), { deep: true })

function setHasVariants(v) {
  hasVariants.value = v
}

function setComboField(label, field, value) {
  comboMeta.value = {
    ...comboMeta.value,
    [label]: { ...(comboMeta.value[label] || {}), [field]: value },
  }
}

function addDimension() {
  if (dimensions.value.length >= 2) return
  dimensions.value.push({
    type: 'custom',       // 'Aroma' | 'custom'
    customName: '',       // nombre si type === 'custom' (ej. 'Color')
    scentIds: [],         // ids de aromas seleccionados (si type === 'Aroma')
    customValues: [],     // valores personalizados (si type === 'custom')
    newValue: '',         // input temporal para agregar valor
    bulkOpen: false,      // ¿panel de carga masiva abierto?
    bulkText: '',         // texto pegado para carga masiva
  })
}

function removeDimension(di) {
  dimensions.value.splice(di, 1)
}

function dimValues(dim) {
  return dim.type === 'Aroma' ? dim.scentIds : dim.customValues
}

function dimTypeName(dim) {
  if (dim.type === 'Aroma') return 'Aroma'
  return dim.customName || 'Opción'
}

function scentNameById(id) {
  const s = props.scents.find(x => x.id === id)
  return s ? s.name : id
}

function slugify(str) {
  return String(str || '').toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

function toggleDimScent(di, scent) {
  const dim = dimensions.value[di]
  if (!dim) return
  const idx = dim.scentIds.indexOf(scent.id)
  if (idx >= 0) dim.scentIds.splice(idx, 1)
  else dim.scentIds.push(scent.id)
}

function addDimValue(di) {
  const dim = dimensions.value[di]
  if (!dim) return
  const v = (dim.newValue || '').trim()
  if (v && !dim.customValues.includes(v)) dim.customValues.push(v)
  dim.newValue = ''
}

// ===== Carga masiva de valores =====
// Divide el texto pegado por coma o salto de línea, limpia espacios y
// agrega los valores sin duplicados (ni contra los ya existentes).
function parseBulk(text) {
  return String(text || '')
    .split(/[\n,]+/)
    .map(s => s.trim())
    .filter(Boolean)
}

function bulkCount(dim) {
  return parseBulk(dim?.bulkText).length
}

function toggleBulk(di) {
  const dim = dimensions.value[di]
  if (!dim) return
  dim.bulkOpen = !dim.bulkOpen
}

function applyBulk(di) {
  const dim = dimensions.value[di]
  if (!dim) return
  for (const v of parseBulk(dim.bulkText)) {
    if (!dim.customValues.includes(v)) dim.customValues.push(v)
  }
  dim.bulkText = ''
  dim.bulkOpen = false
}

// Combinaciones generadas (producto cartesiano de las dimensiones).
const combos = computed(() => {
  const dims = dimensions.value
  if (dims.length === 0) return []

  const baseSku = props.baseSku || 'PROD'
  const out = []

  const build = (idx, acc) => {
    if (idx === dims.length) {
      const labels = acc.map((a, i) => dims[i].type === 'Aroma' ? scentNameById(a) : String(a))
      const label = labels.join(' · ')
      const skuSuffix = labels.map(slugify).join('-')
      out.push({
        label,
        values: [...acc],
        sku: `${baseSku}-${skuSuffix}`,
      })
      return
    }
    dimValues(dims[idx]).forEach(v => build(idx + 1, [...acc, v]))
  }

  build(0, [])
  return out
})

// Construye el payload `variantOptions` listo para el API.
function buildPayload() {
  if (!hasVariants.value) return null
  const list = combos.value
  if (list.length === 0) return null
  const dims = dimensions.value
  return {
    type1: dims[0] ? dimTypeName(dims[0]) : null,
    type2: dims[1] ? dimTypeName(dims[1]) : null,
    isAroma1: dims[0]?.type === 'Aroma',
    isAroma2: dims[1]?.type === 'Aroma',
    combinations: list.map(c => {
      const meta = comboMeta.value[c.label] || {}
      const price = (meta.price === '' || meta.price == null) ? null : parseFloat(meta.price)
      const stock = (meta.stock === '' || meta.stock == null) ? 0 : (parseInt(meta.stock) || 0)
      return {
        value1: c.values[0] ?? null,
        value2: c.values[1] ?? null,
        label: c.label,
        sku: c.sku,
        price,
        stock,
      }
    }),
  }
}

defineExpose({ buildPayload })
</script>
