<script setup lang="ts">
import type { AvatarFallbackProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import { AvatarFallback } from 'reka-ui'

const props = defineProps<AvatarFallbackProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AvatarFallback
    v-bind="delegatedProps"
    :class="cn(`
      flex size-full items-center justify-center rounded-full bg-muted
    `, props.class)"
    data-slot="avatar-fallback"
  >
    <slot />
  </AvatarFallback>
</template>
