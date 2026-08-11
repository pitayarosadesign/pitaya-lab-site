-- ============================================
-- PITAYA LAB - Eliminar tablas sin uso
-- ============================================
-- Elimina tablas que ya no se utilizan en ningún
-- código de la app (store o admin):
--   - site_sections   → el CMS ahora usa site_config con claves por página
--   - catalog_feeds   → la página de catálogos consulta products/product_images
--   - cms_pages       → funcionalidad huérfana (página admin no enlazada, store no la usa)
-- ============================================

-- ============================================
-- 1. ELIMINAR site_sections
-- ============================================
-- Eliminar políticas RLS
DROP POLICY IF EXISTS "Secciones visibles para todos" ON site_sections;
DROP POLICY IF EXISTS "Admin puede todo en secciones" ON site_sections;

-- Eliminar trigger
DROP TRIGGER IF EXISTS update_site_sections_updated_at ON site_sections;

-- Eliminar tabla
DROP TABLE IF EXISTS site_sections;

-- ============================================
-- 2. ELIMINAR catalog_feeds
-- ============================================
-- Eliminar políticas RLS
DROP POLICY IF EXISTS "Admin puede todo en feeds" ON catalog_feeds;

-- Eliminar trigger
DROP TRIGGER IF EXISTS update_catalog_feeds_updated_at ON catalog_feeds;

-- Eliminar tabla
DROP TABLE IF EXISTS catalog_feeds;

-- ============================================
-- 3. ELIMINAR cms_pages
-- ============================================
-- Eliminar políticas RLS
DROP POLICY IF EXISTS "Páginas publicadas visibles" ON cms_pages;
DROP POLICY IF EXISTS "Admin puede todo en páginas" ON cms_pages;

-- Eliminar trigger
DROP TRIGGER IF EXISTS update_cms_pages_updated_at ON cms_pages;

-- Eliminar tabla
DROP TABLE IF EXISTS cms_pages;
