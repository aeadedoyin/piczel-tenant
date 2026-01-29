export type CollectionTab = 'photos' | 'design' | 'settings' | 'activity'

export interface PhotoSection {
  id: string
  name: string
  description: string
  createdAt: string
}

export const useCollectionSidebar = defineStore('collectionSidebar', () => {
  const isOpen = ref(true)
  const activeTab = ref<CollectionTab>('photos')
  const activeSection = ref<string>('')

  // Photo sections
  const photoSections = ref<PhotoSection[]>([
    { id: 'section-1', name: 'Getting Ready', description: 'Bridal prep and morning moments', createdAt: new Date(Date.now() - 5 * 86400000).toISOString() },
    { id: 'section-2', name: 'Ceremony', description: 'Vows and ring exchange', createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
    { id: 'section-3', name: 'Reception', description: 'Party, speeches, first dance', createdAt: new Date(Date.now() - 1 * 86400000).toISOString() },
  ])

  // Active photo section — null means show all
  const activePhotoSection = ref<string | null>(photoSections.value[0]?.id ?? null)

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
        activePhotoSection.value = photoSections.value[0]?.id ?? null
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
    activePhotoSection.value = photoSections.value[0]?.id ?? null
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
    activePhotoSection,
    open,
    close,
    toggle,
    setTab,
    setSection,
    setActivePhotoSection,
    addSection,
    initCoordination,
    restoreMainSidebar,
  }
})
