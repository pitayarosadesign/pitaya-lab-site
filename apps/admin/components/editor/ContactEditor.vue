<template>
  <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
    <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
      <span class="text-2xl">📞</span>
      <div>
        <h3 class="text-lg font-bold text-gray-900">Contacto</h3>
        <p class="text-sm text-gray-500">Correo, teléfono y WhatsApp. Se usan en el footer y en los botones de WhatsApp de la tienda.</p>
      </div>
    </div>

    <div class="p-6 space-y-5">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
          <input
            v-model.trim="form.email"
            type="email"
            placeholder="contacto@pitayalab.com.mx"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            v-model.trim="form.phone"
            type="tel"
            placeholder="+52 33 1234 5678"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">WhatsApp (solo dígitos, con país)</label>
          <input
            v-model.trim="form.whatsapp"
            type="tel"
            placeholder="5213333333333"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"
          />
          <p class="text-xs text-gray-400 mt-1">Ej. 52 + lada + número, sin signos ni espacios.</p>
        </div>
      </div>

      <div class="flex items-center justify-end pt-2 border-t border-gray-100">
        <button
          @click="save"
          :disabled="saving"
          class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          {{ saving ? 'Guardando...' : '💾 Guardar contacto' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const saving = ref(false)

const defaults = {
  email: 'contacto@pitayalab.com.mx',
  phone: '',
  whatsapp: '523333856064',
}

const form = reactive({ ...defaults })

async function load() {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'contact')
      .maybeSingle()
    if (error) throw error
    if (data?.value) Object.assign(form, data.value)
  } catch (e) {
    console.warn('No se pudo cargar el contacto:', e.message)
  }
}

async function save() {
  saving.value = true
  try {
    await $fetch('/api/site/config', {
      method: 'PUT',
      body: { entries: [{ key: 'contact', value: { ...form } }] },
    })
    alert('✅ Contacto guardado')
  } catch (e) {
    console.error('Error guardando contacto:', e)
    alert('Error al guardar: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
