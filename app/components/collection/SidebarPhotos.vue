<script setup lang="ts">
import { LucideGripVertical, LucidePlus } from '#components'

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

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
        class="group flex w-full items-center gap-2 rounded-md px-1.5 py-1.5 text-sm transition-colors hover:bg-accent/50"
        @click="scrollToSection(section.id)"
      >
        <LucideGripVertical class="size-3.5 shrink-0 text-muted-foreground/50 cursor-grab" />
        <span class="truncate text-left text-foreground">{{ section.name }}</span>
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
