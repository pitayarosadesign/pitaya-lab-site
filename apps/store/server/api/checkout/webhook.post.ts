import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.stripeSecretKey || config.stripeSecretKey === 'sk_test_...') {
    return { error: 'Stripe no configurado' }
  }

  if (!config.stripeWebhookSecret || config.stripeWebhookSecret === 'whsec_...') {
    return { error: 'Webhook secret no configurado' }
  }

  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: '2025-03-31.preview',
  })

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const body = await readBody(event)
    const signature = event.node.req.headers['stripe-signature']

    if (!signature) {
      throw createError({ statusCode: 400, message: 'Firma webhook faltante' })
    }

    // Verificar el webhook
    let webhookEvent: Stripe.Event
    try {
      webhookEvent = stripe.webhooks.constructEvent(
        JSON.stringify(body),
        signature as string,
        config.stripeWebhookSecret
      )
    } catch (err) {
      console.error('Error verificando webhook:', err.message)
      throw createError({ statusCode: 400, message: `Error de firma: ${err.message}` })
    }

    // Manejar el evento
    switch (webhookEvent.type) {
      case 'checkout.session.completed': {
        const session = webhookEvent.data.object as Stripe.Checkout.Session

        // Buscar orden por session_id
        const { data: orders } = await supabaseAdmin
          .from('orders')
          .select('*')
          .eq('stripe_session_id', session.id)
          .limit(1)

        const order = orders?.[0]

        if (order) {
          // Actualizar orden como pagada
          await supabaseAdmin
            .from('orders')
            .update({
              status: 'confirmed',
              payment_status: 'paid',
              stripe_payment_intent_id: session.payment_intent as string,
              customer_email: session.customer_details?.email || order.customer_email,
              customer_name: session.customer_details?.name || order.customer_name,
              customer_phone: session.customer_details?.phone || null,
              shipping_address: session.shipping_details || {},
              paid_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('id', order.id)

          console.log(`✅ Orden ${order.order_number} pagada con éxito`)
        } else {
          // Crear nueva orden si no existe
          const items = session.metadata?.items_json
            ? JSON.parse(session.metadata.items_json)
            : []

          const orderNumber = `PIT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`

          await supabaseAdmin
            .from('orders')
            .insert({
              order_number: orderNumber,
              customer_email: session.customer_details?.email || 'cliente@email.com',
              customer_name: session.customer_details?.name || 'Cliente',
              customer_phone: session.customer_details?.phone || null,
              status: 'confirmed',
              payment_status: 'paid',
              stripe_session_id: session.id,
              stripe_payment_intent_id: session.payment_intent as string,
              items: items,
              subtotal: session.amount_subtotal ? session.amount_subtotal / 100 : 0,
              total: session.amount_total ? session.amount_total / 100 : 0,
              shipping_address: session.shipping_details || {},
              paid_at: new Date().toISOString(),
            })
        }
        break
      }

      case 'checkout.session.expired': {
        const expiredSession = webhookEvent.data.object as Stripe.Checkout.Session

        const { data: expiredOrders } = await supabaseAdmin
          .from('orders')
          .select('*')
          .eq('stripe_session_id', expiredSession.id)
          .limit(1)

        if (expiredOrders?.[0]) {
          await supabaseAdmin
            .from('orders')
            .update({
              status: 'cancelled',
              updated_at: new Date().toISOString(),
            })
            .eq('id', expiredOrders[0].id)
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = webhookEvent.data.object as Stripe.PaymentIntent

        const { data: failedOrders } = await supabaseAdmin
          .from('orders')
          .select('*')
          .eq('stripe_payment_intent_id', paymentIntent.id)
          .limit(1)

        if (failedOrders?.[0]) {
          await supabaseAdmin
            .from('orders')
            .update({
              payment_status: 'failed',
              updated_at: new Date().toISOString(),
            })
            .eq('id', failedOrders[0].id)
        }
        break
      }
    }

    return { received: true }
  } catch (e) {
    if (e.statusCode) throw e
    console.error('Error en webhook:', e)
    throw createError({ statusCode: 500, message: e.message })
  }
})
