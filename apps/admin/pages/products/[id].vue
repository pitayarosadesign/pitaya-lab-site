<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/products" class="text-gray-400 hover:text-gray-600 transition-colors">
          ← Volver
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-900" v-if="product">✏️ {{ product.name }}</h1>
        <h1 class="text-2xl font-bold text-gray-900" v-else>✏️ Editar Producto</h1>
      </div>
      <button
        v-if="product"
        type="button"
        @click="duplicateHere"
        class="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-all"
      >
        📋 Duplicar producto
      </button>
    </div>

    <div v-if="loading" class="text-center py-16">
      <p class="text-gray-400">Cargando producto...</p>
    </div>

    <form v-else-if="product" @submit.prevent="handleSave" class="space-y-6">
      <!-- Info básica -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">Información del Producto</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input v-model="form.name" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo <span class="text-gray-400 font-normal">(opcional — se muestra junto al nombre en el catálogo)</span></label>
            <input v-model="form.subtitle" type="text" placeholder="Ej. Edición limitada, Para difusores, 15 ml…" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">SKU</label>
            <input v-model="form.sku" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all font-mono" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <div class="flex items-center gap-2">
              <select v-model="form.category" class="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all">
                <option value="">Sin categoría</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.slug">{{ cat.name }}</option>
              </select>
              <button
                type="button"
                @click="openCategoryModal"
                class="flex-shrink-0 px-3 py-2.5 rounded-lg border border-dashed border-primary-300 text-primary-600 hover:bg-primary-50 text-sm font-medium transition-colors"
                title="Agregar nueva categoría"
              >
                + Nueva
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input v-model="form.slug" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all font-mono text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Precio</label>
            <div class="relative">
              <span class="absolute left-3 top-2.5 text-gray-400">$</span>
              <input v-model="form.price" type="number" step="0.01" class="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <div v-if="useVariantOptions" class="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-100 bg-gray-50">
              <span class="font-semibold text-gray-800">{{ variantStockTotal }}</span>
              <span class="text-xs text-gray-400">(suma de variantes)</span>
            </div>
            <input v-else v-model="form.stock" type="number" min="0" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">GTIN (código barras)</label>
            <input v-model="form.gtin" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all font-mono" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ASIN Amazon</label>
            <input v-model="form.amazon_asin" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all font-mono" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="form.description" rows="3" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción larga</label>
          <textarea v-model="form.long_description" rows="4" placeholder="Descripción detallada para la página del producto. Déjalo vacío para ocultarlo." class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
          <p class="text-xs text-gray-400 mt-1">Se muestra en la página del producto. Vacío = no se muestra.</p>
        </div>
      </div>

      <!-- Estado y Configuración -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">⚙️ Estado y Configuración</h2>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Canal de venta</label>
          <select v-model="form.sales_channel" class="w-full md:max-w-sm px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all">
            <option value="directa">Menudeo (tienda pública / catálogo de la web)</option>
            <option value="evento">Eventos / Recuerdos (catálogo y cotizador /b2b)</option>
            <option value="mayoreo">Comercial por volumen (reservado a futuro)</option>
          </select>
          <p class="text-xs text-gray-400 mt-1">💡 Los de <b>Eventos</b> salen en el catálogo público (filtro "Recuerdos") y en el cotizador de recuerdos (/b2b), pero NO en los feeds.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select v-model="form.is_active" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all">
              <option :value="true">🟢 Activo (visible en tienda)</option>
              <option :value="false">🔴 Inactivo (oculto)</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">⭐ Destacado</label>
            <div class="flex items-center gap-3 h-[42px]">
              <button
                type="button"
                @click="form.is_featured = !form.is_featured"
                class="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all"
                :class="form.is_featured ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'"
              >
                <span class="text-lg">{{ form.is_featured ? '⭐' : '☆' }}</span>
                {{ form.is_featured ? 'Destacado' : 'Marcar como destacado' }}
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">🏷️ Distintivo</label>
            <input v-model="form.badge" list="badge-presets" type="text" placeholder="Nuevo, Best Seller…" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
            <datalist id="badge-presets">
              <option value="Nuevo"></option>
              <option value="Best Seller"></option>
              <option value="Edición Limitada"></option>
              <option value="Últimas piezas"></option>
            </datalist>
            <p class="text-xs text-gray-400 mt-1">Se muestra sobre la imagen de la tarjeta. Vacío = sin distintivo (o "Best Seller" si está destacado).</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Preparación (días hábiles)</label>
            <div class="grid grid-cols-2 gap-2">
              <input v-model.number="form.prep_days_min" type="number" min="0" placeholder="Mín (hereda)" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
              <input v-model.number="form.prep_days_max" type="number" min="0" placeholder="Máx (hereda)" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
            </div>
            <p class="text-xs text-gray-400 mt-1">Vacío = heredar de la categoría. Ej. recuerdos: 4 días hábiles.</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mínimo de compra</label>
            <input v-model.number="form.min_order_quantity" type="number" min="1" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
            <p class="text-xs text-gray-400 mt-1">1 = venta por pieza. Ej. recuerdos: 30.</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Presentación (pack)</label>
            <input v-model="form.pack_label" type="text" placeholder="Ej. Pack de 10 piezas" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
            <p class="text-xs text-gray-400 mt-1">Opcional. Se muestra junto a la cantidad en tienda.</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Formato de venta (cantidades)</label>
            <input v-model="form.quantity_options" type="text" placeholder="Ej. 12, 24, 48" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
            <p class="text-xs text-gray-400 mt-1">Cantidades en las que se vende (separadas por coma). Vacío = cantidad libre con mínimo. Se usa para el monto por pieza.</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Categoría de Google</label>
            <select v-model="form.google_category" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all">
              <option value="">Seleccionar</option>
              <optgroup label="Velas">
                <option value="Home & Garden > Home Decor > Candles">Hogar > Decoración > Velas</option>
                <option value="Home & Garden > Home Decor > Candles > Candle Holders">Hogar > Decoración > Velas > Portavelas</option>
                <option value="Home & Garden > Home Decor > Candles > Scented Candles">Hogar > Decoración > Velas > Velas Aromáticas</option>
                <option value="Home & Garden > Home Decor > Candles > Tea Light Candles">Hogar > Decoración > Velas > Velas de Té</option>
                <option value="Home & Garden > Home Decor > Candles > Votive Candles">Hogar > Decoración > Velas > Velas Votivas</option>
                <option value="Home & Garden > Home Decor > Candles > Pillar Candles">Hogar > Decoración > Velas > Velas de Columna</option>
              </optgroup>
              <optgroup label="Fragancias para el Hogar">
                <option value="Home & Garden > Home Decor > Home Fragrance Accessories">Hogar > Decoración > Accesorios de Fragancia</option>
                <option value="Home & Garden > Home Decor > Home Fragrance Accessories > Air Fresheners">Hogar > Decoración > Ambientadores</option>
                <option value="Home & Garden > Home Decor > Home Fragrance Accessories > Reed Diffusers">Hogar > Decoración > Difusores de Vara</option>
                <option value="Home & Garden > Home Decor > Home Fragrance Accessories > Wax Melts">Hogar > Decoración > Ceras Derretibles</option>
                <option value="Home & Garden > Home Decor > Home Fragrance Accessories > Room Sprays">Hogar > Decoración > Sprays para Habitación</option>
                <option value="Home & Garden > Home Decor > Home Fragrance Accessories > Incense">Hogar > Decoración > Incienso</option>
              </optgroup>
              <optgroup label="Aromaterapia y Aceites">
                <option value="Health & Beauty > Aromatherapy > Essential Oils">Salud > Aromaterapia > Aceites Esenciales</option>
                <option value="Health & Beauty > Aromatherapy > Aromatherapy Candles">Salud > Aromaterapia > Velas de Aromaterapia</option>
                <option value="Health & Beauty > Aromatherapy > Aromatherapy Diffusers">Salud > Aromaterapia > Difusores</option>
                <option value="Health & Beauty > Aromatherapy > Aromatherapy Kits">Salud > Aromaterapia > Kits de Aromaterapia</option>
                <option value="Health & Beauty > Aromatherapy > Aromatherapy Oils">Salud > Aromaterapia > Aceites de Aromaterapia</option>
                <option value="Health & Beauty > Aromatherapy > Aromatherapy Sprays">Salud > Aromaterapia > Sprays de Aromaterapia</option>
              </optgroup>
              <optgroup label="Cuidado Personal">
                <option value="Health & Beauty > Bath & Body > Bath & Body Gift Sets">Salud > Cuidado Personal > Sets de Regalo</option>
                <option value="Health & Beauty > Bath & Body > Body Lotion">Salud > Cuidado Personal > Loción Corporal</option>
                <option value="Health & Beauty > Bath & Body > Body Oil">Salud > Cuidado Personal > Aceite Corporal</option>
                <option value="Health & Beauty > Bath & Body > Body Spray">Salud > Cuidado Personal > Spray Corporal</option>
                <option value="Health & Beauty > Bath & Body > Bath Salts">Salud > Cuidado Personal > Sales de Baño</option>
                <option value="Health & Beauty > Bath & Body > Soap">Salud > Cuidado Personal > Jabón</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Envío gratis</label>
            <select v-model="form.free_shipping" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all">
              <option :value="false">No</option>
              <option :value="true">Sí</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Link Amazon</label>
            <input v-model="form.amazon_link" type="url" placeholder="https://amazon.com.mx/..." class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Precio comparativa ($)</label>
            <input v-model="form.compare_at_price" type="number" step="0.01" placeholder="Precio tachado" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Costo ($)</label>
            <input v-model="form.cost_price" type="number" step="0.01" placeholder="Solo admin" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all" />
          </div>
        </div>
      </div>

      <!-- Imágenes -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">📸 Imágenes</h2>
        
        <!-- Aviso + botón para limpiar imágenes rotas -->
        <div v-if="brokenImagesCount > 0" class="flex items-center justify-between gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
          <p class="text-xs text-red-700">⚠️ {{ brokenImagesCount }} {{ brokenImagesCount === 1 ? 'imagen rota detectada' : 'imágenes rotas detectadas' }}.</p>
          <button type="button" @click="removeBrokenImages" class="text-xs font-semibold text-red-600 hover:text-red-700 underline whitespace-nowrap">🧹 Eliminar rotas</button>
        </div>

        <!-- Imágenes existentes -->
        <div v-if="form.images.length > 0" class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
          <div
            v-for="(img, index) in form.images"
            :key="img.id || img.url || index"
            class="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 cursor-grab active:cursor-grabbing transition-all"
            :class="{
              'ring-2 ring-primary-500': img.is_primary,
              'ring-2 ring-red-400': isBroken(img),
              'opacity-50': dragIndex === index,
            }"
            draggable="true"
            @dragstart="onDragStart(index)"
            @dragover.prevent="onDragOver(index)"
            @dragend="onDragEnd"
            @drop.prevent="onDrop(index)"
          >
            <img
              v-if="!isBroken(img)"
              :src="img.url ? useOptimizedImage(img.url, { width: 300, quality: 70, format: 'webp' }) : img.preview"
              :alt="'Imagen ' + (index + 1)"
              class="w-full h-full object-cover pointer-events-none"
              loading="lazy"
              @error="markBroken(img)"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-red-50 text-red-300 text-3xl">🖼️</div>
            <div v-if="img.is_primary" class="absolute top-1 left-1 bg-primary-600 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">Principal</div>
            <div v-if="isBroken(img)" class="absolute bottom-1 left-1 right-1 bg-red-600 text-white text-[10px] py-1 rounded font-medium text-center">Imagen rota</div>
            <button type="button" @click="removeImage(index)" class="absolute top-1 right-1 bg-white/90 text-red-500 rounded-full p-1 shadow-sm transition-opacity" :class="isBroken(img) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <button v-if="!img.is_primary && !isBroken(img)" type="button" @click="setPrimary(index)" class="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-[10px] py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Hacer principal</button>
            <!-- Indicador de arrastre -->
            <div class="absolute top-1 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              ⠿ Arrastrar
            </div>
          </div>
        </div>
        <p v-if="form.images.length > 1" class="text-xs text-gray-400">💡 Arrastra las imágenes para reordenarlas. La primera será la principal en la tienda.</p>

        <!-- Subir nueva -->
        <div class="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary-300 hover:bg-primary-50/30 transition-all cursor-pointer" @click="triggerUpload" @dragover.prevent @drop.prevent="handleDrop">
          <input ref="fileInput" type="file" accept="image/png,image/jpeg,image/webp" class="hidden" @change="handleFileSelect" />
          <svg class="w-10 h-10 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <p class="text-sm text-gray-500">Arrastra imágenes o haz clic para subir</p>
        </div>
      </div>

      <!-- Variantes por dimensiones (Aroma, Tamaño/Volumen, Color…) -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Variantes del producto</h2>
          <p class="text-sm text-gray-400 mt-0.5">
            Define hasta 2 dimensiones (ej. Aroma y Tamaño). Cada combinación tendrá su propio precio, stock y SKU.
          </p>
        </div>
        <FormsVariantOptionsEditor
          ref="variantEditorRef"
          v-model:has-variants="useVariantOptions"
          v-model:dimensions="variantDimensions"
          v-model:combo-meta="variantComboMeta"
          :scents="allScents"
          :allow-aroma="!isEventChannel"
          :base-sku="form.sku"
          :loading-profiles="loadingProfiles"
          :gallery-images="galleryImages"
        />
      </div>

      <!-- Personalización (Recuerdos / Eventos) -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Personalización</h2>
          <p class="text-sm text-gray-400 mt-0.5">
            Permite que el cliente personalice este producto con campos de texto y/o subiendo un archivo.
          </p>
        </div>
        <FormsProductPersonalizationEditor v-model="form.personalization" />
      </div>


      <!-- Botones -->
      <div class="flex items-center justify-end gap-3">
        <NuxtLink to="/products" class="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800">
          Cancelar
        </NuxtLink>
        <button type="submit" class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors" :disabled="saving">
          {{ saving ? 'Guardando...' : 'Guardar cambios' }}
        </button>
      </div>
    </form>

    <div v-else-if="!loading" class="text-center py-16">
      <p class="text-gray-400">Producto no encontrado</p>
      <NuxtLink to="/products" class="text-primary-600 hover:text-primary-700 text-sm mt-2 inline-block">← Volver a productos</NuxtLink>
    </div>

    <!-- Modal: Nueva categoría -->
    <div v-if="showCategoryModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/40" @click="showCategoryModal = false"></div>
      <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">➕ Nueva Categoría</h3>
          <button @click="showCategoryModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input v-model="newCategory.name" type="text" placeholder="Ej: Kits de Regalo" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Slug (URL) *</label>
          <input v-model="newCategory.slug" type="text" placeholder="kits-de-regalo" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-mono text-sm" />
          <p class="text-xs text-gray-400 mt-1">Se genera automáticamente desde el nombre</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="newCategory.description" rows="2" placeholder="Descripción breve de la categoría" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button @click="showCategoryModal = false" class="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800">Cancelar</button>
          <button
            @click="createCategory"
            :disabled="creatingCategory"
            class="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {{ creatingCategory ? 'Creando...' : 'Crear categoría' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const product = ref(null)
