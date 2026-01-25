<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@@/shadcn/lib/utils'
import { Loader2Icon } from 'lucide-vue-next'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Loader2Icon
    aria-label="Loading"
    :class="cn('size-4 animate-spin', props.class)"
    role="status"
  />
</template>
