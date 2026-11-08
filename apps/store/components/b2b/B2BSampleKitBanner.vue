<template>
  <section class="py-12 md:py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-3xl overflow-hidden border border-primary-100 bg-gradient-to-br from-primary-50 to-amber-50 shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-8 md:p-12">
          <!-- Texto -->
          <div>
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wide mb-4">
              {{ eyebrow }}
            </span>
            <h2 class="font-serif font-bold text-2xl md:text-3xl text-earth-900 mb-3">{{ title }}</h2>
            <p class="text-earth-600 leading-relaxed mb-5">{{ description }}</p>

            <!-- Aromas estrella -->
            <div v-if="aromas.length" class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="a in aromas"
                :key="a"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-earth-200 text-xs font-semibold text-earth-700"
              >
                <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                {{ a }}
              </span>
            </div>

            <a
              :href="buttonLink"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-all hover:shadow-lg hover:shadow-primary-200"
            >
              {{ buttonText }}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
            <p v-if="note" class="text-xs text-earth-400 mt-3">{{ note }}</p>
          </div>

          <!-- Visual del kit -->
          <div class="flex items-center justify-center">
            <div class="relative">
              <div class="w-48 h-48 md:w-60 md:h-60 rounded-3xl bg-gradient-to-br from-primary-200 to-amber-200 flex items-center justify-center shadow-inner">
                <span class="text-7xl">🧴</span>
              </div>
              <div class="absolute -bottom-3 -right-3 bg-white rounded-2xl shadow-lg border border-earth-100 px-4 py-2">
                <p class="text-[10px] uppercase tracking-wide text-earth-400">Kit B2B</p>
                <p class="text-sm font-bold text-earth-800">Muestras</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: 'Kit de Muestras B2B' },
  title: { type: String, default: '¿Aún no conoces nuestros aromas en persona?' },
  description: { type: String, default: 'Pide tu Kit de Muestras B2B y evalúa fragancias y envases antes de hacer un pedido fuerte. Ideal para hoteles, boutiques y organizadores de bodas.' },
  buttonText: { type: String, default: 'Comprar Kit de Muestras (Reembolsable en tu 1er pedido)' },
  buttonLink: { type: String, default: '' },
  note: { type: String, default: 'El costo del kit se reembolsa como crédito en tu primer pedido de mayoreo.' },
  aromas: { type: Array, default: () => ['Xcaret', 'Solara', 'Westin Oasis', 'Palo Santo'] },
})
</script>
