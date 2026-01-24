<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { EmptyMediaVariants } from '.'
import { cn } from '@/lib/utils'
import { emptyMediaVariants } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant?: EmptyMediaVariants['variant']
}>()
</script>

<template>
  <div
    :class="cn(emptyMediaVariants({ variant }), props.class)"
    data-slot="empty-icon"
    :data-variant="variant"
  >
    <slot />
  </div>
</template>
