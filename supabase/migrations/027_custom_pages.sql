-- ============================================
-- PITAYA LAB - Páginas personalizadas (CMS)
-- ============================================
-- Permite crear páginas nuevas de contenido (landing/custom) con su propia
-- URL y SEO, cuya secciones se gestionan en `page_sections` con `page = slug`.
--
-- La tienda resuelve estas páginas mediante una ruta dinámica `/[slug]`, y el
-- panel admin permite crearlas, editarlas, activarlas/desactivarlas y añadir
-- sus secciones usando el mismo editor de secciones existente.
-- ============================================

CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,              -- ej. 'temporada-2025', 'regalos-corporativos'
  title VARCHAR(150) NOT NULL,                    -- H1 mostrado en la página
  badge VARCHAR(120) DEFAULT '',                  -- etiqueta sobre el título (opcional)
  highlight VARCHAR(120) DEFAULT '',              -- fragmento resaltado del título (opcional)
  description TEXT DEFAULT '',                    -- párrafo introductorio + meta description
  seo_title VARCHAR(160) DEFAULT '',              -- <title> (si vacío se usa `title`)
  published BOOLEAN DEFAULT false,                -- visible en la tienda (afecta RLS)
  in_top_menu BOOLEAN DEFAULT false,              -- sugerencia: añadir a navegación
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  -- Lectura pública: solo páginas publicadas
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'pages_public_read' AND tablename = 'pages') THEN
    CREATE POLICY "pages_public_read" ON pages FOR SELECT USING (published = true);
  END IF;
  -- Escritura completa solo vía service_role (el admin usa service_role)
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'pages_admin_all' AND tablename = 'pages') THEN
    CREATE POLICY "pages_admin_all" ON pages FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_pages_published_slug ON pages(published, slug);
CREATE INDEX IF NOT EXISTS idx_pages_menu ON pages(published, in_top_menu, sort_order);
