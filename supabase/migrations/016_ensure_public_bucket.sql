-- ============================================
-- PITAYA LAB - Asegurar que el bucket 'product-images' sea PÚBLICO
-- ============================================
-- Propósito: blindar la configuración del bucket de storage 'product-images'
-- para que quede siempre con public=true.
--
-- Contexto: el bucket 'product-images' (usado para subir imágenes/videos del
-- sitio y de productos) puede existir pero creado con public=false (privado),
-- lo que impide servir las URLs públicas y NO se visualizan las imágenes en la
-- tienda aunque se suban correctamente.
--
-- Esta migración:
--   1. Crea el bucket si no existe (con public=true).
--   2. Si ya existe, lo actualiza con public=true y ajusta file_size_limit
--      (50 MB) para no exceder los límites de subida del admin.
-- ============================================

-- Insertar o actualizar el bucket de forma idempotente
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('product-images', 'product-images', true, 52428800, NULL)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;
