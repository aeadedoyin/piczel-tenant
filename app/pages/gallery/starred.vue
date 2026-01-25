<script setup lang="ts">
import type { Collection, Photo } from '@/types/gallery'

definePageMeta({
  title: 'Starred',
})

const router = useRouter()
const gallery = useGallery()

// Fetch data on mount
onMounted(async () => {
  await Promise.all([gallery.fetchPhotos(), gallery.fetchCollections()])
})

// Computed
const hasStarredItems = computed(() => {
  return (
    gallery.starredPhotos.length > 0 || gallery.starredCollections.length > 0
  )
})

function handleBrowse() {
  router.push('/gallery')
}

function handlePhotoView(_photo: Photo) {
  // TODO: Implement photo viewer
}

function handleCollectionView(collection: Collection) {
  router.push(`/gallery/collections/${collection.id}`)
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Starred
      </h1>
      <p class="text-muted-foreground">
        Your favorite photos and collections.
      </p>
    </div>

    <!-- Empty State -->
    <GalleryEmptyStarred
      v-if="
        !gallery.isLoadingPhotos
          && !gallery.isLoadingCollections
          && !hasStarredItems
      "
      @browse="handleBrowse"
    />

    <template v-else>
      <!-- Starred Collections -->
      <div
        v-if="gallery.starredCollections.length > 0"
        class="space-y-4"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">
            Starred Collections
          </h2>
          <span class="text-sm text-muted-foreground">
            {{ gallery.starredCollections.length }}
            {{ gallery.starredCollections.length === 1 ? 'collection' : 'collections' }}
          </span>
        </div>

        <div
          v-if="gallery.isLoadingCollections"
          class="
            grid gap-4
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          <div
            v-for="i in 3"
            :key="i"
            class="overflow-hidden rounded-xl border bg-card"
          >
            <div class="aspect-video animate-pulse bg-muted" />
            <div class="p-4">
              <div class="h-5 w-2/3 animate-pulse rounded-sm bg-muted" />
              <div class="mt-2 h-4 w-1/3 animate-pulse rounded-sm bg-muted" />
            </div>
          </div>
        </div>

        <div
          v-else class="
            grid gap-4
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          <GalleryCollectionCard
            v-for="collection in gallery.starredCollections"
            :key="collection.id"
            :collection="collection"
            @star="gallery.toggleCollectionStar"
            @view="handleCollectionView"
          />
        </div>
      </div>

      <!-- Starred Photos -->
      <div
        v-if="gallery.starredPhotos.length > 0"
        class="space-y-4"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">
            Starred Photos
          </h2>
          <span class="text-sm text-muted-foreground">
            {{ gallery.starredPhotos.length }}
            {{ gallery.starredPhotos.length === 1 ? 'photo' : 'photos' }}
          </span>
        </div>

        <GalleryPhotoGrid
          :columns="4"
          :loading="gallery.isLoadingPhotos"
          :photos="gallery.starredPhotos"
          :selected-ids="gallery.selectedPhotoIds"
          @select="gallery.togglePhotoSelection"
          @star="gallery.togglePhotoStar"
          @view="handlePhotoView"
        />
      </div>
    </template>
  </div>
</template>
