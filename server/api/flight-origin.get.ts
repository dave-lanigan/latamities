const SKYSCANNER_GEO_ENDPOINT = 'https://partners.api.skyscanner.net/apiservices/v3/geo/hierarchy/flights/nearest'

const toCoordinate = (value: unknown) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const apiKey = String(config.skyscannerApiKey || '').trim()
  const locale = String(config.skyscannerLocale || 'en-US').trim()

  if (!apiKey) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Missing Skyscanner API key on the server.'
    })
  }

  const query = getQuery(event)
  const latitude = toCoordinate(query.latitude)
  const longitude = toCoordinate(query.longitude)

  if (latitude == null || longitude == null) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Latitude and longitude are required.'
    })
  }

  const response = await fetch(SKYSCANNER_GEO_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey
    },
    body: JSON.stringify({
      locale,
      locator: {
        coordinates: {
          latitude,
          longitude
        }
      }
    })
  })

  if (!response.ok) {
    const text = await response.text()

    throw createError({
      statusCode: response.status,
      statusMessage: `Skyscanner nearest-origin request failed: ${text.slice(0, 200)}`
    })
  }

  const payload = await response.json() as { places?: Record<string, { iata?: string; name?: string; type?: string }> }
  const places = Object.values(payload.places ?? {})
  const airport = places.find((place) => /airport/i.test(String(place.type || '')) && place.iata) ?? places.find((place) => place.iata)

  if (!airport?.iata) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No nearby airport found for the current location.'
    })
  }

  setHeader(event, 'cache-control', 'public, max-age=3600')

  return {
    iata: airport.iata,
    name: airport.name || airport.iata,
    type: airport.type || 'airport'
  }
})