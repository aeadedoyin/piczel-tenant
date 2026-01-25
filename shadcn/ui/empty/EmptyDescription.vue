<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'

defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p
    :class="cn(
      `
        text-sm/relaxed text-muted-foreground
        [&>a]:underline [&>a]:underline-offset-4
        [&>a:hover]:text-primary
      `,
      $attrs.class ?? '',
    )"
    data-slot="empty-description"
  >
    <slot />
  </p>
</template>
