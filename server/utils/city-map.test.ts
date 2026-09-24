import { expect, test } from 'bun:test'
import { boundaryPathOverlays, getCityMapMarkers } from './city-map'
import { isPlaceCandidate } from '../../scripts/update-neighborhood-boundaries.mjs'

test('boundary reduction preserves street corners instead of skipping vertices', () => {
  const corners = [[0, 0], [0.024, 0], [0.024, 0.01], [0, 0.01], [0, 0]]
  const detailed = [
    ...Array.from({ length: 241 }, (_, index) => [index / 10000, 0]),
    ...corners.slice(2)
  ]
  const boundary = (ring: number[][]) => ({
    features: [{ geometry: { type: 'Polygon' as const, coordinates: [ring] } }]
  })

  expect(boundaryPathOverlays(boundary(detailed))).toEqual(boundaryPathOverlays(boundary(corners)))
})

test('neighborhood lookup rejects businesses, sports pitches and residential plots', () => {
  const city = { name: 'Example', country: 'Colombia', coordinates: [-74, 4] }
  const candidate = {
    name: 'Central', display_name: 'Central, Example, Colombia',
    class: 'landuse', type: 'residential',
    geojson: { type: 'Polygon', coordinates: [[[-74, 4], [-73.9999, 4], [-73.9999, 4.0001], [-74, 4.0001], [-74, 4]]] }
  }

  expect(Boolean(isPlaceCandidate(city, 'Central', candidate, true))).toBe(false)
  expect(Boolean(isPlaceCandidate(city, 'Central', { ...candidate, class: 'leisure', type: 'pitch' }, true))).toBe(false)
  expect(Boolean(isPlaceCandidate(city, 'Central', { ...candidate, name: 'Central Flats' }, true))).toBe(false)
  expect(Boolean(isPlaceCandidate(city, 'Central', { ...candidate, class: 'boundary', type: 'administrative' }, true))).toBe(true)
})

test('markers respect the static map aspect ratio instead of stretching longitude', async () => {
  const normal = await getCityMapMarkers('bogota', 720, 360)
  const wide = await getCityMapMarkers('bogota', 1440, 360)
  expect(normal).toHaveLength(3)
  for (const [index, marker] of normal.entries()) {
    expect(wide[index].x - 50).toBeCloseTo((marker.x - 50) / 2, 5)
    expect(wide[index].y).toBeCloseTo(marker.y, 5)
  }
})