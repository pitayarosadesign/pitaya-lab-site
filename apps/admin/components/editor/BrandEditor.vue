<template>
  <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
    <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
      <span class="text-2xl">🏷️</span>
      <div>
        <h3 class="text-lg font-bold text-gray-900">Marca</h3>
        <p class="text-sm text-gray-500">Nombre, eslogan y logo que se muestran en el encabezado y pie de página.</p>
      </div>
    </div>

    <div class="p-6 space-y-6">
      <!-- Vista previa -->
      <div class="flex items-center gap-4">
        <span
          v-if="previewSvg"
          role="img"
          aria-label="Logo SVG"
          class="w-16 h-16 inline-block shrink-0 leading-none"
          :style="{ color: form.logo_color || '#0f766e' }"
          v-html="previewSvg"
        />
        <img
          v-else-if="form.logo_url"
          :src="form.logo_url"
          alt="Logo de la marca"
          class="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm"
        />
        <div
          v-else
          class="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-400"
        >
          Sin logo
        </div>
        <p class="text-xs text-gray-400">Así se ve el logo en el menú superior.</p>
      </div>

      <!-- Datos base -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="PITAYA LAB"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Eslogan</label>
          <input
            v-model="form.tagline"
            type="text"
            placeholder="Fragancias que conectan"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Logo raster (URL)</label>
          <input
            v-model="form.logo_url"
            type="text"
            placeholder="/images/brand/logo-pitayalab.png"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"
          />
          <p class="text-xs text-gray-400 mt-1">PNG/JPG. Se usa solo si no hay un SVG.</p>
        </div>
      </div>

      <!-- Logo SVG coloreable -->
      <div class="pt-5 border-t border-gray-100 space-y-4">
        <div>
          <p class="text-sm font-semibold text-gray-800">Logo SVG coloreable</p>
          <p class="text-xs text-gray-400 mt-0.5">
            Sube un SVG <strong>monocromo</strong> (un solo color). Al guardar, los rellenos se convierten a <code class="text-[11px]">currentColor</code> para que tome el color que elijas y el logo escale al contenedor.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <label class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-primary-400 cursor-pointer transition-all text-sm font-medium text-gray-700">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Subir SVG
            <input type="file" accept=".svg,image/svg+xml" class="hidden" @change="onSvgFile" />
          </label>
          <button
            v-if="form.logo_svg"
            type="button"
            @click="form.logo_svg = ''"
            class="text-xs text-red-500 hover:text-red-600 transition-colors"
          >
            Quitar SVG (usar raster)
          </button>
        </div>

        <div class="flex flex-wrap items-end gap-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Color del logo</label>
            <div class="flex items-center gap-2">
              <input
                v-model="form.logo_color"
                type="color"
                class="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer bg-white p-1"
              />
              <input
                v-model="form.logo_color"
                type="text"
                placeholder="#0f766e"
                class="w-28 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"
              />
            </div>
            <p class="text-xs text-gray-400 mt-1">Vacío = hereda el color del texto.</p>
          </div>
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Código SVG <span class="text-gray-400">(también puedes pegarlo aquí)</span></label>
          <textarea
            v-model="form.logo_svg"
            rows="5"
            placeholder='<svg viewBox="0 0 24 24">…</svg>'
            class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-xs font-mono resize-y"
          ></textarea>
        </div>
      </div>

      <div class="flex items-center justify-end pt-3 border-t border-gray-100">
        <button
          @click="save"
          :disabled="saving"
          class="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          {{ saving ? 'Guardando...' : '💾 Guardar marca' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const saving = ref(false)
const form = reactive({
  name: 'PITAYA LAB',
  tagline: 'Fragancias que conectan',
  logo_url: '/images/brand/logo-pitayalab.png',
  logo_svg: '',
  logo_color: '',
})

// Vista previa normalizada (monocromo + color) para ver el resultado real.
const previewSvg = computed(() => normalizeSvg(form.logo_svg))

function onSvgFile(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    form.logo_svg = normalizeSvg(String(reader.result || ''))
  }
  reader.readAsText(file)
  e.target.value = '' // permite volver a subir el mismo archivo
}

// Sanea el SVG y lo deja listo para colorear:
//  - elimina <script>, atributos on* y href javascript: (seguridad)
//  - convierte fill/stroke (excepto "none") a currentColor
//  - fuerza tamaño 100% preservando viewBox
function normalizeSvg(svg) {
  if (!svg || typeof svg !== 'string') return ''
  let out = svg
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/href\s*=\s*(["'])\s*javascript:[^"']*\1/gi, 'href="#"')
    .replace(/fill\s*=\s*("(?!none)[^"]*"|'(?!none)[^']*')/gi, 'fill="currentColor"')
    .replace(/stroke\s*=\s*("(?!none)[^"]*"|'(?!none)[^']*')/gi, 'stroke="currentColor"')
    .replace(/\swidth\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\sheight\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  return out.replace(/<svg\s/i, '<svg width="100%" height="100%" ')
}

async function load() {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'brand')
      .maybeSingle()
    if (error) throw error
    if (data?.value) Object.assign(form, data.value)
  } catch (e) {
    console.warn('No se pudo cargar la marca:', e.message)
  }
}

async function save() {
  saving.value = true
  try {
    // Normalizar el SVG antes de persistir para garantizar que sea coloreable.
    const payload = { ...form, logo_svg: normalizeSvg(form.logo_svg) }
    await $fetch('/api/site/config', {
      method: 'PUT',
      body: { entries: [{ key: 'brand', value: payload }] },
    })
    alert('✅ Marca guardada')
  } catch (e) {
    console.error('Error guardando marca:', e)
    alert('Error al guardar: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
