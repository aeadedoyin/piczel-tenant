<script setup lang="ts">
import type { MenubarSeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import { MenubarSeparator, useForwardProps } from 'reka-ui'

const props = defineProps<MenubarSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <MenubarSeparator
    :class=" cn('-mx-1 my-1 h-px bg-border', props.class)"
    data-slot="menubar-separator"
    v-bind="forwardedProps"
  />
</template>
