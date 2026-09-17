import { validatePostalCode } from '../../utils/postalCode'

export default defineEventHandler((event) => {
  const q = getQuery(event)
  const cp = String(q.cp || '').replace(/\D/g, '')
  const state = String(q.state || '')

  if (!/^\d{5}$/.test(cp)) {
    return { exists: false, status: 'INVALID_FORMAT', state: null, state_mismatch: false, valid: false, invalid: true }
  }

  const v = validatePostalCode(cp)
  const state_mismatch = !!(v.exists && state && v.state && v.state !== state)

  return {
    exists: v.exists,
    status: v.status,
    state: v.state || null,
    state_mismatch,
    valid: v.exists && !state_mismatch,
    invalid: !v.exists,
  }
})
