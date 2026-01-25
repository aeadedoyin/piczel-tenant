<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn('flex items-center gap-2', props.class)"
    data-slot="item-actions"
  >
    <slot />
  </div>
</template>
