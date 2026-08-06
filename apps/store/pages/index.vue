<template>
  <div>
    <!-- Hero Section (con video/imagen y textos de marca) -->
    <HeroSection
      :title="siteConfig.hero.title || 'Fragancias que\nconectan\ncon la naturaleza'"
      :subtitle="siteConfig.hero.subtitle || 'En PITAYA LAB creamos productos botánicos biodegradables para cuidar de ti y del planeta. Velas de soya perfumadas, aceites aromáticos y brumas que transforman tu hogar en una experiencia sensorial única.'"
      :badge="siteConfig.hero.badge || '100% Natural · Biodegradable · Hecho en México'"
      :cta_text="siteConfig.hero.cta_text || 'Explorar catálogo'"
      :cta_link="siteConfig.hero.cta_link || '/catalog'"
      :cta_secondary_text="siteConfig.hero.cta_secondary_text || 'Tienda Amazon'"
      :cta_secondary_link="siteConfig.hero.cta_secondary_link || AMAZON_LINK"
      :media_type="siteConfig.hero.media_type"
      :media_url="siteConfig.hero.media_url"
      :poster="siteConfig.hero.poster_url"
    />

    <!-- Sección de productos destacados -->
    <section class="py-20 bg-white/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">{{ siteConfig.products_section.subtitle || 'Descubre' }}</span>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
            {{ siteConfig.products_section.title || 'Nuestros Productos' }}
          </h2>
          <p class="text-earth-600 max-w-2xl mx-auto">
            {{ siteConfig.products_section.description || 'Velas de soya perfumadas, aceites aromáticos y brumas que transforman tu hogar en una experiencia sensorial única.' }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product-name="`${product.name} ${product.subtitle ? '– ' + product.subtitle : ''}`"
            :short-description="product.description"
            :image-url="product.image"
            :amazon-link="product.amazonLink"
            :product-slug="product.slug || product.id"
            :price="product.price"
            :product-id="product.id"
          />
        </div>

        <div class="text-center mt-10">
          <NuxtLink
            to="/catalog"
            class="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
          >
            Ver catálogo completo
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Sección de valores -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <span class="text-amber-600 font-semibold text-sm uppercase tracking-wider">Nuestro Compromiso</span>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
            ¿Por qué elegir PITAYA LAB?
          </h2>
          <!-- Valores cargados dinámicamente desde Supabase si están configurados -->
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(value, index) in brandValues"
            :key="index"
            class="text-center p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-earth-100 hover:border-primary-200 transition-all hover:shadow-lg"
          >
            <div class="w-14 h-14 mx-auto mb-5 bg-gradient-to-br from-primary-100 to-amber-100 rounded-2xl flex items-center justify-center">
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
            <h3 class="text-lg font-semibold text-earth-800 mb-3">{{ value.title }}</h3>
            <p class="text-sm text-earth-500 leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 📦 Sección de confianza: envíos -->
    <section class="py-16 bg-gradient-to-b from-white to-primary-50/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">Envíos</span>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
            Envíos seguros a todo México
          </h2>
          <p class="text-earth-600 max-w-2xl mx-auto">
            Recibe tus productos de forma rápida y confiable
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <!-- Envío gratis -->
          <div class="text-center p-6 rounded-2xl bg-white border border-earth-100 hover:border-primary-200 transition-all hover:shadow-lg">
            <div class="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-primary-100 to-green-100 rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-1h12l2 1"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10h4l3 3v3h-1"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-earth-800 mb-2">Envío gratis</h3>
            <p class="text-sm text-earth-500 leading-relaxed">En todas tus compras mayores a $299 MXN</p>
          </div>

          <!-- Costo simbólico -->
          <div class="text-center p-6 rounded-2xl bg-white border border-earth-100 hover:border-primary-200 transition-all hover:shadow-lg">
            <div class="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-earth-800 mb-2">Costo simbólico</h3>
            <p class="text-sm text-earth-500 leading-relaxed">Compras menores a $299 solo $50 MXN de envío</p>
          </div>

          <!-- Tiempo de entrega -->
          <div class="text-center p-6 rounded-2xl bg-white border border-earth-100 hover:border-primary-200 transition-all hover:shadow-lg">
            <div class="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-earth-800 mb-2">3 a 5 días hábiles</h3>
            <p class="text-sm text-earth-500 leading-relaxed">Entregamos a todo México con mensajerías de prestigio</p>
          </div>
        </div>

        <p class="text-center text-earth-400 text-sm mt-8">
          📦 Paquete Express · Estafeta · FedEx
        </p>
      </div>
    </section>

    <!-- Sección de aromas - VERSIÓN MEJORADA con imágenes conceptuales -->
    <section class="py-20 bg-white/70">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">{{ siteConfig.scents_section.subtitle || 'Aromas' }}</span>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
            {{ siteConfig.scents_section.title || 'El arte de la fragancia' }}
          </h2>
          <p class="text-earth-600 max-w-2xl mx-auto">
            {{ siteConfig.scents_section.description || 'Cada aroma ha sido cuidadosamente seleccionado para ofrecerte una experiencia única.' }}<br />
            <span class="text-sm text-earth-400">Pasa el cursor sobre cada imagen para descubrir su esencia</span>
          </p>
        </div>

        <!-- Grid de aromas con imágenes -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="scent in scentsWithImages"
            :key="scent.id"
            class="group relative rounded-2xl overflow-hidden aspect-square bg-earth-100 cursor-default shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <!-- Imagen de fondo -->
            <img
              :src="scent.image"
              :alt="`Aroma ${scent.name} - PITAYA LAB`"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <!-- Overlay con degradado -->
            <div class="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-earth-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
            <!-- Nombre del aroma -->
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <h4 class="text-white font-semibold text-lg font-serif transform group-hover:translate-y-0 transition-transform duration-300">{{ scent.name }}</h4>
              <p class="text-white/70 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                {{ scent.description }}
              </p>
            </div>
          </div>

          <!-- Aromas sin imagen (fallback con icono) -->
          <div
            v-for="scent in scentsWithoutImages"
            :key="scent.id"
            class="text-center p-6 rounded-2xl bg-white border border-earth-100 hover:border-amber-300 transition-all cursor-default flex flex-col items-center justify-center aspect-square"
          >
            <div class="w-12 h-12 mb-3 bg-gradient-to-br from-amber-100 to-primary-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h4 class="text-sm font-semibold text-earth-800">{{ scent.name }}</h4>
            <p class="text-xs text-earth-400 mt-1">{{ scent.description }}</p>
          </div>
        </div>

        <p class="text-center text-earth-500 text-sm mt-8">
          ✨ Todos los aromas disponibles en todas las presentaciones
        </p>
      </div>
    </section>

    <!-- ⭐ Sección de Reseñas (carrusel horizontal) -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <span class="text-amber-600 font-semibold text-sm uppercase tracking-wider">Reseñas</span>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p class="text-earth-600 max-w-2xl mx-auto">
            Opiniones reales de quienes ya disfrutan PITAYA LAB
          </p>
        </div>

        <!-- Carrusel horizontal -->
        <div class="relative">
          <!-- Flecha izquierda -->
          <button
            v-if="reviews.length > 3"
            @click="scrollReviews(-1)"
            class="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-earth-200 shadow-lg hover:bg-primary-50 hover:border-primary-300 flex items-center justify-center text-earth-600 hover:text-primary-600 transition-all"
            aria-label="Ver reseñas anteriores"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <!-- Contenedor scrollable -->
          <div
            ref="reviewsContainer"
            class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-thin scrollbar-thumb-earth-200 scrollbar-track-earth-50"
            style="scrollbar-width: thin;"
          >
            <div
              v-for="review in reviews"
              :key="review.id"
              class="flex-shrink-0 w-full sm:w-[380px] md:w-[400px] snap-start bg-white rounded-2xl border border-earth-100 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
            >
              <!-- Foto de la reseña -->
              <div v-if="review.image" class="aspect-[4/3] overflow-hidden bg-earth-50">
                <img
                  :src="review.image"
                  :alt="`Reseña de ${review.author}`"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div class="p-6 flex flex-col flex-grow">
                <!-- Estrellas -->
                <div class="flex items-center gap-1 mb-3">
                  <svg v-for="n in 5" :key="n" class="w-4 h-4" :class="n <= review.rating ? 'text-amber-400' : 'text-earth-200'" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-xs text-earth-400 ml-1">{{ review.rating }}.0</span>
                </div>

                <!-- Texto de la reseña -->
                <p class="text-earth-600 text-sm leading-relaxed flex-grow mb-4">
                  "{{ review.text }}"
                </p>

                <!-- Autor -->
                <div class="flex items-center gap-3 pt-4 border-t border-earth-100">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-amber-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">
                    {{ review.author.charAt(0) }}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-earth-800">{{ review.author }}</p>
                    <p class="text-xs text-earth-400">{{ review.product }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Flecha derecha -->
          <button
            v-if="reviews.length > 3"
            @click="scrollReviews(1)"
            class="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-earth-200 shadow-lg hover:bg-primary-50 hover:border-primary-300 flex items-center justify-center text-earth-600 hover:text-primary-600 transition-all"
            aria-label="Ver más reseñas"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- CTA Final (Amazon como respaldo) -->
    <section class="py-20 bg-gradient-to-r from-primary-900 to-earth-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
          {{ siteConfig.cta_section.title || '¿Listo para transformar tu hogar?' }}
        </h2>
        <p class="text-primary-200 text-lg mb-8 max-w-2xl mx-auto">
          {{ siteConfig.cta_section.description || 'Descubre nuestra colección completa en Amazon y encuentra la fragancia perfecta para cada momento.' }}
        </p>
        <a
          :href="AMAZON_LINK"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 px-10 py-5 rounded-full transition-all hover:shadow-xl hover:shadow-amber-900/30"
        >
          <img
            src="/images/amazon-logo.svg"
            alt="Amazon México"
            class="h-8 w-auto"
          />
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { products as staticProducts, SCENTS as staticSCENTS, brandValues as staticBrandValues } from '~/products/data'
import { optimizeImageUrl } from '~/utils/image'

useSeoMeta({
  title: 'PITAYA LAB | Velas de Soya, Aceites Aromáticos y Brumas Ecológicas',
  description: 'Descubre PITAYA LAB: productos botánicos biodegradables. Velas de soya perfumadas, aceites aromáticos y brumas que transforman tu hogar.',
  ogTitle: 'PITAYA LAB | Fragancias que conectan con la naturaleza',
  ogDescription: 'Productos botánicos biodegradables para el hogar. Velas de soya, aceites aromáticos y brumas ecológicas.',
})

const supabase = useNuxtApp().$supabase

// Estado dinámico
const siteConfig = reactive({
  hero: { title: '', subtitle: '', badge: '', cta_text: '', cta_link: '', cta_secondary_text: '', cta_secondary_link: '', media_type: '', media_url: '', poster_url: '' },
  products_section: { title: '', subtitle: '', description: '' },
  brand_values: [],
  scents_section: { title: '', subtitle: '', description: '' },
  cta_section: { title: '', description: '', button_text: '', button_link: '' },
})

const featuredProducts = ref([])
const SCENTS = ref(staticSCENTS)
const brandValues = ref(staticBrandValues)

const AMAZON_LINK = ref('https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329?')

// ⭐ Reseñas de clientes (gestionadas desde el panel admin)
const reviews = ref([
  {
    id: 1,
    author: 'María F.',
    rating: 5,
    product: 'Bruma Aromática Solara',
    text: 'El aroma es increíble, dura muchísimo y el empaque es precioso. Llegó muy bien protegido y rápido. Definitivamente volveré a comprar.',
    image: null,
  },
  {
    id: 2,
    author: 'Carlos R.',
    rating: 5,
    product: 'Vela de Soya Sandalo',
    text: 'La vela huele espectacular, se siente la calidad de la cera de soya. La flama es estable y dura muchas horas. Muy recomendada.',
    image: null,
  },
  {
    id: 3,
    author: 'Ana G.',
    rating: 5,
    product: 'Aceite Aromático Xcaret',
    text: 'Me encanta este aceite, el aroma es fresco y relajante. Unas gotitas en el difusor y toda la casa huele increíble. Excelente producto.',
    image: null,
  },
])

// Cargar configuración dinámica
async function loadConfig() {
  if (!supabase) return
  
  try {
    const { data, error } = await supabase.from('site_config').select('*')
    if (error) throw error

    if (data) {
      data.forEach(item => {
        if (item.key === 'hero') Object.assign(siteConfig.hero, item.value)
        else if (item.key === 'products_section') Object.assign(siteConfig.products_section, item.value)
        else if (item.key === 'brand_values' && Array.isArray(item.value)) brandValues.value = item.value
        else if (item.key === 'scents_section') Object.assign(siteConfig.scents_section, item.value)
        else if (item.key === 'cta_section') {
          Object.assign(siteConfig.cta_section, item.value)
          if (item.value?.button_link) AMAZON_LINK.value = item.value.button_link
        }
        else if (item.key === 'reviews' && item.value?.items?.length) {
          reviews.value = item.value.items.map((r, i) => ({ ...r, id: i + 1 }))
        }
      })
    }
  } catch (e) {
    console.warn('Usando datos estáticos (fallback):', e.message)
  }
}

// Cargar productos reales desde Supabase
async function loadProducts() {
  if (!supabase) {
    featuredProducts.value = staticProducts.map(p => ({
      ...p,
      price: p.price || 0,
      slug: p.slug || p.id,
      amazonLink: p.amazonLink || AMAZON_LINK.value,
    }))
    return
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_categories(name), product_images(url)')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .limit(4)

    if (error) throw error

    if (data && data.length > 0) {
      featuredProducts.value = data.map(p => {
        const primaryImg = p.product_images?.find(img => img.is_primary) || p.product_images?.[0]
        return {
          id: p.slug || p.id,
          slug: p.slug,
          name: p.name,
          subtitle: p.subtitle || '',
          description: p.description || '',
          price: p.price || 0,
          image: optimizeImageUrl(primaryImg?.url, 400, 400) || null,
          amazonLink: p.amazon_link || AMAZON_LINK.value,
          category: p.product_categories?.name || '',
        }
      })
    } else {
      // Fallback a datos estáticos
      featuredProducts.value = staticProducts.map(p => ({
        ...p,
        price: p.price || 0,
        slug: p.slug || p.id,
        amazonLink: p.amazonLink || AMAZON_LINK.value,
      }))
    }
  } catch (e) {
    console.warn('Error cargando productos, usando estáticos:', e.message)
    featuredProducts.value = staticProducts.map(p => ({
      ...p,
      price: p.price || 0,
      slug: p.slug || p.id,
      amazonLink: p.amazonLink || AMAZON_LINK.value,
    }))
  }
}

// Separamos aromas con y sin imagen
const scentsWithImages = computed(() => SCENTS.value.filter(s => s.image))
const scentsWithoutImages = computed(() => SCENTS.value.filter(s => !s.image))

// 🎠 Carrusel de reseñas
const reviewsContainer = ref(null)

function scrollReviews(direction) {
  const container = reviewsContainer.value
  if (!container) return
  const cardWidth = container.querySelector('.snap-start')?.offsetWidth || 400
  const gap = 24
  container.scrollBy({
    left: direction * (cardWidth + gap),
    behavior: 'smooth',
  })
}

// 🏷️ JSON-LD Schema para SEO - Organization
const schemaOrg = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PITAYA LAB',
  url: 'https://www.pitayalab.com.mx',
  logo: 'https://www.pitayalab.com.mx/images/brand/logo-pitayalab.png',
  description: 'Velas de soya perfumadas, aceites aromáticos y brumas ecológicas.',
  sameAs: [
    'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329',
  ],
}))

// 🏷️ JSON-LD Store schema con productos
const siteSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'PITAYA LAB',
  description: 'Productos botánicos biodegradables que transforman tu hogar con exquisitas fragancias.',
  url: 'https://www.pitayalab.com.mx',
  image: 'https://www.pitayalab.com.mx/images/brand/logo-pitayalab.png',
  email: 'contacto@pitayalab.com.mx',
  areaServed: { '@type': 'Country', name: 'MX' },
  makesOffer: featuredProducts.value.slice(0, 4).map(p => ({
    '@type': 'Offer',
    name: p.name,
    description: p.description,
    price: p.price,
    priceCurrency: 'MXN',
    url: `https://www.pitayalab.com.mx/product/${p.slug}`,
    availability: 'https://schema.org/InStock',
  })),
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify(schemaOrg.value, null, 2)),
    },
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify(siteSchema.value, null, 2)),
    },
  ],
})

onMounted(async () => {
  await Promise.all([loadConfig(), loadProducts()])
})
</script>
