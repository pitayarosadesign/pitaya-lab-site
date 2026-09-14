<template>
  <section v-if="faqs.length" class="py-16 md:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-serif font-bold text-earth-900 text-center mb-10">{{ title }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div v-for="(faq, i) in faqs" :key="i" class="p-6 rounded-2xl border border-earth-100 bg-earth-50/40">
          <p class="font-semibold text-earth-800 mb-2">{{ faq.q }}</p>
          <p class="text-sm text-earth-500 leading-relaxed">{{ faq.a }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

const title = computed(() => props.content?.title || '')

const faqs = computed(() => {
  return Array.isArray(props.content?.faqs) ? props.content.faqs : []
})
</script>
