export interface OutdoorItem {
  name: string
  note?: string
}

export interface CityOutdoorGuide {
  summary: string
  activities: OutdoorItem[]
}

export const cityOutdoorGuides: Partial<Record<string, CityOutdoorGuide>> = {
  'buenos-aires': {
    summary: 'Buenos Aires is not a hike-first city, but it works well for urban outdoors, rowing-club weekends, and delta escapes when you want movement without a long transfer.',
    activities: [
      { name: 'Tigre delta day trip', note: 'Boat rides and slow weekend escape' },
      { name: 'Costanera Sur reserve', note: 'Easy urban birding and walking' },
      { name: 'Palermo parks run loop', note: 'Best quick daily outdoor routine' }
    ]
  },
  bogota: {
    summary: 'Bogota is one of the easier capitals for quick mountain access if you start early and pick weather windows carefully.',
    activities: [
      { name: 'Monserrate trail', note: 'Classic climb with altitude' },
      { name: 'Chingaza National Park', note: 'Paramo landscapes and bigger day trip' },
      { name: 'La Calera viewpoints', note: 'Short outdoor reset near the city' }
    ]
  },
  'mexico-city': {
    summary: 'The city itself is huge, but there are enough volcano viewpoints, forest parks, and climbing gyms nearby to keep an outdoor routine alive without a full weekend trip.',
    activities: [
      { name: 'Bosque de Chapultepec circuits', note: 'Best daily-city outdoor option' },
      { name: 'Desierto de los Leones', note: 'Closest forest hike reset' },
      { name: 'Nevado de Toluca day trip', note: 'Bigger alpine-style outing' }
    ]
  },
  medellin: {
    summary: 'Medellin is stronger for green-day trips and viewpoint hikes than for hard alpine hiking, but there is enough nearby to keep weekends active.',
    activities: [
      { name: 'Arvi Park trails', note: 'Easy metro-cable outdoor day' },
      { name: 'Cerro de las Tres Cruces', note: 'Popular city workout hike' },
      { name: 'Guatape and reservoir', note: 'Classic outside-the-city day trip' }
    ]
  },
  lima: {
    summary: 'Lima is better for surf, cliff walks, and desert-side day trips than for immediate green hiking, but the city still gives a good outdoor rhythm if you like the coast.',
    activities: [
      { name: 'Costa Verde run and bike path', note: 'Best regular outdoor routine' },
      { name: 'Surf in Miraflores', note: 'Easiest ocean activity' },
      { name: 'Lomas de Lachay', note: 'Seasonal desert reserve day trip' }
    ]
  },
  'la-paz': {
    summary: 'La Paz is one of the strongest outdoor bases in the region if you can handle the altitude. Big mountain days are realistic, but even the lighter options feel dramatic.',
    activities: [
      { name: 'Valle de la Luna', note: 'Quick surreal landscape outing' },
      { name: 'Muela del Diablo', note: 'Shorter local hike with views' },
      { name: 'Condoriri base trips', note: 'Serious mountain weekend' }
    ]
  },
  cochabamba: {
    summary: 'Cochabamba works well for a lower-friction outdoor routine because nearby hills, viewpoints, and warmer valley weather make quick outings easier than in La Paz.',
    activities: [
      { name: 'Tunari National Park', note: 'Closest big hike option' },
      { name: 'Cristo de la Concordia trail', note: 'Fast city workout climb' },
      { name: 'Pairumani cloud forest', note: 'Cooler day trip reset' }
    ]
  }
}