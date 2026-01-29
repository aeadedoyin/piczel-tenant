<script setup lang="ts">
import type { Collection, CreateCollectionData, Photo } from '@/types/gallery'
import { DEFAULT_SECTION_ID } from '@/composables/useCollectionSidebar'

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
// Custom sections get an even share; remaining photos go to Highlights
const allPhotosBySection = computed(() => {
  const sections = collectionSidebar.allSections
  const allPhotos = demoPhotos.value
  if (allPhotos.length === 0)
    return []

  const customSections = sections.filter(s => s.id !== DEFAULT_SECTION_ID)

  // No custom sections — all photos go to Highlights
  if (customSections.length === 0) {
    const highlights = sections.find(s => s.id === DEFAULT_SECTION_ID)!
    return [{ ...highlights, photos: allPhotos }]
  }

  // Distribute ~70% across custom sections, rest goes to Highlights
  const customPhotoCount = Math.floor(allPhotos.length * 0.7)
  const perSection = Math.ceil(customPhotoCount / customSections.length)

  const result = []
  let offset = 0

  // Highlights first with the remaining photos
  const highlightsSection = sections.find(s => s.id === DEFAULT_SECTION_ID)!
  const highlightsPhotos = allPhotos.slice(customSections.length * perSection)
  if (highlightsPhotos.length > 0) {
    result.push({ ...highlightsSection, photos: highlightsPhotos })
  }

  // Custom sections
  for (const section of customSections) {
    const sectionPhotos = allPhotos.slice(offset, offset + perSection)
    if (sectionPhotos.length > 0) {
      result.push({ ...section, photos: sectionPhotos })
    }
    offset += perSection
  }

  return result
})

// Counts per section (for sidebar display)
const sectionPhotoCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const s of allPhotosBySection.value) {
    counts[s.id] = s.photos.length
  }
  return counts
})

// Visible sections based on active sidebar selection
const visibleSections = computed(() => {
  const active = collectionSidebar.activePhotoSection
  if (!active)
    return allPhotosBySection.value
  return allPhotosBySection.value.filter(s => s.id === active)
})

// Sort state
const sortField = ref<'upload' | 'date' | 'name' | 'random'>('upload')
const sortAsc = ref(true)
const sortLabels: Record<string, string> = { upload: 'Upload', date: 'Date', name: 'Name', random: 'Random' }
const sortLabel = computed(() => sortLabels[sortField.value])

// Section header info for non-photo tabs
const sectionHeaders: Record<string, Record<string, { title: string, description: string }>> = {
  design: {
    cover: { title: 'Cover Design', description: 'Customize the cover image, layout, and style.' },
    typography: { title: 'Typography', description: 'Choose fonts and text styles.' },
    color: { title: 'Color', description: 'Set the color palette and theme.' },
    grid: { title: 'Grid Layout', description: 'Configure photo grid display.' },
  },
  settings: {
    general: { title: 'General', description: 'Basic information about this collection.' },
    privacy: { title: 'Privacy', description: 'Control access and visibility.' },
    download: { title: 'Download', description: 'Configure download options.' },
    favorite: { title: 'Favorites', description: 'Configure favorites feature.' },
    shop: { title: 'Shop', description: 'Configure shop options.' },
  },
  activity: {
    'downloads': { title: 'Download Activity', description: 'Track photo downloads.' },
    'favorites': { title: 'Favorite Activity', description: 'See favorited photos.' },
    'orders': { title: 'Shop Orders', description: 'Track shop orders.' },
    'email': { title: 'Email Registration', description: 'Collected visitor emails.' },
    'share-links': { title: 'Quick Share Links', description: 'Manage shareable links.' },
    'private-photos': { title: 'Private Photos', description: 'Hidden photos from public view.' },
  },
}

