<script setup lang="ts">
import {
  LucideDownload,
  LucideHeart,
  LucideSettings,
  LucideShield,
  LucideShoppingBag,
} from '#components'

const collectionSidebar = useCollectionSidebar()

const items = [
  { id: 'general', label: 'General', icon: LucideSettings, enabled: true },
  { id: 'privacy', label: 'Privacy', icon: LucideShield, enabled: true },
  { id: 'download', label: 'Download', icon: LucideDownload, enabled: true },
  { id: 'favorite', label: 'Favorite', icon: LucideHeart, enabled: false },
  { id: 'store', label: 'Store', icon: LucideShoppingBag, enabled: false },
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
      <span class="flex-1 text-left">{{ item.label }}</span>
      <ShadBadge
        class="text-[10px] h-5 px-1.5 font-normal"
        :variant="item.enabled ? 'default' : 'secondary'"
      >
        {{ item.enabled ? 'ON' : 'OFF' }}
      </ShadBadge>
    </button>
  </nav>
</template>
