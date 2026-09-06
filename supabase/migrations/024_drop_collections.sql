-- ============================================================
-- PITAYA LAB - 024 · Eliminación de la tabla `collections`
-- ============================================================
-- OBJETIVO
--   Quitar el layer "collections" (actualmente mal estructurado) por completo
--   del esquema. Los aromas quedan autónomos: su clasificación vive en
--   fragrance_profiles (olfactive_family, collection_tag, …) — no dependen
--   de una tabla de colecciones.
--
--   Esto elimina:
--     • FK + columna  fragrance_profiles.collection_id
--     • FK + columna  products.collection_id  (productos ya no agrupan por colección)
--     • la tabla collections (y de paso sus políticas/índices/triggers)
--
--   Idempotente: puede ejecutarse varias veces sin error.
-- ============================================================

-- ------------------------------------------------------------------
-- 1) fragrance_profiles: quitar FK (con el nombre real autogenerado o la CONSTR) y columna
-- ------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname LIKE 'fragrance_profiles_collection_id_fkey%' ) THEN
    ALTER TABLE fragrance_profiles DROP CONSTRAINT fragrance_profiles_collection_id_fkey;
  END IF;
END $$;

ALTER TABLE fragrance_profiles
  DROP COLUMN IF EXISTS collection_id;

-- ------------------------------------------------------------------
-- 2) products: quitar FK y columna collection_id (si existiera)
-- ------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname LIKE 'products_collection_id_fkey%' ) THEN
    ALTER TABLE products DROP CONSTRAINT products_collection_id_fkey;
  END IF;
END $$;

ALTER TABLE products
  DROP COLUMN IF EXISTS collection_id;

-- ------------------------------------------------------------------
-- 3) Eliminar tabla collections (y objetos asociados)
-- ------------------------------------------------------------------
DROP TABLE IF EXISTS collections CASCADE;
DROP TABLE IF EXISTS product_collections CASCADE;
