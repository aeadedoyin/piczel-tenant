<script setup lang="ts">
</script>

<template>
  <SidebarMain />
  <ShadSidebarInset>
    <header
      class="
        flex h-16 shrink-0 items-center gap-2 transition-[width,height]
        ease-linear
        group-has-data-[collapsible=icon]/sidebar-wrapper:h-12
      "
    >
      <div class="flex items-center gap-2 px-4">
        <ShadSidebarTrigger class="-ml-1" />
        <ShadSeparator class="mr-2 h-4" orientation="vertical" />
        <SidebarBreadcrumb />
      </div>
    </header>
    <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
      <slot />
    </main>
  </ShadSidebarInset>
</template>
