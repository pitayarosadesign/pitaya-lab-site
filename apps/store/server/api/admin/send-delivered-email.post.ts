import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// 🎉 Envía al cliente un correo de confirmación de entrega
// cuando el admin marca un pedido como entregado en el panel admin.
// Incluye un CTA de dejar una reseña del producto.
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.resendApiKey || config.resendApiKey === 're_...') {
    return { error: 'Resend no configurado', sent: false }
  }

  const resend = new Resend(config.resendApiKey)
  const body = await readBody(event).catch(() => ({}))

  const customerEmail = (body && body.customerEmail) || ''
  const customerName = (body && body.customerName) || 'Cliente'
  const orderNumber = (body && body.orderNumber) || ''

  if (!customerEmail) {
    return { error: 'Faltan datos: customerEmail es requerido', sent: false }
  }

  // Link de la página de reseña
  const reviewUrl = 'https://www.pitayalab.com.mx/resena'

  // Leer config de correos de site_config para el remitente personalizado
  let fromName = 'PITAYA LAB'
  let fromEmail = 'pedidos@pitayalab.com.mx'

  try {
    const supabaseAdmin = createClient(
      config.public.supabaseUrl,
      config.supabaseServiceKey,
      { auth: { persistSession: false, autoRefreshToken: false } }
    )
    const { data } = await supabaseAdmin
      .from('site_config')
      .select('value')
      .eq('key', 'email_config')
      .limit(1)
    const emailConfig = data?.[0]?.value
    if (emailConfig?.fromName) fromName = emailConfig.fromName
    if (emailConfig?.fromEmail) fromEmail = emailConfig.fromEmail
  } catch (e) {
    console.error('Error leyendo email_config:', e)
  }

  const brandBody = `
              <div style="font-family:Georgia,serif;font-size:20px;color:#2f221b;margin:0 0 16px;">
                ¡Tu pedido fue entregado! 🎉
              </div>
              <div style="font-family:Arial,sans-serif;font-size:15px;color:#584236;line-height:1.7;margin:0 0 24px;">
                Hola <strong style="color:#166534;">${customerName}</strong>,<br/><br/>
                Tu pedido <strong style="color:#166534;">${orderNumber}</strong> ya fue entregado.
                Esperamos que disfrutes cada aroma y que transforme tu hogar. ✨
              </div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="border:1px solid #e5e0d6;border-radius:12px;padding:20px 22px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="font-family:Arial,sans-serif;font-size:13px;color:#815f46;padding:5px 0;">Pedido</td>
                      <td align="right" style="font-family:Arial,sans-serif;font-size:14px;font-weight:bold;color:#2f221b;padding:5px 0;">${orderNumber}</td>
                    </tr>
                    <tr>
                      <td style="font-family:Arial,sans-serif;font-size:13px;color:#815f46;padding:5px 0;">Estado</td>
                      <td align="right" style="font-family:Arial,sans-serif;font-size:14px;font-weight:bold;color:#166534;padding:5px 0;">✅ Entregado</td>
                    </tr>
                  </table>
                </td></tr>
              </table>

              <div style="font-family:Arial,sans-serif;font-size:15px;color:#584236;line-height:1.7;margin:28px 0 6px;">
                Además, tu opinión vale mucho para nosotros. 💚<br/>
                ¿Nos cuentas cómo te fue con tu compra?
              </div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0 0;">
                <tr><td align="center">
                  <a href="${reviewUrl}" target="_blank" rel="noopener"
                     style="display:inline-block;background:#166534;color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;font-weight:bold;font-size:14px;padding:13px 32px;border-radius:999px;">
                    📝 Deja tu reseña
                  </a>
                </td></tr>
              </table>

              <div style="font-family:Arial,sans-serif;font-size:13px;color:#815f46;line-height:1.7;margin-top:20px;">
                ¿Todo llegó en perfectas condiciones? Si tienes alguna duda o inquietud,
                escríbenos a
                <a href="mailto:contacto@pitayalab.com.mx" style="color:#166534;">contacto@pitayalab.com.mx</a>.
              </div>
              <div style="font-family:Arial,sans-serif;font-size:13px;color:#815f46;margin-top:18px;">
                Gracias por elegir <strong style="color:#166534;">PITAYA LAB</strong>. 💚
              </div>
        `
  try {
    await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: customerEmail,
      subject: `🎉 Tu pedido ${orderNumber} fue entregado | PITAYA LAB`,

      html: emailLayout({
        title: `Tu pedido ${orderNumber} fue entregado | PITAYA LAB`,
        preheader: `Tu pedido ${orderNumber} ya está contigo. Cuéntanos tu experiencia dejando una reseña.`,
        body: brandBody,
      }),
    })
    return { sent: true, to: customerEmail }
  } catch (e: any) {
    console.error('Error enviando correo de entrega:', e?.message || e)
    return { error: e?.message || 'Error enviando correo', sent: false }
  }
})
