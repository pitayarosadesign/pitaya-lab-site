// 🎨 Plantilla de correo con la identidad de marca PITAYA LAB.
// Centraliza el diseño (logo, colores, footer) para que todos los correos
// compartan la misma imagen de marca. Cualquier cambio aquí se refleja en
// todos los correos al redesplegar.
//
// Estilo: limpio y minimalista. Fondo blanco, logo circular, acentos verdes
// sutiles y footer sencillo sin bloques de color saturados.

// Paleta de marca
export const BRAND = {
  name: 'PITAYA LAB',
  tagline: 'Fragancias que conectan',
  logoUrl: 'https://www.pitayalab.com.mx/images/brand/logo-pitayalab.png',
  // verde (primary)
  green: {
    base: '#166534',
    l1: '#15803d',
    light: '#dcfce7',
    pale: '#f0fdf4',
  },
  // ámbar (acento)
  amber: {
    base: '#b45309',
    light: '#fef3c7',
  },
  // tierra (neutro)
  earth: {
    dark: '#2f221b',
    body: '#584236',
    muted: '#815f46',
    border: '#e5e0d6',
    bg: '#f7f5f1',
  },
  contactEmail: 'contacto@pitayalab.com.mx',
  siteUrl: 'https://www.pitayalab.com.mx',
}

// Envuelve el contenido HTML con el header (logo circular + marca) y el footer.
// Uso:
//   emailLayout({ title, preheader, body })
export function emailLayout(opts: {
  title: string
  preheader?: string
  body: string
}) {
  const b = BRAND
  return `
<!DOCTYPE html>
<html lang="es-MX" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${opts.title}</title>
  ${opts.preheader ? `<div style="display:none;font-size:1px;color:#333;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${opts.preheader}</div>` : ''}
</head>
<body style="margin:0;padding:0;background-color:${b.earth.bg};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${b.earth.bg};">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${b.earth.border};border-radius:16px;overflow:hidden;">
          <!-- HEADER (limpio, logo circular) -->
          <tr>
            <td align="center" style="padding:32px 24px 8px;">
              <img src="${b.logoUrl}" alt="${b.name}" width="88" height="88"
                   style="display:block;margin:0 auto;width:88px;height:88px;border-radius:50%;object-fit:cover;border:3px solid ${b.green.light};" />
              <div style="font-family:'Georgia',serif;font-size:20px;font-weight:bold;color:${b.green.base};letter-spacing:2px;margin-top:14px;">${b.name}</div>
              <div style="font-family:Arial,sans-serif;font-size:12px;color:${b.earth.muted};margin-top:3px;letter-spacing:1px;">${b.tagline}</div>
            </td>
          </tr>
          <!-- Separador sutil -->
          <tr>
            <td style="padding:16px 40px 0;">
              <div style="border-top:1px solid ${b.earth.border};"></div>
            </td>
          </tr>
          <!-- BODY -->
          <tr>
            <td style="padding:24px 40px 32px;">
              ${opts.body}
            </td>
          </tr>
          <!-- FOOTER (simple, sin fondo saturado) -->
          <tr>
            <td style="padding:20px 40px 28px;border-top:1px solid ${b.earth.border};text-align:center;">
              <div style="font-family:Arial,sans-serif;font-size:12px;color:${b.earth.muted};line-height:1.7;">
                ${b.name} · ${b.tagline}<br/>
                <a href="mailto:${b.contactEmail}" style="color:${b.green.base};text-decoration:none;">${b.contactEmail}</a>
                &nbsp;·&nbsp;
                <a href="${b.siteUrl}" style="color:${b.green.base};text-decoration:none;">${b.siteUrl}</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
