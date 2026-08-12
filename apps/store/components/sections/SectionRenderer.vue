<template>
  <div>
    <!-- Renderiza cada sección según su tipo -->
    <component
      :is="sectionComponent"
      v-if="sectionComponent"
      :content="section.content"
      :settings="section.settings"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  section: { type: Object, required: true },
})

// Mapea el tipo de sección al componente correspondiente
const sectionComponent = computed(() => {
  const map = {
    hero: 'SectionHero',
    products: 'SectionProducts',
    collection: 'SectionCollection',
    collections: 'SectionCollections',
    scents: 'SectionScents',
    reviews: 'SectionReviews',
    values: 'SectionValues',
    cta: 'SectionCta',
    trust: 'SectionTrust',
    text: 'SectionText',
    image_text: 'SectionImageText',
    gallery: 'SectionGallery',
    html: 'SectionHtml',
    newsletter: 'SectionNewsletter',
  }
  return map[props.section.type] || null
})
</script>
