<template>
  <section class="py-20" :class="sectionBg">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Encabezado -->
      <div class="text-center mb-10">
        <span v-if="content.subtitle" class="text-primary-600 font-semibold text-sm uppercase tracking-wider">
          {{ content.subtitle }}
        </span>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
          {{ content.title || '@' + cleanHandle + ' en Instagram' }}
        </h2>
        <p v-if="content.description" class="text-earth-600 max-w-2xl mx-auto">
          {{ content.description }}
        </p>
      </div>

      <!-- Embed del perfil de Instagram (oficial vía iframe) -->
      <div
        v-if="embedHandle"
        class="instagram-embed-wrap mx-auto flex justify-center overflow-hidden rounded-2xl border border-earth-200 bg-white shadow-sm"
      >
        <iframe
          :src="`https://www.instagram.com/${embedHandle}/embed/`"
          width="440"
          height="600"
          frameborder="0"
          scrolling="no"
          allowtransparency="true"
          loading="lazy"
          :title="'Perfil de Instagram @' + embedHandle"
          class="max-w-full"
        ></iframe>
      </div>

      <!-- Alternativa: ícono + link al perfil (cuando no se provee handle) -->
      <div v-else class="text-center py-10">
        <span class="text-5xl block mb-4">📸</span>
        <p class="text-earth-500 mb-6">Conecta tus redes y muestra tu comunidad de PITAYA LAB.</p>
        <a
          v-if="profileUrl"
          :href="profileUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
        >
          Síguenos en Instagram
        </a>
      </div>

      <!-- Botón de seguimiento -->
      <div v-if="profileUrl" class="mt-8 text-center">
        <a
          :href="profileUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 bg-gradient-to-br from-primary-500 to-amber-500 hover:opacity-90 text-white px-8 py-4 rounded-full text-base font-semibold shadow-lg transition-all"
        >
          <instagram-icon class="w-5 h-5" />
          {{ ctaText }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
// Icono de Instagram inline (para no depender de librerías externas).
const InstagramIcon = defineComponent({
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>`,
})

const props = defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

const contentHandle = computed(() =>
  String(props.content.handle || props.content.username || '').replace(/^@/, '').trim()
)

// Solo hacemos embed cuando hay un handle válido.
const embedHandle = computed(() => (contentHandle.value ? encodeURIComponent(contentHandle.value) : ''))

const cleanHandle = computed(() => contentHandle.value)

const profileUrl = computed(() => {
  if (contentHandle.value) return `https://www.instagram.com/${encodeURIComponent(contentHandle.value)}/`
  return props.content.profile_link || ''
})

const ctaText = computed(() => props.content.cta_text || `@${contentHandle.value || 'pitayalab.mx'}`)

const sectionBg = computed(() =>
  props.settings.background === 'dark' ? 'bg-earth-900' : 'bg-white'
)
</script>
