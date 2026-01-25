<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ItemVariants } from '.'
import { cn } from '@@/shadcn/lib/utils'
import { Primitive } from 'reka-ui'
import { itemVariants } from '.'

const props = withDefaults(defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
  variant?: ItemVariants['variant']
  size?: ItemVariants['size']
}>(), {
  as: 'div',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(itemVariants({ variant, size }), props.class)"
    data-slot="item"
  >
    <slot />
  </Primitive>
</template>
