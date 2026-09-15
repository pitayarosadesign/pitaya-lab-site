<template>
  <div class="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold text-gray-900">🧭 Menú de Navegación</h2>
        <p class="text-sm text-gray-500 mt-0.5">Los enlaces de la barra superior. Cada entrada puede tener un submenú (p. ej. Catálogo → categorías).</p>
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
    <div class="space-y-3">
      <div
        v-for="(link, index) in links"
        :key="index"
        class="rounded-xl border border-gray-200 bg-gray-50/50 p-3 space-y-3"
      >
        <!-- Fila principal -->
        <div class="flex items-center gap-3">
          <div class="flex flex-col gap-0.5">
            <button type="button" @click="move(index, -1)" :disabled="index === 0" class="text-gray-400 hover:text-gray-600 disabled:opacity-25 text-xs leading-none" title="Subir">▲</button>
            <button type="button" @click="move(index, 1)" :disabled="index === links.length - 1" class="text-gray-400 hover:text-gray-600 disabled:opacity-25 text-xs leading-none" title="Bajar">▼</button>
          </div>
          <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
            <input v-model="link.label" type="text" placeholder="Etiqueta (ej. Catálogo)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <input v-model="link.path" type="text" placeholder="/ruta" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono" />
          </div>
          <button type="button" @click="remove(index)" class="text-red-400 hover:text-red-600 text-sm px-1" title="Quitar">✕</button>
        </div>

        <!-- Submenú -->
        <div class="pl-6 border-l-2 border-primary-100 space-y-2">
          <div class="flex items-center justify-between gap-2">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Submenú</p>
            <div class="flex items-center gap-2">
              <button type="button" @click="addAllCatalogPresets(link)" class="text-xs font-medium text-primary-600 hover:text-primary-700">+ Categorías y Todos</button>
              <button type="button" @click="addChild(link)" class="text-xs font-medium text-primary-600 hover:text-primary-700">+ Sub-enlace manual</button>
            </div>
          </div>

          <!-- Preset rápido -->
          <div class="flex items-center gap-2">
            <select v-model="link._preset" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm bg-white">
              <option value="">— Predefinido: todos / categoría —</option>
              <option v-for="p in catalogPresets" :key="p.path" :value="p.path">{{ p.label }}</option>
            </select>
            <button type="button" @click="addChildPreset(link)" class="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-100 transition-colors">+</button>
          </div>

          <!-- Hijos -->
          <div v-for="(child, ci) in link.children" :key="ci" class="flex items-center gap-2">
            <div class="flex flex-col gap-0.5">
              <button type="button" @click="moveChild(link, ci, -1)" :disabled="ci === 0" class="text-gray-400 hover:text-gray-600 disabled:opacity-25 text-xs leading-none" title="Subir">▲</button>
              <button type="button" @click="moveChild(link, ci, 1)" :disabled="ci === link.children.length - 1" class="text-gray-400 hover:text-gray-600 disabled:opacity-25 text-xs leading-none" title="Bajar">▼</button>
            </div>
            <input v-model="child.label" type="text" placeholder="Etiqueta del sub-enlace" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <input v-model="child.path" type="text" placeholder="/catalog?categoria=velas" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono" />
            <button type="button" @click="removeChild(link, ci)" class="text-red-400 hover:text-red-600 text-sm px-1" title="Quitar">✕</button>
          </div>
          <p v-if="!link.children.length" class="text-xs text-gray-400">Sin sub-enlaces.</p>
        </div>
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
const categories = ref([])

// Páginas fijas de la tienda (rutas estáticas)
const staticPages = [
  { label: 'Inicio', path: '/' },
  { label: 'Sobre Nosotros', path: '/about' },
  { label: 'Nuestra Filosofía', path: '/philosophy' },
  { label: 'Catálogo', path: '/catalog' },
  { label: 'Recuerdos', path: '/catalog?categoria=recuerdos' },
  { label: 'Mayoreo & Corporativo', path: '/b2b' },
  { label: 'Contacto', path: '/contact' },
  { label: 'FAQ', path: '/faq' },
]

// Presets rápidos para submenús: "Todos los productos" + categorías del catálogo.
const catalogPresets = computed(() => [
  { label: 'Todos los productos', path: '/catalog' },
  ...categories.value.map(c => ({ label: c.name, path: `/catalog?categoria=${c.slug}` })),
])

function normalizeLink(l) {
  return {
    label: l.label || '',
    path: l.path || '',
    children: Array.isArray(l.children)
      ? l.children.map(c => ({ label: c.label || '', path: c.path || '' }))
      : [],
    _preset: '',
  }
}

async function loadMenu() {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'nav_links')
      .maybeSingle()
    if (error) throw error
    if (data?.value && Array.isArray(data.value) && data.value.length) {
      links.value = data.value.map(normalizeLink)
    } else {
      links.value = staticPages.map(p => ({ ...p, children: [], _preset: '' }))
    }
  } catch (e) {
    console.warn('No se pudo cargar el menú:', e.message)
    links.value = staticPages.map(p => ({ ...p, children: [], _preset: '' }))
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

async function loadCategories() {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('slug, name')
      .order('name', { ascending: true })
    if (error) throw error
    categories.value = data || []
  } catch (e) {
    console.warn('No se pudieron cargar las categorías:', e.message)
    categories.value = []
  }
}

function addPreset() {
  if (!preset.value) return
  const existing = staticPages.find(p => p.path === preset.value)
  const custom = customPages.value.find(p => `/paginas/${p.slug}` === preset.value)
  const label = existing?.label || custom?.title || preset.value
  if (links.value.some(l => l.path === preset.value)) {
    alert('Ese enlace ya está en el menú')
    return
  }
  links.value.push({ label, path: preset.value, children: [], _preset: '' })
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

function addChild(link) {
  if (!Array.isArray(link.children)) link.children = []
  link.children.push({ label: '', path: '' })
}

function removeChild(link, ci) {
  if (Array.isArray(link.children)) link.children.splice(ci, 1)
}

function moveChild(link, ci, delta) {
  const to = ci + delta
  if (!Array.isArray(link.children) || to < 0 || to >= link.children.length) return
  const [moved] = link.children.splice(ci, 1)
  link.children.splice(to, 0, moved)
}

function addChildPreset(link) {
  const presetPath = link._preset
  if (!presetPath) return
  const p = catalogPresets.value.find(c => c.path === presetPath)
  if (!p) return
  if (!Array.isArray(link.children)) link.children = []
  if (!link.children.some(c => c.path === p.path)) {
    link.children.push({ label: p.label, path: p.path })
  }
  link._preset = ''
}

function addAllCatalogPresets(link) {
  if (!Array.isArray(link.children)) link.children = []
  const existing = new Set(link.children.map(c => c.path))
  for (const p of catalogPresets.value) {
    if (!existing.has(p.path)) {
      link.children.push({ label: p.label, path: p.path })
    }
  }
}

async function saveMenu() {
  const clean = links.value
    .map(l => ({
      label: l.label.trim(),
      path: l.path.trim(),
      children: (Array.isArray(l.children) ? l.children : [])
        .filter(c => c.label.trim() && c.path.trim())
        .map(c => ({ label: c.label.trim(), path: c.path.trim() })),
    }))
    .filter(l => l.label && l.path)

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
  loadCategories()
})
</script>
