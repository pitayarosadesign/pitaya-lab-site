<template>
  <section class="py-20" :class="settings.background === 'dark' ? 'bg-earth-900 text-white' : 'bg-white'">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" :class="alignmentClass">
      <span v-if="content.subtitle" class="text-primary-600 font-semibold text-sm uppercase tracking-wider">{{ content.subtitle }}</span>
      <h2 v-if="content.title" class="text-3xl md:text-4xl font-serif font-bold mt-2 mb-4" :class="settings.background === 'dark' ? 'text-white' : 'text-earth-900'">
        {{ content.title }}
      </h2>
      <div
        v-if="content.body"
        class="prose prose-lg max-w-none"
        :class="settings.background === 'dark' ? 'prose-invert' : ''"
        v-html="content.body"
      ></div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

const alignmentClass = computed(() => {
  const align = props.settings.alignment || 'center'
  return {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
  }[align] || 'text-center'
})
</script>
