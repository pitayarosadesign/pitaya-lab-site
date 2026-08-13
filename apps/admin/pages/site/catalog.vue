<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">🌐 Editor del Sitio Web</h1>
      <a :href="storeUrl + '/catalog'" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
        Ver página
      </a>
    </div>

    <EditorPageTabs active="catalog" />

    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">🛍️ Catálogo</h2>
        <p class="text-sm text-gray-400 mt-0.5">Edita el contenido de la página de catálogo</p>
      </div>
      <button
        @click="handleSave"
        class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        :disabled="saving"
      >
        {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
      </button>
    </div>

    <EditorCatalogPageEditor v-model="config" />
  </div>
</template>

<script setup>
const supabase = useSupabase()
const supabaseAdmin = useSupabaseAdmin()
const runtime = useRuntimeConfig()
const storeUrl = runtime.public.storeUrl
const saving = ref(false)

const config = reactive({
  header: {
    badge: 'Catálogo',
    title: 'Nuestros Productos',
    highlight: 'Productos',
    description: 'Descubre nuestra colección completa de velas de soya, aceites aromáticos y brumas. Cada producto elaborado con ingredientes botánicos para cuidar de ti y del planeta.',
  },
  scent_guide: {
    badge: 'Guía de Aromas',
    title: 'Encuentra tu aroma ideal',
    description: 'Cada aroma de PITAYA LAB está diseñado para una experiencia única. Elige según tu mood y el momento.',
    disclaimer: '* Los aromas "Xcaret" y "Vidanta" son referencias inspiracionales. PITAYA LAB no tiene afiliación con los hoteles o marcas de dichos nombres.',
  },
  cta: {
    title: '¡Todos disponibles en Amazon!',
    description: 'Haz clic en cualquier producto o visita nuestra tienda oficial en Amazon México.',
    button_text: 'Ir a la Tienda en Amazon',
    button_link: 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329',
  },
})

async function loadConfig() {
  try {
    const { data, error } = await supabase.from('site_config').select('*').eq('key', 'catalog_page').single()
    if (error) throw error
    if (data?.value) {
      Object.assign(config.header, data.value.header)
      Object.assign(config.scent_guide, data.value.scent_guide)
      Object.assign(config.cta, data.value.cta)
    }
  } catch (e) {
    console.error('Error cargando config de Catálogo:', e)
  }
}

async function handleSave() {
  saving.value = true
  try {
    const client = supabaseAdmin || supabase
    const { error } = await client
      .from('site_config')
      .upsert({ key: 'catalog_page', value: { ...config }, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    if (error) throw error
    alert('✅ Cambios guardados correctamente')
  } catch (e) {
    console.error('Error guardando:', e)
    alert('Error al guardar: ' + e.message)
  } finally {
    saving.value = false
  }
}

onMounted(loadConfig)
</script>
