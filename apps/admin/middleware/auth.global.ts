export default defineNuxtRouteMiddleware(async (to, from) => {
  // 🔓 BYPASS SOLO PARA DESARROLLO LOCAL (pruebas de la migración sin login).
  // NUNCA aplica en producción (NODE_ENV = 'production'), el guard real se mantiene.
  // Revertir/eliminar este bloque al abrir PR hacia main si ya no es necesario probar.
  if (process.env.NODE_ENV === 'development') {
    return
  }

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
