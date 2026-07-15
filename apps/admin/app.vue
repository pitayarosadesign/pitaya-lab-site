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
  },
  title: 'Panel de Administración | PITAYA LAB',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>
