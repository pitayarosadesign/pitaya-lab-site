-- ============================================================
-- PITAYA LAB - 025 · Renombra columna inspiracion
-- ============================================================
-- 'fragrance_profiles.hotel_reference' pasa a llamarse 'inspiracion'
-- para reflejar su uso genérico (hotel, destino, concepto) y coincidir
-- exactamente con la columna del CSV de import/export del panel.
-- Idempotente.
-- ============================================================

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'fragrance_profiles' AND column_name = 'hotel_reference'
  ) THEN
    ALTER TABLE fragrance_profiles RENAME COLUMN hotel_reference TO inspiracion;
  END IF;
END $$;

-- Compatibilidad: si ya estaba renombrada no hace nada (idempotente).

