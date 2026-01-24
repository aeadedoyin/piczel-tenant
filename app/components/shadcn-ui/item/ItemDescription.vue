<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p
    :class="cn(
      `
        line-clamp-2 text-sm/normal font-normal text-balance
        text-muted-foreground
      `,
      `
        [&>a]:underline [&>a]:underline-offset-4
        [&>a:hover]:text-primary
      `,
      props.class,
    )"
    data-slot="item-description"
  >
    <slot />
  </p>
</template>
