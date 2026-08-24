<template>
  <div class="space-y-6">
    <!-- Encabezado -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">🎨 Paleta de Colores</h2>
        <p class="text-sm text-gray-400 mt-0.5">
          Personaliza los colores de tu tienda. Los cambios se aplican en tiempo real en todo el sitio.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="resetToDefault"
          class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Restablecer
        </button>
        <button
          @click="saveTheme"
          :disabled="saving"
          class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <svg v-if="!saving" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          {{ saving ? 'Guardando...' : 'Guardar paleta' }}
        </button>
      </div>
    </div>

    <!-- Vista previa en vivo -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-lg">👁️</span>
          <div>
            <h3 class="text-sm font-semibold text-gray-900">Vista previa de la tienda</h3>
            <p class="text-xs text-gray-400">Así se verá tu portada con la paleta actual</p>
          </div>
        </div>
        <span class="text-[11px] text-gray-400 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
          Vista previa en vivo · cambios instantáneos
        </span>
      </div>
      <div class="p-4 bg-gray-100">
        <ThemePreview :theme="theme" />
      </div>
    </div>

    <!-- Editor de colores -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Color Primario -->
      <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg flex-shrink-0" :style="{ backgroundColor: theme.primary[500] }"></span>
          <div>
            <h3 class="text-sm font-semibold text-gray-900">Color Primario</h3>
            <p class="text-xs text-gray-400">Botones, enlaces, acentos principales</p>
          </div>
        </div>
        <div class="p-6 space-y-4">
          <ColorScaleEditor
            v-model="theme.primary"
            label="Verde primario"
            :default-scale="defaultTheme.primary"
          />
        </div>
      </div>

      <!-- Color Acento -->
      <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg flex-shrink-0" :style="{ backgroundColor: theme.amber[500] }"></span>
          <div>
            <h3 class="text-sm font-semibold text-gray-900">Color Acento</h3>
            <p class="text-xs text-gray-400">Destacados, badges, elementos de énfasis</p>
          </div>
        </div>
        <div class="p-6 space-y-4">
          <ColorScaleEditor
            v-model="theme.amber"
            label="Ámbar acento"
            :default-scale="defaultTheme.amber"
          />
        </div>
      </div>

      <!-- Color Tierra -->
      <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg flex-shrink-0" :style="{ backgroundColor: theme.earth[500] }"></span>
          <div>
            <h3 class="text-sm font-semibold text-gray-900">Color Tierra</h3>
            <p class="text-xs text-gray-400">Textos, fondos neutros, bordes</p>
          </div>
        </div>
        <div class="p-6 space-y-4">
          <ColorScaleEditor
            v-model="theme.earth"
            label="Tono tierra"
            :default-scale="defaultTheme.earth"
          />
        </div>
      </div>
    </div>

    <!-- Opciones avanzadas -->
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
        <span class="text-lg">⚙️</span>
        <div>
          <h3 class="text-sm font-semibold text-gray-900">Opciones avanzadas</h3>
          <p class="text-xs text-gray-400">Configuración adicional del tema</p>
        </div>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Color de fondo del sitio</label>
          <div class="flex items-center gap-3">
            <input type="color" v-model="theme.background" class="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
            <input type="text" v-model="theme.background" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono" />
          </div>
          <p class="text-xs text-gray-400 mt-1">Color de fondo general de la tienda</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Color de texto principal</label>
          <div class="flex items-center gap-3">
            <input type="color" v-model="theme.textColor" class="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
            <input type="text" v-model="theme.textColor" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono" />
          </div>
          <p class="text-xs text-gray-400 mt-1">Color de texto principal del sitio</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ColorScaleEditor from './ColorScaleEditor.vue'
import ThemePreview from './ThemePreview.vue'

const supabase = useSupabase()
const supabaseAdmin = useSupabaseAdmin()

const saving = ref(false)
const loading = ref(true)

// Paleta por defecto (coincide con el CSS actual)
const defaultTheme = {
  primary: {
    50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
    400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
    800: '#166534', 900: '#14532d', 950: '#052e16',
  },
  amber: {
    50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
    400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
    800: '#92400e', 900: '#78350f',
  },
  earth: {
    50: '#faf8f5', 100: '#f0ece4', 200: '#e0d7c8', 300: '#ccbda4',
    400: '#b8a080', 500: '#a88a66', 600: '#9a7654', 700: '#815f46',
    800: '#6a4e3e', 900: '#584236', 950: '#2f221b',
  },
  background: '#f0fdf4',
  textColor: '#584236',
}

// Tema editable
const theme = reactive({
  primary: { ...defaultTheme.primary },
  amber: { ...defaultTheme.amber },
  earth: { ...defaultTheme.earth },
  background: defaultTheme.background,
  textColor: defaultTheme.textColor,
})

async function loadTheme() {
  loading.value = true
  try {
    const client = supabaseAdmin || supabase
    const { data, error } = await client
      .from('site_config')
      .select('value')
      .eq('key', 'theme')
      .single()
    if (error) throw error
    if (data?.value) {
      const saved = data.value
      if (saved.primary) Object.assign(theme.primary, saved.primary)
      if (saved.amber) Object.assign(theme.amber, saved.amber)
      if (saved.earth) Object.assign(theme.earth, saved.earth)
      if (saved.background) theme.background = saved.background
      if (saved.textColor) theme.textColor = saved.textColor
    }
  } catch (e) {
    console.warn('No se pudo cargar el tema, usando valores por defecto:', e.message)
  } finally {
    loading.value = false
  }
}

async function saveTheme() {
  saving.value = true
  try {
    const client = supabaseAdmin || supabase
    const { error } = await client
      .from('site_config')
      .upsert(
        {
          key: 'theme',
          value: {
            primary: { ...theme.primary },
            amber: { ...theme.amber },
            earth: { ...theme.earth },
            background: theme.background,
            textColor: theme.textColor,
          },
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'key' }
      )
    if (error) throw error
    alert('✅ Paleta de colores guardada correctamente')
  } catch (e) {
    console.error('Error guardando tema:', e)
    alert('Error al guardar el tema: ' + e.message)
  } finally {
    saving.value = false
  }
}

function resetToDefault() {
  if (!confirm('¿Restablecer la paleta de colores a los valores por defecto?')) return
  theme.primary = { ...defaultTheme.primary }
  theme.amber = { ...defaultTheme.amber }
  theme.earth = { ...defaultTheme.earth }
  theme.background = defaultTheme.background
  theme.textColor = defaultTheme.textColor
}

onMounted(loadTheme)
</script>
