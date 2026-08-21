-- ============================================
-- PITAYA LAB - Migración 018
-- Defaults de contenido para secciones dinámicas (site_config)
-- ============================================
-- Mueve el contenido informativo que antes vivía hardcodeado en los componentes
-- <Section*> del store hacia `site_config`, para que sea editable desde el panel
-- admin (claves consumidas por el composable useSectionDefaults).
--
-- claves registradas:
--   section_values  → SectionValues (valores de marca)
--   section_trust   → SectionTrust (beneficios de envío)
--   b2b_stats       → SectionB2BStats
--   b2b_audience    → SectionB2BAudience
--   b2b_faq         → SectionB2BFaq (título + preguntas frecuentes)
-- ============================================

INSERT INTO site_config (key, value) VALUES
-- Valores de marca (SectionValues)
('section_values', '{
  "values": [
    { "icon": "leaf", "title": "100% Natural", "description": "Ingredientes botánicos biodegradables que cuidan de ti y del planeta." },
    { "icon": "shield", "title": "Hecho en México", "description": "Productos artesanales elaborados con amor y dedicación." },
    { "icon": "heart", "title": "Cruelty Free", "description": "Nunca testamos en animales. Solo amor y respeto." },
    { "icon": "sparkles", "title": "Calidad Premium", "description": "Fragancias de alta gama inspiradas en hoteles boutique." }
  ]
}'::jsonb),

-- Beneficios de envío / confianza (SectionTrust)
('section_trust', '{
  "features": [
    { "icon": "truck", "title": "Envío gratis", "description": "En todas tus compras mayores a $299 MXN." },
    { "icon": "package", "title": "Costo simbólico", "description": "Compras menores a $299 solo $50 MXN de envío." },
    { "icon": "clock", "title": "3 a 5 días hábiles", "description": "Entregamos a todo México con mensajerías de prestigio." }
  ]
}'::jsonb),

-- Stats B2B (SectionB2BStats)
('b2b_stats', '{
  "stats": [
    { "value": "25–35%", "label": "Dto. por volumen B2B" },
    { "value": "30+", "label": "Recuerdos personalizados" },
    { "value": "100%", "label": "Botánico y biodegradable" },
    { "value": "≤15 d", "label": "Días hábiles entrega" }
  ]
}'::jsonb),

-- Audiencias B2B (SectionB2BAudience)
('b2b_audience', '{
  "cards": [
    {
      "icon": "📦",
      "title": "Mayoreo Comercial",
      "description": "Para tiendas boutique, cafeterías de especialidad y distribuidores que revenden nuestra línea regular. Descuento fijo por volumen sobre el precio público.",
      "points": ["🎯 Mínimo: 20 piezas surtidas", "💸 Hasta 35% dto.", "🔥 Margen de ganancia saludable para ti"],
      "link": "#calculadora-mayoreo",
      "cta_text": "Cotizar →",
      "highlight": false
    },
    {
      "icon": "💍",
      "title": "Recuerdos & Eventos",
      "description": "Bodas, XV años, eventos corporativos. Recuerdos personalizados con tu diseño o nuestras plantillas, en envases perfumero con tu fragancia insignia.",
      "points": ["💍 Mínimo: 30 piezas", "🏷️ Etiqueta 5×5 personalizada", "🎁 Kit premium opcional"],
      "link": "#cotizador-eventos",
      "cta_text": "Arma tu recuerdo →",
      "highlight": true
    },
    {
      "icon": "🏷️",
      "title": "Etiquetado Privado",
      "description": "Tu marca, nuestros productos. Personalizamos etiquetas con tu logotipo para que ofrezcas fragancias PITAYA LAB bajo tu propia marca.",
      "points": ["🏷️ Diseño de etiquetas propio", "🔒 Exclusividad por zona", "🤝 Contacto directo"],
      "link": "#contacto",
      "cta_text": "Hablemos →",
      "highlight": false
    }
  ]
}'::jsonb),

-- FAQ B2B (SectionB2BFaq)
('b2b_faq', '{
  "title": "Preguntas frecuentes B2B",
  "faqs": [
    { "q": "¿Cuál es el mínimo para mayoreo comercial?", "a": "A partir de 20 piezas surtidas. El descuento aumenta de 25% (20–49 pzas) a 30% (51–99 pzas) y 35% (100+ pzas)." },
    { "q": "¿Cuál es el mínimo para recuerdos personalizados?", "a": "A partir de 30 piezas del mismo diseño. Los precios unitarios bajan con el volumen (hasta $45–50 c/u en 100+ piezas)." },
    { "q": "¿Cuánto tiempo tarda un pedido personalizado?", "a": "Hasta 15 días hábiles, según demanda. Te avisamos con antelación la programación y entrega estimada por correo." },
    { "q": "¿Puedo poner mi propia marca (etiquetado privado)?", "a": "Sí. Ofrecemos etiquetado privado con tu logotipo para que vendas las fragancias bajo tu propia marca." },
    { "q": "¿Se pueden mezclar productos para el mayoreo?", "a": "Sí. Las 20–30 piezas mínimas pueden ser surtidas entre brumas, velas y aceites." },
    { "q": "¿El envío está incluido en el mayoreo?", "a": "Los precios de mayoreo no incluyen IVA ni envío. El envío se cotiza por separado según volumen y destino." }
  ]
}'::jsonb)

ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = NOW();
