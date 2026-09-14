-- ============================================
-- PITAYA LAB - Migración 031
-- Consolidar contenido de secciones en page_sections
-- ============================================
-- Las secciones <SectionValues>, <SectionTrust>, <SectionReviews>,
-- <SectionCta>, <SectionB2BStats>, <SectionB2BAudience> y <SectionB2BFaq>
-- leían su contenido desde site_config (claves section_*) como "default",
-- con page_sections como override. Ahora page_sections es la ÚNICA fuente
-- de verdad (los componentes ya no leen site_config).
--
-- Esta migración:
--   1. Copia (merge) el contenido editado en site_config hacia page_sections.
--   2. Elimina las claves section_* de site_config.
--
-- Se usa `content = content || value` (merge JSONB) y no una sobrescritura,
-- porque site_config no guardaba `title`/`subtitle` en values, trust ni
-- audience; el merge conserva esos campos que ya vivían en page_sections.
-- ============================================

BEGIN;

-- 1) Merge: el valor de site_config gana solo en las claves que contiene.
UPDATE page_sections ps
SET content = ps.content || sc.value
FROM site_config sc
WHERE sc.key = 'section_values'
  AND ps.page = 'home' AND ps.type = 'values'
  AND sc.value IS NOT NULL;

UPDATE page_sections ps
SET content = ps.content || sc.value
FROM site_config sc
WHERE sc.key = 'section_trust'
  AND ps.page = 'home' AND ps.type = 'trust'
  AND sc.value IS NOT NULL;

UPDATE page_sections ps
SET content = ps.content || sc.value
FROM site_config sc
WHERE sc.key = 'section_reviews'
  AND ps.page = 'home' AND ps.type = 'reviews'
  AND sc.value IS NOT NULL;

UPDATE page_sections ps
SET content = ps.content || sc.value
FROM site_config sc
WHERE sc.key = 'section_cta'
  AND ps.page = 'home' AND ps.type = 'cta'
  AND sc.value IS NOT NULL;

UPDATE page_sections ps
SET content = ps.content || sc.value
FROM site_config sc
WHERE sc.key = 'b2b_stats'
  AND ps.page = 'b2b' AND ps.type = 'b2b_stats'
  AND sc.value IS NOT NULL;

UPDATE page_sections ps
SET content = ps.content || sc.value
FROM site_config sc
WHERE sc.key = 'b2b_audience'
  AND ps.page = 'b2b' AND ps.type = 'b2b_audience'
  AND sc.value IS NOT NULL;

UPDATE page_sections ps
SET content = ps.content || sc.value
FROM site_config sc
WHERE sc.key = 'b2b_faq'
  AND ps.page = 'b2b' AND ps.type = 'b2b_faq'
  AND sc.value IS NOT NULL;

-- section_hero nunca fue leído por el store (SectionHero usa page_sections),
-- por lo que solo se elimina sin migrar.

-- 2) Eliminar claves section_* obsoletas de site_config.
DELETE FROM site_config
WHERE key IN (
  'section_values',
  'section_trust',
  'section_reviews',
  'section_cta',
  'section_hero',
  'b2b_stats',
  'b2b_audience',
  'b2b_faq'
);

COMMIT;
