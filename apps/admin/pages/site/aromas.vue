<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">🌐 Editor del Sitio Web</h1>
      <a :href="storeUrl + '/aromas'" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
        Ver página
      </a>
    </div>

    <EditorPageTabs active="aromas" />

    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">🌸 Guía de Aromas</h2>
        <p class="text-sm text-gray-400 mt-0.5">Edita el contenido de la página de aromas</p>
      </div>
      <button
        @click="handleSave"
        class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        :disabled="saving"
      >
        {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
      </button>
    </div>

    <EditorAromasPageEditor v-model="config" />
  </div>
</template>

<script setup>
const supabase = useSupabase()
const runtime = useRuntimeConfig()
const storeUrl = runtime.public.storeUrl
const saving = ref(false)

const config = reactive({
  header: {
    badge: 'Explora por aroma',
    title: 'Encuentra tu',
    highlight: 'Aroma',
    description: 'Cada aroma tiene su propia historia. Descubre su familia olfativa, sus notas y en qué productos puedes llevarlo.',
  },
  blocks: {
    header: { enabled: true, compact: false },
    families: { enabled: true },
    notes: { enabled: true },
    products: { enabled: true },
  },
  cta: {
    label: 'Ver productos',
  },
})

async function loadConfig() {
  try {
    const { data, error } = await supabase.from('site_config').select('*').eq('key', 'aromas_page').single()
    if (error) throw error
    if (data?.value) {
      if (data.value.header) Object.assign(config.header, data.value.header)
      if (data.value.blocks && typeof data.value.blocks === 'object') {
        Object.assign(config.blocks, data.value.blocks)
        Object.keys(config.blocks).forEach((k) => {
          const b = config.blocks[k]
          config.blocks[k] = typeof b === 'object' && b ? { enabled: true, ...b } : { enabled: true }
        })
      }
      if (data.value.cta) Object.assign(config.cta, data.value.cta)
    }
  } catch (e) {
    console.error('Error cargando config de Aromas:', e)
  }
}

async function handleSave() {
  saving.value = true
  try {
    await $fetch('/api/site/config', {
      method: 'PUT',
      body: { entries: [{ key: 'aromas_page', value: { ...config } }] },
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
