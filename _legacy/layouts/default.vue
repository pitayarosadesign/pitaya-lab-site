<template>
  <div class="min-h-screen flex flex-col">
    <!-- Barra de navegación -->
    <NavBar />

    <!-- Contenido principal -->
    <main class="flex-grow pt-20">
      <slot />
    </main>

    <!-- Footer -->
    <FooterSection />
  </div>
</template>

<script setup>
import NavBar from '~/components/NavBar.vue'
import FooterSection from '~/components/FooterSection.vue'

useHead({
  meta: [
    { name: 'p:domain_verify', content: 'd1f4d6f02a0cc071ee113b862fd17940' }
  ]
})
</script>

