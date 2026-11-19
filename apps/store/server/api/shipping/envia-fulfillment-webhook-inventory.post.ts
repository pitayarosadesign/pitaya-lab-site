/**
 * POST /api/shipping/envia-fulfillment-webhook-inventory
 * ------------------------------------------------------
 * Webhook de Envía Fulfillment: onInventoryModification (cambios de stock en el almacén).
 *
 * Estrategia defensiva: el contrato exacto del payload aún no se confirma, así que:
 *   - Normaliza el body a una lista de items (soporta objeto o array, con envolturas).
 *   - Extrae sku / variantId y la cantidad disponible de varias formas posibles.
 *   - Empareja contra product_variants y products por sku (exacto/normalizado) o envia_variant_id.
 *   - Actualiza `stock` en la fila correspondiente.
 *   - SIEMPRE loguea el payload crudo para verificar/afinar el contrato.
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

// Normaliza el body a una lista de items (soporta distintas envolturas).
function toList(body: any): any[] {
  if (Array.isArray(body)) return body
  if (!body || typeof body !== 'object') return []
  for (const key of ['products', 'items', 'data', 'inventory', 'variants', 'changes']) {
    const v = body[key]
    if (Array.isArray(v)) return v
    if (v && typeof v === 'object') return [v]
  }
  return [body]
}

// Extrae la cantidad disponible de las distintas formas posibles del payload.
function extractAvailable(item: any): number | null {
  if (!item || typeof item !== 'object') return null
  if (Array.isArray(item.warehouses) && item.warehouses.length) {
    return item.warehouses.reduce(
      (sum: number, w: any) => sum + (Number(w?.available) || 0),
      0,
    )
  }
  for (const key of ['available', 'availableQuantity', 'stock', 'quantity', 'newQuantity', 'currentQuantity']) {
    const v = item[key]
    if (v !== undefined && v !== null && v !== '' && !Number.isNaN(Number(v))) {
      return Number(v)
    }
  }
  return null
}

function extractSku(item: any): string | null {
  const v = item?.sku || item?.variant?.sku || item?.product?.sku || item?.data?.sku
  return v ? String(v) : null
}

function extractVariantId(item: any): string | null {
  const v = item?.variantId || item?.variant_id || item?.variant?.variantId || item?.product?.variantId || item?.data?.variantId
  return v != null ? String(v) : null
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  let body: any = null
  try {
    body = await readBody(event)
  } catch {
    body = null
  }

  console.log('[envia-fulfillment-webhook:onInventoryModification] payload:', JSON.stringify(body))

  if (!body || typeof body !== 'object') {
    return { received: true, reason: 'empty_body' }
  }

  const supabase = createClient(config.public.supabaseUrl, config.supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const [{ data: variants }, { data: products }] = await Promise.all([
    supabase.from('product_variants').select('id, sku, envia_variant_id, product_id'),
    supabase.from('products').select('id, sku, envia_variant_id'),
  ])

  const bySku = new Map<string, { table: string; id: string; productId?: string }>()
  const byNormSku = new Map<string, { table: string; id: string; productId?: string }>()
  const byEnvVariant = new Map<string, { table: string; id: string; productId?: string }>()

  for (const v of variants || []) {
    if (v.sku) {
      bySku.set(String(v.sku), { table: 'product_variants', id: v.id, productId: v.product_id })
      const n = normalizeSku(v.sku)
      if (!byNormSku.has(n)) byNormSku.set(n, { table: 'product_variants', id: v.id, productId: v.product_id })
    }
    if (v.envia_variant_id != null) {
      byEnvVariant.set(String(v.envia_variant_id), { table: 'product_variants', id: v.id, productId: v.product_id })
    }
  }
  for (const p of products || []) {
    if (p.sku) {
      if (!bySku.has(String(p.sku))) bySku.set(String(p.sku), { table: 'products', id: p.id })
      const n = normalizeSku(p.sku)
      if (!byNormSku.has(n)) byNormSku.set(n, { table: 'products', id: p.id })
    }
    if (p.envia_variant_id != null) {
      if (!byEnvVariant.has(String(p.envia_variant_id))) {
        byEnvVariant.set(String(p.envia_variant_id), { table: 'products', id: p.id })
      }
    }
  }

  let updated = 0
  for (const item of toList(body)) {
    const sku = extractSku(item)
    const variantId = extractVariantId(item)
    const available = extractAvailable(item)

    if (available === null) {
      console.log('[inventory] sin cantidad disponible, ignorado:', JSON.stringify(item))
      continue
    }

    const target =
      (sku && (bySku.get(sku) || byNormSku.get(normalizeSku(sku)))) ||
      (variantId && byEnvVariant.get(variantId))

    if (!target) {
      console.log(`[inventory] sku=${sku || 'n/d'} variantId=${variantId || 'n/d'} no encontrado en catálogo local`)
      continue
    }

    if (target.table === 'product_variants') {
      await supabase.from('product_variants').update({ stock: available }).eq('id', target.id)
      // Recalcular stock del producto padre y reflejarlo en el admin (Central).
      if (target.productId) {
        await syncParentStock(supabase, target.productId)
      }
    } else {
      // Reflejar también en la ubicación "Central" del admin (inventory_by_location).
      await supabase.from('inventory_by_location').upsert(
        {
          product_id: target.id,
          location_id: 'almacen_central',
          stock: available,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'product_id,location_id' },
      )
      await supabase.from('products').update({ stock: available }).eq('id', target.id)
    }
    console.log(`[inventory] sku=${sku || 'n/d'} → stock=${available}`)
    updated++
  }

  return { received: true, updated }
})
