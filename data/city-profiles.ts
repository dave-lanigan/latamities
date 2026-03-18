import cityNames from '../cities.json'

export interface MonthlyDatum {
  month: string
  value: number
}

export interface PlaceHighlight {
  name: string
  note?: string
  link?: string
}

export interface CityProfile {
  id: string
  name: string
  country: string
  coordinates: [number, number]
  snapshot: {
    populationMetro: string
    altitudeM: number
    landscape: string
    purchasingPowerRank: number
    internet: {
      downloadMbps: number
      uploadMbps: number
      latencyMs: number
    }
    temperatureByMonth: MonthlyDatum[]
    rainfallByMonth: MonthlyDatum[]
  }
  details: {
    tagline: string
    overview: string
    bestFor: string[]
    watchouts: string[]
    neighborhoods: string[]
    mobility: string
    climateNote: string
    workstyle: string
    pace: string
    airport: {
      description: string
      rideshareFromAirport: boolean
      rideshareNote?: string
    }
    timeToNature: string
    knownFor?: string[]
    airbnb?: { avgNightlyUSD: number | null }
    restaurants?: PlaceHighlight[]
    cafes?: PlaceHighlight[]
    bars?: PlaceHighlight[]
    attractions?: PlaceHighlight[]
  }
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const series = (values: number[]) => months.map((month, index) => ({ month, value: values[index] }))

const climate = {
  mexicanHighland: {
    temperatureByMonth: series([20, 22, 24, 26, 28, 27, 25, 25, 24, 22, 21, 20]),
    rainfallByMonth: series([8, 5, 6, 9, 40, 165, 245, 215, 145, 55, 14, 7])
  },
  riverPlate: {
    temperatureByMonth: series([25, 24, 22, 18, 14, 11, 10, 12, 14, 17, 20, 23]),
    rainfallByMonth: series([118, 111, 124, 104, 87, 67, 63, 68, 78, 120, 117, 110])
  },
  santiagoMediterranean: {
    temperatureByMonth: series([29, 28, 25, 21, 17, 14, 13, 15, 18, 21, 24, 27]),
    rainfallByMonth: series([4, 3, 8, 15, 40, 68, 78, 58, 28, 15, 8, 5])
  },
  limaCoastal: {
    temperatureByMonth: series([27, 28, 27, 25, 22, 20, 19, 18, 18, 19, 21, 24]),
    rainfallByMonth: series([1, 0, 0, 1, 2, 3, 4, 4, 3, 2, 1, 1])
  },
  bogotaHighland: {
    temperatureByMonth: series([19, 19, 19, 18, 18, 17, 17, 18, 18, 18, 18, 18]),
    rainfallByMonth: series([48, 69, 95, 122, 108, 58, 40, 52, 73, 110, 97, 67])
  },
  eternalSpring: {
    temperatureByMonth: series([27, 27, 27, 27, 27, 27, 27, 27, 27, 26, 26, 26]),
    rainfallByMonth: series([85, 95, 135, 185, 215, 145, 120, 130, 165, 205, 175, 110])
  },
  tropicalSavanna: {
    temperatureByMonth: series([31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31]),
    rainfallByMonth: series([4, 1, 2, 18, 85, 125, 155, 162, 148, 114, 36, 9])
  },
  rioTropical: {
    temperatureByMonth: series([31, 31, 30, 28, 26, 25, 25, 25, 26, 27, 28, 30]),
    rainfallByMonth: series([137, 121, 138, 104, 83, 56, 49, 44, 72, 89, 96, 132])
  },
  saoPauloPlateau: {
    temperatureByMonth: series([28, 28, 27, 25, 22, 21, 21, 23, 24, 25, 26, 27]),
    rainfallByMonth: series([240, 215, 180, 95, 75, 55, 45, 40, 85, 125, 145, 205])
  },
  curitibaMild: {
    temperatureByMonth: series([26, 26, 24, 22, 19, 18, 18, 19, 20, 22, 24, 25]),
    rainfallByMonth: series([180, 155, 130, 95, 100, 90, 85, 80, 110, 125, 120, 155])
  },
  caracasTropical: {
    temperatureByMonth: series([29, 29, 30, 30, 29, 28, 28, 29, 29, 29, 29, 29]),
    rainfallByMonth: series([13, 10, 12, 35, 72, 106, 111, 110, 126, 104, 63, 24])
  },
  quitoHighland: {
    temperatureByMonth: series([19, 19, 19, 19, 19, 18, 18, 19, 19, 19, 19, 19]),
    rainfallByMonth: series([117, 126, 162, 176, 135, 70, 38, 43, 91, 143, 120, 116])
  },
  asuncionHeat: {
    temperatureByMonth: series([34, 33, 31, 28, 24, 22, 23, 25, 27, 30, 32, 34]),
    rainfallByMonth: series([140, 128, 123, 142, 121, 74, 46, 70, 97, 141, 138, 133])
  },
  laPazAltitude: {
    temperatureByMonth: series([14, 14, 14, 14, 13, 12, 12, 13, 14, 15, 15, 14]),
    rainfallByMonth: series([130, 95, 65, 26, 8, 4, 6, 11, 23, 42, 69, 105])
  },
  santaCruzWarm: {
    temperatureByMonth: series([32, 32, 31, 29, 26, 24, 24, 27, 29, 31, 32, 32]),
    rainfallByMonth: series([180, 155, 145, 96, 72, 51, 38, 46, 68, 110, 132, 165])
  },
  cochabambaSpring: {
    temperatureByMonth: series([27, 27, 27, 27, 26, 25, 25, 26, 27, 28, 28, 27]),
    rainfallByMonth: series([115, 92, 68, 18, 6, 5, 4, 8, 18, 32, 49, 83])
  },
  sanSalvadorWarm: {
    temperatureByMonth: series([31, 32, 33, 33, 31, 30, 30, 30, 30, 30, 30, 30]),
    rainfallByMonth: series([6, 5, 10, 42, 192, 300, 285, 265, 305, 250, 60, 12])
  },
  cuencaHighland: {
    temperatureByMonth: series([17, 17, 16, 16, 16, 15, 15, 16, 16, 16, 16, 17]),
    rainfallByMonth: series([50, 65, 120, 110, 80, 40, 30, 35, 60, 100, 90, 65])
  },
  arequipaHighland: {
    temperatureByMonth: series([17, 17, 16, 15, 13, 12, 11, 12, 14, 16, 17, 17]),
    rainfallByMonth: series([28, 24, 16, 4, 1, 0, 0, 1, 2, 5, 12, 24])
  },
  salvadorCoastal: {
    temperatureByMonth: series([28, 28, 27, 27, 26, 25, 25, 25, 26, 27, 27, 28]),
    rainfallByMonth: series([70, 80, 170, 300, 285, 190, 150, 100, 85, 90, 120, 90])
  },
  cartagenaCaribbean: {
    temperatureByMonth: series([31, 31, 31, 32, 32, 31, 31, 31, 31, 31, 31, 31]),
    rainfallByMonth: series([15, 5, 3, 5, 70, 130, 145, 155, 165, 165, 120, 40])
  },
  cuscoAltitude: {
    temperatureByMonth: series([13, 13, 13, 12, 11, 9, 9, 10, 12, 14, 14, 13]),
    rainfallByMonth: series([145, 120, 100, 45, 8, 2, 2, 5, 22, 60, 95, 130])
  },
  trujilloCoastal: {
    temperatureByMonth: series([24, 25, 24, 22, 20, 18, 17, 17, 18, 19, 21, 23]),
    rainfallByMonth: series([0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0])
  },
  bucaramangaClimate: {
    temperatureByMonth: series([25, 25, 25, 24, 24, 24, 25, 26, 25, 24, 24, 25]),
    rainfallByMonth: series([55, 80, 120, 165, 135, 75, 50, 50, 95, 155, 140, 70])
  },
  pereiraCoffee: {
    temperatureByMonth: series([22, 22, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22]),
    rainfallByMonth: series([115, 135, 195, 215, 175, 100, 75, 80, 135, 195, 205, 140])
  },
  sanJoseHighland: {
    temperatureByMonth: series([22, 23, 24, 25, 26, 26, 25, 26, 26, 25, 24, 22]),
    rainfallByMonth: series([15, 5, 10, 40, 215, 235, 185, 255, 285, 295, 145, 30])
  },
  cordobaArgentina: {
    temperatureByMonth: series([27, 26, 24, 20, 17, 13, 12, 14, 17, 21, 24, 26]),
    rainfallByMonth: series([85, 75, 90, 55, 35, 20, 15, 15, 28, 55, 75, 80])
  },
  manausEquatorial: {
    temperatureByMonth: series([28, 28, 28, 28, 28, 28, 28, 29, 30, 30, 30, 29]),
    rainfallByMonth: series([290, 290, 310, 285, 205, 100, 65, 45, 65, 100, 140, 205])
  },
  beloHorizonteClimate: {
    temperatureByMonth: series([26, 27, 26, 24, 22, 20, 20, 22, 24, 25, 25, 26]),
    rainfallByMonth: series([270, 215, 175, 60, 25, 10, 8, 12, 40, 110, 185, 250])
  },
  florianopolisClimate: {
    temperatureByMonth: series([28, 28, 27, 24, 21, 19, 19, 20, 21, 23, 25, 27]),
    rainfallByMonth: series([185, 175, 155, 110, 115, 90, 80, 75, 115, 140, 150, 165])
  },
  fortalezaClimate: {
    temperatureByMonth: series([30, 30, 30, 29, 29, 29, 29, 29, 30, 30, 30, 30]),
    rainfallByMonth: series([210, 295, 355, 340, 195, 75, 30, 15, 10, 15, 25, 85])
  },
  recifeClimate: {
    temperatureByMonth: series([30, 30, 30, 29, 28, 27, 27, 27, 28, 29, 30, 30]),
    rainfallByMonth: series([100, 125, 210, 320, 360, 340, 270, 190, 115, 65, 55, 70])
  },
  meridaClimate: {
    temperatureByMonth: series([24, 26, 29, 33, 34, 33, 32, 33, 32, 30, 27, 24]),
    rainfallByMonth: series([25, 18, 10, 18, 75, 155, 145, 145, 165, 115, 40, 28])
  },
  leonMexicoClimate: {
    temperatureByMonth: series([18, 20, 23, 26, 28, 27, 25, 25, 24, 22, 20, 18]),
    rainfallByMonth: series([8, 5, 5, 8, 25, 135, 190, 175, 135, 55, 12, 6])
  },
  tegucigalpaClimate: {
    temperatureByMonth: series([24, 25, 27, 28, 28, 27, 26, 27, 26, 25, 24, 23]),
    rainfallByMonth: series([8, 5, 8, 22, 105, 145, 75, 95, 145, 120, 40, 12])
  },
  guatemalaCityClimate: {
    temperatureByMonth: series([19, 20, 22, 23, 23, 22, 22, 22, 22, 21, 20, 19]),
    rainfallByMonth: series([5, 3, 10, 40, 155, 250, 200, 215, 240, 175, 40, 10])
  },
  managuaClimate: {
    temperatureByMonth: series([31, 32, 34, 35, 35, 32, 31, 31, 31, 31, 31, 31]),
    rainfallByMonth: series([4, 2, 3, 12, 130, 200, 105, 145, 190, 175, 55, 10])
  },
  sanPedroSulaClimate: {
    temperatureByMonth: series([24, 25, 27, 28, 28, 27, 27, 27, 27, 26, 25, 24]),
    rainfallByMonth: series([35, 20, 18, 40, 110, 135, 95, 100, 145, 145, 80, 40])
  },
  valparaisoClimate: {
    temperatureByMonth: series([20, 20, 18, 16, 13, 11, 10, 11, 13, 15, 17, 19]),
    rainfallByMonth: series([2, 2, 5, 12, 45, 85, 95, 70, 35, 14, 6, 3])
  },
  concepcionClimate: {
    temperatureByMonth: series([19, 19, 17, 14, 11, 9, 8, 9, 11, 14, 16, 18]),
    rainfallByMonth: series([38, 35, 55, 95, 155, 190, 210, 175, 125, 80, 55, 42])
  },
  mendozaClimate: {
    temperatureByMonth: series([29, 28, 25, 20, 15, 11, 10, 13, 17, 21, 25, 28]),
    rainfallByMonth: series([28, 24, 18, 10, 8, 6, 5, 5, 8, 12, 18, 24])
  },
  portoAlegreClimate: {
    temperatureByMonth: series([26, 26, 24, 21, 18, 15, 14, 15, 17, 20, 22, 25]),
    rainfallByMonth: series([105, 100, 110, 115, 105, 115, 115, 130, 130, 130, 110, 100])
  },
  panamaCityClimate: {
    temperatureByMonth: series([32, 32, 33, 33, 32, 32, 32, 32, 32, 32, 31, 31]),
    rainfallByMonth: series([30, 20, 8, 15, 195, 225, 195, 215, 220, 285, 280, 90])
  },
  sucreClimateBo: {
    temperatureByMonth: series([16, 16, 15, 14, 13, 11, 11, 13, 14, 15, 16, 16]),
    rainfallByMonth: series([100, 88, 60, 14, 4, 2, 2, 3, 12, 32, 62, 88])
  },
  ibagueColombia: {
    temperatureByMonth: series([28, 28, 27, 27, 27, 28, 28, 28, 27, 26, 26, 27]),
    rainfallByMonth: series([55, 80, 120, 185, 165, 90, 60, 65, 120, 195, 160, 80])
  },
  santaMartaCaribbean: {
    temperatureByMonth: series([30, 30, 31, 32, 32, 31, 31, 31, 31, 31, 30, 30]),
    rainfallByMonth: series([2, 2, 2, 8, 35, 40, 28, 45, 65, 90, 60, 10])
  },
  chiclayoCoastal: {
    temperatureByMonth: series([30, 31, 30, 28, 25, 22, 21, 21, 22, 24, 27, 29]),
    rainfallByMonth: series([0, 0, 0, 0, 1, 3, 5, 3, 1, 0, 0, 0])
  },
  piuraDesert: {
    temperatureByMonth: series([31, 32, 32, 30, 27, 24, 23, 23, 24, 26, 28, 30]),
    rainfallByMonth: series([25, 20, 5, 0, 0, 0, 0, 0, 0, 3, 10, 15])
  },
  iquitosAmazon: {
    temperatureByMonth: series([28, 28, 28, 28, 28, 28, 28, 29, 29, 29, 29, 29]),
    rainfallByMonth: series([350, 320, 330, 280, 210, 140, 120, 130, 180, 240, 310, 360])
  },
  chimboteCoastal: {
    temperatureByMonth: series([26, 27, 26, 24, 21, 19, 18, 18, 19, 21, 23, 25]),
    rainfallByMonth: series([0, 0, 0, 1, 2, 5, 8, 6, 2, 0, 0, 0])
  },
  guayaquilTropical: {
    temperatureByMonth: series([29, 30, 30, 29, 28, 26, 25, 25, 26, 27, 28, 29]),
    rainfallByMonth: series([250, 285, 280, 185, 65, 15, 5, 10, 25, 45, 120, 200])
  },
  santoDomingoClimate: {
    temperatureByMonth: series([25, 25, 26, 25, 25, 24, 24, 24, 25, 25, 25, 25]),
    rainfallByMonth: series([215, 235, 290, 300, 280, 165, 120, 125, 155, 235, 280, 250])
  },
  mantaCoastal: {
    temperatureByMonth: series([28, 29, 29, 28, 27, 25, 24, 24, 25, 26, 27, 28]),
    rainfallByMonth: series([150, 180, 190, 120, 30, 5, 2, 3, 10, 35, 85, 130])
  },
  cucutaBorder: {
    temperatureByMonth: series([31, 32, 33, 32, 31, 30, 30, 31, 30, 30, 30, 31]),
    rainfallByMonth: series([45, 40, 85, 125, 95, 40, 25, 30, 65, 140, 145, 80])
  },
  manizalesCloud: {
    temperatureByMonth: series([20, 20, 20, 19, 19, 19, 19, 19, 19, 19, 19, 20]),
    rainfallByMonth: series([270, 280, 320, 340, 300, 230, 180, 190, 250, 340, 360, 310])
  },
  villavicencioLlano: {
    temperatureByMonth: series([27, 27, 28, 28, 27, 26, 26, 27, 27, 27, 27, 27]),
    rainfallByMonth: series([85, 120, 165, 215, 185, 95, 55, 65, 135, 225, 215, 125])
  },
  pastoPotential: {
    temperatureByMonth: series([17, 17, 17, 17, 16, 16, 16, 16, 17, 17, 17, 17]),
    rainfallByMonth: series([105, 120, 140, 160, 140, 95, 75, 85, 110, 155, 145, 120])
  },
  monteriaCaribb: {
    temperatureByMonth: series([31, 32, 32, 32, 31, 30, 30, 30, 31, 31, 31, 31]),
    rainfallByMonth: series([35, 20, 15, 25, 60, 85, 95, 90, 110, 145, 130, 60])
  },
  valleduparCaribbean: {
    temperatureByMonth: series([31, 32, 33, 32, 31, 30, 30, 31, 31, 31, 31, 31]),
    rainfallByMonth: series([20, 10, 5, 10, 30, 50, 55, 60, 80, 120, 100, 40])
  },
  armeniaClimate: {
    temperatureByMonth: series([22, 22, 23, 22, 22, 22, 22, 22, 22, 22, 22, 22]),
    rainfallByMonth: series([145, 165, 210, 245, 210, 140, 100, 110, 165, 245, 255, 180])
  },
  oruLoClimate: {
    temperatureByMonth: series([11, 11, 10, 9, 8, 6, 6, 7, 9, 10, 11, 11]),
    rainfallByMonth: series([60, 45, 30, 8, 2, 1, 2, 5, 15, 25, 40, 55])
  }
}

const cityProfilesByName: Record<string, CityProfile> = {
  Guadalajara: {
    id: 'guadalajara',
    name: 'Guadalajara',
    country: 'Mexico',
    coordinates: [-103.3496, 20.6597],
    snapshot: {
      populationMetro: '5.3M',
      altitudeM: 1566,
      landscape: 'Highland basin with nearby mountains',
      purchasingPowerRank: 7,
      internet: { downloadMbps: 128, uploadMbps: 46, latencyMs: 18 },
      ...climate.mexicanHighland
    },
    details: {
      tagline: 'Mexico’s most balanced large city for climate, cost, and creative energy.',
      overview: 'Guadalajara pairs a strong startup scene with walkable pockets like Americana and Providencia. It feels large without the sensory overload of Mexico City and gives quick access to Tequila country and western mountain escapes.',
      bestFor: ['Product teams with hybrid schedules', 'Good café density', 'Mild winter working months'],
      watchouts: ['Rainy summer afternoons are intense', 'Car traffic adds friction outside core neighborhoods', 'English is less common than in CDMX hotspots'],
      neighborhoods: ['Americana', 'Providencia', 'Lafayette', 'Chapalita'],
      mobility: 'Uber works well, the light rail is useful on core lines, and most nomad-friendly areas are easy to stitch together by ride share.',
      climateNote: 'Dry and bright from November to May, stormy but still warm in summer.',
      workstyle: 'Coworking supply is solid and coffee shops are laptop-friendly without being overly polished.',
      pace: 'Social and youthful with a strong design and maker streak.',
      airport: {
        description: 'GDL with strong domestic links and good US connections.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Roughly 45 to 90 minutes to forest trails and lakeside day trips.'
    }
  },
  'Buenos Aires': {
    id: 'buenos-aires',
    name: 'Buenos Aires',
    country: 'Argentina',
    coordinates: [-58.3816, -34.6037],
    snapshot: {
      populationMetro: '15.6M',
      altitudeM: 25,
      landscape: 'Flat river plain',
      purchasingPowerRank: 10,
      internet: { downloadMbps: 182, uploadMbps: 79, latencyMs: 14 },
      ...climate.riverPlate
    },
    details: {
      tagline: 'A huge cultural capital with late nights, elegant streets, and deep urban variety.',
      overview: 'Buenos Aires rewards people who want a full city rather than a beach base. Palermo, Recoleta, and Colegiales make daily life easy, while the peso cycle can create long windows of good value for remote earners.',
      bestFor: ['Writers and designers', 'Big-city social life', 'Long café work sessions'],
      watchouts: ['Economic volatility affects pricing and payments', 'Summer can feel muggy', 'Petty theft awareness matters'],
      neighborhoods: ['Palermo', 'Recoleta', 'Belgrano', 'Colegiales'],
      mobility: 'Subte, buses, and rideshare form a practical network; many daily routines are walkable in the northern neighborhoods.',
      climateNote: 'Best working season is March to May or September to November.',
      workstyle: 'Rich café culture and reliable apartment internet make home-and-café work common.',
      pace: 'Dense, expressive, and extremely social after dark.',
      airport: {
        description: 'EZE for long-haul and AEP for regional hops.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Urban first; delta boat trips and estancias are more weekend than daily escapes.'
    }
  },
  Santiago: {
    id: 'santiago',
    name: 'Santiago',
    country: 'Chile',
    coordinates: [-70.6693, -33.4489],
    snapshot: {
      populationMetro: '7.1M',
      altitudeM: 520,
      landscape: 'Valley ringed by the Andes',
      purchasingPowerRank: 5,
      internet: { downloadMbps: 240, uploadMbps: 140, latencyMs: 12 },
      ...climate.santiagoMediterranean
    },
    details: {
      tagline: 'Fast infrastructure and Andes access make Santiago quietly excellent for focused work.',
      overview: 'Santiago is one of the easiest cities in the region for reliable services, transit, and broadband. Providencia and Las Condes skew polished, while Barrio Italia offers more texture and independent cafés.',
      bestFor: ['Reliable infrastructure', 'Mountain weekends', 'Teams with lots of video calls'],
      watchouts: ['Winter air quality can dip', 'Costs are above regional average', 'The corporate districts can feel sterile'],
      neighborhoods: ['Providencia', 'Las Condes', 'Barrio Italia', 'Vitacura'],
      mobility: 'Metro coverage is excellent and ride share fills the last-mile gaps efficiently.',
      climateNote: 'Sunny and dry most of the year with a cool wet winter.',
      workstyle: 'Strong broadband and orderly daily routines suit people who value predictability.',
      pace: 'Reserved by Latin American mega-city standards, but efficient.',
      airport: {
        description: 'SCL with strong South America coverage and many long-haul options.',
        rideshareFromAirport: false,
        rideshareNote: 'Rideshare apps are not permitted at SCL — use the official taxi rank in the arrivals hall.',
      },
      timeToNature: 'Ski areas and mountain trails are day-trip close in season.'
    }
  },
  Lima: {
    id: 'lima',
    name: 'Lima',
    country: 'Peru',
    coordinates: [-77.0428, -12.0464],
    snapshot: {
      populationMetro: '11.2M',
      altitudeM: 154,
      landscape: 'Coastal cliffs and urban lowlands',
      purchasingPowerRank: 12,
      internet: { downloadMbps: 156, uploadMbps: 72, latencyMs: 20 },
      ...climate.limaCoastal
    },
    details: {
      tagline: 'Ocean views, world-class food, and a steady coastal climate with almost no rain.',
      overview: 'Lima works best if you stay near Miraflores, Barranco, or San Isidro, where the city feels organized and walkable enough for day-to-day remote work. The gray winter marine layer is real, but the food scene and Pacific edge compensate.',
      bestFor: ['Food-first travelers', 'Stable temperatures', 'Coastal running routes'],
      watchouts: ['Traffic can be punishing', 'Winter gloom is persistent', 'Quality shifts sharply outside the core districts'],
      neighborhoods: ['Miraflores', 'Barranco', 'San Isidro', 'Magdalena del Mar'],
      mobility: 'Rideshare dominates for comfort; BRT is useful in spots but less attractive for visitors.',
      climateNote: 'Warmest and brightest from December through April.',
      workstyle: 'A good apartment base city with enough cafés and some stronger hotel-lobby workspaces.',
      pace: 'Busy but not hyperactive, especially by the coast.',
      airport: {
        description: 'LIM is the region’s major connecting hub.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Surf and cliff walks are immediate; mountain hikes are longer outings.'
    }
  },
  'Bogotá': {
    id: 'bogota',
    name: 'Bogotá',
    country: 'Colombia',
    coordinates: [-74.0721, 4.711],
    snapshot: {
      populationMetro: '10.8M',
      altitudeM: 2640,
      landscape: 'High plateau with eastern mountains',
      purchasingPowerRank: 11,
      internet: { downloadMbps: 143, uploadMbps: 64, latencyMs: 19 },
      ...climate.bogotaHighland
    },
    details: {
      tagline: 'High-altitude capital with strong work infrastructure and a serious urban energy.',
      overview: 'Bogotá gives you a real capital-city scale with modern coworking, broad food options, and walkable northern districts. The altitude and weather demand adjustment, but in exchange you get mild afternoons year-round and easy domestic flight access.',
      bestFor: ['People who like cooler weather', 'Frequent domestic travel', 'Business-style infrastructure'],
      watchouts: ['Altitude hits some people hard', 'Traffic planning matters every day', 'Rain can roll in quickly'],
      neighborhoods: ['Chapinero Alto', 'Zona G', 'Parque 93', 'Usaquén'],
      mobility: 'Rideshare is practical, while TransMilenio is fast but often crowded.',
      climateNote: 'Mild year-round with pronounced wet periods in spring and autumn.',
      workstyle: 'Strong coworking market and many polished cafés in the north.',
      pace: 'Intense, professional, and varied.',
      airport: {
        description: 'BOG is one of the best-connected hubs in Latin America.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Cloud forest and mountain viewpoints are close if you start early.'
    }
  },
  'Mexico City': {
    id: 'mexico-city',
    name: 'Mexico City',
    country: 'Mexico',
    coordinates: [-99.1332, 19.4326],
    snapshot: {
      populationMetro: '22.5M',
      altitudeM: 2240,
      landscape: 'Highland basin with surrounding volcanoes',
      purchasingPowerRank: 4,
      internet: { downloadMbps: 178, uploadMbps: 78, latencyMs: 16 },
      ...climate.mexicanHighland
    },
    details: {
      tagline: 'The region’s heavyweight city for depth, variety, and creative momentum.',
      overview: 'Mexico City is a world-class urban base if you want constant novelty and a strong remote-work ecosystem. Roma Norte, Condesa, Juárez, and Polanco each offer a different flavor, and you can build a long stay without exhausting the city.',
      bestFor: ['Long stays', 'Creative industries', 'People who want density and choice'],
      watchouts: ['Pollution and altitude can be a rough first week', 'Rents in top neighborhoods are no longer cheap', 'The city rewards local knowledge'],
      neighborhoods: ['Roma Norte', 'Condesa', 'Juárez', 'Polanco'],
      mobility: 'Metro plus walking works in select districts; otherwise rideshare is the friction-reducer.',
      climateNote: 'Pleasant for most of the year, with strongest rains from June to September.',
      workstyle: 'Huge café and coworking selection with strong event density for networking.',
      pace: 'High stimulation and highly rewarding if that is what you want.',
      airport: {
        description: 'MEX with a vast domestic network plus AIFA overflow.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Forest parks are inside the city and proper mountain escapes are weekend-ready.'
    }
  },
  'Medellín': {
    id: 'medellin',
    name: 'Medellín',
    country: 'Colombia',
    coordinates: [-75.5636, 6.2518],
    snapshot: {
      populationMetro: '4.1M',
      altitudeM: 1495,
      landscape: 'Mountain valley',
      purchasingPowerRank: 8,
      internet: { downloadMbps: 170, uploadMbps: 78, latencyMs: 17 },
      ...climate.eternalSpring
    },
    details: {
      tagline: 'The classic eternal-spring nomad city, still attractive when used selectively.',
      overview: 'Medellín remains strong for weather, apartments, and accessible city living, especially in Laureles and parts of El Poblado. It is no longer an undiscovered bargain, but the climate and day-to-day convenience keep it in the conversation.',
      bestFor: ['Mild weather every month', 'Apartment-based stays', 'Social nomad hubs'],
      watchouts: ['Tourist concentration changes the feel in hot spots', 'Heavy rain stretches happen', 'You need judgment on neighborhood selection'],
      neighborhoods: ['Laureles', 'El Poblado', 'Envigado', 'Sabaneta'],
      mobility: 'Metro plus cable cars are great for coverage, and rideshare is easy.',
      climateNote: 'Warm, mild, and wet enough that an umbrella stays relevant.',
      workstyle: 'Good coworking density and abundant furnished rentals.',
      pace: 'Easygoing on the surface, very active socially.',
      airport: {
        description: 'MDE with strong domestic connectivity.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Green hills and reservoir trips are straightforward day outings.'
    }
  },
  Cali: {
    id: 'cali',
    name: 'Cali',
    country: 'Colombia',
    coordinates: [-76.532, 3.4516],
    snapshot: {
      populationMetro: '2.8M',
      altitudeM: 1018,
      landscape: 'Valley with western cordillera backdrop',
      purchasingPowerRank: 16,
      internet: { downloadMbps: 112, uploadMbps: 44, latencyMs: 24 },
      ...climate.tropicalSavanna
    },
    details: {
      tagline: 'A salsa-first city with warmth, speed, and a less polished remote-work scene.',
      overview: 'Cali offers lower prices and a distinct cultural identity, especially if you care about dance, music, and a more local atmosphere. It is workable for remote living, but the premium nomad infrastructure is thinner than Medellín or Bogotá.',
      bestFor: ['Music and dance lovers', 'Lower cost city living', 'Short immersion stays'],
      watchouts: ['Fewer polished coworking options', 'Heat is constant', 'Neighborhood choice matters a lot for comfort'],
      neighborhoods: ['Granada', 'San Antonio', 'Ciudad Jardín', 'El Peñón'],
      mobility: 'Rideshare is simplest; the BRT helps selectively.',
      climateNote: 'Hot and fairly steady, with wetter months mid-year and in autumn.',
      workstyle: 'Better for apartment-first routines than all-day café hopping.',
      pace: 'Expressive, musical, and fast-moving.',
      airport: {
        description: 'CLO with solid domestic links.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Cloud forest escapes and mountain roads are close.'
    }
  },
  'Rio de Janeiro': {
    id: 'rio-de-janeiro',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    coordinates: [-43.1729, -22.9068],
    snapshot: {
      populationMetro: '13.7M',
      altitudeM: 2,
      landscape: 'Coastal mountains and beaches',
      purchasingPowerRank: 9,
      internet: { downloadMbps: 196, uploadMbps: 98, latencyMs: 15 },
      ...climate.rioTropical
    },
    details: {
      tagline: 'Few cities match Rio for scenery, but it demands stronger street awareness.',
      overview: 'Rio can be incredible for remote work if you structure your life around safer, well-serviced zones like Ipanema, Leblon, and Botafogo. You get mountain-meets-ocean drama every day, plus a culture that makes even routine errands feel vivid.',
      bestFor: ['Outdoor-heavy lifestyles', 'Beach runs before work', 'People who thrive on visual energy'],
      watchouts: ['Security awareness is non-negotiable', 'Humidity can wear on you', 'Costs in the South Zone add up'],
      neighborhoods: ['Ipanema', 'Leblon', 'Botafogo', 'Flamengo'],
      mobility: 'Metro and rideshare cover most practical movement in favored zones.',
      climateNote: 'Warm all year with wetter, stickier summer months.',
      workstyle: 'Best if you work from home or from a few known cafés rather than constant roaming.',
      pace: 'Relaxed in posture, high-energy in feeling.',
      airport: {
        description: 'GIG for international and SDU for domestic convenience.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Nature is baked into the city through trails, peaks, lagoons, and beaches.'
    }
  },
  Barranquilla: {
    id: 'barranquilla',
    name: 'Barranquilla',
    country: 'Colombia',
    coordinates: [-74.8069, 10.9685],
    snapshot: {
      populationMetro: '2.4M',
      altitudeM: 18,
      landscape: 'Caribbean lowlands near the Magdalena River',
      purchasingPowerRank: 18,
      internet: { downloadMbps: 95, uploadMbps: 35, latencyMs: 27 },
      ...climate.tropicalSavanna
    },
    details: {
      tagline: 'A practical Caribbean work base if you want heat, commerce, and lower prices.',
      overview: 'Barranquilla is more businesslike than postcard-pretty, but it has strong local energy and useful proximity to beach towns and Cartagena. It works better as a grounded local-city stay than as a polished nomad showcase.',
      bestFor: ['Caribbean access without Cartagena prices', 'Spanish immersion', 'Short practical stays'],
      watchouts: ['Heat and humidity are heavy', 'Less walkable charm than coastal competitors', 'Premium remote-work infrastructure is limited'],
      neighborhoods: ['Alto Prado', 'Villa Country', 'Riomar', 'El Golf'],
      mobility: 'Taxi and rideshare dominate; car-based movement is common.',
      climateNote: 'Very hot year-round with a wetter late summer and autumn.',
      workstyle: 'Better from apartments or hotels than from café circuits.',
      pace: 'Commercial, festive, and loud when carnival season approaches.',
      airport: {
        description: 'BAQ with easy domestic access.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Beaches and mangrove areas are easy day trips.'
    }
  },
  'São Paulo': {
    id: 'sao-paulo',
    name: 'São Paulo',
    country: 'Brazil',
    coordinates: [-46.6333, -23.5505],
    snapshot: {
      populationMetro: '22.4M',
      altitudeM: 760,
      landscape: 'Plateau metropolis',
      purchasingPowerRank: 3,
      internet: { downloadMbps: 224, uploadMbps: 116, latencyMs: 11 },
      ...climate.saoPauloPlateau
    },
    details: {
      tagline: 'The strongest big-city work machine in South America.',
      overview: 'São Paulo is not scenic in the obvious sense, but it is unmatched for business infrastructure, food depth, and professional density. Pinheiros and Vila Madalena are the usual remote-work sweet spots, with Avenida Paulista staying useful for transit and meetings.',
      bestFor: ['Founders and operators', 'Frequent meetings', 'People who value depth over prettiness'],
      watchouts: ['Traffic is constant', 'The scale can feel relentless', 'Good neighborhoods are not cheap'],
      neighborhoods: ['Pinheiros', 'Vila Madalena', 'Jardins', 'Paulista'],
      mobility: 'Metro is strong on main corridors and rideshare closes the gaps.',
      climateNote: 'Warm and humid in summer, pleasantly mild in winter.',
      workstyle: 'Excellent coworking, specialty coffee, and meeting-friendly venues.',
      pace: 'Serious, fast, and inexhaustible.',
      airport: {
        description: 'GRU for global links and CGH for domestic speed.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Atlantic forest and beach escapes are weekend-easy but not instant.'
    }
  },
  Curitiba: {
    id: 'curitiba',
    name: 'Curitiba',
    country: 'Brazil',
    coordinates: [-49.2733, -25.4284],
    snapshot: {
      populationMetro: '3.8M',
      altitudeM: 934,
      landscape: 'High plateau with abundant parks',
      purchasingPowerRank: 6,
      internet: { downloadMbps: 205, uploadMbps: 92, latencyMs: 12 },
      ...climate.curitibaMild
    },
    details: {
      tagline: 'A cleaner, cooler Brazilian city with strong urban planning and fewer distractions.',
      overview: 'Curitiba is often overlooked, which is part of the appeal. It is organized, greener than most large cities in the region, and feels practical for long, quiet work stretches with good services and fewer tourism distortions.',
      bestFor: ['Focused solo work', 'Cooler weather in Brazil', 'Long-stay routines'],
      watchouts: ['Can feel subdued if you want high social energy', 'Winter is damp and gray', 'English support is limited'],
      neighborhoods: ['Batel', 'Bigorrilho', 'Centro Cívico', 'Água Verde'],
      mobility: 'BRT heritage makes bus travel unusually workable, plus rideshare is easy.',
      climateNote: 'Cooler and wetter than many expect from Brazil.',
      workstyle: 'Strong apartment city with a steady café layer rather than a flashy scene.',
      pace: 'Measured, efficient, and low-drama.',
      airport: {
        description: 'CWB with good domestic service.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Parks are everywhere and the coast is reachable for weekends.'
    }
  },
  Caracas: {
    id: 'caracas',
    name: 'Caracas',
    country: 'Venezuela',
    coordinates: [-66.9036, 10.4806],
    snapshot: {
      populationMetro: '3.0M',
      altitudeM: 900,
      landscape: 'Mountain valley near the Caribbean coast',
      purchasingPowerRank: 20,
      internet: { downloadMbps: 62, uploadMbps: 24, latencyMs: 38 },
      ...climate.caracasTropical
    },
    details: {
      tagline: 'Dramatic setting and local warmth, but currently the highest-friction option on this map.',
      overview: 'Caracas has a striking mountain backdrop and a sophisticated urban history, but current operational realities make it difficult for most remote workers. The city can still be meaningful for people with strong local ties and clear on-the-ground support.',
      bestFor: ['Travelers with family or existing networks', 'Short visits with local guidance', 'People prioritizing cultural familiarity'],
      watchouts: ['Infrastructure reliability varies sharply', 'Security and payments require planning', 'Not a casual plug-and-play nomad base'],
      neighborhoods: ['Altamira', 'Los Palos Grandes', 'La Castellana', 'Chacao'],
      mobility: 'Movement is easiest with trusted taxis, drivers, and local advice.',
      climateNote: 'Warm year-round with a wetter middle of the year.',
      workstyle: 'Best approached with strong local hosting rather than independent setup.',
      pace: 'Fast, improvised, and highly context-dependent.',
      airport: {
        description: 'CCS for regional access, subject to operational variability.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Mountain viewpoints and the coast are geographically close.'
    }
  },
  Quito: {
    id: 'quito',
    name: 'Quito',
    country: 'Ecuador',
    coordinates: [-78.4678, -0.1807],
    snapshot: {
      populationMetro: '2.8M',
      altitudeM: 2850,
      landscape: 'Andean valley with volcanic skyline',
      purchasingPowerRank: 14,
      internet: { downloadMbps: 118, uploadMbps: 51, latencyMs: 23 },
      ...climate.quitoHighland
    },
    details: {
      tagline: 'A dramatic high-altitude capital with strong scenery and manageable scale.',
      overview: 'Quito is smaller and more contained than Bogotá, with a handsome historic center and practical modern zones in the north. The altitude, sun intensity, and quick weather shifts define daily life, but the city feels rewarding for people who like mountain capitals.',
      bestFor: ['Scenic urban living', 'Lower-cost Andean base', 'People who enjoy cooler days'],
      watchouts: ['Altitude is a real factor', 'Rain and sun can flip quickly', 'Infrastructure is solid but less polished than Chile or São Paulo'],
      neighborhoods: ['La Carolina', 'La Floresta', 'González Suárez', 'Cumbayá'],
      mobility: 'Metro now helps north-south movement, with rideshare still useful.',
      climateNote: 'Spring-like temperatures all year with distinct wetter stretches.',
      workstyle: 'Good fit for apartment routines and a smaller café rotation.',
      pace: 'Measured and more compact than most capitals on this list.',
      airport: {
        description: 'UIO with decent regional access.',
        rideshareFromAirport: false,
        rideshareNote: 'Rideshare apps cannot pick up at UIO — book an official airport transfer or use the taxi desk in arrivals.',
      },
      timeToNature: 'Volcanic viewpoints and cloud forest escapes are close.',
      restaurants: [
        { name: 'Somos Ecuador Restaurante', note: 'Regional Ecuadorian cooking in a warm, no-fuss setting — one of the best ways to eat local in Quito', link: 'https://www.google.com/maps/place/Somos+Ecuador+Restaurante/@-0.1826728,-78.4805985,17z/data=!3m1!4b1!4m6!3m5!1s0x91d59b558de798cf:0xf810e099a48a864a!8m2!3d-0.1826782!4d-78.4759904!16s%2Fg%2F11l8glkhv5!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D' },
        { name: 'NUEMA', note: 'Modern tasting menus built around Andean biodiversity — the most ambitious table in the city', link: 'https://www.google.com/maps/place/NUEMA/@-0.1981843,-78.4851386,17z/data=!3m1!4b1!4m6!3m5!1s0x91d5997942f86bf1:0xf1e5cf13911f8da5!8m2!3d-0.1981897!4d-78.4825583!16s%2Fg%2F11fj6p1_68!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D' },
        { name: 'Clara', note: 'Focused menu, calm room, good light — the kind of neighborhood spot that earns a second visit', link: 'https://www.google.com/maps/place/Clara+Restaurante/@-0.2066458,-78.488334,17z/data=!3m1!4b1!4m6!3m5!1s0x91d59b2a850bedd1:0x644ec64910d224ed!8m2!3d-0.2066512!4d-78.4857537!16s%2Fg%2F11y2ch0bjs!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D' }
      ],
      cafes: [
        { name: 'Strato' },
        { name: 'Fankor' }
      ],
      bars: [
        { name: 'Xqueje' },
        { name: 'Vermuteria' },
        { name: 'Plural Drinks' },
        { name: 'Síncopa Bar' }
      ]
    }
  },
  Montevideo: {
    id: 'montevideo',
    name: 'Montevideo',
    country: 'Uruguay',
    coordinates: [-56.1645, -34.9011],
    snapshot: {
      populationMetro: '1.9M',
      altitudeM: 43,
      landscape: 'Coastal plains on the Río de la Plata',
      purchasingPowerRank: 2,
      internet: { downloadMbps: 230, uploadMbps: 127, latencyMs: 10 },
      ...climate.riverPlate
    },
    details: {
      tagline: 'Small, calm, and reliable with one of the strongest infrastructure baselines in the region.',
      overview: 'Montevideo is excellent if you value stability more than novelty. Pocitos, Punta Carretas, and Cordón give you easy day-to-day living, fast internet, and long rambla walks, though the city is noticeably pricier relative to the intensity of what it offers.',
      bestFor: ['Quiet long stays', 'Reliable internet and utilities', 'People who want low-friction daily life'],
      watchouts: ['Prices are high for the region', 'Nightlife is limited compared with larger capitals', 'Winters can feel windy and gray'],
      neighborhoods: ['Pocitos', 'Punta Carretas', 'Cordón', 'Parque Rodó'],
      mobility: 'Bus network is decent and many daily routines remain walkable.',
      climateNote: 'Four seasons, with pleasant shoulder months and humid summers.',
      workstyle: 'Excellent home-office city with steady services.',
      pace: 'Slow, civilized, and understated.',
      airport: {
        description: 'MVD with regional service and easy Buenos Aires links.',
        rideshareFromAirport: true,
      },
      timeToNature: 'The coast is immediate, while more varied nature is mostly a weekend trip.'
    }
  },
  'Asunción': {
    id: 'asuncion',
    name: 'Asunción',
    country: 'Paraguay',
    coordinates: [-57.5759, -25.2637],
    snapshot: {
      populationMetro: '2.4M',
      altitudeM: 43,
      landscape: 'River plain and low rolling terrain',
      purchasingPowerRank: 15,
      internet: { downloadMbps: 102, uploadMbps: 37, latencyMs: 28 },
      ...climate.asuncionHeat
    },
    details: {
      tagline: 'Underrated for low-key living, but the heat is a serious design constraint.',
      overview: 'Asunción is a workable base for people who want lower costs, straightforward logistics, and a more local rhythm. Villa Morra and Carmelitas cover most foreign-friendly daily needs, while the broader city remains distinctly non-touristic.',
      bestFor: ['Low-profile stays', 'Regional business travel', 'People comfortable with apartment-centered routines'],
      watchouts: ['Summer heat is extreme', 'Public transit is weak', 'Lifestyle options are narrower than in bigger capitals'],
      neighborhoods: ['Villa Morra', 'Carmelitas', 'Recoleta', 'Las Lomas'],
      mobility: 'Most people rely on car, taxi, or rideshare for comfortable movement.',
      climateNote: 'Very hot summers and stormy shoulder seasons.',
      workstyle: 'Fine for apartment work with selective café use.',
      pace: 'Slower, practical, and business-oriented.',
      airport: {
        description: 'ASU handles regional connectivity well enough.',
        rideshareFromAirport: true,
      },
      timeToNature: 'River edges and countryside escapes are easy day trips.'
    }
  },
  'La Paz': {
    id: 'la-paz',
    name: 'La Paz',
    country: 'Bolivia',
    coordinates: [-68.1193, -16.4897],
    snapshot: {
      populationMetro: '2.2M',
      altitudeM: 3640,
      landscape: 'High-altitude canyon city',
      purchasingPowerRank: 19,
      internet: { downloadMbps: 78, uploadMbps: 29, latencyMs: 31 },
      ...climate.laPazAltitude
    },
    details: {
      tagline: 'One of the most visually distinctive capitals anywhere, with altitude as the central tradeoff.',
      overview: 'La Paz feels spectacular and intense, with neighborhoods stacked along canyon walls and cable cars linking the city from above. It is rewarding for travelers who want a strong sense of place and can tolerate thinner air and more operational friction.',
      bestFor: ['Adventure-oriented stays', 'Photographers', 'People seeking a distinctive urban setting'],
      watchouts: ['Altitude is severe for many people', 'Internet is usable but not elite', 'Daily movement can be tiring at first'],
      neighborhoods: ['Sopocachi', 'Calacoto', 'San Miguel', 'Achumani'],
      mobility: 'Mi Teleférico is genuinely useful and often the best way to move.',
      climateNote: 'Cool and dry for much of the year, with a wetter summer season.',
      workstyle: 'Best for shorter focused stays or travelers with flexible meeting loads.',
      pace: 'Energetic, vertical, and unusual.',
      airport: {
        description: 'LPB and nearby El Alto connections provide domestic reach.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Mountain access is immediate and dramatic.'
    }
  },
  'Sant Cruz de la Sierra': {
    id: 'sant-cruz-de-la-sierra',
    name: 'Sant Cruz de la Sierra',
    country: 'Bolivia',
    coordinates: [-63.1812, -17.7833],
    snapshot: {
      populationMetro: '2.5M',
      altitudeM: 416,
      landscape: 'Tropical lowlands',
      purchasingPowerRank: 17,
      internet: { downloadMbps: 88, uploadMbps: 33, latencyMs: 29 },
      ...climate.santaCruzWarm
    },
    details: {
      tagline: 'Bolivia’s warmer commercial hub, easier physically than La Paz and more suburban in feel.',
      overview: 'Santa Cruz is flatter, hotter, and more car-oriented than the Andean cities. It tends to work best for travelers who want a practical base with lower altitude, easier adaptation, and access to eastern Bolivia rather than a walkable historic core.',
      bestFor: ['Heat-tolerant travelers', 'Business travel', 'People avoiding high altitude'],
      watchouts: ['Car dependence is high', 'Heat and humidity are constant factors', 'Urban charm is less obvious than in Andean capitals'],
      neighborhoods: ['Equipetrol', 'Urubó', 'Sirari', 'Centro'],
      mobility: 'Rideshare and taxis do most of the work; walkability is limited by heat and layout.',
      climateNote: 'Hot year-round with a pronounced rainy season.',
      workstyle: 'Comfortable from apartments, hotels, and modern commercial zones.',
      pace: 'Commercial, sprawling, and warm in every sense.',
      airport: {
        description: 'VVI is an important Bolivian aviation hub.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Wetlands, parks, and eastern reserves are within reach.'
    }
  },
  Cochabamba: {
    id: 'cochabamba',
    name: 'Cochabamba',
    country: 'Bolivia',
    coordinates: [-66.1568, -17.3895],
    snapshot: {
      populationMetro: '1.6M',
      altitudeM: 2558,
      landscape: 'Fertile Andean valley',
      purchasingPowerRank: 13,
      internet: { downloadMbps: 86, uploadMbps: 31, latencyMs: 30 },
      ...climate.cochabambaSpring
    },
    details: {
      tagline: 'Often called the city of eternal spring, with gentler daily life than Bolivia’s larger hubs.',
      overview: 'Cochabamba has a calmer rhythm, better weather than La Paz, and enough city infrastructure for a practical medium-length stay. It lacks the regional prominence of bigger capitals but makes up for it with comfort and a milder pace.',
      bestFor: ['Quiet working months', 'Spring-like weather', 'Lower-cost Andean living'],
      watchouts: ['Smaller remote-work ecosystem', 'Limited flight connections', 'You will likely rely on home internet most days'],
      neighborhoods: ['Queru Queru', 'Cala Cala', 'Recoileta', 'Centro Norte'],
      mobility: 'Taxis and radio cabs are the default for convenient movement.',
      climateNote: 'Dry and sunny for much of the year with a wetter summer.',
      workstyle: 'Best as an apartment city with a calm routine.',
      pace: 'Soft-spoken, relaxed, and comfortable.',
      airport: {
        description: 'CBB provides domestic links with some limits.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Valley viewpoints and nearby mountains are close.'
    }
  },
  'San Salvador': {
    id: 'san-salvador',
    name: 'San Salvador',
    country: 'El Salvador',
    coordinates: [-89.2182, 13.6929],
    snapshot: {
      populationMetro: '2.4M',
      altitudeM: 658,
      landscape: 'Volcanic foothills and lowlands',
      purchasingPowerRank: 1,
      internet: { downloadMbps: 188, uploadMbps: 91, latencyMs: 14 },
      ...climate.sanSalvadorWarm
    },
    details: {
      tagline: 'Fast-improving infrastructure, strong connectivity, and easy surf access.',
      overview: 'San Salvador has become a more credible remote-work base thanks to better security perceptions in many areas, strong internet, and quick access to the coast. Escalón, San Benito, and Santa Tecla make the most sense for comfortable daily living.',
      bestFor: ['Surf-plus-work routines', 'Short regional bases', 'People who want strong internet without mega-city scale'],
      watchouts: ['Heat and wet season downpours are intense', 'Car dependence is common', 'Urban character is more practical than romantic'],
      neighborhoods: ['Colonia Escalón', 'San Benito', 'Santa Tecla', 'Zona Rosa'],
      mobility: 'Rideshare is the most comfortable option for daily movement.',
      climateNote: 'Hot most of the year with a very wet green season from May onward.',
      workstyle: 'Strong apartment internet and a growing premium café scene.',
      pace: 'Efficient, pragmatic, and increasingly polished.',
      airport: {
        description: 'SAL is one of Central America’s more useful regional hubs.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Volcano viewpoints and surf breaks are reachable within an hour or so.'
    }  },
  Cuenca: {
    id: 'cuenca',
    name: 'Cuenca',
    country: 'Ecuador',
    coordinates: [-79.0045, -2.8974],
    snapshot: {
      populationMetro: '0.7M',
      altitudeM: 2550,
      landscape: 'Andean basin with four rivers',
      purchasingPowerRank: 21,
      internet: { downloadMbps: 82, uploadMbps: 30, latencyMs: 28 },
      ...climate.cuencaHighland
    },
    details: {
      tagline: "Ecuador's most handsome colonial city, with a spring climate and relaxed pace at altitude.",
      overview: 'Cuenca draws a disproportionate number of expats and long-stay visitors for its size. The historic center is a UNESCO site, the climate is among the most comfortable in the Andes, and the cost of living remains low. It rewards people who want beauty, calm, and a strong expat social layer without the friction of a larger capital.',
      bestFor: ['Long-stay apartment living', 'Cooler highland climate', 'Architecture and café culture'],
      watchouts: ['Altitude needs acclimatization', 'Internet speeds are slower than major capitals', 'Nightlife and event density are limited'],
      neighborhoods: ['El Centro Histórico', 'El Ejido', 'Ordoñez Lasso', 'Challuabamba'],
      mobility: 'Walking covers the historic core easily; taxis and ride apps handle wider movement.',
      climateNote: 'Two mild rainy seasons with dry spells in summer and early winter.',
      workstyle: 'Great for focused apartment work with a good café rotation in the historic district.',
      pace: 'Slow, beautiful, and very easy to settle into.',
      airport: {
        description: 'CUE with regional connections to Quito and Guayaquil.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Mountain trails and nature reserves are easy day outings.'
    }
  },
  Arequipa: {
    id: 'arequipa',
    name: 'Arequipa',
    country: 'Peru',
    coordinates: [-71.5375, -16.3988],
    snapshot: {
      populationMetro: '1.2M',
      altitudeM: 2336,
      landscape: 'Volcanic highland valley',
      purchasingPowerRank: 22,
      internet: { downloadMbps: 95, uploadMbps: 36, latencyMs: 26 },
      ...climate.arequipaHighland
    },
    details: {
      tagline: 'The White City — a striking colonial highland with volcano views and dry sunny days.',
      overview: "Arequipa is one of Peru's most livable cities, built largely from white volcanic sillar stone and framed by three volcanoes including El Misti. The Yanahuara and Cayma districts offer calm residential life, while the historic center gives you strong café and restaurant options. A much gentler altitude than Cusco with similar Andean character.",
      bestFor: ['Sunny dry climate', 'Andean atmosphere without Cusco altitude', 'Colonial architecture fans'],
      watchouts: ['Altitude still affects some visitors', 'Smaller expat and nomad scene than Lima', 'Evenings can get cold year-round'],
      neighborhoods: ['Yanahuara', 'Cayma', 'Miraflores', 'San Lázaro'],
      mobility: 'Taxis and ride apps cover daily needs; the compact historic core is walkable.',
      climateNote: 'Very dry and sunny with a brief rainy season from December to March.',
      workstyle: 'Solid apartment-first city with a growing café scene in the historic center.',
      pace: 'Unhurried, proud, and deeply local.',
      airport: {
        description: 'AQP with connections to Lima and Cusco.',
        rideshareFromAirport: true,
      },
      timeToNature: 'El Misti hikes and Colca Canyon are serious nature options within a short drive.'
    }
  },
  Puebla: {
    id: 'puebla',
    name: 'Puebla',
    country: 'Mexico',
    coordinates: [-98.2063, 19.0414],
    snapshot: {
      populationMetro: '3.2M',
      altitudeM: 2135,
      landscape: 'Highland valley near Popocatépetl',
      purchasingPowerRank: 23,
      internet: { downloadMbps: 135, uploadMbps: 52, latencyMs: 19 },
      ...climate.mexicanHighland
    },
    details: {
      tagline: 'A grand colonial city with outstanding food, lower costs, and easy Mexico City proximity.',
      overview: "Puebla is often treated as a day trip from Mexico City, but it is a compelling standalone base with a UNESCO historic center, one of Mexico's finest food traditions, and a lower cost of living than the capital. The Analco, Centro Histórico, and Cholula neighborhoods give remote workers pleasant walkable options.",
      bestFor: ['Mexican food culture', 'Colonial city atmosphere', 'Lower cost than CDMX'],
      watchouts: ['Nomad infrastructure is thinner than Mexico City', 'Smog from Popocatépetl activity can occur', 'Rainy season afternoons are heavy'],
      neighborhoods: ['Centro Histórico', 'Analco', 'Cholula', 'La Paz'],
      mobility: 'Rideshare works well across the city; Cholula is walkable on its own.',
      climateNote: 'Dry and bright October to May, then afternoon rains through the summer.',
      workstyle: 'Strong home-office and café culture, especially near the university zones.',
      pace: 'Proud, culinary-forward, and slightly quieter than Guadalajara.',
      airport: {
        description: 'PBC is small; most travelers use MEX or the Puebla-CDMX express highway.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Popocatépetl views are immediate and Malinche national park is close.'
    }
  },
  Salvador: {
    id: 'salvador',
    name: 'Salvador',
    country: 'Brazil',
    coordinates: [-38.5014, -12.9714],
    snapshot: {
      populationMetro: '4.0M',
      altitudeM: 8,
      landscape: 'Coastal peninsula with bays and cliffs',
      purchasingPowerRank: 24,
      internet: { downloadMbps: 148, uploadMbps: 62, latencyMs: 22 },
      ...climate.salvadorCoastal
    },
    details: {
      tagline: 'The Afro-Brazilian capital of culture — electric, warm, and unlike anywhere else in the country.',
      overview: "Salvador is Brazil's most culturally distinctive city, with the strongest African heritage in the country, outstanding music and food, and a coastal setting of real drama. Barra and Graça offer comfortable modern bases while the Pelourinho gives a vivid historic quarter. It suits people who want immersion over infrastructure polish.",
      bestFor: ['Music and cultural depth', 'Warm coastal living', 'Brazilian food and nightlife'],
      watchouts: ['Rain season (June-August) is persistent', 'Digital nomad infrastructure is thinner than São Paulo or Rio', 'Street awareness matters outside main tourist zones'],
      neighborhoods: ['Barra', 'Graça', 'Rio Vermelho', 'Pelourinho'],
      mobility: 'Rideshare is practical for most trips; the Pelourinho area is best on foot.',
      climateNote: 'Warm year-round with a pronounced wet season from April through August.',
      workstyle: 'Better as an apartment city than a café-hopping base; coworking is growing but limited.',
      pace: 'Vivid, musical, and deeply rhythmic.',
      airport: {
        description: 'SSA with good domestic coverage and some international routes.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Beaches, reefs, and the Chapada Diamantina highlands are all accessible.'
    }
  },
  Cartagena: {
    id: 'cartagena',
    name: 'Cartagena',
    country: 'Colombia',
    coordinates: [-75.5136, 10.3997],
    snapshot: {
      populationMetro: '1.3M',
      altitudeM: 2,
      landscape: 'Caribbean coast and historic walled city',
      purchasingPowerRank: 25,
      internet: { downloadMbps: 98, uploadMbps: 38, latencyMs: 25 },
      ...climate.cartagenaCaribbean
    },
    details: {
      tagline: 'The Caribbean jewel — colonial walls, turquoise water, and relentless heat.',
      overview: "Cartagena is Colombia's most photogenic city and a serious tourist magnet, which cuts both ways. The walled old city is genuinely beautiful for short stays, but for longer remote work the Bocagrande and Getsemani districts offer more practical living. Heat and humidity are constant factors.",
      bestFor: ['Short coastal stays', 'Architecture and history', 'Weekend beach access'],
      watchouts: ['Heat and humidity are intense year-round', 'Tourist pricing in the old city', 'Fewer coworking options than Bogota or Medellin'],
      neighborhoods: ['Centro Histórico', 'Getsemaní', 'Bocagrande', 'Manga'],
      mobility: 'Taxis and rideshare are the practical default; the old city is compact on foot.',
      climateNote: 'Hot all year with a wetter second half; the dry season from December to April is the most comfortable.',
      workstyle: 'Best from apartments with strong AC; café culture is limited by the heat.',
      pace: 'Tourist-forward, festive, and intensely warm.',
      airport: {
        description: 'CTG with solid domestic links and growing Caribbean routes.',
        rideshareFromAirport: true,
      },
      timeToNature: 'The Rosario Islands and nearby beaches are easy boat trips.'
    }
  },
  Cusco: {
    id: 'cusco',
    name: 'Cusco',
    country: 'Peru',
    coordinates: [-71.9675, -13.5266],
    snapshot: {
      populationMetro: '0.5M',
      altitudeM: 3399,
      landscape: 'High Andean valley, gateway to Machu Picchu',
      purchasingPowerRank: 26,
      internet: { downloadMbps: 72, uploadMbps: 26, latencyMs: 32 },
      ...climate.cuscoAltitude
    },
    details: {
      tagline: 'Inca capital at altitude — extraordinary history, brutal acclimatization.',
      overview: "Cusco is not a plug-and-play remote work base, but for travelers who can handle the altitude it offers a unique and deeply rewarding stay. The dry season from May to October is when the city is at its best. The San Blas and Cusco Centro neighborhoods give good access to cafés and the extraordinary historic fabric.",
      bestFor: ['Cultural immersion', 'Dry season base for Machu Picchu trips', 'People who thrive at altitude'],
      watchouts: ['Altitude sickness is a real risk above 3,000m', 'Tourism concentration raises prices', 'Cold nights year-round and cold days in winter'],
      neighborhoods: ['San Blas', 'Centro', 'San Sebastián', 'Wanchaq'],
      mobility: 'Taxis and walking cover most daily movement; the center is compact.',
      climateNote: 'Dry and sunny May through October; rainy and mild November through April.',
      workstyle: 'Small café scene works for shorter stays; apartment internet is adequate.',
      pace: 'Tourist-paced in the center, deeply local just outside it.',
      airport: {
        description: 'CUZ with good Lima connections and some direct international routes.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Sacred Valley and Machu Picchu are the immediate draws; trekking options are extensive.'
    }
  },
  Trujillo: {
    id: 'trujillo',
    name: 'Trujillo',
    country: 'Peru',
    coordinates: [-79.0291, -8.112],
    snapshot: {
      populationMetro: '1.1M',
      altitudeM: 34,
      landscape: 'Coastal desert plain near the Pacific',
      purchasingPowerRank: 27,
      internet: { downloadMbps: 88, uploadMbps: 32, latencyMs: 29 },
      ...climate.trujilloCoastal
    },
    details: {
      tagline: "Peru's second city, dry and affordable with great surf and pre-Inca ruins at the door.",
      overview: 'Trujillo is an underrated coastal base with a handsome colonial center, adjacent surf at Huanchaco, and the extraordinary Chan Chan citadel nearby. Lower costs and less complexity than Lima make it viable for longer stays, though the nomad infrastructure is thinner.',
      bestFor: ['Surfers and outdoor-first lifestyles', 'Low-cost coastal living', 'Archaeology and history'],
      watchouts: ['Fewer coworking and café options than Lima', 'Dust and dryness are constants', 'Security awareness matters in some neighborhoods'],
      neighborhoods: ['Centro Histórico', 'El Golf', 'California', 'Huanchaco'],
      mobility: 'Taxis and mototaxis handle most local movement; Huanchaco is a short ride away.',
      climateNote: 'Almost no rain year-round; foggy winters and sunny summers like Lima but a touch warmer.',
      workstyle: 'Apartment-first with selective café use; the scene is limited but functional.',
      pace: 'Relaxed, local, and less cosmopolitan than Lima.',
      airport: {
        description: 'TRU with domestic connections to Lima and occasionally Cusco.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Chan Chan ruins, Huanchaco beach, and nearby wetlands are immediate options.'
    }
  },
  Bucaramanga: {
    id: 'bucaramanga',
    name: 'Bucaramanga',
    country: 'Colombia',
    coordinates: [-73.1198, 7.1194],
    snapshot: {
      populationMetro: '1.2M',
      altitudeM: 959,
      landscape: 'Highland mesa above a canyon',
      purchasingPowerRank: 28,
      internet: { downloadMbps: 118, uploadMbps: 45, latencyMs: 22 },
      ...climate.bucaramangaClimate
    },
    details: {
      tagline: "Colombia's most underrated city — warm climate, low cost, and a genuinely pleasant daily pace.",
      overview: 'Bucaramanga sits on a mesa with a comfortable year-round temperature and a reputation as one of the cleanest, most livable mid-size cities in Colombia. The Cabecera del Llano and Sotomayor neighborhoods cover most remote-work needs. Less international visibility than Bogotá or Medellín is part of the appeal.',
      bestFor: ['Low-profile affordable living', 'Comfortable year-round temperature', 'Less tourist traffic than major hubs'],
      watchouts: ['Smaller expat and nomad community', 'Fewer direct international flights', 'Limited premium coworking options'],
      neighborhoods: ['Cabecera del Llano', 'Sotomayor', 'Cañaveral', 'La Aurora'],
      mobility: 'Rideshare and taxis are the practical default; some areas are walkable.',
      climateNote: 'Warm and pleasant most of the year with two wetter periods in spring and autumn.',
      workstyle: 'Good apartment internet; growing café scene but thinner than bigger cities.',
      pace: 'Calm, local, and genuinely friendly.',
      airport: {
        description: 'BGA with domestic links but limited direct international services.',
        rideshareFromAirport: true,
      },
      timeToNature: "Chicamocha Canyon is close and one of Colombia's most dramatic natural sites."
    }
  },
  Pereira: {
    id: 'pereira',
    name: 'Pereira',
    country: 'Colombia',
    coordinates: [-75.6921, 4.8133],
    snapshot: {
      populationMetro: '0.7M',
      altitudeM: 1411,
      landscape: 'Coffee region valley',
      purchasingPowerRank: 29,
      internet: { downloadMbps: 105, uploadMbps: 40, latencyMs: 23 },
      ...climate.pereiraCoffee
    },
    details: {
      tagline: 'Heart of the coffee region — affordable highland living with direct Salento access.',
      overview: "Pereira is the most practical base in Colombia's Coffee Cultural Landscape, a UNESCO-recognized zone of stunning mountain scenery and the best coffee in the country. It is smaller and less polished than Medellín, but the combination of mild weather, low cost, and easy access to Salento and the Cocora Valley makes it quietly compelling.",
      bestFor: ['Coffee tourism base', 'Budget-conscious highland living', 'Access to Salento and Cocora Valley'],
      watchouts: ['Smaller city with fewer nomad amenities', 'Rain is frequent year-round', 'Limited direct international flight access'],
      neighborhoods: ['Pinares', 'Álamos', 'Centro', 'Cerritos'],
      mobility: 'Taxis and rideshare cover the city well; Salento is a short bus or taxi ride.',
      climateNote: 'Mild and green year-round with two rainy seasons; umbrellas are essential.',
      workstyle: 'Best from apartments or hotel bases with occasional café use.',
      pace: 'Relaxed, agricultural, and warm in character.',
      airport: {
        description: 'PEI with growing domestic and some international connections.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Cocora Valley and coffee farm tours are within 30 to 90 minutes.'
    }
  },
  'San José': {
    id: 'san-jose',
    name: 'San José',
    country: 'Costa Rica',
    coordinates: [-84.0907, 9.9281],
    snapshot: {
      populationMetro: '2.4M',
      altitudeM: 1172,
      landscape: 'Central Valley highland basin',
      purchasingPowerRank: 30,
      internet: { downloadMbps: 162, uploadMbps: 74, latencyMs: 18 },
      ...climate.sanJoseHighland
    },
    details: {
      tagline: 'The most stable and infrastructure-rich base in Central America.',
      overview: 'San José divides opinion — it lacks the obvious charm of the beaches or colonial cities, but its infrastructure, political stability, strong English proficiency, and proximity to nature make it the most functional long-stay base in Central America. Escazú and Santa Ana skew expat-polished while Barrio Escalante and Los Yoses have more local texture.',
      bestFor: ['Central American regional base', 'Strong English and infrastructure', 'Nature access without full beach isolation'],
      watchouts: ['The city center is not particularly scenic', 'Traffic management is important', 'Higher cost than most of Central America'],
      neighborhoods: ['Escazú', 'Santa Ana', 'Barrio Escalante', 'Los Yoses'],
      mobility: 'Rideshare is most practical; traffic patterns reward planning.',
      climateNote: 'Dry and pleasant December through April; heavy rains from May with a short dry break in July.',
      workstyle: 'Good coworking and café options especially in the west side suburbs.',
      pace: 'Calm, organized, and less intense than South American capitals.',
      airport: {
        description: 'SJO is the major regional hub with strong US and European connections.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Cloud forests, volcanoes, and both coasts are within two hours.'
    }
  },
  'Córdoba': {
    id: 'cordoba',
    name: 'Córdoba',
    country: 'Argentina',
    coordinates: [-64.1888, -31.4201],
    snapshot: {
      populationMetro: '1.9M',
      altitudeM: 423,
      landscape: 'Pampa hills and river plains',
      purchasingPowerRank: 31,
      internet: { downloadMbps: 155, uploadMbps: 68, latencyMs: 16 },
      ...climate.cordobaArgentina
    },
    details: {
      tagline: "Argentina's student capital — high energy, low cost, and a strong creative scene.",
      overview: "Córdoba is Argentina's second city and home to one of Latin America's oldest universities, which gives it a youthful, intellectual energy that Buenos Aires lacks in some ways. Nueva Córdoba and Güemes are the main nomad zones, with good café density and lower prices than Buenos Aires. The peso dynamics that apply in BA apply here too.",
      bestFor: ['University-town energy', 'Lower cost than Buenos Aires', 'Strong arts and nightlife scene'],
      watchouts: ['Same currency complexity as Buenos Aires', 'Summers are very hot', 'Less international connectivity than BA'],
      neighborhoods: ['Nueva Córdoba', 'Güemes', 'General Paz', 'Cerro de las Rosas'],
      mobility: 'Bus network is functional; rideshare and walking cover most nomad-relevant movement.',
      climateNote: 'Hot dry summers and mild winters; spring and autumn are the sweet spots.',
      workstyle: 'Excellent café culture driven by the student population.',
      pace: 'Active, intellectual, and a bit rawer than Buenos Aires.',
      airport: {
        description: 'COR with domestic links and some direct international routes.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Sierras de Córdoba hills are quick day-trip escapes with hiking and rivers.'
    }
  },
  Manaus: {
    id: 'manaus',
    name: 'Manaus',
    country: 'Brazil',
    coordinates: [-60.0212, -3.1019],
    snapshot: {
      populationMetro: '2.3M',
      altitudeM: 92,
      landscape: 'Amazon basin at the confluence of the Negro and Solimões rivers',
      purchasingPowerRank: 32,
      internet: { downloadMbps: 132, uploadMbps: 55, latencyMs: 24 },
      ...climate.manausEquatorial
    },
    details: {
      tagline: "The Amazon metropolis — a genuine city in the middle of the world's largest rainforest.",
      overview: 'Manaus is one of the most geographically extraordinary cities anywhere — a city of over two million people accessible primarily by boat or plane, surrounded entirely by the Amazon. The Ponta Negra and Adrianópolis neighborhoods are the most comfortable for daily life. It suits travelers who want an authentic jungle-edge urban experience over polished nomad infrastructure.',
      bestFor: ['Amazon nature access', 'Unique urban experience', 'Jungle and river expeditions'],
      watchouts: ['Heat and humidity are extreme year-round', 'The rainy season brings intense flooding risk in low areas', 'Nomad infrastructure is thinner than southern Brazilian cities'],
      neighborhoods: ['Ponta Negra', 'Adrianópolis', 'Vieiralves', 'Centro'],
      mobility: 'Rideshare and taxis are practical; river access is central to any extended stay.',
      climateNote: 'Hot and very wet most of the year; slightly drier from June to September but never truly dry.',
      workstyle: 'Apartment-first with reliable broadband; the coworking scene is limited.',
      pace: 'Hot, river-paced, and viscerally different from any other city on this list.',
      airport: {
        description: 'MAO is one of the most important airports in the Amazon region.',
        rideshareFromAirport: true,
      },
      timeToNature: 'The Amazon is immediate — river tours, jungle lodges, and the Meeting of the Waters are minutes away.'
    }
  },
  'Belo Horizonte': {
    id: 'belo-horizonte',
    name: 'Belo Horizonte',
    country: 'Brazil',
    coordinates: [-43.9378, -19.9208],
    snapshot: {
      populationMetro: '6.0M',
      altitudeM: 858,
      landscape: 'Highland plateau ringed by hills',
      purchasingPowerRank: 33,
      internet: { downloadMbps: 210, uploadMbps: 102, latencyMs: 13 },
      ...climate.beloHorizonteClimate
    },
    details: {
      tagline: "Brazil's bar capital — a livable highland city with strong food culture and no beaches to distract you.",
      overview: "Belo Horizonte is one of Brazil's most underrated large cities for remote work. It has São Paulo-level broadband, a cooler highland climate, and a famously dense bar and restaurant scene driven by the local pagode and boteco culture. Savassi, Lourdes, and Funcionários are the core nomad-friendly neighborhoods. Less touristy and more genuinely local than Rio.",
      bestFor: ['Food and bar culture', 'Cooler than coastal Brazil', 'Affordable big-city living'],
      watchouts: ['The rainy season is heavy from November to March', 'Less scenic than coastal cities', 'Traffic is significant across most of the city'],
      neighborhoods: ['Savassi', 'Lourdes', 'Funcionários', 'Santa Tereza'],
      mobility: 'Metro is useful on core lines; rideshare fills the gaps efficiently.',
      climateNote: 'Warm and wet in summer, dry and mild in winter — the most comfortable season runs from May to September.',
      workstyle: 'Strong broadband, growing coworking scene, and excellent café density in Savassi.',
      pace: 'Social, food-forward, and less frenetic than São Paulo.',
      airport: {
        description: 'CNF (Confins) for major routes; PLU (Pampulha) for select domestic hops.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Serra do Cipó and Inhotim (world-class outdoor art museum) are easy day trips.'
    }
  },
  'Florianópolis': {
    id: 'florianopolis',
    name: 'Florianópolis',
    country: 'Brazil',
    coordinates: [-48.5482, -27.5954],
    snapshot: {
      populationMetro: '1.1M',
      altitudeM: 3,
      landscape: 'Atlantic island with beaches and lagoons',
      purchasingPowerRank: 34,
      internet: { downloadMbps: 195, uploadMbps: 88, latencyMs: 14 },
      ...climate.florianopolisClimate
    },
    details: {
      tagline: 'Brazil meets surf town — a tech-forward island city with beaches and a growing startup scene.',
      overview: "Florianópolis sits on an island connected to the mainland by bridge, with over 40 beaches and a reputation as Brazil's most livable mid-size city. Trindade and João Paulo cater to the tech and startup crowd, while Lagoa da Conceição offers a laid-back surf lifestyle node. It combines genuine urban services with beach access that no other city on this list can match.",
      bestFor: ['Beach-plus-work lifestyle', 'Tech and startup community', 'Outdoor-first living'],
      watchouts: ['Peak summer (Jan-Feb) brings intense crowds and price spikes', 'Getting around the island can be slow', 'Winters are mild but rainy and grey'],
      neighborhoods: ['Trindade', 'João Paulo', 'Lagoa da Conceição', 'Jurerê'],
      mobility: 'Car or rideshare is effectively essential to move between beaches and districts.',
      climateNote: 'Warm summers and mild winters; rain is spread throughout the year.',
      workstyle: 'Strong coworking and café scene concentrated in Trindade and near UFSC.',
      pace: 'Tech-startup energy meets surf-town relaxation.',
      airport: {
        description: 'FLN with solid domestic connections.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Beaches and lagoons are immediate; Serra Gaúcha is a weekend trip.'
    }
  },
  Fortaleza: {
    id: 'fortaleza',
    name: 'Fortaleza',
    country: 'Brazil',
    coordinates: [-38.5247, -3.7172],
    snapshot: {
      populationMetro: '4.1M',
      altitudeM: 21,
      landscape: 'Northeast coastal city on the Atlantic',
      purchasingPowerRank: 35,
      internet: { downloadMbps: 158, uploadMbps: 68, latencyMs: 20 },
      ...climate.fortalezaClimate
    },
    details: {
      tagline: "The Northeast sun capital — constant warmth, strong beaches, and Brazil's most affordable major city.",
      overview: 'Fortaleza is a large, hot, coastal city with near-constant sunshine outside the February-to-May rain season, world-class kite-surfing beaches, and costs well below the southern Brazilian cities. Meireles and Aldeota are the functional remote-work zones, while Jericoacoara is a legendary beach town reachable in a few hours.',
      bestFor: ['Budget coastal living', 'Kite-surfing and beach lifestyle', 'Northeast Brazilian culture'],
      watchouts: ['Security awareness is important outside main tourist zones', 'Heat is relentless', 'Rainy season is very wet from February to May'],
      neighborhoods: ['Meireles', 'Aldeota', 'Cocó', 'Varjota'],
      mobility: 'Rideshare and taxis are the practical standard; some beachfront areas are walkable.',
      climateNote: 'Hot and sunny most of the year; heavy rains concentrated from February through May.',
      workstyle: 'Decent broadband and a growing coworking base, especially in Aldeota.',
      pace: 'Warm, sun-forward, and distinctly northeastern in energy.',
      airport: {
        description: 'FOR with domestic coverage and some international routes.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Jericoacoara and the Lençóis Maranhenses are within a day of travel.'
    }
  },
  Recife: {
    id: 'recife',
    name: 'Recife',
    country: 'Brazil',
    coordinates: [-34.8811, -8.0539],
    snapshot: {
      populationMetro: '4.3M',
      altitudeM: 10,
      landscape: 'Coastal delta city with reefs and mangroves',
      purchasingPowerRank: 36,
      internet: { downloadMbps: 152, uploadMbps: 64, latencyMs: 21 },
      ...climate.recifeClimate
    },
    details: {
      tagline: "Brazil's Venice — a reef-fringed northeastern city with strong culture and low costs.",
      overview: 'Recife is a city of canals, bridges, and some of the most natural reef pools in South America. Boa Viagem is the main beachfront nomad zone, while the Recife Antigo historic district and the hipster enclave of Olinda just north add cultural depth. Costs are below São Paulo and Rio, and the Brazilian northeast has a distinct festive identity.',
      bestFor: ['Budget coastal living', 'Frevo and Carnaval culture', 'Reef swimming without an island trip'],
      watchouts: ['Heavy rains from March to July', 'Security awareness needed outside main zones', 'Humidity is persistent year-round'],
      neighborhoods: ['Boa Viagem', 'Recife Antigo', 'Boa Vista', 'Derby'],
      mobility: 'Metro is useful north–south; rideshare covers the rest.',
      climateNote: 'Warm year-round with a very pronounced wet season from March through July.',
      workstyle: 'Strong broadband in Boa Viagem; coworking is growing but thinner than southern cities.',
      pace: 'Hot, festive, and deeply northeastern in character.',
      airport: {
        description: 'REC with solid domestic coverage and some international routes.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Natural reef pools at Porto de Galinhas are among the best in Brazil, around an hour away.'
    }
  },
  'Mérida': {
    id: 'merida',
    name: 'Mérida',
    country: 'Mexico',
    coordinates: [-89.6228, 20.9674],
    snapshot: {
      populationMetro: '1.3M',
      altitudeM: 8,
      landscape: 'Flat Yucatán Peninsula lowlands',
      purchasingPowerRank: 37,
      internet: { downloadMbps: 120, uploadMbps: 48, latencyMs: 20 },
      ...climate.meridaClimate
    },
    details: {
      tagline: 'The safest city in Mexico, with a grand colonial core and easy Yucatán access.',
      overview: "Mérida is frequently cited as one of Mexico's safest and most livable cities, with a magnificent colonial center, strong culinary identity, and proximity to cenotes, ruins, and the Caribbean coast. The heat from April to June is extreme, but the rest of the year is manageable and the lifestyle rewards are high.",
      bestFor: ['Safety-first travelers', 'Colonial city atmosphere', 'Yucatán exploration base'],
      watchouts: ['Heat from April to June is brutal', 'Less developed nomad infrastructure than CDMX or GDL', 'Flat terrain and car dependence outside the centro'],
      neighborhoods: ['Centro Histórico', 'Paseo de Montejo', 'Altabrisa', 'García Ginerés'],
      mobility: 'Rideshare and taxis cover the city well; bike-friendly in parts of the center.',
      climateNote: 'Hot and dry in spring, rainy July through October, pleasant November through February.',
      workstyle: 'Growing digital nomad scene with coworking near Paseo de Montejo.',
      pace: 'Gracious, slow-burning, and deeply rooted in Yucatecan identity.',
      airport: {
        description: 'MID with good domestic links and some US connections.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Cenotes and Chichén Itzá are within an hour or two; the Gulf coast is close.'
    }
  },
  'León': {
    id: 'leon',
    name: 'León',
    country: 'Mexico',
    coordinates: [-101.6832, 21.1167],
    snapshot: {
      populationMetro: '1.7M',
      altitudeM: 1883,
      landscape: 'Highland basin in the Bajío region',
      purchasingPowerRank: 38,
      internet: { downloadMbps: 125, uploadMbps: 48, latencyMs: 19 },
      ...climate.leonMexicoClimate
    },
    details: {
      tagline: "Mexico's leather capital — industrial heritage, good highland climate, and a fraction of CDMX costs.",
      overview: 'León sits in the Bajío industrial heartland but has a pleasant highland climate, a compact modernizing center, and extremely easy access to colonial gems like Guanajuato and San Miguel de Allende. It works well as a quieter base for people who want central Mexico without the scale of Guadalajara or Mexico City.',
      bestFor: ['Low-cost highland base', 'Day trips to Guanajuato and San Miguel', 'Mild climate year-round'],
      watchouts: ['Less polished nomad scene than larger cities', 'Industrial character dominates some areas', 'English is limited outside business contexts'],
      neighborhoods: ['Centro', 'Campestre', 'Jardines del Moral', 'Panorama'],
      mobility: 'Rideshare works well; the city center is partially walkable.',
      climateNote: 'Dry and warm spring, rainy summers, very pleasant October through February.',
      workstyle: 'Apartment-first with selective café use; coworking is limited but growing.',
      pace: 'Industrial, practical, and quieter than the big three Mexican cities.',
      airport: {
        description: 'BJX (Del Bajío) serving León and Guanajuato with strong US and domestic links.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Guanajuato city and Sierra de Lobos park are both under an hour away.'
    }
  },
  Tegucigalpa: {
    id: 'tegucigalpa',
    name: 'Tegucigalpa',
    country: 'Honduras',
    coordinates: [-87.2068, 14.0818],
    snapshot: {
      populationMetro: '1.5M',
      altitudeM: 994,
      landscape: 'Hilly highland basin',
      purchasingPowerRank: 39,
      internet: { downloadMbps: 72, uploadMbps: 28, latencyMs: 34 },
      ...climate.tegucigalpaClimate
    },
    details: {
      tagline: 'Central American capital with highland relief, low costs, and a genuine local texture.',
      overview: 'Tegucigalpa is not a polished nomad destination, but its highland setting keeps temperatures comfortable and costs are among the lowest in Central America. Colonia Palmira and Boulevard Morazán are the most practical zones for visitors, and the city has a real, unfiltered character that suits travelers who want a local rather than expat experience.',
      bestFor: ['Budget-conscious Central American base', 'Authentic local city experience', 'Cooler highland temperatures'],
      watchouts: ['Security requires consistent awareness and planning', 'Infrastructure is less reliable than Costa Rica or Panama', 'Nomad amenities are limited'],
      neighborhoods: ['Colonia Palmira', 'Boulevard Morazán', 'Los Castaños', 'Lomas del Guijarro'],
      mobility: 'Taxis and rideshare are the standard; walking is limited by hilly terrain and safety factors.',
      climateNote: 'Mild and pleasant October through May; rainy season brings heavy afternoon downpours.',
      workstyle: 'Best from apartments with reliable home internet; coworking is sparse.',
      pace: 'Local, unhurried, and distinctly Central American.',
      airport: {
        description: 'TGU with regional Central American links.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Cloud forests and La Tigra national park are close to the city.'
    }
  },
  'Guatemala City': {
    id: 'guatemala-city',
    name: 'Guatemala City',
    country: 'Guatemala',
    coordinates: [-90.5133, 14.6349],
    snapshot: {
      populationMetro: '3.0M',
      altitudeM: 1502,
      landscape: 'Highland plateau with volcanic horizon',
      purchasingPowerRank: 40,
      internet: { downloadMbps: 92, uploadMbps: 35, latencyMs: 30 },
      ...climate.guatemalaCityClimate
    },
    details: {
      tagline: 'Central America largest city — highland climate, volcanic views, and a growing modern quarter.',
      overview: "Guatemala City divides opinion but Zone 10 (Zona Viva) and Zone 14 offer a functional, modern base with good restaurants, reliable services, and easy access to Antigua just 45 minutes away. The highland altitude keeps temperatures far more comfortable than the Caribbean coast, and costs are lower than Costa Rica.",
      bestFor: ['Antigua as a day trip base', 'Lower costs than San José', 'Highland climate in Central America'],
      watchouts: ['Security varies sharply by zone', 'Traffic congestion is significant', 'The city lacks the charm of nearby Antigua'],
      neighborhoods: ['Zona 10', 'Zona 14', 'Zona 15', 'Cayalá'],
      mobility: 'Rideshare and private taxis are strongly preferred for safety and convenience.',
      climateNote: 'Spring-like temperatures year-round with heavy rains from May through October.',
      workstyle: 'Solid coworking options in Zona 10; good café density in the modern zones.',
      pace: 'Busy, commercial, and fast-moving in the modern quarter.',
      airport: {
        description: 'GUA is the main Central American hub with strong US and regional connections.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Antigua, Lake Atitlán, and volcanoes are all within two hours.'
    }
  },
  Managua: {
    id: 'managua',
    name: 'Managua',
    country: 'Nicaragua',
    coordinates: [-86.2906, 12.1364],
    snapshot: {
      populationMetro: '1.5M',
      altitudeM: 50,
      landscape: 'Lakeside lowland capital',
      purchasingPowerRank: 41,
      internet: { downloadMbps: 65, uploadMbps: 24, latencyMs: 38 },
      ...climate.managuaClimate
    },
    details: {
      tagline: "Central America's lowest-cost capital — functional, hot, and genuinely off the tourist trail.",
      overview: 'Managua is not a conventional nomad destination, but it is the cheapest capital in Central America and gives access to a country with extraordinary natural diversity. Planes de Altamira and Carretera Masaya are the most livable zones. Many people use it as a base to explore Granada, León, and the Pacific coast rather than staying city-bound.',
      bestFor: ['Extreme budget travel', 'Nicaragua exploration base', 'Travelers with local contacts'],
      watchouts: ['Political context requires monitoring', 'Heat is extreme at low altitude', 'Nomad infrastructure is very limited'],
      neighborhoods: ['Planes de Altamira', 'Carretera Masaya', 'Bolonia', 'Las Colinas'],
      mobility: 'Taxis and rideshare are essential; walking is impractical in the heat and layout.',
      climateNote: 'Very hot year-round; rainy season from May through October brings some relief.',
      workstyle: 'Apartment-first; internet is usable but not elite.',
      pace: 'Local, low-key, and uncrowded by tourists.',
      airport: {
        description: 'MGA with regional Central American connections.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Granada, Ometepe Island, and Pacific surf are all under two hours.'
    }
  },
  'San Pedro Sula': {
    id: 'san-pedro-sula',
    name: 'San Pedro Sula',
    country: 'Honduras',
    coordinates: [-88.0251, 15.504],
    snapshot: {
      populationMetro: '1.4M',
      altitudeM: 60,
      landscape: 'Lowland valley near the Caribbean coast',
      purchasingPowerRank: 42,
      internet: { downloadMbps: 78, uploadMbps: 30, latencyMs: 33 },
      ...climate.sanPedroSulaClimate
    },
    details: {
      tagline: "Honduras's commercial engine — hot, industrial, and the gateway to the Bay Islands.",
      overview: "San Pedro Sula is Honduras's business capital and transport hub, not a tourism showcase. It is warm, flat, and functional, with Zona Viva providing the most comfortable daily living environment. Most travelers use it as a transit point to the Bay Islands or Copán ruins rather than a standalone destination.",
      bestFor: ['Bay Islands and Copán access', 'Business travel in Honduras', 'Budget Central American stopover'],
      watchouts: ['Security requires careful planning and zone awareness', 'Heat and humidity are constant', 'Very limited digital nomad infrastructure'],
      neighborhoods: ['Zona Viva', 'Los Andes', 'Colonia Trejo', 'Jardines del Valle'],
      mobility: 'Taxis and rideshare are the only practical options for safe movement.',
      climateNote: 'Warm and humid year-round with a wetter season from May through November.',
      workstyle: 'Best from hotels or apartments with reliable internet; coworking is minimal.',
      pace: 'Commercial, fast-moving, and purely functional in feel.',
      airport: {
        description: 'SAP is the busiest airport in Honduras with US and regional connections.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Copán ruins and Bay Islands are within two to three hours in either direction.'
    }
  },
  Valparaíso: {
    id: 'valparaiso',
    name: 'Valparaíso',
    country: 'Chile',
    coordinates: [-71.6273, -33.0472],
    snapshot: {
      populationMetro: '1.0M',
      altitudeM: 41,
      landscape: 'Pacific port city of stacked hillside neighborhoods',
      purchasingPowerRank: 43,
      internet: { downloadMbps: 195, uploadMbps: 105, latencyMs: 13 },
      ...climate.valparaisoClimate
    },
    details: {
      tagline: 'Chile\'s most bohemian city — painted hills, Pacific fog, and a strong arts identity.',
      overview: 'Valparaíso is the most visually distinctive city in Chile, built across 42 cerros (hills) connected by historic funiculars. It has a strong creative and student energy, lower costs than Santiago, and a genuine gritty-beautiful character. The connection to Santiago is fast, making it a viable base for people who want a coastal city with less corporate polish.',
      bestFor: ['Artists and writers', 'Bohemian city atmosphere', 'Budget-conscious Chile base'],
      watchouts: ['Fog and grey skies dominate winter and spring', 'Petty theft requires awareness on the hills', 'Infrastructure is rougher than Santiago'],
      neighborhoods: ['Cerro Alegre', 'Cerro Concepción', 'Cerro Bella Vista', 'Plan (city center)'],
      mobility: 'Funiculars, minibuses, and walking up steep stairs are the daily reality.',
      climateNote: 'Mediterranean — dry warm summers and wet cool winters; fog is common year-round.',
      workstyle: 'Good café density on the tourist cerros; home internet is reliable.',
      pace: 'Creative, relaxed, and slightly chaotic.',
      airport: {
        description: 'No commercial airport; SCL (Santiago) is 90 minutes away.',
        rideshareFromAirport: false,
        rideshareNote: 'The nearest commercial airport is SCL in Santiago (90 min away) — rideshare is not legal from that terminal; use official taxis.',
      },
      timeToNature: 'Pacific beaches and coastal trails are immediate; wine country is under an hour east.'
    }
  },
  Concepción: {
    id: 'concepcion',
    name: 'Concepción',
    country: 'Chile',
    coordinates: [-73.0498, -36.827],
    snapshot: {
      populationMetro: '1.0M',
      altitudeM: 12,
      landscape: 'River delta city between the Andes and Pacific',
      purchasingPowerRank: 44,
      internet: { downloadMbps: 185, uploadMbps: 95, latencyMs: 14 },
      ...climate.concepcionClimate
    },
    details: {
      tagline: "Chile's university capital — rainy, youthful, and very affordable south of Santiago.",
      overview: "Concepción is Chile's second-largest metro area and home to several major universities giving it a young, energetic base. It sits near the Bio Bio river and is the gateway to Chile's lake district south. Costs are well below Santiago, the broadband is strong, and the city has enough cafes and coworking to support a comfortable remote stay.",
      bestFor: ['Budget Chile living', 'University-town energy', 'Base for Chile lake district trips'],
      watchouts: ['Rain is frequent and heavy May through August', 'Colder than Santiago', 'Less international flight access'],
      neighborhoods: ['Barrio Universitario', 'Pedro de Valdivia', 'San Pedro de la Paz', 'Chiguayante'],
      mobility: 'Bus and rideshare cover daily movement well across the metro area.',
      climateNote: 'Rainy oceanic climate with a brief warm dry period from December to March.',
      workstyle: 'Solid broadband and a genuine café culture driven by the student population.',
      pace: 'Energetic, youthful, and more relaxed than Santiago.',
      airport: {
        description: 'CCP with domestic links to Santiago and some southern destinations.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Lake Laja, the Bio Bio river, and the beginning of the lake district are all close.'
    }
  },
  Mendoza: {
    id: 'mendoza',
    name: 'Mendoza',
    country: 'Argentina',
    coordinates: [-68.8458, -32.8895],
    snapshot: {
      populationMetro: '1.2M',
      altitudeM: 827,
      landscape: 'Andean foothills at the base of Aconcagua',
      purchasingPowerRank: 45,
      internet: { downloadMbps: 148, uploadMbps: 62, latencyMs: 17 },
      ...climate.mendozaClimate
    },
    details: {
      tagline: "Argentina's wine capital — sun-drenched, Andean, and outstanding for outdoor enthusiasts.",
      overview: "Mendoza is one of the world's great wine regions and a superb base for anyone who wants a relaxed Argentine city with Andean mountains on the doorstep. The city is flat, tree-lined, and walkable in the central zones. Costs use the same peso dynamics as Buenos Aires, making it exceptional value for dollar earners. The same economic considerations apply.",
      bestFor: ['Wine and outdoor lifestyle', 'Andes access without Santiago prices', 'Relaxed Argentine city pace'],
      watchouts: ['Summer heat is extreme in January and February', 'Same currency complexity as Buenos Aires', 'Fewer direct international flights than BA'],
      neighborhoods: ['Ciudad', 'Quinta Sección', 'Chacras de Coria', 'Luján de Cuyo'],
      mobility: 'Rideshare and taxis are practical; the central area is partly walkable.',
      climateNote: 'Very dry and sunny most of the year; hot summers and cool winters with light snow on the peaks.',
      workstyle: 'Good broadband and a relaxed café scene; wineries double as productive work retreats.',
      pace: 'Laid-back, outdoorsy, and wine-forward.',
      airport: {
        description: 'MDZ with domestic links and some direct international routes.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Aconcagua base camps, ski resorts, and white-water rafting are all within 90 minutes.'
    }
  },
  "Porto Alegre": {
    id: 'porto-alegre',
    name: 'Porto Alegre',
    country: 'Brazil',
    coordinates: [-51.2177, -30.0346],
    snapshot: {
      populationMetro: '4.3M',
      altitudeM: 10,
      landscape: 'Lakeside subtropical city at the tip of Guaíba lake',
      purchasingPowerRank: 46,
      internet: { downloadMbps: 215, uploadMbps: 105, latencyMs: 13 },
      ...climate.portoAlegreClimate
    },
    details: {
      tagline: "Southern Brazil's cosmopolitan capital — European roots, strong tech scene, and four distinct seasons.",
      overview: "Porto Alegre is Brazil's southernmost major city and carries a noticeably different energy to tropical Brazil. Its European immigrant heritage (German, Italian) shapes its food, architecture, and culture. It's a mature metro with a strong university and tech sector, excellent restaurants and nightlife, and real winters that cool things down. BRL costs make it exceptional value for dollar or euro earners.",
      bestFor: ['Tech and startup ecosystem', 'European-influenced culture', 'Year-round outdoor activities'],
      watchouts: ['Winters are genuinely cold by Brazilian standards', 'Flooding in low-lying areas can occur', 'Less international name recognition than São Paulo or Rio'],
      neighborhoods: ['Moinhos de Vento', 'Bela Vista', 'Cidade Baixa', 'Petrópolis', 'Auxiliadora'],
      mobility: 'Metro line plus buses; rideshare is widely available.',
      climateNote: 'Subtropical humid climate with warm summers around 26°C and cool winters dipping to 14°C. Rain is well distributed year-round.',
      workstyle: 'Strong broadband, growing coworking scene, and productive café culture in upscale neighborhoods.',
      pace: 'Cosmopolitan, cultured, and more reserved than tropical Brazil.',
      airport: {
        description: 'POA with wide domestic coverage and some direct international routes to Buenos Aires, Santiago, and Miami.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Serra Gaúcha wine country, Gramado, and the Pampas are all within 2 hours.'
    }
  },
  "Panama City": {
    id: 'panama-city',
    name: 'Panama City',
    country: 'Panama',
    coordinates: [-79.5197, 8.9936],
    snapshot: {
      populationMetro: '1.9M',
      altitudeM: 5,
      landscape: 'Tropical skyscraper city between two oceans at the Canal',
      purchasingPowerRank: 47,
      internet: { downloadMbps: 195, uploadMbps: 90, latencyMs: 16 },
      ...climate.panamaCityClimate
    },
    details: {
      tagline: "The crossroads of the Americas — first-world infrastructure, US dollar economy, and year-round heat.",
      overview: "Panama City is the most internationally connected city in Central America and functions more like a global financial hub than a typical Latin city. The USD economy eliminates currency risk, the banking sector is world-class, and the Canal Zone brings a constant flow of international business. Casco Viejo offers a charming colonial counterpoint to the gleaming Punta Pacífica skyscrapers. The wet season is intense but life continues normally.",
      bestFor: ['USD economy with no exchange risk', 'First-world infrastructure in LatAm', 'Finance and international business connections'],
      watchouts: ['Wet season rain is heavy from May through November', 'Heat and humidity are relentless year-round', 'Cost of living is higher than most of LatAm'],
      neighborhoods: ['Casco Viejo', 'Miraflores', 'Punta Pacífica', 'El Cangrejo', 'San Francisco'],
      mobility: 'Metro, buses, and rideshare all operate; traffic can be severe at rush hour.',
      climateNote: 'Tropical with a dry season from December to April and a heavy wet season the rest of the year. Temperatures are consistently around 32°C.',
      workstyle: 'Excellent broadband, many coworking spaces, and a business-oriented café culture.',
      pace: 'Fast-paced, international, and commercially focused.',
      airport: {
        description: 'PTY (Tocumen) is the major hub of Central America with extensive direct connections across the Americas.',
        rideshareFromAirport: true,
      },
      timeToNature: 'San Blas Islands, Bocas del Toro, and the Cloud Forest at El Valle are all accessible as day or weekend trips.'
    }
  },
  Sucre: {
    id: 'sucre',
    name: 'Sucre',
    country: 'Bolivia',
    coordinates: [-65.2627, -19.0196],
    snapshot: {
      populationMetro: '0.4M',
      altitudeM: 2750,
      landscape: 'Whitewashed colonial capital in a highland valley',
      purchasingPowerRank: 48,
      internet: { downloadMbps: 55, uploadMbps: 28, latencyMs: 28 },
      ...climate.sucreClimateBo
    },
    details: {
      tagline: "Bolivia's constitutional capital — one of the most beautiful colonial cities in South America.",
      overview: "Sucre is UNESCO-listed for its immaculate whitewashed colonial architecture and is considered one of the most visually stunning capitals on the continent. At 2750m it's significantly milder than La Paz, with a pleasant spring-like climate much of the year. The city has a strong student population from the local university, a charming pedestrian centre, and very low costs. Internet is adequate but not fast by regional standards.",
      bestFor: ['Colonial architecture and history', 'Mild highland climate without La Paz altitude stress', 'Ultra-low cost of living'],
      watchouts: ['Internet speeds are slower than larger cities', 'Limited international flight connections', 'Small city — feel it quickly after a few weeks'],
      neighborhoods: ['Centro Histórico', 'Recoleta', 'San Roque', 'Las Delicias'],
      mobility: 'Walking covers the colonial centre; minibuses and taxis for wider areas.',
      climateNote: 'Warm and sunny days year-round with cooler evenings. Brief rainy season November to March, very dry May to September.',
      workstyle: 'Quiet and focused; a handful of cafés and small coworking spots with decent fibre lines in the centre.',
      pace: 'Slow, colonial, and serenely calm.',
      airport: {
        description: 'SRE with connections to La Paz, Cochabamba, and Santa Cruz.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Dinosaur footprints at Cal Orcko, the Uyuni salt flats 6 hours south, and Potosí a short drive away.'
    }
  },
  "Ibagué": {
    id: 'ibague',
    name: 'Ibagué',
    country: 'Colombia',
    coordinates: [-75.2321, 4.4389],
    snapshot: {
      populationMetro: '0.7M',
      altitudeM: 1285,
      landscape: 'Andean valley city at the foot of the Central Cordillera',
      purchasingPowerRank: 49,
      internet: { downloadMbps: 165, uploadMbps: 80, latencyMs: 18 },
      ...climate.ibagueColombia
    },
    details: {
      tagline: "Colombia's musical capital — warm, affordable, and underrated mid-sized Andean city.",
      overview: "Ibagué is nicknamed the Musical Capital of Colombia for its long folkloric tradition and annual folk music festival. Sitting at 1285m in the Tolima department, it has a warm year-round climate without the altitude chill of Bogotá or Medellín. It's a genuine mid-sized Colombian city: prices are very low, the pace is relaxed, and the infrastructure is solid. It receives very few foreign visitors, making it an authentic off-the-tourist-trail base.",
      bestFor: ['Authentic Colombian mid-city experience', 'Warm comfortable temperature at moderate altitude', 'Very affordable cost of living'],
      watchouts: ['Limited coworking infrastructure compared to Medellín or Bogotá', 'Fewer international flight options', 'Bimodal heavy rain seasons in April-May and October-November'],
      neighborhoods: ['Ambala', 'El Jordán', 'Picaleña', 'La Pola', 'Calambeo'],
      mobility: 'Buses and rideshare cover the city; walking is practical in central areas.',
      climateNote: 'Warm subtropical highland climate around 27°C with bimodal rainfall. April-May and October-November are the wettest periods.',
      workstyle: 'Good fibre broadband in built-up areas; café culture is developing but less dense than Medellín.',
      pace: 'Easy-going, warm, and community-oriented.',
      airport: {
        description: 'IBE (Perales) with connections to Bogotá; plans for a new airport are ongoing.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Nevado del Tolima, the coffee region, and the Magdalena river valley are all close by.'
    }
  },
  "Santa Marta": {
    id: 'santa-marta',
    name: 'Santa Marta',
    country: 'Colombia',
    coordinates: [-74.1994, 11.2408],
    snapshot: {
      populationMetro: '0.6M',
      altitudeM: 4,
      landscape: 'Caribbean beach city beneath the Sierra Nevada',
      purchasingPowerRank: 50,
      internet: { downloadMbps: 145, uploadMbps: 70, latencyMs: 20 },
      ...climate.santaMartaCaribbean
    },
    details: {
      tagline: "Colombia's oldest city — Caribbean beach life with the world's highest coastal mountain backdrop.",
      overview: "Santa Marta is Colombia's oldest Spanish city (founded 1525) and one of the most scenically dramatic: the snow-capped Sierra Nevada de Santa Marta rises from sea level to 5700m just kilometres inland, the most extreme coastal mountain range on Earth. The city has a growing expat and digital nomad scene centred around the Rodadero and El Rodadero beach areas, affordable Caribbean seafood, and direct access to Tayrona National Park.",
      bestFor: ['Caribbean beach lifestyle in Colombia', 'Tayrona and Sierra Nevada access', 'More relaxed and affordable than Cartagena'],
      watchouts: ['Hot and humid virtually year-round', 'Infrastructure and coworking options less developed than larger cities', 'Power outages can occur in surrounding areas'],
      neighborhoods: ['El Rodadero', 'Centro Histórico', 'Bello Horizonte', 'Taganga', 'Minca (mountain village)'],
      mobility: 'Taxis and rideshare are the main options; a short bus hop connects to Rodadero beach.',
      climateNote: 'Hot Caribbean climate around 31°C year-round. Very dry from December to April, with a moderate wet season peaking in October.',
      workstyle: 'Adequate broadband in main residential zones; coworking is limited but growing with the nomad scene.',
      pace: 'Relaxed Caribbean pace — unhurried, warm, and beach-oriented.',
      airport: {
        description: 'SMR (Simón Bolívar) with flights to Bogotá, Medellín, and some Caribbean destinations.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Tayrona National Park is 45 minutes away; Ciudad Perdida trek departs from here; Minca cloud forest in the hills above.'
    }
  },
  Chiclayo: {
    id: 'chiclayo',
    name: 'Chiclayo',
    country: 'Peru',
    coordinates: [-79.1947, -6.7735],
    snapshot: {
      populationMetro: '0.8M',
      altitudeM: 29,
      landscape: 'Coastal city in Lambayeque region, gateway to Moche archaeology',
      purchasingPowerRank: 51,
      internet: { downloadMbps: 120, uploadMbps: 55, latencyMs: 22 },
      ...climate.chiclayoCoastal
    },
    details: {
      tagline: 'Peru\'s second-largest metro on the north coast — warm, affordable, and archaeologically rich.',
      overview: 'Chiclayo is the commercial hub of northern Peru and a major gateway to extraordinary Moche and Sicán archaeology (Huacas de Moche, Túmulo Huaca Rajada). The city sits on a pleasant desert plain with a warm climate year-round. Costs are very low, broadband is solid, and there\'s a lively local culture with strong traditional crafts markets. It\'s underrated and undervisited.',
      bestFor: ['Archaeology access (Moche/Sicán sites)', 'Very low cost of living', 'North Peru base for regional travel'],
      watchouts: ['Very dry — don\'t expect beaches or green', 'Smaller city — fewer luxury services', 'Limited direct international flights'],
      neighborhoods: ['Centro', 'La Victoria', 'Monsefu', 'Monsefú (traditional crafts)'],
      mobility: 'Taxis and rideshare cover the city; walking in the central core.',
      climateNote: 'Hot desert climate with minimal rain. Warm year-round around 30°C, coolest in June-July.',
      workstyle: 'Good broadband in central areas; growing nomad presence with a few coworking options.',
      pace: 'Easygoing, traditional, and commercially vibrant.',
      airport: {
        description: 'CIX (José María Corpancho) with connections to Lima and some coastal cities.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Huacas de Moche, Túmulo Huaca Rajada, and the Sechura Desert are all immediately nearby.'
    }
  },
  Piura: {
    id: 'piura',
    name: 'Piura',
    country: 'Peru',
    coordinates: [-80.4132, -5.1944],
    snapshot: {
      populationMetro: '1.2M',
      altitudeM: 50,
      landscape: 'Desert city in Peru\'s northernmost region',
      purchasingPowerRank: 52,
      internet: { downloadMbps: 130, uploadMbps: 60, latencyMs: 21 },
      ...climate.piuraDesert
    },
    details: {
      tagline: 'Peru\'s far north — hottest, driest, and most underrated coastal city.',
      overview: 'Piura is Peru\'s second-largest northern metro and one of the oldest Spanish cities in South America (founded 1532). It\'s desert-hot year-round with virtually no rain. The city has a strong commercial character, reasonable infrastructure, and costs are very low. It\'s a base for exploring the Sechura Desert and accessing Ecuador quickly, but it receives few international visitors.',
      bestFor: ['Ultra-dry desert climate', 'Northernmost Peru access', 'Very low cost living'],
      watchouts: ['Extreme heat (32°C+) January-March', 'Almost no green space or natural water', 'Remote from other major cities'],
      neighborhoods: ['Castilla', 'Centro', 'San Roque', 'Tacala'],
      mobility: 'Taxis and rideshare; walking in a tight central grid.',
      climateNote: 'Hyper-arid desert climate. Extremely hot and dry except January-March when brief rains can occur.',
      workstyle: 'Adequate broadband; minimal coworking but steady internet.',
      pace: 'Hot, fast-paced commercial city without tourism polish.',
      airport: {
        description: 'PIU (Cap. Guillermo Concha Ibáñez) with links to Lima and Ecuador.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Sechura Desert, Ecuador border, and Máncora beach town (2 hours north).'
    }
  },
  Iquitos: {
    id: 'iquitos',
    name: 'Iquitos',
    country: 'Peru',
    coordinates: [-73.2245, -3.7469],
    snapshot: {
      populationMetro: '0.6M',
      altitudeM: 105,
      landscape: 'Jungle river city at the heart of the Amazon',
      purchasingPowerRank: 53,
      internet: { downloadMbps: 85, uploadMbps: 35, latencyMs: 45 },
      ...climate.iquitosAmazon
    },
    details: {
      tagline: 'Gateway to the Amazon rainforest — remote, wild, and utterly different from the Andes.',
      overview: 'Iquitos is the largest city in the world without road access — you fly in or arrive by river. It\'s the hub for Peru\'s Amazon region and offers an authentic jungle experience. The city is hot, humid, and always wet, but offers jungle lodges, river tours, and unique tourism infrastructure. For remote workers, it\'s a challenging but extraordinary base. Internet is slower and less reliable than coastal cities.',
      bestFor: ['Amazon immersion', 'Jungle lodge access', 'Ayahuasca retreat destination'],
      watchouts: ['Very high humidity and constant mosquitoes', 'Slower, less reliable internet', 'Remote supply chain issues', 'Health risks (dengue, malaria)'],
      neighborhoods: ['Belen', 'Punchana', 'Iquitos Proper', 'Puerto de Belén'],
      mobility: 'Motocars (auto-rickshaws), boats, and colectivos; waterways during high water.',
      climateNote: 'Tropical rainforest climate — hot, humid, and wet year-round around 28-29°C with heavy rainfall.',
      workstyle: 'Internet is the major constraint; hotels and lodges offer adequate but sometimes unstable connectivity.',
      pace: 'Slow, chaotic, and utterly immersive in jungle life.',
      airport: {
        description: 'IQT (Coronel FAP Francisco Secada Vignetta) with flights to Lima and some other jungle cities.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Amazon River is the city; jungle lodges, river tours, and rainforest day trips everywhere.'
    }
  },
  Chimbote: {
    id: 'chimbote',
    name: 'Chimbote',
    country: 'Peru',
    coordinates: [-78.5721, -9.0783],
    snapshot: {
      populationMetro: '0.4M',
      altitudeM: 15,
      landscape: 'Industrial fishing port city on the Peruvian coast',
      purchasingPowerRank: 54,
      internet: { downloadMbps: 110, uploadMbps: 50, latencyMs: 23 },
      ...climate.chimboteCoastal
    },
    details: {
      tagline: 'Peru\'s fishing capital — industrial, gritty, and surprisingly functional.',
      overview: 'Chimbote is Peru\'s largest fishing port and industrial manufacturing hub. It\'s not a tourist destination, but for remote workers seeking an ultra-affordable, authentic Peruvian city on a true working dock, it offers that experience. The climate is cool and dry (Humboldt Current), the costs are minimal, and there\'s genuine local life without noise.',
      bestFor: ['Industrial/working-class Peru experience', 'Lowest cost of living', 'Coastal cooling effect'],
      watchouts: ['Industrial grit and fish-processing smell', 'Minimal tourism infrastructure', 'Not designed for visitors'],
      neighborhoods: ['Centro', 'Nuevo Chimbote', 'Puerto', 'La Ensenada'],
      mobility: 'Local buses and taxis; a compact city centre.',
      climateNote: 'Cold desert coastal climate driven by the Humboldt Current. Cool (18°C), dry, and often overcast.',
      workstyle: 'Solid broadband; authentic local cafés; minimal distractions.',
      pace: 'Industrial, purposeful, and unpretentious.',
      airport: {
        description: 'CIX or flying into Lima; Chimbote is accessed via coast road or flights to nearby Trujillo.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Coastal cliffs, fish-rich waters, and desert landscape; Huaraz and the Cordillera Blanca are inland.'
    }
  },
  Guayaquil: {
    id: 'guayaquil',
    name: 'Guayaquil',
    country: 'Ecuador',
    coordinates: [-79.8711, -2.1894],
    snapshot: {
      populationMetro: '3.3M',
      altitudeM: 7,
      landscape: 'Tropical riverside mega-city and Ecuador\'s economic powerhouse',
      purchasingPowerRank: 55,
      internet: { downloadMbps: 200, uploadMbps: 95, latencyMs: 15 },
      ...climate.guayaquilTropical
    },
    details: {
      tagline: 'Ecuador\'s largest city and main economic engine — tropical, vibrant, and surprisingly cosmopolitan.',
      overview: 'Guayaquil is Ecuador\'s largest city and the heart of the country\'s commerce and industry. Unlike quiet Quito, Guayaquil is fast-paced, warm (tropical), and very busy. It\'s a commercial hub with good infrastructure, strong broadband, and an expanding expat/digital nomad scene. The Malecón 2000 riverfront is beautiful. It\'s hurricane-adjacent but Ecuador hasn\'t directly hit in decades.',
      bestFor: ['Ecuador\'s main business hub', 'Tropical beach proximity', 'Best broadband in Ecuador'],
      watchouts: ['Hot and humid year-round', 'Rainy season June-September can be intense', 'Traffic congestion is significant'],
      neighborhoods: ['Malecón', 'Urdesa', 'Samborondón', 'La Raíz', 'Centro'],
      mobility: 'Metro bus system, taxis, and rideshare; the city is large but mobile.',
      climateNote: 'Tropical humid climate with a brief cool dry season December-April, then warm wet June-September.',
      workstyle: 'Excellent broadband, many coworking spaces, and a vibrant café culture.',
      pace: 'Fast, commercial, and energetic.',
      airport: {
        description: 'GYE (José Joaquín de Olmedo) is Ecuador\'s main international hub with direct flights across the Americas and to Miami/Europe.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Galápagos islands (flights depart from here), Otavalo markets 3 hours away, cloud forests nearby.'
    }
  },
  "Santo Domingo": {
    id: 'santo-domingo',
    name: 'Santo Domingo',
    country: 'Ecuador',
    coordinates: [-79.1721, -0.2482],
    snapshot: {
      populationMetro: '0.4M',
      altitudeM: 280,
      landscape: 'Humid subtropical valley city connecting coast and highlands',
      purchasingPowerRank: 56,
      internet: { downloadMbps: 95, uploadMbps: 45, latencyMs: 26 },
      ...climate.santoDomingoClimate
    },
    details: {
      tagline: 'Ecuador\'s crossroads — between Guayaquil coast and Quito highlands.',
      overview: 'Santo Domingo de los Tsáchilas is a mid-sized city in the humid tropics that connects the coast to the highlands. It\'s not a major tourist destination but offers an authentic Ecuador experience with reasonable infrastructure, very affordable costs, and access to both ecosystems. The climate is warm and wet.',
      bestFor: ['Transitional coast-highland location', 'Authentic local Ecuador experience', 'Very affordable'],
      watchouts: ['High humidity and frequent rain', 'Less cosmopolitan than Guayaquil or Quito', 'Smaller airport with limited flights'],
      neighborhoods: ['Centro', 'Las Bahías', 'La Magdalena', 'Zaracay'],
      mobility: 'Local taxis, colectivos, and buses.',
      climateNote: 'Humid subtropical with high rainfall year-round, especially in rainy season.',
      workstyle: 'Adequate broadband in central areas; quieter than coastal cities.',
      pace: 'Relaxed, humid, and localized.',
      airport: {
        description: 'Small regional airport; routing through Guayaquil or Quito is typical.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Cloud forests and indigenous reserves are close; rivers and waterfalls nearby.'
    }
  },
  Manta: {
    id: 'manta',
    name: 'Manta',
    country: 'Ecuador',
    coordinates: [-80.7321, -0.9535],
    snapshot: {
      populationMetro: '0.4M',
      altitudeM: 4,
      landscape: 'Pacific beach city and Ecuador\'s second-largest port',
      purchasingPowerRank: 57,
      internet: { downloadMbps: 130, uploadMbps: 60, latencyMs: 19 },
      ...climate.mantaCoastal
    },
    details: {
      tagline: 'Ecuador\'s Pacific beach escape — cool, coastal, and reliably pleasant.',
      overview: 'Manta is Ecuador\'s primary Pacific port and a seaside city with a cool desert-like climate thanks to the cold Humboldt Current. It\'s less developed than Salinas or major tourist beaches but offers an authentic beach-city vibe with good seafood, reasonable costs, and a growing expat community.',
      bestFor: ['Pacific beach living', 'Cool coastal climate', 'Authentic beach-city culture'],
      watchouts: ['Sparse tourism infrastructure', 'Can be windy', 'Limited nightlife'],
      neighborhoods: ['Centro', 'Tarqui', 'San Mateo', 'Bungabay'],
      mobility: 'Local taxis and buses; walking along the waterfront.',
      climateNote: 'Cool coastal climate with minimal rain except in warm season January-March.',
      workstyle: 'Good broadband on the coast; relaxed beach town pace.',
      pace: 'Beach-town laid-back.',
      airport: {
        description: 'Small regional airport; routing through Guayaquil typical.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Pacific Ocean, whale watching in season, nearby beaches.'
    }
  },
  Cúcuta: {
    id: 'cucuta',
    name: 'Cúcuta',
    country: 'Colombia',
    coordinates: [-72.5089, 7.8836],
    snapshot: {
      populationMetro: '1.0M',
      altitudeM: 421,
      landscape: 'Border city in a warm valley on the Venezuela-Colombia line',
      purchasingPowerRank: 58,
      internet: { downloadMbps: 155, uploadMbps: 70, latencyMs: 17 },
      ...climate.cucutaBorder
    },
    details: {
      tagline: 'Colombia\'s hottest city — intense heat, border commerce, and direct Venezuela access.',
      overview: 'Cúcuta is Colombia\'s northernmost major city and sits directly across the border from Venezuela. It\'s extremely hot, with intense border-town energy. It\'s not typically a destination for remote workers, but for anyone requiring direct Venezuela access or studying border dynamics, it offers that experience. Costs are very low.',
      bestFor: ['Venezuela-Colombia border experience', 'Extremely low cost of living', 'Hot-climate base'],
      watchouts: ['Extremely hot and intense heat stress', 'Border instability', 'Not a tourist destination'],
      neighborhoods: ['Centro', 'Barrio Libertador', 'Antonia Santos'],
      mobility: 'Local taxis and colectivos.',
      climateNote: 'Hot valley climate around 31-33°C year-round with bimodal rainfall.',
      workstyle: 'Adequate broadband; commercial city focus.',
      pace: 'Hot, fast, and commercially intense.',
      airport: {
        description: 'CUC (Camilo Daza) with connections to major Colombian cities.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Serranía del Perijá mountains; border river; Venezuela across the way.'
    }
  },
  Manizales: {
    id: 'manizales',
    name: 'Manizales',
    country: 'Colombia',
    coordinates: [-75.4973, 5.0688],
    snapshot: {
      populationMetro: '0.5M',
      altitudeM: 2127,
      landscape: 'Cool cloud-forest highland city at the edge of the Coffee Triangle',
      purchasingPowerRank: 59,
      internet: { downloadMbps: 175, uploadMbps: 80, latencyMs: 16 },
      ...climate.manizalesCloud
    },
    details: {
      tagline: 'Colombia\'s coffee-region capital — cool, misty, and exceptionally walkable.',
      overview: 'Manizales sits at 2127m at the edge of the Coffee Triangle with a perpetually cool, cloudy climate (bring layers). The city is modern, clean, walkable, and has a strong university presence giving it a youthful vibe. It\'s a base for coffee plantation visits and hiking. Good broadband and coworking infrastructure.',
      bestFor: ['Coffee region access', 'Cool highland climate', 'University-town energy'],
      watchouts: ['Constant cloud cover and mist', 'Can feel cold coming from warmer cities', 'Budget coffee tourism'],
      neighborhoods: ['Centro', 'Asomadero', 'Tebaida', 'La Enea'],
      mobility: 'Steep hillside city; cable car system and buses; mostly walkable centre.',
      climateNote: 'Cool cloud-forest climate around 18-20°C with constant cloud cover and high annual rainfall.',
      workstyle: 'Excellent broadband, many coworking spaces, strong café culture.',
      pace: 'Cool, misty, energetic with university vibe.',
      airport: {
        description: 'MZL (La Nubia) with connections to major cities; often access via Medellín.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Coffee plantations, cloud forests, Nevado del Ruiz volcano, and hiking everywhere.'
    }
  },
  Villavicencio: {
    id: 'villavicencio',
    name: 'Villavicencio',
    country: 'Colombia',
    coordinates: [-73.6347, 4.1431],
    snapshot: {
      populationMetro: '0.5M',
      altitudeM: 467,
      landscape: 'Gateway to the Llanos plains, warm valley city',
      purchasingPowerRank: 60,
      internet: { downloadMbps: 160, uploadMbps: 75, latencyMs: 18 },
      ...climate.villavicencioLlano
    },
    details: {
      tagline: 'Gateway to Colombia\'s eastern plains — warm, commercial, and authentic local life.',
      overview: 'Villavicencio is the main city on the eastern side of the Andes, sitting at the edge of the vast Llanos plains. It\'s a warm (27°C), busy commercial hub with strong cattle ranching heritage. It\'s not a major tourist destination but offers authentic Colombian city life, very affordable costs, and access to unique eastern plains landscapes.',
      bestFor: ['Llanos plains access', 'Authentic commercial city', 'Very low costs'],
      watchouts: ['Warm year-round', 'Bimodal heavy rain seasons', 'Less polished than Medellín or Bogotá'],
      neighborhoods: ['Centro Commercial', 'Los Libertadores', 'Lourdes'],
      mobility: 'Taxis, colectivos, and local buses.',
      climateNote: 'Warm lowland climate around 27°C with bimodal heavy rainfall.',
      workstyle: 'Good broadband; growing local economy.',
      pace: 'Warm, commercial, and wide-open.',
      airport: {
        description: 'VVC (Apiay) with connections to Bogotá and other cities.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Llanos landscape, Los Llanos wetlands, and eastern mountains.'
    }
  },
  Pasto: {
    id: 'pasto',
    name: 'Pasto',
    country: 'Colombia',
    coordinates: [-77.2767, 1.2136],
    snapshot: {
      populationMetro: '0.5M',
      altitudeM: 2527,
      landscape: 'High Andean valley close to the Ecuador border',
      purchasingPowerRank: 61,
      internet: { downloadMbps: 130, uploadMbps: 60, latencyMs: 20 },
      ...climate.pastoPotential
    },
    details: {
      tagline: 'Colombia\'s southernmost city — high mountain, cool, and a base for Ecuador access.',
      overview: 'Pasto sits at 2527m in a high Andean valley very close to Ecuador. It\'s known for its Carnival celebrations and has a genuine local indigenous presence. The city is cool year-round, modest by Colombian standards, and offers authentic highland life. Good broadband and affordable costs.',
      bestFor: ['High-altitude cool climate', 'Ecuador border location', 'Authentic Andean culture'],
      watchouts: ['Cool and cloudy year-round', 'Smaller city options', 'Altitude adjustment needed'],
      neighborhoods: ['Centro', 'Chapinero', 'Botero', 'San Fernando'],
      mobility: 'Local buses and taxis; hilly terrain.',
      climateNote: 'Cool highland climate around 16-17°C year-round with steady rainfall.',
      workstyle: 'Adequate broadband; local café culture.',
      pace: 'Cool, cultural, and community-oriented.',
      airport: {
        description: 'PSO (Antonio Nariño Ripoll) with connections to Bogotá and Ecuador.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Laguna de la Cocha, volcanic landscapes, and Ecuador cloud forests nearby.'
    }
  },
  Montería: {
    id: 'monteria',
    name: 'Montería',
    country: 'Colombia',
    coordinates: [-75.8863, 8.7590],
    snapshot: {
      populationMetro: '0.5M',
      altitudeM: 25,
      landscape: 'Lush Caribbean river-valley city in Colombia\'s north',
      purchasingPowerRank: 62,
      internet: { downloadMbps: 140, uploadMbps: 65, latencyMs: 19 },
      ...climate.monteriaCaribb
    },
    details: {
      tagline: 'Colombia\'s Caribbean interior — hot, humid, and authentically regional.',
      overview: 'Montería is located inland from the Caribbean coast in Colombia\'s Córdoba department. It\'s hot and humid with genuine Caribbean culture and agricultural prosperity. It\'s not a major tourist spot but offers authentic regional Colombian life, good food, and very low costs.',
      bestFor: ['Caribbean interior culture', 'Very affordable', 'Authentic regional Colombia'],
      watchouts: ['Hot and very humid year-round', 'Rainy season intensity', 'Limited tourist infrastructure'],
      neighborhoods: ['Centro', 'Circunvalar', 'La Central'],
      mobility: 'Local buses and colectivos.',
      climateNote: 'Hot Caribbean climate around 31°C with high humidity and bimodal rainfall.',
      workstyle: 'Adequate broadband; local pace.',
      pace: 'Hot, informal, and community-spirited.',
      airport: {
        description: 'MTR (Los Córdobas) with connections to major cities.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Caño Cristales (liquid rainbow river), Caribbean coast 1-2 hours away.'
    }
  },
  Valledupar: {
    id: 'valledupar',
    name: 'Valledupar',
    country: 'Colombia',
    coordinates: [-73.2553, 10.4730],
    snapshot: {
      populationMetro: '0.5M',
      altitudeM: 158,
      landscape: 'Warm Caribbean valley city at the foot of the Sierra Nevada',
      purchasingPowerRank: 63,
      internet: { downloadMbps: 135, uploadMbps: 62, latencyMs: 21 },
      ...climate.valleduparCaribbean
    },
    details: {
      tagline: 'Home of vallenato music — warm, tropical, and steeped in Caribbean folk culture.',
      overview: 'Valledupar is the capital of vallenato music and Colombian tropical folk tradition. It sits in a warm valley with Sierra Nevada backdrop. It\'s less developed than Barranquilla or Cartagena but offers genuine music-and-culture immersion. Costs are very low and the musical heritage is unmistakable.',
      bestFor: ['Vallenato music culture', 'Caribbean valley warmth', 'Ultra-low cost'],
      watchouts: ['Very hot and dry except rainy season', 'Limited other infrastructure', 'Music-focused tourism only'],
      neighborhoods: ['Centro', 'La Sierrita', 'Lourdes'],
      mobility: 'Local taxis and buses.',
      climateNote: 'Caribbean valley climate — very hot and mostly dry except for May-October rains.',
      workstyle: 'Adequate broadband; laid-back pace.',
      pace: 'Hot, folkloric, and music-centric.',
      airport: {
        description: 'VLD (Alfonso López Pumarejo) with connections to Bogotá and Caribbean cities.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Sierra Nevada base for trekking, river valleys, and Caribbean mountain ecosystems.'
    }
  },
  Armenia: {
    id: 'armenia',
    name: 'Armenia',
    country: 'Colombia',
    coordinates: [-75.6867, 4.5345],
    snapshot: {
      populationMetro: '0.6M',
      altitudeM: 1483,
      landscape: 'Cloud-forest coffee-region city at the heart of the Eje Cafetero',
      purchasingPowerRank: 64,
      internet: { downloadMbps: 170, uploadMbps: 78, latencyMs: 17 },
      ...climate.armeniaClimate
    },
    details: {
      tagline: 'Heart of Colombia\'s Coffee Triangle — cool, vibrant, and coffee-perfect.',
      overview: 'Armenia is the main city in the Eje Cafetero (Coffee Axis) and sits at 1483m in cloud forest. It\'s a clean, walkable city with excellent universities, strong café culture, abundant coworking, and a thriving digital nomad scene. Coffee plantation visits, hiking, and local markets are everywhere. It\'s one of Colombia\'s best remote work hubs.',
      bestFor: ['Coffee region living', 'University-town energy', 'Best coffee-region infrastructure'],
      watchouts: ['Constant cloud cover', 'Cool weather year-round', 'Can feel monotonous after weeks'],
      neighborhoods: ['Centro', 'Bolívar', 'Circunvalar', 'Rosa Luxemburgo'],
      mobility: 'Hilly city; buses and cable cars; walkable centre.',
      climateNote: 'Cool cloud-forest climate around 21-22°C with high year-round rainfall.',
      workstyle: 'Excellent broadband, many coworking spaces, best café culture in the coffee region.',
      pace: 'Cool, vibrant, and coffee-lovers\' paradise.',
      airport: {
        description: 'ARM (Pereira) or nearby airports; Armenia is the heart of the Triangle.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Coffee plantations, cloud forests, Nevados, and Valle de Cocora nearby.'
    }
  },
  Oruro: {
    id: 'oruro',
    name: 'Oruro',
    country: 'Bolivia',
    coordinates: [-67.1278, -17.9829],
    snapshot: {
      populationMetro: '0.3M',
      altitudeM: 3706,
      landscape: 'High-altitude mining city on the Altiplano',
      purchasingPowerRank: 65,
      internet: { downloadMbps: 60, uploadMbps: 30, latencyMs: 32 },
      ...climate.oruLoClimate
    },
    details: {
      tagline: 'Bolivia\'s high-altitude mining capital — cold, cultural, and extreme altitude.',
      overview: 'Oruro sits at 3706m on the Altiplano and is Bolivia\'s second-largest city. It\'s known for its Carnival celebrations (Diablada festival) and mining heritage. The altitude is extreme, the climate is cold and dry, and the infrastructure is modest. It\'s not for everyone, but for those seeking a true high-altitude Altiplano experience, Oruro is authentic and affordable.',
      bestFor: ['Extreme altitude experience', 'Carnival festivals', 'Authentic working-class mining city'],
      watchouts: ['Extreme altitude (3706m) — acclimatization essential', 'Very cold climate', 'Slower internet', 'Limited infrastructure'],
      neighborhoods: ['Centro', 'San Francisco', 'Barrio Minero'],
      mobility: 'Local buses and taxis; compact city centre.',
      climateNote: 'High-altitude Altiplano climate — cold around 11°C year-round, very dry.',
      workstyle: 'Slower internet; minimal coworking; local pace is slow.',
      pace: 'Slow, cold, traditional, and culturally rich.',
      airport: {
        description: 'ORU (Capitán Eduardo Avaroa) with connections to La Paz and other Bolivian cities.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Altiplano landscape, mining areas, Salar de Uyuni 4 hours south.'
    }
  }
}

const orderedProfiles = (cityNames as string[]).map((name) => {
  const profile = cityProfilesByName[name]

  if (!profile) {
    throw new Error(`Missing profile data for ${name}`)
  }

  return profile
})

export default orderedProfiles
