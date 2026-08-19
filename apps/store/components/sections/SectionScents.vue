<template>
  <section class="py-20 bg-white/70">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <span v-if="content.subtitle" class="text-primary-600 font-semibold text-sm uppercase tracking-wider">{{ content.subtitle }}</span>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-earth-900 mt-2 mb-4">
          {{ content.title || 'El arte de la fragancia' }}
        </h2>
        <p v-if="content.description" class="text-earth-600 max-w-2xl mx-auto">
          {{ content.description }}
        </p>
      </div>

      <!-- Grid de aromas -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="scent in scents"
          :key="scent.id"
          class="group relative rounded-2xl overflow-hidden aspect-square bg-earth-100 cursor-default shadow-sm hover:shadow-xl transition-all duration-500"
        >
          <img
            v-if="scent.image_url"
            :src="scent.image_url"
            :alt="`Aroma ${scent.name} - PITAYA LAB`"
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div v-else class="w-full h-full bg-gradient-to-br from-primary-100 to-amber-100 flex items-center justify-center">
            <span class="text-5xl">{{ scent.emoji || '🌸' }}</span>
          </div>

          <div class="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-earth-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>

          <div class="absolute bottom-0 left-0 right-0 p-4">
            <h4 class="text-white font-semibold text-lg font-serif">{{ scent.name }}</h4>
            <p v-if="scent.subtitle" class="text-white/70 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              {{ scent.subtitle }}
            </p>
            <p v-if="scent.experience" class="text-white/70 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              {{ scent.experience }}
            </p>
            <div v-if="scent.notes" class="mt-2 space-y-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <p v-for="note in splitNotes(scent.notes)" :key="note" class="text-white/60 text-[11px] leading-snug">
                {{ note }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p v-if="content.show_all" class="text-center text-earth-500 text-sm mt-8">
        ✨ Todos los aromas disponibles en todas las presentaciones
      </p>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

const supabase = useNuxtApp().$supabase
const scents = ref([])

async function loadScents() {
  if (!supabase) return

  try {
    const { data, error } = await supabase
      .from('fragrance_profiles')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    if (data) scents.value = data
  } catch (e) {
    console.warn('Error cargando aromas:', e.message)
  }
}

function splitNotes(notes) {
  if (!notes) return []
  return notes.split('/').map(n => n.trim()).filter(Boolean)
}

onMounted(loadScents)
</script>
