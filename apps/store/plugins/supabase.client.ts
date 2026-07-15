import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl
  const supabaseKey = config.public.supabaseAnonKey

  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase no configurado. Revisa el .env')
    return {
      provide: {
        supabase: null,
      },
    }
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false, // La tienda no necesita sesión de usuario
    },
  })

  return {
    provide: {
      supabase,
    },
  }
})
