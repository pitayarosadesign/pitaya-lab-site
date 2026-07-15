<script setup>
// Redirigir a login (o dashboard si ya hay sesión)
onMounted(async () => {
  const supabase = useSupabase()
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      navigateTo('/dashboard')
    } else {
      navigateTo('/login')
    }
  } catch (e) {
    navigateTo('/login')
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-amber-50">
    <svg class="w-8 h-8 text-primary-600 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
  </div>
</template>
