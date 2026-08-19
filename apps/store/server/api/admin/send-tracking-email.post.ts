import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// 📦 Envía al cliente un correo de seguimiento con su guía de rastreo
// cuando el admin marca un pedido como enviado en el panel admin.
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
  const trackingNumber = (body && body.trackingNumber) || ''
  const trackingCarrier = (body && body.trackingCarrier) || ''

  if (!customerEmail || !trackingNumber) {
    return { error: 'Faltan datos: customerEmail y trackingNumber son requeridos', sent: false }
  }

  // Construir enlace de rastreo según la paquetería (Envía/paqueterías destino)
  let trackingUrl = ''
  const encoded = encodeURIComponent(trackingNumber)
  switch ((trackingCarrier || '').toLowerCase()) {
    case 'estafeta':
      trackingUrl = `https://www.estafeta.com/rastreo?id=${encoded}`
      break
    case 'fedex':
      trackingUrl = `https://www.fedex.com/fedextrack/?trknbr=${encoded}`
      break
    case 'dhl':
      trackingUrl = `https://www.dhl.com/mx-es/home/tracking.html?tracking-id=${encoded}`
      break
    case 'redpack':
      trackingUrl = `https://www.redpack.com.mx/rastreo/?tracking=${encoded}`
      break
    case 'paqueteexpress':
      trackingUrl = `https://www.paqueteexpress.com/rastreo/?tracking=${encoded}`
      break
    default:
      // genérico Envia.com
      trackingUrl = `https://www.envia.com/es-mx/track/${encoded}`
  }

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

  const carrierLabel = trackingCarrier || 'tu paquetería'
  const orderLink = 'https://www.pitayalab.com.mx'

const brandBody = `
              <div style="font-family:Georgia,serif;font-size:20px;color:#2f221b;margin:0 0 16px;">
                ¡Tu pedido va en camino! 🚚
              </div>
              <div style="font-family:Arial,sans-serif;font-size:15px;color:#584236;line-height:1.7;margin:0 0 24px;">
                Hola <strong style="color:#166534;">${customerName}</strong>,<br/><br/>
                ¡Buenas noticias! Tu pedido <strong style="color:#166534;">${orderNumber}</strong> ya fue enviado
                y viene rumbo a ti. ✨
              </div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="border:1px solid #e5e0d6;border-radius:12px;padding:20px 22px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="font-family:Arial,sans-serif;font-size:13px;color:#815f46;padding:5px 0;">Paquetería</td>
                      <td align="right" style="font-family:Arial,sans-serif;font-size:14px;font-weight:bold;color:#2f221b;padding:5px 0;">${carrierLabel}</td>
                    </tr>
                    <tr>
                      <td style="font-family:Arial,sans-serif;font-size:13px;color:#815f46;padding:5px 0;">Número de guía</td>
                      <td align="right" style="font-family:'Courier New',monospace;font-size:14px;font-weight:bold;color:#166534;padding:5px 0;">${trackingNumber}</td>
                    </tr>
                    <tr>
                      <td style="padding:18px 0 0;" colspan="2" align="center">
                        <a href="${trackingUrl}" target="_blank" rel="noopener"
                           style="display:inline-block;background:#166534;color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;font-weight:bold;font-size:14px;padding:13px 32px;border-radius:999px;">
                          📍 Rastrear mi pedido
                        </a>
                      </td>
                    </tr>
                  </table>
                </td></tr>
              </table>

              <div style="font-family:Arial,sans-serif;font-size:13px;color:#815f46;line-height:1.7;margin:24px 0 0;">
                ¿Tienes dudas sobre tu entrega? Escríbenos a
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
      subject: `📦 Tu pedido ${orderNumber} está en camino | PITAYA LAB`,

      html: emailLayout({
        title: `Tu pedido ${orderNumber} está en camino | PITAYA LAB`,
        preheader: `Tu pedido ${orderNumber} ya fue enviado con ${carrierLabel}, guía ${trackingNumber}`,
        body: brandBody,
      }),
    })
    return { sent: true, to: customerEmail }
  } catch (e: any) {
    console.error('Error enviando correo de seguimiento:', e?.message || e)
    return { error: e?.message || 'Error enviando correo', sent: false }
  }
})
