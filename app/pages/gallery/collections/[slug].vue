<script setup lang="ts">
import type { Collection, CreateCollectionData, Photo } from '@/types/gallery'
import { toast } from 'vue-sonner'

const route = useRoute()
const router = useRouter()
const gallery = useGallery()
const collectionSidebar = useCollectionSidebar()
const mainSidebar = useSidebar()

const slug = computed(() => route.params.slug as string)

// State
const collection = ref<Collection | null>(null)
const photos = ref<Photo[]>([])
const isLoading = ref(true)
const isEditModalOpen = ref(false)
const viewMode = ref<'grid' | 'masonry'>('grid')
const isSelecting = ref(false)

// Generate photos based on collection's photoCount for demo
const demoPhotos = computed(() => {
  if (!collection.value || collection.value.photoCount === 0)
    return []

  const count = collection.value.photoCount
  return Array.from({ length: count }, (_, i) => ({
    id: `photo-${collection.value!.id}-${i + 1}`,
    url: `/images/samples/photo-${((i % 15) + 1)}.jpg`,
    thumbnailUrl: `/images/samples/photo-${((i % 15) + 1)}.jpg`,
    title: `Photo ${i + 1}`,
    width: 800 + Math.floor(Math.random() * 400),
    height: 600 + Math.floor(Math.random() * 300),
    size: Math.floor(Math.random() * 5000000) + 500000,
    starred: i < 3,
    collectionId: collection.value?.id,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
  })) as Photo[]
})

// Split photos across sections for demo display
const photosBySection = computed(() => {
  const sections = collectionSidebar.photoSections
  const allPhotos = demoPhotos.value
  if (sections.length === 0 || allPhotos.length === 0)
    return []

  const perSection = Math.ceil(allPhotos.length / sections.length)
  return sections.map((section, i) => ({
    ...section,
    photos: allPhotos.slice(i * perSection, (i + 1) * perSection),
  }))
})

// Sidebar coordination
onMounted(() => {
  collectionSidebar.initCoordination(mainSidebar)
})

onBeforeUnmount(() => {
  collectionSidebar.restoreMainSidebar(mainSidebar)
})

// Watch main sidebar: if user expands it, collapse collection sidebar
watch(() => mainSidebar.open.value, (mainIsOpen) => {
  if (mainIsOpen && collectionSidebar.isOpen) {
    collectionSidebar.close()
  }
})

// Watch collection sidebar: if user opens it, collapse main sidebar
watch(() => collectionSidebar.isOpen, (collectionIsOpen) => {
  if (collectionIsOpen && mainSidebar.open.value) {
    mainSidebar.setOpen(false)
  }
})

// Selection
const selectedCount = computed(() => gallery.selectedPhotoIds.size)
const hasSelection = computed(() => selectedCount.value > 0)
const allSelected = computed(() =>
  demoPhotos.value.length > 0 && selectedCount.value === demoPhotos.value.length,
)

function toggleSelectMode() {
  isSelecting.value = !isSelecting.value
  if (!isSelecting.value) {
    gallery.clearSelection()
  }
}

function handleSelectAll() {
  if (allSelected.value) {
    gallery.clearSelection()
  }
  else {
    demoPhotos.value.forEach(p => gallery.selectPhoto(p.id))
  }
}

function handlePhotoSelect(photoId: string) {
  if (!isSelecting.value) {
    isSelecting.value = true
  }
  gallery.togglePhotoSelection(photoId)
}

function handlePhotoView(photo: Photo) {
  if (isSelecting.value) {
    handlePhotoSelect(photo.id)
  }
  else {
    toast.info(`Viewing: ${photo.title}`)
  }
}

// Actions
async function handleStar() {
  if (collection.value) {
    await gallery.toggleCollectionStar(collection.value.id)
  }
}

async function handleEditSave(data: CreateCollectionData) {
  if (collection.value) {
    await gallery.updateCollection({ id: collection.value.id, ...data })
    isEditModalOpen.value = false
  }
}

