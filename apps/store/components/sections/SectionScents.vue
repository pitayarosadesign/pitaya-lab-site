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
          class="group relative rounded-2xl overflow-hidden aspect-square bg-earth-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
          @click="toggleScent(scent.id)"
        >
          <img
            v-if="scent.image_url"
            :src="useOptimizedImage(scent.image_url, { width: 600, quality: 80 })"
            :alt="`Aroma ${scent.name} - PITAYA LAB`"
            class="w-full h-full object-cover transform transition-transform duration-700"
            :class="isOpen(scent.id) ? 'scale-110' : 'group-hover:scale-110'"
            loading="lazy"
            decoding="async"
          />
          <div v-else class="w-full h-full bg-gradient-to-br from-primary-100 to-amber-100 flex items-center justify-center">
            <span class="text-5xl">{{ scent.emoji || '🌸' }}</span>
          </div>

          <!-- Gradiente inferior: siempre oscuro para que el nombre sea legible -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-earth-950/90 via-earth-900/25 to-transparent transition-opacity duration-500"
            :class="isOpen(scent.id) ? 'opacity-100' : 'opacity-70 group-hover:opacity-90'"
          ></div>

          <div class="absolute inset-x-0 bottom-0 p-3 sm:p-4">
            <h4 class="text-white font-semibold text-base sm:text-lg font-serif drop-shadow">{{ scent.name }}</h4>

            <!-- Descripción colapsable: se abre al tocar (móvil) o al hover (escritorio) -->
            <div
              class="grid transition-all duration-300"
              :class="isOpen(scent.id)
                ? 'grid-rows-[1fr] opacity-100 translate-y-0'
                : 'grid-rows-[0fr] opacity-0 translate-y-2 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:translate-y-0'"
            >
              <div class="overflow-hidden">
                <p v-if="scent.subtitle" class="text-white/80 text-xs mt-1">{{ scent.subtitle }}</p>
                <p v-if="scent.experience" class="text-white/80 text-xs mt-1">{{ scent.experience }}</p>
                <div v-if="scent.notes" class="mt-1.5 space-y-0.5">
                  <p v-for="note in splitNotes(scent.notes)" :key="note" class="text-white/70 text-[11px] leading-snug">{{ note }}</p>
                </div>
              </div>
            </div>

            <!-- Hint táctil solo en móvil y con la tarjeta cerrada -->
            <p v-if="!isOpen(scent.id)" class="mt-1.5 inline-flex items-center gap-1 text-[10px] text-white/60 sm:hidden">
              Toca para ver detalles
            </p>
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

// Tarjeta abierta (descripción visible al tocar, útil en móvil).
const openScentId = ref(null)
function isOpen(id) { return openScentId.value === id }
function toggleScent(id) {
  openScentId.value = openScentId.value === id ? null : id
}

async function loadScents() {
  if (!supabase) return

  try {
    const { data, error } = await supabase
      .from('fragrance_profiles')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error

    let list = data || []

    // Si la sección tiene aromas curados (ej. por temporada), se muestran solo
    // esos, en el orden elegido en el editor de secciones.
    const ids = props.content?.scent_ids
    if (Array.isArray(ids) && ids.length > 0) {
      const byId = new Map(list.map(s => [s.id, s]))
      list = ids.map(id => byId.get(id)).filter(Boolean)
    }

    scents.value = list
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
