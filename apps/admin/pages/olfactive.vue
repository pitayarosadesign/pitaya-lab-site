<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">🧬 Familias & clasificaciones olfativas</h1>
        <p class="text-sm text-gray-500 mt-1">
          Ejes dinámicos (familia, inspiración, estación…) y sus valores. Todo editable desde aquí.
        </p>
      </div>
      <button
        @click="openEjeCreate"
        class="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
      >
        + Nuevo eje
      </button>
    </div>

    <!-- ⚠️ Aviso de migración pendiente -->
    <div
      v-if="!applied && loaded"
      class="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
    >
      <p class="font-semibold mb-1">🚧 Estructura de catálogo olfativo aún no aplicada</p>
      <p class="mb-2">
        Este módulo necesita ejecutar en tu Supabase (<em>SQL Editor</em>) la migración
        <code class="bg-amber-100 px-1 rounded">022_catalogo_olfativo.sql</code> para crear las tablas de ejes y valores.
      </p>
      <details class="text-xs">
        <summary class="cursor-pointer text-amber-700 hover:text-amber-900 font-medium">Ver/ocultar instrucciones</summary>
        <ol class="list-decimal pl-5 mt-2 space-y-1 text-gray-700">
          <li>Abre Supabase → <strong>SQL Editor</strong>.</li>
          <li>Pega el contenido íntegro de <code>supabase/migrations/022_catalogo_olfativo.sql</code>.</li>
          <li>Ejecuta (▶ Run). Debe responder sin errores.</li>
          <li>Vuelve a esta página y recarga (no destruye nada; usa <em>IF NOT EXISTS</em>).</li>
        </ol>
      </details>
    </div>

    <!-- Cargando -->
    <div v-if="!loaded" class="text-center py-20">
      <div class="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-gray-400 text-sm">Cargando clasificaciones…</p>
    </div>

    <div v-else-if="classifications.length === 0" class="text-center py-20 bg-white rounded-xl border border-gray-200">
      <p class="text-4xl mb-3">🧬</p>
      <p class="text-gray-500 text-sm mb-1">Aún no hay ejes creados.</p>
      <p class="text-gray-400 text-xs mb-4">Empieza por dar de alta la estructura (familia, inspiración, estación…).</p>
      <button @click="openEjeCreate" class="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-medium text-sm">
        + Crear primer eje
      </button>
    </div>

    <!-- Lista de ejes -->
    <div v-else class="grid grid-cols-1 gap-6">
      <div
        v-for="cl in classifications"
        :key="cl.id"
        class="bg-white rounded-xl border border-gray-200 overflow-hidden"
        :class="!cl.is_active ? 'opacity-70' : ''"
      >
        <!-- Cabecera del eje -->
        <div class="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center gap-3">
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="text-2xl">{{ cl.emoji || '🧬' }}</span>
              <h3 class="text-lg font-semibold text-gray-900">{{ cl.name }}</h3>
              <span class="text-xs font-mono text-gray-400">key: {{ cl.key }}</span>
              <span v-if="!cl.is_active" class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inactivo</span>
              <span
                v-if="cl.is_filter"
                class="hidden sm:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 font-medium"
              >filtro en tienda</span>
            </div>
            <p v-if="cl.description" class="text-xs text-gray-400 mt-0.5">{{ cl.description }}</p>
          </div>
          <div class="flex items-center gap-2 md:ml-auto">
            <!-- toggle activo (desmontar eje sin eliminar: evita perder datos) -->
            <button
              @click="toggleEje(cl)"
              class="text-xs font-medium"
              :class="cl.is_active ? 'text-red-500 hover:text-red-600' : 'text-green-600 hover:text-green-700'"
            >
              {{ cl.is_active ? 'Desactivar' : 'Activar' }}
            </button>
            <div class="relative" @click.stop>
              <button @click="toggleEjeMenu(cl)" class="text-gray-400 hover:text-gray-700 p-1" aria-label="Opciones del eje">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 11a1 1 0 110-2 1 1 0 010 2zm0 6a1 1 0 110-2 1 1 0 010 2z"/></svg>
              </button>
              <div
                v-if="openEjeMenuId === cl.id"
                class="absolute right-0 mt-2 w-44 bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-10"
              >
                <button @click="editEje(cl)" class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">✏️ Renombrar / editar</button>
                <button @click="deactivateEje(cl)" class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                  {{ cl.is_active ? 'Desactivar eje' : 'Reactivar eje' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Valores del eje -->
        <div class="p-4 space-y-3">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="val in cl.values"
              :key="val.id"
              class="inline-flex items-center gap-1.5 pl-1.5 pr-1 py-1 rounded-full border text-xs"
              :class="val.is_active ? 'bg-gray-50 border-gray-200 text-gray-700' : 'bg-gray-50 border-gray-200 text-gray-400 line-through'"
              @click.stop
            >
              <span class="text-base leading-none px-0.5">{{ val.emoji || '•' }}</span>
              <span class="max-w-[220px] truncate">{{ val.name }}</span>
              <button
                @click="toggleValue(val)"
                class="ml-0.5 text-gray-400 hover:text-gray-700 p-0.5"
                :title="val.is_active ? 'Desactivar' : 'Activar'"
                @click.stop
              >
                <svg v-if="val.is_active" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                <svg v-else class="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </button>
              <button class="text-gray-400 hover:text-gray-700 p-0.5" title="Editar" @click.stop="editValue(cl, val)">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              </button>
              <button class="text-red-400 hover:text-red-600 p-0.5" title="Eliminar definitivamente" @click.stop="confirmRemoveValue(val)">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </span>
            <button
              @click="openValueCreate(cl)"
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-gray-300 text-gray-500 hover:border-primary-300 hover:text-primary-700 text-xs font-medium transition-colors"
            >
              + Añadir valor
            </button>
          </div>
          <p v-if="cl.values.length === 0" class="text-xs text-gray-400">Aún no hay valores en este eje.</p>
        </div>
      </div>
    </div>

    <!-- ‼️ Modal: nuevo editar EJE -->
    <div v-if="modalEje" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/40" @click="modalEje = false"></div>
      <div class="relative bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">{{ editingEjeId ? 'Editar eje' : 'Nuevo eje de clasificación' }}</h3>
        <label class="block text-xs font-medium text-gray-500">Nombre del eje (plural) *</label>
        <input v-model="ejeForm.name" type="text" placeholder="Ej. Familias olfativas"
          class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        <div>
          <label class="block text-xs font-medium text-gray-500">Cómo se muestra un solo tipo</label>
          <input v-model="ejeForm.singular" type="text" placeholder="Ej. Familia (opcional)"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <p class="text-[11px] text-gray-400 mt-1">Si se deja vacío, se usará el mismo nombre del eje (sin diferenciar singular).</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-gray-500">Emoji (opcional)</label>
            <input v-model="ejeForm.emoji" type="text" placeholder="Omitir"
              class="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm text-center" />
          </div>
          <div class="flex items-end">
            <label class="flex items-center gap-2 text-sm text-gray-600 pb-1"><input v-model="ejeForm.is_filter" type="checkbox" class="rounded border-gray-300 text-primary-600" /> mostrar en tienda</label>
          </div>
        </div>
        <label class="block text-xs font-medium text-gray-500">Descripción (opcional)</label>
        <textarea v-model="ejeForm.description" rows="2" placeholder="Qué agrupa este eje…"
          class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        <div class="flex items-center justify-end gap-2 pt-1">
          <button @click="modalEje = false" class="px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancelar</button>
          <button @click="saveEje" class="px-4 py-2.5 rounded-lg text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white">Guardar eje</button>
        </div>
      </div>
    </div>

    <!-- ‼️ Modal: nuevo / editar VALOR -->
    <div v-if="modalValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/40" @click="modalValue = false"></div>
      <div class="relative bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">{{ editingValueId ? 'Editar valor' : 'Añadir valor' }}</h3>
        <p v-if="valueOfClassification" class="text-xs text-gray-400">en «{{ valueOfClassification }}»</p>
        <label class="block text-xs font-medium text-gray-500">Nombre *</label>
        <input v-model="valueForm.name" type="text"
          :placeholder="valuePlaceholder"
          class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-gray-500">Emoji (opcional)</label>
            <input v-model="valueForm.emoji" type="text" placeholder="✨"
              class="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm text-center" />
          </div>
          <div class="flex items-end">
            <label class="flex items-center gap-2 text-sm text-gray-600 pb-1"><input v-model="valueForm.is_active" type="checkbox" class="rounded border-gray-300 text-primary-600" /> activo</label>
          </div>
        </div>
        <div class="flex items-center justify-end gap-2 pt-1">
          <button @click="modalValue = false" class="px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancelar</button>
          <button @click="saveValue" class="px-4 py-2.5 rounded-lg text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white">Guardar</button>
        </div>
      </div>
    </div>

    <!-- ⚠️ Confirma eliminación (reutiliza window.confirm para simplicidad/pedir feedback nativo) -->
  </div>
</template>

<script setup>
const loaded = ref(false)
const applied = ref(false)
const classifications = ref([])
const openEjeMenuId = ref(null)

// Eje form
const modalEje = ref(false)
const editingEjeId = ref(null)
const ejeForm = reactive({ name: '', singular: '', emoji: '🧬', description: '', is_filter: true })

// Value form
const modalValue = ref(false)
const editingValueId = ref(null)
const activeClassificationId = ref(null)
const valueForm = reactive({ name: '', emoji: '', is_active: true })
const valueOfClassification = ref('')
const valuePlaceholder = ref('Nombre del valor (ej. Floral Verde…)')

async function loadData() {
  loaded.value = false
  try {
    const res = await $fetch('/api/olfactive')
    classifications.value = res.classifications || []
    applied.value = !!res.applied
  } catch (e) {
    applied.value = false
    classifications.value = []
  } finally {
    loaded.value = true
  }
}

function classificationById(id) {
  return classifications.value.find(c => c.id === id)
}

// ---------- Eje ----------
function resetEjeForm() {
  ejeForm.name = ''
  ejeForm.singular = ''
  ejeForm.emoji = '🧬'
  ejeForm.description = ''
  ejeForm.is_filter = false
}
function openEjeCreate() {
  resetEjeForm(); editingEjeId.value = null; modalEje.value = true
}
function editEje(cl) {
  editingEjeId.value = cl.id
  ejeForm.name = cl.name
  ejeForm.singular = cl.singular || ''
  ejeForm.emoji = cl.emoji || '🧬'
  ejeForm.description = cl.description || ''
  ejeForm.is_filter = !!cl.is_filter
  openEjeMenuId.value = null
  modalEje.value = true
}
async function toggleEje(cl) {
  await $fetch('/api/olfactive/classifications', { method: 'PUT', body: { id: cl.id, is_active: !cl.is_active } })
  cl.is_active = !cl.is_active
}
async function saveEje() {
  if (!ejeForm.name.trim()) return alert('Escribe el nombre del eje')
  try {
    if (editingEjeId.value) {
      await $fetch('/api/olfactive/classifications', {
        method: 'PUT',
        body: {
          id: editingEjeId.value,
          name: ejeForm.name.trim(),
          singular: ejeForm.singular.trim() || null,
          emoji: ejeForm.emoji || null,
          description: ejeForm.description?.trim() || null,
          is_filter: ejeForm.is_filter,
        },
      })
    } else {
      await $fetch('/api/olfactive/classifications', {
        method: 'POST',
        body: {
          name: ejeForm.name.trim(),
          singular: ejeForm.singular.trim() || null,
          emoji: ejeForm.emoji || null,
          description: ejeForm.description?.trim() || null,
          is_filter: ejeForm.is_filter,
        },
      })
    }
    modalEje.value = false
    await loadData()
  } catch (e) {
    alert(e?.data?.message || 'Error al guardar el eje')
  }
}
// Desactivar / reactivar un EJ E (toggle de is_active). Evita borrados SQL
// que limpiarían valores/asociaciones en cascada.
async function deactivateEje(cl) {
  openEjeMenuId.value = null
  await toggleEje(cl)
}

// ---------- Valor ----------
function openValueCreate(cl) {
  activeClassificationId.value = cl.id
  editingValueId.value = null
  valueForm.name = ''; valueForm.emoji = ''; valueForm.is_active = true
  valueOfClassification.value = cl.name
  valuePlaceholder.value = `Nombre (ej. para ${cl.singular || cl.name})`
  modalValue.value = true
}
function editValue(cl, val) {
  activeClassificationId.value = cl.id
  editingValueId.value = val.id
  valueForm.name = val.name
  valueForm.emoji = val.emoji || ''
  valueForm.is_active = val.is_active
  valueOfClassification.value = cl.name
  valuePlaceholder.value = 'Nombre del valor'
  modalValue.value = true
}
async function toggleValue(val) {
  await $fetch('/api/olfactive/values', { method: 'PUT', body: { id: val.id, is_active: !val.is_active } })
  val.is_active = !val.is_active
}
async function saveValue() {
  if (!valueForm.name.trim()) return alert('Escribe el nombre del valor')
  try {
    if (editingValueId.value) {
      await $fetch('/api/olfactive/values', {
        method: 'PUT',
        body: { id: editingValueId.value, name: valueForm.name.trim(), emoji: valueForm.emoji || null, is_active: valueForm.is_active },
      })
    } else {
      await $fetch('/api/olfactive/values', {
        method: 'POST',
        body: { classification_id: activeClassificationId.value, name: valueForm.name.trim(), emoji: valueForm.emoji || null, is_active: valueForm.is_active },
      })
    }
    modalValue.value = false
    await loadData()
  } catch (e) {
    alert(e?.data?.message || 'Error al guardar el valor')
  }
}
// Borrado físico (con confirmación). Elimina el valor y, vía FK ON DELETE CASCADE,
// las asociaciones a fragancias de la tabla puente.
async function confirmRemoveValue(val) {
  const cl = classifications.value.find(c => (c.values || []).some(v => v.id === val.id))
  const ok = window.confirm(`¿Eliminar definitivamente "${val.name}"${cl ? ' de «' + cl.name + '»' : ''}? Esta acción quita también su vínculo con fragancias.`)
  if (!ok) return
  try {
    await $fetch(`/api/olfactive/values?id=${val.id}`, { method: 'DELETE' })
    await loadData()
  } catch (e) {
    alert(e?.data?.message || 'No se pudo eliminar el valor')
  }
}

function toggleEjeMenu(cl) {
  openEjeMenuId.value = openEjeMenuId.value === cl.id ? null : cl.id
}

// Cerrar menú al hacer clic fuera
onMounted(() => {
  window.addEventListener('click', () => { openEjeMenuId.value = null })
})

onMounted(loadData)
</script>
