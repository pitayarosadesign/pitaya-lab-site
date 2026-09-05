<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h1 class="text-2xl font-bold text-gray-900">🌸 Colecciones & Perfiles Aromáticos</h1>
        <span class="text-sm text-gray-400">({{ collections.length }} colecciones)</span>
      </div>
      <button @click="openCollectionCreate" class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        + Nueva Colección
      </button>
    </div>

    <!-- Nota informativa -->
    <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
      <p class="font-medium mb-1">💡 ¿Cómo funciona?</p>
      <p>Las <strong>colecciones</strong> son los grandes grupos de aromas (ej. Santuario Blanco, Oasis de Bienestar...). Cada colección contiene <strong>perfiles aromáticos</strong> (las fragancias individuales como Xcaret, Vidanta...). Gestiona ambas desde aquí y se reflejarán de forma atractiva en la tienda.</p>
    </div>

    <!-- Cargando -->
    <div v-if="loading" class="text-center py-20">
      <div class="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-gray-400">Cargando colecciones...</p>
    </div>

    <!-- Lista de colecciones -->
    <div v-else class="space-y-6">
      <div
        v-for="collection in collections"
        :key="collection.id"
        class="bg-white rounded-xl border border-gray-200 overflow-hidden"
      >
        <!-- Cabecera de colección -->
        <div class="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center gap-4">
          <div class="flex items-center gap-4 flex-1">
            <!-- Icono o imagen -->
            <div class="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
              <img
                v-if="collection.image_url"
                :src="collection.image_url"
                :alt="collection.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-2xl">{{ collection.icon || '🌸' }}</div>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h3 class="text-lg font-semibold text-gray-900">{{ collection.name }}</h3>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="collection.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'">
                  {{ collection.is_active ? 'Activa' : 'Inactiva' }}
                </span>
              </div>
              <p class="text-sm font-medium text-primary-600">{{ collection.subtitle }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ collection.profiles?.length || 0 }} perfiles aromáticos</p>
            </div>
          </div>
          <div class="flex items-center gap-2 md:ml-auto">
            <button @click="toggleCollectionActive(collection)" class="text-xs font-medium" :class="collection.is_active ? 'text-yellow-600 hover:text-yellow-700' : 'text-green-600 hover:text-green-700'">
              {{ collection.is_active ? 'Desactivar' : 'Activar' }}
            </button>
            <button @click="openCollectionEdit(collection)" class="text-primary-600 hover:text-primary-700 text-xs font-medium">Editar</button>
            <button @click="collection.g_expanded = !collection.g_expanded" class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors">
              {{ collection.g_expanded ? 'Contraer' : 'Ver perfiles' }} ▾
            </button>
          </div>
        </div>

        <!-- Descripción -->
        <p v-if="collection.description" class="px-4 md:px-6 py-3 text-sm text-gray-500 leading-relaxed border-b border-gray-50">
          {{ collection.description }}
        </p>

        <!-- Perfiles aromáticos -->
        <div v-if="showProfilesFor(collection.id, collection)" class="px-4 md:px-6 py-4">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-semibold text-gray-700">Perfiles aromáticos</h4>
            <button @click="openProfileCreate(collection)" class="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700">
              + Agregar perfil
            </button>
          </div>

          <div v-if="profilesByCollection(collection.id).length === 0" class="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p class="text-3xl mb-2">🌸</p>
            <p class="text-sm text-gray-500">No hay perfiles aún en esta colección</p>
            <button @click="openProfileCreate(collection)" class="mt-2 text-sm text-primary-600 font-medium hover:underline">+ Agregar el primero</button>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              v-for="profile in profilesByCollection(collection.id)"
              :key="profile.id"
              class="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors"
            >
              <div class="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                <img
                  v-if="profile.image_url"
                  :src="profile.image_url"
                  :alt="profile.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-xl">{{ profile.emoji || '🌸' }}</div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <p class="font-medium text-gray-900 truncate">{{ profile.name }}</p>
                  <span v-if="profile.hotel_reference" class="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700">
                    {{ profile.hotel_reference }}
                  </span>
                </div>
                <p class="text-xs text-gray-400 truncate">{{ profile.experience || profile.subtitle || '—' }}</p>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                <button @click="openProfileEdit(profile)" class="text-primary-600 hover:text-primary-700 text-xs">✏️</button>
                <button @click="confirmProfileDelete(profile)" class="text-red-500 hover:text-red-600 text-xs">🗑️</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="collections.length === 0" class="text-center py-16 bg-white rounded-xl border border-gray-200">
        <p class="text-4xl mb-3">🌸</p>
        <p class="text-gray-500 font-medium">No hay colecciones aún</p>
        <p class="text-sm text-gray-400 mt-1">Crea tu primera colección para empezar</p>
      </div>
    </div>

    <!-- MODAL COLECCIÓN (crear/editar) -->
    <div v-if="showCollectionModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="showCollectionModal = false">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">{{ editingCollectionId ? '✏️ Editar Colección' : '🌸 Nueva Colección' }}</h2>
          <button @click="showCollectionModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <form @submit.prevent="handleCollectionSave" class="space-y-4">
          <!-- Imagen banner -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Imagen banner / cabecera</label>
            <div class="flex items-center gap-4">
              <div class="w-40 h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                <img v-if="collectionForm.imagePreview" :src="collectionForm.imagePreview" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-3xl">{{ collectionForm.icon || '🌸' }}</div>
              </div>
              <div class="flex-1">
                <input ref="collectionFileInput" type="file" accept="image/png,image/jpeg,image/webp" class="hidden" @change="onCollectionFileSelect" />
                <button type="button" @click="collectionFileInput?.click()" class="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  📷 Subir imagen
                </button>
                <p class="text-[11px] text-primary-600 font-medium mt-1">📐 Recomendado: banner amplio ~1600×600 px</p>
              </div>
            </div>
          </div>

          <!-- Nombre, slug, icono -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="md:col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
              <input v-model="collectionForm.name" type="text" required placeholder="Ej. Oasis de Bienestar" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            </div>
            <div class="md:col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input v-model="collectionForm.slug" type="text" placeholder="oasis-de-bienestar" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono" />
            </div>
            <div class="md:col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Ícono (emoji)</label>
              <input v-model="collectionForm.icon" type="text" placeholder="🌸" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm text-center" />
            </div>
          </div>

          <!-- Subtítulo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo *</label>
            <input v-model="collectionForm.subtitle" type="text" required placeholder="Ej. Perfil Herbal-Botánico de Spa" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>

          <!-- Descripción / experiencia -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Experiencia (descripción)</label>
            <textarea v-model="collectionForm.description" rows="4" placeholder="Describe qué evoca esta colección, para quién es, etc." class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>

          <!-- Color de acento + activo -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Color de acento</label>
              <input v-model="collectionForm.accent_color" type="color" class="w-full h-11 rounded-lg border border-gray-200 cursor-pointer" />
              <p class="text-xs text-gray-400 mt-1">{{ collectionForm.accent_color || '#16a34a' }}</p>
            </div>
            <div class="flex items-end">
              <label class="flex items-center gap-2 pb-2">
                <input v-model="collectionForm.is_active" type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span class="text-sm text-gray-700">Colección activa (visible en la tienda)</span>
              </label>
            </div>
          </div>

          <!-- Botones -->
          <div class="flex items-center justify-end gap-3 pt-2">
            <button type="button" @click="showCollectionModal = false" class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cancelar</button>
            <button type="submit" :disabled="saving" class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors">
              {{ saving ? 'Guardando...' : 'Guardar Colección' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL PERFIL (crear/editar) -->
    <div v-if="showProfileModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="showProfileModal = false">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">{{ editingProfileId ? '✏️ Editar Perfil Aromático' : '🌸 Nuevo Perfil Aromático' }}</h2>
          <button @click="showProfileModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <form @submit.prevent="handleProfileSave" class="space-y-4">
          <!-- Colección -->
          <div v-if="profileForm_collectionName">
            <label class="block text-sm font-medium text-gray-700 mb-1">Colección</label>
            <input :value="profileForm_collectionName" type="text" disabled class="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-500" />
          </div>

          <!-- Imagen banner -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Imagen tipo banner / cabecera</label>
            <div class="flex items-center gap-4">
              <div class="w-40 h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                <img v-if="profileForm.imagePreview" :src="profileForm.imagePreview" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-3xl">{{ profileForm.emoji || '🌸' }}</div>
              </div>
              <div class="flex-1">
                <input ref="profileFileInput" type="file" accept="image/png,image/jpeg,image/webp" class="hidden" @change="onProfileFileSelect" />
                <button type="button" @click="profileFileInput?.click()" class="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  📷 Subir imagen
                </button>
                <p class="text-[11px] text-primary-600 font-medium mt-1">📐 Recomendado: banner ~1200×600 px</p>
              </div>
            </div>
          </div>

          <!-- Nombre, slug, emoji -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Fragancia / Nombre *</label>
              <input v-model="profileForm.name" type="text" required placeholder="Ej. Xcaret" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input v-model="profileForm.slug" type="text" placeholder="xcaret" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ícono (emoji)</label>
              <input v-model="profileForm.emoji" type="text" placeholder="🏝️" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm text-center" />
            </div>
          </div>

          <!-- Subtítulo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
            <input v-model="profileForm.subtitle" type="text" placeholder="Ej. Resort Tropical" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>

          <!-- Experiencia -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Experiencia</label>
            <textarea v-model="profileForm.experience" rows="2" placeholder="Describe la experiencia que evoca este aroma" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>

          <!-- Notas aromáticas -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Notas aromáticas</label>
            <textarea v-model="profileForm.notes" rows="2" placeholder="Ej. SAL. Menta, Mandarina / COR. Té Blanco / FONDO. Sándalo, Pachulí" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <p class="text-xs text-gray-400 mt-1">Usa el formato SAL. / COR. / FONDO.</p>
          </div>

          <!-- Hoteles & Spa -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Hoteles & Spa (referencia inspiracional)</label>
            <input v-model="profileForm.hotel_reference" type="text" placeholder="Ej. Six Senses, Xcaret, Ritz-Carlton..." class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <p class="text-xs text-gray-400 mt-1">Opcional. Si este aroma es "Hoteles & Spa", indica el/los hotel(es) de inspiración.</p>
          </div>

          <!-- Familia olfativa (4 grandes) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Familia olfativa</label>
            <select
              v-model="profileForm.olfactive_family"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm bg-white"
            >
              <option value="">— Sin clasificar —</option>
              <option v-for="f in olfactiveFamilies" :key="f.value" :value="f.value">{{ f.label }}</option>
            </select>
            <p class="text-xs text-gray-400 mt-1">Agrupación principal (Floral · Oriental · Amaderada · Cítrica). La verá el cliente en la Guía.</p>
          </div>

          <!-- Colección / temporada (libre, por aroma) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Colección / temporada</label>
            <input v-model="profileForm.collection_tag" type="text" placeholder="Ej. Navidad, Otoño-Invierno…"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <p class="text-xs text-gray-400 mt-1">Etiqueta editorial opcional que pones tú por aroma (campaña/temporada).</p>
          </div>

          <!-- Activo -->
          <label class="flex items-center gap-2">
            <input v-model="profileForm.is_active" type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <span class="text-sm text-gray-700">Perfil activo (visible en la tienda)</span>
          </label>

          <!-- Botones -->
          <div class="flex items-center justify-end gap-3 pt-2">
            <button type="button" @click="showProfileModal = false" class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cancelar</button>
            <button type="submit" :disabled="saving" class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors">
              {{ saving ? 'Guardando...' : 'Guardar Perfil' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const collections = ref([])
const allProfiles = ref([])
const loading = ref(true)
const saving = ref(false)

// Modal de colección
const showCollectionModal = ref(false)
const editingCollectionId = ref(null)
const collectionFileInput = ref(null)
const collectionForm = reactive({
  name: '',
  slug: '',
  subtitle: '',
  description: '',
  icon: '🌸',
  image_url: '',
  imagePreview: null,
  image: null,
  accent_color: '#16a34a',
  is_active: true,
})

// Modal de perfil
const showProfileModal = ref(false)
const editingProfileId = ref(null)
const profileFileInput = ref(null)
const profileForm_collection = ref(null)
const profileForm_collectionName = ref('')
const profileForm = reactive({
  name: '',
  slug: '',
  subtitle: '',
  experience: '',
  notes: '',
  hotel_reference: '',
  olfactive_family: '',
  collection_tag: '',
  emoji: '🌸',
  image_url: '',
  imagePreview: null,
  image: null,
  is_active: true,
})

async function loadData() {
  loading.value = true
  try {
    const [colData, profData] = await Promise.all([
      $fetch('/api/collections/list'),
      $fetch('/api/fragrance-profiles/list'),
    ])
    collections.value = (colData?.collections || []).map(c => ({ ...c, g_expanded: false }))
    allProfiles.value = profData?.profiles || []
  } catch (e) {
    console.error('Error:', e)
    collections.value = []
    allProfiles.value = []
  } finally {
    loading.value = false
  }
}

function showProfilesFor(id, collection) {
  // Devolver el estado expandido almacenado
  return collection.g_expanded
}

function profilesByCollection(collectionId) {
  return allProfiles.value.filter(p => p.collection_id === collectionId).sort((a, b) => a.sort_order - b.sort_order)
}

// ===== COLECCIONES =====
function resetCollectionForm() {
  editingCollectionId.value = null
  collectionForm.name = ''
  collectionForm.slug = ''
  collectionForm.subtitle = ''
  collectionForm.description = ''
  collectionForm.icon = '🌸'
  collectionForm.image_url = ''
  collectionForm.imagePreview = null
  collectionForm.image = null
  collectionForm.accent_color = '#16a34a'
  collectionForm.is_active = true
}

function openCollectionCreate() {
  resetCollectionForm()
  showCollectionModal.value = true
}

function openCollectionEdit(collection) {
  editingCollectionId.value = collection.id
  collectionForm.name = collection.name
  collectionForm.slug = collection.slug
  collectionForm.subtitle = collection.subtitle || ''
  collectionForm.description = collection.description || ''
  collectionForm.icon = collection.icon || '🌸'
  collectionForm.image_url = collection.image_url || ''
  collectionForm.imagePreview = collection.image_url || null
  collectionForm.image = null
  collectionForm.accent_color = collection.accent_color || '#16a34a'
  collectionForm.is_active = collection.is_active
  showCollectionModal.value = true
}

function onCollectionFileSelect(e) {
  const file = e.target.files?.[0]
  if (!file) return
  collectionForm.image = file
  collectionForm.imagePreview = URL.createObjectURL(file)
}

async function handleCollectionSave() {
  saving.value = true
  try {
    if (!collectionForm.slug) {
      collectionForm.slug = collectionForm.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
    }

    let imageUrl = collectionForm.image_url
    if (collectionForm.image) {
      imageUrl = await uploadImage(collectionForm.image)
    }

    const payload = {
      name: collectionForm.name,
      slug: collectionForm.slug,
      subtitle: collectionForm.subtitle,
      description: collectionForm.description,
      icon: collectionForm.icon,
      image_url: imageUrl,
      accent_color: collectionForm.accent_color,
      is_active: collectionForm.is_active,
    }

    if (editingCollectionId.value) {
      await $fetch('/api/collections/update', { method: 'PUT', body: { id: editingCollectionId.value, ...payload } })
    } else {
      await $fetch('/api/collections/create', { method: 'POST', body: payload })
    }

    showCollectionModal.value = false
    await loadData()
  } catch (e) {
    alert('Error al guardar: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

async function toggleCollectionActive(collection) {
  try {
    await $fetch('/api/collections/update', { method: 'PUT', body: { id: collection.id, is_active: !collection.is_active } })
    collection.is_active = !collection.is_active
  } catch (e) {
    alert('Error: ' + (e.data?.message || e.message))
  }
}

// ===== PERFILES =====
function resetProfileForm() {
  editingProfileId.value = null
  profileForm_collection.value = null
  profileForm_collectionName.value = ''
  profileForm.name = ''
  profileForm.slug = ''
  profileForm.subtitle = ''
  profileForm.experience = ''
  profileForm.notes = ''
  profileForm.hotel_reference = ''
  profileForm.olfactive_family = ''
  profileForm.collection_tag = ''
  profileForm.emoji = '🌸'
  profileForm.image_url = ''
  profileForm.imagePreview = null
  profileForm.image = null
  profileForm.is_active = true
}

function openProfileCreate(collection) {
  resetProfileForm()
  profileForm_collection.value = collection
  profileForm_collectionName.value = collection.name
  showProfileModal.value = true
}

function openProfileEdit(profile) {
  resetProfileForm()
  editingProfileId.value = profile.id
  const col = collections.value.find(c => c.id === profile.collection_id)
  profileForm_collection.value = col || null
  profileForm_collectionName.value = profile.collection_name || (col?.name) || ''
  profileForm.name = profile.name
  profileForm.slug = profile.slug
  profileForm.subtitle = profile.subtitle || ''
  profileForm.experience = profile.experience || ''
  profileForm.notes = profile.notes || ''
  profileForm.hotel_reference = profile.hotel_reference || ''
  profileForm.olfactive_family = profile.olfactive_family || ''
  profileForm.collection_tag = profile.collection_tag || ''
  profileForm.emoji = profile.emoji || '🌸'
  profileForm.image_url = profile.image_url || ''
  profileForm.imagePreview = profile.image_url || null
  profileForm.image = null
  profileForm.is_active = profile.is_active
  showProfileModal.value = true
}

function onProfileFileSelect(e) {
  const file = e.target.files?.[0]
  if (!file) return
  profileForm.image = file
  profileForm.imagePreview = URL.createObjectURL(file)
}

async function handleProfileSave() {
  saving.value = true
  try {
    if (!profileForm.slug) {
      profileForm.slug = profileForm.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
    }

    let imageUrl = profileForm.image_url
    if (profileForm.image) {
      imageUrl = await uploadImage(profileForm.image)
    }

    const payload = {
      collection_id: profileForm_collection.value?.id,
      name: profileForm.name,
      slug: profileForm.slug,
      subtitle: profileForm.subtitle,
      experience: profileForm.experience,
      notes: profileForm.notes,
      hotel_reference: profileForm.hotel_reference,
      olfactive_family: profileForm.olfactive_family || null,
      collection_tag: profileForm.collection_tag || null,
      emoji: profileForm.emoji,
      image_url: imageUrl,
      is_active: profileForm.is_active,
    }

    if (editingProfileId.value) {
      await $fetch('/api/fragrance-profiles/update', { method: 'PUT', body: { id: editingProfileId.value, ...payload } })
    } else {
      await $fetch('/api/fragrance-profiles/create', { method: 'POST', body: payload })
    }

    showProfileModal.value = false
    await loadData()
  } catch (e) {
    alert('Error al guardar: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

async function confirmProfileDelete(profile) {
  if (!confirm(`⚠️ ¿Eliminar el perfil "${profile.name}"? Esta acción no se puede deshacer.`)) return
  try {
    await $fetch('/api/fragrance-profiles/delete', { method: 'DELETE', body: { id: profile.id } })
    await loadData()
  } catch (e) {
    alert('Error: ' + (e.data?.message || e.message))
  }
}

// ===== Subida de imagen =====
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
    reader.onerror = (error) => reject(error)
  })
}

onMounted(loadData)
</script>
