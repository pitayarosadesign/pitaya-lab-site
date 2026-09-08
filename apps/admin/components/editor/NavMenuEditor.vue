<template>
  <div class="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold text-gray-900">🧭 Menú de Navegación</h2>
        <p class="text-sm text-gray-500 mt-0.5">Los enlaces que aparecen en la barra superior de la tienda.</p>
      </div>
      <button
        @click="saveMenu"
        :disabled="saving"
        class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
      >
        {{ saving ? 'Guardando...' : '💾 Guardar menú' }}
      </button>
    </div>

    <!-- Lista de enlaces -->
    <div class="space-y-2">
      <div
        v-for="(link, index) in links"
        :key="index"
        class="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50/50"
      >
        <div class="flex flex-col gap-0.5">
          <button type="button" @click="move(index, -1)" :disabled="index === 0" class="text-gray-400 hover:text-gray-600 disabled:opacity-25 text-xs leading-none">▲</button>
          <button type="button" @click="move(index, 1)" :disabled="index === links.length - 1" class="text-gray-400 hover:text-gray-600 disabled:opacity-25 text-xs leading-none">▼</button>
        </div>
        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
          <input v-model="link.label" type="text" placeholder="Etiqueta (ej. Catálogo)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <input v-model="link.path" type="text" placeholder="/ruta" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono" />
        </div>
        <button type="button" @click="remove(index)" class="text-red-400 hover:text-red-600 text-sm px-1" title="Quitar">✕</button>
      </div>
    </div>

    <!-- Agregar enlace -->
    <div class="border-t border-gray-100 pt-4">
      <p class="text-sm font-medium text-gray-700 mb-2">Agregar enlace</p>
      <div class="flex flex-col md:flex-row gap-2">
        <select v-model="preset" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm bg-white">
          <option value="">— Elegir página existente —</option>
          <optgroup label="Páginas fijas">
            <option v-for="p in staticPages" :key="p.path" :value="p.path">{{ p.label }}</option>
          </optgroup>
          <optgroup v-if="customPages.length" label="Páginas personalizadas">
            <option v-for="p in customPages" :key="p.slug" :value="`/paginas/${p.slug}`">{{ p.title }}</option>
          </optgroup>
        </select>
        <button
          @click="addPreset"
          class="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-100 transition-colors"
        >+ Agregar</button>
      </div>
      <p class="text-xs text-gray-400 mt-2">
        También puedes escribir una etiqueta y ruta manuales en la lista y guardar.
      </p>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()

const links = ref([])
const saving = ref(false)
const preset = ref('')
const customPages = ref([])

// Páginas fijas de la tienda (rutas estáticas)
const staticPages = [
  { label: 'Inicio', path: '/' },
  { label: 'Sobre Nosotros', path: '/about' },
  { label: 'Nuestra Filosofía', path: '/philosophy' },
  { label: 'Guía de Fragancias', path: '/fragrancias' },
  { label: 'Catálogo', path: '/catalog' },
  { label: 'Recuerdos', path: '/recuerdos' },
  { label: 'Mayoreo & Corporativo', path: '/b2b' },
  { label: 'Contacto', path: '/contact' },
  { label: 'FAQ', path: '/faq' },
]

async function loadMenu() {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'nav_links')
      .maybeSingle()
    if (error) throw error
    if (data?.value && Array.isArray(data.value) && data.value.length) {
      links.value = data.value.map(l => ({ label: l.label || '', path: l.path || '' }))
    } else {
      // Fallback: enlaces por defecto
      links.value = staticPages.map(p => ({ ...p }))
    }
  } catch (e) {
    console.warn('No se pudo cargar el menú:', e.message)
    links.value = staticPages.map(p => ({ ...p }))
  }
}

async function loadCustomPages() {
  try {
    const { data, error } = await supabase
      .from('pages')
      .select('slug, title')
      .eq('published', true)
      .order('sort_order', { ascending: true })
    if (error) throw error
    customPages.value = data || []
  } catch (e) {
    console.warn('No se pudieron cargar las páginas personalizadas:', e.message)
    customPages.value = []
  }
}

function addPreset() {
  if (!preset.value) return
  const existing = staticPages.find(p => p.path === preset.value)
  const custom = customPages.value.find(p => `/paginas/${p.slug}` === preset.value)
  const label = existing?.label || custom?.title || preset.value
  // Evitar duplicados
  if (links.value.some(l => l.path === preset.value)) {
    alert('Ese enlace ya está en el menú')
    return
  }
  links.value.push({ label, path: preset.value })
  preset.value = ''
}

function remove(index) {
  links.value.splice(index, 1)
}

function move(index, delta) {
  const to = index + delta
  if (to < 0 || to >= links.value.length) return
  const [moved] = links.value.splice(index, 1)
  links.value.splice(to, 0, moved)
}

async function saveMenu() {
  // Filtrar enlaces vacíos
  const clean = links.value
    .filter(l => l.label.trim() && l.path.trim())
    .map(l => ({ label: l.label.trim(), path: l.path.trim() }))

  if (!clean.length) {
    alert('El menú no puede quedar vacío')
    return
  }

  saving.value = true
  try {
    await $fetch('/api/site/config', {
      method: 'PUT',
      body: { entries: [{ key: 'nav_links', value: clean }] },
    })
    alert('✅ Menú de navegación guardado')
  } catch (e) {
    console.error('Error guardando menú:', e)
    alert('Error al guardar el menú: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadMenu()
  loadCustomPages()
})
</script>
