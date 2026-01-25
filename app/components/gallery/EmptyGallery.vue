<script setup lang="ts">
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
      <ShadEmpty>
        <ShadButton @click="emit('upload')">
          <LucideUpload class="mr-2 size-4" />
          Upload Photos
        </ShadButton>
      </ShadEmpty>
    </ShadEmptyContent>
  </ShadEmpty>
</template>
