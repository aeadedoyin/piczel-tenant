import type { Component } from 'vue'
import type { NavItem } from '@/types/navigation'
import { icons } from '@/composables/useIconResolver'

export interface AppDefinition {
  id: string
  name: string
  description: string
  icon: Component
  url: string
}

/**
 * Dashboard app definition (shown separately in switcher)
 */
export function getDashboardApp(): AppDefinition {
  return {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Overview',
    icon: icons.LucideLayoutDashboard,
    url: '/dashboard',
  }
}

/**
 * Main apps available in the app switcher
 */
export function getApps(): AppDefinition[] {
  return [
    {
      id: 'gallery',
      name: 'Gallery',
      description: 'Photo management',
      icon: icons.LucideImage,
      url: '/gallery',
    },
    {
      id: 'studio',
      name: 'Studio',
      description: 'Client & project manager',
      icon: icons.LucideBriefcase,
      url: '/studio',
    },
    {
      id: 'website',
      name: 'Website',
      description: 'Site builder',
      icon: icons.LucideGlobe,
      url: '/website',
    },
    {
      id: 'store',
      name: 'Store',
      description: 'E-commerce',
      icon: icons.LucideShoppingBag,
      url: '/store',
    },
  ]
}

/**
 * App-specific navigation items for the sidebar
 */
export function getAppNavigation(): Record<string, NavItem[]> {
  return {
    dashboard: [
      {
        title: 'Overview',
        url: '/dashboard',
        icon: icons.LucideLayoutDashboard,
      },
      // TODO: Add these pages when implemented
      // {
      //   title: 'Analytics',
      //   url: '/dashboard/analytics',
      //   icon: icons.LucideBarChart3,
      // },
      // {
      //   title: 'Activity',
      //   url: '/dashboard/activity',
      //   icon: icons.LucideActivity,
      // },
    ],
    gallery: [
      {
        title: 'Overview',
        url: '/gallery',
        icon: icons.LucideLayoutDashboard,
      },
      {
        title: 'Collections',
        url: '/gallery/collections',
        icon: icons.LucideFolders,
        items: [
          { title: 'Published', url: '/gallery/collections?status=Published' },
          { title: 'Hidden', url: '/gallery/collections?status=Hidden' },
          { title: 'Draft', url: '/gallery/collections?status=Draft' },
        ],
      },
      {
        title: 'Starred',
        url: '/gallery/starred/collections',
        icon: icons.LucideStar,
        items: [
          { title: 'Collections', url: '/gallery/starred/collections' },
          { title: 'Photos', url: '/gallery/starred/photos' },
          { title: 'Videos', url: '/gallery/starred/videos' },
        ],
      },
      {
        title: 'Settings',
        url: '/gallery/settings',
        icon: icons.LucideSettings,
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
        icon: icons.LucideBriefcase,
      },
      {
        title: 'Projects',
        url: '/studio/projects',
        icon: icons.LucideFolderKanban,
      },
      {
        title: 'Contacts',
        url: '/studio/contacts',
        icon: icons.LucideUsers,
      },
      {
        title: 'Bookings',
        url: '/studio/bookings',
        icon: icons.LucideCalendarDays,
      },
      {
        title: 'Payments',
        url: '/studio/payments',
        icon: icons.LucideCreditCard,
      },
    ],
    website: [
      {
        title: 'Overview',
        url: '/website',
        icon: icons.LucideGlobe,
      },
      {
        title: 'Edit Site',
        url: '/website/edit',
        icon: icons.LucidePenSquare,
      },
      // TODO: Add pages page when implemented
      // {
      //   title: 'Pages',
      //   url: '/website/pages',
      //   icon: icons.LucideFileText,
      // },
      {
        title: 'Settings',
        url: '/website/settings',
        icon: icons.LucideSettings,
      },
    ],
    store: [
      {
        title: 'Overview',
        url: '/store',
        icon: icons.LucideShoppingBag,
      },
      {
        title: 'Orders',
        url: '/store/orders',
        icon: icons.LucidePackage,
      },
      {
        title: 'Catalog',
        url: '/store/catalog',
        icon: icons.LucideGrid3x3,
      },
      // TODO: Add customers page when implemented
      // {
      //   title: 'Customers',
      //   url: '/store/customers',
      //   icon: icons.LucideUsers,
      // },
    ],
  }
}

/**
 * Secondary navigation items (bottom of sidebar)
 */
export function getNavSecondary(): NavItem[] {
  return [
    // TODO: Add settings page when implemented
    // {
    //   title: 'Settings',
    //   url: '/settings',
    //   icon: icons.LucideSettings,
    // },
    {
      title: 'Help & Support',
      url: 'https://help.piczel.io',
      icon: icons.LucideLifeBuoy,
      external: true,
    },
    // TODO: Add feedback page when implemented
    // {
    //   title: 'Feedback',
    //   url: '/feedback',
    //   icon: icons.LucideMessageSquare,
    // },
  ]
}

/**
 * Determine the active app ID from a route path
 */
export function getActiveAppId(path: string): string {
  if (path.startsWith('/gallery'))
    return 'gallery'
  if (path.startsWith('/studio'))
    return 'studio'
  if (path.startsWith('/website'))
    return 'website'
  if (path.startsWith('/store'))
    return 'store'
  return 'dashboard'
}
