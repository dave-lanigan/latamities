import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const profilesPath = resolve(root, 'data/city-profiles.ts')
const source = await readFile(profilesPath, 'utf8')
const shouldWrite = process.argv.includes('--write')
const cities = [...source.matchAll(/name: '([^']+)',\n\s+country: '([^']+)'/g)].map(([, name, country]) => ({ name, country }))
const selectedCity = process.argv.includes('--city') ? process.argv[process.argv.indexOf('--city') + 1] : null
const selected = selectedCity ? cities.filter((city) => city.name.toLowerCase() === selectedCity.toLowerCase()) : cities

if (!selected.length) throw new Error('No matching cities found')

const updates = []

for (const city of selected) {
  try {
    const places = await fetchPlaces(city)
    const restaurants = places.filter((place) => place.type === 'Restaurant')
    const bars = places.filter((place) => place.type === 'Bar')
    updates.push({ ...city, restaurants, bars })
    console.log(`${city.name}, ${city.country}: ${restaurants.length} restaurants, ${bars.length} bars`)
  } catch (error) {
    console.error(`${city.name}, ${city.country}: ${error.message}`)
  }

  await wait(300)
}

if (shouldWrite) await writeFile(profilesPath, applyUpdates(source, updates))

async function fetchPlaces(city) {
  const path = `/discovery/sitemap/${slug(city.country)}/${slug(city.name)}`
  const resultsPerPage = 20
  const firstPage = await fetchPage(path, 0, resultsPerPage)
  const total = firstPage.total
  const pages = [firstPage]

  for (let offset = resultsPerPage; offset < total; offset += resultsPerPage) {
    pages.push(await fetchPage(path, offset, resultsPerPage))
    await wait(100)
  }

  return uniquePlaces(pages.flatMap((page) => page.places))
}

async function fetchPage(path, offset, resultsPerPage) {
  const url = new URL('https://admin.webpuzzleapp.com/DisplayDynamicSeoContent')
  url.searchParams.set('remote', '1')
  url.searchParams.set('callback', 'cb')
  url.searchParams.set('renderingMode', 'PUBLISH_LOCALLY')
  url.searchParams.set('uuid', '1645730')
  url.searchParams.set('domain', 'www.theworlds50best.com')
  url.searchParams.set('path', path)
  url.searchParams.set('offset', offset ? String(offset) : '')
  url.searchParams.set('pageId', '1645727')
  url.searchParams.set('resultsPerPage', String(resultsPerPage))
  url.searchParams.set('language', 'en')

  const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0', 'accept-language': 'en-US,en;q=0.9' } })
  if (!response.ok) throw new Error(`50 Best returned ${response.status}`)

  const payload = await response.text()
  const [html, totalText] = JSON.parse(payload.replace(/^cb\(/, '').replace(/\);?$/, '')).split('|')
  const places = []

  for (const item of html.matchAll(/<div class="item"[\s\S]*?<\/div><\/div><\/div>/g)) {
    const block = item[0]
    const type = decodeHtml(block.match(/<p class="tag\s*"\s*>([^<]+)<\/p>/)?.[1] ?? '')
    const name = decodeHtml(block.match(/<h2>([\s\S]*?)<\/h2>/)?.[1] ?? '')
    const href = block.match(/href="([^"]+)"/)?.[1]
    const note = decodeHtml(block.match(/<p class="style"\s*>[\s\S]*?<br\s*\/?>([\s\S]*?)<\/p>/)?.[1] ?? '')

    if ((type === 'Restaurant' || type === 'Bar') && name && href) {
      places.push({ type, name, note, link: new URL(href, 'https://www.theworlds50best.com').toString() })
    }
  }

  return { places, total: Number(totalText) || places.length }
}

function applyUpdates(currentSource, updates) {
  let nextSource = currentSource

  for (const update of updates) {
    const cityPattern = new RegExp(`(  (?:'${escapeRegExp(update.name)}'|${escapeRegExp(update.name)}): \\{[\\s\\S]*?\\n  \\},)(?=\\n  (?:'|[A-Z])|\\n\\nconst orderedProfiles)`) 
    const cityMatch = nextSource.match(cityPattern)
    if (!cityMatch) continue

    let cityBlock = cityMatch[1]
    cityBlock = updatePlaceList(cityBlock, 'restaurants', update.restaurants)
    cityBlock = updatePlaceList(cityBlock, 'bars', update.bars)
    nextSource = nextSource.replace(cityMatch[1], cityBlock)
  }

  return nextSource
}

function updatePlaceList(cityBlock, key, places) {
  if (!places.length) return cityBlock

  const property = `      ${key}: [\n${places.map(formatPlace).join(',\n')}\n      ],\n`
  const existing = new RegExp(`      ${key}: \\[[\\s\\S]*?\\n      \\],\\n`)

  if (existing.test(cityBlock)) return cityBlock.replace(existing, property)

  return cityBlock.replace(/(      timeToNature: [^\n,]+),?\n/, `$1,\n${property}`)
}

function uniquePlaces(places) {
  const seen = new Set()
  return places.filter((place) => {
    const key = `${place.type}:${place.name}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function formatPlace(place) {
  const fields = [`name: '${escapeString(place.name)}'`]
  if (place.note) fields.push(`note: '${escapeString(place.note)}'`)
  fields.push(`link: '${escapeString(place.link)}'`)
  return `        { ${fields.join(', ')} }`
}

function slug(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

function decodeHtml(value) {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'")
}

function escapeString(value) {
  return value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
