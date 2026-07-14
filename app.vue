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
  meta: [
    { name: 'p:domain_verify', content: 'd1f4d6f02a0cc071ee113b862fd17940' }
  ]
})
</script>

