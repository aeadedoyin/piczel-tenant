<script setup lang="ts">
import type { NavItem } from '~/types/navigation'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/shadcn-ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/shadcn-ui/sidebar'

defineProps<{
  items: NavItem[]
}>()

const route = useRoute()

function isActive(url: string): boolean {
  return route.path === url
}

function isParentActive(item: NavItem): boolean {
  if (item.items?.length) {
    return item.items.some(sub => route.path === sub.url || route.path.startsWith(`${sub.url}/`))
  }
  return route.path === item.url
}
</script>

<template>
  <SidebarGroup class="py-2">
    <SidebarMenu class="gap-1">
      <template v-for="item in items" :key="item.title">
        <!-- Items with sub-items: Collapsible -->
        <Collapsible
          v-if="item.items?.length"
          as-child
          class="group/collapsible"
          :default-open="isParentActive(item)"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger as-child>
              <SidebarMenuButton class="py-2.5" :tooltip="item.title">
                <component :is="item.icon" class="size-4 text-muted-foreground/70" />
                <span>{{ item.title }}</span>
                <LucideChevronRight
                  class="
                    ml-auto size-4 text-muted-foreground/50
                    transition-transform duration-200
                    group-data-[state=open]/collapsible:rotate-90
                  "
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                  <SidebarMenuSubButton
                    as-child
                    :data-active="isActive(subItem.url)"
                  >
                    <NuxtLink :to="subItem.url">
                      <span>{{ subItem.title }}</span>
                    </NuxtLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        <!-- Items without sub-items: Direct link -->
        <SidebarMenuItem v-else>
          <SidebarMenuButton
            as-child
            class="py-2.5"
            :data-active="isActive(item.url)"
            :tooltip="item.title"
          >
            <NuxtLink :to="item.url">
              <component :is="item.icon" class="size-4 text-muted-foreground/70" />
              <span>{{ item.title }}</span>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </template>
    </SidebarMenu>
  </SidebarGroup>
</template>
