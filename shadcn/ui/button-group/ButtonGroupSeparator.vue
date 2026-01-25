<script setup lang="ts">
import type { SeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'
import { Separator } from '@@/shadcn/ui/separator'
import { reactiveOmit } from '@vueuse/core'

const props = withDefaults(defineProps<SeparatorProps & { class?: HTMLAttributes['class'] }>(), {
  orientation: 'vertical',
})
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Separator
    v-bind="delegatedProps"
    :class="cn(
      `
        relative m-0! self-stretch bg-input
        data-[orientation=vertical]:h-auto
      `,
      props.class,
    )"
    data-slot="button-group-separator"
    :orientation="props.orientation"
  />
</template>
