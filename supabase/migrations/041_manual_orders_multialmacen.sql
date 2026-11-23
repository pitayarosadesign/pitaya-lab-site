-- ============================================
-- PITAYA LAB - Migración 041
-- Ventas manuales multi-almacén + métodos de pago externos
-- ============================================

-- 1) Ubicación "Bodega Local" (gestión externa, sin Envía Fulfillment).
--    El stock online (products.stock) sigue gobernado 100% por Envía Fulfillment.
INSERT INTO inventory_locations (id, name, short_name, type)
VALUES ('almacen_local', 'Bodega Local', 'Local', 'warehouse')
ON CONFLICT (id) DO NOTHING;

-- 2) Columnas nuevas en órdenes
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS warehouse_id TEXT NOT NULL DEFAULT 'almacen_central',
  ADD COLUMN IF NOT EXISTS payment_method TEXT,
  ADD COLUMN IF NOT EXISTS payment_reference TEXT;

-- 3) Descuento de stock por ubicación (para Bodega Local). No toca
--    products.stock: ese lo gobierna Envía Fulfillment.
CREATE OR REPLACE FUNCTION public.decrement_location_stock(
  p_product_id UUID,
  p_location_id TEXT,
  p_qty INTEGER
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO inventory_by_location (product_id, location_id, stock)
  VALUES (p_product_id, p_location_id, 0)
  ON CONFLICT (product_id, location_id) DO NOTHING;

  UPDATE inventory_by_location
  SET stock = GREATEST(stock - p_qty, 0),
      updated_at = NOW()
  WHERE product_id = p_product_id AND location_id = p_location_id;
END;
$$ LANGUAGE plpgsql;

-- 4) Índice para filtrar/reportar por almacén
CREATE INDEX IF NOT EXISTS idx_orders_warehouse_id ON public.orders (warehouse_id);
