<template>
  <section class="py-20 bg-white/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <span v-if="content.subtitle" class="text-primary-600 font-semibold text-sm uppercase tracking-wider">{{ content.subtitle }}</span>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
          {{ content.title || 'Nuestros Productos' }}
        </h2>
        <p v-if="content.description" class="text-earth-600 max-w-2xl mx-auto">
          {{ content.description }}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in products"
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

      <div v-if="content.show_view_all" class="text-center mt-10">
        <NuxtLink
          :to="content.view_all_link || '/catalog'"
          class="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
        >
          {{ content.view_all_text || 'Ver catálogo completo' }}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

const supabase = useNuxtApp().$supabase
const products = ref([])
const maxProducts = computed(() => props.content.max_products || 4)

// Carga los productos únicamente desde Supabase. Si no hay ningún producto
// activo, la sección simplemente no muestra tarjetas (estado vacío limpio).
async function loadProducts() {
  if (!supabase) return

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_categories(name), product_images(url, is_primary, sort_order)')
      .eq('sales_channel', 'directa')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .limit(maxProducts.value)

    if (error) throw error

    products.value = (data || []).map(p => {
      const primaryImg = p.product_images?.find(img => img.is_primary) || p.product_images?.[0]
      return {
        id: p.slug || p.id,
        slug: p.slug,
        name: p.name,
        subtitle: p.subtitle || '',
        description: p.description || '',
        price: p.price || 0,

        image: primaryImg?.url || null,
        amazonLink: p.amazon_link || 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329',
        category: p.product_categories?.name || '',
      }
    })
  } catch (e) {
    console.warn('Error cargando productos:', e.message)
    products.value = []
  }
}

onMounted(loadProducts)
</script>
