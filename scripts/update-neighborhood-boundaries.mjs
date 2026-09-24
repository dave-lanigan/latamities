import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import cityProfiles from '../data/city-profiles.ts'

const boundaryDir = resolve('data/neighborhood-boundaries')
const markersPath = resolve('data/neighborhood-markers.ts')
const indexPath = resolve(boundaryDir, 'index.json')
const shouldWrite = process.argv.includes('--write')
const shouldRefresh = process.argv.includes('--refresh')
const topCount = process.argv.includes('--top') ? Number(process.argv[process.argv.indexOf('--top') + 1]) : null
const selectedCity = process.argv.includes('--city') ? process.argv[process.argv.indexOf('--city') + 1]?.toLowerCase() : null
if (topCount !== null && (!Number.isInteger(topCount) || topCount < 1)) throw new Error('--top requires a positive integer')
const profiles = selectedCity || topCount
  ? cityProfiles.filter((city, index) => (topCount && index < topCount) || city.id === selectedCity || city.name.toLowerCase() === selectedCity)
  : cityProfiles

if (!profiles.length) throw new Error('No matching cities found')

const countryCodes = {
  Argentina: 'ar',
  Bolivia: 'bo',
  Brazil: 'br',
  Chile: 'cl',
  Colombia: 'co',
  'Costa Rica': 'cr',
  Ecuador: 'ec',
  'El Salvador': 'sv',
  Guatemala: 'gt',
  Honduras: 'hn',
  Mexico: 'mx',
  Nicaragua: 'ni',
  Panama: 'pa',
  Paraguay: 'py',
  Peru: 'pe',
  Uruguay: 'uy',
  Venezuela: 've'
}
const categoryColors = { Tourist: '#f59e0b', Residential: '#0f766e', Hip: '#f43f5e' }
const requestDelayMs = 1100
const searchRadiusDegrees = 0.6
const maximumMarkerKilometers = 30
const placeCache = new Map()
const boundaryAliases = {
  'mendoza|Residential: Quinta Sección': ['Sección 5ª Residencial Sur, Mendoza, Argentina']
}
const markerAliases = {
  'cochabamba|Tourist: Centro': ['Plaza 14 de Septiembre, Cochabamba, Bolivia'],
  'cuenca|Tourist: El Centro Histórico': ['Parque Abdón Calderón, Cuenca, Ecuador'],
  'cartagena|Tourist: Centro Histórico': ['Ciudad Amurallada, Cartagena, Colombia'],
  'trujillo|Tourist: Centro Histórico': ['Plaza de Armas de Trujillo, Peru'],
  'leon|Tourist: Centro': ['Plaza Fundadores, León, Guanajuato, Mexico'],
  'mendoza|Residential: Quinta Sección': ['Sección 5ª Residencial Sur, Mendoza, Argentina'],
  'sucre|Tourist: Centro Histórico': ['Plaza 25 de Mayo, Sucre, Bolivia'],
  'chiclayo|Tourist: Centro': ['Catedral de Santa María, Chiclayo, Peru'],
  'piura|Tourist: Centro': ['Plaza Mayor de Piura, Peru'],
  'iquitos|Hip: Iquitos Proper': ['Plaza de Armas, Iquitos, Peru'],
  'villavicencio|Tourist: Centro Commercial': ['Centro Comercial Viva, Villavicencio, Colombia'],
  'villavicencio|Hip: Los Libertadores': ['Plaza de Los Libertadores, Villavicencio, Colombia'],
  'oaxaca|Tourist: Centro Histórico': ['Zócalo, Oaxaca de Juárez, Mexico'],
  'oaxaca|Hip: Reforma': ['Colonia Reforma, Oaxaca de Juárez, Mexico'],
  'oruro|Tourist: Centro Histórico': ['Plaza 10 de Febrero, Oruro, Bolivia'],
  'oruro|Residential: Barrio Jardín': ['Barrio Jardín, Oruro, Bolivia'],
  'oruro|Hip: El Socavón': ['Santuario de La Virgen del Socavón, Oruro, Bolivia'],
  'valledupar|Hip: Plaza Alfonso López': ['Plaza Alfonso López, Valledupar, Colombia']
}

