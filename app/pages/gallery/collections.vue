<script setup lang="ts">
import type {
  Collection,
  CollectionCategory,
  CollectionFilters,
  CollectionStatus,
  CreateCollectionData,
} from '@/types/gallery'

definePageMeta({
  title: 'Collections',
})

const route = useRoute()
const router = useRouter()
const gallery = useGallery()

// Modal state
const isModalOpen = ref(false)
const editingCollection = ref<Collection | null>(null)

// Filter definitions
const filters = [
  {
    id: 'status',
    label: 'Status',
    options: ['All', 'Published', 'Hidden', 'Draft'] as const,
  },
  {
    id: 'category',
    label: 'Category',
    options: ['All', 'Wedding', 'Portrait', 'Event', 'Nature', 'Other'] as const,
  },
]

// Initialize from URL query params
function parseFiltersFromQuery(): Record<string, string[]> {
  const result: Record<string, string[]> = {
    status: [],
    category: [],
  }

  for (const filter of filters) {
    const queryValue = route.query[filter.id]
    if (queryValue && typeof queryValue === 'string') {
      result[filter.id] = queryValue.split(',')
    }
  }

  return result
}

const selectedFilters = ref<Record<string, string[]>>(parseFiltersFromQuery())

// Watch for route query changes
watch(
  () => route.query,
  () => {
    selectedFilters.value = parseFiltersFromQuery()

    // Check for new=true query param to open modal
    if (route.query.new === 'true') {
      editingCollection.value = null
      isModalOpen.value = true
      router.replace({ query: { ...route.query, new: undefined } })
    }
  },
  { immediate: true },
)

// Sync filters to URL
function updateUrl() {
  const query: Record<string, string | undefined> = {}

  for (const filter of filters) {
    const selected = selectedFilters.value[filter.id]
    if (selected && selected.length > 0) {
      query[filter.id] = selected.join(',')
    }
  }

  router.replace({ query })
}

function toggleFilter(filterId: string, value: string) {
  if (value === 'All') {
    selectedFilters.value[filterId] = []
    updateUrl()
    return
  }

  const current = selectedFilters.value[filterId] || []
  const index = current.indexOf(value)

  if (index === -1) {
    selectedFilters.value[filterId] = [...current, value]
  }
  else {
    selectedFilters.value[filterId] = current.filter(v => v !== value)
  }

  updateUrl()
}

function hasActiveFilter(filterId: string) {
  const selected = selectedFilters.value[filterId]
  return selected && selected.length > 0
}

function isSelected(filterId: string, option: string) {
  const selected = selectedFilters.value[filterId]
  if (option === 'All') {
    return !selected || selected.length === 0
  }
  return selected?.includes(option) || false
}

function getSelectedDisplay(filterId: string) {
  const selected = selectedFilters.value[filterId]
  if (!selected || selected.length === 0)
    return ''
  if (selected.length <= 2)
    return selected.join(', ')
  return `${selected.length} selected`
}

function clearFilters() {
  selectedFilters.value = { status: [], category: [] }
  updateUrl()
}

// Computed filtered collections
const hasFilters = computed(() => {
  const status = selectedFilters.value.status ?? []
  const category = selectedFilters.value.category ?? []
  return status.length > 0 || category.length > 0
})

const filteredCollections = computed(() => {
  const status = selectedFilters.value.status ?? []
  const category = selectedFilters.value.category ?? []
  const filterData: CollectionFilters = {
    status: status.map(s => s.toLowerCase()) as CollectionStatus[],
    category: category.map(c => c.toLowerCase()) as CollectionCategory[],
  }
  return gallery.filterCollections(filterData)
})

// Fetch data on mount
onMounted(async () => {
  await gallery.fetchCollections()
})

// Modal handlers
function openNewModal() {
  editingCollection.value = null
  isModalOpen.value = true
}

function handleEdit(collection: Collection) {
  editingCollection.value = collection
  isModalOpen.value = true
}

async function handleSave(data: CreateCollectionData) {
  if (editingCollection.value) {
    await gallery.updateCollection({ id: editingCollection.value.id, ...data })
  }
  else {
    await gallery.createCollection(data)
  }
  isModalOpen.value = false
  editingCollection.value = null
}

async function handleDelete(collectionId: string) {
  // TODO: Replace with proper confirmation dialog
  await gallery.deleteCollection(collectionId)
}

function handleView(collection: Collection) {
  router.push(`/gallery/collections/${collection.id}`)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">
          Collections
        </h1>
        <p class="text-muted-foreground">
          Organize your photos into collections.
        </p>
      </div>
      <ShadButton class="gap-2" @click="openNewModal">
        <LucidePlus class="size-4" />
        New Collection
      </ShadButton>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-2">
      <ShadDropdownMenu
        v-for="filter in filters"
        :key="filter.id"
        :close-on-select="false"
      >
        <ShadDropdownMenuTrigger as-child>
          <button
            class="
              inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5
              text-sm transition-colors
              hover:bg-muted
            "
            :class="
              hasActiveFilter(filter.id)
                ? 'border-emerald-500/30 bg-emerald-500/5'
                : 'border-border bg-background'
            "
          >
            <span>{{ filter.label }}<template v-if="hasActiveFilter(filter.id)">:</template></span>
            <span
              v-if="hasActiveFilter(filter.id)"
              class="text-xs font-semibold text-emerald-600"
            >
              {{ getSelectedDisplay(filter.id) }}
            </span>
            <LucideChevronDown class="size-3 text-muted-foreground" />
          </button>
        </ShadDropdownMenuTrigger>
        <ShadDropdownMenuContent align="start" class="min-w-32">
          <ShadDropdownMenuItem
            v-for="option in filter.options"
            :key="option"
            class="
              flex cursor-pointer items-center justify-between gap-6 py-1.5
              text-sm
            "
            @click.prevent="toggleFilter(filter.id, option)"
            @select.prevent
          >
            {{ option }}
            <LucideCheck
              v-if="isSelected(filter.id, option)"
              class="size-3.5 text-emerald-500"
            />
          </ShadDropdownMenuItem>
        </ShadDropdownMenuContent>
      </ShadDropdownMenu>

      <!-- Clear filters button -->
      <ShadButton
        v-if="hasFilters"
        class="h-8 px-2 text-muted-foreground"
        size="sm"
        variant="ghost"
        @click="clearFilters"
      >
        <LucideX class="mr-1 size-3" />
        Clear
      </ShadButton>
    </div>

    <!-- Empty State -->
    <GalleryEmptyCollections
      v-if="!gallery.isLoadingCollections && filteredCollections.length === 0"
      :has-filters="hasFilters"
      @clear-filters="clearFilters"
      @create="openNewModal"
    />

    <!-- Loading State -->
    <div
      v-else-if="gallery.isLoadingCollections"
      class="
        grid grid-cols-2 gap-4
        md:grid-cols-3
        xl:grid-cols-4
      "
    >
      <div
        v-for="i in 6"
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

    <!-- Collections Grid -->
    <div
      v-else
      class="
        grid grid-cols-2 gap-4
        md:grid-cols-3
        xl:grid-cols-4
      "
    >
      <GalleryCollectionCard
        v-for="collection in filteredCollections"
        :key="collection.id"
        :collection="collection"
        @delete="handleDelete"
        @edit="handleEdit"
        @star="gallery.toggleCollectionStar"
        @view="handleView"
      />
    </div>

    <!-- Collection Modal -->
    <GalleryCollectionModal
      v-model:open="isModalOpen"
      :collection="editingCollection"
      @save="handleSave"
    />
  </div>
</template>
