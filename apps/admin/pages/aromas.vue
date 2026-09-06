<template>
  <div class="p-6">
    <!-- Encabezado -->
    <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">🌾 Catálogo maestro de aromas</h1>
        <p class="text-sm text-gray-500 mt-1">
          Fragancias que se asignan a los productos como variantes. Gestiona la lista y recibe altas por CSV.
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button @click="triggerCsvInput" class="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          ⬆️ Subir CSV
        </button>
        <button @click="exportCsv" :disabled="busy" class="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          ⬇️ Exportar CSV
        </button>
        <button @click="openCreate()" class="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors">
          + Nuevo aroma
        </button>
        <input ref="csvInput" type="file" accept=".csv,text/csv" class="hidden" @change="onCsvFile" />
      </div>
    </div>

    <!-- Filtro + conteo -->
    <div class="flex flex-wrap items-center gap-2 mb-4 text-sm">
      <input v-model="q" placeholder="Buscar por nombre, tono, temporada…" class="px-3 py-2 rounded-lg border border-gray-200 w-64 focus:border-primary-400 focus:outline-none" />
      <select v-model="famFilter" class="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none bg-white">
        <option value="all">Todas las familias</option>
        <option value="floral">🌸 Floral</option>
        <option value="oriental">✨ Oriental</option>
        <option value="amaderada">🪵 Amaderada</option>
        <option value="citrica">🍋 Cítrica</option>
      </select>
      <span class="text-gray-400 font-medium bg-gray-100 px-3 py-2 rounded-lg">Total: {{ filtered.length }}</span>
    </div>

    <!-- Resultado import / export -->
    <div v-if="statusMsg" class="mb-4 text-sm rounded-lg px-4 py-3" :class="statusOk ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'">
      {{ statusMsg }}
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-100">
          <tr>
            <th class="px-4 py-3">Aroma</th>
            <th class="px-4 py-3">Familia</th>
            <th class="px-4 py-3">Colección/temporada</th>
            <th class="px-4 py-3">Inspiración</th>
            <th class="px-4 py-3">Slug</th>
            <th class="px-4 py-3">Activo</th>
            <th class="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in filtered" :key="a.id" class="border-t border-gray-100 hover:bg-gray-50/60">
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-earth-100 flex items-center justify-center text-lg shrink-0 overflow-hidden" :title="a.name">
                  <img v-if="a.image_url" :src="a.image_url" class="w-full h-full object-cover" :alt="a.name" />
                  <span v-else>{{ a.emoji || '🌸' }}</span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">{{ a.name }}</p>
                  <p v-if="a.subtitle" class="text-xs text-gray-400">{{ a.subtitle }}</p>
                </div>
              </div>
            </td>
            <td class="px-4 py-3">
              <span v-if="a.olfactive_family" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="familyBadge(a.olfactive_family)">
                {{ familyEmoji(a.olfactive_family) }} {{ familyLabel(a.olfactive_family) }}
              </span>
              <span v-else class="text-gray-300">—</span>
            </td>
            <td class="px-4 py-3">
              <span v-if="a.collection_tag" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-amber-50 text-amber-700 border border-amber-200">
                🏷️ {{ a.collection_tag }}
              </span>
              <span v-else class="text-gray-300">—</span>
            </td>
            <td class="px-4 py-3 text-gray-500 max-w-[200px] truncate">{{ a.inspiracion || '—' }}</td>
            <td class="px-4 py-3 font-mono text-xs text-gray-400">{{ a.slug }}</td>
            <td class="px-4 py-3">
              <span :class="a.is_active ? 'text-green-600' : 'text-gray-300'">{{ a.is_active ? '● Sí' : '○ No' }}</span>
            </td>
            <td class="px-4 py-3 text-right whitespace-nowrap">
              <button @click="openEdit(a)" class="text-primary-600 hover:text-primary-700 text-xs font-medium mr-3">✏️ Editar</button>
              <button @click="confirmDelete(a)" class="text-red-500 hover:text-red-600 text-xs font-medium">🗑️</button>
            </td>
          </tr>
          <tr v-if="!filtered.length">
            <td colspan="7" class="px-4 py-14 text-center text-gray-400">
              {{ loading ? 'Cargando aromas…' : 'Aún no hay aromas. Sube un CSV o crea el primero.' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ══ Modal alta / edición de aroma ══ -->
    <div v-if="showModal" class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" @click.self="closeModal">
      <div class="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-7 shadow-xl">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-800">{{ editingId ? '✏️ Editar aroma' : '✨ Nuevo aroma' }}</h2>
          <button @click="closeModal" class="text-2xl leading-none text-gray-400 hover:text-gray-600">&times;</button>
        </div>

        <form @submit.prevent="saveForm" class="space-y-4">
          <!-- Imagen -->
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 rounded-xl bg-earth-100 flex items-center justify-center text-3xl overflow-hidden" :title="form.name">
              <img v-if="form.imagePreview" :src="form.imagePreview" class="w-full h-full object-cover" alt="img" />
              <span v-else>{{ form.emoji || '🌸' }}</span>
            </div>
            <input ref="fileInput" type="file" accept="image/png,image/jpeg,image/webp" class="hidden" @change="onFileSelect" />
            <div>
              <button type="button" @click="fileInput?.click()" class="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">Subir imagen</button>
              <p class="text-xs text-gray-400 mt-1">PNG / JPG / WebP</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Nombre *</label>
              <input v-model="form.name" type="text" required placeholder="Ej. Xcaret" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 focus:outline-none text-sm" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Emoji</label>
              <input v-model="form.emoji" type="text" placeholder="🏝️" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 focus:outline-none text-sm text-center" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Slug <span class="text-gray-300">(auto si se deja en blanco)</span></label>
              <input v-model="form.slug" type="text" placeholder="xcaret" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 focus:outline-none text-sm font-mono" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Subtitle / descriptor</label>
              <input v-model="form.subtitle" type="text" placeholder="Ej. Resort tropical" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 focus:outline-none text-sm" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1">Experiencia / mood</label>
            <textarea v-model="form.experience" rows="2" placeholder="El aroma que evoca este perfil…" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 focus:outline-none text-sm" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1">Notas aromáticas <span class="font-normal text-gray-400">(SAL/COR/FONDO separadas por /)</span></label>
            <textarea v-model="form.notes" rows="2" placeholder="SAL. Cítricos / COR. Florales / FONDO. Maderas" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 focus:outline-none text-sm" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Familia olfativa</label>
              <select v-model="form.olfactive_family" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 focus:outline-none text-sm bg-white">
                <option value="">Sin clasificar</option>
                <option value="floral">🌸 Floral</option>
                <option value="oriental">✨ Oriental</option>
                <option value="amaderada">🪵 Amaderada</option>
                <option value="citrica">🍋 Cítrica</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Colección / temporada</label>
              <input v-model="form.collection_tag" type="text" list="scentTags" placeholder="Ej. Navidad, Otoño-Invierno…" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 focus:outline-none text-sm" />
              <datalist id="scentTags">
                <option v-for="t in scentTagSuggestions" :key="t" :value="t" />
              </datalist>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1">Inspiración <span class="text-gray-300">(destino / hotel / concepto clave)</span></label>
            <input v-model="form.inspiracion" type="text" placeholder="Ej. Grand Hotel, Xcaret, aldea mediterránea…" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 focus:outline-none text-sm" />
          </div>

          <div class="flex items-center justify-between pt-2">
            <label class="inline-flex items-center gap-2 text-sm text-gray-600">
              <input v-model="form.is_active" type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              Activo (visible para asignarse a productos)
            </label>
            <div class="flex gap-2">
              <button type="button" @click="closeModal" class="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100">Cancelar</button>
              <button type="submit" :disabled="saving" class="px-5 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold disabled:opacity-60">
                {{ saving ? 'Guardando…' : 'Guardar aroma' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ title: 'Aromas · Catálogo' })

const aromas = ref([])
const loading = ref(true)
const q = ref('')
const famFilter = ref('all')
const busy = ref(false)
const saving = ref(false)
const statusMsg = ref('')
const statusOk = ref(true)

const csvInput = ref(null)
const fileInput = ref(null)
const fileToRead = ref(null)

const showModal = ref(false)
const editingId = ref(null)

const emptyForm = () => ({
  name: '', slug: '', emoji: '🌸', subtitle: '',
  experience: '', notes: '', inspiracion: '',
  olfactive_family: '', collection_tag: '',
  image_url: '', imagePreview: null, is_active: true,
})
const form = reactive(emptyForm())

// Datos importables
const scentTagSuggestions = computed(() => {
  const s = new Set()
  aromas.value.forEach(a => { if (a.collection_tag) s.add(a.collection_tag) })
  return Array.from(s).sort()
})

const FAMILIAS = {
  floral: { label: 'Floral', emoji: '🌸', badge: 'bg-pink-50 text-pink-700 border border-pink-200' },
  oriental: { label: 'Oriental', emoji: '✨', badge: 'bg-purple-50 text-purple-700 border border-purple-200' },
  amaderada: { label: 'Amaderada', emoji: '🪵', badge: 'bg-amber-50 text-amber-800 border border-amber-200' },
  citrica: { label: 'Cítrica', emoji: '🍋', badge: 'bg-green-50 text-green-700 border border-green-200' },
}
const familyLabel = (k) => FAMILIAS[k]?.label || k || ''
const familyEmoji = (k) => FAMILIAS[k]?.emoji || ''
const familyBadge = (k) => FAMILIAS[k]?.badge || 'bg-gray-100 text-gray-600'

const filtered = computed(() => {
  const term = q.value.toLowerCase().trim()
  return aromas.value.filter(a => {
    const matchesTerm = !term || (a.name || '').toLowerCase().includes(term)
      || (a.subtitle || '').toLowerCase().includes(term)
      || (a.inspiracion || '').toLowerCase().includes(term)
      || (a.collection_tag || '').toLowerCase().includes(term)
    const matchesFam = famFilter.value === 'all' || a.olfactive_family === famFilter.value
    return matchesTerm && matchesFam
  })
})

async function loadData() {
  loading.value = true
  try {
    const data = await $fetch('/api/fragrance-profiles/list')
    aromas.value = data?.profiles || []
  } catch (e) {
    showStatus('Error al cargar aromas: ' + (e.data?.message || e.message), false)
  } finally {
    loading.value = false
  }
}

// ══ Apertura / cierre modal ══
function resetForm() {
  Object.assign(form, emptyForm())
  editingId.value = null
  fileToRead.value = null
}
function openCreate() { resetForm(); showModal.value = true }
function openEdit(a) {
  resetForm()
  editingId.value = a.id
  form.name = a.name
  form.slug = a.slug || ''
  form.emoji = a.emoji || '🌸'
  form.subtitle = a.subtitle || ''
  form.experience = a.experience || ''
  form.notes = a.notes || ''
  form.inspiracion = a.inspiracion || ''
  form.olfactive_family = a.olfactive_family || ''
  form.collection_tag = a.collection_tag || ''
  form.image_url = a.image_url || ''
  form.imagePreview = a.image_url || null
  form.is_active = a.is_active !== false
  showModal.value = true
}
function closeModal() { showModal.value = false }

function onFileSelect(e) {
  const f = e.target.files?.[0]
  if (!f) return
  fileToRead.value = f
  form.imagePreview = URL.createObjectURL(f)
}

// ══ Guardar (crear/editar) ══
function slugify(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

async function saveForm() {
  saving.value = true
  try {
    if (!form.name) throw new Error('El nombre es obligatorio')
    const slugFinal = form.slug || slugify(form.name)
    let imageUrl = form.image_url
    if (fileToRead.value) imageUrl = await uploadImage(fileToRead.value)

    const payload = {
      name: form.name,
      slug: slugFinal,
      emoji: form.emoji || '🌸',
      subtitle: form.subtitle || null,
      experience: form.experience || null,
      notes: form.notes || null,
      inspiracion: form.inspiracion || null,
      olfactive_family: form.olfactive_family || null,
      collection_tag: form.collection_tag || null,
      image_url: imageUrl,
      is_active: form.is_active,
    }

    if (editingId.value) {
      await $fetch('/api/fragrance-profiles/update', { method: 'PUT', body: { id: editingId.value, ...payload } })
    } else {
      await $fetch('/api/fragrance-profiles/create', { method: 'POST', body: payload })
    }
    showModal.value = false
    showStatus('Aroma guardado ✔', true)
    await loadData()
  } catch (e) {
    alert('Error al guardar: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

async function confirmDelete(a) {
  if (!confirm(`⚠️ ¿Eliminar el aroma "${a.name}"? Afecta a productos que lo usen como variante.`)) return
  try {
    await $fetch('/api/fragrance-profiles/delete', { method: 'DELETE', body: { id: a.id } })
    showStatus('Aroma eliminado', true)
    await loadData()
  } catch (e) {
    alert('Error: ' + (e.data?.message || e.message))
  }
}

// ══ Subida de imagen (reutiliza endpoint de media del admin) ══
async function uploadImage(file) {
  const base64 = await fileToBase64(file)
  const res = await $fetch('/api/site/upload-media', {
    method: 'POST',
    body: { file: { name: file.name, type: file.type, data: base64 } },
  })
  if (!res?.url) throw new Error('No se obtuvo la URL de la imagen')
  return res.url
}
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })
}

// ══ CSV ══
function triggerCsvInput() { csvInput.value?.click() }

async function onCsvFile(e) {
  const f = e.target.files?.[0]
  if (!f) return
  try {
    const text = await f.text()
    busy.value = true
    const res = await $fetch('/api/aromas/import-csv', { method: 'POST', body: { csv: text } })
    if (res?.ok) {
      showStatus(`Importación completada: ${res.imported} nuevos · ${res.updated} actualizados` + (res.errors?.length ? ` · ${res.errors.length} con errores` : ''), res.errors?.length === 0)
    } else {
      showStatus('Importación con errores: ' + JSON.stringify(res.errors || []), false)
    }
    await loadData()
  } catch (err) {
    showStatus('Error leyendo archivo: ' + (err.data?.message || err.message), false)
  } finally {
    busy.value = false
    e.target.value = '' // reset para permitir seleccionar el mismo
  }
}

async function exportCsv() {
  busy.value = true
  try {
    const csv = await $fetch('/api/aromas/export-csv', { responseType: 'text' })
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `aromas-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  } catch (err) {
    showStatus('Error exportando: ' + (err.data?.message || err.message), false)
  } finally {
    busy.value = false
  }
}

function showStatus(msg, ok) {
  statusMsg.value = msg
  statusOk.value = ok
  setTimeout(() => { statusMsg.value = '' }, 6000)
}

onMounted(loadData)
</script>
