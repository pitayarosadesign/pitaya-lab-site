import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// 🔍 Usado por el panel admin para probar el envío de correos (Resend).
// El admin llama a este endpoint del store pasando el correo de prueba.
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.resendApiKey || config.resendApiKey === 're_...') {
    return { error: 'Resend no configurado', sent: false }
  }

  const resend = new Resend(config.resendApiKey)
  const body = await readBody(event).catch(() => ({}))
  const to = (body && body.email) || body || ''

  if (!to || typeof to !== 'string' || !to.includes('@')) {
    return { error: 'Correo destino inválido', sent: false }
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

  try {
    await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to,
      subject: '🧪 Correo de prueba | PITAYA LAB',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <div style="text-align:center;padding:30px 0;background:linear-gradient(135deg,#1a3a2a,#0d2818);border-radius:16px 16px 0 0;">
            <h1 style="color:#fff;margin:0;font-size:22px;">¡Conectado! 🧪</h1>
            <p style="color:#a7d4b0;margin:8px 0 0;">PITAYA LAB</p>
          </div>
          <div style="background:#fff;padding:30px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 16px 16px;">
            <p style="color:#374151;font-size:15px;margin:0 0 15px;">
              Hola, esto es un <strong>correo de prueba</strong> desde el panel de administración de PITAYA LAB.
            </p>
            <p style="color:#6b7280;font-size:14px;margin:0 0 15px;">
              Si estás viendo este mensaje, significa que Resend está correctamente configurado y podrás
              recibir las notificaciones de pedidos y confirmaciones.
            </p>
            <div style="background:#f0fdf4;border-radius:10px;padding:16px;text-align:center;">
              <p style="margin:0;font-size:14px;color:#166534;">✅ Todo en orden. ¡A vender! ✨</p>
            </div>
          </div>
        </div>
      `,
    })
    return { sent: true, to }
  } catch (e: any) {
    console.error('Error enviando correo de prueba:', e?.message || e)
    return { error: e?.message || 'Error enviando correo', sent: false }
  }
})

