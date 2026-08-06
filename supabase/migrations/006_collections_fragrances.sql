-- ============================================
-- PITAYA LAB - Colecciones y Perfiles Aromáticos
-- ============================================
-- Infraestructura para gestionar desde el admin:
--   - collections   → las 5 colecciones (Santuario Blanco, Oasis, Tierrra...)
--   - fragrance_profiles → los perfiles/aromas que pertenecen a una colección
-- Ambos gestionables desde el panel admin y visibles de forma atractiva en la tienda.
-- ============================================

-- ============================================
-- TABLA: COLLECTIONS (Colecciones)
-- ============================================
CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  description TEXT,
  icon VARCHAR(50),
  image_url TEXT,          -- imagen tipo banner/cabecera de la colección
  accent_color VARCHAR(20),-- color de acento (opcional)
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: FRAGRANCE_PROFILES (Perfiles Aromáticos)
-- ============================================
CREATE TABLE IF NOT EXISTS fragrance_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,          -- fragancia (ej. Xcaret, Vidanta)
  subtitle VARCHAR(255),               -- descriptor corto
  description TEXT,                    -- experiencia / texto largo
  experience TEXT,                     -- mood/experiencia de la fragancia
  notes TEXT,                          -- notas aromáticas (SAL/COR/FONDO)
  hotel_reference VARCHAR(255),        -- referencia hoteles & spa (opcional)
  image_url TEXT,                      -- imagen banner/cabecera del perfil
  emoji VARCHAR(20),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_collections_updated_at
  BEFORE UPDATE ON collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_fragrance_profiles_updated_at
  BEFORE UPDATE ON fragrance_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ÍNDICES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_collections_active ON collections(is_active);
CREATE INDEX IF NOT EXISTS idx_collections_sort ON collections(sort_order);
CREATE INDEX IF NOT EXISTS idx_fragrance_profiles_collection ON fragrance_profiles(collection_id);
CREATE INDEX IF NOT EXISTS idx_fragrance_profiles_active ON fragrance_profiles(is_active);
CREATE INDEX IF NOT EXISTS idx_fragrance_profiles_sort ON fragrance_profiles(sort_order);

-- ============================================
-- INSERTAR LAS 5 COLECCIONES POR DEFECTO
-- ============================================
INSERT INTO collections (slug, name, subtitle, description, icon, sort_order) VALUES
('santuario-blanco', 'Santuario Blanco', 'Perfil Pulcro e Higiénico',
 'Evoca la pureza, la calma absoluta y la sensación de estrenar ropa de cama de alta gama en un hotel boutique. Al mexicano le encanta este tipo de aromas para perfumar recámaras, sábanas y baños porque transmiten una limpieza sofisticada y orden.',
 '🤍', 1),
('oasis-de-bienestar', 'Oasis de Bienestar', 'Perfil Herbal-Botánico de Spa',
 'Conectado directamente con el auge del wellness y el cuidado personal. En México, los espacios inspirados en spas holísticos de Valle de Bravo, Tulum o resorts de lujo tienen una demanda altísima porque la gente busca "desconectarse del caos urbano".',
 '🌿', 2),
('tierra-de-encanto', 'Tierra de Encanto', 'Perfil Amaderado Profundo y Cálido',
 'Este perfil es un homenaje a la calidez y a las raíces. Conecta de manera muy orgánica con el gusto mexicano por las maderas sagradas, la resina y la tierra mojada, ideal para las tardes frescas o para dar un toque de elegancia sobria a la sala.',
 '🌲', 3),
('jardin-de-nectar', 'Jardín de Néctar', 'Perfil Floral Blanco Cremoso',
 'Un guiño a la riqueza botánica de México y a los jardines tropicales. A diferencia de los florales empalagosos, este nombre evoca flores frescas, elegantes y cremosas que funcionan de manera impecable en cremas de manos y jabones líquidos sin saturar.',
 '🌸', 4),
