-- ============================================
-- PITAYA LAB - Migración Inicial
-- ============================================
-- Este archivo contiene TODO el esquema de base de datos
-- Productos, Órdenes, CMS, Configuración, etc.
-- ============================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. FUNCIÓN PARA ACTUALIZAR updated_at AUTOMÁTICAMENTE
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TABLAS DEL CATÁLOGO
-- ============================================

-- 3. CATEGORÍAS
CREATE TABLE product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES product_categories(id),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_product_categories_updated_at
  BEFORE UPDATE ON product_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 4. PRODUCTOS
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  subtitle VARCHAR(255),
  description TEXT,
  long_description TEXT,
  category_id UUID REFERENCES product_categories(id),

  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2),
  cost_price DECIMAL(10,2),

  stock INTEGER DEFAULT 0,
  track_inventory BOOLEAN DEFAULT true,
  allow_backorder BOOLEAN DEFAULT false,

  weight_kg DECIMAL(5,2),
  length_cm DECIMAL(5,2),
  width_cm DECIMAL(5,2),
  height_cm DECIMAL(5,2),
  requires_shipping BOOLEAN DEFAULT true,
  free_shipping BOOLEAN DEFAULT false,

  amazon_asin VARCHAR(20),
  amazon_link TEXT,
  amazon_price DECIMAL(10,2),
  sync_amazon BOOLEAN DEFAULT false,

  google_product_category VARCHAR(255),
  google_condition VARCHAR(20) DEFAULT 'new',
  pinterest_product_category VARCHAR(255),
  instagram_product_type VARCHAR(255),
  mpn VARCHAR(100),
  brand VARCHAR(255) DEFAULT 'PITAYA LAB',
  gtin VARCHAR(50),

  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,

  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 5. IMÁGENES DE PRODUCTOS
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  google_image_link TEXT,
  pinterest_image_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. VARIANTES (AROMAS)
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  color_name VARCHAR(100),
  color_hex VARCHAR(7),

  price DECIMAL(10,2),
  compare_at_price DECIMAL(10,2),

  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_product_variants_updated_at
  BEFORE UPDATE ON product_variants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- TABLAS DE CLIENTES
-- ============================================

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  phone VARCHAR(50),

  stripe_customer_id VARCHAR(255),

  shipping_address JSONB,
  billing_address JSONB,

  accepts_marketing BOOLEAN DEFAULT false,
  notes TEXT,

  last_order_at TIMESTAMPTZ,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(12,2) DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- TABLAS DE ÓRDENES
-- ============================================

CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded', 'partially_refunded');
CREATE TYPE shipping_status AS ENUM ('pending', 'label_created', 'picked_up', 'in_transit', 'delivered', 'failed');

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,

  customer_id UUID REFERENCES customers(id),
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255),
  customer_phone VARCHAR(50),

  status order_status NOT NULL DEFAULT 'pending',
  items JSONB NOT NULL,

  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,

  stripe_payment_intent_id VARCHAR(255),
  stripe_session_id VARCHAR(255),
  payment_status payment_status DEFAULT 'pending',

  shipping_address JSONB NOT NULL,
  shipping_method VARCHAR(100),
  shipping_carrier VARCHAR(100),
  tracking_number VARCHAR(255),
  tracking_url TEXT,
  skydropx_shipment_id VARCHAR(255),
  skydropx_label_url TEXT,
  shipping_status shipping_status DEFAULT 'pending',

  notes TEXT,
  admin_notes TEXT,

  ordered_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- CMS - EDITOR DE SITIO WEB
-- ============================================

CREATE TABLE site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_site_config_updated_at
  BEFORE UPDATE ON site_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Configuración por defecto del sitio
INSERT INTO site_config (key, value, description) VALUES
('brand', '{
  "name": "PITAYA LAB",
  "tagline": "Fragancias que conectan",
  "description": "Productos botánicos biodegradables que transforman tu hogar en una experiencia sensorial única.",
  "logo_url": "/images/brand/logo-pitayalab.png",
  "favicon_url": "/favicon.png"
}', 'Información de la marca'),

('theme', '{
  "colors": {
    "primary": "#16a34a",
    "secondary": "#f59e0b",
    "background": "#f0fdf4",
    "text": "#584236"
  },
  "fonts": {
    "heading": "Playfair Display",
    "body": "Inter"
  }
}', 'Configuración visual del tema'),

('shipping_config', '{
  "free_shipping_enabled": true,
  "free_shipping_minimum": 599,
  "free_shipping_text": "Envío gratis en compras mayores a $599 MXN",
  "standard_rate": 99,
  "carrier": "DHL",
  "estimated_days": "3-5 días hábiles"
}', 'Configuración de envíos'),

('home_page', '{
  "hero": {
    "enabled": true,
    "title": "Fragancias que",
    "highlight_word": "conectan",
    "subtitle": "En PITAYA LAB creamos productos botánicos biodegradables para cuidar de ti y del planeta. Velas de soya perfumadas, aceites aromáticos y brumas que transforman tu hogar en una experiencia sensorial única.",
    "badge": "100% Natural · Biodegradable · Hecho en México",
    "cta_primary_text": "Explorar catálogo",
    "cta_primary_link": "/catalog",
    "cta_secondary_text": "Tienda Amazon",
    "cta_secondary_link": "https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329",
    "cta_secondary_visible": true,
    "media_type": "video",
    "media_url": "/images/brand/hero-video.mp4",
    "poster_url": "/images/brand/hero-bruma.png"
  },
  "featured_products": {
    "enabled": true,
    "title": "Nuestros Productos",
    "subtitle": "Velas de soya perfumadas, aceites aromáticos y brumas que transforman tu hogar en una experiencia sensorial única.",
    "max_products": 4,
    "layout": "grid-4",
    "show_view_all": true,
    "view_all_text": "Ver catálogo completo",
    "view_all_link": "/catalog"
  },
  "brand_values": {
    "enabled": true,
    "title": "¿Por qué elegir PITAYA LAB?"
  },
  "scents_showcase": {
    "enabled": true,
    "title": "El arte de la fragancia",
    "subtitle": "Cada aroma ha sido cuidadosamente seleccionado para ofrecerte una experiencia única. Pasa el cursor sobre cada imagen para descubrir su esencia"
  },
  "cta_banner": {
    "enabled": true,
    "title": "¿Listo para transformar tu hogar?",
    "subtitle": "Descubre nuestra colección completa en Amazon y encuentra la fragancia perfecta para cada momento.",
    "button_text": "Comprar en Amazon México",
    "button_url": "https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329"
  }
}', 'Bloques de la página de inicio'),

