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

    <EditorPageTabs active="product" />

    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">🏷️ Página de Producto</h2>
        <p class="text-sm text-gray-400 mt-0.5">Edita los textos de disponibilidad y pedidos de la página de producto</p>
      </div>
      <button
        @click="handleSave"
        class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        :disabled="saving"
      >
        {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
      </button>
    </div>

    <EditorProductPageEditor v-model="config" />
  </div>
</template>

<script setup>
const supabase = useSupabase()
const supabaseAdmin = useSupabaseAdmin()
const runtime = useRuntimeConfig()
const storeUrl = runtime.public.storeUrl
const saving = ref(false)

const config = reactive({
  backorder_message: 'Preparación sobre pedido: se elabora artesanalmente en taller (3-4 días), puede tardar más según demanda',
  backorder_button_label: 'Agregar al carrito (sobre pedido)',
  in_stock_label: 'En stock',
  low_stock_label: '¡Solo quedan X!',
})

async function loadConfig() {
  try {
    const { data, error } = await supabase.from('site_config').select('*').eq('key', 'product_page').single()
    if (error) throw error
    if (data?.value) {
      Object.assign(config, data.value)
    }
  } catch (e) {
    console.error('Error cargando config de Página de Producto:', e)
  }
}

async function handleSave() {
  saving.value = true
  try {
    const client = supabaseAdmin || supabase
    const { error } = await client
      .from('site_config')
      .upsert({ key: 'product_page', value: { ...config }, updated_at: new Date().toISOString() }, { onConflict: 'key' })
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
