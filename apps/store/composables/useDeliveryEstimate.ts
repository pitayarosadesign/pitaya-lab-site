/**
 * 🚚 PITAYA LAB — Entrega Estimada
 * =================================
 * Lógica de cálculo de fechas de entrega estimada según las reglas de negocio:
 *
 *  - Con stock disponible: se envía directo.
 *      * Envío Express: 1 a 2 días hábiles.
 *  - Bajo pedido (sin stock, elaboración artesanal):
 *      * Elaboración en taller: 2 días hábiles (fijo).
 *      * Envío Express: 1 a 2 días hábiles tras elaboración.
 *      * Total visible al cliente: 3 a 4 días hábiles.
 *  - Órdenes pagadas antes de las 13:00 hrs (en día hábil) inician el proceso
 *    el mismo día; si no, al siguiente día hábil.
 *
 * La leyenda predominante es "Entrega estimada el [fecha]" (límite máximo y
 * honesto), calculada sumando DÍAS HÁBILES (lunes a viernes, excluyendo
 * festivos de México) a la compra.
 */

export interface DeliveryEstimateConfig {
  enabled: boolean
  /** Horas de corte (local) para iniciar elaboración el mismo día */
  sameDayCutoffHour: number
  sameDayCutoffMinute: number
  /** Días hábiles de tránsito express (min y max) */
  transitDaysMin: number
  transitDaysMax: number
  /** Días hábiles de elaboración en taller (default fijo 2) */
  prepDaysMin: number
  prepDaysMax: number
  /** Copys configurables */
  backorderNote: string
  cutoffNote: string
  /** Mostrar badge de recolección local / Punto Post */
  localPickupEnabled: boolean
}

export const DEFAULT_DELIVERY_CONFIG: DeliveryEstimateConfig = {
  enabled: true,
  sameDayCutoffHour: 13,
  sameDayCutoffMinute: 0,
  transitDaysMin: 1,
  transitDaysMax: 2,
  prepDaysMin: 2,
  prepDaysMax: 2,
  backorderNote: 'Este artículo se prepara en taller (sobre pedido).',
  cutoffNote: 'Órdenes pagadas antes de la 1:00 pm inician elaboración el mismo día hábil. De lo contrario, al siguiente día hábil.',
  localPickupEnabled: true,
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
 * Festivos federales de México (fijos + los que se recorren a lunes).
 */
function isHoliday(date: Date): boolean {
  const m = date.getMonth() // 0-based
  const d = date.getDate()
  const dow = date.getDay()

  // Fijos
  if ((m === 0 && d === 1) || (m === 4 && d === 1) || (m === 8 && d === 16) || (m === 11 && d === 25)) return true
  // Primer lunes de febrero (Constitución)
  if (m === 1 && dow === 1 && d <= 7) return true
  // Tercer lunes de marzo (Natalicio de Benito Juárez)
  if (m === 2 && dow === 1 && d >= 15 && d <= 21) return true
  // Tercer lunes de noviembre (Revolución)
  if (m === 10 && dow === 1 && d >= 15 && d <= 21) return true

  return false
}

/**
 * ¿Es una fecha día hábil (lunes a viernes, excluyendo festivos)?
 */
function isBusinessDay(date: Date): boolean {
  const dow = date.getDay()
  if (dow === 0 || dow === 6) return false
  return !isHoliday(date)
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
 * Calcular la fecha en que arranca la elaboración.
 *  - Si compra en día hábil antes del corte → hoy mismo.
 *  - Si no → siguiente día hábil.
 */
export function calculateShipDate(
  now: Date,
  _isBackorder: boolean,
  cfg = DEFAULT_DELIVERY_CONFIG
): Date {
  const todayIsBusiness = isBusinessDay(now)
  if (todayIsBusiness && !isAfterCutoff(now, cfg.sameDayCutoffHour, cfg.sameDayCutoffMinute)) {
    // La elaboración arranca hoy mismo (aún no pasa el corte)
    return new Date(now)
  }
  // Arranca el siguiente día hábil
  return addBusinessDays(now, 1)
}

/**
 * Rango de fechas estimadas de ENTREGA (min y max) y la fecha "antes de" (máx).
 * Regresa fechas en días hábiles desde la fecha de elaboración.
 *
 * @param opts.isBackorder — true si el carrito contiene al menos un sobre pedido
 * @param opts.prepDaysMin — días hábiles de elaboración (override por producto/categoría)
 * @param opts.prepDaysMax — días hábiles de elaboración (override por producto/categoría)
 * @param opts.now — fecha de referencia (default: new Date())
 */
export function estimateDelivery(
  opts: { isBackorder?: boolean; now?: Date; prepDaysMin?: number; prepDaysMax?: number } = {},
  cfg = DEFAULT_DELIVERY_CONFIG
) {
  const now = opts.now || new Date()
  const isBackorder = !!opts.isBackorder

  // Elaboración en taller (2 días hábiles, fijo) SOLO para artículos bajo
  // pedido (sin stock). Con stock disponible el pedido pasa directo a envío.
  const prepMin = isBackorder
    ? (typeof opts.prepDaysMin === 'number' ? opts.prepDaysMin : cfg.prepDaysMin)
    : 0
  const prepMax = isBackorder
    ? (typeof opts.prepDaysMax === 'number' ? opts.prepDaysMax : cfg.prepDaysMax)
    : 0

  // Cuándo arranca la elaboración: hoy mismo si es día hábil antes del corte;
  // si no, el siguiente día hábil.
  const base = calculateShipDate(now, isBackorder, cfg)

  // Entrega = elaboración (si aplica) + tránsito express (días hábiles).
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
