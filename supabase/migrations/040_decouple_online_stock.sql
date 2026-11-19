-- ============================================
-- PITAYA LAB - Desacoplar stock online del inventario físico
-- ============================================
-- A partir de ahora:
--   products.stock = stock vendible ONLINE (Envía fulfillment), gobernado por el
--   sync / webhook de inventario. Es la única fuente para la tienda.
--   inventory_by_location = control físico interno del admin (Central=Envía,
--   almacén local, showrooms), con entradas/salidas/transferencias. Ya NO
--   recalcula products.stock, para que el stock online nunca se mezcle con el
--   stock físico local/showroom.
--
-- La función update_product_total_stock se conserva por si se quisiera
-- restablecer el comportamiento anterior, pero el trigger se desactiva.

DROP TRIGGER IF EXISTS trigger_update_product_stock ON inventory_by_location;