const loading = ref(true)
const saving = ref(false)
const fileInput = ref(null)

const form = reactive({
  name: '', subtitle: '', sku: '', slug: '', description: '', long_description: '', price: '', stock: 0,
  gtin: '', amazon_asin: '', images: [],
  is_active: true, is_featured: false, google_category: '', free_shipping: false,
  amazon_link: '', compare_at_price: '', cost_price: '',
  category: '', sales_channel: 'directa', badge: '',
  prep_days_min: null,
  prep_days_max: null,
  personalization: null,
  min_order_quantity: 1,
  pack_label: '',
  quantity_options: '',
})

// Categorías cargadas dinámicamente desde la base de datos
const categories = ref([])

// Modal de nueva categoría
const showCategoryModal = ref(false)
const creatingCategory = ref(false)
const newCategory = reactive({ name: '', slug: '', description: '' })

// ===== Variantes por dimensiones (Aroma, Tamaño/Volumen, Color…) =====
const isEventChannel = computed(() => form.sales_channel === 'evento')
const allScents = ref([])
const loadingProfiles = ref(false)
const variantEditorRef = ref(null)
const useVariantOptions = ref(false)
const variantDimensions = ref([])
const variantComboMeta = ref({})

// Stock principal derivado (solo lectura): suma del stock de las variantes.
// El backend recalcula y persiste este mismo total al guardar.
const variantStockTotal = computed(() => {
  if (!useVariantOptions.value) return null
  return Object.values(variantComboMeta.value).reduce((sum, m) => sum + (parseInt(m?.stock) || 0), 0)
})

