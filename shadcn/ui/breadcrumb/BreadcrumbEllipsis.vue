<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'
import { MoreHorizontal } from 'lucide-vue-next'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    aria-hidden="true"
    :class="cn('flex size-9 items-center justify-center', props.class)"
    data-slot="breadcrumb-ellipsis"
    role="presentation"
  >
    <slot>
      <MoreHorizontal class="size-4" />
    </slot>
    <span class="sr-only">More</span>
  </span>
</template>
