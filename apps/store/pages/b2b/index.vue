<template>
  <div class="min-h-screen bg-white">
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
        @order="onOrderRequested"
      />
    </div>

    <!-- Fallback: si no hay secciones configuradas, mostrar el contenido estático -->
    <div v-else>
    <!-- HERO compacto (fallback; textos configurables vía site_config.b2b_page) -->
    <B2BHeroCompact v-bind="heroProps" />

    <!-- Kit de Muestras B2B (lead magnet de confianza) -->
    <B2BSampleKitBanner v-bind="kitProps" />

    <!-- Calculadora de mayoreo por acordeones -->
    <SectionB2BCalculator :content="{}" :settings="{}" @order="onOrderRequested" />

    <!-- Recuerdos personalizados para eventos -->
    <SectionB2BRecuerdos :content="{}" :settings="{}" @order="onOrderRequested" />

    <!-- Cierre corporativo (hoteles, spas, etiqueta privada) -->
    <SectionImageText
      :content="{
        title: 'Experiencias sensoriales de alta hotelería',
        subtitle: 'Hoteles, Spas & Empresas',
        body: 'Nuestras fragancias están inspiradas en la hospitalidad de lujo (Xcaret, Vidanta). Ideales como amenities de cortesía, aromatizantes para habitaciones y regalos corporativos que dejan huella.',
        image_url: '/images/products/vela-clasica.jpg',
        button_text: 'Solicitar propuesta corporativa →',
        button_link: '#contacto'
      }"
      :settings="{ enabled: true, image_position: 'right' }"
    />
    <SectionCta
      :content="{
        title: '¿Tienes un proyecto especial?',
        description: '¿Bodas de gran escala, hoteles, distribuidores, etiquetado privado? Hablemos directo y armamos una propuesta a tu medida.',
        button_text: 'Escríbenos por WhatsApp',
        button_link: whatsappUrl
      }"
      :settings="{ enabled: true, background: 'dark' }"
    />
    <SectionB2BFaq :content="{}" :settings="{}" />

    </div>

    <!-- Botón flotante WhatsApp -->
    <BotWhatsApp :message="'¡Hola PITAYA LAB! Me interesa su servicio B2B / Mayoreo.'" />

    <!-- Modal de checkout -->
    <CheckoutModalB2B
      :open="checkoutOpen"
      :order="pendingOrder"
      @close="checkoutOpen = false"
      @complete="onCheckoutComplete"
    />
  </div>
</template>

<script setup lang="ts">
import { WHATSAPP_URL, DEFAULT_B2B, whatsappLinkWithMessage } from '~/composables/useB2B'
import { useB2BConfig } from '~/composables/useB2BConfig'
// Importación explícita de las secciones reutilizables (mismas que renderiza el editor
// del sitio) para garantizar su resolución en build-time y que el fallback muestre los
// mismos bloques editables desde el panel admin.
import B2BHeroCompact from '~/components/b2b/B2BHeroCompact.vue'
import B2BSampleKitBanner from '~/components/b2b/B2BSampleKitBanner.vue'
import SectionB2BCalculator from '~/components/sections/SectionB2BCalculator.vue'
import SectionB2BRecuerdos from '~/components/sections/SectionB2BRecuerdos.vue'
import SectionB2BFaq from '~/components/sections/SectionB2BFaq.vue'
import SectionImageText from '~/components/sections/SectionImageText.vue'
import SectionCta from '~/components/sections/SectionCta.vue'

usePageSeo('/b2b', {
  title: 'Mayoreo & Corporativo B2B | PITAYA LAB',
  description: 'PITAYA LAB B2B: Precios de mayoreo por volumen (hasta 35% dto.), recuerdos personalizados para bodas y eventos, amenities para hoteles y etiquetado privado. Fragrancias botánicas inspiradas en la alta hotelería.',
  ogTitle: 'Mayoreo & Corporativo B2B | PITAYA LAB',
  ogDescription: 'Lleva la alta hotelería a tu negocio y eventos. Precios de mayoreo, recuerdos personalizados y etiquetado privado.',
})

