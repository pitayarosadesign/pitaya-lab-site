<template>
  <span
    v-if="svgMarkup"
    role="img"
    :aria-label="brand.name"
    class="inline-block shrink-0 leading-none"
    :style="{ color: brand.logo_color || 'currentColor' }"
    v-html="svgMarkup"
  />
  <img v-else :src="brand.logo_url" :alt="brand.name" />
</template>

<script setup>
const props = defineProps({
  brand: { type: Object, required: true },
})

// Renderiza el SVG inline (coloreable con currentColor) o el raster del logo.
// El SVG debe venir normalizado desde el admin (fills en currentColor y tamaño
// 100%); aquí solo saneamos por seguridad y forzamos que escale al contenedor.
const svgMarkup = computed(() => sanitizeSvg(props.brand?.logo_svg))

function sanitizeSvg(svg) {
  if (!svg || typeof svg !== 'string') return ''
  let out = svg
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/href\s*=\s*(["'])\s*javascript:[^"']*\1/gi, 'href="#"')
  // Escalar al contenedor preservando el viewBox original.
  out = out.replace(/\swidth\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  out = out.replace(/\sheight\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  return out.replace(/<svg\s/i, '<svg width="100%" height="100%" ')
}
</script>
