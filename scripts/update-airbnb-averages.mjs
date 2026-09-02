import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const profilesPath = resolve(root, 'data/city-profiles.ts')
const args = new Set(process.argv.slice(2))
const shouldWrite = args.has('--write')
const nights = Number(process.env.AIRBNB_NIGHTS ?? 30)
const checkin = process.env.AIRBNB_CHECKIN ?? isoDate(addDays(new Date(), 30))
const checkout = process.env.AIRBNB_CHECKOUT ?? isoDate(addDays(new Date(checkin), nights))
const headers = {
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.9',
  'cache-control': 'no-cache',
  'pragma': 'no-cache',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
}

const source = await readFile(profilesPath, 'utf8')
const cities = [...source.matchAll(/name: '([^']+)',\n\s+country: '([^']+)'/g)].map(([, name, country]) => ({ name, country }))
const selected = process.argv.includes('--city')
  ? cities.filter((city) => city.name.toLowerCase() === process.argv[process.argv.indexOf('--city') + 1]?.toLowerCase())
  : cities

if (!selected.length) {
  throw new Error('No matching cities found')
}

const results = []

for (const city of selected) {
  try {
    const result = await getAverage(city)
    results.push(result)
    console.log(`${city.name}, ${city.country}: $${result.avgMonthlyUSD}/month (${result.sampleSize} listings)`)
  } catch (error) {
    results.push({ ...city, avgMonthlyUSD: null, sampleSize: 0, error: error.message })
    console.error(`${city.name}, ${city.country}: ${error.message}`)
  }

  await wait(1200)
}

if (shouldWrite) {
  await writeFile(profilesPath, applyResults(source, results))
}

async function getAverage(city) {
  const url = searchUrl(city)
  const response = await fetch(url, { headers })

  if (!response.ok) {
    throw new Error(`Airbnb returned ${response.status}`)
  }

  const html = await response.text()
  const data = extractAirbnbData(html)
  const listings = []
  collectListings(data, listings)

  const prices = listings
    .map((listing) => normalizeListing(listing))
    .filter(Boolean)
    .filter((listing) => listing.bedrooms == null || listing.bedrooms <= 1)
    .map((listing) => listing.totalMonthlyUSD ?? (listing.nightlyUSD ? listing.nightlyUSD * nights : null))
    .filter((price) => Number.isFinite(price) && price > 100 && price < 10000)

  const sample = uniqueNumbers(prices)
  const trimmed = trimOutliers(sample)

  if (trimmed.length < 3) {
    throw new Error(`Only found ${trimmed.length} usable listings`)
  }

  return {
    ...city,
    avgMonthlyUSD: roundToNearest(mean(trimmed), 10),
    medianMonthlyUSD: roundToNearest(median(trimmed), 10),
    sampleSize: trimmed.length,
    checkin,
    checkout,
    url
  }
}

function searchUrl(city) {
  const url = new URL(`https://www.airbnb.com/s/${encodeURIComponent(`${city.name}, ${city.country}`)}/homes`)
  url.searchParams.set('tab_id', 'home_tab')
  url.searchParams.set('query', `${city.name}, ${city.country}`)
  url.searchParams.set('checkin', checkin)
  url.searchParams.set('checkout', checkout)
  url.searchParams.set('adults', '1')
  url.searchParams.append('room_types[]', 'Entire home/apt')
  url.searchParams.set('min_bedrooms', '0')
  url.searchParams.set('max_bedrooms', '1')
  return url
}

function extractAirbnbData(html) {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)
    ?? html.match(/<script id="data-deferred-state-\d+"[^>]*>([\s\S]*?)<\/script>/)

  if (!match) {
    throw new Error('Could not find Airbnb search data')
  }

  try {
    return JSON.parse(match[1])
  } catch {
    return JSON.parse(unescapeHtml(match[1]))
  }
}

function collectListings(value, listings) {
  if (!value || typeof value !== 'object') {
    return
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectListings(item, listings)
    }
    return
  }

  if (value.listing || value.structuredDisplayPrice || value.avgRatingLocalized || value.listingParamOverrides) {
    listings.push(value)
  }

  for (const nested of Object.values(value)) {
    collectListings(nested, listings)
  }
}

