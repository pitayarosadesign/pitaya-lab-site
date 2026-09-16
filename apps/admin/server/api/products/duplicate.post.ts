import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  try {
    const { id } = body

    // Obtener producto original
    const { data: original, error: fetchError } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // Crear duplicado
    const { data: newProduct, error: insertError } = await supabaseAdmin
      .from('products')
      .insert({
        name: `${original.name} (copia)`,
        slug: `${original.slug}-copia-${Date.now()}`,
        sku: original.sku ? `${original.sku}-COPY` : null,
        subtitle: original.subtitle,
        description: original.description,
        long_description: original.long_description,
        price: original.price,
        compare_at_price: original.compare_at_price,
        cost: original.cost,
        stock: original.stock || 0,
        category: original.category,
        category_slug: original.category_slug,
        image: original.image,
        images: original.images,
        is_active: false,
        is_featured: false,
        amazon_link: original.amazon_link,
        amazon_asin: original.amazon_asin,
        amazon_price: original.amazon_price,
        weight_kg: original.weight_kg,
        length_cm: original.length_cm,
        width_cm: original.width_cm,
        height_cm: original.height_cm,
        requires_shipping: original.requires_shipping,
        free_shipping: original.free_shipping,
        gtin: original.gtin,
        brand: original.brand,
      })
      .select()
      .single()

    if (insertError) throw insertError

    // Copiar galería de fotos. Las imágenes en Supabase Storage se clonan a un
    // path nuevo (borrar la foto en un producto no afecta al otro); las rutas
    // locales o externas se reutilizan tal cual.
    const { data: originalImages } = await supabaseAdmin
      .from('product_images')
      .select('*')
      .eq('product_id', id)
      .order('sort_order', { ascending: true })

    const copiedImages = []
    for (const img of originalImages || []) {
      let url = img.url
      const storagePath = img.url?.split('/product-images/')[1]
      if (storagePath) {
        try {
          const { data: blob, error: downloadError } = await supabaseAdmin.storage
            .from('product-images')
            .download(storagePath)
          if (!downloadError && blob) {
            const ext = (storagePath.split('.').pop() || 'jpg').toLowerCase()
            const contentType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg'
            const newPath = `${newProduct.id}/${Date.now()}-${img.sort_order ?? 0}.${ext}`
            const buffer = Buffer.from(await blob.arrayBuffer())
            const { error: uploadError } = await supabaseAdmin.storage
              .from('product-images')
              .upload(newPath, buffer, { contentType, cacheControl: '31536000', upsert: false })
            if (!uploadError) {
              const { data: pub } = supabaseAdmin.storage.from('product-images').getPublicUrl(newPath)
              url = pub.publicUrl
            }
          }
        } catch (err) {
          console.warn('No se pudo clonar la imagen de storage; se reutiliza la URL:', err.message)
        }
      }

      copiedImages.push({
        product_id: newProduct.id,
        url,
        alt_text: img.alt_text || newProduct.name || '',
        sort_order: img.sort_order ?? 0,
        is_primary: img.is_primary || false,
        google_image_link: img.google_image_link || null,
        pinterest_image_link: img.pinterest_image_link || null,
      })
    }

    if (copiedImages.length) {
      const { error: imagesError } = await supabaseAdmin
        .from('product_images')
        .insert(copiedImages)
      if (imagesError) throw imagesError
    }

    return { success: true, product: newProduct }
  } catch (e) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
