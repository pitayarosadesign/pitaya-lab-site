// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'PITAYA LAB | Velas de Soya, Aceites Aromáticos y Brumas Ecológicas',
      meta: [
        { name: 'description', content: 'Descubre PITAYA LAB: velas de soya perfumadas, aceites aromáticos para difusores y brumas aromáticas ecológicas. Productos botánicos biodegradables que transforman tu hogar con fragancias inspiradas en la naturaleza y hoteles de lujo.' },
        { name: 'keywords', content: 'velas de soya, aceites aromáticos, brumas aromáticas, aromatizantes naturales, Pitaya Lab, productos biodegradables, fragancias para hogar, Xcaret, Vidanta, Solara, Maderas del Edén' },
        { name: 'p:domain_verify', content: 'd1f4d6f02a0cc071ee113b862fd17940' },
        { property: 'og:title', content: 'PITAYA LAB | Velas de Soya, Aceites Aromáticos y Brumas Ecológicas' },
        { property: 'og:description', content: 'Productos botánicos biodegradables que transforman tu hogar con exquisitas fragancias. Velas de soya, aceites aromáticos y brumas.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://pitayalab.com' },
        { name: 'robots', content: 'index, follow' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' }
      ]
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
    }
  },

  modules: [
    '@nuxtjs/seo'
  ],

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  seo: {
    redirectToCanonical: true,
    autoMeta: true,
    experimental: {
      noScriptLinks: true
    }
  },

  // 🖼️ OG Image - Desactiva la generación dinámica (cero warnings)
  ogImage: {
    zeroRuntime: true
  },

  nitro: {
    prerender: {
      routes: ['/', '/about', '/philosophy', '/catalog']
    }
  }
})

