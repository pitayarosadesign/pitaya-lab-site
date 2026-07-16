<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">🌐 Editor del Sitio Web</h1>
      <button
        @click="handleSave"
        class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        :disabled="saving"
      >
        {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
      </button>
    </div>

    <!-- Hero Section -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 class="text-lg font-semibold text-gray-900">🏠 Hero (Portada)</h2>
      <p class="text-sm text-gray-400">Texto principal que se ve al entrar al sitio.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título principal</label>
          <input v-model="config.hero.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
          <input v-model="config.hero.subtitle" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
          <input v-model="config.hero.cta_text" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Link del botón</label>
          <input v-model="config.hero.cta_link" type="url" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
    </div>

    <!-- Productos Section -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 class="text-lg font-semibold text-gray-900">📦 Sección de Productos</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo (etiqueta)</label>
          <input v-model="config.products_section.subtitle" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="config.products_section.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="config.products_section.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
    </div>

    <!-- Brand Values -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 class="text-lg font-semibold text-gray-900">🎯 Valores de la Marca</h2>
      <p class="text-sm text-gray-400">Los 4 valores que aparecen en "¿Por qué elegir PITAYA LAB?"</p>
      
      <div v-for="(value, index) in config.brand_values" :key="index" class="p-4 bg-gray-50 rounded-lg space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700">Valor {{ index + 1 }}</span>
          <button @click="removeBrandValue(index)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input v-model="value.title" type="text" placeholder="Título" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <select v-model="value.icon" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm">
            <option value="leaf">🍃 Hoja</option>
            <option value="shield">🛡️ Escudo</option>
            <option value="heart">❤️ Corazón</option>
            <option value="sparkles">✨ Estrellas</option>
          </select>
        </div>
        <textarea v-model="value.description" rows="2" placeholder="Descripción" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
      </div>
      <button @click="addBrandValue" class="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Agregar valor</button>
    </div>

    <!-- Aromas Section -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 class="text-lg font-semibold text-gray-900">🌸 Sección de Aromas</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo (etiqueta)</label>
          <input v-model="config.scents_section.subtitle" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="config.scents_section.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="config.scents_section.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
    </div>

    <!-- CTA Final -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 class="text-lg font-semibold text-gray-900">🚀 CTA Final</h2>
      <p class="text-sm text-gray-400">La sección de llamada a la acción al final de la página.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="config.cta_section.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="config.cta_section.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
          <input v-model="config.cta_section.button_text" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Link del botón</label>
          <input v-model="config.cta_section.button_link" type="url" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
    </div>

    <!-- 🚚 Barra de Envíos -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">🚚 Barra de Envíos</h2>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="config.shipping_bar.enabled" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          <span class="ms-3 text-sm font-medium text-gray-600">{{ config.shipping_bar.enabled ? 'Activo' : 'Inactivo' }}</span>
        </label>
      </div>
      <p class="text-sm text-gray-400">Barra promocional que aparece arriba del navbar.</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del mensaje</label>
          <textarea v-model="config.shipping_bar.text" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Monto mínimo envío gratis ($)</label>
          <input v-model.number="config.shipping_bar.free_shipping_min" type="number" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Costo envío menor ($)</label>
          <input v-model.number="config.shipping_bar.shipping_fee" type="number" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tiempo estimado</label>
          <input v-model="config.shipping_bar.delivery_days" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Mensajerías (separadas por coma)</label>
          <input v-model="couriersText" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
    </div>

    <!-- 📦 Sección de Confianza -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">📦 Sección de Confianza</h2>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="config.shipping_trust.enabled" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          <span class="ms-3 text-sm font-medium text-gray-600">{{ config.shipping_trust.enabled ? 'Activo' : 'Inactivo' }}</span>
        </label>
      </div>
      <p class="text-sm text-gray-400">Aparece en la página principal entre los valores y la sección de aromas.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="config.shipping_trust.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
          <input v-model="config.shipping_trust.subtitle" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
      <div v-for="(feature, index) in config.shipping_trust.features" :key="index" class="p-4 bg-gray-50 rounded-lg space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700">Característica {{ index + 1 }}</span>
          <button @click="config.shipping_trust.features.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input v-model="feature.title" type="text" placeholder="Título" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <input v-model="feature.description" type="text" placeholder="Descripción" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <select v-model="feature.icon" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm">
            <option value="truck">🚚 Camión</option>
            <option value="package">📦 Paquete</option>
            <option value="clock">⏱ Reloj</option>
            <option value="shield">🛡️ Escudo</option>
            <option value="heart">❤️ Corazón</option>
          </select>
        </div>
      </div>
      <button @click="config.shipping_trust.features.push({ icon: 'truck', title: '', description: '' })" class="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Agregar característica</button>
    </div>

    <!-- Botón guardar (abajo también) -->
    <div class="flex items-center justify-end gap-3">
      <button
        @click="loadConfig"
        class="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
      >
        Descartar cambios
      </button>
      <button
        @click="handleSave"
        class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
        :disabled="saving"
      >
        {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
      </button>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const supabaseAdmin = useSupabaseAdmin()
const saving = ref(false)

const config = reactive({
  hero: { title: '', subtitle: '', cta_text: '', cta_link: '' },
  products_section: { title: '', subtitle: '', description: '' },
  brand_values: [],
  scents_section: { title: '', subtitle: '', description: '' },
  cta_section: { title: '', description: '', button_text: '', button_link: '' },
  shipping_bar: {
    enabled: true,
    text: 'Envío gratis en compras mayores a $299 MXN • Paquete Express, Estafeta y FedEx • 3 a 5 días hábiles',
    free_shipping_min: 299,
    shipping_fee: 50,
    couriers: ['Paquete Express', 'Estafeta', 'FedEx'],
    delivery_days: '3 a 5 días hábiles',
  },
  shipping_trust: {
    enabled: true,
    title: 'Envíos seguros a todo México',
    subtitle: 'Recibe tus productos de forma rápida y confiable',
    features: [
      { icon: 'truck', title: 'Envío gratis', description: 'En todas tus compras mayores a $299 MXN' },
      { icon: 'package', title: 'Costo simbólico', description: 'Compras menores a $299 solo $50 MXN de envío' },
      { icon: 'clock', title: '3 a 5 días hábiles', description: 'Entregamos a todo México con mensajerías de prestigio' },
    ],
  },
})

// Computed para manejar couriers como texto separado por comas
const couriersText = computed({
  get: () => config.shipping_bar.couriers.join(', '),
  set: (val) => { config.shipping_bar.couriers = val.split(',').map(c => c.trim()).filter(c => c) }
})

async function loadConfig() {
  try {
    const { data, error } = await supabase.from('site_config').select('*')
    if (error) throw error
    
    if (data) {
      data.forEach(item => {
        if (item.key === 'hero') config.hero = item.value
        else if (item.key === 'products_section') config.products_section = item.value
        else if (item.key === 'brand_values') config.brand_values = item.value
        else if (item.key === 'scents_section') config.scents_section = item.value
        else if (item.key === 'cta_section') config.cta_section = item.value
        else if (item.key === 'shipping_bar') Object.assign(config.shipping_bar, item.value)
        else if (item.key === 'shipping_trust') Object.assign(config.shipping_trust, item.value)
      })
    }
  } catch (e) {
    console.error('Error cargando config:', e)
  }
}

async function handleSave() {
  saving.value = true
  try {
    // Usamos supabaseAdmin (service role) para saltar RLS al escribir
    const client = supabaseAdmin || supabase

    const sections = [
      { key: 'hero', value: config.hero },
      { key: 'products_section', value: config.products_section },
      { key: 'brand_values', value: config.brand_values },
      { key: 'scents_section', value: config.scents_section },
      { key: 'cta_section', value: config.cta_section },
      { key: 'shipping_bar', value: config.shipping_bar },
      { key: 'shipping_trust', value: config.shipping_trust },
    ]

    for (const section of sections) {
      const { error } = await client
        .from('site_config')
        .upsert({ key: section.key, value: section.value, updated_at: new Date().toISOString() }, { onConflict: 'key' })

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

function addBrandValue() {
  config.brand_values.push({ title: '', description: '', icon: 'leaf' })
}

function removeBrandValue(index) {
  config.brand_values.splice(index, 1)
}

onMounted(() => {
  loadConfig()
})
</script>