('seo_defaults', '{
  "title_suffix": "| PITAYA LAB",
  "default_description": "Productos botánicos biodegradables que transforman tu hogar con exquisitas fragancias. Velas de soya, aceites aromáticos y brumas ecológicas.",
  "og_image": "/images/brand/og-image.png"
}', 'Configuración SEO por defecto');

-- SECCIONES DEL SITIO (bloques editables)
CREATE TABLE site_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug VARCHAR(255) NOT NULL,
  section_key VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255),
  content JSONB,
  settings JSONB,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(page_slug, section_key),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_site_sections_updated_at
  BEFORE UPDATE ON site_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- PÁGINAS CMS
CREATE TABLE cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  featured_image TEXT,
  is_published BOOLEAN DEFAULT false,
  is_system_page BOOLEAN DEFAULT false,
  template VARCHAR(50) DEFAULT 'default',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_cms_pages_updated_at
  BEFORE UPDATE ON cms_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- CATÁLOGOS (Google Merchant / Pinterest / Instagram)
-- ============================================

CREATE TABLE catalog_feeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform VARCHAR(50) NOT NULL,
  feed_url TEXT NOT NULL,
  last_generated_at TIMESTAMPTZ,
  product_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_catalog_feeds_updated_at
  BEFORE UPDATE ON catalog_feeds
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- CUPONES Y DESCUENTOS
-- ============================================

CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount', 'free_shipping')),
  discount_value DECIMAL(10,2) NOT NULL,
  minimum_order_amount DECIMAL(10,2) DEFAULT 0,
  applies_to VARCHAR(20) DEFAULT 'all',
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  per_customer_limit INTEGER DEFAULT 1,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_coupons_updated_at
  BEFORE UPDATE ON coupons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ÍNDICES PARA RENDIMIENTO
-- ============================================

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_product_variants_product ON product_variants(product_id);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_site_sections_page ON site_sections(page_slug);
CREATE INDEX idx_site_config_key ON site_config(key);
CREATE INDEX idx_cms_pages_slug ON cms_pages(slug);

-- ============================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- ============================================

-- PRODUCTOS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Productos visibles para todos (activos)"
  ON products FOR SELECT
  USING (is_active = true);
CREATE POLICY "Admin puede todo en productos"
  ON products FOR ALL
  USING (auth.role() = 'service_role');

-- CATEGORÍAS
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categorías visibles para todos"
  ON product_categories FOR SELECT
  USING (is_active = true);
CREATE POLICY "Admin puede todo en categorías"
  ON product_categories FOR ALL
  USING (auth.role() = 'service_role');

-- IMÁGENES
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Imágenes visibles para todos"
  ON product_images FOR SELECT
  USING (true);
CREATE POLICY "Admin puede todo en imágenes"
  ON product_images FOR ALL
  USING (auth.role() = 'service_role');

-- VARIANTES
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Variantes visibles para todos"
  ON product_variants FOR SELECT
  USING (is_active = true);
CREATE POLICY "Admin puede todo en variantes"
  ON product_variants FOR ALL
  USING (auth.role() = 'service_role');

-- ÓRDENES
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuarios ven sus órdenes"
  ON orders FOR SELECT
  USING (customer_email = auth.email());
CREATE POLICY "Admin puede todo en órdenes"
  ON orders FOR ALL
  USING (auth.role() = 'service_role');

-- CLIENTES
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuarios ven sus datos"
  ON customers FOR SELECT
  USING (email = auth.email());
CREATE POLICY "Admin puede todo en clientes"
  ON customers FOR ALL
  USING (auth.role() = 'service_role');

-- CONFIGURACIÓN DEL SITIO
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Config visible para todos"
  ON site_config FOR SELECT
  USING (true);
CREATE POLICY "Admin puede todo en config"
  ON site_config FOR ALL
  USING (auth.role() = 'service_role');

-- SECCIONES DEL SITIO
ALTER TABLE site_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Secciones visibles para todos"
  ON site_sections FOR SELECT
  USING (is_active = true);
CREATE POLICY "Admin puede todo en secciones"
  ON site_sections FOR ALL
  USING (auth.role() = 'service_role');

-- PÁGINAS CMS
ALTER TABLE cms_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Páginas publicadas visibles"
  ON cms_pages FOR SELECT
  USING (is_published = true);
CREATE POLICY "Admin puede todo en páginas"
  ON cms_pages FOR ALL
  USING (auth.role() = 'service_role');

-- CATÁLOGOS
ALTER TABLE catalog_feeds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin puede todo en feeds"
  ON catalog_feeds FOR ALL
  USING (auth.role() = 'service_role');

-- CUPONES
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin puede todo en cupones"
  ON coupons FOR ALL
  USING (auth.role() = 'service_role');
