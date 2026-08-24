-- ============================================
-- PITAYA LAB - Política de upload al bucket 'product-images'
-- ============================================
-- Propósito: permitir la SUBIDA (insert/upload) de archivos directamente a
-- Supabase Storage desde el cliente del admin, para archivos grandes
-- (videos) que, si se enviaran en base64 dentro del body HTTP del serverless,
-- causan el error 413 (límite ~4.5 MB de Vercel).
--
-- Contexto: el bucket 'product-images' es público (public=true) para LECTURA
-- (las URLs públicas se sirven), pero por defecto Supabase Storage NIEGA la
-- ESCITURA (upload) sin políticas. El endpoint server usaba service_role
-- (salta RLS), pero no sirve para subir videos grandes desde el cliente.
--
-- Esta migración habilita el INSERT (upload) al bucket para anónimos y
-- usuarios autenticados (el admin), manteniendo el bucket público para lectura.
-- ============================================

-- Asegurar que el bucket exista con public=true y límite 50 MB
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('product-images', 'product-images', true, 52428800, NULL)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Política: permitir upload (INSERT) a objetos en el bucket público
-- 'product-images' para usuarios anónimos (anon key). El upload de imágenes
-- y videos del sitio/admin se hace con el anon key desde el cliente.
DROP POLICY IF EXISTS "Permitir upload publico en product-images" ON storage.objects;
CREATE POLICY "Permitir upload publico en product-images"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (bucket_id = 'product-images');

-- Política: permitir upload (INSERT) para usuarios autenticados
DROP POLICY IF EXISTS "Permitir upload autenticado en product-images" ON storage.objects;
CREATE POLICY "Permitir upload autenticado en product-images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- Política: permitir UPDATE de objetos (sobrescribir/actualizar) en el bucket
-- para anónimos y autenticados (por si se hace upsert).
DROP POLICY IF EXISTS "Permitir update publico en product-images" ON storage.objects;
CREATE POLICY "Permitir update publico en product-images"
ON storage.objects
FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');
