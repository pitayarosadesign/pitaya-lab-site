-- ============================================
-- PITAYA LAB - Fix site_config keys
-- El admin y la tienda usan claves separadas
-- como 'hero', 'products_section', etc. pero
-- los datos reales están dentro de 'home_page'
-- ============================================

-- Extraer cada sección de home_page como filas separadas
-- para que admin (site.vue) y store (index.vue) funcionen

DO $$
DECLARE
  home_page_data jsonb;
  hero_data jsonb;
  featured_products_data jsonb;
  brand_values_data jsonb;
  scents_showcase_data jsonb;
  cta_banner_data jsonb;
BEGIN
  -- Obtener el JSON de home_page
  SELECT value INTO home_page_data FROM site_config WHERE key = 'home_page';

  IF home_page_data IS NOT NULL THEN
    -- Hero
    hero_data := home_page_data->'hero';
    IF hero_data IS NOT NULL THEN
      INSERT INTO site_config (key, value, description)
      VALUES ('hero', jsonb_build_object(
        'title', hero_data->>'title',
        'subtitle', hero_data->>'subtitle',
        'cta_text', hero_data->>'cta_primary_text',
        'cta_link', hero_data->>'cta_primary_link'
      ), 'Hero section de la portada')
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
    END IF;

    -- Featured Products
    featured_products_data := home_page_data->'featured_products';
    IF featured_products_data IS NOT NULL THEN
      INSERT INTO site_config (key, value, description)
      VALUES ('products_section', jsonb_build_object(
        'title', featured_products_data->>'title',
        'subtitle', featured_products_data->>'subtitle',
        'description', featured_products_data->>'description'
      ), 'Sección de productos destacados')
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
    END IF;

    -- Brand Values
    brand_values_data := home_page_data->'brand_values';
    IF brand_values_data IS NOT NULL THEN
      INSERT INTO site_config (key, value, description)
      VALUES ('brand_values', jsonb_build_array(
        jsonb_build_object('title', '100% Natural', 'description', 'Ingredientes botánicos biodegradables que cuidan de ti y del planeta.', 'icon', 'leaf'),
        jsonb_build_object('title', 'Hecho en México', 'description', 'Producido artesanalmente con los más altos estándares de calidad.', 'icon', 'shield'),
        jsonb_build_object('title', 'Cruelty Free', 'description', 'Nunca testamos en animales. Solo amor y respeto por la naturaleza.', 'icon', 'heart'),
        jsonb_build_object('title', 'Fragancias Únicas', 'description', 'Aromas exclusivos que transforman tu hogar en una experiencia sensorial.', 'icon', 'sparkles')
      ), 'Valores de la marca')
      ON CONFLICT (key) DO NOTHING;
    END IF;

    -- Scents Showcase
    scents_showcase_data := home_page_data->'scents_showcase';
    IF scents_showcase_data IS NOT NULL THEN
      INSERT INTO site_config (key, value, description)
      VALUES ('scents_section', jsonb_build_object(
        'title', scents_showcase_data->>'title',
        'subtitle', scents_showcase_data->>'subtitle',
        'description', ''
      ), 'Sección de aromas')
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
    END IF;

    -- CTA Banner
    cta_banner_data := home_page_data->'cta_banner';
    IF cta_banner_data IS NOT NULL THEN
      INSERT INTO site_config (key, value, description)
      VALUES ('cta_section', jsonb_build_object(
        'title', cta_banner_data->>'title',
        'description', cta_banner_data->>'subtitle',
        'button_text', cta_banner_data->>'button_text',
        'button_link', cta_banner_data->>'button_url'
      ), 'Sección de CTA final')
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
    END IF;
  END IF;
END $$;

-- ============================================
-- FIJAR POLÍTICA RLS: Permitir a admins autenticados
-- escribir en site_config (además de service_role)
-- ============================================

-- Eliminar política existente que solo permite service_role
DROP POLICY IF EXISTS "Admin puede todo en config" ON site_config;

-- Crear nueva política que permita tanto a service_role como a authenticated
CREATE POLICY "Admin puede todo en config"
  ON site_config FOR ALL
  USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
