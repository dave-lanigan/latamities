# Latamities

Latamities is a Nuxt app for comparing major Latin American cities through an interactive Mapbox landing page. The home screen now uses a map with city markers, a snapshot bubble on marker click, and a detail panel for deeper city profiles.

## Ride sharing and food delivery coverage

[data/city-services.ts](data/city-services.ts) records sourced city-level coverage for Uber, DiDi, inDrive, Yango, Rappi, PedidosYa, and Uber Eats. The initial research pass was reviewed on 2026-09-24 and contains 236 city/provider pairs across all 73 profiles. Sources are provider city directories, restaurant catalogs, or explicit launch reports; a review date is not a live booking check or the source publication date.

Only sourced services appear in profiles. An omitted service is **unverified, not necessarily unavailable**. Country-wide operations do not imply coverage in every city, and rides do not imply food delivery. Brazil's 99 and iFood are not treated as DiDi and Uber Eats. Iquitos' inDrive evidence is specifically for mototaxis. Santo Domingo is in Ecuador, not the Dominican Republic.

Research is not exhaustive: public search became CAPTCHA-blocked and some provider directories returned 403 responses. Follow-up priorities are inDrive outside its selected Mexico/Peru/Colombia directory; Yango in Caracas, Sucre, and additional Colombian cities; PedidosYa in Cusco, Chimbote, Iquitos, Mendoza, Valparaiso, Manta, and Santo Domingo; and Rappi in Salvador, Manaus, Florianopolis, Porto Alegre, Vitoria, and Joao Pessoa. Search snippets, planned expansions, generic country pages without named cities, and redirects to generic catalogs were not sufficient to add these entries.

To update coverage, verify the profile's country and city ID, check a city-specific source, then update the coverage records and review date. Restaurant availability, vehicle type, pickup restrictions, and delivery radius still depend on the address and time. Provider links and affiliate settings remain in [data/resource-directory.ts](data/resource-directory.ts); flight and finance placement is unchanged.

Run `bun test data/resource-directory.test.ts` to validate coverage IDs, duplicates, categories, all profile resolutions, and affiliate/finance behavior.

## Required environment

Add a public Mapbox token before starting the app:

```bash
NUXT_PUBLIC_MAPBOX_TOKEN=pk.your-token-here
```

Without that token, the landing page will show the setup overlay instead of the live map.

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
