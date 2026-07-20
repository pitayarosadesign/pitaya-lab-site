import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const storeId = query.id

    // Información del comercio
    const { data: store } = await supabaseAdmin
      .from('commerce_stores')
      .select('*')
      .eq('id', storeId)
      .single()

    // Transferencias a este showroom (agrupadas)
    const { data: allTransfers } = await supabaseAdmin
      .from('inventory_movements')
      .select('*, product:product_id(name, sku)')
      .eq('to_location', storeId)
      .eq('type', 'transfer')
      .order('created_at', { ascending: false })
      .limit(200)

    // Agrupar por fecha + motivo + nota
    const groups: Record<string, any> = {}
    for (const t of allTransfers || []) {
      const key = `${t.created_at?.split('T')[0]}-${t.reason}-${t.note || ''}`
      if (!groups[key]) {
        groups[key] = {
          id: t.id,
          date: t.created_at,
          reason: t.reason,
          note: t.note,
          products: [],
          totalQty: 0,
        }
      }
      groups[key].products.push({
        name: t.product?.name || '—',
        sku: t.product?.sku || '',
        quantity: t.quantity,
      })
      groups[key].totalQty += t.quantity
    }

    const transfers = Object.values(groups).sort((a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    // Ventas
    const { data: sales } = await supabaseAdmin
      .from('commerce_sales')
      .select('*')
      .eq('store_id', storeId)
      .order('created_at', { ascending: false })
      .limit(20)

    return { store, transfers: transfers || [], sales: sales || [] }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
