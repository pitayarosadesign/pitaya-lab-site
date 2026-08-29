-- ============================================
-- PITAYA LAB - Migración 021
-- Tabla de reseñas de clientes (reviews)
-- ============================================
-- Propósito: almacenar las reseñas que envían los clientes desde la página
-- /resena del storefront, para que la dueña las revise, apruebe o elimine
-- desde el panel admin, y las aprobadas se muestren en la sección "Reviews"
-- de la tienda.
--
-- Flujo:
--   1. Cliente llena el formulario en /resena → POST /api/reviews → INSERT
--      con status='pending'.
--   2. La dueña revisa en el panel admin (nueva sección "Reseñas"), aprueba
--      (status='approved') o elimina.
--   3. SectionReviews del store consulta las reviews con status='approved'
--      y las muestra junto con las reseñas editadas manualmente.
--
-- RLS:
--   - Public select: SOLO reviews aprobadas (los visitantes ven solo lo aprobado).
--   - Public insert: permitido para que el formulario público guarde.
--   - El admin (service_role) salta RLS para ver todas y decidir.
-- ============================================

-- Asegurar el bucket público para las fotos de reseñas (reutiliza el existente)
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('product-images', 'product-images', true, 52428800)
ON CONFLICT (id) DO NOTHING;

-- Tabla de reseñas
CREATE TABLE IF NOT EXISTS public.reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT,
  product     TEXT,
  rating      INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  comment     TEXT NOT NULL,
  image_url   TEXT,
  status      TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews (status);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews (created_at DESC);

-- Trigger para mantener updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at_reviews()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_reviews_updated_at ON public.reviews;
CREATE TRIGGER trg_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_reviews();

-- ============================================
-- Row Level Security (RLS)
-- ============================================
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Público: solo puede LEER reseñas aprobadas
DROP POLICY IF EXISTS "Public read approved reviews" ON public.reviews;
CREATE POLICY "Public read approved reviews"
ON public.reviews
FOR SELECT
TO anon, authenticated
USING (status = 'approved');

-- Público: puede INSERTAR (enviar reseña desde el formulario)
DROP POLICY IF EXISTS "Public insert reviews" ON public.reviews;
CREATE POLICY "Public insert reviews"
ON public.reviews
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Los clientes pueden leer/actualizar ELIMINAR solo sus propias reseñas
-- (por email, si lo proporcionaron). Usa auth.email() de Supabase.
-- Nota: no hay auth de clientes en el store (usuario anónimo), por lo que
-- el borrado de reseñas propias NO se expone público; el admin lo gestiona.
