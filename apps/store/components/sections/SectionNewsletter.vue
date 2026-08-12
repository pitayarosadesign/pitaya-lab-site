<template>
  <section class="py-20 bg-gradient-to-br from-primary-50 to-amber-50">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <span v-if="content.subtitle" class="text-primary-600 font-semibold text-sm uppercase tracking-wider">{{ content.subtitle }}</span>
      <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
        {{ content.title || 'Únete a nuestra comunidad' }}
      </h2>
      <p v-if="content.description" class="text-earth-600 mb-8">
        {{ content.description }}
      </p>

      <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          v-model="email"
          type="email"
          required
          placeholder="Tu correo electrónico"
          class="flex-1 px-4 py-3 rounded-full border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
        />
        <button
          type="submit"
          class="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold transition-all"
          :disabled="subscribing"
        >
          {{ subscribing ? 'Enviando...' : 'Suscribirme' }}
        </button>
      </form>
      <p v-if="message" class="text-sm mt-4" :class="error ? 'text-red-500' : 'text-green-600'">{{ message }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

const email = ref('')
const subscribing = ref(false)
const message = ref('')
const error = ref(false)

async function subscribe() {
  if (!email.value) return
  subscribing.value = true
  message.value = ''
  error.value = false

  try {
    const supabase = useNuxtApp().$supabase
    if (supabase) {
      const { error: dbError } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: email.value })
      if (dbError) throw dbError
    }
    message.value = '¡Gracias por suscribirte! Te avisaremos de nuestras novedades.'
    email.value = ''
  } catch (e) {
    error.value = true
    message.value = 'Ocurrió un error. Intenta de nuevo.'
  } finally {
    subscribing.value = false
  }
}
</script>
