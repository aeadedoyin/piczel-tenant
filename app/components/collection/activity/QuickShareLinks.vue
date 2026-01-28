<script setup lang="ts">
import type { Collection } from '@/types/gallery'
import { toast } from 'vue-sonner'

defineProps<{
  collection: Collection
}>()

function copyLink() {
  navigator.clipboard.writeText(`${window.location.origin}/gallery/share/example-link`)
  toast.success('Link copied to clipboard')
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-semibold">
        Quick Share Links
      </h3>
      <p class="text-sm text-muted-foreground">
        Create and manage shareable links for this collection.
      </p>
    </div>

    <ShadSeparator />

    <!-- Create Link -->
    <div class="space-y-3 max-w-lg">
      <ShadButton variant="outline" @click="copyLink">
        <LucideLink class="mr-2 size-4" />
        Create Share Link
      </ShadButton>
    </div>

    <ShadSeparator />

    <!-- Empty State -->
    <div class="flex flex-col items-center py-12 text-center">
      <div class="mb-4 rounded-full bg-muted p-4">
        <LucideLink class="size-8 text-muted-foreground" />
      </div>
      <h4 class="mb-1 text-sm font-medium">
        No share links yet
      </h4>
      <p class="max-w-sm text-xs text-muted-foreground">
        Create share links to give specific people access to this collection.
      </p>
    </div>
  </div>
</template>
