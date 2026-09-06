<template>
  <div class="min-h-screen">
    <!-- Header (configurable: ocultable y compacto según blocks.header en site_config) -->
    <section
      v-if="catalogConfig.blocks.header.enabled"
      class="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white"
      :class="catalogConfig.blocks.header.compact ? 'py-8' : 'py-24'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">{{ catalogConfig.header.badge }}</span>
          <h1 class="font-serif font-bold text-earth-900 mt-3 mb-6"
            :class="catalogConfig.blocks.header.compact ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'"
          >
            {{ catalogConfig.header.title }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-amber-500">{{ catalogConfig.header.highlight }}</span>
          </h1>
          <p v-if="!catalogConfig.blocks.header.compact" class="text-lg text-earth-600 leading-relaxed">
            {{ catalogConfig.header.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- 🔍 Filtros del catálogo
         ─────────────────────────────────────────────────────────────────────────────
         NOTA DE MANTENIMIENTO (importante leer antes de editar):
         • ESTA BARRA/DRAWER NO es "contenido CMS". Es LÓGICA DE CÓDIGO ligada al
           DOM de esta página. No se debe refactorizar como "sección editable del editor".
         • Los valores de las facetas (formato / aroma / colección / inspiración)
           se DERIVAN automáticamente de las tablas de la BD vía las options/
           computeds de abajo (categories, familyOptions, hotelOptions, aromas).
           Por eso, al cambiar en el admin una categoría, colección o perfil
           aromático, estos filtros se actualizan solos: NO hay doble fuente de
           verdad y no hace falta duplicar nada aquí.
         • Lo editable desde admin en esta página ES: el flag `blocks.filters.enabled`
           (mostrar/ocultar) y las etiquetas de los bloques, vía site_config >
           catalog_page > blocks. Todo lo demás es presentación de código.
         • Si a futuro se quieren FACETAS nuevas configurables (precio, certification,
           etc.), ahí SÍ conviene extraer esto a un componente genérico `FacetFilters.vue`
           que reciba config; ese refactor requiere DONDE esté la necesidad real.
         ───────────────────────────────────────────────────────────────────────────── -->
    <section v-if="catalogConfig.blocks.filters.enabled" class="bg-white border-b border-earth-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 📌 Toolbar de filtrado (discreto, a demanda mediante panel lateral) -->
        <!-- Línea: contador + botón Filtrar que abre el drawer de facetas -->
        <div class="flex items-center justify-between flex-wrap gap-2 py-3">
          <p class="text-sm text-earth-600">
            <span v-if="!loading" class="font-semibold text-earth-800">{{ filteredProducts.length }}</span>
            <span class="text-earth-400">{{ loading ? '…' : (filteredProducts.length === 1 ? ' producto' : ' productos') }}</span>
            <template v-if="activeFragranceName"><span class="text-earth-300 mx-1">·</span><span class="text-primary-600 font-medium">🌸 {{ activeFragranceName }}</span></template>
          </p>
          <div class="flex items-center gap-2">
            <button
              v-if="hasActiveFilters"
              @click="resetFilters"
              class="text-xs font-medium text-earth-400 hover:text-primary-600 underline underline-offset-2 transition-colors"
            >Limpiar todo</button>
            <button
              @click="filtersOpen = true"
              class="inline-flex items-center gap-2 rounded-full border border-earth-200 bg-white text-earth-700 hover:text-primary-700 hover:border-primary-300 text-sm font-medium px-4 py-2 transition-colors shadow-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              Filtrar
              <span
                v-if="activeFilterCount > (activeCategory !== 'all' ? 1 : 0)"
                class="min-w-[18px] h-[18px] px-1 inline-flex items-center justify-center rounded-full bg-primary-600/90 text-white text-[10px] font-bold"
              >{{ activeFilterCount - (activeCategory !== 'all' ? 1 : 0) }}</span>
            </button>
          </div>
        </div>

        <!-- Fila de filtros activos discretos (no sticky). Aparece solo si hay alguna selección. -->
        <div v-if="activeCategory !== 'all' || activeFragrance || activeFamily !== 'all' || activeHotel !== 'all'" class="flex flex-wrap items-center gap-1.5 pb-3">
          <span class="text-[11px] font-medium uppercase tracking-wider text-earth-400 mr-0.5">Filtrado por:</span>
          <button
            v-if="activeCategory !== 'all'"
            @click="activeCategory = 'all'"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-earth-50 border border-earth-200 text-earth-700 text-[11px] font-medium hover:border-primary-300 hover:text-primary-700 transition-colors"
          >
            {{ activeCategoryName }}
            <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <button
            v-if="activeFragrance"
            @click="clearAromaSelection()"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[11px] font-medium hover:bg-primary-100 transition-colors"
          >
            🌸 <span class="font-semibold">{{ shortName(activeFragranceName || '') }}</span>
            <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <button
            v-if="activeFamily !== 'all'"
            @click="activeFamily = 'all'"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[11px] font-medium hover:bg-primary-100 transition-colors"
          >
            ⊛ <span class="font-semibold truncate max-w-[140px]">{{ shortName(activeFamilyLabel || '') }}</span>
            <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <button
            v-if="activeHotel !== 'all'"
            @click="activeHotel = 'all'"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-[11px] font-medium hover:bg-amber-100 transition-colors"
          >
            ⭐ <span class="font-semibold truncate max-w-[140px]">{{ shortName(activeHotelLabel || '') }}</span>
            <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- 🌸 Panel de experiencia olfativa -->
    <section v-if="catalogConfig.blocks.olfactory.enabled" class="py-10 bg-gradient-to-b from-primary-50/50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Cuando hay un aroma seleccionado: panel detallado -->
        <div v-if="selectedAroma" class="bg-white rounded-3xl border border-earth-100 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-0">
            <!-- Imagen del aroma -->
            <div class="md:col-span-1 relative min-h-[220px] bg-earth-100">
              <img
                v-if="selectedAroma.image"
                :src="selectedAroma.image"
                :alt="selectedAroma.name"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div v-else class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-100 to-amber-100">
                <span class="text-6xl text-primary-300 font-serif font-bold">{{ selectedAroma.name.charAt(0) }}</span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <span v-if="selectedAroma.hotel_reference" class="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[10px] font-semibold uppercase tracking-wide backdrop-blur mb-2">
                  ✨ {{ selectedAroma.hotel_reference }}
                </span>
                <h2 class="text-2xl font-serif font-bold text-white">{{ selectedAroma.name }}</h2>
                <p v-if="selectedAroma.subtitle" class="text-sm text-white/90 font-medium">{{ selectedAroma.subtitle }}</p>
              </div>
            </div>

            <!-- Descripción y notas -->
            <div class="md:col-span-2 p-6 md:p-8">
              <div class="flex items-center justify-between mb-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold">
                  {{ selectedAroma.categoryLabel }}
                </span>
                <button
                  @click="clearAromaSelection"
                  class="text-sm text-earth-400 hover:text-earth-600 font-medium transition-colors"
                >
                  ✕ Quitar filtro
                </button>
              </div>

              <!-- Disponible en varios formatos (cruza con el filtro de tipo) -->
              <div v-if="selectedAromaTypes.length > 0" class="flex flex-wrap items-center gap-1.5 mb-4">
                <span class="text-[11px] text-earth-500 font-medium uppercase tracking-wider">Disponible en:</span>
                <span
                  v-for="type in selectedAromaTypes"
                  :key="type"
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-earth-50 border border-earth-200 text-[11px] font-semibold text-earth-600"
                >
                  {{ categoryIcon(type) }}
                  {{ type }}
                </span>
              </div>

              <p v-if="selectedAroma.experience" class="text-earth-700 leading-relaxed mb-4">
                {{ selectedAroma.experience }}
              </p>
              <p v-if="selectedAroma.description" class="text-earth-500 text-sm leading-relaxed mb-4">
                {{ selectedAroma.description }}
              </p>

              <!-- Notas aromáticas -->
              <div v-if="selectedAroma.notesList.length" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  v-for="note in selectedAroma.notesList"
                  :key="note.label"
                  class="p-3 rounded-xl bg-gradient-to-br from-primary-50 to-amber-50 border border-primary-100"
                >
                  <p class="text-[10px] font-bold text-primary-600 uppercase tracking-wider mb-1">{{ note.label }}</p>
                  <p class="text-xs text-earth-700 font-medium">{{ note.values }}</p>
                </div>
              </div>

              <!-- Productos disponibles -->
              <div class="mt-6">
                <p class="text-sm font-semibold text-earth-800 mb-3">
                  Disponible en {{ filteredProducts.length }} {{ filteredProducts.length === 1 ? 'producto' : 'productos' }}:
                </p>
                <div class="flex flex-wrap gap-2">
                  <NuxtLink
                    v-for="product in filteredProducts"
                    :key="product.id"
                    :to="`/product/${product.slug}${selectedAroma?.slug ? '?aroma=' + selectedAroma.slug : ''}`"
                    class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-earth-50 hover:bg-primary-50 border border-earth-100 hover:border-primary-200 transition-all group"
                  >
                    <div class="w-8 h-8 rounded-lg overflow-hidden bg-earth-100 flex-shrink-0">
                      <img v-if="product.image" :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
                      <div v-else class="w-full h-full flex items-center justify-center text-earth-300 text-xs">📦</div>
                    </div>
                    <div class="text-left">
                      <p class="text-xs font-semibold text-earth-800 group-hover:text-primary-700">{{ product.name }}</p>
                      <p class="text-[10px] text-earth-400">${{ formatPrice(product.price) }} MXN</p>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

        <!-- Cuando NO hay filtro: galería de todos los aromas -->
        <div v-else-if="aromas.length > 0">
          <div class="text-center mb-8">
            <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">Explora por aroma</span>
            <h2 class="text-3xl font-serif font-bold text-earth-900 mt-2 mb-3">
              Todos nuestros aromas
            </h2>
            <p class="text-earth-500 max-w-2xl mx-auto">
              Selecciona un aroma para descubrir su experiencia olfativa y en qué productos está disponible.
            </p>
          </div>

          <!-- Grid de aromas -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <button
              v-for="aroma in aromas"
              :key="aroma.id"
              @click="selectAroma(aroma)"
              class="group bg-white rounded-2xl border border-earth-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-primary-300 transition-all text-left"
            >
              <!-- Imagen del aroma -->
              <div class="aspect-square overflow-hidden bg-earth-100 relative">
                <img
                  v-if="aroma.image"
                  :src="aroma.image"
                  :alt="aroma.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-amber-100">
                  <span class="text-5xl text-primary-300 font-serif font-bold">{{ aroma.name.charAt(0) }}</span>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <!-- Nombre, colección y notas -->
              <div class="p-3">
                <p class="text-sm font-semibold text-earth-800 group-hover:text-primary-600 transition-colors truncate">{{ aroma.name }}</p>
                <p class="text-[11px] text-earth-400 truncate mb-1">{{ aroma.categoryLabel }}</p>
                <div v-if="aroma.notesList.length" class="space-y-0.5">
                  <p v-for="note in aroma.notesList.slice(0, 2)" :key="note.label" class="text-[10px] leading-snug text-earth-500 truncate">
                    <span class="font-semibold text-primary-600 uppercase">{{ note.label }}:</span>
                    {{ note.values }}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 🌸 Puente de descubrimiento → Guía (visible cuando el bloque olfativo NO está incrustado) -->
    <section
      v-if="!loading && !catalogConfig.blocks.olfactory.enabled && aromas.length > 0"
      class="pt-10 pb-2"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-earth-100 bg-earth-50/40 px-5 py-4">
          <div>
            <p class="text-[11px] font-semibold text-earth-500 uppercase tracking-wider">¿Buscas por fragancia?</p>
            <p class="text-sm text-earth-600 mt-0.5">Explora cada aroma por su personalidad y descubre en qué formato llevarla.</p>
          </div>
          <NuxtLink
            to="/fragrancias"
            class="inline-flex items-center gap-2 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold px-5 py-2.5 transition-colors whitespace-nowrap"
          >
            🌸 Ir a la Guía de Fragancias
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Grid de productos -->
    <section v-if="catalogConfig.blocks.grid.enabled" class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Cargando -->
        <div v-if="loading" class="text-center py-20">
          <div class="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-earth-500">Cargando productos...</p>
        </div>

        <!-- Contador de resultados -->
        <div v-if="!loading && filteredProducts.length > 0" class="flex items-center justify-between mb-6">
          <p class="text-sm text-earth-500">
            <span class="font-semibold text-earth-800">{{ filteredProducts.length }}</span>
            {{ filteredProducts.length === 1 ? 'producto' : 'productos' }}
            <template v-if="activeFragrance">
              · fragancia <span class="font-medium text-primary-600">{{ activeFragranceName }}</span>
            </template>
          </p>
          <button
            v-if="activeCategory !== 'all' || activeFragrance"
            @click="resetFilters"
            class="text-sm text-primary-600 hover:text-primary-700 font-medium underline"
          >
            Limpiar filtros
          </button>
        </div>

        <!-- Sin resultados -->
        <div v-if="!loading && filteredProducts.length === 0" class="text-center py-20">
          <p class="text-5xl mb-4">🌸</p>
          <p class="text-earth-600 text-lg mb-2">No encontramos productos con esos filtros.</p>
          <p class="text-earth-400 text-sm mb-6">Prueba con otra fragancia o categoría.</p>
          <button
            @click="resetFilters"
            class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all"
          >
            Ver todos los productos
          </button>
        </div>

        <!-- Grid -->
        <div v-if="!loading && filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
          >
            <ProductCard
              :product-name="`${product.name}${product.subtitle ? ' – ' + product.subtitle : ''}`"
              :short-description="`${product.description}${product.size ? ' (' + product.size + ')' : ''}`"
              :image-url="product.image"
              :amazon-link="product.amazonLink"
              :product-slug="product.slug"
              :price="product.price"
              :product-id="product.id"
              :fragrances="product.fragrances"
              :link-query="activeFragrance ? { aroma: selectedAroma?.slug || selectedAroma?.name } : null"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 🎯 Guía de Aromas por Mood -->
    <section v-if="catalogConfig.blocks.scent_guide.enabled" class="py-16 bg-gradient-to-b from-white to-primary-50/30">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">{{ catalogConfig.scent_guide.badge }}</span>
          <h2 class="text-3xl font-serif font-bold text-earth-900 mt-2 mb-4">
            {{ catalogConfig.scent_guide.title }}
          </h2>
          <p class="text-earth-500 max-w-2xl mx-auto">
            {{ catalogConfig.scent_guide.description }}
          </p>
        </div>

        <!-- Contenedor scrollable con altura fija -->
        <div class="max-h-[420px] overflow-y-auto rounded-2xl border border-earth-100 bg-white shadow-sm scrollbar-thin scrollbar-thumb-earth-200 scrollbar-track-earth-50">
          <table class="w-full text-sm">
            <thead class="bg-earth-50 sticky top-0 z-10">
              <tr>
                <th class="px-5 py-4 text-left font-semibold text-earth-700 w-[120px]">Aroma</th>
                <th class="px-5 py-4 text-left font-semibold text-earth-700 w-[140px]">Colección</th>
                <th class="px-5 py-4 text-left font-semibold text-earth-700 w-[100px]">Vibra</th>
                <th class="px-5 py-4 text-left font-semibold text-earth-700">Ideal para</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-earth-100">
              <tr v-for="scent in aromas" :key="scent.id" class="hover:bg-primary-50/40 transition-colors">
                <td class="px-5 py-4">
                  <div class="flex items-center gap-3">
                    <!-- Círculo con foto del aroma o emoji fallback -->
                    <div class="w-10 h-10 rounded-full overflow-hidden bg-earth-100 flex-shrink-0 shadow-sm border border-earth-200">
                      <img
                        v-if="scent.image"
                        :src="scent.image"
                        :alt="scent.name"
                        class="w-full h-full object-cover"
                      />
                      <span v-else class="w-full h-full flex items-center justify-center text-sm font-semibold text-earth-400">{{ scent.name.charAt(0) }}</span>
                    </div>
                    <span class="font-semibold text-earth-800">{{ scent.name }}</span>
                  </div>
                </td>
                <td class="px-5 py-4">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                    {{ scent.categoryLabel || 'Perfil' }}
                  </span>
                </td>
                <td class="px-5 py-4">
                  <span class="text-earth-600 font-medium">{{ scent.vibe || '—' }}</span>
                </td>
                <td class="px-5 py-4 text-earth-500">
                  {{ scent.bestFor || scent.description || '—' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-center text-[10px] text-earth-400 mt-4">
          {{ catalogConfig.scent_guide.disclaimer }}
        </p>
      </div>
    </section>

    <!-- CTA Amazon -->
    <section v-if="catalogConfig.blocks.cta.enabled" class="py-16 bg-gradient-to-r from-primary-900 to-earth-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-serif font-bold text-white mb-4">
          {{ catalogConfig.cta.title }}
        </h2>
        <p class="text-primary-200 mb-8">
          {{ catalogConfig.cta.description }}
        </p>
        <a
          :href="catalogConfig.cta.button_link || AMAZON_LINK"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-xl hover:shadow-amber-900/30"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a1.375 1.375 0 0 0 0 1.994l2.414 2.585a1.375 1.375 0 0 0 1.994 0l3.779-3.788-3.787 3.787-2.414-2.585a1.374 1.374 0 0 1 0-1.994l3.705-3.964 3.675-3.675a1.375 1.375 0 0 0-.044-1.92A1.374 1.374 0 0 0 13.483 0zm-1.587 2.585-3.673 3.675 3.673 3.675h7.252v-1.53h-5.733l-2.358-2.585 2.358-2.585h5.733v-1.53h-7.252z"/>
          </svg>
          {{ catalogConfig.cta.button_text }}
        </a>
      </div>
    </section>

    <!-- 🎛️ DRAWER DE FILTROS (facets) — overlay y deslizante, patrón CartSidebar -->
    <Teleport to="body">
      <!-- Overlay -->
      <div
        class="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        :class="filtersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
        @click="filtersOpen = false"
      ></div>

      <!-- Drawer sidebar -->
      <aside
        aria-label="Filtros del catálogo"
        aria-hidden="filtersOpen"
        class="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out"
        :class="filtersOpen ? 'translate-x-0' : 'translate-x-full'"
      >
          <!-- ⚡ Encabezado -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-earth-100 bg-earth-50/40">
            <div>
              <h2 class="font-serif font-bold text-lg text-earth-900">Filtrar productos</h2>
              <p class="text-xs text-earth-400 mt-0.5">Refina por aroma, colección e inspiración</p>
            </div>
            <button
              @click="filtersOpen = false"
              class="w-9 h-9 rounded-full bg-white border border-earth-100 hover:bg-earth-50 flex items-center justify-center text-earth-500 hover:text-earth-700 transition-colors shadow-sm"
              :aria-label="'Cerrar filtros'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- ⚡ Contenido scrollable -->
          <div class="flex-1 overflow-y-auto px-5 py-4 space-y-6">
            <!-- Resumen de selección actual -->
            <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-1.5">
              <span class="text-[11px] text-earth-400 font-medium mr-1">Activos:</span>
              <span v-for="chip in drawerFilterChips" :key="chip.key" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-50 border border-primary-100 text-[11px] font-semibold text-primary-700">
                {{ chip.label }}
              </span>
            </div>

            <!-- 🎯 Sección: Tipo de producto (formato/presentación) -->
            <section v-if="categories.length > 1">
              <h3 class="text-xs font-bold uppercase tracking-wider text-earth-500 mb-2">Tipo de producto</h3>
              <div class="grid grid-cols-2 gap-2">
                <button
                  :class="[
                    'flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-colors',
                    activeCategory === 'all'
                      ? 'bg-primary-50 border-primary-300 text-primary-700'
                      : 'border-earth-200 text-earth-600 hover:border-primary-300'
                  ]"
                  @click="activeCategory = 'all'"
                >
                  <span class="flex-1 text-sm font-medium">Todos</span>
                  <span class="text-[11px] text-earth-400 font-semibold">{{ categoryCounts.all || 0 }}</span>
                </button>
                <button
                  v-for="cat in categories.slice(1)"
                  :key="cat.id"
                  :class="[
                    'flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-colors',
                    activeCategory === cat.id
                      ? 'bg-primary-50 border-primary-300 text-primary-700'
                      : 'border-earth-200 text-earth-600 hover:border-primary-300'
                  ]"
                  @click="activeCategory = (activeCategory === cat.id ? 'all' : cat.id)"
                >
                  <span class="flex-1 text-sm font-medium">{{ cat.label }}</span>
                  <span class="text-[11px] text-earth-400 font-semibold">{{ categoryCounts[cat.id] || 0 }}</span>
                </button>
              </div>
            </section>

            <!-- 🎯 Sección: Aroma -->
            <section>>
              <h3 class="text-xs font-bold uppercase tracking-wider text-earth-500 mb-2 flex items-center gap-1.5">🌸 Aroma</h3>
              <!-- Buscador -->
              <div class="relative mb-2">
                <div class="flex items-center gap-2 bg-earth-50 rounded-xl px-3 py-2 border border-earth-200 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                  <svg class="w-4 h-4 text-earth-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Busca un aroma..."
                    class="flex-1 bg-transparent outline-none text-earth-800 placeholder-earth-400 text-sm"
                    @input="showSuggestions = true"
                    @keydown.esc="showSuggestions = false"
                  />
                  <button v-if="searchQuery" @click="clearSearch" class="text-earth-400 hover:text-earth-600 transition-colors" :aria-label="'Limpiar búsqueda'">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
                <!-- Sugerencias -->
                <div v-if="showSuggestions && filteredAromas.length > 0" class="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-earth-100 z-10 overflow-hidden">
                  <button
                    v-for="aroma in filteredAromas"
                    :key="aroma.id"
                    @click="pickAromaFromDrawer(aroma)"
                    class="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-primary-50/50 text-left transition-colors"
                  >
                    <span class="text-base">{{ aroma.emoji || '🌸' }}</span>
                    <span class="text-sm font-medium text-earth-800 flex-1 truncate">{{ aroma.name }}</span>
                    <span class="text-[10px] text-earth-400">{{ aroma.categoryLabel }}</span>
                  </button>
                </div>
              </div>

              <!-- Lista rápida (scroll) -->
              <div class="max-h-52 overflow-y-auto rounded-xl border border-earth-100 space-y-0.5 p-1">
                <button
                  @click="activeFragrance = null; searchQuery = ''; showSuggestions = false"
                  class="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors"
                  :class="activeFragrance === null ? 'bg-primary-50' : 'hover:bg-earth-50'"
                >
                  <span class="w-4 flex-shrink-0 text-primary-600">
                    <svg v-if="activeFragrance === null" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                  </span>
                  <span class="text-sm font-medium text-earth-800">Todos los aromas</span>
                </button>
                <button
                  v-for="aroma in aromas"
                  :key="aroma.id"
                  @click="activeFragrance = aroma.id; searchQuery = aroma.name; showSuggestions = false"
                  class="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors"
                  :class="activeFragrance === aroma.id ? 'bg-primary-50' : 'hover:bg-earth-50'"
                >
                  <span class="w-4 flex-shrink-0 text-primary-600">
                    <svg v-if="activeFragrance === aroma.id" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                  </span>
                  <span class="text-sm flex-1 truncate" :class="activeFragrance === aroma.id ? 'font-semibold text-primary-700' : 'text-earth-700'">
                    {{ aroma.emoji || '🌸' }} {{ aroma.name }}
                  </span>
                  <span class="text-[10px] text-earth-300 flex-shrink-0">{{ aroma.categoryLabel }}</span>
                </button>
              </div>
            </section>

            <!-- 🎯 Sección: Colección olfativa -->
            <section v-if="familyOptions.length">
              <h3 class="text-xs font-bold uppercase tracking-wider text-earth-500 mb-2 flex items-center gap-1.5">⊛ Colección olfativa</h3>
              <div class="space-y-0.5">
                <button
                  @click="activeFamily = 'all'"
                  class="w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors"
                  :class="activeFamily === 'all' ? 'bg-primary-50' : 'hover:bg-earth-50'"
                >
                  <span class="text-sm flex items-center gap-2">
                    <span class="w-4 text-primary-600"><svg v-if="activeFamily === 'all'" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></span>
                    Todas
                  </span>
                  <span class="text-xs text-earth-400">{{ products.length }}</span>
                </button>
                <button
                  v-for="fam in familyOptions"
                  :key="fam.key"
                  @click="activeFamily = (activeFamily === fam.key ? 'all' : fam.key)"
                  class="w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors"
                  :class="activeFamily === fam.key ? 'bg-primary-50' : 'hover:bg-earth-50'"
                >
                  <span class="text-sm flex items-center gap-2" :class="activeFamily === fam.key ? 'font-semibold text-primary-700' : 'text-earth-700'">
                    <span class="w-4 text-primary-600"><svg v-if="activeFamily === fam.key" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></span>
                    {{ fam.label }}
                  </span>
                  <span class="text-xs text-earth-400">{{ fam.count }}</span>
                </button>
              </div>
            </section>

            <!-- 🎯 Sección: Inspiración / hotel -->
            <section v-if="hotelOptions.length">
              <h3 class="text-xs font-bold uppercase tracking-wider text-earth-500 mb-2 flex items-center gap-1.5">⭐ Inspirado en</h3>
              <div class="space-y-0.5">
                <button
                  @click="activeHotel = 'all'"
                  class="w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors"
                  :class="activeHotel === 'all' ? 'bg-amber-50' : 'hover:bg-earth-50'"
                >
                  <span class="text-sm flex items-center gap-2">
                    <span class="w-4 text-amber-500"><svg v-if="activeHotel === 'all'" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></span>
                    Todos
                  </span>
                  <span class="text-xs text-earth-400">{{ products.length }}</span>
                </button>
                <button
                  v-for="hot in hotelOptions"
                  :key="hot.key"
                  @click="activeHotel = (activeHotel === hot.key ? 'all' : hot.key)"
                  class="w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors"
                  :class="activeHotel === hot.key ? 'bg-amber-50' : 'hover:bg-earth-50'"
                >
                  <span class="text-sm flex items-center gap-2" :class="activeHotel === hot.key ? 'font-semibold text-amber-700' : 'text-earth-700'">
                    <span class="w-4 text-amber-500"><svg v-if="activeHotel === hot.key" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></span>
                    ✨ {{ hot.label }}
                  </span>
                  <span class="text-xs text-earth-400">{{ hot.count }}</span>
                </button>
              </div>
            </section>
          </div>

          <!-- ⚡ Footer: total resultados + acciones -->
          <div class="border-t border-earth-100 px-5 py-4 bg-white flex-shrink-0 flex items-center gap-2">
            <button
              @click="resetFilters"
              class="text-sm text-earth-500 hover:text-primary-600 font-medium underline underline-offset-2 flex-shrink-0 mr-auto"
            >
              Limpiar todo
            </button>
            <button
              @click="filtersOpen = false"
              class="inline-flex items-center justify-center rounded-full bg-earth-900 hover:bg-earth-800 text-white text-sm font-semibold px-5 py-3 transition-colors flex-1"
            >
              Ver {{ filteredProducts.length }} resultados
            </button>
          </div>
        </aside>
    </Teleport>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Catálogo de Productos | PITAYA LAB',
  description: 'Explora nuestro catálogo completo de velas de soya perfumadas, aceites aromáticos para difusores y brumas aromáticas. Productos botánicos biodegradables.',
  ogTitle: 'Catálogo PITAYA LAB | Velas, Aceites y Brumas',
  ogDescription: 'Descubre todos nuestros productos: velas de soya clásicas y místicas, aceites aromáticos y brumas. Hecho en México.',
})

const AMAZON_LINK = 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329?'

// Configuración editable de la página de catálogo (desde site_config)
const catalogConfig = reactive({
  header: {
    badge: 'Catálogo',
    title: 'Nuestros',
    highlight: 'Productos',
    description: 'Descubre nuestra colección completa de velas de soya, aceites aromáticos y brumas. Cada producto elaborado con ingredientes botánicos para cuidar de ti y del planeta.',
  },
  // Control de visibilidad/estilo de cada bloque de la página (editable en admin)
  blocks: {
    header: { enabled: true, compact: false },
    filters: { enabled: true },
    // Los bloques editoriales (galería de aromas e "guía por mood") se desactivan
    // por defecto: el catálogo debe mostrar PRODUCTOS. El descubrimiento por
    // fragancia vive en /fragrancias. Puedes reactivarlos desde el panel admin
    // (site_config > catalog_page.blocks) si un layout lo necesita incrustado.
    olfactory: { enabled: false },
    grid: { enabled: true },
    scent_guide: { enabled: false },
    cta: { enabled: true },
  },
  scent_guide: {
    enabled: false,
    badge: 'Guía de Aromas',
    title: 'Encuentra tu aroma ideal',
    description: 'Cada aroma de PITAYA LAB está diseñado para una experiencia única. Elige según tu mood y el momento.',
    disclaimer: '* Los aromas "Xcaret" y "Vidanta" son referencias inspiracionales. PITAYA LAB no tiene afiliación con los hoteles o marcas de dichos nombres.',
  },
  cta: {
    title: '¡Todos disponibles en Amazon!',
    description: 'Haz clic en cualquier producto o visita nuestra tienda oficial en Amazon México.',
    button_text: 'Ir a la Tienda en Amazon',
    button_link: 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329',
  },
})

// Cargar configuración editable desde site_config
async function loadCatalogConfig() {
  try {
    const supabase = useNuxtApp().$supabase
    if (!supabase) return
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'catalog_page')
      .single()
    if (error) throw error
    if (data?.value) {
      Object.assign(catalogConfig.header, data.value.header)
      if (data.value.blocks) {
        // Merge de bloques con defaults (para tolerar configs existentes sin `blocks`)
        Object.assign(catalogConfig.blocks,
          typeof data.value.blocks === 'object' && data.value.blocks
            ? data.value.blocks
            : { header: { enabled: true, compact: false } }
        )
        // Normalizar cada bloque para que tengo enabled (default true)
        Object.keys(catalogConfig.blocks).forEach((k) => {
          const b = catalogConfig.blocks[k]
          catalogConfig.blocks[k] = typeof b === 'object' && b ? { enabled: true, ...b } : { enabled: true }
        })
      }
      Object.assign(catalogConfig.scent_guide, data.value.scent_guide)
      Object.assign(catalogConfig.cta, data.value.cta)
      // Mantener compatibilidad: scent_guide.enabled desde el top-level si no vino en blocks
      if (data.value.scent_guide && typeof data.value.scent_guide.enabled === 'boolean') {
        catalogConfig.blocks.scent_guide.enabled = data.value.scent_guide.enabled
      }
    }
  } catch (e) {
    console.warn('Usando configuración por defecto del catálogo:', e.message)
  }
}