async function handleDelete() {
  if (collection.value) {
    await gallery.deleteCollection(collection.value.id)
    router.push('/gallery/collections')
  }
}

function handleShare() {
  const shareUrl = `${window.location.origin}/gallery/${slug.value}`
  navigator.clipboard.writeText(shareUrl)
  toast.success('Link copied to clipboard')
}

// Fetch data
async function loadData() {
  isLoading.value = true

  if (gallery.collections.length === 0) {
    await gallery.fetchCollections()
  }

  if (gallery.photos.length === 0) {
    await gallery.fetchPhotos()
  }

  collection.value = gallery.collections.find(
    c => c.id === slug.value || c.title.toLowerCase().replace(/\s+/g, '-') === slug.value,
  ) || gallery.collections[0] || null

  if (collection.value) {
    photos.value = gallery.getPhotosByCollection(collection.value.id)
  }

  isLoading.value = false
}

useHead({
  title: computed(() =>
    collection.value ? `${collection.value.title} | Piczel` : 'Collection | Piczel',
  ),
})

onMounted(loadData)
watch(slug, loadData)
</script>

<template>
  <!-- Loading State -->
  <div v-if="isLoading" class="space-y-6">
    <div class="flex gap-4">
      <div class="w-60 shrink-0 animate-pulse space-y-3">
        <div class="h-8 rounded bg-muted" />
        <div class="h-32 rounded bg-muted" />
        <div class="h-6 rounded bg-muted" />
        <div class="h-6 rounded bg-muted" />
      </div>
      <div class="flex-1 space-y-4">
        <div class="h-10 w-1/3 animate-pulse rounded bg-muted" />
        <div class="grid grid-cols-4 gap-2">
          <div v-for="i in 8" :key="i" class="aspect-square animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  </div>

  <!-- Not Found State -->
  <div
    v-else-if="!collection"
    class="flex flex-col items-center justify-center py-20 text-center"
  >
    <div class="mb-4 rounded-full bg-muted p-4">
      <LucideFolderX class="size-12 text-muted-foreground" />
    </div>
    <h2 class="mb-2 text-xl font-semibold">
      Collection not found
    </h2>
    <p class="mb-6 max-w-md text-muted-foreground">
      The collection "{{ slug }}" doesn't exist or may have been deleted.
    </p>
    <ShadButton @click="router.push('/gallery/collections')">
      <LucideArrowLeft class="mr-2 size-4" />
      Back to Collections
    </ShadButton>
  </div>

  <!-- Collection Content -->
  <div v-else class="-m-4 flex h-[calc(100dvh-82px)]">
    <!-- Collection Sidebar -->
    <CollectionSidebar
      :collection="collection"
      :photos="demoPhotos"
      @photo-select="handlePhotoView"
    />

    <!-- Expand trigger (visible when sidebar is collapsed) -->
    <button
      v-if="!collectionSidebar.isOpen"
      class="flex shrink-0 items-center justify-center w-8 border-r text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      @click="collectionSidebar.open()"
    >
      <LucidePanelLeftOpen class="size-4" />
    </button>

    <!-- Main Content Area -->
    <div class="flex-1 overflow-y-auto">
      <!-- Top Action Bar -->
      <div class="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-6 py-3">
        <div class="flex items-center gap-3">
          <h1 class="text-lg font-semibold">
            {{ collection.title }}
          </h1>
          <ShadBadge
            class="text-xs"
            :variant="collectionStatusConfig[collection.status].variant"
          >
            <component
              :is="collectionStatusConfig[collection.status].icon"
              class="mr-1 size-3"
            />
            {{ collectionStatusConfig[collection.status].label }}
          </ShadBadge>
        </div>

        <div class="flex items-center gap-2">
          <ShadButton size="sm" variant="outline" @click="handleShare">
            <LucideShare2 class="mr-2 size-4" />
            Share
          </ShadButton>

          <ShadButton size="sm" variant="outline" @click="handleStar">
            <LucideStar
              class="mr-2 size-4"
              :class="{ 'fill-yellow-400 text-yellow-400': collection.starred }"
            />
            {{ collection.starred ? 'Starred' : 'Star' }}
          </ShadButton>

          <ShadDropdownMenu>
            <ShadDropdownMenuTrigger as-child>
              <ShadButton class="size-8" size="icon" variant="outline">
                <LucideEllipsis class="size-4" />
              </ShadButton>
            </ShadDropdownMenuTrigger>
            <ShadDropdownMenuContent align="end">
              <ShadDropdownMenuItem @select="isEditModalOpen = true">
                <LucidePencil class="mr-2 size-4" />
                Edit Details
              </ShadDropdownMenuItem>
              <ShadDropdownMenuItem>
                <LucideDownload class="mr-2 size-4" />
                Download All
              </ShadDropdownMenuItem>
              <ShadDropdownMenuItem>
                <LucideUpload class="mr-2 size-4" />
                Upload Photos
              </ShadDropdownMenuItem>
              <ShadDropdownMenuSeparator />
              <ShadDropdownMenuItem
                class="text-destructive focus:text-destructive"
                @select="handleDelete"
              >
                <LucideTrash2 class="mr-2 size-4" />
                Delete Collection
              </ShadDropdownMenuItem>
            </ShadDropdownMenuContent>
          </ShadDropdownMenu>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="p-6">
        <!-- Photos Tab -->
        <template v-if="collectionSidebar.activeTab === 'photos'">
          <!-- Selection Toolbar -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div
              v-if="isSelecting || hasSelection"
              class="mb-4 flex items-center justify-between rounded-lg border bg-muted/50 p-3"
            >
              <div class="flex items-center gap-3">
                <ShadCheckbox
                  :checked="allSelected"
                  :indeterminate="hasSelection && !allSelected"
                  @update:checked="handleSelectAll"
                />
                <span class="text-sm">
                  <template v-if="hasSelection">
                    {{ selectedCount }} {{ selectedCount === 1 ? 'photo' : 'photos' }} selected
                  </template>
                  <template v-else>
                    Select photos
                  </template>
                </span>
              </div>

              <div class="flex items-center gap-2">
                <template v-if="hasSelection">
                  <ShadButton size="sm" variant="outline">
                    <LucideStar class="mr-2 size-4" />
                    Star
                  </ShadButton>
                  <ShadButton size="sm" variant="outline">
                    <LucideDownload class="mr-2 size-4" />
                    Download
                  </ShadButton>
                  <ShadButton size="sm" variant="outline">
                    <LucideFolderInput class="mr-2 size-4" />
                    Move
                  </ShadButton>
                  <ShadButton class="text-destructive" size="sm" variant="outline">
                    <LucideTrash2 class="mr-2 size-4" />
                    Delete
                  </ShadButton>
                </template>
                <ShadButton
                  size="sm"
                  variant="ghost"
                  @click="toggleSelectMode"
                >
                  <LucideX class="mr-2 size-4" />
                  Cancel
                </ShadButton>
              </div>
            </div>
          </Transition>

          <!-- View Toggle & Photo Count -->
          <div
            v-if="demoPhotos.length > 0"
            class="mb-4 flex items-center justify-between"
          >
            <h2 class="text-sm font-medium text-muted-foreground">
              {{ demoPhotos.length }} {{ demoPhotos.length === 1 ? 'photo' : 'photos' }}
            </h2>
            <div class="flex items-center gap-2">
              <ShadButton
                size="sm"
                :variant="!isSelecting ? 'outline' : 'secondary'"
                @click="toggleSelectMode"
              >
                <LucideCheckSquare class="mr-2 size-4" />
                Select
              </ShadButton>

              <ShadToggleGroup
                v-model="viewMode"
                class="border"
                type="single"
              >
                <ShadToggleGroupItem
                  aria-label="Grid view"
                  class="px-3"
                  value="grid"
                >
                  <LucideLayoutGrid class="size-4" />
                </ShadToggleGroupItem>
                <ShadToggleGroupItem
                  aria-label="Masonry view"
                  class="px-3"
                  value="masonry"
                >
                  <LucideLayoutDashboard class="size-4" />
                </ShadToggleGroupItem>
              </ShadToggleGroup>
            </div>
          </div>

          <!-- Sectioned Photos Grid -->
          <template v-if="demoPhotos.length > 0">
            <div
              v-for="section in photosBySection"
              :id="section.id"
              :key="section.id"
              class="mb-8 scroll-mt-16"
            >
              <div class="mb-3">
                <h3 class="text-sm font-semibold">
                  {{ section.name }}
                </h3>
                <p v-if="section.description" class="text-xs text-muted-foreground">
                  {{ section.description }}
                </p>
              </div>
              <GalleryPhotoGrid
                :columns="4"
                :photos="section.photos"
                :selected-ids="gallery.selectedPhotoIds"
                @select="handlePhotoSelect"
                @star="gallery.togglePhotoStar"
                @view="handlePhotoView"
              />
            </div>
          </template>

          <!-- Empty Photos State -->
          <div
            v-else
            class="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-20 text-center"
          >
            <div class="mb-4 rounded-full bg-muted p-4">
              <LucideImagePlus class="size-12 text-muted-foreground" />
            </div>
            <h3 class="mb-2 text-lg font-medium">
              No photos yet
            </h3>
            <p class="mb-6 max-w-md text-muted-foreground">
              This collection is empty. Upload photos to get started.
            </p>
            <ShadButton>
              <LucideUpload class="mr-2 size-4" />
              Upload Photos
            </ShadButton>
          </div>
        </template>

        <!-- Design Tab -->
        <template v-else-if="collectionSidebar.activeTab === 'design'">
          <CollectionDesignPreview
            :collection="collection"
            :section="collectionSidebar.activeSection || 'cover'"
          />
        </template>

        <!-- Settings Tab -->
        <template v-else-if="collectionSidebar.activeTab === 'settings'">
          <CollectionSettingsGeneralSettings
            v-if="collectionSidebar.activeSection === 'general' || !collectionSidebar.activeSection"
            :collection="collection"
            @save="handleEditSave"
          />
          <CollectionSettingsPrivacySettings
            v-else-if="collectionSidebar.activeSection === 'privacy'"
            :collection="collection"
          />
          <CollectionSettingsDownloadSettings
            v-else-if="collectionSidebar.activeSection === 'download'"
            :collection="collection"
          />
          <CollectionSettingsFavoriteSettings
            v-else-if="collectionSidebar.activeSection === 'favorite'"
            :collection="collection"
          />
          <CollectionSettingsStoreSettings
            v-else-if="collectionSidebar.activeSection === 'store'"
            :collection="collection"
          />
        </template>

        <!-- Activity Tab -->
        <template v-else-if="collectionSidebar.activeTab === 'activity'">
          <CollectionActivityDownloadActivity
            v-if="collectionSidebar.activeSection === 'downloads' || !collectionSidebar.activeSection"
            :collection="collection"
          />
          <CollectionActivityFavoriteActivity
            v-else-if="collectionSidebar.activeSection === 'favorites'"
            :collection="collection"
          />
          <CollectionActivityStoreOrders
            v-else-if="collectionSidebar.activeSection === 'orders'"
            :collection="collection"
          />
          <CollectionActivityEmailRegistration
            v-else-if="collectionSidebar.activeSection === 'email'"
            :collection="collection"
          />
          <CollectionActivityQuickShareLinks
            v-else-if="collectionSidebar.activeSection === 'share-links'"
            :collection="collection"
          />
          <CollectionActivityPrivatePhotos
            v-else-if="collectionSidebar.activeSection === 'private-photos'"
            :collection="collection"
          />
        </template>
      </div>
    </div>
  </div>

  <!-- Edit Collection Modal -->
  <GalleryCollectionModal
    v-model:open="isEditModalOpen"
    :collection="collection"
    @save="handleEditSave"
  />
</template>