if (import.meta.main) {
  await mkdir(boundaryDir, { recursive: true })
  const existingMarkers = await loadMarkers()
  const updatedMarkers = { ...existingMarkers }
  const updatedIndex = await loadBoundaryIndex()
  const pendingBoundaries = new Map()
  const changedCities = []

  for (const city of profiles) {
    const neighborhoods = city.details.neighborhoods.map(parseNeighborhood)
    const existingFeatures = await loadBoundaryFeatures(city.id)
    const boundaryFeatures = []
    const markers = []

    for (const neighborhood of neighborhoods) {
      const retained = existingFeatures.find((feature) => normalize(feature.properties?.name) === normalize(neighborhood.name))
      const refreshed = shouldRefresh && retained?.properties?.osmId
        ? await lookupPolygon({ osm_type: retained.properties.osmType.slice(0, 1).toUpperCase(), osm_id: retained.properties.osmId }, true)
        : null
      const boundaryCandidate = refreshed && isPlaceCandidate(city, neighborhood.name, refreshed, true)
        ? refreshed
        : await cachedFindPlace(city, neighborhood.name, true) ?? await findAliasBoundary(city, neighborhood.label)
      const boundary = await resolveBoundary(city, neighborhood, existingFeatures, boundaryCandidate)
      if (boundary) boundaryFeatures.push(boundary)
      else console.log(`  ${city.name} / ${neighborhood.name}: no exact OSM polygon verified; retaining a marker only`)

      const marker = await resolveMarker(city, neighborhood, boundary, boundaryCandidate, existingMarkers[city.id] ?? [])
      if (marker) markers.push(marker)
    }

    const boundaryChanged = JSON.stringify(existingFeatures) !== JSON.stringify(boundaryFeatures)
    const markersChanged = JSON.stringify(existingMarkers[city.id] ?? []) !== JSON.stringify(markers)

    updatedIndex[city.id] = boundaryFeatures.map((feature) => feature.properties.name)
    if (boundaryChanged) {
      pendingBoundaries.set(city.id, { type: 'FeatureCollection', features: boundaryFeatures })
      changedCities.push(city.id)
    }
    if (markersChanged) changedCities.push(`${city.id} markers`)
    updatedMarkers[city.id] = markers

    console.log(`${city.name}: ${boundaryFeatures.length}/${neighborhoods.length} outlines, ${markers.length}/${neighborhoods.length} markers`)
  }

  if (shouldWrite) {
    for (const [cityId, collection] of pendingBoundaries) {
      await writeFile(resolve(boundaryDir, `${cityId}.geojson`), `${JSON.stringify(collection, null, 2)}\n`)
    }
    await writeFile(indexPath, `${JSON.stringify(updatedIndex, null, 2)}\n`)
    await writeFile(markersPath, `export interface NeighborhoodMarker {\n  label: string\n  coordinates: [number, number]\n}\n\nexport const neighborhoodMarkersByCity: Record<string, NeighborhoodMarker[]> = ${JSON.stringify(updatedMarkers, null, 2)}\n`)
    console.log(changedCities.length ? `Updated ${[...new Set(changedCities)].join(', ')}` : 'No boundary or marker changes')
  }
}

function parseNeighborhood(label) {
  const [category, ...rest] = label.split(':')
  const name = (rest.length ? rest.join(':') : label).trim()
  return { label, category: category.trim(), name }
}

async function loadBoundaryFeatures(cityId) {
  try {
    const parsed = JSON.parse(await readFile(resolve(boundaryDir, `${cityId}.geojson`), 'utf8'))
    return Array.isArray(parsed.features) ? parsed.features : []
  } catch {
    return []
  }
}

async function loadMarkers() {
  try {
    const source = await readFile(markersPath, 'utf8')
    const match = source.match(/export const neighborhoodMarkersByCity[^=]*= ([\s\S]*)\n$/)
    return match ? JSON.parse(match[1]) : {}
  } catch {
    return {}
  }
}

async function loadBoundaryIndex() {
  try {
    return JSON.parse(await readFile(indexPath, 'utf8'))
  } catch {
    return {}
  }
}

