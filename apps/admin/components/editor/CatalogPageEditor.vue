<template>
  <div class="space-y-6">
    <!-- Control de Bloques de la página (mostrar/ocultar y compactar) -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">🧱</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Bloques de la página</h3>
          <p class="text-sm text-gray-500">Activa, desactiva o compacta cada bloque del catálogo</p>
        </div>
      </div>
      <div class="p-6 space-y-3">
        <div v-for="block in blockInfo" :key="block.key" class="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
          <div>
            <p class="text-sm font-medium text-gray-800">{{ block.label }}</p>
            <p class="text-xs text-gray-400">{{ block.desc }}</p>
          </div>
          <div class="flex items-center gap-3">
            <!-- Toggle mostrar/ocultar -->
            <label class="flex items-center gap-2 cursor-pointer select-none">
              <span class="text-xs font-medium text-gray-500">Mostrar</span>
              <button
                type="button"
                @click="toggleBlock(block.key)"
                class="relative w-10 h-5 rounded-full transition-colors"
                :class="getBlock(block.key).enabled ? 'bg-primary-600' : 'bg-gray-300'"
              >
                <span class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform" :class="getBlock(block.key).enabled ? 'translate-x-5' : ''" />
              </button>
            </label>
            <!-- Opción compacta (solo encabezado) -->
            <label v-if="block.key === 'header'" class="flex items-center gap-1.5 cursor-pointer select-none">
              <span class="text-xs font-medium text-gray-500">Compacto</span>
              <input
                type="checkbox"
                :checked="!!getBlock(block.key).compact"
                @change="setBlockCompact(block.key, !getBlock(block.key).compact)"
                class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Header de la página -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">🛍️</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Encabezado del Catálogo</h3>
          <p class="text-sm text-gray-500">Título y descripción de la parte superior de la página</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Badge</label>
            <input v-model="model.header.badge" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input v-model="model.header.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Palabra resaltada</label>
            <input v-model="model.header.highlight" type="text" placeholder="Productos" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
            <p class="text-xs text-gray-400 mt-1">Se muestra con degradado de color en el título</p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="model.header.description" rows="3" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
      </div>
    </div>

    <!-- Guía de Aromas -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">🌿</span>
        <div class="flex-1">
          <h3 class="text-lg font-bold text-gray-900">Guía de Aromas</h3>
          <p class="text-sm text-gray-500">La tabla de aromas al final del catálogo</p>
        </div>
        <!-- Toggle para mostrar/ocultar la sección -->
        <label class="flex items-center gap-2 cursor-pointer select-none">
          <span class="text-sm font-medium text-gray-600">Mostrar</span>
          <button
            type="button"
            @click="model.scent_guide.enabled = !model.scent_guide.enabled"
            class="relative w-11 h-6 rounded-full transition-colors"
            :class="model.scent_guide.enabled ? 'bg-primary-600' : 'bg-gray-300'"
          >
            <span
              class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
              :class="model.scent_guide.enabled ? 'translate-x-5' : ''"
            />
          </button>
        </label>
      </div>
      <div v-if="model.scent_guide.enabled" class="p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Badge</label>
            <input v-model="model.scent_guide.badge" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input v-model="model.scent_guide.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="model.scent_guide.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Disclaimer (nota legal)</label>
          <textarea v-model="model.scent_guide.disclaimer" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          <p class="text-xs text-gray-400 mt-1">Se muestra debajo de la tabla de aromas</p>
        </div>
      </div>
    </div>

    <!-- CTA Amazon -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">🚀</span>
        <div>
          <h3 class="text-lg font-bold text-gray-900">CTA Final (Amazon)</h3>
          <p class="text-sm text-gray-500">Banner de llamada a la acción al final de la página</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="model.cta.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="model.cta.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
            <input v-model="model.cta.button_text" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Link del botón</label>
            <input v-model="model.cta.button_link" type="url" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const model = defineModel({ type: Object, required: true })

// Garantizar que model.blocks exista siempre (para configs antiguas sin `blocks`)

if (!model.value.blocks || typeof model.value.blocks !== 'object') {
  model.value.blocks = {
    header: { enabled: true, compact: false },
    filters: { enabled: true },
    olfactory: { enabled: true },
    grid: { enabled: true },
    scent_guide: { enabled: true },
    cta: { enabled: true },
  }
}

// Definición de bloques para la UI
const blockInfo = [
  { key: 'header', label: '🧱 Encabezado', desc: 'Título y descripción superior' },
  { key: 'filters', label: '🔍 Filtros', desc: 'Barra de búsqueda y filtros' },
  { key: 'olfactory', label: '🌸 Panel olfativo', desc: 'Experiencia del aroma seleccionado' },
  { key: 'grid', label: '📦 Grid de productos', desc: 'Cuadrícula de productos' },
  { key: 'scent_guide', label: '🌿 Guía de aromas', desc: 'Tabla de aromas por mood' },
  { key: 'cta', label: '🚀 CTA (Amazon)', desc: 'Banner final de llamada a la acción' },
]

// Devuelve el bloque garantizando que exista (con enabled default true)
function getBlock(key) {
  const b = model.value.blocks[key]
  if (!b || typeof b !== 'object') {
    model.value.blocks[key] = { enabled: true }
  }
  return model.value.blocks[key]
}

function toggleBlock(key) {
  const b = getBlock(key)
  b.enabled = !b.enabled
}

function setBlockCompact(key, val) {
  const b = getBlock(key)
  b.compact = !!val
}
</script>

