-- ============================================
-- PITAYA LAB - Migración 040
-- Envía Fulfillment: mapeo de variantes y órdenes
-- ============================================

-- 1) Mapeo SKU local -> variantId de Envía Fulfillment
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS envia_variant_id BIGINT;

ALTER TABLE public.product_variants
  ADD COLUMN IF NOT EXISTS envia_variant_id BIGINT;

-- 2) Referencia y estado de la orden de fulfillment en Envía
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS envia_fulfillment_order_id BIGINT,
  ADD COLUMN IF NOT EXISTS fulfillment_status TEXT;
