// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    mapboxToken: '',
    public: {}
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
