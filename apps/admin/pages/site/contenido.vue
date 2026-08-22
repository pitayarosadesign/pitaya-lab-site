<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">🌐 Editor del Sitio Web</h1>
      <a href="javascript:void(0)" class="text-sm text-gray-400">Contenido global de secciones</a>
    </div>

    <EditorPageTabs active="contenido" />

    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">🧩 Contenido Global de Secciones</h2>
        <p class="text-sm text-gray-400 mt-0.5">
          Contenido por defecto de las secciones del sitio. Si una sección no se ha personalizado en su página,
          se muestra este contenido. Es editable desde aquí y se guarda en <code class="text-xs">site_config</code>.
        </p>
      </div>
    </div>

    <!-- 🎯 Valores de marca (SectionValues) -->
    <EditorContentCard title="🎯 Valores de marca" desc="Tarjetas de valores que aparecen en la sección 'Valores'." :saving="saving.values" @save="save('values')">
      <div class="space-y-3">
        <div v-for="(v, i) in config.values" :key="i" class="border border-gray-200 rounded-xl p-3 space-y-2 bg-gray-50">
          <div class="grid grid-cols-2 gap-2">
            <input v-model="v.title" placeholder="Título (ej. 100% Natural)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <input v-model="v.icon" placeholder="Icono (leaf / shield / heart / sparkles)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>
          <textarea v-model="v.description" rows="2" placeholder="Descripción" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm w-full"></textarea>
          <div class="flex justify-end">
            <button @click="remove(config.values, i)" class="text-xs text-red-500 hover:text-red-700">Eliminar</button>
          </div>
        </div>
        <button @click="add(config.values, { icon: 'leaf', title: '', description: '' })" class="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg font-medium transition-colors">+ Agregar valor</button>
      </div>
    </EditorContentCard>

    <!-- 🚚 Confianza / Envíos (SectionTrust) -->
    <EditorContentCard title="🚚 Beneficios de envío" desc="Features de la sección de confianza (envíos, costo, tiempos)." :saving="saving.trust" @save="save('trust')">
      <div class="space-y-3">
        <div v-for="(f, i) in config.trust" :key="i" class="border border-gray-200 rounded-xl p-3 space-y-2 bg-gray-50">
          <div class="grid grid-cols-2 gap-2">
            <input v-model="f.title" placeholder="Título (ej. Envío gratis)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <input v-model="f.icon" placeholder="Icono (truck / package / clock / shield)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>
          <textarea v-model="f.description" rows="2" placeholder="Descripción" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm w-full"></textarea>
          <div class="flex justify-end">
            <button @click="remove(config.trust, i)" class="text-xs text-red-500 hover:text-red-700">Eliminar</button>
          </div>
        </div>
        <button @click="add(config.trust, { icon: 'truck', title: '', description: '' })" class="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg font-medium transition-colors">+ Agregar beneficio</button>
      </div>
    </EditorContentCard>

    <!-- 📊 Stats B2B (SectionB2BStats) -->
    <EditorContentCard title="📊 Estadísticas B2B" desc="Indicadores de la barra de confianza de la página B2B." :saving="saving.stats" @save="save('stats')">
      <div class="space-y-3">
        <div v-for="(s, i) in config.stats" :key="i" class="grid grid-cols-2 gap-2 items-center border border-gray-200 rounded-xl p-3 bg-gray-50">
          <input v-model="s.value" placeholder="Valor (ej. 25–35%)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <div class="flex gap-2 items-center">
            <input v-model="s.label" placeholder="Etiqueta (ej. Dto. por volumen)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <button @click="remove(config.stats, i)" class="text-red-500 hover:text-red-700 text-xs flex-shrink-0">✕</button>
          </div>
        </div>
        <button @click="add(config.stats, { value: '', label: '' })" class="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg font-medium transition-colors">+ Agregar estadística</button>
      </div>
    </EditorContentCard>

    <!-- 🏢 Audiencias B2B (SectionB2BAudience) -->
    <EditorContentCard title="🏢 Audiencias B2B" desc="Tarjetas de '¿Para quién es B2B?' (mayoreo, eventos, etiquetado)." :saving="saving.audience" @save="save('audience')">
      <div class="space-y-4">
        <div v-for="(c, i) in config.audience" :key="i" class="border border-gray-200 rounded-xl p-4 space-y-2 bg-gray-50">
          <div class="flex items-center justify-between">
            <input v-model="c.title" placeholder="Título (ej. Mayoreo Comercial)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm w-full mr-2" />
            <button @click="remove(config.audience, i)" class="text-red-500 hover:text-red-700 text-xs flex-shrink-0">Eliminar</button>
          </div>
          <textarea v-model="c.description" rows="2" placeholder="Descripción" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm w-full"></textarea>
          <div class="grid grid-cols-2 gap-2">
            <input v-model="c.icon" placeholder="Emoji / icono (ej. 📦)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <input v-model="c.link" placeholder="Link (ej. #calculadora-mayoreo)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <input v-model="c.cta_text" placeholder="Texto del botón (ej. Cotizar →)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <label class="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" v-model="c.highlight" class="rounded" /> Destacado
            </label>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">Puntos (uno por línea)</label>
            <textarea v-model="c.pointsText" rows="2" placeholder="🎯 Mínimo: 20 piezas\n💸 Hasta 35% dto." class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm w-full" @input="syncPoints(c)"></textarea>
          </div>
        </div>
        <button @click="add(config.audience, { icon: '📦', title: '', description: '', points: [], pointsText: '', link: '#', cta_text: 'Cotizar →', highlight: false })" class="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg font-medium transition-colors">+ Agregar audiencia</button>
      </div>
    </EditorContentCard>

    <!-- ❓ FAQ B2B (SectionB2BFaq) -->
    <EditorContentCard title="❓ Preguntas frecuentes B2B" desc="Título y FAQs de la sección FAQ de la página B2B." :saving="saving.faq" @save="save('faq')">
      <div class="space-y-3">
        <input v-model="config.faq.title" placeholder="Título (ej. Preguntas frecuentes B2B)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        <div v-for="(f, i) in config.faq.faqs" :key="i" class="border border-gray-200 rounded-xl p-3 space-y-2 bg-gray-50">
          <div class="flex items-center justify-between">
            <input v-model="f.q" placeholder="Pregunta" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm w-full mr-2" />
            <button @click="remove(config.faq.faqs, i)" class="text-red-500 hover:text-red-700 text-xs flex-shrink-0">✕</button>
          </div>
          <textarea v-model="f.a" rows="2" placeholder="Respuesta" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm w-full"></textarea>
        </div>
        <button @click="add(config.faq.faqs, { q: '', a: '' })" class="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg font-medium transition-colors">+ Agregar pregunta</button>
      </div>
    </EditorContentCard>

    <!-- ⭐ Reseñas de clientes (SectionReviews) -->
    <EditorContentCard title="⭐ Reseñas de clientes" desc="Testimonios que aparecen en la sección 'Reseñas'." :saving="saving.reviews" @save="save('reviews')">
      <div class="space-y-3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input v-model="config.reviews.title" placeholder="Título (ej. Lo que dicen nuestros clientes)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <input v-model="config.reviews.subtitle" placeholder="Subtítulo (ej. Opiniones reales)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div v-for="(r, i) in config.reviews.items" :key="i" class="border border-gray-200 rounded-xl p-3 space-y-2 bg-gray-50">
          <div class="grid grid-cols-2 gap-2">
            <input v-model="r.author" placeholder="Autor (ej. María F.)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <input v-model="r.product" placeholder="Producto (ej. Bruma Solara)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>
          <div class="flex items-center gap-2">
            <label class="text-xs text-gray-400">Calificación:</label>
            <select v-model="r.rating" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm">
              <option :value="5">5 ⭐⭐⭐⭐⭐</option>
              <option :value="4">4 ⭐⭐⭐⭐</option>
              <option :value="3">3 ⭐⭐⭐</option>
              <option :value="2">2 ⭐⭐</option>
              <option :value="1">1 ⭐</option>
            </select>
            <input v-model="r.image" placeholder="URL de imagen (opcional)" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <button @click="remove(config.reviews.items, i)" class="text-red-500 hover:text-red-700 text-xs flex-shrink-0">✕</button>
          </div>
          <textarea v-model="r.text" rows="2" placeholder="Texto de la reseña" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm w-full"></textarea>
        </div>
        <button @click="add(config.reviews.items, { author: '', rating: 5, product: '', text: '', image: null })" class="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg font-medium transition-colors">+ Agregar reseña</button>
      </div>
    </EditorContentCard>

    <!-- 🚀 CTA Final (SectionCta) -->
    <EditorContentCard title="🚀 CTA Final" desc="Llamada a la acción que aparece al final de la página." :saving="saving.cta" @save="save('cta')">
      <div class="space-y-3">
        <input v-model="config.cta.title" placeholder="Título (ej. ¿Listo para transformar tu hogar?)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm w-full" />
        <textarea v-model="config.cta.description" rows="2" placeholder="Descripción" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm w-full"></textarea>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input v-model="config.cta.button_text" placeholder="Texto del botón (ej. Explorar catálogo)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <input v-model="config.cta.button_link" placeholder="Link del botón (ej. /catalog)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input v-model="config.cta.button_secondary_text" placeholder="Texto botón secundario (opcional)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <input v-model="config.cta.button_secondary_link" placeholder="Link botón secundario (opcional)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
      </div>
    </EditorContentCard>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Contenido de secciones | PITAYA LAB' })

const supabase = useSupabase()
const supabaseAdmin = useSupabaseAdmin()
const saving = reactive({ values: false, trust: false, stats: false, audience: false, faq: false, reviews: false, cta: false })

// Estructura editable replicada desde la migración 018
const config = reactive({
  values: [],          // section_values
  trust: [],           // section_trust
  stats: [],           // b2b_stats
  audience: [],        // b2b_audience
  faq: { title: '', faqs: [] },  // b2b_faq
  reviews: { title: '', subtitle: '', items: [] },  // section_reviews
  cta: { title: '', description: '', button_text: '', button_link: '', button_secondary_text: '', button_secondary_link: '' },  // section_cta
})

// Mapeo local → clave de site_config
const SECTION_KEY = {
  values: 'section_values',
  trust: 'section_trust',
  stats: 'b2b_stats',
  audience: 'b2b_audience',
  faq: 'b2b_faq',
  reviews: 'section_reviews',
  cta: 'section_cta',
}

async function loadConfig() {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('key, value')
      .in('key', Object.values(SECTION_KEY))
    if (error) throw error
    if (Array.isArray(data)) {
      for (const row of data) {
        const v = row.value
        switch (row.key) {
          case 'section_values': config.values = v.values || []; break
          case 'section_trust': config.trust = v.features || []; break
          case 'b2b_stats': config.stats = v.stats || []; break
          case 'b2b_audience':
            config.audience = (v.cards || []).map(deserializeCard)
            break
          case 'b2b_faq':
            config.faq.title = v.title || ''
            config.faq.faqs = v.faqs || []
            break
          case 'section_reviews':
            config.reviews.title = v.title || ''
            config.reviews.subtitle = v.subtitle || ''
            config.reviews.items = v.items || []
            break
          case 'section_cta':
            config.cta.title = v.title || ''
            config.cta.description = v.description || ''
            config.cta.button_text = v.button_text || ''
            config.cta.button_link = v.button_link || ''
            config.cta.button_secondary_text = v.button_secondary_text || ''
            config.cta.button_secondary_link = v.button_secondary_link || ''
            break
        }
      }
    }
  } catch (e) {
    console.error('Error cargando contenido de secciones:', e)
  }
}

