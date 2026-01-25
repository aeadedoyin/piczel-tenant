<script setup lang="ts">
import type { NavigationMenuTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import { ChevronDown } from 'lucide-vue-next'
import {
  NavigationMenuTrigger,
  useForwardProps,
} from 'reka-ui'
import { navigationMenuTriggerStyle } from '.'

const props = defineProps<NavigationMenuTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <NavigationMenuTrigger
    v-bind="forwardedProps"
    :class="cn(navigationMenuTriggerStyle(), 'group', props.class)"
    data-slot="navigation-menu-trigger"
  >
    <slot />
    <ChevronDown
      aria-hidden="true"
      class="
        relative top-px ml-1 size-3 transition duration-300
        group-data-[state=open]:rotate-180
      "
    />
  </NavigationMenuTrigger>
</template>
