<template>
  <div class="space-y-4">
    <!-- Título de la sección (para el admin) -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Nombre de la sección</label>
      <input
        v-model="section.title"
        type="text"
        class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm"
        placeholder="Nombre descriptivo"
      />
    </div>

    <!-- Formularios por tipo -->
    <div v-if="section.type === 'hero'">
      <!-- Vista previa en vivo del hero -->
      <div class="mb-4 rounded-xl overflow-hidden border border-gray-200 bg-gray-900 relative" style="aspect-ratio: 16/9;">
        <!-- Video -->
        <video
          v-if="heroPreviewType === 'video' && section.content.media_url"
          :src="section.content.media_url"
          :poster="section.content.poster_url || undefined"
          autoplay
          muted
          loop
          playsinline
          class="w-full h-full object-cover"
        ></video>
        <!-- Imagen -->
        <img
          :key="section.content.media_url || section.content.media_url_mobile"
          v-else-if="heroPreviewType === 'image' && (section.content.media_url || section.content.media_url_mobile) && !heroPreviewFailed"
          :src="section.content.media_url || section.content.media_url_mobile"
          alt="Vista previa del hero"
          class="w-full h-full object-cover"
          @error="onPreviewImgError($event)"
        />
        <div
          v-else-if="heroPreviewType === 'image' && (section.content.media_url || section.content.media_url_mobile) && heroPreviewFailed"
          class="w-full h-full flex flex-col items-center justify-center gap-2 bg-red-50 text-red-500"
        >
          <span class="text-3xl">⚠️</span>
          <span class="text-xs px-4 text-center">No se pudo cargar la imagen. Revisa que la URL sea pública.</span>
        </div>
        <!-- Carrusel -->
        <div v-else-if="heroPreviewType === 'carousel' && section.content.slides && section.content.slides.length" class="w-full h-full">
          <img
            v-for="(slide, i) in section.content.slides"
            :key="i"
            :src="slide.image"
            :alt="'Slide ' + (i + 1)"
            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            :class="i === heroPreviewSlide ? 'opacity-100' : 'opacity-0'"
            @error="onPreviewImgError($event)"
          />
        </div>
        <!-- Placeholder si no hay media -->
        <div v-else class="w-full h-full flex items-center justify-center text-gray-500 text-sm">
          <span>🖼️ Vista previa — configura el fondo para verlo aquí</span>
        </div>

        <!-- Overlay con el título para simular el hero -->
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent flex items-center">
          <div class="px-6 md:px-10 max-w-lg">
            <p v-if="section.content.badge" class="text-white/90 text-xs md:text-sm mb-2 inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {{ section.content.badge }}
            </p>
            <h3 class="text-white font-serif font-bold text-xl md:text-3xl leading-tight whitespace-pre-line">
              {{ section.content.title || 'Título del hero' }}
            </h3>
            <p v-if="section.content.subtitle" class="text-white/80 text-xs md:text-sm mt-2 line-clamp-2">
              {{ section.content.subtitle }}
            </p>
          </div>
        </div>

        <!-- Etiqueta del tipo de fondo -->
        <span class="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-wide">
          {{ heroPreviewType }}
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título principal</label>
          <textarea v-model="section.content.title" rows="3" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <p class="text-xs text-gray-400 mt-1">Tip: usa «\n» para saltos de línea</p>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
          <textarea v-model="section.content.subtitle" rows="3" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Etiqueta (badge)</label>
          <input v-model="section.content.badge" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto botón principal</label>
          <input v-model="section.content.cta_text" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Link botón principal</label>
          <input v-model="section.content.cta_link" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto botón secundario</label>
          <input v-model="section.content.cta_secondary_text" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Link botón secundario</label>
          <input v-model="section.content.cta_secondary_link" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de fondo</label>
          <div class="flex gap-4 flex-wrap">
            <label class="inline-flex items-center gap-2">
              <input type="radio" value="video" v-model="section.content.media_type" class="text-primary-600" />
              <span class="text-sm">Video</span>
            </label>
            <label class="inline-flex items-center gap-2">
              <input type="radio" value="image" v-model="section.content.media_type" class="text-primary-600" />
              <span class="text-sm">Imagen</span>
            </label>
            <label class="inline-flex items-center gap-2">
              <input type="radio" value="carousel" v-model="section.content.media_type" class="text-primary-600" />
              <span class="text-sm">Carrusel</span>
            </label>
            <label class="inline-flex items-center gap-2">
              <input type="radio" value="none" v-model="section.content.media_type" class="text-primary-600" />
              <span class="text-sm">Sin fondo (color)</span>
            </label>
    </div>

          <p class="text-xs text-gray-400 mt-2 mb-3">
            Si eliges una imagen de fondo, se conmuta automáticamente al modo "Imagen".
          </p>

          <!-- Campo de fondo de color / gradiente (cuando media_type='none') -->
          <div v-if="section.content.media_type === 'none'" class="mt-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">Color / gradiente de fondo</label>
            <input
              v-model="section.content.bg_color"
              type="text"
              class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono"
              placeholder="bg-gradient-to-br from-earth-900 via-primary-900 to-earth-900"
            />
            <p class="text-[11px] text-gray-400 mt-1">Clase Tailwind de fondo. P. ej. <code>bg-gradient-to-br from-earth-900 via-primary-900 to-earth-900</code> o <code>bg-primary-900</code>.</p>
    </div>

          <!-- Overlay / gradiente de legibilidad (cuando hay media de fondo) -->
          <div v-if="section.content.media_type !== 'none'" class="mt-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">Overlay / gradiente de legibilidad</label>
            <input
              v-model="section.content.overlay_gradient"
              type="text"
              class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono"
              placeholder="bg-gradient-to-r from-earth-950/70 via-earth-950/50 to-transparent"
            />
            <p class="text-[11px] text-gray-400 mt-1">Escribe <code>none</code> para desactivarlo, o una clase Tailwind de gradiente/overlay.</p>
    </div>

          <!-- Alineación del contenido -->
          <div class="mt-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">Alineación del contenido</label>
            <div class="flex gap-4">
              <label class="inline-flex items-center gap-2">
                <input type="radio" value="left" v-model="section.content.text_align" class="text-primary-600" />
                <span class="text-sm">Izquierda</span>
              </label>
              <label class="inline-flex items-center gap-2">
                <input type="radio" value="center" v-model="section.content.text_align" class="text-primary-600" />
                <span class="text-sm">Centro</span>
              </label>
            </div>
          </div>
          <p class="text-xs text-gray-400 mt-2 mb-3">
            Si eliges una imagen de fondo, se conmuta automáticamente al modo "Imagen".
          </p>
        </div>

        <!-- Subir imagen de fondo (disponible en todo modo, comunica media_type a 'image') -->
        <div class="md:col-span-2" v-if="section.content.media_type !== 'carousel'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Imagen de fondo (fondo del hero)</label>
          <div class="flex flex-wrap items-center gap-2">
            <input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" class="hidden" data-input-key="hero_bg" @change="onMediaUpload('media_url', $event)" />
            <button
              type="button"
              @click="triggerMediaUpload('hero_bg')"
              class="px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors"
              :disabled="uploadingField === 'media_url'"
            >{{ uploadingField === 'media_url' ? 'Subiendo...' : '📷 Subir imagen de fondo' }}</button>
            <span v-if="section.content.media_url" class="text-xs text-gray-400 truncate max-w-[280px]">{{ section.content.media_url }}</span>
          </div>
        </div>

        <!-- Imagen única -->
        <template v-if="section.content.media_type === 'image'">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Imagen de escritorio (desktop)</label>
            <div class="flex flex-wrap items-center gap-2">
              <input
                v-model="section.content.media_url"
                type="url"
                class="flex-1 min-w-[220px] px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm"
                placeholder="https://... o /images/..."
              />
              <input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" class="hidden" data-input-key="hero_image" @change="onMediaUpload('media_url', $event)" />
              <button
                type="button"
                @click="triggerMediaUpload('hero_image')"
                class="px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                :disabled="uploadingField === 'media_url'"
              >{{ uploadingField === 'media_url' ? 'Subiendo...' : '📷 Subir imagen' }}</button>
              <span class="text-xs text-gray-400">Dimensiones recomendadas: <strong>1920×1080 px</strong> (apaisada)</span>
            </div>
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Imagen móvil <span class="text-gray-400 font-normal">(opcional — se muestra en pantallas pequeñas)</span></label>
            <div class="flex flex-wrap items-center gap-2">
              <input
                v-model="section.content.media_url_mobile"
                type="url"
                class="flex-1 min-w-[220px] px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm"
                placeholder="https://... o /images/..."
              />
              <input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" class="hidden" data-input-key="hero_image_mobile" @change="onMediaUpload('media_url_mobile', $event)" />
              <button
                type="button"
                @click="triggerMediaUpload('hero_image_mobile')"
                class="px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                :disabled="uploadingField === 'media_url_mobile'"
              >{{ uploadingField === 'media_url_mobile' ? 'Subiendo...' : '📷 Subir imagen móvil' }}</button>
              <span class="text-xs text-gray-400">Dimensiones recomendadas: <strong>750×1334 px</strong> (vertical)</span>
            </div>
            <p class="text-xs text-gray-400 mt-1.5">Si no subes imagen móvil, se usará la imagen de escritorio en todos los tamaños.</p>
          </div>
        </template>

        <!-- Video -->
        <template v-if="section.content.media_type === 'video'">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">URL del video</label>
            <div class="flex flex-wrap items-center gap-2">
              <input
                v-model="section.content.media_url"
                type="url"
                class="flex-1 min-w-[220px] px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm"
                placeholder="https://... o /images/..."
              />
              <input type="file" accept="video/mp4,video/webm,video/quicktime" class="hidden" data-input-key="hero_video" @change="onMediaUpload('media_url', $event)" />
              <button
                type="button"
                @click="triggerMediaUpload('hero_video')"
                class="px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                :disabled="uploadingField === 'media_url'"
              >{{ uploadingField === 'media_url' ? 'Subiendo...' : '🎬 Subir video' }}</button>
              <span class="text-xs text-gray-400">Dimensiones recomendadas: <strong>1920×1080 px</strong>, formato MP4</span>
            </div>
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">URL del poster (imagen de portada)</label>
            <div class="flex flex-wrap items-center gap-2">
              <input
                v-model="section.content.poster_url"
                type="url"
                class="flex-1 min-w-[220px] px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm"
                placeholder="https://... o /images/..."
              />
              <input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" class="hidden" data-input-key="hero_poster" @change="onMediaUpload('poster_url', $event)" />
              <button
                type="button"
                @click="triggerMediaUpload('hero_poster')"
                class="px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                :disabled="uploadingField === 'poster_url'"
              >{{ uploadingField === 'poster_url' ? 'Subiendo...' : '📷 Subir imagen' }}</button>
              <span class="text-xs text-gray-400">Dimensiones recomendadas: <strong>1920×1080 px</strong> (apaisada)</span>
            </div>
          </div>
        </template>

        <!-- Carrusel -->
        <div v-if="section.content.media_type === 'carousel'" class="md:col-span-2 space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-gray-700">Slides del carrusel</label>
            <button
              @click="addSlide"
              class="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >+ Agregar slide</button>
          </div>
          <p class="text-xs text-gray-400">Cada slide es una imagen de fondo con su enlace al hacer clic. Se reproducen en bucle automáticamente.</p>

          <div v-for="(slide, index) in section.content.slides" :key="index" class="p-3 bg-gray-50 rounded-lg space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">Slide {{ index + 1 }}</span>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  @click="moveSlide(index, -1)"
                  :disabled="index === 0"
                  class="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs px-1" title="Subir"
                >↑</button>
                <button
                  type="button"
                  @click="moveSlide(index, 1)"
                  :disabled="index === section.content.slides.length - 1"
                  class="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs px-1" title="Bajar"
                >↓</button>
                <button @click="section.content.slides.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
              </div>
            </div>

            <!-- Preview grande de la slide -->
            <div class="w-full h-32 md:h-40 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 relative">
              <img v-if="slide.image" :src="slide.image" class="w-full h-full object-cover" @error="onPreviewImgError($event)" />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-3xl">🖼️</div>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" class="hidden" :data-slide-index="index" @change="onSlideUpload(slide, $event)" />
              <button
                type="button"
                @click="triggerSlideUpload(slide)"
                class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                :disabled="uploadingIndex === index"
              >
                {{ uploadingIndex === index ? 'Subiendo...' : '📷 Subir imagen' }}
              </button>
              <input
                v-model="slide.image"
                type="url"
                placeholder="URL de la imagen (https://... o /images/...)"
                class="flex-1 min-w-[220px] px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm"
              />
            </div>
            <p class="text-xs text-gray-400 -mt-1">Dimensiones recomendadas: <strong>1920×1080 px</strong> (apaisada)</p>
            <input
              v-model="slide.link"
              type="text"
              placeholder="Link al hacer clic (ej. /catalog, https://amazon.com/...)"
              class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Productos -->
    <div v-else-if="section.type === 'products'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="section.content.title" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo (etiqueta)</label>
          <input v-model="section.content.subtitle" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="section.content.description" rows="2" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Máximo de productos</label>
          <input v-model.number="section.content.max_products" type="number" min="1" max="12" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mostrar "Ver catálogo"</label>
          <label class="inline-flex items-center gap-2 mt-2">
            <input type="checkbox" v-model="section.content.show_view_all" class="text-primary-600" />
            <span class="text-sm">Sí</span>
          </label>
        </div>
        <!-- 🔎 Selección manual de productos (curated) -->
        <div class="md:col-span-2">
          <div class="flex items-center justify-between">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Productos que se mostrarán {{ curatedProductsActive ? '(selección manual)' : '(automático: primero disponibles)' }}
            </label>
            <button
              v-if="section.content.product_ids && section.content.product_ids.length"
              type="button"
              @click="section.content.product_ids = []"
              class="text-xs text-primary-600 hover:text-primary-700 font-medium"
            >Limpiar selección (usar automático)</button>
          </div>
          <p class="text-xs text-gray-400 mb-2">
            Elige productos concretos de tu catálogo. Se muestran en este orden. Si dejas vacío, la sección muestra los primeros productos activos automáticamente.
          </p>

          <!-- Seleccionados (se muestran primero, en orden) -->
          <div v-if="selectedCatalogProductList.length" class="space-y-1.5 mb-2">
            <div
              v-for="(p, index) in selectedCatalogProductList"
              :key="p.id"
              class="flex items-center gap-3 p-2 rounded-lg border border-primary-200 bg-primary-50/60"
            >
              <img v-if="p.image" :src="p.image" alt="" class="w-9 h-9 rounded-md object-cover border border-primary-100 flex-shrink-0" @error="onPreviewImgError($event)" />
              <div v-else class="w-9 h-9 rounded-md bg-gray-100 border border-primary-100 flex items-center justify-center text-gray-300 text-sm flex-shrink-0">📦</div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 truncate">{{ p.name }}</p>
                <p class="text-[11px] text-gray-400 truncate">{{ p.category || '—' }}</p>
              </div>
              <div class="flex items-center gap-1 flex-shrink-0">
                <button type="button" @click="moveCatalogProduct(section.content.product_ids, index, -1)" :disabled="index === 0" class="text-gray-400 hover:text-gray-600 disabled:opacity-25 text-xs px-1" title="Subir">↑</button>
                <button type="button" @click="moveCatalogProduct(section.content.product_ids, index, 1)" :disabled="selectedCatalogProductList.length - 1 === index" class="text-gray-400 hover:text-gray-600 disabled:opacity-25 text-xs px-1" title="Bajar">↓</button>
                <button type="button" @click="removeCatalogProduct(p.id)" class="text-red-400 hover:text-red-600 text-xs px-1" title="Quitar">✕</button>
              </div>
            </div>
          </div>

          <!-- Selector de catálogo (checkbox de productos no elegidos) -->
          <div class="border border-gray-200 rounded-xl p-2 bg-white max-h-52 overflow-y-auto">
            <template v-if="loadingCatalog">
              <p class="text-sm text-gray-400 px-2 py-3">Cargando productos…</p>
            </template>
            <template v-else-if="choosableCatalogProducts.length">
              <label
                v-for="p in choosableCatalogProducts"
                :key="p.id"
                class="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  class="text-primary-600 rounded"
                  :checked="isCatalogProductSelected(p.id)"
                  @change="toggleCatalogProduct(p, $event)"
                />
                <img v-if="p.image" :src="p.image" alt="" class="w-7 h-7 rounded object-cover flex-shrink-0" @error="onPreviewImgError($event)" />
                <div v-else class="w-7 h-7 rounded bg-gray-100 flex items-center justify-center text-gray-300 text-sm flex-shrink-0">📦</div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-gray-700 truncate">{{ p.name }}</p>
                  <p class="text-[11px] text-gray-400 truncate">{{ p.category || p.sku || '—' }}</p>
                </div>
              </label>
            </template>
            <p v-else class="text-sm text-gray-400 px-2 py-3">No quedan productos por elegir (o el catálogo está vacío).</p>
          </div>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del enlace</label>
          <input v-model="section.content.view_all_text" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Link del enlace</label>
          <input v-model="section.content.view_all_link" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
      </div>
    </div>

    <!-- Colección específica -->
    <div v-else-if="section.type === 'collection'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Colección</label>
          <select v-model="section.content.collection_id" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm">
            <option :value="null">Selecciona una colección...</option>
            <option v-for="col in collections" :key="col.id" :value="col.id">{{ col.name }}</option>
          </select>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="section.content.title" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="section.content.description" rows="2" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Máximo de productos</label>
          <input v-model.number="section.content.max_products" type="number" min="1" max="12" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
      </div>
    </div>

    <!-- Colecciones -->
    <div v-else-if="section.type === 'collections' || section.type === 'scents'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="section.content.title" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo (etiqueta)</label>
          <input v-model="section.content.subtitle" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="section.content.description" rows="2" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="section.content.show_all" class="text-primary-600" />
            <span class="text-sm font-medium text-gray-700">Mostrar mensaje "Todos los aromas disponibles"</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Valores -->
    <div v-else-if="section.type === 'values'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="section.content.title" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo (etiqueta)</label>
          <input v-model="section.content.subtitle" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
      </div>

      <div class="space-y-3 mt-4">
        <div v-for="(value, index) in section.content.values" :key="index" class="p-3 bg-gray-50 rounded-lg space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Valor {{ index + 1 }}</span>
            <div class="flex items-center gap-2">
              <button type="button" @click="moveItem(section.content.values, index, -1)" :disabled="index === 0" class="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs px-1" title="Subir">↑</button>
              <button type="button" @click="moveItem(section.content.values, index, 1)" :disabled="index === section.content.values.length - 1" class="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs px-1" title="Bajar">↓</button>
              <button @click="section.content.values.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 items-center">
            <input v-model="value.title" type="text" placeholder="Título" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <div class="flex items-center gap-2">
              <span class="text-2xl w-8 text-center">{{ iconEmoji(value.icon) }}</span>
              <select v-model="value.icon" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm">
                <option value="leaf">Hoja</option>
                <option value="shield">Escudo</option>
                <option value="heart">Corazón</option>
                <option value="sparkles">Estrellas</option>
              </select>
            </div>
          </div>
          <textarea v-model="value.description" rows="2" placeholder="Descripción" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <button @click="section.content.values.push({ icon: 'leaf', title: '', description: '' })" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
          + Agregar valor
        </button>
      </div>
    </div>

    <!-- Confianza -->
    <div v-else-if="section.type === 'trust'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="section.content.title" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
          <input v-model="section.content.subtitle" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
      </div>

      <div class="space-y-3 mt-4">
        <div v-for="(feature, index) in section.content.features" :key="index" class="p-3 bg-gray-50 rounded-lg space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Característica {{ index + 1 }}</span>
            <div class="flex items-center gap-2">
              <button type="button" @click="moveItem(section.content.features, index, -1)" :disabled="index === 0" class="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs px-1" title="Subir">↑</button>
              <button type="button" @click="moveItem(section.content.features, index, 1)" :disabled="index === section.content.features.length - 1" class="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs px-1" title="Bajar">↓</button>
              <button @click="section.content.features.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 items-center">
            <input v-model="feature.title" type="text" placeholder="Título" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <input v-model="feature.description" type="text" placeholder="Descripción" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <div class="flex items-center gap-2">
              <span class="text-2xl w-8 text-center">{{ iconEmoji(feature.icon) }}</span>
              <select v-model="feature.icon" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm">
                <option value="truck">Camión</option>
                <option value="package">Paquete</option>
                <option value="clock">Reloj</option>
                <option value="shield">Escudo</option>
                <option value="heart">Corazón</option>
              </select>
            </div>
          </div>
        </div>
        <button @click="section.content.features.push({ icon: 'truck', title: '', description: '' })" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
          + Agregar característica
        </button>
      </div>
    </div>

    <!-- Reseñas -->
    <div v-else-if="section.type === 'reviews'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="section.content.title" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
          <input v-model="section.content.subtitle" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
      </div>

      <div class="space-y-3 mt-4">
        <div v-for="(review, index) in section.content.items" :key="index" class="p-3 bg-gray-50 rounded-lg space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Reseña {{ index + 1 }}</span>
            <div class="flex items-center gap-2">
              <button type="button" @click="moveItem(section.content.items, index, -1)" :disabled="index === 0" class="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs px-1" title="Subir">↑</button>
              <button type="button" @click="moveItem(section.content.items, index, 1)" :disabled="index === section.content.items.length - 1" class="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs px-1" title="Bajar">↓</button>
              <button @click="section.content.items.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input v-model="review.author" type="text" placeholder="Nombre del cliente" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <input v-model="review.product" type="text" placeholder="Producto" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>
          <div class="flex items-center gap-3">
            <div class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
              <img v-if="review.image" :src="review.image" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-xl">👤</div>
            </div>
            <div class="flex-1 space-y-2">
              <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" class="hidden" :data-input-key="`review-${index}`" @change="onReviewUpload(review, $event)" />
              <button
                type="button"
                @click="triggerMediaUpload(`review-${index}`)"
                class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                :disabled="uploadingList === `review-${index}`"
              >{{ uploadingList === `review-${index}` ? 'Subiendo...' : '📷 Foto del cliente' }}</button>
              <button v-if="review.image" type="button" @click="review.image = null" class="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-600">Quitar foto</button>
              <p class="text-xs text-gray-400">Dimensiones recomendadas: <strong>400×400 px</strong> (cuadrada)</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Calificación:</span>
            <select v-model="review.rating" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm">
              <option :value="5">⭐⭐⭐⭐⭐ 5</option>
              <option :value="4">⭐⭐⭐⭐ 4</option>
              <option :value="3">⭐⭐⭐ 3</option>
              <option :value="2">⭐⭐ 2</option>
              <option :value="1">⭐ 1</option>
            </select>
          </div>
          <textarea v-model="review.text" rows="3" placeholder="Texto de la reseña" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <button @click="section.content.items.push({ author: '', rating: 5, product: '', text: '', image: null })" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
          + Agregar reseña
        </button>
      </div>
    </div>

    <!-- CTA -->
    <div v-else-if="section.type === 'cta'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="section.content.title" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="section.content.description" rows="2" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
          <input v-model="section.content.button_text" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Link del botón</label>
          <input v-model="section.content.button_link" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
      </div>
    </div>

    <!-- Texto -->
    <div v-else-if="section.type === 'text'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="section.content.title" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo (etiqueta)</label>
          <input v-model="section.content.subtitle" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Contenido (HTML)</label>
          <textarea v-model="section.content.body" rows="5" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono" placeholder="<p>Tu texto aquí...</p>" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Alineación</label>
          <select v-model="section.settings.alignment" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm">
            <option value="center">Centrado</option>
            <option value="left">Izquierda</option>
            <option value="right">Derecha</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Imagen + Texto -->
    <div v-else-if="section.type === 'image_text'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="section.content.title" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo (etiqueta)</label>
          <input v-model="section.content.subtitle" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">URL de la imagen</label>
          <div class="flex flex-col md:flex-row items-start md:items-center gap-3">
            <div class="w-full md:w-40 h-28 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
              <img
                :key="section.content.image_url"
                v-if="section.content.image_url"
                :src="section.content.image_url"
                class="w-full h-full object-cover"
                @error="onPreviewImgError($event)"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-2xl">🖼️</div>
            </div>
            <div class="flex-1 space-y-2 w-full">
              <div class="flex flex-wrap items-center gap-2">
                <input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" class="hidden" data-input-key="image_text" @change="onMediaUpload('image_url', $event)" />
                <button
                  type="button"
                  @click="triggerMediaUpload('image_text')"
                  class="px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                  :disabled="uploadingField === 'image_url'"
                >{{ uploadingField === 'image_url' ? 'Subiendo...' : '📷 Subir imagen' }}</button>
                <button v-if="section.content.image_url" type="button" @click="section.content.image_url = ''" class="px-3 py-2 rounded-lg text-xs text-red-400 hover:text-red-600">Quitar</button>
              </div>
              <p class="text-xs text-gray-400 -mt-1.5">Dimensiones recomendadas: <strong>800×1200 px</strong> (vertical 2:3)</p>
              <input v-model="section.content.image_url" type="url" placeholder="https://... o /images/..." class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            </div>
          </div>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Contenido (HTML)</label>
          <textarea v-model="section.content.body" rows="4" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
          <input v-model="section.content.button_text" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Link del botón</label>
          <input v-model="section.content.button_link" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Posición de la imagen</label>
          <select v-model="section.settings.image_position" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm">
            <option value="right">Derecha</option>
            <option value="left">Izquierda</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Galería -->
    <div v-else-if="section.type === 'gallery'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="section.content.title" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo (etiqueta)</label>
          <input v-model="section.content.subtitle" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
      </div>

      <div class="space-y-3 mt-4">
        <div v-for="(image, index) in section.content.images" :key="index" class="p-3 bg-gray-50 rounded-lg space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Imagen {{ index + 1 }}</span>
            <div class="flex items-center gap-2">
              <button type="button" @click="moveItem(section.content.images, index, -1)" :disabled="index === 0" class="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs px-1" title="Subir">↑</button>
              <button type="button" @click="moveItem(section.content.images, index, 1)" :disabled="index === section.content.images.length - 1" class="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs px-1" title="Bajar">↓</button>
              <button @click="section.content.images.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
            </div>
          </div>

          <!-- Preview -->
          <div class="w-full h-32 md:h-40 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 relative">
            <img
              :key="`${image.url}-${index}`"
              v-if="image.url"
              :src="image.url"
              class="w-full h-full object-cover"
              @error="onPreviewImgError($event)"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-3xl">🖼️</div>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" class="hidden" :data-input-key="`gallery-${index}`" @change="onImageListUpload(section.content.images, index, 'url', $event)" />
            <button
              type="button"
              @click="triggerMediaUpload(`gallery-${index}`)"
              class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors"
              :disabled="uploadingList === `gallery-${index}`"
            >{{ uploadingList === `gallery-${index}` ? 'Subiendo...' : '📷 Subir imagen' }}</button>
            <input v-model="image.url" type="url" placeholder="URL de la imagen" class="flex-1 min-w-[220px] px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>
          <p class="text-xs text-gray-400 -mt-1">Dimensiones recomendadas: <strong>800×800 px</strong> (cuadrada)</p>
          <input v-model="image.caption" type="text" placeholder="Texto (opcional)" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <button @click="section.content.images.push({ url: '', caption: '' })" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
          + Agregar imagen
        </button>
      </div>
    </div>

    <!-- HTML -->
    <div v-else-if="section.type === 'html'">
      <label class="block text-sm font-medium text-gray-700 mb-1">HTML libre</label>
      <textarea v-model="section.content.html" rows="8" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono" placeholder="<div>Tu HTML aquí...</div>" />
    </div>

    <!-- Newsletter -->
    <div v-else-if="section.type === 'newsletter'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="section.content.title" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo (etiqueta)</label>
          <input v-model="section.content.subtitle" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="section.content.description" rows="2" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
      </div>
    </div>

    <!-- Instagram -->
    <div v-else-if="section.type === 'instagram'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="section.content.title" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo (etiqueta)</label>
          <input v-model="section.content.subtitle" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="section.content.description" rows="2" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Usuario de Instagram <span class="text-gray-400 font-normal">(sin @)</span>
          </label>
          <input v-model="section.content.handle" type="text" placeholder="pitayalab.mx" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <p class="text-xs text-gray-400 mt-1.5">
            Se muestra el perfil embebido de Instagram cuando el usuario es válido. Sin usuario, se muestra un enlace de seguimiento.
          </p>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón de seguimiento</label>
          <input v-model="section.content.cta_text" type="text" placeholder="Seguir en Instagram" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            URL del perfil <span class="text-gray-400 font-normal">(opcional; por defecto @usuario)</span>
          </label>
          <input v-model="section.content.profile_link" type="url" placeholder="https://www.instagram.com/pitayalab.mx/" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
      </div>
    </div>

    <!-- B2B Stats -->
    <div v-else-if="section.type === 'b2b_stats'">
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-gray-700">Estadísticas</label>
          <button
            @click="section.content.stats = section.content.stats || []; section.content.stats.push({ value: '', label: '' })"
            class="text-xs font-medium text-primary-600 hover:text-primary-700 px-3 py-1.5 rounded-lg border border-dashed border-primary-300 hover:bg-primary-50 transition-colors"
          >
            + Agregar stat
          </button>
        </div>
        <div
          v-for="(stat, index) in section.content.stats || []"
          :key="index"
          class="grid grid-cols-2 gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50/50"
        >
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Valor</label>
            <input v-model="stat.value" type="text" placeholder="25–35%" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Etiqueta</label>
            <input v-model="stat.label" type="text" placeholder="Dto. por volumen" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>
          <div class="col-span-2 flex justify-end">
            <button @click="section.content.stats.splice(index, 1)" class="text-xs text-red-400 hover:text-red-600">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- B2B Audiencia -->
    <div v-else-if="section.type === 'b2b_audience'">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="section.content.title" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
          <input v-model="section.content.subtitle" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-gray-700">Tarjetas</label>
          <button
            @click="section.content.cards = section.content.cards || []; section.content.cards.push({ icon: '📦', title: '', description: '', points: [], link: '', cta_text: 'Cotizar →', highlight: false })"
            class="text-xs font-medium text-primary-600 hover:text-primary-700 px-3 py-1.5 rounded-lg border border-dashed border-primary-300 hover:bg-primary-50 transition-colors"
          >
            + Agregar tarjeta
          </button>
        </div>
        <div
          v-for="(card, index) in section.content.cards || []"
          :key="index"
          class="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3"
        >
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1">Ícono</label>
              <input v-model="card.icon" type="text" placeholder="📦" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
              
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1">Título</label>
              <input v-model="card.title" type="text" placeholder="Mayoreo Comercial" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Descripción</label>
            <textarea v-model="card.description" rows="2" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Puntos (uno por línea)</label>
            <textarea
              :value="(card.points || []).join('\n')"
              @input="card.points = $event.target.value.split('\n').filter(p => p.trim())"
              rows="3"
              class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm"
            />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1">Enlace</label>
              <input v-model="card.link" type="text" placeholder="#calculadora-mayoreo" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
              
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1">Texto del botón</label>
              <input v-model="card.cta_text" type="text" placeholder="Cotizar →" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            </div>
          </div>
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-xs text-gray-600">
              <input type="checkbox" v-model="card.highlight" class="text-primary-600" />
              Destacar (borde ámbar)
            </label>
            <button @click="section.content.cards.splice(index, 1)" class="text-xs text-red-400 hover:text-red-600">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- B2B Calculadora -->
    <div v-else-if="section.type === 'b2b_calculator'">
      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Etiqueta (eyebrow)</label>
          <input v-model="section.content.eyebrow" type="text" placeholder="Mayoreo Comercial" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="section.content.title" type="text" placeholder="Calculadora de Mayoreo" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
          <textarea v-model="section.content.subtitle" rows="2" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
      </div>
    </div>

    <!-- B2B Recuerdos -->
    <div v-else-if="section.type === 'b2b_recuerdos'">
      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Etiqueta (eyebrow)</label>
          <input v-model="section.content.eyebrow" type="text" placeholder="Recuerdos para Eventos" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="section.content.title" type="text" placeholder="Arma tu Recuerdo paso a paso" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
          <textarea v-model="section.content.subtitle" rows="2" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
      </div>
    </div>

    <!-- B2B FAQ -->
    <div v-else-if="section.type === 'b2b_faq'">
      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="section.content.title" type="text" placeholder="Preguntas frecuentes B2B" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
        </div>
        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-gray-700">Preguntas</label>
          <button
            @click="section.content.faqs = section.content.faqs || []; section.content.faqs.push({ q: '', a: '' })"
            class="text-xs font-medium text-primary-600 hover:text-primary-700 px-3 py-1.5 rounded-lg border border-dashed border-primary-300 hover:bg-primary-50 transition-colors"
          >
            + Agregar pregunta
          </button>
        </div>
        <div
          v-for="(faq, index) in section.content.faqs || []"
          :key="index"
          class="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3"
        >
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Pregunta</label>
            <input v-model="faq.q" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Respuesta</label>
            <textarea v-model="faq.a" rows="2" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          </div>
          <div class="flex justify-end">
            <button @click="section.content.faqs.splice(index, 1)" class="text-xs text-red-400 hover:text-red-600">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón guardar -->
    <div class="flex justify-end pt-2 border-t border-gray-100">
      <button
        @click="$emit('save')"
        class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        Guardar sección
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  section: { type: Object, required: true },
})

