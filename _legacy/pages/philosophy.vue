<template>
  <div class="min-h-screen">
    <!-- Header -->
    <section class="relative py-24 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-amber-600 font-semibold text-sm uppercase tracking-wider">Nuestra Esencia</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-earth-900 mt-3 mb-6">
            Nuestra <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-primary-600">Filosofía</span>
          </h1>
          <p class="text-lg text-earth-600 leading-relaxed">
            Creemos en un mundo donde el cuidado del hogar y el respeto por la naturaleza 
            pueden coexistir en perfecta armonía.
          </p>
        </div>
      </div>
    </section>

    <!-- Manifiesto -->
    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl border border-earth-100 p-8 md:p-12 shadow-sm relative">
          <!-- Sello visual ecológico -->
          <div class="absolute -top-6 -right-6 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg border-4 border-white hidden md:block">
            <img
              src="/images/scents/concepto-ecologico.png"
              alt="Sello ecológico PITAYA LAB"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          <h2 class="text-2xl md:text-3xl font-serif font-bold text-earth-900 mb-8 text-center">
            🌿 Manifiesto PITAYA LAB
          </h2>
          
          <div class="space-y-6 text-earth-600 leading-relaxed">
            <div v-for="(item, index) in manifesto" :key="index" class="flex gap-4">
              <span class="text-2xl flex-shrink-0">{{ item.icon }}</span>
              <div>
                <h3 class="font-semibold text-earth-800 mb-1">{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Compromiso Ambiental -->
    <section class="py-20 bg-white/70">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="relative order-2 lg:order-1">
            <div class="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"
                alt="Compromiso con la naturaleza"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">Eco-Compromiso</span>
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-6">
              Cuidamos el planeta porque es nuestro hogar
            </h2>
            <div class="space-y-4 text-earth-600">
              <p>
                Cada decisión que tomamos en <strong class="text-earth-800">PITAYA LAB</strong> está guiada 
                por nuestro compromiso con el medio ambiente.
              </p>
              <ul class="space-y-3">
                <li v-for="(item, index) in ecoCommitments" :key="index" class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>{{ item }}</span>
                </li>
              </ul>
              <p class="mt-6">
                Creemos que pequeñas acciones generan grandes cambios. Por eso, cada producto 
                PITAYA LAB es un paso hacia un futuro más consciente y en armonía con la naturaleza.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-gradient-to-r from-primary-50 to-amber-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-serif font-bold text-earth-900 mb-4">
          Únete a nuestra comunidad
        </h2>
        <p class="text-earth-600 mb-8">
          Cada compra en nuestra tienda de Amazon es un voto por un mundo más natural y sostenible.
        </p>
        <a
          :href="AMAZON_LINK"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-xl hover:shadow-amber-200"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a1.375 1.375 0 0 0 0 1.994l2.414 2.585a1.375 1.375 0 0 0 1.994 0l3.779-3.788-3.787 3.787-2.414-2.585a1.374 1.374 0 0 1 0-1.994l3.705-3.964 3.675-3.675a1.375 1.375 0 0 0-.044-1.92A1.374 1.374 0 0 0 13.483 0zm-1.587 2.585-3.673 3.675 3.673 3.675h7.252v-1.53h-5.733l-2.358-2.585 2.358-2.585h5.733v-1.53h-7.252z"/>
          </svg>
          Comprar en Amazon
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Nuestra Filosofía | PITAYA LAB',
  description: 'Conoce la filosofía de PITAYA LAB: productos botánicos biodegradables que cuidan de ti y del planeta. Velas de soya, aceites y brumas ecológicas.',
  ogTitle: 'Filosofía PITAYA LAB | Cuidado Natural del Hogar',
  ogDescription: 'Manifiesto y compromiso ambiental de PITAYA LAB. Productos biodegradables para un hogar consciente.',
})

const AMAZON_LINK = 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329?'

const manifesto = [
  {
    icon: '🌱',
    title: 'Naturaleza Primero',
    description: 'Todos nuestros productos están hechos con ingredientes botánicos biodegradables. Creemos que la belleza no debe tener un costo ambiental.'
  },
  {
    icon: '🧪',
    title: 'Química Consciente',
    description: 'Rechazamos el uso de químicos agresivos, parabenos, ftalatos y sulfatos. Nuestras fórmulas son limpias, seguras y efectivas.'
  },
  {
    icon: '🏠',
    title: 'Hogar con Alma',
    description: 'Cada vela, aceite o bruma está diseñado para transformar tu espacio en un santuario de bienestar y conexión con la naturaleza.'
  },
  {
    icon: '✨',
    title: 'Experiencias que Inspiran',
    description: 'Nuestras fragancias están inspiradas en los mejores destinos de México. Del lujo de un resort a la serenidad de un jardín zen.'
  },
  {
    icon: '🤝',
    title: 'Hecho con Propósito',
    description: 'Apoyamos la producción local mexicana y elegimos empaques que puedan tener una segunda vida, porque cada detalle cuenta.'
  },
]

const ecoCommitments = [
  'Ingredientes 100% de origen vegetal y biodegradables',
  'Cera de soya natural (no parafina) en todas nuestras velas',
  'Mechas de algodón sin plomo ni blanqueadores',
  'Envases de vidrio reutilizables y reciclables',
  'Libres de parabenos, ftalatos, sulfatos y colorantes artificiales',
  'Producción local para reducir huella de carbono',
  'Nunca testamos en animales',
]
</script>