// Imágenes disponibles para asignar a las variantes (galería del producto).
// Solo imágenes YA guardadas (con url real): una imagen recién subida todavía
// solo tiene `preview` (blob:), que no es persistible y rompería la ficha.
const galleryImages = computed(() =>
  (form.images || [])
    .filter(img => img.url)
    .map(img => ({ url: img.url, altText: img.alt_text || '' }))
)

async function loadCategories() {
  try {
    const data = await $fetch('/api/categories/list')
    categories.value = data.categories || []
  } catch (e) {
    console.warn('No se pudieron cargar las categorías:', e.message)
    categories.value = []
  }
}

function openCategoryModal() {
  newCategory.name = ''
  newCategory.slug = ''
  newCategory.description = ''
  showCategoryModal.value = true
}

async function createCategory() {
  if (!newCategory.name) {
    alert('El nombre de la categoría es obligatorio')
    return
  }
  creatingCategory.value = true
  try {
    const res = await $fetch('/api/categories/create', {
      method: 'POST',
      body: {
        name: newCategory.name,
        slug: newCategory.slug || newCategory.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim(),
        description: newCategory.description,
      },
    })
    if (res?.category) {
      categories.value.push(res.category)
      form.category = res.category.slug
      showCategoryModal.value = false
      alert('✅ Categoría creada correctamente')
    }
  } catch (e) {
    alert('Error al crear la categoría: ' + (e.data?.message || e.message))
  } finally {
    creatingCategory.value = false
  }
}

