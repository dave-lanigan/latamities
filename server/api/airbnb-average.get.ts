const AIRBNB_HEADERS = {
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.9',
  'cache-control': 'no-cache',
  pragma: 'no-cache',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
}

const nights = 30

const addDays = (date: Date, days: number) => {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

const isoDate = (date: Date) => date.toISOString().slice(0, 10)

const checkin = (offsetDays = 0) => isoDate(addDays(new Date(), 30 + offsetDays))
const checkout = (value: string) => isoDate(addDays(new Date(value), nights))
const dateOffsets = [-7, 0, 7]

const unescapeHtml = (value: string) => value.replaceAll('&quot;', '"').replaceAll('&amp;', '&').replaceAll('&#x27;', "'")

const extractAirbnbData = (html: string) => {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)
    ?? html.match(/<script id="data-deferred-state-\d+"[^>]*>([\s\S]*?)<\/script>/)

  if (!match) {
    throw createError({ statusCode: 502, statusMessage: 'Could not find Airbnb search data.' })
  }

  try {
    return JSON.parse(match[1]) as unknown
  } catch {
    return JSON.parse(unescapeHtml(match[1])) as unknown
  }
}

const collectListings = (value: unknown, listings: Record<string, unknown>[]) => {
  if (!value || typeof value !== 'object') return

  if (Array.isArray(value)) {
    for (const item of value) collectListings(item, listings)
    return
  }

  const record = value as Record<string, unknown>

  if (record.listing || record.structuredDisplayPrice || record.avgRatingLocalized || record.listingParamOverrides) {
    listings.push(record)
  }

  for (const nested of Object.values(record)) collectListings(nested, listings)
}

const extractMoney = (value: unknown) => {
  const match = String(value ?? '').match(/\$\s*([\d,]+)/)
  return match ? Number(match[1].replaceAll(',', '')) : null
}

const extractPrice = (value: unknown, keys: string[]) => {
  if (!value || typeof value !== 'object') return null

  const record = value as Record<string, unknown>

  for (const key of keys) {
    const candidate = record[key]
    const price = extractMoney(typeof candidate === 'string' ? candidate : (candidate as Record<string, unknown> | undefined)?.price ?? (candidate as Record<string, unknown> | undefined)?.accessibilityLabel)

    if (price != null) return price
  }

  return null
}

const extractTotalPrice = (text: string) => {
  const patterns = [
    /\$([\d,]+)\s+total/i,
    /total[^$]{0,30}\$([\d,]+)/i,
    /\$([\d,]+)[^$]{0,30}for\s+\d+\s+nights/i
  ]

  for (const pattern of patterns) {
    const price = extractMoney(text.match(pattern)?.[0])
    if (price != null) return price
  }

  return null
}

const extractNightlyPrice = (text: string) => {
  const patterns = [/\$([\d,]+)\s+night/i, /\$([\d,]+)\s+per\s+night/i]

  for (const pattern of patterns) {
    const price = extractMoney(text.match(pattern)?.[0])
    if (price != null) return price
  }

  return null
}

const firstNumber = (values: unknown[]) => {
  for (const value of values) {
    const number = typeof value === 'number' ? value : Number(String(value ?? '').match(/\d+/)?.[0])
    if (Number.isFinite(number)) return number
  }

  return null
}

const normalizeListing = (card: Record<string, unknown>) => {
  const text = JSON.stringify(card)
  const listing = card.listing as Record<string, unknown> | undefined

  if (/private room|shared room|hotel room/i.test(text)) return null

  const bedrooms = firstNumber([
    card.bedrooms,
    listing?.bedroomLabel,
    listing?.bedrooms,
    text.match(/(\d+)\s+bedrooms?/i)?.[1],
    /studio/i.test(text) ? 0 : null
  ])

  if (bedrooms != null && bedrooms > 1) return null

  const totalMonthlyUSD = extractPrice(card.structuredDisplayPrice, ['primaryLine', 'discountedPrice', 'originalPrice']) ?? extractTotalPrice(text)
  const nightlyUSD = extractNightlyPrice(text)
  const monthlyUSD = totalMonthlyUSD ?? (nightlyUSD ? nightlyUSD * nights : null)

  return Number.isFinite(monthlyUSD) && monthlyUSD != null && monthlyUSD > 100 && monthlyUSD < 10000 ? Math.round(monthlyUSD) : null
}

