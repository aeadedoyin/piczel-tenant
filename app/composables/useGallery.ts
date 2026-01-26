import type {
  Collection,
  CollectionFilters,
  CreateCollectionData,
  GalleryStats,
  Photo,
  UpdateCollectionData,
} from '@/types/gallery'

// Helper function to simulate API latency
function delay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Sample image helpers (1-15 for collections, 16-30 for media)
function getCollectionImage(index: number): string {
  const imageNumber = ((index - 1) % 15) + 1
  return `/images/samples/photo-${imageNumber}.jpg`
}

function getMediaImage(index: number): string {
  const imageNumber = ((index - 1) % 15) + 16
  return `/images/samples/photo-${imageNumber}.jpg`
}

// Generate mock photos
function generateMockPhotos(): Photo[] {
  const photos: Photo[] = []
  for (let i = 1; i <= 18; i++) {
    const width = 800 + Math.floor(Math.random() * 400)
    const height = 600 + Math.floor(Math.random() * 300)
    const imageUrl = getMediaImage(i)
    photos.push({
      id: `photo-${i}`,
      url: imageUrl,
      thumbnailUrl: imageUrl,
      title: `Photo ${i}`,
      width,
      height,
      size: Math.floor(Math.random() * 5000000) + 500000, // 500KB to 5.5MB
      starred: i <= 3, // First 3 are starred
      collectionId: i <= 4 ? 'collection-1' : i <= 8 ? 'collection-2' : undefined,
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
    })
  }
  return photos
}

