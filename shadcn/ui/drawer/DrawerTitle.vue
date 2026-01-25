<script lang="ts" setup>
import type { DrawerTitleProps } from 'vaul-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import { DrawerTitle } from 'vaul-vue'

const props = defineProps<DrawerTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DrawerTitle
    v-bind="delegatedProps"
    :class="cn('font-semibold text-foreground', props.class)"
    data-slot="drawer-title"
  >
    <slot />
  </DrawerTitle>
</template>
