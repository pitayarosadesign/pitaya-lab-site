<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink to="/products" class="text-gray-400 hover:text-gray-600 transition-colors">
        ← Volver
      </NuxtLink>
      <h1 class="text-2xl font-bold text-gray-900">Nuevo Producto</h1>
    </div>

    <form @submit.prevent="handleSave" class="space-y-6">
      <!-- INFO BASICA -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">Información del Producto</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del producto *</label>
            <input v-model="form.name" type="text" required placeholder="Ej: Vela Aromática Clásica" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo <span class="text-gray-400 font-normal">(opcional — se muestra junto al nombre en el catálogo)</span></label>
            <input v-model="form.subtitle" type="text" placeholder="Ej. Edición limitada, Para difusores, 15 ml…" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
            <input v-model="form.sku" type="text" required placeholder="Ej: VCL-250" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-mono" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
            <div class="flex items-center gap-2">
              <select v-model="form.category" required class="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all">
                <option value="">Seleccionar</option>
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
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Canal de venta *</label>
          <select v-model="form.sales_channel" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all">
            <option value="directa">Menudeo (tienda pública / catálogo de la web)</option>
            <option value="evento">Eventos / Recuerdos (solo cotizador /b2b)</option>
            <option value="mayoreo">Comercial por volumen (reservado a futuro)</option>
          </select>
          <p class="text-xs text-gray-400 mt-1">
            💡 Menudeo: tu venta 1-a-1 de fabricante. Los de <b>Eventos</b> NO salen en el catálogo público
            ni en los feeds: solo aparecen en el cotizador de recuerdos (/b2b) con su aroma y precio por pieza.
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción corta</label>
          <textarea v-model="form.description" rows="2" placeholder="Descripción breve para tarjetas de producto" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción larga</label>
          <textarea v-model="form.long_description" rows="4" placeholder="Descripción detallada para la página del producto" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>

      <!-- IMAGENES -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">📸 Imágenes del Producto</h2>
        <p class="text-sm text-gray-400">Sube imágenes del producto. La primera será la imagen principal.</p>
        <div class="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary-300 hover:bg-primary-50/30 transition-all cursor-pointer" @click="triggerUpload" @dragover.prevent @drop.prevent="handleDrop">
          <input ref="fileInput" type="file" multiple accept="image/png,image/jpeg,image/webp" class="hidden" @change="handleFileSelect" />
          <svg class="w-10 h-10 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <p class="text-sm text-gray-500">Arrastra imágenes aquí o <span class="text-primary-600 font-medium">haz clic para subir</span></p>
          <p class="text-xs text-gray-400 mt-1">PNG, JPG o WebP · Max 5MB</p>
        </div>
        <div v-if="form.images.length > 0" class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
          <div v-for="(img, index) in form.images" :key="index" class="relative group aspect-square rounded-lg overflow-hidden border border-gray-200" :class="{ 'ring-2 ring-primary-500': index === 0 }">
            <img :src="img.preview" :alt="'Imagen ' + (index + 1)" class="w-full h-full object-cover" />
            <div v-if="index === 0" class="absolute top-1 left-1 bg-primary-600 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">Principal</div>
            <button type="button" @click="removeImage(index)" class="absolute top-1 right-1 bg-white/90 text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <button v-if="index > 0" type="button" @click="setPrimary(index)" class="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-[10px] py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Hacer principal</button>
          </div>
        </div>
      </div>

      <!-- PRECIOS -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">Precios</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Precio de venta *</label>
            <div class="relative">
              <span class="absolute left-3 top-2.5 text-gray-400">$</span>
              <input v-model="form.price" type="number" required min="0" step="0.01" placeholder="0.00" class="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Precio comparativa</label>
            <div class="relative">
              <span class="absolute left-3 top-2.5 text-gray-400">$</span>
              <input v-model="form.compare_at_price" type="number" min="0" step="0.01" placeholder="0.00" class="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
            </div>
            <p class="text-xs text-gray-400 mt-1">Precio tachado "antes"</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Costo</label>
            <div class="relative">
              <span class="absolute left-3 top-2.5 text-gray-400">$</span>
              <input v-model="form.cost_price" type="number" min="0" step="0.01" placeholder="0.00" class="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
            </div>
            <p class="text-xs text-gray-400 mt-1">Solo visible en admin (margen de ganancia)</p>
          </div>
        </div>
      </div>

      <!-- INVENTARIO -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">Inventario</h2>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
          <input v-model="form.stock" type="number" min="0" placeholder="0" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
        </div>
      </div>

      <!-- ENVIO -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">Configuración de Envío</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label><input v-model="form.weight_kg" type="number" min="0" step="0.01" placeholder="0.00" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Largo (cm)</label><input v-model="form.length_cm" type="number" min="0" step="0.1" placeholder="0" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Ancho (cm)</label><input v-model="form.width_cm" type="number" min="0" step="0.1" placeholder="0" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Alto (cm)</label><input v-model="form.height_cm" type="number" min="0" step="0.1" placeholder="0" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div>
        </div>
        <label class="flex items-center gap-2">
          <input v-model="form.free_shipping" type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
          <span class="text-sm text-gray-700">Producto elegible para envío gratis</span>
        </label>
      </div>

      <!-- SEO & CATALOGOS -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">🌐 SEO & Catálogos de Venta</h2>
        <p class="text-sm text-gray-400">Configura cómo aparece tu producto en Google, Pinterest, Instagram y Amazon.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Slug (URL del producto)</label>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-400 font-mono">pitayalab.com.mx/productos/</span>
              <input v-model="form.slug" type="text" placeholder="vela-aromatica-clasica" class="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-mono text-sm" />
            </div>
            <p class="text-xs text-gray-400 mt-1">Se genera automáticamente desde el nombre</p>
          </div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Meta Title</label><input v-model="form.meta_title" type="text" placeholder="Vela Aromática Clásica | PITAYA LAB" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Meta Description</label><input v-model="form.meta_description" type="text" placeholder="Vela de soya perfumada 100% natural..." class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div>
        </div>

        <!-- Google Merchant -->
        <div class="pt-4 border-t border-gray-100">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-lg">🐱</span>
            <h3 class="text-sm font-semibold text-gray-700">Google Merchant Center</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Categoría Google</label>
              <select v-model="form.google_category" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all">
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
            <div><label class="block text-sm font-medium text-gray-700 mb-1">GTIN (código barras)</label><input v-model="form.gtin" type="text" placeholder="7501234567890" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-mono" /></div>
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Condición</label>
              <select v-model="form.google_condition" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all">
                <option value="new">Nuevo</option>
                <option value="refurbished">Reacondicionado</option>
                <option value="used">Usado</option>
              </select>
            </div>
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Marca</label><input v-model="form.brand" type="text" placeholder="PITAYA LAB" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div>
          </div>
        </div>

        <!-- Pinterest/Instagram -->
        <div class="pt-4 border-t border-gray-100">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-lg">📌</span>
            <h3 class="text-sm font-semibold text-gray-700">Pinterest & Instagram Shopping</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Categoría Pinterest</label>
              <select v-model="form.pinterest_category" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all">
                <option value="">Seleccionar</option>
                <option value="Home Decor">Hogar > Decoración</option>
                <option value="Candles & Home Fragrance">Velas y Fragancias</option>
                <option value="Health & Wellness">Salud y Bienestar</option>
              </select>
            </div>
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Tipo Instagram</label>
              <select v-model="form.instagram_type" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all">
                <option value="">Seleccionar</option>
                <option value="product">Producto</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Amazon -->
        <div class="pt-4 border-t border-gray-100">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-lg">🛒</span>
            <h3 class="text-sm font-semibold text-gray-700">Amazon</h3>
            <span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Canal secundario</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label class="block text-sm font-medium text-gray-700 mb-1">ASIN</label><input v-model="form.amazon_asin" type="text" placeholder="B0XXXXXX" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-mono" /></div>
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Precio Amazon</label><div class="relative"><span class="absolute left-3 top-2.5 text-gray-400">$</span><input v-model="form.amazon_price" type="number" min="0" step="0.01" placeholder="0.00" class="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div></div>
            <div><label class="block text-sm font-medium text-gray-700 mb-1">Link Amazon</label><input v-model="form.amazon_link" type="url" placeholder="https://amazon.com.mx/..." class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" /></div>
          </div>
          <label class="flex items-center gap-2 mt-3">
            <input v-model="form.sync_amazon" type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <span class="text-sm text-gray-700">Sincronizar inventario con Amazon</span>
          </label>
        </div>
      </div>

      <!-- Variantes -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">🧩 Variantes</h2>
          <p class="text-sm text-gray-400 mt-0.5">Define si este producto tiene opciones de compra (aroma, tamaño, etc.)</p>
        </div>

        <!-- Toggle: ¿tiene variantes? -->
        <div class="flex items-center gap-4">
          <span class="text-sm font-medium text-gray-700">¿Este producto tiene variantes?</span>
          <div class="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              type="button"
              @click="hasVariants = false"
              class="px-4 py-2 text-sm font-medium transition-colors"
              :class="!hasVariants ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
            >No</button>
            <button
              type="button"
              @click="hasVariants = true"
              class="px-4 py-2 text-sm font-medium transition-colors"
              :class="hasVariants ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
            >Sí</button>
          </div>
        </div>

        <!-- Configuración de variantes (solo si Sí) -->
        <template v-if="hasVariants">
          <!-- Lista de dimensiones (hasta 2) -->
          <div v-for="(dim, di) in dimensions" :key="di" class="border border-gray-100 rounded-xl p-4 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-semibold text-gray-800">
                {{ dim.type === 'Aroma' ? '🌸 Aroma' : (dim.customName || 'Opción') }}
              </h3>
              <button type="button" @click="removeDimension(di)" class="text-xs text-red-500 hover:text-red-700 font-medium">Quitar</button>
            </div>

            <!-- Tipo de dimensión -->
            <div class="flex items-center gap-2">
              <label class="text-xs font-medium text-gray-500 w-24">Tipo</label>
              <select v-model="dim.type" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm">
                <option value="Aroma">Aroma</option>
                <option value="custom">Otra (personalizada)</option>
              </select>
            </div>

            <!-- Si es personalizada, pedir nombre del tipo -->
            <div v-if="dim.type === 'custom'" class="flex items-center gap-2">
              <label class="text-xs font-medium text-gray-500 w-24">Nombre</label>
              <input v-model="dim.customName" type="text" placeholder="Ej: Tamaño, Color, Presentación…" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm" />
            </div>

            <!-- Valores de la dimensión -->
            <div class="flex items-start gap-2">
              <label class="text-xs font-medium text-gray-500 w-24 pt-2">Valores</label>
              <div class="flex-1 space-y-2">
                <!-- Selector de aromas (si tipo = Aroma) -->
                <div v-if="dim.type === 'Aroma'">
                  <div v-if="loadingProfiles" class="text-sm text-gray-400">Cargando aromas...</div>
                  <div v-else-if="allScents.length === 0" class="text-sm text-gray-400">No hay perfiles aromáticos configurados.</div>
                  <div v-else class="flex flex-wrap gap-2">
                    <button
                      v-for="scent in allScents"
                      :key="scent.id"
                      type="button"
                      @click="toggleDimScent(di, scent)"
                      class="px-3 py-1.5 rounded-lg border text-sm transition-all"
                      :class="dim.scentIds.includes(scent.id)
                        ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'"
                    >
                      {{ scent.emoji }} {{ scent.name }}
                    </button>
                  </div>
                </div>

                <!-- Valores personalizados (si tipo = custom) -->
                <div v-else>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(val, vi) in dim.customValues"
                      :key="vi"
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 border border-primary-200 text-primary-700 text-sm"
                    >
                      {{ val }}
                      <button type="button" @click="dim.customValues.splice(vi, 1)" class="text-primary-400 hover:text-primary-700">✕</button>
                    </span>
                  </div>
                  <div class="flex gap-2 mt-2">
                    <input
                      v-model="dim.newValue"
                      type="text"
                      :placeholder="`Ej: ${dim.customName || 'valor'}…`"
                      class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
                      @keyup.enter="addDimValue(di)"
                    />
                    <button type="button" @click="addDimValue(di)" class="px-3 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700">+ Agregar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Botón agregar dimensión -->
          <button
            v-if="dimensions.length < 2"
            type="button"
            @click="addDimension()"
            class="text-sm font-medium text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
          >
            + Agregar {{ dimensions.length === 0 ? 'dimensión' : '2ª dimensión' }} (ej. Aroma, Tamaño…)
          </button>

          <!-- Combinaciones generadas -->
          <div v-if="generatedCombinations.length > 0" class="border border-gray-100 rounded-xl overflow-hidden">
            <div class="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <h3 class="text-sm font-semibold text-gray-800">Combinaciones ({{ generatedCombinations.length }})</h3>
              <p class="text-xs text-gray-400 mt-0.5">Cada combinación tendrá su propio precio, stock y SKU en la tienda.</p>
            </div>
            <div class="divide-y divide-gray-100">
              <div v-for="(combo, ci) in generatedCombinations" :key="ci" class="px-4 py-3 flex items-center gap-3">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-800">{{ combo.label }}</p>
                  <p class="text-[10px] text-gray-400 font-mono">{{ combo.sku }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <input
                    v-model="combo.price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Precio"
                    class="w-24 px-2 py-1.5 rounded-md border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
                  />
                  <input
                    v-model="combo.stock"
                    type="number"
                    min="0"
                    placeholder="Stock"
                    class="w-20 px-2 py-1.5 rounded-md border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>

        <p v-if="!hasVariants" class="text-xs text-gray-400">
          💡 Sin variantes, el producto se vende tal cual con su precio y stock generales.
        </p>
      </div>

      <!-- BOTONES -->
      <div class="flex items-center justify-end gap-3">
        <NuxtLink to="/products" class="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">Cancelar</NuxtLink>
        <button type="submit" class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors">Guardar Producto</button>
      </div>
    </form>

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
const supabase = useSupabase()
const fileInput = ref(null)

// Categorías cargadas dinámicamente desde la base de datos
const categories = ref([])

// Modal de nueva categoría
const showCategoryModal = ref(false)
const creatingCategory = ref(false)
const newCategory = reactive({ name: '', slug: '', description: '' })

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

const form = reactive({
  name: '',
  subtitle: '',
  sku: '',
  category: '',
  sales_channel: 'directa',
  description: '',
  long_description: '',
  images: [],
  price: '',
  compare_at_price: '',
  cost_price: '',
  stock: 0,
  weight_kg: '',
  length_cm: '',
  width_cm: '',
  height_cm: '',
  free_shipping: false,
  slug: '',
  meta_title: '',
  meta_description: '',
  google_category: '',
  gtin: '',
  google_condition: 'new',
  brand: 'PITAYA LAB',
  pinterest_category: '',
  instagram_type: '',
  amazon_asin: '',
  amazon_price: '',
  amazon_link: '',
  sync_amazon: false,
  variants: [],
})

// ===== Aromas disponibles (perfiles aromáticos) =====
// ===== Variantes flexibles (dimensiones) =====
const allScents = ref([])
const loadingProfiles = ref(false)

// ¿El producto tiene variantes?
const hasVariants = ref(false)

// Dimensión 1 (obligatoria si hay variantes)
// Lista de dimensiones de variante (hasta 2). Cada dimensión puede ser
// 'Aroma' o personalizada (ej. Tamaño, Color). El usuario las agrega
// libremente; no se fuerza ninguna.
const dimensions = ref([])

// Agregar una dimensión vacía (máx 2)
function addDimension() {
  if (dimensions.value.length >= 2) return
  dimensions.value.push({
    type: 'custom',       // 'Aroma' | 'custom'
    customName: '',       // nombre si type === 'custom' (ej. 'Tamaño')
    scentIds: [],         // ids de aromas seleccionados (si type === 'Aroma')
    customValues: [],     // valores personalizados (si type === 'custom')
    newValue: '',         // input temporal para agregar valor
  })
}

// Quitar una dimensión por índice
function removeDimension(di) {
  dimensions.value.splice(di, 1)
}

// Valores efectivos de una dimensión (para combinaciones)
function dimValues(dim) {
  return dim.type === 'Aroma' ? dim.scentIds : dim.customValues
}

// Nombre legible del tipo de una dimensión
function dimTypeName(dim) {
  if (dim.type === 'Aroma') return 'Aroma'
  return dim.customName || 'Opción'
}

// Valor legible de un id de aroma
function scentNameById(id) {
  const s = allScents.value.find(x => x.id === id)
  return s ? s.name : id
}

// Combinaciones generadas (producto cartesiano de las dimensiones)
const generatedCombinations = computed(() => {
  const dims = dimensions.value
  if (dims.length === 0) return []

  const baseSku = form.sku || 'PROD'
  const combos = []

  // Producto cartesiano de los valores de cada dimensión
  const build = (idx, acc) => {
    if (idx === dims.length) {
      const labels = acc.map((a, i) => dims[i].type === 'Aroma' ? scentNameById(a) : String(a))
      const label = labels.join(' · ')
      const skuSuffix = labels.map(slugify).join('-')
      combos.push({
        label,
        values: [...acc],
        sku: `${baseSku}-${skuSuffix}`,
        price: '',
        stock: '',
      })
      return
    }
    const vals = dimValues(dims[idx])
    vals.forEach(v => build(idx + 1, [...acc, v]))
  }

  build(0, [])
  return combos
})

function slugify(str) {
  return String(str || '').toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

// Toggle de aroma en una dimensión
function toggleDimScent(di, scent) {
  const dim = dimensions.value[di]
  if (!dim) return
  const idx = dim.scentIds.indexOf(scent.id)
  if (idx >= 0) dim.scentIds.splice(idx, 1)
  else dim.scentIds.push(scent.id)
}

// Agregar valor personalizado a una dimensión
function addDimValue(di) {
  const dim = dimensions.value[di]
  if (!dim) return
  const v = dim.newValue.trim()
  if (v && !dim.customValues.includes(v)) dim.customValues.push(v)
  dim.newValue = ''
}

watch(() => form.name, (name) => {
  if (name && !form.slug) {
    form.slug = name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
  }
})

function triggerUpload() { fileInput.value?.click() }
function handleFileSelect(e) { addImages(Array.from(e.target.files || [])) }
function handleDrop(e) { addImages(Array.from(e.dataTransfer.files || [])) }

function addImages(files) {
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue
    if (file.size > 5 * 1024 * 1024) continue
    form.images.push({ file, preview: URL.createObjectURL(file), name: file.name })
  }
}

function removeImage(index) {
  const img = form.images[index]
  if (img?.preview) URL.revokeObjectURL(img.preview)
  form.images.splice(index, 1)
}

function setPrimary(index) {
  const img = form.images.splice(index, 1)[0]
  form.images.unshift(img)
}

// ===== Aromas disponibles (perfiles aromáticos) =====
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

// Construye el payload de variantes flexibles para el API de creación.
// Devuelve null si el producto no tiene variantes.
function buildVariantOptionsPayload() {
  if (!hasVariants.value) return null

  const combos = generatedCombinations.value
  if (combos.length === 0) return null

  const dims = dimensions.value

  return {
    // Tipos de cada dimensión (hasta 2)
    type1: dims[0] ? dimTypeName(dims[0]) : null,
    type2: dims[1] ? dimTypeName(dims[1]) : null,
    // Si la dimensión es Aroma, guardamos también el id del perfil aromático
    // para poder vincular la variante a la fragancia (tarjeta olfativa, etc.)
    isAroma1: dims[0]?.type === 'Aroma',
    isAroma2: dims[1]?.type === 'Aroma',
    combinations: combos.map(c => ({
      value1: c.values[0] ?? null,
      value2: c.values[1] ?? null,
      label: c.label,
      sku: c.sku,
      price: c.price ? parseFloat(c.price) : null,
      stock: c.stock !== '' ? parseInt(c.stock) || 0 : 0,
    })),
  }
}

async function handleSave() {
  try {
    // Resolver category_id desde las categorías cargadas
    const selectedCat = categories.value.find(c => c.slug === form.category)
    const categoryId = selectedCat?.id || null

    // Preparar imágenes como base64 para el API.
    // Se optimizan en el navegador (redimensiona a máx. 1600 px y comprime)
    // antes de subirlas, para evitar el error 413 (Payload Too Large) con
    // fotos originales de cámara/teléfono.
    const images = []
    for (const img of form.images) {
      const base64 = await optimizeImageToBase64(img.file)
      images.push({
        name: img.file.name,
        type: img.file.type,
        data: 'data:' + (img.file.type || 'image/jpeg') + ';base64,' + base64,
      })
    }

    const { data, error } = await $fetch('/api/products/create', {
      method: 'POST',
      body: {
        product: {
          sku: form.sku,
          name: form.name,
          slug: form.slug,
          subtitle: form.subtitle || null,
          description: form.description,
          long_description: form.long_description,
          category_id: categoryId,
          sales_channel: form.sales_channel,
          price: parseFloat(form.price),
          compare_at_price: form.compare_at_price ? parseFloat(form.compare_at_price) : null,
          cost_price: form.cost_price ? parseFloat(form.cost_price) : null,
          stock: parseInt(form.stock) || 0,
          weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
          length_cm: form.length_cm ? parseFloat(form.length_cm) : null,
          width_cm: form.width_cm ? parseFloat(form.width_cm) : null,
          height_cm: form.height_cm ? parseFloat(form.height_cm) : null,
          free_shipping: form.free_shipping,
          google_product_category: form.google_category,
          gtin: form.gtin,
          google_condition: form.google_condition,
          brand: form.brand,
          pinterest_product_category: form.pinterest_category,
          instagram_product_type: form.instagram_type,
          amazon_asin: form.amazon_asin,
          amazon_price: form.amazon_price ? parseFloat(form.amazon_price) : null,
          amazon_link: form.amazon_link,
          sync_amazon: form.sync_amazon,
          is_active: true,
          published_at: new Date().toISOString(),
        },
        images,
        // Variantes flexibles (dimensiones + combinaciones)
        variantOptions: buildVariantOptionsPayload(),
      },
    })

    if (error) throw new Error(error)
    await navigateTo('/products')
  } catch (e) {
    console.error('Error:', e)
    alert('Error al guardar: ' + e.message)
  }
}


onMounted(async () => {
  await loadCategories()
  loadScentProfiles()
})

onUnmounted(() => {
  form.images.forEach(img => { if (img.preview) URL.revokeObjectURL(img.preview) })
})
</script>
