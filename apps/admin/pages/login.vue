<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-amber-50 p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-3">
          <img
            src="/images/logo-pitayalab.png"
            alt="PITAYA LAB"
            class="h-12 w-12 rounded-full object-cover shadow-lg"
          />
          <div class="text-left">
            <h1 class="text-xl font-bold text-gray-900">PITAYA LAB</h1>
            <p class="text-xs text-gray-500">Panel de Administración</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Card de login -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
        <p class="text-sm text-gray-500 mb-8">
          Accede al panel de administración de tu tienda
        </p>

        <!-- Pestañas: Password / Magic Link -->
        <div class="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            @click="loginMode = 'password'"
            class="flex-1 py-2 rounded-md text-sm font-medium transition-all"
            :class="loginMode === 'password' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'"
          >
            Contraseña
          </button>
          <button
            @click="loginMode = 'magic'"
            class="flex-1 py-2 rounded-md text-sm font-medium transition-all"
            :class="loginMode === 'magic' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'"
          >
            Magic Link
          </button>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              placeholder="admin@pitayalab.com.mx"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
            />
          </div>

          <!-- Password (solo si es modo password) -->
          <div v-if="loginMode === 'password'">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
            />
          </div>

          <!-- Error -->
          <div v-if="error" class="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
            <p>{{ error }}</p>
          </div>

          <!-- Success message (magic link) -->
          <div v-if="magicSent" class="text-sm text-green-600 bg-green-50 p-4 rounded-lg border border-green-100">
            <p class="font-medium">✨ ¡Magic Link enviado!</p>
            <p class="mt-1">Revisa tu correo y haz clic en el enlace para iniciar sesión.</p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ loading ? 'Enviando...' : loginMode === 'magic' ? 'Enviar Magic Link' : 'Iniciar Sesión' }}
          </button>
        </form>

        <!-- Link a la tienda -->
        <div class="mt-6 pt-6 border-t border-gray-100 text-center">
          <a
            href="https://pitayalab.com.mx"
            target="_blank"
            class="text-sm text-gray-400 hover:text-primary-600 transition-colors"
          >
            ← Volver a la tienda
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const supabase = useSupabase()

const form = reactive({
  email: '',
  password: ''
})

const error = ref('')
const loading = ref(false)
const magicSent = ref(false)
const loginMode = ref('password')

// Detectar si venimos de un magic link (redirección de Supabase)
onMounted(async () => {
  try {
    // 1. Escuchar cambios de autenticación (captura el evento del magic link automático)
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigateTo('/dashboard')
      }
    })

    // 2. Revisar si ya hay sesión activa
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await navigateTo('/dashboard')
      return
    }

    // 3. Si llegamos con un code PKCE en la URL (después del redirect del magic link)
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (code) {
      console.log('🔑 Intercambiando código PKCE por sesión...')
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        console.error('Error al intercambiar código:', error.message)
        error.value = 'Error al iniciar sesión con el magic link. Intenta de nuevo.'
      } else if (data?.session) {
        await navigateTo('/dashboard')
      }
    }
  } catch (e) {
    console.error('Error al verificar sesión:', e)
  }
})

async function handleLogin() {
  error.value = ''
  loading.value = true
  magicSent.value = false

  try {
    if (loginMode.value === 'magic') {
      // Magic Link
      // En Vercel, usar la URL de producción; en local, la de desarrollo
      const siteUrl = window.location.origin
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: form.email,
        options: {
          emailRedirectTo: `${siteUrl}/dashboard`,
        },
      })

      if (authError) throw authError

      magicSent.value = true
    } else {
      // Email + Password
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      })

      if (authError) throw authError

      await navigateTo('/dashboard')
    }
  } catch (e) {
    console.error('Error de login:', e)
    if (e.message?.includes('Invalid login credentials')) {
      error.value = 'Correo o contraseña incorrectos'
    } else if (e.message?.includes('Email not confirmed')) {
      error.value = 'Tu correo no ha sido confirmado. Revisa tu bandeja de entrada.'
    } else {
      error.value = e.message || 'Error al iniciar sesión. Intenta de nuevo.'
    }
  } finally {
    loading.value = false
  }
}
</script>
