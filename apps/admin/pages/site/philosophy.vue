<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">🌐 Editor del Sitio Web</h1>
      <NuxtLink to="/philosophy" target="_blank" class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
        Ver página
      </NuxtLink>
    </div>

    <PageTabs active="philosophy" />

    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">🌿 Nuestra Filosofía</h2>
        <p class="text-sm text-gray-400 mt-0.5">Edita el contenido de la página "Nuestra Filosofía"</p>
      </div>
      <button
        @click="handleSave"
        class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        :disabled="saving"
      >
        {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
      </button>
    </div>

    <PhilosophyPageEditor v-model="config" />
  </div>
</template>

<script setup>
const supabase = useSupabase()
const supabaseAdmin = useSupabaseAdmin()
const saving = ref(false)

const config = reactive({
  header: { badge: '', title: '', highlight: '', description: '' },
  manifesto: { image_url: '', image_alt: '', items: [] },
  eco: { badge: '', title: '', image_url: '', image_alt: '', intro: '', commitments: [], outro: '' },
  cta: { title: '', description: '', button_text: '' },
})

async function loadConfig() {
  try {
    const { data, error } = await supabase.from('site_config').select('*').eq('key', 'philosophy_page').single()
    if (error) throw error
    if (data?.value) {
      Object.assign(config.header, data.value.header)
      Object.assign(config.manifesto, data.value.manifesto)
      Object.assign(config.eco, data.value.eco)
      Object.assign(config.cta, data.value.cta)
    }
  } catch (e) {
    console.error('Error cargando config de Philosophy:', e)
  }
}

async function handleSave() {
  saving.value = true
  try {
    const client = supabaseAdmin || supabase
    const { error } = await client
      .from('site_config')
      .upsert({ key: 'philosophy_page', value: { ...config }, updated_at: new Date().toISOString() }, { onConflict: 'key' })
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
