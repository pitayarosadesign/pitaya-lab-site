-- -----------------------------------------------------
-- CATÁLOGO OLFATIVO (FASE 1: ESTRUCTURA)
-- -----------------------------------------------------
-- Sólo estructura en esta migración.
-- Objetivo
--   Sustituir el esquema "mezclado" heredado (que bloqueaba agregar filtros)
--   por un modelo facetado DINÁMICO y profesional basado en diccionarios
--   editables desde el panel admin (sin hardcodear valores en código).
--
-- Regla de oro de esta migración
--   ONLY estructura (tablas, FK, índices, RLS). Los VALORES concretos
--   (familias, inspiraciones, estaciones) son DATOS que viven en las tablas de
--   diccionario y se cargan/exigen desde el admin + seeds posteriores.
--   En este archivo SÓLO se siembran filas de EJEMPLO (referencia) marcadas
--   claramente para que no se interpreten como datos finales de negocio.
--
-- Modelo (3 ejes ortogonales, sin duplicaciones):
--   1) collections        → agrupación EDITORIAL/comerciable (serie padre).
--                            Se REUTILIZA la tabla existente (1:N, cada perfil
--                            pertenece a una). No se crea clon.
--   2) fragrance_profiles → la fragancia "hoja" (Vidanta, Xcaret…).
--                            Se le suman columnas breves de DESPLIEGUE.
--   3) olfactive_*  EAV-lite → metadatos por EJE (classification y values),
--                            con N:N a fragancias permitiendo MÚLTIPLES
--                            etiquetas por eje y futuro escalado sin DDL.
-- ================================================

-- ------------------------------------------------------------------
-- TABLA: olfactive_classifications
--   Ejes/dimensiones de clasificación. El admin los crea/editando
--   (Ej.: key = 'inspiration', key = 'family', key = 'season'…).
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS olfactive_classifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(60) NOT NULL UNIQUE,        -- identificador técnico del eje
  name VARCHAR(120) NOT NULL,             -- etiqueta mostrada (plural ej. 'Colección de inspiración')
  singular VARCHAR(120),                  -- etiqueta singular (ej. 'Inspiración')
  emoji VARCHAR(20),
  description TEXT,
  is_filter BOOLEAN DEFAULT true,         -- si se muestra como faceta en la tienda
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------
-- TABLA: olfactive_classification_values
--   Valores permitidos para cada eje (diccionario dinámico).
--   Admin los da de alta (p. ej. value 'Vidanta Resorts' en eje
--   'inspiration', o 'Floral Verde & Atemporal' en eje 'family').
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS olfactive_classification_values (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  classification_id UUID NOT NULL REFERENCES olfactive_classifications(id) ON DELETE CASCADE,
  slug VARCHAR(255) NOT NULL,              -- slug técnico estable (se mantiene al renombrar)
  name VARCHAR(255) NOT NULL,              -- texto visible (label)
  emoji VARCHAR(20),
  short_desc TEXT,                         -- micro ayuda tooltip
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (classification_id, slug)
);