const emit = defineEmits(['save'])

// Referencia local a la prop. En `<script setup>` las props solo están
// disponibles vía `props.section`, no como variable global. Este computed
// expone `section` para que las funciones del script (subir media, agregar
// slides, reordenar, etc.) puedan usarla sin problema. `computed` se
// auto-importa en Nuxt (igual que `ref`).
const section = computed(() => props.section)

const supabase = useSupabase()
const collections = ref([])

// Catálogo de productos para el bloque "products" (selección manual).
const catalogProducts = ref([])
const loadingCatalog = ref(false)

// Productos del catálogo que YA están en la selección manual (ordenados según
// el orden en `product_ids`).
const selectedCatalogProductList = computed(() => {
  const ids = section.value?.content?.product_ids
  if (!Array.isArray(ids) || !ids.length) return []
  const byId = new Map(catalogProducts.value.map(p => [p.id, p]))
  return ids.map(id => byId.get(id)).filter(Boolean)
})

// ¿Está activa la selección manual de productos en esta sección?
const curatedProductsActive = computed(() =>
  Array.isArray(section.value?.content?.product_ids) && section.value.content.product_ids.length > 0
)

// Productos del catálogo que NO están aún en la selección (para el picker).
const choosableCatalogProducts = computed(() => {
  const ids = section.value?.content?.product_ids
  const chosen = new Set(Array.isArray(ids) ? ids : [])
  return catalogProducts.value.filter(p => !chosen.has(p.id))
})