async function resolveBoundary(city, neighborhood, existingFeatures, candidate) {
  const retained = existingFeatures.find((feature) => normalize(feature.properties?.name) === normalize(neighborhood.name))
  const retainedCenter = retained ? centroid(retained.geometry) : null
  if (!shouldRefresh && retained && isValidGeometry(retained.geometry) && retainedCenter && isNearCity(city, [retainedCenter[1], retainedCenter[0]], maximumMarkerKilometers)) {
    return styleBoundary(retained, neighborhood)
  }

  if (!candidate || !isValidGeometry(candidate.geojson)) return null

  const center = centroid(candidate.geojson)
  if (!center || !isNearCity(city, [center[1], center[0]], maximumMarkerKilometers)) return null

  return {
    type: 'Feature',
    properties: {
      name: neighborhood.name,
      category: neighborhood.category,
      osmType: candidate.osm_type,
      osmId: candidate.osm_id,
      source: `https://www.openstreetmap.org/${candidate.osm_type.toLowerCase().startsWith('r') ? 'relation' : 'way'}/${candidate.osm_id}`,
      retrievedAt: new Date().toISOString().slice(0, 10),
      stroke: categoryColors[neighborhood.category] ?? '#0f766e',
      'stroke-width': 2,
      'stroke-opacity': 0.95,
      fill: categoryColors[neighborhood.category] ?? '#0f766e',
      'fill-opacity': 0.16
    },
    geometry: candidate.geojson
  }
}

async function resolveMarker(city, neighborhood, boundary, boundaryCandidate, existingCityMarkers) {
  if (boundary && isValidGeometry(boundary.geometry)) {
    const [lng, lat] = centroid(boundary.geometry)
    return { label: neighborhood.label, coordinates: [round(lng), round(lat)] }
  }

  const retained = existingCityMarkers.find((marker) => marker.label === neighborhood.label)
  if (retained && isCoordinate(retained.coordinates) && isNearCity(city, [retained.coordinates[1], retained.coordinates[0]], maximumMarkerKilometers)) {
    return { label: neighborhood.label, coordinates: [round(retained.coordinates[0]), round(retained.coordinates[1])] }
  }

  const candidate = boundaryCandidate ?? await cachedFindPlace(city, neighborhood.name, false)
  if (!candidate) {
    const alias = await findAliasMarker(city, neighborhood.label)
    if (alias) return { label: neighborhood.label, coordinates: [round(alias[0]), round(alias[1])] }
    const district = await findDistrictCentroid(city, neighborhood.name)
    if (!district) return null
    return { label: neighborhood.label, coordinates: [round(district[0]), round(district[1])] }
  }

  const coordinates = candidate.geojson?.type === 'Point'
    ? candidate.geojson.coordinates
    : centroid(candidate.geojson)
  if (!isCoordinate(coordinates) || !isNearCity(city, [coordinates[1], coordinates[0]], maximumMarkerKilometers)) return null

  return { label: neighborhood.label, coordinates: [round(coordinates[0]), round(coordinates[1])] }
}

async function cachedFindPlace(city, neighborhood, needPolygon) {
  const key = `${city.id}:${normalize(neighborhood)}:${needPolygon ? 'polygon' : 'place'}`
  if (!placeCache.has(key)) {
    placeCache.set(key, await findPlace(city, neighborhood, needPolygon))
  }
  return placeCache.get(key)
}

async function findPlace(city, neighborhood, needPolygon) {
  const nominatimMatch = await findNominatimPlace(city, neighborhood, needPolygon)
  if (nominatimMatch) return nominatimMatch
  return findOverpassPlace(city, neighborhood, needPolygon)
}

async function findNominatimPlace(city, neighborhood, needPolygon) {
  const countryCode = countryCodes[city.country]
  if (!countryCode) return null

  const [lng, lat] = city.coordinates
  const viewbox = [lng - searchRadiusDegrees, lat + searchRadiusDegrees, lng + searchRadiusDegrees, lat - searchRadiusDegrees].join(',')
  const searches = [
    `format=json&addressdetails=1&namedetails=1&polygon_geojson=1&limit=10&countrycodes=${countryCode}&viewbox=${viewbox}&bounded=1&q=${encodeURIComponent(`${neighborhood}, ${city.name}`)}`,
    `format=json&addressdetails=1&namedetails=1&polygon_geojson=1&limit=10&countrycodes=${countryCode}&viewbox=${viewbox}&bounded=1&q=${encodeURIComponent(`${neighborhood}, ${countryCode === 'mx' ? 'México' : city.country}`)}`,
    `format=json&addressdetails=1&namedetails=1&polygon_geojson=1&limit=10&countrycodes=${countryCode}&street=${encodeURIComponent(neighborhood)}&city=${encodeURIComponent(city.name)}&country=${encodeURIComponent(city.country)}`
  ]

  for (const search of searches) {
    const response = await fetchWithTimeout(`https://nominatim.openstreetmap.org/search?${search}`, {
      headers: { 'user-agent': 'Latamities neighborhood boundary updater', 'accept-language': 'en' }
    })
    await wait(requestDelayMs)
    if (!response?.ok) continue

    const results = await response.json()
    const match = results.find((item) => isPlaceCandidate(city, neighborhood, item, needPolygon))
    if (match) return match
  }

  return null
}

