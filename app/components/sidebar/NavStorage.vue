<script setup lang="ts">
// TODO: Replace with real data from API
const storage = reactive({
  used: 2.4, // GB
  total: 5, // GB
})

const percentage = computed(() => Math.round((storage.used / storage.total) * 100))
</script>

<template>
  <ShadSidebarGroup class="group-data-[collapsible=icon]:hidden">
    <ShadSidebarGroupContent>
      <ShadSidebarMenu>
        <ShadSidebarMenuItem>
          <div class="flex flex-col gap-2 px-2 py-1.5">
            <div class="flex items-center justify-between text-xs">
              <div class="flex items-center gap-2 text-muted-foreground">
                <LucideHardDrive class="size-3.5" />
                <span>Storage</span>
              </div>
              <span class="text-muted-foreground">
                {{ formatSizeGB(storage.used) }} / {{ formatSizeGB(storage.total) }}
              </span>
            </div>
            <ShadProgress class="h-1.5" :model-value="percentage" />
            <!-- TODO: Add settings/storage page when implemented -->
            <span
              class="text-xs text-muted-foreground cursor-not-allowed"
            >
              Upgrade storage
            </span>
          </div>
        </ShadSidebarMenuItem>
      </ShadSidebarMenu>
    </ShadSidebarGroupContent>
  </ShadSidebarGroup>
</template>
