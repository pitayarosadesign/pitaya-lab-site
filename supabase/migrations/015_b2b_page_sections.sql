-- ============================================
-- PITAYA LAB - Migración 015
-- Secciones iniciales de la página B2B
-- ============================================
-- Crea las secciones dinámicas de la página /b2b
-- para que sean editables desde el panel admin.
-- ============================================

-- Insertar secciones B2B si no existen
INSERT INTO page_sections (page, type, title, content, settings, sort_order, is_active)
SELECT 'b2b', 'hero', 'Hero B2B',
  jsonb_build_object(
    'title', 'Fragancias que\nconectan\na tu negocio y tus eventos',
    'subtitle', 'Lleva la alta hotelería a tu tienda, hotel, bodas y eventos corporativos. Precios de mayoreo por volumen, recuerdos personalizados y etiquetado privado.',
    'badge', '🏢 Mayoreo & Corporativo',
    'cta_text', '💍 Cotizar recuerdos para eventos',
    'cta_link', '#cotizador-eventos',
    'cta_secondary_text', '📦 Mayoreo comercial',
    'cta_secondary_link', '#calculadora-mayoreo',
    'media_type', 'image',
    'media_url', '',
    'poster_url', '',
    'slides', '[]'::jsonb
  ),
  jsonb_build_object('enabled', true, 'full_width', true),
  1, true
WHERE NOT EXISTS (SELECT 1 FROM page_sections WHERE page = 'b2b' AND type = 'hero');

INSERT INTO page_sections (page, type, title, content, settings, sort_order, is_active)
SELECT 'b2b', 'b2b_stats', 'B2B Stats',
  jsonb_build_object(
    'stats', jsonb_build_array(
      jsonb_build_object('value', '25–35%', 'label', 'Dto. por volumen B2B'),
      jsonb_build_object('value', '30+', 'label', 'Recuerdos personalizados'),
      jsonb_build_object('value', '100%', 'label', 'Botánico y biodegradable'),
      jsonb_build_object('value', '≤15 d', 'label', 'Días hábiles entrega')
    )
  ),
  jsonb_build_object('enabled', true),
  2, true
WHERE NOT EXISTS (SELECT 1 FROM page_sections WHERE page = 'b2b' AND type = 'b2b_stats');

INSERT INTO page_sections (page, type, title, content, settings, sort_order, is_active)
SELECT 'b2b', 'b2b_audience', 'B2B Audiencia',
  jsonb_build_object(
    'title', '¿Para quién es PITAYA LAB B2B?',
    'subtitle', 'Tres formas de trabajar juntos, según tu tipo de negocio o evento.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '📦', 'title', 'Mayoreo Comercial',
        'description', 'Para tiendas boutique, cafeterías de especialidad y distribuidores que revenden nuestra línea regular. Descuento fijo por volumen sobre el precio público.',
        'points', jsonb_build_array('🎯 Mínimo: 20 piezas surtidas', '💸 Hasta 35% dto.', '🔥 Margen de ganancia saludable para ti'),
        'link', '#calculadora-mayoreo', 'cta_text', 'Cotizar →', 'highlight', false
      ),
      jsonb_build_object(
        'icon', '💍', 'title', 'Recuerdos & Eventos',
        'description', 'Bodas, XV años, eventos corporativos. Recuerdos personalizados con tu diseño o nuestras plantillas, en envases perfumero con tu fragancia insignia.',
        'points', jsonb_build_array('💍 Mínimo: 30 piezas', '🏷️ Etiqueta 5×5 personalizada', '🎁 Kit premium opcional'),
        'link', '#cotizador-eventos', 'cta_text', 'Arma tu recuerdo →', 'highlight', true
      ),
      jsonb_build_object(
        'icon', '🏷️', 'title', 'Etiquetado Privado',
        'description', 'Tu marca, nuestros productos. Personalizamos etiquetas con tu logotipo para que ofrezcas fragancias PITAYA LAB bajo tu propia marca.',
        'points', jsonb_build_array('🏷️ Diseño de etiquetas propio', '🔒 Exclusividad por zona', '🤝 Contacto directo'),
        'link', '#contacto', 'cta_text', 'Hablemos →', 'highlight', false
      )
    )
  ),
  jsonb_build_object('enabled', true),
  3, true
WHERE NOT EXISTS (SELECT 1 FROM page_sections WHERE page = 'b2b' AND type = 'b2b_audience');

