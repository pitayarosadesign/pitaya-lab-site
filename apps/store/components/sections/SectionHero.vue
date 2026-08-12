<template>
  <HeroSection
    :title="content.title"
    :subtitle="content.subtitle"
    :badge="content.badge"
    :cta_text="content.cta_text"
    :cta_link="content.cta_link"
    :cta_secondary_text="content.cta_secondary_text"
    :cta_secondary_link="content.cta_secondary_link"
    :media_type="content.media_type"
    :media_url="content.media_url"
    :poster="content.poster_url"
  />
</template>

<script setup>
defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})
</script>
