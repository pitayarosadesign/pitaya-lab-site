<template>
  <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
    <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
      <span class="text-2xl">🦶</span>
      <div>
        <h3 class="text-lg font-bold text-gray-900">Pie de Página (Footer)</h3>
        <p class="text-sm text-gray-500">Texto descriptivo y enlaces que se muestran en el footer de toda la tienda.</p>
      </div>
    </div>

    <div class="p-6 space-y-5">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea
          v-model="form.description"
          rows="3"
          class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm resize-y"
        ></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Enlace de Amazon</label>
          <input
            v-model="form.amazon_link"
            type="text"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Enlace Stripe Climate</label>
          <input
            v-model="form.stripe_link"
            type="text"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"
          />
        </div>
      </div>

      <div class="flex items-center justify-between p-4 rounded-xl border border-gray-200">
        <div>
          <p class="text-sm font-medium text-gray-800">Mostrar sello Stripe Climate</p>
          <p class="text-xs text-gray-400 mt-0.5">Insignia "1% para el planeta" en la columna de ayuda.</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="form.show_stripe" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          <span class="ms-3 text-sm font-medium" :class="form.show_stripe ? 'text-primary-600' : 'text-gray-400'">
            {{ form.show_stripe ? 'Visible' : 'Oculto' }}
          </span>
        </label>
      </div>

      <div class="flex items-center justify-end pt-3 border-t border-gray-100">
        <button
          @click="save"
          :disabled="saving"
          class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          {{ saving ? 'Guardando...' : '💾 Guardar footer' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const saving = ref(false)
const form = reactive({
  description: 'Productos botánicos biodegradables que transforman tu hogar en una experiencia sensorial única.',
  amazon_link: 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329?',
  stripe_link: 'https://climate.stripe.com/Ul0lzt',
  show_stripe: true,
})

async function load() {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'footer')
      .maybeSingle()
    if (error) throw error
    if (data?.value) Object.assign(form, data.value)
  } catch (e) {
    console.warn('No se pudo cargar el footer:', e.message)
  }
}

async function save() {
  saving.value = true
  try {
    await $fetch('/api/site/config', {
      method: 'PUT',
      body: { entries: [{ key: 'footer', value: { ...form } }] },
    })
    alert('✅ Footer guardado')
  } catch (e) {
    console.error('Error guardando footer:', e)
    alert('Error al guardar: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
