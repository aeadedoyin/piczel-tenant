<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'
import { Textarea } from '@@/shadcn/ui/textarea'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Textarea
    :class="cn(
      `
        flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none
        focus-visible:ring-0
        dark:bg-transparent
      `,
      props.class,
    )"
    data-slot="input-group-control"
  />
</template>
