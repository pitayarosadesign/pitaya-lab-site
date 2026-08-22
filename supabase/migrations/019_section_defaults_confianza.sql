-- ============================================
-- PITAYA LAB - Migración 019
-- Defaults de contenido para secciones de confianza (site_config)
-- ============================================
-- Agrega defaults editables desde el panel admin para:
--   section_reviews → SectionReviews (reseñas de clientes)
--   section_cta     → SectionCta (llamada a la acción final)
--   section_hero    → SectionHero (banner principal)
-- ============================================

INSERT INTO site_config (key, value) VALUES
-- Reseñas de clientes (SectionReviews)
('section_reviews', '{
  "title": "Lo que dicen nuestros clientes",
  "subtitle": "Opiniones reales de personas que ya disfrutan PITAYA LAB",
  "items": [
    {
      "author": "María F.",
      "rating": 5,
      "product": "Bruma Solara",
      "text": "El aroma es increíble, me transporta a un hotel de lujo. El empaque es hermoso y llegó muy rápido.",
      "image": null
    },
    {
      "author": "Carlos R.",
      "rating": 5,
      "product": "Vela Sándalo",
      "text": "La vela huele espectacular y dura muchísimo. Se nota la calidad artesanal en cada detalle.",
      "image": null
    },
    {
      "author": "Ana G.",
      "rating": 5,
      "product": "Aceite Xcaret",
      "text": "Perfecto para mi difusor. El aroma es sutil pero dura todo el día. ¡Lo recomiendo muchísimo!",
      "image": null
    },
    {
      "author": "Luis M.",
      "rating": 4,
      "product": "Bruma Vidanta",
      "text": "Muy buen producto, el aroma es fresco y elegante. El envío fue rápido y bien empacado.",
      "image": null
    }
  ]
}'::jsonb),

-- CTA Final (SectionCta)
('section_cta', '{
  "title": "¿Listo para transformar tu hogar?",
  "description": "Descubre nuestra colección completa de velas, aceites y brumas aromáticas.",
  "button_text": "Explorar catálogo",
  "button_link": "/catalog",
  "button_secondary_text": "Comprar en Amazon México",
  "button_secondary_link": "https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329"
}'::jsonb),

-- Hero principal (SectionHero)
('section_hero', '{
  "title": "Fragancias que\nconectan\ncon la naturaleza",
  "subtitle": "En PITAYA LAB creamos productos botánicos biodegradables que transforman tu espacio en un santuario de bienestar.",
  "badge": "100% Natural · Biodegradable · Hecho en México",
  "cta_text": "Explorar catálogo",
  "cta_link": "/catalog",
  "cta_secondary_text": "Tienda Amazon",
  "cta_secondary_link": "https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329",
  "media_type": "video",
  "media_url": "",
  "poster_url": "",
  "bg_color": "bg-gradient-to-br from-earth-900 via-primary-900 to-earth-900",
  "overlay_gradient": "bg-gradient-to-r from-earth-950/70 via-earth-950/50 to-transparent",
  "text_align": "left"
}'::jsonb)

ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = NOW();