function normalizeListing(card) {
  const text = JSON.stringify(card)
  const title = String(card.title ?? card.name ?? card.listing?.name ?? '')

  if (/private room|shared room|hotel room/i.test(text)) {
    return null
  }

  const bedrooms = firstNumber([
    card.bedrooms,
    card.listing?.bedroomLabel,
    card.listing?.bedrooms,
    text.match(/(\d+)\s+bedrooms?/i)?.[1],
    /studio/i.test(text) ? 0 : null
  ])

  if (bedrooms != null && bedrooms > 1) {
    return null
  }

  return {
    title,
    bedrooms,
    totalMonthlyUSD: extractPrice(card.structuredDisplayPrice, ['primaryLine', 'discountedPrice', 'originalPrice']) ?? extractTotalPrice(text),
    nightlyUSD: extractNightlyPrice(text)
  }
}

function extractPrice(value, keys) {
  if (!value || typeof value !== 'object') {
    return null
  }

  for (const key of keys) {
    const candidate = value[key]
    const price = extractMoney(typeof candidate === 'string' ? candidate : candidate?.price ?? candidate?.accessibilityLabel ?? candidate?.displayComponentType)

    if (price != null) {
      return price
    }
  }

  return null
}

function extractTotalPrice(text) {
  const patterns = [
    /\$([\d,]+)\s+total/i,
    /total[^$]{0,30}\$([\d,]+)/i,
    /\$([\d,]+)[^$]{0,30}for\s+\d+\s+nights/i
  ]

  for (const pattern of patterns) {
    const price = extractMoney(text.match(pattern)?.[0])

    if (price != null) {
      return price
    }
  }

  return null
}

function extractNightlyPrice(text) {
  const patterns = [
    /\$([\d,]+)\s+night/i,
    /\$([\d,]+)\s+per\s+night/i
  ]

  for (const pattern of patterns) {
    const price = extractMoney(text.match(pattern)?.[0])

    if (price != null) {
      return price
    }
  }

  return null
}

function extractMoney(value) {
  const match = String(value ?? '').match(/\$\s*([\d,]+)/)
  return match ? Number(match[1].replaceAll(',', '')) : null
}

function applyResults(currentSource, updates) {
  let nextSource = currentSource
  const updatedAt = new Date().toISOString().slice(0, 10)

  for (const update of updates.filter((item) => item.avgMonthlyUSD != null)) {
    const blockPattern = new RegExp(`(name: '${escapeRegExp(update.name)}',[\\s\\S]*?details: \\{[\\s\\S]*?timeToNature: '[^']*')([\\s\\S]*?\\n    \\})`)
    const airbnb = `,\n      airbnb: { avgMonthlyUSD: ${update.avgMonthlyUSD}, sampleSize: ${update.sampleSize}, updatedAt: '${updatedAt}' }`

    nextSource = nextSource.replace(blockPattern, (match, before, after) => {
      if (/airbnb:\s*\{[^}]*\}/.test(match)) {
        return match.replace(/airbnb:\s*\{[^}]*\}/, `airbnb: { avgMonthlyUSD: ${update.avgMonthlyUSD}, sampleSize: ${update.sampleSize}, updatedAt: '${updatedAt}' }`)
      }

      return `${before}${airbnb}${after}`
    })
  }

  return nextSource
}

function firstNumber(values) {
  for (const value of values) {
    const number = typeof value === 'number' ? value : Number(String(value ?? '').match(/\d+/)?.[0])

    if (Number.isFinite(number)) {
      return number
    }
  }

  return null
}

function uniqueNumbers(values) {
  return [...new Set(values.map((value) => Math.round(value)))]
}

function trimOutliers(values) {
  const sorted = [...values].sort((a, b) => a - b)

  if (sorted.length < 8) {
    return sorted
  }

  const remove = Math.floor(sorted.length * 0.1)
  return sorted.slice(remove, sorted.length - remove)
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}

function roundToNearest(value, nearest) {
  return Math.round(value / nearest) * nearest
}

function addDays(date, days) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function isoDate(date) {
  return date.toISOString().slice(0, 10)
}

function unescapeHtml(value) {
  return value.replaceAll('&quot;', '"').replaceAll('&amp;', '&').replaceAll('&#x27;', "'")
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
