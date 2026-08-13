<template>
  <div>
    <!-- Renderizado dinámico de secciones desde la base de datos -->
    <div v-if="loading" class="py-40 flex items-center justify-center">
      <div class="text-center">
        <div class="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-earth-500">Cargando...</p>
      </div>
    </div>

    <div v-else-if="sections.length > 0">
      <SectionRenderer
        v-for="section in sections"
        :key="section.id"
        :section="section"
      />
    </div>

    <!-- Fallback: si no hay secciones configuradas, mostrar las secciones por defecto -->
    <div v-else>
      <HeroSection
        title="Fragancias que\nconectan\ncon la naturaleza"
        subtitle="En PITAYA LAB creamos productos botánicos biodegradables para cuidar de ti y del planeta. Velas de soya perfumadas, aceites aromáticos y brumas que transforman tu hogar en una experiencia sensorial única."
        badge="100% Natural · Biodegradable · Hecho en México"
        cta_text="Explorar catálogo"
        cta_link="/catalog"
        cta_secondary_text="Tienda Amazon"
        cta_secondary_link="https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329"
      />
      <SectionProducts :content="{ title: 'Nuestros Productos', subtitle: 'Descubre', description: 'Velas de soya perfumadas, aceites aromáticos y brumas que transforman tu hogar en una experiencia sensorial única.', max_products: 4, show_view_all: true, view_all_text: 'Ver catálogo completo', view_all_link: '/catalog' }" />
      <SectionValues :content="{ title: '¿Por qué elegir PITAYA LAB?', subtitle: 'Nuestro Compromiso' }" />
      <SectionTrust :content="{ title: 'Envíos seguros a todo México', subtitle: 'Recibe tus productos de forma rápida y confiable' }" />
      <SectionCollections :content="{ title: 'El arte de la fragancia', subtitle: 'Aromas', description: 'Cada aroma ha sido cuidadosamente seleccionado para ofrecerte una experiencia única.', show_all: true }" />
      <SectionReviews :content="{ title: 'Lo que dicen nuestros clientes', subtitle: 'Opiniones reales de quienes ya disfrutan PITAYA LAB' }" />
      <SectionCta :content="{ title: '¿Listo para transformar tu hogar?', description: 'Descubre nuestra colección completa en Amazon y encuentra la fragancia perfecta para cada momento.', button_link: 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329' }" />
    </div>
  </div>
</template>

<script setup>
// La portada ya no depende de datos estáticos (products/data.js).
// Todo el contenido proviene de Supabase: page_sections para el layout
// de la página y products para el JSON-LD de Store.

useSeoMeta({
  title: 'PITAYA LAB | Velas de Soya, Aceites Aromáticos y Brumas Ecológicas',
  description: 'Descubre PITAYA LAB: productos botánicos biodegradables. Velas de soya perfumadas, aceites aromáticos y brumas que transforman tu hogar.',
  ogTitle: 'PITAYA LAB | Fragancias que conectan con la naturaleza',
  ogDescription: 'Productos botánicos biodegradables para el hogar. Velas de soya, aceites aromáticos y brumas ecológicas.',
})

const supabase = useNuxtApp().$supabase

// Cargar secciones dinámicas desde la base de datos
const sections = ref([])
const loading = ref(true)

async function loadSections() {
  if (!supabase) {
    loading.value = false
    return
  }

  try {
    const { data, error } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page', 'home')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    sections.value = data || []
  } catch (e) {
    console.warn('Error cargando secciones, usando fallback:', e.message)
    sections.value = []
  } finally {
    loading.value = false
  }
}

// 🏷️ JSON-LD Schema para SEO - Organization
const schemaOrg = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PITAYA LAB',
  url: 'https://www.pitayalab.com.mx',
  logo: 'https://www.pitayalab.com.mx/images/brand/logo-pitayalab.png',
  description: 'Velas de soya perfumadas, aceites aromáticos y brumas ecológicas.',
  sameAs: [
    'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329',
  ],
}))

// 🏷️ JSON-LD Store schema con productos
const featuredProducts = ref([])

async function loadProductsForSchema() {
  if (!supabase) {
    return
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .limit(4)
    if (error) throw error
    featuredProducts.value = data || []
  } catch (e) {
    console.warn('Error cargando productos para schema:', e.message)
    featuredProducts.value = []
  }
}

const siteSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'PITAYA LAB',
  description: 'Productos botánicos biodegradables que transforman tu hogar con exquisitas fragancias.',
  url: 'https://www.pitayalab.com.mx',
  image: 'https://www.pitayalab.com.mx/images/brand/logo-pitayalab.png',
  email: 'contacto@pitayalab.com.mx',
  areaServed: { '@type': 'Country', name: 'MX' },
  makesOffer: featuredProducts.value.slice(0, 4).map(p => ({
    '@type': 'Offer',
    name: p.name,
    description: p.description,
    price: p.price,
    priceCurrency: 'MXN',
    url: `https://www.pitayalab.com.mx/product/${p.slug}`,
    availability: 'https://schema.org/InStock',
  })),
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify(schemaOrg.value, null, 2)),
    },
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify(siteSchema.value, null, 2)),
    },
  ],
})

onMounted(async () => {
  await Promise.all([loadSections(), loadProductsForSchema()])
})
</script>
