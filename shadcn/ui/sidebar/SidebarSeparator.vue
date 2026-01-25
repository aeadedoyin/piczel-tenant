<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'
import { Separator } from '@@/shadcn/ui/separator'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Separator
    :class="cn('mx-2 w-auto bg-sidebar-border', props.class)"
    data-sidebar="separator"
    data-slot="sidebar-separator"
  >
    <slot />
  </Separator>
</template>
