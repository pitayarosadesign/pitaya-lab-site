/**
 * POST /api/shipping/envia-fulfillment-sync
 * ------------------------------------------
 * Sincroniza el mapeo SKU -> variantId de Envía Fulfillment:
 *  1. Consulta el inventario del almacén (GET /company/{id}/warehouse/inventory).
 *  2. Empareja por SKU contra product_variants y products (exacto y normalizado).
 *  3. Guarda envia_variant_id y copia el stock disponible en la fila correspondiente.
 *
 * Normalización: mayúsculas y sin caracteres no alfanuméricos (guiones, espacios),
 * para tolerar diferencias de formato como "BR-WEST250" vs "BR-WEST-250".
 */
import { createClient } from '@supabase/supabase-js'

function normalizeSku(sku: string): string {
  return (sku || '').toUpperCase().replace(/[^A-Z0-9]/g, '')
}

// Recalcula el stock del producto padre como la suma de sus variantes y lo
// refleja en la ubicación "Central" del admin (inventory_by_location).
async function syncParentStock(supabase: any, productId: string) {
  const { data: rows } = await supabase
    .from('product_variants')
    .select('stock')
    .eq('product_id', productId)
  const total = (rows || []).reduce((sum: number, v: any) => sum + (Number(v.stock) || 0), 0)
  await supabase.from('inventory_by_location').upsert(
    {
      product_id: productId,
      location_id: 'almacen_central',
      stock: total,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'product_id,location_id' },
  )
  await supabase.from('products').update({ stock: total }).eq('id', productId)
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.supabaseUrl, config.supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const raw = await fetchEnviaFulfillmentInventoryRaw()
  const inventory = Array.isArray(raw)
    ? raw
    : (raw?.products || raw?.data || raw?.items || raw?.inventory || [])

  // Cargar SKUs locales una sola vez
  const [{ data: variants }, { data: products }] = await Promise.all([
    supabase.from('product_variants').select('id, sku, product_id'),
    supabase.from('products').select('id, sku'),
  ])

  const exact = new Map<string, { table: string; id: string; productId?: string }>()
  const norm = new Map<string, { table: string; id: string; productId?: string }>()

  for (const v of variants || []) {
    if (!v.sku) continue
    exact.set(String(v.sku), { table: 'product_variants', id: v.id, productId: v.product_id })
    const n = normalizeSku(v.sku)
    if (!norm.has(n)) norm.set(n, { table: 'product_variants', id: v.id, productId: v.product_id })
  }
  for (const p of products || []) {
    if (!p.sku) continue
    if (!exact.has(String(p.sku))) exact.set(String(p.sku), { table: 'products', id: p.id })
    const n = normalizeSku(p.sku)
    if (!norm.has(n)) norm.set(n, { table: 'products', id: p.id })
  }

  let matched = 0
  let fuzzyMatched = 0
  const unmatched: { sku: string; name: string }[] = []

  for (const item of inventory) {
    const sku = item?.sku
    const variantId = item?.variantId
    if (!sku || variantId == null) continue

    const isExact = exact.has(String(sku))
    const target = isExact ? exact.get(String(sku))! : norm.get(normalizeSku(sku))

    if (!target) {
      unmatched.push({ sku: String(sku), name: item?.name || '' })
      continue
    }

    // Stock disponible en el almacén (suma de `available` de los warehouses)
    const available = (item?.warehouses || []).reduce(
      (sum: number, w: any) => sum + (Number(w?.available) || 0),
      0,
    )

    const update: Record<string, any> = { envia_variant_id: variantId, stock: available }
    if (target.table === 'product_variants') {
      await supabase.from('product_variants').update(update).eq('id', target.id)
      // Recalcular stock del producto padre y reflejarlo en el admin (Central).
      if (target.productId) {
        await syncParentStock(supabase, target.productId)
      }
    } else {
      // Reflejar el stock de Envía en la ubicación "Central" del admin.
      // El trigger update_product_total_stock recalcula products.stock al cambiar
      // inventory_by_location; lo re-afirmamos abajo para que la tienda siga
      // usando el stock vendible de Envía (sin contar showrooms).
      await supabase.from('inventory_by_location').upsert(
        {
          product_id: target.id,
          location_id: 'almacen_central',
          stock: available,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'product_id,location_id' },
      )
      await supabase.from('products').update(update).eq('id', target.id)
    }

    if (isExact) matched++
    else fuzzyMatched++
  }

  return { ok: true, total: inventory.length, matched, fuzzyMatched, unmatched }
})
