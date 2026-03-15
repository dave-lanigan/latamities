import cityNames from '../cities.json'

export interface MonthlyDatum {
  month: string
  value: number
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
    airport: string
    timeToNature: string
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
      airport: 'GDL with strong domestic links and good US connections.',
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
      airport: 'EZE for long-haul and AEP for regional hops.',
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
      airport: 'SCL with strong South America coverage and many long-haul options.',
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
      airport: 'LIM is the region’s major connecting hub.',
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
      airport: 'BOG is one of the best-connected hubs in Latin America.',
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
      airport: 'MEX with a vast domestic network plus AIFA overflow.',
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
      airport: 'MDE with strong domestic connectivity.',
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
      airport: 'CLO with solid domestic links.',
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
      airport: 'GIG for international and SDU for domestic convenience.',
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
      airport: 'BAQ with easy domestic access.',
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
      airport: 'GRU for global links and CGH for domestic speed.',
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
      airport: 'CWB with good domestic service.',
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
      airport: 'CCS for regional access, subject to operational variability.',
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
      airport: 'UIO with decent regional access.',
      timeToNature: 'Volcanic viewpoints and cloud forest escapes are close.'
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
      airport: 'MVD with regional service and easy Buenos Aires links.',
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
      airport: 'ASU handles regional connectivity well enough.',
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
      airport: 'LPB and nearby El Alto connections provide domestic reach.',
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
      airport: 'VVI is an important Bolivian aviation hub.',
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
      airport: 'CBB provides domestic links with some limits.',
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
      airport: 'SAL is one of Central America’s more useful regional hubs.',
      timeToNature: 'Volcano viewpoints and surf breaks are reachable within an hour or so.'
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
