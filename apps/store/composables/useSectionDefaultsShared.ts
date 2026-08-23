/**
 * 🎯 PITAYA LAB — Composable de Defaults de Sección (compartido)
 * =================================================
 * Carga TODOS los defaults de sección desde site_config en UNA sola consulta
 * y los comparte entre todos los componentes <Section*>.
 *
 * Esto evita N consultas individuales a Supabase (una por sección),
 * reduciendo significativamente la latencia de renderizado.
 *
 * USO:
 *   const defaults = await useSectionDefaultsShared()
 *   const values = defaults?.values ?? []
 */

import { useAllSectionDefaults } from './useSectionDefaults'

// Estado compartido entre todos los componentes
let sharedDefaults = null
let sharedPromise = null

/**
 * Carga todos los defaults de sección de una sola vez y los comparte.
 * @returns {Promise<Object>} Mapa de tipo de sección → valor de site_config.
 */
export async function useSectionDefaultsShared() {
  if (sharedDefaults) return sharedDefaults
  if (sharedPromise) return sharedPromise

  sharedPromise = (async () => {
    try {
      sharedDefaults = await useAllSectionDefaults()
    } catch (e) {
      console.warn('Error cargando defaults de sección compartidos:', e.message)
      sharedDefaults = {}
    }
    return sharedDefaults
  })()

  return sharedPromise
}

/**
 * Obtiene el default de una sección específica desde el caché compartido.
 * @param {string} type - Tipo de sección.
 * @returns {Object|null} El valor guardado, o null.
 */
export function getSectionDefault(type) {
  return sharedDefaults?.[type] ?? null
}
