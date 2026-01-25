<script setup lang="ts">
import type { SelectLabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'
import { SelectLabel } from 'reka-ui'

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
  <SelectLabel
    :class="cn('px-2 py-1.5 text-xs text-muted-foreground', props.class)"
    data-slot="select-label"
  >
    <slot />
  </SelectLabel>
</template>
