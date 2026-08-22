import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

/**
 * 💚 MERCADO PAGO - Webhook de notificaciones
 * ============================================
 * Recibe notificaciones de pago de Mercado Pago.
 * Mercado Pago envía un `data.id` (payment_id) y `type` (payment | plan | subscription).
 * Luego consultamos el pago para confirmar el estado y actualizar la orden.
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.mercadoPagoAccessToken || config.mercadoPagoAccessToken === 'TEST-...') {
    return { error: 'Mercado Pago no configurado' }
  }

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

  // Helper para enviar correo de confirmación (reutiliza la misma lógica que Stripe)
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

  try {
    const body = await readBody(event)

    // Mercado Pago envía: { type: 'payment', data: { id: '123456789' } }
    const { type, data } = body || {}
    const paymentId = data?.id

    if (!paymentId) {
      console.error('No se recibió payment_id en webhook de Mercado Pago')
      return { received: true } // Responder 200 para no reintentar
    }

    // Consultar el pago en Mercado Pago para obtener el estado real
    const paymentResponse = await $fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.mercadoPagoAccessToken}`,
      },
    })

    const status = paymentResponse?.status // approved | pending | rejected | cancelled | in_process
    const externalReference = paymentResponse?.external_reference // nuestro order_number
    const payerEmail = paymentResponse?.payer?.email
    const payerName = paymentResponse?.payer?.first_name
    const payerLastName = paymentResponse?.payer?.last_name
    const transactionAmount = paymentResponse?.transaction_amount
    const paymentMethodId = paymentResponse?.payment_method_id // oxxo, spei, visa, etc.

    if (!externalReference) {
      console.error('No se encontró external_reference en el pago')
      return { received: true }
    }

    // Buscar la orden por order_number
    const { data: orders } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('order_number', externalReference)
      .limit(1)

    const order = orders?.[0]

    if (!order) {
      console.error(`No se encontró orden con número ${externalReference}`)
      return { received: true }
    }

    // Actualizar la orden según el estado del pago
    if (status === 'approved') {
      const { error: updateError } = await supabaseAdmin
        .from('orders')
        .update({
          status: 'confirmed',
          payment_status: 'paid',
          mp_payment_id: String(paymentId),
          mp_payment_method: paymentMethodId || null,
          customer_email: payerEmail || order.customer_email,
          customer_name: `${payerName || ''} ${payerLastName || ''}`.trim() || order.customer_name,
          paid_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', order.id)

      if (updateError) {
        console.error('Error actualizando orden Mercado Pago:', updateError.message)
        throw createError({ statusCode: 500, message: `Error actualizando orden: ${updateError.message}` })
      }

      console.log(`✅ Orden ${order.order_number} pagada con Mercado Pago (${paymentMethodId})`)

      // Enviar correo de confirmación
      await sendConfirmationEmail({
        ...order,
        customer_email: payerEmail || order.customer_email,
        customer_name: `${payerName || ''} ${payerLastName || ''}`.trim() || order.customer_name,
        total: transactionAmount || order.total,
      })

      // Notificar al admin
      await sendAdminNotification({
        order_number: order.order_number,
        customer_email: payerEmail || order.customer_email,
        customer_name: `${payerName || ''} ${payerLastName || ''}`.trim() || order.customer_name,
        customer_phone: order.customer_phone || null,
        shipping_address: order.shipping_address || {},
        total: transactionAmount || order.total,
        items: order.items || [],
      })
    } else if (status === 'rejected' || status === 'cancelled') {
      await supabaseAdmin
        .from('orders')
        .update({
          payment_status: 'failed',
          status: 'cancelled',
          mp_payment_id: String(paymentId),
          updated_at: new Date().toISOString(),
        })
        .eq('id', order.id)
      console.log(`❌ Orden ${order.order_number} rechazada/cancelada en Mercado Pago`)
    } else if (status === 'pending' || status === 'in_process') {
      // Pago pendiente (SPEI/OXXO) - mantener como pending
      await supabaseAdmin
        .from('orders')
        .update({
          mp_payment_id: String(paymentId),
          mp_payment_method: paymentMethodId || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', order.id)
      console.log(`⏳ Orden ${order.order_number} pendiente de pago (${paymentMethodId})`)
    }

    return { received: true }
  } catch (e: any) {
    console.error('Error en webhook de Mercado Pago:', e)
    // Responder 200 para que Mercado Pago no reintente infinitamente
    return { received: true, error: e?.message }
  }
})
