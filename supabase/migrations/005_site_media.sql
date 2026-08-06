-- ============================================
-- PITAYA LAB - Asegurar bucket público de storage
-- Garantiza que exista el bucket 'product-images'
-- (usado para subir imágenes y videos del sitio y de productos)
-- El bucket con public=true se sirve de forma pública por defecto
-- ============================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
SELECT 'product-images', 'product-images', true, 52428800, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM storage.buckets WHERE id = 'product-images'
);

