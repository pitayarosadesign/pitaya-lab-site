<template>
  <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
    <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
      <span class="text-2xl">🌐</span>
      <div>
        <h3 class="text-lg font-bold text-gray-900">SEO Global</h3>
        <p class="text-sm text-gray-500">Título, descripción y robots por defecto para todo el sitio. Se usan cuando una página no tiene SEO propio.</p>
      </div>
    </div>

    <div class="p-6 space-y-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título por defecto (title)</label>
          <input v-model="form.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Meta description por defecto</label>
          <textarea v-model="form.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm resize-none"></textarea>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Palabras clave (keywords)</label>
          <input v-model="form.keywords" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">og:title por defecto</label>
          <input v-model="form.ogTitle" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">og:description por defecto</label>
          <input v-model="form.ogDescription" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">robots meta por defecto</label>
          <input v-model="form.robots" type="text" placeholder="index, follow" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">URL base (canonical / sitemap)</label>
          <input v-model="form.baseUrl" type="url" placeholder="https://www.pitayalab.com.mx" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">robots.txt (contenido crudo)</label>
          <textarea v-model="form.robots_txt" rows="8" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"></textarea>
          <p class="text-xs text-gray-400 mt-1">Se sirve en <code class="text-[11px]">/robots.txt</code>.</p>
        </div>
      </div>

      <div class="flex items-center justify-end pt-2 border-t border-gray-100">
        <button
          @click="save"
          :disabled="saving"
          class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          {{ saving ? 'Guardando...' : '💾 Guardar SEO global' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const saving = ref(false)

const defaults = {
  title: 'PITAYA LAB | Velas de Soya, Aceites Aromáticos y Brumas Ecológicas',
  description: 'Descubre PITAYA LAB: velas de soya perfumadas, aceites aromáticos para difusores y brumas aromáticas ecológicas. Productos botánicos biodegradables que transforman tu hogar con fragancias inspiradas en la naturaleza y hoteles de lujo.',
  keywords: 'velas de soya, aceites aromáticos, brumas aromáticas, aromatizantes naturales, Pitaya Lab, productos biodegradables, fragancias para hogar',
  ogTitle: 'PITAYA LAB | Velas de Soya, Aceites Aromáticos y Brumas Ecológicas',
  ogDescription: 'Productos botánicos biodegradables que transforman tu hogar con exquisitas fragancias. Velas de soya, aceites aromáticos y brumas.',
  robots: 'index, follow',
  baseUrl: 'https://www.pitayalab.com.mx',
  robots_txt: 'User-agent: *\nAllow: /\nDisallow: /checkout/\nDisallow: /api/\n\nUser-agent: Googlebot\nAllow: /',
}

const form = reactive({ ...defaults })

async function load() {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'seo_global')
      .maybeSingle()
    if (error) throw error
    if (data?.value) Object.assign(form, data.value)
  } catch (e) {
    console.warn('No se pudo cargar el SEO global:', e.message)
  }
}

async function save() {
  saving.value = true
  try {
    await $fetch('/api/site/config', {
      method: 'PUT',
      body: { entries: [{ key: 'seo_global', value: { ...form } }] },
    })
    alert('✅ SEO global guardado')
  } catch (e) {
    console.error('Error guardando SEO global:', e)
    alert('Error al guardar: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
