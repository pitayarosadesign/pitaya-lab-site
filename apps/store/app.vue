<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  htmlAttrs: {
    lang: 'es-MX'
  }
})

// 🌐 SEO global por defecto (site_config.seo_global). Cada página puede
// sobrescribirlo con usePageSeo / useSeoMeta. Los campos vacíos no se tocan,
// así que los valores base de nuxt.config siguen como último respaldo.
const { data } = useFetch('/api/site/seo', {
  default: () => ({ value: null, global: null }),
})
const g = computed(() => data.value?.global || {})

useHead({
  title: () => g.value.title || undefined,
  meta: () => {
    const metas = []
    if (g.value.description) metas.push({ name: 'description', content: g.value.description })
    if (g.value.keywords) metas.push({ name: 'keywords', content: g.value.keywords })
    return metas
  },
})

useSeoMeta({
  ogTitle: () => g.value.ogTitle || g.value.title || undefined,
  ogDescription: () => g.value.ogDescription || g.value.description || undefined,
  robots: () => g.value.robots || undefined,
})
</script>