function isCatalogProductSelected(pid) {
  const ids = section.value?.content?.product_ids
  return Array.isArray(ids) && ids.includes(pid)
}

function toggleCatalogProduct(product, event) {
  ensureContent()
  if (!section.value.content.product_ids || !Array.isArray(section.value.content.product_ids)) {
    section.value.content.product_ids = []
  }
  // Usamos el id real (UUID) del producto: coincide con lo que filtra el store.
  const pid = product.id
  const idx = section.value.content.product_ids.indexOf(pid)
  if (event.target.checked) {
    if (idx === -1) section.value.content.product_ids.push(pid)
  } else if (idx !== -1) {
    section.value.content.product_ids.splice(idx, 1)
  }
}

function removeCatalogProduct(pid) {
  const ids = section.value?.content?.product_ids
  if (!Array.isArray(ids)) return
  const idx = ids.indexOf(pid)
  if (idx !== -1) ids.splice(idx, 1)
}

// Reordena un item dentro del array de ids seleccionados.
function moveCatalogProduct(ids, index, delta) {
  if (!Array.isArray(ids)) return
  const from = index
  const to = index + delta
  if (to < 0 || to >= ids.length) return
  const [moved] = ids.splice(from, 1)
  ids.splice(to, 0, moved)
}

async function loadCatalogProducts() {
  if (loadingCatalog.value) return
  loadingCatalog.value = true
  try {
    // El endpoint admin /api/products/list ya devuelve id, name, category,
    // sku, price e image (imagen principal o primera disponible).
    let list = []
    try {
      list = await $fetch('/api/products/list') || []
    } catch {
      list = []
    }
    catalogProducts.value = (list || []).map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      sku: p.sku,
      price: p.price,
      image: p.image || null,
      category: p.category || '',
    }))
  } catch (e) {
    console.warn('Error cargando catálogo para selector:', e.message)
    catalogProducts.value = []
  } finally {
    loadingCatalog.value = false
  }
}

