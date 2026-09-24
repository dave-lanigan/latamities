import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import simplify from 'simplify-js'
import cityProfiles from '../../data/city-profiles'
import { neighborhoodMarkersByCity } from '../../data/neighborhood-markers'
import boundaryIndex from '../../data/neighborhood-boundaries/index.json'

export interface CityMapMarker {
  label: string
  color: string
  coordinates: [number, number]
  x: number
  y: number
}

export type CityMapViewport =
  | { mode: 'bounds'; bounds: [number, number, number, number] }
  | { mode: 'center'; center: [number, number]; zoom: number }

interface BoundaryFeature {
  properties?: {
    name?: string
    category?: string
    stroke?: string
    fill?: string
  }
  geometry: {
    type: 'Polygon' | 'MultiPolygon'
    coordinates: number[][][] | number[][][][]
  }
}

interface BoundaryCollection {
  features: BoundaryFeature[]
}

const MAP_STYLE = 'mapbox/light-v11'
const DEFAULT_ZOOM = 11.6
const CATEGORY_COLORS: Record<string, string> = {
  Tourist: '#f59e0b',
  Residential: '#0f766e',
  Hip: '#f43f5e'
}

const isCoordinate = (value: unknown): value is [number, number] =>
  Array.isArray(value) &&
  typeof value[0] === 'number' &&
  typeof value[1] === 'number' &&
  Number.isFinite(value[0]) &&
  Number.isFinite(value[1])

const roundCoordinate = (value: number) => Number(value.toFixed(5))

const cleanLabel = (label: string) => {
  const [, ...rest] = label.split(':')
  return (rest.length ? rest.join(':') : label).trim()
}

const categoryOf = (label: string) => label.split(':')[0]?.trim() ?? ''

export const loadBoundary = async (cityId: string): Promise<BoundaryCollection | null> => {
  if (!/^[a-z0-9-]+$/.test(cityId)) return null

  try {
    const content = await readFile(resolve(process.cwd(), 'data/neighborhood-boundaries', `${cityId}.geojson`), 'utf8')
    const parsed = JSON.parse(content) as BoundaryCollection
    return Array.isArray(parsed.features) ? parsed : null
  } catch {
    return null
  }
}

const collectPairs = (value: unknown): number[][] => {
  if (!isCoordinate(value)) {
    return Array.isArray(value) ? value.flatMap(collectPairs) : []
  }

  return [value]
}

const paddedBounds = (points: number[][]): [number, number, number, number] => {
  const lngs = points.map((point) => point[0])
  const lats = points.map((point) => point[1])
  const spanX = Math.max(...lngs) - Math.min(...lngs)
  const spanY = Math.max(...lats) - Math.min(...lats)
  const padX = Math.max(0.01, spanX * 0.08)
  const padY = Math.max(0.01, spanY * 0.08)

  return [
    roundCoordinate(Math.min(...lngs) - padX),
    roundCoordinate(Math.min(...lats) - padY),
    roundCoordinate(Math.max(...lngs) + padX),
    roundCoordinate(Math.max(...lats) + padY)
  ]
}

const ringArea = (ring: number[][]) => {
  let area = 0
  for (let index = 0; index < ring.length - 1; index += 1) {
    area += ring[index][0] * ring[index + 1][1] - ring[index + 1][0] * ring[index][1]
  }
  return area / 2
}

const limitRing = (ring: number[][], maxPoints: number) => {
  if (ring.length <= maxPoints) return ring
  const points = ring.map(([longitude, latitude]) => ({ x: longitude, y: latitude }))
  let tolerance = 0.00001
  let reduced = simplify(points, tolerance, true)
  while (reduced.length > Math.max(4, maxPoints)) {
    tolerance *= 1.5
    reduced = simplify(points, tolerance, true)
  }
  return reduced.length >= 4 ? reduced.map((point) => [point.x, point.y]) : ring
}

const encodeSigned = (value: number) => {
  let current = value < 0 ? ~(value << 1) : value << 1
  let encoded = ''
  while (current >= 0x20) {
    encoded += String.fromCharCode((0x20 | (current & 0x1f)) + 63)
    current >>= 5
  }
  return encoded + String.fromCharCode(current + 63)
}

const encodePolyline = (points: number[][]) => {
  let lastLng = 0
  let lastLat = 0
  let encoded = ''

  for (const [lng, lat] of points) {
    const roundedLng = Math.round(lng * 1e5)
    const roundedLat = Math.round(lat * 1e5)
    encoded += encodeSigned(roundedLat - lastLat) + encodeSigned(roundedLng - lastLng)
    lastLng = roundedLng
    lastLat = roundedLat
  }

  return encoded
}

