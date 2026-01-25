<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <li
    :class="cn('group/menu-item relative', props.class)"
    data-sidebar="menu-item"
    data-slot="sidebar-menu-item"
  >
    <slot />
  </li>
</template>
