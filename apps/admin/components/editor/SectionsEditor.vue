<template>
  <div class="space-y-6">
    <!-- Encabezado -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">🧩 Secciones de la Página</h2>
        <p class="text-sm text-gray-400 mt-0.5">Agrega, elimina y reordena las secciones de la portada</p>
      </div>
      <button
        @click="showAddModal = true"
        class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Agregar sección
      </button>
    </div>

    <!-- Lista de secciones -->
    <div v-if="loading" class="py-12 text-center text-gray-400">
      Cargando secciones...
    </div>

    <div v-else-if="sections.length === 0" class="py-12 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
      <p class="text-4xl mb-3">🧩</p>
      <p>No hay secciones configuradas.</p>
      <p class="text-sm mt-1">Haz clic en "Agregar sección" para empezar.</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="(section, index) in sections"
        :key="section.id"
        class="bg-white rounded-xl border border-gray-200 overflow-hidden"
        :class="{ 'ring-2 ring-primary-300': expandedSection === section.id }"
      >
        <!-- Cabecera de la sección -->
        <div
          class="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100 cursor-grab active:cursor-grabbing"
          draggable="true"
          @dragstart="onDragStart(index)"
          @dragover.prevent
          @drop.prevent="onDrop(index)"
        >
          <span class="text-gray-300 text-lg">⠿</span>
          <span class="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
            {{ typeIcon(section.type) }}
          </span>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-gray-800 truncate">{{ section.title || section.type }}</span>
              <span class="text-[11px] px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 font-medium whitespace-nowrap">{{ section.type }}</span>
            </div>
            <p class="text-[11px] text-gray-400 mt-0.5">Posición {{ index + 1 }}</p>
          </div>

          <!-- Toggle activo -->
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="section.is_active" @change="toggleSection(section)" class="sr-only peer">
            <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
          </label>

          <!-- Botones -->
          <button
            @click="expandedSection = expandedSection === section.id ? null : section.id"
            class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            :title="expandedSection === section.id ? 'Cerrar' : 'Editar'"
          >
            <svg class="w-4 h-4" :class="expandedSection === section.id ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <button
            @click="duplicateSection(section)"
            class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            title="Duplicar"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </button>
          <button
            @click="deleteSection(section)"
            class="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Eliminar"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>

        <!-- Contenido editable de la sección -->
        <div v-if="expandedSection === section.id" class="p-4">
          <SectionForm
            :section="section"
            @save="saveSection(section)"
          />
        </div>
      </div>
    </div>

    <!-- Modal para agregar sección -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="showAddModal = false">
      <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Agregar nueva sección</h3>
          <button @click="showAddModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <p class="text-sm text-gray-500 mb-4">Elige una plantilla por categoría según el propósito en tu tienda:</p>

        <!-- Modal con scroll, agrupado por categoría -->
        <div class="max-h-[60vh] overflow-y-auto pr-1 -mr-1 space-y-5">
          <div v-for="cat in sectionCategories" :key="cat.key" class="space-y-2">
            <div class="flex items-center gap-2 pt-1">
              <span class="text-lg">{{ cat.icon }}</span>
              <div>
                <p class="text-sm font-semibold text-gray-800">{{ cat.label }}</p>
                <p class="text-[11px] text-gray-400">{{ cat.hint }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2.5">
              <button
                v-for="type in sectionTypesByCategory(cat.key)"
                :key="type.value"
                @click="addSection(type.value)"
                class="p-3.5 rounded-xl border border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-all text-left group"
              >
                <span class="text-xl block mb-1.5">{{ type.icon }}</span>
                <span class="text-sm font-medium text-gray-800 block group-hover:text-primary-700">{{ type.label }}</span>
                <span class="text-[11px] text-gray-400 mt-0.5 block leading-snug">{{ type.description }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SectionForm from './SectionForm.vue'

const props = defineProps({
  page: { type: String, default: 'home' },
})

const sections = ref([])
const loading = ref(true)
const expandedSection = ref(null)
const showAddModal = ref(false)
const dragIndex = ref(null)

// Tipos de sección disponibles agrupados por categoría
const sectionTypes = [
  // Productos & Catálogo
  { value: 'products', label: 'Productos', icon: '📦', description: 'Grilla de productos destacados', category: 'Productos' },
  { value: 'collection', label: 'Colección', icon: '🏷️', description: 'Productos de una colección', category: 'Productos' },
  { value: 'collections', label: 'Colecciones', icon: '🌸', description: 'Grid de colecciones de aromas', category: 'Productos' },
  { value: 'scents', label: 'Aromas', icon: '🌿', description: 'Galería de perfiles aromáticos', category: 'Productos' },

  // Contenido
  { value: 'hero', label: 'Hero', icon: '🖼️', description: 'Banner principal con imagen/video', category: 'Contenido' },
  { value: 'text', label: 'Texto', icon: '📝', description: 'Título y párrafos', category: 'Contenido' },
  { value: 'image_text', label: 'Imagen + Texto', icon: '🖼️', description: 'Imagen a un lado, texto al otro', category: 'Contenido' },
  { value: 'gallery', label: 'Galería', icon: '🖼️', description: 'Grid de imágenes', category: 'Contenido' },
  { value: 'html', label: 'HTML', icon: '💻', description: 'HTML libre', category: 'Contenido' },

  // Prueba social & Confianza
  { value: 'values', label: 'Valores', icon: '🎯', description: 'Grid de valores de la marca', category: 'Confianza' },
  { value: 'trust', label: 'Confianza', icon: '📦', description: 'Beneficios de envío y confianza', category: 'Confianza' },
  { value: 'reviews', label: 'Reseñas', icon: '⭐', description: 'Carrusel de testimonios', category: 'Confianza' },

  // Conversión & Marketing
  { value: 'cta', label: 'CTA', icon: '🚀', description: 'Llamada a la acción con botón', category: 'Conversión' },
  { value: 'newsletter', label: 'Newsletter', icon: '✉️', description: 'Formulario de suscripción', category: 'Conversión' },

  // B2B (Mayoreo & Corporativo)
  { value: 'b2b_stats', label: 'B2B Stats', icon: '📊', description: 'Estadísticas de confianza B2B', category: 'B2B' },
  { value: 'b2b_audience', label: 'B2B Audiencia', icon: '🎯', description: 'Tarjetas de segmentos (mayoreo, eventos, etiquetado)', category: 'B2B' },
  { value: 'b2b_calculator', label: 'B2B Calculadora', icon: '🧮', description: 'Calculadora de mayoreo', category: 'B2B' },
  { value: 'b2b_recuerdos', label: 'B2B Recuerdos', icon: '💍', description: 'Cotizador de recuerdos para eventos', category: 'B2B' },
  { value: 'b2b_faq', label: 'B2B FAQ', icon: '❓', description: 'Preguntas frecuentes B2B', category: 'B2B' },
]

// Categorías con su orden e ícono para mostrarse en el modal
const sectionCategories = [
  { key: 'Productos', label: 'Productos & Catálogo', icon: '📦', hint: 'Vende y exhibe tus productos' },
  { key: 'Contenido', label: 'Contenido', icon: '📝', hint: 'Construye narrativa de marca' },
  { key: 'Confianza', label: 'Prueba social', icon: '⭐', hint: 'Genera confianza y fidelidad' },
  { key: 'Conversión', label: 'Conversión', icon: '🚀', hint: 'Impulsa acciones de compra' },
  { key: 'B2B', label: 'Mayoreo & Corporativo', icon: '🏢', hint: 'Secciones para la página B2B' },
]

function sectionTypesByCategory(category) {
  return sectionTypes.filter(t => t.category === category)
}

// Ícono visual para cada tipo de sección en el listado
function typeIcon(type) {
  const found = sectionTypes.find(t => t.value === type)
  return found ? found.icon : '🧩'
}

async function loadSections() {
  loading.value = true
  try {
    const res = await $fetch(`/api/sections/list?page=${props.page}`)
    sections.value = res?.sections || []
  } catch (e) {
    console.error('Error cargando secciones:', e)
    alert('Error al cargar secciones: ' + e.message)
  } finally {
    loading.value = false
  }
}

async function addSection(type) {
  const defaults = getDefaultContent(type)
  const newSection = {
    page: props.page,
    type,
    title: defaults.title,
    content: defaults.content,
    settings: defaults.settings,
    sort_order: sections.value.length + 1,
    is_active: true,
  }

  try {
    const res = await $fetch('/api/sections/create', {
      method: 'POST',
      body: newSection,
    })
    if (res?.section) {
      sections.value.push(res.section)
      expandedSection.value = res.section.id
      showAddModal.value = false
    }
  } catch (e) {
    console.error('Error agregando sección:', e)
    alert('Error al agregar sección: ' + e.message)
  }
}

function getDefaultContent(type) {
  const defaults = {
    hero: {
      title: 'Hero (Portada)',
      content: {
        title: 'Fragancias que\nconectan\ncon la naturaleza',
        subtitle: 'En PITAYA LAB creamos productos botánicos biodegradables.',
        badge: '100% Natural · Biodegradable · Hecho en México',
        cta_text: 'Explorar catálogo',
        cta_link: '/catalog',
        cta_secondary_text: 'Tienda Amazon',
        cta_secondary_link: 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329',
        media_type: 'video',
        media_url: '',
        poster_url: '',
        slides: [],
      },
      settings: { enabled: true, full_width: true },
    },
    products: {
      title: 'Productos Destacados',
      content: {
        title: 'Nuestros Productos',
        subtitle: 'Descubre',
        description: 'Velas de soya perfumadas, aceites aromáticos y brumas.',
        max_products: 4,
        show_view_all: true,
        view_all_text: 'Ver catálogo completo',
        view_all_link: '/catalog',
      },
      settings: { enabled: true, layout: 'grid-4' },
    },
    collection: {
      title: 'Colección',
      content: {
        title: 'Colección',
        subtitle: '',
        description: '',
        collection_id: null,
        max_products: 4,
        show_view_all: true,
      },
      settings: { enabled: true },
    },
    collections: {
      title: 'Colecciones de Aromas',
      content: {
        title: 'El arte de la fragancia',
        subtitle: 'Aromas',
        description: 'Cada aroma ha sido cuidadosamente seleccionado.',
        show_all: true,
      },
      settings: { enabled: true, layout: 'grid' },
    },
    scents: {
      title: 'Aromas',
      content: {
        title: 'El arte de la fragancia',
        subtitle: 'Aromas',
        description: 'Cada aroma ha sido cuidadosamente seleccionado.',
        show_all: true,
      },
      settings: { enabled: true },
    },
    values: {
      title: 'Valores de la Marca',
      content: {
        title: '¿Por qué elegir PITAYA LAB?',
        subtitle: 'Nuestro Compromiso',
        values: [
          { icon: 'leaf', title: '100% Natural', description: 'Ingredientes botánicos biodegradables.' },
          { icon: 'shield', title: 'Hecho en México', description: 'Productos artesanales.' },
          { icon: 'heart', title: 'Cruelty Free', description: 'Nunca testamos en animales.' },
          { icon: 'sparkles', title: 'Calidad Premium', description: 'Fragancias de alta gama.' },
        ],
      },
      settings: { enabled: true, columns: 4 },
    },
    trust: {
      title: 'Sección de Confianza',
      content: {
        title: 'Envíos seguros a todo México',
        subtitle: 'Recibe tus productos de forma rápida y confiable',
        features: [
          { icon: 'truck', title: 'Envío gratis', description: 'En todas tus compras mayores a $299 MXN' },
          { icon: 'package', title: 'Costo simbólico', description: 'Compras menores a $299 solo $50 MXN' },
          { icon: 'clock', title: '3 a 5 días hábiles', description: 'Entregamos a todo México' },
        ],
      },
      settings: { enabled: true, columns: 3 },
    },
    reviews: {
      title: 'Reseñas de Clientes',
      content: {
        title: 'Lo que dicen nuestros clientes',
        subtitle: 'Opiniones reales',
        items: [
          { author: 'María F.', rating: 5, product: 'Bruma Solara', text: 'El aroma es increíble.', image: null },
          { author: 'Carlos R.', rating: 5, product: 'Vela Sandalo', text: 'La vela huele espectacular.', image: null },
        ],
      },
      settings: { enabled: true, layout: 'carousel' },
    },
    cta: {
      title: 'CTA Final',
      content: {
        title: '¿Listo para transformar tu hogar?',
        description: 'Descubre nuestra colección completa en Amazon.',
        button_text: 'Comprar en Amazon México',
        button_link: 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329',
      },
      settings: { enabled: true, background: 'dark' },
    },
    text: {
      title: 'Texto',
      content: { title: '', subtitle: '', body: '' },
      settings: { enabled: true, alignment: 'center' },
    },
    image_text: {
      title: 'Imagen + Texto',
      content: { title: '', subtitle: '', body: '', image_url: '', button_text: '', button_link: '' },
      settings: { enabled: true, image_position: 'right' },
    },
    gallery: {
      title: 'Galería',
      content: { title: '', subtitle: '', images: [] },
      settings: { enabled: true },
    },
    html: {
      title: 'HTML',
      content: { html: '' },
      settings: { enabled: true },
    },
    newsletter: {
      title: 'Newsletter',
      content: { title: 'Únete a nuestra comunidad', subtitle: '', description: '' },
      settings: { enabled: true },
    },
    b2b_stats: {
      title: 'B2B Stats',
      content: {
        stats: [
          { value: '25–35%', label: 'Dto. por volumen B2B' },
          { value: '30+', label: 'Recuerdos personalizados' },
          { value: '100%', label: 'Botánico y biodegradable' },
          { value: '≤15 d', label: 'Días hábiles entrega' },
        ],
      },
      settings: { enabled: true },
    },
    b2b_audience: {
      title: 'B2B Audiencia',
      content: {
        title: '¿Para quién es PITAYA LAB B2B?',
        subtitle: 'Tres formas de trabajar juntos, según tu tipo de negocio o evento.',
        cards: [
          {
            icon: '📦',
            title: 'Mayoreo Comercial',
            description: 'Para tiendas boutique, cafeterías de especialidad y distribuidores que revenden nuestra línea regular.',
            points: ['🎯 Mínimo: 20 piezas surtidas', '💸 Hasta 35% dto.', '🔥 Margen de ganancia saludable'],
            link: '#calculadora-mayoreo',
            cta_text: 'Cotizar →',
            highlight: false,
          },
          {
            icon: '💍',
            title: 'Recuerdos & Eventos',
            description: 'Bodas, XV años, eventos corporativos. Recuerdos personalizados con tu diseño.',
            points: ['💍 Mínimo: 30 piezas', '🏷️ Etiqueta 5×5 personalizada', '🎁 Kit premium opcional'],
            link: '#cotizador-eventos',
            cta_text: 'Arma tu recuerdo →',
            highlight: true,
          },
          {
            icon: '🏷️',
            title: 'Etiquetado Privado',
            description: 'Tu marca, nuestros productos. Personalizamos etiquetas con tu logotipo.',
            points: ['🏷️ Diseño de etiquetas propio', '🔒 Exclusividad por zona', '🤝 Contacto directo'],
            link: '#contacto',
            cta_text: 'Hablemos →',
            highlight: false,
          },
        ],
      },
      settings: { enabled: true },
    },
    b2b_calculator: {
      title: 'B2B Calculadora',
      content: {
        eyebrow: 'Mayoreo Comercial',
        title: 'Calculadora de Mayoreo',
        subtitle: 'Cotiza tu pedido al instante. El descuento se aplica automáticamente según el volumen total.',
      },
      settings: { enabled: true },
    },
    b2b_recuerdos: {
      title: 'B2B Recuerdos',
      content: {
        eyebrow: 'Recuerdos para Eventos',
        title: 'Arma tu Recuerdo paso a paso',
        subtitle: 'Elige tu envase, fragancia, diseño y cantidad. El precio se ajusta según el volumen.',
      },
      settings: { enabled: true },
    },
    b2b_faq: {
      title: 'B2B FAQ',
      content: {
        title: 'Preguntas frecuentes B2B',
        faqs: [
          { q: '¿Cuál es el mínimo para mayoreo comercial?', a: 'A partir de 20 piezas surtidas. El descuento aumenta de 25% (20–49 pzas) a 30% (51–99 pzas) y 35% (100+ pzas).' },
          { q: '¿Cuál es el mínimo para recuerdos personalizados?', a: 'A partir de 30 piezas del mismo diseño. Los precios unitarios bajan con el volumen.' },
          { q: '¿Cuánto tiempo tarda un pedido personalizado?', a: 'Hasta 15 días hábiles, según demanda. Te avisamos con antelación la programación y entrega estimada por correo.' },
          { q: '¿Puedo poner mi propia marca (etiquetado privado)?', a: 'Sí. Ofrecemos etiquetado privado con tu logotipo para que vendas las fragancias bajo tu propia marca.' },
          { q: '¿Se pueden mezclar productos para el mayoreo?', a: 'Sí. Las 20–30 piezas mínimas pueden ser surtidas entre brumas, velas y aceites.' },
          { q: '¿El envío está incluido en el mayoreo?', a: 'Los precios de mayoreo no incluyen IVA ni envío. El envío se cotiza por separado según volumen y destino.' },
        ],
      },
      settings: { enabled: true },
    },
  }
  return defaults[type] || { title: type, content: {}, settings: { enabled: true } }
}

async function saveSection(section) {
  try {
    await $fetch('/api/sections/update', {
      method: 'PUT',
      body: {
        id: section.id,
        title: section.title,
        content: section.content,
        settings: section.settings,
      },
    })
    alert('✅ Sección guardada correctamente')
  } catch (e) {
    console.error('Error guardando sección:', e)
    alert('Error al guardar sección: ' + e.message)
  }
}

async function toggleSection(section) {
  try {
    await $fetch('/api/sections/update', {
      method: 'PUT',
      body: {
        id: section.id,
        is_active: section.is_active,
      },
    })
  } catch (e) {
    console.error('Error actualizando sección:', e)
    section.is_active = !section.is_active
    alert('Error al actualizar sección: ' + e.message)
  }
}

async function deleteSection(section) {
  if (!confirm(`¿Eliminar la sección "${section.title || section.type}"?`)) return

  try {
    await $fetch(`/api/sections/delete?id=${section.id}`, { method: 'DELETE' })
    sections.value = sections.value.filter(s => s.id !== section.id)
    if (expandedSection.value === section.id) expandedSection.value = null
  } catch (e) {
    console.error('Error eliminando sección:', e)
    alert('Error al eliminar sección: ' + e.message)
  }
}

async function duplicateSection(section) {
  const newSection = {
    page: section.page,
    type: section.type,
    title: `${section.title} (copia)`,
    content: JSON.parse(JSON.stringify(section.content)),
    settings: JSON.parse(JSON.stringify(section.settings)),
    sort_order: sections.value.length + 1,
    is_active: true,
  }

  try {
    const res = await $fetch('/api/sections/duplicate', {
      method: 'POST',
      body: newSection,
    })
    if (res?.section) {
      sections.value.push(res.section)
    }
  } catch (e) {
    console.error('Error duplicando sección:', e)
    alert('Error al duplicar sección: ' + e.message)
  }
}

function onDragStart(index) {
  dragIndex.value = index
}

function onDrop(targetIndex) {
  if (dragIndex.value === null || dragIndex.value === targetIndex) {
    dragIndex.value = null
    return
  }

  const from = dragIndex.value
  const to = targetIndex

  // Reordenar en el array
  const [moved] = sections.value.splice(from, 1)
  sections.value.splice(to, 0, moved)

  // Actualizar sort_order en la base de datos
  updateSortOrders()
  dragIndex.value = null
}

async function updateSortOrders() {
  try {
    await $fetch('/api/sections/reorder', {
      method: 'POST',
      body: { sections: sections.value },
    })
  } catch (e) {
    console.error('Error actualizando orden:', e)
  }
}

onMounted(loadSections)
</script>
