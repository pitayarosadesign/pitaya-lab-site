-- ============================================
-- PITAYA LAB - Corregir slugs de productos
-- ============================================
-- Los slugs quedaron mal al duplicar productos.
-- Corregimos los slugs para que coincidan con el nombre real.

-- 1. Bruma Solara: quitar guion final
UPDATE products
SET slug = 'pitaya-lab-bruma-aromatica-solara-225-ml',
    updated_at = now()
WHERE slug = 'pitaya-lab-bruma-aromatica-solara-225-ml-';

-- 2. Aceite "Maderas del Eden" (slug incorrecto decia "xcaret")
UPDATE products
SET slug = 'pitaya-lab-aceite-aromatico-maderas-del-eden-15-ml',
    updated_at = now()
WHERE slug = 'pitaya-lab-aceite-aromtico-xcaret-15-ml';

-- 3. Aceite "Solara" (slug incorrecto decia "maderas-del-eden")
UPDATE products
SET slug = 'pitaya-lab-aceite-aromatico-solara-15-ml',
    updated_at = now()
WHERE slug = 'pitaya-lab-aceite-aromtico-maderas-del-eden-15-ml';

-- 4. Aceite "Santal Duna" (slug con "copia" y timestamp)
UPDATE products
SET slug = 'pitaya-lab-aceite-aromatico-santal-duna-15-ml',
    updated_at = now()
WHERE slug = 'pitaya-lab-aceite-aromtico-santal-Duna-15-ml-copia-1784415976086';

-- Verificar que no queden slugs con problemas
SELECT slug, name FROM products
WHERE slug LIKE '%-'
   OR slug LIKE '%copia%'
   OR slug LIKE '%aromtico%'
   OR slug LIKE '%Duna%';
