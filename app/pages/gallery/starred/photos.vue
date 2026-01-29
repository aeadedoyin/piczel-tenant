<script setup lang="ts">
import type { Photo } from '@/types/gallery'

const router = useRouter()
const gallery = useGallery()

onMounted(async () => {
  await gallery.fetchPhotos()
})

function handlePhotoView(_photo: Photo) {
  // TODO: Implement photo viewer
}
</script>

<template>
  <div class="space-y-4">
    <template v-if="gallery.isLoadingPhotos">
      <div class="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-6">
        <div
          v-for="i in 8"
          :key="i"
          class="aspect-square animate-pulse rounded-lg bg-muted"
        />
      </div>
    </template>

    <template v-else-if="gallery.starredPhotos.length > 0">
      <div class="flex items-center justify-between">
        <span class="text-sm text-muted-foreground">
          {{ gallery.starredPhotos.length }}
          {{ gallery.starredPhotos.length === 1 ? 'photo' : 'photos' }}
        </span>
      </div>

      <GalleryPhotoGrid
        :columns="4"
        :loading="false"
        :photos="gallery.starredPhotos"
        :selected-ids="gallery.selectedPhotoIds"
        @select="gallery.togglePhotoSelection"
        @star="gallery.togglePhotoStar"
        @view="handlePhotoView"
      />
    </template>

    <GalleryEmptyStarred
      v-else
      @browse="router.push('/gallery')"
    />
  </div>
</template>
