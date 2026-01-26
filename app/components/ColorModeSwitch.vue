<script setup lang="ts">
import { LucideMoon, LucideSun, LucideSunMoon } from '#components'

const colorMode = useColorMode()
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const modes = ['light', 'dark', 'system'] as const
type Mode = typeof modes[number]

const currentIndex = computed(() => {
  const pref = colorMode.preference || 'system'
  return modes.indexOf(pref as Mode)
})

function cycleMode() {
  const nextIndex = (currentIndex.value + 1) % modes.length
  colorMode.preference = modes[nextIndex] as string
}

const iconComponent = computed(() => {
  if (!mounted.value)
    return null
  switch (colorMode.preference) {
    case 'light':
      return LucideSun
    case 'dark':
      return LucideMoon
    default:
      return LucideSunMoon
  }
})

const label = computed(() => {
  if (!mounted.value)
    return 'Toggle color mode'
  switch (colorMode.preference) {
    case 'light':
      return 'Light mode'
    case 'dark':
      return 'Dark mode'
    default:
      return 'System mode'
  }
})
</script>

<template>
  <button
    :aria-label="label"
    class="
      relative flex size-9 items-center justify-center rounded-full
      border bg-background text-muted-foreground
      transition-all duration-300 ease-out
      hover:bg-accent hover:text-accent-foreground
      active:scale-95
    "
    :title="label"
    @click="cycleMode"
  >
    <Transition mode="out-in" name="icon">
      <component
        :is="iconComponent"
        v-if="iconComponent"
        :key="colorMode.preference"
        class="size-4"
      />
    </Transition>

    <!-- Indicator dot -->
    <span
      class="
        absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full
        transition-colors duration-300
      "
      :class="{
        'bg-amber-500': mounted && colorMode.preference === 'light',
        'bg-indigo-500': mounted && colorMode.preference === 'dark',
        'bg-emerald-500': !mounted || colorMode.preference === 'system',
      }"
    />
  </button>
</template>

<style scoped>
.icon-enter-active,
.icon-leave-active {
  transition: all 0.2s ease-out;
}

.icon-enter-from {
  opacity: 0;
  transform: scale(0.8) rotate(-90deg);
}

.icon-leave-to {
  opacity: 0;
  transform: scale(0.8) rotate(90deg);
}
</style>
