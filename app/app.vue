<script setup lang="ts">
import {
  ArrowRight,
  CloudRain,
  Gauge,
  Globe2,
  Mountain,
  Plane,
  ShieldAlert,
  Trees,
  Wifi,
  X
} from 'lucide-vue-next'

import Badge from '~/components/ui/Badge.vue'
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'
import CardContent from '~/components/ui/CardContent.vue'
import CardDescription from '~/components/ui/CardDescription.vue'
import CardHeader from '~/components/ui/CardHeader.vue'
import CardTitle from '~/components/ui/CardTitle.vue'
import cityProfiles, { type CityProfile } from '~~/data/city-profiles'

type MarkerPosition = { x: number; y: number }

const MAP_BOUNDS = { west: -120, east: -30, north: 33, south: -58 }

const mercatorY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + lat * (Math.PI / 180) / 2))

const projectCoordinates = ([lng, lat]: [number, number]): MarkerPosition => {
  const x = ((lng - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west)) * 100
  const northY = mercatorY(MAP_BOUNDS.north)
  const southY = mercatorY(MAP_BOUNDS.south)
  const y = ((northY - mercatorY(lat)) / (northY - southY)) * 100
  return { x, y }
}

const selectedCity = ref<CityProfile | null>(null)
const isPanelOpen = ref(false)
const mapReady = ref(false)
const mapError = ref<string | null>(null)

const mapImageUrl = '/api/map-image?width=1280&height=900'

const cityPositions = computed<Record<string, MarkerPosition>>(() =>
  Object.fromEntries(cityProfiles.map(city => [city.id, projectCoordinates(city.coordinates)]))
)

const selectedMarkerPosition = computed(() =>
  selectedCity.value ? cityPositions.value[selectedCity.value.id] : null
)

const selectedClimate = computed(() => {
  if (!selectedCity.value) return null
  const { rainfallByMonth, temperatureByMonth } = selectedCity.value.snapshot
  const avgTemp = Math.round(temperatureByMonth.reduce((t, d) => t + d.value, 0) / temperatureByMonth.length)
  const driestMonth = rainfallByMonth.reduce((a, b) => b.value < a.value ? b : a)
  const wettestMonth = rainfallByMonth.reduce((a, b) => b.value > a.value ? b : a)
  return { avgTemp, driestMonth, wettestMonth }
})

const selectCity = (city: CityProfile) => {
  if (selectedCity.value?.id === city.id) {
    selectedCity.value = null
    isPanelOpen.value = false
  } else {
    selectedCity.value = city
  }
}

const dismissBubble = () => { selectedCity.value = null }
const openPanel = () => { isPanelOpen.value = true }
const closePanel = () => { isPanelOpen.value = false }

const markMapLoaded = () => { mapReady.value = true; mapError.value = null }
const markMapErrored = () => { mapError.value = 'Map image failed to load. Check server logs.' }

useHead({
  title: 'Latamities',
  meta: [{ name: 'description', content: 'Map-first city profiles for remote workers in Latin America.' }]
})
</script>

