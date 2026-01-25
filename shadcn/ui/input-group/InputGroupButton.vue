<script setup lang="ts">
import type { InputGroupButtonProps } from '.'
import { cn } from '@@/shadcn/lib/utils'
import { Button } from '@@/shadcn/ui/button'
import { inputGroupButtonVariants } from '.'

const props = withDefaults(defineProps<InputGroupButtonProps>(), {
  size: 'xs',
  variant: 'ghost',
})
</script>

<template>
  <Button
    :class="cn(inputGroupButtonVariants({ size: props.size }), props.class)"
    :data-size="props.size"
    :variant="props.variant"
  >
    <slot />
  </Button>
</template>
