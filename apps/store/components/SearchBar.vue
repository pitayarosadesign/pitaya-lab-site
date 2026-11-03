<template>
  <div ref="rootRef" class="relative w-full">
    <div class="relative">
      <svg
        class="w-4 h-4 text-earth-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/>
      </svg>
      <input
        v-model="q"
        type="search"
        inputmode="search"
        autocomplete="off"
        placeholder="Buscar productos…"
        aria-label="Buscar productos"
        class="w-full pl-9 pr-8 py-2 rounded-full border border-earth-200 bg-earth-50/50 text-sm text-earth-800 placeholder:text-earth-400 focus:outline-none focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all"
        @input="onInput"
        @focus="onInput"
        @keydown.down.prevent="move(1)"
        @keydown.up.prevent="move(-1)"
        @keydown.enter.prevent="openSelected"
        @keydown.esc.prevent="close"
      />
      <button
        v-if="q"
        type="button"
        @click="clear"
        class="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full text-earth-400 hover:text-earth-700 hover:bg-earth-100 transition-colors"
        aria-label="Limpiar búsqueda"
      >
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>

    <!-- Resultados -->
    <Transition
      enter-from-class="opacity-0 -translate-y-1"
      enter-active-class="transition-all duration-150"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-100"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="open && (loading || results.length > 0 || (q && searched))"
        class="absolute z-[70] mt-2 w-full min-w-[280px] sm:min-w-[340px] bg-white rounded-2xl border border-earth-100 shadow-xl shadow-earth-900/10 overflow-hidden"
      >
        <p v-if="loading" class="px-4 py-3 text-sm text-earth-400">Buscando…</p>

        <template v-else-if="results.length > 0">
          <NuxtLink
            v-for="(p, i) in results"
            :key="p.id"
            :to="`/product/${p.slug}`"
            class="flex items-center gap-3 px-3 py-2.5 hover:bg-primary-50 transition-colors"
            :class="i === activeIndex ? 'bg-primary-50' : ''"
            @click="close"
            @mouseenter="activeIndex = i"
          >
            <div class="w-11 h-11 rounded-lg overflow-hidden bg-earth-50 flex-shrink-0 flex items-center justify-center">
              <img
                v-if="p.image"
                :src="useOptimizedImage(p.image, { width: 120, quality: 75 })"
                :alt="p.name"
                class="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <span v-else class="text-earth-300 text-lg">📦</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-earth-800 truncate">{{ p.name }}</p>
              <p v-if="p.subtitle" class="text-xs text-earth-400 truncate">{{ p.subtitle }}</p>
            </div>
            <span class="text-sm font-bold text-primary-700 whitespace-nowrap">${{ formatPrice(p.price) }}</span>
          </NuxtLink>
        </template>

        <p v-else class="px-4 py-3 text-sm text-earth-400">Sin resultados para "{{ q }}"</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const q = ref('')
const results = ref([])
const loading = ref(false)
const open = ref(false)
const searched = ref(false)
const activeIndex = ref(-1)
const rootRef = ref(null)

let debounceTimer = null

function formatPrice(price) {
  return Number(price).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function onInput() {
  if (debounceTimer) clearTimeout(debounceTimer)
  const term = q.value.trim()

  if (term.length < 2) {
    results.value = []
    loading.value = false
    searched.value = false
    open.value = false
    activeIndex.value = -1
    return
  }

  open.value = true
  loading.value = true
  searched.value = false
  activeIndex.value = -1

  debounceTimer = setTimeout(async () => {
    try {
      const data = await $fetch('/api/products', { query: { search: term, limit: 8 } })
      results.value = data?.products || []
    } catch (e) {
      console.warn('Error buscando productos:', e.message)
      results.value = []
    } finally {
      loading.value = false
      searched.value = true
    }
  }, 250)
}

function move(dir) {
  if (!results.value.length) return
  activeIndex.value = (activeIndex.value + dir + results.value.length) % results.value.length
}

function openSelected() {
  const p = results.value[activeIndex.value]
  close()
  if (p) navigateTo(`/product/${p.slug}`)
}

function clear() {
  q.value = ''
  results.value = []
  open.value = false
  searched.value = false
  activeIndex.value = -1
}

function close() {
  open.value = false
}

function onDocClick(e) {
  if (rootRef.value && !rootRef.value.contains(e.target)) close()
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>
