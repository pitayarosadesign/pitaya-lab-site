<template>
  <div>
    <!-- Cargando -->
    <div v-if="loading" class="py-40 flex items-center justify-center">
      <div class="text-center">
        <div class="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-earth-500">Cargando...</p>
      </div>
    </div>

    <!-- Página no encontrada -->
    <div v-else-if="!page" class="py-32 text-center">
      <p class="text-6xl mb-4">🔍</p>
      <h1 class="text-3xl font-serif font-bold text-earth-900 mb-2">Página no encontrada</h1>
      <p class="text-earth-500 mb-8">La página que buscas no existe o fue movida.</p>
      <NuxtLink to="/" class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-base font-semibold transition-all">
        Volver al inicio
      </NuxtLink>
    </div>

    <!-- Página personalizada -->
    <div v-else>
      <!-- Encabezado de la página (opcional) -->
      <header v-if="page.title" class="py-16 md:py-20 bg-gradient-to-b from-primary-50 to-white text-center px-4">
        <div class="max-w-3xl mx-auto">
          <span v-if="page.badge" class="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">{{ page.badge }}</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-earth-900">
            {{ page.title }}<span v-if="page.highlight" class="text-primary-600"> {{ page.highlight }}</span>
          </h1>
          <p v-if="page.description" class="text-lg text-earth-600 mt-4 leading-relaxed">{{ page.description }}</p>
        </div>
      </header>

      <!-- Secciones dinámicas de la página -->
      <div v-if="sections.length > 0">
        <SectionRenderer
          v-for="section in sections"
          :key="section.id"
          :section="section"
        />
      </div>
      <div v-else class="py-20 text-center text-earth-400">
        <p>Esta página aún no tiene contenido.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const supabase = useNuxtApp().$supabase

const page = ref(null)
const sections = ref([])
const loading = ref(true)

async function loadPage() {
  loading.value = true
  page.value = null
  sections.value = []

  if (!supabase) {
    loading.value = false
    return
  }

  try {
    const slug = String(route.params.slug || '').trim()

    // 1. Cargar la página publicada
    const { data: pageData, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()

    if (pageError) throw pageError
    if (!pageData) {
      loading.value = false
      return
    }

    page.value = pageData

    // 2. Cargar sus secciones activas
    const { data: secData, error: secError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page', slug)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (secError) throw secError
    sections.value = secData || []
  } catch (e) {
    console.warn(`Error cargando página ${route.params.slug}:`, e.message)
    page.value = null
  } finally {
    loading.value = false
  }
}

// SEO dinámico
useSeoMeta({
  title: () => page.value ? `${page.value.seo_title || page.value.title} | PITAYA LAB` : 'Página no encontrada | PITAYA LAB',
  description: () => page.value?.description || '',
  ogTitle: () => page.value ? `${page.value.title} | PITAYA LAB` : undefined,
  ogDescription: () => page.value?.description || undefined,
})

watch(() => route.params.slug, loadPage)
onMounted(loadPage)
</script>
