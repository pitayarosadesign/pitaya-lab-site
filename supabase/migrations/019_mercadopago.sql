-- ============================================
-- PITAYA LAB - Migración 019: Mercado Pago
-- ============================================
-- Agrega columnas para soportar pagos con Mercado Pago
-- en la tabla de órdenes.
-- ============================================

-- 1. Agregar columnas de Mercado Pago a la tabla orders
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS mp_preference_id VARCHAR(255),
  ADD COLUMN IF NOT EXISTS mp_payment_id VARCHAR(255),
  ADD COLUMN IF NOT EXISTS mp_payment_method VARCHAR(100),
  ADD COLUMN IF NOT EXISTS payment_provider VARCHAR(50) DEFAULT 'stripe';

-- 2. Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_orders_mp_preference ON orders(mp_preference_id);
CREATE INDEX IF NOT EXISTS idx_orders_mp_payment ON orders(mp_payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_provider ON orders(payment_provider);

-- 3. Actualizar órdenes existentes como stripe (por defecto)
UPDATE orders SET payment_provider = 'stripe' WHERE payment_provider IS NULL;
