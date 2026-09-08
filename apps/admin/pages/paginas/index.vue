<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">📄 Páginas personalizadas</h1>
        <p class="text-sm text-gray-500 mt-1">
          Crea páginas de contenido (landing, promociones, guías…) con su propia URL y secciones.
        </p>
      </div>
      <NuxtLink
        to="/paginas/nueva"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors"
      >
        <span class="text-lg leading-none">+</span> Nueva página
      </NuxtLink>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="text-center py-16">
      <div class="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
      <p class="text-gray-500 mt-4">Cargando páginas...</p>
    </div>

    <!-- Vacío -->
    <div v-else-if="pages.length === 0" class="bg-white rounded-2xl border border-gray-200 p-12 text-center">
      <div class="text-5xl mb-4">📄</div>
      <h3 class="text-lg font-semibold text-gray-900 mb-1">Aún no hay páginas personalizadas</h3>
      <p class="text-gray-500 text-sm max-w-md mx-auto">
        Crea tu primera página para publicar contenido con su propia URL, como una landing de temporada o una guía de regalos.
      </p>
      <NuxtLink
        to="/paginas/nueva"
        class="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors"
      >
        <span class="text-lg leading-none">+</span> Crear primera página
      </NuxtLink>
    </div>

    <!-- Lista -->
    <div v-else class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
          <tr>
            <th class="px-5 py-3 font-medium">Página</th>
            <th class="px-5 py-3 font-medium">URL</th>
            <th class="px-5 py-3 font-medium">Estado</th>
            <th class="px-5 py-3 font-medium">Menú</th>
            <th class="px-5 py-3 font-medium text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="p in pages" :key="p.id" class="hover:bg-gray-50/60">
            <td class="px-5 py-4">
              <p class="font-medium text-gray-900">{{ p.title }}</p>
              <p v-if="p.badge" class="text-xs text-gray-400">{{ p.badge }}</p>
            </td>
            <td class="px-5 py-4">
              <a
                :href="`${storeUrl}/paginas/${p.slug}`"
                target="_blank"
                rel="noopener"
                class="text-primary-600 hover:text-primary-700 font-mono text-xs"
              >/paginas/{{ p.slug }}</a>
            </td>
            <td class="px-5 py-4">
              <button
                @click="togglePublished(p)"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors"
                :class="p.published ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
              >
                {{ p.published ? '● Publicada' : '○ Borrador' }}
              </button>
            </td>
            <td class="px-5 py-4">
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                :class="p.in_top_menu ? 'bg-primary-50 text-primary-700' : 'bg-gray-100 text-gray-400'"
              >
                {{ p.in_top_menu ? 'En menú' : 'No en menú' }}
              </span>
            </td>
            <td class="px-5 py-4 text-right whitespace-nowrap">
              <NuxtLink
                :to="`/paginas/${p.slug}`"
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >✏️ Editar</NuxtLink>
              <button
                @click="removePage(p)"
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
              >🗑️ Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Páginas personalizadas | PITAYA LAB' })

const config = useRuntimeConfig()
const storeUrl = config.public.storeUrl || 'http://localhost:3002'

const pages = ref([])
const loading = ref(true)

async function loadPages() {
  loading.value = true
  try {
    pages.value = await $fetch('/api/pages/list') || []
  } catch (e) {
    console.error('Error cargando páginas:', e)
    pages.value = []
  } finally {
    loading.value = false
  }
}

async function togglePublished(p) {
  const next = !p.published
  try {
    await $fetch('/api/pages/update', {
      method: 'PUT',
      body: { id: p.id, published: next },
    })
    p.published = next
  } catch (e) {
    alert('Error al cambiar el estado: ' + (e.data?.message || e.message))
  }
}

async function removePage(p) {
  if (!confirm(`¿Eliminar la página "${p.title}"? También se borrarán sus secciones.`)) return
  try {
    await $fetch(`/api/pages/delete?id=${p.id}`, { method: 'DELETE' })
    pages.value = pages.value.filter(x => x.id !== p.id)
  } catch (e) {
    alert('Error al eliminar: ' + (e.data?.message || e.message))
  }
}

onMounted(loadPages)
</script>
