/**
 * 🎯 PITAYA LAB - Composable de Configuración B2B
 * ================================================
 * Carga la configuración B2B desde Supabase (site_config)
 * con fallback a valores por defecto.
 * Separado de useB2B.ts para mantener la lógica pura
 * (cálculos de precios) independiente de la carga de datos.
 */

import { DEFAULT_B2B } from './useB2B'

/**
 * Cargar la configuración B2B desde Supabase (site_config)
 */
export async function useB2BConfig() {
  const supabase = useNuxtApp()?.$supabase

  const config = {
    comercial: DEFAULT_B2B.comercial,
    recuerdos: DEFAULT_B2B.recuerdos,
    contacto: DEFAULT_B2B.contacto,
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('site_config')
        .select('key, value')
        .in('key', ['b2b_comercial', 'b2b_recuerdos', 'b2b_contacto'])

      if (!error && data) {
        data.forEach(item => {
          if (item.key === 'b2b_comercial' && item.value?.enabled !== false) {
            config.comercial = { ...config.comercial, ...item.value, tiers: item.value.tiers || config.comercial.tiers }
          }
          if (item.key === 'b2b_recuerdos' && item.value?.enabled !== false) {
            config.recuerdos = { ...config.recuerdos, ...item.value, pricing_by_volume: item.value.pricing_by_volume || config.recuerdos.pricing_by_volume }
          }
          if (item.key === 'b2b_contacto') {
            config.contacto = { ...config.contacto, ...item.value }
          }
        })
      }
    } catch (e) {
      console.warn('Usando config B2B estática (fallback):', e.message)
    }
  }

  return config
}
