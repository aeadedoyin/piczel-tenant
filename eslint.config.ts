import antfu from '@antfu/eslint-config'
import betterTailwind from 'eslint-plugin-better-tailwindcss'

const betterTailwindRules = {
  ...betterTailwind.configs['recommended-warn']?.rules,
  ...betterTailwind.configs['recommended-error']?.rules,
}

const baseOptions = {
  vue: true,
  typescript: true,
  stylistic: true,
  ignores: [],

  plugins: {
    'better-tailwindcss': betterTailwind,
  },

  settings: {
    'better-tailwindcss': {
      entryPoint: 'app/assets/css/tailwind.css',
    },
  },

  rules: {
    // eslint - rules
    'quotes': ['error', 'single', { avoidEscape: true }],
    'prefer-template': 'off',
    'no-restricted-imports': ['error', {
      patterns: [{
        group: ['@/components/shadcn-ui/*', '~/components/shadcn-ui/*'],
        message: 'Use auto-imported Shad* components instead (e.g., ShadButton, ShadInput).',
      }],
    }],

    // vue - rules
    'vue/attribute-hyphenation': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/prop-name-casing': 'off',
    'vue/attributes-order': [
      'error',
      {
        alphabetical: true,
      },
    ],

    // node - rules
    'node/prefer-global/process': 'off',

    // betterTailwind - rules
    ...betterTailwindRules,
    'better-tailwindcss/no-unknown-classes': [
      'error',
      {
        detectComponentClasses: true,
        ignore: [],
      },
    ],
  },
}

const shadcnOptions = {
  files: ['@@/shadcn', '@/composables/useSidebar.ts'],
  rules: {
    'no-restricted-imports': 'off',
    'better-tailwindcss/no-unknown-classes': 'off',
  },
}

export default antfu(baseOptions, shadcnOptions)
