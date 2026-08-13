-- ============================================
-- PITAYA LAB - Precio e Imagen por Variante
-- ============================================
-- Propósito:
--   Cada variante (aroma) puede tener su propio precio y una imagen propia.
--   Al hacer clic en un aroma en la tienda, se muestra su imagen correspondiente
--   y su precio. Los campos ya existían en el esquema original; esta migración
--   garantiza que estén presentes y bien definidos.
-- ============================================

ALTER TABLE product_variants
  ADD COLUMN IF NOT EXISTS price DECIMAL(10,2),
  ADD COLUMN IF NOT EXISTS compare_at_price DECIMAL(10,2),
  ADD COLUMN IF NOT EXISTS image_url TEXT;