('vibra-urbana', 'Vibra Urbana', 'Perfil Cítrico y Energizante',
 'Pensado para espacios sociales, áreas de trabajo, cocinas o para el público joven-adulto que busca dinamismo, modernidad y frescura (inspirado en la atmósfera chic de los hoteles de diseño).',
 '🍋', 5)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- INSERTAR PERFILES AROMÁTICOS POR DEFECTO
-- ============================================
-- Referencias por slug de colección
-- Santuario Blanco: te-blanco, aloe-vera, sabanas-de-seda
-- Oasis de Bienestar: xcaret, vidanta, six-senses-kiyosumi, lavanda, brisa-de-mar, zen-spa, gran-lujo
-- Tierra de Encanto: maderas-del-eden, sandalo, vainilla, luz-de-copal, palo-santo
-- Jardín de Néctar: jazmin-blanco, westin-oasis, canela-manzana, jardin-oriental
-- Vibra Urbana: solara, toronja-pomelo, aura-grand

INSERT INTO fragrance_profiles (collection_id, slug, name, subtitle, experience, hotel_reference, notes, sort_order) VALUES
-- ===== SANTUARIO BLANCO =====
((SELECT id FROM collections WHERE slug = 'santuario-blanco'), 'te-blanco', 'Té Blanco Mexicano', 'Te Blanco', 'Spa de lujo, alta hotelería y bienestar', 'Colección Exclusiva', 'SAL. Menta, Mandarina / COR. Té Blanco / FONDO. Sándalo, Pachulí', 1),
((SELECT id FROM collections WHERE slug = 'santuario-blanco'), 'aloe-vera', 'Aloe Vera', 'Aloe Vera', 'Santuario Blanco', NULL, NULL, 2),
((SELECT id FROM collections WHERE slug = 'santuario-blanco'), 'sabanas-de-seda', 'Sábanas de Seda', 'Sábanas de Seda', 'Santuario Blanco', 'Aura Grand', NULL, 3),

-- ===== OASIS DE BIENESTAR =====
((SELECT id FROM collections WHERE slug = 'oasis-de-bienestar'), 'xcaret', 'Xcaret', 'Xcaret', 'Resort Tropical', 'Xcaret', NULL, 1),
((SELECT id FROM collections WHERE slug = 'oasis-de-bienestar'), 'vidanta', 'Vidanta', 'Vidanta', 'Oasis de Bienestar', 'Vidanta', NULL, 2),
((SELECT id FROM collections WHERE slug = 'oasis-de-bienestar'), 'six-senses-kiyosumi', 'Six Senses Kiyosumi', 'Six Senses Kiyosumi', 'Spa de Lujo Zen', 'Six Senses', 'SAL. Menta, Verbena, Bergamota / COR. Lavanda / Romero, Té Verde', 3),
((SELECT id FROM collections WHERE slug = 'oasis-de-bienestar'), 'lavanda', 'Lavanda', 'Lavanda', 'Oasis de Bienestar', NULL, NULL, 4),
((SELECT id FROM collections WHERE slug = 'oasis-de-bienestar'), 'brisa-de-mar', 'Brisa de Mar', 'Brisa de Mar', 'Oasis de Bienestar', 'Abreikote', NULL, 5),
((SELECT id FROM collections WHERE slug = 'oasis-de-bienestar'), 'zen-spa', 'Zen Spa & Club de Playa', 'Zen Spa & Club de Playa', 'Alta relajación de santuarios y spa de playa', 'Colección Exclusiva', 'SAL. Romero, Menta / COR. Lavanda / FONDO. Sándalo, Pachoulí', 6),
((SELECT id FROM collections WHERE slug = 'oasis-de-bienestar'), 'gran-lujo', 'Gran Lujo', 'Gran Lujo', 'Colección de hoteles de alta gama', 'Colección Exclusiva', 'SAL. Mandarina / COR. Lavanda, Ylang Ylang / FONDO. Sándalo, Pachulí', 7),

