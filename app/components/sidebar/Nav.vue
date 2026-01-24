<script setup lang="ts">
import type { NavItem } from '~/types/navigation'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/shadcn-ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
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
  return route.path === url || route.path.startsWith(`${url}/`)
}
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Platform</SidebarGroupLabel>
    <SidebarMenu>
      <template v-for="item in items" :key="item.title">
        <!-- Items with sub-items: Collapsible -->
        <Collapsible
          v-if="item.items?.length"
          as-child
          class="group/collapsible"
          :default-open="isActive(item.url)"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger as-child>
              <SidebarMenuButton :tooltip="item.title">
                <component :is="item.icon" />
                <span>{{ item.title }}</span>
                <LucideChevronRight
                  class="
                    ml-auto transition-transform duration-200
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
            :data-active="isActive(item.url)"
            :tooltip="item.title"
          >
            <NuxtLink :to="item.url">
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </template>
    </SidebarMenu>
  </SidebarGroup>
</template>
