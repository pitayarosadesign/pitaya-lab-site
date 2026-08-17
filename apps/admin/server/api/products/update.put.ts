import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  // Aumentar el límite del body a 50MB para permitir subir varias imágenes
  // (producto + variantes) en base64 sin que falle el guardado.
  const body = await readBody(event, { sizeLimit: 50 * 1024 * 1024 })

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { id, product, images, variants, variantProfileIds } = body

    // 1. Actualizar producto
    const { error } = await supabaseAdmin
      .from('products')
      .update(product)
      .eq('id', id)

    if (error) throw error

    // 2. Gestionar variantes (aromas disponibles)
    // Las variantes se basan en la selección de perfiles aromáticos
    const isSelectionBased = Array.isArray(variantProfileIds)
    const isManualVariants = Array.isArray(variants) && !isSelectionBased

    const baseSku = product?.sku || ''
    if (isSelectionBased) {
      await syncVariantsByProfiles(supabaseAdmin, id, variantProfileIds, baseSku)
    } else if (isManualVariants) {
      await syncManualVariants(supabaseAdmin, id, variants, baseSku)
    }

    // 3. Si hay imágenes nuevas para subir
    if (Array.isArray(images) && images.length > 0) {
      const hasPrimary = images.some(img => img.is_primary)
      if (hasPrimary) {
        await supabaseAdmin
          .from('product_images')
          .update({ is_primary: false })
          .eq('product_id', id)
      }

      for (let i = 0; i < images.length; i++) {
        const img = images[i]

        if (img._new && img.data) {
          const ext = (img.name || 'image.png').split('.').pop()
          const filePath = `${id}/${Date.now()}-${i}.${ext}`
          const base64Data = img.data.replace(/^data:image\/\w+;base64,/, '')
          const buffer = Buffer.from(base64Data, 'base64')

          const { error: uploadError } = await supabaseAdmin.storage
            .from('product-images')
            .upload(filePath, buffer, {
              contentType: img.type || 'image/png',
              cacheControl: '31536000',
              upsert: false,
            })

          if (uploadError) throw uploadError

          const { data: publicUrl } = supabaseAdmin.storage
            .from('product-images')
            .getPublicUrl(filePath)

          await supabaseAdmin.from('product_images').insert({
            product_id: id,
            url: publicUrl.publicUrl,
            alt_text: product.name || '',
            sort_order: i,
            is_primary: img.is_primary || false,
          })
        }
      }
    }

    // 4. Actualizar is_primary y sort_order de imágenes existentes
    if (Array.isArray(images) && images.length > 0) {
      const hasPrimary = images.some(img => img.is_primary)
      if (hasPrimary) {
        await supabaseAdmin
          .from('product_images')
          .update({ is_primary: false })
          .eq('product_id', id)
      }

      for (let i = 0; i < images.length; i++) {
        const img = images[i]
        if (img.id && !img._new) {
          await supabaseAdmin
            .from('product_images')
            .update({
              is_primary: img.is_primary || false,
              sort_order: i,
            })
            .eq('id', img.id)
        }
      }
    }

    return { success: true }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})

