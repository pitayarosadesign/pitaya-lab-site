import { createClient } from '@supabase/supabase-js'


// Plugin universal de Supabase para el store.
// Funciona tanto en SSR como en el cliente, permitiendo que las secciones
// se rendericen en el servidor (mejor SEO y sin hydration mismatches).
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
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })

  return {
    provide: {
      supabase,
    },
  }
})
