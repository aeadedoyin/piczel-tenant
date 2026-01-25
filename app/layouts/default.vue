<script setup lang="ts">
</script>

<template>
  <ShadSidebarProvider class="bg-sidebar">
    <SidebarMain />
    <LayoutMainContent>
      <slot />
    </LayoutMainContent>
  </ShadSidebarProvider>
</template>