// Categorías cargadas dinámicamente desde la base de datos
const categories = ref([
  { id: 'all', label: 'Todos' },
])

const activeCategory = ref('all')
const activeFragrance = ref(null)
// 🎨 Facetas transversales (colección olfativa / inspiración de hotel)
const activeFamily = ref('all') // slug de colección
const activeHotel = ref('all')  // hotel_reference (normalizado)
const searchQuery = ref('')
const showSuggestions = ref(false)
const loading = ref(true)

// Estado del panel de filtros (colapsable dentro de la barra, en cualquier viewport)
const filtersOpen = ref(false)

// Nº de filtros activos visibles en el badge del botón "Filtrar y explorar"
const activeFilterCount = computed(() => {
  let n = 0
  if (activeCategory.value !== 'all') n++
  if (activeFragrance.value) n++
  if (activeFamily.value !== 'all') n++
  if (activeHotel.value !== 'all') n++
  if (searchQuery.value.trim()) n++
  return n
})

// Indica si hay algún filtro activo (para el punto indicador en móvil)
const hasActiveFilters = computed(() => activeFilterCount.value > 0)

// Productos desde API
const products = ref([])

// Perfiles aromáticos (fragancias disponibles) cargados desde la base de datos
const aromas = ref([])

// Todos los aromas (para el selector desplegable)
const allAromas = computed(() => aromas.value)

