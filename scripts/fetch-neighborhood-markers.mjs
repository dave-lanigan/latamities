import { writeFile } from 'node:fs/promises'
import cityProfiles from '../data/city-profiles.ts'

const selectedCity = process.argv.includes('--city') ? process.argv[process.argv.indexOf('--city') + 1]?.toLowerCase() : null
const profiles = selectedCity ? cityProfiles.filter((city) => city.id === selectedCity || city.name.toLowerCase() === selectedCity) : cityProfiles
const results = {}

for (const city of profiles) {
  const markers = []

  for (const labeledNeighborhood of city.details.neighborhoods) {
    const [category, ...nameParts] = labeledNeighborhood.split(':')
    const name = nameParts.join(':').trim() || labeledNeighborhood
    const result = await geocode(`${name} ${city.name} ${city.country}`)

    if (result) {
      markers.push({ label: labeledNeighborhood, coordinates: [Number(result.lon), Number(result.lat)] })
    }

    await wait(1100)
  }

  results[city.id] = markers
  console.log(`${city.name}: ${markers.length}/${city.details.neighborhoods.length} markers`)
}

const file = `export interface NeighborhoodMarker {\n  label: string\n  coordinates: [number, number]\n}\n\nexport const neighborhoodMarkersByCity: Record<string, NeighborhoodMarker[]> = ${JSON.stringify(results, null, 2)}\n`
await writeFile('data/neighborhood-markers.ts', file)

async function geocode(query) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(query)}`, {
    headers: { 'user-agent': 'Latamities neighborhood marker updater' }
  })

  if (!response.ok) return null
  const results = await response.json()
  const queryName = query.toLowerCase().split(' ')[0]
  return results.find((item) => item.display_name?.toLowerCase().includes(queryName)) ?? results[0] ?? null
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
