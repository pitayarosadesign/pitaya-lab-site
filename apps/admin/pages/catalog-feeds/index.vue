<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">📡 Catálogos de Venta</h1>
      <p class="text-sm text-gray-500 mt-1">Sincroniza tus productos con Google Merchant, Instagram Shopping y Pinterest</p>
    </div>

    <!-- Google Merchant -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">🛍️</span>
        <div>
          <h2 class="text-lg font-bold text-gray-900">Google Merchant Center</h2>
          <p class="text-sm text-gray-500">Feed de productos para Google Shopping</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div class="bg-gray-50 rounded-xl p-4 space-y-2">
          <p class="text-sm font-medium text-gray-700">URL del Feed</p>
          <code class="block bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-mono text-primary-600 break-all select-all">
            https://www.pitayalab.com.mx/api/merchant/feed.xml
          </code>
          <p class="text-xs text-gray-400">Usa esta URL (API directo, sin redirect) en Google Merchant Center → Productos → Feeds</p>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span class="w-2 h-2 rounded-full bg-green-500"></span>
          Feed generado automáticamente desde la base de datos
        </div>
        <a
          href="https://merchants.google.com"
          target="_blank"
          class="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Ir a Google Merchant Center →
        </a>
      </div>
    </div>

    <!-- Meta / Instagram Shopping -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">📸</span>
        <div>
          <h2 class="text-lg font-bold text-gray-900">Meta Catalog (Instagram / Facebook Shopping)</h2>
          <p class="text-sm text-gray-500">Feed de productos para Instagram Shopping</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div class="bg-gray-50 rounded-xl p-4 space-y-2">
          <p class="text-sm font-medium text-gray-700">URL del Feed</p>
          <code class="block bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-mono text-primary-600 break-all select-all">
            https://www.pitayalab.com.mx/api/meta/catalog.json
          </code>
          <p class="text-xs text-gray-400">Usa esta URL (API directo, sin redirect) en Meta Commerce Manager → Catálogo → Fuente de datos</p>
        </div>
        <a
          href="https://business.facebook.com/commerce"
          target="_blank"
          class="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Ir a Meta Commerce Manager →
        </a>
      </div>
    </div>

    <!-- Pinterest -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <span class="text-2xl">📌</span>
        <div>
          <h2 class="text-lg font-bold text-gray-900">Pinterest</h2>
          <p class="text-sm text-gray-500">Catálogo de productos para Pinterest Shopping</p>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div class="bg-gray-50 rounded-xl p-4">
          <p class="text-sm text-gray-600">
            Para sincronizar con Pinterest, usa el mismo feed de Google Merchant Center.
            En Pinterest Business Hub → Catalogs → Create catalog → Connect from Google Merchant.
          </p>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span class="w-2 h-2 rounded-full bg-green-500"></span>
          Dominio verificado con Pinterest
        </div>
      </div>
    </div>

    <!-- Estado de productos en feeds -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100">
        <h2 class="text-lg font-bold text-gray-900">📊 Estado de Productos en Feeds</h2>
      </div>
      <div class="p-6">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-gray-500 border-b border-gray-100">
                <th class="pb-3 font-medium">Producto</th>
                <th class="pb-3 font-medium">SKU</th>
                <th class="pb-3 font-medium">Google</th>
                <th class="pb-3 font-medium">Meta</th>
                <th class="pb-3 font-medium">Pinterest</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in products" :key="p.id" class="border-b border-gray-50">
                <td class="py-3 text-gray-900">{{ p.name }}</td>
                <td class="py-3 font-mono text-xs text-gray-400">{{ p.sku }}</td>
                <td class="py-3">
                  <span class="text-xs px-2 py-1 rounded-full" :class="p.price > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'">
                    {{ p.price > 0 ? '✅ Activo' : '❌ Sin precio' }}
                  </span>
                </td>
                <td class="py-3">
                  <span class="text-xs px-2 py-1 rounded-full" :class="p.image ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'">
                    {{ p.image ? '✅ Con imagen' : '⚠️ Sin imagen' }}
                  </span>
                </td>
                <td class="py-3">
                  <span class="text-xs px-2 py-1 rounded-full" :class="p.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'">
                    {{ p.is_active ? '✅ Activo' : '❌ Inactivo' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Catálogos | Panel Administrativo | PITAYA LAB' })

const supabase = useSupabase()
const products = ref([])

onMounted(async () => {
  try {
    const { data } = await supabase
      .from('products')
      .select('id, name, sku, price, is_active, slug, product_images(url, is_primary)')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (data) {
      products.value = data.map(p => {
        // Buscar imagen primaria, si no, la primera
        const images = p.product_images || []
        const primary = images.find(img => img.is_primary) || images[0]
        return {
          id: p.id,
          name: p.name,
          sku: p.sku,
          price: p.price,
          is_active: p.is_active,
          slug: p.slug,
          image: primary?.url || null,
        }
      })
    }
  } catch (e) {
    console.error('Error cargando productos:', e)
  }
})
</script>