async function loadProduct() {
  loading.value = true
  try {
    const data = await $fetch(`/api/products/${route.params.id}`)

    product.value = data
    form.name = data.name
    form.subtitle = data.subtitle || ''
    form.sku = data.sku
    form.slug = data.slug
    form.description = data.description || ''
    form.long_description = data.long_description || ''
    form.price = data.price
    form.stock = data.stock || 0
    form.gtin = data.gtin || ''
    form.amazon_asin = data.amazon_asin || ''
    form.is_active = data.is_active !== false
    form.is_featured = data.is_featured || false
    form.google_category = data.google_product_category || ''
    form.free_shipping = data.free_shipping || false
    form.amazon_link = data.amazon_link || ''
    form.compare_at_price = data.compare_at_price || ''
    form.cost_price = data.cost_price || ''
    form.sales_channel = data.sales_channel || 'directa'
    form.personalization = data.personalization || null
    form.badge = data.badge || ''
    form.prep_days_min = data.prep_days_min ?? null
    form.prep_days_max = data.prep_days_max ?? null
    form.min_order_quantity = data.min_order_quantity ?? 1
    form.pack_label = data.pack_label || ''
    form.quantity_options = (data.quantity_options || []).join(', ')
    form.images = data.images || []

    // Hidratar el editor de variantes por dimensiones.
    if (data.variantOptions) {
      // Modelo flexible existente.
      useVariantOptions.value = true
      const dims = data.variantOptions.dimensions || []
      const combos = data.variantOptions.combinations || []

      // El endpoint reconstruye las dimensiones con scentIds vacíos (no
      // resuelve ids de aroma); los rellenamos aquí a partir de los NOMBRES
      // guardados en las combinaciones y del catálogo de aromas ya cargado.
      dims.forEach((dim, di) => {
        if (dim.type === 'Aroma') {
          const field = di === 0 ? 'value1' : 'value2'
          const names = new Set(combos.map(c => c[field]).filter(Boolean))
          dim.scentIds = allScents.value
            .filter(s => names.has(s.name))
            .map(s => s.id)
        }
      })
      variantDimensions.value = dims

      const meta = {}
      for (const c of combos) {
        if (c?.label) meta[c.label] = { price: c.price ?? '', stock: c.stock ?? '', gtin: c.gtin ?? '', imageUrl: c.imageUrl ?? '' }
      }
      variantComboMeta.value = meta
    } else if (!isEventChannel.value && data.variants && data.variants.length > 0) {
      // Productos de tienda legacy (solo aroma): convertir a una dimensión
      // "Aroma" para poder seguir editándolos en el editor unificado.
      const scentIds = [...new Set(
        data.variants.filter(v => v.fragrance_profile_id).map(v => v.fragrance_profile_id)
      )]
      if (scentIds.length > 0) {
        useVariantOptions.value = true
        variantDimensions.value = [{
          type: 'Aroma',
          customName: '',
          scentIds,
          customValues: [],
          newValue: '',
          bulkOpen: false,
          bulkText: '',
        }]
        const meta = {}
        for (const v of data.variants) {
          if (v.fragrance_profile_id && v.name) {
            meta[v.name] = { price: v.price ?? '', stock: v.stock ?? '', gtin: v.gtin ?? '', imageUrl: v.image_url ?? '' }
          }
        }
        variantComboMeta.value = meta
      }
    }

    // Resolver el slug de la categoría a partir del category_id
    if (data.category_id) {
      const cat = categories.value.find(c => c.id === data.category_id)
      form.category = cat?.slug || ''
    }
  } catch (e) {
    console.error('Error:', e)
  } finally {
    loading.value = false
  }
}

