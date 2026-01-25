<script setup lang="ts">
import type { SeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'
import { Separator } from '@@/shadcn/ui/separator'

const props = defineProps<
  SeparatorProps & { class?: HTMLAttributes['class'] }
>()
</script>

<template>
  <Separator
    :class="cn('my-0', props.class)"
    data-slot="item-separator"
    orientation="horizontal"
  />
</template>
