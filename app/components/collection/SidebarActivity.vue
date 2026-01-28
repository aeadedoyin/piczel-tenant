<script setup lang="ts">
import {
  LucideDownload,
  LucideHeart,
  LucideLink,
  LucideLock,
  LucideMail,
  LucideShoppingCart,
} from '#components'

const collectionSidebar = useCollectionSidebar()

const items = [
  { id: 'downloads', label: 'Download Activity', icon: LucideDownload },
  { id: 'favorites', label: 'Favorite Activity', icon: LucideHeart },
  { id: 'orders', label: 'Store Orders', icon: LucideShoppingCart },
  { id: 'email', label: 'Email Registration', icon: LucideMail },
  { id: 'share-links', label: 'Quick Share Links', icon: LucideLink },
  { id: 'private-photos', label: 'Private Photos', icon: LucideLock },
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
