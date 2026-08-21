<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <div class="flex flex-col md:flex-row items-start md:items-center gap-3">
      <!-- Preview de la imagen -->
      <div class="relative w-full md:w-40 h-28 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0 flex items-center justify-center">
        <img
          v-if="modelValue"
          :key="modelValue"
          :src="modelValue"
          :alt="label || 'Vista previa'"
          class="w-full h-full object-cover"
          :class="{ 'editor-img-error': uploadFailed }"
          @error="uploadFailed = true"
        />
        <span v-if="uploadFailed && modelValue" class="absolute inset-0 flex items-center justify-center bg-red-50/90 text-red-500 text-[10px] text-center px-2">⚠️ Imagen no carga</span>
        <span v-if="!modelValue" class="text-gray-300 text-2xl">🖼️</span>
      </div>

      <div class="flex-1 space-y-2 w-full">
        <div class="flex flex-wrap items-center gap-2">
          <input
            :value="modelValue"
            @input="emit('update:modelValue', $event.target.value)"
            type="text"
            class="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono"
            :placeholder="placeholder || 'https://... o /images/...'"
          />
          <input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" class="hidden" ref="fileInput" @change="onFile" />
          <button
            type="button"
            @click="triggerUpload"
            class="px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-100 transition-colors"
            :disabled="uploading"
          >{{ uploading ? 'Subiendo...' : '📷 Subir imagen' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const uploading = ref(false)
const uploadFailed = ref(false)

// Cuando cambia la URL (manual o por upload), reiniciamos el flag de error
watch(() => props.modelValue, () => { uploadFailed.value = false })

function triggerUpload() {
  fileInput.value?.click()
}

async function onFile(event) {
  const file = event.target.files?.[0]
  if (!file) return
  uploading.value = true
  try {
    // Comprimir/redimensionar la imagen si es necesario (mismo criterio que el editor)
    const processed = await compressImage(file)
    const base64 = await fileToBase64(processed)
    const res = await $fetch('/api/site/upload-media', {
      method: 'POST',
      body: { file: { name: processed.name, type: processed.type, data: base64 } },
    })
    if (res?.url) {
      emit('update:modelValue', res.url)
    } else {
      alert('No se pudo subir el archivo')
    }
  } catch (e) {
    console.error('Error subiendo media:', e)
    alert('Error al subir el archivo: ' + e.message)
  } finally {
    uploading.value = false
    event.target.value = ''
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Compresión simple: si la imagen pesa demasiado, la redimensionamos a máx. 1920px.
function compressImage(file) {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) return resolve(file)
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const MAX = 1920
      if (img.width <= MAX && img.height <= MAX) return resolve(file)
      const scale = Math.min(MAX / img.width, MAX / img.height)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((blob) => {
        const base = file.name.replace(/\.[^.]+$/, '')
        resolve(new File([blob], `${base}.jpg`, { type: 'image/jpeg' }))
      }, 'image/jpeg', 0.85)
    }
    img.onerror = () => resolve(file)
    img.src = url
  })
}
</script>

<style scoped>
/* Marca visual para imágenes que fallan al cargar en las vistas previas del editor */
.editor-img-error {
  opacity: 0.15;
}
</style>
