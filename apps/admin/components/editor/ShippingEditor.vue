<template>
  <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
    <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
      <span class="text-2xl">🚚</span>
      <div>
        <h3 class="text-lg font-bold text-gray-900">Envíos</h3>
        <p class="text-sm text-gray-500">Umbrales de envío gratis y mínimo de Punto Post. Se usan en ficha, carrito y checkout.</p>
      </div>
    </div>

    <div class="p-6 space-y-5">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Envío gratis a domicilio desde ($)</label>
          <input
            v-model.number="form.free_shipping_min"
            type="number"
            min="0"
            step="1"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Costo de envío estándar ($)</label>
          <input
            v-model.number="form.shipping_fee"
            type="number"
            min="0"
            step="1"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mínimo para Punto Post ($)</label>
          <input
            v-model.number="form.point_post_min"
            type="number"
            min="0"
            step="1"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"
          />
        </div>
      </div>

      <div class="flex items-center justify-end pt-2 border-t border-gray-100">
        <button
          @click="save"
          :disabled="saving"
          class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          {{ saving ? 'Guardando...' : '💾 Guardar envíos' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const saving = ref(false)

const defaults = {
  free_shipping_min: 799,
  shipping_fee: 99,
  point_post_min: 250,
}

const form = reactive({ ...defaults })

async function load() {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'shipping')
      .maybeSingle()
    if (error) throw error
    if (data?.value) Object.assign(form, data.value)
  } catch (e) {
    console.warn('No se pudo cargar la config de envíos:', e.message)
  }
}

async function save() {
  saving.value = true
  try {
    await $fetch('/api/site/config', {
      method: 'PUT',
      body: { entries: [{ key: 'shipping', value: { ...form } }] },
    })
    alert('✅ Configuración de envíos guardada')
  } catch (e) {
    console.error('Error guardando envíos:', e)
    alert('Error al guardar: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
