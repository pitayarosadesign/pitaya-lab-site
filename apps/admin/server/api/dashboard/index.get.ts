import { createClient } from '@supabase/supabase-js'

// 📊 Estadísticas del dashboard (usa service_role para saltar RLS)
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    // Productos activos
    const { count: productCount, error: prodError } = await supabaseAdmin
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)

    if (prodError) throw new Error(`Error products: ${prodError.message}`)

    // Órdenes del mes actual (excluye pendientes y canceladas)
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count: orderCount, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfMonth.toISOString())
      .not('status', 'in', '("pending","cancelled")')

    if (orderError) throw new Error(`Error orders: ${orderError.message}`)

    // Ventas del mes (solo órdenes pagadas)
    const { data: paidOrders, error: paidError } = await supabaseAdmin
      .from('orders')
      .select('total')
      .gte('created_at', startOfMonth.toISOString())
      .eq('payment_status', 'paid')

    if (paidError) throw new Error(`Error paid orders: ${paidError.message}`)

    // Clientes totales
    const { count: customerCount, error: custError } = await supabaseAdmin
      .from('customers')
      .select('*', { count: 'exact', head: true })

    if (custError) throw new Error(`Error customers: ${custError.message}`)

    // Calcular ventas del mes (solo pagadas)
    const monthlySales = (paidOrders || []).reduce((sum, o) => sum + Number(o.total || 0), 0) || 0

    // Órdenes recientes
    const { data: recentOrders, error: recentError } = await supabaseAdmin
      .from('orders')
      .select('order_number, customer_name, total, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5)

    if (recentError) throw new Error(`Error recent orders: ${recentError.message}`)

    return {
      productCount: productCount || 0,
      orderCount: orderCount || 0,
      monthlySales,
      customerCount: customerCount || 0,
      recentOrders: recentOrders || [],
    }
  } catch (e) {
    console.error('Error en API dashboard:', e)
    throw createError({ statusCode: 500, message: e.message })
  }
})
