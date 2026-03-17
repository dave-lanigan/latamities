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
import cityProfiles, { type CityProfile } from '~~/data/city-profiles'
import countryData, { type CountryProfile } from '~~/data/country-profiles'

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
const minNiceWeatherDays = ref(150)
const minPopulationM = ref(1)
const isFiltersOpen = ref(false)

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

const selectedClimate = computed(() => {
  if (!selectedCity.value) return null
  const { rainfallByMonth, temperatureByMonth } = selectedCity.value.snapshot
  const avgTempC = temperatureByMonth.reduce((t, d) => t + d.value, 0) / temperatureByMonth.length
  const avgTemp = Math.round(avgTempC * 9 / 5 + 32)
  const driestMonth = rainfallByMonth.reduce((a, b) => b.value < a.value ? b : a)
  const wettestMonth = rainfallByMonth.reduce((a, b) => b.value > a.value ? b : a)
  const perfectWeatherDays = temperatureByMonth.reduce((total, d, i) => {
    const f = d.value * 9 / 5 + 32
    return f >= 75 && f <= 85 ? total + DAYS_IN_MONTH[i] : total
  }, 0)
  return { avgTemp, driestMonth, wettestMonth, perfectWeatherDays, temperatureByMonth, rainfallByMonth }
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
  city.snapshot.temperatureByMonth.reduce((total, d, i) => {
    const f = d.value * 9 / 5 + 32
    return f >= 75 && f <= 85 ? total + DAYS_IN_MONTH[i] : total
  }, 0)

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

watch(filteredCities, (cities) => {
  if (selectedCity.value && !cities.find(c => c.id === selectedCity.value!.id)) {
    selectedCity.value = null
    isPanelOpen.value = false
  }
})

const availableCountries = computed(() => {
  const names = new Set(cityProfiles.map(c => c.country))
  return [...names].sort().map(name => countryData[name]).filter(Boolean)
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
</script>

<template>
  <div class="fixed inset-0">
    <!-- Title – top left -->
    <div class="absolute left-4 top-4 z-40 pointer-events-none select-none">
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
          <Card :class="['shadow-[0_20px_50px_rgba(15,23,42,0.28)]', isMobile ? 'pointer-events-auto max-h-[85vh] overflow-y-auto w-full bg-slate-200 backdrop-blur-none' : 'pointer-events-auto w-[min(22rem,calc(100vw-2rem))]']">
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
                  <p class="mt-1 text-base font-extrabold text-slate-900">{{ selectedClimate?.avgTemp }}°F</p>
                  <p class="text-[10px] text-slate-400">&nbsp;</p>
                </div>
                <div class="rounded-xl bg-sand-50 p-2.5 text-center">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Altitude</p>
                  <p class="mt-1 text-base font-extrabold text-slate-900">{{ Math.round(selectedCity.snapshot.altitudeM * 3.28084) }}</p>
                  <p class="text-[10px] text-slate-400">ft</p>
                </div>
                <div class="col-span-2 rounded-xl bg-sand-50 p-2.5 text-center">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Perfect weather days</p>
                  <p class="mt-1 text-base font-extrabold text-slate-900">{{ selectedClimate?.perfectWeatherDays }}</p>
                  <p class="text-[10px] text-slate-400">75–85°F per year</p>
                </div>
              </div>

              <!-- Temperature bar -->
              <div>
                <p class="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">Avg temperature</p>
                <div class="flex gap-px">
                  <div
                    v-for="d in selectedClimate?.temperatureByMonth"
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
                    v-for="d in selectedClimate?.rainfallByMonth"
                    :key="d.month"
                    class="group relative flex-1 cursor-default rounded-sm bg-blue-400"
                    :style="{ height: `${Math.round((d.value / Math.max(...(selectedClimate?.rainfallByMonth.map(r => r.value) ?? [1]))) * 100)}%`, minHeight: '2px' }"
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
        class="absolute right-0 top-0 z-30 h-full w-[min(30rem,100vw)] overflow-y-auto bg-white shadow-[-8px_0_40px_rgba(15,23,42,0.18)]"
      >
        <div class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-primary">Profile</p>
            <h2 class="mt-0.5 text-2xl font-extrabold text-slate-900">
              {{ selectedCity.name }}, {{ selectedCity.country }}
            </h2>
          </div>
          <button
            class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
            aria-label="Close panel"
            @click="closePanel"
          >
            <X class="h-4 w-4" />
          </button>
        </div>

        <div class="space-y-2 p-4">

          <!-- 1 · About -->
          <Accordion title="About" :default-open="true">
            <p class="text-sm leading-7 text-slate-600">{{ selectedCity.details.overview }}</p>
            <div v-if="selectedCity.details.knownFor?.length" class="mt-3 flex flex-wrap gap-2">
              <Badge v-for="tag in selectedCity.details.knownFor" :key="tag" variant="secondary">{{ tag }}</Badge>
            </div>
            <div class="mt-4 space-y-3">
              <div>
                <p class="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Best for</p>
                <div class="flex flex-wrap gap-2">
                  <Badge v-for="tag in selectedCity.details.bestFor" :key="tag" variant="outline">{{ tag }}</Badge>
                </div>
              </div>
              <div>
                <div class="flex items-center gap-1.5 mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  <ShieldAlert class="h-3 w-3" /> Watchouts
                </div>
                <ul class="space-y-1.5 text-sm leading-6 text-slate-600">
                  <li v-for="item in selectedCity.details.watchouts" :key="item" class="flex gap-2">
                    <span class="mt-1 shrink-0 text-amber-400">·</span>{{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </Accordion>

          <!-- 2 · Neighborhoods -->
          <Accordion title="Best Neighborhoods">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="n in selectedCity.details.neighborhoods"
                :key="n"
                class="rounded-xl bg-sand-50 px-3 py-1.5 text-sm font-semibold text-slate-800"
              >
                <MapPin class="mr-1 inline h-3 w-3 text-slate-400" />{{ n }}
              </span>
            </div>
            <p class="mt-3 text-sm leading-7 text-slate-600">{{ selectedCity.details.mobility }}</p>
          </Accordion>

          <!-- 3 · Airport & Transport -->
          <Accordion title="Airport & Transport">
            <div class="space-y-3">
              <div class="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
                <Plane class="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <p class="text-sm leading-6 text-slate-700">{{ selectedCity.details.airport.description }}</p>
              </div>
              <div
                class="flex items-start gap-3 rounded-xl p-3"
                :class="selectedCity.details.airport.rideshareFromAirport ? 'bg-emerald-50' : 'bg-red-50'"
              >
                <component
                  :is="selectedCity.details.airport.rideshareFromAirport ? CircleCheck : CircleX"
                  class="mt-0.5 h-4 w-4 shrink-0"
                  :class="selectedCity.details.airport.rideshareFromAirport ? 'text-emerald-500' : 'text-red-500'"
                />
                <div>
                  <p
                    class="text-sm font-semibold"
                    :class="selectedCity.details.airport.rideshareFromAirport ? 'text-emerald-800' : 'text-red-800'"
                  >
                    {{ selectedCity.details.airport.rideshareFromAirport ? 'Rideshare legal from airport' : 'Rideshare not legal from airport' }}
                  </p>
                  <p v-if="selectedCity.details.airport.rideshareNote" class="mt-0.5 text-xs leading-5 text-slate-500">
                    {{ selectedCity.details.airport.rideshareNote }}
                  </p>
                </div>
              </div>
            </div>
          </Accordion>

          <!-- 4 · Stay (Airbnb) -->
          <Accordion title="Where to Stay">
            <div class="space-y-2">
              <div class="flex items-center justify-between rounded-xl bg-sand-50 px-4 py-3">
                <div class="flex items-center gap-2">
                  <Home class="h-4 w-4 text-slate-400" />
                  <div>
                    <p class="text-sm font-bold text-slate-900">
                      <template v-if="selectedCity.details.airbnb?.avgNightlyUSD != null">
                        ~${{ selectedCity.details.airbnb.avgNightlyUSD }} <span class="text-xs font-normal text-slate-500">/ night avg</span>
                      </template>
                      <template v-else>
                        <span class="text-slate-400">Avg price coming soon</span>
                      </template>
                    </p>
                    <p class="text-xs text-slate-400">Airbnb · entire place</p>
                  </div>
                </div>
                <a
                  :href="`https://www.airbnb.com/s/${encodeURIComponent(selectedCity.name + ', ' + selectedCity.country)}/homes`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-1 rounded-lg bg-[#FF5A5F] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#e55157]"
                >
                  Search <ArrowRight class="h-3 w-3" />
                </a>
              </div>
            </div>
          </Accordion>

          <!-- 5 · Work -->
          <Accordion title="Working Here">
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-2">
                <div class="rounded-xl bg-sand-50 p-3 text-center">
                  <Wifi class="mx-auto mb-1 h-3.5 w-3.5 text-slate-400" />
                  <p class="text-base font-extrabold text-slate-900">{{ selectedCity.snapshot.internet.downloadMbps }}</p>
                  <p class="text-[10px] text-slate-400">Mbps ↓</p>
                </div>
                <div class="rounded-xl bg-sand-50 p-3 text-center">
                  <p class="mt-4 text-base font-extrabold text-slate-900">{{ selectedCity.snapshot.internet.uploadMbps }}</p>
                  <p class="text-[10px] text-slate-400">Mbps ↑</p>
                </div>
                <div class="rounded-xl bg-sand-50 p-3 text-center">
                  <p class="mt-4 text-base font-extrabold text-slate-900">{{ selectedCity.snapshot.internet.latencyMs }}</p>
                  <p class="text-[10px] text-slate-400">ms latency</p>
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

          <!-- 6 · Eat & Drink -->
          <Accordion title="Eat & Drink">
            <div class="space-y-4">
              <template v-if="(selectedCity.details.restaurants?.length || 0) + (selectedCity.details.cafes?.length || 0) + (selectedCity.details.bars?.length || 0) > 0">
                <div v-if="selectedCity.details.restaurants?.length">
                  <p class="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    <UtensilsCrossed class="h-3 w-3" /> Restaurants
                  </p>
                  <ul class="space-y-1.5">
                    <li v-for="r in selectedCity.details.restaurants" :key="r.name" class="text-sm text-slate-700">
                      <span class="font-semibold">{{ r.name }}</span>
                      <span v-if="r.note" class="ml-1 text-slate-400">— {{ r.note }}</span>
                    </li>
                  </ul>
                </div>
                <div v-if="selectedCity.details.cafes?.length">
                  <p class="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    ☕ Cafes
                  </p>
                  <ul class="space-y-1.5">
                    <li v-for="c in selectedCity.details.cafes" :key="c.name" class="text-sm text-slate-700">
                      <span class="font-semibold">{{ c.name }}</span>
                      <span v-if="c.note" class="ml-1 text-slate-400">— {{ c.note }}</span>
                    </li>
                  </ul>
                </div>
                <div v-if="selectedCity.details.bars?.length">
                  <p class="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    <Wine class="h-3 w-3" /> Bars
                  </p>
                  <ul class="space-y-1.5">
                    <li v-for="b in selectedCity.details.bars" :key="b.name" class="text-sm text-slate-700">
                      <span class="font-semibold">{{ b.name }}</span>
                      <span v-if="b.note" class="ml-1 text-slate-400">— {{ b.note }}</span>
                    </li>
                  </ul>
                </div>
              </template>
              <p v-else class="text-sm text-slate-400 italic">Curated picks coming soon.</p>
              <a
                :href="`https://www.tripadvisor.com/Search?q=${encodeURIComponent(selectedCity.name + ' restaurants')}`"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center gap-1.5 text-xs font-semibold text-lagoon-500 hover:underline"
              >
                See more on TripAdvisor <ArrowRight class="h-3 w-3 transition group-hover:translate-x-0.5" />
              </a>
            </div>
          </Accordion>

          <!-- 7 · See & Do -->
          <Accordion title="Top Attractions">
            <div class="space-y-3">
              <template v-if="selectedCity.details.attractions?.length">
                <ul class="space-y-1.5">
                  <li v-for="a in selectedCity.details.attractions" :key="a.name" class="text-sm text-slate-700">
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
            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-2">
                <div class="rounded-xl bg-sand-50 p-3">
                  <div class="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    <Sun class="h-3 w-3" /> Perfect days
                  </div>
                  <p class="mt-1.5 text-xl font-extrabold text-slate-900">{{ selectedClimate?.perfectWeatherDays }}</p>
                  <p class="text-[10px] text-slate-400">75–85°F days / year</p>
                </div>
                <div class="rounded-xl bg-sand-50 p-3">
                  <div class="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    <CloudRain class="h-3 w-3" /> Rainfall
                  </div>
                  <p class="mt-1.5 text-sm font-bold text-slate-900">
                    {{ selectedClimate?.driestMonth.month }} {{ selectedClimate?.driestMonth.value }}mm
                  </p>
                  <p class="text-[10px] text-slate-400">Peak {{ selectedClimate?.wettestMonth.month }} {{ selectedClimate?.wettestMonth.value }}mm</p>
                </div>
              </div>

              <!-- Temperature bar chart -->
              <div>
                <p class="mb-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">Avg temperature</p>
                <div class="flex items-end gap-0.5 h-12">
                  <div
                    v-for="d in selectedClimate?.temperatureByMonth"
                    :key="d.month"
                    class="flex-1 rounded-t-sm transition-opacity hover:opacity-80 cursor-default"
                    :style="{ height: Math.max(4, (d.value / 35) * 48) + 'px', backgroundColor: tempColor(d.value) }"
                    :title="`${d.month}: ${d.value}°C`"
                  />
                </div>
                <div class="mt-1 flex justify-between text-[9px] text-slate-300">
                  <span>Jan</span><span>Jun</span><span>Dec</span>
                </div>
              </div>

              <p class="text-sm leading-6 text-slate-600">{{ selectedCity.details.climateNote }}</p>
              <div class="flex items-start gap-2 rounded-xl bg-primary/10 p-3">
                <Trees class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p class="text-sm leading-6 text-slate-700">{{ selectedCity.details.timeToNature }}</p>
              </div>
            </div>
          </Accordion>

          <!-- Wise affiliate -->
          <div class="rounded-2xl border border-slate-100 p-4">
            <p class="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Resources</p>
            <a
              href="https://wise.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center justify-between rounded-xl bg-[#9FE870]/20 px-4 py-3 transition hover:bg-[#9FE870]/35"
            >
              <div>
                <p class="text-sm font-bold text-slate-900">Open a Wise account</p>
                <p class="text-xs text-slate-500">Send money like a local, zero hidden fees</p>
              </div>
              <ArrowRight class="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
            </a>
            <p class="mt-2 text-right text-[10px] text-slate-300">Partner links</p>
          </div>

        </div>
      </div>
    </Transition>

    <!-- Floating Countries Widget -->
    <div class="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 flex flex-col items-center">
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