// ===== Carga de perfiles aromáticos (variantes) =====
async function loadScentProfiles() {
  loadingProfiles.value = true
  try {
    const res = await $fetch('/api/fragrance-profiles/list')
    const profiles = res.profiles || []

    const activeProfiles = profiles.filter(p => p.is_active !== false)

    allScents.value = activeProfiles.map(p => ({
      id: p.id,
      name: p.name,
      subtitle: p.subtitle,
      experience: p.experience,
      emoji: p.emoji,
      olfactive_family: p.olfactive_family,
    }))
  } catch (e) {
    console.error('Error cargando perfiles aromáticos:', e)
  } finally {
    loadingProfiles.value = false
  }
}

function triggerUpload() { fileInput.value?.click() }

function handleFileSelect(e) {
  const files = Array.from(e.target.files || [])
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue
    form.images.push({
      file,
      preview: URL.createObjectURL(file),
      is_primary: form.images.length === 0,
      _new: true,
    })
  }
}

function handleDrop(e) {
  const files = Array.from(e.dataTransfer.files || [])
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue
    form.images.push({
      file,
      preview: URL.createObjectURL(file),
      is_primary: form.images.length === 0,
      _new: true,
    })
  }
}

async function removeImage(index) {
  const img = form.images[index]
  if (img.id) {
    try {
      await $fetch('/api/products/delete-image', {
        method: 'DELETE',
        body: { imageId: img.id, imageUrl: img.url },
      })
    } catch (e) {
      console.error('Error eliminando imagen:', e)
    }
  }
  if (img.preview) URL.revokeObjectURL(img.preview)
  clearBrokenKey(img)
  form.images.splice(index, 1)
}

