<script lang="ts" setup>
import type { RangeCalendarHeaderProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import { RangeCalendarHeader, useForwardProps } from 'reka-ui'

const props = defineProps<RangeCalendarHeaderProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarHeader
    :class="cn('relative flex w-full items-center justify-center pt-1', props.class)"
    data-slot="range-calendar-header"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarHeader>
</template>