async function findOverpassPlace(city, neighborhood, needPolygon) {
  const [lng, lat] = city.coordinates
  const radius = 0.35
  const bbox = [lat - radius, lng - radius, lat + radius, lng + radius].join(',')
  const names = [...new Set([neighborhood, normalizeDiacritics(neighborhood)])]
  const keys = ['name', 'alt_name', 'loc_name', 'short_name', 'official_name', 'name:es']
  const selectors = names
    .flatMap((name) => keys.map((key) => `(nwr["${key}"="${overpassString(name)}"]["boundary"="administrative"](${bbox});nwr["${key}"="${overpassString(name)}"]["place"~"^(neighbourhood|suburb|quarter|hamlet|residential|city_block)$"](${bbox});nwr["${key}"="${overpassString(name)}"]["landuse"="residential"](${bbox});${needPolygon ? '' : `nwr["${key}"="${overpassString(name)}"]["highway"](${bbox});`}`))
    .join('')
  const query = `[out:json][timeout:30];(${selectors});out center tags 50;`
  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter'
  ]
  let results = null
  for (const endpoint of endpoints) {
    const response = await fetchWithTimeout(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded', 'user-agent': 'Latamities neighborhood boundary updater' },
      body: new URLSearchParams({ data: query })
    }, 20000)
    await wait(requestDelayMs)
    if (!response?.ok) continue
    try {
      results = await response.json()
      break
    } catch {
      continue
    }
  }
  if (!results) return null
  const candidates = (results.elements ?? [])
    .filter((element) => ['name', 'alt_name', 'loc_name', 'short_name', 'official_name', 'name:es'].some((key) => normalize(element.tags?.[key]) === normalize(neighborhood)))
    .map((element) => ({
      osm_type: element.type === 'node' ? 'N' : element.type === 'way' ? 'W' : 'R',
      osm_id: element.id,
      class: element.tags?.boundary ? 'boundary' : 'place',
      type: element.tags?.boundary ?? element.tags?.place,
      display_name: `${element.tags?.name}, ${city.name}, ${city.country}`,
      center: element.center,
      lat: element.lat,
      lon: element.lon,
      geojson: element.center
        ? { type: 'Point', coordinates: [element.center.lon, element.center.lat] }
        : element.lat != null && element.lon != null
          ? { type: 'Point', coordinates: [element.lon, element.lat] }
          : null
    }))
    .filter((candidate) => {
      const center = candidate.center
        ? [candidate.center.lat, candidate.center.lon]
        : candidate.lat != null && candidate.lon != null ? [candidate.lat, candidate.lon] : null
      return center && isNearCity(city, center, maximumMarkerKilometers)
    })
    .sort((a, b) => distanceToCity(city, a) - distanceToCity(city, b))

  for (const candidate of candidates) {
    if (!needPolygon) return candidate
    const polygon = await lookupPolygon(candidate)
    if (polygon && isPlaceCandidate(city, neighborhood, polygon, true)) return polygon
  }

  return null
}

