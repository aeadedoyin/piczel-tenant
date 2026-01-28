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
        Store Orders
      </h3>
      <p class="text-sm text-muted-foreground">
        Track orders placed from this collection's store.
      </p>
    </div>

    <ShadSeparator />

    <!-- Empty State -->
    <div class="flex flex-col items-center py-12 text-center">
      <div class="mb-4 rounded-full bg-muted p-4">
        <LucideShoppingCart class="size-8 text-muted-foreground" />
      </div>
      <h4 class="mb-1 text-sm font-medium">
        No orders yet
      </h4>
      <p class="max-w-sm text-xs text-muted-foreground">
        When visitors place orders from this collection, they will appear here.
      </p>
    </div>
  </div>
</template>
