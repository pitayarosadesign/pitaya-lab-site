import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

export function useSupabase() {
  const { $supabase } = useNuxtApp()
  return $supabase
}

// Cliente admin (service role) - para operaciones que requieren saltar RLS
export function useSupabaseAdmin() {
  const config = useRuntimeConfig()
    const supabaseUrl = config.public.supabaseUrl
  const serviceKey = config.supabaseServiceKey

  if (!supabaseUrl || !serviceKey) {
    console.error('❌ Supabase Admin no configurado. Revisa el .env')
    return null
    }

  return createClient(supabaseUrl, serviceKey, {
      auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
