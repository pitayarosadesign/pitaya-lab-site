<template>
  <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
    <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
      <span class="text-2xl">🗂️</span>
      <div>
        <h3 class="text-lg font-bold text-gray-900">Páginas fijas del sitio</h3>
        <p class="text-sm text-gray-500">Oculta, redirige o reactiva páginas que están por defecto, sin tocar código.</p>
      </div>
    </div>

    <div class="p-6 space-y-3">
      <div
        v-for="p in pages"
        :key="p.path"
        class="flex flex-col md:flex-row md:items-center gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50/40"
      >
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-gray-800">{{ p.label }}</p>
          <p class="text-xs font-mono text-gray-400">{{ p.path }}</p>
        </div>

        <select
          v-model="p.status"
          class="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:border-primary-400 focus:outline-none"
        >
          <option value="visible">Visible</option>
          <option value="hidden">Oculta (404)</option>
          <option value="redirect">Redirigir (301)</option>
        </select>

        <input
          v-if="p.status === 'redirect'"
          v-model="p.target"
          type="text"
          placeholder="/catalog o https://..."
          class="px-3 py-2 rounded-lg border border-gray-200 text-sm font-mono w-full md:w-64 focus:border-primary-400 focus:outline-none"
        />
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-100">
        <p class="text-xs text-gray-400">Las páginas ocultas devuelven 404; las redirigidas hacen 301 a la URL indicada.</p>
        <button
          @click="save"
          :disabled="saving"
          class="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          {{ saving ? 'Guardando...' : '💾 Guardar páginas' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Rutas estáticas de la tienda que se pueden ocultar/redirigir desde el CMS.
// No incluye rutas dinámicas (/product/[slug], /paginas/[slug], checkout) ni la home.
const STATIC_PAGES = [
  { path: '/about', label: 'Sobre Nosotros' },
  { path: '/philosophy', label: 'Nuestra Filosofía' },
  { path: '/fragrancias', label: 'Guía de Fragancias' },
  { path: '/catalog', label: 'Catálogo' },
  { path: '/b2b', label: 'Mayoreo & Corporativo' },
  { path: '/faq', label: 'Preguntas Frecuentes' },
  { path: '/contact', label: 'Contacto' },
  { path: '/resena', label: 'Reseñas' },
  { path: '/privacy', label: 'Aviso de Privacidad' },
  { path: '/terms', label: 'Términos y Condiciones' },
  { path: '/maintenance', label: 'Mantenimiento' },
]

const supabase = useSupabase()
const saving = ref(false)
const pages = ref(STATIC_PAGES.map(p => ({ ...p, status: 'visible', target: '' })))

async function load() {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'pages_visibility')
      .maybeSingle()
    if (error) throw error

    const v = data?.value || {}
    const hidden = Array.isArray(v.hidden) ? v.hidden : []
    const redirects = v.redirects && typeof v.redirects === 'object' ? v.redirects : {}

    pages.value = STATIC_PAGES.map(p => {
      if (hidden.includes(p.path)) return { ...p, status: 'hidden', target: '' }
      if (redirects[p.path]) return { ...p, status: 'redirect', target: redirects[p.path] }
      return { ...p, status: 'visible', target: '' }
    })
  } catch (e) {
    console.warn('No se pudieron cargar las páginas fijas:', e.message)
  }
}

async function save() {
  const hidden = pages.value.filter(p => p.status === 'hidden').map(p => p.path)
  const redirects = {}
  pages.value
    .filter(p => p.status === 'redirect' && p.target?.trim())
    .forEach(p => { redirects[p.path] = p.target.trim() })

  saving.value = true
  try {
    await $fetch('/api/site/config', {
      method: 'PUT',
      body: { entries: [{ key: 'pages_visibility', value: { hidden, redirects } }] },
    })
    alert('✅ Visibilidad de páginas guardada')
  } catch (e) {
    console.error('Error guardando páginas:', e)
    alert('Error al guardar: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
