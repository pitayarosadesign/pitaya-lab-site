// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { config } from 'dotenv'
import { resolve } from 'path'

// Cargar variables del .env raíz para workspaces
config({ path: resolve(__dirname, '../../.env') })

export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Panel Administrativo | PITAYA LAB',
      meta: [
        { name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  },

  css: ['~/assets/css/admin.css'],

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || '',
      stripePublishableKey: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    },
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || '',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    skydropxApiKey: process.env.SKYDROPX_API_KEY || '',
  },

  modules: [],

  vite: {
    plugins: [
      tailwindcss()
    ],
    optimizeDeps: {
      include: [
        '@supabase/supabase-js',
      ]
    }
  },

  nitro: {
    prerender: {
      routes: ['/login']
    }
  }
})
