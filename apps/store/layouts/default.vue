<template>
  <div class="min-h-screen flex flex-col">
    <!-- Barra de navegación -->
    <NavBar />

    <!-- Contenido principal
         El padding superior compensa el header fijo. La navbar mide
         4rem (64px) en móvil y 5rem (80px) en desktop. -->
    <main class="flex-grow pt-16 md:pt-20">
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
    // p:domain_verify manejado en plugins/pinterest-verify.ts
  ]
})
</script>

