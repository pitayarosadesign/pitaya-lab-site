<template>
  <section class="py-20 bg-gradient-to-r from-primary-900 to-earth-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
        {{ content.title || '¿Listo para transformar tu hogar?' }}
      </h2>
      <p v-if="content.description" class="text-primary-200 text-lg mb-8 max-w-2xl mx-auto">
        {{ content.description }}
      </p>
      <!-- Si es un botón de WhatsApp (link wa.me), mostrar botón verde -->
      <a
        v-if="isWhatsAppLink(content.button_link)"
        :href="content.button_link"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-green-500/30"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {{ content.button_text || 'Escríbenos por WhatsApp' }}
      </a>
      <!-- Si es un enlace interno (#), mostrar botón normal -->
      <a
        v-else-if="content.button_link && content.button_link.startsWith('#')"
        :href="content.button_link"
        class="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all"
      >
        {{ content.button_text || 'Ver más' }}
      </a>
      <!-- Fallback: botón de Amazon -->
      <a
        v-else
        :href="content.button_link || 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329'"
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
</template>

<script setup>
const props = defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

function isWhatsAppLink(link) {
  return /^https?:\/\/wa\.me\//i.test(link || '')
}
</script>
