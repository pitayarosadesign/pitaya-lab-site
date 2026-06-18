<template>
  <div class="min-h-screen">
    <!-- Header -->
    <section class="relative py-24 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">Legal</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-earth-900 mt-3 mb-6">
            Aviso de <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-amber-500">Privacidad</span>
          </h1>
          <p class="text-lg text-earth-600 leading-relaxed">
            En PITAYA LAB nos tomamos muy en serio la protección de tus datos personales.
          </p>
        </div>
      </div>
    </section>

    <!-- Contenido -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl border border-earth-100 p-8 md:p-12 shadow-sm prose prose-earth max-w-none">
          
          <p class="text-sm text-earth-400 mb-8"><strong>Última actualización:</strong> {{ currentDate }}</p>

          <h2 class="text-2xl font-serif font-bold text-earth-900 mt-8 mb-4">1. Identidad y domicilio</h2>
          <p>
            <strong>PITAYA LAB</strong> es una marca con domicilio en México, responsable del tratamiento de sus datos personales. El presente Aviso de Privacidad regula el tratamiento de la información que usted proporcione al navegar y utilizar nuestro sitio web.
          </p>

          <h2 class="text-2xl font-serif font-bold text-earth-900 mt-8 mb-4">2. Datos personales que recabamos</h2>
          <p>Podemos recabar las siguientes categorías de datos personales:</p>
          <ul class="list-disc pl-6 space-y-2 text-earth-600">
            <li><strong>Datos de identificación:</strong> nombre, correo electrónico y teléfono cuando nos contacta a través de formularios.</li>
            <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas y tiempo de interacción en nuestro sitio web.</li>
            <li><strong>Datos de compra:</strong> cabe señalar que todas las transacciones comerciales se realizan a través de Amazon México, por lo que no almacenamos información bancaria ni de pago.</li>
          </ul>

          <h2 class="text-2xl font-serif font-bold text-earth-900 mt-8 mb-4">3. Finalidades del tratamiento de datos</h2>
          <p>Sus datos personales serán utilizados para las siguientes finalidades:</p>
          <h3 class="text-lg font-semibold text-earth-800 mt-4 mb-2">Finalidades primarias:</h3>
          <ul class="list-disc pl-6 space-y-2 text-earth-600">
            <li>Atender sus solicitudes de información, comentarios o quejas.</li>
            <li>Dar seguimiento a la relación comercial establecida.</li>
            <li>Redireccionarlo a nuestra tienda oficial en Amazon México para realizar compras.</li>
          </ul>
          <h3 class="text-lg font-semibold text-earth-800 mt-4 mb-2">Finalidades secundarias:</h3>
          <ul class="list-disc pl-6 space-y-2 text-earth-600">
            <li>Enviar comunicaciones sobre nuevos productos, promociones y novedades de PITAYA LAB.</li>
            <li>Realizar análisis estadísticos y de tendencias de navegación.</li>
            <li>Mejorar la experiencia de usuario en nuestro sitio web.</li>
          </ul>

          <h2 class="text-2xl font-serif font-bold text-earth-900 mt-8 mb-4">4. Transferencia de datos personales</h2>
          <p>
            Sus datos personales no serán transferidos a terceros sin su consentimiento, salvo las excepciones previstas en la legislación aplicable. Informamos que al hacer clic en los enlaces hacia Amazon México, será redirigido a la plataforma de Amazon, cuyas políticas de privacidad son independientes de las nuestras. Le recomendamos revisar el Aviso de Privacidad de Amazon México.
          </p>

          <h2 class="text-2xl font-serif font-bold text-earth-900 mt-8 mb-4">5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)</h2>
          <p>
            Usted tiene derecho a conocer qué datos personales tenemos sobre usted, para qué los utilizamos y las condiciones de su uso (Acceso). Asimismo, puede solicitar la rectificación de su información personal si está desactualizada, inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos (Cancelación); así como oponerse al uso de sus datos para fines específicos (Oposición).
          </p>
          <p class="mt-4">
            Para ejercer sus derechos ARCO, puede enviar su solicitud a través de nuestro <NuxtLink to="/contact" class="text-primary-600 hover:text-primary-700 underline">buzón de mensajes</NuxtLink>, indicando su nombre, los derechos que desea ejercer y una descripción clara de su petición.
          </p>

          <h2 class="text-2xl font-serif font-bold text-earth-900 mt-8 mb-4">6. Uso de cookies y tecnologías de rastreo</h2>
          <p>
            Nuestro sitio web utiliza cookies propias y de terceros para mejorar la experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido. Puede configurar su navegador para rechazar todas las cookies o para indicarle cuándo se envía una cookie. Sin embargo, si no acepta las cookies, es posible que algunas funcionalidades del sitio no funcionen correctamente.
          </p>

          <h2 class="text-2xl font-serif font-bold text-earth-900 mt-8 mb-4">7. Medidas de seguridad</h2>
          <p>
            Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso no autorizado. Sin embargo, ninguna transmisión por internet o sistema de almacenamiento electrónico es completamente seguro.
          </p>

          <h2 class="text-2xl font-serif font-bold text-earth-900 mt-8 mb-4">8. Cambios al aviso de privacidad</h2>
          <p>
            Nos reservamos el derecho de modificar el presente Aviso de Privacidad en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web. Le recomendamos revisar periódicamente esta página para estar informado de cualquier cambio.
          </p>

          <h2 class="text-2xl font-serif font-bold text-earth-900 mt-8 mb-4">9. Contacto</h2>
          <p>
            Si tiene alguna pregunta, comentario o inquietud acerca de este Aviso de Privacidad, o desea ejercer sus derechos ARCO, puede contactarnos a través de nuestro <NuxtLink to="/contact" class="text-primary-600 hover:text-primary-700 underline">buzón de mensajes</NuxtLink> o bien a través de nuestra <a :href="AMAZON_LINK" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 underline">tienda oficial en Amazon México</a>.
          </p>

          <div class="mt-10 p-6 bg-amber-50 rounded-2xl border border-amber-100">
            <p class="text-sm text-amber-800 text-center">
              <strong>📋 Nota importante:</strong> Todas las transacciones de compra-venta se realizan exclusivamente a través de 
              <a :href="AMAZON_LINK" target="_blank" rel="noopener noreferrer" class="text-amber-700 underline hover:text-amber-900">Amazon México</a>, 
              quien actúa como responsable independiente del tratamiento de sus datos financieros y de pago.
            </p>
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

const AMAZON_LINK = 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329?'

const currentDate = new Date().toLocaleDateString('es-MX', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>
