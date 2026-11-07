-- ============================================================================
-- 038 · Elimina el mayoreo por producto (precio negocio)
-- ============================================================================
-- El mayoreo quedó unificado en la página B2B (site_config.b2b_*).
-- Las columnas de mayoreo por producto ya no se usan en tienda ni en admin:
--   wholesale_tiers                                   (migración 030)
--   wholesale_enabled / wholesale_price / wholesale_min_qty (migración 014)
-- Se eliminan las columnas y el índice parcial asociado.
-- ============================================================================

-- Índice parcial creado en la migración 014
DROP INDEX IF EXISTS idx_products_wholesale_enabled;

-- Columnas de mayoreo por producto
ALTER TABLE products
  DROP COLUMN IF EXISTS wholesale_enabled,
  DROP COLUMN IF EXISTS wholesale_price,
  DROP COLUMN IF EXISTS wholesale_min_qty,
  DROP COLUMN IF EXISTS wholesale_tiers;
