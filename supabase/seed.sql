-- ============================================

-- PITAYA LAB - Seed Data
-- ============================================
-- Puebla la base de datos con los productos actuales
-- y la configuración inicial de la tienda
-- ============================================

-- CATEGORÍAS
INSERT INTO product_categories (name, slug, description, sort_order) VALUES
('Velas', 'velas', 'Velas de soya perfumadas. Clásicas y místicas con cuarzos.', 1),
('Aceites', 'aceites', 'Aceites aromáticos concentrados para difusores.', 2),
('Brumas', 'brumas', 'Brumas aromáticas ambientales y textiles.', 3);

-- PRODUCTOS
-- Nota: Los IDs son fijos para usarlos en referencias

-- 1. Bruma Aromática
INSERT INTO products (id, sku, name, slug, subtitle, description, long_description, category_id, price, compare_at_price, cost_price, stock, weight_kg, length_cm, width_cm, height_cm, free_shipping, google_product_category, gtin, is_featured, published_at)
VALUES
(
  'a0000000-0000-0000-0000-000000000001',
  'BRU-225',
  'Bruma Aromática',
  'bruma-aromatica',
  'Aromatizante Ambiental y Textil',
  'Aromatizante versátil para ambientes y tejidos. Perfecto para refrescar cortinas, cojines, ropa de cama y cualquier espacio de tu hogar con una fina niebla de fragancia natural.',
  'Nuestra Bruma Aromática está formulada con ingredientes biodegradables que respetan el medio ambiente. Su fórmula suave es ideal para usar en cualquier tejido sin dañarlo, dejando una estela de frescura que perdura.',
  (SELECT id FROM product_categories WHERE slug = 'brumas'),
  299.00, NULL, 120.00, 50, 0.25, 5, 5, 15, false,
  'Home & Garden > Home Decor > Home Fragrance Accessories',
  '7501234567891', true, NOW()
);

-- 2. Aceite Aromático
INSERT INTO products (id, sku, name, slug, subtitle, description, long_description, category_id, price, compare_at_price, cost_price, stock, weight_kg, length_cm, width_cm, height_cm, free_shipping, google_product_category, gtin, is_featured, published_at)
VALUES
(
  'a0000000-0000-0000-0000-000000000002',
  'ACE-015',
  'Aceite Aromático',
  'aceite-aromatico',
  'Para Difusores',
  'Aceite aromático concentrado ideal para difusores eléctricos, humidificadores y quemadores de aceite esencial. Una experiencia olfativa intensa y prolongada que impregna cada rincón de tu hogar.',
  'Elaborado con aceites esenciales naturales, nuestro Aceite Aromático ofrece una fragancia constante y envolvente. Versátil y fácil de usar en difusores eléctricos, humidificadores o quemadores de aceite esencial. Ideal para crear ambientes únicos en cualquier espacio.',
  (SELECT id FROM product_categories WHERE slug = 'aceites'),
  249.00, NULL, 90.00, 35, 0.03, 3, 3, 8, true,
  'Health & Beauty > Aromatherapy > Essential Oils',
  '7501234567892', true, NOW()
);

-- 3. Vela Aromática Clásica
INSERT INTO products (id, sku, name, slug, subtitle, description, long_description, category_id, price, compare_at_price, cost_price, stock, weight_kg, length_cm, width_cm, height_cm, free_shipping, google_product_category, gtin, is_featured, published_at)
VALUES
(
  'a0000000-0000-0000-0000-000000000003',
  'VCL-250',
  'Vela Aromática Clásica',
  'vela-aromatica-clasica',
  'Tarro Ámbar',
  'Vela de soya perfumada en el clásico tarro ámbar de vidrio. Una llama que ilumina y perfuma creando atmósferas acogedoras.',
  'Nuestra vela clásica está hecha con cera de soya 100% natural, mecha de algodón y fragancias botánicas. El tarro ámbar de vidrio no solo es hermoso, sino que también es reutilizable y reciclable.',
  (SELECT id FROM product_categories WHERE slug = 'velas'),
  349.00, NULL, 150.00, 25, 0.35, 8, 8, 10, false,
  'Home & Garden > Home Decor > Candles',
  '7501234567893', true, NOW()
);

