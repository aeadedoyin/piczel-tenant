<script setup lang="ts">
import type { MenubarLabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import { MenubarLabel } from 'reka-ui'

const props = defineProps<MenubarLabelProps & { class?: HTMLAttributes['class'], inset?: boolean }>()
const delegatedProps = reactiveOmit(props, 'class', 'inset')
</script>

<template>
  <MenubarLabel
    v-bind="delegatedProps"
    :class="cn(`
      px-2 py-1.5 text-sm font-medium
      data-inset:pl-8
    `, props.class)"
    :data-inset="inset ? '' : undefined"
  >
    <slot />
  </MenubarLabel>
</template>
