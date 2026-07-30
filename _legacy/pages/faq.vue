<template>
  <div class="min-h-screen">
    <!-- Header -->
    <section class="relative py-24 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-amber-600 font-semibold text-sm uppercase tracking-wider">Ayuda</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-earth-900 mt-3 mb-6">
            Preguntas <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-primary-600">Frecuentes</span>
          </h1>
          <p class="text-lg text-earth-600 leading-relaxed">
            Todo lo que necesitas saber sobre nuestros productos, envíos y más.
          </p>
        </div>
      </div>
    </section>

    <!-- Destacado Prime -->
    <section class="-mt-8 relative z-10">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl shadow-xl p-6 md:p-8 text-center">
          <div class="flex items-center justify-center gap-3 mb-2">
            <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a1.375 1.375 0 0 0 0 1.994l2.414 2.585a1.375 1.375 0 0 0 1.994 0l3.779-3.788-3.787 3.787-2.414-2.585a1.374 1.374 0 0 1 0-1.994l3.705-3.964 3.675-3.675a1.375 1.375 0 0 0-.044-1.92A1.374 1.374 0 0 0 13.483 0zm-1.587 2.585-3.673 3.675 3.673 3.675h7.252v-1.53h-5.733l-2.358-2.585 2.358-2.585h5.733v-1.53h-7.252z"/>
            </svg>
            <h2 class="text-2xl md:text-3xl font-bold text-white">¡Envío Prime en 2 días!</h2>
          </div>
          <p class="text-amber-100 text-sm md:text-base">
            Todos nuestros productos están disponibles en Amazon México con envío <strong class="text-white">Prime de 2 días máximo</strong>.
            ¿No tienes Prime? Los envíos estándar llegan en 3 a 5 días hábiles.
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white rounded-2xl border border-earth-100 overflow-hidden transition-all hover:shadow-sm"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full flex items-center justify-between p-6 text-left"
            >
              <span class="text-base md:text-lg font-semibold text-earth-800 pr-4">{{ faq.question }}</span>
              <svg
                :class="openFaqs.includes(index) ? 'rotate-180 text-primary-600' : 'text-earth-400'"
                class="w-5 h-5 flex-shrink-0 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div
              v-show="openFaqs.includes(index)"
              class="px-6 pb-6"
            >
              <div class="prose prose-earth max-w-none text-earth-600 text-sm leading-relaxed" v-html="faq.answer"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ¿Aún tienes dudas? -->
    <section class="py-16 bg-gradient-to-r from-primary-50 to-amber-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl font-serif font-bold text-earth-900 mb-4">
          ¿Aún tienes dudas?
        </h2>
        <p class="text-earth-600 mb-8">
          Escríbenos a nuestro buzón de mensajes y te responderemos a la brevedad.
        </p>
        <NuxtLink
          to="/contact"
          class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-xl hover:shadow-primary-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          Ir al buzón de mensajes
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Preguntas Frecuentes | PITAYA LAB',
  description: 'Resuelve tus dudas sobre productos PITAYA LAB: envíos, formas de uso, ingredientes, Amazon Prime y más.',
  ogTitle: 'FAQ | PITAYA LAB - Preguntas Frecuentes',
  ogDescription: 'Todo sobre nuestros productos: cómo comprar, envío Prime 2 días, cómo usar velas y aceites, y más.',
})

const openFaqs = ref([])

function toggleFaq(index) {
  if (openFaqs.value.includes(index)) {
    openFaqs.value = openFaqs.value.filter(i => i !== index)
  } else {
    openFaqs.value.push(index)
  }
}

