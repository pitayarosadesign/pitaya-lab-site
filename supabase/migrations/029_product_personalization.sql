-- ============================================================================
-- 029 · Personalización de productos (Recuerdos / Eventos)
-- ============================================================================
-- Agrega una configuración de personalización por producto. Se activa
-- manualmente desde el admin (checkbox) y aplica sobre todo a recuerdos:
--   - Campos de texto libres (varios), cada uno con su etiqueta y obligatoriedad.
--   - Subida de archivo (imagen/PDF) con tamaño máximo en MB.
--
-- Se guarda como JSONB para no tener que migrar en cada ajuste del modelo:
-- {
--   "enabled": true,
--   "textFields": [
--     { "label": "Escribe los nombres", "required": true },
--     { "label": "Fecha del evento", "required": false }
--   ],
--   "file": {
--     "enabled": true,
--     "types": ["image", "pdf"],
--     "maxMb": 5,
--     "required": false
--   }
-- }
-- ============================================================================

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS personalization jsonb DEFAULT NULL;

COMMENT ON COLUMN products.personalization IS
  'Configuración de personalización por producto (campos de texto + subida de archivo). NULL = sin personalización.';
