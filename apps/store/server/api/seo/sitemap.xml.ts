/**
 * 🗺️ PITAYA LAB - Sitemap Dinámico
 * ===================================
 * Genera un sitemap.xml completo con todos los productos y páginas
 * Ruta: GET /api/seo/sitemap.xml
 */

import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { public: { supabaseUrl }, supabaseServiceKey } = config

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  })

  const BASE_URL = 'https://pitayalab.com'

  // Páginas estáticas
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/about', changefreq: 'monthly', priority: '0.8' },
    { url: '/philosophy', changefreq: 'monthly', priority: '0.7' },
    { url: '/catalog', changefreq: 'daily', priority: '0.9' },
    { url: '/faq', changefreq: 'monthly', priority: '0.6' },
    { url: '/contact', changefreq: 'monthly', priority: '0.5' },
    { url: '/privacy', changefreq: 'yearly', priority: '0.3' },
    { url: '/terms', changefreq: 'yearly', priority: '0.3' },
  ]

  try {
    // Obtener productos activos
    const { data: products } = await supabase
      .from('products')
      .select('slug, updated_at')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    const now = new Date().toISOString()

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

    // Páginas estáticas
    for (const page of staticPages) {
      xml += `  <url>\n`
      xml += `    <loc>${BASE_URL}${page.url}</loc>\n`
      xml += `    <lastmod>${now}</lastmod>\n`
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`
      xml += `    <priority>${page.priority}</priority>\n`
      xml += `  </url>\n`
    }

    // Productos dinámicos
    if (products) {
      for (const product of products) {
        xml += `  <url>\n`
        xml += `    <loc>${BASE_URL}/product/${product.slug}</loc>\n`
        xml += `    <lastmod>${product.updated_at || now}</lastmod>\n`
        xml += `    <changefreq>weekly</changefreq>\n`
        xml += `    <priority>0.8</priority>\n`
        xml += `  </url>\n`
      }
    }

    xml += `</urlset>`

    setHeader(event, 'Content-Type', 'application/xml; charset=UTF-8')
    setHeader(event, 'Cache-Control', 'public, max-age=3600')

    return xml
  } catch (e) {
    console.error('Error generando sitemap:', e)
    // Fallback: solo páginas estáticas
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
    for (const page of staticPages) {
      xml += `  <url>\n`
      xml += `    <loc>${BASE_URL}${page.url}</loc>\n`
      xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`
      xml += `    <priority>${page.priority}</priority>\n`
      xml += `  </url>\n`
    }
    xml += `</urlset>`

    setHeader(event, 'Content-Type', 'application/xml; charset=UTF-8')
    return xml
  }
})