INSERT INTO page_sections (page, type, title, content, settings, sort_order, is_active)
SELECT 'b2b', 'b2b_calculator', 'B2B Calculadora',
  jsonb_build_object(
    'eyebrow', 'Mayoreo Comercial',
    'title', 'Calculadora de Mayoreo',
    'subtitle', 'Cotiza tu pedido al instante. El descuento se aplica automáticamente según el volumen total.'
  ),
  jsonb_build_object('enabled', true),
  4, true
WHERE NOT EXISTS (SELECT 1 FROM page_sections WHERE page = 'b2b' AND type = 'b2b_calculator');

INSERT INTO page_sections (page, type, title, content, settings, sort_order, is_active)
SELECT 'b2b', 'b2b_recuerdos', 'B2B Recuerdos',
  jsonb_build_object(
    'eyebrow', 'Recuerdos para Eventos',
    'title', 'Arma tu Recuerdo paso a paso',
    'subtitle', 'Elige tu envase, fragancia, diseño y cantidad. El precio se ajusta según el volumen. ¿Prefieres cotizar directo? Escríbenos.'
  ),
  jsonb_build_object('enabled', true),
  5, true
WHERE NOT EXISTS (SELECT 1 FROM page_sections WHERE page = 'b2b' AND type = 'b2b_recuerdos');

INSERT INTO page_sections (page, type, title, content, settings, sort_order, is_active)
SELECT 'b2b', 'image_text', 'Etiquetado Privado + Hoteles',
  jsonb_build_object(
    'title', 'Experiencias sensoriales de alta hotelería',
    'subtitle', 'Hoteles, Spas & Empresas',
    'body', 'Nuestras fragancias están inspiradas en la hospitalidad de lujo (Xcaret, Vidanta). Ideales como amenities de cortesía, aromatizantes para habitaciones y regalos corporativos que dejan huella.',
    'image_url', '/images/products/vela-clasica.jpg',
    'button_text', 'Solicitar propuesta corporativa →',
    'button_link', '#contacto'
  ),
  jsonb_build_object('enabled', true, 'image_position', 'right'),
  6, true
WHERE NOT EXISTS (SELECT 1 FROM page_sections WHERE page = 'b2b' AND type = 'image_text');

INSERT INTO page_sections (page, type, title, content, settings, sort_order, is_active)
SELECT 'b2b', 'cta', 'CTA + Contacto',
  jsonb_build_object(
    'title', '¿Tienes un proyecto especial?',
    'description', '¿Bodas de gran escala, hoteles, distribuidores, etiquetado privado? Hablemos directo y armamos una propuesta a tu medida.',
    'button_text', 'Escríbenos por WhatsApp',
    'button_link', 'https://wa.me/523333856064'
  ),
  jsonb_build_object('enabled', true, 'background', 'dark'),
  7, true
WHERE NOT EXISTS (SELECT 1 FROM page_sections WHERE page = 'b2b' AND type = 'cta');

INSERT INTO page_sections (page, type, title, content, settings, sort_order, is_active)
SELECT 'b2b', 'b2b_faq', 'B2B FAQ',
  jsonb_build_object(
    'title', 'Preguntas frecuentes B2B',
    'faqs', jsonb_build_array(
      jsonb_build_object('q', '¿Cuál es el mínimo para mayoreo comercial?', 'a', 'A partir de 20 piezas surtidas. El descuento aumenta de 25% (20–49 pzas) a 30% (51–99 pzas) y 35% (100+ pzas).'),
      jsonb_build_object('q', '¿Cuál es el mínimo para recuerdos personalizados?', 'a', 'A partir de 30 piezas del mismo diseño. Los precios unitarios bajan con el volumen (hasta $45–50 c/u en 100+ piezas).'),
      jsonb_build_object('q', '¿Cuánto tiempo tarda un pedido personalizado?', 'a', 'Hasta 15 días hábiles, según demanda. Te avisamos con antelación la programación y entrega estimada por correo.'),
      jsonb_build_object('q', '¿Puedo poner mi propia marca (etiquetado privado)?', 'a', 'Sí. Ofrecemos etiquetado privado con tu logotipo para que vendas las fragancias bajo tu propia marca.'),
      jsonb_build_object('q', '¿Se pueden mezclar productos para el mayoreo?', 'a', 'Sí. Las 20–30 piezas mínimas pueden ser surtidas entre brumas, velas y aceites.'),
      jsonb_build_object('q', '¿El envío está incluido en el mayoreo?', 'a', 'Los precios de mayoreo no incluyen IVA ni envío. El envío se cotiza por separado según volumen y destino.')
    )
  ),
  jsonb_build_object('enabled', true),
  8, true
WHERE NOT EXISTS (SELECT 1 FROM page_sections WHERE page = 'b2b' AND type = 'b2b_faq');
