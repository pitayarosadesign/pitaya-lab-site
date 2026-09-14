-- ============================================
-- PITAYA LAB - Migración 032
-- Editor de contenido: Reseña (/resena) y Guía de Fragancias (/fragrancias)
-- ============================================
-- Crea las claves en site_config para que el panel admin pueda editar el
-- contenido editorial de estas dos rutas fijas. La parte funcional
-- (formulario de reseña, datos de fragancias) sigue viviendo en su código
-- respectivo; aquí solo se edita el encabezado y los textos.
-- ============================================

-- ============================================
-- PÁGINA: RESEÑA (/resena)
-- ============================================
INSERT INTO site_config (key, value, description) VALUES
('resena_page', '{
  "header": {
    "badge": "⭐ Reseña de producto",
    "title": "Cuéntanos tu experiencia con",
    "highlight": "PITAYA LAB",
    "description": "Tu opinión nos ayuda a seguir creando aromas que transformen hogares como el tuyo. ¡Gracias por compartirla! 💚"
  },
  "success": {
    "title": "¡Gracias por tu reseña! 💚",
    "description": "Hemos recibido tu opinión. Pronto aparecerá publicada en nuestra página. ¡Nos alegra mucho saber de ti!",
    "button_text": "Explorar más productos",
    "button_link": "/catalog"
  }
}', 'Contenido de la página de Reseña')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- PÁGINA: GUÍA DE FRAGANCIAS (/fragrancias)
-- ============================================
INSERT INTO site_config (key, value, description) VALUES
('fragrancias_page', '{
  "header": {
    "badge": "🌸 Guía de Fragancias",
    "title": "Encuentra tu",
    "highlight": "aroma ideal",
    "description": "Nuestras fragancias no son solo un producto: cada una es una historia sensorial. Aquí puedes descubrirlas por su personalidad y ver <strong class=\"text-earth-800\">en qué formato llevarla</strong> (vela, aceite, bruma, jabón o crema)."
  }
}', 'Contenido de la página de Guía de Fragancias')
ON CONFLICT (key) DO NOTHING;
