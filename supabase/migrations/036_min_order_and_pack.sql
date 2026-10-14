-- ============================================================================
-- 036 · Mínimo de compra y presentación (pack) por producto
-- ============================================================================
-- Cantidad mínima de unidades por pedido y formato de presentación/pack.
-- Ej. recuerdos: min_order_quantity = 30, pack_label = "Caja de 30 piezas".
-- ============================================================================

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS min_order_quantity INTEGER NOT NULL DEFAULT 1;

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS pack_label TEXT;

COMMENT ON COLUMN products.min_order_quantity IS
  'Cantidad mínima de unidades por compra. 1 = sin mínimo (venta por pieza).';
COMMENT ON COLUMN products.pack_label IS
  'Formato de presentación/pack del producto (ej. "Pack de 10 piezas"). NULL = pieza.';
