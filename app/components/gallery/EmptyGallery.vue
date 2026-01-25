<script setup lang="ts">
import { LucideImage, LucideUpload } from 'lucide-vue-next'

const emit = defineEmits<{
  upload: []
}>()
</script>

<template>
  <Empty class="py-16">
    <EmptyMedia>
      <LucideImage class="size-12 text-muted-foreground" />
    </EmptyMedia>
    <EmptyContent>
      <EmptyHeader>
        <EmptyTitle>No photos yet</EmptyTitle>
        <EmptyDescription>
          Upload your first photo to get started with your gallery.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyActions>
        <Button @click="emit('upload')">
          <LucideUpload class="mr-2 size-4" />
          Upload Photos
        </Button>
      </EmptyActions>
    </EmptyContent>
  </Empty>
</template>
