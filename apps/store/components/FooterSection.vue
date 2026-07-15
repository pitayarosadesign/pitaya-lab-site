<template>
  <footer class="bg-earth-900 text-earth-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Marca -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <img
              src="/images/brand/logo-pitayalab.png"
              alt="PITAYA LAB"
              class="h-10 w-10 rounded-full object-cover shadow-md"
            />
            <div>
              <h3 class="text-lg font-serif font-bold text-white">PITAYA LAB</h3>
              <p class="text-xs text-earth-400">Fragancias que conectan</p>
            </div>
          </div>
          <p class="text-sm text-earth-400 leading-relaxed">
            Productos botánicos biodegradables que transforman tu hogar en una experiencia sensorial única.
          </p>
        </div>

        <!-- Enlaces rápidos -->
        <div>
          <h4 class="text-white font-semibold mb-4">Explorar</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/about" class="text-sm text-earth-400 hover:text-amber-400 transition-colors">Sobre Nosotros</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/philosophy" class="text-sm text-earth-400 hover:text-amber-400 transition-colors">Nuestra Filosofía</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/catalog" class="text-sm text-earth-400 hover:text-amber-400 transition-colors">Catálogo</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq" class="text-sm text-earth-400 hover:text-amber-400 transition-colors">Preguntas Frecuentes</NuxtLink>
            </li>
          </ul>
          <div class="mt-6 pt-6 border-t border-earth-800">
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/privacy" class="text-xs text-earth-500 hover:text-amber-400 transition-colors">Aviso de Privacidad</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/terms" class="text-xs text-earth-500 hover:text-amber-400 transition-colors">Términos y Condiciones</NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- Ayuda -->
        <div>
          <h4 class="text-white font-semibold mb-4">Ayuda</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/faq" class="text-sm text-earth-400 hover:text-amber-400 transition-colors flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Preguntas Frecuentes
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-sm text-earth-400 hover:text-amber-400 transition-colors flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Buzón de Mensajes
              </NuxtLink>
            </li>
            <li>
              <a :href="AMAZON_LINK" target="_blank" rel="noopener noreferrer" class="text-sm text-earth-400 hover:text-amber-400 transition-colors flex items-center gap-2">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a1.375 1.375 0 0 0 0 1.994l2.414 2.585a1.375 1.375 0 0 0 1.994 0l3.779-3.788-3.787 3.787-2.414-2.585a1.374 1.374 0 0 1 0-1.994l3.705-3.964 3.675-3.675a1.375 1.375 0 0 0-.044-1.92A1.374 1.374 0 0 0 13.483 0zm-1.587 2.585-3.673 3.675 3.673 3.675h7.252v-1.53h-5.733l-2.358-2.585 2.358-2.585h5.733v-1.53h-7.252z"/>
                </svg>
                Tienda Amazon
              </a>
            </li>
          </ul>
          <p class="mt-6 text-xs text-earth-500">
            © {{ new Date().getFullYear() }} PITAYA LAB. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const AMAZON_LINK = 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329?'
</script>
