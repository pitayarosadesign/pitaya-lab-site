-- ============================================

-- PITAYA LAB - Opciones de Variante (dimensiones)
-- ============================================
-- Propósito:
--   Permitir que un producto tenga variantes por hasta 2 dimensiones
--   (ej. Aroma + Tamaño), generando combinaciones. Cada fila de
--   product_variants representa UNA combinación completa con su propio
--   SKU/precio/stock/imagen.
--
--   Campos nuevos:
--     option_type_1  VARCHAR  → Tipo de la 1ª dimensión (ej. 'Aroma', 'Tamaño')
--     option_value_1 VARCHAR  → Valor de la 1ª dimensión (ej. 'Xcaret', '250ml')
--     option_type_2  VARCHAR  → Tipo de la 2ª dimensión (nullable)
--     option_value_2 VARCHAR  → Valor de la 2ª dimensión (nullable)
--
--   Compatibilidad:
--     Los productos existentes (solo aroma) siguen usando fragrance_profile_id
--     y name. Los campos nuevos quedan NULL y no afectan el comportamiento
--     actual. Un producto usa UN solo modelo: o "solo aroma" (legacy) o
--     "variantes por opciones" (nuevo). No se mezclan.
-- ============================================

ALTER TABLE product_variants
  ADD COLUMN IF NOT EXISTS option_type_1 VARCHAR(100),
  ADD COLUMN IF NOT EXISTS option_value_1 VARCHAR(255),
  ADD COLUMN IF NOT EXISTS option_type_2 VARCHAR(100),
  ADD COLUMN IF NOT EXISTS option_value_2 VARCHAR(255);

-- Índice para búsquedas por valor de opción (ej. filtrar por aroma en catálogo)
CREATE INDEX IF NOT EXISTS idx_product_variants_option_value_1
  ON product_variants(option_value_1);

CREATE INDEX IF NOT EXISTS idx_product_variants_option_value_2
  ON product_variants(option_value_2);