async function findAliasBoundary(city, label) {
  const queries = boundaryAliases[`${city.id}|${label}`] ?? []
  const countryCode = countryCodes[city.country]

  for (const query of queries) {
    const response = await fetchWithTimeout(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&namedetails=1&polygon_geojson=1&limit=5${countryCode ? `&countrycodes=${countryCode}` : ''}&q=${encodeURIComponent(query)}`, {
      headers: { 'user-agent': 'Latamities neighborhood boundary updater', 'accept-language': 'en' }
    })
    await wait(requestDelayMs)
    if (!response?.ok) continue

    const results = await response.json()
    const wanted = normalize(query.split(',')[0])
    const match = results.find((item) => {
      const name = normalize(item.name)
      return (name === wanted || name.startsWith(`${wanted} `)) &&
        ['Polygon', 'MultiPolygon'].includes(item.geojson?.type) &&
        !['amenity', 'shop', 'office', 'highway', 'building'].includes(item.class) &&
        isNearCity(city, [Number(item.lat), Number(item.lon)], maximumMarkerKilometers)
    })
    if (match) return match
  }

  return null
}

async function findAliasMarker(city, label) {
  const queries = markerAliases[`${city.id}|${label}`] ?? []
  const countryCode = countryCodes[city.country]

  for (const query of queries) {
    const response = await fetchWithTimeout(`https://nominatim.openstreetmap.org/search?format=json&limit=5${countryCode ? `&countrycodes=${countryCode}` : ''}&q=${encodeURIComponent(query)}`, {
      headers: { 'user-agent': 'Latamities neighborhood boundary updater', 'accept-language': 'en' }
    })
    await wait(requestDelayMs)
    if (!response?.ok) continue

    const results = await response.json()
    const wanted = normalize(query.split(',')[0])
    const match = results.find((item) => {
      const name = normalize(item.name)
      return (name === wanted || name.startsWith(`${wanted} `) || wanted.startsWith(`${name} `)) &&
        isNearCity(city, [Number(item.lat), Number(item.lon)], maximumMarkerKilometers)
    })
    if (match) return [Number(match.lon), Number(match.lat)]
  }

  return null
}

async function findDistrictCentroid(city, neighborhood) {
  const countryCode = countryCodes[city.country]
  if (!countryCode) return null

  const [lng, lat] = city.coordinates
  const viewbox = [lng - searchRadiusDegrees, lat + searchRadiusDegrees, lng + searchRadiusDegrees, lat - searchRadiusDegrees].join(',')
  const response = await fetchWithTimeout(`https://nominatim.openstreetmap.org/search?format=json&limit=20&countrycodes=${countryCode}&viewbox=${viewbox}&bounded=1&q=${encodeURIComponent(`${neighborhood}, ${city.name}, ${city.country}`)}`, {
    headers: { 'user-agent': 'Latamities neighborhood boundary updater', 'accept-language': 'en' }
  })
  await wait(requestDelayMs)
  if (!response?.ok) return null

  const wanted = normalize(neighborhood)
  const results = await response.json()
  const points = results
    .filter((item) => ['place', 'boundary', 'landuse'].includes(item.class))
    .filter((item) => {
      const name = normalize(item.name)
      return name.includes(wanted) || wanted.includes(name)
    })
    .map((item) => [Number(item.lon), Number(item.lat)])
    .filter((point) => isCoordinate(point) && isNearCity(city, [point[1], point[0]], maximumMarkerKilometers))
    .slice(0, 10)

  if (!points.length) return null
  return [
    points.reduce((sum, point) => sum + point[0], 0) / points.length,
    points.reduce((sum, point) => sum + point[1], 0) / points.length
  ]
}

async function lookupPolygon(candidate, required = false) {
  const response = await fetchWithTimeout(`https://nominatim.openstreetmap.org/lookup?format=json&namedetails=1&polygon_geojson=1&osm_ids=${candidate.osm_type}${candidate.osm_id}`, {
    headers: { 'user-agent': 'Latamities neighborhood boundary updater', 'accept-language': 'en' }
  })
  await wait(requestDelayMs)
  if (!response?.ok) {
    if (required) throw new Error(`Could not refresh OSM ${candidate.osm_type}${candidate.osm_id}: ${response?.status ?? 'network error'}. No updates written.`)
    return null
  }
  const results = await response.json()
  const polygon = results.find((item) => ['Polygon', 'MultiPolygon'].includes(item.geojson?.type))
  return polygon ? { ...polygon, ...candidate, geojson: polygon.geojson } : null
}

function distanceToCity(city, candidate) {
  const center = candidate.center
    ? [candidate.center.lat, candidate.center.lon]
    : [candidate.lat, candidate.lon]
  const toRadians = (value) => (value * Math.PI) / 180
  const dLat = toRadians(center[0] - city.coordinates[1])
  const dLng = toRadians(center[1] - city.coordinates[0])
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(city.coordinates[1])) * Math.cos(toRadians(center[0])) * Math.sin(dLng / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(h))
}