// ---------- Vista previa en vivo del hero ----------
// Determina el tipo de media a previsualizar, con la misma lógica de inferencia
// que usa el store (HeroSection.vue): si media_type dice 'video' pero la URL
// apunta a una imagen, se muestra la imagen.
const heroPreviewType = computed(() => {
  // 'none' / 'carousel' no dependen de media_url: se respetan siempre.
  const mt = section.content?.media_type
  if (mt === 'none' || mt === 'carousel') return mt
  // Con media_url presente, la extensión REAL del archivo es la fuente de
  // verdad (coincide con HeroSection.vue del store).
  const url = section.content?.media_url || section.content?.media_url_mobile
  if (url) return inferMediaType(url)
  // Sin media_url hay gradiente de color (no se previsualiza media).
  return 'none'
})

// Slide actual del carrusel en la vista previa
const heroPreviewSlide = ref(0)

// Indica si falló la carga de la imagen de fondo del hero en la vista previa
// (para no ocultarla semi-invisible, sino mostrar un error claro al admin).
const heroPreviewFailed = ref(false)

// Handler de error de carga de imágenes en la vista previa del editor.
// En lugar de atenuar la imagen a 15% de opacidad (que parece que "no se
// previsualiza"), muestro una señal visible para diagnosticar cuando una URL
// de optimización de imágenes no carga correctamente.
function onPreviewImgError(event) {
  // Marcar la imagen con error para avisar visualmente
  event.target.classList.add('img-error')
  heroPreviewFailed.value = true
}

