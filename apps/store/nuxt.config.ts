// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { config } from 'dotenv'
import { resolve } from 'path'

// Cargar variables del .env raíz para workspaces
config({ path: resolve(__dirname, '../../.env') })

// 📊 Meta/Facebook Pixel ID (configurable vía NUXT_PUBLIC_FB_PIXEL_ID)
const fbPixelId = process.env.NUXT_PUBLIC_FB_PIXEL_ID || '1031196445800113'

export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      title: 'PITAYA LAB | Velas de Soya, Aceites Aromáticos y Brumas Ecológicas',
      meta: [
        { name: 'description', content: 'Descubre PITAYA LAB: velas de soya perfumadas, aceites aromáticos para difusores y brumas aromáticas ecológicas. Productos botánicos biodegradables que transforman tu hogar con fragancias inspiradas en la naturaleza y hoteles de lujo.' },
        { name: 'keywords', content: 'velas de soya, aceites aromáticos, brumas aromáticas, aromatizantes naturales, Pitaya Lab, productos biodegradables, fragancias para hogar, Xcaret, Vidanta, Solara, Maderas del Edén' },
        // p:domain_verify manejado en plugins/pinterest-verify.ts
        { property: 'og:title', content: 'PITAYA LAB | Velas de Soya, Aceites Aromáticos y Brumas Ecológicas' },
        { property: 'og:description', content: 'Productos botánicos biodegradables que transforman tu hogar con exquisitas fragancias. Velas de soya, aceites aromáticos y brumas.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.pitayalab.com.mx' },
        { name: 'robots', content: 'index, follow' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' }
      ],
      // 📊 Meta Pixel (código base en el <head> de todas las páginas)
      script: [
        {
          id: 'facebook-pixel',
          innerHTML: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${fbPixelId}');fbq('track','PageView');`,
        },
      ],
      noscript: [
        {
          innerHTML: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1"/>`,
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  css: ['~/assets/css/main.css'],

  // 🌿 Variables de entorno públicas (accesibles desde el cliente)
  runtimeConfig: {
    public: {
      emailjsPublicKey: process.env.NUXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
      emailjsServiceId: process.env.NUXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      emailjsTemplateId: process.env.NUXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || '',
      stripePublishableKey: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      fbPixelId: process.env.NUXT_PUBLIC_FB_PIXEL_ID || '1031196445800113',
    },
    // 🔒 Variables privadas (solo servidor)
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || '',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    skydropxApiKey: process.env.SKYDROPX_API_KEY || '',
    skydropxApiSecretKey: process.env.SKYDROPX_API_SECRET_KEY || '',
    enviaApiKey: process.env.ENVIA_API_KEY || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
    // 📊 Meta Conversions API (token de acceso; secreto, solo servidor)
    metaCapiToken: process.env.META_CAPI_ACCESS_TOKEN || process.env.FACEBOOK_PIXEL_ID || '',
  },

  modules: [
    '@nuxtjs/seo',
    '@pinia/nuxt',
  ],

  // Configuración de auto-import de componentes
  // pathPrefix:false → los componentes en subcarpetas (incl. b2b/) se usan sin prefijo
  components: [
    { path: '~/components', pathPrefix: false },
  ],

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  seo: {
    redirectToCanonical: true,
    autoMeta: false,
    experimental: {
      noScriptLinks: true
    }
  },

  routeRules: {
    '/api/checkout/webhook': { redirect: false, seo: { redirectToCanonical: false } },
    '/api/checkout/webhook/': { redirect: false, seo: { redirectToCanonical: false } },
    '/api/shipping/envia-webhook': { redirect: false, seo: { redirectToCanonical: false } },
    '/api/shipping/envia-webhook/': { redirect: false, seo: { redirectToCanonical: false } },
    // Alias para feeds
    '/sitemap.xml': { redirect: '/api/seo/sitemap.xml' },
    '/merchant-feed.xml': { redirect: '/api/merchant/feed.xml' },
    '/meta-catalog.json': { redirect: '/api/meta/catalog.json' },
    // Redirecciones legadas (SEO)
    '/recuerdos': { redirect: { to: '/catalog?categoria=recuerdos', statusCode: 301 } },
    '/fragrancias': { redirect: { to: '/catalog', statusCode: 301 } },
  },

  // 🖼️ OG Image - Desactiva la generación dinámica (cero warnings)
  ogImage: {
    zeroRuntime: true
  },

  // Sin prerender estático: el contenido de site_config (navbar, footer, SEO)
  // se renderiza on-demand para que los cambios del admin se vean al instante.
  robots: [
    {
      UserAgent: '*',
      Allow: '/',
      Disallow: ['/checkout/', '/api/'],
    },
    {
      UserAgent: 'Googlebot',
      Allow: '/',
    },
  ],

  sitemap: {
    hostname: 'https://www.pitayalab.com.mx',
    gzip: true,
    defaults: {
      changefreq: 'weekly',
      priority: 0.5,
    },
  }
})
