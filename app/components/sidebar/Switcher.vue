<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/shadcn-ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/shadcn-ui/sidebar'

interface App {
  id: string
  name: string
  description: string
  icon: ReturnType<typeof resolveComponent>
  url: string
}

const route = useRoute()
const { isMobile } = useSidebar()

const dashboard: App = {
  id: 'dashboard',
  name: 'Dashboard',
  description: 'Overview',
  icon: resolveComponent('LucideLayoutDashboard'),
  url: '/dashboard',
}

const apps: App[] = [
  {
    id: 'gallery',
    name: 'Gallery',
    description: 'Photo management',
    icon: resolveComponent('LucideImage'),
    url: '/gallery',
  },
  {
    id: 'studio',
    name: 'Studio',
    description: 'Client & project manager',
    icon: resolveComponent('LucideBriefcase'),
    url: '/studio',
  },
  {
    id: 'website',
    name: 'Website',
    description: 'Site builder',
    icon: resolveComponent('LucideGlobe'),
    url: '/website',
  },
  {
    id: 'store',
    name: 'Store',
    description: 'E-commerce',
    icon: resolveComponent('LucideShoppingBag'),
    url: '/store',
  },
]

const activeApp = computed((): App => {
  const path = route.path
  if (path.startsWith('/dashboard')) return dashboard
  return apps.find(app => path.startsWith(app.url)) ?? dashboard
})
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            class="
              data-[state=open]:bg-sidebar-accent
              data-[state=open]:text-sidebar-accent-foreground
            "
            size="lg"
          >
            <Avatar
              class="
                size-8 rounded-lg bg-sidebar-primary
                text-sidebar-primary-foreground
              "
            >
              <AvatarFallback class="rounded-lg bg-sidebar-primary">
                <component :is="activeApp.icon" class="size-4" />
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm/tight">
              <span class="truncate font-semibold">{{ activeApp.name }}</span>
              <span class="truncate text-xs">{{ activeApp.description }}</span>
            </div>
            <LucideChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          class="w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          :side-offset="4"
        >
          <DropdownMenuLabel class="text-xs text-muted-foreground">
            Switch App
          </DropdownMenuLabel>
          <DropdownMenuItem
            v-for="app in apps"
            :key="app.id"
            as-child
            class="gap-2 p-2"
          >
            <NuxtLink :to="app.url">
              <Avatar class="size-6 rounded-sm border">
                <AvatarFallback class="rounded-sm">
                  <component :is="app.icon" class="size-3.5" />
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-sm">
                <span class="font-medium">{{ app.name }}</span>
                <span class="text-xs text-muted-foreground">{{ app.description }}</span>
              </div>
              <LucideCheck
                v-if="activeApp.id === app.id" class="size-4 text-primary"
              />
            </NuxtLink>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem as-child class="gap-2 p-2">
            <NuxtLink :to="dashboard.url">
              <Avatar class="size-6 rounded-sm border bg-transparent">
                <AvatarFallback class="rounded-sm bg-transparent">
                  <component :is="dashboard.icon" class="size-3.5" />
                </AvatarFallback>
              </Avatar>
              <span class="font-medium text-muted-foreground">{{ dashboard.name }}</span>
            </NuxtLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
