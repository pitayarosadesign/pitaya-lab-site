<template>
  <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
    <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
      <span class="text-2xl">🗓️</span>
      <div>
        <h3 class="text-lg font-bold text-gray-900">Entrega Estimada</h3>
        <p class="text-sm text-gray-500">
          Fecha de entrega que se muestra en el carrito y en el checkout. Se calcula sumando días hábiles (lunes a viernes) a la fecha de compra.
        </p>
      </div>
    </div>

    <div class="p-6 space-y-5">
      <!-- Toggle -->
      <div class="flex items-center justify-between p-4 rounded-xl border border-gray-200">
        <div>
          <p class="text-sm font-medium text-gray-800">Mostrar entrega estimada</p>
          <p class="text-xs text-gray-400 mt-0.5">Al desactivarla, no se muestra la fecha estimada en el carrito.</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="config.enabled" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          <span class="ms-3 text-sm font-medium" :class="config.enabled ? 'text-primary-600' : 'text-gray-400'">
            {{ config.enabled ? 'Activo' : 'Inactivo' }}
          </span>
        </label>
      </div>

      <!-- Opciones -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4" :class="{ 'opacity-50 pointer-events-none': !config.enabled }">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Preparación (días hábiles) · mín</label>
          <input v-model.number="config.prepDaysMin" type="number" min="0" max="30" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Preparación (días hábiles) · máx</label>
          <input v-model.number="config.prepDaysMax" type="number" min="0" max="30" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Envío / mensajería (días hábiles) · mín</label>
          <input v-model.number="config.transitDaysMin" type="number" min="0" max="30" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Envío / mensajería (días hábiles) · máx</label>
          <input v-model.number="config.transitDaysMax" type="number" min="0" max="30" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Hora de corte (hh)</label>
          <input v-model.number="config.sameDayCutoffHour" type="number" min="0" max="23" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Hora de corte (min)</label>
          <input v-model.number="config.sameDayCutoffMinute" type="number" min="0" max="59" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          <p class="text-xs text-gray-400 mt-1">Órdenes pagadas antes de esta hora inician el mismo día hábil.</p>
        </div>
      </div>

      <!-- Resumen del rango visible -->
      <div class="rounded-xl bg-primary-50/70 border border-primary-100 px-4 py-3">
        <p class="text-sm text-primary-800">
          🚚 El cliente verá: <strong>Entrega estimada el [fecha]</strong>
          <span class="block text-xs text-primary-600 mt-1">
            Rango total {{ totalMin }} a {{ totalMax }} días hábiles (preparación + envío).
          </span>
        </p>
      </div>

      <!-- Guardar -->
      <div class="flex items-center justify-end pt-2 border-t border-gray-100">
        <button
          @click="saveDeliveryConfig"
          :disabled="saving"
          class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          {{ saving ? 'Guardando...' : '💾 Guardar entrega estimada' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const supabaseAdmin = useSupabaseAdmin()

const saving = ref(false)

// Valores por defecto (total 3-5 días hábiles: prep 1-2 + envío 2-3)
const config = reactive({
  enabled: true,
  sameDayCutoffHour: 13,
  sameDayCutoffMinute: 0,
  prepDaysMin: 1,
  prepDaysMax: 2,
  transitDaysMin: 2,
  transitDaysMax: 3,
})

const totalMin = computed(() => (config.prepDaysMin || 0) + (config.transitDaysMin || 0))
const totalMax = computed(() => (config.prepDaysMax || 0) + (config.transitDaysMax || 0))

async function loadConfig() {
  try {
    const client = supabaseAdmin || supabase
    const { data, error } = await client
      .from('site_config')
      .select('value')
      .eq('key', 'delivery_estimates')
      .single()
    if (error) throw error
    if (data?.value) {
      Object.assign(config, data.value)
    }
  } catch (e) {
    console.warn('No se pudo cargar la config de entrega estimada:', e.message)
  }
}

async function saveDeliveryConfig() {
  saving.value = true
  try {
    await $fetch('/api/site/config', {
      method: 'PUT',
      body: { entries: [{ key: 'delivery_estimates', value: { ...config } }] },
    })
    alert('✅ Entrega estimada guardada')
  } catch (e) {
    console.error('Error guardando entrega estimada:', e)
    alert('Error al guardar: ' + e.message)
  } finally {
    saving.value = false
  }
}

onMounted(loadConfig)
</script>
