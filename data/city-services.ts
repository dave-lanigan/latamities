export type CityServiceProvider = 'uber' | 'didi' | 'indrive' | 'yango' | 'rappi' | 'pedidosya' | 'ubereats'

export const cityServicesReviewedAt = '2026-09-24'

export interface CityServiceCoverage {
  providerId: CityServiceProvider
  sourceUrl: string
  cityIds: string[]
}

export const cityServiceCoverage: CityServiceCoverage[] = [
  {
    providerId: 'uber',
    sourceUrl: 'https://www.uber.com/global/en/r/mexico/cities/',
    cityIds: ['guadalajara', 'mexico-city', 'puebla', 'merida', 'leon', 'oaxaca', 'monterrey', 'puerto-vallarta', 'mazatlan', 'veracruz']
  },
  {
    providerId: 'uber',
    sourceUrl: 'https://www.uber.com/global/en/r/brazil/cities/',
    cityIds: ['rio-de-janeiro', 'sao-paulo', 'curitiba', 'salvador', 'manaus', 'belo-horizonte', 'florianopolis', 'fortaleza', 'recife', 'porto-alegre', 'belem', 'vitoria', 'joao-pessoa']
  },
  {
    providerId: 'uber',
    sourceUrl: 'https://www.uber.com/global/en/r/colombia/cities/',
    cityIds: ['bogota', 'medellin', 'cali', 'barranquilla', 'cartagena', 'bucaramanga', 'pereira', 'ibague', 'santa-marta', 'cucuta', 'manizales', 'villavicencio', 'pasto', 'monteria', 'valledupar', 'armenia']
  },
  {
    providerId: 'uber',
    sourceUrl: 'https://www.uber.com/global/en/r/peru/cities/',
    cityIds: ['lima', 'arequipa', 'chiclayo', 'cusco', 'trujillo']
  },
  {
    providerId: 'uber',
    sourceUrl: 'https://www.uber.com/global/en/r/bolivia/cities/',
    cityIds: ['cochabamba', 'la-paz', 'santa-cruz-de-la-sierra']
  },
  { providerId: 'uber', sourceUrl: 'https://www.uber.com/global/en/r/ecuador/cities/', cityIds: ['quito', 'guayaquil', 'manta', 'santo-domingo'] },
  { providerId: 'uber', sourceUrl: 'https://www.uber.com/global/en/r/argentina/cities/', cityIds: ['buenos-aires', 'cordoba', 'mendoza'] },
  { providerId: 'uber', sourceUrl: 'https://www.uber.com/global/en/r/chile/cities/', cityIds: ['santiago', 'valparaiso', 'concepcion'] },
  { providerId: 'uber', sourceUrl: 'https://www.uber.com/global/en/r/uruguay/cities/', cityIds: ['montevideo'] },
  { providerId: 'uber', sourceUrl: 'https://www.uber.com/global/en/r/el-salvador/cities/', cityIds: ['san-salvador'] },
  { providerId: 'uber', sourceUrl: 'https://www.uber.com/global/en/r/guatemala/cities/', cityIds: ['guatemala-city'] },
  { providerId: 'uber', sourceUrl: 'https://www.uber.com/global/en/r/panama/cities/', cityIds: ['panama-city'] },
  { providerId: 'uber', sourceUrl: 'https://www.uber.com/global/en/r/honduras/cities/', cityIds: ['tegucigalpa'] },
  { providerId: 'uber', sourceUrl: 'https://www.uber.com/global/en/r/paraguay/cities/', cityIds: ['asuncion'] },
  { providerId: 'uber', sourceUrl: 'https://www.uber.com/global/en/r/costa-rica/cities/', cityIds: ['san-jose'] },
  {
    providerId: 'didi',
    sourceUrl: 'https://web.didiglobal.com/mx/conductor/ciudades/',
    cityIds: ['guadalajara', 'mexico-city', 'puebla', 'merida', 'leon', 'oaxaca', 'monterrey', 'puerto-vallarta', 'mazatlan', 'veracruz']
  },
  {
    providerId: 'didi',
    sourceUrl: 'https://web.didiglobal.com/co/conductor/ciudades/',
    cityIds: ['bogota', 'medellin', 'cali', 'barranquilla', 'cartagena', 'bucaramanga', 'pereira', 'ibague', 'santa-marta', 'cucuta', 'manizales', 'villavicencio', 'pasto', 'monteria', 'valledupar', 'armenia']
  },
  { providerId: 'didi', sourceUrl: 'https://web.didiglobal.com/pe/conductor/ciudades/', cityIds: ['lima', 'arequipa', 'cusco'] },
  { providerId: 'didi', sourceUrl: 'https://web.didiglobal.com/ar/conductor/ciudades/', cityIds: ['buenos-aires', 'cordoba'] },
  { providerId: 'didi', sourceUrl: 'https://web.didiglobal.com/cl/conductor/ciudades/', cityIds: ['santiago', 'valparaiso', 'concepcion'] },
  { providerId: 'didi', sourceUrl: 'https://web.didiglobal.com/ec/conductor/ciudades/', cityIds: ['quito', 'guayaquil'] },
  { providerId: 'didi', sourceUrl: 'https://web.didiglobal.com/cr/conductor/ciudades/', cityIds: ['san-jose'] },
  { providerId: 'didi', sourceUrl: 'https://web.didiglobal.com/pa/conductor/ciudades/', cityIds: ['panama-city'] },
  {
    providerId: 'indrive',
    sourceUrl: 'https://indrive.com/cities',
    cityIds: ['mexico-city', 'puebla', 'guadalajara', 'monterrey', 'lima', 'piura', 'arequipa', 'trujillo', 'chimbote', 'valledupar', 'pereira', 'cali', 'monteria', 'bogota', 'bucaramanga', 'barranquilla', 'cucuta', 'armenia', 'ibague', 'medellin', 'cartagena']
  },
  { providerId: 'yango', sourceUrl: 'https://yango.com/es_pe/', cityIds: ['lima', 'arequipa', 'trujillo'] },
  { providerId: 'indrive', sourceUrl: 'https://diariolaregion.com/indrive-lanza-su-nuevo-servicio-de-mototaxis-en-iquitos/', cityIds: ['iquitos'] },
  { providerId: 'yango', sourceUrl: 'https://yango.com/es_co/', cityIds: ['bogota', 'medellin', 'cali', 'barranquilla'] },
  { providerId: 'yango', sourceUrl: 'https://yango.com/es_bo/driver/', cityIds: ['la-paz', 'cochabamba', 'santa-cruz-de-la-sierra'] },
  { providerId: 'yango', sourceUrl: 'https://www.somosguate.com/yango-inicia-oficialmente-operaciones-en-guatemala-y-anuncia-planes-para-el-pais/', cityIds: ['guatemala-city'] },
  {
    providerId: 'ubereats',
    sourceUrl: 'https://www.ubereats.com/mx/location',
    cityIds: ['mexico-city', 'guadalajara', 'puebla', 'merida', 'leon', 'oaxaca', 'monterrey', 'puerto-vallarta', 'mazatlan', 'veracruz']
  },
  { providerId: 'ubereats', sourceUrl: 'https://www.ubereats.com/cl/location', cityIds: ['santiago', 'valparaiso', 'concepcion'] },
  { providerId: 'ubereats', sourceUrl: 'https://www.ubereats.com/ec/location', cityIds: ['quito', 'guayaquil', 'cuenca', 'manta', 'santo-domingo'] },
  { providerId: 'ubereats', sourceUrl: 'https://www.ubereats.com/cr/location', cityIds: ['san-jose'] },
  { providerId: 'ubereats', sourceUrl: 'https://www.ubereats.com/sv/location', cityIds: ['san-salvador'] },
  { providerId: 'ubereats', sourceUrl: 'https://www.ubereats.com/gt/location', cityIds: ['guatemala-city'] },
  {
    providerId: 'rappi',
    sourceUrl: 'https://www.ecommercenews.pe/logistica/2026/rappi-ingresa-a-tacna-apunta-a-sumar-mas-de-200-comercios.html/',
    cityIds: ['lima', 'arequipa', 'chiclayo', 'chimbote', 'cusco', 'piura', 'trujillo']
  },
  { providerId: 'rappi', sourceUrl: 'https://www.rappi.com.mx/', cityIds: ['mexico-city'] },
  { providerId: 'rappi', sourceUrl: 'https://www.rappi.com.co/', cityIds: ['bogota'] },
  ...['medellin', 'cali', 'barranquilla', 'cartagena', 'bucaramanga', 'pereira', 'ibague', 'santa-marta', 'cucuta', 'manizales', 'villavicencio', 'armenia', 'pasto', 'monteria', 'valledupar'].map((cityId): CityServiceCoverage => ({
    providerId: 'rappi',
    sourceUrl: `https://www.rappi.com.co/${cityId}/restaurantes`,
    cityIds: [cityId]
  })),
  ...['guadalajara', 'puebla', 'merida', 'leon', 'oaxaca', 'monterrey', 'puerto-vallarta', 'mazatlan', 'veracruz'].map((cityId): CityServiceCoverage => ({
    providerId: 'rappi',
    sourceUrl: `https://www.rappi.com.mx/${cityId}/restaurantes`,
    cityIds: [cityId]
  })),
  { providerId: 'rappi', sourceUrl: 'https://www.rappi.com.br/', cityIds: ['sao-paulo'] },
  ...['rio-de-janeiro', 'curitiba', 'belo-horizonte', 'fortaleza', 'recife', 'belem'].map((cityId): CityServiceCoverage => ({
    providerId: 'rappi',
    sourceUrl: `https://www.rappi.com.br/${cityId}/restaurantes`,
    cityIds: [cityId]
  })),
  { providerId: 'rappi', sourceUrl: 'https://www.rappi.com.ar/', cityIds: ['buenos-aires', 'cordoba'] },
  { providerId: 'rappi', sourceUrl: 'https://www.rappi.com.ar/mendoza/restaurantes', cityIds: ['mendoza'] },
  { providerId: 'rappi', sourceUrl: 'https://www.rappi.cl/', cityIds: ['santiago'] },
  { providerId: 'rappi', sourceUrl: 'https://www.rappi.cl/valparaiso/restaurantes', cityIds: ['valparaiso'] },
  { providerId: 'rappi', sourceUrl: 'https://www.rappi.cl/concepcion/restaurantes', cityIds: ['concepcion'] },
  { providerId: 'rappi', sourceUrl: 'https://www.rappi.com.ec/', cityIds: ['quito'] },
  ...['guayaquil', 'cuenca', 'manta', 'santo-domingo'].map((cityId): CityServiceCoverage => ({
    providerId: 'rappi',
    sourceUrl: `https://www.rappi.com.ec/${cityId}/restaurantes`,
    cityIds: [cityId]
  })),
  { providerId: 'rappi', sourceUrl: 'https://www.rappi.co.cr/san-jose/restaurantes', cityIds: ['san-jose'] },
  { providerId: 'rappi', sourceUrl: 'https://www.rappi.com.uy/', cityIds: ['montevideo'] },
  { providerId: 'pedidosya', sourceUrl: 'https://www.pedidosya.com.bo/', cityIds: ['santa-cruz-de-la-sierra', 'la-paz', 'cochabamba', 'sucre'] },
  { providerId: 'pedidosya', sourceUrl: 'https://construmarket.com.bo/actualidad/pedidosya-sigue-llegando-cada-vez-mas-lejos-y-mas-alto-inicio-operaciones-en-oruro/', cityIds: ['oruro'] },
  { providerId: 'pedidosya', sourceUrl: 'https://www.pedidosya.com.pe/', cityIds: ['lima', 'arequipa', 'trujillo', 'chiclayo', 'piura'] },
  { providerId: 'pedidosya', sourceUrl: 'https://www.pedidosya.com.ar/', cityIds: ['buenos-aires', 'cordoba'] },
  { providerId: 'pedidosya', sourceUrl: 'https://www.pedidosya.cl/', cityIds: ['santiago', 'concepcion'] },
  { providerId: 'pedidosya', sourceUrl: 'https://www.pedidosya.cr/', cityIds: ['san-jose'] },
  { providerId: 'pedidosya', sourceUrl: 'https://www.pedidosya.com.ec/', cityIds: ['quito', 'guayaquil', 'cuenca'] },
  { providerId: 'pedidosya', sourceUrl: 'https://www.pedidosyasv.com.sv/', cityIds: ['san-salvador'] },
  { providerId: 'pedidosya', sourceUrl: 'https://www.pedidosya.com.gt/', cityIds: ['guatemala-city'] },
  { providerId: 'pedidosya', sourceUrl: 'https://www.pedidosya.com.hn/', cityIds: ['tegucigalpa', 'san-pedro-sula'] },
  { providerId: 'pedidosya', sourceUrl: 'https://www.pedidosyani.com.ni/', cityIds: ['managua'] },
  { providerId: 'pedidosya', sourceUrl: 'https://www.pedidosya.com.pa/', cityIds: ['panama-city'] },
  { providerId: 'pedidosya', sourceUrl: 'https://www.pedidosya.com.py/', cityIds: ['asuncion'] },
  { providerId: 'pedidosya', sourceUrl: 'https://www.pedidosya.com.uy/', cityIds: ['montevideo'] },
  { providerId: 'pedidosya', sourceUrl: 'https://www.pedidosya.com.ve/', cityIds: ['caracas'] }
]