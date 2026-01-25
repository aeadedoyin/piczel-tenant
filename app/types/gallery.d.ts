// Photo types
export interface Photo {
  id: string
  url: string
  thumbnailUrl: string
  title: string
  width: number
  height: number
  size: number // in bytes
  starred: boolean
  collectionId?: string
  createdAt: string
  updatedAt: string
}

// Collection types
export type CollectionStatus = 'published' | 'hidden' | 'draft'
export type CollectionCategory = 'wedding' | 'portrait' | 'event' | 'nature' | 'other'

export interface Collection {
  id: string
  title: string
  description?: string
  coverUrl?: string
  status: CollectionStatus
  category: CollectionCategory
  photoCount: number
  starred: boolean
  password?: string
  createdAt: string
  updatedAt: string
}

// Gallery stats
export interface GalleryStats {
  totalPhotos: number
  totalCollections: number
  starredPhotos: number
  storageUsed: number // in bytes
}

// Filter types
export interface CollectionFilters {
  status: CollectionStatus[]
  category: CollectionCategory[]
  search?: string
}

// Form data types
export interface CreateCollectionData {
  title: string
  description?: string
  status: CollectionStatus
  category: CollectionCategory
  password?: string
}

export interface UpdateCollectionData extends Partial<CreateCollectionData> {
  id: string
}

// API response types
export interface PhotosResponse {
  photos: Photo[]
  total: number
  page: number
  perPage: number
}

export interface CollectionsResponse {
  collections: Collection[]
  total: number
}
