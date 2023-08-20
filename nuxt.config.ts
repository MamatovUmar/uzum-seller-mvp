
export default defineNuxtConfig({
  // devtools: { enabled: true },
  ssr: false,
  css: [
    'normalize.css',
    '@/assets/styles/main.scss'
  ],
  modules: [
    '@pinia/nuxt',
    "@bg-dev/nuxt-naiveui"
  ],
  naiveui: {
    colorModePreference: "dark"
  },
  runtimeConfig: {
    public: {
      baseURL: import.meta.env.VITE_BASE_URL
    }
  }
})
