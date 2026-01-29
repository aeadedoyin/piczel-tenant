<script setup lang="ts">
import type { Collection } from '@/types/gallery'
import {
  LucideImage,
  LucideLayoutGrid,
  LucidePalette,
  LucideType,
} from '#components'

const props = defineProps<{
  collection: Collection
  section: string
}>()

interface SectionInfo {
  title: string
  description: string
  icon: Component
}

const defaultSection: SectionInfo = {
  title: 'Cover Design',
  description: 'Customize the cover image, layout, and style of your collection.',
  icon: LucideImage,
}

const sectionLabels: Record<string, SectionInfo> = {
  cover: defaultSection,
  typography: {
    title: 'Typography',
    description: 'Choose fonts and text styles for your collection page.',
    icon: LucideType,
  },
  color: {
    title: 'Color',
    description: 'Set the color palette and theme for your collection.',
    icon: LucidePalette,
  },
  grid: {
    title: 'Grid Layout',
    description: 'Configure how photos are displayed in the grid.',
    icon: LucideLayoutGrid,
  },
}

const currentSection = computed((): SectionInfo => sectionLabels[props.section] ?? defaultSection)
</script>

<template>
  <div class="space-y-6">
    <!-- Placeholder -->
    <div class="flex flex-col items-center py-16 text-center">
      <div class="mb-4 rounded-full bg-muted p-4">
        <component :is="currentSection.icon" class="size-8 text-muted-foreground" />
      </div>
      <h4 class="mb-1 text-sm font-medium">
        Coming Soon
      </h4>
      <p class="max-w-sm text-xs text-muted-foreground">
        Design customization for {{ currentSection.title.toLowerCase() }} is being built.
        This will allow you to fully customize how your collection looks to visitors.
      </p>
    </div>
  </div>
</template>
