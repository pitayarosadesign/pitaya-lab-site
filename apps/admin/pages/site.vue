<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">🌐 Editor del Sitio Web</h1>
      <NuxtLink to="/" target="_blank" class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
        Ver sitio
      </NuxtLink>
    </div>

    <!-- Navegación por páginas (estilo Shopify) -->
    <EditorPageTabs active="home" />

    <!-- Editor de secciones dinámicas -->
    <div class="bg-white rounded-xl border border-gray-200 p-6">
      <SectionsEditor />
    </div>

    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">🏠 Página de Portada</h2>
        <p class="text-sm text-gray-400 mt-0.5">Edita el contenido de la página principal del sitio</p>
      </div>
      <button
        @click="handleSave"
        class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        :disabled="saving"
      >
        {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
      </button>
    </div>

    <!-- Hero Section -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 class="text-lg font-semibold text-gray-900">🖼️ Hero (Portada)</h2>
      <p class="text-sm text-gray-400">Texto, imagen y video que se ven al entrar al sitio.</p>

      <!-- Media (video / imagen) -->
      <div class="p-4 bg-gray-50 rounded-lg border border-gray-100">
        <div class="flex items-center justify-between mb-3">
          <label class="text-sm font-medium text-gray-700">🎬 Fondo del Hero</label>
          <div class="flex items-center gap-3 text-sm">
            <label class="inline-flex items-center gap-1.5 cursor-pointer">
              <input type="radio" value="video" v-model="config.hero.media_type" class="text-primary-600 focus:ring-primary-500" />
              <span class="text-gray-700">Video</span>
            </label>
            <label class="inline-flex items-center gap-1.5 cursor-pointer">
              <input type="radio" value="image" v-model="config.hero.media_type" class="text-primary-600 focus:ring-primary-500" />
              <span class="text-gray-700">Imagen</span>
            </label>
          </div>
        </div>

        <div v-if="config.hero.media_type === 'video'" class="space-y-3">
          <div class="flex items-center gap-3">
            <div class="w-28 h-16 rounded-lg overflow-hidden bg-earth-100 border border-gray-200 flex-shrink-0">
              <video v-if="config.hero.media_url" :src="config.hero.media_url" muted loop playsinline class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-lg">🎬</div>
            </div>
            <div class="flex-1 space-y-2">
              <p class="text-xs text-gray-400">Sube un video (MP4/WebM/MOV) o pega la URL de un video ya alojado.</p>
              <p class="text-[11px] text-primary-600 font-medium">📐 Recomendado: video <strong>1920×1080 px</strong> (16:9) ≈ 50.8 × 28.6 cm · formato MP4 · peso ideal &lt; 20 MB</p>
              <div class="flex flex-wrap gap-2">
                <input type="file" accept="video/mp4,video/webm,video/quicktime" class="hidden" ref="heroVideoInput" @change="onHeroMediaSelect('video')" />
                <button type="button" @click="triggerMediaUpload('video')" class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors">📤 Subir video</button>
                <button v-if="config.hero.media_url" type="button" @click="config.hero.media_url = ''" class="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-600">Quitar video</button>
              </div>
              <input v-model="config.hero.media_url" type="url" placeholder="...o pega URL del video" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-xs" />
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-28 h-16 rounded-lg overflow-hidden bg-earth-100 border border-gray-200 flex-shrink-0">
              <img v-if="config.hero.poster_url" :src="config.hero.poster_url" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-300">🖼️</div>
            </div>
            <div class="flex-1 space-y-2">
              <p class="text-xs text-gray-400">Imagen de portada (poster) mientras carga el video o en móviles / fallback.</p>
              <p class="text-[11px] text-primary-600 font-medium">📐 Recomendado: imagen <strong>1920×1080 px</strong> (16:9) ≈ 50.8 × 28.6 cm · JPG/WebP · &lt; 1 MB ideal</p>
              <div class="flex flex-wrap gap-2">
                <input type="file" accept="image/png,image/jpeg,image/webp" class="hidden" ref="heroPosterInput" @change="onHeroMediaSelect('poster')" />
                <button type="button" @click="triggerMediaUpload('poster')" class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors">📷 Subir poster</button>
                <button v-if="config.hero.poster_url" type="button" @click="config.hero.poster_url = ''" class="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-600">Quitar poster</button>
              </div>
              <input v-model="config.hero.poster_url" type="url" placeholder="...o pega URL del poster" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-xs" />
            </div>
          </div>
        </div>

        <div v-else class="flex items-center gap-3">
          <div class="w-28 h-16 rounded-lg overflow-hidden bg-earth-100 border border-gray-200 flex-shrink-0">
            <img v-if="config.hero.media_url" :src="config.hero.media_url" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-lg">🖼️</div>
          </div>
          <div class="flex-1 space-y-2">
            <p class="text-xs text-gray-400">Sube una imagen de fondo (PNG/JPG/WebP) o pega la URL de una imagen ya alojada.</p>
            <p class="text-[11px] text-primary-600 font-medium">📐 Recomendado: imagen <strong>1920×1080 px</strong> (16:9) ≈ 50.8 × 28.6 cm · JPG/WebP · &lt; 1 MB ideal</p>
            <div class="flex flex-wrap gap-2">
              <input type="file" accept="image/png,image/jpeg,image/webp" class="hidden" ref="heroImageInput" @change="onHeroMediaSelect('image')" />
              <button type="button" @click="triggerMediaUpload('image')" class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors">📷 Subir imagen</button>
              <button v-if="config.hero.media_url" type="button" @click="config.hero.media_url = ''" class="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-600">Quitar imagen</button>
            </div>
            <input v-model="config.hero.media_url" type="url" placeholder="...o pega URL de la imagen" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-xs" />
          </div>
        </div>
      </div>

      <!-- Textos -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título principal</label>
          <textarea v-model="config.hero.title" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
          <p class="text-xs text-gray-400 mt-1">Tip: usa «\n» para saltos de línea y resaltar palabras.</p>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
          <textarea v-model="config.hero.subtitle" rows="3" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Etiqueta (badge)</label>
          <input v-model="config.hero.badge" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
          <input v-model="config.hero.cta_text" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Link del botón</label>
          <input v-model="config.hero.cta_link" type="url" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto botón secundario (Amazon)</label>
          <input v-model="config.hero.cta_secondary_text" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Link botón secundario</label>
          <input v-model="config.hero.cta_secondary_link" type="url" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
    </div>

    <!-- 🏷️ Marca & Navegación -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 class="text-lg font-semibold text-gray-900">🏷️ Marca & Navegación</h2>
      <p class="text-sm text-gray-400">Logo, nombre, eslogan y menú del sitio (navbar y footer).</p>

      <div class="p-4 bg-gray-50 rounded-lg border border-gray-100">
        <label class="text-sm font-medium text-gray-700 block mb-2">🖼️ Logo</label>
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-lg overflow-hidden bg-earth-100 border border-gray-200 flex-shrink-0">
            <img v-if="config.brand.logo_url" :src="config.brand.logo_url" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-xl">🏷️</div>
          </div>
          <div class="flex-1 space-y-2">
            <p class="text-[11px] text-primary-600 font-medium">📐 Recomendado: <strong>500×500 px</strong> ≈ 13.2 × 13.2 cm · PNG con fondo transparente</p>
            <div class="flex flex-wrap gap-2">
              <input type="file" accept="image/png,image/jpeg,image/webp" class="hidden" ref="logoInput" @change="onLogoSelect" />
              <button type="button" @click="logoInput?.click()" class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors">📷 Subir logo</button>
              <button v-if="config.brand.logo_url" type="button" @click="config.brand.logo_url = ''" class="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-600">Quitar logo</button>
            </div>
            <input v-model="config.brand.logo_url" type="url" placeholder="...o pega la URL del logo" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-xs" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre de la marca</label>
          <input v-model="config.brand.name" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Eslogan / tagline</label>
          <input v-model="config.brand.tagline" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Favicon URL</label>
          <input v-model="config.brand.favicon_url" type="url" placeholder="/favicon.png" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>

      <!-- Menú de navegación -->
      <div class="pt-2 border-t border-gray-100">
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-gray-700">🧭 Menú de navegación</label>
          <button @click="addNavLink" class="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Agregar enlace</button>
        </div>
        <div v-for="(link, index) in config.nav_links" :key="index" class="p-3 bg-gray-50 rounded-lg mb-2 flex items-center gap-3">
          <span class="text-gray-300 text-sm">⠿</span>
          <input v-model="link.label" type="text" placeholder="Etiqueta (ej. Inicio)" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <input v-model="link.path" type="text" placeholder="/ruta" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <button @click="config.nav_links.splice(index, 1)" class="text-red-400 hover:text-red-600 text-sm">✕</button>
        </div>
        <p class="text-xs text-gray-400 mt-1">Estos enlaces aparecen en el menú superior y en el menú móvil.</p>
      </div>
    </div>

    <!-- Productos Section -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 class="text-lg font-semibold text-gray-900">📦 Sección de Productos</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo (etiqueta)</label>
          <input v-model="config.products_section.subtitle" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="config.products_section.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="config.products_section.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
    </div>

    <!-- Brand Values -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 class="text-lg font-semibold text-gray-900">🎯 Valores de la Marca</h2>
      <p class="text-sm text-gray-400">Los 4 valores que aparecen en "¿Por qué elegir PITAYA LAB?"</p>
      
      <div v-for="(value, index) in config.brand_values" :key="index" class="p-4 bg-gray-50 rounded-lg space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700">Valor {{ index + 1 }}</span>
          <button @click="removeBrandValue(index)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input v-model="value.title" type="text" placeholder="Título" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <select v-model="value.icon" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm">
            <option value="leaf">🍃 Hoja</option>
            <option value="shield">🛡️ Escudo</option>
            <option value="heart">❤️ Corazón</option>
            <option value="sparkles">✨ Estrellas</option>
          </select>
        </div>
        <textarea v-model="value.description" rows="2" placeholder="Descripción" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
      </div>
      <button @click="addBrandValue" class="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Agregar valor</button>
    </div>

    <!-- Aromas Section -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 class="text-lg font-semibold text-gray-900">🌸 Sección de Aromas</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo (etiqueta)</label>
          <input v-model="config.scents_section.subtitle" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="config.scents_section.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="config.scents_section.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
    </div>

    <!-- CTA Final -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 class="text-lg font-semibold text-gray-900">🚀 CTA Final</h2>
      <p class="text-sm text-gray-400">La sección de llamada a la acción al final de la página.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="config.cta_section.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="config.cta_section.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
          <input v-model="config.cta_section.button_text" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Link del botón</label>
          <input v-model="config.cta_section.button_link" type="url" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
    </div>

    <!-- 🚚 Barra de Envíos -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">🚚 Barra de Envíos</h2>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="config.shipping_bar.enabled" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          <span class="ms-3 text-sm font-medium text-gray-600">{{ config.shipping_bar.enabled ? 'Activo' : 'Inactivo' }}</span>
        </label>
      </div>
      <p class="text-sm text-gray-400">Barra promocional que aparece arriba del navbar.</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del mensaje</label>
          <textarea v-model="config.shipping_bar.text" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Monto mínimo envío gratis ($)</label>
          <input v-model.number="config.shipping_bar.free_shipping_min" type="number" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Costo envío menor ($)</label>
          <input v-model.number="config.shipping_bar.shipping_fee" type="number" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tiempo estimado</label>
          <input v-model="config.shipping_bar.delivery_days" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Mensajerías (separadas por coma)</label>
          <input v-model="couriersText" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
    </div>

    <!-- ⭐ Sección de Reseñas -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">⭐ Reseñas de Clientes</h2>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="config.reviews.enabled" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          <span class="ms-3 text-sm font-medium text-gray-600">{{ config.reviews.enabled ? 'Activo' : 'Inactivo' }}</span>
        </label>
      </div>
      <p class="text-sm text-gray-400">Aparecen en la página principal, arriba de la sección final de Amazon.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título de la sección</label>
          <input v-model="config.reviews.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
          <input v-model="config.reviews.subtitle" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>

      <!-- Lista de reseñas (arrastra para reordenar) -->
      <p v-if="config.reviews.items.length > 1" class="text-xs text-gray-400">💡 Arrastra las reseñas para reordenarlas.</p>
      <div
        v-for="(review, index) in config.reviews.items"
        :key="index"
        class="p-4 bg-gray-50 rounded-lg space-y-3 cursor-grab active:cursor-grabbing transition-all"
        :class="{ 'opacity-50 ring-2 ring-primary-300': reviewDragIndex === index }"
        draggable="true"
        @dragstart="onReviewDragStart(index)"
        @dragover.prevent
        @dragend="onReviewDragEnd"
        @drop.prevent="onReviewDrop(index)"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-gray-300 text-sm">⠿</span>
            <span class="text-sm font-medium text-gray-700">Reseña {{ index + 1 }}</span>
          </div>
          <button @click="config.reviews.items.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input v-model="review.author" type="text" placeholder="Nombre del cliente" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <input v-model="review.product" type="text" placeholder="Producto (ej. Bruma Solara)" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
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
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Foto de la reseña (opcional)</label>
          <p class="text-[11px] text-primary-600 font-medium mb-2">📐 Recomendado: <strong>400×400 px</strong> ≈ 10.6 × 10.6 cm · cuadrado</p>
          <div class="flex items-center gap-3">
            <div v-if="review.image" class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
              <img :src="review.image" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1">
              <input type="file" accept="image/png,image/jpeg,image/webp" class="hidden" :ref="el => setFileInputRef(el, index)" @change="onReviewImageSelect($event, index)" />
              <button type="button" @click="triggerReviewFileInput(index)" class="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                📷 {{ review.image ? 'Cambiar foto' : 'Subir foto' }}
              </button>
              <button v-if="review.image" type="button" @click="review.image = null" class="ml-2 text-xs text-red-400 hover:text-red-600">Quitar</button>
            </div>
          </div>
        </div>
      </div>
      <button @click="addReview" class="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Agregar reseña</button>
    </div>

    <!-- 📦 Sección de Confianza -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">📦 Sección de Confianza</h2>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="config.shipping_trust.enabled" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          <span class="ms-3 text-sm font-medium text-gray-600">{{ config.shipping_trust.enabled ? 'Activo' : 'Inactivo' }}</span>
        </label>
      </div>
      <p class="text-sm text-gray-400">Aparece en la página principal entre los valores y la sección de aromas.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="config.shipping_trust.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
          <input v-model="config.shipping_trust.subtitle" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
      <div v-for="(feature, index) in config.shipping_trust.features" :key="index" class="p-4 bg-gray-50 rounded-lg space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700">Característica {{ index + 1 }}</span>
          <button @click="config.shipping_trust.features.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input v-model="feature.title" type="text" placeholder="Título" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <input v-model="feature.description" type="text" placeholder="Descripción" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <select v-model="feature.icon" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm">
            <option value="truck">🚚 Camión</option>
            <option value="package">📦 Paquete</option>
            <option value="clock">⏱ Reloj</option>
            <option value="shield">🛡️ Escudo</option>
            <option value="heart">❤️ Corazón</option>
          </select>
        </div>
      </div>
      <button @click="config.shipping_trust.features.push({ icon: 'truck', title: '', description: '' })" class="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Agregar característica</button>
    </div>

    <!-- Botón guardar (abajo también) -->
    <div class="flex items-center justify-end gap-3">
      <button
        @click="loadConfig"
        class="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
      >
        Descartar cambios
      </button>
      <button
        @click="handleSave"
        class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
        :disabled="saving"
      >
        {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
      </button>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabase()
const supabaseAdmin = useSupabaseAdmin()
const saving = ref(false)

const config = reactive({
  hero: {
    title: '',
    subtitle: '',
    badge: '100% Natural · Biodegradable · Hecho en México',
    cta_text: '',
    cta_link: '',
    cta_secondary_text: 'Tienda Amazon',
    cta_secondary_link: 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329',
    media_type: 'video',
    media_url: '',
    poster_url: '',
  },
  products_section: { title: '', subtitle: '', description: '' },
  brand: {
    name: 'PITAYA LAB',
    tagline: 'Fragancias que conectan',
    logo_url: '/images/brand/logo-pitayalab.png',
    favicon_url: '/favicon.png',
  },
  nav_links: [
    { label: 'Inicio', path: '/' },
    { label: 'Sobre Nosotros', path: '/about' },
    { label: 'Nuestra Filosofía', path: '/philosophy' },
    { label: 'Catálogo', path: '/catalog' },
    { label: 'Mayoreo & Corporativo', path: '/b2b' },
  ],
  brand_values: [],
  scents_section: { title: '', subtitle: '', description: '' },
  cta_section: { title: '', description: '', button_text: '', button_link: '' },
  shipping_bar: {
    enabled: true,
    text: 'Envío gratis en compras mayores a $299 MXN • Paquete Express, Estafeta y FedEx • 3 a 5 días hábiles',
    free_shipping_min: 299,
    shipping_fee: 50,
    couriers: ['Paquete Express', 'Estafeta', 'FedEx'],
    delivery_days: '3 a 5 días hábiles',
  },
  shipping_trust: {
    enabled: true,
    title: 'Envíos seguros a todo México',
    subtitle: 'Recibe tus productos de forma rápida y confiable',
    features: [
      { icon: 'truck', title: 'Envío gratis', description: 'En todas tus compras mayores a $299 MXN' },
      { icon: 'package', title: 'Costo simbólico', description: 'Compras menores a $299 solo $50 MXN de envío' },
      { icon: 'clock', title: '3 a 5 días hábiles', description: 'Entregamos a todo México con mensajerías de prestigio' },
    ],
  },
  reviews: {
    enabled: true,
    title: 'Lo que dicen nuestros clientes',
    subtitle: 'Opiniones reales de quienes ya disfrutan PITAYA LAB',
    items: [
      {
        author: 'María F.',
        rating: 5,
        product: 'Bruma Aromática Solara',
        text: 'El aroma es increíble, dura muchísimo y el empaque es precioso. Llegó muy bien protegido y rápido. Definitivamente volveré a comprar.',
        image: null,
      },
      {
        author: 'Carlos R.',
        rating: 5,
        product: 'Vela de Soya Sandalo',
        text: 'La vela huele espectacular, se siente la calidad de la cera de soya. La flama es estable y dura muchas horas. Muy recomendada.',
        image: null,
      },
      {
        author: 'Ana G.',
        rating: 5,
        product: 'Aceite Aromático Xcaret',
        text: 'Me encanta este aceite, el aroma es fresco y relajante. Unas gotitas en el difusor y toda la casa huele increíble. Excelente producto.',
        image: null,
      },
    ],
  },
})

// Referencias a inputs de archivo para reseñas
const reviewFileInputs = ref({})

function setFileInputRef(el, index) {
  if (el) reviewFileInputs.value[index] = el
}

function triggerReviewFileInput(index) {
  reviewFileInputs.value[index]?.click()
}

async function onReviewImageSelect(event, index) {
  const file = event.target.files?.[0]
  if (!file) return

  try {
    // Convertir a base64
    const base64 = await fileToBase64(file)
    // Guardar la imagen como data URL (se guarda en site_config)
    config.reviews.items[index].image = base64
  } catch (e) {
    console.error('Error procesando imagen:', e)
    alert('Error al procesar la imagen: ' + e.message)
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

// ===== Hero: subida de media (video / poster / imagen) =====
const heroVideoInput = ref(null)
const heroPosterInput = ref(null)
const heroImageInput = ref(null)

function triggerMediaUpload(type) {
  if (type === 'video') heroVideoInput.value?.click()
  else if (type === 'poster') heroPosterInput.value?.click()
  else if (type === 'image') heroImageInput.value?.click()
}

async function onHeroMediaSelect(type) {
  const file =
    type === 'video' ? heroVideoInput.value?.files?.[0]
    : type === 'poster' ? heroPosterInput.value?.files?.[0]
    : heroImageInput.value?.files?.[0]

  if (!file) return

  // Limitar tamaño (video hasta ~50MB, imágenes hasta ~10MB)
  const maxSize = type === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024
  if (file.size > maxSize) {
    alert(`⚠️ El archivo es demasiado grande. Máximo ${type === 'video' ? '50 MB' : '10 MB'}.`)
    return
  }

  try {
    const base64 = await fileToBase64(file)
    const loadingMsg = type === 'video' ? 'Subiendo video...' : 'Subiendo imagen...'
    alert(`⏳ ${loadingMsg}`)

    const res = await $fetch('/api/site/upload-media', {
      method: 'POST',
      body: {
        file: { name: file.name, type: file.type, data: base64 },
      },
    })

    if (res?.url) {
      if (type === 'video') config.hero.media_url = res.url
      else if (type === 'poster') config.hero.poster_url = res.url
      else if (type === 'image') config.hero.media_url = res.url
      alert('✅ Archivo subido correctamente. Recuerda guardar los cambios.')
    }
  } catch (e) {
    console.error('Error subiendo media:', e)
    alert('Error al subir el archivo: ' + (e.data?.message || e.message))
  }

  // Limpiar el input para poder volver a seleccionar el mismo archivo
  if (type === 'video') heroVideoInput.value.value = ''
  else if (type === 'poster') heroPosterInput.value.value = ''
  else if (type === 'image') heroImageInput.value.value = ''
}

// ===== Marca: subida de logo =====
const logoInput = ref(null)

async function onLogoSelect() {
  const file = logoInput.value?.files?.[0]
  if (!file) return

  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    alert('⚠️ El archivo es demasiado grande. Máximo 10 MB.')
    return
  }

  try {
    const base64 = await fileToBase64(file)
    const res = await $fetch('/api/site/upload-media', {
      method: 'POST',
      body: { file: { name: file.name, type: file.type, data: base64 } },
    })
    if (res?.url) {
      config.brand.logo_url = res.url
      alert('✅ Logo subido correctamente. Recuerda guardar los cambios.')
    }
  } catch (e) {
    console.error('Error subiendo logo:', e)
    alert('Error al subir el logo: ' + (e.data?.message || e.message))
  }
  logoInput.value.value = ''
}

function addNavLink() {
  config.nav_links.push({ label: '', path: '/' })
}

function addReview() {
  config.reviews.items.push({
    author: '',
    rating: 5,
    product: '',
    text: '',
    image: null,
  })
}

// Drag & drop para reordenar reseñas
const reviewDragIndex = ref(null)

function onReviewDragStart(index) {
  reviewDragIndex.value = index
}

function onReviewDragEnd() {
  reviewDragIndex.value = null
}

function onReviewDrop(targetIndex) {
  if (reviewDragIndex.value === null || reviewDragIndex.value === targetIndex) {
    reviewDragIndex.value = null
    return
  }

  const from = reviewDragIndex.value
  const to = targetIndex

  const [moved] = config.reviews.items.splice(from, 1)
  config.reviews.items.splice(to, 0, moved)

  reviewDragIndex.value = null
}

// Computed para manejar couriers como texto separado por comas
const couriersText = computed({
  get: () => config.shipping_bar.couriers.join(', '),
  set: (val) => { config.shipping_bar.couriers = val.split(',').map(c => c.trim()).filter(c => c) }
})

async function loadConfig() {
  try {
    const { data, error } = await supabase.from('site_config').select('*')
    if (error) throw error
    
    if (data) {
      data.forEach(item => {
        if (item.key === 'hero') Object.assign(config.hero, item.value)
        else if (item.key === 'products_section') config.products_section = item.value
        else if (item.key === 'brand') Object.assign(config.brand, item.value)
        else if (item.key === 'nav_links' && Array.isArray(item.value)) config.nav_links = item.value
        else if (item.key === 'brand_values') config.brand_values = item.value
        else if (item.key === 'scents_section') config.scents_section = item.value
        else if (item.key === 'cta_section') config.cta_section = item.value
        else if (item.key === 'shipping_bar') Object.assign(config.shipping_bar, item.value)
        else if (item.key === 'shipping_trust') Object.assign(config.shipping_trust, item.value)
        else if (item.key === 'reviews') Object.assign(config.reviews, item.value)
      })
    }
  } catch (e) {
    console.error('Error cargando config:', e)
  }
}

async function handleSave() {
  saving.value = true
  try {
    // Usamos supabaseAdmin (service role) para saltar RLS al escribir
    const client = supabaseAdmin || supabase

    const sections = [
      { key: 'hero', value: config.hero },
      { key: 'products_section', value: config.products_section },
      { key: 'brand', value: config.brand },
      { key: 'nav_links', value: config.nav_links },
      { key: 'brand_values', value: config.brand_values },
      { key: 'scents_section', value: config.scents_section },
      { key: 'cta_section', value: config.cta_section },
      { key: 'shipping_bar', value: config.shipping_bar },
      { key: 'shipping_trust', value: config.shipping_trust },
      { key: 'reviews', value: config.reviews },
    ]

    for (const section of sections) {
      const { error } = await client
        .from('site_config')
        .upsert({ key: section.key, value: section.value, updated_at: new Date().toISOString() }, { onConflict: 'key' })

      if (error) throw error
    }

    alert('✅ Cambios guardados correctamente')
  } catch (e) {
    console.error('Error guardando:', e)
    alert('Error al guardar: ' + e.message)
  } finally {
    saving.value = false
  }
}

function addBrandValue() {
  config.brand_values.push({ title: '', description: '', icon: 'leaf' })
}

function removeBrandValue(index) {
  config.brand_values.splice(index, 1)
}

onMounted(() => {
  loadConfig()
})
</script>
