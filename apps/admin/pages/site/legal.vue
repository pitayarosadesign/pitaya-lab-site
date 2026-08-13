<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">🌐 Editor del Sitio Web</h1>
    </div>

    <PageTabs active="legal" />

    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">📜 Páginas Legales</h2>
        <p class="text-sm text-gray-400 mt-0.5">Edita el contenido de las páginas legales del sitio</p>
      </div>
      <button
        @click="handleSave"
        class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        :disabled="saving"
      >
        {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
      </button>
    </div>

    <!-- Selector de documento legal -->
    <div class="flex items-center gap-2">
      <button
        v-for="doc in legalDocs"
        :key="doc.key"
        @click="activeDoc = doc.key"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
        :class="activeDoc === doc.key
          ? 'bg-primary-50 border-primary-300 text-primary-700'
          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'"
      >
        {{ doc.icon }} {{ doc.label }}
      </button>
    </div>

    <!-- Editor del documento activo -->
    <LegalPageEditor v-if="activeDoc === 'privacy'" v-model="privacyConfig" />
    <LegalPageEditor v-else v-model="termsConfig" />
  </div>
</template>

<script setup>
const supabase = useSupabase()
const supabaseAdmin = useSupabaseAdmin()
const saving = ref(false)

const legalDocs = [
  { key: 'privacy', label: 'Aviso de Privacidad', icon: '🔒' },
  { key: 'terms', label: 'Términos y Condiciones', icon: '⚖️' },
]
const activeDoc = ref('privacy')

const defaultDoc = () => ({
  header: { badge: '', title: '', highlight: '', description: '' },
  sections: [],
  note: '',
})

const privacyConfig = reactive(defaultDoc())
const termsConfig = reactive(defaultDoc())

async function loadConfig() {
  try {
    const { data, error } = await supabase.from('site_config').select('*').in('key', ['privacy_page', 'terms_page'])
    if (error) throw error
    if (data) {
      for (const item of data) {
        const target = item.key === 'privacy_page' ? privacyConfig : termsConfig
        Object.assign(target.header, item.value.header)
        target.sections = item.value.sections || []
        target.note = item.value.note || ''
      }
    }
  } catch (e) {
    console.error('Error cargando config legal:', e)
  }
}

async function handleSave() {
  saving.value = true
  try {
    const client = supabaseAdmin || supabase
    const entries = [
      { key: 'privacy_page', value: { ...privacyConfig } },
      { key: 'terms_page', value: { ...termsConfig } },
    ]
    for (const entry of entries) {
      const { error } = await client
        .from('site_config')
        .upsert({ key: entry.key, value: entry.value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
      if (error) throw error
    }
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
