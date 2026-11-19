/**
 * POST /api/shipping/envia-fulfillment-sync
 * ------------------------------------------
 * Sincroniza el mapeo SKU -> variantId de Envía Fulfillment:
 *  1. Consulta el inventario del almacén (GET /company/{id}/warehouse/inventory).
 *  2. Empareja por SKU contra product_variants y products (exacto y normalizado).
 *  3. Guarda envia_variant_id en la fila correspondiente.
 *
 * Normalización: mayúsculas y sin caracteres no alfanuméricos (guiones, espacios),
 * para tolerar diferencias de formato como "BR-WEST250" vs "BR-WEST-250".
 */
import { createClient } from '@supabase/supabase-js'

function normalizeSku(sku: string): string {
  return (sku || '').toUpperCase().replace(/[^A-Z0-9]/g, '')
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
    supabase.from('product_variants').select('id, sku'),
    supabase.from('products').select('id, sku'),
  ])

  const exact = new Map<string, { table: string; id: string }>()
  const norm = new Map<string, { table: string; id: string }>()

  for (const v of variants || []) {
    if (!v.sku) continue
    exact.set(String(v.sku), { table: 'product_variants', id: v.id })
    const n = normalizeSku(v.sku)
    if (!norm.has(n)) norm.set(n, { table: 'product_variants', id: v.id })
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

    if (target.table === 'product_variants') {
      await supabase.from('product_variants').update({ envia_variant_id: variantId }).eq('id', target.id)
    } else {
      await supabase.from('products').update({ envia_variant_id: variantId }).eq('id', target.id)
    }

    if (isExact) matched++
    else fuzzyMatched++
  }

  return { ok: true, total: inventory.length, matched, fuzzyMatched, unmatched }
})