-- ===== TIERRA DE ENCANTO =====
((SELECT id FROM collections WHERE slug = 'tierra-de-encanto'), 'maderas-del-eden', 'Maderas del Edén', 'Maderas del Edén', 'Tierra de Encanto', 'Aman', NULL, 1),
((SELECT id FROM collections WHERE slug = 'tierra-de-encanto'), 'sandalo', 'Sándalo', 'Sándalo', 'Tierra de Encanto', NULL, NULL, 2),
((SELECT id FROM collections WHERE slug = 'tierra-de-encanto'), 'vainilla', 'Vainilla', 'Vainilla', 'Tierra de Encanto', NULL, NULL, 3),
((SELECT id FROM collections WHERE slug = 'tierra-de-encanto'), 'luz-de-copal', 'Luz de Copal', 'Luz de Copal', 'Tierra de Encanto', NULL, NULL, 4),
((SELECT id FROM collections WHERE slug = 'tierra-de-encanto'), 'palo-santo', 'Palo Santo', 'Palo Santo', 'Energía Vital', NULL, 'Bergamota, Cítricos', 5),

-- ===== JARDÍN DE NÉCTAR =====
((SELECT id FROM collections WHERE slug = 'jardin-de-nectar'), 'jazmin-blanco', 'Jazmín Blanco', 'Jazmín Blanco', 'Hotel Boutique en Japón', 'Aman Kyoto', 'Té Verde, Bambú, Jazmín', 1),
((SELECT id FROM collections WHERE slug = 'jardin-de-nectar'), 'westin-oasis', 'Westin Oasis', 'Westin Oasis', 'Alta hotelería, frutos cítricos, herbal y maderosos', 'Hotel Westin', 'SAL. Toronja Pomelo, Grosella / COR. Bambú, Jazmín, Rosa, Azahar, Vainilla / FONDO. Almizcle, Vainilla, Sándalo', 2),
((SELECT id FROM collections WHERE slug = 'jardin-de-nectar'), 'canela-manzana', 'Canela Manzana', 'Canela Manzana', 'Frutos rojos y vainilla', NULL, NULL, 3),
((SELECT id FROM collections WHERE slug = 'jardin-de-nectar'), 'jardin-oriental', 'Jardín Oriental', 'Jardín Oriental', 'Jardín Oriental', NULL, 'Jazmín y pulpa de mandarina', 4),

-- ===== VIBRA URBANA =====
((SELECT id FROM collections WHERE slug = 'vibra-urbana'), 'solara', 'Solara', 'Solara', 'Vibra Urbana', NULL, NULL, 1),
((SELECT id FROM collections WHERE slug = 'vibra-urbana'), 'toronja-pomelo', 'Toronja Pomelo', 'Toronja Pomelo', 'Vibra Urbana', NULL, NULL, 2),
((SELECT id FROM collections WHERE slug = 'vibra-urbana'), 'aura-grand', 'Aura Grand', 'Aura Grand', 'Lujo y Sofisticación', 'Ritz-Carlton', 'SAL. Menta, Naranja / COR. Lavanda, Ylang Ylang / FONDO. Sándalo, Pachulí', 3)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- ============================================

-- COLLECTIONS
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'collections_public_read' AND tablename = 'collections') THEN
    CREATE POLICY "collections_public_read" ON collections FOR SELECT USING (is_active = true);
    CREATE POLICY "collections_admin_all" ON collections FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

-- FRAGRANCE_PROFILES
ALTER TABLE fragrance_profiles ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'fragrance_profiles_public_read' AND tablename = 'fragrance_profiles') THEN
    CREATE POLICY "fragrance_profiles_public_read" ON fragrance_profiles FOR SELECT USING (is_active = true);
    CREATE POLICY "fragrance_profiles_admin_all" ON fragrance_profiles FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

-- ============================================
-- ALTERAR TABLA DE PRODUCTOS: agregar colección
-- ============================================
-- Permite vincular un producto a una colección (opcional)
ALTER TABLE products ADD COLUMN IF NOT EXISTS collection_id UUID REFERENCES collections(id) ON DELETE SET NULL;
