-- ============================================================
-- PITAYA LAB - 026 · Canal de venta (sales_channel) en products
-- ============================================================
-- OBJETIVO
--   Unificar la gestión: ya NO se mantienen los envases de recuerdos
--   en una tabla paralela (recuerdo_envases). Los recuerdos/eventos
--   pasan a ser PRODUCTOS regulares (products) con su variante de aromas,
--   pero con un "canal de venta" que los SACA de la tienda pública
--   (menudeo directa de fabricante) y los muestra en el cotizador /b2b.
--
-- NOMENCLATURA (venta directa de fabricante, no retail):
--   'directa'  -> venta 1-a-1 de fabricante (tienda pública /catalog, home, feeds)
--   'evento'   -> recuerdos para eventos  -> SOLO cotizador /b2b
--   'mayoreo'  -> reservado a futuro (comercial por volumen)
-- ============================================================

-- 1) Tipo enumerado y columna por defecto 'directa'
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS sales_channel TEXT NOT NULL DEFAULT 'directa'
  CHECK (sales_channel IN ('directa', 'evento', 'mayoreo'));

COMMENT ON COLUMN products.sales_channel
  IS 'Canal de venta del producto. directa = menudeo (catálogo público); evento = recuerdos (/b2b); mayoreo = reservado.';

CREATE INDEX IF NOT EXISTS idx_products_sales_channel ON products(sales_channel)
  WHERE sales_channel != 'directa';

-- 2) Migrar los envases actuales de recuerdo_envases a products "evento"
--    Copiamos las filas que aún existan en recuerdo_envases (material/capacidad se
--    llevan a subtítulo/descripción; price "todo en uno por pieza" a price).
--    Cada slug de envase se reutiliza como slug de producto (prefijado ev-/ si chocara).
DO $$
DECLARE
  r RECORD;
  new_id UUID;
  resolved_slug TEXT;
BEGIN
  FOR r IN
    SELECT * FROM recuerdo_envases WHERE is_active = true ORDER BY sort_order
  LOOP
    resolved_slug := r.slug;
    -- Evitar colisión con slugs de productos/retail existentes
    IF EXISTS (SELECT 1 FROM products WHERE slug = r.slug) THEN
      resolved_slug := 'ev-' || r.slug;
    END IF;

    -- No duplicar si ya existe un producto evento con ese slug
    IF NOT EXISTS (SELECT 1 FROM products WHERE slug = resolved_slug) THEN
      INSERT INTO products (
        sku, name, slug, subtitle, description, price, stock,
        brand, google_product_category, google_condition, is_active,
        sales_channel, published_at
      )
      VALUES (
        'EV-' || upper(regexp_replace(resolved_slug, '[^a-zA-Z0-9]+', '-', 'g')),
        r.nombre,
        resolved_slug,
        r.material || CASE WHEN r.capacidad IS NOT NULL AND r.capacidad <> '' THEN ' · ' || r.capacidad ELSE '' END,
        r.descripcion || (CASE WHEN r.ficha_tecnica IS NOT NULL AND r.ficha_tecnica <> ''
                               THEN E'\n' || r.ficha_tecnica ELSE '' END),
        COALESCE(r.precio_base, 0),
        COALESCE(r.stock, 0),
        'PITAYA LAB',
        '227',
        'new',
        true,
        'evento',
        now()
      );
    END IF;
  END LOOP;
END $$;

-- 3) (TRANSICIÓN) se deja recuerdo_envases intacta por defecto para no romper la
--    versión previa del cotizador mientras se adapta /b2b a leer products "evento".
--    Se podrá eliminar recuerdo_envases en una migración posterior.