// ===== Detección de imágenes rotas =====
const brokenImageKeys = ref(new Set())

const brokenImagesCount = computed(() => form.images.filter(img => isBroken(img)).length)

function imageKey(img) {
  return img.id || img.url || img.preview || ''
}

function isBroken(img) {
  const k = imageKey(img)
  return !!k && brokenImageKeys.value.has(k)
}

function markBroken(img) {
  const k = imageKey(img)
  if (!k || brokenImageKeys.value.has(k)) return
  const next = new Set(brokenImageKeys.value)
  next.add(k)
  brokenImageKeys.value = next
}

function clearBrokenKey(img) {
  const k = imageKey(img)
  if (!k || !brokenImageKeys.value.has(k)) return
  const next = new Set(brokenImageKeys.value)
  next.delete(k)
  brokenImageKeys.value = next
}

async function removeBrokenImages() {
  const brokenIndexes = []
  form.images.forEach((img, i) => {
    if (isBroken(img)) brokenIndexes.push(i)
  })
  // De atrás hacia adelante para no alterar los índices de los demás
  for (let i = brokenIndexes.length - 1; i >= 0; i--) {
    await removeImage(brokenIndexes[i])
  }
  brokenImageKeys.value = new Set()
}

async function setPrimary(index) {
  // Quitar primary de todas
  form.images.forEach(i => i.is_primary = false)
  form.images[index].is_primary = true
}

// Drag & drop para reordenar imágenes
const dragIndex = ref(null)

function onDragStart(index) {
  dragIndex.value = index
}

function onDragOver(index) {
  // Prevenir default para permitir drop
}

function onDragEnd() {
  dragIndex.value = null
}