<template>
  <div class="fixed inset-0 overflow-hidden">
    <!-- Full-screen map -->
    <div class="relative h-full w-full">
      <img
        :src="mapImageUrl"
        alt="Map of Latin America"
        class="map-image"
        draggable="false"
        @load="markMapLoaded"
        @error="markMapErrored"
      >

      <!-- City markers: only rendered once image has loaded -->
      <div v-if="mapReady" class="absolute inset-0">
        <button
          v-for="city in cityProfiles"
          :key="city.id"
          type="button"
          class="city-marker"
          :data-active="selectedCity?.id === city.id ? 'true' : 'false'"
          :aria-label="`Show ${city.name}`"
          :style="{ left: `${cityPositions[city.id].x}%`, top: `${cityPositions[city.id].y}%` }"
          @click="selectCity(city)"
        >
          <span class="city-marker-dot" />
          <span class="city-marker-label">{{ city.name }}</span>
        </button>
      </div>

      <!-- Loading state -->
      <div
        v-if="!mapReady && !mapError"
        class="absolute inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-[2px]"
      >
        <p class="rounded-2xl bg-white/90 px-6 py-4 text-sm font-bold text-slate-700 shadow-lg">
          Loading map…
        </p>
      </div>

      <!-- Error state -->
      <div
        v-if="mapError"
        class="absolute inset-0 flex items-center justify-center bg-slate-900/30 p-8 backdrop-blur-[2px]"
      >
        <div class="max-w-sm rounded-2xl bg-white/95 p-6 shadow-xl">
          <p class="text-xs font-bold uppercase tracking-widest text-red-500">Map error</p>
          <p class="mt-2 text-sm leading-6 text-slate-700">{{ mapError }}</p>
        </div>
      </div>

      <!-- Snapshot bubble — appears above the clicked marker -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="scale-95 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-95 opacity-0"
      >
        <div
          v-if="selectedCity && selectedMarkerPosition && !isPanelOpen"
          class="pointer-events-none absolute z-20 px-3"
          :style="{
            left: `${selectedMarkerPosition.x}%`,
            top: `${selectedMarkerPosition.y}%`,
            transform: 'translate(-50%, calc(-100% - 1.5rem))'
          }"
        >
          <Card class="pointer-events-auto w-[min(22rem,calc(100vw-2rem))] shadow-[0_20px_50px_rgba(15,23,42,0.28)]">
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
              <div class="grid grid-cols-3 gap-1.5">
                <div class="rounded-xl bg-sand-50 p-2.5 text-center">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Download</p>
                  <p class="mt-1 text-base font-extrabold text-slate-900">{{ selectedCity.snapshot.internet.downloadMbps }}</p>
                  <p class="text-[10px] text-slate-400">Mbps</p>
                </div>
                <div class="rounded-xl bg-sand-50 p-2.5 text-center">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Avg temp</p>
                  <p class="mt-1 text-base font-extrabold text-slate-900">{{ selectedClimate?.avgTemp }}°C</p>
                  <p class="text-[10px] text-slate-400">&nbsp;</p>
                </div>
                <div class="rounded-xl bg-sand-50 p-2.5 text-center">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Altitude</p>
                  <p class="mt-1 text-base font-extrabold text-slate-900">{{ selectedCity.snapshot.altitudeM }}</p>
                  <p class="text-[10px] text-slate-400">m</p>
                </div>
              </div>
              <Button class="w-full justify-center" size="sm" @click="openPanel">
                Full profile
                <ArrowRight class="h-3.5 w-3.5" />
              </Button>
            </CardContent>
          </Card>
          <!-- Pointer triangle -->
          <div class="mx-auto h-3 w-3 rotate-45 border-b border-r border-white/50 bg-white shadow-[3px_3px_8px_rgba(15,23,42,0.08)]" />
        </div>
      </Transition>
    </div>

    <!-- Detail panel — slides in from the right, overlays the map -->
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
        <!-- Sticky header -->
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

        <div class="space-y-4 p-6">
          <p class="text-sm leading-7 text-slate-600">{{ selectedCity.details.overview }}</p>

          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-2xl bg-sand-50 p-4">
              <div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                <Wifi class="h-3.5 w-3.5" /> Internet
              </div>
              <p class="mt-2 text-lg font-extrabold text-slate-900">
                {{ selectedCity.snapshot.internet.downloadMbps }} / {{ selectedCity.snapshot.internet.uploadMbps }} Mbps
              </p>
              <p class="mt-1 text-xs text-slate-500">{{ selectedCity.snapshot.internet.latencyMs }} ms latency</p>
            </div>

            <div class="rounded-2xl bg-sand-50 p-4">
              <div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                <Mountain class="h-3.5 w-3.5" /> Terrain
              </div>
              <p class="mt-2 text-lg font-extrabold text-slate-900">{{ selectedCity.snapshot.altitudeM }} m</p>
              <p class="mt-1 text-xs leading-5 text-slate-500">{{ selectedCity.snapshot.landscape }}</p>
            </div>

            <div class="rounded-2xl bg-sand-50 p-4">
              <div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                <CloudRain class="h-3.5 w-3.5" /> Rain
              </div>
              <p class="mt-2 text-base font-extrabold text-slate-900">
                {{ selectedClimate?.driestMonth.month }} {{ selectedClimate?.driestMonth.value }} mm
              </p>
              <p class="mt-1 text-xs leading-5 text-slate-500">
                Peaks {{ selectedClimate?.wettestMonth.month }} {{ selectedClimate?.wettestMonth.value }} mm
              </p>
            </div>

            <div class="rounded-2xl bg-sand-50 p-4">
              <div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                <Gauge class="h-3.5 w-3.5" /> Pace
              </div>
              <p class="mt-2 text-sm font-bold leading-6 text-slate-900">{{ selectedCity.details.pace }}</p>
              <p class="mt-1 text-xs text-slate-500">Pop. {{ selectedCity.snapshot.populationMetro }}</p>
            </div>
          </div>

          <div class="rounded-2xl border border-slate-100 bg-white p-4">
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Best for</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <Badge v-for="tag in selectedCity.details.bestFor" :key="tag" variant="secondary">{{ tag }}</Badge>
            </div>
          </div>

          <div class="rounded-2xl border border-slate-100 bg-white p-4">
            <div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              <ShieldAlert class="h-3.5 w-3.5" /> Watchouts
            </div>
            <ul class="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              <li v-for="item in selectedCity.details.watchouts" :key="item">{{ item }}</li>
            </ul>
          </div>

          <div class="rounded-2xl border border-slate-100 bg-white p-4">
            <div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              <Globe2 class="h-3.5 w-3.5" /> Daily life
            </div>
            <p class="mt-3 text-sm leading-7 text-slate-700">
              <span class="font-bold text-slate-900">Neighborhoods:</span>
              {{ selectedCity.details.neighborhoods.join(', ') }}.
            </p>
            <p class="mt-2 text-sm leading-7 text-slate-700">
              <span class="font-bold text-slate-900">Mobility:</span> {{ selectedCity.details.mobility }}
            </p>
            <p class="mt-2 text-sm leading-7 text-slate-700">
              <span class="font-bold text-slate-900">Workstyle:</span> {{ selectedCity.details.workstyle }}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-2xl bg-slate-950 p-4 text-white">
              <div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
                <Plane class="h-3.5 w-3.5" /> Airport
              </div>
              <p class="mt-2 text-sm leading-6 text-slate-200">{{ selectedCity.details.airport }}</p>
            </div>
            <div class="rounded-2xl bg-primary p-4 text-white">
              <div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/80">
                <Trees class="h-3.5 w-3.5" /> Nature
              </div>
              <p class="mt-2 text-sm leading-6 text-primary-foreground">{{ selectedCity.details.timeToNature }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
