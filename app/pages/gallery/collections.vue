<script setup lang="ts">
import { Button } from '@/components/shadcn-ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu'

definePageMeta({
  title: 'Collections',
})

const route = useRoute()
const router = useRouter()

const filters = [
  { id: 'status', label: 'Status', options: ['All', 'Published', 'Hidden', 'Draft'] },
  { id: 'category', label: 'Category Tag', options: ['All', 'Wedding', 'Portrait', 'Event', 'Commercial'] },
  { id: 'eventDate', label: 'Event Date', options: ['All', 'This Week', 'This Month', 'This Year', 'Custom'] },
  { id: 'expiryDate', label: 'Expiry Date', options: ['All', 'Expiring Soon', 'Expired', 'No Expiry'] },
  { id: 'starred', label: 'Starred', options: ['All', 'Starred', 'Not Starred'] },
]

// Initialize from URL query params
function parseFiltersFromQuery(): Record<string, string[]> {
  const result: Record<string, string[]> = {
    status: [],
    category: [],
    eventDate: [],
    expiryDate: [],
    starred: [],
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

// Watch for route query changes (e.g., when clicking sidebar links)
watch(() => route.query, () => {
  selectedFilters.value = parseFiltersFromQuery()
}, { immediate: false })

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
  } else {
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
  if (!selected || selected.length === 0) return ''
  if (selected.length <= 2) return selected.join(', ')
  return `${selected.length} selected`
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
      <Button class="gap-2">
        <LucidePlus class="size-4" />
        New Collection
      </Button>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-2">
      <DropdownMenu v-for="filter in filters" :key="filter.id" :close-on-select="false">
        <DropdownMenuTrigger as-child>
          <button
            class="
              inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5
              text-sm transition-colors hover:bg-muted
            "
            :class="hasActiveFilter(filter.id)
              ? 'border-emerald-500/30 bg-emerald-500/5'
              : 'border-border bg-background'"
          >
            <span>{{ filter.label }}<template v-if="hasActiveFilter(filter.id)">:</template></span>
            <span v-if="hasActiveFilter(filter.id)" class="text-xs font-semibold text-emerald-600">
              {{ getSelectedDisplay(filter.id) }}
            </span>
            <LucideChevronDown class="size-3 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" class="min-w-32">
          <DropdownMenuItem
            v-for="option in filter.options"
            :key="option"
            class="flex cursor-pointer items-center justify-between gap-6 py-1.5 text-sm"
            @click.prevent="toggleFilter(filter.id, option)"
            @select.prevent
          >
            {{ option }}
            <LucideCheck v-if="isSelected(filter.id, option)" class="size-3.5 text-emerald-500" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <!-- Placeholder Grid -->
    <div
      class="
        grid gap-4
        md:grid-cols-2
        lg:grid-cols-3
      "
    >
      <div
        v-for="i in 6" :key="i" class="
          group overflow-hidden rounded-xl border bg-card
        "
      >
        <div class="aspect-video bg-muted" />
        <div class="p-4">
          <h3 class="font-medium">
            Collection {{ i }}
          </h3>
          <p class="text-sm text-muted-foreground">
            24 photos
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
