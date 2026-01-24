<script setup lang="ts">
import type { NavItem } from '~/types/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/shadcn-ui/sidebar'

const route = useRoute()
const auth = useAuth()

// Computed user data from auth store with fallback
const user = computed(() => ({
  name: auth.user?.name || 'Guest',
  email: auth.user?.email || '',
  avatar: auth.user?.avatar || '',
}))

// App-specific navigation items
const appNavigation: Record<string, NavItem[]> = {
  dashboard: [
    {
      title: 'Overview',
      url: '/dashboard',
      icon: resolveComponent('LucideLayoutDashboard'),
    },
    {
      title: 'Analytics',
      url: '/dashboard/analytics',
      icon: resolveComponent('LucideBarChart3'),
    },
    {
      title: 'Activity',
      url: '/dashboard/activity',
      icon: resolveComponent('LucideActivity'),
    },
  ],
  gallery: [
    {
      title: 'All Media',
      url: '/gallery',
      icon: resolveComponent('LucideImage'),
      items: [
        { title: 'Photos', url: '/gallery/photos' },
        { title: 'Videos', url: '/gallery/videos' },
      ],
    },
    {
      title: 'Collections',
      url: '/gallery/collections',
      icon: resolveComponent('LucideFolders'),
      items: [
        { title: 'Published', url: '/gallery/collections?status=Published' },
        { title: 'Hidden', url: '/gallery/collections?status=Hidden' },
        { title: 'Draft', url: '/gallery/collections?status=Draft' },
      ],
    },
    {
      title: 'Starred',
      url: '/gallery/starred',
      icon: resolveComponent('LucideStar'),
      items: [
        { title: 'Collections', url: '/gallery/starred/collections' },
        { title: 'Photos', url: '/gallery/starred/photos' },
        { title: 'Videos', url: '/gallery/starred/videos' },
      ],
    },
    {
      title: 'Settings',
      url: '/gallery/settings',
      icon: resolveComponent('LucideSettings'),
      items: [
        { title: 'Branding', url: '/gallery/settings/branding' },
        { title: 'Watermark Presets', url: '/gallery/settings/watermarks' },
        { title: 'Email Templates', url: '/gallery/settings/emails' },
        { title: 'Preferences', url: '/gallery/settings/preferences' },
        { title: 'Integrations', url: '/gallery/settings/integrations' },
      ],
    },
  ],
  studio: [
    {
      title: 'Overview',
      url: '/studio',
      icon: resolveComponent('LucideBriefcase'),
    },
    {
      title: 'Projects',
      url: '/studio/projects',
      icon: resolveComponent('LucideFolderKanban'),
    },
    {
      title: 'Contacts',
      url: '/studio/contacts',
      icon: resolveComponent('LucideUsers'),
    },
    {
      title: 'Bookings',
      url: '/studio/bookings',
      icon: resolveComponent('LucideCalendarDays'),
    },
    {
      title: 'Payments',
      url: '/studio/payments',
      icon: resolveComponent('LucideCreditCard'),
    },
  ],
  website: [
    {
      title: 'Overview',
      url: '/website',
      icon: resolveComponent('LucideGlobe'),
    },
    {
      title: 'Edit Site',
      url: '/website/edit',
      icon: resolveComponent('LucidePenSquare'),
    },
    {
      title: 'Pages',
      url: '/website/pages',
      icon: resolveComponent('LucideFileText'),
    },
    {
      title: 'Settings',
      url: '/website/settings',
      icon: resolveComponent('LucideSettings'),
    },
  ],
  store: [
    {
      title: 'Overview',
      url: '/store',
      icon: resolveComponent('LucideShoppingBag'),
    },
    {
      title: 'Orders',
      url: '/store/orders',
      icon: resolveComponent('LucidePackage'),
    },
    {
      title: 'Catalog',
      url: '/store/catalog',
      icon: resolveComponent('LucideGrid3x3'),
    },
    {
      title: 'Customers',
      url: '/store/customers',
      icon: resolveComponent('LucideUsers'),
    },
  ],
}

// Get active app based on current route
const activeAppId = computed(() => {
  const path = route.path
  if (path.startsWith('/gallery')) return 'gallery'
  if (path.startsWith('/studio')) return 'studio'
  if (path.startsWith('/website')) return 'website'
  if (path.startsWith('/store')) return 'store'
  return 'dashboard'
})

// Get navigation items for active app
const navItems = computed(() => appNavigation[activeAppId.value] || [])

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
      <SidebarNav :items="navItems" />
      <SidebarNavSecondary :items="navSecondary" />
      <SidebarNavStorage />
    </SidebarContent>

    <SidebarFooter>
      <SidebarNavUser :user="user" />
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>
