<script setup lang="ts">
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  CircleCheck,
  CircleX,
  CloudRain,
  Filter,
  Globe2,
  Home,
  MapPin,
  Plane,
  ShieldAlert,
  Star,
  Sun,
  Trees,
  UtensilsCrossed,
  Users,
  Wifi,
  Wine,
  X
} from 'lucide-vue-next'

import Accordion from '~/components/ui/Accordion.vue'
import Badge from '~/components/ui/Badge.vue'
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'
import CardContent from '~/components/ui/CardContent.vue'
import CardDescription from '~/components/ui/CardDescription.vue'
import CardHeader from '~/components/ui/CardHeader.vue'
import CardTitle from '~/components/ui/CardTitle.vue'
import { cityAmenityProfiles } from '~~/data/city-amenities'
import { cityFlightDestinations } from '~~/data/city-flight-destinations'
import { cityOutdoorGuides } from '~~/data/city-outdoor-guides'
import cityProfiles, { type CityProfile, type MonthlyDatum } from '~~/data/city-profiles'
import { countryFinanceProfiles } from '~~/data/country-finance'
import countryData, { type CountryProfile } from '~~/data/country-profiles'
import { cityStayGuides } from '~~/data/city-stay-guides'
import { resolveResourceGroups, type ResourceGroup, type ResolvedResourceLink } from '~~/data/resource-directory'

const MAP_ID = 'main'
const mapOptions = {
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-75, -12] as [number, number],
  zoom: 3
}

const selectedCity = ref<CityProfile | null>(null)
const isPanelOpen = ref(false)
const bubblePixelPos = ref<{ x: number; y: number } | null>(null)
const hoveredTemp = ref<{ month: string; f: number } | null>(null)
const hoveredRain = ref<{ month: string; mm: number } | null>(null)
const isCountriesOpen = ref(false)
const selectedCountry = ref<CountryProfile | null>(null)
const isMobile = ref(false)
const unitSystem = ref<'imperial' | 'metric'>('imperial')
const minNiceWeatherDays = ref(150)
const preferredTempMinF = ref(75)
const preferredTempMaxF = ref(85)
const minPopulationM = ref(1)
const isFiltersOpen = ref(false)
const flightOriginCode = ref('')
const flightOriginLabel = ref('')
const isResolvingFlightOrigin = ref(false)
const isLoadingFlightPrice = ref(false)
const flightPriceError = ref('')
const flightPriceQuote = ref<{ formattedPrice: string | null; origin: string; destination: string } | null>(null)
const climateView = ref<'temperature' | 'rainfall'>('temperature')
const climateRotation = ref(-22)
const climatePitch = ref(58)
const isDraggingClimate = ref(false)
const activeClimatePointerId = ref<number | null>(null)
const climatePointerX = ref(0)
const climatePointerY = ref(0)

const checkMobile = () => { isMobile.value = window.innerWidth < 640 }
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => window.removeEventListener('resize', checkMobile))

let _map: any = null

const updateBubblePos = () => {
  if (!_map || !selectedCity.value) {
    bubblePixelPos.value = null
    return
  }
  const pt = _map.project(selectedCity.value.coordinates as [number, number])
  bubblePixelPos.value = { x: pt.x, y: pt.y }
}

useMapbox(MAP_ID, (map) => {
  _map = map
  map.fitBounds([[-118, -56], [-32, 33]], { padding: 40, duration: 0 })
  map.on('move', updateBubblePos)
  map.on('zoom', updateBubblePos)
})

watch(selectedCity, () => nextTick(updateBubblePos))

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const cToF = (value: number) => (value * 9 / 5) + 32
const fToC = (value: number) => (value - 32) * 5 / 9
const displayTemperature = (valueC: number) => unitSystem.value === 'imperial' ? Math.round(cToF(valueC)) : Math.round(valueC)
const unitTemperatureLabel = computed(() => unitSystem.value === 'imperial' ? '°F' : '°C')
const displayRainfall = (mm: number) => unitSystem.value === 'imperial' ? (mm / 25.4).toFixed(1) : Math.round(mm)
const unitRainfallLabel = computed(() => unitSystem.value === 'imperial' ? 'in' : 'mm')
const temperatureSliderConfig = computed(() => unitSystem.value === 'imperial'
  ? { min: 50, max: 95, step: 1 }
  : { min: 10, max: 35, step: 1 }
)
const preferredTempMinDisplay = computed({
  get: () => unitSystem.value === 'imperial' ? preferredTempMinF.value : Math.round(fToC(preferredTempMinF.value)),
  set: (value: number) => {
    preferredTempMinF.value = unitSystem.value === 'imperial' ? value : cToF(value)
  }
})
const preferredTempMaxDisplay = computed({
  get: () => unitSystem.value === 'imperial' ? preferredTempMaxF.value : Math.round(fToC(preferredTempMaxF.value)),
  set: (value: number) => {
    preferredTempMaxF.value = unitSystem.value === 'imperial' ? value : cToF(value)
  }
})

const weatherBounds = computed(() => {
  const min = Math.min(preferredTempMinF.value, preferredTempMaxF.value)
  const max = Math.max(preferredTempMinF.value, preferredTempMaxF.value)

  return { min, max }
})

const perfectWeatherRangeLabel = computed(() => {
  if (unitSystem.value === 'imperial') {
    return `${Math.round(weatherBounds.value.min)}–${Math.round(weatherBounds.value.max)}°F`
  }

  return `${Math.round(fToC(weatherBounds.value.min))}–${Math.round(fToC(weatherBounds.value.max))}°C`
})

// Fake Airbnb monthly rental — seeded from city id so each city gets a consistent plausible number
const fakeAirbnbRental = computed(() => {
  if (!selectedCity.value) return null
  const seed = selectedCity.value.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const base = 650 + (seed % 28) * 50   // $650 – $1 950
  return `$${base.toLocaleString()}`
})

const countWeatherDaysInBounds = (city: CityProfile, minF: number, maxF: number) =>
  city.snapshot.temperatureByMonth.reduce((total, datum, index) => {
    const f = datum.value * 9 / 5 + 32
    return f >= minF && f <= maxF ? total + (DAYS_IN_MONTH[index] ?? 0) : total
  }, 0)

const selectedClimate = computed(() => {
  if (!selectedCity.value) return null
  const { rainfallByMonth, temperatureByMonth } = selectedCity.value.snapshot
  const avgTempC = temperatureByMonth.reduce((t, d) => t + d.value, 0) / temperatureByMonth.length
  const avgTempF = Math.round(cToF(avgTempC))
  const driestMonth = rainfallByMonth.reduce((a, b) => b.value < a.value ? b : a)
  const wettestMonth = rainfallByMonth.reduce((a, b) => b.value > a.value ? b : a)
  const warmestMonth = temperatureByMonth.reduce((a, b) => b.value > a.value ? b : a)
  const perfectWeatherDays = countWeatherDaysInBounds(selectedCity.value, weatherBounds.value.min, weatherBounds.value.max)
  return { avgTempC, avgTempF, driestMonth, wettestMonth, warmestMonth, perfectWeatherDays, temperatureByMonth, rainfallByMonth }
})

const tempColor = (c: number) => {
  // map °C to a colour: cold blue → cool teal → warm amber → hot red
  if (c <= 10) return '#93c5fd'       // blue-300
  if (c <= 16) return '#67e8f9'       // cyan-300
  if (c <= 20) return '#6ee7b7'       // emerald-300
  if (c <= 24) return '#fde68a'       // amber-200
  if (c <= 28) return '#fbbf24'       // amber-400
  if (c <= 32) return '#f97316'       // orange-500
  return '#ef4444'                    // red-500
}

const selectCity = (city: CityProfile) => {
  if (selectedCity.value?.id === city.id) {
    selectedCity.value = null
    isPanelOpen.value = false
    return
  }
  selectedCity.value = city
  nextTick(updateBubblePos)
}

