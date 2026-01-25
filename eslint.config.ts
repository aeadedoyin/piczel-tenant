import antfu from '@antfu/eslint-config'
import betterTailwind from 'eslint-plugin-better-tailwindcss'

export default antfu({
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
      patterns: [
        {
          group: ['@@/shadcn/*'],
          message: 'Use auto-imported Shad* components instead (e.g., ShadButton, ShadInput).',
        },
        {
          group: ['~', '~/*', '~~', '~~/*'],
          message: 'Use @ or @@ instead of ~ or ~~ for imports.',
        },
      ],
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
    'better-tailwindcss/no-unknown-classes': [
      'error',
      {
        detectComponentClasses: true,
        ignore: [],
      },
    ],
  },
}, {
  files: ['./shadcn/**/*', './app/composables/useSidebar.ts'],
  rules: {
    'no-restricted-imports': 'off',
    'better-tailwindcss/no-unknown-classes': 'off',
  },
})
