export default defineNuxtRouteMiddleware(async (to, from) => {
  // Solo proteger rutas que no sean login
  if (to.path === '/login') {
    return
  }

  const { $supabase } = useNuxtApp()
  
  try {
    const { data: { session } } = await $supabase.auth.getSession()
    
    if (!session) {
      return navigateTo('/login')
    }
  } catch (e) {
    return navigateTo('/login')
  }
})
