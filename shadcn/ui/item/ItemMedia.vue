<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ItemMediaVariants } from '.'
import { cn } from '@@/shadcn/lib/utils'
import { itemMediaVariants } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant?: ItemMediaVariants['variant']
}>()
</script>

<template>
  <div
    :class="cn(itemMediaVariants({ variant }), props.class)"
    data-slot="item-media"
    :data-variant="props.variant"
  >
    <slot />
  </div>
</template>
