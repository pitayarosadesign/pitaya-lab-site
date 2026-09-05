-- ============================================================
-- PITAYA LAB - 023 · Reset limpio del sistema de clasificación olfativa
-- ============================================================
-- OBJETIVO
--   Eliminar el modelo EAV "olfactive_*" (migración 022, incompleto y con
--   triggers no idempotentes) y dejar el catálogo en el esquema limpio que
--   el equipo usará desde el panel admin:
--
--   fragrance_profiles queda con:
--     • olfactive_family  (uNA de las 4 familias: Floral/Oriental/Amaderada/Cítrica)
--     • collection_tag    (etiqueta libre: Navidad, Otoño-Invierno, Edición…)
--     • hotel_reference   (se conserva como "inspiración" / toque plus)
--
--   NOTA: No se toca la tabla `collections` (continúa como agrupación de
--   continuidad); la nueva clasificación granular vive POR AROMA arriba.
-- ============================================================

-- ------------------------------------------------------------------
-- 1) ELIMINAR EAV olfactive_* (si llegó a existir; idempotente)
-- ------------------------------------------------------------------
DROP TABLE IF EXISTS fragrance_olfactive_values;
DROP TABLE IF EXISTS olfactive_classification_values;
DROP TABLE IF EXISTS olfactive_classifications;

-- Limpieza de políticas huérfanas (por si quedaron de la 022)
DO $$
DECLARE pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE tablename IN ('olfactive_classifications',
                        'olfactive_classification_values',
                        'fragrance_olfactive_values')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

-- ------------------------------------------------------------------
-- 2) LIMPIAR COLUMNAS LEGACY que la 022 añadió a fragrance_profiles
-- ------------------------------------------------------------------
ALTER TABLE fragrance_profiles
  DROP COLUMN IF EXISTS short_copy,
  DROP COLUMN IF EXISTS seasonality;

-- ------------------------------------------------------------------
-- 3) AÑADIR clasificación limpia POR AROMA
-- ------------------------------------------------------------------
-- Familia olfativa: única de las 4 grandes (no se aceptan subfamilias
-- aquí deliberadamente: en la tienda agrupamos por estas 4 para no
-- fragmentar la navegación).
ALTER TABLE fragrance_profiles
  ADD COLUMN IF NOT EXISTS olfactive_family TEXT
    CHECK (olfactive_family IN ('floral', 'oriental', 'amaderada', 'citrica'));

COMMENT ON COLUMN fragrance_profiles.olfactive_family
  IS 'Familia olfativa principal del aroma (floral|oriental|amaderada|citrica). Elegida en admin.';

-- Etiqueta de colección temporal/editorial por aroma (Navidad, Otoño-Invierno,
-- Edición…). Libre, para que el equipo la setee por aroma según campaña.
ALTER TABLE fragrance_profiles
  ADD COLUMN IF NOT EXISTS collection_tag TEXT;

COMMENT ON COLUMN fragrance_profiles.collection_tag
  IS 'Etiqueta temporal/editorial del aroma puesta desde admin (ej. Navidad). NO es la tabla collections.';

-- ------------------------------------------------------------------
-- 4) ÍNDICES
-- ------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_fp_family ON fragrance_profiles(olfactive_family)
  WHERE olfactive_family IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_fp_collection_tag ON fragrance_profiles(collection_tag)
  WHERE collection_tag IS NOT NULL;
