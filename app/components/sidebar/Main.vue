<script setup lang="ts">
const route = useRoute()
const auth = useAuth()

// Computed user data from auth store with fallback
const user = computed(() => ({
  name: auth.user?.name || 'Guest',
  email: auth.user?.email || '',
  avatar: auth.user?.avatar || '',
}))

// Navigation data from utils
const appNavigation = getAppNavigation()
const navSecondary = getNavSecondary()

// Get active app based on current route
const activeAppId = computed(() => getActiveAppId(route.path))

// Get navigation items for active app
const navItems = computed(() => appNavigation[activeAppId.value] || [])
</script>

<template>
  <ShadSidebar variant="inset">
    <ShadSidebarHeader>
      <SidebarSwitcher />
    </ShadSidebarHeader>

    <ShadSidebarContent>
      <SidebarNav :items="navItems" />
      <SidebarNavSecondary :items="navSecondary" />
      <SidebarNavStorage />
    </ShadSidebarContent>

    <ShadSidebarFooter>
      <SidebarNavUser :user="user" />
    </ShadSidebarFooter>

    <ShadSidebarRail class="hover:after:bg-transparent" />
  </ShadSidebar>
</template>
