-- ============================================================================
-- 035 · Tiempo de preparación por categoría / producto
-- ============================================================================
-- Días hábiles que toma PREPARAR un producto antes de entregarlo a mensajería.
-- Resolución de herencia: producto (override) -> categoría -> NULL (envío mismo día).
-- NULL = heredar. Ej. categoría "recuerdos" = 4 días hábiles.
-- ============================================================================

ALTER TABLE product_categories
  ADD COLUMN IF NOT EXISTS prep_days_min integer,
  ADD COLUMN IF NOT EXISTS prep_days_max integer;

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS prep_days_min integer,
  ADD COLUMN IF NOT EXISTS prep_days_max integer;

COMMENT ON COLUMN product_categories.prep_days_min IS
  'Días hábiles de preparación por defecto para la categoría. NULL = sin preparación extra.';
COMMENT ON COLUMN product_categories.prep_days_max IS
  'Días hábiles de preparación por defecto para la categoría. NULL = sin preparación extra.';
COMMENT ON COLUMN products.prep_days_min IS
  'Días hábiles de preparación (override del producto). NULL = hereda de la categoría.';
COMMENT ON COLUMN products.prep_days_max IS
  'Días hábiles de preparación (override del producto). NULL = hereda de la categoría.';

-- Recuerdos se preparan en taller: al menos 4 días hábiles.
UPDATE product_categories
  SET prep_days_min = 4, prep_days_max = 4
  WHERE slug = 'recuerdos';