-- 4. Vela Aromática Mística
INSERT INTO products (id, sku, name, slug, subtitle, description, long_description, category_id, price, compare_at_price, cost_price, stock, weight_kg, length_cm, width_cm, height_cm, free_shipping, google_product_category, gtin, is_featured, published_at)
VALUES
(
  'a0000000-0000-0000-0000-000000000004',
  'VMI-350',
  'Vela Aromática Mística',
  'vela-aromatica-mistica',
  'Edición Cuarzos',
  'Vela premium con cuarzos incrustados y envase de lujo. Una experiencia sensorial y energética única para los momentos más especiales.',
  'La edición Mística es nuestra vela más exclusiva. Elaborada con cera de soya de la más alta calidad, cuarzos naturales incrustados y un envase de lujo que la convierte en una pieza decorativa. Cada vela es única, como la energía de los cristales que la acompañan.',
  (SELECT id FROM product_categories WHERE slug = 'velas'),
  499.00, NULL, 220.00, 15, 0.45, 9, 9, 12, false,
  'Home & Garden > Home Decor > Candles',
  '7501234567894', true, NOW()
);

-- IMÁGENES DE PRODUCTOS
INSERT INTO product_images (product_id, url, alt_text, sort_order, is_primary) VALUES
('a0000000-0000-0000-0000-000000000001', '/images/products/Bruma-representacion.png', 'Bruma Aromática PITAYA LAB', 0, true),
('a0000000-0000-0000-0000-000000000002', '/images/products/aceite-aromatico.jpg', 'Aceite Aromático PITAYA LAB', 0, true),
('a0000000-0000-0000-0000-000000000003', '/images/products/vela-clasica.jpg', 'Vela Aromática Clásica PITAYA LAB', 0, true),
('a0000000-0000-0000-0000-000000000004', '/images/products/vela-mistica.png', 'Vela Aromática Mística PITAYA LAB', 0, true);

-- VARIANTES (AROMAS) PARA CADA PRODUCTO
-- Primero creamos los aromas que se repiten en todos los productos
DO $$
DECLARE
  product_id UUID;
  scents text[][] := ARRAY[
    ['Xcaret', 'SCR-XCT', 'Inspirado en la esencia de los hoteles de lujo Xcaret México*', '/images/scents/aroma-xcaret.png'],
    ['Vidanta', 'SCR-VID', 'Inspirado en la esencia de los hoteles de lujo Vidanta*', '/images/scents/aroma-vidanta.png'],
    ['Solara', 'SCR-SOL', 'Cítrico floral vibrante', '/images/scents/aroma-solara.png'],
    ['Maderas del Edén', 'SCR-MDE', 'Notas amaderadas que evocan la naturaleza', NULL],
    ['Jazmín Blanco', 'SCR-JBL', 'Elegancia floral con jazmín puro y bambú verde', '/images/scents/aroma-jazmin-blanco.png'],
    ['Kiyosumi', 'SCR-KIY', 'Inspiración japonesa, sereno y sofisticado', NULL],
    ['Té Verde', 'SCR-TVE', 'Fresco y revitalizante como el té verde', NULL]
  ];
  i integer;
BEGIN
  FOREACH product_id IN ARRAY ARRAY['a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000004']
  LOOP
    FOR i IN 1..array_length(scents, 1) LOOP
      INSERT INTO product_variants (product_id, name, sku, description, image_url, sort_order)
      VALUES (
        product_id,
        scents[i][1],
        (SELECT sku FROM products WHERE id = product_id) || '-' || scents[i][2],
        scents[i][3],
        scents[i][4],
        i
      );
    END LOOP;
  END LOOP;
END $$;

-- SECCIONES DE LA PÁGINA DE INICIO (Home)
-- Nota: La tabla site_sections fue eliminada (migración 008).
-- El contenido de la portada ahora se gestiona vía site_config (claves hero, products_section, etc.)

