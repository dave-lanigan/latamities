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

export interface FoodAndDrinkProfile {
  foods: string[]
  coffee: string
  wine: string
  spirits: string[]
  cocktails: string[]
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
    foodAndDrink?: FoodAndDrinkProfile
    airbnb?: { avgMonthlyUSD: number | null; sampleSize?: number; updatedAt?: string }
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
  oaxacaHighland: {
    temperatureByMonth: series([18, 20, 22, 24, 25, 24, 23, 23, 22, 21, 20, 18]),
    rainfallByMonth: series([10, 8, 12, 25, 70, 160, 140, 150, 180, 85, 22, 12])
  },
  monterreySemiArid: {
    temperatureByMonth: series([15, 18, 22, 26, 30, 33, 35, 35, 31, 26, 20, 16]),
    rainfallByMonth: series([15, 14, 20, 38, 65, 55, 40, 75, 150, 65, 25, 18])
  },
  mexicanPacific: {
    temperatureByMonth: series([25, 25, 26, 27, 29, 30, 30, 30, 30, 29, 27, 25]),
    rainfallByMonth: series([20, 8, 4, 3, 18, 175, 250, 265, 245, 95, 25, 15])
  },
  veracruzTropical: {
    temperatureByMonth: series([23, 24, 26, 28, 30, 29, 29, 29, 28, 27, 25, 23]),
    rainfallByMonth: series([40, 32, 38, 55, 100, 220, 170, 195, 255, 180, 80, 50])
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
  belemEquatorial: {
    temperatureByMonth: series([27, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28]),
    rainfallByMonth: series([390, 410, 430, 390, 300, 175, 150, 105, 100, 115, 160, 280])
  },
  vitoriaCoastal: {
    temperatureByMonth: series([28, 29, 28, 26, 24, 23, 22, 23, 24, 25, 26, 28]),
    rainfallByMonth: series([145, 120, 145, 90, 55, 40, 45, 45, 65, 120, 185, 205])
  },
  joaoPessoaTropical: {
    temperatureByMonth: series([30, 30, 30, 29, 28, 27, 27, 27, 28, 29, 30, 30]),
    rainfallByMonth: series([55, 80, 145, 260, 310, 315, 235, 140, 75, 35, 25, 35])
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

const cityFoodDrinkMetadata = {
  guadalajara: { foods: ['birria', 'torta ahogada', 'carne en su jugo'], coffee: 'Mexico has a strong coffee culture and produces arabica, notably in southern states.', wine: 'Mexico has a growing wine industry, led by Baja California.', spirits: ['tequila', 'raicilla'], cocktails: ['cantarito', 'paloma'] },
  'buenos-aires': { foods: ['asado', 'empanadas', 'milanesa napolitana'], coffee: 'Historic café culture; Argentina grows limited coffee.', wine: 'Major wine producer; Malbec is the signature.', spirits: ['fernet', 'grappa', 'gin'], cocktails: ['claricó', 'fernet con cola'] },
  santiago: { foods: ['pastel de choclo', 'completo', 'empanada de pino'], coffee: 'Strong urban specialty-coffee culture; Chile is not a major grower.', wine: 'Major wine producer, especially Cabernet Sauvignon, Carménère, and Sauvignon Blanc.', spirits: ['pisco'], cocktails: ['pisco sour', 'terremoto'] },
  lima: { foods: ['ceviche', 'lomo saltado', 'ají de gallina'], coffee: 'Peru produces high-quality arabica, including Andean and Amazonian coffees.', wine: 'Peru produces wine, though pisco is more internationally prominent.', spirits: ['pisco', 'Peruvian rum'], cocktails: ['pisco sour', 'chilcano'] },
  bogota: { foods: ['ajiaco santafereño', 'tamal bogotano', 'chocolate santafereño'], coffee: 'Colombia is a major arabica producer; Bogotá has a deep café culture.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'rum'], cocktails: ['canelazo', 'refajo'] },
  'mexico-city': { foods: ['tacos al pastor', 'tlacoyos', 'chiles en nogada'], coffee: 'Mexico has a strong coffee culture and produces arabica, notably in southern states.', wine: 'Mexico has a growing wine industry, led by Baja California.', spirits: ['tequila', 'mezcal', 'pulque'], cocktails: ['paloma', 'margarita'] },
  medellin: { foods: ['bandeja paisa', 'arepa antioqueña', 'buñuelos'], coffee: 'Colombia is a major arabica producer; Antioquia is a key coffee region.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente antioqueño', 'rum'], cocktails: ['canelazo', 'refajo'] },
  cali: { foods: ['sancocho de gallina', 'chuleta valluna', 'abórrajado'], coffee: 'Colombia is a major arabica producer with an established coffee culture.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'viche'], cocktails: ['canelazo', 'refajo'] },
  'rio-de-janeiro': { foods: ['feijoada', 'biscoito Globo', 'bolinho de bacalhau'], coffee: 'Brazil is the world’s largest coffee producer and has a strong café culture.', wine: 'Brazil produces wine, chiefly in the south.', spirits: ['cachaça'], cocktails: ['caipirinha', 'batida'] },
  barranquilla: { foods: ['arepa de huevo', 'butifarra soledeña', 'arroz de lisa'], coffee: 'Colombia is a major arabica producer with an established coffee culture.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'rum'], cocktails: ['canelazo', 'refajo'] },
  'sao-paulo': { foods: ['virado à paulista', 'mortadella sandwich', 'coxinha'], coffee: 'Brazil is the world’s largest coffee producer; São Paulo is central to its coffee culture.', wine: 'Brazil produces wine, chiefly in the south.', spirits: ['cachaça'], cocktails: ['caipirinha', 'batida'] },
  curitiba: { foods: ['barreado', 'pierogi', 'carne de onça'], coffee: 'Brazil is the world’s largest coffee producer and has a strong café culture.', wine: 'Brazil produces wine, chiefly in the south.', spirits: ['cachaça'], cocktails: ['caipirinha'] },
  caracas: { foods: ['arepas', 'pabellón criollo', 'cachapas'], coffee: 'Venezuela has a long coffee-growing tradition and café culture.', wine: 'Not a wine-producing country at scale.', spirits: ['Venezuelan rum', 'cocuy'], cocktails: ['cuba libre'] },
  quito: { foods: ['locro de papa', 'llapingachos', 'hornado'], coffee: 'Ecuador produces specialty coffee, especially arabica from the Andes and coast.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'pájaro azul'], cocktails: ['canelazo'] },
  montevideo: { foods: ['chivito', 'asado', 'torta frita'], coffee: 'Strong café and mate culture; Uruguay is not a significant coffee producer.', wine: 'Established wine producer, especially Tannat.', spirits: ['grappa', 'caña'], cocktails: ['medio y medio'] },
  asuncion: { foods: ['sopa paraguaya', 'chipa', 'mbejú'], coffee: 'Coffee is consumed widely but Paraguay is not a major producer.', wine: 'Not a wine-producing country at scale.', spirits: ['caña paraguaya'], cocktails: ['tereré ruso'] },
  'la-paz': { foods: ['salteñas', 'plato paceño', 'anticuchos'], coffee: 'Bolivia produces specialty coffee in the Yungas and other highland foothills.', wine: 'Bolivia produces wine, principally in the Tarija region.', spirits: ['singani'], cocktails: ['chuflay', 'yungueñito'] },
  'santa-cruz-de-la-sierra': { foods: ['majadito', 'locro carretero', 'cuñapé'], coffee: 'Bolivia produces specialty coffee in the Yungas and other highland foothills.', wine: 'Bolivia produces wine, principally in the Tarija region.', spirits: ['singani'], cocktails: ['chuflay'] },
  cochabamba: { foods: ['pique macho', 'silpancho', 'chicharrón cochabambino'], coffee: 'Bolivia produces specialty coffee in the Yungas and other highland foothills.', wine: 'Bolivia produces wine, principally in the Tarija region.', spirits: ['singani'], cocktails: ['chuflay'] },
  'san-salvador': { foods: ['pupusas', 'yuca frita con chicharrón', 'panes con pollo'], coffee: 'El Salvador is a notable arabica producer with a strong coffee culture.', wine: 'Not a wine-producing country at scale.', spirits: ['chaparro', 'rum'], cocktails: ['tic tac'] },
  cuenca: { foods: ['mote pillo', 'cuy asado', 'cascaritas'], coffee: 'Ecuador produces specialty coffee, especially arabica from the Andes and coast.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'pájaro azul'], cocktails: ['canelazo'] },
  arequipa: { foods: ['rocoto relleno', 'adobo arequipeño', 'ocopa'], coffee: 'Peru produces high-quality arabica, including Andean and Amazonian coffees.', wine: 'Peru produces wine, though pisco is more internationally prominent.', spirits: ['pisco'], cocktails: ['pisco sour', 'chilcano'] },
  puebla: { foods: ['mole poblano', 'cemitas', 'chalupas'], coffee: 'Mexico has a strong coffee culture and produces arabica, notably in southern states.', wine: 'Mexico has a growing wine industry, led by Baja California.', spirits: ['tequila', 'mezcal'], cocktails: ['margarita', 'paloma'] },
  salvador: { foods: ['acarajé', 'moqueca baiana', 'vatapá'], coffee: 'Brazil is the world’s largest coffee producer and has a strong café culture.', wine: 'Brazil produces wine, chiefly in the south.', spirits: ['cachaça'], cocktails: ['caipirinha', 'batida'] },
  cartagena: { foods: ['arepa de huevo', 'posta negra cartagenera', 'cazuela de mariscos'], coffee: 'Colombia is a major arabica producer with an established coffee culture.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'Colombian rum'], cocktails: ['canelazo', 'refajo'] },
  cusco: { foods: ['cuy al horno', 'chiri uchu', 'alpaca steak'], coffee: 'Peru produces high-quality arabica, including Andean and Amazonian coffees.', wine: 'Peru produces wine, though pisco is more internationally prominent.', spirits: ['pisco'], cocktails: ['pisco sour', 'chilcano'] },
  trujillo: { foods: ['ceviche norteño', 'shambar', 'cabrito a la norteña'], coffee: 'Peru produces high-quality arabica, including Andean and Amazonian coffees.', wine: 'Peru produces wine, though pisco is more internationally prominent.', spirits: ['pisco'], cocktails: ['pisco sour', 'chilcano'] },
  bucaramanga: { foods: ['hormigas culonas', 'carne oreada', 'arepa santandereana'], coffee: 'Colombia is a major arabica producer with an established coffee culture.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'rum'], cocktails: ['canelazo', 'refajo'] },
  pereira: { foods: ['bandeja paisa', 'arepa de chócolo', 'sancocho'], coffee: 'In the Coffee Axis; Colombia is a major arabica producer.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'rum'], cocktails: ['canelazo', 'refajo'] },
  'san-jose': { foods: ['gallo pinto', 'casado', 'olla de carne'], coffee: 'Costa Rica is a renowned high-quality arabica producer.', wine: 'Not a wine-producing country at scale.', spirits: ['guaro'], cocktails: ['chiliguaro'] },
  cordoba: { foods: ['lomito cordobés', 'choripán', 'empanadas cordobesas'], coffee: 'Strong café culture; Argentina grows limited coffee.', wine: 'Major wine producer; Córdoba also has emerging vineyards.', spirits: ['fernet', 'grappa'], cocktails: ['fernet con cola'] },
  manaus: { foods: ['tacacá', 'tambaqui assado', 'pirarucu'], coffee: 'Brazil is the world’s largest coffee producer and has a strong café culture.', wine: 'Brazil produces wine, chiefly in the south.', spirits: ['cachaça'], cocktails: ['caipirinha'] },
  belem: { foods: ['tacacá', 'pato no tucupi', 'maniçoba'], coffee: 'Brazil is the world’s largest coffee producer and has a strong café culture.', wine: 'Brazil produces wine, chiefly in the south.', spirits: ['cachaça'], cocktails: ['caipirinha'] },
  'belo-horizonte': { foods: ['pão de queijo', 'feijão tropeiro', 'frango com quiabo'], coffee: 'Brazil is the world’s largest coffee producer; Minas Gerais is a major producing state.', wine: 'Brazil produces wine, chiefly in the south.', spirits: ['cachaça'], cocktails: ['caipirinha'] },
  florianopolis: { foods: ['sequência de camarão', 'oysters', 'pirão de peixe'], coffee: 'Brazil is the world’s largest coffee producer and has a strong café culture.', wine: 'Brazil produces wine, chiefly in the south.', spirits: ['cachaça'], cocktails: ['caipirinha'] },
  vitoria: { foods: ['moqueca capixaba', 'torta capixaba', 'caranguejada'], coffee: 'Brazil is the world’s largest coffee producer; Espírito Santo is a major robusta producer.', wine: 'Brazil produces wine, chiefly in the south.', spirits: ['cachaça'], cocktails: ['caipirinha'] },
  fortaleza: { foods: ['carne de sol', 'baião de dois', 'peixada cearense'], coffee: 'Brazil is the world’s largest coffee producer and has a strong café culture.', wine: 'Brazil produces wine, chiefly in the south.', spirits: ['cachaça'], cocktails: ['caipirinha'] },
  'joao-pessoa': { foods: ['tapioca', 'carne de sol', 'rubacão'], coffee: 'Brazil is the world’s largest coffee producer and has a strong café culture.', wine: 'Brazil produces wine, chiefly in the south.', spirits: ['cachaça'], cocktails: ['caipirinha'] },
  recife: { foods: ['bolo de rolo', 'caldinho de sururu', 'carne de sol'], coffee: 'Brazil is the world’s largest coffee producer and has a strong café culture.', wine: 'Brazil produces wine, chiefly in the south.', spirits: ['cachaça'], cocktails: ['caipirinha'] },
  merida: { foods: ['cochinita pibil', 'papadzules', 'sopa de lima'], coffee: 'Mexico has a strong coffee culture and produces arabica, notably in southern states.', wine: 'Mexico has a growing wine industry, led by Baja California.', spirits: ['xtabentún', 'balché'], cocktails: ['margarita', 'paloma'] },
  leon: { foods: ['guacamayas', 'enchiladas mineras', 'cecina'], coffee: 'Mexico has a strong coffee culture and produces arabica, notably in southern states.', wine: 'Mexico has a growing wine industry, led by Baja California.', spirits: ['tequila', 'mezcal'], cocktails: ['margarita', 'paloma'] },
  tegucigalpa: { foods: ['baleadas', 'sopa de caracol', 'montucas'], coffee: 'Honduras is a major Central American arabica producer.', wine: 'Not a wine-producing country at scale.', spirits: ['guaro', 'rum'], cocktails: ['guifiti'] },
  'guatemala-city': { foods: ['pepián', 'kak’ik', 'chuchitos'], coffee: 'Guatemala is a major specialty arabica producer.', wine: 'Not a wine-producing country at scale.', spirits: ['Guatemalan rum', 'cusha'], cocktails: ['mojito guatemalteco'] },
  managua: { foods: ['nacatamal', 'vigorón', 'gallo pinto'], coffee: 'Nicaragua is a notable arabica producer.', wine: 'Not a wine-producing country at scale.', spirits: ['rum', 'guaro'], cocktails: ['macuá'] },
  'san-pedro-sula': { foods: ['baleadas', 'carne asada', 'sopa de caracol'], coffee: 'Honduras is a major Central American arabica producer.', wine: 'Not a wine-producing country at scale.', spirits: ['guaro', 'rum'], cocktails: ['guifiti'] },
  valparaiso: { foods: ['chorrillana', 'seafood empanadas', 'congrio frito'], coffee: 'Strong urban specialty-coffee culture; Chile is not a major grower.', wine: 'Major wine producer, especially Cabernet Sauvignon, Carménère, and Sauvignon Blanc.', spirits: ['pisco'], cocktails: ['pisco sour', 'terremoto'] },
  concepcion: { foods: ['humitas', 'curanto', 'empanada de pino'], coffee: 'Strong urban specialty-coffee culture; Chile is not a major grower.', wine: 'Major wine producer; the nearby Biobío region makes cool-climate wines.', spirits: ['pisco'], cocktails: ['pisco sour', 'terremoto'] },
  mendoza: { foods: ['asado', 'empanadas mendocinas', 'chivito'], coffee: 'Strong café culture; Argentina grows limited coffee.', wine: 'Argentina’s principal wine region, renowned for Malbec.', spirits: ['grappa', 'gin'], cocktails: ['claricó', 'fernet con cola'] },
  'porto-alegre': { foods: ['churrasco gaúcho', 'arroz de carreteiro', 'xis'], coffee: 'Brazil is the world’s largest coffee producer and has a strong café culture.', wine: 'Brazil produces wine; Rio Grande do Sul is its principal wine region.', spirits: ['cachaça'], cocktails: ['caipirinha'] },
  'panama-city': { foods: ['sancocho panameño', 'arroz con pollo', 'carimañolas'], coffee: 'Panama produces exceptional specialty coffee, notably Geisha from Boquete.', wine: 'Not a wine-producing country at scale.', spirits: ['seco herrerano', 'rum'], cocktails: ['chichita panameña'] },
  sucre: { foods: ['chorizo chuquisaqueño', 'mondongo chuquisaqueño', 'salteñas'], coffee: 'Bolivia produces specialty coffee in the Yungas and other highland foothills.', wine: 'Bolivia produces wine, principally in the Tarija region.', spirits: ['singani'], cocktails: ['chuflay'] },
  ibague: { foods: ['lechona tolimense', 'tamal tolimense', 'viudo de pescado'], coffee: 'Colombia is a major arabica producer with an established coffee culture.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'rum'], cocktails: ['canelazo', 'refajo'] },
  'santa-marta': { foods: ['cayeye', 'fried fish with coconut rice', 'arepa de huevo'], coffee: 'Colombia is a major arabica producer; the Sierra Nevada also grows coffee.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'Colombian rum'], cocktails: ['canelazo', 'refajo'] },
  chiclayo: { foods: ['arroz con pato', 'seco de cabrito', 'tortilla de raya'], coffee: 'Peru produces high-quality arabica, including Andean and Amazonian coffees.', wine: 'Peru produces wine, though pisco is more internationally prominent.', spirits: ['pisco'], cocktails: ['pisco sour', 'chilcano'] },
  piura: { foods: ['seco de chavelo', 'malarrabia', 'ceviche piurano'], coffee: 'Peru produces high-quality arabica, including Andean and Amazonian coffees.', wine: 'Peru produces wine, though pisco is more internationally prominent.', spirits: ['pisco'], cocktails: ['pisco sour', 'chilcano'] },
  iquitos: { foods: ['juanes', 'tacacho con cecina', 'patarashca'], coffee: 'Peru produces high-quality arabica, including Andean and Amazonian coffees.', wine: 'Peru produces wine, though pisco is more internationally prominent.', spirits: ['pisco', 'aguardiente de caña'], cocktails: ['pisco sour', 'chilcano'] },
  chimbote: { foods: ['ceviche', 'jalea', 'sudado de pescado'], coffee: 'Peru produces high-quality arabica, including Andean and Amazonian coffees.', wine: 'Peru produces wine, though pisco is more internationally prominent.', spirits: ['pisco'], cocktails: ['pisco sour', 'chilcano'] },
  guayaquil: { foods: ['encebollado', 'bolón de verde', 'seco de pollo'], coffee: 'Ecuador produces specialty coffee, especially arabica from the Andes and coast.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'rum'], cocktails: ['canelazo'] },
  'santo-domingo': { foods: ['maito de pescado', 'tilapia asada', 'bolón de verde'], coffee: 'Ecuador produces specialty coffee, especially arabica from the Andes and coast.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'rum'], cocktails: ['canelazo'] },
  manta: { foods: ['ceviche manabita', 'corviche', 'viche manabita'], coffee: 'Ecuador produces specialty coffee, especially arabica from the Andes and coast.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'rum'], cocktails: ['canelazo'] },
  cucuta: { foods: ['mute santandereano', 'pastel de garbanzo', 'arepa ocañera'], coffee: 'Colombia is a major arabica producer with an established coffee culture.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'rum'], cocktails: ['canelazo', 'refajo'] },
  manizales: { foods: ['bandeja paisa', 'arepa de chócolo', 'sancocho'], coffee: 'In the Coffee Axis; Colombia is a major arabica producer.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'rum'], cocktails: ['canelazo', 'refajo'] },
  villavicencio: { foods: ['mamona', 'hayacas', 'arroz llanero'], coffee: 'Colombia is a major arabica producer with an established coffee culture.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'rum'], cocktails: ['canelazo', 'refajo'] },
  pasto: { foods: ['cuy asado', 'empanadas de añejo', 'helado de paila'], coffee: 'Colombia is a major arabica producer; Nariño is a celebrated coffee origin.', wine: 'Not a wine-producing country at scale.', spirits: ['chapil', 'aguardiente'], cocktails: ['canelazo'] },
  monteria: { foods: ['mote de queso', 'bocachico frito', 'suero costeño'], coffee: 'Colombia is a major arabica producer with an established coffee culture.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'rum'], cocktails: ['canelazo', 'refajo'] },
  valledupar: { foods: ['sancocho vallenato', 'arepa de queso', 'carne en posta'], coffee: 'Colombia is a major arabica producer with an established coffee culture.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'rum'], cocktails: ['canelazo', 'refajo'] },
  armenia: { foods: ['bandeja paisa', 'sancocho', 'arepa de chócolo'], coffee: 'In the Coffee Axis; Colombia is a major arabica producer.', wine: 'Not a wine-producing country at scale.', spirits: ['aguardiente', 'rum'], cocktails: ['canelazo', 'refajo'] },
  oaxaca: { foods: ['tlayudas', 'mole negro', 'memelas'], coffee: 'Oaxaca is an important Mexican specialty-coffee region.', wine: 'Mexico has a growing wine industry, led by Baja California.', spirits: ['mezcal'], cocktails: ['mezcal negroni', 'margarita'] },
  monterrey: { foods: ['cabrito', 'machacado con huevo', 'carne asada'], coffee: 'Mexico has a strong coffee culture and produces arabica, notably in southern states.', wine: 'Mexico has a growing wine industry, led by Baja California.', spirits: ['tequila', 'mezcal'], cocktails: ['margarita', 'paloma'] },
  'puerto-vallarta': { foods: ['pescado zarandeado', 'ceviche', 'birria'], coffee: 'Mexico has a strong coffee culture and produces arabica, notably in southern states.', wine: 'Mexico has a growing wine industry, led by Baja California.', spirits: ['tequila', 'raicilla'], cocktails: ['cantarito', 'paloma'] },
  mazatlan: { foods: ['aguachile', 'tacos gobernador', 'pescado zarandeado'], coffee: 'Mexico has a strong coffee culture and produces arabica, notably in southern states.', wine: 'Mexico has a growing wine industry, led by Baja California.', spirits: ['tequila', 'mezcal'], cocktails: ['margarita', 'paloma'] },
  veracruz: { foods: ['huachinango a la veracruzana', 'arroz a la tumbada', 'picadas'], coffee: 'Veracruz is a major Mexican coffee-growing state with a strong café tradition.', wine: 'Mexico has a growing wine industry, led by Baja California.', spirits: ['tequila', 'mezcal'], cocktails: ['margarita', 'paloma'] },
  oruro: { foods: ['charquekan', 'sopa de maní', 'api con pastel'], coffee: 'Bolivia produces specialty coffee in the Yungas and other highland foothills.', wine: 'Bolivia produces wine, principally in the Tarija region.', spirits: ['singani'], cocktails: ['chuflay'] }
} satisfies Record<string, FoodAndDrinkProfile>

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
      foodAndDrink: cityFoodDrinkMetadata['guadalajara'],
      bestFor: ['Product teams with hybrid schedules', 'Good café density', 'Mild winter working months'],
      watchouts: ['Rainy summer afternoons are intense', 'Car traffic adds friction outside core neighborhoods', 'English is less common than in CDMX hotspots'],
      neighborhoods: ['Tourist: Americana', 'Residential: Providencia', 'Hip: Lafayette'],
      mobility: 'Uber works well, the light rail is useful on core lines, and most nomad-friendly areas are easy to stitch together by ride share.',
      climateNote: 'Dry and bright from November to May, stormy but still warm in summer.',
      workstyle: 'Coworking supply is solid and coffee shops are laptop-friendly without being overly polished.',
      pace: 'Social and youthful with a strong design and maker streak.',
      airport: {
        description: 'GDL with strong domestic links and good US connections.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Roughly 45 to 90 minutes to forest trails and lakeside day trips.',
      bars: [
        { name: 'Mecenas', note: 'Shrine to craftsmanship', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Guadalajara/Mecenas.html' },
        { name: 'De La O Cantina', note: 'Rustic tiki cantina', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Guadalajara/De-La-O-Cantina.html' },
        { name: 'El Gallo Altanero', note: 'Innovative agave pours', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Guadalajara/El-Gallo-Altanero.html' },
        { name: 'Farmacia Rita Pérez', note: 'Laidback neighbourhood spot', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Guadalajara/Farmacia-Rita-P%C3%A9rez.html' },
        { name: 'Pare de Sufrir Mezcaleria', note: 'A mezcal education', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Guadalajara/Pare-de-Sufrir-Mezcaleria.html' }
      ],
      restaurants: [
        { name: 'Alcalde', note: 'Regional Jalisco flavours', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Guadalajara/Alcalde.html' },
        { name: 'Bruna', note: 'Reimagined Guadalajara grills', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Guadalajara/Bruna.html' },
        { name: 'La Docena', note: 'Hip oyster specialist', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Guadalajara/La-Docena.html' },
        { name: 'Xokol', note: 'Back-to-basics Latin', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Guadalajara/Xokol.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['buenos-aires'],
      bestFor: ['Writers and designers', 'Big-city social life', 'Long café work sessions'],
      watchouts: ['Economic volatility affects pricing and payments', 'Summer can feel muggy', 'Petty theft awareness matters'],
      neighborhoods: ['Tourist: Palermo', 'Residential: Recoleta', 'Hip: Belgrano'],
      mobility: 'Subte, buses, and rideshare form a practical network; many daily routines are walkable in the northern neighborhoods.',
      climateNote: 'Best working season is March to May or September to November.',
      workstyle: 'Rich café culture and reliable apartment internet make home-and-café work common.',
      pace: 'Dense, expressive, and extremely social after dark.',
      airport: {
        description: 'EZE for long-haul and AEP for regional hops.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Urban first; delta boat trips and estancias are more weekend than daily escapes.',
      bars: [
        { name: 'Al Fondo', note: 'Seriously good speakeasy', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Al-Fondo.html' },
        { name: 'Bar 878', note: 'A local hero', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Bar-878.html' },
        { name: 'Boticario', note: 'Experimental vintage pharmacy', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Boticario.html' },
        { name: 'Casa Cavia', note: 'Female-led excellence', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Casa-Cavia.html' },
        { name: 'Chintonería', note: 'Diminutive gin haven', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Chintoner%C3%ADa.html' },
        { name: 'CoChinChina', note: 'Franco-Vietnamese flavours', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/CoChinChina.html' },
        { name: 'Doppelgänger', note: 'Dedicated to classics', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Doppelg%C3%A4nger.html' },
        { name: 'El Limon', note: 'Cool and casual with great food', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/El-Limon.html' },
        { name: 'Florería Atlántico', note: 'Hidden Argentine den', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Florer%C3%ADa-Atl%C3%A1ntico.html' },
        { name: 'Frank\'s', note: 'South American Speakeasy Chic', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Franks.html' },
        { name: 'Gran Bar Danzon', note: 'Chic cocktails and wine', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Gran-Bar-Danzon.html' },
        { name: 'La Uat', note: 'Party bar with \'80s energy', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/La-Uat.html' },
        { name: 'Nicky Harrison', note: 'Immersive speakeasy experience', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Nicky-Harrison.html' },
        { name: 'Presidente', note: 'Upscale inventive cocktails', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Presidente.html' },
        { name: 'Punto Mona', note: 'Luxe lounge and terrace', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Punto-Mona.html' },
        { name: 'Trade Sky Bar', note: 'Stylish sky-high drinking', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Trade-Sky-Bar.html' },
        { name: 'Tres Monos', note: 'Good times great drinks', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Tres-Monos.html' },
        { name: 'Uptown', note: 'Subway-themed cocktails', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Uptown.html' },
        { name: 'Verne Club', note: 'Old-school speakeasy', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Verne-Club.html' },
        { name: 'Victor Audio Bar', note: 'Personal listening lounge', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Victor-Audio-Bar.html' }
      ],
      restaurants: [
        { name: 'Alo’s', note: 'Organic Argentinian haven', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Alos.html' },
        { name: 'Anafe', note: 'Global flavour hub', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Anafe.html' },
        { name: 'Anchoita', note: 'Produce-driven Argentine heroes', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Anchoita.html' },
        { name: 'Aramburu', note: 'Experimental tasting menus', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Aramburu.html' },
        { name: 'Café San Juan', note: 'Contemporary Argentine bodegón', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Caf%C3%A9-San-Juan.html' },
        { name: 'Crizia', note: 'Smart seafood specialist', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Crizia.html' },
        { name: 'Don Julio', note: 'Legendary neighbourhood steakhouse', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Don-Julio.html' },
        { name: 'El Preferido de Palermo', note: 'Banging neighbourhood bodega', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/El-Preferido-de-Palermo.html' },
        { name: 'Elena', note: 'Elegant Argentine steakhouse', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Elena.html' },
        { name: 'Fico', note: 'Neighbourhood dining with finesse', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Fico.html' },
        { name: 'Gran Dabbang', note: 'Latin-Asian street eats', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Gran-Dabbang.html' },
        { name: 'Julia', note: 'Independent-minded bistro', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Julia.html' },
        { name: 'La Cabrera', note: 'Classically meaty Argentinian', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/La-Cabrera.html' },
        { name: 'La Carnicería', note: 'Buzzy butcher\'s shop', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/La-Carnicer%C3%ADa.html' },
        { name: 'Mengano', note: 'Contemporary bodega', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Mengano.html' },
        { name: 'Mercado de Liniers', note: 'Innovative tasting menus', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Mercado-de-Liniers.html' },
        { name: 'Mishiguene', note: 'Updating Jewish classics', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Mishiguene.html' },
        { name: 'Narda Comedor', note: 'Globally inspired greens', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Narda-Comedor.html' },
        { name: 'Ness', note: 'Punk meets technical finesse', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Ness.html' },
        { name: 'Niño Gordo', note: 'Playful Asian tribute', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Ni%C3%B1o-Gordo.html' },
        { name: 'Osaka Concepción', note: 'Nuanced Nikkei flavours', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Osaka-Concepci%C3%B3n.html' },
        { name: 'Oviedo', note: 'Timeless seafood sensation', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Oviedo.html' },
        { name: 'Picarón', note: 'Stylish small plates bistro', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Picar%C3%B3n.html' },
        { name: 'Piedra Pasillo', note: 'Art-driven culinary excellence', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Piedra-Pasillo.html' },
        { name: 'Roux', note: 'Compelling modern cuisine', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Roux.html' },
        { name: 'Sudestada', note: 'Bold, blended casual dining', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Sudestada.html' },
        { name: 'Trescha', note: 'Fine-dining masterclass', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Buenos-Aires/Trescha.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['santiago'],
      bestFor: ['Reliable infrastructure', 'Mountain weekends', 'Teams with lots of video calls'],
      watchouts: ['Winter air quality can dip', 'Costs are above regional average', 'The corporate districts can feel sterile'],
      neighborhoods: ['Tourist: Providencia', 'Residential: Las Condes', 'Hip: Barrio Italia'],
      mobility: 'Metro coverage is excellent and ride share fills the last-mile gaps efficiently.',
      climateNote: 'Sunny and dry most of the year with a cool wet winter.',
      workstyle: 'Strong broadband and orderly daily routines suit people who value predictability.',
      pace: 'Reserved by Latin American mega-city standards, but efficient.',
      airport: {
        description: 'SCL with strong South America coverage and many long-haul options.',
        rideshareFromAirport: false,
        rideshareNote: 'Rideshare apps are not permitted at SCL — use the official taxi rank in the arrivals hall.',
      },
      timeToNature: 'Ski areas and mountain trails are day-trip close in season.',
      bars: [
        { name: 'Bar La Providencia', note: 'Low-key excellence', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/Bar-La-Providencia.html' },
        { name: 'Lolita Jones', note: 'Cocktails down Mexico way', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/Lolita-Jones.html' },
        { name: 'Prima Bar', note: 'Considered cocktails elegant surroundings', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/Prima-Bar.html' },
        { name: 'Siam Thai', note: 'Top-quality Thai', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/Siam-Thai.html' }
      ],
      restaurants: [
        { name: '99 Restaurante', note: 'Dynamic Chilean bistronomy', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/99-Restaurante.html' },
        { name: 'Ambrosia', note: 'Classy comfort food', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/Ambrosia.html' },
        { name: 'Boragó', note: 'Sustainable Chilean gastronomy', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/Borag%C3%B3.html' },
        { name: 'Buriana', note: 'Sexy Italian spot', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/Buriana.html' },
        { name: 'Casa las Cujas', note: 'Bringing beach to Santiago', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/Casa-las-Cujas.html' },
        { name: 'Demencia', note: 'Theatrical small plates', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/Demencia.html' },
        { name: 'Demo Magnolia', note: 'Simple but spectacular', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/Demo-Magnolia.html' },
        { name: 'Fukasawa', note: 'Skillful family-run Japanese', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/Fukasawa.html' },
        { name: 'Karai by Mitsuharu', note: 'Nth degree Nikkei', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/Karai-by-Mitsuharu.html' },
        { name: 'La Calma by Fredes', note: 'Sensational seafood experience', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/La-Calma-by-Fredes.html' },
        { name: 'La Mesa', note: 'Stunningly sustainable dining', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/La-Mesa.html' },
        { name: 'Mestizo', note: 'Modern Chilean plates', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/Mestizo.html' },
        { name: 'Osaka', note: 'Chile’s Nikkei flavours', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/Osaka.html' },
        { name: 'Pulpería Santa Elvira', note: 'Distinctively Chilean dining', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/Pulper%C3%ADa-Santa-Elvira.html' },
        { name: 'Yum Cha', note: 'Tea and tasting menu', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Santiago/Yum-Cha.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['lima'],
      bestFor: ['Food-first travelers', 'Stable temperatures', 'Coastal running routes'],
      watchouts: ['Traffic can be punishing', 'Winter gloom is persistent', 'Quality shifts sharply outside the core districts'],
      neighborhoods: ['Tourist: Miraflores', 'Residential: San Isidro', 'Hip: Barranco'],
      mobility: 'Rideshare dominates for comfort; BRT is useful in spots but less attractive for visitors.',
      climateNote: 'Warmest and brightest from December through April.',
      workstyle: 'A good apartment base city with enough cafés and some stronger hotel-lobby workspaces.',
      pace: 'Busy but not hyperactive, especially by the coast.',
      airport: {
        description: 'LIM is the region’s major connecting hub.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Surf and cliff walks are immediate; mountain hikes are longer outings.',
      bars: [
        { name: 'Bijou Lima', note: 'Chic capital hideaway', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Bijou-Lima.html' },
        { name: 'Carnaval', note: 'High-end cocktail artistry', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Carnaval.html' },
        { name: 'Lady Bee', note: 'Sustainably-minded Peruvian style', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Lady-Bee.html' },
        { name: 'Limaq Bar', note: 'Modern-day Peru', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Limaq-Bar.html' },
        { name: 'Ole Bar Restaurante', note: 'Established Peruvian classic', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Ole-Bar-Restaurante.html' },
        { name: 'Sastrería Martinez', note: 'Handsome Prohibition-era drinking spot', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Sastrer%C3%ADa-Martinez.html' },
        { name: 'The Parrot Shadow', note: 'Globally-minded tropical drinks', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/The-Parrot-Shadow.html' }
      ],
      restaurants: [
        { name: 'Astrid y Gastón', note: 'Ground-breaking Peruvian landmark', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Astrid-y-Gast%C3%B3n.html' },
        { name: 'Central', note: 'Revolutionary indigenous gastronomy', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Central.html' },
        { name: 'Cosme', note: 'Peruvian-Asian twists', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Cosme.html' },
        { name: 'Costanera 700', note: 'Nikkei capital classic', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Costanera-700.html' },
        { name: 'El Mercado', note: 'Sustainable seafood hotspot', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/El-Mercado.html' },
        { name: 'Isolina', note: 'Classy comfort food', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Isolina.html' },
        { name: 'Kjolle', note: 'Laid-back Peruvian', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Kjolle.html' },
        { name: 'La Gloria', note: 'Historic mansion destination', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/La-Gloria.html' },
        { name: 'La Mar', note: 'Iconic Lima cevicheria', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/La-Mar.html' },
        { name: 'Maido', note: 'Nikkei haute cuisine', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Maido.html' },
        { name: 'Mayta', note: 'Exquisite Latin flavours', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Mayta.html' },
        { name: 'Mérito', note: 'Contemporary Venezuelan flavours', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/M%C3%A9rito.html' },
        { name: 'Osso', note: 'Finger-licking Peruvian barbecue', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Osso.html' },
        { name: 'Rafael', note: 'Popular culinary mash-up', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Rafael.html' },
        { name: 'Sapiens', note: 'Fire-fuelled Peruvian kitchen', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Sapiens.html' },
        { name: 'Shizen Restaurante Nikkei', note: 'Ceviche meets sushi', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Shizen-Restaurante-Nikkei.html' },
        { name: 'Siete', note: 'Sharing plates and cocktails', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Siete.html' },
        { name: 'Tomo Cocina Nikkei', note: 'Andean-inspired sushi-ya', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Tomo-Cocina-Nikkei.html' },
        { name: 'Verbena', note: 'Electric night out', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Lima/Verbena.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['bogota'],
      bestFor: ['People who like cooler weather', 'Frequent domestic travel', 'Business-style infrastructure'],
      watchouts: ['Altitude hits some people hard', 'Traffic planning matters every day', 'Rain can roll in quickly'],
      neighborhoods: ['Tourist: Chapinero Alto', 'Residential: Zona G', 'Hip: Parque 93'],
      mobility: 'Rideshare is practical, while TransMilenio is fast but often crowded.',
      climateNote: 'Mild year-round with pronounced wet periods in spring and autumn.',
      workstyle: 'Strong coworking market and many polished cafés in the north.',
      pace: 'Intense, professional, and varied.',
      airport: {
        description: 'BOG is one of the best-connected hubs in Latin America.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Cloud forest and mountain viewpoints are close if you start early.',
      bars: [
        { name: 'Decadente', note: 'Cool neighbourhood secret', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/Decadente.html' },
        { name: 'Jardín Tragos y Pasteles', note: 'Secluded café and garden', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/Jard%C3%ADn-Tragos-y-Pasteles.html' },
        { name: 'La Sala de Laura', note: 'Colombia distilled', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/La-Sala-de-Laura.html' }
      ],
      restaurants: [
        { name: 'Afluente', note: 'Showcasing Colombian biodiversity', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/Afluente.html' },
        { name: 'Cacio & Pepe', note: 'Hip modern Italian', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/Cacio-and-Pepe.html' },
        { name: 'Café Bar Universal', note: 'Light bright and bustling', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/Caf%C3%A9-Bar-Universal.html' },
        { name: 'Debora', note: 'Chic Colombian cuisine', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/Debora.html' },
        { name: 'El Chato', note: 'Seasonal Colombian magic', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/El-Chato.html' },
        { name: 'El Cielo', note: 'Show-stopping technique', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/El-Cielo.html' },
        { name: 'Harry Sasson', note: 'Eclectic international flavours', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/Harry-Sasson.html' },
        { name: 'Humo Negro', note: 'Sustainable Colombian izakaya', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/humo-negro-bogota.html' },
        { name: 'Leo', note: 'Mapping Colombia’s ingredients', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/Leo.html' },
        { name: 'Mesa Franca', note: 'Fresh Colombian perspective', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/Mesa-Franca.html' },
        { name: 'Nueve', note: 'Mediterranean-influenced sharing plates', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/Nueve.html' },
        { name: 'Oda', note: 'Refined South American', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/Oda.html' },
        { name: 'Osaka', note: 'Nikkei-style nuance', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/Osaka.html' },
        { name: 'Pajares Salinas', note: 'Timeless sophisticated Spanish', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/Pajares-Salinas.html' },
        { name: 'Prudencia', note: 'Welcoming lunch spot', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/Prudencia.html' },
        { name: 'Salvo Patria', note: 'Adventurous impactful eating', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/Salvo-Patria.html' },
        { name: 'Selma', note: 'Bold and brilliant Med flavours', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Bogot%C3%A1/Selma.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['mexico-city'],
      bestFor: ['Long stays', 'Creative industries', 'People who want density and choice'],
      watchouts: ['Pollution and altitude can be a rough first week', 'Rents in top neighborhoods are no longer cheap', 'The city rewards local knowledge'],
      neighborhoods: ['Tourist: Roma Norte', 'Residential: Polanco', 'Hip: Condesa'],
      mobility: 'Metro plus walking works in select districts; otherwise rideshare is the friction-reducer.',
      climateNote: 'Pleasant for most of the year, with strongest rains from June to September.',
      workstyle: 'Huge café and coworking selection with strong event density for networking.',
      pace: 'High stimulation and highly rewarding if that is what you want.',
      airport: {
        description: 'MEX with a vast domestic network plus AIFA overflow.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Forest parks are inside the city and proper mountain escapes are weekend-ready.',
      bars: [
        { name: 'Baltra Bar', note: 'Evolutionary cocktail den', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Baltra-Bar.html' },
        { name: 'Bar Mauro', note: 'Milanese nostalgia, reinvented', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Bar-Mauro.html' },
        { name: 'Bijou Drinkery Room', note: 'Sparkling speakeasy gem', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Bijou-Drinkery-Room.html' },
        { name: 'Brujas', note: 'Witchcraft and herbalism', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Brujas.html' },
        { name: 'Cafe Tacobar', note: 'Street tacos and cocktails', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Cafe-Tacobar.html' },
        { name: 'Café de Nadie', note: 'Eclectic symphony of food and booze', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Caf%C3%A9-de-Nadie.html' },
        { name: 'Form + Matter', note: 'Sleek speakeasy', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Form-Matter.html' },
        { name: 'Handshake Speakeasy', note: 'Refined Mexican speakeasy', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Handshake-Speakeasy.html' },
        { name: 'Hanky Panky', note: 'Globally inspired speakeasy', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Hanky-Panky.html' },
        { name: 'Kaito del Valle', note: 'Izakaya-style cocktails', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Kaito-del-Valle.html' },
        { name: 'Less Is More', note: 'Maths meets cocktails', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Less-Is-More.html' },
        { name: 'Licoreria Limantour', note: 'Laidback liquor destination', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Licoreria-Limantour.html' },
        { name: 'Maison Artemisia', note: 'Absinthe and live music', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Maison-Artemisia.html' },
        { name: 'Rayo', note: 'Local spirit champion', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Rayo.html' },
        { name: 'Ticuchi', note: 'Agave cave', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Ticuchi.html' }
      ],
      restaurants: [
        { name: 'Azul Histórico', note: 'Casual and classic Mexican', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Azul-Hist%C3%B3rico.html' },
        { name: 'Bakéa', note: 'Basque-French-Mexican fusion', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Bak%C3%A9a.html' },
        { name: 'Botánico', note: 'Bistro fare with finesse', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Bot%C3%A1nico.html' },
        { name: 'Carmela y Sal', note: 'Tabascan culinary symphony', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Carmela-y-Sal.html' },
        { name: 'Contramar', note: 'Iconic seafood cantina', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Contramar.html' },
        { name: 'Em', note: 'Japanese-Mexican culinary theatre', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Em.html' },
        { name: 'Expendio de Maiz Sin Nombre', note: 'Rural maize meets city', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Expendio-de-Maiz-Sin-Nombre.html' },
        { name: 'Gaba', note: 'Fresh takes on Mexican flavours', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Gaba.html' },
        { name: 'La Docena Oyster Bar & Grill', note: 'Bustling community oyster house', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/La-Docena-Oyster-Bar-and-Grill.html' },
        { name: 'La Once Mil', note: 'Tacos worth waiting for', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/La-Once-Mil.html' },
        { name: 'Lardo', note: 'European-inspired all-day café', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Lardo.html' },
        { name: 'Lorea', note: 'Austerity simplicity beauty', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Lorea.html' },
        { name: 'Maizajo', note: 'A love letter to Mexican corn', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Maizajo.html' },
        { name: 'Máximo', note: 'Sustainable Mexican dining', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/M%C3%A1ximo.html' },
        { name: 'Nicos', note: 'Authentic family-run landmark', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Nicos.html' },
        { name: 'Pujol', note: 'Ground-breaking Mexican gastronomy', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Pujol.html' },
        { name: 'Quintonil', note: 'Precise imaginative sustainability', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Quintonil.html' },
        { name: 'Rosetta', note: 'Invigorated Mexican classics', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Rosetta.html' },
        { name: 'Sarde', note: 'Seafood with a spin', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Sarde.html' },
        { name: 'Sud 777', note: 'Cool contemporary Mexican', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Sud-777.html' },
        { name: 'Ultramarinos Demar', note: 'Capital seafood star', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Mexico-City/Ultramarinos-Demar.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['medellin'],
      bestFor: ['Mild weather every month', 'Apartment-based stays', 'Social nomad hubs'],
      watchouts: ['Tourist concentration changes the feel in hot spots', 'Heavy rain stretches happen', 'You need judgment on neighborhood selection'],
      neighborhoods: ['Tourist: Laureles', 'Residential: El Poblado', 'Hip: Envigado'],
      mobility: 'Metro plus cable cars are great for coverage, and rideshare is easy.',
      climateNote: 'Warm, mild, and wet enough that an umbrella stays relevant.',
      workstyle: 'Good coworking density and abundant furnished rentals.',
      pace: 'Easygoing on the surface, very active socially.',
      airport: {
        description: 'MDE with strong domestic connectivity.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Green hills and reservoir trips are straightforward day outings.',
      bars: [
        { name: 'Bar Carmen', note: 'Colombian culinary cocktails', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Medell%C3%ADn/Bar-Carmen.html' },
        { name: 'Mala Audio Bar', note: 'Cocktails and vinyl', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Medell%C3%ADn/Mala-Audio-Bar.html' },
        { name: 'Mamba Negra', note: 'Legendary skyline views', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Medell%C3%ADn/Mamba-Negra.html' }
      ],
      restaurants: [
        { name: 'Carmen', note: 'Experimental celebratory Colombian', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Medell%C3%ADn/Carmen.html' },
        { name: 'Sambombi Bistró Local', note: 'Hyperlocal sustainable cuisine', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Medell%C3%ADn/Sambombi-Bistr%C3%B3-Local.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['cali'],
      bestFor: ['Music and dance lovers', 'Lower cost city living', 'Short immersion stays'],
      watchouts: ['Fewer polished coworking options', 'Heat is constant', 'Neighborhood choice matters a lot for comfort'],
      neighborhoods: ['Tourist: Granada', 'Residential: Ciudad Jardín', 'Hip: San Antonio'],
      mobility: 'Rideshare is simplest; the BRT helps selectively.',
      climateNote: 'Hot and fairly steady, with wetter months mid-year and in autumn.',
      workstyle: 'Better for apartment-first routines than all-day café hopping.',
      pace: 'Expressive, musical, and fast-moving.',
      airport: {
        description: 'CLO with solid domestic links.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Cloud forest escapes and mountain roads are close.',
      restaurants: [
        { name: 'Domingo', note: 'Colombian cooking with soul', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Cali/Domingo.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['rio-de-janeiro'],
      bestFor: ['Outdoor-heavy lifestyles', 'Beach runs before work', 'People who thrive on visual energy'],
      watchouts: ['Security awareness is non-negotiable', 'Humidity can wear on you', 'Costs in the South Zone add up'],
      neighborhoods: ['Tourist: Ipanema', 'Residential: Leblon', 'Hip: Botafogo'],
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
      foodAndDrink: cityFoodDrinkMetadata['barranquilla'],
      bestFor: ['Caribbean access without Cartagena prices', 'Spanish immersion', 'Short practical stays'],
      watchouts: ['Heat and humidity are heavy', 'Less walkable charm than coastal competitors', 'Premium remote-work infrastructure is limited'],
      neighborhoods: ['Tourist: Alto Prado', 'Residential: Villa Country', 'Hip: Riomar'],
      mobility: 'Taxi and rideshare dominate; car-based movement is common.',
      climateNote: 'Very hot year-round with a wetter late summer and autumn.',
      workstyle: 'Better from apartments or hotels than from café circuits.',
      pace: 'Commercial, festive, and loud when carnival season approaches.',
      airport: {
        description: 'BAQ with easy domestic access.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Beaches and mangrove areas are easy day trips.',
      restaurants: [
        { name: 'Manuel', note: 'Vibrant Colombian cooking', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Barranquilla/Manuel.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['sao-paulo'],
      bestFor: ['Founders and operators', 'Frequent meetings', 'People who value depth over prettiness'],
      watchouts: ['Traffic is constant', 'The scale can feel relentless', 'Good neighborhoods are not cheap'],
      neighborhoods: ['Tourist: Pinheiros', 'Residential: Jardins', 'Hip: Vila Madalena'],
      mobility: 'Metro is strong on main corridors and rideshare closes the gaps.',
      climateNote: 'Warm and humid in summer, pleasantly mild in winter.',
      workstyle: 'Excellent coworking, specialty coffee, and meeting-friendly venues.',
      pace: 'Serious, fast, and inexhaustible.',
      airport: {
        description: 'GRU for global links and CGH for domestic speed.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Atlantic forest and beach escapes are weekend-easy but not instant.',
      bars: [
        { name: 'Bar dos Arcos', note: 'Dramatic underground drinking destination', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Bar-dos-Arcos.html' },
        { name: 'Caledonia', note: 'One-stop whisky destination', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Caledonia.html' },
        { name: 'Exímia', note: 'Brazilian ingredient-focused spectacle', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/Sao-Paulo/Ex%C3%ADmia.html' },
        { name: 'Guilhotina Bar', note: 'Buzzy cocktail joint', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Guilhotina-Bar.html' },
        { name: 'Locale Caffè', note: 'All-day Italian', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/locale-caffe.html' },
        { name: 'Picco', note: 'Casual cocktail and pizza joint', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Picco.html' },
        { name: 'Santana Bar', note: 'Classic cocktail specialist', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Santana-Bar.html' },
        { name: 'Sub Astor', note: 'Hidden cocktail basement', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Sub-Astor.html' },
        { name: 'SubAstor', note: 'Flamboyant subterranean speakeasy', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/SubAstor.html' },
        { name: 'Tan Tan', note: 'Japanese-inspired basement bar', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Tan-Tan.html' },
        { name: 'The Liquor Store', note: 'Minimal mod hideaway', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/The-Liquor-Store.html' }
      ],
      restaurants: [
        { name: 'A Casa do Porco', note: 'Ultimate pig out', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/A-Casa-do-Porco.html' },
        { name: 'Bar da Dona Onça', note: 'Lady Jaguar\'s home', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Bar-da-Dona-On%C3%A7a.html' },
        { name: 'Bar do Biu', note: 'Deceptively simple dining', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Bar-do-Biu.html' },
        { name: 'Borgo Mooca', note: 'Stylish Italian haven', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Borgo-Mooca.html' },
        { name: 'Cais', note: 'Versatile culinary bolthole', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Cais.html' },
        { name: 'Cala del Tanit', note: 'Light and bright bites', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Cala-del-Tanit.html' },
        { name: 'Charco', note: 'Southern Brazilian spirit', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Charco.html' },
        { name: 'Chef Rouge', note: 'Unapologetically French', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Chef-Rouge.html' },
        { name: 'Cora', note: 'Sky-high vibrant cooking', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Cora.html' },
        { name: 'Corrutela', note: 'Sustainable organic cuisine', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Corrutela.html' },
        { name: 'D.O.M.', note: 'Trailblazing hyperlocal institution', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/D-O-M.html' },
        { name: 'Evvai', note: 'Upscale Italian cuisine', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Evvai.html' },
        { name: 'Fame Osteria', note: 'Covert intimate Italian', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Fame-Osteria.html' },
        { name: 'Fasano', note: 'Refined contemporary Italian', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Fasano.html' },
        { name: 'Jun Sakamoto', note: 'Exceptionally-executed omakase', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Jun-Sakamoto.html' },
        { name: 'Kotori', note: 'Slick Japanese fusion', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Kotori.html' },
        { name: 'Kuro Restaurante', note: 'Epic omakase bar', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Kuro-Restaurante.html' },
        { name: 'Madê', note: 'Organic fish-focussed fare', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Made%CC%82.html' },
        { name: 'Maní', note: 'Contemporary Brazilian cuisine', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Man%C3%AD.html' },
        { name: 'Metzi', note: 'Mexican fine dining', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Metzi.html' },
        { name: 'Mocotó', note: 'Brazilian comfort food', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Mocot%C3%B3.html' },
        { name: 'Murakami', note: 'Ever-changing omakase counter', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Murakami.html' },
        { name: 'Nelita', note: 'Female-led Italian favourites', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Nelita.html' },
        { name: 'Notiê', note: 'Nature-led Brazilian', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Noti%C3%AA.html' },
        { name: 'Picchi', note: 'Upscale Italian nostalgia', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Picchi.html' },
        { name: 'Ping Yang Thai Bar & Food', note: 'Down-to-earth Thai', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Ping-Yang-Thai-Bar-and-Food.html' },
        { name: 'Restaurante Aizomê at Japan House', note: 'Authentic Japanese hospitality', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Restaurante-Aizom%C3%AA-at-Japan-House.html' },
        { name: 'Restaurante Cepa', note: 'Market-fresh home cooking', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Restaurante-Cepa.html' },
        { name: 'Ryo Gastronomia', note: 'Kaiseki done right', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Ryo-Gastronomia.html' },
        { name: 'Shin-zushi', note: 'Sushi with Nippon soul', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Shin-zushi.html' },
        { name: 'Tordesilhas', note: 'From-the-heart Brazilian fare', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Tordesilhas.html' },
        { name: 'Tuju', note: 'Contemporary Brazilian cuisine', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/S%C3%A3o-Paulo/Tuju.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['curitiba'],
      bestFor: ['Focused solo work', 'Cooler weather in Brazil', 'Long-stay routines'],
      watchouts: ['Can feel subdued if you want high social energy', 'Winter is damp and gray', 'English support is limited'],
      neighborhoods: ['Tourist: Centro Cívico', 'Residential: Batel', 'Hip: Bigorrilho'],
      mobility: 'BRT heritage makes bus travel unusually workable, plus rideshare is easy.',
      climateNote: 'Cooler and wetter than many expect from Brazil.',
      workstyle: 'Strong apartment city with a steady café layer rather than a flashy scene.',
      pace: 'Measured, efficient, and low-drama.',
      airport: {
        description: 'CWB with good domestic service.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Parks are everywhere and the coast is reachable for weekends.',
      restaurants: [
        { name: 'Manu', note: 'Unlocking Curitiba’s flavours', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/Curitiba/Manu.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['caracas'],
      bestFor: ['Travelers with family or existing networks', 'Short visits with local guidance', 'People prioritizing cultural familiarity'],
      watchouts: ['Infrastructure reliability varies sharply', 'Security and payments require planning', 'Not a casual plug-and-play nomad base'],
      neighborhoods: ['Tourist: Altamira', 'Residential: Los Palos Grandes', 'Hip: La Castellana'],
      mobility: 'Movement is easiest with trusted taxis, drivers, and local advice.',
      climateNote: 'Warm year-round with a wetter middle of the year.',
      workstyle: 'Best approached with strong local hosting rather than independent setup.',
      pace: 'Fast, improvised, and highly context-dependent.',
      airport: {
        description: 'CCS for regional access, subject to operational variability.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Mountain viewpoints and the coast are geographically close.',
      bars: [
        { name: 'Robusto', note: 'Sophisticated cigar specialist', link: 'https://www.theworlds50best.com/discovery/Establishments/Venezuela/Caracas/Robusto.html' }
      ],
      restaurants: [
        { name: 'El Bosque Bistró', note: 'Venezuelan neighbourhood gem', link: 'https://www.theworlds50best.com/discovery/Establishments/Venezuela/Caracas/El-Bosque-Bistr%C3%B3.html' },
        { name: 'La Casa Bistro', note: 'Convivial lunch spot', link: 'https://www.theworlds50best.com/discovery/Establishments/Venezuela/Caracas/La-Casa-Bistro.html' },
        { name: 'La Posada De Cervantes', note: 'Sharing plates with soul', link: 'https://www.theworlds50best.com/discovery/Establishments/Venezuela/Caracas/La-Posada-De-Cervantes.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['quito'],
      bestFor: ['Scenic urban living', 'Lower-cost Andean base', 'People who enjoy cooler days'],
      watchouts: ['Altitude is a real factor', 'Rain and sun can flip quickly', 'Infrastructure is solid but less polished than Chile or São Paulo'],
      neighborhoods: ['Tourist: La Carolina', 'Residential: Cumbayá', 'Hip: La Floresta'],
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
        { name: 'Casa Gangotena Restaurant', note: 'Artful Ecuadorian fusions', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Quito/Casa-Gangotena-Restaurant.html' },
        { name: 'Chez Jérôme', note: 'No-frills French fare', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Quito/Chez-J%C3%A9r%C3%B4me.html' },
        { name: 'Ciré', note: 'Progressive cuisine with a view', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Quito/Cir%C3%A9.html' },
        { name: 'Clara', note: 'Rising star of Ecuadorian gastronomy', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Quito/Clara.html' },
        { name: 'Nuema', note: 'Colourful creative Ecuadorean cuisine', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Quito/Nuema.html' },
        { name: 'Nuum', note: 'Made in Ecaudor', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Quito/Nuum.html' },
        { name: 'Pez Bela', note: 'Vibrant ceviche spot', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Quito/Pez-Bela.html' },
        { name: 'Quitu', note: 'Ecuadorian culinary exploration', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Quito/Quitu.html' },
        { name: 'Rincón de Francia', note: 'Longstanding French legacy', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Quito/Rinc%C3%B3n-de-Francia.html' },
        { name: 'Shibumi', note: 'Superb sushi sessions', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Quito/Shibumi.html' },
        { name: 'Somos', note: 'Charming Ecuadorean journey', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Quito/Somos.html' },
        { name: 'Tributo', note: 'A carnivore’s dream', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Quito/Tributo.html' },
        { name: 'Urko', note: 'Ever-changing experimental cuisine', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Quito/Urko.html' },
        { name: 'Z-Food', note: 'Sustainable seafood shop', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Quito/Z-Food.html' }
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
      foodAndDrink: cityFoodDrinkMetadata['montevideo'],
      bestFor: ['Quiet long stays', 'Reliable internet and utilities', 'People who want low-friction daily life'],
      watchouts: ['Prices are high for the region', 'Nightlife is limited compared with larger capitals', 'Winters can feel windy and gray'],
      neighborhoods: ['Tourist: Pocitos', 'Residential: Punta Carretas', 'Hip: Cordón'],
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
      foodAndDrink: cityFoodDrinkMetadata['asuncion'],
      bestFor: ['Low-profile stays', 'Regional business travel', 'People comfortable with apartment-centered routines'],
      watchouts: ['Summer heat is extreme', 'Public transit is weak', 'Lifestyle options are narrower than in bigger capitals'],
      neighborhoods: ['Tourist: Villa Morra', 'Residential: Recoleta', 'Hip: Carmelitas'],
      mobility: 'Most people rely on car, taxi, or rideshare for comfortable movement.',
      climateNote: 'Very hot summers and stormy shoulder seasons.',
      workstyle: 'Fine for apartment work with selective café use.',
      pace: 'Slower, practical, and business-oriented.',
      airport: {
        description: 'ASU handles regional connectivity well enough.',
        rideshareFromAirport: true,
      },
      timeToNature: 'River edges and countryside escapes are easy day trips.',
      restaurants: [
        { name: '1688 Resto', note: 'La dolce vita indulgence', link: 'https://www.theworlds50best.com/discovery/Establishments/Paraguay/Asuncion/1688-Resto.html' },
        { name: 'Cocina Clandestina', note: 'Paraguayan classics, reimagined', link: 'https://www.theworlds50best.com/discovery/Establishments/Paraguay/Asuncion/Cocina-Clandestina.html' },
        { name: 'Pakuri', note: 'Creative Paraguayan cuisine', link: 'https://www.theworlds50best.com/discovery/Establishments/Paraguay/Asuncion/Pakuri.html' },
        { name: 'Tierra Colorada Gastró', note: 'Colourful Paraguayan cooking', link: 'https://www.theworlds50best.com/discovery/Establishments/Paraguay/Asuncion/Tierra-Colorada-Gastr%C3%B3.html' },
        { name: 'Toro', note: 'A carnivore\'s dream', link: 'https://www.theworlds50best.com/discovery/Establishments/Paraguay/Asuncion/Toro.html' },
        { name: 'Táva Comedor', note: 'Contemporary Paraguayan cuisine', link: 'https://www.theworlds50best.com/discovery/Establishments/Paraguay/Asuncion/T%C3%A1va-Comedor.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['la-paz'],
      bestFor: ['Adventure-oriented stays', 'Photographers', 'People seeking a distinctive urban setting'],
      watchouts: ['Altitude is severe for many people', 'Internet is usable but not elite', 'Daily movement can be tiring at first'],
      neighborhoods: ['Tourist: Sopocachi', 'Residential: Calacoto', 'Hip: San Miguel'],
      mobility: 'Mi Teleférico is genuinely useful and often the best way to move.',
      climateNote: 'Cool and dry for much of the year, with a wetter summer season.',
      workstyle: 'Best for shorter focused stays or travelers with flexible meeting loads.',
      pace: 'Energetic, vertical, and unusual.',
      airport: {
        description: 'LPB and nearby El Alto connections provide domestic reach.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Mountain access is immediate and dramatic.',
      restaurants: [
        { name: 'Ali Pacha', note: 'Bolivia’s vegan universe', link: 'https://www.theworlds50best.com/discovery/Establishments/Bolivia/La-Paz/Ali-Pacha.html' },
        { name: 'Ancestral', note: 'Carnivorous Bolivian paradise', link: 'https://www.theworlds50best.com/discovery/Establishments/Bolivia/La-Paz/Ancestral.html' },
        { name: 'Arami', note: 'Where Andes meet Amazon', link: 'https://www.theworlds50best.com/discovery/Establishments/Bolivia/La-Paz/Arami.html' },
        { name: 'Gustu', note: 'Plating Bolivia’s larder', link: 'https://www.theworlds50best.com/discovery/Establishments/Bolivia/La-Paz/Gustu.html' },
        { name: 'La Rufina', note: 'Street food inspired sophistication', link: 'https://www.theworlds50best.com/discovery/Establishments/Bolivia/La-Paz/La-Rufina.html' },
        { name: 'Phayawi', note: 'Authentic Bolivian experience', link: 'https://www.theworlds50best.com/discovery/Establishments/Bolivia/La-Paz/Phayawi.html' },
        { name: 'Popular Cocina Boliviana', note: 'Simple but accomplished', link: 'https://www.theworlds50best.com/discovery/Establishments/Bolivia/La-Paz/Popular-Cocina-Boliviana.html' }
      ],
    }
  },
  'Santa Cruz de la Sierra': {
    id: 'santa-cruz-de-la-sierra',
    name: 'Santa Cruz de la Sierra',
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
      foodAndDrink: cityFoodDrinkMetadata['santa-cruz-de-la-sierra'],
      bestFor: ['Heat-tolerant travelers', 'Business travel', 'People avoiding high altitude'],
      watchouts: ['Car dependence is high', 'Heat and humidity are constant factors', 'Urban charm is less obvious than in Andean capitals'],
      neighborhoods: ['Tourist: Centro', 'Residential: Urubó', 'Hip: Equipetrol'],
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
      foodAndDrink: cityFoodDrinkMetadata['cochabamba'],
      bestFor: ['Quiet working months', 'Spring-like weather', 'Lower-cost Andean living'],
      watchouts: ['Smaller remote-work ecosystem', 'Limited flight connections', 'You will likely rely on home internet most days'],
      neighborhoods: ['Tourist: Centro', 'Residential: Cala Cala', 'Hip: Queru Queru'],
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
      foodAndDrink: cityFoodDrinkMetadata['san-salvador'],
      bestFor: ['Surf-plus-work routines', 'Short regional bases', 'People who want strong internet without mega-city scale'],
      watchouts: ['Heat and wet season downpours are intense', 'Car dependence is common', 'Urban character is more practical than romantic'],
      neighborhoods: ['Tourist: Colonia Escalón', 'Residential: San Benito', 'Hip: Zona Rosa'],
      mobility: 'Rideshare is the most comfortable option for daily movement.',
      climateNote: 'Hot most of the year with a very wet green season from May onward.',
      workstyle: 'Strong apartment internet and a growing premium café scene.',
      pace: 'Efficient, pragmatic, and increasingly polished.',
      airport: {
        description: 'SAL is one of Central America’s more useful regional hubs.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Volcano viewpoints and surf breaks are reachable within an hour or so.',
      restaurants: [
        { name: 'El Xolo', note: 'A tribute to corn', link: 'https://www.theworlds50best.com/discovery/Establishments/El-Salvador/San-Salvador/El-Xolo.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['cuenca'],
      bestFor: ['Long-stay apartment living', 'Cooler highland climate', 'Architecture and café culture'],
      watchouts: ['Altitude needs acclimatization', 'Internet speeds are slower than major capitals', 'Nightlife and event density are limited'],
      neighborhoods: ['Tourist: El Centro Histórico', 'Residential: El Ejido', 'Hip: Ordoñez Lasso'],
      mobility: 'Walking covers the historic core easily; taxis and ride apps handle wider movement.',
      climateNote: 'Two mild rainy seasons with dry spells in summer and early winter.',
      workstyle: 'Great for focused apartment work with a good café rotation in the historic district.',
      pace: 'Slow, beautiful, and very easy to settle into.',
      airport: {
        description: 'CUE with regional connections to Quito and Guayaquil.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Mountain trails and nature reserves are easy day outings.',
      restaurants: [
        { name: 'Tiesto\'s', note: 'Homely hearty Ecuadorean', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Cuenca/Tiestos.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['arequipa'],
      bestFor: ['Sunny dry climate', 'Andean atmosphere without Cusco altitude', 'Colonial architecture fans'],
      watchouts: ['Altitude still affects some visitors', 'Smaller expat and nomad scene than Lima', 'Evenings can get cold year-round'],
      neighborhoods: ['Tourist: Yanahuara', 'Residential: Cayma', 'Hip: Miraflores'],
      mobility: 'Taxis and ride apps cover daily needs; the compact historic core is walkable.',
      climateNote: 'Very dry and sunny with a brief rainy season from December to March.',
      workstyle: 'Solid apartment-first city with a growing café scene in the historic center.',
      pace: 'Unhurried, proud, and deeply local.',
      airport: {
        description: 'AQP with connections to Lima and Cusco.',
        rideshareFromAirport: true,
      },
      timeToNature: 'El Misti hikes and Colca Canyon are serious nature options within a short drive.',
      restaurants: [
        { name: 'La Nueva Palomino', note: 'Traditional Peru on a plate', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Arequipa/La-Nueva-Palomino.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['puebla'],
      bestFor: ['Mexican food culture', 'Colonial city atmosphere', 'Lower cost than CDMX'],
      watchouts: ['Nomad infrastructure is thinner than Mexico City', 'Smog from Popocatépetl activity can occur', 'Rainy season afternoons are heavy'],
      neighborhoods: ['Tourist: Centro Histórico', 'Residential: Analco', 'Hip: Cholula'],
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
      foodAndDrink: cityFoodDrinkMetadata['salvador'],
      bestFor: ['Music and cultural depth', 'Warm coastal living', 'Brazilian food and nightlife'],
      watchouts: ['Rain season (June-August) is persistent', 'Digital nomad infrastructure is thinner than São Paulo or Rio', 'Street awareness matters outside main tourist zones'],
      neighborhoods: ['Tourist: Pelourinho', 'Residential: Barra', 'Hip: Rio Vermelho'],
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
      foodAndDrink: cityFoodDrinkMetadata['cartagena'],
      bestFor: ['Short coastal stays', 'Architecture and history', 'Weekend beach access'],
      watchouts: ['Heat and humidity are intense year-round', 'Tourist pricing in the old city', 'Fewer coworking options than Bogota or Medellin'],
      neighborhoods: ['Tourist: Centro Histórico', 'Residential: Getsemaní', 'Hip: Bocagrande'],
      mobility: 'Taxis and rideshare are the practical default; the old city is compact on foot.',
      climateNote: 'Hot all year with a wetter second half; the dry season from December to April is the most comfortable.',
      workstyle: 'Best from apartments with strong AC; café culture is limited by the heat.',
      pace: 'Tourist-forward, festive, and intensely warm.',
      airport: {
        description: 'CTG with solid domestic links and growing Caribbean routes.',
        rideshareFromAirport: true,
      },
      timeToNature: 'The Rosario Islands and nearby beaches are easy boat trips.',
      bars: [
        { name: 'Alquímico', note: 'Agenda-setting destination bar', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Cartagena/Alqu%C3%ADmico.html' },
        { name: 'El Barón', note: 'Rustic sustainability champion', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Cartagena/El-Bar%C3%B3n.html' }
      ],
      restaurants: [
        { name: 'Celele', note: 'Carribean-Columbian groundbreaker', link: 'https://www.theworlds50best.com/discovery/Establishments/Colombia/Cartagena/Celele.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['cusco'],
      bestFor: ['Cultural immersion', 'Dry season base for Machu Picchu trips', 'People who thrive at altitude'],
      watchouts: ['Altitude sickness is a real risk above 3,000m', 'Tourism concentration raises prices', 'Cold nights year-round and cold days in winter'],
      neighborhoods: ['Tourist: San Blas', 'Residential: Centro', 'Hip: San Sebastián'],
      mobility: 'Taxis and walking cover most daily movement; the center is compact.',
      climateNote: 'Dry and sunny May through October; rainy and mild November through April.',
      workstyle: 'Small café scene works for shorter stays; apartment internet is adequate.',
      pace: 'Tourist-paced in the center, deeply local just outside it.',
      airport: {
        description: 'CUZ with good Lima connections and some direct international routes.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Sacred Valley and Machu Picchu are the immediate draws; trekking options are extensive.',
      restaurants: [
        { name: 'Mauka', note: 'A celebration of the hyper-local', link: 'https://www.theworlds50best.com/discovery/Establishments/Peru/Cusco/Mauka.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['trujillo'],
      bestFor: ['Surfers and outdoor-first lifestyles', 'Low-cost coastal living', 'Archaeology and history'],
      watchouts: ['Fewer coworking and café options than Lima', 'Dust and dryness are constants', 'Security awareness matters in some neighborhoods'],
      neighborhoods: ['Tourist: Centro Histórico', 'Residential: El Golf', 'Hip: California'],
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
      foodAndDrink: cityFoodDrinkMetadata['bucaramanga'],
      bestFor: ['Low-profile affordable living', 'Comfortable year-round temperature', 'Less tourist traffic than major hubs'],
      watchouts: ['Smaller expat and nomad community', 'Fewer direct international flights', 'Limited premium coworking options'],
      neighborhoods: ['Tourist: Cabecera del Llano', 'Residential: Sotomayor', 'Hip: Cañaveral'],
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
      foodAndDrink: cityFoodDrinkMetadata['pereira'],
      bestFor: ['Coffee tourism base', 'Budget-conscious highland living', 'Access to Salento and Cocora Valley'],
      watchouts: ['Smaller city with fewer nomad amenities', 'Rain is frequent year-round', 'Limited direct international flight access'],
      neighborhoods: ['Tourist: Centro', 'Residential: Pinares', 'Hip: Álamos'],
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
      foodAndDrink: cityFoodDrinkMetadata['san-jose'],
      bestFor: ['Central American regional base', 'Strong English and infrastructure', 'Nature access without full beach isolation'],
      watchouts: ['The city center is not particularly scenic', 'Traffic management is important', 'Higher cost than most of Central America'],
      neighborhoods: ['Tourist: Escazú', 'Residential: Santa Ana', 'Hip: Barrio Escalante'],
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
      foodAndDrink: cityFoodDrinkMetadata['cordoba'],
      bestFor: ['University-town energy', 'Lower cost than Buenos Aires', 'Strong arts and nightlife scene'],
      watchouts: ['Same currency complexity as Buenos Aires', 'Summers are very hot', 'Less international connectivity than BA'],
      neighborhoods: ['Tourist: Nueva Córdoba', 'Residential: Güemes', 'Hip: General Paz'],
      mobility: 'Bus network is functional; rideshare and walking cover most nomad-relevant movement.',
      climateNote: 'Hot dry summers and mild winters; spring and autumn are the sweet spots.',
      workstyle: 'Excellent café culture driven by the student population.',
      pace: 'Active, intellectual, and a bit rawer than Buenos Aires.',
      airport: {
        description: 'COR with domestic links and some direct international routes.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Sierras de Córdoba hills are quick day-trip escapes with hiking and rivers.',
      restaurants: [
        { name: 'El Papagayo', note: 'Distinctive elegant elevated', link: 'https://www.theworlds50best.com/discovery/Establishments/Argentina/Cord%C3%B3ba/El-Papagayo.html' },
        { name: 'Noor', note: 'Andalusian-Moorish exploration', link: 'https://www.theworlds50best.com/discovery/Establishments/Spain/Cordoba/Noor.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['manaus'],
      bestFor: ['Amazon nature access', 'Unique urban experience', 'Jungle and river expeditions'],
      watchouts: ['Heat and humidity are extreme year-round', 'The rainy season brings intense flooding risk in low areas', 'Nomad infrastructure is thinner than southern Brazilian cities'],
      neighborhoods: ['Tourist: Centro', 'Residential: Ponta Negra', 'Hip: Adrianópolis'],
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
  Belém: {
    id: 'belem',
    name: 'Belém',
    country: 'Brazil',
    coordinates: [-48.4902, -1.4558],
    snapshot: {
      populationMetro: '2.5M',
      altitudeM: 10,
      landscape: 'Amazon river estuary city',
      purchasingPowerRank: 37,
      internet: { downloadMbps: 125, uploadMbps: 48, latencyMs: 25 },
      ...climate.belemEquatorial
    },
    details: {
      tagline: 'The Amazon’s food capital, where river life, markets, and equatorial weather shape every day.',
      overview: 'Belém is the largest city at the mouth of the Amazon, known for extraordinary Pará cuisine, river markets, and a deeply local urban culture. Nazaré and Umarizal are the easiest practical bases, while Cidade Velha offers historic character. It is compelling for cultural immersion but demands comfort with heat, rain, and a less polished remote-work ecosystem.',
      foodAndDrink: cityFoodDrinkMetadata['belem'],
      bestFor: ['Amazonian food culture', 'River-city experience', 'Deep Brazilian immersion'],
      watchouts: ['Equatorial heat and humidity are constant', 'Heavy rainfall can disrupt routines', 'Remote-work infrastructure is thinner than southern Brazil'],
      neighborhoods: ['Tourist: Nazaré', 'Residential: Umarizal', 'Hip: Batista Campos'],
      mobility: 'Rideshare and taxis are practical; walking works best within individual central districts.',
      climateNote: 'Hot and humid all year, with especially heavy rain from December through May.',
      workstyle: 'Apartment-first with reliable service in central districts; coworking options are limited.',
      pace: 'River-oriented, culinary, and intensely tropical.',
      airport: {
        description: 'BEL has extensive domestic service and some international links.',
        rideshareFromAirport: true
      },
      timeToNature: 'River islands, mangroves, and Amazon tributary trips start close to the city.'
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
      foodAndDrink: cityFoodDrinkMetadata['belo-horizonte'],
      bestFor: ['Food and bar culture', 'Cooler than coastal Brazil', 'Affordable big-city living'],
      watchouts: ['The rainy season is heavy from November to March', 'Less scenic than coastal cities', 'Traffic is significant across most of the city'],
      neighborhoods: ['Tourist: Centro', 'Residential: Lourdes', 'Hip: Savassi'],
      mobility: 'Metro is useful on core lines; rideshare fills the gaps efficiently.',
      climateNote: 'Warm and wet in summer, dry and mild in winter — the most comfortable season runs from May to September.',
      workstyle: 'Strong broadband, growing coworking scene, and excellent café density in Savassi.',
      pace: 'Social, food-forward, and less frenetic than São Paulo.',
      airport: {
        description: 'CNF (Confins) for major routes; PLU (Pampulha) for select domestic hops.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Serra do Cipó and Inhotim (world-class outdoor art museum) are easy day trips.',
      restaurants: [
        { name: 'Birosca S2', note: 'Bright inventive Brazilian', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/Belo-Horizonte/Birosca-S2.html' },
        { name: 'Cozinha Tupis', note: 'Up market Brazilian fusion', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/Belo-Horizonte/Cozinha-Tupis.html' },
        { name: 'Glouton', note: 'Mineira-French haute cuisine', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/Belo-Horizonte/Glouton.html' },
        { name: 'Pacato', note: 'Elevated local ingredients', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/Belo-Horizonte/Pacato.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['florianopolis'],
      bestFor: ['Beach-plus-work lifestyle', 'Tech and startup community', 'Outdoor-first living'],
      watchouts: ['Peak summer (Jan-Feb) brings intense crowds and price spikes', 'Getting around the island can be slow', 'Winters are mild but rainy and grey'],
      neighborhoods: ['Tourist: Trindade', 'Residential: João Paulo', 'Hip: Lagoa da Conceição'],
      mobility: 'Car or rideshare is effectively essential to move between beaches and districts.',
      climateNote: 'Warm summers and mild winters; rain is spread throughout the year.',
      workstyle: 'Strong coworking and café scene concentrated in Trindade and near UFSC.',
      pace: 'Tech-startup energy meets surf-town relaxation.',
      airport: {
        description: 'FLN with solid domestic connections.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Beaches and lagoons are immediate; Serra Gaúcha is a weekend trip.',
      restaurants: [
        { name: 'Ostradamus', note: 'Brazilian oyster specialist', link: 'https://www.theworlds50best.com/discovery/Establishments/Brazil/Florianopolis/Ostradamus.html' }
      ],
    }
  },
  Vitória: {
    id: 'vitoria',
    name: 'Vitória',
    country: 'Brazil',
    coordinates: [-40.3378, -20.3155],
    snapshot: {
      populationMetro: '2.0M',
      altitudeM: 4,
      landscape: 'Island-and-bay city beneath granite peaks',
      purchasingPowerRank: 38,
      internet: { downloadMbps: 165, uploadMbps: 72, latencyMs: 18 },
      ...climate.vitoriaCoastal
    },
    details: {
      tagline: 'A compact, underrated Atlantic capital with beaches, mountains, and an easy everyday rhythm.',
      overview: 'Vitória combines urban services, bayfront neighborhoods, beaches, and nearby mountain escapes without the scale or intensity of Rio. Praia do Canto and Enseada do Suá are the most straightforward bases, while neighboring Vila Velha offers broader beachfront living. It is a calm, functional coastal choice with a strong local feel.',
      foodAndDrink: cityFoodDrinkMetadata['vitoria'],
      bestFor: ['Low-friction coastal living', 'Beach and mountain access', 'Quieter Brazilian city life'],
      watchouts: ['Smaller expat and coworking scene', 'Summer can be hot and rainy', 'International flight options are limited'],
      neighborhoods: ['Tourist: Praia do Canto', 'Residential: Enseada do Suá', 'Hip: Jardim da Penha'],
      mobility: 'Rideshare is reliable and central districts are manageable on foot; bridges connect nearby beach areas.',
      climateNote: 'Warm year-round with a wetter summer and drier, mild winter.',
      workstyle: 'Reliable apartment internet and a modest but practical café and coworking scene.',
      pace: 'Relaxed, clean, and more residential than Brazil’s major tourist hubs.',
      airport: {
        description: 'VIX has domestic connections through Brazil’s larger hubs.',
        rideshareFromAirport: true
      },
      timeToNature: 'Beaches are immediate, with Espírito Santo mountain towns and trails reachable on weekends.'
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
      foodAndDrink: cityFoodDrinkMetadata['fortaleza'],
      bestFor: ['Budget coastal living', 'Kite-surfing and beach lifestyle', 'Northeast Brazilian culture'],
      watchouts: ['Security awareness is important outside main tourist zones', 'Heat is relentless', 'Rainy season is very wet from February to May'],
      neighborhoods: ['Tourist: Meireles', 'Residential: Aldeota', 'Hip: Cocó'],
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
  'João Pessoa': {
    id: 'joao-pessoa',
    name: 'João Pessoa',
    country: 'Brazil',
    coordinates: [-34.877, -7.115],
    snapshot: {
      populationMetro: '1.3M',
      altitudeM: 40,
      landscape: 'Low-rise Atlantic coast with reefs and palms',
      purchasingPowerRank: 39,
      internet: { downloadMbps: 140, uploadMbps: 58, latencyMs: 22 },
      ...climate.joaoPessoaTropical
    },
    details: {
      tagline: 'A calm, green northeastern beach city with gentle daily life and strong value.',
      overview: 'João Pessoa offers a quieter alternative to Recife and Fortaleza: a long urban beachfront, leafy residential neighborhoods, and a relaxed local pace. Manaíra, Tambaú, and Cabo Branco give the easiest access to beaches, restaurants, and services. It suits remote workers who want coastal routine and affordability more than big-city intensity.',
      foodAndDrink: cityFoodDrinkMetadata['joao-pessoa'],
      bestFor: ['Quiet beach routine', 'Affordable Brazil', 'Walkable waterfront living'],
      watchouts: ['Rainy season is long', 'Coworking and nightlife are limited', 'International connectivity usually requires a domestic connection'],
      neighborhoods: ['Tourist: Altiplano', 'Residential: Manaíra', 'Hip: Tambaú'],
      mobility: 'The waterfront neighborhoods are walkable; rideshare is easy for cross-city trips.',
      climateNote: 'Warm all year, with wetter months from April through August.',
      workstyle: 'Good apartment internet and enough cafés for light work; better for a calm home-office rhythm.',
      pace: 'Gentle, beach-oriented, and distinctly low-key.',
      airport: {
        description: 'JPA provides domestic links, mainly through São Paulo, Rio, Recife, and Brasília.',
        rideshareFromAirport: true
      },
      timeToNature: 'Urban beaches are immediate, with reef pools and the Paraíba coast close by.'
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
      foodAndDrink: cityFoodDrinkMetadata['recife'],
      bestFor: ['Budget coastal living', 'Frevo and Carnaval culture', 'Reef swimming without an island trip'],
      watchouts: ['Heavy rains from March to July', 'Security awareness needed outside main zones', 'Humidity is persistent year-round'],
      neighborhoods: ['Tourist: Boa Viagem', 'Residential: Recife Antigo', 'Hip: Boa Vista'],
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
      foodAndDrink: cityFoodDrinkMetadata['merida'],
      bestFor: ['Safety-first travelers', 'Colonial city atmosphere', 'Yucatán exploration base'],
      watchouts: ['Heat from April to June is brutal', 'Less developed nomad infrastructure than CDMX or GDL', 'Flat terrain and car dependence outside the centro'],
      neighborhoods: ['Tourist: Centro Histórico', 'Residential: Paseo de Montejo', 'Hip: Altabrisa'],
      mobility: 'Rideshare and taxis cover the city well; bike-friendly in parts of the center.',
      climateNote: 'Hot and dry in spring, rainy July through October, pleasant November through February.',
      workstyle: 'Growing digital nomad scene with coworking near Paseo de Montejo.',
      pace: 'Gracious, slow-burning, and deeply rooted in Yucatecan identity.',
      airport: {
        description: 'MID with good domestic links and some US connections.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Cenotes and Chichén Itzá are within an hour or two; the Gulf coast is close.',
      restaurants: [
        { name: 'Huniik', note: 'Evocative Yucatán sanctuary', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Merida/Huniik.html' },
        { name: 'Ixi\'im Restaurant', note: 'Inventive Mexican magic', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Merida/Ixiim-Restaurant.html' },
        { name: 'Ku\'uk', note: 'Ancient roots reimagined', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Merida/kuuk.html' },
        { name: 'Nectar', note: 'New Yucatecan Cuisine', link: 'https://www.theworlds50best.com/discovery/Establishments/Mexico/Merida/nectar-merida.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['leon'],
      bestFor: ['Low-cost highland base', 'Day trips to Guanajuato and San Miguel', 'Mild climate year-round'],
      watchouts: ['Less polished nomad scene than larger cities', 'Industrial character dominates some areas', 'English is limited outside business contexts'],
      neighborhoods: ['Tourist: Centro', 'Residential: Campestre', 'Hip: Jardines del Moral'],
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
      overview: 'Tegucigalpa is not a polished nomad destination, but its highland setting keeps temperatures comfortable and costs are among the lowest in Central America. Colonia Palmira, Boulevard Morazán, Lomas del Guijarro, and Los Castaños are the most practical zones for visitors, with better access to cafés, restaurants, hotels, and safer ride-share routines than the wider city. It works best for travelers who want a local Central American base rather than an expat bubble.',
      foodAndDrink: cityFoodDrinkMetadata['tegucigalpa'],
      bestFor: ['Budget-conscious Central American base', 'Authentic local city experience', 'Cooler highland temperatures'],
      watchouts: ['Security requires consistent awareness and planning', 'Infrastructure is less reliable than Costa Rica or Panama', 'Nomad amenities are limited'],
      neighborhoods: ['Tourist: Centro Histórico', 'Residential: Lomas del Guijarro', 'Hip: Colonia Palmira'],
      mobility: 'Uber is available and is the simplest default for most visitor trips; use hotel-arranged taxis or trusted drivers when ride availability is thin.',
      climateNote: 'Mild and pleasant October through May; rainy season brings heavy afternoon downpours.',
      workstyle: 'Best from apartments with reliable home internet; coworking is sparse.',
      pace: 'Local, unhurried, and distinctly Central American.',
      airport: {
        description: 'XPL / Palmerola is now the main international airport for Tegucigalpa, about 70 km from the city; the old TGU/Toncontín airport mainly handles limited domestic or special operations.',
        rideshareFromAirport: true,
        rideshareNote: 'Uber operates in Tegucigalpa, but for Palmerola arrivals a pre-arranged shuttle, hotel transfer, or trusted taxi is still the safer default for the long airport-to-city ride.',
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
      foodAndDrink: cityFoodDrinkMetadata['guatemala-city'],
      bestFor: ['Antigua as a day trip base', 'Lower costs than San José', 'Highland climate in Central America'],
      watchouts: ['Security varies sharply by zone', 'Traffic congestion is significant', 'The city lacks the charm of nearby Antigua'],
      neighborhoods: ['Tourist: Zona 10', 'Residential: Zona 14', 'Hip: Zona 15'],
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
      foodAndDrink: cityFoodDrinkMetadata['managua'],
      bestFor: ['Extreme budget travel', 'Nicaragua exploration base', 'Travelers with local contacts'],
      watchouts: ['Political context requires monitoring', 'Heat is extreme at low altitude', 'Nomad infrastructure is very limited'],
      neighborhoods: ['Tourist: Planes de Altamira', 'Residential: Carretera Masaya', 'Hip: Bolonia'],
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
      foodAndDrink: cityFoodDrinkMetadata['san-pedro-sula'],
      bestFor: ['Bay Islands and Copán access', 'Business travel in Honduras', 'Budget Central American stopover'],
      watchouts: ['Security requires careful planning and zone awareness', 'Heat and humidity are constant', 'Very limited digital nomad infrastructure'],
      neighborhoods: ['Tourist: Zona Viva', 'Residential: Jardines del Valle', 'Hip: Los Andes'],
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
      foodAndDrink: cityFoodDrinkMetadata['valparaiso'],
      bestFor: ['Artists and writers', 'Bohemian city atmosphere', 'Budget-conscious Chile base'],
      watchouts: ['Fog and grey skies dominate winter and spring', 'Petty theft requires awareness on the hills', 'Infrastructure is rougher than Santiago'],
      neighborhoods: ['Tourist: Cerro Alegre', 'Residential: Cerro Concepción', 'Hip: Cerro Bellavista'],
      mobility: 'Funiculars, minibuses, and walking up steep stairs are the daily reality.',
      climateNote: 'Mediterranean — dry warm summers and wet cool winters; fog is common year-round.',
      workstyle: 'Good café density on the tourist cerros; home internet is reliable.',
      pace: 'Creative, relaxed, and slightly chaotic.',
      airport: {
        description: 'No commercial airport; SCL (Santiago) is 90 minutes away.',
        rideshareFromAirport: false,
        rideshareNote: 'The nearest commercial airport is SCL in Santiago (90 min away) — rideshare is not legal from that terminal; use official taxis.',
      },
      timeToNature: 'Pacific beaches and coastal trails are immediate; wine country is under an hour east.',
      restaurants: [
        { name: 'La Caperucita y el Lobo', note: 'Quirky sea-view Chilean', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Valpara%C3%ADso/La-Caperucita-y-el-Lobo.html' },
        { name: 'La Concepción', note: 'Chilean seafood', link: 'https://www.theworlds50best.com/discovery/Establishments/Chile/Valpara%C3%ADso/La-Concepci%C3%B3n.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['concepcion'],
      bestFor: ['Budget Chile living', 'University-town energy', 'Base for Chile lake district trips'],
      watchouts: ['Rain is frequent and heavy May through August', 'Colder than Santiago', 'Less international flight access'],
      neighborhoods: ['Tourist: Barrio Universitario', 'Residential: San Pedro de la Paz', 'Hip: Pedro de Valdivia'],
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
      foodAndDrink: cityFoodDrinkMetadata['mendoza'],
      bestFor: ['Wine and outdoor lifestyle', 'Andes access without Santiago prices', 'Relaxed Argentine city pace'],
      watchouts: ['Summer heat is extreme in January and February', 'Same currency complexity as Buenos Aires', 'Fewer direct international flights than BA'],
      neighborhoods: ['Tourist: Ciudad', 'Residential: Quinta Sección', 'Hip: Chacras de Coria'],
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
      foodAndDrink: cityFoodDrinkMetadata['porto-alegre'],
      bestFor: ['Tech and startup ecosystem', 'European-influenced culture', 'Year-round outdoor activities'],
      watchouts: ['Winters are genuinely cold by Brazilian standards', 'Flooding in low-lying areas can occur', 'Less international name recognition than São Paulo or Rio'],
      neighborhoods: ['Tourist: Moinhos de Vento', 'Residential: Bela Vista', 'Hip: Cidade Baixa'],
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
      foodAndDrink: cityFoodDrinkMetadata['panama-city'],
      bestFor: ['USD economy with no exchange risk', 'First-world infrastructure in LatAm', 'Finance and international business connections'],
      watchouts: ['Wet season rain is heavy from May through November', 'Heat and humidity are relentless year-round', 'Cost of living is higher than most of LatAm'],
      neighborhoods: ['Tourist: Casco Viejo', 'Residential: Miraflores', 'Hip: Punta Pacífica'],
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
      foodAndDrink: cityFoodDrinkMetadata['sucre'],
      bestFor: ['Colonial architecture and history', 'Mild highland climate without La Paz altitude stress', 'Ultra-low cost of living'],
      watchouts: ['Internet speeds are slower than larger cities', 'Limited international flight connections', 'Small city — feel it quickly after a few weeks'],
      neighborhoods: ['Tourist: Centro Histórico', 'Residential: Recoleta', 'Hip: San Roque'],
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
      foodAndDrink: cityFoodDrinkMetadata['ibague'],
      bestFor: ['Authentic Colombian mid-city experience', 'Warm comfortable temperature at moderate altitude', 'Very affordable cost of living'],
      watchouts: ['Limited coworking infrastructure compared to Medellín or Bogotá', 'Fewer international flight options', 'Bimodal heavy rain seasons in April-May and October-November'],
      neighborhoods: ['Tourist: Ambala', 'Residential: El Jordán', 'Hip: Picaleña'],
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
      foodAndDrink: cityFoodDrinkMetadata['santa-marta'],
      bestFor: ['Caribbean beach lifestyle in Colombia', 'Tayrona and Sierra Nevada access', 'More relaxed and affordable than Cartagena'],
      watchouts: ['Hot and humid virtually year-round', 'Infrastructure and coworking options less developed than larger cities', 'Power outages can occur in surrounding areas'],
      neighborhoods: ['Tourist: Centro Histórico', 'Residential: El Rodadero', 'Hip: Bello Horizonte'],
      mobility: 'Taxis and rideshare are the main options; a short bus hop connects to Rodadero beach.',
      climateNote: 'Hot Caribbean climate around 31°C year-round. Very dry from December to April, with a moderate wet season peaking in October.',
      workstyle: 'Adequate broadband in main residential zones; coworking is limited but growing with the nomad scene.',
      pace: 'Relaxed Caribbean pace — unhurried, warm, and beach-oriented.',
      airport: {
        description: 'SMR (Simón Bolívar) with flights to Bogotá, Medellín, and some Caribbean destinations.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Tayrona National Park is 45 minutes away; Ciudad Perdida trek departs from here; Minca cloud forest in the hills above.',
      restaurants: [
        { name: 'Proyecto Nativa', note: 'Taste of adventure', link: 'https://www.theworlds50best.com/discovery/Establishments/Bolivia/Sucre/Proyecto-Nativa.html' }
      ],
    }
  },
  Chiclayo: {
    id: 'chiclayo',
    name: 'Chiclayo',
    country: 'Peru',
    coordinates: [-79.8387, -6.7716],
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
      foodAndDrink: cityFoodDrinkMetadata['chiclayo'],
      bestFor: ['Archaeology access (Moche/Sicán sites)', 'Very low cost of living', 'North Peru base for regional travel'],
      watchouts: ['Very dry — don\'t expect beaches or green', 'Smaller city — fewer luxury services', 'Limited direct international flights'],
      neighborhoods: ['Tourist: Centro', 'Residential: La Victoria', 'Hip: Monsefu'],
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
    coordinates: [-80.6267, -5.1971],
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
      foodAndDrink: cityFoodDrinkMetadata['piura'],
      bestFor: ['Ultra-dry desert climate', 'Northernmost Peru access', 'Very low cost living'],
      watchouts: ['Extreme heat (32°C+) January-March', 'Almost no green space or natural water', 'Remote from other major cities'],
      neighborhoods: ['Tourist: Centro', 'Residential: Castilla', 'Hip: Calle Lima'],
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
      foodAndDrink: cityFoodDrinkMetadata['iquitos'],
      bestFor: ['Amazon immersion', 'Jungle lodge access', 'Ayahuasca retreat destination'],
      watchouts: ['Very high humidity and constant mosquitoes', 'Slower, less reliable internet', 'Remote supply chain issues', 'Health risks (dengue, malaria)'],
      neighborhoods: ['Tourist: Belen', 'Residential: Punchana', 'Hip: Iquitos Proper'],
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
      foodAndDrink: cityFoodDrinkMetadata['chimbote'],
      bestFor: ['Industrial/working-class Peru experience', 'Lowest cost of living', 'Coastal cooling effect'],
      watchouts: ['Industrial grit and fish-processing smell', 'Minimal tourism infrastructure', 'Not designed for visitors'],
      neighborhoods: ['Tourist: Centro', 'Residential: Nuevo Chimbote', 'Hip: Puerto'],
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
      foodAndDrink: cityFoodDrinkMetadata['guayaquil'],
      bestFor: ['Ecuador\'s main business hub', 'Tropical beach proximity', 'Best broadband in Ecuador'],
      watchouts: ['Hot and humid year-round', 'Rainy season June-September can be intense', 'Traffic congestion is significant'],
      neighborhoods: ['Tourist: Centro', 'Residential: Samborondón', 'Hip: Malecón'],
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
      foodAndDrink: cityFoodDrinkMetadata['santo-domingo'],
      bestFor: ['Transitional coast-highland location', 'Authentic local Ecuador experience', 'Very affordable'],
      watchouts: ['High humidity and frequent rain', 'Less cosmopolitan than Guayaquil or Quito', 'Smaller airport with limited flights'],
      neighborhoods: ['Tourist: Centro', 'Residential: Bombolí', 'Hip: La Magdalena'],
      mobility: 'Local taxis, colectivos, and buses.',
      climateNote: 'Humid subtropical with high rainfall year-round, especially in rainy season.',
      workstyle: 'Adequate broadband in central areas; quieter than coastal cities.',
      pace: 'Relaxed, humid, and localized.',
      airport: {
        description: 'Small regional airport; routing through Guayaquil or Quito is typical.',
        rideshareFromAirport: true,
      },
      timeToNature: 'Cloud forests and indigenous reserves are close; rivers and waterfalls nearby.',
      bars: [
        { name: 'Acorde', note: 'Sumptuous, stylish lounge', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Guayaquil/Acorde.html' },
        { name: 'Juliana', note: 'Compelling love letter to Ecuador', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Guayaquil/Juliana.html' },
        { name: 'Nicanor', note: 'Golden hour guaranteed', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Guayaquil/Nicanor.html' }
      ],
      restaurants: [
        { name: 'Casa Julián', note: 'Stylishly executed Ecuadorean cuisine', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Guayaquil/Casa-Juli%C3%A1n.html' },
        { name: 'Marrecife', note: 'Homespun with heart and soul', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Guayaquil/Marrecife.html' },
        { name: 'Mikka', note: 'Swanky Nikkei feast', link: 'https://www.theworlds50best.com/discovery/Establishments/Ecuador/Guayaquil/Mikka.html' }
      ],
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
      foodAndDrink: cityFoodDrinkMetadata['manta'],
      bestFor: ['Pacific beach living', 'Cool coastal climate', 'Authentic beach-city culture'],
      watchouts: ['Sparse tourism infrastructure', 'Can be windy', 'Limited nightlife'],
      neighborhoods: ['Tourist: Centro', 'Residential: Tarqui', 'Hip: San Mateo'],
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
      foodAndDrink: cityFoodDrinkMetadata['cucuta'],
      bestFor: ['Venezuela-Colombia border experience', 'Extremely low cost of living', 'Hot-climate base'],
      watchouts: ['Extremely hot and intense heat stress', 'Border instability', 'Not a tourist destination'],
      neighborhoods: ['Tourist: Centro', 'Residential: Los Caobos', 'Hip: Antonia Santos'],
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
      foodAndDrink: cityFoodDrinkMetadata['manizales'],
      bestFor: ['Coffee region access', 'Cool highland climate', 'University-town energy'],
      watchouts: ['Constant cloud cover and mist', 'Can feel cold coming from warmer cities', 'Budget coffee tourism'],
      neighborhoods: ['Tourist: Centro', 'Residential: Palermo', 'Hip: Tebaida'],
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
      foodAndDrink: cityFoodDrinkMetadata['villavicencio'],
      bestFor: ['Llanos plains access', 'Authentic commercial city', 'Very low costs'],
      watchouts: ['Warm year-round', 'Bimodal heavy rain seasons', 'Less polished than Medellín or Bogotá'],
      neighborhoods: ['Tourist: Centro Commercial', 'Residential: Lourdes', 'Hip: Los Libertadores'],
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
      foodAndDrink: cityFoodDrinkMetadata['pasto'],
      bestFor: ['High-altitude cool climate', 'Ecuador border location', 'Authentic Andean culture'],
      watchouts: ['Cool and cloudy year-round', 'Smaller city options', 'Altitude adjustment needed'],
      neighborhoods: ['Tourist: Centro', 'Residential: Santiago', 'Hip: Botero'],
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
      foodAndDrink: cityFoodDrinkMetadata['monteria'],
      bestFor: ['Caribbean interior culture', 'Very affordable', 'Authentic regional Colombia'],
      watchouts: ['Hot and very humid year-round', 'Rainy season intensity', 'Limited tourist infrastructure'],
      neighborhoods: ['Tourist: Centro', 'Residential: Circunvalar', 'Hip: La Castellana'],
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
      foodAndDrink: cityFoodDrinkMetadata['valledupar'],
      bestFor: ['Vallenato music culture', 'Caribbean valley warmth', 'Ultra-low cost'],
      watchouts: ['Very hot and dry except rainy season', 'Limited other infrastructure', 'Music-focused tourism only'],
      neighborhoods: ['Tourist: Centro', 'Residential: Novalito', 'Hip: Plaza Alfonso López'],
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
      foodAndDrink: cityFoodDrinkMetadata['armenia'],
      bestFor: ['Coffee region living', 'University-town energy', 'Best coffee-region infrastructure'],
      watchouts: ['Constant cloud cover', 'Cool weather year-round', 'Can feel monotonous after weeks'],
      neighborhoods: ['Tourist: Centro', 'Residential: Bolívar', 'Hip: La Patria'],
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
  Oaxaca: {
    id: 'oaxaca',
    name: 'Oaxaca',
    country: 'Mexico',
    coordinates: [-96.7266, 17.0732],
    snapshot: {
      populationMetro: '700K',
      altitudeM: 1555,
      landscape: 'Mountain-ringed colonial valley',
      purchasingPowerRank: 28,
      internet: { downloadMbps: 92, uploadMbps: 36, latencyMs: 27 },
      ...climate.oaxacaHighland
    },
    details: {
      tagline: 'Mexico’s food and craft capital, with a relaxed highland rhythm and deep cultural life.',
      overview: 'Oaxaca balances a walkable colonial center, one of Mexico’s strongest food scenes, and quick access to mountain villages, mezcal country, and Pacific beaches. It works well for people who value culture and a slower daily rhythm over the scale and convenience of Mexico City.',
      foodAndDrink: cityFoodDrinkMetadata['oaxaca'],
      bestFor: ['Food and mezcal culture', 'Creative long stays', 'Walkable colonial living'],
      watchouts: ['Summer rains are intense', 'Reliable workspace options are thinner than major Mexican cities', 'Tourist demand raises prices in the historic center'],
      neighborhoods: ['Tourist: Centro Histórico', 'Residential: Jalatlaco', 'Hip: Reforma'],
      mobility: 'The central neighborhoods are walkable; rideshare and taxis are practical for longer trips.',
      climateNote: 'Warm, dry days dominate November through April; summer brings regular afternoon rain.',
      workstyle: 'Apartment-first with a growing café and coworking layer around Centro and Reforma.',
      pace: 'Creative, culinary, and deliberately unhurried.',
      airport: {
        description: 'OAX (Oaxaca International) has domestic links to Mexico City and other Mexican hubs, plus limited international service.',
        rideshareFromAirport: true
      },
      timeToNature: 'Sierra Norte hiking, Hierve el Agua, and mezcal villages are easy day trips; the coast is a longer weekend transfer.'
    }
  },
  Monterrey: {
    id: 'monterrey',
    name: 'Monterrey',
    country: 'Mexico',
    coordinates: [-100.3161, 25.6866],
    snapshot: {
      populationMetro: '5.3M',
      altitudeM: 540,
      landscape: 'Industrial mountain basin',
      purchasingPowerRank: 18,
      internet: { downloadMbps: 170, uploadMbps: 72, latencyMs: 17 },
      ...climate.monterreySemiArid
    },
    details: {
      tagline: 'Northern Mexico’s business capital, framed by mountains and built for practical urban life.',
      overview: 'Monterrey is one of Mexico’s strongest business cities, with a higher-income economy, modern services, and dramatic mountain scenery. San Pedro and Valle Oriente offer the easiest polished landing zone, while Barrio Antiguo and Centro bring more culture and nightlife. It suits remote workers who want infrastructure, flights, and outdoors more than beach-town softness.',
      foodAndDrink: cityFoodDrinkMetadata['monterrey'],
      bestFor: ['Business infrastructure', 'Mountain access', 'Modern apartments'],
      watchouts: ['Summer heat is severe', 'Car dependence is higher than in central Mexican cities', 'Costs are high by Mexican standards'],
      neighborhoods: ['Tourist: San Pedro', 'Residential: Valle Oriente', 'Hip: Barrio Antiguo'],
      mobility: 'Rideshare is reliable, but distances and heat make many routines car-oriented.',
      climateNote: 'Hot semi-arid climate with very hot summers and milder winters.',
      workstyle: 'Strong apartment and office infrastructure, with reliable cafés and coworking in business districts.',
      pace: 'Fast, commercial, and outdoorsy on weekends.',
      airport: {
        description: 'MTY is a major northern hub with strong domestic and US connectivity.',
        rideshareFromAirport: true
      },
      timeToNature: 'Chipinque, La Huasteca, and Sierra Madre hikes are quick escapes from the city.'
    }
  },
  'Puerto Vallarta': {
    id: 'puerto-vallarta',
    name: 'Puerto Vallarta',
    country: 'Mexico',
    coordinates: [-105.2302, 20.6534],
    snapshot: {
      populationMetro: '550K',
      altitudeM: 7,
      landscape: 'Pacific bay backed by jungle mountains',
      purchasingPowerRank: 34,
      internet: { downloadMbps: 115, uploadMbps: 42, latencyMs: 24 },
      ...climate.mexicanPacific
    },
    details: {
      tagline: 'A full-service Pacific beach base with walkable neighborhoods and strong visitor infrastructure.',
      overview: 'Puerto Vallarta is one of Mexico’s easiest coastal bases because it pairs beaches, restaurants, healthcare, and international flights with actual city services. Zona Romántica and Versalles work well for short stays, while Marina and Fluvial suit quieter apartment routines. Heat, humidity, and high-season pricing are the tradeoffs.',
      foodAndDrink: cityFoodDrinkMetadata['puerto-vallarta'],
      bestFor: ['Beach-plus-city routines', 'International flights', 'Restaurant density'],
      watchouts: ['Humid rainy season', 'High-season rents can jump sharply', 'Tourist zones can feel saturated'],
      neighborhoods: ['Tourist: Zona Romántica', 'Residential: Versalles', 'Hip: Marina Vallarta'],
      mobility: 'Central areas are walkable; buses, taxis, and rideshare cover longer trips.',
      climateNote: 'Dry and sunny in winter, then hot and humid with heavy summer rains.',
      workstyle: 'Good apartment internet and a useful café layer, though backup workspace matters in rainy season.',
      pace: 'Social, coastal, and visitor-friendly.',
      airport: {
        description: 'PVR has strong Mexico, US, and Canada service and sits close to town.',
        rideshareFromAirport: true
      },
      timeToNature: 'Beaches, jungle trails, and bay trips are immediate; Sayulita and San Pancho are easy side trips.'
    }
  },
  Mazatlan: {
    id: 'mazatlan',
    name: 'Mazatlan',
    country: 'Mexico',
    coordinates: [-106.4245, 23.2494],
    snapshot: {
      populationMetro: '650K',
      altitudeM: 10,
      landscape: 'Pacific port city with long malecón',
      purchasingPowerRank: 36,
      internet: { downloadMbps: 105, uploadMbps: 38, latencyMs: 25 },
      ...climate.mexicanPacific
    },
    details: {
      tagline: 'A lower-key Pacific city with beaches, old-town character, and a more local rhythm than resort hubs.',
      overview: 'Mazatlán mixes a working port, a long beachfront malecón, and a restored historic center with better value than many better-known Mexican beach bases. Centro Histórico gives the most atmosphere, while Zona Dorada and Marina Mazatlán are easier for serviced apartments and beach access.',
      foodAndDrink: cityFoodDrinkMetadata['mazatlan'],
      bestFor: ['Beach value', 'Historic-center atmosphere', 'Seafood and local culture'],
      watchouts: ['Summer heat and humidity are intense', 'Remote-work infrastructure is thinner than Puerto Vallarta', 'Some areas are spread out'],
      neighborhoods: ['Tourist: Centro Histórico', 'Residential: Olas Altas', 'Hip: Zona Dorada'],
      mobility: 'Rideshare and taxis are practical; the malecón is useful for walking and cycling.',
      climateNote: 'Dry pleasant winters shift into hot, humid, storm-prone summers.',
      workstyle: 'Best as an apartment-first city with cafés as occasional work spots.',
      pace: 'Local, coastal, and less polished than major resort cities.',
      airport: {
        description: 'MZT has domestic flights and seasonal international service.',
        rideshareFromAirport: true
      },
      timeToNature: 'Beaches, islands, and estuary trips are close; the Sierra Madre is reachable for longer outings.'
    }
  },
  Veracruz: {
    id: 'veracruz',
    name: 'Veracruz',
    country: 'Mexico',
    coordinates: [-96.1342, 19.1738],
    snapshot: {
      populationMetro: '850K',
      altitudeM: 10,
      landscape: 'Gulf port city with humid tropical coast',
      purchasingPowerRank: 35,
      internet: { downloadMbps: 110, uploadMbps: 40, latencyMs: 24 },
      ...climate.veracruzTropical
    },
    details: {
      tagline: 'Mexico’s historic Gulf port, warmer, more local, and more affordable than the big nomad circuits.',
      overview: 'Veracruz is a working port city with Afro-Caribbean influence, seafood, music, and a humid Gulf climate. Boca del Río is the easiest modern base for apartments and services, while the historic center offers more character. It is practical and affordable, but less polished for remote workers than Mexico’s larger hubs.',
      foodAndDrink: cityFoodDrinkMetadata['veracruz'],
      bestFor: ['Gulf coast culture', 'Seafood and music', 'Affordable coastal living'],
      watchouts: ['Humidity is high most of the year', 'Beach quality is less dramatic than the Pacific or Caribbean', 'Nomad and coworking scenes are limited'],
      neighborhoods: ['Tourist: Centro Histórico', 'Residential: Boca del Río', 'Hip: Reforma'],
      mobility: 'Rideshare and taxis are the easiest default; the waterfront is walkable in sections.',
      climateNote: 'Warm and humid year-round, with heavier rainfall from June through October.',
      workstyle: 'Apartment-first with adequate cafés and services around Boca del Río.',
      pace: 'Warm, musical, local, and port-city practical.',
      airport: {
        description: 'VER connects mainly through Mexico City and regional Mexican routes.',
        rideshareFromAirport: true
      },
      timeToNature: 'Beaches, mangroves, and the Antigua river area are nearby; mountain towns are longer day trips.'
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
      foodAndDrink: cityFoodDrinkMetadata['oruro'],
      bestFor: ['Extreme altitude experience', 'Carnival festivals', 'Authentic working-class mining city'],
      watchouts: ['Extreme altitude (3706m) — acclimatization essential', 'Very cold climate', 'Slower internet', 'Limited infrastructure'],
      neighborhoods: ['Tourist: Centro Histórico', 'Residential: Barrio Jardín', 'Hip: El Socavón'],
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
