<script setup lang="ts">
import type { NavItem, User } from '~/types/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

// Mock user data (will be replaced with auth store)
const user: User = {
  name: 'John Photographer',
  email: 'john@example.com',
  avatar: '',
}

// Navigation items
const navMain: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: resolveComponent('LucideLayoutDashboard'),
  },
  {
    title: 'Gallery',
    url: '/gallery',
    icon: resolveComponent('LucideImage'),
    items: [
      { title: 'Collections', url: '/gallery/collections' },
      { title: 'Starred', url: '/gallery/starred' },
      { title: 'Settings', url: '/gallery/settings' },
    ],
  },
  {
    title: 'Studio',
    url: '/studio',
    icon: resolveComponent('LucideBriefcase'),
    items: [
      { title: 'Projects', url: '/studio/projects' },
      { title: 'Contacts', url: '/studio/contacts' },
      { title: 'Bookings', url: '/studio/bookings' },
      { title: 'Payments', url: '/studio/payments' },
    ],
  },
  {
    title: 'Website',
    url: '/website',
    icon: resolveComponent('LucideGlobe'),
    items: [
      { title: 'Edit Site', url: '/website/edit' },
      { title: 'Settings', url: '/website/settings' },
    ],
  },
  {
    title: 'Store',
    url: '/store',
    icon: resolveComponent('LucideShoppingBag'),
    items: [
      { title: 'Orders', url: '/store/orders' },
      { title: 'Catalog', url: '/store/catalog' },
    ],
  },
]
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton as-child size="lg">
            <NuxtLink to="/dashboard">
              <div
                class="
                  bg-sidebar-primary text-sidebar-primary-foreground flex
                  aspect-square size-8 items-center justify-center rounded-lg
                "
              >
                <LucideCamera class="size-4" />
              </div>
              <div class="grid flex-1 text-left text-sm/tight">
                <span class="truncate font-semibold">Piczel</span>
                <span class="truncate text-xs">Photography Studio</span>
              </div>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <NavMain :items="navMain" />
    </SidebarContent>

    <SidebarFooter>
      <NavUser :user="user" />
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>
