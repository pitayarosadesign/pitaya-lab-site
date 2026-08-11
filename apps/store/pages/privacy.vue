<template>
  <div class="min-h-screen">
    <!-- Header -->
    <section class="relative py-24 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">{{ pageContent.header.badge || 'Legal' }}</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-earth-900 mt-3 mb-6">
            {{ pageContent.header.title }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-amber-500">{{ pageContent.header.highlight }}</span>
          </h1>
          <p class="text-lg text-earth-600 leading-relaxed">
            {{ pageContent.header.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Contenido -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl border border-earth-100 p-8 md:p-12 shadow-sm prose prose-earth max-w-none">
          
          <p class="text-sm text-earth-400 mb-8"><strong>Última actualización:</strong> {{ currentDate }}</p>

          <!-- Secciones dinámicas desde el CMS -->
          <div
            v-for="section in pageContent.sections"
            :key="section.title"
          >
            <h2 class="text-2xl font-serif font-bold text-earth-900 mt-8 mb-4">{{ section.title }}</h2>
            <div v-html="section.content"></div>
          </div>

          <div v-if="pageContent.note" class="mt-10 p-6 bg-amber-50 rounded-2xl border border-amber-100">
            <div class="text-sm text-amber-800 text-center" v-html="pageContent.note"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Aviso de Privacidad | PITAYA LAB',
  description: 'Conoce el aviso de privacidad de PITAYA LAB. Protegemos tus datos personales conforme a la legislación mexicana.',
  ogTitle: 'Aviso de Privacidad | PITAYA LAB',
})

const supabase = useNuxtApp().$supabase
const AMAZON_LINK = 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329?'

// Contenido editable desde el panel admin vía site_config (con fallback estático)
const pageContent = reactive({
  header: {
    badge: 'Legal',
    title: 'Aviso de',
    highlight: 'Privacidad',
    description: 'En PITAYA LAB nos tomamos muy en serio la protección de tus datos personales.',
  },
  sections: [
    {
      title: '1. Identidad y domicilio',
      content: '<p><strong>PITAYA LAB</strong> es una marca con domicilio en México, responsable del tratamiento de sus datos personales. El presente Aviso de Privacidad regula el tratamiento de la información que usted proporcione al navegar y utilizar nuestro sitio web.</p>'
    },
    {
      title: '2. Datos personales que recabamos',
      content: '<p>Podemos recabar las siguientes categorías de datos personales:</p><ul class="list-disc pl-6 space-y-2 text-earth-600"><li><strong>Datos de identificación:</strong> nombre, correo electrónico y teléfono cuando nos contacta a través de formularios.</li><li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas y tiempo de interacción en nuestro sitio web.</li><li><strong>Datos de compra:</strong> cabe señalar que todas las transacciones comerciales se realizan a través de Amazon México, por lo que no almacenamos información bancaria ni de pago.</li></ul>'
    },
    {
      title: '3. Finalidades del tratamiento de datos',
      content: '<p>Sus datos personales serán utilizados para las siguientes finalidades:</p><h3 class="text-lg font-semibold text-earth-800 mt-4 mb-2">Finalidades primarias:</h3><ul class="list-disc pl-6 space-y-2 text-earth-600"><li>Atender sus solicitudes de información, comentarios o quejas.</li><li>Dar seguimiento a la relación comercial establecida.</li><li>Redireccionarlo a nuestra tienda oficial en Amazon México para realizar compras.</li></ul><h3 class="text-lg font-semibold text-earth-800 mt-4 mb-2">Finalidades secundarias:</h3><ul class="list-disc pl-6 space-y-2 text-earth-600"><li>Enviar comunicaciones sobre nuevos productos, promociones y novedades de PITAYA LAB.</li><li>Realizar análisis estadísticos y de tendencias de navegación.</li><li>Mejorar la experiencia de usuario en nuestro sitio web.</li></ul>'
    },
    {
      title: '4. Transferencia de datos personales',
      content: '<p>Sus datos personales no serán transferidos a terceros sin su consentimiento, salvo las excepciones previstas en la legislación aplicable. Informamos que al hacer clic en los enlaces hacia Amazon México, será redirigido a la plataforma de Amazon, cuyas políticas de privacidad son independientes de las nuestras. Le recomendamos revisar el Aviso de Privacidad de Amazon México.</p>'
    },
    {
      title: '5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)',
      content: '<p>Usted tiene derecho a conocer qué datos personales tenemos sobre usted, para qué los utilizamos y las condiciones de su uso (Acceso). Asimismo, puede solicitar la rectificación de su información personal si está desactualizada, inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos (Cancelación); así como oponerse al uso de sus datos para fines específicos (Oposición).</p><p class="mt-4">Para ejercer sus derechos ARCO, puede enviar su solicitud a través de nuestro <a href="/contact" class="text-primary-600 hover:text-primary-700 underline">buzón de mensajes</a>, indicando su nombre, los derechos que desea ejercer y una descripción clara de su petición.</p>'
    },
    {
      title: '6. Uso de cookies y tecnologías de rastreo',
      content: '<p>Nuestro sitio web utiliza cookies propias y de terceros para mejorar la experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido. Puede configurar su navegador para rechazar todas las cookies o para indicarle cuándo se envía una cookie. Sin embargo, si no acepta las cookies, es posible que algunas funcionalidades del sitio no funcionen correctamente.</p>'
    },
    {
      title: '7. Medidas de seguridad',
      content: '<p>Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso no autorizado. Sin embargo, ninguna transmisión por internet o sistema de almacenamiento electrónico es completamente seguro.</p>'
    },
    {
      title: '8. Cambios al aviso de privacidad',
      content: '<p>Nos reservamos el derecho de modificar el presente Aviso de Privacidad en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web. Le recomendamos revisar periódicamente esta página para estar informado de cualquier cambio.</p>'
    },
    {
      title: '9. Contacto',
      content: '<p>Si tiene alguna pregunta, comentario o inquietud acerca de este Aviso de Privacidad, o desea ejercer sus derechos ARCO, puede contactarnos al correo: contacto@pitayalab.com.mx o utilizar nuestro <a href="/contact" class="text-primary-600 hover:text-primary-700 underline">buzón de mensajes</a> o bien a través de nuestra <a href="' + AMAZON_LINK + '" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 underline">tienda oficial en Amazon México</a>.</p>'
    },
  ],
  note: '<strong>📋 Nota importante:</strong> Todas las transacciones de compra-venta se realizan exclusivamente a través de <a href="' + AMAZON_LINK + '" target="_blank" rel="noopener noreferrer" class="text-amber-700 underline hover:text-amber-900">Amazon México</a>, quien actúa como responsable independiente del tratamiento de sus datos financieros y de pago.',
})

async function loadConfig() {
  if (!supabase) return
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'privacy_page')
      .single()
    if (error) throw error
    if (data?.value) {
      if (data.value.header) Object.assign(pageContent.header, data.value.header)
      if (Array.isArray(data.value.sections)) pageContent.sections = data.value.sections
      if (data.value.note) pageContent.note = data.value.note
    }
  } catch (e) {
    console.warn('Usando datos estáticos para Privacidad (fallback):', e.message)
  }
}

onMounted(loadConfig)

const currentDate = new Date().toLocaleDateString('es-MX', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>