// ============================================
// Sincronizar variantes basadas en selección de perfiles aromáticos
// ============================================
// profileIds puede ser:
//   - array de strings (solo IDs, backward compat): stock/sku/gtin por defecto
//   - array de objetos { profileId, stock, sku, gtin }: datos por variante
async function syncVariantsByProfiles(supabaseAdmin, productId, profileIds, baseSku = '') {
  // Normalizar a array de objetos
  const selections = (profileIds || []).map(item =>
    typeof item === 'string' ? { profileId: item } : item
  )
  const selectedProfileIdSet = new Set(selections.map(s => s.profileId))

  // Obtener los perfiles aromáticos seleccionados (con sus datos)
  let selectedProfiles = []
  if (selectedProfileIdSet.size > 0) {
    const { data: profiles, error: pError } = await supabaseAdmin
      .from('fragrance_profiles')
      .select('id, name, slug, subtitle, collection_id, image_url')
      .in('id', Array.from(selectedProfileIdSet))
      .eq('is_active', true)

    if (pError) throw pError
    selectedProfiles = profiles || []
  }

  // Obtener las variantes existentes del producto
  const { data: existingVariants, error: existingError } = await supabaseAdmin
    .from('product_variants')
    .select('id, fragrance_profile_id')
    .eq('product_id', productId)

  if (existingError) throw existingError

  const existing = existingVariants || []

  // Variantes que hay que ELIMINAR:
  //   - las que apuntan a un perfil que ya no está seleccionado
  //   - las huérfanas (fragrance_profile_id = null), ya que en modo de selección
  //     reemplazamos el conjunto completo de variantes del producto por las que
  //     corresponden a los perfiles aromáticos seleccionados. Esto evita
  //     duplicados (ej. un "Xcaret" viejo sin perfil + un "Xcaret" nuevo).
  const toDelete = existing.filter(v => !selectedProfileIdSet.has(v.fragrance_profile_id))
  if (toDelete.length > 0) {
    const { error: delError } = await supabaseAdmin
      .from('product_variants')
      .delete()
      .in('id', toDelete.map(v => v.id))
    if (delError) throw delError
  }

  // Para cada perfil seleccionado, crear la variante si no existe
  // (usamos el id de la variante existente si ya tiene ese perfil)
  const existingByProfile = new Map(
    existing.filter(v => v.fragrance_profile_id).map(v => [v.fragrance_profile_id, v])
  )

  for (let i = 0; i < selectedProfiles.length; i++) {
    const profile = selectedProfiles[i]
    const selection = selections.find(s => s.profileId === profile.id) || {}
    const existingVar = existingByProfile.get(profile.id)

    // SKU: usar el proporcionado o generar uno automáticamente
    const variantSku = selection.sku
      ? selection.sku
      : (profile.slug
          ? `${baseSku}-${profile.slug.toUpperCase()}`
          : `${baseSku}-${profile.name.replace(/\s+/g, '').toUpperCase()}`)

    // Resolver imagen de la variante:
    //   1) Conservar la imagen que ya tenía la variante si existe.
    //   2) Si no, usar la imagen del perfil aromático (fallback automático).
    let variantImageUrl = null
    if (existingVar) {
      const { data: ev } = await supabaseAdmin
        .from('product_variants')
        .select('image_url')
        .eq('id', existingVar.id)
        .single()
      variantImageUrl = ev?.image_url || null
    }
    if (!variantImageUrl && profile.image_url) {
      variantImageUrl = profile.image_url
    }

    // Resolver precio de la variante: el proporcionado o null (usará el del producto).
    const variantPrice = (!selection.price || selection.price === '') ? null : parseFloat(selection.price)
    const variantCompareAt = (!selection.compare_at_price || selection.compare_at_price === '') ? null : parseFloat(selection.compare_at_price)

    const variantData = {
      name: profile.name,
      sku: variantSku,
      description: profile.subtitle || null,
      fragrance_profile_id: profile.id,
      sort_order: i,
      is_active: true,
      stock: selection.stock !== undefined ? parseInt(selection.stock) || 0 : 0,
      gtin: selection.gtin || null,
      price: variantPrice,
      compare_at_price: variantCompareAt,
      image_url: variantImageUrl,
    }

    if (existingVar) {
      // Actualizar (preservar stock/sku/gtin si se proporcionaron)
      const updateData = {
        name: profile.name,
        description: profile.subtitle || null,
        sort_order: i,
        is_active: true,
      }
      if (selection.stock !== undefined) updateData.stock = parseInt(selection.stock) || 0
      if (selection.sku) updateData.sku = selection.sku
      if (selection.gtin !== undefined) updateData.gtin = selection.gtin || null
      if (selection.price !== undefined) updateData.price = variantPrice
      if (selection.compare_at_price !== undefined) updateData.compare_at_price = variantCompareAt
      // La imagen de la variante ya se resolvió arriba (conservar existente o usar la del perfil).
      updateData.image_url = variantImageUrl

      const { error: updError } = await supabaseAdmin
        .from('product_variants')
        .update(updateData)
        .eq('id', existingVar.id)
      if (updError) throw updError
    } else {
      // Insertar
      const { error: insError } = await supabaseAdmin
        .from('product_variants')
        .insert({
          product_id: productId,
          ...variantData,
        })
      if (insError) throw insError
    }
  }
}

// ============================================
// (Backward compat) Sincronizar variantes manuales (formato texto libre)
// ============================================
async function syncManualVariants(supabaseAdmin, productId, variants, baseSku = '') {
  const { data: existingVariants, error: existingError } = await supabaseAdmin
    .from('product_variants')
    .select('id')
    .eq('product_id', productId)

  if (existingError) throw existingError

  const existingIds = existingVariants?.map(v => v.id) || []
  const keptIds = variants.filter(v => v.id).map(v => v.id)
  const toDelete = existingIds.filter(idExistent => !keptIds.includes(idExistent))

  if (toDelete.length > 0) {
    const { error: delError } = await supabaseAdmin
      .from('product_variants')
      .delete()
      .in('id', toDelete)
    if (delError) throw delError
  }

  for (let i = 0; i < variants.length; i++) {
    const v = variants[i]
    const variantData = {
      name: v.name,
      sku: v.sku,
      description: v.description || null,
      price: v.price ? parseFloat(v.price) : null,
      compare_at_price: v.compare_at_price ? parseFloat(v.compare_at_price) : null,
      stock: v.stock ? parseInt(v.stock) || 0 : 0,
      is_active: v.is_active !== false,
      sort_order: i,
    }

    if (v.id) {
      await supabaseAdmin.from('product_variants').update(variantData).eq('id', v.id)
    } else {
      await supabaseAdmin.from('product_variants').insert({ product_id: productId, ...variantData })
    }
  }
}
