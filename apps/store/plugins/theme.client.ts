// Plugin de tema para el store.
// Carga la paleta de colores desde site_config (clave 'theme') y la aplica
// como CSS variables en el documento. Si no hay tema configurado, usa los
// valores por defecto definidos en el CSS.
export default defineNuxtPlugin(async (nuxtApp) => {
  const { $supabase } = nuxtApp

  if (!$supabase) {
    console.warn('⚠️ Supabase no configurado. Usando paleta por defecto.')
    return
  }

  try {
    const { data, error } = await $supabase
      .from('site_config')
      .select('value')
      .eq('key', 'theme')
      .single()

    if (error) throw error

    if (data?.value) {
      const theme = data.value
      const root = document.documentElement

      // Aplicar colores primarios
      if (theme.primary) {
        for (const [shade, color] of Object.entries(theme.primary)) {
          root.style.setProperty(`--color-primary-${shade}`, color)
        }
      }

      // Aplicar colores ámbar
      if (theme.amber) {
        for (const [shade, color] of Object.entries(theme.amber)) {
          root.style.setProperty(`--color-amber-${shade}`, color)
        }
      }

      // Aplicar colores tierra
      if (theme.earth) {
        for (const [shade, color] of Object.entries(theme.earth)) {
          root.style.setProperty(`--color-earth-${shade}`, color)
        }
      }

      // Aplicar fondo y color de texto
      if (theme.background) {
        root.style.setProperty('--color-background', theme.background)
        document.body.style.background = theme.background
      }
      if (theme.textColor) {
        root.style.setProperty('--color-text', theme.textColor)
        document.body.style.color = theme.textColor
      }
    }
  } catch (e) {
    console.warn('⚠️ No se pudo cargar el tema, usando paleta por defecto:', e.message)
  }
})
