<script setup lang="ts">
import type { Collection } from '@/types/gallery'

const router = useRouter()
const gallery = useGallery()

onMounted(async () => {
  await gallery.fetchCollections()
})

function handleCollectionView(collection: Collection) {
  router.push(`/gallery/collections/${collection.id}`)
}
</script>

<template>
  <div class="space-y-4">
    <div
      v-if="gallery.isLoadingCollections"
      class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
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

    <template v-else-if="gallery.starredCollections.length > 0">
      <div class="flex items-center justify-between">
        <span class="text-sm text-muted-foreground">
          {{ gallery.starredCollections.length }}
          {{ gallery.starredCollections.length === 1 ? 'collection' : 'collections' }}
        </span>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <GalleryCollectionCard
          v-for="collection in gallery.starredCollections"
          :key="collection.id"
          :collection="collection"
          @star="gallery.toggleCollectionStar"
          @view="handleCollectionView"
        />
      </div>
    </template>

    <GalleryEmptyStarred
      v-else
      @browse="router.push('/gallery')"
    />
  </div>
</template>
