import type { CityProfile } from './city-profiles'

export type ResourceCategory = 'flights' | 'transport' | 'money' | 'connectivity'

export interface ResourceLink {
  id: string
  label: string
  category: ResourceCategory
  description: string
  websiteUrl: string
  affiliateUrl?: string
  badge?: string
}

export interface ResolvedResourceLink extends ResourceLink {
  href: string
  isAffiliateReady: boolean
}

export interface ResourceGroup {
  id: ResourceCategory
  title: string
  items: ResolvedResourceLink[]
}

const categoryTitles: Record<ResourceCategory, string> = {
  flights: 'Flights',
  transport: 'Transport & delivery',
  money: 'Money & cash',
  connectivity: 'eSIM & connectivity'
}

export const resourceProviders: Record<string, ResourceLink> = {
  skyscanner: {
    id: 'skyscanner',
    label: 'Skyscanner',
    category: 'flights',
    description: 'Affiliate slot for destination search and fare discovery.',
    websiteUrl: 'https://www.skyscanner.com/',
    affiliateUrl: '',
    badge: 'Affiliate slot'
  },
  uber: {
    id: 'uber',
    label: 'Uber',
    category: 'transport',
    description: 'Primary rideshare option where coverage is strong.',
    websiteUrl: 'https://www.uber.com/',
    affiliateUrl: ''
  },
  didi: {
    id: 'didi',
    label: 'Didi',
    category: 'transport',
    description: 'Common backup rideshare in larger LATAM cities.',
    websiteUrl: 'https://www.didiglobal.com/',
    affiliateUrl: ''
  },
  rappi: {
    id: 'rappi',
    label: 'Rappi',
    category: 'transport',
    description: 'Food delivery and errands app used heavily in major hubs.',
    websiteUrl: 'https://www.rappi.com/',
    affiliateUrl: ''
  },
  wise: {
    id: 'wise',
    label: 'Wise',
    category: 'money',
    description: 'Best default slot for sending money into the region.',
    websiteUrl: 'https://wise.com/',
    affiliateUrl: '',
    badge: 'Affiliate slot'
  },
  meru: {
    id: 'meru',
    label: 'Meru',
    category: 'money',
    description: 'Local-friendly money movement option to track in Bolivia and adjacent markets.',
    websiteUrl: 'https://www.meru.com/',
    affiliateUrl: ''
  },
  moneygram: {
    id: 'moneygram',
    label: 'MoneyGram',
    category: 'money',
    description: 'Cash pickup fallback when cards or transfers are inconvenient.',
    websiteUrl: 'https://www.moneygram.com/',
    affiliateUrl: ''
  },
  offramp: {
    id: 'offramp',
    label: 'Offramp',
    category: 'money',
    description: 'Useful to track where crypto-to-cash offramps matter.',
    websiteUrl: 'https://www.offramp.xyz/',
    affiliateUrl: ''
  },
  esimio: {
    id: 'esimio',
    label: 'esim.io',
    category: 'connectivity',
    description: 'Good placeholder for arrival-day connectivity.',
    websiteUrl: 'https://esim.io/',
    affiliateUrl: ''
  },
  gigsky: {
    id: 'gigsky',
    label: 'GigSky',
    category: 'connectivity',
    description: 'Second eSIM option so the section is not single-provider.',
    websiteUrl: 'https://www.gigsky.com/',
    affiliateUrl: ''
  }
}

const basePlacements: Partial<Record<ResourceCategory, string[]>> = {
  flights: ['skyscanner'],
  money: ['wise', 'moneygram'],
  connectivity: ['esimio', 'gigsky']
}

const countryPlacements: Partial<Record<string, Partial<Record<ResourceCategory, string[]>>>> = {
  Argentina: {
    transport: ['uber', 'didi', 'rappi'],
    money: ['wise', 'moneygram']
  },
  Bolivia: {
    money: ['wise', 'meru', 'moneygram'],
    connectivity: ['esimio', 'gigsky']
  },
  Colombia: {
    transport: ['uber', 'didi', 'rappi'],
    money: ['wise', 'moneygram']
  },
  Mexico: {
    transport: ['uber', 'didi', 'rappi'],
    money: ['wise', 'moneygram']
  },
  Peru: {
    transport: ['uber', 'didi', 'rappi'],
    money: ['wise', 'offramp', 'moneygram']
  }
}

const cityPlacements: Partial<Record<string, Partial<Record<ResourceCategory, string[]>>>> = {
  'buenos-aires': {
    money: ['wise', 'moneygram']
  },
  medellin: {
    transport: ['uber', 'didi', 'rappi']
  },
  'mexico-city': {
    transport: ['uber', 'didi', 'rappi']
  },
  'la-paz': {
    money: ['wise', 'meru', 'moneygram']
  },
  cochabamba: {
    money: ['wise', 'meru', 'moneygram']
  }
}

const uniq = (values: string[]) => [...new Set(values)]

export const resolveResourceGroups = (city: Pick<CityProfile, 'id' | 'country'>): ResourceGroup[] => {
  const countryGroup = countryPlacements[city.country] ?? {}
  const cityGroup = cityPlacements[city.id] ?? {}

  return (Object.keys(categoryTitles) as ResourceCategory[]).map((category) => {
    const providerIds = uniq([
      ...(basePlacements[category] ?? []),
      ...(countryGroup[category] ?? []),
      ...(cityGroup[category] ?? [])
    ])

    const items = providerIds
      .map((providerId) => resourceProviders[providerId])
      .filter((provider): provider is ResourceLink => Boolean(provider))
      .map((provider) => ({
        ...provider,
        href: provider.affiliateUrl?.trim() || provider.websiteUrl,
        isAffiliateReady: Boolean(provider.affiliateUrl?.trim())
      }))

    return {
      id: category,
      title: categoryTitles[category],
      items
    }
  }).filter((group) => group.items.length > 0)
}