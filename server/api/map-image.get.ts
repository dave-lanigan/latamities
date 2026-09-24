import { boundaryPathOverlays, getCityMapViewport, loadBoundary } from '../utils/city-map'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const isFiniteNumber = (value: number) => Number.isFinite(value)
const roundCoord = (value: number) => Number(value.toFixed(5))

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const token = String(config.mapboxToken || '').trim()

  if (!token) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing Mapbox token on the server.'
    })
  }

  const query = getQuery(event)
  const width = clamp(Number(query.width) || 1280, 320, 1280)
  const height = clamp(Number(query.height) || 900, 240, 1280)
  const lng = Number(query.lng)
  const lat = Number(query.lat)
  const boundaryId = String(query.boundary || '').trim()

  const boundary = boundaryId ? await loadBoundary(boundaryId) : null
  const cityViewport = boundaryId ? await getCityMapViewport(boundaryId) : null
  const overlays = boundaryPathOverlays(boundary)
  const overlay = overlays.length ? `${overlays.join(',')}/` : ''

  let viewport = `%5B${[-120, -58, -30, 33].join(',')}%5D`
  if (cityViewport?.mode === 'bounds') {
    viewport = `%5B${cityViewport.bounds.join(',')}%5D`
  } else if (cityViewport?.mode === 'center') {
    viewport = `${roundCoord(cityViewport.center[0])},${roundCoord(cityViewport.center[1])},${cityViewport.zoom},0`
  } else if (isFiniteNumber(lng) && isFiniteNumber(lat)) {
    viewport = `${roundCoord(lng)},${roundCoord(lat)},11.6,0`
  }

  const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/${overlay}${viewport}/${width}x${height}?logo=false&attribution=false&access_token=${token}`

  const response = await fetch(imageUrl)

  if (!response.ok) {
    const text = await response.text()

    throw createError({
      statusCode: response.status,
      statusMessage: `Mapbox static image request failed: ${text.slice(0, 200)}`
    })
  }

  setHeader(event, 'content-type', response.headers.get('content-type') || 'image/png')
  setHeader(event, 'cache-control', 'no-store')

  return Buffer.from(await response.arrayBuffer())
})
