import type { CityProfile } from './city-profiles'
import { cityServiceCoverage } from './city-services'

export type ResourceCategory = 'flights' | 'getting-around' | 'delivery' | 'money-cash'

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
  'money-cash': 'Money & cash'
}

const categorySummaries: Record<ResourceCategory, string> = {
  flights: 'Search and price discovery for getting into the city.',
  'getting-around': 'Reported city coverage; vehicle options, driver availability, and airport pickup rules vary.',
  delivery: 'Reported city coverage; restaurants and delivery areas depend on your address.',
  'money-cash': 'Wise is still the cleanest default for transfers, while local QR and cash-offramp tools matter more in specific markets.'
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
    description: 'Request rides in the app. Vehicle options and airport pickup rules vary by city.',
    websiteUrl: 'https://www.uber.com/',
    affiliateUrl: ''
  },
  didi: {
    id: 'didi',
    label: 'DiDi',
    category: 'getting-around',
    description: 'Compare app-based ride options, prices, and pickup times.',
    websiteUrl: 'https://web.didiglobal.com/',
    affiliateUrl: ''
  },
  indrive: {
    id: 'indrive',
    label: 'inDrive',
    category: 'getting-around',
    description: 'Offer a fare and choose from available drivers in the app. Vehicle types vary by city, including mototaxis in Iquitos.',
    websiteUrl: 'https://indrive.com/',
    affiliateUrl: ''
  },
  yango: {
    id: 'yango',
    label: 'Yango',
    category: 'getting-around',
    description: 'Book app-based rides with local transport partners.',
    websiteUrl: 'https://yango.com/',
    affiliateUrl: ''
  },
  ubereats: {
    id: 'ubereats',
    label: 'Uber Eats',
    category: 'delivery',
    description: 'Order restaurant delivery; selection depends on your address.',
    websiteUrl: 'https://www.ubereats.com/',
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
  pedidosya: {
    id: 'pedidosya',
    label: 'PedidosYa',
    category: 'delivery',
    description: 'A delivery app for restaurant meals, groceries, and convenience orders.',
    websiteUrl: 'https://www.pedidosya.com/',
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
  }
}

const basePlacements: Partial<Record<ResourceCategory, string[]>> = {
  flights: ['skyscanner'],
  'money-cash': ['wise', 'moneygram']
}

const countryPlacements: Partial<Record<string, Partial<Record<ResourceCategory, string[]>>>> = {
  Argentina: {
    'money-cash': ['wise', 'offramp', 'moneygram']
  },
  Bolivia: {
    'money-cash': ['wise', 'meru', 'moneygram']
  },
  Brazil: {
    'money-cash': ['wise', 'offramp', 'moneygram']
  },
  Colombia: {
    'money-cash': ['wise', 'moneygram']
  },
  Mexico: {
    'money-cash': ['wise', 'moneygram']
  },
  Peru: {
    'money-cash': ['wise', 'offramp', 'moneygram']
  },
  Honduras: {
    'money-cash': ['wise', 'moneygram']
  }
}

const cityPlacements: Partial<Record<string, Partial<Record<ResourceCategory, string[]>>>> = {
  'buenos-aires': {
    'money-cash': ['wise', 'offramp', 'moneygram']
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
  const cityServiceIds = cityServiceCoverage
    .filter((coverage) => coverage.cityIds.includes(city.id))
    .map((coverage) => coverage.providerId)

  return (Object.keys(categoryTitles) as ResourceCategory[]).map((category) => {
    const providerIds = category === 'getting-around' || category === 'delivery'
      ? uniq(cityServiceIds.filter((providerId) => resourceProviders[providerId]?.category === category))
      : uniq([
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