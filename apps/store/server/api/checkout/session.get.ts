import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const sessionId = query.session_id as string

  if (!sessionId) {
    throw createError({ statusCode: 400, message: 'session_id es requerido' })
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { data: orders, error } = await supabaseAdmin
      .from('orders')
      .select('order_number, status, total, customer_email')
      .eq('stripe_session_id', sessionId)
      .limit(1)

    if (error) throw error

    if (orders?.[0]) {
      return {
        data: {
          orderNumber: orders[0].order_number,
          status: orders[0].status,
          total: orders[0].total,
          customerEmail: orders[0].customer_email,
        },
      }
    }

    return {
      data: {
        orderNumber: 'PIT-XXXX',
        status: 'pending',
        total: 0,
        customerEmail: '',
      },
    }
  } catch (e) {
    console.error('Error obteniendo sesión:', e)
    return {
      data: {
        orderNumber: 'PIT-XXXX',
        status: 'unknown',
        total: 0,
        customerEmail: '',
      },
    }
  }
})

