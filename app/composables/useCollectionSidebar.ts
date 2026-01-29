export type CollectionTab = 'photos' | 'design' | 'settings' | 'activity'

export interface PhotoSection {
  id: string
  name: string
  description: string
  createdAt: string
}

export const DEFAULT_SECTION_ID = 'section-highlights'

// Per-collection section presets (demo data)
// Collections not listed here have no custom sections (only Unsorted)
const collectionSectionPresets: Record<string, PhotoSection[]> = {
  // Summer Wedding — 3 sections
  'collection-1': [
    { id: 'section-1', name: 'Getting Ready', description: 'Bridal prep and morning moments', createdAt: new Date(Date.now() - 5 * 86400000).toISOString() },
    { id: 'section-2', name: 'Ceremony', description: 'Vows and ring exchange', createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
    { id: 'section-3', name: 'Reception', description: 'Party, speeches, first dance', createdAt: new Date(Date.now() - 1 * 86400000).toISOString() },
  ],
  // Corporate Event — 2 sections
  'collection-2': [
    { id: 'section-4', name: 'Keynote', description: 'Main stage presentations', createdAt: new Date(Date.now() - 10 * 86400000).toISOString() },
    { id: 'section-5', name: 'Networking', description: 'Cocktails and mingling', createdAt: new Date(Date.now() - 9 * 86400000).toISOString() },
  ],
  // Graduation Ceremony — 3 sections
  'collection-7': [
    { id: 'section-6', name: 'Processional', description: 'Cap and gown walk', createdAt: new Date(Date.now() - 25 * 86400000).toISOString() },
    { id: 'section-7', name: 'Speeches', description: 'Valedictorian and guest speakers', createdAt: new Date(Date.now() - 24 * 86400000).toISOString() },
    { id: 'section-8', name: 'Portraits', description: 'Individual and group portraits', createdAt: new Date(Date.now() - 23 * 86400000).toISOString() },
  ],
  // Engagement Session — 2 sections
  'collection-9': [
    { id: 'section-9', name: 'Golden Hour', description: 'Sunset shots at the park', createdAt: new Date(Date.now() - 35 * 86400000).toISOString() },
    { id: 'section-10', name: 'Candid Moments', description: 'Natural, unposed captures', createdAt: new Date(Date.now() - 34 * 86400000).toISOString() },
  ],
  // Family Portrait Session — no sections (only Unsorted)
  // Nature Walk — no sections (only Unsorted)
}

export const useCollectionSidebar = defineStore('collectionSidebar', () => {
  const isOpen = ref(true)
  const activeTab = ref<CollectionTab>('photos')
  const activeSection = ref<string>('')

  // Photo sections (custom sections only, Highlights is implicit)
  const photoSections = ref<PhotoSection[]>([])

  // All sections including the default Highlights section
  const allSections = computed(() => {
    const highlightsSection: PhotoSection = {
      id: DEFAULT_SECTION_ID,
      name: 'General',
      description: '',
      createdAt: new Date().toISOString(),
    }
    return [highlightsSection, ...photoSections.value]
  })

  // Active photo section — null means show all
  const activePhotoSection = ref<string | null>(DEFAULT_SECTION_ID)

  function loadSectionsForCollection(collectionId: string) {
    photoSections.value = collectionSectionPresets[collectionId] ?? []
    activePhotoSection.value = allSections.value[0]?.id ?? DEFAULT_SECTION_ID
  }

  function setActivePhotoSection(sectionId: string | null) {
    activePhotoSection.value = sectionId
  }

  function addSection(name: string, description: string) {
    photoSections.value.push({
      id: `section-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
    })
  }

  // Track the previous main sidebar state so we can restore it on unmount
  const _previousSidebarOpen = ref<boolean | null>(null)

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  function setTab(tab: CollectionTab) {
    activeTab.value = tab
    // Reset section when switching tabs
    activeSection.value = getDefaultSection(tab)
  }

  function setSection(section: string) {
    activeSection.value = section
  }

  function getDefaultSection(tab: CollectionTab): string {
    switch (tab) {
      case 'photos':
        activePhotoSection.value = allSections.value[0]?.id ?? DEFAULT_SECTION_ID
        return ''
      case 'design': return 'cover'
      case 'settings': return 'general'
      case 'activity': return 'downloads'
      default: return ''
    }
  }

  /**
   * Initialize sidebar coordination with the main app sidebar.
   * Call this on mount — saves the current main sidebar state and collapses it.
   */
  function initCoordination(mainSidebar: { open: Ref<boolean>, setOpen: (v: boolean) => void }) {
    // Save previous state
    _previousSidebarOpen.value = mainSidebar.open.value

    // Collapse main sidebar
    mainSidebar.setOpen(false)

    // Open collection sidebar
    isOpen.value = true
    activeTab.value = 'photos'
    activeSection.value = ''
    activePhotoSection.value = allSections.value[0]?.id ?? DEFAULT_SECTION_ID
  }

  /**
   * Restore the main sidebar to its previous state.
   * Call this on unmount.
   */
  function restoreMainSidebar(mainSidebar: { setOpen: (v: boolean) => void }) {
    if (_previousSidebarOpen.value !== null) {
      mainSidebar.setOpen(_previousSidebarOpen.value)
    }
    _previousSidebarOpen.value = null
  }

  return {
    isOpen,
    activeTab,
    activeSection,
    photoSections,
    allSections,
    activePhotoSection,
    open,
    close,
    toggle,
    setTab,
    setSection,
    setActivePhotoSection,
    addSection,
    loadSectionsForCollection,
    initCoordination,
    restoreMainSidebar,
  }
})
