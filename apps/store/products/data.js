/**
 * 🌿 PITAYA LAB - Datos de Productos
 * ====================================
 * Archivo central para gestionar todos los productos.
 * ✅ Fácil de modificar: solo edita los arrays.
 * ✅ Cada producto necesita: id, name, description, image, amazonLink, category, scents
 */

const AMAZON_BASE = 'https://www.amazon.com.mx/stores/PitayaLab/page/9A7C33BA-7EBF-41E8-9F0F-FEE7FE78A329?'

// 📸 IMÁGENES DE PRODUCTOS (rutas locales en /public/)
// Imágenes representativas por categoría (1:1)
const IMAGES = {
  bruma: '/images/products/Bruma-representacion.png',
  aceite: '/images/products/aceite-aromatico.jpg',
  velaClasica: '/images/products/vela-clasica.jpg',
  velaMistica: '/images/products/vela-mistica.png',
}

// 🌸 AROMAS DISPONIBLES (con imagen conceptual y guía por mood)
export const SCENTS = [
  { 
    id: 'xcaret', 
    name: 'Xcaret', 
    description: 'Inspirado en la esencia de los hoteles de lujo Xcaret México*',
    image: '/images/scents/aroma-xcaret.png',
    emoji: '🏝️',
    category: 'brumas',
    categoryLabel: 'Bruma',
    vibe: 'Vacaciones de lujo',
    bestFor: 'Ropa de cama, cortinas, salas y espacios amplios'
  },
  { 
    id: 'vidanta', 
    name: 'Vidanta', 
    description: 'Inspirado en la esencia de los hoteles de lujo Vidanta*',
    image: '/images/scents/aroma-vidanta.png',
    emoji: '🌴',
    category: 'brumas',
    categoryLabel: 'Bruma',
    vibe: 'Resort tropical',
    bestFor: 'Habitaciones, baños, y después de la ducha'
  },
  { 
    id: 'solara', 
    name: 'Solara', 
    description: 'Cítrico floral vibrante',
    image: '/images/scents/aroma-solara.png',
    emoji: '🌞',
    category: 'aceites',
    categoryLabel: 'Aceite',
    vibe: 'Energía y frescura',
    bestFor: 'Difusores en áreas de trabajo, mañanas y estudio'
  },
  { 
    id: 'maderas-eden', 
    name: 'Maderas del Edén', 
    description: 'Notas amaderadas que evocan la naturaleza',
    image: null,
    emoji: '🌲',
    category: 'velas',
    categoryLabel: 'Vela',
    vibe: 'Conexión con la naturaleza',
    bestFor: 'Noches de lectura, cenas íntimas y meditación'
  },
  { 
    id: 'jazmin-blanco', 
    name: 'Jazmín Blanco', 
    description: 'Elegancia floral con jazmín puro y bambú verde',
    image: '/images/scents/aroma-jazmin-blanco.png',
    emoji: '🤍',
    category: 'aceites',
    categoryLabel: 'Aceite',
    vibe: 'Elegancia y sofisticación',
    bestFor: 'Difusores en recámaras, salas de estar y spa en casa'
  },
  { 
    id: 'kiyosumi', 
    name: 'Kiyosumi', 
    description: 'Inspiración japonesa, sereno y sofisticado',
    image: null,
    emoji: '🎋',
    category: 'velas',
    categoryLabel: 'Vela',
    vibe: 'Spa de lujo zen',
    bestFor: 'Baños de inmersión, yoga, relajación y sueño profundo'
  },
  { 
    id: 'te-verde', 
    name: 'Té Verde', 
    description: 'Fresco y revitalizante como el té verde',
    image: null,
    emoji: '🍵',
    category: 'brumas',
    categoryLabel: 'Bruma',
    vibe: 'Frescura revitalizante',
    bestFor: 'Textiles, ropa, espacios de lectura y áreas de descanso'
  },
]

