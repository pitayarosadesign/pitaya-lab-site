-- ============================================
-- PITAYA LAB - Migración 039
-- Canal de venta en órdenes (ventas manuales fuera de la tienda)
-- ============================================

-- Columna de canal de venta. Las órdenes existentes (creadas por Stripe)
-- quedan con el valor por defecto 'tienda_online'.
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS sales_channel TEXT NOT NULL DEFAULT 'tienda_online';

-- Índice para filtros y reportes por canal
CREATE INDEX IF NOT EXISTS idx_orders_sales_channel ON public.orders (sales_channel);

-- Función para descontar stock de forma atómica desde el punto de venta manual.
-- Por ahora actúa directo sobre products.stock; a futuro se migrará a
-- inventory_movements / inventory_by_location cuando se active el inventario
-- por almacén (central vs local).
CREATE OR REPLACE FUNCTION public.decrement_product_stock(p_id UUID, qty INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE products
  SET stock = GREATEST(stock - qty, 0),
      updated_at = NOW()
  WHERE id = p_id;
END;
$$ LANGUAGE plpgsql;