const currentSectionInfo = computed(() => {
  const tab = collectionSidebar.activeTab
  const section = collectionSidebar.activeSection
  return sectionHeaders[tab]?.[section] ?? null
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
    sonnerToast(`Viewing: ${photo.title}`)
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
  sonnerToast.success('Link copied to clipboard')
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
    collectionSidebar.loadSectionsForCollection(collection.value.id)
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
  <div v-else class="flex h-[calc(100dvh-7.125rem)] border-t">
    <!-- Collection Sidebar -->
    <CollectionSidebar
      :collection="collection"
      :photos="demoPhotos"
      :section-photo-counts="sectionPhotoCounts"
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
    <div class="flex flex-1 flex-col">
      <!-- Top Action Bar -->
      <div class="shrink-0 flex items-center justify-between border-b bg-background px-6 py-3">
        <div class="flex items-center gap-2">
          <h1 class="text-lg font-semibold">
            {{ collection.title }}
          </h1>
          <span class="text-xs text-muted-foreground">
            {{ new Date(collection.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <ShadDropdownMenu>
            <ShadDropdownMenuTrigger as-child>
              <ShadButton size="sm" variant="outline">
                <component
                  :is="collectionStatusConfig[collection.status].icon"
                  class="mr-1.5 size-3.5"
                />
                {{ collectionStatusConfig[collection.status].label }}
                <LucideChevronDown class="ml-1 size-3 text-muted-foreground" />
              </ShadButton>
            </ShadDropdownMenuTrigger>
            <ShadDropdownMenuContent align="end">
              <ShadDropdownMenuItem
                v-for="option in collectionStatusOptions"
                :key="option.value"
                @select="collection!.status = option.value"
              >
                <component
                  :is="collectionStatusConfig[option.value].icon"
                  class="mr-2 size-4"
                />
                {{ option.label }}
                <LucideCheck
                  v-if="collection!.status === option.value"
                  class="ml-auto size-4"
                />
              </ShadDropdownMenuItem>
            </ShadDropdownMenuContent>
          </ShadDropdownMenu>

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
              <ShadDropdownMenuItem @select="handleShare">
                <LucideShare2 class="mr-2 size-4" />
                Share
              </ShadDropdownMenuItem>
              <ShadDropdownMenuItem @select="isEditModalOpen = true">
                <LucidePencil class="mr-2 size-4" />
                Edit Details
              </ShadDropdownMenuItem>
              <ShadDropdownMenuItem>
                <LucideDownload class="mr-2 size-4" />
                Download All
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
      <div class="flex min-h-0 flex-1 flex-col">
        <!-- Photos Tab -->
        <template v-if="collectionSidebar.activeTab === 'photos'">
          <!-- Sectioned Photos -->
          <template v-if="demoPhotos.length > 0">
            <div
              v-for="section in visibleSections"
              :key="section.id"
              class="flex min-h-0 flex-1 flex-col"
            >
              <!-- Section header + controls -->
              <div class="shrink-0 flex items-center justify-between border-b bg-background px-6 py-3">
                <div>
                  <h3 class="text-sm font-semibold">
                    {{ section.name }}
                  </h3>
                  <p v-if="section.description" class="text-xs text-muted-foreground">
                    {{ section.description }}
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <!-- Upload -->
                  <ShadButton size="sm" variant="default">
                    <LucideUpload class="mr-2 size-4" />
                    Upload
                  </ShadButton>

                  <!-- Sort -->
                  <ShadDropdownMenu>
                    <ShadDropdownMenuTrigger as-child>
                      <ShadButton size="sm" variant="outline">
                        <LucideArrowUpDown class="mr-1.5 size-3.5" />
                        Sort
                        <span class="ml-1 text-xs text-muted-foreground">{{ sortLabel }}</span>
                        <LucideArrowUp v-if="sortField !== 'random' && sortAsc" class="ml-0.5 size-3 text-muted-foreground" />
                        <LucideArrowDown v-else-if="sortField !== 'random' && !sortAsc" class="ml-0.5 size-3 text-muted-foreground" />
                      </ShadButton>
                    </ShadDropdownMenuTrigger>
                    <ShadDropdownMenuContent align="end">
                      <ShadDropdownMenuItem @select="sortField = 'upload'; sortAsc = !sortAsc">
                        <LucideUpload class="mr-2 size-4" />
                        Upload Date
                        <LucideArrowUp v-if="sortField === 'upload' && sortAsc" class="ml-auto size-3.5" />
                        <LucideArrowDown v-else-if="sortField === 'upload' && !sortAsc" class="ml-auto size-3.5" />
                      </ShadDropdownMenuItem>
                      <ShadDropdownMenuItem @select="sortField = 'date'; sortAsc = !sortAsc">
                        <LucideCalendar class="mr-2 size-4" />
                        Date Taken
                        <LucideArrowUp v-if="sortField === 'date' && sortAsc" class="ml-auto size-3.5" />
                        <LucideArrowDown v-else-if="sortField === 'date' && !sortAsc" class="ml-auto size-3.5" />
                      </ShadDropdownMenuItem>
                      <ShadDropdownMenuItem @select="sortField = 'name'; sortAsc = !sortAsc">
                        <LucideType class="mr-2 size-4" />
                        Name
                        <LucideArrowUp v-if="sortField === 'name' && sortAsc" class="ml-auto size-3.5" />
                        <LucideArrowDown v-else-if="sortField === 'name' && !sortAsc" class="ml-auto size-3.5" />
                      </ShadDropdownMenuItem>
                      <ShadDropdownMenuItem @select="sortField = 'random'">
                        <LucideShuffle class="mr-2 size-4" />
                        Random
                      </ShadDropdownMenuItem>
                    </ShadDropdownMenuContent>
                  </ShadDropdownMenu>

                  <!-- Grid Toggle -->
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

              <!-- Scrollable photo grid -->
              <div class="flex-1 overflow-y-auto p-6">
                <GalleryPhotoGrid
                  :columns="4"
                  :photos="section.photos"
                  :selected-ids="gallery.selectedPhotoIds"
                  @select="handlePhotoSelect"
                  @star="gallery.togglePhotoStar"
                  @view="handlePhotoView"
                />
              </div>
            </div>
          </template>

          <!-- Empty Photos State -->
          <div
            v-else
            class="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-20 text-center"
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
          <div class="flex min-h-0 flex-1 flex-col">
            <div class="shrink-0 flex items-center justify-between border-b bg-background px-6 py-3">
              <div>
                <h3 class="text-sm font-semibold">
                  {{ currentSectionInfo?.title }}
                </h3>
                <p v-if="currentSectionInfo?.description" class="text-xs text-muted-foreground">
                  {{ currentSectionInfo?.description }}
                </p>
              </div>
            </div>
            <div class="flex-1 overflow-y-auto p-6">
              <CollectionDesignPreview
                :collection="collection"
                :section="collectionSidebar.activeSection || 'cover'"
              />
            </div>
          </div>
        </template>

        <!-- Settings Tab -->
        <template v-else-if="collectionSidebar.activeTab === 'settings'">
          <div class="flex min-h-0 flex-1 flex-col">
            <div class="shrink-0 flex items-center justify-between border-b bg-background px-6 py-3">
              <div>
                <h3 class="text-sm font-semibold">
                  {{ currentSectionInfo?.title }}
                </h3>
                <p v-if="currentSectionInfo?.description" class="text-xs text-muted-foreground">
                  {{ currentSectionInfo?.description }}
                </p>
              </div>
            </div>
            <div class="flex-1 overflow-y-auto p-6">
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
              <CollectionSettingsShopSettings
                v-else-if="collectionSidebar.activeSection === 'shop'"
                :collection="collection"
              />
            </div>
          </div>
        </template>

        <!-- Activity Tab -->
        <template v-else-if="collectionSidebar.activeTab === 'activity'">
          <div class="flex min-h-0 flex-1 flex-col">
            <div class="shrink-0 flex items-center justify-between border-b bg-background px-6 py-3">
              <div>
                <h3 class="text-sm font-semibold">
                  {{ currentSectionInfo?.title }}
                </h3>
                <p v-if="currentSectionInfo?.description" class="text-xs text-muted-foreground">
                  {{ currentSectionInfo?.description }}
                </p>
              </div>
            </div>
            <div class="flex-1 overflow-y-auto p-6">
              <CollectionActivityDownloadActivity
                v-if="collectionSidebar.activeSection === 'downloads' || !collectionSidebar.activeSection"
                :collection="collection"
              />
              <CollectionActivityFavoriteActivity
                v-else-if="collectionSidebar.activeSection === 'favorites'"
                :collection="collection"
              />
              <CollectionActivityShopOrders
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
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>

  <!-- Floating Bulk Actions Toolbar -->
  <GalleryBulkToolbar :total-count="demoPhotos.length" />

  <!-- Edit Collection Modal -->
  <GalleryCollectionModal
    v-model:open="isEditModalOpen"
    :collection="collection"
    @save="handleEditSave"
  />
</template>