// Reinicia el flag de error cuando cambia la URL del fondo
watch(
  () => section.content?.media_url,
  () => { heroPreviewFailed.value = false }
)

// Autoplay del carrusel en la vista previa
let heroPreviewTimer = null
function startHeroPreviewCarousel() {
  stopHeroPreviewCarousel()
  const slides = section.content?.slides || []
  if (heroPreviewType.value === 'carousel' && slides.length > 1) {
    heroPreviewTimer = setInterval(() => {
      heroPreviewSlide.value = (heroPreviewSlide.value + 1) % slides.length
    }, 4000)
  }
}
function stopHeroPreviewCarousel() {
  if (heroPreviewTimer) {
    clearInterval(heroPreviewTimer)
    heroPreviewTimer = null
  }
}

// Reinicia el carrusel cuando cambia el tipo o las slides
watch(
  () => [heroPreviewType.value, section.content?.slides?.length],
  () => {
    heroPreviewSlide.value = 0
    startHeroPreviewCarousel()
  },
  { immediate: true }
)

onBeforeUnmount(stopHeroPreviewCarousel)

// Infiere el tipo de media según la extensión de la URL
function inferMediaType(url) {
  const ext = (url || '').split('?')[0].split('.').pop()?.toLowerCase()
  return ['mp4', 'webm', 'mov'].includes(ext) ? 'video' : 'image'
}