-- ------------------------------------------------------------------
-- TABLA: fragrance_olfactive_values  (puente N:N fragancia ↔ valor)
--   Una fragancia puede tener UNA O MÁS etiquetas por mismo eje cuando
--   aporte (p. ej., un aroma inspirado en dos hoteles, o en dos familias).
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS fragrance_olfactive_values (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fragrance_id UUID NOT NULL REFERENCES fragrance_profiles(id) ON DELETE CASCADE,
  value_id UUID NOT NULL REFERENCES olfactive_classification_values(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (fragrance_id, value_id)
);

-- ------------------------------------------------------------------
-- COLUMNAS NUEVAS en fragrance_profiles (breves de despliegue,
--   NO son clasificadores → no van a diccionario)
-- ------------------------------------------------------------------
ALTER TABLE fragrance_profiles
  ADD COLUMN IF NOT EXISTS short_copy TEXT,             -- copy corta (primer párrafo de tarjeta / experiencia rápida)
  ADD COLUMN IF NOT EXISTS seasonality VARCHAR(120);    -- 'Atemporal / Primavera' libre (conveniencia de show, no facetado) Deprecated-> preferir eje 'season'.

COMMENT ON COLUMN fragrance_profiles.short_copy
  IS 'Frase breve que verá el cliente como primer texto del aroma (copy profesional).';
COMMENT ON COLUMN fragrance_profiles.seasonality
  IS 'Cadena ilustrativa opcional de estacionalidad (visual), NO faceta. Para filtrar por estación usar el eje olfactive "season".';

-- ------------------------------------------------------------------
-- TRIGGERS de updated_at
-- ------------------------------------------------------------------
CREATE TRIGGER update_olfactive_classifications_updated_at
  BEFORE UPDATE ON olfactive_classifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_olfactive_classification_values_updated_at
  BEFORE UPDATE ON olfactive_classification_values
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ------------------------------------------------------------------
-- ÍNDICES
-- ------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_olfactive_class_active ON olfactive_classifications(is_active);
CREATE INDEX IF NOT EXISTS idx_olfactive_cv_class ON olfactive_classification_values(classification_id);
CREATE INDEX IF NOT EXISTS idx_olfactive_cv_active ON olfactive_classification_values(is_active);
CREATE INDEX IF NOT EXISTS idx_olfactive_cv_frag ON fragrance_olfactive_values(fragrance_id);
CREATE INDEX IF NOT EXISTS idx_olfactive_cv_value ON fragrance_olfactive_values(value_id);

-- ------------------------------------------------------------------
-- RLS
-- ------------------------------------------------------------------
ALTER TABLE olfactive_classifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE olfactive_classification_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE fragrance_olfactive_values ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='olfactive_classifications_public_read' AND tablename='olfactive_classifications') THEN
    CREATE POLICY "olfactive_classifications_public_read" ON olfactive_classifications
      FOR SELECT USING (is_active = true);
    CREATE POLICY "olfactive_classifications_admin_all" ON olfactive_classifications
      FOR ALL USING (auth.role() = 'service_role');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='olfactive_classification_values_public_read' AND tablename='olfactive_classification_values') THEN
    CREATE POLICY "olfactive_classification_values_public_read" ON olfactive_classification_values
      FOR SELECT USING (is_active = true);
    CREATE POLICY "olfactive_classification_values_admin_all" ON olfactive_classification_values
      FOR ALL USING (auth.role() = 'service_role');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='fragrance_olfactive_values_public_read' AND tablename='fragrance_olfactive_values') THEN
    CREATE POLICY "fragrance_olfactive_values_public_read" ON fragrance_olfactive_values
      FOR SELECT USING (
        EXISTS (SELECT 1 FROM fragrance_profiles fp
                WHERE fp.id = fragrance_olfactive_values.fragrance_id AND fp.is_active = true)
      );
    CREATE POLICY "fragrance_olfactive_values_admin_all" ON fragrance_olfactive_values
      FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

-- ============================================================
-- 🔨 SEED (SOLO ESTRUCTURA DE EJEMPLO - REEMPLAZABLE DESDE ADMIN)
-- ============================================================
-- Estos valores de clasificación son PUNTOS DE REFERENCIA que permiten que la
-- tienda se vea "viva" desde el arranque. **NO** son una verdad de negocio
-- definitiva: en el panel admin se editan/agregan nuevos a voluntad, y los
-- seeds posteriores alinearán el catálogo con el inventario maestro de aromas.

-- Ejes base (crear solo si no existen)
INSERT INTO olfactive_classifications (key, name, singular, emoji, description, is_filter, sort_order)
SELECT 'family', 'Familias olfativas', 'Familia', '🧬',
  'Agrupación técnica por tipo de pirámide. Faceta transversal de aroma.', true, 1
WHERE NOT EXISTS (SELECT 1 FROM olfactive_classifications WHERE key='family');

INSERT INTO olfactive_classifications (key, name, singular, emoji, description, is_filter, sort_order)
SELECT 'inspiration', 'Inspiraciones', 'Inspiración', '✨',
  'Referencia inspiracional (lugar/hotel/concepto) del que la fragancia evoca su identidad. Se captura libremente desde el panel.', true, 2
WHERE NOT EXISTS (SELECT 1 FROM olfactive_classifications WHERE key='inspiration');

INSERT INTO olfactive_classifications (key, name, singular, emoji, description, is_filter, sort_order)
SELECT 'season', 'Estaciones', 'Estación', '🍂',
  'Estacionalidad sugerida por temporada (opcional).', true, 3
WHERE NOT EXISTS (SELECT 1 FROM olfactive_classifications WHERE key='season');

INSERT INTO olfactive_classifications (key, name, singular, emoji, description, is_filter, sort_order)
SELECT 'collection_tag', 'Colecciones', 'Colección', '📚',
  'Etiquetas editoriales de presentación (opcional, se puede usar en vez de la colección fija en un futuro).', false, 4
WHERE NOT EXISTS (SELECT 1 FROM olfactive_classifications WHERE key='collection_tag');

-- =============================================
-- ⚠️ EJEMPLO ilutivo — remplazar/añadir desde el panel (no es dato final)
-- Se introduce aquí SOLO como referencia funcional para el showcase/familias del
-- JSON "Hoteles & Resorts" y para probar el eje new en tienda.
-- =============================================
-- (los insert de example de values/puentes reales se harán en la FASE de datos
--  posterior de esta reestructuración; aquí se omite a propósito para no dar a
--  entender que son definitivos)
