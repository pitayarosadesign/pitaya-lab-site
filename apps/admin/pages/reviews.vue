<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">💬 Reseñas de clientes</h1>
        <p class="text-sm text-gray-500 mt-1">Revisa, aprueba o elimina las reseñas que recibes de tus clientes.</p>
      </div>

      <!-- Filtros -->
      <div class="flex gap-2">
        <button
          v-for="t in tabs"
          :key="t.value"
          @click="activeTab = t.value; loadReviews()"
          class="px-4 py-2 text-sm font-medium rounded-lg border transition-colors"
          :class="activeTab === t.value ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'"
        >
          {{ t.label }}
          <span v-if="t.value === 'pending'" class="ml-1 text-xs opacity-80">({{ pendingCount }})</span>
        </button>
      </div>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="text-center py-16">
      <div class="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
      <p class="text-gray-500 mt-4">Cargando reseñas...</p>
    </div>

    <!-- Vacío -->
    <div v-else-if="reviews.length === 0" class="bg-white rounded-2xl border border-gray-200 p-12 text-center">
      <div class="text-5xl mb-4">⭐</div>
      <h3 class="text-lg font-semibold text-gray-900 mb-1">Aún no hay reseñas</h3>
      <p class="text-gray-500 text-sm">
        Cuando un cliente deje una reseña en la tienda, aparecerá aquí para que la apruebes.
      </p>
    </div>

    <!-- Lista de reseñas -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <!-- Foto del producto -->
        <div v-if="review.image_url" class="aspect-[4/3] bg-gray-50 overflow-hidden">
          <img :src="review.image_url" :alt="`Foto de ${review.name || 'cliente'}`" class="w-full h-full object-cover" />
        </div>

        <div class="p-5">
          <!-- Badge estado -->
          <div class="flex items-center justify-between mb-3">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              :class="review.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'"
            >
              {{ review.status === 'approved' ? '✅ Aprobada' : '⏳ Pendiente' }}
            </span>
            <span class="text-xs text-gray-400">{{ formatDate(review.created_at) }}</span>
          </div>

          <!-- Estrellas -->
          <div class="flex items-center gap-0.5 mb-2">
            <svg v-for="n in 5" :key="n" class="w-4 h-4" :class="n <= review.rating ? 'text-amber-400' : 'text-gray-200'" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-xs text-gray-400 ml-1">{{ review.rating }}.0</span>
          </div>

          <!-- Comentario -->
          <p class="text-gray-700 text-sm leading-relaxed mb-4">"{{ review.comment }}"</p>

          <!-- Autor -->
          <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-primary-100 to-amber-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">
              {{ (review.name || '?').charAt(0).toUpperCase() }}
            </div>
            <div class="min-w-0">
              <p class="text-sm font-semibold text-gray-900 truncate">{{ review.name }}</p>
              <p v-if="review.product" class="text-xs text-gray-400 truncate">{{ review.product }}</p>
              <p v-if="review.email" class="text-xs text-gray-400 truncate">{{ review.email }}</p>
            </div>
          </div>

          <!-- Acciones -->
          <div class="flex gap-2 mt-4">
            <button
              v-if="review.status !== 'approved'"
              @click="approveReview(review)"
              :disabled="changingId === review.id"
              class="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {{ changingId === review.id ? 'Aprobando...' : '✅ Aprobar' }}
            </button>
            <button
              @click="deleteReview(review)"
              :disabled="changingId === review.id"
              class="flex-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(true)
const reviews = ref([])
const activeTab = ref('pending')
const changingId = ref(null)

const tabs = [
  { value: 'pending', label: '⏳ Pendientes' },
  { value: 'approved', label: '✅ Aprobadas' },
  { value: 'all', label: 'Todas' },
]

const pendingCount = computed(() => reviews.value.filter(r => r.status !== 'approved').length)

async function loadReviews() {
  loading.value = true
  try {
    const url = activeTab.value === 'all' ? '/api/reviews' : `/api/reviews?status=${activeTab.value}`
    const res = await $fetch(url)
    reviews.value = res?.reviews || []
  } catch (e) {
    console.error('Error cargando reseñas:', e)
    reviews.value = []
    alert('Error al cargar reseñas: ' + (e?.data?.message || e.message))
  } finally {
    loading.value = false
  }
}

async function approveReview(review) {
  if (!confirm('¿Aprobar esta reseña? Se mostrará en la tienda.')) return
  changingId.value = review.id
  try {
    const res = await $fetch(`/api/reviews/${review.id}`, {
      method: 'PUT',
      body: { status: 'approved' },
    })
    if (res?.review) {
      await loadReviews()
    }
  } catch (e) {
    alert('Error al aprobar: ' + (e?.data?.message || e.message))
  } finally {
    changingId.value = null
  }
}

async function deleteReview(review) {
  if (!confirm('¿Eliminar esta reseña definitivamente?')) return
  changingId.value = review.id
  try {
    await $fetch(`/api/reviews/${review.id}`, { method: 'DELETE' })
    await loadReviews()
  } catch (e) {
    alert('Error al eliminar: ' + (e?.data?.message || e.message))
  } finally {
    changingId.value = null
  }
}

function formatDate(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
}

onMounted(loadReviews)
</script>
