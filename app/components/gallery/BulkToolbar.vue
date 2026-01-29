<script setup lang="ts">
const props = defineProps<{
  totalCount: number
}>()

const gallery = useGallery()

const selectedCount = computed(() => gallery.selectedPhotoIds.size)
const hasSelection = computed(() => selectedCount.value > 0)
const allSelected = computed(() =>
  props.totalCount > 0 && selectedCount.value === props.totalCount,
)

function handleSelectAll() {
  if (allSelected.value) {
    gallery.clearSelection()
  }
  else {
    gallery.selectAll()
  }
}

function handleClose() {
  gallery.clearSelection()
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="hasSelection"
      class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border bg-background px-6 py-4 shadow-lg"
    >
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3">
          <ShadCheckbox
            :checked="allSelected"
            :indeterminate="hasSelection && !allSelected"
            @update:checked="handleSelectAll"
          />
          <span class="text-sm font-medium">
            {{ selectedCount }} {{ selectedCount === 1 ? 'photo' : 'photos' }} selected
          </span>
        </div>

        <div class="h-4 w-px bg-border" />

        <div class="flex items-center gap-2">
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
          <ShadButton size="sm" variant="destructive">
            <LucideTrash2 class="mr-2 size-4" />
            Delete
          </ShadButton>
          <ShadButton
            size="sm"
            variant="ghost"
            @click="handleClose"
          >
            <LucideX class="size-4" />
          </ShadButton>
        </div>
      </div>
    </div>
  </Transition>
</template>