// Aromas filtrados por búsqueda (autocompletado)
const filteredAromas = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return aromas.value.slice(0, 6)
  return aromas.value
    .filter(a => a.name.toLowerCase().includes(q) || (a.categoryLabel || '').toLowerCase().includes(q))
    .slice(0, 6)
})

// Aroma seleccionado (para el panel de experiencia olfativa)
const selectedAroma = computed(() => {
  if (!activeFragrance.value) return null
  return aromas.value.find(a => a.id === activeFragrance.value) || null
})

const activeFragranceName = computed(() => {
  return selectedAroma.value?.name || ''
})

// ---- Helpers para chips y etiquetas del nuevo UI de filtros ----
function shortName(name, max = 26) {
  if (!name) return ''
  return name.length > max ? `${name.slice(0, max).trim()}…` : name
}

// Nombre/etiqueta de la categoría (formato) activa elegida
const activeCategoryName = computed(() => {
  if (activeCategory.value === 'all') return ''
  const c = categories.value.find(x => x.id === activeCategory.value)
  return c?.label || ''
})

const activeFamilyLabel = computed(() => {
  if (activeFamily.value === 'all') return ''
  const o = familyOptions.value.find(x => x.key === activeFamily.value)
  return o?.label || ''
})
const activeHotelLabel = computed(() => {
  if (activeHotel.value === 'all') return ''
  const o = hotelOptions.value.find(x => x.key === activeHotel.value)
  return o?.label || ''
})

