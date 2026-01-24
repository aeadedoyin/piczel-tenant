<script setup lang="ts">
import type { InputGroupButtonProps } from '.'
import { Button } from '@/components/shadcn-ui/button'
import { cn } from '@/lib/utils'
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
