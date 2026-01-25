import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },

  typescript: {
    tsConfig: {
      include: ['../shadcn/**/*'],
    },
  },

  modules: [
    'shadcn-nuxt',
    'nuxt-lucide-icons',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxt/icon',
  ],

  icon: {
    customCollections: [
      {
        prefix: 'piczel',
        dir: '@/assets/icons',
      },
    ],
  },

  lucide: {
    namePrefix: 'Lucide',
  },

  shadcn: {
    prefix: 'Shad',
    componentDir: '@@/shadcn/ui',
  },

  colorMode: {
    classSuffix: '',
  },

  css: ['@/assets/css/tailwind.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: '/api',
      prefillCredential: false,
    },
  },
})
