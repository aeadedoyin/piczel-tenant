<script setup lang="ts">
import { SidebarProvider } from '@/components/shadcn-ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ShadToaster />
  </SidebarProvider>
</template>
