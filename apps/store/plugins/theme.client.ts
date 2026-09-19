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

  // Carga dinámicamente una fuente de Google Fonts (evita duplicar <link>).
  function loadFont(font) {
    if (!font?.href) return
    const id = 'gf-' + String(font.family || '').replace(/[^a-zA-Z0-9]/g, '-')
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = font.href
      document.head.appendChild(link)
    }
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

      // Aplicar tipografías (encabezados y cuerpo)
      if (theme.font_heading?.family) {
        loadFont(theme.font_heading)
        root.style.setProperty('--font-serif', theme.font_heading.family)
      }
      if (theme.font_body?.family) {
        loadFont(theme.font_body)
        root.style.setProperty('--font-sans', theme.font_body.family)
        document.body.style.fontFamily = theme.font_body.family
      }
    }
  } catch (e) {
    console.warn('⚠️ No se pudo cargar el tema, usando paleta por defecto:', e.message)
  }
})
