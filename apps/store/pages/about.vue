<template>
  <div class="min-h-screen">
    <!-- Header de página -->
    <section class="relative py-24 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">Conócenos</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-earth-900 mt-3 mb-6">
            Sobre <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-amber-500">PITAYA LAB</span>
          </h1>
          <p class="text-lg text-earth-600 leading-relaxed">
            Somos una marca mexicana comprometida con la creación de productos botánicos biodegradables 
            que transforman los espacios en experiencias sensoriales únicas.
          </p>
        </div>
      </div>
    </section>

    <!-- Nuestra Historia -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-amber-600 font-semibold text-sm uppercase tracking-wider">Nuestra Historia</span>
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-6">
              Fragancias que nacen del corazón de México
            </h2>
            <div class="space-y-4 text-earth-600 leading-relaxed">
              <p>
                <strong class="text-earth-800">PITAYA LAB</strong> nace de la pasión por la naturaleza y el deseo de crear 
                productos que cuiden tanto de las personas como del planeta.
              </p>
              <p>
                Inspirados por la riqueza natural de México y las experiencias sensoriales de los mejores 
                destinos del país, creamos fragancias que evocan recuerdos y emociones.
              </p>
              <p>
                Nuestro nombre proviene de la Pitaya, una fruta mexicana vibrante y llena de vitalidad. 
                Como ella, buscamos aportar color, frescura y energía natural a cada hogar.
              </p>
              <p>
                Cada producto es elaborado con ingredientes botánicos cuidadosamente seleccionados, 
                libres de químicos agresivos, en envases pensados para ser reutilizados o reciclados.
              </p>
            </div>
          </div>
          <div class="relative">
            <!-- Contenedor con proporción 60-40 -->
            <div class="relative aspect-[4/5]">
              <!-- Imagen principal: 60% (ocupa casi todo el contenedor) -->
              <div class="absolute inset-0 w-[85%] h-[85%] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/brand/Nuestra Historia-imagen conceptual.jpg"
                  alt="PITAYA LAB - Nuestra historia"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <!-- Imagen secundaria: 40% (superpuesta abajo a la derecha) -->
              <div class="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10">
                <img
                  src="/images/brand/hero-bruma.png"
                  alt="Bruma aromática en ambiente zen con bambú y jazmín"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Valores -->
    <section class="py-20 bg-white/70">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">Nuestros Pilares</span>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
            ¿Qué nos hace diferentes?
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="(value, index) in brandValues"
            :key="index"
            class="flex gap-5 p-6 rounded-2xl bg-white border border-earth-100 hover:border-primary-200 transition-all"
          >
            <div class="w-14 h-14 flex-shrink-0 bg-gradient-to-br from-primary-100 to-amber-100 rounded-2xl flex items-center justify-center">
              <svg v-if="value.icon === 'leaf'" class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.372 7.264a6.5 6.5 0 0 1 9.615-4.934A6.5 6.5 0 0 1 21 8.5c0 5.63-9 12.5-9 12.5S3 14.13 3 8.5c0-.443.044-.878.128-1.3"/>
              </svg>
              <svg v-else-if="value.icon === 'shield'" class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <svg v-else-if="value.icon === 'heart'" class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z"/>
              </svg>
              <svg v-else class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-earth-800 mb-2">{{ value.title }}</h3>
              <p class="text-sm text-earth-500 leading-relaxed">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { brandValues } from '~/products/data'

useSeoMeta({
  title: 'Sobre Nosotros | PITAYA LAB',
  description: 'Conoce la historia de PITAYA LAB, una marca mexicana de productos botánicos biodegradables. Velas de soya, aceites aromáticos y brumas ecológicas.',
  ogTitle: 'Sobre PITAYA LAB | Productos Botánicos Mexicanos',
  ogDescription: 'Historia y valores de PITAYA LAB: fragancias que nacen del corazón de México.',
})
</script>
