-- ============================================
-- PITAYA LAB - Migración 033
-- Productos recomendados (selección manual y orden en site_config)
-- ============================================
-- La sección de productos de la portada (SectionProducts) mostrará, por
-- defecto, esta lista de productos "recomendados" en el orden aquí definido.
-- Si la propia sección tiene `product_ids` (selección manual por sección),
-- esa selección sigue teniendo prioridad sobre esta lista global.
--
-- La clave guarda un ARRAY de ids (UUID) de `products`, en orden de aparición.
-- ============================================

INSERT INTO site_config (key, value, description) VALUES
('recommended_products', '[]'::jsonb, 'IDs de productos recomendados, en orden manual (se muestran en la sección de productos de la portada)')
ON CONFLICT (key) DO NOTHING;