const colorHex = (value: string | undefined, fallback: string) => {
  const color = (value ?? fallback).replace('#', '')
  return /^[0-9a-fA-F]{3}$/.test(color) || /^[0-9a-fA-F]{6}$/.test(color) ? color : fallback.replace('#', '')
}

export const boundaryPathOverlays = (boundary: BoundaryCollection | null, maxPointsPerRing = 120) => {
  if (!boundary) return []

  const overlays: string[] = []

  for (const feature of boundary.features) {
    const polygons = feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates
    const stroke = colorHex(feature.properties?.stroke, '0f766e')
    const fill = colorHex(feature.properties?.fill ?? feature.properties?.stroke, '14b8a6')

    for (const polygon of polygons) {
      const outer = [...polygon].sort((a, b) => Math.abs(ringArea(b)) - Math.abs(ringArea(a)))[0]
      if (!outer || outer.length < 4) continue
      const encoded = encodeURIComponent(encodePolyline(limitRing(outer, maxPointsPerRing)))
      overlays.push(`path-2+${stroke}-0.95+${fill}-0.16(${encoded})`)
    }
  }

  return overlays
}

const projectCenter = (coordinates: [number, number], center: [number, number], zoom: number, width: number, height: number) => {
  const scale = 512 * 2 ** zoom
  const projectY = (latitude: number) => (1 - Math.asinh(Math.tan((latitude * Math.PI) / 180)) / Math.PI) / 2

  return {
    x: 50 + (((coordinates[0] - center[0]) / 360) * scale / width) * 100,
    y: 50 + ((projectY(coordinates[1]) - projectY(center[1])) * scale / height) * 100
  }
}

const projectBounds = (coordinates: [number, number], bounds: [number, number, number, number], width: number, height: number) => {
  const [west, south, east, north] = bounds
  const projectY = (latitude: number) => (1 - Math.asinh(Math.tan(latitude * Math.PI / 180)) / Math.PI) / 2
  const northY = projectY(north)
  const southY = projectY(south)
  const scale = Math.min(width / ((east - west) / 360), height / (southY - northY))
  return {
    x: 50 + ((coordinates[0] - (west + east) / 2) / 360) * scale / width * 100,
    y: 50 + (projectY(coordinates[1]) - (northY + southY) / 2) * scale / height * 100
  }
}

const getRawCityMapMarkers = (cityId: string) => {
  const bounded = new Set((boundaryIndex as Record<string, string[]>)[cityId] ?? [])
  return (neighborhoodMarkersByCity[cityId] ?? [])
    .filter((marker) => isCoordinate(marker.coordinates) && !bounded.has(cleanLabel(marker.label)))
    .map((marker) => ({
      label: marker.label,
      color: CATEGORY_COLORS[categoryOf(marker.label)] ?? '#0f766e',
      coordinates: marker.coordinates
    }))
}

export const getCityMapViewport = async (cityId: string): Promise<CityMapViewport | null> => {
  const city = cityProfiles.find((item) => item.id === cityId)
  if (!city) return null

  const boundary = await loadBoundary(cityId)
  const markers = getRawCityMapMarkers(cityId)
  const points = [
    city.coordinates,
    ...markers.map((marker) => marker.coordinates),
    ...(boundary ? boundary.features.flatMap((feature) => collectPairs(feature.geometry.coordinates)) : [])
  ].filter(isCoordinate)

  if (!points.length) return null
  if (!boundary && markers.length <= 1) {
    return { mode: 'center', center: city.coordinates, zoom: DEFAULT_ZOOM }
  }

  return { mode: 'bounds', bounds: paddedBounds(points) }
}

export const getCityMapMarkers = async (cityId: string, width: number, height: number) => {
  const markers = getRawCityMapMarkers(cityId)
  const viewport = await getCityMapViewport(cityId)

  return markers.map((marker) => ({
    ...marker,
    ...(viewport?.mode === 'bounds'
      ? projectBounds(marker.coordinates, viewport.bounds, width, height)
      : projectCenter(marker.coordinates, viewport?.center ?? [0, 0], viewport?.zoom ?? DEFAULT_ZOOM, width, height))
  }))
}

export const getCityMap = async (cityId: string, width: number, height: number) => {
  const city = cityProfiles.find((item) => item.id === cityId)
  if (!city) return null

  const params = new URLSearchParams({
    boundary: cityId,
    width: String(width),
    height: String(height),
    v: '4'
  })
  const markers = await getCityMapMarkers(cityId, width, height)

  return {
    city: cityId,
    image: `/api/map-image?${params}`,
    width,
    height,
    style: MAP_STYLE,
    markers
  }
}
