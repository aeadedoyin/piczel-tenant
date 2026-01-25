<script lang="ts" setup>
import type { CalendarHeadCellProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import { CalendarHeadCell, useForwardProps } from 'reka-ui'

const props = defineProps<CalendarHeadCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarHeadCell
    :class="cn(`
      flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground
    `, props.class)"
    data-slot="calendar-head-cell"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeadCell>
</template>
