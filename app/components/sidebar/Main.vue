<script setup lang="ts">
import type { NavItem } from '~/types/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

const auth = useAuth()

// Computed user data from auth store with fallback
const user = computed(() => ({
  name: auth.user?.name || 'Guest',
  email: auth.user?.email || '',
  avatar: auth.user?.avatar || '',
}))

// Main navigation items (collapsible groups)
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
      { title: 'All Photos', url: '/gallery' },
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
      { title: 'Overview', url: '/studio' },
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
      { title: 'Overview', url: '/website' },
      { title: 'Edit Site', url: '/website/edit' },
      { title: 'Pages', url: '/website/pages' },
      { title: 'Settings', url: '/website/settings' },
    ],
  },
  {
    title: 'Store',
    url: '/store',
    icon: resolveComponent('LucideShoppingBag'),
    items: [
      { title: 'Overview', url: '/store' },
      { title: 'Orders', url: '/store/orders' },
      { title: 'Catalog', url: '/store/catalog' },
      { title: 'Customers', url: '/store/customers' },
    ],
  },
]

// Secondary navigation items (bottom of sidebar content)
const navSecondary = [
  {
    title: 'Settings',
    url: '/settings',
    icon: resolveComponent('LucideSettings'),
  },
  {
    title: 'Help & Support',
    url: 'https://help.piczel.io',
    icon: resolveComponent('LucideLifeBuoy'),
    external: true,
  },
  {
    title: 'Feedback',
    url: '/feedback',
    icon: resolveComponent('LucideMessageSquare'),
  },
]
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarSwitcher />
    </SidebarHeader>

    <SidebarContent>
      <SidebarNav :items="navMain" />
      <SidebarNavSecondary :items="navSecondary" />
      <SidebarNavStorage />
    </SidebarContent>

    <SidebarFooter>
      <SidebarNavUser :user="user" />
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>