function onDrop(targetIndex) {
  if (dragIndex.value === null || dragIndex.value === targetIndex) {
    dragIndex.value = null
    return
  }

  const from = dragIndex.value
  const to = targetIndex

  // Mover la imagen
  const [moved] = form.images.splice(from, 1)
  form.images.splice(to, 0, moved)

  // Si la imagen movida era la principal, mantenerla como principal
  // Si no, la primera imagen se convierte en principal si no hay ninguna
  if (!form.images.some(i => i.is_primary)) {
    form.images[0].is_primary = true
  }

  dragIndex.value = null
}

async function handleSave() {
  saving.value = true
  try {
    // Convertir imágenes nuevas a base64
    const images = []
    for (const img of form.images) {
      if (img._new && img.file) {
        // Optimizar la imagen en el navegador antes de subirla (redimensiona a
        // máx. 1600 px y comprime). Así se evita el error 413 (Payload Too Large)
        // que ocurría al enviar fotos originales de cámara/teléfono sin comprimir.
        const base64 = await optimizeImageToBase64(img.file)
        images.push({
          _new: true,
          name: img.file.name,
          type: img.file.type,
          data: 'data:' + (img.file.type || 'image/jpeg') + ';base64,' + base64,
          is_primary: img.is_primary,
        })
      } else {
        images.push({
          id: img.id,
          _new: false,
          is_primary: img.is_primary,
        })
      }
    }

    // Resolver category_id a partir del slug seleccionado
    const selectedCat = categories.value.find(c => c.slug === form.category)
    const categoryId = selectedCat?.id || null

    // Variantes por dimensiones (unificado para todos los canales).
    // Si el editor no produce payload (sin variantes), enviamos combinaciones
    // vacías para que el API elimine las variantes existentes del producto.
    const builtOptions = variantEditorRef.value ? variantEditorRef.value.buildPayload() : null
    const variantOptions = builtOptions || {
      type1: null,
      type2: null,
      isAroma1: false,
      isAroma2: false,
      combinations: [],
    }

    await $fetch('/api/products/update', {
      method: 'PUT',
      body: {
        id: route.params.id,
        product: {
          name: form.name,
          subtitle: form.subtitle || null,
          sku: form.sku,
          slug: form.slug,
          description: form.description,
          long_description: form.long_description || null,
          price: parseFloat(form.price),
          stock: parseInt(form.stock) || 0,
          gtin: form.gtin || null,
          amazon_asin: form.amazon_asin || null,
          is_active: form.is_active,
          is_featured: form.is_featured,
          google_product_category: form.google_category || null,
          free_shipping: form.free_shipping,
          amazon_link: form.amazon_link || null,
          compare_at_price: form.compare_at_price ? parseFloat(form.compare_at_price) : null,
          cost_price: form.cost_price ? parseFloat(form.cost_price) : null,
          category_id: categoryId,
          sales_channel: form.sales_channel,
          badge: form.badge || null,
          prep_days_min: form.prep_days_min === '' || form.prep_days_min == null ? null : Number(form.prep_days_min),
          prep_days_max: form.prep_days_max === '' || form.prep_days_max == null ? null : Number(form.prep_days_max),
          personalization: form.personalization,
          min_order_quantity: Number(form.min_order_quantity) || 1,
          pack_label: form.pack_label || null,
          quantity_options: (form.quantity_options || '').trim()
            ? (form.quantity_options || '').trim().split(',').map(s => parseInt(s.trim(), 10)).filter(n => Number.isFinite(n) && n > 0)
            : null,
        },
        images,
        variantOptions,
      },
    })

    alert('✅ Cambios guardados')
    navigateTo('/products')
  } catch (e) {
    alert('Error: ' + (e.data?.message || e.message))
  } finally {
    saving.value = false
  }
}


// Formatear precio en MXN
function formatPrice(price) {
  return Number(price || 0).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

async function duplicateHere() {
  if (!confirm(`¿Duplicar "${product.value.name}"?`)) return
  try {
    await $fetch('/api/products/duplicate', {
      method: 'POST',
      body: { id: route.params.id },
    })
    alert('✅ Producto duplicado. Ve a la lista para editarlo.')
  } catch (e) {
    alert('Error al duplicar: ' + (e.data?.message || e.message))
  }
}

onMounted(async () => {
  // Cargar categorías y perfiles aromáticos en paralelo
  loadCategories()
  await loadScentProfiles()
  // Cargar el producto después de tener los perfiles aromáticos
  // para poder pre-seleccionar sus variantes correctamente
  loadProduct()
})
</script>
