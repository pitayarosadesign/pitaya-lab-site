<template>
  <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
    <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
      <span class="text-2xl">🔎</span>
      <div>
        <h3 class="text-lg font-bold text-gray-900">SEO de Páginas Fijas</h3>
        <p class="text-sm text-gray-500">Edita el título y la descripción que aparecen en Google para cada página de la tienda. Los campos vacíos usan el texto por defecto.</p>
      </div>
    </div>

    <div class="p-6 space-y-5">
      <!-- Nota -->
      <div class="p-3 rounded-lg bg-amber-50 border border-amber-100 text-xs text-amber-700">
        <strong>Páginas dinámicas excluidas.</strong> Producto, colección y páginas personalizadas generan su SEO automáticamente desde su contenido; no se editan aquí.
      </div>

      <div class="space-y-3">
        <details v-for="route in routes" :key="route.path" class="group rounded-xl border border-gray-200 open:border-primary-200 open:bg-primary-50/30 transition-colors">
          <summary class="flex items-center justify-between px-4 py-3 cursor-pointer list-none select-none">
            <div class="flex items-center gap-3">
              <span class="font-mono text-sm font-semibold text-gray-800">{{ route.path }}</span>
              <span class="text-xs text-gray-400">{{ route.label }}</span>
            </div>
            <span v-if="isCustomized(route.path)" class="text-[10px] font-bold uppercase tracking-wide text-primary-600 bg-primary-100 px-2 py-0.5 rounded-full">editado</span>
            <svg class="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </summary>

          <div class="px-4 pb-4 pt-1 space-y-3 border-t border-gray-100">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Title (título)</label>
              <input v-model="overrides[route.path].title" type="text" :placeholder="route.defaults.title || ''" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Meta description</label>
              <textarea v-model="overrides[route.path].description" rows="2" :placeholder="route.defaults.description || ''" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm resize-none"></textarea>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">og:title <span class="text-gray-400">(opcional)</span></label>
                <input v-model="overrides[route.path].ogTitle" type="text" :placeholder="route.defaults.ogTitle || route.defaults.title || ''" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">og:description <span class="text-gray-400">(opcional)</span></label>
                <input v-model="overrides[route.path].ogDescription" type="text" :placeholder="route.defaults.ogDescription || route.defaults.description || ''" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
              </div>
            </div>
            <div v-if="route.noindex">
              <label class="block text-xs font-medium text-gray-700 mb-1">robots <span class="text-gray-400">(opcional)</span></label>
              <input v-model="overrides[route.path].robots" type="text" :placeholder="route.defaults.robots || ''" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono" />
              <p class="text-xs text-gray-400 mt-1">Ej. <code class="text-[11px]">noindex, nofollow</code>. Vacío = indexable.</p>
            </div>
          </div>
        </details>
      </div>

      <div class="flex items-center justify-end pt-2 border-t border-gray-100">
        <button
          @click="saveSeo"
          :disabled="saving"
          class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          {{ saving ? 'Guardando...' : '💾 Guardar SEO' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const supabaseAdmin = useSupabaseAdmin()

const saving = ref(false)

const routes = [
  { path: '/', label: 'Portada', noindex: false, defaults: { title: 'PITAYA LAB | Velas de Soya, Aceites Aromáticos y Brumas Ecológicas', description: 'Descubre PITAYA LAB: productos botánicos biodegradables. Velas de soya perfumadas, aceites aromáticos y brumas que transforman tu hogar.', ogTitle: 'PITAYA LAB | Fragancias que conectan con la naturaleza', ogDescription: 'Productos botánicos biodegradables para el hogar. Velas de soya, aceites aromáticos y brumas ecológicas.' } },
  { path: '/catalog', label: 'Catálogo', noindex: false, defaults: { title: 'Catálogo de Productos | PITAYA LAB', description: 'Explora nuestro catálogo completo de velas de soya perfumadas, aceites aromáticos para difusores y brumas aromáticas. Productos botánicos biodegradables.', ogTitle: 'Catálogo PITAYA LAB | Velas, Aceites y Brumas', ogDescription: 'Descubre todos nuestros productos: velas de soya clásicas y místicas, aceites aromáticos y brumas. Hecho en México.' } },
  { path: '/about', label: 'Sobre Nosotros', noindex: false, defaults: { title: 'Sobre Nosotros | PITAYA LAB', description: 'Conoce la historia de PITAYA LAB, una marca mexicana de productos botánicos biodegradables. Velas de soya, aceites aromáticos y brumas ecológicas.', ogTitle: 'Sobre PITAYA LAB | Productos Botánicos Mexicanos', ogDescription: 'Historia y valores de PITAYA LAB: fragancias que nacen del corazón de México.' } },
  { path: '/philosophy', label: 'Filosofía', noindex: false, defaults: { title: 'Nuestra Filosofía | PITAYA LAB', description: 'Conoce la filosofía de PITAYA LAB: productos botánicos biodegradables que cuidan de ti y del planeta. Velas de soya, aceites y brumas ecológicas.', ogTitle: 'Filosofía PITAYA LAB | Cuidado Natural del Hogar', ogDescription: 'Manifiesto y compromiso ambiental de PITAYA LAB. Productos biodegradables para un hogar consciente.' } },
  { path: '/faq', label: 'Preguntas Frecuentes', noindex: false, defaults: { title: 'Preguntas Frecuentes | PITAYA LAB', description: 'Resuelve tus dudas sobre productos PITAYA LAB: envíos, formas de uso, ingredientes, Amazon Prime y más.', ogTitle: 'FAQ | PITAYA LAB - Preguntas Frecuentes', ogDescription: 'Todo sobre nuestros productos: cómo comprar, envío Prime 2 días, cómo usar velas y aceites, y más.' } },
  { path: '/contact', label: 'Contacto', noindex: false, defaults: { title: 'Contacto | PITAYA LAB', description: 'Buzón de mensajes de PITAYA LAB. Envíanos tus comentarios, dudas o aclaraciones. Te responderemos a la brevedad.', ogTitle: 'Contacto | PITAYA LAB', ogDescription: 'Buzón de mensajes. Escríbenos tus dudas o comentarios.' } },
  { path: '/resena', label: 'Reseñas', noindex: true, defaults: { title: 'Reseñas | PITAYA LAB', description: 'Cuéntanos tu experiencia con los productos PITAYA LAB. Tu opinión nos ayuda a mejorar y seguir creando aromas que transforman hogares.', robots: 'noindex, follow' } },
  { path: '/privacy', label: 'Aviso de Privacidad', noindex: false, defaults: { title: 'Aviso de Privacidad | PITAYA LAB', description: 'Conoce el aviso de privacidad de PITAYA LAB. Protegemos tus datos personales conforme a la legislación mexicana.', ogTitle: 'Aviso de Privacidad | PITAYA LAB' } },
  { path: '/terms', label: 'Términos y Condiciones', noindex: false, defaults: { title: 'Términos y Condiciones | PITAYA LAB', description: 'Términos y condiciones de uso del sitio web de PITAYA LAB. Productos botánicos biodegradables para el hogar.', ogTitle: 'Términos y Condiciones | PITAYA LAB' } },
  { path: '/maintenance', label: 'Mantenimiento', noindex: true, defaults: { title: 'Mantenimiento | PITAYA LAB', robots: 'noindex, nofollow' } },
  { path: '/b2b', label: 'Mayoreo B2B', noindex: false, defaults: { title: 'Mayoreo & Corporativo B2B | PITAYA LAB', description: 'PITAYA LAB B2B: Precios de mayoreo por volumen (hasta 35% dto.), recuerdos personalizados para bodas y eventos, amenities para hoteles y etiquetado privado. Fragrancias botánicas inspiradas en la alta hotelería.', ogTitle: 'Mayoreo & Corporativo B2B | PITAYA LAB', ogDescription: 'Lleva la alta hotelería a tu negocio y eventos. Precios de mayoreo, recuerdos personalizados y etiquetado privado.' } },
]

// Mapa { '/ruta': { title, description, ogTitle, ogDescription, robots } }
const overrides = reactive(
  Object.fromEntries(routes.map(r => [r.path, { title: '', description: '', ogTitle: '', ogDescription: '', robots: '' }]))
)

function isCustomized(path) {
  const o = overrides[path]
  return !!(o && (o.title || o.description || o.ogTitle || o.ogDescription || o.robots))
}

async function loadSeo() {
  try {
    const client = supabaseAdmin || supabase
    const { data, error } = await client
      .from('site_config')
      .select('value')
      .eq('key', 'page_seo')
      .single()
    if (error) throw error
    if (data?.value && typeof data.value === 'object') {
      for (const path of Object.keys(overrides)) {
        if (data.value[path]) Object.assign(overrides[path], data.value[path])
      }
    }
  } catch (e) {
    console.warn('No se pudo cargar el SEO de páginas:', e.message)
  }
}

async function saveSeo() {
  saving.value = true
  try {
    // Solo persistir rutas con al menos un campo editado.
    const value = {}
    for (const path of Object.keys(overrides)) {
      const o = overrides[path]
      const cleaned = Object.fromEntries(Object.entries(o).filter(([, v]) => v !== ''))
      if (Object.keys(cleaned).length > 0) value[path] = cleaned
    }

    await $fetch('/api/site/config', {
      method: 'PUT',
      body: { entries: [{ key: 'page_seo', value }] },
    })
    alert('✅ SEO guardado correctamente')
  } catch (e) {
    console.error('Error guardando SEO:', e)
    alert('Error al guardar: ' + e.message)
  } finally {
    saving.value = false
  }
}

onMounted(loadSeo)
</script>
