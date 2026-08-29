<template>
  <div class="min-h-screen">
    <!-- Header -->
    <section class="relative py-24 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">⭐ Reseña de producto</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-earth-900 mt-3 mb-6">
            Cuéntanos tu experiencia con <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-amber-500">PITAYA LAB</span>
          </h1>
          <p class="text-lg text-earth-600 leading-relaxed">
            Tu opinión nos ayuda a seguir creando aromas que transformen hogares como el tuyo. ¡Gracias por compartirla! 💚
          </p>
        </div>
      </div>
    </section>

    <!-- Formulario -->
    <section class="pb-20">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl border border-earth-100 p-8 md:p-12 shadow-sm">

          <!-- Mensaje de éxito -->
          <div v-if="formSubmitted" class="text-center py-12">
            <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-amber-100 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.78 7.22a.75.75 0 010 1.06l-5 5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 011.06-1.06l1.97 1.97 4.47-4.47a.75.75 0 011.06 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-2xl font-serif font-bold text-earth-900 mb-3">¡Gracias por tu reseña! 💚</h3>
            <p class="text-earth-500 max-w-md mx-auto">
              Hemos recibido tu opinión. Pronto aparecerá publicada en nuestra página.
              ¡Nos alegra mucho saber de ti!
            </p>
            <NuxtLink
              to="/catalog"
              class="inline-block mt-8 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-primary-200"
            >
              Explorar más productos
            </NuxtLink>
          </div>

          <!-- Formulario -->
          <form v-else @submit.prevent="handleSubmit" class="space-y-6">

            <!-- Calificación (estrellas) -->
            <div class="text-center">
              <label class="block text-sm font-medium text-earth-700 mb-2">¿Cómo calificas tu experiencia?</label>
              <div class="flex items-center justify-center gap-1">
                <button
                  v-for="star in 5"
                  :key="star"
                  type="button"
                  @click="form.rating = star"
                  class="text-3xl transition-colors focus:outline-none"
                  :class="star <= form.rating ? 'text-amber-400' : 'text-earth-200 hover:text-amber-200'"
                  :aria-label="`${star} estrellas`"
                >
                  ★
                </button>
              </div>
              <p class="text-xs text-earth-400 mt-1">{{ ratingLabel }}</p>
            </div>

            <!-- Nombre -->
            <div>
              <label for="name" class="block text-sm font-medium text-earth-700 mb-1">
                Nombre <span class="text-red-400">*</span>
              </label>
              <input
                id="name"
                v-model="form.name"
                name="name"
                type="text"
                required
                placeholder="Tu nombre"
                class="w-full px-4 py-3 rounded-xl border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-earth-800 placeholder-earth-300"
              />
            </div>

            <!-- Correo (opcional, para confirmar compra) -->
            <div>
              <label for="email" class="block text-sm font-medium text-earth-700 mb-1">
                Correo electrónico <span class="text-earth-400 text-xs">(opcional)</span>
              </label>
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                class="w-full px-4 py-3 rounded-xl border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-earth-800 placeholder-earth-300"
              />
            </div>

            <!-- Producto -->
            <div>
              <label for="product" class="block text-sm font-medium text-earth-700 mb-1">
                Producto que compraste <span class="text-red-400">*</span>
              </label>
              <input
                id="product"
                v-model="form.product"
                name="product"
                type="text"
                required
                placeholder="Ej: Bruma Solara, Vela Clásica Xcaret..."
                class="w-full px-4 py-3 rounded-xl border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-earth-800 placeholder-earth-300"
              />
            </div>

            <!-- Foto del producto (opcional) -->
            <div>
              <label class="block text-sm font-medium text-earth-700 mb-2">
                Foto de tu producto <span class="text-earth-400 text-xs">(opcional)</span>
              </label>
              <div class="flex items-center gap-4">
                <div class="w-20 h-20 rounded-xl overflow-hidden bg-earth-50 border border-earth-200 flex items-center justify-center flex-shrink-0">
                  <img v-if="photoPreview" :src="photoPreview" alt="Vista previa de la foto" class="w-full h-full object-cover" />
                  <svg v-else class="w-8 h-8 text-earth-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div class="flex-1 space-y-2">
                  <input type="file" name="photo" accept="image/png,image/jpeg,image/webp,image/gif" class="hidden" ref="photoInput" @change="onPhotoChange" />
                  <div class="flex items-center gap-2">
                    <button type="button" @click="photoInput?.click()" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-earth-200 bg-white text-sm text-earth-600 hover:bg-earth-50 hover:border-primary-300 transition-colors">
                      📷 {{ photoPreview ? 'Cambiar foto' : 'Subir foto' }}
                    </button>
                    <button v-if="photoPreview" type="button" @click="removePhoto" class="text-sm text-red-400 hover:text-red-600">Quitar</button>
                  </div>
                  <p class="text-xs text-earth-400">PNG o JPG · máximo 5MB</p>
                </div>
              </div>
            </div>

            <!-- Comentario -->
            <div>
              <label for="message" class="block text-sm font-medium text-earth-700 mb-1">
                Comentario <span class="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                v-model="form.message"
                name="message"
                required
                rows="5"
                placeholder="Cuéntanos qué te pareció el aroma, el packaging, la entrega..."
                class="w-full px-4 py-3 rounded-xl border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-earth-800 placeholder-earth-300 resize-none"
              ></textarea>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="sending"
              class="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-primary-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg v-if="sending" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
              </svg>
              {{ sending ? 'Enviando reseña...' : 'Enviar mi reseña' }}
            </button>

            <p class="text-xs text-earth-400 text-center">
              Tu opinión es importante para nosotros. Revisamos todas las reseñas antes de publicarlas.
            </p>
          </form>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Reseñas | PITAYA LAB',
  description: 'Cuéntanos tu experiencia con los productos PITAYA LAB. Tu opinión nos ayuda a mejorar y seguir creando aromas que transforman hogares.',
  robots: 'noindex, follow',
})

