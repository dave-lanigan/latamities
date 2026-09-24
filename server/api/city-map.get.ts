import { getCityMap } from '../utils/city-map'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const city = String(query.city || '').trim()
  const width = Math.min(Math.max(Number(query.width) || 720, 320), 1280)
  const height = Math.min(Math.max(Number(query.height) || 360, 240), 1280)

  if (!city) {
    throw createError({ statusCode: 400, statusMessage: 'City is required.' })
  }

  const cityMap = await getCityMap(city, width, height)

  if (!cityMap) {
    throw createError({ statusCode: 404, statusMessage: 'City map not found.' })
  }

  setHeader(event, 'cache-control', 'no-store')

  return cityMap
})
