-- ============================================
-- PITAYA LAB - Asegurar bucket público de storage
-- Garantiza que exista el bucket 'product-images'
-- (usado para subir imágenes y videos del sitio y de productos)
-- El bucket con public=true se sirve de forma pública por defecto
-- ============================================

-- Crea el bucket si no existe; si ya existe (por ejemplo, creado como privado),
-- lo fuerza a public=true y ajusta el límite de tamaño.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('product-images', 'product-images', true, 52428800, NULL)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

