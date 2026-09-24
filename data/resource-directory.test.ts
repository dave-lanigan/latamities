import { describe, expect, test } from 'bun:test'
import cities from './city-profiles'
import { cityServiceCoverage, cityServicesReviewedAt } from './city-services'
import { resolveResourceGroups, resourceProviders } from './resource-directory'

describe('city service availability', () => {
  test('all coverage records reference real cities, requested providers, and HTTPS sources', () => {
    const cityIds = new Set(cities.map((city) => city.id))
    const categories = {
      uber: 'getting-around', didi: 'getting-around', indrive: 'getting-around', yango: 'getting-around',
      rappi: 'delivery', pedidosya: 'delivery', ubereats: 'delivery'
    }
    const pairs = new Set<string>()

    expect(cityServicesReviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    for (const coverage of cityServiceCoverage) {
      expect(new URL(coverage.sourceUrl).protocol).toBe('https:')
      expect(resourceProviders[coverage.providerId]?.category).toBe(categories[coverage.providerId])
      expect(coverage.cityIds.length).toBeGreaterThan(0)
      for (const cityId of coverage.cityIds) {
        expect(cityIds.has(cityId)).toBe(true)
        const pair = `${cityId}:${coverage.providerId}`
        expect(pairs.has(pair)).toBe(false)
        pairs.add(pair)
      }
    }
  })

  test.each(cities)('$id resolves exactly its sourced services', (city) => {
    const expected = cityServiceCoverage.filter((record) => record.cityIds.includes(city.id))
      .map((record) => record.providerId).sort()
    const actual = resolveResourceGroups(city)
      .filter((group) => group.id === 'getting-around' || group.id === 'delivery')
      .flatMap((group) => group.items.map((item) => item.id)).sort()

    expect(expected.length).toBeGreaterThan(0)
    expect(actual).toEqual(expected)
  })

  test('keeps Santo Domingo in Ecuador and distinguishes rides from food delivery', () => {
    const city = cities.find((profile) => profile.id === 'santo-domingo')!
    expect(city.country).toBe('Ecuador')
    const groups = resolveResourceGroups(city)
    expect(groups.find((group) => group.id === 'getting-around')?.items.map((item) => item.id)).toEqual(['uber'])
    expect(groups.find((group) => group.id === 'delivery')?.items.map((item) => item.id)).toEqual(['ubereats', 'rappi'])
    expect(resolveResourceGroups({ id: 'iquitos', country: 'Peru' })
      .find((group) => group.id === 'getting-around')?.items.map((item) => item.id)).toEqual(['indrive'])
  })

  test('preserves finance placement and affiliate URL precedence', () => {
    const city = { id: 'la-paz', country: 'Bolivia' }
    const originalUrl = resourceProviders.uber!.affiliateUrl
    try {
      resourceProviders.uber!.affiliateUrl = ' https://example.com/partner '
      const groups = resolveResourceGroups(city)
      expect(groups.find((group) => group.id === 'money-cash')?.items.map((item) => item.id))
        .toEqual(['wise', 'moneygram', 'meru'])
      expect(groups.find((group) => group.id === 'getting-around')?.items.find((item) => item.id === 'uber'))
        .toMatchObject({ href: 'https://example.com/partner', isAffiliateReady: true })
      resourceProviders.uber!.affiliateUrl = ' '
      expect(resolveResourceGroups(city).find((group) => group.id === 'getting-around')?.items.find((item) => item.id === 'uber'))
        .toMatchObject({ href: resourceProviders.uber!.websiteUrl, isAffiliateReady: false })
    } finally {
      resourceProviders.uber!.affiliateUrl = originalUrl
    }
  })

  test('does not infer ride or delivery coverage from the country', () => {
    const groups = resolveResourceGroups({ id: 'unresearched-city', country: 'Mexico' })

    expect(groups.some((group) => group.id === 'getting-around')).toBe(false)
    expect(groups.some((group) => group.id === 'delivery')).toBe(false)
    expect(groups.find((group) => group.id === 'flights')?.items.map((item) => item.id)).toEqual(['skyscanner'])
    expect(groups.find((group) => group.id === 'money-cash')?.items.map((item) => item.id)).toEqual(['wise', 'moneygram'])
  })
})