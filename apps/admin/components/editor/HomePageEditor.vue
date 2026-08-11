<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4 mb-6">
      <h2 class="text-lg font-semibold text-gray-900">🏠 Hero (Portada)</h2>
      <p class="text-sm text-gray-400">Texto, imagen y video que se ven al entrar al sitio.</p>
      <div class="p-4 bg-gray-50 rounded-lg border border-gray-100">
        <div class="flex items-center justify-between mb-3">
          <label class="text-sm font-medium text-gray-700">🎬 Fondo del Hero</label>
          <div class="flex items-center gap-3 text-sm">
            <label class="inline-flex items-center gap-1.5 cursor-pointer">
              <input type="radio" value="video" v-model="model.hero.media_type" class="text-primary-600 focus:ring-primary-500" />
              <span class="text-gray-700">Video</span>
            </label>
            <label class="inline-flex items-center gap-1.5 cursor-pointer">
              <input type="radio" value="image" v-model="model.hero.media_type" class="text-primary-600 focus:ring-primary-500" />
              <span class="text-gray-700">Imagen</span>
            </label>
          </div>
        </div>

        <div v-if="model.hero.media_type === 'video'" class="space-y-3">
          <div class="flex items-center gap-3">
            <div class="w-28 h-16 rounded-lg overflow-hidden bg-earth-100 border border-gray-200 flex-shrink-0">
              <video v-if="model.hero.media_url" :src="model.hero.media_url" muted loop playsinline class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-lg">🎬</div>
            </div>
            <div class="flex-1 space-y-2">
              <p class="text-xs text-gray-400">Sube un video (MP4/WebM/MOV) o pega la URL de un video ya alojado.</p>
              <p class="text-[11px] text-primary-600 font-medium">📐 Recomendado: video <strong>1920×1080 px</strong> (16:9) ≈ 50.8 × 28.6 cm · formato MP4 · peso ideal &lt; 20 MB</p>
              <div class="flex flex-wrap gap-2">
                <input type="file" accept="video/mp4,video/webm,video/quicktime" class="hidden" ref="heroVideoInput" @change="onHeroMediaSelect('video')" />
                <button type="button" @click="triggerMediaUpload('video')" class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors">📤 Subir video</button>
                <button v-if="model.hero.media_url" type="button" @click="model.hero.media_url = ''" class="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-600">Quitar video</button>
              </div>
              <input v-model="model.hero.media_url" type="url" placeholder="...o pega URL del video" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-xs" />
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-28 h-16 rounded-lg overflow-hidden bg-earth-100 border border-gray-200 flex-shrink-0">
              <img v-if="model.hero.poster_url" :src="model.hero.poster_url" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-300">🖼️</div>
            </div>
            <div class="flex-1 space-y-2">
              <p class="text-xs text-gray-400">Imagen de portada (poster) mientras carga el video o en móviles / fallback.</p>
              <p class="text-[11px] text-primary-600 font-medium">📐 Recomendado: imagen <strong>1920×1080 px</strong> (16:9) ≈ 50.8 × 28.6 cm · JPG/WebP · &lt; 1 MB ideal</p>
              <div class="flex flex-wrap gap-2">
                <input type="file" accept="image/png,image/jpeg,image/webp" class="hidden" ref="heroPosterInput" @change="onHeroMediaSelect('poster')" />
                <button type="button" @click="triggerMediaUpload('poster')" class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors">📷 Subir poster</button>
                <button v-if="model.hero.poster_url" type="button" @click="model.hero.poster_url = ''" class="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-600">Quitar poster</button>
              </div>
              <input v-model="model.hero.poster_url" type="url" placeholder="...o pega URL del poster" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-xs" />
            </div>
          </div>
        </div>

        <div v-else class="flex items-center gap-3">
          <div class="w-28 h-16 rounded-lg overflow-hidden bg-earth-100 border border-gray-200 flex-shrink-0">
            <img v-if="model.hero.media_url" :src="model.hero.media_url" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-lg">🖼️</div>
          </div>
          <div class="flex-1 space-y-2">
            <p class="text-xs text-gray-400">Sube una imagen de fondo (PNG/JPG/WebP) o pega la URL de una imagen ya alojada.</p>
            <p class="text-[11px] text-primary-600 font-medium">📐 Recomendado: imagen <strong>1920×1080 px</strong> (16:9) ≈ 50.8 × 28.6 cm · JPG/WebP · &lt; 1 MB ideal</p>
            <div class="flex flex-wrap gap-2">
              <input type="file" accept="image/png,image/jpeg,image/webp" class="hidden" ref="heroImageInput" @change="onHeroMediaSelect('image')" />
              <button type="button" @click="triggerMediaUpload('image')" class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors">📷 Subir imagen</button>
              <button v-if="model.hero.media_url" type="button" @click="model.hero.media_url = ''" class="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-600">Quitar imagen</button>
            </div>
            <input v-model="model.hero.media_url" type="url" placeholder="...o pega URL de la imagen" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-xs" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título principal</label>
          <textarea v-model="model.hero.title" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
          <p class="text-xs text-gray-400 mt-1">Tip: usa «\n» para saltos de línea y resaltar palabras.</p>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
          <textarea v-model="model.hero.subtitle" rows="3" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Etiqueta (badge)</label>
          <input v-model="model.hero.badge" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
          <input v-model="model.hero.cta_text" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Link del botón</label>
          <input v-model="model.hero.cta_link" type="url" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto botón secundario (Amazon)</label>
          <input v-model="model.hero.cta_secondary_text" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Link botón secundario</label>
          <input v-model="model.hero.cta_secondary_link" type="url" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
    </div>

    <!-- 🏷️ Marca & Navegación -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4 mb-6">
      <h2 class="text-lg font-semibold text-gray-900">🏷️ Marca & Navegación</h2>
      <p class="text-sm text-gray-400">Logo, nombre, eslogan y menú del sitio (navbar y footer).</p>

      <div class="p-4 bg-gray-50 rounded-lg border border-gray-100">
        <label class="text-sm font-medium text-gray-700 block mb-2">🖼️ Logo</label>
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-lg overflow-hidden bg-earth-100 border border-gray-200 flex-shrink-0">
            <img v-if="model.brand.logo_url" :src="model.brand.logo_url" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-xl">🏷️</div>
          </div>
          <div class="flex-1 space-y-2">
            <p class="text-[11px] text-primary-600 font-medium">📐 Recomendado: <strong>500×500 px</strong> ≈ 13.2 × 13.2 cm · PNG con fondo transparente</p>
            <div class="flex flex-wrap gap-2">
              <input type="file" accept="image/png,image/jpeg,image/webp" class="hidden" ref="logoInput" @change="onLogoSelect" />
              <button type="button" @click="logoInput?.click()" class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors">📷 Subir logo</button>
              <button v-if="model.brand.logo_url" type="button" @click="model.brand.logo_url = ''" class="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-600">Quitar logo</button>
            </div>
            <input v-model="model.brand.logo_url" type="url" placeholder="...o pega la URL del logo" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-xs" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre de la marca</label>
          <input v-model="model.brand.name" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Eslogan / tagline</label>
          <input v-model="model.brand.tagline" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Favicon URL</label>
          <input v-model="model.brand.favicon_url" type="url" placeholder="/favicon.png" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>

      <!-- Menú de navegación -->
      <div class="pt-2 border-t border-gray-100">
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-gray-700">🧭 Menú de navegación</label>
          <button @click="addNavLink" class="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Agregar enlace</button>
        </div>
        <div v-for="(link, index) in model.nav_links" :key="index" class="p-3 bg-gray-50 rounded-lg mb-2 flex items-center gap-3">
          <span class="text-gray-300 text-sm">⠿</span>
          <input v-model="link.label" type="text" placeholder="Etiqueta (ej. Inicio)" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <input v-model="link.path" type="text" placeholder="/ruta" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
          <button @click="model.nav_links.splice(index, 1)" class="text-red-400 hover:text-red-600 text-sm">✕</button>
        </div>
        <p class="text-xs text-gray-400 mt-1">Estos enlaces aparecen en el menú superior y en el menú móvil.</p>
      </div>
    </div>

    <!-- Productos Section -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4 mb-6">
      <h2 class="text-lg font-semibold text-gray-900">📦 Sección de Productos</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo (etiqueta)</label>
          <input v-model="model.products_section.subtitle" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="model.products_section.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="model.products_section.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
    </div>

    <!-- Brand Values -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4 mb-6">
      <h2 class="text-lg font-semibold text-gray-900">🎯 Valores de la Marca</h2>
      <p class="text-sm text-gray-400">Los 4 valores que aparecen en "¿Por qué elegir PITAYA LAB?"</p>
      <div v-for="(value, index) in model.brand_values" :key="index" class="p-4 bg-gray-50 rounded-lg space-y-3">
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
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4 mb-6">
      <h2 class="text-lg font-semibold text-gray-900">🌸 Sección de Aromas</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo (etiqueta)</label>
          <input v-model="model.scents_section.subtitle" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="model.scents_section.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="model.scents_section.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
    </div>

    <!-- CTA Final -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4 mb-6">
      <h2 class="text-lg font-semibold text-gray-900">🚀 CTA Final</h2>
      <p class="text-sm text-gray-400">La sección de llamada a la acción al final de la página.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="model.cta_section.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="model.cta_section.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
          <input v-model="model.cta_section.button_text" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Link del botón</label>
          <input v-model="model.cta_section.button_link" type="url" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
    </div>

    <!-- 🚚 Barra de Envíos -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4 mb-6">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">🚚 Barra de Envíos</h2>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="model.shipping_bar.enabled" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          <span class="ms-3 text-sm font-medium text-gray-600">{{ model.shipping_bar.enabled ? 'Activo' : 'Inactivo' }}</span>
        </label>
      </div>
      <p class="text-sm text-gray-400">Barra promocional que aparece arriba del navbar.</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto del mensaje</label>
          <textarea v-model="model.shipping_bar.text" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Monto mínimo envío gratis ($)</label>
          <input v-model.number="model.shipping_bar.free_shipping_min" type="number" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Costo envío menor ($)</label>
          <input v-model.number="model.shipping_bar.shipping_fee" type="number" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tiempo estimado</label>
          <input v-model="model.shipping_bar.delivery_days" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div class="md:col-span-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Mensajerías (separadas por coma)</label>
          <input v-model="couriersText" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  model: { type: Object, required: true },
})

const couriersText = computed({
  get: () => (Array.isArray(props.model.shipping_bar.couriers) ? props.model.shipping_bar.couriers.join(', ') : ''),
  set: (val) => {
    props.model.shipping_bar.couriers = val.split(',').map(c => c.trim()).filter(Boolean)
  },
})

function addNavLink() {
  if (!Array.isArray(props.model.nav_links)) props.model.nav_links = []
  props.model.nav_links.push({ label: '', path: '/' })
}
function addBrandValue() {
  if (!Array.isArray(props.model.brand_values)) props.model.brand_values = []
  props.model.brand_values.push({ icon: 'leaf', title: '', description: '' })
}
function removeBrandValue(index) {
  props.model.brand_values.splice(index, 1)
}
</script>
