<template>
  <div class="min-h-screen">
    <!-- Header -->
    <section class="relative py-24 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">{{ pageContent.header.badge || 'Contacto' }}</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-earth-900 mt-3 mb-6">
            {{ pageContent.header.title }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-amber-500">{{ pageContent.header.highlight }}</span>
          </h1>
          <p class="text-lg text-earth-600 leading-relaxed">
            {{ pageContent.header.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Formulario -->
    <section class="py-16">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl border border-earth-100 p-8 md:p-12 shadow-sm">
          <!-- Mensaje de éxito -->
          <div
            v-if="formSubmitted"
            class="text-center py-12"
          >
            <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-amber-100 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-serif font-bold text-earth-900 mb-3">{{ pageContent.success.title }}</h3>
            <p class="text-earth-500">{{ pageContent.success.description }}</p>
            <button
              @click="resetForm"
              class="mt-6 text-primary-600 hover:text-primary-700 font-semibold underline underline-offset-4 transition-colors"
            >
              Enviar otro mensaje
            </button>
          </div>

          <!-- Formulario -->
          <form v-else @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Nombre -->
            <div>
              <label for="name" class="block text-sm font-medium text-earth-700 mb-1">
                Nombre <span class="text-red-400">*</span>
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Tu nombre"
                class="w-full px-4 py-3 rounded-xl border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-earth-800 placeholder-earth-300"
              />
            </div>

            <!-- Correo -->
            <div>
              <label for="email" class="block text-sm font-medium text-earth-700 mb-1">
                Correo electrónico <span class="text-red-400">*</span>
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="tucorreo@ejemplo.com"
                class="w-full px-4 py-3 rounded-xl border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-earth-800 placeholder-earth-300"
              />
            </div>

            <!-- Teléfono (opcional) -->
            <div>
              <label for="phone" class="block text-sm font-medium text-earth-700 mb-1">
                Teléfono <span class="text-earth-400 text-xs">(opcional)</span>
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                placeholder="55 1234 5678"
                class="w-full px-4 py-3 rounded-xl border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-earth-800 placeholder-earth-300"
              />
            </div>

            <!-- Mensaje -->
            <div>
              <label for="message" class="block text-sm font-medium text-earth-700 mb-1">
                Mensaje <span class="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="5"
                placeholder="Escribe aquí tus comentarios, dudas o aclaraciones..."
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              {{ sending ? 'Enviando...' : 'Enviar mensaje' }}
            </button>

            <p class="text-xs text-earth-400 text-center">
              Tu información está protegida. Consulta nuestro
              <NuxtLink to="/privacy" class="text-primary-600 hover:text-primary-700 underline">Aviso de Privacidad</NuxtLink>.
            </p>
          </form>
        </div>

        <!-- Información adicional -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="(card, index) in pageContent.info_cards"
            :key="index"
            class="bg-white rounded-2xl border border-earth-100 p-6 text-center hover:border-primary-200 transition-all"
          >
            <div class="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-primary-100 to-amber-100 rounded-full flex items-center justify-center">
              <svg v-if="card.icon === 'clock'" class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <svg v-else-if="card.icon === 'box'" class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              <svg v-else class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h4 class="text-sm font-semibold text-earth-800 mb-1">{{ card.title }}</h4>
            <p class="text-xs text-earth-400">{{ card.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import emailjs from '@emailjs/browser'

useSeoMeta({
  title: 'Contacto | PITAYA LAB',
  description: 'Buzón de mensajes de PITAYA LAB. Envíanos tus comentarios, dudas o aclaraciones. Te responderemos a la brevedad.',
  ogTitle: 'Contacto | PITAYA LAB',
  ogDescription: 'Buzón de mensajes. Escríbenos tus dudas o comentarios.',
})

const supabase = useNuxtApp().$supabase

// Contenido editable desde el panel admin vía site_config (con fallback estático)
const pageContent = reactive({
  header: {
    badge: 'Contacto',
    title: 'Buzón de',
    highlight: 'Mensajes',
    description: '¿Tienes comentarios, dudas o aclaraciones? Escríbenos, estamos aquí para ayudarte.',
  },
  success: {
    title: '¡Mensaje enviado con éxito!',
    description: 'Gracias por escribirnos. Te responderemos a la brevedad posible.',
  },
  info_cards: [
    { icon: 'clock', title: 'Respuesta rápida', description: 'Te respondemos en menos de 24 horas' },
    { icon: 'box', title: 'Amazon Prime', description: 'Envío en 2 días máximo' },
    { icon: 'shield', title: 'Compra segura', description: 'Transacciones protegidas por Amazon' },
  ],
})

async function loadConfig() {
  if (!supabase) return
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'contact_page')
      .single()
    if (error) throw error
    if (data?.value) {
      if (data.value.header) Object.assign(pageContent.header, data.value.header)
      if (data.value.success) Object.assign(pageContent.success, data.value.success)
      if (Array.isArray(data.value.info_cards) && data.value.info_cards.length) pageContent.info_cards = data.value.info_cards
    }
  } catch (e) {
    console.warn('Usando datos estáticos para Contacto (fallback):', e.message)
  }
}

onMounted(loadConfig)

// Variables de entorno cargadas desde .env
// Configúralas en el archivo .env de la raíz del proyecto
const EMAILJS_PUBLIC_KEY = useRuntimeConfig().public.emailjsPublicKey
const EMAILJS_SERVICE_ID = useRuntimeConfig().public.emailjsServiceId
const EMAILJS_TEMPLATE_ID = useRuntimeConfig().public.emailjsTemplateId

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const sending = ref(false)
const formSubmitted = ref(false)

function resetForm() {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.message = ''
  formSubmitted.value = false
  sending.value = false
}

async function handleSubmit() {
  sending.value = true
  
  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        name: form.name,
        email: form.email,
        phone: form.phone || 'No proporcionado',
        message: form.message,
      },
      EMAILJS_PUBLIC_KEY
    )
    
    formSubmitted.value = true
  } catch (error) {
    console.error('Error al enviar mensaje:', error)
    alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.')
  } finally {
    sending.value = false
  }
}
</script>
