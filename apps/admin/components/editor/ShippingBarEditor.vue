<template>
  <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
    <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
      <span class="text-2xl">🚚</span>
      <div>
        <h3 class="text-lg font-bold text-gray-900">Barra Promocional de Envíos</h3>
        <p class="text-sm text-gray-500">Barra superior del sitio (sobre el menú de navegación). Actívala o desactívala según tu campaña.</p>
      </div>
    </div>

    <div class="p-6 space-y-5">
      <!-- Toggle encendido/apagado -->
      <div class="flex items-center justify-between p-4 rounded-xl border border-gray-200">
        <div>
          <p class="text-sm font-medium text-gray-800">Mostrar barra promocional</p>
          <p class="text-xs text-gray-400 mt-0.5">Al desactivarla, la barra deja de aparecer en la tienda completa.</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="config.enabled" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          <span class="ms-3 text-sm font-medium" :class="config.enabled ? 'text-primary-600' : 'text-gray-400'">
            {{ config.enabled ? 'Activo' : 'Inactivo' }}
          </span>
        </label>
      </div>

      <!-- Opciones (deshabilitadas si está inactiva) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4" :class="{ 'opacity-50 pointer-events-none': !config.enabled }">
        <div class="md:col-span-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Mensaje de la barra</label>
          <input v-model="config.message" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          <p class="text-xs text-gray-400 mt-1.5">Usa <code class="text-[11px]">{monto}</code> para el mínimo de envío gratis y <code class="text-[11px]">{mensajerias}</code> para las paqueterías.</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Monto mínimo envío gratis ($)</label>
          <input v-model.number="config.free_shipping_min" type="number" min="0" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Costo de envío menor ($)</label>
          <input v-model.number="config.shipping_fee" type="number" min="0" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tiempo estimado</label>
          <input v-model="config.delivery_days" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" placeholder="3 a 5 días hábiles" />
        </div>
        <div class="md:col-span-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Mensajerías (separadas por coma)</label>
          <input v-model="couriersText" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón (CTA)</label>
          <input v-model="config.cta_text" type="text" placeholder="Ej. Ver envíos" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Enlace del botón (CTA)</label>
          <input v-model="config.cta_link" type="text" placeholder="/catalog o https://..." class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Color de fondo <span class="text-gray-400 text-xs">(hex, opcional)</span></label>
          <input v-model="config.bg_color" type="text" placeholder="#0f766e" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          <p class="text-xs text-gray-400 mt-1">Vacío = usa el degradado verde por defecto.</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Inicio <span class="text-gray-400 text-xs">(opcional)</span></label>
          <input v-model="config.start_at" type="datetime-local" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Fin <span class="text-gray-400 text-xs">(opcional)</span></label>
          <input v-model="config.end_at" type="datetime-local" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          <p class="text-xs text-gray-400 mt-1">La barra solo se muestra dentro de este rango de fechas.</p>
        </div>
      </div>

      <!-- Botón guardar -->
      <div class="flex items-center justify-end pt-2 border-t border-gray-100">
        <button
          @click="saveShippingBar"
          :disabled="saving"
          class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          {{ saving ? 'Guardando...' : '💾 Guardar barra promocional' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const supabaseAdmin = useSupabaseAdmin()

const saving = ref(false)

// Config de la barra promocional. Por defecto DESACTIVADA hasta cargar la real.
const config = reactive({
  enabled: false,
  free_shipping_min: 200,
  shipping_fee: 50,
  couriers: ['Paquete Express', 'Estafeta', 'FedEx'],
  delivery_days: '3 a 5 días hábiles',
  message: 'Envío gratis en compras mayores a {monto} • {mensajerias}',
  cta_text: '',
  cta_link: '',
  bg_color: '',
  start_at: '',
  end_at: '',
})

const couriersText = computed({
  get: () => (Array.isArray(config.couriers) ? config.couriers.join(', ') : ''),
  set: (val) => {
    config.couriers = val.split(',').map(c => c.trim()).filter(Boolean)
  },
})

async function loadConfig() {
  try {
    const client = supabaseAdmin || supabase
    const { data, error } = await client
      .from('site_config')
      .select('value')
      .eq('key', 'shipping_bar')
      .single()
    if (error) throw error
    if (data?.value) {
      Object.assign(config, data.value)
    }
  } catch (e) {
    console.warn('No se pudo cargar la config de la barra promocional:', e.message)
  }
}

async function saveShippingBar() {
  saving.value = true
  try {
    // Escritura vía endpoint server (service_role). El cliente anónimo del
    // navegador NO puede escribir site_config (RLS lo bloquea).
    await $fetch('/api/site/config', {
      method: 'PUT',
      body: { entries: [{ key: 'shipping_bar', value: { ...config } }] },
    })
    alert(config.enabled ? '✅ Barra promocional activada' : '✅ Barra promocional desactivada')
  } catch (e) {
    console.error('Error guardando barra promocional:', e)
    alert('Error al guardar: ' + e.message)
  } finally {
    saving.value = false
  }
}

onMounted(loadConfig)
</script>
