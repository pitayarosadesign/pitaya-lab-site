<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">📦 Productos</h1>
      <NuxtLink
        to="/products/new"
        class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        + Nuevo Producto
      </NuxtLink>
    </div>

    <!-- Tabla de productos -->
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-4 py-3 text-left font-medium text-gray-500">Producto</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500">SKU</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500">Precio</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500">Stock</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500">Estado</th>
              <th class="px-4 py-3 text-right font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    <img
                      v-if="product.image"
                      :src="product.image"
                      :alt="product.name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ product.name }}</p>
                    <p class="text-xs text-gray-400">{{ product.category }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-gray-600 font-mono text-xs">{{ product.sku || '—' }}</td>
              <td class="px-4 py-3 text-gray-900 font-medium">${{ formatPrice(product.price) }}</td>
              <td class="px-4 py-3">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                  :class="product.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'"
                >
                  {{ product.stock > 0 ? `${product.stock} en stock` : 'Agotado' }}
                </span>
              </td>
              <td class="px-4 py-3">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                  :class="product.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'"
                >
                  {{ product.is_active ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="px-4 py-3 text-right">
                <NuxtLink
                  :to="`/products/${product.id}`"
                  class="text-primary-600 hover:text-primary-700 text-xs font-medium"
                >
                  Editar →
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Estado vacío -->
      <div v-if="products.length === 0" class="text-center py-16">
        <p class="text-4xl mb-3">📦</p>
        <p class="text-gray-500 font-medium">No hay productos aún</p>
        <p class="text-sm text-gray-400 mt-1">Crea tu primer producto para empezar a vender</p>
        <NuxtLink
          to="/products/new"
          class="inline-flex items-center gap-2 mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          + Crear primer producto
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const products = ref([])
const loading = ref(true)

async function loadProducts() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_categories(name)')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Cargar imagen principal de cada producto
    const productsWithImages = await Promise.all((data || []).map(async (p) => {
      let image = null
      try {
        const { data: images } = await supabase
          .from('product_images')
          .select('url')
          .eq('product_id', p.id)
          .eq('is_primary', true)
          .limit(1)
        if (images && images.length > 0) {
          image = images[0].url
        }
      } catch (e) {
        // Si no existe la tabla product_images, ignoramos
      }
      return {
        id: p.id,
        name: p.name,
        category: p.product_categories?.name || '',
        sku: p.sku,
        price: p.price,
        stock: p.stock,
        image,
        is_active: p.is_active
      }
    }))

    products.value = productsWithImages
  } catch (e) {
    console.error('Error cargando productos:', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProducts()
})

function formatPrice(price) {
  return Number(price).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>