// Resumen chips de filtros activos (para el drawer) — sin contar el formato,
// que ya se ve en la barra/píldoras.
const drawerFilterChips = computed(() => {
  const chips = []
  if (activeFragrance.value) {
    chips.push({ key: 'frag', label: `🌸 ${activeFragranceName.value || ''}` })
  }
  if (activeFamily.value !== 'all') {
    chips.push({ key: 'fam', label: `⊛ ${activeFamilyLabel.value || ''}` })
  }
  if (activeHotel.value !== 'all') {
    chips.push({ key: 'hot', label: `⭐ ${activeHotelLabel.value || ''}` })
  }
  return chips
})

// Elegir un aroma desde el drawer: combina con colección/inspiración ya activas.
function pickAromaFromDrawer(aroma) {
  activeFragrance.value = aroma.id
  searchQuery.value = aroma.name
  onSearchInput()
}

// Map: para cada aroma, en qué tipos de producto (categorías) está disponible.
// Se calcula a partir de los productos cargados (cada uno trae sus fragancias
// y su categorySlug). Respeta el modelo N:N (un aroma existe en varios formatos).
const aromaTypesByFragrance = computed(() => {
  const map = {}
  products.value.forEach(p => {
    if (!p.categorySlug) return
    ;(p.fragrances || []).forEach(f => {
      if (!map[f.id]) map[f.id] = new Set()
      map[f.id].add(p.categoryLabel || p.category || p.categorySlug)
    })
  })
  // Convertir Set -> array ordenado
  const result = {}
  Object.keys(map).forEach(id => {
    result[id] = Array.from(map[id]).sort()
  })
  return result
})

