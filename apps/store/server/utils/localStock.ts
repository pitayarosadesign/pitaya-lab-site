import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Stock físico local (Jalisco, `almacen_local`) por producto, para sumarlo a la
 * disponibilidad visible en tienda. `products.stock` / `product_variants.stock`
 * representan el stock online de Envía Fulfillment (CDMX); este helper devuelve
 * la parte local para que la disponibilidad sea CDMX + Jalisco sin duplicar.
 */
export async function getLocalStockMap(
  supabase: SupabaseClient,
  productIds: string[],
): Promise<Map<string, number>> {
  const map = new Map<string, number>()
  const ids = [...new Set((productIds || []).filter(Boolean))]
  if (!ids.length) return map

  const { data } = await supabase
    .from('inventory_by_location')
    .select('product_id, stock')
    .eq('location_id', 'almacen_local')
    .in('product_id', ids)

  for (const r of data || []) {
    map.set(r.product_id, (map.get(r.product_id) || 0) + (Number(r.stock) || 0))
  }

  return map
}
