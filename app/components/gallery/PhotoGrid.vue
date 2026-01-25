<script setup lang="ts">
import type { Photo } from '@/types/gallery'

defineProps<{
  photos: Photo[]
  loading?: boolean
  selectedIds?: Set<string>
  columns?: 2 | 3 | 4
}>()

const emit = defineEmits<{
  star: [photoId: string]
  select: [photoId: string]
  view: [photo: Photo]
}>()
</script>

<template>
  <div>
    <!-- Loading Skeleton -->
    <div
      v-if="loading"
      class="grid gap-4"
      :class="{
        'grid-cols-2': columns === 2,
        'grid-cols-2 md:grid-cols-3': columns === 3 || !columns,
        'grid-cols-2 md:grid-cols-3 lg:grid-cols-4': columns === 4,
      }"
    >
      <div
        v-for="i in 8"
        :key="i"
        class="aspect-square animate-pulse rounded-lg bg-muted"
      />
    </div>

    <!-- Photo Grid -->
    <div
      v-else
      class="grid gap-4"
      :class="{
        'grid-cols-2': columns === 2,
        'grid-cols-2 md:grid-cols-3': columns === 3 || !columns,
        'grid-cols-2 md:grid-cols-3 lg:grid-cols-4': columns === 4,
      }"
    >
      <GalleryPhotoCard
        v-for="photo in photos"
        :key="photo.id"
        :photo="photo"
        :selected="selectedIds?.has(photo.id)"
        @select="emit('select', $event)"
        @star="emit('star', $event)"
        @view="emit('view', $event)"
      />
    </div>
  </div>
</template>
