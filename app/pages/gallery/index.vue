<script setup lang="ts">
import type { Collection, CreateCollectionData, Photo } from '@/types/gallery'

useHead({
  title: 'Gallery | Piczel',
})

const gallery = useGallery()
const router = useRouter()

// Modal state
const isModalOpen = ref(false)

// Icons for stats cards (resolved at runtime for prop passing)
const IconImage = resolveComponent('LucideImage')
const IconFolderOpen = resolveComponent('LucideFolderOpen')
const IconStar = resolveComponent('LucideStar')
const IconHardDrive = resolveComponent('LucideHardDrive')

// Fetch data on mount
onMounted(async () => {
  await Promise.all([gallery.fetchPhotos(), gallery.fetchCollections()])
})

function handleUpload() {
  // TODO: Implement upload functionality
}

function handleNewCollection() {
  isModalOpen.value = true
}

async function handleSaveCollection(data: CreateCollectionData) {
  await gallery.createCollection(data)
  isModalOpen.value = false
  router.push('/gallery/collections')
}

function handlePhotoView(_photo: Photo) {
  // TODO: Implement photo viewer
}

function handleCollectionView(collection: Collection) {
  router.push(`/gallery/collections/${collection.id}`)
}

function handleCollectionEdit(collection: Collection) {
  router.push(`/gallery/collections?edit=${collection.id}`)
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
          <LucidePlus class="mr-2 size-4" />
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
      <GalleryStatsCard
        :change="12"
        :icon="IconImage"
        label="Media"
        :value="gallery.stats.totalPhotos"
      />
      <GalleryStatsCard
        :change="8"
        :icon="IconFolderOpen"
        label="Collections"
        :value="gallery.stats.totalCollections"
      />
      <GalleryStatsCard
        :change="-3"
        :icon="IconStar"
        label="Starred"
        :value="gallery.stats.starredPhotos"
      />
      <GalleryStatsCard
        :change="24"
        :icon="IconHardDrive"
        label="Storage Used"
        :value="formatStorage(gallery.stats.storageUsed)"
      />
    </div>

    <!-- Recent Collections Section -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">
          Recent Collections
        </h2>
        <NuxtLink
          class="
            text-sm text-muted-foreground
            hover:text-foreground
          "
          to="/gallery/collections"
        >
          View all
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <GalleryEmptyCollections
        v-if="!gallery.isLoadingCollections && gallery.collections.length === 0"
        @create="handleNewCollection"
      />

      <!-- Collections Grid -->
      <div
        v-else-if="gallery.isLoadingCollections"
        class="
          grid grid-cols-2 gap-4
          lg:grid-cols-4
        "
      >
        <div
          v-for="i in 4"
          :key="i"
          class="aspect-video animate-pulse rounded-lg bg-muted"
        />
      </div>

      <div
        v-else
        class="
          grid grid-cols-2 gap-4
          lg:grid-cols-4
        "
      >
        <GalleryCollectionCard
          v-for="collection in gallery.recentCollections"
          :key="collection.id"
          :collection="collection"
          @delete="gallery.deleteCollection"
          @edit="handleCollectionEdit"
          @star="gallery.toggleCollectionStar"
          @view="handleCollectionView"
        />
      </div>
    </div>

    <!-- Recent Uploads Section -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">
          Recent Uploads
        </h2>
        <NuxtLink
          v-if="false"
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
        :columns="6"
        :loading="gallery.isLoadingPhotos"
        :photos="gallery.recentPhotos"
        :selected-ids="gallery.selectedPhotoIds"
        @select="gallery.togglePhotoSelection"
        @star="gallery.togglePhotoStar"
        @view="handlePhotoView"
      />
    </div>

    <!-- New Collection Modal -->
    <GalleryCollectionModal
      v-model:open="isModalOpen"
      @save="handleSaveCollection"
    />

    <!-- Floating Bulk Actions Toolbar -->
    <GalleryBulkToolbar :total-count="gallery.recentPhotos.length" />
  </div>
</template>
