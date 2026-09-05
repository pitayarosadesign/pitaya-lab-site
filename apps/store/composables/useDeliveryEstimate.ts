/**
 * 🚚 PITAYA LAB — Entrega Estimada
 * =================================
 * Lógica de cálculo de fechas de entrega estimada según las reglas de negocio:
 *
 *  - Con stock:
 *      * Órdenes pagadas ANTES de las 13:00 hrs (en día hábil) se envían el
 *        mismo día (dentro del horario de preparación 9:00–16:30).
 *      * De lo contrario se envían el siguiente día hábil.
 *      * Envío de mensajería: 2 a 5 días hábiles.
 *
 *  - Sin stock (sobre pedido):
 *      * Preparación en taller: 2 a 3 días hábiles.
 *      * Envío de mensajería: 2 a 5 días hábiles.
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
  /** Días hábiles de preparación en taller para sobre pedido (min y max) */
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
  prepDaysMin: 2,
  prepDaysMax: 3,
  backorderNote: 'Este artículo se prepara en taller en 2-3 días hábiles (sobre pedido).',
  cutoffNote: 'Órdenes pagadas antes de la 1:00 pm se envían el mismo día. De lo contrario, al siguiente día hábil.',
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
 * @param opts.now — fecha de referencia (default: new Date())
 */
export function estimateDelivery(
  opts: { isBackorder?: boolean; now?: Date } = {},
  cfg = DEFAULT_DELIVERY_CONFIG
) {
  const now = opts.now || new Date()
  const isBackorder = !!opts.isBackorder

  // 1) Fecha de envío
  const shipDate = calculateShipDate(now, isBackorder, cfg)

  // 2) Días de preparación previos (si hay sobre pedido) ANTES del envío
  //    Reinterpretamos: cuando es sobre pedido, la preparación ocurre ANTES de
  //    despachar a mensajería. La fórmula correcta:
  //      Fecha de envío real = ahora + (prep si aplica) al siguiente hábil
  //    Para no complicar con "fecha de envío", calculamos el rango a partir de
  //    hoy directamente:
  //      - minTotal = prepMin (0 si stock) + transitMin
  //      - maxTotal = prepMax (0 si stock) + transitMax
  //    y usamos `now` como base caminando días hábiles (considerando el corte).

  // Constructor: cuándo "empieza la cuenta". Con envío mismo día + corte OK:
  //   la cuenta de tránsito inicia hoy. Si pasó el corte o sobre pedido, inicia
  //   al siguiente día hábil (prep + envío).
  const prepMin = isBackorder ? cfg.prepDaysMin : 0
  const prepMax = isBackorder ? cfg.prepDaysMax : 0

  // Base: si hay sobre pedido siempre arranca mañana (siguiente hábil) porque
  //   ya no se despacha hoy. Si stock y antes del corte → arranca hoy.
  const base = calculateShipDate(now, isBackorder, cfg)

  // Rango: la fecha de envío (`base`) + tránsito.
  const minDate = isBackorder
    ? addBusinessDays(addBusinessDays(base, prepMin), cfg.transitDaysMin) // por claridad: prep+transit
    : addBusinessDays(shipDate, cfg.transitDaysMin)

  const maxDate = isBackorder
    ? addBusinessDays(addBusinessDays(base, prepMax), cfg.transitDaysMax)
    : addBusinessDays(shipDate, cfg.transitDaysMax)

  return {
    shipDate,
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
    const supabase = useNuxtApp().$supabase
    if (!supabase) return cfg
    const { data } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'delivery_estimates')
      .single()
    if (data?.value && typeof data.value === 'object') {
      // Merge profundo ligero con defaults
      Object.keys(cfg).forEach((k) => {
        if (data.value[k] !== undefined) {
          ;(cfg as any)[k] = data.value[k]
        }
      })
    }
  } catch (e) {
    // fallback silencioso
  }
  return cfg
}
