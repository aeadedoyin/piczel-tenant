import type { CollectionCategory, CollectionStatus } from '@/types/gallery'

export interface StatusConfig {
  label: string
  variant: 'default' | 'secondary' | 'outline'
  icon: string
}

export interface SelectOption<T = string> {
  value: T
  label: string
}

export interface FilterDefinition {
  id: string
  label: string
  options: readonly string[]
}

/**
 * Status configuration for collection badges
 */
export const collectionStatusConfig: Record<CollectionStatus, StatusConfig> = {
  published: { label: 'Published', variant: 'default', icon: 'LucideEye' },
  hidden: { label: 'Hidden', variant: 'secondary', icon: 'LucideEyeOff' },
  draft: { label: 'Draft', variant: 'outline', icon: 'LucideFileEdit' },
}

/**
 * Status options for collection form select
 */
export const collectionStatusOptions: SelectOption<CollectionStatus>[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'hidden', label: 'Hidden' },
]

/**
 * Category options for collection form select
 */
export const collectionCategoryOptions: SelectOption<CollectionCategory>[] = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'event', label: 'Event' },
  { value: 'nature', label: 'Nature' },
  { value: 'other', label: 'Other' },
]

/**
 * Filter definitions for collections page
 */
export const collectionFilters: FilterDefinition[] = [
  {
    id: 'status',
    label: 'Status',
    options: ['All', 'Published', 'Hidden', 'Draft'] as const,
  },
  {
    id: 'category',
    label: 'Category',
    options: ['All', 'Wedding', 'Portrait', 'Event', 'Nature', 'Other'] as const,
  },
]
