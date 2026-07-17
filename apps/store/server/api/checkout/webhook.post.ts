import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import { Resend } from 'resend'

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

  const resend = new Resend(config.resendApiKey || '')

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  // Helper para enviar correo de confirmación
  async function sendConfirmationEmail(order: any) {
    if (!config.resendApiKey) {
      console.warn('Resend no configurado, no se envió correo')
      return
    }

    const itemsHtml = (order.items || []).map((item: any) =>
      `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">${item.name || 'Producto'}</td>
        <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity || 1}</td>
        <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;text-align:right;">$${( (item.price || 0) / 100 ).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
      </tr>`
    ).join('')

    try {
      await resend.emails.send({
        from: 'PITAYA LAB <pedidos@pitayalab.com.mx>',
        to: order.customer_email,
        subject: `✅ Pedido confirmado - ${order.order_number} | PITAYA LAB`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
            <div style="text-align:center;padding:30px 0;background:linear-gradient(135deg,#1a3a2a,#0d2818);border-radius:16px 16px 0 0;">
              <h1 style="color:#fff;margin:0;font-size:24px;">¡Gracias por tu compra! 🎉</h1>
              <p style="color:#a7d4b0;margin:8px 0 0;">PITAYA LAB</p>
            </div>
            <div style="background:#fff;padding:30px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 16px 16px;">
              <p style="color:#374151;font-size:16px;margin:0 0 20px;">Hola <strong>${order.customer_name || 'Cliente'}</strong>,</p>
              <p style="color:#6b7280;font-size:14px;margin:0 0 20px;">Tu pedido <strong style="color:#1a3a2a;">${order.order_number}</strong> ha sido confirmado y lo estamos preparando con mucho cuidado.</p>

              <table style="width:100%;border-collapse:collapse;margin:20px 0;">
                <thead>
                  <tr style="background:#f9fafb;">
                    <th style="padding:10px;text-align:left;font-size:12px;color:#6b7280;text-transform:uppercase;">Producto</th>
                    <th style="padding:10px;text-align:center;font-size:12px;color:#6b7280;text-transform:uppercase;">Cant.</th>
                    <th style="padding:10px;text-align:right;font-size:12px;color:#6b7280;text-transform:uppercase;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <div style="border-top:2px solid #1a3a2a;padding-top:15px;margin-top:15px;">
                <p style="margin:0;text-align:right;font-size:18px;font-weight:bold;color:#1a3a2a;">
                  Total: $${(order.total || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </p>
              </div>

              <div style="background:#f0fdf4;border-radius:12px;padding:20px;margin:20px 0;">
                <h3 style="color:#166534;font-size:14px;margin:0 0 10px;">📦 ¿Qué sigue?</h3>
                <ol style="color:#374151;font-size:13px;margin:0;padding-left:20px;">
                  <li style="margin-bottom:5px;">Preparamos tu pedido (1-2 días hábiles)</li>
                  <li style="margin-bottom:5px;">Recibirás número de rastreo cuando sea enviado</li>
                  <li>Recibes tus productos PITAYA LAB ✨</li>
                </ol>
              </div>

              <div style="background:#f9fafb;border-radius:12px;padding:20px;margin:20px 0;">
                <h3 style="color:#374151;font-size:14px;margin:0 0 10px;">🚚 Envío a:</h3>
                <p style="color:#6b7280;font-size:13px;margin:0;">
                  ${order.shipping_address?.address?.line1 || 'Dirección registrada en Stripe'}<br>
                  ${order.shipping_address?.address?.city || ''} ${order.shipping_address?.address?.state || ''}<br>
                  CP: ${order.shipping_address?.address?.postal_code || ''}
                </p>
              </div>

              <p style="color:#9ca3af;font-size:12px;text-align:center;margin:20px 0 0;">
                ¿Tienes dudas? Escríbenos a <a href="mailto:contacto@pitayalab.com.mx" style="color:#1a3a2a;">contacto@pitayalab.com.mx</a>
              </p>
            </div>
          </div>
        `,
      })
      console.log(`✅ Correo enviado a ${order.customer_email} para orden ${order.order_number}`)
    } catch (e) {
      console.error('Error enviando correo:', e)
    }
  }

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

          // Enviar correo de confirmación
          await sendConfirmationEmail({
            ...order,
            customer_email: session.customer_details?.email || order.customer_email,
            customer_name: session.customer_details?.name || order.customer_name,
            shipping_address: session.shipping_details || order.shipping_address,
            total: session.amount_total ? session.amount_total / 100 : order.total,
            items: session.metadata?.items_json
              ? JSON.parse(session.metadata.items_json)
              : order.items,
          })
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

          // Enviar correo de confirmación
          await sendConfirmationEmail({
            order_number: orderNumber,
            customer_email: session.customer_details?.email || 'cliente@email.com',
            customer_name: session.customer_details?.name || 'Cliente',
            shipping_address: session.shipping_details || {},
            total: session.amount_total ? session.amount_total / 100 : 0,
            items: items,
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
