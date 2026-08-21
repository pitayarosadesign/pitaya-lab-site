-- ============================================
-- PITAYA LAB - Migración 017
-- Campos configurables del Hero (fondo, overlay, alineación)
-- ============================================
-- Refactorización del HeroSection para que el fondo, overlay/gradiente de
-- legibilidad y la alineación del contenido sean editables desde el panel admin.
--
-- NOTA: El componente <HeroSection> ya maneja estos campos con defaults seguros
-- (media_type por defecto 'video', que si no hay URL se resuelve a fondo de color).
-- Esta migración solo añade los nuevos campos a los heroes ya existentes para que
-- el editor del sitio los muestre/guarde correctamente.
-- ============================================

DO $$
DECLARE
  r RECORD;
  content_json jsonb;
BEGIN
  FOR r IN SELECT id, content FROM page_sections WHERE type = 'hero'
  LOOP
    content_json := r.content;

    -- Fondo de color/gradiente (usado cuando media_type='none' o no hay URL)
    IF NOT content_json ? 'bg_color' THEN
      content_json := jsonb_set(content_json, '{bg_color}',
        '"bg-gradient-to-br from-earth-900 via-primary-900 to-earth-900"'::jsonb, true);
    END IF;

    -- Overlay de legibilidad (solo aplica cuando hay media de fondo)
    IF NOT content_json ? 'overlay_gradient' THEN
      content_json := jsonb_set(content_json, '{overlay_gradient}',
        '"bg-gradient-to-r from-earth-950/70 via-earth-950/50 to-transparent"'::jsonb, true);
    END IF;

    -- Alineación del contenido del hero
    IF NOT content_json ? 'text_align' THEN
      content_json := jsonb_set(content_json, '{text_align}', '"left"'::jsonb, true);
    END IF;

    -- Ancho máximo del contenedor de contenido
    IF NOT content_json ? 'content_max_width' THEN
      content_json := jsonb_set(content_json, '{content_max_width}', '"max-w-3xl"'::jsonb, true);
    END IF;

    UPDATE page_sections SET content = content_json WHERE id = r.id;
  END LOOP;
END $$;
