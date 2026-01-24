import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },

  modules: [
    'shadcn-nuxt',
    'nuxt-lucide-icons',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
  ],

  shadcn: {
    prefix: 'Shad',
    componentDir: './shadcn/components/ui',
  },

  colorMode: {
    classSuffix: '',
  },

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [tailwindcss()],
  },
})
