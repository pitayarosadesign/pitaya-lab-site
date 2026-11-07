<template>
  <footer class="bg-earth-900 text-earth-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Marca -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <BrandLogo
              :brand="brand"
              class="h-10 w-10 rounded-full object-cover shadow-md"
            />
            <div>
              <h3 class="text-lg font-serif font-bold text-white">{{ brand.name }}</h3>
              <p class="text-xs text-earth-400">{{ brand.tagline }}</p>
            </div>
          </div>
          <p class="text-sm text-earth-400 leading-relaxed">
            {{ footer.description }}
          </p>

          <!-- Redes sociales -->
          <div v-if="footer.social && footer.social.length" class="mt-5 flex items-center gap-3">
            <a
              v-for="(s, i) in footer.social"
              :key="i"
              :href="s.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="s.network"
              class="w-9 h-9 rounded-full bg-earth-800 hover:bg-primary-600 flex items-center justify-center text-earth-300 hover:text-white transition-colors"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path :d="SOCIAL_ICONS[s.network] || SOCIAL_ICONS.generic" />
              </svg>
            </a>
          </div>
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

        <!-- Contacto -->
        <div>
          <h4 class="text-white font-semibold mb-4">Contacto</h4>
          <ul class="space-y-3 text-sm">
            <li v-if="contact.email">
              <a :href="`mailto:${contact.email}`" class="flex items-center gap-2 text-earth-400 hover:text-amber-400 transition-colors">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                {{ contact.email }}
              </a>
            </li>
            <li v-if="contact.phone">
              <a :href="phoneHref" class="flex items-center gap-2 text-earth-400 hover:text-amber-400 transition-colors">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h2.22a1 1 0 01.95.68l1.19 3.57a1 1 0 01-.25 1.06l-1.55 1.42a16.02 16.02 0 007.71 7.71l1.42-1.55a1 1 0 011.06-.25l3.57 1.19a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z"/>
                </svg>
                {{ contact.phone }}
              </a>
            </li>
            <li v-if="contact.whatsapp">
              <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </li>
          </ul>
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
              <a :href="footer.amazon_link" target="_blank" rel="noopener noreferrer" class="text-sm text-earth-400 hover:text-amber-400 transition-colors flex items-center gap-2">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a1.375 1.375 0 0 0 0 1.994l2.414 2.585a1.375 1.375 0 0 0 1.994 0l3.779-3.788-3.787 3.787-2.414-2.585a1.374 1.374 0 0 1 0-1.994l3.705-3.964 3.675-3.675a1.375 1.375 0 0 0-.044-1.92A1.374 1.374 0 0 0 13.483 0zm-1.587 2.585-3.673 3.675 3.673 3.675h7.252v-1.53h-5.733l-2.358-2.585 2.358-2.585h5.733v-1.53h-7.252z"/>
                </svg>
                Tienda Amazon
              </a>
            </li>
          </ul>

          <!-- 🌍 Stripe Climate -->
          <div v-if="footer.show_stripe" class="mt-6 pt-6 border-t border-earth-800">
            <a
              :href="footer.stripe_link"
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
// 🏷️ Marca, contenido del footer y enlaces: leídos del store unificado de
// site_config. Los objetos reactivos no se reasignan (solo se mutan), así que
// es seguro mantener una referencia directa. `navLinks` sí se reemplaza al cargar.
const siteConfig = useSiteConfigStore()
const brand = siteConfig.brand
const footer = siteConfig.footer
const contact = siteConfig.contact

// 🧭 El footer usa los mismos enlaces que el menú superior (sin "Inicio").
const navLinks = computed(() => siteConfig.navLinks.filter(link => link.path !== '/'))

// 📞 Enlaces de contacto normalizados.
const whatsappUrl = computed(() => `https://wa.me/${String(contact.whatsapp || '').replace(/\D/g, '')}`)
const phoneHref = computed(() => `tel:${String(contact.phone || '').replace(/[^\d+]/g, '')}`)

// Iconos de redes sociales (fill, viewBox 0 0 24 24).
const SOCIAL_ICONS = {
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  tiktok: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  pinterest: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.994 3.988-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.626 0 11.995-5.369 11.995-11.987 0-6.619-5.369-11.987-11.995-11.987z',
  youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  generic: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
}

onMounted(() => {
  siteConfig.fetchConfig()
})
</script>
