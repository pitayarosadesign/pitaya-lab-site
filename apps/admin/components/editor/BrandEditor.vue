<template>
  <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
    <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
      <span class="text-2xl">🏷️</span>
      <div>
        <h3 class="text-lg font-bold text-gray-900">Marca</h3>
        <p class="text-sm text-gray-500">Nombre, eslogan y logo que se muestran en el encabezado y pie de página.</p>
      </div>
    </div>

    <div class="p-6 space-y-5">
      <!-- Vista previa del logo -->
      <div class="flex items-center gap-4">
        <img
          v-if="form.logo_url"
          :src="form.logo_url"
          alt="Logo de la marca"
          class="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm"
        />
        <div
          v-else
          class="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-400"
        >
          Sin logo
        </div>
        <p class="text-xs text-gray-400">Así se ve el logo en el menú superior.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="PITAYA LAB"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Eslogan</label>
          <input
            v-model="form.tagline"
            type="text"
            placeholder="Fragancias que conectan"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">URL del logo</label>
          <input
            v-model="form.logo_url"
            type="text"
            placeholder="/images/brand/logo-pitayalab.png"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"
          />
        </div>
      </div>

      <div class="flex items-center justify-end pt-3 border-t border-gray-100">
        <button
          @click="save"
          :disabled="saving"
          class="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          {{ saving ? 'Guardando...' : '💾 Guardar marca' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const saving = ref(false)
const form = reactive({
  name: 'PITAYA LAB',
  tagline: 'Fragancias que conectan',
  logo_url: '/images/brand/logo-pitayalab.png',
})

async function load() {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'brand')
      .maybeSingle()
    if (error) throw error
    if (data?.value) Object.assign(form, data.value)
  } catch (e) {
    console.warn('No se pudo cargar la marca:', e.message)
  }
}

async function save() {
  saving.value = true
  try {
    await $fetch('/api/site/config', {
      method: 'PUT',
      body: { entries: [{ key: 'brand', value: { ...form } }] },
    })
    alert('✅ Marca guardada')
  } catch (e) {
    console.error('Error guardando marca:', e)
    alert('Error al guardar: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
