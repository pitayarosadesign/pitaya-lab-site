/**
 * POST /api/inventory/envia-register-missing
 * ------------------------------------------
 * Registra en Envía Fulfillment los productos de la tienda online que aún no
 * existen en el catálogo de Envía (shop local + inventario de warehouse).
 *
 * Body: { dryRun?: boolean }
 *   - dryRun true (default): solo calcula y devuelve el plan, NO crea nada.
 *   - dryRun false: crea los productos faltantes vía "Create Product".
 */
import { createClient } from '@supabase/supabase-js'
import {
  listEnviaFulfillmentShopProducts,
  listEnviaFulfillmentInventory,
  createEnviaFulfillmentProduct,
} from '../../utils/enviaFulfillment'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const dryRun = body?.dryRun !== false

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  // 1. SKUs ya registrados en Envía (shop local + inventario).
  const [shopItems, invItems] = await Promise.all([
    listEnviaFulfillmentShopProducts().catch(() => [] as any[]),
    listEnviaFulfillmentInventory().catch(() => [] as any[]),
  ])

  const existingSkus = new Set<string>()
  for (const it of shopItems) {
    if (it?.sku) existingSkus.add(String(it.sku).trim())
    for (const v of it?.variants || []) {
      if (v?.sku) existingSkus.add(String(v.sku).trim())
    }
  }
  for (const it of invItems) {
    if (it?.sku) existingSkus.add(String(it.sku).trim())
  }

  // 2. Productos y variantes activos de la tienda online.
  const [{ data: products }, { data: variants }] = await Promise.all([
    supabaseAdmin
      .from('products')
      .select('id, name, sku, subtitle, description, price')
      .eq('is_active', true)
      .order('name'),
    supabaseAdmin
      .from('product_variants')
      .select('id, product_id, name, sku, price')
      .eq('is_active', true),
  ])

  const variantsByProduct: Record<string, any[]> = {}
  for (const v of variants || []) {
    ;(variantsByProduct[v.product_id] ||= []).push(v)
  }

  // 3. Detectar faltantes y armar el payload de "Create Product".
  const missing: any[] = []
  for (const p of products || []) {
    const vs = variantsByProduct[p.id] || []
    const allSkus = [p.sku, ...vs.map((v: any) => v.sku)]
      .filter(Boolean)
      .map((s: any) => String(s).trim())

    if (allSkus.length === 0) continue // sin SKU no se puede registrar
    if (allSkus.some((s: string) => existingSkus.has(s))) continue // ya existe en Envía

    // Solo enviamos variantes cuyo SKU difiere del SKU del producto (las
    // variantes "espejo" con el mismo SKU se manejan con `variants: []`).
    const distinct = vs.filter(
      (v: any) => v.sku && String(v.sku).trim() !== String(p.sku || '').trim()
    )
    const variantsPayload = distinct.length
      ? distinct.map((v: any) => ({
          name: v.name || p.name,
          price: Number(v.price) || 0,
          sku: String(v.sku).trim(),
        }))
      : []

    const sku = p.sku ? String(p.sku).trim() : (vs[0]?.sku ? String(vs[0].sku).trim() : '')

    missing.push({
      supabaseId: p.id,
      name: p.name,
      sku,
      variantCount: variantsPayload.length,
      payload: {
        name: p.name,
        description: p.subtitle || p.description || '',
        price: Number(p.price) || 0,
        sku,
        variants: variantsPayload,
      },
    })
  }

  if (dryRun) {
    return { dryRun: true, count: missing.length, products: missing }
  }

  // 4. Crear productos en Envía.
  const results: any[] = []
  for (const m of missing) {
    try {
      const created = await createEnviaFulfillmentProduct(m.payload)
      results.push({ sku: m.sku, name: m.name, ok: true, data: created })
    } catch (e: any) {
      results.push({ sku: m.sku, name: m.name, ok: false, error: e.message || String(e) })
    }
  }

  const okCount = results.filter((r) => r.ok).length
  return {
    dryRun: false,
    total: results.length,
    created: okCount,
    failed: results.length - okCount,
    results,
  }
})
