<script setup lang="ts">
import type { CollectionTab } from '@/composables/useCollectionSidebar'
import type { Collection, Photo } from '@/types/gallery'
import {
  LucideActivity,
  LucideImage,
  LucidePencilRuler,
  LucideSettings,
} from '#components'

defineProps<{
  collection: Collection
  photos: Photo[]
}>()

defineEmits<{
  photoSelect: [photo: Photo]
}>()

const collectionSidebar = useCollectionSidebar()

const tabs: { id: CollectionTab, icon: Component, label: string }[] = [
  { id: 'photos', icon: LucideImage, label: 'Photos' },
  { id: 'design', icon: LucidePencilRuler, label: 'Design' },
  { id: 'settings', icon: LucideSettings, label: 'Settings' },
  { id: 'activity', icon: LucideActivity, label: 'Activity' },
]

// Format date for display
function formatDate(dateString?: string): string {
  if (!dateString)
    return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <aside
    class="relative flex shrink-0 flex-col border-r bg-background transition-all duration-200 ease-in-out"
    :class="[
      collectionSidebar.isOpen ? 'w-60' : 'w-0 overflow-hidden border-r-0',
    ]"
  >
    <div class="flex h-full w-60 flex-col">
      <!-- Header -->
      <div class="shrink-0 border-b p-3">
        <!-- Back link -->
        <NuxtLink
          class="mb-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          to="/gallery/collections"
        >
          <LucideArrowLeft class="size-3" />
          Collections
        </NuxtLink>

        <!-- Title and metadata -->
        <h2 class="text-sm font-semibold leading-tight truncate">
          {{ collection.title }}
        </h2>
        <div class="mt-1 flex items-center gap-2">
          <span class="text-xs text-muted-foreground">
            {{ formatDate(collection.eventDate || collection.createdAt) }}
          </span>
          <ShadBadge
            class="text-[10px] h-4 px-1.5"
            :variant="collectionStatusConfig[collection.status].variant"
          >
            {{ collectionStatusConfig[collection.status].label }}
          </ShadBadge>
        </div>
      </div>

      <!-- Cover Thumbnail -->
      <div class="shrink-0 border-b p-3">
        <div class="aspect-video overflow-hidden rounded-md bg-muted">
          <img
            v-if="collection.coverUrl"
            :alt="collection.title"
            class="size-full object-cover"
            :src="collection.coverUrl"
          >
          <div v-else class="flex size-full items-center justify-center">
            <LucideImage class="size-8 text-muted-foreground/40" />
          </div>
        </div>
      </div>

      <!-- Tab Icons Strip -->
      <div class="shrink-0 flex items-center border-b px-2">
        <ShadTooltipProvider :delay-duration="300">
          <ShadTooltip v-for="tab in tabs" :key="tab.id">
            <ShadTooltipTrigger as-child>
              <button
                class="flex flex-1 items-center justify-center py-2.5 transition-colors relative"
                :class="[
                  collectionSidebar.activeTab === tab.id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                ]"
                @click="collectionSidebar.setTab(tab.id)"
              >
                <component :is="tab.icon" class="size-4" />
                <!-- Active indicator -->
                <span
                  v-if="collectionSidebar.activeTab === tab.id"
                  class="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-foreground"
                />
              </button>
            </ShadTooltipTrigger>
            <ShadTooltipContent side="bottom" :side-offset="4">
              {{ tab.label }}
            </ShadTooltipContent>
          </ShadTooltip>
        </ShadTooltipProvider>
      </div>

      <!-- Tab Content (scrollable) -->
      <ShadScrollArea class="flex-1">
        <div class="p-3">
          <!-- Photos Tab -->
          <CollectionSidebarPhotos
            v-if="collectionSidebar.activeTab === 'photos'"
          />

          <!-- Design Tab -->
          <CollectionSidebarDesign
            v-else-if="collectionSidebar.activeTab === 'design'"
          />

          <!-- Settings Tab -->
          <CollectionSidebarSettings
            v-else-if="collectionSidebar.activeTab === 'settings'"
          />

          <!-- Activity Tab -->
          <CollectionSidebarActivity
            v-else-if="collectionSidebar.activeTab === 'activity'"
          />
        </div>
      </ShadScrollArea>

      <!-- Bottom toggle button -->
      <div class="shrink-0 border-t p-2">
        <button
          class="flex w-full items-center justify-center gap-2 rounded-md py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          @click="collectionSidebar.toggle()"
        >
          <LucidePanelLeftClose class="size-3.5" />
          <span>Collapse</span>
        </button>
      </div>
    </div>
  </aside>
</template>
