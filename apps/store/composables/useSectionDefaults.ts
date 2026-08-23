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

// Caché para cargar TODOS los defaults de una sola vez (evita N consultas individuales)
let allDefaultsCache = null
let allDefaultsPromise = null

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
    // Usar maybeSingle() en lugar de single() para evitar error 406
    // cuando la clave no existe en la BD (devuelve null en lugar de error).
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', key)
      .maybeSingle()

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

/**
 * Carga TODOS los defaults de sección de una sola vez desde site_config.
 * Esto evita N consultas individuales a Supabase (una por sección).
 * @returns {Promise<Object>} Mapa de tipo de sección → valor de site_config.
 */
export async function useAllSectionDefaults() {
  if (allDefaultsCache) return allDefaultsCache
  if (allDefaultsPromise) return allDefaultsPromise

  const supabase = useNuxtApp()?.$supabase
  if (!supabase) {
    allDefaultsCache = {}
    return allDefaultsCache
  }

  allDefaultsPromise = (async () => {
    const keys = Object.values(SECTION_SITE_KEYS)
    const result = {}

    try {
      const { data, error } = await supabase
        .from('site_config')
        .select('key, value')
        .in('key', keys)

      if (!error && Array.isArray(data)) {
        // Mapear por tipo de sección
        for (const [type, key] of Object.entries(SECTION_SITE_KEYS)) {
          const row = data.find(r => r.key === key)
          if (row?.value) {
            result[type] = row.value
            cache.set(key, row.value)
          }
        }
      }
    } catch (e) {
      console.warn('No se pudieron cargar los defaults de sección:', e.message)
    }

    allDefaultsCache = result
    return result
  })()

  return allDefaultsPromise
}

