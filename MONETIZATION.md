# Latamities Monetization Plan

## Positioning

Latamities is a Latin America city-discovery and relocation intelligence tool for digital nomads, remote workers, expats, and long-stay travelers.

The app should make money by helping users make high-intent relocation decisions: where to live, where to stay, how to move money, how to insure themselves, how to get connected, and how to plan arrival logistics.

## Core Strategy

The first monetization priority is not a paywall. The first priority is turning the existing city data into traffic-generating, indexable pages.

Current city data is valuable but must be exposed through crawlable pages such as:

- `/city/medellin`
- `/city/buenos-aires`
- `/city/mexico-city`
- `/city/lima`

Each page should combine useful decision content with monetized calls to action.

## Phase 1: SEO Pages + Affiliate Revenue

### Goal

Create search traffic and monetize it immediately with relevant affiliate offers.

### Why this comes first

The app currently has no launch audience. Affiliate revenue only works once people can discover individual city pages through search. City pages are also the foundation for subscriptions, lead generation, and sponsored placements later.

### Build

Create one server-rendered city page per profile using existing data from:

- `data/city-profiles.ts`
- `data/city-stay-guides.ts`
- `data/city-outdoor-guides.ts`
- `data/city-flight-destinations.ts`
- `data/country-finance.ts`
- `data/resource-directory.ts`
- `data/housing-tiers.ts`

Each city page should include:

- Housing cost tier
- Airbnb monthly average when available
- Neighborhood recommendations
- Internet speed
- Climate by month
- Airport and flight notes
- Money/currency notes
- Best-for and watchout sections
- Stay guide
- Resource links

### Affiliate categories

Prioritize affiliate offers in this order:

1. Nomad insurance
   - Best fit for recurring revenue.
   - Good placement: arrival checklist, city page sidebar, relocation CTA.

2. Money transfer / banking
   - Wise or similar.
   - Best placement: country finance section, Argentina/Bolivia FX notes, arrival checklist.

3. eSIM
   - Easy conversion for travelers entering a new country.
   - Best placement: arrival checklist and country pages.

4. Long-stay accommodation
   - Highest upside per conversion.
   - Best placement: near Airbnb monthly average, stay-guide buildings, neighborhood section.

5. Flights
   - Lower margin but high intent.
   - Best placement: airport section and flight-destination module.

### Rule

Affiliate recommendations must be useful first. Do not add generic banners. CTAs should be contextual to the exact user decision.

Examples:

- Housing section: “Compare long-stay apartments in Medellín”
- Money section: “Set up low-fee transfers before arriving in Argentina”
- Arrival section: “Get an eSIM before landing”
- Safety section: “Compare nomad health insurance”

## Phase 2: City Comparison Tool

### Goal

Increase engagement and create a future premium product.

### Free version

Allow users to compare cities by:

- Housing tier
- Monthly housing estimate
- Internet speed
- Climate
- Altitude
- Population
- Airport access
- Nature access
- Purchasing-power rank

### Premium candidate

After traffic exists, add a paid relocation pass or subscription for:

- Saved shortlists
- Personalized city ranking
- Advanced filters
- Monthly price-change alerts
- Downloadable relocation checklist
- Side-by-side export
- Visa/tax checklist links

Recommended pricing to test:

- One-time relocation pass: `$19–$49`
- Subscription: `$5–$9/month`

A one-time pass likely fits better at first because relocation is episodic.

## Phase 3: Lead Generation

### Goal

Capture high-value relocation intent and sell qualified leads or referrals.

### Lead types

High-value partner categories:

- Visa lawyers
- Tax advisors
- Relocation consultants
- Serviced apartments
- Coworking spaces
- Spanish schools
- Health insurance brokers

### Lead form

Add a lightweight form on city pages:

- Target city
- Move date
- Monthly budget
- Nationality
- Remote-worker status
- Need help with housing, visa, tax, banking, insurance, or neighborhood choice

### Rule

Only pursue paid lead partnerships after the site has traffic data showing which cities and pages attract high-intent users.

## Phase 4: Sponsored Placements

### Goal

Monetize city-specific attention from local operators.

Potential sponsors:

- Coworking spaces
- Coliving spaces
- Furnished apartment operators
- Local relocation services
- Language schools
- Tour operators

Suggested placements:

- Featured coworking space
- Featured long-stay building
- Featured neighborhood guide
- Sponsored arrival checklist item

Sponsored content must be labeled clearly.

## Phase 5: B2B Data Products

### Goal

Turn structured LatAm relocation data into a paid dataset or API.

Potential buyers:

- Remote-work platforms
- Relocation companies
- Travel companies
- Real-estate investors
- HR/global mobility teams

Possible products:

- City affordability dataset
- Housing trend dataset
- Remote-work readiness index
- LatAm city comparison API
- Quarterly relocation report

This is a later-stage opportunity and should not distract from SEO and affiliate execution.

## Housing Affordability Standard

Cheap housing must not be assigned manually.

The app should use `data/housing-tiers.ts` as the source of truth:

- Source: `details.airbnb.avgMonthlyUSD`
- Minimum trusted sample size: `5`
- Cheap: bottom third of trusted cities by monthly housing cost
- Moderate: middle third
- Pricey: top third
- Unknown: no trusted housing data

This makes “cheap” mean “cheap relative to other Latin American cities in this dataset,” not globally cheap and not based on subjective copy.

## Launch Priority

The highest-value next step is:

1. Create SSR city pages.
2. Add housing tier badges.
3. Add contextual affiliate CTA slots.
4. Generate sitemap and SEO metadata.
5. Launch.
6. Measure which city pages get impressions and clicks.

Do not build a paywall before traffic exists.

## Success Metrics

Track:

- Organic impressions per city page
- Organic clicks per city page
- Affiliate CTA click-through rate
- Email capture rate
- City comparison usage
- Top searched / filtered cities
- Pages with highest commercial intent

Initial target:

- 50+ indexable city pages
- 1,000 monthly organic visits
- 3–5% affiliate CTA click-through rate
- First affiliate conversion within 90 days of launch

## Recommended Order of Execution

1. SSR city pages
2. SEO metadata and sitemap
3. Housing tier display
4. Affiliate CTA components
5. Resource-directory affiliate URLs
6. Analytics events
7. City comparison tool
8. Email capture / relocation checklist
9. Lead-generation form
10. Premium relocation pass
