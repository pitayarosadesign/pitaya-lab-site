-- ============================================
-- PITAYA LAB - Vincular Variantes de Producto con Perfiles Aromáticos
-- ============================================
-- Propósito:
--   Los perfiles aromáticos (fragrance_profiles) son la fuente canónica de las
--   fragancias disponibles (gestionadas en admin desde Colecciones).
--   En la edición del producto, el admin selecciona en cuáles de estos aromas
--   está disponible el producto.
--   Esta migración agrega una FK en product_variants → fragrance_profiles
--   para crear el vínculo explícito.
--
--   Antes: product_variants.name era texto libre y SectionCollection hacía
--          coincidencia de strings (frágil).
--   Ahora: product_variants.fragrance_profile_id apunta al perfil aromático
--          real, eliminando duplicados y ambigüedad.
-- ============================================

ALTER TABLE product_variants
  ADD COLUMN IF NOT EXISTS fragrance_profile_id UUID REFERENCES fragrance_profiles(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_product_variants_fragrance_profile
  ON product_variants(fragrance_profile_id);

-- ============================================
-- ACTUALIZAR PRODUCTO BASE DONDE FALTA COLECCIÓN
-- ============================================
-- Nota: si algún producto todavía no tiene collection_id (campo opcional
-- agregado en migración 006), no forzamos nada. El vínculo de aroma es a nivel
-- de variante → perfil aromático.
