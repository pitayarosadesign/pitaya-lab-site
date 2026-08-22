/**
 * 🎯 PITAYA LAB — Composable de Defaults de Sección
 * =================================================
 * Provee el contenido por defecto de las secciones dinámicas (page_sections)
 * desde Supabase (site_config), en lugar de tener ese contenido informativo
 * hardcodeado en los componentes del store.
 *
 * ARQUITECTURA:
 *  El contenido informativo (valores de marca, beneficios de envío, stats B2B,
 *  audiencias B2B, FAQs, etc.) vive en `site_config` y es editable desde el
 *  panel admin. Los componentes <Section*> consumen este composable para
 *  resolver sus fallbacks cuando el admin no ha configurado contenido propio
 *  en `page_sections`.
 *
 *  Prioridad de resolución en cada <Section*>:
 *   1. content.* del propio JSONB de la sección (máxima prioridad)
 *   2. site_config (clave según tipo de sección)  ← este composable
 *   3. Fallback vacío seguro (ya NO contenido editorial hardcodeado)
 *
 * USO:
 *   const defaults = await useSectionDefaults('values')
 *   const values = defaults??.values ?? []
 */

// Mapa de claves de `site_config` por tipo de sección dinámica.
// Al añadir una sección con contenido por defecto editable, registra aquí su clave
// y crea la pantalla correspondiente en el panel admin.
const SECTION_SITE_KEYS = {
  values: 'section_values',
  trust: 'section_trust',
  reviews: 'section_reviews',
  cta: 'section_cta',
  hero: 'section_hero',
  'b2b_stats': 'b2b_stats',
  'b2b_audience': 'b2b_audience',
  'b2b_faq': 'b2b_faq',
}

// Caché en memoria: evita repetir queries para la misma clave en una misma sesión.
const cache = new Map()

/**
 * Carga el contenido por defecto de una sección desde `site_config`.
 * @param {string} type - Tipo de sección (keys de SECTION_SITE_KEYS).
 * @param {Object} [fallback] - Fallback vacío seguro opcional (NO contenido editorial).
 * @returns {Promise<Object|null>} El valor guardado en site_config, o null.
 */
export async function useSectionDefaults(type, fallback = null) {
  const key = SECTION_SITE_KEYS[type]

  // Si el tipo no tiene clave mapeada, devuelve el fallback sin consultar BD.
  if (!key) {
    return fallback
  }

  // Caché por clave
  if (cache.has(key)) {
    return cache.get(key) ?? fallback
  }

  const supabase = useNuxtApp()?.$supabase
  if (!supabase) {
    cache.set(key, fallback)
    return fallback
  }

  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', key)
      .single()

    if (!error && data?.value) {
      const value = data.value
      cache.set(key, value)
      return value
    }
  } catch (e) {
    console.warn(`No se pudo cargar el default de sección "${type}" desde site_config:`, e.message)
  }

  cache.set(key, fallback)
  return fallback
}

