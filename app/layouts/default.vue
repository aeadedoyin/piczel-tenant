<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <AppSidebar />
  <SidebarInset>
    <header
      class="
        flex h-16 shrink-0 items-center gap-2 transition-[width,height]
        ease-linear
        group-has-data-[collapsible=icon]/sidebar-wrapper:h-12
      "
    >
      <div class="flex items-center gap-2 px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator class="mr-2 h-4" orientation="vertical" />
        <AppBreadcrumb />
      </div>
    </header>
    <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
      <slot />
    </main>
  </SidebarInset>
</template>
