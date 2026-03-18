const SKYSCANNER_ENDPOINT = 'https://partners.api.skyscanner.net/apiservices/v3/flights/indicative/search'

const normalizeIata = (value: unknown) => String(value || '').trim().toUpperCase()

const isIataLike = (value: string) => /^[A-Z]{3}$/.test(value)

const toNumber = (value: unknown) => {
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const collectPriceCandidates = (node: unknown, parentKey = ''): number[] => {
  if (!node) return []

  if (Array.isArray(node)) {
    return node.flatMap((item) => collectPriceCandidates(item, parentKey))
  }

  if (typeof node !== 'object') {
    return []
  }

  const record = node as Record<string, unknown>
  const candidates: number[] = []
  const amount = toNumber(record.amount)

  if (amount != null && /(price|amount|quote)/i.test(parentKey)) {
    candidates.push(amount)
  }

  for (const [key, value] of Object.entries(record)) {
    candidates.push(...collectPriceCandidates(value, key))
  }

  return candidates
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const apiKey = String(config.skyscannerApiKey || '').trim()
  const market = String(config.skyscannerMarket || 'US').trim()
  const locale = String(config.skyscannerLocale || 'en-US').trim()
  const currency = String(config.skyscannerCurrency || 'USD').trim()

  if (!apiKey) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Missing Skyscanner API key on the server.'
    })
  }

  const query = getQuery(event)
  const origin = normalizeIata(query.origin)
  const destination = normalizeIata(query.destination)

  if (!isIataLike(origin) || !isIataLike(destination)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Origin and destination must be three-letter IATA or city codes.'
    })
  }

  const response = await fetch(SKYSCANNER_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey
    },
    body: JSON.stringify({
      query: {
        market,
        locale,
        currency,
        queryLegs: [
          {
            originPlace: { queryPlace: { iata: origin } },
            destinationPlace: { queryPlace: { iata: destination } },
            anytime: true
          }
        ],
        dateTimeGroupingType: 'DATE_TIME_GROUPING_TYPE_BY_MONTH'
      }
    })
  })

  if (!response.ok) {
    const text = await response.text()

    throw createError({
      statusCode: response.status,
      statusMessage: `Skyscanner indicative request failed: ${text.slice(0, 200)}`
    })
  }

  const payload = await response.json() as Record<string, unknown>
  const candidates = collectPriceCandidates(payload)
  const price = candidates.length ? Math.min(...candidates) : null
  const formattedPrice = price == null
    ? null
    : new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(price)

  setHeader(event, 'cache-control', 'public, max-age=900')

  return {
    origin,
    destination,
    price,
    formattedPrice,
    currency,
    market,
    locale,
    provider: 'Skyscanner indicative prices',
    status: payload.status ?? 'unknown'
  }
})