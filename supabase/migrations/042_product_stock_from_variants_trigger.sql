-- ============================================
-- PITAYA LAB - Migración 042
-- products.stock = suma de product_variants.stock (siempre sincronizado)
-- ============================================
-- products.stock es el stock vendible ONLINE, gobernado por Envía Fulfillment.
-- El sync/webhook escriben product_variants.stock y luego recalculan el padre.
-- Este trigger es la red de seguridad: ante CUALQUIER cambio de stock en una
-- variante (INSERT / UPDATE de stock / DELETE), recalcula products.stock en la
-- misma transacción, sin importar qué proceso lo escriba. Así catálogo (que lee
-- products.stock) y detalle (que lee product_variants.stock) no se desincronizan.

CREATE OR REPLACE FUNCTION public.sync_product_stock_from_variants()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.products
  SET stock = (
    SELECT COALESCE(SUM(stock), 0)
    FROM public.product_variants
    WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
  )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trigger_sync_product_stock_from_variants ON public.product_variants;
CREATE TRIGGER trigger_sync_product_stock_from_variants
AFTER INSERT OR UPDATE OF stock OR DELETE ON public.product_variants
FOR EACH ROW EXECUTE FUNCTION public.sync_product_stock_from_variants();
