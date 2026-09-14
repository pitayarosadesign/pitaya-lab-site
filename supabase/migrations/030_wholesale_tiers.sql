-- ============================================================================
-- 030 · Mayoreo por tramos de cantidad (precio negocio)
-- ============================================================================
-- Amplía el mayoreo existente (wholesale_enabled / wholesale_price /
-- wholesale_min_qty) con TRAMOS de cantidad configurables por producto,
-- al estilo Mercado Libre. Cada tramo define una cantidad mínima y un
-- descuento (porcentaje o monto fijo).
--
-- Se guarda en products.wholesale_tiers (JSONB):
-- {
--   "enabled": true,
--   "discountType": "percent",       -- "percent" | "fixed"
--   "tiers": [
--     { "min": 20,  "value": 15 },   -- desde 20 pzas, -15%
--     { "min": 50,  "value": 25 },   -- desde 50 pzas, -25%
--     { "min": 100, "value": 35 }    -- desde 100 pzas, -35%
--   ]
-- }
--
-- El tramo aplicable es el de mayor `min` que sea <= a la cantidad elegida.
-- Si discountType = "fixed", `value` es un monto fijo en MXN a restar del
-- precio unitario (nunca deja el precio por debajo de 0).
-- ============================================================================

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS wholesale_tiers jsonb DEFAULT NULL;

COMMENT ON COLUMN products.wholesale_tiers IS
  'Tramos de mayoreo por cantidad (precio negocio). JSONB: { enabled, discountType, tiers:[{min,value}] }. NULL = usa mayoreo simple o sin mayoreo.';