function normalizeDiacritics(name) {
  return `${name}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function overpassString(name) {
  return `${name}`.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

export function isPlaceCandidate(city, neighborhood, item, needPolygon) {
  const wanted = normalize(neighborhood)
  const names = [item.name, item.namedetails?.name, ...(Object.values(item.namedetails ?? {}))].filter(Boolean).map(normalize)
  if (!names.some((name) => name === wanted || (item.class === 'boundary' && name.replace(/^(?:comuna \d+|localidad|municipio) /, '') === wanted))) return null
  if (needPolygon && !['Polygon', 'MultiPolygon'].includes(item.geojson?.type)) return null
  if (needPolygon && !['boundary', 'place', 'landuse'].includes(item.class)) return null
  if (needPolygon && item.class === 'landuse') {
    if (item.type !== 'residential') return null
    const points = collectPairs(item.geojson.coordinates)
    const longitudes = points.map((point) => point[0])
    const latitudes = points.map((point) => point[1])
    const widthMeters = (Math.max(...longitudes) - Math.min(...longitudes)) * 111320 * Math.cos(city.coordinates[1] * Math.PI / 180)
    const heightMeters = (Math.max(...latitudes) - Math.min(...latitudes)) * 111320
    if (widthMeters * heightMeters < 20000) return null
  }
  const excluded = needPolygon
    ? ['amenity', 'shop', 'office', 'highway', 'building']
    : ['amenity', 'shop', 'office', 'building']
  if (excluded.includes(item.class)) return null
  if (item.class === 'place' && ['city', 'town', 'village', 'municipality', 'county', 'state', 'country'].includes(item.type)) return null

  const display = normalize(item.display_name)
  const cityName = normalize(city.name)
  const countryName = normalize(city.country)
  if (!display.includes(cityName) && !display.includes(countryName)) return null

  const rawCenter = item.geojson?.type === 'Point' ? item.geojson.coordinates : centroid(item.geojson)
  const center = rawCenter ? [rawCenter[1], rawCenter[0]] : null
  return isCoordinate(rawCenter) && center && isNearCity(city, center, maximumMarkerKilometers)
}

function styleBoundary(feature, neighborhood) {
  return {
    type: 'Feature',
    properties: {
      name: neighborhood.name,
      category: neighborhood.category,
      osmType: feature.properties?.osmType,
      osmId: feature.properties?.osmId,
      source: feature.properties?.source,
      retrievedAt: feature.properties?.retrievedAt,
      stroke: categoryColors[neighborhood.category] ?? '#0f766e',
      'stroke-width': 2,
      'stroke-opacity': 0.95,
      fill: categoryColors[neighborhood.category] ?? '#0f766e',
      'fill-opacity': 0.16
    },
    geometry: feature.geometry
  }
}

function isValidGeometry(geometry) {
  if (geometry?.type === 'Polygon') return geometry.coordinates.some((ring) => ring.length >= 4)
  if (geometry?.type === 'MultiPolygon') return geometry.coordinates.some((polygon) => polygon.some((ring) => ring.length >= 4))
  return false
}

function centroid(geometry) {
  const points = collectPairs(geometry?.coordinates)
  if (!points.length) return null
  return [points.reduce((sum, point) => sum + point[0], 0) / points.length, points.reduce((sum, point) => sum + point[1], 0) / points.length]
}

function collectPairs(value) {
  if (isCoordinate(value)) return [value]
  return Array.isArray(value) ? value.flatMap(collectPairs) : []
}

function isCoordinate(value) {
  return Array.isArray(value) && Number.isFinite(value[0]) && Number.isFinite(value[1])
}

function isNearCity(city, center, maxKilometers) {
  if (!center) return false
  const toRadians = (value) => (value * Math.PI) / 180
  const dLat = toRadians(center[0] - city.coordinates[1])
  const dLng = toRadians(center[1] - city.coordinates[0])
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(city.coordinates[1])) * Math.cos(toRadians(center[0])) * Math.sin(dLng / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(h)) <= maxKilometers
}

function normalize(value) {
  return `${value ?? ''}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function round(value) {
  return Number(value.toFixed(6))
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 45000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
