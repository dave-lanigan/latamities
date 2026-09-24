import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const [, , cityId, neighborhood, south, west, north, east] = process.argv

if (!cityId || !neighborhood || !south || !west || !north || !east) {
  throw new Error('Usage: bun scripts/fetch-osm-neighborhood-boundary.mjs <city-id> <neighborhood> <south> <west> <north> <east>')
}

const query = `[out:json][timeout:25];(relation["name"~"^${escapeOverpass(neighborhood)}$",i]["boundary"](${south},${west},${north},${east});way["name"~"^${escapeOverpass(neighborhood)}$",i]["boundary"](${south},${west},${north},${east}););out geom;`
const response = await fetch('https://overpass-api.de/api/interpreter', {
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'user-agent': 'Latamities boundary fetch'
  },
  body: new URLSearchParams({ data: query })
})

if (!response.ok) {
  throw new Error(`Overpass returned ${response.status}`)
}

const data = await response.json()
const element = data.elements.find((item) => item.type === 'way' && item.geometry?.length) ?? data.elements.find((item) => item.geometry?.length)

if (!element) {
  throw new Error(`No boundary geometry found for ${neighborhood}`)
}

const coordinates = element.geometry.map((point) => [roundCoord(point.lon), roundCoord(point.lat)])
const first = coordinates[0]
const last = coordinates[coordinates.length - 1]

if (first[0] !== last[0] || first[1] !== last[1]) {
  coordinates.push(first)
}

const featureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: element.tags?.name ?? neighborhood,
        osmType: element.type,
        osmId: element.id
      },
      geometry: {
        type: 'Polygon',
        coordinates: [coordinates]
      }
    }
  ]
}

const dir = resolve('data/neighborhood-boundaries')
const filePath = resolve(dir, `${cityId}-${slug(neighborhood)}.geojson`)
await mkdir(dir, { recursive: true })
await writeFile(filePath, `${JSON.stringify(featureCollection, null, 2)}\n`)
console.log(filePath)

function slug(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function escapeOverpass(value) {
  return value.replace(/[\\"]/g, '\\$&')
}

function roundCoord(value) {
  return Number(value.toFixed(6))
}
