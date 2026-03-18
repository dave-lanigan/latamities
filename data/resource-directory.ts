import type { CityProfile } from './city-profiles'

export type ResourceCategory = 'flights' | 'getting-around' | 'delivery' | 'money-cash' | 'connectivity'

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
  summary: string
  items: ResolvedResourceLink[]
}

const categoryTitles: Record<ResourceCategory, string> = {
  flights: 'Flights',
  'getting-around': 'Getting around',
  delivery: 'Delivery',
  'money-cash': 'Money & cash',
  connectivity: 'eSIM & connectivity'
}

const categorySummaries: Record<ResourceCategory, string> = {
  flights: 'Search and price discovery for getting into the city.',
  'getting-around': 'Use the strongest ride and taxi options first, then fall back to local cash or airport transport when app coverage is weaker.',
  delivery: 'Rappi dominates in many large cities, but local delivery density still varies a lot by neighborhood.',
  'money-cash': 'Wise is still the cleanest default for transfers, while local QR and cash-offramp tools matter more in specific markets.',
  connectivity: 'Keep one eSIM fallback ready for arrival day so you are not solving SIM issues from the airport.'
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
    category: 'getting-around',
    description: 'Primary rideshare option where coverage is strong.',
    websiteUrl: 'https://www.uber.com/',
    affiliateUrl: ''
  },
  didi: {
    id: 'didi',
    label: 'Didi',
    category: 'getting-around',
    description: 'Common backup rideshare in larger LATAM cities.',
    websiteUrl: 'https://www.didiglobal.com/',
    affiliateUrl: ''
  },
  rappi: {
    id: 'rappi',
    label: 'Rappi',
    category: 'delivery',
    description: 'Food delivery and errands app used heavily in major hubs.',
    websiteUrl: 'https://www.rappi.com/',
    affiliateUrl: ''
  },
  wise: {
    id: 'wise',
    label: 'Wise',
    category: 'money-cash',
    description: 'Best default slot for sending money into the region.',
    websiteUrl: 'https://wise.com/',
    affiliateUrl: '',
    badge: 'Affiliate slot'
  },
  meru: {
    id: 'meru',
    label: 'Meru',
    category: 'money-cash',
    description: 'Use when local QR-code or domestic money movement matters more than an international transfer rail.',
    websiteUrl: 'https://www.meru.com.bo/',
    affiliateUrl: ''
  },
  moneygram: {
    id: 'moneygram',
    label: 'MoneyGram',
    category: 'money-cash',
    description: 'Cash pickup fallback when cards or transfers are inconvenient.',
    websiteUrl: 'https://www.moneygram.com/',
    affiliateUrl: ''
  },
  offramp: {
    id: 'offramp',
    label: 'Offramp',
    category: 'money-cash',
    description: 'Crypto-to-cash QR flow worth tracking in markets where local rails are less convenient.',
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
  'money-cash': ['wise', 'moneygram'],
  connectivity: ['esimio', 'gigsky']
}

const countryPlacements: Partial<Record<string, Partial<Record<ResourceCategory, string[]>>>> = {
  Argentina: {
    'getting-around': ['uber', 'didi'],
    delivery: ['rappi'],
    'money-cash': ['wise', 'offramp', 'moneygram']
  },
  Bolivia: {
    'getting-around': ['uber'],
    'money-cash': ['wise', 'meru', 'moneygram'],
    connectivity: ['esimio', 'gigsky']
  },
  Brazil: {
    'getting-around': ['uber'],
    delivery: ['rappi'],
    'money-cash': ['wise', 'offramp', 'moneygram']
  },
  Colombia: {
    'getting-around': ['uber', 'didi'],
    delivery: ['rappi'],
    'money-cash': ['wise', 'moneygram']
  },
  Mexico: {
    'getting-around': ['uber', 'didi'],
    delivery: ['rappi'],
    'money-cash': ['wise', 'moneygram']
  },
  Peru: {
    'getting-around': ['uber', 'didi'],
    delivery: ['rappi'],
    'money-cash': ['wise', 'offramp', 'moneygram']
  }
}

const cityPlacements: Partial<Record<string, Partial<Record<ResourceCategory, string[]>>>> = {
  'buenos-aires': {
    'money-cash': ['wise', 'offramp', 'moneygram']
  },
  medellin: {
    'getting-around': ['uber', 'didi'],
    delivery: ['rappi']
  },
  'mexico-city': {
    'getting-around': ['uber', 'didi'],
    delivery: ['rappi']
  },
  'la-paz': {
    'money-cash': ['wise', 'meru', 'moneygram']
  },
  cochabamba: {
    'money-cash': ['wise', 'meru', 'moneygram']
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
      summary: categorySummaries[category],
      items
    }
  }).filter((group) => group.items.length > 0)
}