<template>
  <div class="space-y-4">
    <!-- Interruptor principal -->
    <label class="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        :checked="value.enabled"
        @change="setEnabled($event.target.checked)"
        class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-400"
      />
      <span class="text-sm font-medium text-gray-700">Este producto permite personalización</span>
    </label>

    <template v-if="value.enabled">
      <!-- Campos de texto -->
      <div class="border border-gray-100 rounded-xl p-4 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-gray-800">📝 Campos de texto</h3>
          <button
            type="button"
            @click="addTextField"
            class="text-xs font-medium text-primary-600 hover:text-primary-700"
          >+ Agregar campo</button>
        </div>
        <p class="text-xs text-gray-400">
          El cliente escribirá un valor en cada campo (ej. "Escribe los nombres", "Fecha del evento").
        </p>

        <div v-if="textFields.length === 0" class="text-sm text-gray-400">Aún no hay campos de texto.</div>

        <div v-for="(f, fi) in textFields" :key="fi" class="flex items-center gap-2">
          <input
            :value="f.label"
            @input="setTextField(fi, 'label', $event.target.value)"
            type="text"
            placeholder="Etiqueta (ej. Escribe los nombres)"
            class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
          />
          <label class="flex items-center gap-1.5 text-xs text-gray-500 whitespace-nowrap cursor-pointer select-none">
            <input
              type="checkbox"
              :checked="f.required"
              @change="setTextField(fi, 'required', $event.target.checked)"
              class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-400"
            />
            Obligatorio
          </label>
          <button
            type="button"
            @click="removeTextField(fi)"
            class="text-gray-400 hover:text-red-500 px-1"
            aria-label="Quitar campo"
          >✕</button>
        </div>
      </div>

      <!-- Subida de archivo -->
      <div class="border border-gray-100 rounded-xl p-4 space-y-3">
        <label class="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            :checked="file.enabled"
            @change="setFile('enabled', $event.target.checked)"
            class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-400"
          />
          <span class="text-sm font-semibold text-gray-800">📎 Permitir subir archivo</span>
        </label>

        <template v-if="file.enabled">
          <p class="text-xs text-gray-400">El cliente podrá subir su diseño o arte para personalizar el producto.</p>
          <div class="flex flex-wrap items-center gap-4">
            <label class="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                :checked="file.types.includes('image')"
                @change="toggleFileType('image', $event.target.checked)"
                class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-400"
              />
              Imagen (JPG, PNG)
            </label>
            <label class="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                :checked="file.types.includes('pdf')"
                @change="toggleFileType('pdf', $event.target.checked)"
                class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-400"
              />
              PDF
            </label>
            <label class="flex items-center gap-2 text-sm text-gray-600">
              Tamaño máx:
              <input
                :value="file.maxMb"
                @input="setFile('maxMb', $event.target.value)"
                type="number"
                min="1"
                class="w-20 px-2 py-1.5 rounded-md border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
              />
              MB
            </label>
            <label class="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                :checked="file.required"
                @change="setFile('required', $event.target.checked)"
                class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-400"
              />
              Obligatorio
            </label>
          </div>
        </template>
      </div>
    </template>

    <p v-else class="text-xs text-gray-400">
      💡 Actívalo para recuerdos o productos que el cliente deba personalizar (texto y/o archivo).
    </p>
  </div>
</template>

<script setup>
/**
 * 🎨 Editor de Personalización de Producto (Recuerdos / Eventos)
 * ------------------------------------------------------------
 * Configura, por producto:
 *   - Campos de texto libres (varios), cada uno con etiqueta y obligatoriedad.
 *   - Subida de archivo (imagen/PDF) con tamaño máximo en MB.
 *
 * Se guarda en products.personalization (JSONB). Formato:
 * {
 *   enabled: boolean,
 *   textFields: [{ label: string, required: boolean }],
 *   file: { enabled, types: ['image','pdf'], maxMb, required }
 * }
 */
import { computed } from 'vue'

const props = defineProps({
  /** Objeto de personalización (v-model) */
  modelValue: { type: Object, default: null },
})

const emit = defineEmits(['update:modelValue'])

const DEFAULTS = {
  enabled: false,
  textFields: [],
  file: { enabled: false, types: ['image', 'pdf'], maxMb: 5, required: false },
}

// Estado normalizado (siempre con la estructura completa).
const value = computed(() => {
  const v = props.modelValue || {}
  return {
    enabled: !!v.enabled,
    textFields: Array.isArray(v.textFields) ? v.textFields : [],
    file: {
      enabled: !!v.file?.enabled,
      types: Array.isArray(v.file?.types) && v.file.types.length ? v.file.types : ['image', 'pdf'],
      maxMb: v.file?.maxMb ?? 5,
      required: !!v.file?.required,
    },
  }
})

const textFields = computed(() => value.value.textFields)
const file = computed(() => value.value.file)

function emitValue(next) {
  emit('update:modelValue', { ...DEFAULTS, ...next })
}

function setEnabled(enabled) {
  emitValue({ ...value.value, enabled })
}

function addTextField() {
  emitValue({
    ...value.value,
    textFields: [...value.value.textFields, { label: '', required: false }],
  })
}

function setTextField(index, field, val) {
  const next = value.value.textFields.map((f, i) => i === index ? { ...f, [field]: val } : f)
  emitValue({ ...value.value, textFields: next })
}

function removeTextField(index) {
  emitValue({
    ...value.value,
    textFields: value.value.textFields.filter((_, i) => i !== index),
  })
}

function setFile(field, val) {
  emitValue({ ...value.value, file: { ...value.value.file, [field]: val } })
}

function toggleFileType(type, checked) {
  const set = new Set(value.value.file.types)
  if (checked) set.add(type)
  else set.delete(type)
  const types = Array.from(set)
  // Que nunca quede vacío (al menos un tipo permitido).
  emitValue({ ...value.value, file: { ...value.value.file, types: types.length ? types : ['image'] } })
}
</script>
