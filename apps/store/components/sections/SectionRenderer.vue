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
// Importamos explícitamente los componentes de sección para garantizar que
// estén incluidos en el bundle y se resuelvan correctamente con <component :is>.
// (Nuxt no puede detectar en build-time qué componentes se usan vía string,
//  por lo que sin estas importaciones quedarían fuera del bundle y la página
//  se vería vacía.)
import SectionHero from './SectionHero.vue'
import SectionProducts from './SectionProducts.vue'
import SectionCollection from './SectionCollection.vue'
import SectionCollections from './SectionCollections.vue'
import SectionScents from './SectionScents.vue'
import SectionReviews from './SectionReviews.vue'
import SectionValues from './SectionValues.vue'
import SectionCta from './SectionCta.vue'
import SectionTrust from './SectionTrust.vue'
import SectionText from './SectionText.vue'
import SectionImageText from './SectionImageText.vue'
import SectionGallery from './SectionGallery.vue'
import SectionHtml from './SectionHtml.vue'
import SectionNewsletter from './SectionNewsletter.vue'

const props = defineProps({
  section: { type: Object, required: true },
})

// Mapea el tipo de sección al componente correspondiente
const sectionComponent = computed(() => {
  const map = {
    hero: SectionHero,
    products: SectionProducts,
    collection: SectionCollection,
    collections: SectionCollections,
    scents: SectionScents,
    reviews: SectionReviews,
    values: SectionValues,
    cta: SectionCta,
    trust: SectionTrust,
    text: SectionText,
    image_text: SectionImageText,
    gallery: SectionGallery,
    html: SectionHtml,
    newsletter: SectionNewsletter,
  }
  return map[props.section.type] || null
})
</script>