const dismissBubble = () => { selectedCity.value = null }
const openPanel = () => { isPanelOpen.value = true }
const closePanel = () => { isPanelOpen.value = false }

const cityPerfectWeatherDays = (city: CityProfile) =>
  countWeatherDaysInBounds(city, weatherBounds.value.min, weatherBounds.value.max)

const cityPopulationM = (city: CityProfile) => {
  const parsed = parseFloat(city.snapshot.populationMetro.replace('M', ''))
  return isNaN(parsed) ? 0 : parsed
}

const filteredCities = computed(() =>
  cityProfiles.filter(city =>
    cityPerfectWeatherDays(city) >= minNiceWeatherDays.value &&
    cityPopulationM(city) >= minPopulationM.value
  )
)

type PrimaryResourceGroup = ResourceGroup & { primaryItem: ResolvedResourceLink }
type PrimaryResourceCard = {
  id: ResourceGroup['id']
  title: string
  href: string
  label: string
  isAffiliateReady: boolean
}

type ClimateMetric = {
  title: string
  unit: string
  values: MonthlyDatum[]
  format: (value: number) => string
  maxValue: number
  color: string
  peak: MonthlyDatum
  floorColor: string
}

const selectedCityResourceGroups = computed<ResourceGroup[]>(() => selectedCity.value ? resolveResourceGroups(selectedCity.value) : [])
const selectedCityFlightResource = computed<ResolvedResourceLink | null>(() =>
  selectedCityResourceGroups.value.find((group) => group.id === 'flights')?.items[0] ?? null
)
const selectedCityFlightHref = computed(() => selectedCityFlightResource.value?.href ?? '')
const selectedCityFlightDestination = computed(() => selectedCity.value ? cityFlightDestinations[selectedCity.value.id] ?? null : null)
const shouldShowFlightSnapshot = computed(() => Boolean(flightOriginCode.value && selectedCityFlightDestination.value))
const selectedCityPrimaryResourceGroups = computed<PrimaryResourceGroup[]>(() =>
  selectedCityResourceGroups.value.flatMap((group) => {
    const primaryItem = group.items[0]
    return primaryItem ? [{ ...group, primaryItem }] : []
  })
)
const selectedCityPrimaryResourceCards = computed<PrimaryResourceCard[]>(() =>
  selectedCityPrimaryResourceGroups.value.map((group) => ({
    id: group.id,
    title: group.title,
    href: group.primaryItem.href,
    label: group.primaryItem.label,
    isAffiliateReady: group.primaryItem.isAffiliateReady
  }))
)
const selectedCityAmenityProfile = computed(() => selectedCity.value ? cityAmenityProfiles[selectedCity.value.id] ?? null : null)
const selectedCityFinanceProfile = computed(() => selectedCity.value ? countryFinanceProfiles[selectedCity.value.country] ?? null : null)
const selectedCityAirport = computed(() => selectedCity.value?.details.airport ?? null)
const selectedCityStayGuide = computed(() => {
  if (!selectedCity.value) return null

  const explicitGuide = cityStayGuides[selectedCity.value.id]

  if (explicitGuide) {
    return explicitGuide
  }

  return {
    blurb: `${selectedCity.value.details.neighborhoods.slice(0, 2).join(' and ')} are the easiest starting points for most stays because they keep daily errands and transport friction relatively low. ${selectedCity.value.details.mobility}`,
    buildings: []
  }
})
const selectedCityOutdoorGuide = computed(() => selectedCity.value ? cityOutdoorGuides[selectedCity.value.id] ?? null : null)
const selectedCityStayBuildings = computed(() => selectedCityStayGuide.value?.buildings ?? [])
const selectedTemperatureByMonth = computed(() => selectedClimate.value?.temperatureByMonth ?? [])
const selectedRainfallByMonth = computed(() => selectedClimate.value?.rainfallByMonth ?? [])
const selectedRestaurants = computed(() => selectedCity.value?.details.restaurants ?? [])
const selectedCafes = computed(() => selectedCity.value?.details.cafes ?? [])
const selectedBars = computed(() => selectedCity.value?.details.bars ?? [])
const selectedAttractions = computed(() => selectedCity.value?.details.attractions ?? [])
const selectedEssentialGroups = computed(() =>
  selectedCityResourceGroups.value.filter((group) => group.id !== 'flights')
)
const selectedClimateMetric = computed<ClimateMetric>(() => {
  if (climateView.value === 'rainfall') {
    const values = selectedRainfallByMonth.value

    return {
      title: 'Rainfall',
      unit: 'mm',
      values,
      format: (value) => `${value}mm`,
      maxValue: Math.max(...values.map((item) => item.value), 1),
      color: '#0f766e',
      peak: values.reduce((highest, current) => current.value > highest.value ? current : highest, values[0] ?? { month: '', value: 0 }),
      floorColor: '#ccfbf1'
    }
  }

  const values = selectedTemperatureByMonth.value

  return {
    title: 'Temperature',
    unit: unitSystem.value === 'imperial' ? '°F' : '°C',
    values,
    format: (value) => `${displayTemperature(value)}${unitSystem.value === 'imperial' ? '°F' : '°C'}`,
    maxValue: Math.max(...values.map((item) => item.value), 1),
    color: '#f97316',
    peak: values.reduce((highest, current) => current.value > highest.value ? current : highest, values[0] ?? { month: '', value: 0 }),
    floorColor: '#ffedd5'
  }
})
const climateGraphViewport = { width: 360, height: 360, centerX: 180, centerY: 186, perspective: 520 }

const projectClimatePoint = (x: number, y: number, z: number) => {
  const yaw = (climateRotation.value * Math.PI) / 180
  const pitch = (climatePitch.value * Math.PI) / 180

  const yawX = x * Math.cos(yaw) - y * Math.sin(yaw)
  const yawY = x * Math.sin(yaw) + y * Math.cos(yaw)
  const yawZ = z

  const pitchX = yawX
  const pitchY = yawY * Math.cos(pitch) - yawZ * Math.sin(pitch)
  const pitchZ = yawY * Math.sin(pitch) + yawZ * Math.cos(pitch)

  const scale = climateGraphViewport.perspective / (climateGraphViewport.perspective - pitchZ)

  return {
    x: climateGraphViewport.centerX + (pitchX * scale),
    y: climateGraphViewport.centerY + (pitchY * scale),
    depth: pitchZ,
    scale
  }
}

const buildProjectedPath = (points: Array<{ x: number; y: number }>, closePath = false) => {
  if (!points.length) return ''

  const commands = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)

  return closePath ? `${commands.join(' ')} Z` : commands.join(' ')
}

const climateBaseRadius = 108
const climateLabelRadius = 144
const climateHeightScale = 148