async function loadCollections() {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select('id, name')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    if (error) throw error
    collections.value = data || []
  } catch (e) {
    console.warn('Error cargando colecciones:', e.message)
  }
}

// Asegura que `section.content` exista como objeto. Algunas secciones pueden venir
// de la BD con `content` null/undefined (creadas o cargadas antes de popularlo).
// Sin esta protección, `section.content[field] = url` en `onMediaUpload` lanza:
//   "Cannot set properties of undefined (setting 'media_url')"
function ensureContent() {
  if (!section.content || typeof section.content !== 'object') {
    section.content = {}
  }
}

// Asegura que el array de slides exista (para heroes creados antes de esta función)
// Se reasigna completo para garantizar la reactividad de Vue incluso si el objeto
// content viene "plano" desde la BD (no reactivo).
function ensureSlides() {
  ensureContent()
  if (!section.content.slides || !Array.isArray(section.content.slides)) {
    section.content.slides = []
  }
}

// Agrega un slide vacío al carrusel del hero.
// Reasignamos el array (spread) en lugar de push para forzar la actualización reactiva.
function addSlide() {
  ensureSlides()
  section.content.slides = [...section.content.slides, { image: '', link: '' }]
}

// Cuando el tipo de fondo cambia a carrusel, inicializa el array de slides
// Uso `?.` para tolerar que `section.content` pueda ser undefined en secciones
// antiguas o recién creadas (evita TypeError al montar el componente).
watch(
  () => section.content?.media_type,
  (val) => {
    if (val === 'carousel') ensureSlides()
  },
  { immediate: true }
)

