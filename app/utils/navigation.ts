import type { NavItem } from '@/types/navigation'

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
    icon: LucidIcons.LucideLayoutDashboard,
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
      icon: LucidIcons.LucideImage,
      url: '/gallery',
    },
    {
      id: 'studio',
      name: 'Studio',
      description: 'Client & project manager',
      icon: LucidIcons.LucideBriefcase,
      url: '/studio',
    },
    {
      id: 'website',
      name: 'Website',
      description: 'Site builder',
      icon: LucidIcons.LucideGlobe,
      url: '/website',
    },
    {
      id: 'store',
      name: 'Store',
      description: 'E-commerce',
      icon: LucidIcons.LucideShoppingBag,
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
        icon: LucidIcons.LucideLayoutDashboard,
      },
      // TODO: Add these pages when implemented
      // {
      //   title: 'Analytics',
      //   url: '/dashboard/analytics',
      //   icon: LucidIcons.LucideBarChart3,
      // },
      // {
      //   title: 'Activity',
      //   url: '/dashboard/activity',
      //   icon: LucidIcons.LucideActivity,
      // },
    ],
    gallery: [
      {
        title: 'Overview',
        url: '/gallery',
        icon: LucidIcons.LucideLayoutDashboard,
      },
      {
        title: 'Collections',
        url: '/gallery/collections',
        icon: LucidIcons.LucideFolders,
        items: [
          { title: 'Published', url: '/gallery/collections?status=Published' },
          { title: 'Hidden', url: '/gallery/collections?status=Hidden' },
          { title: 'Draft', url: '/gallery/collections?status=Draft' },
        ],
      },
      {
        title: 'Starred',
        url: '/gallery/starred/collections',
        icon: LucidIcons.LucideStar,
        items: [
          { title: 'Collections', url: '/gallery/starred/collections' },
          { title: 'Photos', url: '/gallery/starred/photos' },
          { title: 'Videos', url: '/gallery/starred/videos' },
        ],
      },
      {
        title: 'Settings',
        url: '/gallery/settings',
        icon: LucidIcons.LucideSettings,
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
        icon: LucidIcons.LucideBriefcase,
      },
      {
        title: 'Projects',
        url: '/studio/projects',
        icon: LucidIcons.LucideFolderKanban,
      },
      {
        title: 'Contacts',
        url: '/studio/contacts',
        icon: LucidIcons.LucideUsers,
      },
      {
        title: 'Bookings',
        url: '/studio/bookings',
        icon: LucidIcons.LucideCalendarDays,
      },
      {
        title: 'Payments',
        url: '/studio/payments',
        icon: LucidIcons.LucideCreditCard,
      },
    ],
    website: [
      {
        title: 'Overview',
        url: '/website',
        icon: LucidIcons.LucideGlobe,
      },
      {
        title: 'Edit Site',
        url: '/website/edit',
        icon: LucidIcons.LucidePenSquare,
      },
      // TODO: Add pages page when implemented
      // {
      //   title: 'Pages',
      //   url: '/website/pages',
      //   icon: LucidIcons.LucideFileText,
      // },
      {
        title: 'Settings',
        url: '/website/settings',
        icon: LucidIcons.LucideSettings,
      },
    ],
    store: [
      {
        title: 'Overview',
        url: '/store',
        icon: LucidIcons.LucideShoppingBag,
      },
      {
        title: 'Orders',
        url: '/store/orders',
        icon: LucidIcons.LucidePackage,
      },
      {
        title: 'Catalog',
        url: '/store/catalog',
        icon: LucidIcons.LucideGrid3x3,
      },
      // TODO: Add customers page when implemented
      // {
      //   title: 'Customers',
      //   url: '/store/customers',
      //   icon: LucidIcons.LucideUsers,
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
    //   icon: LucidIcons.LucideSettings,
    // },
    {
      title: 'Help & Support',
      url: 'https://help.piczel.io',
      icon: LucidIcons.LucideLifeBuoy,
      external: true,
    },
    // TODO: Add feedback page when implemented
    // {
    //   title: 'Feedback',
    //   url: '/feedback',
    //   icon: LucidIcons.LucideMessageSquare,
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
