<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn(`
      col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground
      [&_p]:leading-relaxed
    `, props.class)"
    data-slot="alert-description"
  >
    <slot />
  </div>
</template>
