import type { CityProfile } from './city-profiles'
import cityProfiles from './city-profiles'


export type HousingTier = 'cheap' | 'moderate' | 'pricey' | 'unknown'

export const MIN_SAMPLE_SIZE = 5
const LOWER_PERCENTILE = 0.33
const UPPER_PERCENTILE = 0.66

export interface HousingTierResult {
  tier: HousingTier
  avgMonthlyUSD: number | null
  sampleSize: number
  percentile: number | null
  label: string
  hasData: boolean
}

const TIER_LABELS: Record<HousingTier, string> = {
  cheap: 'Cheap',
  moderate: 'Moderate',
  pricey: 'Pricey',
  unknown: 'No housing data'
}

export function housingTierLabel(tier: HousingTier): string {
  return TIER_LABELS[tier]
}

function trustedValue(profile: CityProfile): number | null {
  const airbnb = profile.details.airbnb
  if (!airbnb || airbnb.avgMonthlyUSD == null) return null
  if ((airbnb.sampleSize ?? 0) < MIN_SAMPLE_SIZE) return null
  return airbnb.avgMonthlyUSD
}

function trustedValues(profiles: readonly CityProfile[]): number[] {
  return profiles
    .map(trustedValue)
    .filter((value): value is number => value != null)
    .sort((a, b) => a - b)
}

function percentileThreshold(sortedValues: number[], p: number): number {
  if (sortedValues.length === 0) return Number.NaN
  const index = Math.min(sortedValues.length - 1, Math.floor(p * sortedValues.length))
  return sortedValues[index]
}

function percentileRank(sortedValues: number[], value: number): number {
  if (sortedValues.length === 0) return 0
  const below = sortedValues.filter((candidate) => candidate <= value).length
  return below / sortedValues.length
}

export function getHousingTier(
  profile: CityProfile,
  dataset: readonly CityProfile[] = cityProfiles
): HousingTierResult {
  const airbnb = profile.details.airbnb
  const sampleSize = airbnb?.sampleSize ?? 0
  const value = trustedValue(profile)

  if (value == null) {
    return {
      tier: 'unknown',
      avgMonthlyUSD: airbnb?.avgMonthlyUSD ?? null,
      sampleSize,
      percentile: null,
      label: TIER_LABELS.unknown,
      hasData: false
    }
  }

  const sorted = trustedValues(dataset)
  const lower = percentileThreshold(sorted, LOWER_PERCENTILE)
  const upper = percentileThreshold(sorted, UPPER_PERCENTILE)

  let tier: HousingTier
  if (value <= lower) tier = 'cheap'
  else if (value >= upper) tier = 'pricey'
  else tier = 'moderate'

  return {
    tier,
    avgMonthlyUSD: value,
    sampleSize,
    percentile: percentileRank(sorted, value),
    label: TIER_LABELS[tier],
    hasData: true
  }
}

export function getHousingTiers(
  dataset: readonly CityProfile[] = cityProfiles
): Record<string, HousingTierResult> {
  const result: Record<string, HousingTierResult> = {}
  for (const profile of dataset) {
    result[profile.id] = getHousingTier(profile, dataset)
  }
  return result
}
