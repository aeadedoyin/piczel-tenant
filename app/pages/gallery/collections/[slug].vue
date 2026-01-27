<script setup lang="ts">
import type { Collection, CreateCollectionData, Photo } from '@/types/gallery'
import { toast } from 'vue-sonner'

const route = useRoute()
const router = useRouter()
const gallery = useGallery()

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

// Format date helper
function formatEventDate(dateString?: string): string {
  if (!dateString)
    return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Format relative date
function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0)
    return 'Today'
  if (diffDays === 1)
    return 'Yesterday'
  if (diffDays < 7)
    return `${diffDays} days ago`
  if (diffDays < 30)
    return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365)
    return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

// Get category display info
const categoryInfo = computed(() => {
  const categories: Record<string, { label: string, icon: string }> = {
    wedding: { label: 'Wedding', icon: 'heart' },
    portrait: { label: 'Portrait', icon: 'user' },
    event: { label: 'Event', icon: 'calendar' },
    nature: { label: 'Nature', icon: 'trees' },
    other: { label: 'Other', icon: 'folder' },
  }
  return categories[collection.value?.category || 'other'] || categories.other
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
    // TODO: Open photo viewer modal
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
  // TODO: Implement share functionality
  const shareUrl = `${window.location.origin}/gallery/${slug.value}`
  navigator.clipboard.writeText(shareUrl)
  toast.success('Link copied to clipboard')
}

// Fetch data
async function loadData() {
  isLoading.value = true

  // Ensure collections are loaded
  if (gallery.collections.length === 0) {
    await gallery.fetchCollections()
  }

  // Ensure photos are loaded
  if (gallery.photos.length === 0) {
    await gallery.fetchPhotos()
  }

  // Try to find the collection by id or slug
  // In a real app, we'd fetch by slug from API
  collection.value = gallery.collections.find(
    c => c.id === slug.value || c.title.toLowerCase().replace(/\s+/g, '-') === slug.value,
  ) || gallery.collections[0] || null

  if (collection.value) {
    photos.value = gallery.getPhotosByCollection(collection.value.id)
  }

  isLoading.value = false
}

// Set page title
useHead({
  title: computed(() =>
    collection.value ? `${collection.value.title} | Piczel` : 'Collection | Piczel',
  ),
})

onMounted(loadData)

// Reload when slug changes
watch(slug, loadData)
</script>

<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="isLoading" class="space-y-6">
      <!-- Hero Skeleton -->
      <div class="relative h-64 animate-pulse overflow-hidden rounded-xl bg-muted md:h-80" />

      <!-- Content Skeleton -->
      <div class="space-y-4">
        <div class="h-8 w-1/3 animate-pulse rounded bg-muted" />
        <div class="h-4 w-2/3 animate-pulse rounded bg-muted" />
        <div class="flex gap-4">
          <div class="h-10 w-24 animate-pulse rounded bg-muted" />
          <div class="h-10 w-24 animate-pulse rounded bg-muted" />
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
    <template v-else>
      <!-- Hero Section -->
      <div class="relative overflow-hidden rounded-xl bg-muted">
        <!-- Cover Image with Parallax Effect -->
        <div class="relative h-64 md:h-80 lg:h-96">
          <img
            v-if="collection.coverUrl"
            :alt="collection.title"
            class="size-full object-cover"
            :src="collection.coverUrl"
          >
          <div
            v-else
            class="flex size-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900"
          >
            <LucideImage class="size-24 text-muted-foreground/50" />
          </div>

          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <!-- Back Button -->
          <div class="absolute top-4 left-4">
            <ShadButton
              class="bg-black/30 text-white backdrop-blur-sm hover:bg-black/50"
              size="sm"
              variant="ghost"
              @click="router.push('/gallery/collections')"
            >
              <LucideArrowLeft class="mr-2 size-4" />
              Collections
            </ShadButton>
          </div>

          <!-- Top Right Actions -->
          <div class="absolute top-4 right-4 flex items-center gap-2">
            <!-- Password Protected Badge -->
            <div
              v-if="collection.password"
              class="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-sm text-white backdrop-blur-sm"
            >
              <LucideLock class="size-3.5" />
              <span>Protected</span>
            </div>

            <!-- Star Button -->
            <ShadButton
              class="bg-black/30 text-white backdrop-blur-sm hover:bg-black/50"
              size="icon"
              variant="ghost"
              @click="handleStar"
            >
              <LucideStar
                class="size-5"
                :class="{ 'fill-yellow-400 text-yellow-400': collection.starred }"
              />
            </ShadButton>
          </div>

          <!-- Content Overlay -->
          <div class="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
            <div class="flex items-end justify-between gap-4">
              <div class="min-w-0 flex-1">
                <!-- Status Badge -->
                <ShadBadge
                  class="mb-3"
                  :class="{
                    'bg-emerald-500/90': collection.status === 'published',
                    'bg-slate-500/90': collection.status === 'hidden',
                    'bg-amber-500/90': collection.status === 'draft',
                  }"
                  variant="secondary"
                >
                  <component
                    :is="collectionStatusConfig[collection.status].icon"
                    class="mr-1.5 size-3"
                  />
                  {{ collectionStatusConfig[collection.status].label }}
                </ShadBadge>

                <!-- Title -->
                <h1 class="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
                  {{ collection.title }}
                </h1>

                <!-- Meta Info -->
                <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/80">
                  <span class="flex items-center gap-1.5">
                    <LucideImages class="size-4" />
                    {{ collection.photoCount }} {{ collection.photoCount === 1 ? 'photo' : 'photos' }}
                  </span>
                  <span
                    v-if="collection.eventDate"
                    class="flex items-center gap-1.5"
                  >
                    <LucideCalendar class="size-4" />
                    {{ formatEventDate(collection.eventDate) }}
                  </span>
                  <span class="flex items-center gap-1.5 capitalize">
                    <LucideTag class="size-4" />
                    {{ categoryInfo?.label }}
                  </span>
                  <span class="flex items-center gap-1.5">
                    <LucideClock class="size-4" />
                    Updated {{ formatRelativeDate(collection.updatedAt) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Description & Actions Bar -->
      <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div class="min-w-0 flex-1">
          <p
            v-if="collection.description && collection.description !== '--'"
            class="text-muted-foreground"
          >
            {{ collection.description }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex shrink-0 flex-wrap items-center gap-2">
          <ShadButton
            size="sm"
            variant="outline"
            @click="handleShare"
          >
            <LucideShare2 class="mr-2 size-4" />
            Share
          </ShadButton>

          <ShadButton
            size="sm"
            variant="outline"
            @click="isEditModalOpen = true"
          >
            <LucidePencil class="mr-2 size-4" />
            Edit
          </ShadButton>

          <ShadDropdownMenu>
            <ShadDropdownMenuTrigger as-child>
              <ShadButton size="icon" variant="outline">
                <LucideEllipsis class="size-4" />
              </ShadButton>
            </ShadDropdownMenuTrigger>
            <ShadDropdownMenuContent align="end">
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
          class="flex items-center justify-between rounded-lg border bg-muted/50 p-3"
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
        class="flex items-center justify-between"
      >
        <h2 class="text-lg font-medium">
          Photos
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

      <!-- Photos Grid -->
      <GalleryPhotoGrid
        v-if="demoPhotos.length > 0"
        :columns="6"
        :photos="demoPhotos"
        :selected-ids="gallery.selectedPhotoIds"
        @select="handlePhotoSelect"
        @star="gallery.togglePhotoStar"
        @view="handlePhotoView"
      />

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

    <!-- Edit Collection Modal -->
    <GalleryCollectionModal
      v-model:open="isEditModalOpen"
      :collection="collection"
      @save="handleEditSave"
    />
  </div>
</template>