// Tipos disponibles del aroma seleccionado (para mostrarlo en el panel)
const selectedAromaTypes = computed(() => {
  if (!selectedAroma.value) return []
  return aromaTypesByFragrance.value[selectedAroma.value.id] || []
})

// Helper para obtener aroma por id
function getScentById(id) {
  return aromas.value.find(s => s.id === id)
}

// Cargar perfiles aromáticos desde fragrance_profiles
async function loadAromas() {
  try {
    const supabase = useNuxtApp().$supabase
    if (!supabase) return
    const { data, error } = await supabase
      .from('fragrance_profiles')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    if (error) throw error
    // Mapear a la forma esperada por la plantilla
    aromas.value = (data || []).map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug || '',
      emoji: p.emoji || '🌸',
      description: p.experience || p.subtitle || p.description || '',
      image: p.image_url,
      subtitle: p.subtitle || '',
      experience: p.experience || '',
      notes: p.notes || '',
      hotel_reference: p.hotel_reference || '',
      // Sin tabla de colecciones: la "categoría" es la fragancia en sí (catálogo maestro)
      category: p.slug || '',
      categoryLabel: p.name || 'Perfil',
      vibe: p.experience || p.subtitle || '',
      bestFor: p.notes || p.description || p.hotel_reference || '',
      notesList: parseNotes(p.notes),
    }))
  } catch (e) {
    console.warn('No se pudieron cargar los perfiles aromáticos:', e.message)
  }
}