// Generate mock collections
function generateMockCollections(): Collection[] {
  return [
    {
      id: 'collection-1',
      title: 'Summer Wedding 2024',
      description: 'Beautiful outdoor wedding ceremony',
      coverUrl: getCollectionImage(1),
      status: 'published',
      category: 'wedding',
      photoCount: 45,
      starred: true,
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
    {
      id: 'collection-2',
      title: 'Corporate Event',
      description: 'Annual company celebration',
      coverUrl: getCollectionImage(2),
      status: 'published',
      category: 'event',
      photoCount: 28,
      starred: false,
      createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      id: 'collection-3',
      title: 'Family Portrait Session',
      description: 'Studio portraits for the Johnson family',
      coverUrl: getCollectionImage(3),
      status: 'hidden',
      category: 'portrait',
      photoCount: 15,
      starred: true,
      password: 'family123',
      createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    },
    {
      id: 'collection-4',
      title: 'Nature Walk',
      description: 'Autumn landscapes and wildlife',
      coverUrl: getCollectionImage(4),
      status: 'hidden',
      category: 'nature',
      photoCount: 32,
      starred: false,
      createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    },
    {
      id: 'collection-5',
      title: 'Beach Wedding',
      description: 'Sunset ceremony by the ocean',
      coverUrl: getCollectionImage(5),
      status: 'draft',
      category: 'wedding',
      photoCount: 0,
      starred: false,
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    },
    {
      id: 'collection-6',
      title: 'Untitled Collection',
      description: '--',
      coverUrl: undefined,
      status: 'draft',
      category: 'other',
      photoCount: 0,
      starred: false,
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    },
    {
      id: 'collection-7',
      title: 'Graduation Ceremony',
      description: 'Class of 2024 graduation photos',
      coverUrl: getCollectionImage(7),
      status: 'published',
      category: 'event',
      photoCount: 52,
      starred: false,
      createdAt: new Date(Date.now() - 25 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    },
    {
      id: 'collection-8',
      title: 'Product Shoot',
      description: 'E-commerce product photography',
      coverUrl: getCollectionImage(8),
      status: 'hidden',
      category: 'other',
      photoCount: 24,
      starred: true,
      createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    },
    {
      id: 'collection-9',
      title: 'Engagement Session',
      description: 'Pre-wedding couple photoshoot',
      coverUrl: getCollectionImage(9),
      status: 'published',
      category: 'wedding',
      photoCount: 38,
      starred: false,
      createdAt: new Date(Date.now() - 35 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 18 * 86400000).toISOString(),
    },
    {
      id: 'collection-10',
      title: 'Birthday Party',
      description: 'Kids birthday celebration',
      coverUrl: getCollectionImage(10),
      status: 'draft',
      category: 'event',
      photoCount: 19,
      starred: false,
      createdAt: new Date(Date.now() - 40 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    },
  ]
}

export const useGallery = defineStore('gallery', () => {
  // State
  const photos = ref<Photo[]>([])
  const collections = ref<Collection[]>([])
  const selectedPhotoIds = ref<Set<string>>(new Set())
  const isLoadingPhotos = ref(true)
  const isLoadingCollections = ref(true)
  const error = ref<string | null>(null)

  // Computed
  const stats = computed<GalleryStats>(() => ({
    totalPhotos: photos.value.length,
    totalCollections: collections.value.length,
    starredPhotos: photos.value.filter(p => p.starred).length,
    storageUsed: photos.value.reduce((sum, p) => sum + p.size, 0),
  }))

  const starredPhotos = computed(() => photos.value.filter(p => p.starred))

  const starredCollections = computed(() =>
    collections.value.filter(c => c.starred),
  )

  const recentPhotos = computed(() =>
    [...photos.value]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 12),
  )

  const recentCollections = computed(() =>
    [...collections.value]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 4),
  )

  const selectedPhotos = computed(() =>
    photos.value.filter(p => selectedPhotoIds.value.has(p.id)),
  )

  // Photo Actions
  async function fetchPhotos(): Promise<void> {
    isLoadingPhotos.value = true
    error.value = null
    try {
      await delay()
      photos.value = generateMockPhotos()
    }
    catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch photos'
    }
    finally {
      isLoadingPhotos.value = false
    }
  }

  async function togglePhotoStar(photoId: string): Promise<void> {
    const photo = photos.value.find(p => p.id === photoId)
    if (!photo)
      return

    await delay(100)
    photo.starred = !photo.starred
  }

  function selectPhoto(photoId: string): void {
    selectedPhotoIds.value.add(photoId)
  }

  function deselectPhoto(photoId: string): void {
    selectedPhotoIds.value.delete(photoId)
  }

  function togglePhotoSelection(photoId: string): void {
    if (selectedPhotoIds.value.has(photoId)) {
      selectedPhotoIds.value.delete(photoId)
    }
    else {
      selectedPhotoIds.value.add(photoId)
    }
  }

  function clearSelection(): void {
    selectedPhotoIds.value.clear()
  }

  function selectAll(): void {
    photos.value.forEach(p => selectedPhotoIds.value.add(p.id))
  }

  // Collection Actions
  async function fetchCollections(): Promise<void> {
    isLoadingCollections.value = true
    error.value = null
    try {
      await delay()
      collections.value = generateMockCollections()
    }
    catch (e) {
      error.value
        = e instanceof Error ? e.message : 'Failed to fetch collections'
    }
    finally {
      isLoadingCollections.value = false
    }
  }

  async function createCollection(
    data: CreateCollectionData,
  ): Promise<Collection> {
    await delay()
    const newCollection: Collection = {
      id: `collection-${Date.now()}`,
      title: data.title,
      description: data.description,
      coverUrl: undefined,
      status: data.status,
      category: data.category,
      photoCount: 0,
      starred: false,
      password: data.password,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    collections.value.unshift(newCollection)
    return newCollection
  }

  async function updateCollection(data: UpdateCollectionData): Promise<void> {
    const collection = collections.value.find(c => c.id === data.id)
    if (!collection) {
      throw new Error('Collection not found')
    }

    await delay()
    if (data.title !== undefined)
      collection.title = data.title
    if (data.description !== undefined)
      collection.description = data.description
    if (data.status !== undefined)
      collection.status = data.status
    if (data.category !== undefined)
      collection.category = data.category
    if (data.password !== undefined)
      collection.password = data.password
    collection.updatedAt = new Date().toISOString()
  }

  async function deleteCollection(collectionId: string): Promise<void> {
    await delay()
    const index = collections.value.findIndex(c => c.id === collectionId)
    if (index !== -1) {
      collections.value.splice(index, 1)
    }
  }

  async function toggleCollectionStar(collectionId: string): Promise<void> {
    const collection = collections.value.find(c => c.id === collectionId)
    if (!collection)
      return

    await delay(100)
    collection.starred = !collection.starred
  }

  function filterCollections(filters: CollectionFilters): Collection[] {
    return collections.value.filter((collection) => {
      // Filter by status
      if (filters.status.length > 0) {
        if (!filters.status.includes(collection.status)) {
          return false
        }
      }

      // Filter by category
      if (filters.category.length > 0) {
        if (!filters.category.includes(collection.category)) {
          return false
        }
      }

      // Filter by search
      if (filters.search) {
        const search = filters.search.toLowerCase()
        const matchesTitle = collection.title.toLowerCase().includes(search)
        const matchesDescription = collection.description
          ?.toLowerCase()
          .includes(search)
        if (!matchesTitle && !matchesDescription) {
          return false
        }
      }

      return true
    })
  }

  function getCollectionById(id: string): Collection | undefined {
    return collections.value.find(c => c.id === id)
  }

  function getPhotosByCollection(collectionId: string): Photo[] {
    return photos.value.filter(p => p.collectionId === collectionId)
  }

  return {
    // State
    photos,
    collections,
    selectedPhotoIds,
    isLoadingPhotos,
    isLoadingCollections,
    error,

    // Computed
    stats,
    starredPhotos,
    starredCollections,
    recentPhotos,
    recentCollections,
    selectedPhotos,

    // Photo Actions
    fetchPhotos,
    togglePhotoStar,
    selectPhoto,
    deselectPhoto,
    togglePhotoSelection,
    clearSelection,
    selectAll,

    // Collection Actions
    fetchCollections,
    createCollection,
    updateCollection,
    deleteCollection,
    toggleCollectionStar,
    filterCollections,
    getCollectionById,
    getPhotosByCollection,
  }
})
