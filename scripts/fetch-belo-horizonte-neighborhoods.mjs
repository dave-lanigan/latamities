import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const neighborhoods = [
  { id: 3408944, name: 'Savassi', color: '#f43f5e' },
  { id: 3408937, name: 'Santa Tereza', color: '#8b5cf6' },
  { id: 3408852, name: 'Lourdes', color: '#0f766e' },
  { id: 3408743, name: 'Centro', color: '#f59e0b' }
]

const features = []

for (const neighborhood of neighborhoods) {
  const relation = await fetchRelation(neighborhood.id)
  const rings = stitchRings(relation.members.filter((member) => member.role === 'outer' && member.geometry?.length)).map((ring) => simplifyRing(ring, 0.00012))

  if (!rings.length) throw new Error(`No outer boundary for ${neighborhood.name}`)

  features.push({
    type: 'Feature',
    properties: {
      name: neighborhood.name,
      osmType: 'relation',
      osmId: neighborhood.id,
      stroke: neighborhood.color,
      'stroke-width': 2,
      'stroke-opacity': 0.95,
      fill: neighborhood.color,
      'fill-opacity': 0.18
    },
    geometry: {
      type: rings.length === 1 ? 'Polygon' : 'MultiPolygon',
      coordinates: rings.length === 1 ? [rings[0]] : rings.map((ring) => [ring])
    }
  })
}

const filePath = resolve('data/neighborhood-boundaries/belo-horizonte-neighborhoods.geojson')
await writeFile(filePath, `${JSON.stringify({ type: 'FeatureCollection', features }, null, 2)}\n`)
console.log(filePath)

async function fetchRelation(id) {
  const query = `[out:json][timeout:25];relation(${id});out geom;`
  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'user-agent': 'Latamities boundary fetch'
    },
    body: new URLSearchParams({ data: query })
  })

  if (!response.ok) throw new Error(`Overpass returned ${response.status}`)
  const data = await response.json()
  const relation = data.elements[0]
  if (!relation) throw new Error(`Relation ${id} not found`)
  return relation
}

function stitchRings(members) {
  const ways = members.map((member) => member.geometry.map((point) => [roundCoord(point.lon), roundCoord(point.lat)]))
  const rings = []

  while (ways.length) {
    let ring = ways.pop()
    let changed = true

    while (changed && !samePoint(ring[0], ring[ring.length - 1])) {
      changed = false
      for (let index = 0; index < ways.length; index += 1) {
        const way = ways[index]
        const start = way[0]
        const end = way[way.length - 1]
        const ringStart = ring[0]
        const ringEnd = ring[ring.length - 1]

        if (samePoint(ringEnd, start)) {
          ring.push(...way.slice(1))
        } else if (samePoint(ringEnd, end)) {
          ring.push(...way.slice(0, -1).reverse())
        } else if (samePoint(ringStart, end)) {
          ring.unshift(...way.slice(0, -1))
        } else if (samePoint(ringStart, start)) {
          ring.unshift(...way.slice(1).reverse())
        } else {
          continue
        }

        ways.splice(index, 1)
        changed = true
        break
      }
    }

    if (samePoint(ring[0], ring[ring.length - 1])) rings.push(ring)
  }

  return rings
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

function samePoint(left, right) {
  return left[0] === right[0] && left[1] === right[1]
}

function roundCoord(value) {
  return Number(value.toFixed(6))
}