// Parsear notas aromáticas (SAL/COR/FONDO o formato simple)
function parseNotes(notes) {
  if (!notes) return []
  const raw = notes.split('/').map(n => n.trim()).filter(Boolean)
  const order = ['SAL', 'COR', 'FONDO']
  const ordered = order
    .map(label => {
      const found = raw.find(r => r.toUpperCase().startsWith(label))
      if (!found) return null
      return { label, values: found.replace(new RegExp(`^${label}\\.?\\s*`, 'i'), '') }
    })
    .filter(Boolean)

  // Si hay notas en formato SAL/COR/FONDO, usarlas
  if (ordered.length > 0) return ordered

  // Fallback: si las notas están en formato simple, agruparlas en una sola entrada
  if (raw.length > 0) {
    return [{ label: 'Notas', values: raw.join(', ') }]
  }

  return []
}

// Productos filtrados (por categoría y/o fragancia)
const filteredProducts = computed(() => {
  let result = products.value

  // Filtro por categoría (presentación: bruma, aceite, vela, jabón...)
  if (activeCategory.value !== 'all') {
    result = result.filter(p => p.categorySlug === activeCategory.value)
  }

  // Filtro por fragancia (experiencia olfativa)
  if (activeFragrance.value) {
    const activeAroma = aromas.value.find(a => a.id === activeFragrance.value)
    const aromaName = activeAroma?.name?.toLowerCase() || ''

    result = result.filter(p => {
      // 1) Coincidencia por perfil aromático vinculado (fragrance_profile_id)
      const byProfile = (p.fragrances || []).some(f => f.id === activeFragrance.value)
      if (byProfile) return true

      // 2) Fallback: coincidencia por nombre de variante (aroma)
      if (aromaName) {
        return (p.variantNames || []).some(n => n.toLowerCase().includes(aromaName))
      }

      return false
    })
  }

  // 🔎 Filtro por colección olfativa (alguno de sus aromas en esa familia)
  if (activeFamily.value !== 'all') {
    result = result.filter(p => productAttrKeys(p).cats.includes(activeFamily.value))
  }

  // 🔎 Filtro por inspiración/hotel (alguno de sus aromas con esa referencia)
  if (activeHotel.value !== 'all') {
    result = result.filter(p => productAttrKeys(p).hotels.includes(activeHotel.value.toLowerCase()))
  }

  return result
})