// ---------- Upload de archivos media (hero) ----------
// El endpoint /api/site/upload-media recibe un archivo base64 y lo sube a
// Supabase Storage (bucket product-images), devolviendo la URL pública.
// Sirve para la imagen única (`media_url`), el video (`media_url`) y el poster
// (`poster_url`) del hero.
const uploadingField = ref(null)

function triggerMediaUpload(inputKey) {
  const input = document.querySelector(`input[data-input-key="${inputKey}"]`)
  if (input) input.click()
}

async function uploadToStorage(file) {
  // Videos y archivos grandes: subir DIRECTAMENTE a Supabase Storage desde el
  // cliente. Evita el límite de body HTTP del serverless de Vercel (~4.5 MB)
  // que causa el error 413 al enviar un video en base64 dentro del JSON.
  // El bucket 'product-images' acepta hasta 50 MB (file_size_limit configurado).
  const isImage = file && typeof file.type === 'string' && file.type.startsWith('image/')
  const BODY_LIMIT = 3.5 * 1024 * 1024 // ~3.5MB para dejar margen (base64 ≈ +33%)
  if (!isImage || file.size > BODY_LIMIT) {
    return await uploadDirectToStorage(file)
  }

  // Imágenes por debajo del límite: flujo actual con compresión + endpoint.
  // Comprimir/redimensionar la imagen en el cliente antes de enviarla, para
  // no exceder el límite de body de Vercel (~4.5 MB) que causa el error 413.
  // El endpoint recibe el archivo en base64 (≈33% más pesado que el binario),
  // así que una imagen de 1920x1080 pesada puede superar ese límite fácilmente.
  const processed = await compressImageIfNeeded(file)

  // Leer como Data URL (base64)
  const base64 = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(processed)
  })

  const res = await $fetch('/api/site/upload-media', {
    method: 'POST',
    body: { file: { name: processed.name, data: base64 } },
  })
  return res?.success && res?.url ? res.url : null
}

// Sube un archivo directo a Supabase Storage usando el cliente del admin
// (anon key). Es la vía robusta para videos y archivos grandes: el payload
// va directo a la API de Supabase Storage, que acepta hasta 50 MB, en lugar
// de pasar por el body del serverless (limitado ~4.5 MB).
async function uploadDirectToStorage(file) {
  if (!supabase) {
    alert('No se pudo configurar la subida directa de archivos grandes.')
    return null
  }
  try {
    const isVideo = /(mp4|webm|mov)$/i.test(file.name)
    const typePrefix = isVideo ? 'video' : 'image'
    const timestamp = Date.now()
    const sanitized = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase()
    const filePath = `site-media/${typePrefix}-${timestamp}-${sanitized}`

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        contentType: file.type || (isVideo ? 'video/mp4' : 'application/octet-stream'),
        cacheControl: '31536000',
        upsert: false,
      })

    if (uploadError) throw uploadError

    const { data: publicUrl } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath)

    return publicUrl.publicUrl
  } catch (e) {
    console.error('Error subiendo archivo directo a Supabase:', e)
    alert('Error al subir el archivo: ' + (e.message || 'Error desconocido'))
    return null
  }
}

// Redimensiona y comprime una imagen si es demasiado grande, para mantener la
// subida por debajo del límite de Vercel. Devuelve el archivo original si no
// necesita compresión (videos u otros, o imágenes ya ligeras).
async function compressImageIfNeeded(file) {
  const isImage = file && typeof file.type === 'string' && file.type.startsWith('image/')
  const maxBytes = 2.5 * 1024 * 1024 // 2.5 MB de umbral por archivo
  if (!isImage || file.size <= maxBytes) return file

  try {
    const url = URL.createObjectURL(file)
    const img = await new Promise((resolve, reject) => {
      const i = new Image()
      i.onload = () => resolve(i)
      i.onerror = () => reject(new Error('No se pudo leer la imagen'))
      i.src = url
    })

    // Redimensionar solo imágenes muy grandes (p. ej. >2400px) para no
    // degradar las de 1920x1080 que ya son la medida recomendada.
    const MAX_W = 2400
    const scale = Math.min(1, MAX_W / img.naturalWidth)
    const w = Math.round(img.naturalWidth * scale)
    const h = Math.round(img.naturalHeight * scale)

    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.drawImage(img, 0, 0, w, h)

    // Comprimir a JPEG con calidad adaptativa: reduce la calidad en pasos hasta
    // que el resultado entre al presupuesto, mínimo 0.55 para no perder calidad.
    const dataUrl = await new Promise((resolve) => {
      const tryCompress = (q) => {
        const out = canvas.toDataURL('image/jpeg', q)
        const approxBytes = Math.ceil((out.length - 'data:image/jpeg;base64,'.length) * 3 / 4)
        if (approxBytes <= maxBytes || q <= 0.55) {
          resolve(out)
        } else {
          tryCompress(q - 0.1)
        }
      }
      tryCompress(0.85)
    })

    URL.revokeObjectURL(url)

    // Crear un File nuevo a partir del dataURL comprimido
    const byteString = atob(dataUrl.split(',')[1])
    const ab = new ArrayBuffer(byteString.length)
    const u8 = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) u8[i] = byteString.charCodeAt(i)
    const base = file.name.replace(/\.[^.]+$/, '')
    return new File([ab], `${base}.jpg`, { type: 'image/jpeg' })
  } catch (e) {
    console.warn('No se pudo comprimir la imagen, se envía original:', e.message)
    return file
  }
}

