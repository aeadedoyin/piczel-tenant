<script setup lang="ts">
import { Progress } from '@/components/shadcn-ui/progress'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/shadcn-ui/sidebar'

// TODO: Replace with real data from API
const storage = reactive({
  used: 2.4, // GB
  total: 5, // GB
})

const percentage = computed(() => Math.round((storage.used / storage.total) * 100))

function formatSize(gb: number): string {
  if (gb < 1) {
    return `${Math.round(gb * 1024)} MB`
  }
  return `${gb.toFixed(1)} GB`
}
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <div class="flex flex-col gap-2 px-2 py-1.5">
            <div class="flex items-center justify-between text-xs">
              <div class="flex items-center gap-2 text-muted-foreground">
                <LucideHardDrive class="size-3.5" />
                <span>Storage</span>
              </div>
              <span class="text-muted-foreground">
                {{ formatSize(storage.used) }} / {{ formatSize(storage.total) }}
              </span>
            </div>
            <Progress class="h-1.5" :model-value="percentage" />
            <NuxtLink
              class="
                text-xs text-muted-foreground transition-colors
                hover:text-foreground
              "
              to="/settings/storage"
            >
              Upgrade storage
            </NuxtLink>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
