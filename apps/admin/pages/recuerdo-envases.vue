<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h1 class="text-2xl font-bold text-gray-900">🧴 Envases para Recuerdos</h1>
        <span class="text-sm text-gray-400">({{ envases.length }} total)</span>
      </div>
      <button @click="openCreate" class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        + Nuevo Envase
      </button>
    </div>

    <!-- Nota informativa -->
    <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
      <p class="font-medium mb-1">💡 ¿Cómo funciona?</p>
      <p>Estos envases aparecen en el <strong>cotizador de recuerdos</strong> de la página B2B. El <strong>precio base</strong> es el precio al público "todo en uno" (envase + fragancia + etiqueta). El <strong>stock</strong> es la disponibilidad que ofreces (no la de tu proveedor). El nombre comercial no revela el origen.</p>
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-4 py-3 text-left font-medium text-gray-500">Envase</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500">Capacidad</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500">Precio base</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500">Stock</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500">Estado</th>
              <th class="px-4 py-3 text-right font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="envase in envases" :key="envase.id" class="hover:bg-gray-50 transition-colors" :class="{ 'bg-gray-50': !envase.is_active }">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    <img v-if="envase.image_url" :src="envase.image_url" :alt="envase.nombre" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-xl">🧴</div>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ envase.nombre }}</p>
                    <p class="text-xs text-gray-400">{{ envase.descripcion }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-gray-600">{{ envase.capacidad || '—' }}</td>
              <td class="px-4 py-3 text-gray-900 font-medium">${{ formatPrice(envase.precio_base) }}</td>
              <td class="px-4 py-3">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="envase.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'">
                  {{ envase.stock > 0 ? `${envase.stock} disponibles` : 'Agotado' }}
                </span>
              </td>
              <td class="px-4 py-3">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="envase.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'">
                  {{ envase.is_active ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="px-4 py-3 text-right space-x-2">
                <button @click="toggleActive(envase)" class="text-xs font-medium" :class="envase.is_active ? 'text-yellow-600 hover:text-yellow-700' : 'text-green-600 hover:text-green-700'">
                  {{ envase.is_active ? 'Desactivar' : 'Activar' }}
                </button>
                <button @click="openEdit(envase)" class="text-primary-600 hover:text-primary-700 text-xs font-medium">Editar →</button>
                <button @click="confirmDelete(envase)" class="text-red-500 hover:text-red-600 text-xs font-medium">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="envases.length === 0 && !loading" class="text-center py-16">
        <p class="text-4xl mb-3">🧴</p>
        <p class="text-gray-500 font-medium">No hay envases aún</p>
        <p class="text-sm text-gray-400 mt-1">Crea tu primer envase para el cotizador de recuerdos</p>
      </div>
      <div v-if="loading" class="text-center py-16">
        <p class="text-gray-400">Cargando envases...</p>
      </div>
    </div>

    <!-- Modal Crear/Editar -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="showModal = false">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">{{ editingId ? '✏️ Editar Envase' : '🧴 Nuevo Envase' }}</h2>
          <button @click="showModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <form @submit.prevent="handleSave" class="space-y-4">
          <!-- Imagen -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Foto del envase</label>
            <div class="flex items-center gap-4">
              <div class="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                <img v-if="form.imagePreview" :src="form.imagePreview" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-3xl">🧴</div>
              </div>
              <div class="flex-1">
                <input ref="fileInput" type="file" accept="image/png,image/jpeg,image/webp" class="hidden" @change="onFileSelect" />
                <button type="button" @click="fileInput?.click()" class="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  📷 Subir foto
                </button>
                <p class="text-xs text-gray-400 mt-1">PNG/JPG/WebP · La foto se muestra en el cotizador</p>
              </div>
            </div>
          </div>

          <!-- Nombre y slug -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre comercial *</label>
              <input v-model="form.nombre" type="text" required placeholder="Ej. Perfumero Premium" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
              <p class="text-xs text-gray-400 mt-1">No reveles el proveedor en el nombre</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input v-model="form.slug" type="text" placeholder="perfumero-premium" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono" />
            </div>
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <input v-model="form.descripcion" type="text" placeholder="Ej. Vidrio cuadrado con atomizador y tapa dorada" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>

          <!-- Capacidad, material, precio, stock -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
              <input v-model="form.capacidad" type="text" placeholder="30 ml" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Material</label>
              <input v-model="form.material" type="text" placeholder="Vidrio" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Precio base *</label>
              <div class="relative">
                <span class="absolute left-3 top-2.5 text-gray-400">$</span>
                <input v-model.number="form.precio_base" type="number" required min="0" step="0.01" class="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
              </div>
              <p class="text-xs text-gray-400 mt-1">Todo en uno</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input v-model.number="form.stock" type="number" min="0" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            </div>
          </div>

          <!-- Ficha técnica -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Ficha técnica</label>
            <textarea v-model="form.ficha_tecnica" rows="3" placeholder="Detalles técnicos del envase (material, medidas, acabado, etc.)" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>

          <!-- Activo -->
          <label class="flex items-center gap-2">
            <input v-model="form.is_active" type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <span class="text-sm text-gray-700">Envase activo (visible en el cotizador)</span>
          </label>

          <!-- Botones -->
          <div class="flex items-center justify-end gap-3 pt-2">
            <button type="button" @click="showModal = false" class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cancelar</button>
            <button type="submit" :disabled="saving" class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors">
              {{ saving ? 'Guardando...' : 'Guardar Envase' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const envases = ref([])
const loading = ref(true)
const showModal = ref(false)
const editingId = ref(null)
const saving = ref(false)
const fileInput = ref(null)

const form = reactive({
  nombre: '',
  slug: '',
  descripcion: '',
  capacidad: '',
  material: '',
  precio_base: 85,
  stock: 0,
  ficha_tecnica: '',
  is_active: true,
  image: null,
  imagePreview: null,
})

async function loadEnvases() {
  loading.value = true
  try {
    const data = await $fetch('/api/recuerdo-envases/list')
    envases.value = data || []
  } catch (e) {
    console.error('Error:', e)
    envases.value = []
  } finally {
    loading.value = false
  }
}

function resetForm() {
  editingId.value = null
  form.nombre = ''
  form.slug = ''
  form.descripcion = ''
  form.capacidad = ''
  form.material = ''
  form.precio_base = 85
  form.stock = 0
  form.ficha_tecnica = ''
  form.is_active = true
  form.image = null
  form.imagePreview = null
}

function openCreate() {
  resetForm()
  showModal.value = true
}

function openEdit(envase) {
  editingId.value = envase.id
  form.nombre = envase.nombre
  form.slug = envase.slug
  form.descripcion = envase.descripcion || ''
  form.capacidad = envase.capacidad || ''
  form.material = envase.material || ''
  form.precio_base = envase.precio_base
  form.stock = envase.stock
  form.ficha_tecnica = envase.ficha_tecnica || ''
  form.is_active = envase.is_active
  form.image = null
  form.imagePreview = envase.image_url || null
  showModal.value = true
}

function onFileSelect(e) {
  const file = e.target.files?.[0]
  if (!file) return
  form.image = file
  form.imagePreview = URL.createObjectURL(file)
}

async function handleSave() {
  saving.value = true
  try {
    // Generar slug si está vacío
    if (!form.slug) {
      form.slug = form.nombre.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
    }

    // Convertir imagen a base64 si hay nueva
    let imageData = null
    if (form.image) {
      imageData = await fileToBase64(form.image)
    }

    const payload = {
      nombre: form.nombre,
      slug: form.slug,
      descripcion: form.descripcion,
      capacidad: form.capacidad,
      material: form.material,
      precio_base: form.precio_base,
      stock: form.stock,
      ficha_tecnica: form.ficha_tecnica,
      is_active: form.is_active,
      image: imageData ? { name: form.image.name, type: form.image.type, data: imageData } : null,
    }

    if (editingId.value) {
      await $fetch('/api/recuerdo-envases/update', {
        method: 'PUT',
        body: { id: editingId.value, ...payload },
      })
    } else {
      await $fetch('/api/recuerdo-envases/create', {
        method: 'POST',
        body: payload,
      })
    }

    showModal.value = false
    await loadEnvases()
  } catch (e) {
    alert('Error al guardar: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

async function toggleActive(envase) {
  try {
    await $fetch('/api/recuerdo-envases/update', {
      method: 'PUT',
      body: { id: envase.id, is_active: !envase.is_active },
    })
    envase.is_active = !envase.is_active
  } catch (e) {
    alert('Error: ' + (e.data?.message || e.message))
  }
}

async function confirmDelete(envase) {
  if (!confirm(`⚠️ ¿Eliminar "${envase.nombre}"? Esta acción no se puede deshacer.`)) return
  try {
    await $fetch(`/api/recuerdo-envases/delete?id=${envase.id}`, { method: 'DELETE' })
    await loadEnvases()
  } catch (e) {
    alert('Error: ' + (e.data?.message || e.message))
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

function formatPrice(price) {
  return Number(price).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

onMounted(loadEnvases)
</script>
