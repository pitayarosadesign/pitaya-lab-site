export default defineNuxtRouteMiddleware(async (to, from) => {
  // Solo proteger rutas que no sean login
  if (to.path === '/login') {
    return
  }

  // Solo ejecutar en el cliente (SSR no tiene session)
  if (process.server) {
    return
  }

  const nuxtApp = useNuxtApp()
  
  try {
    const { data: { session } } = await nuxtApp.$supabase.auth.getSession()
    
    if (!session) {
      return navigateTo('/login')
    }
  } catch (e) {
    return navigateTo('/login')
  }
})
