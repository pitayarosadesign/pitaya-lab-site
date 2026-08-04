-- ============================================
-- PITAYA LAB - Envases para Recuerdos (B2B)
-- ============================================

-- Tabla de envases para el cotizador de recuerdos
CREATE TABLE IF NOT EXISTS recuerdo_envases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  capacidad TEXT,
  material TEXT,
  precio_base NUMERIC(10,2) NOT NULL DEFAULT 85,
  stock INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  ficha_tecnica TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_recuerdo_envases_active ON recuerdo_envases(is_active);
CREATE INDEX IF NOT EXISTS idx_recuerdo_envases_sort ON recuerdo_envases(sort_order);

-- Insertar envases por defecto (los que ya estaban en el cotizador)
INSERT INTO recuerdo_envases (slug, nombre, descripcion, capacidad, material, precio_base, stock, sort_order) VALUES
  ('perfumero-cuadrado-dorado', 'Perfumero Premium', 'Vidrio cuadrado con atomizador y tapa dorada', '30 ml', 'Vidrio', 85, 90, 1),
  ('perfumero-cuadrado-dorado-60', 'Perfumero Grain de Riz', 'Vidrio cuadrado con atomizador, tapa dorada', '60 ml', 'Vidrio', 115, 149, 2),
  ('frasco-ambar', 'Frasco Ámbar Esencial', 'Vidrio ámbar con atomizador · clásico y elegante', '30 ml', 'Vidrio ámbar', 85, 120, 3),
  ('perfumero-cilindrico', 'Perfumero Cilíndrico', 'Vidrio transparente, minimalista', '50 ml', 'Vidrio', 100, 80, 4)
ON CONFLICT (slug) DO NOTHING;

-- RLS: permitir lectura pública (para el cotizador del sitio)
ALTER TABLE recuerdo_envases ENABLE ROW LEVEL SECURITY;

-- Lectura pública (anon y autenticado)
DROP POLICY IF EXISTS "recuerdo_envases_public_read" ON recuerdo_envases;
CREATE POLICY "recuerdo_envases_public_read"
  ON recuerdo_envases FOR SELECT
  USING (true);

-- Escritura solo con service role (admin)
DROP POLICY IF EXISTS "recuerdo_envases_admin_write" ON recuerdo_envases;
CREATE POLICY "recuerdo_envases_admin_write"
  ON recuerdo_envases FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