// Número de productos por categoría (para el badge del filtro de tipo)
const categoryCounts = computed(() => {
  const counts = { all: products.value.length }
  products.value.forEach(p => {
    if (p.categorySlug) {
      counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1
    }
  })
  return counts
})

// ===== 🎨 Facetas: Familia olfativa (colección) e Inspiración (hotel) =====
// Mapa aroma.id -> { category(categoryLabel + slug), hotel_reference }
const aromaMetaById = computed(() => {
  const m = {}
  aromas.value.forEach(a => {
    m[a.id] = { category: a.categoryLabel, categoryKey: a.category, hotel: a.hotel_reference }
  })
  return m
})

// Atributos de faceta de un producto (para sus fragancias vinculadas)
function productAttrKeys(p) {
  const cats = new Set()
  const hotels = new Set()
  ;(p.fragrances || []).forEach(f => {
    const meta = aromaMetaById.value[f.id] || {}
    if (meta.categoryKey) cats.add(meta.categoryKey)
    if (meta.hotel) hotels.add(String(meta.hotel).toLowerCase())
  })
  return { cats: Array.from(cats), hotels: Array.from(hotels) }
}

// Opciones faceta "Colección": aromas que tienen colección, con conteos
const familyOptions = computed(() => {
  const seen = {}
  aromas.value
    .filter(a => a.category)
    .forEach(a => {
      seen[a.category] = { key: a.category, label: a.categoryLabel || a.category, icon: '⊛' }
    })
  const list = Object.values(seen)
  list.sort((a, b) => (a.label || '').localeCompare(b.label || ''))
  return list.map(o => ({
    ...o,
    count: products.value.filter(p => productAttrKeys(p).cats.includes(o.key)).length,
  }))
})

