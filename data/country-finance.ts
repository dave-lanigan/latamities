export interface UnofficialRateProfile {
  label: string
  status: string
  note: string
  updatePlan: string
}

export interface CountryFinanceProfile {
  currencyName: string
  unofficialRate?: UnofficialRateProfile
}

export const countryFinanceProfiles: Partial<Record<string, CountryFinanceProfile>> = {
  Argentina: {
    currencyName: 'Argentine peso',
    unofficialRate: {
      label: 'Blue dollar',
      status: 'Tracked separately from the official card rate',
      note: 'This section is intentionally country-specific. The live buy/sell spread will be populated once the refresh script is wired.',
      updatePlan: 'Periodic script refresh planned'
    }
  },
  Bolivia: {
    currencyName: 'Bolivian boliviano',
    unofficialRate: {
      label: 'Unofficial USD cash rate',
      status: 'Tracked separately where the street or cash spread matters',
      note: 'Using a neutral label here avoids treating Bolivia like the Argentina blue-dollar market. The live value will be filled by the refresh script.',
      updatePlan: 'Periodic script refresh planned'
    }
  }
}