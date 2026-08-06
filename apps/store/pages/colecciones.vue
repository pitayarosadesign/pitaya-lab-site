<template>
  <div class="min-h-screen">
    <!-- Header -->
    <section class="relative py-24 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">Colecciones</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-earth-900 mt-3 mb-6">
            Descubre nuestras <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-amber-500">Colecciones de Aromas</span>
          </h1>
          <p class="text-lg text-earth-600 leading-relaxed">
            Cada colección reúne perfiles aromáticos diseñados para una experiencia sensorial única. 
            Explora, encuentra tu aroma ideal y deja que cada espacio cuente una historia.
          </p>
        </div>
      </div>
    </section>

    <!-- Cargando -->
    <div v-if="loading" class="text-center py-24">
      <div class="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-earth-500">Cargando colecciones...</p>
    </div>

    <!-- Lista de colecciones -->
    <section v-else-if="collections.length" class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div
          v-for="collection in collections"
          :key="collection.id"
          class="scroll-mt-24"
        >
          <!-- Banner de colección -->
          <div
            class="relative rounded-3xl overflow-hidden shadow-lg"
            :style="bannerStyle(collection)"
          >
            <!-- Imagen de fondo -->
            <div v-if="collection.image_url" class="absolute inset-0">
              <img :src="collection.image_url" :alt="collection.name" class="w-full h-full object-cover" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
            </div>
            <div v-else class="absolute inset-0 bg-gradient-to-br from-primary-700 to-earth-800"></div>

            <!-- Contenido del banner -->
            <div class="relative p-8 md:p-12 text-white min-h-[200px] flex flex-col justify-center">
              <div class="flex items-center gap-3 mb-3">
                <span v-if="collection.icon" class="text-3xl">{{ collection.icon }}</span>
                <span class="text-primary-100 font-semibold text-sm uppercase tracking-wider">Colección</span>
              </div>
              <h2 class="text-3xl md:text-4xl font-serif font-bold mb-2">{{ collection.name }}</h2>
              <p class="text-lg text-primary-100 font-medium mb-3">{{ collection.subtitle }}</p>
              <p class="text-sm text-white/90 max-w-2xl leading-relaxed mb-6">{{ collection.description }}</p>
              <span class="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-white/15 backdrop-blur border border-white/25 text-sm font-medium">
                ⚡ {{ collection.profiles.length }} perfiles aromáticos
              </span>
            </div>
          </div>

          <!-- Perfiles aromáticos de la colección -->
          <div v-if="collection.profiles.length" class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <NuxtLink
              v-for="profile in collection.profiles"
              :key="profile.id"
              :to="`/colecciones/${profile.slug}`"
              class="group bg-white rounded-2xl border border-earth-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 hover:border-primary-300"
            >
              <!-- Imagen banner del perfil -->
              <div class="aspect-[16/9] overflow-hidden bg-earth-100 relative">
                <img
                  v-if="profile.image_url"
                  :src="profile.image_url"
                  :alt="profile.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-amber-100">
                  <span class="text-5xl">{{ profile.emoji || '🌸' }}</span>
                </div>
                <span v-if="profile.hotel_reference" class="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[10px] font-semibold uppercase tracking-wide backdrop-blur">
                  ✨ {{ profile.hotel_reference }}
                </span>
              </div>

              <!-- Contenido del perfil -->
              <div class="p-5">
                <h3 class="text-lg font-semibold text-earth-900 group-hover:text-primary-600 transition-colors">{{ profile.name }}</h3>
                <p v-if="profile.subtitle" class="text-sm text-primary-600 font-medium">{{ profile.subtitle }}</p>
                <p v-if="profile.experience" class="text-sm text-earth-500 mt-2 line-clamp-2">{{ profile.experience }}</p>

                <!-- Notas aromáticas -->
                <div v-if="profile.notes" class="mt-3 space-y-1 text-xs text-earth-600">
                  <p v-for="note in splitNotes(profile.notes)" :key="note" class="leading-snug">{{ note }}</p>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Sin colecciones -->
    <section v-else-if="!loading" class="py-24 text-center">
      <p class="text-5xl mb-4">🌸</p>
      <p class="text-earth-600 text-lg">Pronto tendremos nuestras colecciones disponibles.</p>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Colecciones de Aromas | PITAYA LAB',
  description: 'Explora nuestras colecciones de perfiles aromáticos: Santuario Blanco, Oasis de Bienestar, Tierra de Encanto, Jardín de Néctar y Vibra Urbana.',
  ogTitle: 'Colecciones de Aromas | PITAYA LAB',
  ogDescription: 'Descubre nuestras colecciones de aromas para transformar tus espacios en experiencias sensoriales únicas.',
})

const collections = ref([])
const loading = ref(true)

function bannerStyle(collection) {
  return {
    backgroundColor: collection.accent_color || '#16a34a',
  }
}

function splitNotes(notes) {
  if (!notes) return []
  return notes.split('/').map(n => n.trim()).filter(Boolean)
}

async function loadCollections() {
  loading.value = true
  try {
    const data = await $fetch('/api/collections')
    collections.value = data?.collections || []
  } catch (e) {
    console.warn('Error cargando colecciones:', e.message)
    collections.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadCollections)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
