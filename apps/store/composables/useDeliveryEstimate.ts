/**
 * 🚚 PITAYA LAB — Entrega Estimada
 * =================================
 * Lógica de cálculo de fechas de entrega estimada según las reglas de negocio:
 *
 *  - Todos los pedidos:
 *      * Preparación: 1 a 2 días hábiles (o el valor definido por
 *        producto/categoría, p. ej. Recuerdos = 4 días hábiles).
 *      * Envío de mensajería: 2 a 5 días hábiles.
 *      * Órdenes pagadas antes de las 13:00 hrs (en día hábil) inician la
 *        preparación el mismo día; si no, al siguiente día hábil.
 *
 * La leyenda predominante es "Recíbelo antes de [fecha]" (límite máximo y
 * honesto), y en detalle fino se puede ampliar el rango estimado.
 * Todos los cálculos usan DÍAS HÁBILES (lunes a viernes).
 */

export interface DeliveryEstimateConfig {
  enabled: boolean
  /** Horas de corte (local) para envío el mismo día */
  sameDayCutoffHour: number
  sameDayCutoffMinute: number
  /** Días hábiles de envío de mensajería (min y max) */
  transitDaysMin: number
  transitDaysMax: number
  /** Días hábiles de preparación (default general 1-2; override por producto/categoría) */
  prepDaysMin: number
  prepDaysMax: number
  /** Copys configurables */
  backorderNote: string
  cutoffNote: string
}

export const DEFAULT_DELIVERY_CONFIG: DeliveryEstimateConfig = {
  enabled: true,
  sameDayCutoffHour: 13,
  sameDayCutoffMinute: 0,
  transitDaysMin: 2,
  transitDaysMax: 5,
  prepDaysMin: 1,
  prepDaysMax: 2,
  backorderNote: 'Este artículo se prepara en taller (sobre pedido).',
  cutoffNote: 'Órdenes pagadas antes de la 1:00 pm inician preparación el mismo día hábil. De lo contrario, al siguiente día hábil.',
}

const MXN = new Intl.DateTimeFormat('es-MX', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

const MXN_MEDIUM = new Intl.DateTimeFormat('es-MX', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
})

/**
 * ¿Es una fecha día hábil (lunes a viernes)? Ignora festivos (sin tabla).
 */
function isBusinessDay(date: Date): boolean {
  const dow = date.getDay()
  return dow !== 0 && dow !== 6
}

/**
 * Avanzar `days` días hábiles a partir de `start` (sin contar start).
 * Si `start` no es hábil, primero se recorre al siguiente hábil.
 */
export function addBusinessDays(start: Date, days: number): Date {
  const result = new Date(start)
  // Si no es día hábil, avanzamos al siguiente lunes
  let added = 0
  while (added < days) {
    result.setDate(result.getDate() + 1)
    if (isBusinessDay(result)) added++
  }
  return result
}

/**
 * ¿La fecha/hora actual ya pasó el corte de las 13:00 del mismo día?
 */
function isAfterCutoff(date: Date, hour: number, minute: number): boolean {
  return date.getHours() > hour || (date.getHours() === hour && date.getMinutes() >= minute)
}

/**
 * Calcular la fecha de ENVÍO (cuándo sale el paquete del taller).
 *  - Si compra en día hábil antes del corte → hoy mismo.
 *  - Si no → siguiente día hábil.
 */
export function calculateShipDate(
  now: Date,
  isBackorder: boolean,
  cfg = DEFAULT_DELIVERY_CONFIG
): Date {
  // Handle over-edges in timezone realism by comparing local
  const todayIsBusiness = isBusinessDay(now)
  if (!isBackorder && todayIsBusiness && !isAfterCutoff(now, cfg.sameDayCutoffHour, cfg.sameDayCutoffMinute)) {
    // Se envía hoy mismo (aún no pasa el corte)
    return new Date(now)
  }
  // Se envía el siguiente día hábil (base hoy para cálculo)
  return addBusinessDays(now, 1)
}

/**
 * Rango de fechas estimadas de ENTREGA (min y max) y la fecha "antes de" (máx).
 * Regresa fechas en días hábiles desde la fecha de envío.
 *
 * @param opts.isBackorder — true si el carrito contiene al menos un sobre pedido
 * @param opts.prepDaysMin — días hábiles de preparación del carrito (override por producto/categoría)
 * @param opts.prepDaysMax — días hábiles de preparación del carrito (override por producto/categoría)
 * @param opts.now — fecha de referencia (default: new Date())
 */
export function estimateDelivery(
  opts: { isBackorder?: boolean; now?: Date; prepDaysMin?: number; prepDaysMax?: number } = {},
  cfg = DEFAULT_DELIVERY_CONFIG
) {
  const now = opts.now || new Date()
  const isBackorder = !!opts.isBackorder

  // Días de preparación: SIEMPRE se suman al envío. Si el producto/categoría
  // define su propia preparación (ej. Recuerdos = 4), se usa ese valor;
  // si no, el default general (1-2 días hábiles).
  const prepMin = typeof opts.prepDaysMin === 'number' ? opts.prepDaysMin : cfg.prepDaysMin
  const prepMax = typeof opts.prepDaysMax === 'number' ? opts.prepDaysMax : cfg.prepDaysMax

  // Cuándo arranca la preparación: hoy mismo si es día hábil antes del corte
  // y no es sobre pedido; si no, el siguiente día hábil.
  const base = calculateShipDate(now, isBackorder, cfg)

  // Entrega = preparación + tránsito de mensajería (ambos en días hábiles).
  const minDate = addBusinessDays(addBusinessDays(base, prepMin), cfg.transitDaysMin)
  const maxDate = addBusinessDays(addBusinessDays(base, prepMax), cfg.transitDaysMax)

  return {
    shipDate: base,
    minDate,
    maxDate,
    isBackorder,
  }
}

/**
 * Fecha legible (nombre de día largo) para la leyenda "Recíbelo antes del [fecha]".
 * Devuelve SÓLO la fecha formateada (ej. "viernes 12 de septiembre").
 */
export function formatDeliveryDeadline(est: ReturnType<typeof estimateDelivery>): string {
  if (!est.maxDate) return ''
  return capitalize(MXN.format(est.maxDate))
}

/**
 * Texto secundario con rango estimado.
 */
export function formatDeliveryRange(est: ReturnType<typeof estimateDelivery>): string {
  return `Estimamos entre el ${capitalize(MXN_MEDIUM.format(est.minDate))} y el ${capitalize(MXN_MEDIUM.format(est.maxDate))}`
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Función reutilizable para cargar la config desde site_config con fallback.
 * Se auto-importa el composable; retorna la config fusionada con defaults.
 */
export async function loadDeliveryConfig(): Promise<DeliveryEstimateConfig> {
  // default config si falla (evita depender de que exista el registro)
  const cfg = { ...DEFAULT_DELIVERY_CONFIG }
  if (!import.meta.client) return cfg
  try {
    // Lectura vía endpoint Nitro (service_role → sin depender de RLS pública)
    const { value } = await $fetch('/api/delivery-config')
    if (value && typeof value === 'object') {
      // Merge profundo ligero con defaults
      Object.keys(cfg).forEach((k) => {
        if (value[k] !== undefined) {
          ;(cfg as any)[k] = value[k]
        }
      })
    }
  } catch (e) {
    // fallback silencioso
  }
  return cfg
}
