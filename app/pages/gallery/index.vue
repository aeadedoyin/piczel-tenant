<script setup lang="ts">
import type { Photo } from '@/types/gallery'
import { LucideFolderPlus, LucideUpload } from 'lucide-vue-next'

definePageMeta({
  title: 'Gallery',
})

const gallery = useGallery()
const router = useRouter()

// Fetch data on mount
onMounted(async () => {
  await Promise.all([gallery.fetchPhotos(), gallery.fetchCollections()])
})

// Format storage size
function formatStorage(bytes: number): string {
  if (bytes < 1024)
    return `${bytes} B`
  if (bytes < 1024 * 1024)
    return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

function handleUpload() {
  // TODO: Implement upload functionality
}

function handleNewCollection() {
  router.push('/gallery/collections?new=true')
}

function handlePhotoView(_photo: Photo) {
  // TODO: Implement photo viewer
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">
          Gallery
        </h1>
        <p class="text-muted-foreground">
          Manage your photo collections and client galleries.
        </p>
      </div>

      <!-- Quick Actions -->
      <div class="flex gap-2">
        <ShadButton variant="outline" @click="handleNewCollection">
          <LucideFolderPlus class="mr-2 size-4" />
          New Collection
        </ShadButton>
        <ShadButton @click="handleUpload">
          <LucideUpload class="mr-2 size-4" />
          Upload
        </ShadButton>
      </div>
    </div>

    <!-- Stats -->
    <div
      class="
        grid gap-4
        md:grid-cols-4
      "
    >
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucideImage class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Total Photos</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          {{ gallery.stats.totalPhotos.toLocaleString() }}
        </div>
      </div>
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucideFolderOpen class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Collections</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          {{ gallery.stats.totalCollections }}
        </div>
      </div>
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucideStar class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Starred</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          {{ gallery.stats.starredPhotos }}
        </div>
      </div>
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <LucideHardDrive class="size-4 text-muted-foreground" />
          <span class="text-sm font-medium text-muted-foreground">Storage Used</span>
        </div>
        <div class="mt-2 text-2xl font-bold">
          {{ formatStorage(gallery.stats.storageUsed) }}
        </div>
      </div>
    </div>

    <!-- Recent Uploads Section -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">
          Recent Uploads
        </h2>
        <NuxtLink
          class="
            text-sm text-muted-foreground
            hover:text-foreground
          "
          to="/gallery/photos"
        >
          View all
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <GalleryEmptyGallery
        v-if="!gallery.isLoadingPhotos && gallery.photos.length === 0"
        @upload="handleUpload"
      />

      <!-- Photo Grid -->
      <GalleryPhotoGrid
        v-else
        :columns="4"
        :loading="gallery.isLoadingPhotos"
        :photos="gallery.recentPhotos"
        :selected-ids="gallery.selectedPhotoIds"
        @select="gallery.togglePhotoSelection"
        @star="gallery.togglePhotoStar"
        @view="handlePhotoView"
      />
    </div>
  </div>
</template>
