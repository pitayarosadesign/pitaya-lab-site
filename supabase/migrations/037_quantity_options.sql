-- ============================================================================
-- 037 · Formato de venta (cantidades) por producto
-- ============================================================================
-- Cantidades en las que se vende el producto (ej. recuerdos: {12, 24, 48}).
-- NULL/empty = venta libre con mínimo (min_order_quantity). Se usa para
-- calcular el monto por pieza y el total en la página de producto.
-- ============================================================================

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS quantity_options INTEGER[];

COMMENT ON COLUMN products.quantity_options IS
  'Cantidades de venta permitidas (ej. {12,24,48}). NULL = cantidad libre con mínimo.';
