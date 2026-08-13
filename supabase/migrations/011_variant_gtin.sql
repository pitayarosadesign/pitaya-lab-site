-- ============================================
-- PITAYA LAB - Migración 011
-- Agregar GTIN a variantes (aromas)
-- ============================================
-- Permite que cada variante (aroma) tenga su propio GTIN
-- para catálogos de Google Merchant / Meta.
-- ============================================

ALTER TABLE product_variants
  ADD COLUMN IF NOT EXISTS gtin VARCHAR(50);
