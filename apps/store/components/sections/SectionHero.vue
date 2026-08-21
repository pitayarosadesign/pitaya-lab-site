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
    :slides="content.slides"
    :bg_color="content.bg_color"
    :overlay_gradient="content.overlay_gradient"
    :text_align="content.text_align"
    :content_max_width="content.content_max_width"
    :badge_style="content.badge_style"
    :title_style="content.title_style"
    :subtitle_style="content.subtitle_style"
    :subtitle_color="content.subtitle_color"
    :primary_cta_style="content.primary_cta_style"
    :secondary_cta_style="content.secondary_cta_style"
    :show_badge_dot="content.show_badge_dot !== false"
  />
</template>

<script setup>
defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})
</script>
