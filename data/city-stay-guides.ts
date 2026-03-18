export interface CityStayGuide {
  blurb: string
  buildings: string[]
}

export const cityStayGuides: Partial<Record<string, CityStayGuide>> = {
  'buenos-aires': {
    blurb: 'Palermo and Colegiales are the easiest bases for first-time stays because cafes, gyms, and day-to-day errands all stack together. Recoleta works better if you want a more polished residential rhythm and easier access to classic apartment stock.',
    buildings: ['Torre Quartier Palermo', 'Mirabilia Palermo', 'Palermo View Tower']
  },
  bogota: {
    blurb: 'Chapinero Alto and Zona G are the safest default picks for short and medium stays because they balance cafes, coworking, and quick rides. Parque 93 and Usaquen suit a quieter residential setup with more serviced-building inventory.',
    buildings: ['BD Bacata area towers', 'Retiro 84 suites', 'Parque Central Bavaria']
  },
  'mexico-city': {
    blurb: 'Roma Norte and Condesa are still the easiest landing zones if you want to walk to cafes and restaurants, while Polanco makes more sense for polished buildings and easier gym access. The tradeoff is price versus convenience, not basic livability.',
    buildings: ['Be Grand Reforma', 'Haus Condesa', 'Paradox Santa Fe']
  },
  medellin: {
    blurb: 'Laureles is usually the easiest stay for a longer working month because it is flatter, calmer, and easier to stitch together on foot. El Poblado works better for higher-end buildings and shorter social stays, but you pay for that convenience.',
    buildings: ['Energy Living', 'Blux', 'Square Apartments']
  },
  lima: {
    blurb: 'Miraflores is still the easiest arrival neighborhood because daily errands, the waterfront, and airport rides are predictable. Barranco is better if you want a more textured stay and do not mind trading a bit of polish for atmosphere.',
    buildings: ['Upper Pardo', 'Nomad by Wynwood House', 'Soul Mate Inn area apartments']
  },
  'la-paz': {
    blurb: 'Zona Sur is the easiest landing zone because altitude stress is lower and apartment stock is more practical for longer routines. Sopocachi works if you prefer a more central, local rhythm and are comfortable with a little more daily friction.',
    buildings: ['Green Tower Suites', 'Calacoto high-rise apartments', 'San Miguel executive towers']
  },
  cochabamba: {
    blurb: 'Recoleta and Queru Queru tend to make the most sense for medium stays because they balance good apartment stock with easier day-to-day errands. El Prado is more central and social, but the best longer-stay buildings are usually a bit farther out.',
    buildings: ['Torre Alameda', 'El Prado executive apartments', 'Queru Queru residential towers']
  }
}