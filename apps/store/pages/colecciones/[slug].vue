<template>
  <div class="min-h-screen">
    <!-- Cargando -->
    <div v-if="loading" class="text-center py-32">
      <div class="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-earth-500">Cargando aroma...</p>
    </div>

    <div v-else-if="profile">
      <!-- Banner del perfil -->
      <section class="relative py-24 overflow-hidden bg-gradient-to-b from-primary-50 to-white">
        <div class="absolute inset-0" v-if="profile.image_url">
          <img :src="profile.image_url" :alt="profile.name" class="w-full h-full object-cover opacity-30" loading="lazy" />
        </div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl">
            <!-- Breadcrumb a colección -->
            <NuxtLink
              v-if="profile.collection"
              :to="`/colecciones#${profile.collection.slug}`"
              class="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium mb-6"
            >
              ← {{ profile.collection.icon || '🌸' }} {{ profile.collection.name }}
            </NuxtLink>

            <div class="flex items-center gap-3 mb-4">
              <span v-if="profile.emoji" class="text-4xl">{{ profile.emoji }}</span>
              <span v-if="profile.hotel_reference" class="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wide">
                ✨ {{ profile.hotel_reference }}
              </span>
            </div>

            <h1 class="text-4xl md:text-6xl font-serif font-bold text-earth-900 mb-4">{{ profile.name }}</h1>
            <p v-if="profile.subtitle" class="text-xl text-primary-600 font-semibold mb-3">{{ profile.subtitle }}</p>
            <p v-if="profile.experience" class="text-lg text-earth-600 leading-relaxed">{{ profile.experience }}</p>
          </div>
        </div>
      </section>

      <!-- Contenido -->
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Columna izquierda (2/3): descripción y notas -->
            <div class="md:col-span-2 space-y-8">
              <div v-if="profile.description" class="bg-white rounded-2xl border border-earth-100 p-8">
                <h2 class="text-2xl font-serif font-bold text-earth-900 mb-4">La experiencia</h2>
                <p class="text-earth-600 leading-relaxed">{{ profile.description }}</p>
              </div>

              <div v-if="notes.length" class="bg-white rounded-2xl border border-earth-100 p-8">
                <h2 class="text-2xl font-serif font-bold text-earth-900 mb-6">Notas Aromáticas</h2>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div v-for="note in notes" :key="note.label" class="p-5 rounded-xl bg-gradient-to-br from-primary-50 to-amber-50 border border-primary-100">
                    <p class="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2">{{ note.label }}</p>
                    <p class="text-sm text-earth-700 font-medium">{{ note.values }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Columna derecha (1/3): la colección -->
            <div v-if="profile.collection" class="space-y-6">
              <div class="bg-white rounded-2xl border border-earth-100 p-6">
                <h3 class="text-lg font-semibold text-earth-900 mb-4">Parte de la colección</h3>
                <div
                  class="aspect-[16/9] rounded-xl overflow-hidden mb-4"
                  :style="{ backgroundColor: profile.collection.accent_color || '#16a34a' }"
                >
                  <img
                    v-if="profile.collection.image_url"
                    :src="profile.collection.image_url"
                    :alt="profile.collection.name"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center text-white text-4xl">{{ profile.collection.icon || '🌸' }}</div>
                </div>
                <h4 class="font-semibold text-earth-800">{{ profile.collection.name }}</h4>
                <p class="text-sm text-primary-600 font-medium mb-2">{{ profile.collection.subtitle }}</p>
                <p class="text-sm text-earth-500 leading-relaxed line-clamp-3">{{ profile.collection.description }}</p>
                <NuxtLink
                  :to="`/colecciones#${profile.collection.slug}`"
                  class="inline-flex items-center justify-center w-full mt-4 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors"
                >
                  Ver toda la colección →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-16 bg-gradient-to-r from-primary-900 to-earth-900">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-serif font-bold text-white mb-4">
            ¿Listo para encontrar este aroma?
          </h2>
          <p class="text-primary-200 mb-8">
            Visita nuestro catálogo de productos y elige el formato ideal (bruma, aceite o vela) en tu aroma favorito.
          </p>
          <NuxtLink
            to="/catalog"
            class="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-xl hover:shadow-amber-900/30"
          >
            Ver catálogo de productos →
          </NuxtLink>
        </div>
      </section>
    </div>

    <div v-else-if="!loading" class="py-32 text-center">
      <p class="text-5xl mb-4">🌸</p>
      <p class="text-earth-600 text-lg">Perfil aromático no encontrado.</p>
      <NuxtLink to="/colecciones" class="inline-block mt-4 text-primary-600 hover:underline font-medium">← Ver todas las colecciones</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const profile = ref(null)
const loading = ref(true)

const notes = computed(() => {
  if (!profile.value?.notes) return []
  const raw = profile.value.notes.split('/').map(n => n.trim()).filter(Boolean)
  const order = ['SAL', 'COR', 'FONDO']
  return order
    .map(label => {
      const found = raw.find(r => r.toUpperCase().startsWith(label))
      if (!found) return null
      return { label, values: found.replace(new RegExp(`^${label}\\.?\\s*`, 'i'), '') }
    })
    .filter(Boolean)
})

useSeoMeta({
  title: () => profile.value?.name ? `${profile.value.name} | PITAYA LAB` : 'Perfil Aromático | PITAYA LAB',
  description: () => profile.value?.experience || 'Perfil aromático PITAYA LAB.',
})

async function loadProfile() {
  loading.value = true
  try {
    const data = await $fetch(`/api/fragrances/${route.params.slug}`)
    profile.value = data?.profile || null
  } catch (e) {
    console.warn('Error cargando perfil:', e.message)
    profile.value = null
  } finally {
    loading.value = false
  }
}

onMounted(loadProfile)
watch(() => route.params.slug, () => {
  loadProfile()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