const whatsappUrl = WHATSAPP_URL()

// Lead time message
const leadTimeMessage = ref(DEFAULT_B2B.contacto.lead_time_message)

// Configuración editable de la página B2B (site_config > b2b_page)
const b2bConfig = reactive({
  hero: {
    title: 'Fragancias que conectan a tu negocio y tus eventos',
    subtitle: 'Lleva la alta hotelería a tu tienda, hotel, bodas y eventos corporativos. Precios de mayoreo por volumen, recuerdos personalizados y etiquetado privado.',
    badge: '🏢 Mayoreo & Corporativo',
    badges: [
      { icon: '📉', text: 'Descuentos automáticos por volumen (-25% a -35%)' },
      { icon: '🏷️', text: 'Etiquetado privado disponible' },
      { icon: '🚚', text: 'Envíos seguros a todo México' },
    ],
    search: {
      title: 'Encuentra tu producto y cotiza',
      placeholder: 'Buscar por producto o categoría…',
      categoriesLabel: 'Categorías rápidas',
    },
    quickCategories: ['🕯️ Velas de Soya', '🌿 Brumas Aromáticas', '💧 Aceites Aromáticos', '🪵 Difusores', '🧴 Jabones y Cremas'],
  },
  sampleKit: {
    eyebrow: 'Kit de Muestras B2B',
    title: '¿Aún no conoces nuestros aromas en persona?',
    description: 'Pide tu Kit de Muestras B2B y evalúa fragancias y envases antes de hacer un pedido fuerte. Ideal para hoteles, boutiques y organizadores de bodas.',
    buttonText: 'Comprar Kit de Muestras (Reembolsable en tu 1er pedido)',
    note: 'El costo del kit se reembolsa como crédito en tu primer pedido de mayoreo.',
    aromas: ['Xcaret', 'Solara', 'Westin Oasis', 'Palo Santo'],
  },
})

const heroProps = computed(() => ({
  title: b2bConfig.hero.title,
  subtitle: b2bConfig.hero.subtitle,
  badge: b2bConfig.hero.badge,
  badges: b2bConfig.hero.badges,
  search: b2bConfig.hero.search,
  quickCategories: b2bConfig.hero.quickCategories,
}))

const kitProps = computed(() => ({
  ...b2bConfig.sampleKit,
  buttonLink: whatsappLinkWithMessage('¡Hola PITAYA LAB! Me interesa el Kit de Muestras B2B.'),
}))

async function loadB2BPageConfig() {
  const s = useNuxtApp().$supabase
  if (!s) return
  try {
    const { data } = await s.from('site_config').select('value').eq('key', 'b2b_page').single()
    if (data?.value) {
      if (data.value.hero) Object.assign(b2bConfig.hero, data.value.hero)
      if (data.value.sampleKit) Object.assign(b2bConfig.sampleKit, data.value.sampleKit)
    }
  } catch (e) {
    console.warn('Usando configuración por defecto de b2b_page:', e.message)
  }
}

onMounted(async () => {
  const cfg = await useB2BConfig()
  if (cfg.contacto?.lead_time_message) {
    leadTimeMessage.value = cfg.contacto.lead_time_message
  }
  loadB2BPageConfig()
})

// Cargar secciones dinámicas desde la base de datos
const supabase = useNuxtApp().$supabase
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
      .eq('page', 'b2b')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    sections.value = data || []
  } catch (e) {
    console.warn('Error cargando secciones B2B, usando fallback:', e.message)
    sections.value = []
  } finally {
    loading.value = false
  }
}

// Estado del checkout
const checkoutOpen = ref(false)
const pendingOrder = ref<any | null>(null)

function onOrderRequested(payload: any) {
  pendingOrder.value = payload
  checkoutOpen.value = true
}

function onCheckoutComplete(info: any) {
  checkoutOpen.value = false
  // Redirigir a página de gracias
  navigateTo(`/b2b/gracias?order=${info.orderNumber || ''}`)
}

onMounted(loadSections)
</script>
