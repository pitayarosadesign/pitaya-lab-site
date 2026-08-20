<template>
  <div class="min-h-screen bg-white">
    <!-- HERO -->
    <section class="relative overflow-hidden bg-gradient-to-br from-earth-900 via-primary-900 to-earth-900 text-white">
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 20% 30%, rgba(245,158,11,0.3), transparent 40%), radial-gradient(circle at 80% 70%, rgba(22,163,74,0.3), transparent 40%);"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div class="max-w-3xl">
          <p class="inline-flex items-center gap-2 bg-white/10 text-primary-200 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full mb-6 backdrop-blur">
            🏢 Mayoreo & Corporativo
          </p>
          <h1 class="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Fragancias que <span class="text-amber-300">conectan</span> a tu negocio y tus eventos
          </h1>
          <p class="text-lg md:text-xl text-primary-100 leading-relaxed mb-8">
            Lleva la alta hotelería a tu tienda, hotel, bodas y eventos corporativos. Precios de mayoreo por volumen, recuerdos personalizados y etiquetado privado.
          </p>
          <div class="flex flex-wrap gap-4">
            <a
              href="#cotizador-eventos"
              class="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-earth-900 font-semibold px-6 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-amber-500/30"
            >
              💍 Cotizar recuerdos para eventos
            </a>
            <a
              href="#calculadora-mayoreo"
              class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-semibold px-6 py-3.5 rounded-xl transition-all border border-white/20"
            >
              📦 Mayoreo comercial
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS / BARRAS DE CONFIANZA -->
    <section class="bg-white border-b border-earth-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p class="text-3xl font-bold text-primary-600">25–35%</p>
            <p class="text-xs text-earth-400 mt-1">Dto. por volumen B2B</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-600">30+</p>
            <p class="text-xs text-earth-400 mt-1">Recuerdos personalizados</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-600">100%</p>
            <p class="text-xs text-earth-400 mt-1">Botánico y biodegradable</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-600">≤15 d</p>
            <p class="text-xs text-earth-400 mt-1">Días hábiles entrega</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN: ¿Para quién? -->
    <section class="py-16 md:py-20 bg-earth-50/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 text-center mb-2">¿Para quién es PITAYA LAB B2B?</h2>
        <p class="text-center text-earth-500 mb-12 max-w-2xl mx-auto">Tres formas de trabajar juntos, según tu tipo de negocio o evento.</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Mayoreo -->
          <NuxtLink to="#calculadora-mayoreo" class="group bg-white rounded-3xl p-8 border border-earth-100 hover:border-primary-300 hover:shadow-xl transition-all flex flex-col">
            <div class="text-4xl mb-4">📦</div>
            <h3 class="text-xl font-serif font-bold text-earth-900 mb-2">Mayoreo Comercial</h3>
            <p class="text-sm text-earth-500 leading-relaxed flex-grow mb-4">
              Para tiendas boutique, cafeterías de especialidad y distribuidores que revenden nuestra línea regular. Descuento fijo por volumen sobre el precio público.
            </p>
            <div class="space-y-1.5 mb-4 text-sm">
              <p class="flex items-center gap-2 text-earth-600">🎯 Mínimo: 20 piezas surtidas</p>
              <p class="flex items-center gap-2 text-earth-600">💸 Hasta 35% dto.</p>
              <p class="flex items-center gap-2 text-earth-600">🔥 Margen de ganancia saludable para ti</p>
            </div>
            <span class="text-primary-600 font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">Cotizar →</span>
          </NuxtLink>

          <!-- Eventos -->
          <NuxtLink to="#cotizador-eventos" class="group bg-white rounded-3xl p-8 border border-earth-100 hover:border-amber-400 hover:shadow-xl transition-all flex flex-col ring-1 ring-amber-200/50">
            <div class="text-4xl mb-4">💍</div>
            <h3 class="text-xl font-serif font-bold text-earth-900 mb-2">Recuerdos & Eventos</h3>
            <p class="text-sm text-earth-500 leading-relaxed flex-grow mb-4">
              Bodas, XV años, eventos corporativos. Recuerdos personalizados con tu diseño o nuestras plantillas, en envases perfumero con tu fragancia insignia.
            </p>
            <div class="space-y-1.5 mb-4 text-sm">
              <p class="flex items-center gap-2 text-earth-600">💍 Mínimo: 30 piezas</p>
              <p class="flex items-center gap-2 text-earth-600">🏷️ Etiqueta 5×5 personalizada</p>
              <p class="flex items-center gap-2 text-earth-600">🎁 Kit premium opcional</p>
            </div>
            <span class="text-amber-600 font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">Arma tu recuerdo →</span>
          </NuxtLink>

          <!-- Etiquetado privado -->
          <NuxtLink to="#contacto" class="group bg-white rounded-3xl p-8 border border-earth-100 hover:border-primary-300 hover:shadow-xl transition-all flex flex-col">
            <div class="text-4xl mb-4">🏷️</div>
            <h3 class="text-xl font-serif font-bold text-earth-900 mb-2">Etiquetado Privado</h3>
            <p class="text-sm text-earth-500 leading-relaxed flex-grow mb-4">
              Tu marca, nuestros productos. Personalizamos etiquetas con tu logotipo para que ofrezcas fragancias PITAYA LAB bajo tu propia marca.
            </p>
            <div class="space-y-1.5 mb-4 text-sm">
              <p class="flex items-center gap-2 text-earth-600">🏷️ Diseño de etiquetas propio</p>
              <p class="flex items-center gap-2 text-earth-600">🔒 Exclusividad por zona</p>
              <p class="flex items-center gap-2 text-earth-600">🤝 Contacto directo</p>
            </div>
            <span class="text-primary-600 font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">Hablemos →</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CALCULADORA MAYOREO -->
    <section id="calculadora-mayoreo" class="py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mb-10">
          <p class="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">Mayoreo Comercial</p>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900">Calculadora de Mayoreo</h2>
          <p class="text-earth-500 mt-3">Cotiza tu pedido al instante. El descuento se aplica automáticamente según el volumen total.</p>
        </div>

        <CalculadoraMayoreo @order="onOrderRequested" />
      </div>
    </section>

    <!-- COTIZADOR EVENTOS -->
    <section id="cotizador-eventos" class="py-16 md:py-20 bg-earth-50/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mb-10">
          <p class="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-2">Recuerdos para Eventos</p>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900">Arma tu Recuerdo paso a paso</h2>
          <p class="text-earth-500 mt-3">Elige tu envase, fragancia, diseño y cantidad. El precio se ajusta según el volumen. ¿Prefieres cotizar directo? Escríbenos.</p>
        </div>

        <CotizadorRecuerdos @order="onOrderRequested" />
      </div>
    </section>

    <!-- SECCIÓN ETIQUETADO PRIVADO + HOTELES -->
    <section id="etiquetado" class="py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p class="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">Hoteles, Spas & Empresas</p>
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mb-6">Experiencias sensoriales de alta hotelería</h2>
            <p class="text-earth-600 leading-relaxed mb-6">
              Nuestras fragancias están inspiradas en la hospitalidad de lujo (Xcaret, Vidanta). Ideales como amenities de cortesía, aromatizantes para habitaciones y regalos corporativos que dejan huella.
            </p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-start gap-3 text-earth-700">
                <span class="text-primary-500 mt-0.5">✓</span> Amenities de cortesía para hostales, hoteles boutique y spas
              </li>
              <li class="flex items-start gap-3 text-earth-700">
                <span class="text-primary-500 mt-0.5">✓</span> Regalos corporativos y kits de bienvenida
              </li>
              <li class="flex items-start gap-3 text-earth-700">
                <span class="text-primary-500 mt-0.5">✓</span> Etiquetado privado con tu logotipo
              </li>
              <li class="flex items-start gap-3 text-earth-700">
                <span class="text-primary-500 mt-0.5">✓</span> Volúmenes estacionales y resurtidos recurrentes
              </li>
            </ul>
            <a
              href="#contacto"
              class="inline-flex items-center gap-2 bg-earth-900 hover:bg-earth-800 text-white font-semibold px-6 py-3.5 rounded-xl transition-all"
            >
              Solicitar propuesta corporativa →
            </a>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="aspect-[3/4] rounded-3xl overflow-hidden bg-earth-100">
              <img src="/images/products/vela-clasica.jpg" alt="Vela de soya PITAYA LAB" class="w-full h-full object-cover" />
            </div>
            <div class="aspect-[3/4] rounded-3xl overflow-hidden bg-earth-100 mt-8">
              <img src="/images/products/Bruma-representacion.png" alt="Bruma aromática PITAYA LAB" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA + CONTACTO -->
    <section id="contacto" class="py-16 md:py-24 bg-gradient-to-br from-primary-900 to-earth-900 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-4xl mb-4">🤝</p>
        <h2 class="text-3xl md:text-5xl font-serif font-bold mb-6">¿Tienes un proyecto especial?</h2>
        <p class="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
          ¿Bodas de gran escala, hoteles, distribuidores, etiquetado privado? Hablemos directo y armamos una propuesta a tu medida.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-green-500/30"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Escríbenos por WhatsApp
          </a>
          <a
            href="#calculadora-mayoreo"
            class="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 font-semibold px-8 py-4 rounded-xl transition-all"
          >
            📦 Volver a cotizar
          </a>
        </div>
        <p class="text-primary-200/70 text-sm mt-6">
          {{ leadTimeMessage }}
        </p>
      </div>
    </section>

    <!-- PIE FAQ corto -->
    <section class="py-16 md:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-serif font-bold text-earth-900 text-center mb-10">Preguntas frecuentes B2B</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div v-for="faq in faqs" :key="faq.q" class="p-6 rounded-2xl border border-earth-100 bg-earth-50/40">
            <p class="font-semibold text-earth-800 mb-2">{{ faq.q }}</p>
            <p class="text-sm text-earth-500 leading-relaxed">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

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

const faqs = [
  { q: '¿Cuál es el mínimo para mayoreo comercial?', a: 'A partir de 20 piezas surtidas. El descuento aumenta de 25% (20–49 pzas) a 30% (51–99 pzas) y 35% (100+ pzas).' },
  { q: '¿Cuál es el mínimo para recuerdos personalizados?', a: 'A partir de 30 piezas del mismo diseño. Los precios unitarios bajan con el volumen (hasta $45–50 c/u en 100+ piezas).' },
  { q: '¿Cuánto tiempo tarda un pedido personalizado?', a: 'Hasta 15 días hábiles, según demanda. Te avisamos con antelación la programación y entrega estimada por correo.' },
  { q: '¿Puedo poner mi propia marca (etiquetado privado)?', a: 'Sí. Ofrecemos etiquetado privado con tu logotipo para que vendas las fragancias bajo tu propia marca.' },
  { q: '¿Se pueden mezclar productos para el mayoreo?', a: 'Sí. Las 20–30 piezas mínimas pueden ser surtidas entre brumas, velas y aceites.' },
  { q: '¿El envío está incluido en el mayoreo?', a: 'Los precios de mayoreo no incluyen IVA ni envío. El envío se cotiza por separado según volumen y destino.' },
]
</script>
