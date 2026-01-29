<script setup lang="ts">
import type { Collection } from '@/types/gallery'

defineProps<{
  collection: Collection
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- Empty State -->
    <div class="flex flex-col items-center py-12 text-center">
      <div class="mb-4 rounded-full bg-muted p-4">
        <LucideLock class="size-8 text-muted-foreground" />
      </div>
      <h4 class="mb-1 text-sm font-medium">
        No private photos
      </h4>
      <p class="max-w-sm text-xs text-muted-foreground">
        Photos marked as private will be hidden from visitors but can still be managed here.
      </p>
    </div>
  </div>
</template>
