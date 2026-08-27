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
    apiVersion: '2026-06-24.dahlia',
  })

  const resend = config.resendApiKey ? new Resend(config.resendApiKey) : null

  let supabaseAdmin: any = null
  try {
    supabaseAdmin = createClient(
      config.public.supabaseUrl,
      config.supabaseServiceKey,
      { auth: { persistSession: false, autoRefreshToken: false } }
    )
  } catch (e) {
    console.error('Error creando cliente Supabase:', e)
  }

  // Helper para enviar correo de confirmación
  async function sendConfirmationEmail(order: any) {
    if (!resend || !config.resendApiKey) {
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

  // 🔔 Helper para notificar al admin de un nuevo pedido
  async function sendAdminNotification(order: any) {
    if (!resend || !config.resendApiKey) {
      console.warn('Resend no configurado, no se envió notificación al admin')
      return
    }

    // Leer la config de correos de site_config (adminEmail configurado en el panel)
    let adminEmail: string | null = null
    try {
      const { data: emailConfig } = await supabaseAdmin
        .from('site_config')
        .select('value')
        .eq('key', 'email_config')
        .limit(1)
      adminEmail = emailConfig?.[0]?.value?.adminEmail || null
    } catch (e) {
      console.error('Error leyendo email_config:', e)
    }

    if (!adminEmail) {
      console.warn('adminEmail no configurado en site_config, no se envió notificación al admin')
      return
    }

    const itemsHtml = (order.items || []).map((item: any) =>
      `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">${item.name || 'Producto'}</td>
        <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity || 1}</td>
        <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;text-align:right;">$${((item.price || 0) / 100).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
      </tr>`
    ).join('')

    try {
      await resend.emails.send({
        from: 'PITAYA LAB <pedidos@pitayalab.com.mx>',
        to: adminEmail,
        subject: `🛒 Nuevo pedido - ${order.order_number} | PITAYA LAB`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
            <div style="text-align:center;padding:30px 0;background:linear-gradient(135deg,#7c2d12,#431407);border-radius:16px 16px 0 0;">
              <h1 style="color:#fff;margin:0;font-size:24px;">🛒 ¡Nuevo pedido recibido!</h1>
              <p style="color:#fdba74;margin:8px 0 0;">PITAYA LAB</p>
            </div>
            <div style="background:#fff;padding:30px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 16px 16px;">
              <p style="color:#374151;font-size:16px;margin:0 0 20px;">
                Recibimos el pedido <strong style="color:#7c2d12;">${order.order_number}</strong> y requiere tu atención.
              </p>

              <div style="background:#f9fafb;border-radius:12px;padding:20px;margin:20px 0;">
                <h3 style="color:#374151;font-size:14px;margin:0 0 10px;">👤 Cliente</h3>
                <p style="color:#6b7280;font-size:13px;margin:0;">
                  <strong>Nombre:</strong> ${order.customer_name || 'No capturado'}<br>
                  <strong>Email:</strong> ${order.customer_email || 'No capturado'}<br>
                  <strong>Teléfono:</strong> ${order.customer_phone || 'No capturado'}
                </p>
              </div>

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

              <div style="border-top:2px solid #7c2d12;padding-top:15px;margin-top:15px;">
                <p style="margin:0;text-align:right;font-size:18px;font-weight:bold;color:#7c2d12;">
                  Total: $${(order.total || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </p>
              </div>

              <div style="background:#f9fafb;border-radius:12px;padding:20px;margin:20px 0;">
                <h3 style="color:#374151;font-size:14px;margin:0 0 10px;">🚚 Envío a:</h3>
                <p style="color:#6b7280;font-size:13px;margin:0;">
                  ${order.shipping_address?.address?.line1 || 'Dirección registrada en Stripe'},
                  ${order.shipping_address?.address?.city || ''} ${order.shipping_address?.address?.state || ''}<br>
                  CP: ${order.shipping_address?.address?.postal_code || ''}
                </p>
              </div>

              <p style="color:#9ca3af;font-size:12px;text-align:center;margin:20px 0 0;">
                Puedes ver el detalle del pedido en el panel de administración.
              </p>
            </div>
          </div>
        `,
      })
      console.log(`✅ Notificación enviada al admin (${adminEmail}) para orden ${order.order_number}`)
    } catch (e) {
      console.error('Error enviando notificación al admin:', e)
    }
  }

  // Helper para crear/actualizar el cliente en la tabla customers
  async function upsertCustomer(order: any) {
    if (!supabaseAdmin) return
    const email = order.customer_email
    if (!email || email === 'pendiente@checkout.com' || email === 'cliente@email.com') return

    const name = (order.customer_name || '').trim()
    const nameParts = name.split(' ')
    const first_name = nameParts[0] || ''
    const last_name = nameParts.slice(1).join(' ') || ''

    try {
      // Buscar si el cliente ya existe
      const { data: existing } = await supabaseAdmin
        .from('customers')
        .select('id, total_orders, total_spent')
        .eq('email', email)
        .limit(1)

      if (existing?.[0]) {
        // Actualizar cliente existente
        await supabaseAdmin
          .from('customers')
          .update({
            first_name: first_name || existing[0].first_name,
            last_name: last_name || existing[0].last_name,
            phone: order.customer_phone || existing[0].phone,
            shipping_address: order.shipping_address || existing[0].shipping_address,
            total_orders: (existing[0].total_orders || 0) + 1,
            total_spent: (existing[0].total_spent || 0) + (order.total || 0),
            last_order_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing[0].id)
      } else {
        // Crear nuevo cliente
        await supabaseAdmin
          .from('customers')
          .insert({
            email,
            first_name,
            last_name,
            phone: order.customer_phone || null,
            shipping_address: order.shipping_address || {},
            total_orders: 1,
            total_spent: order.total || 0,
            last_order_at: new Date().toISOString(),
          })
      }
    } catch (e) {
      console.error('Error upsertando cliente:', e)
    }
  }

  try {
    const signature = event.node.req.headers['stripe-signature']

    if (!signature) {
      console.error('No se recibió cabecera stripe-signature')
      throw createError({ statusCode: 400, message: 'Falta cabecera stripe-signature' })
    }

    // ✅ Leer el RAW BODY UNA SOLA VEZ → es la fuente de verdad para la firma
    // ⚠️ No usar readBody() aquí: consumiría el stream y rompería readRawBody()
    let rawBody: string | undefined
    try {
      rawBody = await readRawBody(event)
    } catch (e: any) {
      console.error('Error leyendo raw body:', e?.message)
      throw createError({ statusCode: 400, message: `Error leyendo body: ${e?.message}` })
    }

    if (!rawBody) {
      console.error('Body vacío en webhook de Stripe')
      throw createError({ statusCode: 400, message: 'Body vacío' })
    }

    // ✅ Validar firma webhook usando EL RAW BODY (tal cual lo recibió Stripe)
    let webhookEvent: Stripe.Event
    try {
      webhookEvent = stripe.webhooks.constructEvent(
        rawBody,
        signature as string,
        config.stripeWebhookSecret
      )
    } catch (err: any) {
      console.error('Error verificando webhook:', err?.message)
      throw createError({ statusCode: 400, message: `Error de firma: ${err?.message}` })
    }

    // ⚠️ Usar webhookEvent.data.object → ya viene parseado por Stripe
    const eventData = webhookEvent

    switch (eventData.type) {
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
          const { error: updateError } = await supabaseAdmin
            .from('orders')
            .update({
              status: 'confirmed',
              payment_status: 'paid',
              stripe_payment_intent_id: (session.payment_intent as string) || order.stripe_payment_intent_id,
              customer_email: session.customer_details?.email || order.customer_email,
              customer_name: session.customer_details?.name || order.customer_name,
              customer_phone: session.customer_details?.phone || null,
              shipping_address: session.shipping_details || {},
              paid_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('id', order.id)

          if (updateError) {
            console.error('Error actualizando orden:', updateError.message)
            throw createError({ statusCode: 500, message: `Error actualizando orden: ${updateError.message}` })
          }

          console.log(`✅ Orden ${order.order_number} pagada con éxito`)

          // Crear/actualizar el cliente en la tabla customers
          await upsertCustomer({
            customer_email: session.customer_details?.email || order.customer_email,
            customer_name: session.customer_details?.name || order.customer_name,
            customer_phone: session.customer_details?.phone || null,
            shipping_address: session.shipping_details || order.shipping_address,
            total: session.amount_total ? session.amount_total / 100 : order.total,
          })

          // Parsear items con seguridad (evitar romper el webhook si JSON es inválido)
          let itemsForEmail = order.items || []
          if (session.metadata?.items_json) {
            try {
              itemsForEmail = JSON.parse(session.metadata.items_json)
            } catch {
              // ignorar si no es JSON válido
            }
          }

          // Enviar correo de confirmación (nunca debe detener el 2xx si falla)
          await sendConfirmationEmail({
            ...order,
            customer_email: session.customer_details?.email || order.customer_email,
            customer_name: session.customer_details?.name || order.customer_name,
            shipping_address: session.shipping_details || order.shipping_address,
            total: session.amount_total ? session.amount_total / 100 : order.total,
            items: itemsForEmail,
          })

          // 🔔 Notificar al admin del pedido
          await sendAdminNotification({
            order_number: order.order_number,
            customer_email: session.customer_details?.email || order.customer_email,
            customer_name: session.customer_details?.name || order.customer_name,
            customer_phone: session.customer_details?.phone || null,
            shipping_address: session.shipping_details || order.shipping_address,
            total: session.amount_total ? session.amount_total / 100 : order.total,
            items: itemsForEmail,
          })
        } else {
          // Crear nueva orden si no existe
          let items = []
          if (session.metadata?.items_json) {
            try {
              items = JSON.parse(session.metadata.items_json)
            } catch {
              // ignorar si no es JSON válido
            }
          }

          const orderNumber = `PIT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`

          const { error: insertError } = await supabaseAdmin
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

          if (insertError) {
            console.error('Error creando orden:', insertError.message)
            throw createError({ statusCode: 500, message: `Error creando orden: ${insertError.message}` })
          }

          // Crear/actualizar el cliente en la tabla customers
          await upsertCustomer({
            customer_email: session.customer_details?.email || 'cliente@email.com',
            customer_name: session.customer_details?.name || 'Cliente',
            customer_phone: session.customer_details?.phone || null,
            shipping_address: session.shipping_details || {},
            total: session.amount_total ? session.amount_total / 100 : 0,
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

          // 🔔 Notificar al admin del pedido
          await sendAdminNotification({
            order_number: orderNumber,
            customer_email: session.customer_details?.email || 'cliente@email.com',
            customer_name: session.customer_details?.name || 'Cliente',
            customer_phone: session.customer_details?.phone || null,
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
  } catch (e: any) {
    // 🔧 Errores de Stripe (firma inválida) → devolver 400 para que Stripe no reintente
    if (e.statusCode === 400) {
      throw e
    }

    // Cualquier otro error: loguear y devolver 500 para que Stripe reintente
    console.error('Error en webhook:', e)
    throw createError({ statusCode: 500, message: e.message || 'Error interno del webhook' })
  }
})