const uniqueNumbers = (values: number[]) => [...new Set(values)]

const trimOutliers = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b)
  if (sorted.length < 8) return sorted
  const remove = Math.floor(sorted.length * 0.1)
  return sorted.slice(remove, sorted.length - remove)
}

const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length

const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}

const roundToNearest = (value: number, nearest: number) => Math.round(value / nearest) * nearest

const searchUrl = (city: string, country: string, checkinDate: string, checkoutDate: string, coordinates: [number, number] | null) => {
  const url = new URL(`https://www.airbnb.com/s/${encodeURIComponent(`${city}, ${country}`)}/homes`)
  url.searchParams.set('tab_id', 'home_tab')
  url.searchParams.set('query', `${city}, ${country}`)
  url.searchParams.set('checkin', checkinDate)
  url.searchParams.set('checkout', checkoutDate)
  url.searchParams.set('adults', '1')
  url.searchParams.append('room_types[]', 'Entire home/apt')
  url.searchParams.set('min_bedrooms', '0')
  url.searchParams.set('max_bedrooms', '1')

  if (coordinates) {
    const [lng, lat] = coordinates
    const span = 0.25
    url.searchParams.set('search_by_map', 'true')
    url.searchParams.set('ne_lat', String(lat + span))
    url.searchParams.set('ne_lng', String(lng + span))
    url.searchParams.set('sw_lat', String(lat - span))
    url.searchParams.set('sw_lng', String(lng - span))
    url.searchParams.set('zoom', '11')
  }

  return url.toString()
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const city = String(query.city || '').trim()
  const country = String(query.country || '').trim()
  const latitude = Number(query.latitude)
  const longitude = Number(query.longitude)
  const coordinates: [number, number] | null = Number.isFinite(latitude) && Number.isFinite(longitude) ? [longitude, latitude] : null

  if (!city || !country) {
    throw createError({ statusCode: 400, statusMessage: 'City and country are required.' })
  }

  const searches = dateOffsets.map((offset) => {
    const checkinDate = checkin(offset)
    const checkoutDate = checkout(checkinDate)

    return {
      checkin: checkinDate,
      checkout: checkoutDate,
      url: searchUrl(city, country, checkinDate, checkoutDate, coordinates)
    }
  })

  console.log(`[airbnb-average] ${city}, ${country}`, searches.map((search) => search.url))

  const priceGroups = await Promise.all(searches.map(async (search) => {
    const response = await fetch(search.url, { headers: AIRBNB_HEADERS })

    if (!response.ok) {
      throw createError({ statusCode: response.status, statusMessage: `Airbnb request failed with ${response.status}.` })
    }

    const data = extractAirbnbData(await response.text())
    const listings: Record<string, unknown>[] = []
    collectListings(data, listings)

    return listings.map(normalizeListing).filter((price): price is number => price != null)
  }))

  const prices = trimOutliers(uniqueNumbers(priceGroups.flat()))

  if (prices.length < 3) {
    throw createError({ statusCode: 502, statusMessage: `Only found ${prices.length} usable Airbnb listings.` })
  }

  const avgMonthlyUSD = roundToNearest(mean(prices), 10)
  const medianMonthlyUSD = roundToNearest(median(prices), 10)

  setHeader(event, 'cache-control', 'no-store')

  return {
    city,
    country,
    avgMonthlyUSD,
    medianMonthlyUSD,
    formattedPrice: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(avgMonthlyUSD),
    sampleSize: prices.length,
    searches,
    provider: 'Airbnb search'
  }
})
