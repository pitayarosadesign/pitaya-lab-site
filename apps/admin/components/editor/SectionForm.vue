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
          <div class="flex gap-4">
            <label class="inline-flex items-center gap-2">
              <input type="radio" value="video" v-model="section.content.media_type" class="text-primary-600" />
              <span class="text-sm">Video</span>
            </label>
            <label class="inline-flex items-center gap-2">
              <input type="radio" value="image" v-model="section.content.media_type" class="text-primary-600" />
              <span class="text-sm">Imagen</span>
            </label>
          </div>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">URL del {{ section.content.media_type === 'video' ? 'video' : 'imagen' }}</label>
          <input v-model="section.content.media_url" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" placeholder="https://... o /images/..." />
        </div>
        <div v-if="section.content.media_type === 'video'" class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">URL del poster (imagen de portada)</label>
          <input v-model="section.content.poster_url" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" placeholder="https://... o /images/..." />
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
            <button @click="section.content.values.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
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
            <button @click="section.content.features.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
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
            <button @click="section.content.items.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input v-model="review.author" type="text" placeholder="Nombre del cliente" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
            <input v-model="review.product" type="text" placeholder="Producto" class="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
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
          <input v-model="section.content.image_url" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" placeholder="https://... o /images/..." />
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
            <button @click="section.content.images.splice(index, 1)" class="text-red-400 hover:text-red-600 text-xs">Eliminar</button>
          </div>
          <input v-model="image.url" type="text" placeholder="URL de la imagen" class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm" />
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

defineEmits(['save'])

const supabase = useSupabase()
const collections = ref([])

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

onMounted(loadCollections)
</script>
