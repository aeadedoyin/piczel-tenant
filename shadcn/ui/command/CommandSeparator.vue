<script setup lang="ts">
import type { SeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import { Separator } from 'reka-ui'

const props = defineProps<SeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Separator
    v-bind="delegatedProps"
    :class="cn('-mx-1 h-px bg-border', props.class)"
    data-slot="command-separator"
  >
    <slot />
  </Separator>
</template>
