<template>
  <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
    <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
      <span class="text-2xl">💎</span>
      <div>
        <h3 class="text-lg font-bold text-gray-900">Pilares / Valores</h3>
        <p class="text-sm text-gray-500">Las tarjetas de "¿Qué nos hace diferentes?" en Sobre Nosotros.</p>
      </div>
    </div>

    <div class="p-6 space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">Agrega, edita o elimina valores.</p>
        <button @click="addValue" class="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Agregar valor</button>
      </div>

      <div v-if="values.length === 0" class="text-sm text-gray-400 text-center py-6 border border-dashed border-gray-200 rounded-lg">
        Aún no hay valores. Haz clic en "+ Agregar valor".
      </div>

      <div v-for="(value, index) in values" :key="index" class="p-4 bg-gray-50 rounded-lg space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700">Valor {{ index + 1 }}</span>
          <button @click="values.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Icono</label>
            <select v-model="value.icon" class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
              <option value="leaf">🌿 Hoja</option>
              <option value="shield">🛡️ Escudo</option>
              <option value="heart">❤️ Corazón</option>
              <option value="star">✨ Estrella</option>
            </select>
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs font-medium text-gray-600 mb-1">Título</label>
            <input v-model="value.title" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Descripción</label>
          <textarea v-model="value.description" rows="2" class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
        </div>
      </div>

      <div class="flex items-center justify-end pt-3 border-t border-gray-100">
        <button
          @click="save"
          :disabled="saving"
          class="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          {{ saving ? 'Guardando...' : '💾 Guardar valores' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const saving = ref(false)
const values = ref([])

function addValue() {
  values.value.push({ icon: 'leaf', title: '', description: '' })
}

async function load() {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'brand_values')
      .maybeSingle()
    if (error) throw error
    if (Array.isArray(data?.value)) values.value = data.value
  } catch (e) {
    console.warn('No se pudo cargar brand_values:', e.message)
  }
}

async function save() {
  saving.value = true
  try {
    // Descarta entradas vacías para no ensuciar la BD.
    const clean = values.value.filter(v => v && (String(v.title || '').trim() || String(v.description || '').trim()))
    await $fetch('/api/site/config', {
      method: 'PUT',
      body: { entries: [{ key: 'brand_values', value: clean }] },
    })
    alert('✅ Valores guardados')
  } catch (e) {
    console.error('Error guardando valores:', e)
    alert('Error al guardar: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