async function onMediaUpload(field, event) {
  const file = event.target.files?.[0]
  if (!file) return
  uploadingField.value = field
  ensureContent()
  try {
    console.log(`📤 Subiendo media a campo '${field}' (sección ${props.section?.type}, id=${props.section?.id})`)
    const url = await uploadToStorage(file)
    console.log('📤 Resultado de subida:', url ? 'OK' : 'NULL', url || '')
    if (url) {
      // Reasignar `content` con un objeto nuevo para forzar la reactividad de
      // Vue en TODOS los campos (v-model, preview). Mutar una propiedad anidada
      // (`section.content[field] = url`) no siempre dispara la vista cuando el
      // objeto content viene "plano" de la BD o de una sección recién creada.
      section.content = { ...section.content, [field]: url }
      // Si se subió una imagen como fondo del hero (media_url), cambiar el
      // tipo de fondo a 'image' para que la tienda la muestre correctamente.
      if (field === 'media_url' && file.type && file.type.startsWith('image/')) {
        section.content = { ...section.content, media_type: 'image' }
      }
      // AUTO-GUARD: persistir de inmediato cualquier media subida, para que la
      // tienda y la vista previa reflejen el cambio aunque el usuario no pulse
      // el botón "Guardar sección". Antes esto solo ocurría para el hero
      // (media_url/poster_url), por lo que en bloques como "Imagen + Texto",
      // "Galería" o reseñas la imagen se perdía al recargar.
      await autoSaveSection(`media '${field}'`)
    } else {
      alert('No se pudo subir el archivo')
    }
  } catch (e) {
    console.error('Error subiendo media:', e)
    alert('Error al subir el archivo: ' + e.message)
  } finally {
    uploadingField.value = null
    event.target.value = ''
  }
}

// Persiste de inmediato el estado actual de la sección (content + settings) vía
// el endpoint de update. Se usa tras cada subida de media para que al recargar
// la página o previsualizar la tienda no se pierda la imagen.
async function autoSaveSection(what) {
  if (!props.section?.id) return
  try {
    await $fetch('/api/sections/update', {
      method: 'PUT',
      body: {
        id: props.section.id,
        title: props.section.title,
        content: section.content,
        settings: section.settings,
      },
    })
    console.log(`🖼️ Auto-guardado tras subir: ${what}`)
  } catch (e) {
    console.error('Error al auto-guardar sección tras subir media:', e)
    alert('La imagen se subió, pero hubo un error al guardar la sección: ' + e.message)
  }
}

// ---------- Upload de listas de imágenes (galería, reseñas) ----------
// Permite subir imágenes para ítems indexados dentro de un array.
// `triggerMediaUpload` está definido en la sección del hero y se reutiliza aquí.
const uploadingList = ref(null)

async function onImageListUpload(array, index, field, event) {
  ensureContent()
  const file = event.target.files?.[0]
  if (!file) return
  uploadingList.value = `${array === section.content.images ? 'gallery' : 'list'}-${index}`
  try {
    const url = await uploadToStorage(file)
    if (url && array[index]) {
      array[index][field] = url
      await autoSaveSection('imagen de lista')
    } else {
      alert('No se pudo subir la imagen')
    }
  } catch (e) {
    console.error('Error subiendo imagen de lista:', e)
    alert('Error al subir la imagen: ' + e.message)
  } finally {
    uploadingList.value = null
    event.target.value = ''
  }
}

async function onReviewUpload(review, event) {
  ensureContent()
  const file = event.target.files?.[0]
  if (!file) return
  const idx = section.content.items ? section.content.items.indexOf(review) : -1
  uploadingList.value = `review-${idx}`
  try {
    const url = await uploadToStorage(file)
    if (url) {
      review.image = url
      await autoSaveSection('foto de reseña')
    } else {
      alert('No se pudo subir la foto')
    }
  } catch (e) {
    console.error('Error subiendo foto de reseña:', e)
    alert('Error al subir la foto: ' + e.message)
  } finally {
    uploadingList.value = null
    event.target.value = ''
  }
}

// Reordenar cualquier array de items (slides, galería, reseñas, valores...)
// Reasigna el array en `section.content` para forzar la reactividad de Vue.
function moveItem(array, index, delta) {
  const target = index + delta
  if (target < 0 || target >= array.length) return
  const [removed] = array.splice(index, 1)
  array.splice(target, 0, removed)
  // Buscar la clave de contenido que referencia este array y reasignarla
  for (const key of Object.keys(section.content)) {
    if (section.content[key] === array) {
      section.content[key] = [...array]
      break
    }
  }
}

// ---------- Upload del carrusel ----------
const uploadingIndex = ref(-1)

function triggerSlideUpload(slide) {
  // El input con data-slide-index coincide con el índice de la slide
  const idx = section.content.slides.indexOf(slide)
  const input = document.querySelector(`input[data-slide-index="${idx}"]`)
  if (input) input.click()
}

async function onSlideUpload(slide, event) {
  ensureContent()
  const file = event.target.files?.[0]
  if (!file) return
  const idx = section.content.slides.indexOf(slide)
  uploadingIndex.value = idx
  try {
    const url = await uploadToStorage(file)
    if (url) {
      slide.image = url
      await autoSaveSection('imagen de carrusel')
    } else {
      alert('No se pudo subir la imagen')
    }
  } catch (e) {
    console.error('Error subiendo slide:', e)
    alert('Error al subir la imagen: ' + e.message)
  } finally {
    uploadingIndex.value = -1
    event.target.value = ''
  }
}

// Reordenar slides dentro del carrusel (delega en el helper genérico moveItem)
function moveSlide(index, delta) {
  moveItem(section.content.slides, index, delta)
}

// Devuelve el emoji correspondiente a un icono (valores y confianza)
function iconEmoji(icon) {
  const map = {
    leaf: '🍃', shield: '🛡️', heart: '❤️', sparkles: '✨',
    truck: '🚚', package: '📦', clock: '⏱',
  }
  return map[icon] || '•'
}

onMounted(loadCollections)

// Carga el catálogo de productos cuando el formulario corresponde a una
// sección de productos (para la selección manual / curated).
onMounted(() => {
  if (props.section?.type === 'products') loadCatalogProducts()
})
watch(
  () => props.section?.type,
  (t) => { if (t === 'products') loadCatalogProducts() }
)
</script>

<style scoped>
/* Marca visual para imágenes que fallan al cargar en las vistas previas del editor */
.img-error {
  opacity: 0.15;
}
</style>
