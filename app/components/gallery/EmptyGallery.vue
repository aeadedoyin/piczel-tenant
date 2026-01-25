<script setup lang="ts">
import { LucideImage, LucideUpload } from 'lucide-vue-next'

const emit = defineEmits<{
  upload: []
}>()
</script>

<template>
  <ShadEmpty class="py-16">
    <ShadEmptyMedia>
      <LucideImage class="size-12 text-muted-foreground" />
    </ShadEmptyMedia>
    <ShadEmptyContent>
      <ShadEmptyHeader>
        <ShadEmptyTitle>No photos yet</ShadEmptyTitle>
        <ShadEmptyDescription>
          Upload your first photo to get started with your gallery.
        </ShadEmptyDescription>
      </ShadEmptyHeader>
      <ShadEmptyActions>
        <ShadButton @click="emit('upload')">
          <LucideUpload class="mr-2 size-4" />
          Upload Photos
        </ShadButton>
      </ShadEmptyActions>
    </ShadEmptyContent>
  </ShadEmpty>
</template>
