// Middleware global de mantenimiento
// Redirige todas las rutas a /maintenance mientras el sitio esté en mantenimiento.
// Para desactivar el mantenimiento, cambia MAINTENANCE_MODE a false.

const MAINTENANCE_MODE = true

export default defineNuxtRouteMiddleware((to) => {
  if (!MAINTENANCE_MODE) return

  // Permitir acceso a la página de mantenimiento
  if (to.path === '/maintenance') return

  // Redirigir todo lo demás a mantenimiento
  return navigateTo('/maintenance')
})