const faqs = [
  {
    question: '🛒 ¿Cómo puedo comprar los productos PITAYA LAB?',
    answer: `
      <p>Muy sencillo. Todos nuestros productos están disponibles en nuestra <strong>tienda oficial de Amazon México</strong>.</p>
      <ol class="mt-2 space-y-1">
        <li>1. Explora nuestro <a href="/catalog" class="text-primary-600 underline">catálogo</a> y elige el producto que más te guste.</li>
        <li>2. Haz clic en <strong>"Comprar en Amazon"</strong> y serás redirigido a nuestra tienda oficial.</li>
        <li>3. Selecciona tu aroma favorito y completa tu compra de forma segura.</li>
      </ol>
      <p class="mt-2">🌎 <strong>Envío a toda la República Mexicana</strong> a través de Amazon.</p>
    `
  },
  {
    question: '🚚 ¿Cuánto tarda el envío?',
    answer: `
      <p>Depende del método de envío que elijas en Amazon México:</p>
      <ul class="mt-2 space-y-1">
        <li><strong>📦 Amazon Prime:</strong> <span class="text-amber-600 font-bold">¡2 días máximo!</span> Recibe tus productos en la puerta de tu casa en menos de 48 horas.</li>
        <li><strong>📦 Envío estándar:</strong> De 3 a 5 días hábiles.</li>
      </ul>
      <p class="mt-3 p-3 bg-amber-50 rounded-xl text-sm">
        💡 <strong>Tip:</strong> Si aún no tienes Amazon Prime, puedes activar una prueba gratuita para obtener envío gratis en 2 días.
      </p>
    `
  },
  {
    question: '🎨 ¿Cómo se usa la Bruma Aromática?',
    answer: `
      <p>Nuestra Bruma Aromática es muy versátil. Úsala de las siguientes formas:</p>
      <ul class="mt-2 space-y-1">
        <li><strong>🛋️ En ambientes:</strong> Rocía en el aire de cualquier habitación para refrescar el espacio.</li>
        <li><strong>🧵 En textiles:</strong> Perfecta para cortinas, cojines, ropa de cama y tapicería. No mancha ni daña los tejidos.</li>
        <li><strong>👕 En ropa:</strong> Úsala en tu clóset o directamente sobre prendas para darles un aroma fresco.</li>
      </ul>
      <p class="mt-2">🔔 <strong>225 ml</strong> rinden aproximadamente para 300 rociadas.</p>
    `
  },
  {
    question: '💧 ¿Cómo se usa el Aceite Aromático?',
    answer: `
      <p>El Aceite Aromático PITAYA LAB está diseñado para usarse en:</p>
      <ul class="mt-2 space-y-1">
        <li><strong>⚡ Difusores eléctricos:</strong> Añade 5-8 gotas en el depósito de agua de tu difusor.</li>
        <li><strong>💨 Humidificadores:</strong> Compatible con la mayoría de humidificadores ultrasónicos.</li>
        <li><strong>🕯️ Quemadores de aceite esencial:</strong> Coloca agua y 3-5 gotas en la parte superior del quemador.</li>
      </ul>
      <p class="mt-2">🔔 <strong>15 ml</strong> rinden aproximadamente para 60-80 usos en difusor.</p>
    `
  },
  {
    question: '🕯️ ¿Cómo uso la Vela Aromática Clásica?',
    answer: `
      <p>Para disfrutar al máximo tu Vela Clásica PITAYA LAB:</p>
      <ul class="mt-2 space-y-1">
        <li>🔥 <strong>Primer uso:</strong> Deja que la cera se derrita completamente hasta los bordes del tarro (aproximadamente 2-3 horas). Esto evita que se forme un túnel.</li>
        <li>✂️ <strong>Mecha:</strong> Recorta la mecha a 5 mm antes de cada uso para evitar humo negro.</li>
        <li>⏱️ <strong>Duración:</strong> No la enciendas más de 4 horas seguidas.</li>
        <li>🧯 <strong>Seguridad:</strong> Nunca dejes la vela encendida sin supervisión. Colócala sobre una superficie plana y resistente al calor.</li>
      </ul>
      <p class="mt-2">🔔 <strong>250 gr</strong> con una duración aproximada de 40-50 horas.</p>
    `
  },
  {
    question: '💎 ¿Qué hace especial a la Vela Mística con Cuarzos?',
    answer: `
      <p>La Vela Mística es nuestra edición más exclusiva:</p>
      <ul class="mt-2 space-y-1">
        <li>✨ Incluye <strong>cuarzos naturales</strong> incrustados en la cera que se revelan conforme la vela se consume.</li>
        <li>🎁 Viene en un <strong>envase de lujo</strong> que puedes reutilizar como joyero o decoración.</li>
        <li>🌿 Cera de soya premium con mayor concentración de fragancia.</li>
        <li>⏱️ <strong>350 gr</strong> con una duración de 55-70 horas.</li>
      </ul>
      <p class="mt-2">Cada vela es única, como la energía de los cristales que la acompañan.</p>
    `
  },
  {
    question: '🌿 ¿Los productos son realmente biodegradables?',
    answer: `
      <p>¡Sí! Todos nuestros productos están formulados con ingredientes de origen vegetal que se degradan naturalmente.</p>
      <ul class="mt-2 space-y-1">
        <li>✅ <strong>Cera de soya 100% natural</strong> (no parafina).</li>
        <li>✅ <strong>Mechas de algodón</strong> sin plomo ni blanqueadores.</li>
        <li>✅ <strong>Fórmulas libres</strong> de parabenos, ftalatos, sulfatos y colorantes artificiales.</li>
        <li>✅ <strong>Envases de vidrio</strong> reutilizables y reciclables.</li>
      </ul>
    `
  },
  {
    question: '🔄 ¿Puedo devolver un producto?',
    answer: `
      <p>Las devoluciones se gestionan directamente a través de Amazon México, quien cuenta con su propia política de devoluciones.</p>
      <p class="mt-2">Generalmente, Amazon ofrece <strong>30 días</strong> a partir de la recepción del producto para solicitar una devolución. Para más información, consulta la sección de "Devoluciones" en tu cuenta de Amazon.</p>
    `
  },
  {
    question: '🇲🇽 ¿Dónde están hechos los productos?',
    answer: `
      <p>🎯 Todos nuestros productos son <strong>Hechos en México</strong>.</p>
      <p class="mt-2">Producimos localmente con ingredientes de la más alta calidad, apoyando la economía local y reduciendo nuestra huella de carbono. Cada producto PITAYA LAB es elaborado con amor y dedicación en talleres mexicanos.</p>
    `
  },
  {
    question: '🎁 ¿Tienen opción de regalo?',
    answer: `
      <p>¡Claro que sí! Todos nuestros productos son ideales para regalar. La Vela Mística viene en un empaque de lujo perfecto para obsequiar.</p>
      <p class="mt-2">Al comprar en Amazon México, puedes seleccionar la opción de <strong>"Envolver para regalo"</strong> durante el proceso de compra para que llegue listo para entregar.</p>
      <p class="mt-2">¿Buscas un detalle especial? Cualquiera de nuestros productos es un regalo único que combina naturaleza, bienestar y diseño mexicano.</p>
    `
  },
]
</script>
