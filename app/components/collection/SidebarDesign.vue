<script setup lang="ts">
import {
  LucideImage,
  LucideLayoutGrid,
  LucidePalette,
  LucideType,
} from '#components'

const collectionSidebar = useCollectionSidebar()

const items = [
  { id: 'cover', label: 'Cover', icon: LucideImage },
  { id: 'typography', label: 'Typography', icon: LucideType },
  { id: 'color', label: 'Color', icon: LucidePalette },
  { id: 'grid', label: 'Grid', icon: LucideLayoutGrid },
]
</script>

<template>
  <nav class="space-y-0.5">
    <button
      v-for="item in items"
      :key="item.id"
      class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors"
      :class="[
        collectionSidebar.activeSection === item.id
          ? 'bg-accent text-accent-foreground font-medium'
          : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
      ]"
      @click="collectionSidebar.setSection(item.id)"
    >
      <component
        :is="item.icon"
        class="size-4 shrink-0"
      />
      <span>{{ item.label }}</span>
    </button>
  </nav>
</template>