const climateGuideRings = computed(() =>
  [0.25, 0.5, 0.75, 1].map((fraction) => {
    const radius = climateBaseRadius * fraction
    const samples = Array.from({ length: 48 }, (_, index) => {
      const angle = (index / 48) * Math.PI * 2
      return projectClimatePoint(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
    })

    return {
      label: selectedClimateMetric.value.format(Math.round(selectedClimateMetric.value.maxValue * fraction)),
      path: buildProjectedPath(samples, true)
    }
  })
)

const selectedClimatePoints = computed(() => {
  const values = selectedClimateMetric.value.values
  const maxValue = Math.max(selectedClimateMetric.value.maxValue, 1)

  return values.map((datum, index) => {
    const angle = ((index / values.length) * Math.PI * 2) - Math.PI / 2
    const planeX = Math.cos(angle) * climateBaseRadius
    const planeY = Math.sin(angle) * climateBaseRadius
    const height = (datum.value / maxValue) * climateHeightScale
    const base = projectClimatePoint(planeX, planeY, 0)
    const top = projectClimatePoint(planeX, planeY, height)
    const label = projectClimatePoint(Math.cos(angle) * climateLabelRadius, Math.sin(angle) * climateLabelRadius, 0)

    return {
      ...datum,
      shortLabel: datum.month.slice(0, 3),
      formattedValue: selectedClimateMetric.value.format(datum.value),
      planeX,
      planeY,
      height,
      base,
      top,
      label,
      color: climateView.value === 'temperature'
        ? tempColor(datum.value)
        : `rgb(15 118 110 / ${0.35 + (datum.value / maxValue) * 0.65})`
    }
  }).sort((left, right) => left.top.depth - right.top.depth)
})

const climateBasePath = computed(() => {
  const points = selectedClimatePoints.value

  if (!points.length) return ''

  return buildProjectedPath(points.map((point) => point.base), true)
})
const selectedCityExchangeSummary = computed(() => {
  const finance = selectedCityFinanceProfile.value
  const unofficialRate = finance?.unofficialRate

  if (!finance || !unofficialRate) {
    return null
  }

  return {
    currencyName: finance.currencyName,
    label: unofficialRate.label,
    status: unofficialRate.status,
    note: unofficialRate.note,
    updatePlan: unofficialRate.updatePlan
  }
})

const resetWeatherBounds = () => {
  preferredTempMinF.value = 75
  preferredTempMaxF.value = 85
}

const rotateClimate = (direction: number) => {
  climateRotation.value += direction * 18
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const startClimateSpin = (event: PointerEvent) => {
  activeClimatePointerId.value = event.pointerId
  climatePointerX.value = event.clientX
  climatePointerY.value = event.clientY
  isDraggingClimate.value = true
}

const updateClimateSpin = (event: PointerEvent) => {
  if (!isDraggingClimate.value || activeClimatePointerId.value !== event.pointerId) return

  const deltaX = event.clientX - climatePointerX.value
  const deltaY = event.clientY - climatePointerY.value

  climateRotation.value += deltaX * 0.22
  climatePitch.value = clamp(climatePitch.value - deltaY * 0.12, 42, 72)
  climatePointerX.value = event.clientX
  climatePointerY.value = event.clientY
}

const endClimateSpin = (event?: PointerEvent) => {
  if (event && activeClimatePointerId.value !== event.pointerId) return

  activeClimatePointerId.value = null
  isDraggingClimate.value = false
}

const mapsSearchUrl = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

const resolveFlightOriginFromLocation = async () => {
  if (!import.meta.client || !navigator.geolocation) {
    flightPriceError.value = 'Geolocation is not available in this browser.'
    return
  }

  isResolvingFlightOrigin.value = true
  flightPriceError.value = ''

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 1000 * 60 * 30
      })
    })

    const response = await $fetch<{ iata: string; name: string }>('/api/flight-origin', {
      query: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    })

    flightOriginCode.value = response.iata
    flightOriginLabel.value = response.name
  } catch (error) {
    flightOriginCode.value = ''
    flightOriginLabel.value = ''
    flightPriceError.value = error instanceof Error
      ? error.message
      : 'Location permission was denied or the nearest airport could not be resolved.'
  } finally {
    isResolvingFlightOrigin.value = false
  }
}

const lookupFlightPrice = async () => {
  const origin = flightOriginCode.value.trim().toUpperCase()
  const destination = selectedCityFlightDestination.value

  flightPriceError.value = ''
  flightPriceQuote.value = null

  if (!destination) {
    flightPriceError.value = 'No destination airport code is mapped for this city yet.'
    return
  }

  if (!/^[A-Z]{3}$/.test(origin)) {
    flightPriceError.value = 'Current location has not resolved to a nearby airport yet.'
    return
  }

  isLoadingFlightPrice.value = true

  try {
    const response = await $fetch<{ formattedPrice: string | null; origin: string; destination: string }>('/api/flight-price', {
      query: {
        origin,
        destination: destination.iata
      }
    })

    if (!response.formattedPrice) {
      flightPriceError.value = 'Skyscanner did not return a price for this route yet.'
      return
    }

    flightPriceQuote.value = response
  } catch (error) {
    flightPriceError.value = error instanceof Error ? error.message : 'Unable to fetch a flight price right now.'
  } finally {
    isLoadingFlightPrice.value = false
  }
}

watch(() => selectedCity.value?.id, () => {
  flightPriceError.value = ''
  flightPriceQuote.value = null

  if (flightOriginCode.value && selectedCityFlightDestination.value) {
    void lookupFlightPrice()
  }
})

watch(flightOriginCode, (origin) => {
  if (origin && selectedCityFlightDestination.value) {
    void lookupFlightPrice()
  }
})

watch(filteredCities, (cities) => {
  if (selectedCity.value && !cities.find(c => c.id === selectedCity.value!.id)) {
    selectedCity.value = null
    isPanelOpen.value = false
  }
})

const availableCountries = computed(() => {
  const names = new Set(cityProfiles.map(c => c.country))
  return [...names].sort().map(name => countryData[name]).filter((country): country is CountryProfile => Boolean(country))
})

const toggleCountries = () => {
  isCountriesOpen.value = !isCountriesOpen.value
  if (!isCountriesOpen.value) selectedCountry.value = null
}

const fmtGdp = (b: number) => b >= 1000 ? `$${(b / 1000).toFixed(1)}T` : `$${b}B`
const fmtPc = (n: number) => `$${n >= 1000 ? (n / 1000).toFixed(1) + 'k' : n}`

useHead({
  title: 'Latamities',
  meta: [{ name: 'description', content: 'Map-first city profiles for remote workers in Latin America.' }]
})

onMounted(() => {
  void resolveFlightOriginFromLocation()
})
</script>

