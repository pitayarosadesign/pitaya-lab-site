-- ============================================
-- PITAYA LAB - Editor de Contenido por Página
-- ============================================
-- Crea claves en site_config para cada página del sitio
-- para que el panel admin pueda editar el contenido de
-- Sobre Nosotros (/about), Filosofía (/philosophy),
-- FAQ (/faq), Contacto (/contact), Aviso de Privacidad (/privacy)
-- y Términos (/terms).
-- ============================================

-- ============================================
-- PÁGINA: SOBRE NOSOTROS (/about)
-- ============================================
INSERT INTO site_config (key, value, description) VALUES
('about_page', '{
  "header": {
    "badge": "Conócenos",
    "title": "Sobre",
    "highlight": "PITAYA LAB",
    "description": "Somos una marca mexicana comprometida con la creación de productos botánicos biodegradables que transforman los espacios en experiencias sensoriales únicas."
  },
  "story": {
    "badge": "Nuestra Historia",
    "title": "Fragancias que nacen del corazón de México",
    "image_url": "/images/brand/Nuestra Historia-imagen conceptual.jpg",
    "image_alt": "PITAYA LAB - Nuestra historia",
    "secondary_image_url": "/images/brand/hero-bruma.png",
    "secondary_image_alt": "Bruma aromática en ambiente zen con bambú y jazmín",
    "paragraphs": [
      "<strong>PITAYA LAB</strong> nace de la pasión por la naturaleza y el deseo de crear productos que cuiden tanto de las personas como del planeta.",
      "Inspirados por la riqueza natural de México y las experiencias sensoriales de los mejores destinos del país, creamos fragancias que evocan recuerdos y emociones.",
      "Nuestro nombre proviene de la Pitaya, una fruta mexicana vibrante y llena de vitalidad. Como ella, buscamos aportar color, frescura y energía natural a cada hogar.",
      "Cada producto es elaborado con ingredientes botánicos cuidadosamente seleccionados, libres de químicos agresivos, en envases pensados para ser reutilizados o reciclados."
    ]
  }
}', 'Contenido de la página Sobre Nosotros')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- PÁGINA: FILOSOFÍA (/philosophy)
-- ============================================
INSERT INTO site_config (key, value, description) VALUES
('philosophy_page', '{
  "header": {
    "badge": "Nuestra Esencia",
    "title": "Nuestra Filosofía",
    "highlight": "Filosofía",
    "description": "Creemos en un mundo donde el cuidado del hogar y el respeto por la naturaleza pueden coexistir en perfecta armonía."
  },
  "manifesto": {
    "image_url": "/images/scents/concepto-ecologico.png",
    "image_alt": "Sello ecológico PITAYA LAB",
    "items": [
      { "icon": "🌱", "title": "Naturaleza Primero", "description": "Todos nuestros productos están hechos con ingredientes botánicos biodegradables. Creemos que la belleza no debe tener un costo ambiental." },
      { "icon": "🧪", "title": "Química Consciente", "description": "Rechazamos el uso de químicos agresivos, parabenos, ftalatos y sulfatos. Nuestras fórmulas son limpias, seguras y efectivas." },
      { "icon": "🏠", "title": "Hogar con Alma", "description": "Cada vela, aceite o bruma está diseñado para transformar tu espacio en un santuario de bienestar y conexión con la naturaleza." },
      { "icon": "✨", "title": "Experiencias que Inspiran", "description": "Nuestras fragancias están inspiradas en los mejores destinos de México. Del lujo de un resort a la serenidad de un jardín zen." },
      { "icon": "🤝", "title": "Hecho con Propósito", "description": "Apoyamos la producción local mexicana y elegimos empaques que puedan tener una segunda vida, porque cada detalle cuenta." }
    ]
  },
  "eco": {
    "badge": "Eco-Compromiso",
    "title": "Cuidamos el planeta porque es nuestro hogar",
    "image_url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    "image_alt": "Compromiso con la naturaleza",
    "intro": "Cada decisión que tomamos en <strong>PITAYA LAB</strong> está guiada por nuestro compromiso con el medio ambiente.",
    "commitments": [
      "Ingredientes 100% de origen vegetal y biodegradables",
      "Cera de soya natural (no parafina) en todas nuestras velas",
      "Mechas de algodón sin plomo ni blanqueadores",
      "Envases de vidrio reutilizables y reciclables",
      "Libres de parabenos, ftalatos, sulfatos y colorantes artificiales",
      "Producción local para reducir huella de carbono",
      "Nunca testamos en animales"
    ],
    "outro": "Creemos que pequeñas acciones generan grandes cambios. Por eso, cada producto PITAYA LAB es un paso hacia un futuro más consciente y en armonía con la naturaleza."
  },
  "cta": {
    "title": "Únete a nuestra comunidad",
    "description": "Cada compra en nuestra tienda de Amazon es un voto por un mundo más natural y sostenible.",
    "button_text": "Comprar en Amazon"
  }
}', 'Contenido de la página de Filosofía')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- PÁGINA: FAQ (/faq)
-- ============================================
INSERT INTO site_config (key, value, description) VALUES
('faq_page', '{
  "header": {
    "badge": "Ayuda",
    "title": "Preguntas Frecuentes",
    "highlight": "Frecuentes",
    "description": "Todo lo que necesitas saber sobre nuestros productos, envíos y más."
  },
  "prime_banner": {
    "enabled": true,
    "title": "¡Envío Prime en 2 días!",
    "text": "Todos nuestros productos están disponibles en Amazon México con envío <strong>Prime de 2 días máximo</strong>. ¿No tienes Prime? Los envíos estándar llegan en 3 a 5 días hábiles."
  },
  "faqs": [
    {
      "question": "🛒 ¿Cómo puedo comprar los productos PITAYA LAB?",
      "answer": "<p>Muy sencillo. Todos nuestros productos están disponibles en nuestra <strong>tienda oficial de Amazon México</strong>.</p><ol class=\"mt-2 space-y-1\"><li>1. Explora nuestro <a href=\"/catalog\" class=\"text-primary-600 underline\">catálogo</a> y elige el producto que más te guste.</li><li>2. Haz clic en <strong>\"Comprar en Amazon\"</strong> y serás redirigido a nuestra tienda oficial.</li><li>3. Selecciona tu aroma favorito y completa tu compra de forma segura.</li></ol><p class=\"mt-2\">🌎 <strong>Envío a toda la República Mexicana</strong> a través de Amazon.</p>"
    },
    {
      "question": "🚚 ¿Cuánto tarda el envío?",
      "answer": "<p>Depende del método de envío que elijas en Amazon México:</p><ul class=\"mt-2 space-y-1\"><li><strong>📦 Amazon Prime:</strong> <span class=\"text-amber-600 font-bold\">¡2 días máximo!</span> Recibe tus productos en la puerta de tu casa en menos de 48 horas.</li><li><strong>📦 Envío estándar:</strong> De 3 a 5 días hábiles.</li></ul><p class=\"mt-3 p-3 bg-amber-50 rounded-xl text-sm\">💡 <strong>Tip:</strong> Si aún no tienes Amazon Prime, puedes activar una prueba gratuita para obtener envío gratis en 2 días.</p>"
    },
    {
      "question": "🎨 ¿Cómo se usa la Bruma Aromática?",
      "answer": "<p>Nuestra Bruma Aromática es muy versátil. Úsala de las siguientes formas:</p><ul class=\"mt-2 space-y-1\"><li><strong>🛋️ En ambientes:</strong> Rocía en el aire de cualquier habitación para refrescar el espacio.</li><li><strong>🧵 En textiles:</strong> Perfecta para cortinas, cojines, ropa de cama y tapicería. No mancha ni daña los tejidos.</li><li><strong>👕 En ropa:</strong> Úsala en tu clóset o directamente sobre prendas para darles un aroma fresco.</li></ul><p class=\"mt-2\">🔔 <strong>225 ml</strong> rinden aproximadamente para 300 rociadas.</p>"
    },
    {
      "question": "💧 ¿Cómo se usa el Aceite Aromático?",
      "answer": "<p>El Aceite Aromático PITAYA LAB está diseñado para usarse en:</p><ul class=\"mt-2 space-y-1\"><li><strong>⚡ Difusores eléctricos:</strong> Añade 5-8 gotas en el depósito de agua de tu difusor.</li><li><strong>💨 Humidificadores:</strong> Compatible con la mayoría de humidificadores ultrasónicos.</li><li><strong>🕯️ Quemadores de aceite esencial:</strong> Coloca agua y 3-5 gotas en la parte superior del quemador.</li></ul><p class=\"mt-2\">🔔 <strong>15 ml</strong> rinden aproximadamente para 60-80 usos en difusor.</p>"
    },
    {
      "question": "🕯️ ¿Cómo uso la Vela Aromática Clásica?",
      "answer": "<p>Para disfrutar al máximo tu Vela Clásica PITAYA LAB:</p><ul class=\"mt-2 space-y-1\"><li>🔥 <strong>Primer uso:</strong> Deja que la cera se derrita completamente hasta los bordes del tarro (aproximadamente 2-3 horas). Esto evita que se forme un túnel.</li><li>✂️ <strong>Mecha:</strong> Recorta la mecha a 5 mm antes de cada uso para evitar humo negro.</li><li>⏱️ <strong>Duración:</strong> No la enciendas más de 4 horas seguidas.</li><li>🧯 <strong>Seguridad:</strong> Nunca dejes la vela encendida sin supervisión. Colócala sobre una superficie plana y resistente al calor.</li></ul><p class=\"mt-2\">🔔 <strong>250 gr</strong> con una duración aproximada de 40-50 horas.</p>"
    },
    {
      "question": "💎 ¿Qué hace especial a la Vela Mística con Cuarzos?",
      "answer": "<p>La Vela Mística es nuestra edición más exclusiva:</p><ul class=\"mt-2 space-y-1\"><li>✨ Incluye <strong>cuarzos naturales</strong> incrustados en la cera que se revelan conforme la vela se consume.</li><li>🎁 Viene en un <strong>envase de lujo</strong> que puedes reutilizar como joyero o decoración.</li><li>🌿 Cera de soya premium con mayor concentración de fragancia.</li><li>⏱️ <strong>350 gr</strong> con una duración de 55-70 horas.</li></ul><p class=\"mt-2\">Cada vela es única, como la energía de los cristales que la acompañan.</p>"
    },
    {
      "question": "🌿 ¿Los productos son realmente biodegradables?",
      "answer": "<p>¡Sí! Todos nuestros productos están formulados con ingredientes de origen vegetal que se degradan naturalmente.</p><ul class=\"mt-2 space-y-1\"><li>✅ <strong>Cera de soya 100% natural</strong> (no parafina).</li><li>✅ <strong>Mechas de algodón</strong> sin plomo ni blanqueadores.</li><li>✅ <strong>Fórmulas libres</strong> de parabenos, ftalatos, sulfatos y colorantes artificiales.</li><li>✅ <strong>Envases de vidrio</strong> reutilizables y reciclables.</li></ul>"
    },
    {
      "question": "🔄 ¿Puedo devolver un producto?",
      "answer": "<p>Las devoluciones se gestionan directamente a través de Amazon México, quien cuenta con su propia política de devoluciones.</p><p class=\"mt-2\">Generalmente, Amazon ofrece <strong>30 días</strong> a partir de la recepción del producto para solicitar una devolución. Para más información, consulta la sección de \"Devoluciones\" en tu cuenta de Amazon.</p>"
    },
    {
      "question": "🇲🇽 ¿Dónde están hechos los productos?",
      "answer": "<p>🎯 Todos nuestros productos son <strong>Hechos en México</strong>.</p><p class=\"mt-2\">Producimos localmente con ingredientes de la más alta calidad, apoyando la economía local y reduciendo nuestra huella de carbono. Cada producto PITAYA LAB es elaborado con amor y dedicación en talleres mexicanos.</p>"
    },
    {
      "question": "🎁 ¿Tienen opción de regalo?",
      "answer": "<p>¡Claro que sí! Todos nuestros productos son ideales para regalar. La Vela Mística viene en un empaque de lujo perfecto para obsequiar.</p><p class=\"mt-2\">Al comprar en Amazon México, puedes seleccionar la opción de <strong>\"Envolver para regalo\"</strong> durante el proceso de compra para que llegue listo para entregar.</p><p class=\"mt-2\">¿Buscas un detalle especial? Cualquiera de nuestros productos es un regalo único que combina naturaleza, bienestar y diseño mexicano.</p>"
    }
  ],
  "footer": {
    "title": "¿Aún tienes dudas?",
    "description": "Escríbenos a nuestro buzón de mensajes y te responderemos a la brevedad.",
    "button_text": "Ir al buzón de mensajes"
  }
}', 'Contenido de la página de Preguntas Frecuentes')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- PÁGINA: CONTACTO (/contact)
-- ============================================
INSERT INTO site_config (key, value, description) VALUES
('contact_page', '{
  "header": {
    "badge": "Contacto",
    "title": "Buzón de Mensajes",
    "highlight": "Mensajes",
    "description": "¿Tienes comentarios, dudas o aclaraciones? Escríbenos, estamos aquí para ayudarte."
  },
  "info_cards": [
    { "icon": "clock", "title": "Respuesta rápida", "description": "Te respondemos en menos de 24 horas" },
    { "icon": "box", "title": "Amazon Prime", "description": "Envío en 2 días máximo" },
    { "icon": "shield", "title": "Compra segura", "description": "Transacciones protegidas por Amazon" }
  ],
  "success": {
    "title": "¡Mensaje enviado con éxito!",
    "description": "Gracias por escribirnos. Te responderemos a la brevedad posible."
  }
}', 'Contenido de la página de Contacto')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- PÁGINA: AVISO DE PRIVACIDAD (/privacy)
-- ============================================
-- Usa HTML rico para secciones legales
INSERT INTO site_config (key, value, description) VALUES
('privacy_page', '{
  "header": {
    "badge": "Legal",
    "title": "Aviso de Privacidad",
    "highlight": "Privacidad",
    "description": "En PITAYA LAB nos tomamos muy en serio la protección de tus datos personales."
  },
  "sections": [
    {
      "title": "1. Identidad y domicilio",
      "content": "<p><strong>PITAYA LAB</strong> es una marca con domicilio en México, responsable del tratamiento de sus datos personales. El presente Aviso de Privacidad regula el tratamiento de la información que usted proporcione al navegar y utilizar nuestro sitio web.</p>"
    },
    {
      "title": "2. Datos personales que recabamos",
      "content": "<p>Podemos recabar las siguientes categorías de datos personales:</p><ul class=\"list-disc pl-6 space-y-2 text-earth-600\"><li><strong>Datos de identificación:</strong> nombre, correo electrónico y teléfono cuando nos contacta a través de formularios.</li><li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas y tiempo de interacción en nuestro sitio web.</li><li><strong>Datos de compra:</strong> cabe señalar que todas las transacciones comerciales se realizan a través de Amazon México, por lo que no almacenamos información bancaria ni de pago.</li></ul>"
    },
    {
      "title": "3. Finalidades del tratamiento de datos",
      "content": "<p>Sus datos personales serán utilizados para las siguientes finalidades:</p><h3 class=\"text-lg font-semibold text-earth-800 mt-4 mb-2\">Finalidades primarias:</h3><ul class=\"list-disc pl-6 space-y-2 text-earth-600\"><li>Atender sus solicitudes de información, comentarios o quejas.</li><li>Dar seguimiento a la relación comercial establecida.</li><li>Redireccionarlo a nuestra tienda oficial en Amazon México para realizar compras.</li></ul><h3 class=\"text-lg font-semibold text-earth-800 mt-4 mb-2\">Finalidades secundarias:</h3><ul class=\"list-disc pl-6 space-y-2 text-earth-600\"><li>Enviar comunicaciones sobre nuevos productos, promociones y novedades de PITAYA LAB.</li><li>Realizar análisis estadísticos y de tendencias de navegación.</li><li>Mejorar la experiencia de usuario en nuestro sitio web.</li></ul>"
    },
    {
      "title": "4. Transferencia de datos personales",
      "content": "<p>Sus datos personales no serán transferidos a terceros sin su consentimiento, salvo las excepciones previstas en la legislación aplicable. Informamos que al hacer clic en los enlaces hacia Amazon México, será redirigido a la plataforma de Amazon, cuyas políticas de privacidad son independientes de las nuestras. Le recomendamos revisar el Aviso de Privacidad de Amazon México.</p>"
    },
    {
      "title": "5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)",
      "content": "<p>Usted tiene derecho a conocer qué datos personales tenemos sobre usted, para qué los utilizamos y las condiciones de su uso (Acceso). Asimismo, puede solicitar la rectificación de su información personal si está desactualizada, inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos (Cancelación); así como oponerse al uso de sus datos para fines específicos (Oposición).</p><p class=\"mt-4\">Para ejercer sus derechos ARCO, puede enviar su solicitud a través de nuestro buzón de mensajes, indicando su nombre, los derechos que desea ejercer y una descripción clara de su petición.</p>"
    },
    {
      "title": "6. Uso de cookies y tecnologías de rastreo",
      "content": "<p>Nuestro sitio web utiliza cookies propias y de terceros para mejorar la experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido. Puede configurar su navegador para rechazar todas las cookies o para indicarle cuándo se envía una cookie. Sin embargo, si no acepta las cookies, es posible que algunas funcionalidades del sitio no funcionen correctamente.</p>"
    },
    {
      "title": "7. Medidas de seguridad",
      "content": "<p>Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso no autorizado. Sin embargo, ninguna transmisión por internet o sistema de almacenamiento electrónico es completamente seguro.</p>"
    },
    {
      "title": "8. Cambios al aviso de privacidad",
      "content": "<p>Nos reservamos el derecho de modificar el presente Aviso de Privacidad en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web. Le recomendamos revisar periódicamente esta página para estar informado de cualquier cambio.</p>"
    },
    {
      "title": "9. Contacto",
      "content": "<p>Si tiene alguna pregunta, comentario o inquietud acerca de este Aviso de Privacidad, o desea ejercer sus derechos ARCO, puede contactarnos al correo: contacto@pitayalab.com.mx o utilizar nuestro buzón de mensajes o bien a través de nuestra tienda oficial en Amazon México.</p>"
    }
  ],
  "note": "<strong>📋 Nota importante:</strong> Todas las transacciones de compra-venta se realizan exclusivamente a través de Amazon México, quien actúa como responsable independiente del tratamiento de sus datos financieros y de pago."
}', 'Contenido de la página de Aviso de Privacidad')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- PÁGINA: TÉRMINOS Y CONDICIONES (/terms)
-- ============================================
INSERT INTO site_config (key, value, description) VALUES
('terms_page', '{
  "header": {
    "badge": "Legal",
    "title": "Términos y Condiciones",
    "highlight": "Condiciones",
    "description": "Al utilizar nuestro sitio web y adquirir nuestros productos, aceptas los siguientes términos y condiciones."
  },
  "sections": [
    {
      "title": "1. Aceptación de los términos",
      "content": "<p>Al acceder y utilizar el sitio web de <strong>PITAYA LAB</strong> (en adelante, \"el Sitio\"), usted acepta cumplir con estos Términos y Condiciones de Uso. Si no está de acuerdo con alguno de estos términos, le solicitamos que no utilice el Sitio.</p>"
    },
    {
      "title": "2. Descripción del servicio",
      "content": "<p>PITAYA LAB es una marca mexicana dedicada a la creación y comercialización de productos botánicos biodegradables para el hogar, incluyendo velas de soya perfumadas, aceites aromáticos y brumas aromáticas. El Sitio funciona como un escaparate informativo de nuestros productos, redirigiendo a los usuarios a nuestra tienda oficial en <strong>Amazon México</strong> para realizar cualquier transacción de compra.</p>"
    },
    {
      "title": "3. Propiedad intelectual",
      "content": "<p>Todo el contenido presente en el Sitio, incluyendo pero no limitado a textos, imágenes, logotipos, diseños, iconos, fotografías, videos y código fuente, es propiedad exclusiva de su titular, a menos que se indique lo contrario. Queda prohibida la reproducción, distribución, modificación o uso no autorizado de dicho contenido sin el consentimiento expreso por escrito de su titular.</p><p class=\"mt-4\">El nombre \"PITAYA LAB\", su logotipo y demás elementos distintivos se encuentran actualmente <strong>en trámite de registro ante el Instituto Mexicano de la Propiedad Industrial (IMPI)</strong>, bajo el número de expediente <strong>3539080</strong>. El uso no autorizado de estos elementos constituye una infracción a las leyes de propiedad intelectual y podrá ser sancionado conforme a la legislación aplicable.</p>"
    },
    {
      "title": "4. Productos y precios",
      "content": "<p>Los productos mostrados en el Sitio están sujetos a disponibilidad. Las descripciones, imágenes y especificaciones de los productos se proporcionan con fines informativos y PITAYA LAB se esfuerza por mantener la exactitud de dicha información.</p><p class=\"mt-4\"><strong>Importante:</strong> Los precios, promociones, costos de envío y disponibilidad de los productos se muestran en la plataforma de Amazon México y pueden variar de acuerdo con campañas promocionales, ofertas exclusivas y la vigencia de las mismas. Para conocer el precio final y las condiciones de compra vigentes, consulte la página del producto en Amazon México.</p>"
    },
    {
      "title": "5. Proceso de compra",
      "content": "<p>El proceso de compra se realiza íntegramente a través de Amazon México. Al hacer clic en los enlaces de \"Comprar en Amazon\" o \"Ver en Amazon\", usted será redirigido al sitio de Amazon México, donde se aplicarán sus propios términos y condiciones, políticas de privacidad y procesos de pago y envío.</p><p class=\"mt-4\">PITAYA LAB no almacena, procesa ni tiene acceso a información de tarjetas de crédito, débito u otros medios de pago utilizados en las transacciones realizadas en Amazon México.</p>"
    },
    {
      "title": "6. Devoluciones y garantías",
      "content": "<p>Las políticas de devolución, cambio y garantía de los productos están sujetas a los términos establecidos por Amazon México y a la legislación aplicable en materia de protección al consumidor en México (Profeco).</p><p class=\"mt-4\">Para cualquier reclamación relacionada con la calidad o el estado de los productos, el usuario debe contactar directamente con Amazon México a través de los canales oficiales que esta plataforma dispone.</p>"
    },
    {
      "title": "7. Limitación de responsabilidad",
      "content": "<p>PITAYA LAB no se hace responsable por:</p><ul class=\"list-disc pl-6 space-y-2 text-earth-600\"><li>Daños o perjuicios derivados del uso del Sitio.</li><li>Problemas técnicos, caídas del servicio o cualquier incidencia tecnológica derivada del uso del Sitio.</li><li>La exactitud, integridad o actualidad de la información proporcionada por terceros enlazados desde el Sitio.</li><li>Cualquier aspecto relacionado con la transacción comercial realizada a través de Amazon México, incluyendo pero no limitado a problemas de pago, envío o servicio al cliente.</li></ul>"
    },
    {
      "title": "8. Enlaces a sitios de terceros",
      "content": "<p>El Sitio puede contener enlaces a sitios web de terceros, como Amazon México. Estos enlaces se proporcionan únicamente para la conveniencia del usuario. PITAYA LAB no tiene control sobre el contenido, políticas o prácticas de dichos sitios y no asume ninguna responsabilidad por ellos. Recomendamos revisar los términos y condiciones y políticas de privacidad de cualquier sitio de terceros que visite.</p>"
    },
    {
      "title": "9. Privacidad",
      "content": "<p>El tratamiento de sus datos personales se realiza conforme a nuestro Aviso de Privacidad, el cual forma parte integral de estos Términos y Condiciones.</p>"
    },
    {
      "title": "10. Aviso sobre referencias a terceros",
      "content": "<p>Los nombres de aromas \"Xcaret\" y \"Vidanta\" utilizados en nuestros productos son referencias meramente inspiracionales y descriptivas de la experiencia sensorial que evocan. PITAYA LAB no tiene ninguna afiliación, vínculo, patrocinio o asociación con los hoteles, marcas turísticas o titulares de dichos nombres. El uso de estas referencias se realiza con fines descriptivos y de identificación de la experiencia olfativa del producto.</p>"
    },
    {
      "title": "11. Legislación aplicable y jurisdicción",
      "content": "<p>Estos Términos y Condiciones se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia relacionada con el presente documento será sometida a la jurisdicción de los tribunales competentes en México, renunciando a cualquier fuero que por razón de su domicilio presente o futuro pudiera corresponderles.</p>"
    },
    {
      "title": "12. Modificaciones",
      "content": "<p>PITAYA LAB se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones serán efectivas inmediatamente después de su publicación en el Sitio. El uso continuado del Sitio después de cualquier modificación constituye la aceptación de los nuevos términos.</p>"
    },
    {
      "title": "13. Contacto",
      "content": "<p>Para cualquier pregunta, comentario o inquietud acerca de estos Términos y Condiciones, puede contactarnos a través de nuestro buzón de mensajes o bien a través de nuestra tienda oficial en Amazon México.</p>"
    }
  ],
  "note": "<strong>⚖️ Nota legal:</strong> PITAYA LAB opera como vendedor dentro de la plataforma Amazon México. Al realizar una compra, el contrato de compra-venta se formaliza directamente con PITAYA LAB a través de la infraestructura de Amazon, sujeto a los términos y condiciones de dicha plataforma."
}', 'Contenido de la página de Términos y Condiciones')
ON CONFLICT (key) DO NOTHING;
