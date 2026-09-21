<template>
  <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
    <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
      <span class="text-2xl">📢</span>
      <div>
        <h3 class="text-lg font-bold text-gray-900">Cinta Promocional</h3>
        <p class="text-sm text-gray-500">
          Barra superior del sitio (sobre el menú). Configura hasta 3 mensajes que se desplazan en movimiento continuo.
        </p>
      </div>
    </div>

    <div class="p-6 space-y-6">
      <!-- Toggle -->
      <div class="flex items-center justify-between p-4 rounded-xl border border-gray-200">
        <div>
          <p class="text-sm font-medium text-gray-800">Mostrar cinta promocional</p>
          <p class="text-xs text-gray-400 mt-0.5">Al desactivarla, la cinta deja de aparecer en toda la tienda.</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="config.enabled" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          <span class="ms-3 text-sm font-medium" :class="config.enabled ? 'text-primary-600' : 'text-gray-400'">
            {{ config.enabled ? 'Activo' : 'Inactivo' }}
          </span>
        </label>
      </div>

      <!-- Apariencia -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4" :class="{ 'opacity-50 pointer-events-none': !config.enabled }">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Color de fondo</label>
          <div class="flex items-center gap-2">
            <input
              type="color"
              :value="config.bg_color || '#0f766e'"
              @input="config.bg_color = $event.target.value"
              class="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer bg-transparent p-0.5 flex-shrink-0"
            />
            <input v-model="config.bg_color" type="text" placeholder="#0f766e" class="flex-1 px-3 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
          <p class="text-xs text-gray-400 mt-1">Vacío = usa el degradado verde por defecto.</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Color del texto</label>
          <div class="flex items-center gap-2">
            <input
              type="color"
              :value="config.text_color || '#ffffff'"
              @input="config.text_color = $event.target.value"
              class="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer bg-transparent p-0.5 flex-shrink-0"
            />
            <input v-model="config.text_color" type="text" placeholder="#ffffff" class="flex-1 px-3 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
          <p class="text-xs text-gray-400 mt-1">Vacío = blanco.</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Velocidad (segundos por mensaje)</label>
          <input v-model.number="config.speed" type="number" min="2" max="30" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
      </div>

      <!-- Mensajes (hasta 3) -->
      <div :class="{ 'opacity-50 pointer-events-none': !config.enabled }">
        <p class="text-sm font-medium text-gray-800 mb-1">Mensajes de la cinta (hasta 3)</p>
        <p class="text-xs text-gray-400 mb-3">
          Los mensajes con texto se muestran en orden y se desplazan en cinta. Puedes usar <code class="text-[11px]">{monto}</code> para el mínimo de envío gratis. Deja vacío el que no necesites.
        </p>

        <div class="space-y-3">
          <div
            v-for="(msg, i) in config.messages"
            :key="i"
            class="rounded-xl border border-gray-200 p-4 space-y-3"
            :class="msg.text.trim() ? 'bg-white' : 'bg-gray-50/50'"
          >
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Mensaje {{ i + 1 }}</p>
            <input
              v-model="msg.text"
              type="text"
              placeholder="Ej. Envío gratis en compras mayores a {monto}"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
            />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                v-model="msg.link"
                type="text"
                placeholder="Enlace opcional (ej. /catalog)"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"
              />
              <input
                v-model="msg.label"
                type="text"
                placeholder="Texto del enlace (opcional, ej. Ver catálogo)"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Ajustes del carrito (envío) -->
      <div class="border-t border-gray-100 pt-4">
        <p class="text-sm font-medium text-gray-800 mb-1">Ajustes de envío del carrito</p>
        <p class="text-xs text-gray-400 mb-3">Estos valores alimentan la barra de progreso de envío gratis y el costo de envío en el carrito (no son mensajes de la cinta).</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Monto mínimo envío gratis ($)</label>
            <input v-model.number="config.free_shipping_min" type="number" min="0" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Costo de envío menor ($)</label>
            <input v-model.number="config.shipping_fee" type="number" min="0" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          </div>
        </div>
      </div>

      <!-- Programación -->
      <div class="border-t border-gray-100 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Inicio <span class="text-gray-400 text-xs">(opcional)</span></label>
          <input v-model="config.start_at" type="datetime-local" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Fin <span class="text-gray-400 text-xs">(opcional)</span></label>
          <input v-model="config.end_at" type="datetime-local" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
          <p class="text-xs text-gray-400 mt-1">La cinta solo se muestra dentro de este rango de fechas.</p>
        </div>
      </div>

      <!-- Guardar -->
      <div class="flex items-center justify-end pt-2 border-t border-gray-100">
        <button
          @click="saveShippingBar"
          :disabled="saving"
          class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          {{ saving ? 'Guardando...' : '💾 Guardar cinta promocional' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const supabaseAdmin = useSupabaseAdmin()

const saving = ref(false)

const EMPTY_MESSAGE = { text: '', link: '', label: '' }

// Config de la cinta promocional. Por defecto DESACTIVADA hasta cargar la real.
const config = reactive({
  enabled: false,
  free_shipping_min: 200,
  shipping_fee: 50,
  bg_color: '',
  text_color: '',
  speed: 6,
  messages: [
    { ...EMPTY_MESSAGE },
    { ...EMPTY_MESSAGE },
    { ...EMPTY_MESSAGE },
  ],
  start_at: '',
  end_at: '',
})

function normalizeMessages(messages) {
  if (!Array.isArray(messages)) messages = []
  // Rellenar hasta 3 huecos y recortar a 3
  const list = messages.slice(0, 3).map(m => ({
    text: m?.text || '',
    link: m?.link || '',
    label: m?.label || '',
  }))
  while (list.length < 3) list.push({ ...EMPTY_MESSAGE })
  return list
}

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
      const v = { ...data.value }
      // Migrar formato viejo (message/cta_*) al nuevo (messages[])
      if (!Array.isArray(v.messages)) {
        v.messages = [{ text: v.message || '', link: v.cta_link || '', label: v.cta_text || '' }]
      }
      v.messages = normalizeMessages(v.messages)
      Object.assign(config, v)
    }
  } catch (e) {
    console.warn('No se pudo cargar la config de la cinta promocional:', e.message)
  }
}

async function saveShippingBar() {
  saving.value = true
  try {
    // Solo se guardan los mensajes con texto (hasta 3).
    const value = {
      ...config,
      messages: config.messages.filter(m => String(m.text || '').trim()),
    }
    // Escritura vía endpoint server (service_role). El cliente anónimo del
    // navegador NO puede escribir site_config (RLS lo bloquea).
    await $fetch('/api/site/config', {
      method: 'PUT',
      body: { entries: [{ key: 'shipping_bar', value }] },
    })
    alert(config.enabled ? '✅ Cinta promocional guardada' : '✅ Cinta promocional desactivada')
  } catch (e) {
    console.error('Error guardando cinta promocional:', e)
    alert('Error al guardar: ' + e.message)
  } finally {
    saving.value = false
  }
}

onMounted(loadConfig)
</script>
