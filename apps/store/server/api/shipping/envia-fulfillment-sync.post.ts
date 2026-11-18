/**
 * POST /api/shipping/envia-fulfillment-sync
 * ------------------------------------------
 * Sincroniza el mapeo SKU -> variantId de Envía Fulfillment:
 *  1. Consulta el inventario del almacén (GET /company/{id}/warehouse/inventory).
 *  2. Empareja por SKU contra product_variants y products.
 *  3. Guarda envia_variant_id en la fila correspondiente.
 *
 * Operación interna y no destructiva (solo escribe el mapeo). Devuelve los
 * SKUs no emparejados para revisar el catálogo.
 */
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.supabaseUrl, config.supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const inventory = await listEnviaFulfillmentInventory()

  let matched = 0
  const unmatched: string[] = []

  for (const item of inventory) {
    const sku = item?.sku
    const variantId = item?.variantId
    if (!sku || variantId == null) continue

    const { data: variants } = await supabase
      .from('product_variants')
      .select('id')
      .eq('sku', sku)
      .limit(1)

    if (variants && variants.length > 0) {
      await supabase
        .from('product_variants')
        .update({ envia_variant_id: variantId })
        .eq('id', variants[0].id)
      matched++
      continue
    }

    const { data: products } = await supabase
      .from('products')
      .select('id')
      .eq('sku', sku)
      .limit(1)

    if (products && products.length > 0) {
      await supabase
        .from('products')
        .update({ envia_variant_id: variantId })
        .eq('id', products[0].id)
      matched++
      continue
    }

    unmatched.push(String(sku))
  }

  return { ok: true, total: inventory.length, matched, unmatched }
})
