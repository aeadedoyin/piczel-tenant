<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { state } = useSidebar()
const isExpanded = computed(() => state.value === 'expanded')

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 14)
</script>

<template>
  <ShadSidebarInset
    class="!m-4 !shadow-md border rounded-lg relative"
    :class="{ '!ml-0': isExpanded }"
  >
    <header
      class="flex h-16 shrink-0 items-center justify-between gap-2 transition-all sticky z-10 top-0 ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
      :class="[isScrolled ? 'bg-background' : 'bg-transparent']"
    >
      <div class="flex items-center gap-2 px-4">
        <ShadSidebarTrigger class="-ml-1" />
        <ShadSeparator
          class="mr-2 data-[orientation=vertical]:h-4"
          orientation="vertical"
        />
        <SidebarBreadcrumb />
      </div>

      <div class="flex items-center gap-1 px-4">
        <ColorModeSwitch />
        <button
          aria-label="Notifications"
          class="
            relative flex size-9 items-center justify-center rounded-full
            text-muted-foreground
            transition-all duration-200
            hover:bg-accent hover:text-accent-foreground
            active:scale-95
          "
          title="Notifications"
        >
          <LucideBell class="size-4" />
          <span
            class="
              absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center
              rounded-full bg-destructive text-[10px] font-medium text-white
            "
          >
            3
          </span>
        </button>
      </div>
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
      <slot />
    </div>
  </ShadSidebarInset>
</template>
