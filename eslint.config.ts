import antfu from '@antfu/eslint-config'
import betterTailwind from 'eslint-plugin-better-tailwindcss'

const betterTailwindRules = {
  ...betterTailwind.configs['recommended-warn']?.rules,
  ...betterTailwind.configs['recommended-error']?.rules,
}

export default antfu({
  vue: true,
  typescript: true,
  stylistic: true,
  ignores: [],

  plugins: {
    'better-tailwindcss': betterTailwind
  },

  settings: {
    'better-tailwindcss': {
      entryPoint: 'assets/css/tailwind.css',
    }
  },

  rules: {
    // eslint - rules
    'quotes': ['error', 'single', { avoidEscape: true }],
    'prefer-template': 'off',
    'style/comma-dangle': 'off',

    // vue - rules
    'vue/attribute-hyphenation': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/prop-name-casing': 'off',
    'vue/attributes-order': [
      'error',
      {
        alphabetical: true
      }
    ],

    ...betterTailwindRules,

    'better-tailwindcss/no-unknown-classes': [
      'error',
      {
        detectComponentClasses: true,
        ignore: []
      }
    ],

    // node - rules
    'node/prefer-global/process': 'off',
  }
})