// 🛍️ CATÁLOGO DE PRODUCTOS
export const products = [
  {
    id: 'bruma-aromatica',
    name: 'Bruma Aromática',
    subtitle: 'Aromatizante Ambiental y Textil',
    size: '225 ml',
    description: 'Aromatizante versátil para ambientes y tejidos. Perfecto para refrescar cortinas, cojines, ropa de cama y cualquier espacio de tu hogar con una fina niebla de fragancia natural.',
    longDescription: 'Nuestra Bruma Aromática está formulada con ingredientes biodegradables que respetan el medio ambiente. Su fórmula suave es ideal para usar en cualquier tejido sin dañarlo, dejando una estela de frescura que perdura.',
    image: IMAGES.bruma,
    amazonLink: AMAZON_BASE,
    category: 'brumas',
    features: [
      'Aromatizante ambiental y textil',
      '225 ml',
      'Fórmula biodegradable',
      'Sin químicos agresivos',
      'Fragancia de larga duración'
    ],
    scents: ['xcaret', 'vidanta', 'solara', 'maderas-eden', 'jazmin-blanco', 'kiyosumi', 'te-verde'],
  },
  {
    id: 'aceite-aromatico',
    name: 'Aceite Aromático',
    subtitle: 'Para Difusores',
    size: '15 ml',
    description: 'Aceite aromático concentrado ideal para difusores eléctricos, humidificadores y quemadores de aceite esencial. Una experiencia olfativa intensa y prolongada que impregna cada rincón de tu hogar.',
    longDescription: 'Elaborado con aceites esenciales naturales, nuestro Aceite Aromático ofrece una fragancia constante y envolvente. Versátil y fácil de usar en difusores eléctricos, humidificadores o quemadores de aceite esencial. Ideal para crear ambientes únicos en cualquier espacio.',
    image: IMAGES.aceite,
    amazonLink: AMAZON_BASE,
    category: 'aceites',
    features: [
      '15 ml concentrado',
      'Para difusores eléctricos y humidificadores',
      'Fragancia intensa y prolongada',
      'Ingredientes botánicos',
      'Libre de ftalatos'
    ],
    scents: ['xcaret', 'vidanta', 'solara', 'maderas-eden', 'jazmin-blanco', 'kiyosumi', 'te-verde'],
  },
  {
    id: 'vela-aromatica-clasica',
    name: 'Vela Aromática Clásica',
    subtitle: 'Tarro Ámbar',
    size: '250 gr',
    description: 'Vela de soya perfumada en el clásico tarro ámbar de vidrio. Una llama que ilumina y perfuma creando atmósferas acogedoras.',
    longDescription: 'Nuestra vela clásica está hecha con cera de soya 100% natural, mecha de algodón y fragancias botánicas. El tarro ámbar de vidrio no solo es hermoso, sino que también es reutilizable y reciclable.',
    image: IMAGES.velaClasica,
    amazonLink: AMAZON_BASE,
    category: 'velas',
    features: [
      '250 gr de cera de soya',
      'Tarros ámbar de vidrio',
      'Mecha de algodón',
      'Libre de parabenos',
      'Envase reutilizable'
    ],
    scents: ['xcaret', 'vidanta', 'solara', 'maderas-eden', 'jazmin-blanco', 'kiyosumi', 'te-verde'],
  },
  {
    id: 'vela-aromatica-mistica',
    name: 'Vela Aromática Mística',
    subtitle: 'Edición Cuarzos',
    size: '350 gr',
    description: 'Vela premium con cuarzos incrustados y envase de lujo. Una experiencia sensorial y energética única para los momentos más especiales.',
    longDescription: 'La edición Mística es nuestra vela más exclusiva. Elaborada con cera de soya de la más alta calidad, cuarzos naturales incrustados y un envase de lujo que la convierte en una pieza decorativa. Cada vela es única, como la energía de los cristales que la acompañan.',
    image: IMAGES.velaMistica,
    amazonLink: AMAZON_BASE,
    category: 'velas',
    features: [
      '350 gr de cera de soya premium',
      'Cuarzos naturales incrustados',
      'Envase de lujo',
      'Presentación especial',
      'Edición limitada'
    ],
    scents: ['xcaret', 'vidanta', 'solara', 'maderas-eden', 'jazmin-blanco', 'kiyosumi', 'te-verde'],
  },
]

// 🌿 VALORES DE LA MARCA
export const brandValues = [
  {
    title: 'Botánico y Biodegradable',
    description: 'Todos nuestros productos están hechos con ingredientes de origen vegetal que se degradan naturalmente, sin dejar residuos dañinos en el planeta.',
    icon: 'leaf',
  },
  {
    title: 'Sin Químicos Agresivos',
    description: 'Libres de parabenos, ftalatos, sulfatos y cualquier químico agresivo. Solo fragancias puras que respetan tu salud y el medio ambiente.',
    icon: 'shield',
  },
  {
    title: 'Hecho en México',
    description: 'Producimos localmente con ingredientes de la más alta calidad, apoyando la economía local y reduciendo nuestra huella de carbono.',
    icon: 'heart',
  },
  {
    title: 'Experiencias Sensoriales',
    description: 'Cada fragancia está diseñada para transportarte a un lugar especial. Del lujo de un resort a la serenidad de un jardín zen.',
    icon: 'sparkles',
  },
]

// Función helper para obtener producto por ID
export function getProductById(id) {
  return products.find(p => p.id === id)
}

// Función helper para obtener productos por categoría
export function getProductsByCategory(category) {
  return products.filter(p => p.category === category)
}

// Función helper para obtener aroma por ID
export function getScentById(id) {
  return SCENTS.find(s => s.id === id)
}

export default products
