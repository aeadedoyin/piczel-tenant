import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
      ],
    },
  },

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
        dir: './app/assets/icons',
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
      appUrl: '',
      apiBaseUrl: '/api',
      prefillCredential: false,
    },
  },
})
