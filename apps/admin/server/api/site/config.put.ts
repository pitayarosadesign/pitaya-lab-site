import { createClient } from '@supabase/supabase-js'

// PUT /api/site/config
// Guarda una o varias claves de `site_config` usando service_role (server-side).
//
// ⚠️ IMPORTANTE: los editores del admin NO deben escribir `site_config` desde el
// navegador con el cliente anónimo (RLS lo bloquea: "new row violates row-level
// security policy for table site_config"). La service key solo existe en el
// servidor, así que toda escritura pasa por este endpoint.
//
// Body: { entries: [{ key, value, description? }] }
//   - `value` puede ser objeto/array (se serializa a JSONB) o string.
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const entries = Array.isArray(body?.entries) ? body.entries : []

  if (!entries.length) {
    throw createError({ statusCode: 400, message: 'Falta el arreglo de entradas (entries)' })
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    // Upsert por lotes respetando la unicidad de `key`.
    const rows = entries.map((e) => ({
      key: e.key,
      value: typeof e.value === 'string' ? e.value : e.value ?? null,
      ...(e.description !== undefined ? { description: e.description } : {}),
      updated_at: new Date().toISOString(),
    }))

    const { error } = await supabaseAdmin
      .from('site_config')
      .upsert(rows, { onConflict: 'key' })

    if (error) throw error
    return { success: true, count: rows.length }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
