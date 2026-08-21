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
    <!-- HERO (configurable desde el editor; aquí el fallback estático) -->
    <HeroSection
      title="Fragancias que\nconectan\na tu negocio y tus eventos"
      subtitle="Lleva la alta hotelería a tu tienda, hotel, bodas y eventos corporativos. Precios de mayoreo por volumen, recuerdos personalizados y etiquetado privado."
      badge="🏢 Mayoreo & Corporativo"
      cta_text="💍 Cotizar recuerdos para eventos"
      cta_link="#cotizador-eventos"
      cta_secondary_text="📦 Mayoreo comercial"
      cta_secondary_link="#calculadora-mayoreo"
      media_type="none"
      bg_color="bg-gradient-to-br from-earth-900 via-primary-900 to-earth-900"
      overlay_gradient="none"
      show_badge_dot=false
      badge_style="bg-white/10 border border-white/20 text-primary-200"
    />

    <!-- Secciones del fallback: usan los MISMOS componentes de sección que renderiza
         el editor del sitio (page_sections). Así el fallback y el contenido gestionado
         en el panel admin comparten un único origen de verdad configurable. -->
    <SectionB2BStats :content="{}" :settings="{}" />
    <SectionB2BAudience
      :content="{
        title: '¿Para quién es PITAYA LAB B2B?',
        subtitle: 'Tres formas de trabajar juntos, según tu tipo de negocio o evento.'
      }"
      :settings="{}"
      @order="onOrderRequested"
    />
    <SectionB2BCalculator :content="{}" :settings="{}" @order="onOrderRequested" />
    <SectionB2BRecuerdos :content="{}" :settings="{}" @order="onOrderRequested" />
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
import { WHATSAPP_URL, DEFAULT_B2B } from '~/composables/useB2B'
import { useB2BConfig } from '~/composables/useB2BConfig'
// Importación explícita de las secciones reutilizables (mismas que renderiza el editor
// del sitio) para garantizar su resolución en build-time y que el fallback muestre los
// mismos bloques editables desde el panel admin.
import SectionB2BStats from '~/components/sections/SectionB2BStats.vue'
import SectionB2BAudience from '~/components/sections/SectionB2BAudience.vue'
import SectionB2BCalculator from '~/components/sections/SectionB2BCalculator.vue'
import SectionB2BRecuerdos from '~/components/sections/SectionB2BRecuerdos.vue'
import SectionB2BFaq from '~/components/sections/SectionB2BFaq.vue'
import SectionImageText from '~/components/sections/SectionImageText.vue'
import SectionCta from '~/components/sections/SectionCta.vue'

useSeoMeta({
  title: 'Mayoreo & Corporativo B2B | PITAYA LAB',
  description: 'PITAYA LAB B2B: Precios de mayoreo por volumen (hasta 35% dto.), recuerdos personalizados para bodas y eventos, amenities para hoteles y etiquetado privado. Fragrancias botánicas inspiradas en la alta hotelería.',
  ogTitle: 'Mayoreo & Corporativo B2B | PITAYA LAB',
  ogDescription: 'Lleva la alta hotelería a tu negocio y eventos. Precios de mayoreo, recuerdos personalizados y etiquetado privado.',
})

const whatsappUrl = WHATSAPP_URL()

// Lead time message
const leadTimeMessage = ref(DEFAULT_B2B.contacto.lead_time_message)

onMounted(async () => {
  const cfg = await useB2BConfig()
  if (cfg.contacto?.lead_time_message) {
    leadTimeMessage.value = cfg.contacto.lead_time_message
  }
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
