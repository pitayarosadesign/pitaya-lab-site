<template>
  <section class="py-20 bg-white/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <span v-if="content.subtitle" class="text-primary-600 font-semibold text-sm uppercase tracking-wider">{{ content.subtitle }}</span>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
          {{ content.title || collection?.name || 'Colección' }}
        </h2>
        <p v-if="content.description || collection?.description" class="text-earth-600 max-w-2xl mx-auto">
          {{ content.description || collection?.description }}
        </p>
      </div>

      <!-- Grid de productos de la colección -->
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
          :to="`/colecciones/${collection?.slug || ''}`"
          class="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
        >
          Ver toda la colección
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
const collection = ref(null)
const products = ref([])

async function loadCollection() {
  if (!supabase || !props.content.collection_id) return

  try {
    // Cargar la colección
    const { data: colData, error: colError } = await supabase
      .from('collections')
      .select('*')
      .eq('id', props.content.collection_id)
      .single()
    if (colError) throw colError
    collection.value = colData

    // Cargar los perfiles aromáticos de la colección
    const { data: profiles, error: profilesError } = await supabase
      .from('fragrance_profiles')
      .select('id, name, slug')
      .eq('collection_id', props.content.collection_id)
      .eq('is_active', true)
    if (profilesError) throw profilesError

    // Cargar productos que tengan variantes con esos aromas
    if (profiles && profiles.length > 0) {
      const profileIds = profiles.map(p => p.id)
      // Buscar variantes que apunten a esos perfiles aromáticos de forma explícita
      const { data: variants, error: variantsError } = await supabase
        .from('product_variants')
        .select('product_id, fragrance_profile_id')
        .in('fragrance_profile_id', profileIds)
        .eq('is_active', true)
      if (variantsError) throw variantsError

      const matchingProductIds = [...new Set((variants || []).map(v => v.product_id))]
      if (matchingProductIds.length > 0) {
        const { data: prodData, error: prodError } = await supabase
          .from('products')
          .select('*, product_images(url)')
          .in('id', matchingProductIds)
          .eq('is_active', true)
          .limit(props.content.max_products || 4)
        if (prodError) throw prodError

        products.value = (prodData || []).map(p => {
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
          }
        })
      }
    }
  } catch (e) {
    console.warn('Error cargando colección:', e.message)
  }
}

onMounted(loadCollection)
</script>

