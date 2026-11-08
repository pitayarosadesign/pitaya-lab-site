<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <!-- Encabezado -->
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">🏢 Página Mayoreo & Corporativo</h1>
        <p class="text-sm text-gray-400 mt-1">
          Edita el hero, el kit de muestras y las secciones de la página B2B.
        </p>
      </div>
      <a
        :href="storeUrl + '/b2b'"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
        Ver página B2B
      </a>
    </div>

    <!-- Navegación por páginas -->
    <EditorPageTabs active="b2b" />

    <!-- Guardar config de textos -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">🎯 Contenido de la página</h2>
        <p class="text-sm text-gray-400 mt-0.5">Hero compacto y kit de muestras (site_config.b2b_page)</p>
      </div>
      <button
        @click="handleSave"
        class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        :disabled="saving"
      >
        {{ saving ? 'Guardando...' : 'Guardar Contenido' }}
      </button>
    </div>

    <EditorB2BPageEditor v-model="config" />

    <!-- Editor de secciones dinámicas -->
    <EditorSectionsEditor page="b2b" />
  </div>
</template>

<script setup>
const supabase = useSupabase()
const runtime = useRuntimeConfig()
const storeUrl = runtime.public.storeUrl
const saving = ref(false)

const config = reactive({
  hero: {
    badge: '🏢 Mayoreo & Corporativo',
    title: 'Fragancias que conectan a tu negocio y tus eventos',
    subtitle: 'Lleva la alta hotelería a tu tienda, hotel, bodas y eventos corporativos. Precios de mayoreo por volumen, recuerdos personalizados y etiquetado privado.',
    badges: [
      { icon: '📉', text: 'Descuentos automáticos por volumen (-25% a -35%)' },
      { icon: '🏷️', text: 'Etiquetado privado disponible' },
      { icon: '🚚', text: 'Envíos seguros a todo México' },
    ],
  },
  sampleKit: {
    eyebrow: 'Kit de Muestras B2B',
    title: '¿Aún no conoces nuestros aromas en persona?',
    description: 'Pide tu Kit de Muestras B2B y evalúa fragancias y envases antes de hacer un pedido fuerte. Ideal para hoteles, boutiques y organizadores de bodas.',
    buttonText: 'Comprar Kit de Muestras (Reembolsable en tu 1er pedido)',
    note: 'El costo del kit se reembolsa como crédito en tu primer pedido de mayoreo.',
    aromas: ['Xcaret', 'Solara', 'Westin Oasis', 'Palo Santo'],
  },
})

async function loadConfig() {
  try {
    const { data, error } = await supabase.from('site_config').select('*').eq('key', 'b2b_page').single()
    if (error) throw error
    if (data?.value) {
      if (data.value.hero) Object.assign(config.hero, data.value.hero)
      if (data.value.sampleKit) Object.assign(config.sampleKit, data.value.sampleKit)
    }
  } catch (e) {
    console.error('Error cargando config de B2B:', e)
  }
}

async function handleSave() {
  saving.value = true
  try {
    await $fetch('/api/site/config', {
      method: 'PUT',
      body: { entries: [{ key: 'b2b_page', value: { ...config } }] },
    })
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
