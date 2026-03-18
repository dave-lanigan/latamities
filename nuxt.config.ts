import { resolve } from 'path'

export default defineNuxtConfig({
  modules: [
    'nuxt-mapbox',
    '@nuxtjs/tailwindcss',
    (_options, nuxt) => {
      nuxt.hook('modules:done', () => {
        const postcssOptions = nuxt.options.postcss ?? (nuxt.options.build as any).postcss?.postcssOptions ?? (nuxt.options.build as any).postcss
        const plugins = postcssOptions?.plugins
        if (plugins?.tailwindcss && typeof plugins.tailwindcss === 'string' && plugins.tailwindcss.includes('.nuxt')) {
          plugins.tailwindcss = resolve(nuxt.options.rootDir ?? process.cwd(), 'tailwind.config.ts')
        }
      })
    }
  ],
  mapbox: {
    accessToken: process.env.NUXT_MAPBOX_TOKEN || ''
  },
  runtimeConfig: {
    mapboxToken: process.env.NUXT_MAPBOX_TOKEN || '',
    skyscannerApiKey: process.env.NUXT_SKYSCANNER_API_KEY || '',
    skyscannerMarket: process.env.NUXT_SKYSCANNER_MARKET || 'US',
    skyscannerLocale: process.env.NUXT_SKYSCANNER_LOCALE || 'en-US',
    skyscannerCurrency: process.env.NUXT_SKYSCANNER_CURRENCY || 'USD'
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