const form = reactive({
  name: '',
  email: '',
  product: '',
  rating: 5,
  message: '',
})

const photoInput = ref(null)
const photoPreview = ref('')
const photoBase64 = ref('') // para vista previa y envío de foto
const photoFileName = ref('')

const sending = ref(false)
const formSubmitted = ref(false)

// Lee la foto seleccionada, genera vista previa y guarda el base64 para el adjunto
function onPhotoChange(e) {
  const file = e.target.files?.[0]
  if (!file) return

  // Validar tamaño máximo 5MB
  if (file.size > 5 * 1024 * 1024) {
    alert('La foto excede el tamaño máximo de 5MB. Elige una imagen más ligera.')
    e.target.value = ''
    return
  }

  // Validar tipo de imagen
  if (!file.type.startsWith('image/')) {
    alert('Por favor sube una imagen válida (PNG o JPG).')
    e.target.value = ''
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    photoPreview.value = reader.result
    // Guardar solo el base64 (sin el prefijo "data:..." para el adjunto de EmailJS)
    const dataUrl = reader.result
    photoBase64.value = dataUrl.split(',')[1]
    photoFileName.value = file.name
  }
  reader.readAsDataURL(file)
}

function removePhoto() {
  photoPreview.value = ''
  photoBase64.value = ''
  photoFileName.value = ''
  if (photoInput.value) photoInput.value.value = ''
}

const ratingLabel = computed(() => {
  const labels = {
    1: 'Muy malo',
    2: 'Malo',
    3: 'Regular',
    4: 'Bueno',
    5: '¡Excelente! 🎉',
  }
  return labels[form.rating] || ''
})

async function handleSubmit() {
  sending.value = true
  try {
    // Guarda la reseña + foto en Supabase a través del endpoint del store.
    // Queda como 'pendiente' y se muestra en la tienda solo si la dueña la aprueba.
    const payload = {
      name: form.name,
      email: form.email || '',
      product: form.product,
      rating: form.rating,
      comment: form.message,
    }

    // Adjuntar la foto (si el cliente subió una)
    if (photoBase64.value && photoFileName.value) {
      payload.photo = {
        name: photoFileName.value,
        data: photoBase64.value, // base64 sin prefijo
      }
    }

    const res = await $fetch('/api/reviews', {
      method: 'POST',
      body: payload,
    })

    if (res?.success) {
      formSubmitted.value = true
    } else {
      throw new Error(res?.message || 'No se pudo guardar la reseña')
    }
  } catch (error) {
    console.error('Error al enviar reseña:', error)
    alert('Hubo un error al enviar tu reseña: ' + (error?.data?.message || 'Por favor intenta de nuevo.'))
  } finally {
    sending.value = false
  }
}
</script>
