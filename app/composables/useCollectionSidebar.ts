export type CollectionTab = 'photos' | 'design' | 'settings' | 'activity'

export interface PhotoSection {
  id: string
  name: string
  description: string
}

export const useCollectionSidebar = defineStore('collectionSidebar', () => {
  const isOpen = ref(true)
  const activeTab = ref<CollectionTab>('photos')
  const activeSection = ref<string>('')

  // Photo sections
  const photoSections = ref<PhotoSection[]>([
    { id: 'section-1', name: 'Getting Ready', description: 'Bridal prep and morning moments' },
    { id: 'section-2', name: 'Ceremony', description: 'Vows and ring exchange' },
    { id: 'section-3', name: 'Reception', description: 'Party, speeches, first dance' },
  ])

  function addSection(name: string, description: string) {
    photoSections.value.push({
      id: `section-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
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
      case 'photos': return ''
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
    open,
    close,
    toggle,
    setTab,
    setSection,
    addSection,
    initCoordination,
    restoreMainSidebar,
  }
})
