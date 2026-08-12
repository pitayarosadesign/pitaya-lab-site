-- ============================================
-- PITAYA LAB - Sistema de Secciones Dinámicas
-- ============================================
-- Permite gestionar las secciones de cada página desde el panel admin:
--   - Agregar / eliminar / reordenar secciones
--   - Cada sección tiene un tipo (hero, products, collection, scents, etc.)
--   - El contenido se guarda como JSONB para máxima flexibilidad
-- ============================================

-- ============================================
-- TABLA: PAGE_SECTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page VARCHAR(50) NOT NULL DEFAULT 'home',      -- home, about, philosophy, faq, contact, legal
  type VARCHAR(50) NOT NULL,                      -- hero, products, collection, scents, reviews, values, cta, trust, text, image_text, gallery, html, newsletter
  title VARCHAR(255),                             -- nombre descriptivo de la sección (para el admin)
  content JSONB NOT NULL DEFAULT '{}',            -- contenido de la sección (textos, imágenes, etc.)
  settings JSONB NOT NULL DEFAULT '{}',           -- configuración (enabled, layout, etc.)
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_page_sections_updated_at
  BEFORE UPDATE ON page_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ÍNDICES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_page_sections_page ON page_sections(page);
CREATE INDEX IF NOT EXISTS idx_page_sections_sort ON page_sections(page, sort_order);
CREATE INDEX IF NOT EXISTS idx_page_sections_active ON page_sections(page, is_active);

-- ============================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- ============================================
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'page_sections_public_read' AND tablename = 'page_sections') THEN
    CREATE POLICY "page_sections_public_read" ON page_sections FOR SELECT USING (is_active = true);
    CREATE POLICY "page_sections_admin_all" ON page_sections FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

-- ============================================
-- INSERTAR SECCIONES POR DEFECTO PARA LA PORTADA
-- ============================================
-- Estas son las secciones iniciales de la página de inicio.
-- El admin puede agregar, eliminar y reordenar desde el panel.

INSERT INTO page_sections (page, type, title, content, settings, sort_order) VALUES
-- 1. Hero
('home', 'hero', 'Hero (Portada)',
 '{
   "title": "Fragancias que\nconectan\ncon la naturaleza",
   "subtitle": "En PITAYA LAB creamos productos botánicos biodegradables para cuidar de ti y del planeta. Velas de soya perfumadas, aceites aromáticos y brumas que transforman tu hogar en una experiencia sensorial única.",
   "badge": "100% Natural · Biodegradable · Hecho en México",
   "cta_text": "Explorar catálogo",
   "cta_link": "/catalog",
   "cta_secondary_text": "Tienda Amazon",
   "cta_secondary_link": "https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329",
   "media_type": "video",
   "media_url": "",
   "poster_url": ""
 }',
 '{"enabled": true, "full_width": true}',
 1),

-- 2. Productos destacados
('home', 'products', 'Productos Destacados',
 '{
   "title": "Nuestros Productos",
   "subtitle": "Descubre",
   "description": "Velas de soya perfumadas, aceites aromáticos y brumas que transforman tu hogar en una experiencia sensorial única.",
   "max_products": 4,
   "show_view_all": true,
   "view_all_text": "Ver catálogo completo",
   "view_all_link": "/catalog"
 }',
 '{"enabled": true, "layout": "grid-4"}',
 2),

-- 3. Valores de la marca
('home', 'values', 'Valores de la Marca',
 '{
   "title": "¿Por qué elegir PITAYA LAB?",
   "subtitle": "Nuestro Compromiso",
   "values": [
     { "icon": "leaf", "title": "100% Natural", "description": "Ingredientes botánicos biodegradables que cuidan de ti y del planeta." },
     { "icon": "shield", "title": "Hecho en México", "description": "Productos artesanales elaborados con amor y dedicación." },
     { "icon": "heart", "title": "Cruelty Free", "description": "Nunca testamos en animales. Solo amor y respeto." },
     { "icon": "sparkles", "title": "Calidad Premium", "description": "Fragancias de alta gama inspiradas en hoteles boutique." }
   ]
 }',
 '{"enabled": true, "columns": 4}',
 3),

-- 4. Sección de confianza (envíos)
('home', 'trust', 'Sección de Confianza',
 '{
   "title": "Envíos seguros a todo México",
   "subtitle": "Recibe tus productos de forma rápida y confiable",
   "features": [
     { "icon": "truck", "title": "Envío gratis", "description": "En todas tus compras mayores a $299 MXN" },
     { "icon": "package", "title": "Costo simbólico", "description": "Compras menores a $299 solo $50 MXN de envío" },
     { "icon": "clock", "title": "3 a 5 días hábiles", "description": "Entregamos a todo México con mensajerías de prestigio" }
   ]
 }',
 '{"enabled": true, "columns": 3}',
 4),

-- 5. Aromas / Colecciones
('home', 'collections', 'Colecciones de Aromas',
 '{
   "title": "El arte de la fragancia",
   "subtitle": "Aromas",
   "description": "Cada aroma ha sido cuidadosamente seleccionado para ofrecerte una experiencia única.",
   "show_all": true
 }',
 '{"enabled": true, "layout": "grid"}',
 5),

-- 6. Reseñas
('home', 'reviews', 'Reseñas de Clientes',
 '{
   "title": "Lo que dicen nuestros clientes",
   "subtitle": "Opiniones reales de quienes ya disfrutan PITAYA LAB",
   "items": [
     { "author": "María F.", "rating": 5, "product": "Bruma Aromática Solara", "text": "El aroma es increíble, dura muchísimo y el empaque es precioso.", "image": null },
     { "author": "Carlos R.", "rating": 5, "product": "Vela de Soya Sandalo", "text": "La vela huele espectacular, se siente la calidad de la cera de soya.", "image": null },
     { "author": "Ana G.", "rating": 5, "product": "Aceite Aromático Xcaret", "text": "Me encanta este aceite, el aroma es fresco y relajante.", "image": null }
   ]
 }',
 '{"enabled": true, "layout": "carousel"}',
 6),

-- 7. CTA Final
('home', 'cta', 'CTA Final',
 '{
   "title": "¿Listo para transformar tu hogar?",
   "description": "Descubre nuestra colección completa en Amazon y encuentra la fragancia perfecta para cada momento.",
   "button_text": "Comprar en Amazon México",
   "button_link": "https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329"
 }',
 '{"enabled": true, "background": "dark"}',
 7)
ON CONFLICT DO NOTHING;
