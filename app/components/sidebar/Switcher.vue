<script setup lang="ts">
const { isMobile } = useSidebar()
const route = useRoute()

// App definitions from utils
const dashboard = getDashboardApp()
const apps = getApps()

const activeApp = computed(() => {
  const path = route.path
  if (path.startsWith('/dashboard'))
    return dashboard
  return apps.find(app => path.startsWith(app.url)) ?? dashboard
})
</script>

<template>
  <ShadSidebarMenu>
    <ShadSidebarMenuItem>
      <ShadDropdownMenu>
        <ShadDropdownMenuTrigger as-child>
          <ShadSidebarMenuButton
            class="
              data-[state=open]:bg-sidebar-accent
              data-[state=open]:text-sidebar-accent-foreground
            "
            size="lg"
          >
            <ShadAvatar
              class="
                size-8 rounded-lg bg-sidebar-primary
                text-sidebar-primary-foreground
              "
            >
              <ShadAvatarFallback class="rounded-lg bg-sidebar-primary">
                <component :is="activeApp.icon" class="size-4" />
              </ShadAvatarFallback>
            </ShadAvatar>
            <div class="grid flex-1 text-left text-sm/tight">
              <span class="truncate font-semibold">{{ activeApp.name }}</span>
              <span class="truncate text-xs">{{ activeApp.description }}</span>
            </div>
            <LucideChevronsUpDown class="ml-auto size-4" />
          </ShadSidebarMenuButton>
        </ShadDropdownMenuTrigger>
        <ShadDropdownMenuContent
          align="start"
          class="w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          :side-offset="4"
        >
          <ShadDropdownMenuLabel class="text-xs text-muted-foreground">
            Switch App
          </ShadDropdownMenuLabel>
          <ShadDropdownMenuItem
            v-for="app in apps"
            :key="app.id"
            as-child
            class="gap-2 p-2"
          >
            <NuxtLink :to="app.url">
              <ShadAvatar class="size-6 rounded-sm border">
                <ShadAvatarFallback class="rounded-sm">
                  <component :is="app.icon" class="size-3.5" />
                </ShadAvatarFallback>
              </ShadAvatar>
              <div class="grid flex-1 text-sm">
                <span class="font-medium">{{ app.name }}</span>
                <span class="text-xs text-muted-foreground">{{ app.description }}</span>
              </div>
              <LucideCheck
                v-if="activeApp.id === app.id" class="size-4 text-primary"
              />
            </NuxtLink>
          </ShadDropdownMenuItem>
          <ShadDropdownMenuSeparator />
          <ShadDropdownMenuItem as-child class="gap-2 p-2">
            <NuxtLink :to="dashboard.url">
              <ShadAvatar class="size-6 rounded-sm border bg-transparent">
                <ShadAvatarFallback class="rounded-sm bg-transparent">
                  <component :is="dashboard.icon" class="size-3.5" />
                </ShadAvatarFallback>
              </ShadAvatar>
              <span class="font-medium text-muted-foreground">{{ dashboard.name }}</span>
            </NuxtLink>
          </ShadDropdownMenuItem>
        </ShadDropdownMenuContent>
      </ShadDropdownMenu>
    </ShadSidebarMenuItem>
  </ShadSidebarMenu>
</template>
