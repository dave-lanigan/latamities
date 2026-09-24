# Neighborhood boundary audit

Audited 2026-09-24: the first 20 entries in `data/city-profiles.ts`, plus
Vitoria, which was explicitly reported. All 63 neighborhood entries retain
location markers; 38 have verified OSM polygons. Markers are hidden where a
polygon exists.

## Refresh

```sh
bun scripts/update-neighborhood-boundaries.mjs --top 20 --city vitoria --refresh
bun scripts/update-neighborhood-boundaries.mjs --top 20 --city vitoria --refresh --write
bun test server/utils/city-map.test.ts
```

Without `--write`, the updater only reports results. `--top` follows profile
order; `--city` additionally includes that city. `--refresh` reloads existing
OSM objects instead of retaining simplified local geometry. Source fetch
failures for existing objects abort before writing updates.

GeoJSON retains source coordinates, OSM IDs, source links and retrieval dates.
Only the static-image overlay is simplified, using Douglas-Peucker instead of
discarding every nth vertex. Marker projection respects Web Mercator and the
image aspect ratio. Do not hand-draw missing boundaries or substitute a hotel,
park, sports facility, apartment complex or distant namesake.

## Coverage

"Marker only" means no exact polygon was verified, not proof that none exists.
Nominatim was reachable during the audit; the configured Overpass services
failed or timed out from this network. Recheck these gaps when access returns.

| City | Polygons | Marker only |
| --- | --- | --- |
| Guadalajara | 0/3 | Americana, Providencia, Lafayette |
| Buenos Aires | 3/3 | None |
| Santiago | 2/3 | Barrio Italia |
| Lima | 3/3 | None |
| Bogota | 0/3 | Chapinero Alto, Zona G, Parque 93 |
| Mexico City | 2/3 | Polanco |
| Medellin | 3/3 | None |
| Cali | 3/3 | None |
| Rio de Janeiro | 3/3 | None |
| Barranquilla | 1/3 | Alto Prado, Villa Country |
| Sao Paulo | 1/3 | Jardins, Vila Madalena |
| Curitiba | 3/3 | None |
| Caracas | 3/3 | None |
| Quito | 3/3 | None |
| Montevideo | 2/3 | Pocitos |
| Asuncion | 2/3 | Carmelitas |
| La Paz | 0/3 | Sopocachi, Calacoto, San Miguel |
| Santa Cruz de la Sierra | 0/3 | Centro, Urubo, Equipetrol |
| Cochabamba | 0/3 | Centro, Cala Cala, Queru Queru |
| San Salvador | 1/3 | San Benito, Zona Rosa |
| Vitoria | 3/3 | None |

## Rejected matches

- Bogota: Chapinero Alto matched a house (way 371547403); Zona G matched
  accommodation businesses; Parque 93 matched the park itself (way 24577301),
  not a neighborhood. These are not neighborhood outlines.
- La Paz: Sopocachi (way 188179822) is a distant hamlet; Calacoto (relation
  4500783) is a rural municipality, not the city's neighborhood.
- Barranquilla: Alto Prado (way 1417001797) is a tiny residential plot.
- Santa Cruz: Urubo (way 441230604) is a sports pitch east of the city center.
  The fallback marker now uses the verified Urubo Barranca locality west of
  the Pirai River (OSM node 6789055468), not a claimed district centroid.
- San Salvador: San Benito Flats (way 401044513) is an apartment complex,
  not the San Benito neighborhood.

OSM data is provided by OpenStreetMap contributors under the ODbL:
<https://www.openstreetmap.org/copyright>
