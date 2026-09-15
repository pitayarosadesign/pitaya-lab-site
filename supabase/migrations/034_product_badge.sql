-- ============================================================
-- PITAYA LAB - 034 · Distintivo (badge) en productos
-- ============================================================
-- Etiqueta visual opcional que se muestra sobre la imagen de la
-- tarjeta del producto en la tienda (ej. "Nuevo", "Best Seller",
-- "Edición Limitada", "Últimas piezas").
--
-- Se eligió UN solo badge por producto (no tags múltiples): la
-- tarjeta comunica un único mensaje de prioridad.
-- ============================================================

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS badge VARCHAR(50);