<template>
  <div class="fixed inset-0">
    <!-- Title – top left -->
    <div v-show="!isPanelOpen || !isMobile" class="absolute left-4 top-4 z-40 pointer-events-none select-none">
      <div class="rounded-2xl bg-white/80 backdrop-blur px-4 py-2 shadow-[0_4px_20px_rgba(15,23,42,0.15)]">
        <span class="text-lg font-bold tracking-tight text-slate-800">LatAmities</span>
      </div>
    </div>

    <!-- Filter icon button + dropdown – top right, hidden when detail panel is open -->
    <div v-if="!isPanelOpen" class="absolute right-4 top-4 z-40">
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(15,23,42,0.18)] transition hover:bg-slate-50"
        :aria-label="isFiltersOpen ? 'Close filters' : 'Open filters'"
        @click="isFiltersOpen = !isFiltersOpen"
      >
        <Filter class="h-4 w-4 text-slate-600" />
      </button>

      <!-- Dropdown panel -->
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="-translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-1 opacity-0"
      >
        <div
          v-if="isFiltersOpen"
          class="mt-2 w-56 rounded-2xl bg-white px-4 py-3 shadow-[0_4px_20px_rgba(15,23,42,0.18)]"
        >
          <div class="mb-3 flex items-center justify-between">
            <span class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Units</span>
            <div class="flex rounded-lg bg-slate-100 p-0.5 text-xs font-bold">
              <button type="button" class="rounded-md px-2.5 py-1 transition" :class="unitSystem === 'imperial' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'" @click="unitSystem = 'imperial'">Imperial</button>
              <button type="button" class="rounded-md px-2.5 py-1 transition" :class="unitSystem === 'metric' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'" @click="unitSystem = 'metric'">Metric</button>
            </div>
          </div>

          <!-- Weather filter row -->
          <div class="flex items-center gap-3">
            <Sun class="h-4 w-4 shrink-0 text-amber-400" />
            <div class="flex flex-1 items-center gap-2">
              <input
                id="nice-weather-filter"
                v-model.number="minNiceWeatherDays"
                type="range"
                min="0"
                max="365"
                step="5"
                class="flex-1 accent-primary"
              />
              <span class="w-8 text-right text-sm font-extrabold text-slate-900">{{ minNiceWeatherDays }}</span>
            </div>
          </div>

          <div class="mt-3 space-y-1">
            <div class="flex items-center justify-between text-[10px] font-bold uppercase tracking-wide text-slate-400">
              <span>Perfect weather range</span>
              <span>{{ perfectWeatherRangeLabel }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-8 text-[10px] font-bold uppercase tracking-wide text-slate-400">Low</span>
              <input
                id="temp-min-filter"
                v-model.number="preferredTempMinDisplay"
                type="range"
                :min="temperatureSliderConfig.min"
                :max="temperatureSliderConfig.max"
                :step="temperatureSliderConfig.step"
                class="flex-1 accent-primary"
              />
              <span class="w-12 text-right text-sm font-extrabold text-slate-900">{{ preferredTempMinDisplay }}{{ unitTemperatureLabel }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-8 text-[10px] font-bold uppercase tracking-wide text-slate-400">High</span>
              <input
                id="temp-max-filter"
                v-model.number="preferredTempMaxDisplay"
                type="range"
                :min="temperatureSliderConfig.min"
                :max="temperatureSliderConfig.max"
                :step="temperatureSliderConfig.step"
                class="flex-1 accent-primary"
              />
              <span class="w-12 text-right text-sm font-extrabold text-slate-900">{{ preferredTempMaxDisplay }}{{ unitTemperatureLabel }}</span>
            </div>
          </div>

          <!-- Population filter row -->
          <div class="mt-3 flex items-center gap-3">
            <Users class="h-4 w-4 shrink-0 text-lagoon-500" />
            <div class="flex flex-1 items-center gap-2">
              <input
                id="population-filter"
                v-model.number="minPopulationM"
                type="range"
                min="0"
                max="5"
                step="0.5"
                class="flex-1 accent-primary"
              />
              <span class="w-8 text-right text-sm font-extrabold text-slate-900">{{ minPopulationM }}M</span>
            </div>
          </div>

          <p class="mt-2 text-[10px] text-slate-400">{{ filteredCities.length }} / {{ cityProfiles.length }} cities</p>
        </div>
      </Transition>
    </div>

    <MapboxMap
      :map-id="MAP_ID"
      :options="mapOptions"
      style="width: 100%; height: 100%;"
    >
      <MapboxDefaultMarker
        v-for="city in filteredCities"
        :key="city.id"
        :marker-id="`marker-${city.id}`"
        :lnglat="city.coordinates"
      >
        <template #marker>
          <button
            type="button"
            class="city-marker"
            :data-active="selectedCity?.id === city.id ? 'true' : 'false'"
            :aria-label="`Show ${city.name}`"
            @click="selectCity(city)"
          >
            <span class="city-marker-dot" />
            <span class="city-marker-label">{{ city.name }}</span>
          </button>
        </template>
      </MapboxDefaultMarker>
    </MapboxMap>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-if="selectedCity && !isPanelOpen && (isMobile || bubblePixelPos)"
        :class="isMobile
          ? 'fixed inset-0 z-20 flex items-center justify-center p-4'
          : 'pointer-events-none absolute z-20 px-3'"
        :style="!isMobile && bubblePixelPos ? {
          left: `${bubblePixelPos.x}px`,
          top: `${bubblePixelPos.y}px`,
          transform: 'translate(-50%, calc(-100% - 1.5rem))'
        } : {}"
      >
        <!-- Mobile backdrop -->
        <div
          v-if="isMobile"
          class="absolute inset-0"
          @click="dismissBubble"
        />

        <div :class="isMobile ? 'relative z-10 w-full max-w-sm' : ''">
          <Card :class="`shadow-[0_20px_50px_rgba(15,23,42,0.28)] ${isMobile ? 'pointer-events-auto max-h-[85vh] overflow-y-auto w-full bg-slate-200 backdrop-blur-none' : 'pointer-events-auto w-[min(22rem,calc(100vw-2rem))]'}`">
            <CardHeader class="gap-2 pb-3">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <CardTitle class="text-xl">{{ selectedCity.name }}</CardTitle>
                  <Badge variant="secondary" class="mt-1.5">{{ selectedCity.country }}</Badge>
                </div>
                <button
                  class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:text-slate-900"
                  aria-label="Dismiss"
                  @click="dismissBubble"
                >
                  <X class="h-3.5 w-3.5" />
                </button>
              </div>
              <CardDescription class="text-sm leading-5">{{ selectedCity.details.tagline }}</CardDescription>
            </CardHeader>
            <CardContent class="space-y-3 pb-4">
              <div class="grid grid-cols-2 gap-1.5">
                <div class="rounded-xl bg-sand-50 p-2.5 text-center">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Population</p>
                  <p class="mt-1 text-base font-extrabold text-slate-900">{{ selectedCity.snapshot.populationMetro }}</p>
                  <p class="text-[10px] text-slate-400">metro</p>
                </div>
                <div class="rounded-xl bg-sand-50 p-2.5 text-center">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Download</p>
                  <p class="mt-1 text-base font-extrabold text-slate-900">{{ selectedCity.snapshot.internet.downloadMbps }}</p>
                  <p class="text-[10px] text-slate-400">Mbps</p>
                </div>
                <div class="rounded-xl bg-sand-50 p-2.5 text-center">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Avg temp</p>
                  <p class="mt-1 text-base font-extrabold text-slate-900">{{ unitSystem === 'imperial' ? selectedClimate?.avgTempF : Math.round(selectedClimate?.avgTempC ?? 0) }}{{ unitTemperatureLabel }}</p>
                  <p class="text-[10px] text-slate-400">&nbsp;</p>
                </div>
                <div class="rounded-xl bg-sand-50 p-2.5 text-center">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Altitude</p>
                  <p class="mt-1 text-base font-extrabold text-slate-900">{{ unitSystem === 'imperial' ? Math.round(selectedCity.snapshot.altitudeM * 3.28084) : Math.round(selectedCity.snapshot.altitudeM) }}</p>
                  <p class="text-[10px] text-slate-400">{{ unitSystem === 'imperial' ? 'ft' : 'm' }}</p>
                </div>
                <div v-if="shouldShowFlightSnapshot" class="col-span-2 rounded-xl bg-sky-50 p-3 text-left">
                  <div class="flex items-center justify-between gap-3">
                    <div>
                      <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Flight price</p>
                      <p class="mt-1 text-base font-extrabold text-slate-900">
                        {{ flightPriceQuote?.formattedPrice || 'Check route' }}
                      </p>
                      <p class="text-[10px] text-slate-500">
                        <template v-if="selectedCityFlightDestination">
                          Anytime one-way to {{ selectedCityFlightDestination.label }}
                        </template>
                        <template v-else>
                          Destination airport mapping coming soon
                        </template>
                      </p>
                    </div>
                    <Badge variant="secondary">Skyscanner</Badge>
                  </div>
                  <div class="mt-3 flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2.5">
                    <div>
                      <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Origin</p>
                      <p class="text-sm font-bold text-slate-900">
                        {{ flightOriginCode }} <span class="font-medium text-slate-500">{{ flightOriginLabel }}</span>
                      </p>
                    </div>
                    <Button size="sm" class="h-10 px-3" :disabled="isResolvingFlightOrigin || isLoadingFlightPrice" @click="resolveFlightOriginFromLocation">
                      {{ isResolvingFlightOrigin ? 'Locating…' : 'Refresh' }}
                    </Button>
                  </div>
                  <p class="mt-2 text-[10px] text-slate-400">Origin is resolved from the user’s current location and nearest airport.</p>
                  <p v-if="flightPriceError" class="mt-2 text-[11px] font-semibold text-red-600">{{ flightPriceError }}</p>
                  <p v-else-if="isLoadingFlightPrice" class="mt-2 text-[11px] font-semibold text-slate-500">Loading fare from {{ flightOriginCode }}…</p>
                  <p v-else-if="flightPriceQuote" class="mt-2 text-[11px] font-semibold text-emerald-700">{{ flightPriceQuote.origin }} → {{ flightPriceQuote.destination }} loaded.</p>
                </div>
                <div class="col-span-2 rounded-xl bg-sand-50 p-2.5 text-center">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Perfect weather days</p>
                  <p class="mt-1 text-base font-extrabold text-slate-900">{{ selectedClimate?.perfectWeatherDays }}</p>
                  <p class="text-[10px] text-slate-400">{{ perfectWeatherRangeLabel }} per year</p>
                </div>
                <div class="col-span-2 rounded-xl bg-emerald-50 p-2.5">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-[10px] font-bold uppercase tracking-wide text-emerald-600">Airbnb avg / month</p>
                      <p class="mt-1 text-base font-extrabold text-slate-900">{{ fakeAirbnbRental }}</p>
                      <p class="text-[10px] text-slate-400">1-bed, est. 30 nights</p>
                    </div>
                    <div class="text-right">
                      <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">{{ selectedClimate?.warmestMonth?.month }} weather</p>
                      <p class="mt-1 text-base font-extrabold text-slate-900">{{ selectedClimate ? displayTemperature(selectedClimate.warmestMonth.value) : '–' }}{{ unitTemperatureLabel }}</p>
                      <p class="text-[10px] text-slate-400">peak month</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Temperature bar -->
              <div>
                <p class="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">Avg temperature</p>
                <div class="flex gap-px">
                  <div
                    v-for="d in selectedTemperatureByMonth"
                    :key="d.month"
                    class="group relative flex-1 cursor-default rounded-sm"
                    style="height:28px"
                    :style="{ backgroundColor: tempColor(d.value) }"
                    @mouseenter="hoveredTemp = { month: d.month, f: Math.round(d.value * 9/5 + 32) }"
                    @mouseleave="hoveredTemp = null"
                  >
                    <div
                      v-if="hoveredTemp?.month === d.month"
                      class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow"
                    >{{ d.month }} {{ hoveredTemp.f }}°F</div>
                  </div>
                </div>
                <div class="mt-0.5 flex justify-between px-px">
                  <span class="text-[9px] text-slate-400">J</span>
                  <span class="text-[9px] text-slate-400">J</span>
                  <span class="text-[9px] text-slate-400">D</span>
                </div>
              </div>

              <!-- Rainfall bar -->
              <div>
                <p class="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">Avg rainfall</p>
                <div class="flex items-end gap-px" style="height:32px">
                  <div
                    v-for="d in selectedRainfallByMonth"
                    :key="d.month"
                    class="group relative flex-1 cursor-default rounded-sm bg-blue-400"
                    :style="{ height: `${Math.round((d.value / Math.max(...selectedRainfallByMonth.map(r => r.value), 1)) * 100)}%`, minHeight: '2px' }"
                    @mouseenter="hoveredRain = { month: d.month, mm: d.value }"
                    @mouseleave="hoveredRain = null"
                  >
                    <div
                      v-if="hoveredRain?.month === d.month"
                      class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow"
                    >{{ d.month }} {{ d.value }}mm</div>
                  </div>
                </div>
                <div class="mt-0.5 flex justify-between px-px">
                  <span class="text-[9px] text-slate-400">J</span>
                  <span class="text-[9px] text-slate-400">J</span>
                  <span class="text-[9px] text-slate-400">D</span>
                </div>
              </div>

              <Button class="w-full justify-center" size="sm" @click="openPanel">
                Full profile
                <ArrowRight class="h-3.5 w-3.5" />
              </Button>
            </CardContent>
          </Card>
          <div v-if="!isMobile" class="mx-auto h-3 w-3 rotate-45 border-b border-r border-white/50 bg-white shadow-[3px_3px_8px_rgba(15,23,42,0.08)]" />
        </div>
      </div>
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isPanelOpen && selectedCity"
        class="absolute right-0 top-0 z-30 h-full w-[75vw] overflow-y-auto bg-white shadow-[-8px_0_40px_rgba(15,23,42,0.18)] max-md:w-full"
      >
        <div class="sticky top-0 z-10 bg-gradient-to-r from-lagoon-700 to-slate-800 px-6 py-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">Profile</p>
              <h2 class="mt-0.5 text-2xl font-extrabold text-white">
                {{ selectedCity.name }}, {{ selectedCity.country }}
              </h2>
              <p class="mt-1 text-sm italic text-teal-200/80">{{ selectedCity.details.tagline }}</p>
            </div>
            <button
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Close panel"
              @click="closePanel"
            >
              <X class="h-4 w-4" />
            </button>
          </div>
        </div>

        <div class="space-y-2 p-4">

          <!-- 1 · About -->
          <Accordion title="About" :default-open="true">
            <p class="text-sm leading-7 text-slate-600">{{ selectedCity.details.overview }}</p>
            <div v-if="selectedCity.details.knownFor?.length" class="mt-3 flex flex-wrap gap-2">
              <Badge v-for="tag in selectedCity.details.knownFor" :key="tag" variant="secondary">{{ tag }}</Badge>
            </div>
            <div class="mt-4 space-y-3">
              <div class="rounded-xl bg-teal-50 p-3">
                <div class="flex items-start gap-3">
                  <Plane class="mt-0.5 h-4 w-4 shrink-0 text-lagoon-500" />
                  <div>
                    <p class="text-sm font-bold text-lagoon-700">Arrival</p>
                    <p class="mt-1 text-sm leading-6 text-slate-600">{{ selectedCityAirport?.description }}</p>
                    <p v-if="selectedCityAirport?.rideshareNote" class="mt-1 text-xs leading-5 text-slate-500">{{ selectedCityAirport?.rideshareNote }}</p>
                  </div>
                </div>
              </div>
              <div>
                <p class="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Best for</p>
                <div class="flex flex-wrap gap-2">
                  <Badge v-for="tag in selectedCity.details.bestFor" :key="tag" class="bg-emerald-100 text-emerald-800">{{ tag }}</Badge>
                </div>
              </div>
              <div class="rounded-xl bg-amber-50 p-3">
                <div class="flex items-center gap-1.5 mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-600">
                  <ShieldAlert class="h-3 w-3" /> Watchouts
                </div>
                <ul class="space-y-1.5 text-sm leading-6 text-slate-700">
                  <li v-for="item in selectedCity.details.watchouts" :key="item" class="flex gap-2">
                    <span class="mt-0.5 shrink-0 text-amber-400">⚠</span>{{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </Accordion>

          <Accordion title="Neighborhoods & Stays">
            <div class="space-y-4">
              <p class="text-sm leading-7 text-slate-600">{{ selectedCityStayGuide?.blurb }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="n in selectedCity.details.neighborhoods"
                  :key="n"
                  class="rounded-xl bg-sand-50 px-3 py-1.5 text-sm font-semibold text-slate-800"
                >
                  <MapPin class="mr-1 inline h-3 w-3 text-slate-400" />{{ n }}
                </span>
              </div>
              <div class="rounded-xl bg-sand-50 px-4 py-3">
                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-2">
                    <Home class="h-4 w-4 text-slate-400" />
                    <div>
                      <p class="text-sm font-bold text-slate-900">
                        <template v-if="selectedCity.details.airbnb?.avgNightlyUSD != null">
                          ~${{ selectedCity.details.airbnb.avgNightlyUSD }} <span class="text-xs font-normal text-slate-500">/ night avg</span>
                        </template>
                        <template v-else>
                          <span class="text-slate-400">Avg Airbnb cost coming soon</span>
                        </template>
                      </p>
                      <p class="text-xs text-slate-400">Apartment-style stay baseline</p>
                    </div>
                  </div>
                  <a
                    :href="`https://www.airbnb.com/s/${encodeURIComponent(selectedCity.name + ', ' + selectedCity.country)}/homes`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs font-bold text-lagoon-500 hover:underline"
                  >Search stays</a>
                </div>
              </div>
              <div>
                <p class="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Buildings</p>
                <div v-if="selectedCityStayBuildings.length" class="flex flex-wrap gap-2">
                  <a
                    v-for="building in selectedCityStayBuildings"
                    :key="building"
                    :href="mapsSearchUrl(`${building} ${selectedCity.name}`)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
                  >
                    {{ building }}
                  </a>
                </div>
                <p v-else class="text-sm text-slate-400 italic">Building picks coming soon.</p>
              </div>
            </div>
          </Accordion>

          <Accordion title="Flights">
            <div class="space-y-4">
              <div>
                <p class="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Airport transport</p>
                <p class="text-sm leading-7 text-slate-600">{{ selectedCityAirport?.description }}</p>
                <div
                  class="mt-3 flex items-start gap-3 rounded-xl p-3"
                  :class="selectedCityAirport?.rideshareFromAirport ? 'bg-emerald-50' : 'bg-red-50'"
                >
                  <component
                    :is="selectedCityAirport?.rideshareFromAirport ? CircleCheck : CircleX"
                    class="mt-0.5 h-4 w-4 shrink-0"
                    :class="selectedCityAirport?.rideshareFromAirport ? 'text-emerald-500' : 'text-red-500'"
                  />
                  <div>
                    <p class="text-sm font-semibold" :class="selectedCityAirport?.rideshareFromAirport ? 'text-emerald-800' : 'text-red-800'">
                      {{ selectedCityAirport?.rideshareFromAirport ? 'Rideshare works from the airport' : 'Use taxi or official transfer first' }}
                    </p>
                    <p v-if="selectedCityAirport?.rideshareNote" class="mt-0.5 text-xs leading-5 text-slate-500">{{ selectedCityAirport?.rideshareNote }}</p>
                  </div>
                </div>
                <div class="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-lagoon-500">
                  <a :href="mapsSearchUrl(`${selectedCity.name} airport taxi`)" target="_blank" rel="noopener noreferrer" class="hover:underline">Airport taxis</a>
                  <a :href="mapsSearchUrl(`${selectedCity.name} airport bus`)" target="_blank" rel="noopener noreferrer" class="hover:underline">Airport transport</a>
                  <a v-if="selectedCityFlightHref" :href="selectedCityFlightHref" target="_blank" rel="noopener noreferrer" class="hover:underline">Skyscanner search</a>
                </div>
              </div>
              <div class="rounded-xl bg-sky-50 p-4">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Flight price</p>
                    <p class="mt-1 text-xl font-extrabold text-slate-900">{{ flightPriceQuote?.formattedPrice || 'Waiting on location' }}</p>
                    <p class="text-xs text-slate-500">
                      <template v-if="shouldShowFlightSnapshot && selectedCityFlightDestination">
                        {{ flightOriginCode }} to {{ selectedCityFlightDestination.label }}
                      </template>
                      <template v-else>
                        Uses the nearest airport from the user’s current location.
                      </template>
                    </p>
                  </div>
                  <Button size="sm" class="h-10 px-3" :disabled="isResolvingFlightOrigin || isLoadingFlightPrice" @click="resolveFlightOriginFromLocation">
                    {{ isResolvingFlightOrigin ? 'Locating…' : 'Refresh' }}
                  </Button>
                </div>
                <p v-if="flightPriceError" class="mt-3 text-[11px] font-semibold text-red-600">{{ flightPriceError }}</p>
              </div>
            </div>
          </Accordion>

          <!-- 5 · Work -->
          <Accordion title="Working Here">
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-2">
                <div class="rounded-xl bg-sky-50 p-3 text-center">
                  <Wifi class="mx-auto mb-1 h-3.5 w-3.5 text-sky-400" />
                  <p class="text-base font-extrabold text-sky-700">{{ selectedCity.snapshot.internet.downloadMbps }}</p>
                  <p class="text-[10px] text-sky-500">Mbps ↓</p>
                </div>
                <div class="rounded-xl bg-emerald-50 p-3 text-center">
                  <Wifi class="mx-auto mb-1 h-3.5 w-3.5 text-emerald-400" />
                  <p class="text-base font-extrabold text-emerald-700">{{ selectedCity.snapshot.internet.uploadMbps }}</p>
                  <p class="text-[10px] text-emerald-500">Mbps ↑</p>
                </div>
                <div class="rounded-xl bg-violet-50 p-3 text-center">
                  <Wifi class="mx-auto mb-1 h-3.5 w-3.5 text-violet-400" />
                  <p class="text-base font-extrabold text-violet-700">{{ selectedCity.snapshot.internet.latencyMs }}</p>
                  <p class="text-[10px] text-violet-500">ms latency</p>
                </div>
              </div>
              <p class="text-sm leading-7 text-slate-600">{{ selectedCity.details.workstyle }}</p>
              <a
                :href="`https://www.coworker.com/search?q=${encodeURIComponent(selectedCity.name)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3 transition hover:bg-blue-100"
              >
                <div>
                  <p class="text-sm font-bold text-slate-900">Find co-working in {{ selectedCity.name }}</p>
                  <p class="text-xs text-slate-500">Day passes, desks &amp; memberships</p>
                </div>
                <ArrowRight class="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
              </a>
            </div>
          </Accordion>

          <Accordion v-if="selectedCityAmenityProfile" title="Coworking & Gyms">
            <div class="space-y-4">
              <div class="rounded-xl bg-sand-50 p-3">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-sm font-bold text-slate-900">Coworking</p>
                  <p class="text-xs text-slate-500">
                    <span v-if="selectedCityAmenityProfile.coworking.dayPassUSD">~${{ selectedCityAmenityProfile.coworking.dayPassUSD }}/day</span>
                    <span v-if="selectedCityAmenityProfile.coworking.monthlyUSD"> · ~${{ selectedCityAmenityProfile.coworking.monthlyUSD }}/mo</span>
                  </p>
                </div>
                <p class="mt-1.5 text-sm leading-6 text-slate-600">{{ selectedCityAmenityProfile.coworking.summary }}</p>
                <ul class="mt-2 space-y-1.5 text-sm text-slate-700">
                  <li v-for="spot in selectedCityAmenityProfile.coworking.examples" :key="spot.name">
                    <span class="font-semibold">{{ spot.name }}</span>
                    <span v-if="spot.note" class="ml-1 text-slate-400">— {{ spot.note }}</span>
                  </li>
                </ul>
              </div>
              <div class="rounded-xl bg-sand-50 p-3">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-sm font-bold text-slate-900">Gyms</p>
                  <p v-if="selectedCityAmenityProfile.gyms.monthlyUSD" class="text-xs text-slate-500">~${{ selectedCityAmenityProfile.gyms.monthlyUSD }}/mo</p>
                </div>
                <p class="mt-1.5 text-sm leading-6 text-slate-600">{{ selectedCityAmenityProfile.gyms.summary }}</p>
                <ul class="mt-2 space-y-1.5 text-sm text-slate-700">
                  <li v-for="spot in selectedCityAmenityProfile.gyms.examples" :key="spot.name">
                    <span class="font-semibold">{{ spot.name }}</span>
                    <span v-if="spot.note" class="ml-1 text-slate-400">— {{ spot.note }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </Accordion>

          <Accordion title="Getting Around & Essentials">
            <div class="space-y-4">
              <div v-for="group in selectedEssentialGroups" :key="group.id" class="rounded-xl bg-slate-50 p-4">
                <p class="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">{{ group.title }}</p>
                <p class="mt-1 text-sm leading-6 text-slate-600">{{ group.summary }}</p>
                <div class="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  <a
                    v-for="item in group.items"
                    :key="item.id"
                    :href="item.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm font-semibold text-lagoon-500 hover:underline"
                  >
                    {{ item.label }}<span v-if="item.badge || !item.isAffiliateReady" class="ml-1 text-xs font-bold uppercase tracking-wide text-slate-400">{{ item.badge || 'Soon' }}</span>
                  </a>
                </div>
                <p class="mt-2 text-xs leading-5 text-slate-500">{{ group.items.map(item => item.description).join(' · ') }}</p>
              </div>
            </div>
          </Accordion>

          <Accordion title="Restaurants">
            <div class="space-y-4">
              <ul v-if="selectedRestaurants.length" class="space-y-3">
                <li v-for="r in selectedRestaurants" :key="r.name" class="border-l-2 border-coral-400 pl-3">
                  <a :href="r.link ?? mapsSearchUrl(`${r.name} ${selectedCity.name}`)" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-slate-900 hover:text-lagoon-500">
                    {{ r.name }}
                  </a>
                  <p v-if="r.note" class="text-xs text-slate-400 mt-0.5">{{ r.note }}</p>
                </li>
              </ul>
              <p v-else class="text-sm text-slate-400 italic">Restaurant picks coming soon.</p>
              <a
                :href="mapsSearchUrl(`${selectedCity.name} restaurants`)"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center gap-1.5 text-xs font-semibold text-lagoon-500 hover:underline"
              >
                Open restaurant map <ArrowRight class="h-3 w-3 transition group-hover:translate-x-0.5" />
              </a>
            </div>
          </Accordion>

          <Accordion title="Cafes">
            <div class="space-y-4">
              <ul v-if="selectedCafes.length" class="space-y-3">
                <li v-for="c in selectedCafes" :key="c.name" class="border-l-2 border-amber-400 pl-3">
                  <a :href="c.link ?? mapsSearchUrl(`${c.name} ${selectedCity.name}`)" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-slate-900 hover:text-lagoon-500">
                    {{ c.name }}
                  </a>
                  <p v-if="c.note" class="text-xs text-slate-400 mt-0.5">{{ c.note }}</p>
                </li>
              </ul>
              <p v-else class="text-sm text-slate-400 italic">Cafe picks coming soon.</p>
              <a
                :href="mapsSearchUrl(`${selectedCity.name} cafes`)"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center gap-1.5 text-xs font-semibold text-lagoon-500 hover:underline"
              >
                Open cafe map <ArrowRight class="h-3 w-3 transition group-hover:translate-x-0.5" />
              </a>
            </div>
          </Accordion>

          <Accordion title="Bars">
            <div class="space-y-4">
              <ul v-if="selectedBars.length" class="space-y-3">
                <li v-for="b in selectedBars" :key="b.name" class="border-l-2 border-violet-400 pl-3">
                  <a :href="b.link ?? mapsSearchUrl(`${b.name} ${selectedCity.name}`)" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-slate-900 hover:text-lagoon-500">
                    {{ b.name }}
                  </a>
                  <p v-if="b.note" class="text-xs text-slate-400 mt-0.5">{{ b.note }}</p>
                </li>
              </ul>
              <p v-else class="text-sm text-slate-400 italic">Bar picks coming soon.</p>
              <a
                :href="mapsSearchUrl(`${selectedCity.name} cocktail bars`)"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center gap-1.5 text-xs font-semibold text-lagoon-500 hover:underline"
              >
                Open bar map <ArrowRight class="h-3 w-3 transition group-hover:translate-x-0.5" />
              </a>
            </div>
          </Accordion>

          <!-- 7 · See & Do -->
          <Accordion title="Top Attractions">
            <div class="space-y-3">
              <template v-if="selectedAttractions.length">
                <ul class="space-y-1.5">
                  <li v-for="a in selectedAttractions" :key="a.name" class="text-sm text-slate-700">
                    <Star class="mr-1 inline h-3 w-3 text-amber-400" />
                    <span class="font-semibold">{{ a.name }}</span>
                    <span v-if="a.note" class="ml-1 text-slate-400">— {{ a.note }}</span>
                  </li>
                </ul>
              </template>
              <p v-else class="text-sm text-slate-400 italic">Curated picks coming soon.</p>
              <a
                :href="`https://www.tripadvisor.com/Search?q=${encodeURIComponent(selectedCity.name + ' attractions')}`"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center gap-1.5 text-xs font-semibold text-lagoon-500 hover:underline"
              >
                See more on TripAdvisor <ArrowRight class="h-3 w-3 transition group-hover:translate-x-0.5" />
              </a>
            </div>
          </Accordion>

          <!-- 8 · Climate & Nature -->
          <Accordion title="Climate & Nature">
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-2">
                <button
                  class="rounded-xl px-3 py-3 text-left transition"
                  :class="climateView === 'temperature' ? 'bg-lagoon-500 text-white' : 'bg-sand-50 text-slate-700'"
                  @click="climateView = 'temperature'"
                >
                  <p class="text-[10px] font-bold uppercase tracking-wide" :class="climateView === 'temperature' ? 'text-white/70' : 'text-slate-400'">Temperature</p>
                  <p class="mt-1 text-sm font-bold">Warmest: {{ selectedClimate?.warmestMonth?.month }} {{ selectedClimate ? displayTemperature(selectedClimate.warmestMonth.value) : '' }}{{ unitTemperatureLabel }}</p>
                </button>
                <button
                  class="rounded-xl px-3 py-3 text-left transition"
                  :class="climateView === 'rainfall' ? 'bg-lagoon-500 text-white' : 'bg-sand-50 text-slate-700'"
                  @click="climateView = 'rainfall'"
                >
                  <p class="text-[10px] font-bold uppercase tracking-wide" :class="climateView === 'rainfall' ? 'text-white/70' : 'text-slate-400'">Rainfall</p>
                  <p class="mt-1 text-sm font-bold">Driest: {{ selectedClimate?.driestMonth?.month }} {{ selectedClimate ? displayRainfall(selectedClimate.driestMonth.value) : '' }}{{ unitRainfallLabel }}</p>
                </button>
              </div>
              <div class="rounded-[28px] bg-sand-50 p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Monthly weather</p>
                    <p class="mt-1 text-sm text-slate-600">Months sit around the radial base plane, with each point lifted by its value.</p>
                  </div>
                  <div class="flex gap-2">
                    <button type="button" class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:text-slate-900" @click="rotateClimate(-1)">‹</button>
                    <button type="button" class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:text-slate-900" @click="rotateClimate(1)">›</button>
                  </div>
                </div>
                <div class="mt-2 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Drag to rotate the radial 3D graph</span>
                  <span>{{ selectedClimateMetric.unit }} per point</span>
                </div>
                <div class="mt-4 flex justify-center overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_50%,#f8fafc_100%)] px-2 py-6">
                  <div
                    class="relative h-[23rem] w-full max-w-[46rem] select-none touch-none [perspective:1400px]"
                    :class="isDraggingClimate ? 'cursor-grabbing' : 'cursor-grab'"
                    @pointerdown="startClimateSpin"
                    @pointermove="updateClimateSpin"
                    @pointerup="endClimateSpin"
                    @pointerleave="endClimateSpin"
                    @pointercancel="endClimateSpin"
                  >
                    <div class="absolute inset-x-16 bottom-8 h-12 rounded-full bg-slate-900/10 blur-3xl"></div>
                    <svg :viewBox="`0 0 ${climateGraphViewport.width} ${climateGraphViewport.height}`" class="absolute inset-0 h-full w-full overflow-visible">
                      <path
                        v-for="ring in climateGuideRings"
                        :key="ring.label"
                        :d="ring.path"
                        fill="none"
                        stroke="rgba(148,163,184,0.22)"
                        stroke-width="1.5"
                      />
                      <path :d="climateBasePath" fill="none" stroke="rgba(148,163,184,0.45)" stroke-width="2" stroke-dasharray="4 6" />
                      <circle
                        v-for="point in selectedClimatePoints"
                        :key="point.month"
                        :cx="point.top.x"
                        :cy="point.top.y"
                        r="6.5"
                        fill="white"
                        :stroke="point.color"
                        stroke-width="3.5"
                      />
                      <text
                        v-for="point in selectedClimatePoints"
                        :key="`${point.month}-label`"
                        :x="point.label.x"
                        :y="point.label.y"
                        text-anchor="middle"
                        dominant-baseline="middle"
                        class="fill-slate-500 text-[10px] font-bold uppercase tracking-wide"
                      >
                        {{ point.shortLabel }}
                      </text>
                      <text
                        v-for="point in selectedClimatePoints"
                        :key="`${point.month}-value`"
                        :x="point.top.x"
                        :y="point.top.y - 14"
                        text-anchor="middle"
                        dominant-baseline="middle"
                        class="fill-slate-700 text-[10px] font-bold"
                      >
                        {{ point.formattedValue }}
                      </text>
                    </svg>

                  </div>
                </div>
                <div class="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div class="rounded-xl bg-white px-3 py-2 ring-1 ring-slate-100">
                    <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Perfect days</p>
                    <p class="mt-1 font-bold text-slate-900">{{ selectedClimate?.perfectWeatherDays }}</p>
                    <p class="text-[10px] text-slate-400">{{ perfectWeatherRangeLabel }} days / year</p>
                  </div>
                  <div class="rounded-xl bg-white px-3 py-2 ring-1 ring-slate-100">
                    <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Driest month</p>
                    <p class="mt-1 font-bold text-slate-900">{{ selectedClimate?.driestMonth?.month }} {{ selectedClimate ? displayRainfall(selectedClimate.driestMonth.value) : '' }}{{ unitRainfallLabel }}</p>
                    <p class="text-[10px] text-slate-400">Wettest {{ selectedClimate?.wettestMonth?.month }} {{ selectedClimate ? displayRainfall(selectedClimate.wettestMonth.value) : '' }}{{ unitRainfallLabel }}</p>
                  </div>
                </div>
              </div>
              <p class="text-sm leading-6 text-slate-600">{{ selectedCity.details.climateNote }}</p>
              <div class="flex items-start gap-2 rounded-xl bg-primary/10 p-3">
                <Trees class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p class="text-sm leading-6 text-slate-700">{{ selectedCity.details.timeToNature }}</p>
              </div>
              <div v-if="selectedCityOutdoorGuide" class="rounded-xl bg-slate-50 p-4">
                <p class="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Outdoor activities</p>
                <p class="mt-1 text-sm leading-6 text-slate-600">{{ selectedCityOutdoorGuide.summary }}</p>
                <ul class="mt-3 space-y-2">
                  <li v-for="activity in selectedCityOutdoorGuide.activities" :key="activity.name" class="text-sm text-slate-700">
                    <a :href="mapsSearchUrl(`${activity.name} ${selectedCity.name}`)" target="_blank" rel="noopener noreferrer" class="font-semibold text-slate-900 hover:text-lagoon-500">
                      {{ activity.name }}
                    </a>
                    <span v-if="activity.note" class="ml-1 text-slate-400">— {{ activity.note }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </Accordion>

          <Accordion v-if="selectedCityExchangeSummary" title="Money & Exchange">
            <div class="space-y-3">
              <div class="rounded-xl bg-sand-50 p-3">
                <p class="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">{{ selectedCityExchangeSummary?.label }}</p>
                <p class="mt-1 text-sm font-bold text-slate-900">{{ selectedCityExchangeSummary?.status }}</p>
                <p class="mt-1.5 text-sm leading-6 text-slate-600">{{ selectedCityExchangeSummary?.note }}</p>
              </div>
              <div class="rounded-xl bg-primary/10 p-3 text-sm leading-6 text-slate-700">
                <span class="font-semibold">{{ selectedCityExchangeSummary?.currencyName }}</span>
                <span class="text-slate-500"> · {{ selectedCityExchangeSummary?.updatePlan }}</span>
              </div>
            </div>
          </Accordion>

          <div class="rounded-2xl border border-slate-100 p-4">
            <p class="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Resources</p>
            <div class="space-y-2">
              <a
                v-for="group in selectedCityPrimaryResourceCards"
                :key="group.id"
                :href="group.href"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center justify-between rounded-xl px-4 py-3 transition"
                :class="group.id === 'money-cash' ? 'bg-[#9FE870]/20 hover:bg-[#9FE870]/35' : 'bg-slate-50 hover:bg-slate-100'"
              >
                <div>
                  <p class="text-sm font-bold text-slate-900">{{ group.title }}</p>
                  <p class="text-xs text-slate-500">{{ group.label }}{{ group.isAffiliateReady ? ' affiliate' : ' placeholder' }} ready from config</p>
                </div>
                <ArrowRight class="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
              </a>
            </div>
            <p class="mt-2 text-right text-[10px] text-slate-300">Partner links</p>
          </div>

        </div>
      </div>
    </Transition>

    <!-- Floating Countries Widget -->
    <div v-show="!isPanelOpen || !isMobile" class="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 flex flex-col items-center">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-2 opacity-0"
      >
        <div
          v-if="isCountriesOpen"
          class="mb-2 w-72 overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(15,23,42,0.28)]"
        >
          <!-- Country list -->
          <div v-if="!selectedCountry">
            <div class="border-b border-slate-100 px-4 py-3">
              <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Countries on map</p>
            </div>
            <div class="max-h-72 overflow-y-auto">
              <button
                v-for="c in availableCountries"
                :key="c.id"
                class="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-slate-50"
                @click="selectedCountry = c"
              >
                <span class="text-xl leading-none">{{ c.flag }}</span>
                <span class="text-sm font-semibold text-slate-800">{{ c.name }}</span>
              </button>
            </div>
          </div>

          <!-- Country detail -->
          <div v-else>
            <div class="flex items-center gap-3 border-b border-slate-100 px-3 py-3">
              <button
                class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Back to countries"
                @click="selectedCountry = null"
              >
                <ChevronLeft class="h-4 w-4" />
              </button>
              <span class="text-2xl leading-none">{{ selectedCountry.flag }}</span>
              <div>
                <p class="text-sm font-extrabold text-slate-900">{{ selectedCountry.name }}</p>
                <p class="text-[11px] text-slate-500">{{ selectedCountry.capital }}</p>
              </div>
            </div>
            <div class="p-4 space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <div class="rounded-xl bg-sand-50 p-3 text-center">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Population</p>
                  <p class="mt-1 text-base font-extrabold text-slate-900">{{ selectedCountry.populationM }}M</p>
                </div>
                <div class="rounded-xl bg-sand-50 p-3 text-center">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Median Age</p>
                  <p class="mt-1 text-base font-extrabold text-slate-900">{{ selectedCountry.medianAge }} <span class="text-xs font-normal text-slate-500">yrs</span></p>
                </div>
              </div>
              <div>
                <p class="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Economy</p>
                <div class="space-y-1.5">
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-500">GDP</span>
                    <span class="font-semibold text-slate-900">{{ fmtGdp(selectedCountry.gdpB) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-500">GDP (PPP)</span>
                    <span class="font-semibold text-slate-900">{{ fmtGdp(selectedCountry.gdpPppB) }}</span>
                  </div>
                  <div class="h-px bg-slate-100" />
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-500">GDP per Capita</span>
                    <span class="font-semibold text-slate-900">{{ fmtPc(selectedCountry.gdpPerCapita) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-500">GDP per Capita (PPP)</span>
                    <span class="font-semibold text-slate-900">{{ fmtPc(selectedCountry.gdpPerCapitaPpp) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-500">PPP to Nominal Ratio</span>
                    <span class="font-semibold text-slate-900">{{ (selectedCountry.gdpPerCapitaPpp / selectedCountry.gdpPerCapita).toFixed(1) }}×</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <button
        class="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-[0_4px_20px_rgba(15,23,42,0.18)] transition hover:shadow-[0_4px_24px_rgba(15,23,42,0.26)] hover:text-slate-900"
        @click="toggleCountries"
      >
        <Globe2 class="h-4 w-4" />
        Countries
        <ChevronUp v-if="isCountriesOpen" class="h-3.5 w-3.5 text-slate-400" />
        <ChevronDown v-else class="h-3.5 w-3.5 text-slate-400" />
      </button>
    </div>

  </div>
</template>
