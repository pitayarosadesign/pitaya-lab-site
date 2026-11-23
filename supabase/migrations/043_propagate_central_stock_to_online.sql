-- ============================================
-- PITAYA LAB - Migración 043
-- Propagar stock de Central (Envía) hacia Online (variantes + products)
-- ============================================
-- Contexto: el webhook/sync de Envía actualiza inventory_by_location
-- (almacen_central = "Central") pero, en productos con el variantId mapeado a
-- nivel de `products` en vez de `product_variants`, la unidad vendible (variante)
-- quedaba en 0 y el stock online desincronizado (Central=7, Online=0).
--
-- Este trigger garantiza que, ante cualquier cambio de stock en Central, el
-- stock se propague a la variante (cuando el producto tiene UNA sola variante
-- activa) y se recalcule products.stock. Complementa a la migración 042
-- (variantes -> products.stock). Los productos multi-variante NO se tocan aquí:
-- se sincronizan variante por variante desde Envía.

CREATE OR REPLACE FUNCTION public.propagate_central_stock_to_online()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.location_id = 'almacen_central' THEN
    IF (SELECT COUNT(*) FROM public.product_variants
        WHERE product_id = NEW.product_id AND is_active) = 1 THEN

      UPDATE public.product_variants
      SET stock = NEW.stock,
          envia_variant_id = COALESCE(
            envia_variant_id,
            (SELECT envia_variant_id FROM public.products WHERE id = NEW.product_id)
          )
      WHERE product_id = NEW.product_id AND is_active;

      UPDATE public.products
      SET stock = NEW.stock
      WHERE id = NEW.product_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trigger_propagate_central_stock ON public.inventory_by_location;
CREATE TRIGGER trigger_propagate_central_stock
AFTER INSERT OR UPDATE OF stock ON public.inventory_by_location
FOR EACH ROW EXECUTE FUNCTION public.propagate_central_stock_to_online();

-- ============================================
-- Reparación única: sincronizar datos actuales desincronizados
-- ============================================
-- Para cada producto con stock en Central (> 0) y UNA sola variante activa
-- desincronizada (variante en 0 o sin envia_variant_id), copiamos el stock de
-- Central a la variante y movemos el envia_variant_id del producto a la variante.

UPDATE public.product_variants pv
SET stock = ib.stock,
    envia_variant_id = COALESCE(pv.envia_variant_id, p.envia_variant_id)
FROM public.inventory_by_location ib
JOIN public.products p ON p.id = ib.product_id
WHERE ib.location_id = 'almacen_central'
  AND ib.stock > 0
  AND pv.product_id = ib.product_id
  AND pv.is_active
  AND (pv.stock IS NULL OR pv.stock <= 0 OR pv.envia_variant_id IS NULL)
  AND (SELECT COUNT(*) FROM public.product_variants v2
       WHERE v2.product_id = ib.product_id AND v2.is_active) = 1;

-- Recalcular products.stock de esos productos desde la variante reparada.
UPDATE public.products p
SET stock = ib.stock
FROM public.inventory_by_location ib
WHERE ib.product_id = p.id
  AND ib.location_id = 'almacen_central'
  AND ib.stock > 0
  AND (SELECT COUNT(*) FROM public.product_variants v2
       WHERE v2.product_id = p.id AND v2.is_active) = 1;
