import { createClient } from '@supabase/supabase-js'
import { parse } from 'csv-parse/sync'

// POST /api/aromas/import-csv
// Importa (upsert por `slug`) el catálogo de aromas desde CSV.
// Columnas esperadas (header):
//   name | slug | subtitle | experience | notes | inspiracion | image_url | olfactive_family | collection_tag | is_active
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const records = parse(body.csv || '', {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
    })

    if (!records || records.length === 0) {
      throw createError({ statusCode: 400, message: 'El archivo CSV está vacío o no tiene filas válidas.' })
    }

    const FAMILIAS = new Set(['floral', 'oriental', 'amaderada', 'citrica'])
    const results = { imported: 0, updated: 0, errors: [], total: records.length }

    const slugify = (s) =>
      String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()

    for (let i = 0; i < records.length; i++) {
      const row = records[i]
      const rowNum = i + 2 // +1 header
      try {
        const name = (row.name || '').trim()
        if (!name) throw new Error(`Fila ${rowNum}: falta el campo "name"`)
        let slug = (row.slug || '').trim() || slugify(name)
        if (!slug) throw new Error(`Fila ${rowNum}: slug inválido`)

        const family = (row.olfactive_family || '').trim().toLowerCase()
        if (family && !FAMILIAS.has(family)) {
          throw new Error(`Fila ${rowNum}: olfactive_family debe ser una de floral|oriental|amaderada|citrica (recibí "${family}")`)
        }

        const payload = {
          name,
          slug,
          subtitle: (row.subtitle || '').trim() || null,
          experience: (row.experience || '').trim() || null,
          notes: (row.notes || '').trim() || null,
          inspiracion: (row.inspiracion || '').trim() || null,
          image_url: (row.image_url || '').trim() || null,
          olfactive_family: family || null,
          collection_tag: (row.collection_tag || '').trim() || null,
        }

        // is_active: booleano tolerado ('true'/'1'/'sí'/'')
        const rawActive = String(row.is_active ?? '').trim().toLowerCase()
        if (rawActive !== '' && row.is_active !== undefined) {
          payload.is_active = !['0', 'false', 'no', 'f'].includes(rawActive)
        }

        // ¿Existe por slug? → update; si no → insert
        const { data: existing, error: errSel } = await supabaseAdmin
          .from('fragrance_profiles').select('id').eq('slug', slug).maybeSingle()
        if (errSel) throw errSel

        if (existing) {
          const { error } = await supabaseAdmin
            .from('fragrance_profiles').update({ ...payload }).eq('id', existing.id)
          if (error) throw error
          results.updated++
        } else {
          const { error } = await supabaseAdmin
            .from('fragrance_profiles').insert({ ...payload })
          if (error) throw error
          results.imported++
        }
      } catch (e) {
        results.errors.push({ row: rowNum, message: e.message || String(e) })
      }
    }

    return { ok: true, ...results }
  } catch (e) {
    if (e.statusCode) throw e
    throw createError({ statusCode: 500, message: e.message })
  }
})
