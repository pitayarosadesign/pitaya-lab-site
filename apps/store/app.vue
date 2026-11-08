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

// 📊 Facebook Pixel (código base en todas las páginas)
const fbPixelId = useRuntimeConfig().public.fbPixelId || '1031196445800113'
useHead({
  script: [
    {
      id: 'facebook-pixel',
      innerHTML: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${fbPixelId}');fbq('track','PageView');`,
    },
  ],
  noscript: [
    {
      innerHTML: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1"/>`,
    },
  ],
})
</script>
