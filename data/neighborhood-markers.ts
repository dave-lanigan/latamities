export interface NeighborhoodMarker {
  label: string
  coordinates: [number, number]
}

export const neighborhoodMarkersByCity: Record<string, NeighborhoodMarker[]> = {
  "guadalajara": [
    {
      "label": "Tourist: Americana",
      "coordinates": [
        -103.364386,
        20.672166
      ]
    },
    {
      "label": "Residential: Providencia",
      "coordinates": [
        -103.385952,
        20.697498
      ]
    },
    {
      "label": "Hip: Lafayette",
      "coordinates": [
        -103.368453,
        20.679108
      ]
    }
  ],
  "buenos-aires": [
    {
      "label": "Tourist: Palermo",
      "coordinates": [
        -58.418411,
        -34.569147
      ]
    },
    {
      "label": "Residential: Recoleta",
      "coordinates": [
        -58.38981,
        -34.579861
      ]
    },
    {
      "label": "Hip: Belgrano",
      "coordinates": [
        -58.44617,
        -34.551546
      ]
    }
  ],
  "santiago": [
    {
      "label": "Tourist: Providencia",
      "coordinates": [
        -70.608007,
        -33.437339
      ]
    },
    {
      "label": "Residential: Las Condes",
      "coordinates": [
        -70.481461,
        -33.428183
      ]
    },
    {
      "label": "Hip: Barrio Italia",
      "coordinates": [
        -70.624531,
        -33.448458
      ]
    }
  ],
  "lima": [
    {
      "label": "Tourist: Miraflores",
      "coordinates": [
        -77.0344,
        -12.124537
      ]
    },
    {
      "label": "Residential: San Isidro",
      "coordinates": [
        -77.042045,
        -12.103337
      ]
    },
    {
      "label": "Hip: Barranco",
      "coordinates": [
        -77.024771,
        -12.145645
      ]
    }
  ],
  "bogota": [
    {
      "label": "Tourist: Chapinero Alto",
      "coordinates": [
        -74.063245,
        4.632324
      ]
    },
    {
      "label": "Residential: Zona G",
      "coordinates": [
        -74.055659,
        4.651502
      ]
    },
    {
      "label": "Hip: Parque 93",
      "coordinates": [
        -74.048287,
        4.676768
      ]
    }
  ],
  "mexico-city": [
    {
      "label": "Tourist: Roma Norte",
      "coordinates": [
        -99.164586,
        19.420663
      ]
    },
    {
      "label": "Residential: Polanco",
      "coordinates": [
        -99.190915,
        19.43353
      ]
    },
    {
      "label": "Hip: Condesa",
      "coordinates": [
        -99.175515,
        19.414855
      ]
    }
  ],
  "medellin": [
    {
      "label": "Tourist: Laureles",
      "coordinates": [
        -75.603251,
        6.247316
      ]
    },
    {
      "label": "Residential: El Poblado",
      "coordinates": [
        -75.560984,
        6.195813
      ]
    },
    {
      "label": "Hip: Envigado",
      "coordinates": [
        -75.553219,
        6.160892
      ]
    }
  ],
  "cali": [
    {
      "label": "Tourist: Granada",
      "coordinates": [
        -76.534088,
        3.458717
      ]
    },
    {
      "label": "Residential: Ciudad Jardín",
      "coordinates": [
        -76.53563,
        3.363458
      ]
    },
    {
      "label": "Hip: San Antonio",
      "coordinates": [
        -76.540117,
        3.447751
      ]
    }
  ],
  "rio-de-janeiro": [
    {
      "label": "Tourist: Ipanema",
      "coordinates": [
        -43.192867,
        -23.020917
      ]
    },
    {
      "label": "Residential: Leblon",
      "coordinates": [
        -43.227323,
        -22.984116
      ]
    },
    {
      "label": "Hip: Botafogo",
      "coordinates": [
        -43.185155,
        -22.948609
      ]
    }
  ],
  "barranquilla": [
    {
      "label": "Tourist: Alto Prado",
      "coordinates": [
        -74.811391,
        11.01093
      ]
    },
    {
      "label": "Residential: Villa Country",
      "coordinates": [
        -74.805173,
        11.005888
      ]
    },
    {
      "label": "Hip: Riomar",
      "coordinates": [
        -74.821319,
        11.027248
      ]
    }
  ],
  "sao-paulo": [
    {
      "label": "Tourist: Pinheiros",
      "coordinates": [
        -46.687836,
        -23.562884
      ]
    },
    {
      "label": "Residential: Jardins",
      "coordinates": [
        -46.667831,
        -23.573808
      ]
    },
    {
      "label": "Hip: Vila Madalena",
      "coordinates": [
        -46.691124,
        -23.546496
      ]
    }
  ],
  "curitiba": [
    {
      "label": "Tourist: Centro Cívico",
      "coordinates": [
        -49.268776,
        -25.414609
      ]
    },
    {
      "label": "Residential: Batel",
      "coordinates": [
        -49.289098,
        -25.442006
      ]
    },
    {
      "label": "Hip: Bigorrilho",
      "coordinates": [
        -49.30173,
        -25.430973
      ]
    }
  ],
  "caracas": [
    {
      "label": "Tourist: Altamira",
      "coordinates": [
        -66.850801,
        10.504251
      ]
    },
    {
      "label": "Residential: Los Palos Grandes",
      "coordinates": [
        -66.844099,
        10.503854
      ]
    },
    {
      "label": "Hip: La Castellana",
      "coordinates": [
        -66.855534,
        10.503112
      ]
    }
  ],
  "quito": [
    {
      "label": "Tourist: La Carolina",
      "coordinates": [
        -78.483721,
        -0.187162
      ]
    },
    {
      "label": "Residential: Cumbayá",
      "coordinates": [
        -78.435213,
        -0.208656
      ]
    },
    {
      "label": "Hip: La Floresta",
      "coordinates": [
        -78.4848,
        -0.208141
      ]
    }
  ],
  "montevideo": [
    {
      "label": "Tourist: Pocitos",
      "coordinates": [
        -56.150575,
        -34.910854
      ]
    },
    {
      "label": "Residential: Punta Carretas",
      "coordinates": [
        -56.160895,
        -34.925792
      ]
    },
    {
      "label": "Hip: Cordón",
      "coordinates": [
        -56.17674,
        -34.901901
      ]
    }
  ],
  "asuncion": [
    {
      "label": "Tourist: Villa Morra",
      "coordinates": [
        -57.581226,
        -25.288032
      ]
    },
    {
      "label": "Residential: Recoleta",
      "coordinates": [
        -57.592081,
        -25.29406
      ]
    },
    {
      "label": "Hip: Carmelitas",
      "coordinates": [
        -57.577169,
        -25.285887
      ]
    }
  ],
  "la-paz": [
    {
      "label": "Tourist: Sopocachi",
      "coordinates": [
        -68.12894,
        -16.513404
      ]
    },
    {
      "label": "Residential: Calacoto",
      "coordinates": [
        -68.084193,
        -16.539199
      ]
    },
    {
      "label": "Hip: San Miguel",
      "coordinates": [
        -68.078928,
        -16.542063
      ]
    }
  ],
  "santa-cruz-de-la-sierra": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -63.18197,
        -17.782922
      ]
    },
    {
      "label": "Residential: Urubó",
      "coordinates": [
        -63.218161,
        -17.727653
      ]
    },
    {
      "label": "Hip: Equipetrol",
      "coordinates": [
        -63.198009,
        -17.760323
      ]
    }
  ],
  "cochabamba": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -66.156925,
        -17.393823
      ]
    },
    {
      "label": "Residential: Cala Cala",
      "coordinates": [
        -66.16387,
        -17.369167
      ]
    },
    {
      "label": "Hip: Queru Queru",
      "coordinates": [
        -66.153178,
        -17.369753
      ]
    }
  ],
  "san-salvador": [
    {
      "label": "Tourist: Colonia Escalón",
      "coordinates": [
        -89.239483,
        13.705814
      ]
    },
    {
      "label": "Residential: San Benito",
      "coordinates": [
        -89.233011,
        13.694701
      ]
    },
    {
      "label": "Hip: Zona Rosa",
      "coordinates": [
        -89.196998,
        13.698601
      ]
    }
  ],
  "cuenca": [
    {
      "label": "Tourist: El Centro Histórico",
      "coordinates": [
        -79.004469,
        -2.897394
      ]
    },
    {
      "label": "Residential: El Ejido",
      "coordinates": [
        -79.011606,
        -2.909058
      ]
    },
    {
      "label": "Hip: Ordoñez Lasso",
      "coordinates": [
        -79.038138,
        -2.887601
      ]
    }
  ],
  "arequipa": [
    {
      "label": "Tourist: Yanahuara",
      "coordinates": [
        -71.546297,
        -16.389761
      ]
    },
    {
      "label": "Residential: Cayma",
      "coordinates": [
        -71.485585,
        -16.288977
      ]
    },
    {
      "label": "Hip: Miraflores",
      "coordinates": [
        -71.477668,
        -16.360416
      ]
    }
  ],
  "puebla": [
    {
      "label": "Tourist: Centro Histórico",
      "coordinates": [
        -98.191532,
        19.050116
      ]
    },
    {
      "label": "Residential: Analco",
      "coordinates": [
        -98.192266,
        19.036499
      ]
    },
    {
      "label": "Hip: Cholula",
      "coordinates": [
        -98.324378,
        19.069084
      ]
    }
  ],
  "salvador": [
    {
      "label": "Tourist: Pelourinho",
      "coordinates": [
        -38.510377,
        -12.973986
      ]
    },
    {
      "label": "Residential: Barra",
      "coordinates": [
        -38.528527,
        -13.004434
      ]
    },
    {
      "label": "Hip: Rio Vermelho",
      "coordinates": [
        -38.4921,
        -13.008146
      ]
    }
  ],
  "cartagena": [
    {
      "label": "Tourist: Centro Histórico",
      "coordinates": [
        -75.551059,
        10.423519
      ]
    },
    {
      "label": "Residential: Getsemaní",
      "coordinates": [
        -75.545942,
        10.421143
      ]
    },
    {
      "label": "Hip: Bocagrande",
      "coordinates": [
        -75.552141,
        10.408251
      ]
    }
  ],
  "cusco": [
    {
      "label": "Tourist: San Blas",
      "coordinates": [
        -71.974311,
        -13.514902
      ]
    },
    {
      "label": "Residential: Centro",
      "coordinates": [
        -71.962843,
        -13.535317
      ]
    },
    {
      "label": "Hip: San Sebastián",
      "coordinates": [
        -71.926977,
        -13.535292
      ]
    }
  ],
  "trujillo": [
    {
      "label": "Tourist: Centro Histórico",
      "coordinates": [
        -79.028752,
        -8.11206
      ]
    },
    {
      "label": "Residential: El Golf",
      "coordinates": [
        -79.035467,
        -8.138069
      ]
    },
    {
      "label": "Hip: California",
      "coordinates": [
        -79.037693,
        -8.130941
      ]
    }
  ],
  "bucaramanga": [
    {
      "label": "Tourist: Cabecera del Llano",
      "coordinates": [
        -73.108554,
        7.117812
      ]
    },
    {
      "label": "Residential: Sotomayor",
      "coordinates": [
        -73.114266,
        7.117298
      ]
    },
    {
      "label": "Hip: Cañaveral",
      "coordinates": [
        -73.100068,
        7.066648
      ]
    }
  ],
  "pereira": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -75.701883,
        4.813566
      ]
    },
    {
      "label": "Residential: Pinares",
      "coordinates": [
        -75.688344,
        4.803581
      ]
    },
    {
      "label": "Hip: Álamos",
      "coordinates": [
        -75.734648,
        4.820459
      ]
    }
  ],
  "san-jose": [
    {
      "label": "Tourist: Escazú",
      "coordinates": [
        -84.152821,
        9.927012
      ]
    },
    {
      "label": "Residential: Santa Ana",
      "coordinates": [
        -84.191866,
        9.925488
      ]
    },
    {
      "label": "Hip: Barrio Escalante",
      "coordinates": [
        -84.080335,
        9.93586
      ]
    }
  ],
  "cordoba": [
    {
      "label": "Tourist: Nueva Córdoba",
      "coordinates": [
        -64.186451,
        -31.42965
      ]
    },
    {
      "label": "Residential: Güemes",
      "coordinates": [
        -64.197006,
        -31.430037
      ]
    },
    {
      "label": "Hip: General Paz",
      "coordinates": [
        -64.16682,
        -31.413299
      ]
    }
  ],
  "manaus": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -60.021438,
        -3.131699
      ]
    },
    {
      "label": "Residential: Ponta Negra",
      "coordinates": [
        -60.089866,
        -3.059827
      ]
    },
    {
      "label": "Hip: Adrianópolis",
      "coordinates": [
        -60.008073,
        -3.100083
      ]
    }
  ],
  "belo-horizonte": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -43.937956,
        -19.918818
      ]
    },
    {
      "label": "Residential: Lourdes",
      "coordinates": [
        -43.943336,
        -19.930652
      ]
    },
    {
      "label": "Hip: Savassi",
      "coordinates": [
        -43.935298,
        -19.935768
      ]
    }
  ],
  "florianopolis": [
    {
      "label": "Tourist: Trindade",
      "coordinates": [
        -48.512397,
        -27.59497
      ]
    },
    {
      "label": "Residential: João Paulo",
      "coordinates": [
        -48.515238,
        -27.561014
      ]
    },
    {
      "label": "Hip: Lagoa da Conceição",
      "coordinates": [
        -48.448018,
        -27.569048
      ]
    }
  ],
  "fortaleza": [
    {
      "label": "Tourist: Meireles",
      "coordinates": [
        -38.499239,
        -3.725492
      ]
    },
    {
      "label": "Residential: Aldeota",
      "coordinates": [
        -38.501522,
        -3.736424
      ]
    },
    {
      "label": "Hip: Cocó",
      "coordinates": [
        -38.482328,
        -3.751643
      ]
    }
  ],
  "recife": [
    {
      "label": "Tourist: Boa Viagem",
      "coordinates": [
        -34.905262,
        -8.129314
      ]
    },
    {
      "label": "Residential: Recife Antigo",
      "coordinates": [
        -34.864617,
        -8.052646
      ]
    },
    {
      "label": "Hip: Boa Vista",
      "coordinates": [
        -34.891053,
        -8.058904
      ]
    }
  ],
  "merida": [
    {
      "label": "Tourist: Centro Histórico",
      "coordinates": [
        -89.630006,
        20.962631
      ]
    },
    {
      "label": "Residential: Paseo de Montejo",
      "coordinates": [
        -89.618942,
        20.978348
      ]
    },
    {
      "label": "Hip: Altabrisa",
      "coordinates": [
        -89.585489,
        21.021578
      ]
    }
  ],
  "leon": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -101.68311,
        21.122932
      ]
    },
    {
      "label": "Residential: Campestre",
      "coordinates": [
        -101.707463,
        21.151286
      ]
    },
    {
      "label": "Hip: Jardines del Moral",
      "coordinates": [
        -101.693022,
        21.146493
      ]
    }
  ],
  "tegucigalpa": [
    {
      "label": "Tourist: Centro Histórico",
      "coordinates": [
        -87.204247,
        14.104471
      ]
    },
    {
      "label": "Residential: Lomas del Guijarro",
      "coordinates": [
        -87.173516,
        14.093048
      ]
    },
    {
      "label": "Hip: Colonia Palmira",
      "coordinates": [
        -87.19454,
        14.104112
      ]
    }
  ],
  "guatemala-city": [
    {
      "label": "Tourist: Zona 10",
      "coordinates": [
        -90.498521,
        14.592008
      ]
    },
    {
      "label": "Residential: Zona 14",
      "coordinates": [
        -90.509589,
        14.574391
      ]
    },
    {
      "label": "Hip: Zona 15",
      "coordinates": [
        -90.492302,
        14.599729
      ]
    }
  ],
  "managua": [
    {
      "label": "Tourist: Planes de Altamira",
      "coordinates": [
        -86.265123,
        12.115299
      ]
    },
    {
      "label": "Residential: Carretera Masaya",
      "coordinates": [
        -86.212569,
        12.06638
      ]
    },
    {
      "label": "Hip: Bolonia",
      "coordinates": [
        -86.281371,
        12.138766
      ]
    }
  ],
  "san-pedro-sula": [
    {
      "label": "Tourist: Zona Viva",
      "coordinates": [
        -88.021751,
        15.504904
      ]
    },
    {
      "label": "Residential: Jardines del Valle",
      "coordinates": [
        -88.028728,
        15.533395
      ]
    },
    {
      "label": "Hip: Los Andes",
      "coordinates": [
        -88.035226,
        15.511063
      ]
    }
  ],
  "valparaiso": [
    {
      "label": "Tourist: Cerro Alegre",
      "coordinates": [
        -71.629844,
        -33.043406
      ]
    },
    {
      "label": "Residential: Cerro Concepción",
      "coordinates": [
        -71.626495,
        -33.042263
      ]
    },
    {
      "label": "Hip: Cerro Bellavista",
      "coordinates": [
        -71.622273,
        -33.050128
      ]
    }
  ],
  "concepcion": [
    {
      "label": "Tourist: Barrio Universitario",
      "coordinates": [
        -73.039244,
        -36.830244
      ]
    },
    {
      "label": "Residential: San Pedro de la Paz",
      "coordinates": [
        -73.097261,
        -36.903173
      ]
    },
    {
      "label": "Hip: Pedro de Valdivia",
      "coordinates": [
        -73.051286,
        -36.846757
      ]
    }
  ],
  "mendoza": [
    {
      "label": "Tourist: Ciudad",
      "coordinates": [
        -68.914269,
        -32.882001
      ]
    },
    {
      "label": "Residential: Quinta Sección",
      "coordinates": [
        -68.858157,
        -32.896449
      ]
    },
    {
      "label": "Hip: Chacras de Coria",
      "coordinates": [
        -68.880811,
        -32.991197
      ]
    }
  ],
  "porto-alegre": [
    {
      "label": "Tourist: Moinhos de Vento",
      "coordinates": [
        -51.205518,
        -30.023593
      ]
    },
    {
      "label": "Residential: Bela Vista",
      "coordinates": [
        -51.1907,
        -30.032123
      ]
    },
    {
      "label": "Hip: Cidade Baixa",
      "coordinates": [
        -51.225064,
        -30.039671
      ]
    }
  ],
  "panama-city": [
    {
      "label": "Tourist: Casco Viejo",
      "coordinates": [
        -79.537729,
        8.954301
      ]
    },
    {
      "label": "Residential: Miraflores",
      "coordinates": [
        -79.590981,
        9.001549
      ]
    },
    {
      "label": "Hip: Punta Pacífica",
      "coordinates": [
        -79.513296,
        8.97708
      ]
    }
  ],
  "sucre": [
    {
      "label": "Tourist: Centro Histórico",
      "coordinates": [
        -65.259507,
        -19.047879
      ]
    },
    {
      "label": "Residential: Recoleta",
      "coordinates": [
        -65.253629,
        -19.055279
      ]
    },
    {
      "label": "Hip: San Roque",
      "coordinates": [
        -65.2668,
        -19.051012
      ]
    }
  ],
  "ibague": [
    {
      "label": "Tourist: Ambala",
      "coordinates": [
        -75.203928,
        4.490734
      ]
    },
    {
      "label": "Residential: El Jordán",
      "coordinates": [
        -75.198548,
        4.441252
      ]
    },
    {
      "label": "Hip: Picaleña",
      "coordinates": [
        -75.178538,
        4.415508
      ]
    }
  ],
  "santa-marta": [
    {
      "label": "Tourist: Centro Histórico",
      "coordinates": [
        -74.211737,
        11.244313
      ]
    },
    {
      "label": "Residential: El Rodadero",
      "coordinates": [
        -74.228442,
        11.201928
      ]
    },
    {
      "label": "Hip: Bello Horizonte",
      "coordinates": [
        -74.233365,
        11.16997
      ]
    }
  ],
  "chiclayo": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -79.837649,
        -6.77173
      ]
    },
    {
      "label": "Residential: La Victoria",
      "coordinates": [
        -79.865087,
        -6.82701
      ]
    },
    {
      "label": "Hip: Monsefu",
      "coordinates": [
        -79.839382,
        -6.852643
      ]
    }
  ],
  "piura": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -80.626618,
        -5.197123
      ]
    },
    {
      "label": "Residential: Castilla",
      "coordinates": [
        -80.556871,
        -5.121575
      ]
    },
    {
      "label": "Hip: Calle Lima",
      "coordinates": [
        -80.625083,
        -5.195044
      ]
    }
  ],
  "iquitos": [
    {
      "label": "Tourist: Belen",
      "coordinates": [
        -73.319108,
        -3.956212
      ]
    },
    {
      "label": "Residential: Punchana",
      "coordinates": [
        -73.413361,
        -3.546006
      ]
    },
    {
      "label": "Hip: Iquitos Proper",
      "coordinates": [
        -73.244409,
        -3.749322
      ]
    }
  ],
  "chimbote": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -78.593519,
        -9.077794
      ]
    },
    {
      "label": "Residential: Nuevo Chimbote",
      "coordinates": [
        -78.496765,
        -9.140302
      ]
    },
    {
      "label": "Hip: Puerto",
      "coordinates": [
        -78.606296,
        -9.074113
      ]
    }
  ],
  "guayaquil": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -79.882686,
        -2.19307
      ]
    },
    {
      "label": "Residential: Samborondón",
      "coordinates": [
        -79.758459,
        -1.97541
      ]
    },
    {
      "label": "Hip: Malecón",
      "coordinates": [
        -79.897704,
        -2.184617
      ]
    }
  ],
  "santo-domingo": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -79.102597,
        -0.270551
      ]
    },
    {
      "label": "Residential: Bombolí",
      "coordinates": [
        -79.189962,
        -0.234962
      ]
    },
    {
      "label": "Hip: La Magdalena",
      "coordinates": [
        -79.025667,
        -0.264701
      ]
    }
  ],
  "manta": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -80.722386,
        -0.948007
      ]
    },
    {
      "label": "Residential: Tarqui",
      "coordinates": [
        -80.726862,
        -0.972906
      ]
    },
    {
      "label": "Hip: San Mateo",
      "coordinates": [
        -80.795696,
        -0.957527
      ]
    }
  ],
  "cucuta": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -72.490666,
        7.89393
      ]
    },
    {
      "label": "Residential: Los Caobos",
      "coordinates": [
        -72.495135,
        7.882955
      ]
    },
    {
      "label": "Hip: Antonia Santos",
      "coordinates": [
        -72.537397,
        7.909793
      ]
    }
  ],
  "manizales": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -75.518331,
        5.067685
      ]
    },
    {
      "label": "Residential: Palermo",
      "coordinates": [
        -75.488639,
        5.051438
      ]
    },
    {
      "label": "Hip: Tebaida",
      "coordinates": [
        -75.635431,
        5.100244
      ]
    }
  ],
  "villavicencio": [
    {
      "label": "Tourist: Centro Commercial",
      "coordinates": [
        -73.637738,
        4.125207
      ]
    },
    {
      "label": "Residential: Lourdes",
      "coordinates": [
        -73.604315,
        4.116061
      ]
    },
    {
      "label": "Hip: Los Libertadores",
      "coordinates": [
        -73.638313,
        4.151545
      ]
    }
  ],
  "pasto": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -77.265516,
        1.220312
      ]
    },
    {
      "label": "Residential: Santiago",
      "coordinates": [
        -77.284678,
        1.210896
      ]
    },
    {
      "label": "Hip: Botero",
      "coordinates": [
        -77.268265,
        1.196577
      ]
    }
  ],
  "monteria": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -75.966177,
        8.644121
      ]
    },
    {
      "label": "Residential: Circunvalar",
      "coordinates": [
        -75.876521,
        8.755227
      ]
    },
    {
      "label": "Hip: La Castellana",
      "coordinates": [
        -75.865288,
        8.768476
      ]
    }
  ],
  "valledupar": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -73.272797,
        10.461196
      ]
    },
    {
      "label": "Residential: Novalito",
      "coordinates": [
        -73.254379,
        10.488181
      ]
    },
    {
      "label": "Hip: Plaza Alfonso López",
      "coordinates": [
        -73.244632,
        10.477751
      ]
    }
  ],
  "armenia": [
    {
      "label": "Tourist: Centro",
      "coordinates": [
        -75.671607,
        4.53417
      ]
    },
    {
      "label": "Residential: Bolívar",
      "coordinates": [
        -75.663653,
        4.542343
      ]
    },
    {
      "label": "Hip: La Patria",
      "coordinates": [
        -75.702489,
        4.540951
      ]
    }
  ],
  "oaxaca": [
    {
      "label": "Tourist: Centro Histórico",
      "coordinates": [
        -96.725343,
        17.060595
      ]
    },
    {
      "label": "Residential: Jalatlaco",
      "coordinates": [
        -96.717528,
        17.067452
      ]
    },
    {
      "label": "Hip: Reforma",
      "coordinates": [
        -96.714373,
        17.076598
      ]
    }
  ],
  "monterrey": [
    {
      "label": "Tourist: San Pedro",
      "coordinates": [
        -100.36254,
        25.721335
      ]
    },
    {
      "label": "Residential: Valle Oriente",
      "coordinates": [
        -100.324975,
        25.645633
      ]
    },
    {
      "label": "Hip: Barrio Antiguo",
      "coordinates": [
        -100.307552,
        25.664721
      ]
    }
  ],
  "puerto-vallarta": [
    {
      "label": "Tourist: Zona Romántica",
      "coordinates": [
        -105.2351,
        20.602203
      ]
    },
    {
      "label": "Residential: Versalles",
      "coordinates": [
        -105.227632,
        20.634552
      ]
    },
    {
      "label": "Hip: Marina Vallarta",
      "coordinates": [
        -105.248698,
        20.668367
      ]
    }
  ],
  "mazatlan": [
    {
      "label": "Tourist: Centro Histórico",
      "coordinates": [
        -106.424375,
        23.199436
      ]
    },
    {
      "label": "Residential: Olas Altas",
      "coordinates": [
        -106.426989,
        23.19464
      ]
    },
    {
      "label": "Hip: Zona Dorada",
      "coordinates": [
        -106.452211,
        23.244872
      ]
    }
  ],
  "veracruz": [
    {
      "label": "Tourist: Centro Histórico",
      "coordinates": [
        -96.135092,
        19.198225
      ]
    },
    {
      "label": "Residential: Boca del Río",
      "coordinates": [
        -96.11766,
        19.113116
      ]
    },
    {
      "label": "Hip: Reforma",
      "coordinates": [
        -96.12323,
        19.172195
      ]
    }
  ],
  "belem": [
    {
      "label": "Tourist: Nazaré",
      "coordinates": [
        -48.4882,
        -1.453112
      ]
    },
    {
      "label": "Residential: Umarizal",
      "coordinates": [
        -48.488715,
        -1.437839
      ]
    },
    {
      "label": "Hip: Batista Campos",
      "coordinates": [
        -48.491028,
        -1.460002
      ]
    }
  ],
  "vitoria": [
    {
      "label": "Tourist: Praia do Canto",
      "coordinates": [
        -40.289508,
        -20.29622
      ]
    },
    {
      "label": "Residential: Enseada do Suá",
      "coordinates": [
        -40.291595,
        -20.315407
      ]
    },
    {
      "label": "Hip: Jardim da Penha",
      "coordinates": [
        -40.291942,
        -20.287443
      ]
    }
  ],
  "joao-pessoa": [
    {
      "label": "Tourist: Altiplano",
      "coordinates": [
        -34.829698,
        -7.133722
      ]
    },
    {
      "label": "Residential: Manaíra",
      "coordinates": [
        -34.836199,
        -7.104379
      ]
    },
    {
      "label": "Hip: Tambaú",
      "coordinates": [
        -34.826235,
        -7.115052
      ]
    }
  ],
  "oruro": [
    {
      "label": "Tourist: Centro Histórico",
      "coordinates": [
        -67.114729,
        -17.969568
      ]
    },
    {
      "label": "Residential: Barrio Jardín",
      "coordinates": [
        -67.105151,
        -17.955865
      ]
    },
    {
      "label": "Hip: El Socavón",
      "coordinates": [
        -67.118996,
        -17.967536
      ]
    }
  ]
}
