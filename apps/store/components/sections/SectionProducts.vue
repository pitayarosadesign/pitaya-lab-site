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

// Ids "curados" (selección manual de productos concretos). Se guardan como los
// ids reales (UUID) de `products`, porque el selector del admin usa esos ids.
const curatedIds = computed(() => {
  const ids = props.content.product_ids
  return Array.isArray(ids) && ids.length ? ids.filter(Boolean) : []
})

// Ids de "recomendados" (selección manual global en site_config).
const recommendedIds = ref([])

async function loadRecommendedIds() {
  if (!supabase) return
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'recommended_products')
      .maybeSingle()
    if (error) throw error
    const ids = data?.value
    recommendedIds.value = Array.isArray(ids) ? ids.filter(Boolean) : []
  } catch (e) {
    console.warn('Error cargando productos recomendados:', e.message)
    recommendedIds.value = []
  }
}

// Carga los productos. Prioridad: `product_ids` (curated por sección) → ids
// "recomendados" (site_config) → primeros `max_products` activos por sort_order.
async function loadProducts() {
  if (!supabase) return

  // Prioridad de la sección:
  //   1) product_ids (selección manual)  2) category_slug (filtro por categoría)
  //   3) recommended_products (global)   4) automático (primeros por sort_order)
  await loadRecommendedIds()
  const ids = curatedIds.value.length ? curatedIds.value : recommendedIds.value
  const categorySlug = String(props.content.category_slug || '').trim()

  try {
    // Catálogo visible: menudeo + eventos/recuerdos, solo activos.
    let query = supabase
      .from('products')
      .select('*, product_categories(name, slug), product_images(url, is_primary, sort_order)')
      .in('sales_channel', ['directa', 'evento'])
      .eq('is_active', true)

    if (ids.length) {
      query = query.in('id', ids)
      // Sin límite: mostramos exactamente la selección; el orden se respeta abajo.
    } else if (categorySlug) {
      query = query.eq('product_categories.slug', categorySlug)
        .order('sort_order', { ascending: true })
        .limit(maxProducts.value)
    } else {
      query = query.order('sort_order', { ascending: true }).limit(maxProducts.value)
    }

    const { data, error } = await query
    if (error) throw error

    // Ordenar según la selección manual (Supabase `.in()` no garantiza el orden).
    let list = (data || []).map(p => {
      const primaryImg = p.product_images?.find(img => img.is_primary) || p.product_images?.[0]
      return {
        id: p.slug || p.id,
        dbId: p.id,
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

    if (ids.length) {
      const byId = new Map(list.map(p => [p.dbId, p]))
      list = ids.map(id => byId.get(id)).filter(Boolean)
    }

    products.value = list
  } catch (e) {
    console.warn('Error cargando productos:', e.message)
    products.value = []
  }
}

onMounted(loadProducts)
</script>

