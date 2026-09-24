import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import cityProfiles from '../data/city-profiles.ts'

const profilesPath = resolve('data/city-profiles.ts')
const boundaryDir = resolve('data/neighborhood-boundaries')
const shouldWrite = process.argv.includes('--write')
const selectedCity = process.argv.includes('--city') ? process.argv[process.argv.indexOf('--city') + 1]?.toLowerCase() : null
const colors = {
  Tourist: '#f59e0b',
  Residential: '#0f766e',
  Hip: '#f43f5e'
}

const profiles = selectedCity ? cityProfiles.filter((city) => city.name.toLowerCase() === selectedCity || city.id === selectedCity) : cityProfiles
let source = await readFile(profilesPath, 'utf8')
const boundaryIndex = {}

await mkdir(boundaryDir, { recursive: true })

for (const city of profiles) {
  const categories = categorize(city)
  source = updateNeighborhoods(source, city.name, categories)
  const features = []

  for (const [category, neighborhood] of Object.entries(categories)) {
    const feature = await fetchBoundary(city, category, neighborhood)
    if (feature) features.push(feature)
    await wait(1100)
  }

  if (features.length) {
    const file = `${city.id}.geojson`
    await writeFile(resolve(boundaryDir, file), `${JSON.stringify({ type: 'FeatureCollection', features }, null, 2)}\n`)
    boundaryIndex[city.id] = features.map((feature) => feature.properties.name)
  }

  console.log(`${city.name}: ${Object.entries(categories).map(([key, value]) => `${key}: ${value}`).join(', ')} | boundaries ${features.length}/3`)
}

if (shouldWrite) {
  await writeFile(profilesPath, source)
  await writeFile(resolve(boundaryDir, 'index.json'), `${JSON.stringify(boundaryIndex, null, 2)}\n`)
}

function categorize(city) {
  const names = city.details.neighborhoods.map((value) => cleanLabel(value))
  const used = new Set()
  const tourist = pick(names, used, [/centro/i, /hist[oó]rico/i, /casco/i, /old town/i, /zona viva/i, /zona rom[aá]ntica/i, /san blas/i, /getseman/i, /bocagrande/i, /pelourinho/i, /cerro alegre/i, /ciudad$/i, /plan/i]) ?? takeFirstUnused(names, used) ?? names[0]
  const residential = pick(names, used, [/providencia/i, /las condes/i, /polanco/i, /san isidro/i, /recoleta/i, /belgrano/i, /lourdes/i, /pocitos/i, /punta carretas/i, /cala cala/i, /cayal[aá]/i, /santa ana/i, /san pedro/i, /samborond[oó]n/i, /cumbay[aá]/i, /lomas/i, /jard[ií]n/i, /campestre/i, /zona 14/i, /zona 15/i, /urub[oó]/i, /cayma/i, /yanahuara/i]) ?? takeFirstUnused(names, used) ?? names[1] ?? names[0]
  const hip = pick(names, used, [/roma/i, /condesa/i, /barranco/i, /palermo/i, /vila madalena/i, /la floresta/i, /chapinero/i, /poblado/i, /laureles/i, /savassi/i, /santa ter/i, /barrio/i, /g[uü]emes/i, /zona g/i, /zona rosa/i, /jalatlaco/i, /reforma/i, /rio vermelho/i, /granada/i, /carmelitas/i, /queru/i, /palmira/i, /cord[oó]n/i, /parque/i]) ?? takeFirstUnused(names, used) ?? names[2] ?? names[0]

  return {
    Tourist: tourist,
    Residential: residential,
    Hip: hip
  }
}

function pick(names, used, patterns) {
  const match = names.find((name) => !used.has(name) && patterns.some((pattern) => pattern.test(name)))
  if (match) used.add(match)
  return match
}

function takeFirstUnused(names, used) {
  const match = names.find((name) => !used.has(name))
  if (match) used.add(match)
  return match
}

function cleanLabel(value) {
  return value.includes(':') ? value.split(':').slice(1).join(':').trim() : value.trim()
}

async function fetchBoundary(city, category, neighborhood) {
  const query = `${neighborhood} ${city.name} ${city.country}`
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&limit=5&q=${encodeURIComponent(query)}`, {
    headers: { 'user-agent': 'Latamities neighborhood boundary updater' }
  })

  if (!response.ok) return null

  const results = await response.json()
  const result = results.find((item) => isBoundaryCandidate(item, neighborhood))
  if (!result?.geojson) return null

  return {
    type: 'Feature',
    properties: {
      name: neighborhood,
      category,
      osmType: result.osm_type,
      osmId: result.osm_id,
      stroke: colors[category],
      'stroke-width': 2,
      'stroke-opacity': 0.95,
      fill: colors[category],
      'fill-opacity': 0.16
    },
    geometry: simplifyGeometry(result.geojson)
  }
}

function isBoundaryCandidate(item, neighborhood) {
  if (!['Polygon', 'MultiPolygon'].includes(item.geojson?.type)) return false
  if (item.class === 'amenity' || item.class === 'shop' || item.class === 'office' || item.class === 'highway') return false
  const name = `${item.display_name ?? ''}`.toLowerCase()
  return name.includes(neighborhood.toLowerCase().split(' ')[0]) && (item.class === 'boundary' || item.class === 'place')
}

function simplifyGeometry(geometry) {
  if (geometry.type === 'Polygon') {
    return { ...geometry, coordinates: geometry.coordinates.map((ring) => simplifyRing(ring, 0.00012)) }
  }

  if (geometry.type === 'MultiPolygon') {
    return { ...geometry, coordinates: geometry.coordinates.map((polygon) => polygon.map((ring) => simplifyRing(ring, 0.00012))) }
  }

  return geometry
}

function simplifyRing(points, tolerance) {
  const open = points.slice(0, -1)
  const simplified = simplify(open, tolerance)
  return [...simplified, simplified[0]]
}

function simplify(points, tolerance) {
  if (points.length <= 2) return points

  let maxDistance = 0
  let splitIndex = 0
  const first = points[0]
  const last = points[points.length - 1]

  for (let index = 1; index < points.length - 1; index += 1) {
    const distance = perpendicularDistance(points[index], first, last)
    if (distance > maxDistance) {
      maxDistance = distance
      splitIndex = index
    }
  }

  if (maxDistance <= tolerance) return [first, last]

  return [
    ...simplify(points.slice(0, splitIndex + 1), tolerance).slice(0, -1),
    ...simplify(points.slice(splitIndex), tolerance)
  ]
}

function perpendicularDistance(point, start, end) {
  const [x, y] = point
  const [x1, y1] = start
  const [x2, y2] = end
  const lengthSquared = (x2 - x1) ** 2 + (y2 - y1) ** 2
  if (!lengthSquared) return Math.hypot(x - x1, y - y1)
  const projection = Math.max(0, Math.min(1, ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / lengthSquared))
  return Math.hypot(x - (x1 + projection * (x2 - x1)), y - (y1 + projection * (y2 - y1)))
}

function updateNeighborhoods(currentSource, cityName, categories) {
  const values = [`Tourist: ${categories.Tourist}`, `Residential: ${categories.Residential}`, `Hip: ${categories.Hip}`]
  const pattern = new RegExp(`(name: '${escapeRegExp(cityName)}',[\\s\\S]*?neighborhoods: )\\[[^\\]]*\\]`)
  return currentSource.replace(pattern, `$1[${values.map((value) => `'${escapeString(value)}'`).join(', ')}]`)
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
