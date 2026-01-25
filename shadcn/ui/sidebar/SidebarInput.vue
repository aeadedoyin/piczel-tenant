<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'
import { Input } from '@@/shadcn/ui/input'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Input
    :class="cn(
      'h-8 w-full bg-background shadow-none',
      props.class,
    )"
    data-sidebar="input"
    data-slot="sidebar-input"
  >
    <slot />
  </Input>
</template>
