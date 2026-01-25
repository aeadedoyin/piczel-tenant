<script setup lang="ts">
</script>

<template>
  <ShadSidebarProvider class="bg-sidebar">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ShadToaster />
  </ShadSidebarProvider>
</template>
