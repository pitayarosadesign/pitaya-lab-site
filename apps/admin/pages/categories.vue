<template>
  <div class="p-6">
    <!-- Encabezado -->
    <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">🗂️ Categorías</h1>
        <p class="text-sm text-gray-500 mt-1">
          Organiza el catálogo. Puedes crear subcategorías, asignar imagen y ordenar cómo aparecen.
        </p>
      </div>
      <button
        @click="openCreate()"
        class="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors"
      >
        + Nueva categoría
      </button>
    </div>

    <!-- Mensaje de estado -->
    <div v-if="statusMsg" class="mb-4 text-sm rounded-lg px-4 py-3" :class="statusOk ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'">
      {{ statusMsg }}
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-100">
          <tr>
            <th class="px-4 py-3 w-16">Orden</th>
            <th class="px-4 py-3">Categoría</th>
            <th class="px-4 py-3">Slug</th>
            <th class="px-4 py-3">Productos</th>
            <th class="px-4 py-3">Activa</th>
            <th class="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, index) in orderedCategories" :key="c.id" class="border-t border-gray-100 hover:bg-gray-50/60">
            <td class="px-4 py-3">
              <div class="flex flex-col gap-0.5">
                <button type="button" @click="move(index, -1)" :disabled="index === 0" class="text-gray-400 hover:text-gray-600 disabled:opacity-25 text-xs leading-none">▲</button>
                <button type="button" @click="move(index, 1)" :disabled="index === orderedCategories.length - 1" class="text-gray-400 hover:text-gray-600 disabled:opacity-25 text-xs leading-none">▼</button>
              </div>
            </td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-earth-100 flex items-center justify-center text-lg shrink-0 overflow-hidden">
                  <img v-if="c.image_url" :src="useOptimizedImage(c.image_url, { width: 120, quality: 70, format: 'webp' })" class="w-full h-full object-cover" :alt="c.name" loading="lazy" />
                  <span v-else>🗂️</span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">
                    <span v-if="c.parent_id" class="text-gray-300 mr-1">↳</span>{{ c.name }}
                  </p>
                  <p v-if="c.parent_id" class="text-xs text-gray-400">Subcategoría de {{ parentName(c.parent_id) }}</p>
                  <p v-else-if="c.description" class="text-xs text-gray-400 truncate max-w-[280px]">{{ c.description }}</p>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 font-mono text-xs text-gray-400">{{ c.slug }}</td>
            <td class="px-4 py-3">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">{{ c.product_count || 0 }}</span>
            </td>
            <td class="px-4 py-3">
              <span :class="c.is_active ? 'text-green-600' : 'text-gray-300'">{{ c.is_active ? '● Sí' : '○ No' }}</span>
            </td>
            <td class="px-4 py-3 text-right whitespace-nowrap">
              <button @click="openEdit(c)" class="text-primary-600 hover:text-primary-700 text-xs font-medium mr-3">✏️ Editar</button>
              <button @click="confirmDelete(c)" class="text-red-500 hover:text-red-600 text-xs font-medium">🗑️</button>
            </td>
          </tr>
          <tr v-if="!orderedCategories.length">
            <td colspan="6" class="px-4 py-14 text-center text-gray-400">
              {{ loading ? 'Cargando categorías…' : 'Aún no hay categorías. Crea la primera.' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal alta / edición -->
    <div v-if="showModal" class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" @click.self="closeModal">
      <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-7 shadow-xl">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-800">{{ editingId ? '✏️ Editar categoría' : '✨ Nueva categoría' }}</h2>
          <button @click="closeModal" class="text-2xl leading-none text-gray-400 hover:text-gray-600">&times;</button>
        </div>

        <form @submit.prevent="saveForm" class="space-y-4">
          <!-- Imagen -->
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 rounded-xl bg-earth-100 flex items-center justify-center text-3xl overflow-hidden">
              <img v-if="form.imagePreview" :src="form.imagePreview" class="w-full h-full object-cover" alt="img" />
              <span v-else>🗂️</span>
            </div>
            <input ref="fileInput" type="file" accept="image/png,image/jpeg,image/webp" class="hidden" @change="onFileSelect" />
            <div>
              <button type="button" @click="fileInput?.click()" class="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">Subir imagen</button>
              <p class="text-xs text-gray-400 mt-1">Opcional · PNG / JPG / WebP</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Nombre *</label>
              <input v-model="form.name" type="text" required placeholder="Ej. Velas de soya" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 focus:outline-none text-sm" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Slug <span class="text-gray-300">(auto si se deja en blanco)</span></label>
              <input v-model="form.slug" type="text" placeholder="velas-de-soya" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 focus:outline-none text-sm font-mono" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1">Descripción</label>
            <textarea v-model="form.description" rows="2" placeholder="Descripción breve de la categoría" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 focus:outline-none text-sm" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1">Categoría padre <span class="text-gray-300">(opcional · para subcategorías)</span></label>
            <select v-model="form.parent_id" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 focus:outline-none text-sm bg-white">
              <option value="">— Ninguna (categoría principal) —</option>
              <option v-for="c in parentOptions" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>

          <div class="flex items-center justify-between pt-2">
            <label class="inline-flex items-center gap-2 text-sm text-gray-600">
              <input v-model="form.is_active" type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              Activa (visible en la tienda)
            </label>
            <div class="flex gap-2">
              <button type="button" @click="closeModal" class="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100">Cancelar</button>
              <button type="submit" :disabled="saving" class="px-5 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold disabled:opacity-60">
                {{ saving ? 'Guardando…' : 'Guardar categoría' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ title: 'Categorías' })

const categories = ref([])
const loading = ref(true)
const saving = ref(false)
const statusMsg = ref('')
const statusOk = ref(true)

const fileInput = ref(null)
const fileToRead = ref(null)

const showModal = ref(false)
const editingId = ref(null)

const emptyForm = () => ({
  name: '', slug: '', description: '',
  image_url: '', imagePreview: null,
  parent_id: '', is_active: true,
})
const form = reactive(emptyForm())

// Orden local (para reordenar sin recargar)
const orderedCategories = ref([])

// Opciones de categoría padre: todas menos la que se está editando
const parentOptions = computed(() =>
  categories.value.filter(c => c.id !== editingId.value)
)

function parentName(id) {
  return categories.value.find(c => c.id === id)?.name || '—'
}

async function loadData() {
  loading.value = true
  try {
    const data = await $fetch('/api/categories/list')
    categories.value = data?.categories || []
    orderedCategories.value = [...categories.value]
  } catch (e) {
    showStatus('Error al cargar categorías: ' + (e.data?.message || e.message), false)
  } finally {
    loading.value = false
  }
}

function resetForm() {
  Object.assign(form, emptyForm())
  editingId.value = null
  fileToRead.value = null
}

function openCreate() { resetForm(); showModal.value = true }

function openEdit(c) {
  resetForm()
  editingId.value = c.id
  form.name = c.name || ''
  form.slug = c.slug || ''
  form.description = c.description || ''
  form.image_url = c.image_url || ''
  form.imagePreview = c.image_url || null
  form.parent_id = c.parent_id || ''
  form.is_active = c.is_active !== false
  showModal.value = true
}

function closeModal() { showModal.value = false }

function slugify(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

function onFileSelect(e) {
  const f = e.target.files?.[0]
  if (!f) return
  fileToRead.value = f
  form.imagePreview = URL.createObjectURL(f)
  compressImageFile(f).then(({ dataUrl }) => {
    form.imagePreview = dataUrl
    fileToRead.value = dataUrlToFile(dataUrl)
  }).catch(err => {
    console.error('No se pudo procesar la imagen:', err)
  })
}

function dataUrlToFile(dataUrl) {
  const [head, payload] = dataUrl.split(',')
  const mime = (head.match(/:(.*?);/) || [])[1] || 'image/jpeg'
  const ext = mime === 'image/png' ? 'png' : 'jpg'
  const bin = atob(payload)
  const u8 = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i)
  return new File([u8], 'categoria.' + ext, { type: mime })
}

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
      description: form.description || null,
      image_url: imageUrl || null,
      parent_id: form.parent_id || null,
      is_active: form.is_active,
    }

    if (editingId.value) {
      await $fetch('/api/categories/update', { method: 'PUT', body: { id: editingId.value, ...payload } })
    } else {
      await $fetch('/api/categories/create', { method: 'POST', body: payload })
    }
    showModal.value = false
    showStatus('Categoría guardada ✔', true)
    await loadData()
  } catch (e) {
    alert('Error al guardar: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

async function confirmDelete(c) {
  if (!confirm(`⚠️ ¿Eliminar la categoría "${c.name}"?`)) return
  try {
    await $fetch('/api/categories/delete', { method: 'DELETE', body: { id: c.id } })
    showStatus('Categoría eliminada', true)
    await loadData()
  } catch (e) {
    alert('Error: ' + (e.data?.message || e.message))
  }
}

// Reordenar (local + persistir)
async function move(index, delta) {
  const to = index + delta
  if (to < 0 || to >= orderedCategories.value.length) return
  const [moved] = orderedCategories.value.splice(index, 1)
  orderedCategories.value.splice(to, 0, moved)
  try {
    await $fetch('/api/categories/reorder', {
      method: 'POST',
      body: { order: orderedCategories.value.map(c => c.id) },
    })
  } catch (e) {
    showStatus('No se pudo guardar el orden: ' + (e.data?.message || e.message), false)
  }
}

function showStatus(msg, ok) {
  statusMsg.value = msg
  statusOk.value = ok
  setTimeout(() => { statusMsg.value = '' }, 6000)
}

onMounted(loadData)
</script>