// Opciones faceta "Inspiración/hotel": aromas con hotel_reference
const hotelOptions = computed(() => {
  const seen = {}
  aromas.value.forEach(a => {
    if (a.hotel_reference) {
      const key = String(a.hotel_reference).trim()
      if (key && !seen[key]) seen[key] = { key, label: key }
    }
  })
  const list = Object.values(seen).sort((a, b) => (a.label || '').localeCompare(b.label || ''))
  return list.map(o => ({
    ...o,
    count: products.value.filter(p => productAttrKeys(p).hotels.includes(o.key.toLowerCase())).length,
  }))
})

function resetFilters() {
  activeCategory.value = 'all'
  activeFragrance.value = null
  activeFamily.value = 'all'
  activeHotel.value = 'all'
  searchQuery.value = ''
  showSuggestions.value = false
}

function clearSearch() {
  searchQuery.value = ''
  showSuggestions.value = false
}

function clearAromaSelection() {
  activeFragrance.value = null
  searchQuery.value = ''
  showSuggestions.value = false
}

function onSearchInput() {
  showSuggestions.value = true
}

function selectAroma(aroma) {
  activeFragrance.value = aroma.id
  activeFamily.value = 'all'
  activeHotel.value = 'all'
  searchQuery.value = aroma.name
  showSuggestions.value = false
}

function selectFirstSuggestion() {
  if (filteredAromas.value.length > 0) {
    selectAroma(filteredAromas.value[0])
  }
}

function onSelectChange() {
  // Al cambiar el select, sincronizar la búsqueda
  if (activeFragrance.value) {
    const aroma = aromas.value.find(a => a.id === activeFragrance.value)
    searchQuery.value = aroma?.name || ''
    if (aroma) {
      activeFamily.value = 'all'
      activeHotel.value = 'all'
    }
  } else {
    searchQuery.value = ''
  }
  showSuggestions.value = false
}

// ---- UX del drawer: cerrar con Escape + bloquear scroll del body ----
if (import.meta.client) {
  onMounted(() => {
    window.addEventListener('keydown', onDrawerKeydown)
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', onDrawerKeydown)
    document.body.style.overflow = ''
  })
}

function onDrawerKeydown(e) {
  if (e.key === 'Escape' && filtersOpen.value) {
    filtersOpen.value = false
  }
}

watch(() => filtersOpen.value, (open) => {
  if (import.meta.client) {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

function formatPrice(price) {
  return Number(price).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Mapa de ícono por tipo de producto (para el filtro de categoría)
function categoryIcon(label) {
  const map = {
    'velas': '🕯️',
    'aceites': '💧',
    'brumas': '🌫️',
    'jabón': '🧼',
    'jabones': '🧼',
    'vela': '🕯️',
    'aceite': '💧',
    'bruma': '🌫️',
  }
  const key = String(label || '').toLowerCase()
  return map[key] || '🛍️'
}

// Cargar categorías desde Supabase
async function loadCategories() {
  try {
    const supabase = useNuxtApp().$supabase
    if (!supabase) return
    const { data, error } = await supabase
      .from('product_categories')
      .select('id, name, slug')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    if (error) throw error
    if (Array.isArray(data) && data.length) {
      categories.value = [
        { id: 'all', label: 'Todos' },
        ...data.map(c => ({ id: c.slug, label: c.name })),
      ]
    }
  } catch (e) {
    console.warn('No se pudieron cargar las categorías:', e.message)
    // Mantener solo "Todos" (sin categorías estáticas hardcodeadas)
    categories.value = [{ id: 'all', label: 'Todos' }]
  }
}

// Cargar productos únicamente desde Supabase (vía API). Si no hay productos,
// se muestra el estado vacío de la UI ("No hay productos en esta categoría").
async function loadProducts() {
  loading.value = true
  try {
    const data = await $fetch('/api/products', {
      query: { limit: 50 }
    })
    products.value = data?.products || []
  } catch (e) {
    console.warn('Error cargando productos:', e.message)
    products.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadCatalogConfig()
  loadCategories()
  loadProducts()
  loadAromas()
})
</script>
