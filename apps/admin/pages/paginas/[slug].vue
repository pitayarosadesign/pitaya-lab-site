<template>
  <div class="max-w-5xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <NuxtLink to="/paginas" class="text-sm text-gray-500 hover:text-primary-600 transition-colors">← Volver a páginas</NuxtLink>
        <h1 class="text-2xl font-bold text-gray-900 mt-1">
          {{ isNew ? '📄 Nueva página' : `📄 ${form.title || 'Editar página'}` }}
        </h1>
      </div>
      <div class="flex items-center gap-2">
        <a
          v-if="!isNew && form.published"
          :href="`${storeUrl}/paginas/${form.slug}`"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors"
        >🔗 Ver página</a>
        <button
          @click="handleSave"
          :disabled="saving"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
        >
          {{ saving ? 'Guardando...' : '💾 Guardar página' }}
        </button>
      </div>
    </div>

    <!-- Formulario de metadatos -->
    <div class="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <h2 class="text-lg font-semibold text-gray-900">Información de la página</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título *</label>
          <input v-model="form.title" type="text" required placeholder="Ej. Regalos de Temporada" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Slug (URL) *</label>
          <input v-model="form.slug" type="text" :disabled="!isNew" placeholder="ej. regalos-temporada" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all font-mono text-sm disabled:bg-gray-50 disabled:text-gray-400" />
          <p v-if="!isNew" class="text-xs text-gray-400 mt-1">El slug no se puede cambiar después de crear la página.</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Etiqueta (badge)</label>
          <input v-model="form.badge" type="text" placeholder="Ej. Edición limitada" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción / intro</label>
          <textarea v-model="form.description" rows="3" placeholder="Párrafo introductorio que también se usa como meta description." class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título SEO (opcional)</label>
          <input v-model="form.seo_title" type="text" placeholder="Si se deja vacío se usa el título" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
        </div>
        <div class="flex items-end gap-6 pb-1">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="form.published" class="w-4 h-4 text-primary-600 rounded" />
            <span class="text-sm text-gray-700">Publicada (visible en la tienda)</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="form.in_top_menu" class="w-4 h-4 text-primary-600 rounded" />
            <span class="text-sm text-gray-700">Sugerir en el menú</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Editor de secciones (solo cuando la página ya existe) -->
    <div v-if="!isNew && savedSlug">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-semibold text-gray-900">Secciones de la página</h2>
        <p class="text-xs text-gray-400">Arrastra para reordenar, haz clic para editar cada sección.</p>
      </div>
      <EditorSectionsEditor :page="savedSlug" />
    </div>
    <div v-else-if="isNew" class="bg-white rounded-2xl border border-dashed border-gray-300 p-8 text-center">
      <p class="text-gray-500 text-sm">
        Guarda la página primero para poder añadirle secciones.
      </p>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Editar página | PITAYA LAB' })

const route = useRoute()
const config = useRuntimeConfig()
const storeUrl = config.public.storeUrl || 'http://localhost:3002'

const isNew = computed(() => route.params.slug === 'nueva')
const saving = ref(false)
const savedSlug = ref('')
const pageId = ref(null)

const form = reactive({
  title: '',
  slug: '',
  badge: '',
  highlight: '',
  description: '',
  seo_title: '',
  published: false,
  in_top_menu: false,
})

async function loadPage() {
  if (isNew.value) return
  try {
    const data = await $fetch(`/api/pages/${route.params.slug}`)
    pageId.value = data.id
    Object.assign(form, {
      title: data.title || '',
      slug: data.slug || '',
      badge: data.badge || '',
      highlight: data.highlight || '',
      description: data.description || '',
      seo_title: data.seo_title || '',
      published: !!data.published,
      in_top_menu: !!data.in_top_menu,
    })
    savedSlug.value = data.slug
  } catch (e) {
    console.error('Error cargando página:', e)
    alert('No se pudo cargar la página: ' + (e.data?.message || e.message))
  }
}

async function handleSave() {
  if (!form.title.trim()) { alert('El título es obligatorio'); return }
  if (!form.slug.trim()) { alert('El slug es obligatorio'); return }

  // Normalizar slug (solo si es nuevo)
  if (isNew.value) {
    form.slug = form.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '')
  }

  saving.value = true
  try {
    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      badge: form.badge || '',
      highlight: form.highlight || '',
      description: form.description || '',
      seo_title: form.seo_title || '',
      published: form.published,
      in_top_menu: form.in_top_menu,
    }

    if (isNew.value) {
      const res = await $fetch('/api/pages/create', { method: 'POST', body: payload })
      savedSlug.value = res.page.slug
      alert('✅ Página creada. Ahora puedes añadirle secciones.')
      navigateTo(`/paginas/${res.page.slug}`)
    } else {
      if (!pageId.value) { alert('No se pudo identificar la página'); return }
      await $fetch('/api/pages/update', {
        method: 'PUT',
        body: { id: pageId.value, ...payload },
      })
      alert('✅ Cambios guardados')
    }
  } catch (e) {
    console.error('Error guardando página:', e)
    alert('Error al guardar: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

onMounted(loadPage)
</script>
