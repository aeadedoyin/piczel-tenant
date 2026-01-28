<script setup lang="ts">
import type { Collection } from '@/types/gallery'

defineProps<{
  collection: Collection
}>()
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-semibold">
        Download Activity
      </h3>
      <p class="text-sm text-muted-foreground">
        Track photo downloads from this collection.
      </p>
    </div>

    <ShadSeparator />

    <!-- Empty State -->
    <div class="flex flex-col items-center py-12 text-center">
      <div class="mb-4 rounded-full bg-muted p-4">
        <LucideDownload class="size-8 text-muted-foreground" />
      </div>
      <h4 class="mb-1 text-sm font-medium">
        No downloads yet
      </h4>
      <p class="max-w-sm text-xs text-muted-foreground">
        When visitors download photos from this collection, their activity will appear here.
      </p>
    </div>
  </div>
</template>
