// Validador de códigos postales de México con datos de SEPOMEX (local, sin APIs de pago).
// El mapa CP → estado vive en server/data/postalCodes.json (32,467 CPs).

import postalCodes from '../data/postalCodes.json'

export interface PostalCodeResult {
  exists: boolean
  status: 'OK' | 'INVALID_FORMAT' | 'NOT_FOUND'
  state?: string
}

export function validatePostalCode(cp: string): PostalCodeResult {
  const clean = (cp || '').replace(/\D/g, '')

  if (!/^\d{5}$/.test(clean)) {
    return { exists: false, status: 'INVALID_FORMAT' }
  }

  const state = (postalCodes as Record<string, string>)[clean]
  if (!state) {
    return { exists: false, status: 'NOT_FOUND' }
  }

  return { exists: true, status: 'OK', state }
}
