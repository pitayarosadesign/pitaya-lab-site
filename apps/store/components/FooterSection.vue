<template>
  <footer class="bg-earth-900 text-earth-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Marca -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <img
              :src="brand.logo_url"
              :alt="brand.name"
              class="h-10 w-10 rounded-full object-cover shadow-md"
            />
            <div>
              <h3 class="text-lg font-serif font-bold text-white">{{ brand.name }}</h3>
              <p class="text-xs text-earth-400">{{ brand.tagline }}</p>
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
            <li v-for="link in navLinks" :key="link.path">
              <NuxtLink :to="link.path" class="text-sm text-earth-400 hover:text-amber-400 transition-colors">{{ link.label }}</NuxtLink>
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

          <!-- 🌍 Stripe Climate -->
          <div class="mt-6 pt-6 border-t border-earth-800">
            <a
              href="https://climate.stripe.com/Ul0lzt"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-2 text-sm text-earth-400 hover:text-primary-400 transition-colors"
              aria-label="Stripe Climate - Contribuimos al 1% para el planeta"
            >
              <svg class="w-5 h-5 text-primary-500 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="flex flex-col leading-tight">
                <span class="font-medium text-earth-300 group-hover:text-primary-400 transition-colors">Stripe Climate</span>
                <span class="text-xs text-earth-500">1% para el planeta</span>
              </span>
            </a>
          </div>

          <p class="mt-6 text-xs text-earth-500">
            © {{ new Date().getFullYear() }} {{ brand.name }}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const AMAZON_LINK = 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329?'

// 🏷️ Marca configurable desde el admin
const brand = reactive({
  name: 'PITAYA LAB',
  tagline: 'Fragancias que conectan',
  logo_url: '/images/brand/logo-pitayalab.png',
})

const navLinks = ref([
  { path: '/about', label: 'Sobre Nosotros' },
  { path: '/philosophy', label: 'Nuestra Filosofía' },
  { path: '/catalog', label: 'Catálogo' },
  { path: '/recuerdos', label: 'Recuerdos' },
  { path: '/b2b', label: 'Mayoreo & Corporativo' },
  { path: '/faq', label: 'Preguntas Frecuentes' },
])

onMounted(async () => {
  if (!import.meta.client) return
  try {
    const supabase = useNuxtApp().$supabase
    if (!supabase) return
    const { data, error } = await supabase.from('site_config').select('key, value')
    const rows = Array.isArray(data) ? data : []
    const brandRow = rows.find(r => r.key === 'brand')
    const navRow = rows.find(r => r.key === 'nav_links')
    if (brandRow?.value) Object.assign(brand, brandRow.value)
    if (navRow?.value && Array.isArray(navRow.value) && navRow.value.length) {
      // El footer excluye "Inicio" pero usa el resto de los links configurados
      navLinks.value = navRow.value.filter(l => l.path !== '/')
    }
  } catch (e) {
    console.warn('Usando valores por defecto de marca en footer')
  }
})
</script>
