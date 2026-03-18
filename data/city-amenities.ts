export interface AmenityListing {
  name: string
  note?: string
}

export interface CityAmenityProfile {
  coworking: {
    summary: string
    dayPassUSD?: number
    monthlyUSD?: number
    examples: AmenityListing[]
  }
  gyms: {
    summary: string
    monthlyUSD?: number
    examples: AmenityListing[]
  }
}

export const cityAmenityProfiles: Record<string, CityAmenityProfile> = {
  'buenos-aires': {
    coworking: {
      summary: 'Best density is in Palermo, Recoleta, and Belgrano. Day-pass friendly options are common.',
      dayPassUSD: 10,
      monthlyUSD: 110,
      examples: [
        { name: 'Huerta Coworking', note: 'Popular with founders and small teams' },
        { name: 'La Maquinita', note: 'Multiple locations across the city' }
      ]
    },
    gyms: {
      summary: 'Neighborhood gyms are easy to find; premium chains cluster in the north.',
      monthlyUSD: 35,
      examples: [
        { name: 'Megatlon', note: 'Most visible premium chain' },
        { name: 'SportClub', note: 'Broad footprint and class-heavy options' }
      ]
    }
  },
  bogota: {
    coworking: {
      summary: 'Chapinero, Zona T, and Usaquen have the strongest desk and meeting-room selection.',
      dayPassUSD: 12,
      monthlyUSD: 140,
      examples: [
        { name: 'WeWork', note: 'Reliable fallback for meetings' },
        { name: 'Atomhouse', note: 'Smaller community feel' }
      ]
    },
    gyms: {
      summary: 'Most residential districts have chain gyms plus smaller local studios.',
      monthlyUSD: 32,
      examples: [
        { name: 'Bodytech', note: 'Dominant national chain' },
        { name: 'Smart Fit', note: 'Budget-friendly and widespread' }
      ]
    }
  },
  'mexico-city': {
    coworking: {
      summary: 'Roma, Condesa, and Polanco remain the easiest neighborhoods for productive drop-ins.',
      dayPassUSD: 14,
      monthlyUSD: 155,
      examples: [
        { name: 'WeWork', note: 'Most predictable for short stays' },
        { name: 'Homework', note: 'Local brand with polished spaces' }
      ]
    },
    gyms: {
      summary: 'Premium chains and boutique studios are dense in central neighborhoods.',
      monthlyUSD: 45,
      examples: [
        { name: 'Sports World', note: 'Higher-end chain with many clubs' },
        { name: 'Smart Fit', note: 'Cheaper option across the city' }
      ]
    }
  },
  medellin: {
    coworking: {
      summary: 'Laureles and El Poblado still carry most of the mature coworking supply.',
      dayPassUSD: 10,
      monthlyUSD: 125,
      examples: [
        { name: 'Selina', note: 'Useful social fallback for short stays' },
        { name: 'Tinkko', note: 'Common option for private-office needs' }
      ]
    },
    gyms: {
      summary: 'Chain gyms are easy to access; classes and lifting gyms both exist in nomad-heavy areas.',
      monthlyUSD: 28,
      examples: [
        { name: 'Smart Fit', note: 'Most common budget chain' },
        { name: 'Action Black', note: 'Premium training-focused option' }
      ]
    }
  },
  'la-paz': {
    coworking: {
      summary: 'Smaller scene overall, but central and south-zone spots are viable for focused work weeks.',
      dayPassUSD: 8,
      monthlyUSD: 90,
      examples: [
        { name: 'Nexocowork', note: 'Business-oriented setup' },
        { name: 'Comunidad Cowork', note: 'Smaller local option' }
      ]
    },
    gyms: {
      summary: 'Month-to-month gyms are available, though quality varies more by neighborhood than in larger capitals.',
      monthlyUSD: 24,
      examples: [
        { name: 'Premier Fitness', note: 'Well-equipped by local standards' },
        { name: 'Smart Gym', note: 'Useful lower-cost fallback' }
      ]
    }
  },
  cochabamba: {
    coworking: {
      summary: 'Small but growing; apartment-first living still matters more than all-day cafe hopping.',
      dayPassUSD: 7,
      monthlyUSD: 80,
      examples: [
        { name: 'Co-Work Bolivia', note: 'Flexible for short stays' },
        { name: 'Tu Espacio', note: 'Local desk-first setup' }
      ]
    },
    gyms: {
      summary: 'Affordable gyms are easy to find near residential zones with mid-range apartment stock.',
      monthlyUSD: 22,
      examples: [
        { name: 'Olympic Gym', note: 'Straightforward local option' },
        { name: 'Premier Fitness', note: 'Better-equipped chain-style environment' }
      ]
    }
  }
}