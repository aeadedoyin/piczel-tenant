<script setup lang="ts">
import { LucideGripVertical, LucidePlus } from '#components'

const props = defineProps<{
  sectionPhotoCounts: Record<string, number>
}>()

const collectionSidebar = useCollectionSidebar()

// Modal state
const isModalOpen = ref(false)
const newSection = reactive({
  name: '',
  description: '',
})

function openModal() {
  newSection.name = ''
  newSection.description = ''
  isModalOpen.value = true
}

function handleSave() {
  if (!newSection.name.trim())
    return

  collectionSidebar.addSection(newSection.name, newSection.description)
  isModalOpen.value = false
}

function selectSection(sectionId: string) {
  collectionSidebar.setActivePhotoSection(sectionId)
}

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
    return `${diffDays}d ago`
  if (diffDays < 30)
    return `${Math.floor(diffDays / 7)}w ago`
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <div class="space-y-1">
    <!-- Header -->
    <div class="flex items-center justify-between px-1 pb-2">
      <span class="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Media
      </span>
      <button
        class="flex items-center justify-center size-5 rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        @click="openModal"
      >
        <LucidePlus class="size-3.5" />
      </button>
    </div>

    <!-- Sections list -->
    <div v-if="collectionSidebar.photoSections.length > 0" class="space-y-0.5">
      <button
        v-for="section in collectionSidebar.photoSections"
        :key="section.id"
        class="group flex w-full items-center gap-2 rounded-md px-1.5 py-2 text-sm transition-colors"
        :class="[
          collectionSidebar.activePhotoSection === section.id
            ? 'bg-accent text-accent-foreground font-medium'
            : 'hover:bg-accent/50',
        ]"
        @click="selectSection(section.id)"
      >
        <LucideGripVertical class="size-3.5 shrink-0 text-muted-foreground/50 cursor-grab" />
        <div class="flex flex-col items-start min-w-0 flex-1">
          <span class="truncate text-left w-full">
            {{ section.name }}
            <span class="text-muted-foreground font-normal">({{ props.sectionPhotoCounts[section.id] || 0 }})</span>
          </span>
          <span class="text-[10px] text-muted-foreground">{{ formatRelativeDate(section.createdAt) }}</span>
        </div>
      </button>
    </div>

    <!-- Empty state -->
    <div v-else class="flex flex-col items-center py-6 text-center">
      <LucideGripVertical class="size-8 text-muted-foreground/40 mb-2" />
      <p class="text-xs text-muted-foreground">
        No sections yet
      </p>
    </div>
  </div>

  <!-- Add Section Modal -->
  <ShadDialog v-model:open="isModalOpen">
    <ShadDialogContent class="sm:max-w-md">
      <ShadDialogHeader>
        <ShadDialogTitle>New Section</ShadDialogTitle>
        <ShadDialogDescription>
          Add a section to organize photos in this collection.
        </ShadDialogDescription>
      </ShadDialogHeader>

      <div class="space-y-4 py-2">
        <div class="space-y-2">
          <ShadLabel for="section-name">
            Name
          </ShadLabel>
          <ShadInput
            id="section-name"
            v-model="newSection.name"
            placeholder="e.g. Ceremony, Reception"
          />
        </div>

        <div class="space-y-2">
          <ShadLabel for="section-description">
            Description
          </ShadLabel>
          <ShadTextarea
            id="section-description"
            v-model="newSection.description"
            placeholder="Optional description..."
            :rows="2"
          />
        </div>
      </div>

      <ShadDialogFooter>
        <ShadDialogClose as-child>
          <ShadButton variant="outline">
            Cancel
          </ShadButton>
        </ShadDialogClose>
        <ShadButton :disabled="!newSection.name.trim()" @click="handleSave">
          Save
        </ShadButton>
      </ShadDialogFooter>
    </ShadDialogContent>
  </ShadDialog>
</template>