function deserializeCard(c) {
  return {
    icon: c.icon || '',
    title: c.title || '',
    description: c.description || '',
    points: c.points || [],
    pointsText: Array.isArray(c.points) ? c.points.join('\n') : '',
    link: c.link || '#',
    cta_text: c.cta_text || '',
    highlight: !!c.highlight,
  }
}

function syncPoints(card) {
  card.points = card.pointsText.split('\n').map(p => p.trim()).filter(Boolean)
}

function add(arr, obj) {
  arr.push({ ...obj })
}

function remove(arr, index) {
  arr.splice(index, 1)
}

async function save(key) {
  saving[key] = true
  try {
    const client = supabaseAdmin || supabase
    let value
    switch (key) {
      case 'values': value = { values: config.values }; break
      case 'trust': value = { features: config.trust }; break
      case 'stats': value = { stats: config.stats }; break
      case 'audience':
        value = { cards: config.audience.map(({ pointsText, ...c }) => c) }
        break
      case 'faq': value = { title: config.faq.title, faqs: config.faq.faqs }; break
      case 'reviews': value = { title: config.reviews.title, subtitle: config.reviews.subtitle, items: config.reviews.items }; break
      case 'cta': value = { ...config.cta }; break
    }
    const { error } = await client
      .from('site_config')
      .upsert({ key: SECTION_KEY[key], value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    if (error) throw error
    alert('✅ Cambios guardados correctamente')
  } catch (e) {
    console.error('Error guardando:', e)
    alert('Error al guardar: ' + e.message)
  } finally {
    saving[key] = false
  }
}

onMounted(loadConfig)
</script>
