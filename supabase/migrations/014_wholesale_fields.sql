-- ============================================
-- PITAYA LAB - Migración 014
-- Campos de Mayoreo en productos
-- ============================================
-- Permite que cada producto tenga su propia
-- configuración de mayoreo (precio, mínimo, activo)
-- para la calculadora de la página B2B.
-- ============================================

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS wholesale_enabled BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS wholesale_price DECIMAL(10,2),
  ADD COLUMN IF NOT EXISTS wholesale_min_qty INTEGER DEFAULT 20;

-- Índice para consultar productos con mayoreo habilitado
CREATE INDEX IF NOT EXISTS idx_products_wholesale_enabled
  ON products(wholesale_enabled)
  WHERE wholesale_enabled = true;
