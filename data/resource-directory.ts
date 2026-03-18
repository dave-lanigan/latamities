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
    description: 'Compare every airline and route into the city in one search — best for finding the cheapest window to book.',
    websiteUrl: 'https://www.skyscanner.com/',
    affiliateUrl: '',
    badge: 'Affiliate'
  },
  uber: {
    id: 'uber',
    label: 'Uber',
    category: 'getting-around',
    description: 'Set up before you land — fixed-price rides from the airport mean no haggling on arrival day.',
    websiteUrl: 'https://www.uber.com/',
    affiliateUrl: ''
  },
  didi: {
    id: 'didi',
    label: 'Didi',
    category: 'getting-around',
    description: 'Worth having as a backup — in some cities Didi has more drivers and lower prices than Uber.',
    websiteUrl: 'https://www.didiglobal.com/',
    affiliateUrl: ''
  },
  rappi: {
    id: 'rappi',
    label: 'Rappi',
    category: 'delivery',
    description: 'The Latin American super-app for food, groceries, pharmacy, and errands. More useful than DoorDash or Deliveroo in most major cities here.',
    websiteUrl: 'https://www.rappi.com/',
    affiliateUrl: ''
  },
  wise: {
    id: 'wise',
    label: 'Wise',
    category: 'money-cash',
    description: 'Open a Wise account before you travel — mid-market exchange rates with no hidden fees beat any airport bureau or bank transfer.',
    websiteUrl: 'https://wise.com/',
    affiliateUrl: '',
    badge: 'Affiliate'
  },
  meru: {
    id: 'meru',
    label: 'Meru',
    category: 'money-cash',
    description: 'Local QR-based payments used in Bolivia — helpful when vendors don\'t accept cards or international transfers.',
    websiteUrl: 'https://www.meru.com.bo/',
    affiliateUrl: ''
  },
  moneygram: {
    id: 'moneygram',
    label: 'MoneyGram',
    category: 'money-cash',
    description: 'Cash pickup at local agents — useful if you need to receive money in hand or send to someone without a bank account.',
    websiteUrl: 'https://www.moneygram.com/',
    affiliateUrl: ''
  },
  offramp: {
    id: 'offramp',
    label: 'Offramp',
    category: 'money-cash',
    description: 'Convert crypto to local cash via QR code — a practical option in markets where banking infrastructure is less accessible.',
    websiteUrl: 'https://www.offramp.xyz/',
    affiliateUrl: ''
  },
  esimio: {
    id: 'esimio',
    label: 'esim.io',
    category: 'connectivity',
    description: 'Buy and activate a data eSIM before you fly — you\'ll have a working number and data the moment you land, no SIM hunting required.',
    websiteUrl: 'https://esim.io/',
    affiliateUrl: ''
  },
  gigsky: {
    id: 'gigsky',
    label: 'GigSky',
    category: 'connectivity',
    description: 'Alternative eSIM provider — worth comparing plans as regional coverage and pricing vary between carriers.',
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