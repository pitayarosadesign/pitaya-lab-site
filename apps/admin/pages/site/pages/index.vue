<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">📄 Páginas CMS</h1>
        <p class="text-sm text-gray-500 mt-1">Administra las páginas del sitio web</p>
      </div>
      <button class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium" @click="showNew = true">+ Nueva página</button>
    </div>

    <div v-if="loading" class="text-center py-12 text-gray-400">Cargando...</div>

    <div v-else-if="pages.length === 0" class="text-center py-20 text-gray-400 bg-white rounded-xl border border-gray-200">
      <p class="text-4xl mb-3">📄</p>
      <p class="text-sm">No hay páginas creadas aún</p>
    </div>

    <div v-else class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="text-left px-6 py-3 font-medium text-gray-500">Título</th>
            <th class="text-left px-6 py-3 font-medium text-gray-500">Slug</th>
            <th class="text-center px-6 py-3 font-medium text-gray-500">Estado</th>
            <th class="text-right px-6 py-3 font-medium text-gray-500">Actualizado</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="page in pages" :key="page.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 font-medium text-gray-900">{{ page.title }}</td>
            <td class="px-6 py-4 font-mono text-xs text-gray-400">/{{ page.slug }}</td>
            <td class="px-6 py-4 text-center">
              <span class="text-xs px-2 py-1 rounded-full" :class="page.is_published ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'">
                {{ page.is_published ? 'Publicada' : 'Borrador' }}
              </span>
            </td>
            <td class="px-6 py-4 text-right text-gray-400 text-xs">
              {{ new Date(page.updated_at).toLocaleDateString('es-MX') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal nueva página -->
    <div v-if="showNew" class="fixed inset-0 z-50 bg-black/30 flex items-center justify-center" @click.self="showNew = false">
      <div class="bg-white rounded-2xl p-6 w-full max-w-lg mx-4 shadow-xl">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Nueva Página</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input v-model="newPage.title" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-200" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input v-model="newPage.slug" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-200" placeholder="mi-pagina" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contenido (HTML/Markdown)</label>
            <textarea v-model="newPage.content" rows="6" class="w-full px-4 py-2 rounded-lg border border-gray-200" />
          </div>
          <div class="flex items-center justify-end gap-3 pt-2">
            <button @click="showNew = false" class="px-4 py-2 text-sm text-gray-600">Cancelar</button>
            <button @click="createPage" class="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium">Crear</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Páginas CMS | PITAYA LAB' })
const supabase = useSupabase()
const loading = ref(true)
const pages = ref([])
const showNew = ref(false)
const newPage = reactive({ title: '', slug: '', content: '' })

onMounted(async () => {
  try {
    const { data } = await supabase.from('cms_pages').select('*').order('updated_at', { ascending: false })
    if (data) pages.value = data
  } catch (e) { console.error(e) }
  finally { loading.value = false }
})

async function createPage() {
  const slug = newPage.slug || newPage.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const { error } = await supabase.from('cms_pages').insert({
    title: newPage.title,
    slug,
    content: newPage.content,
    is_published: false,
  })
  if (error) { alert('Error: ' + error.message); return }
  showNew.value = false
  pages.value.push({ title: newPage.title, slug, content: newPage.content, is_published: false, updated_at: new Date().toISOString() })
  newPage.title = ''; newPage.slug = ''; newPage.content = ''
}
</script>
