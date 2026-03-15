const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

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
  const width = clamp(Number(query.width) || 1280, 400, 1280)
  const height = clamp(Number(query.height) || 900, 400, 1280)
  const bbox = [-120, -58, -30, 33]
  const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/%5B${bbox.join(',')}%5D/${width}x${height}?logo=false&attribution=false&access_token=${token}`

  const response = await fetch(imageUrl)

  if (!response.ok) {
    const text = await response.text()

    throw createError({
      statusCode: response.status,
      statusMessage: `Mapbox static image request failed: ${text.slice(0, 200)}`
    })
  }

  setHeader(event, 'content-type', response.headers.get('content-type') || 'image/png')
  setHeader(event, 'cache-control', 'public, max-age=3600')

  return Buffer.from(await response.arrayBuffer())
})