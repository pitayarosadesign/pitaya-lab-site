// Validación de direcciones con Google Maps Geocoding API.
// Devuelve la dirección normalizada + coordenadas, o `found: false` si no existe.

export interface GeocodeResult {
  found: boolean
  status: string
  formatted_address?: string
  lat?: number
  lng?: number
  partial_match?: boolean
  matched_postal_code?: string
  error?: string
}

export async function geocodeAddress(address: string): Promise<GeocodeResult> {
  const config = useRuntimeConfig()
  const key = config.googleMapsApiKey

  if (!key) {
    return { found: false, status: 'NO_KEY', error: 'GOOGLE_MAPS_API_KEY no configurada' }
  }

  const url =
    'https://maps.googleapis.com/maps/api/geocode/json' +
    `?address=${encodeURIComponent(address)}` +
    `&key=${key}` +
    '&components=country:MX' +
    '&language=es'

  try {
    const res = await fetch(url)
    const data: any = await res.json()

    if (data.status !== 'OK' || !data.results?.length) {
      return { found: false, status: data.status || 'NO_RESULTS' }
    }

    const r = data.results[0]
    const postalComponent = r.address_components?.find((c: any) =>
      c.types?.includes('postal_code')
    )

    return {
      found: true,
      status: 'OK',
      formatted_address: r.formatted_address,
      lat: r.geometry?.location?.lat,
      lng: r.geometry?.location?.lng,
      partial_match: !!r.partial_match,
      matched_postal_code: postalComponent?.long_name || undefined,
    }
  } catch (e: any) {
    return { found: false, status: 'ERROR', error: e?.message || 'Error de red' }
  }
}
