<script setup lang="ts">
import type { NavItem } from '@/types/navigation'

defineProps<{
  items: NavItem[]
}>()

const route = useRoute()

function isActive(url: string): boolean {
  // Handle URLs with query params
  if (url.includes('?')) {
    const [path, queryString] = url.split('?')
    if (route.path !== path)
      return false

    const params = new URLSearchParams(queryString)
    for (const [key, value] of params.entries()) {
      const routeValue = route.query[key]
      if (!routeValue || typeof routeValue !== 'string')
        return false
      // Check if the comma-separated route query contains this value
      const routeValues = routeValue.split(',')
      if (!routeValues.includes(value))
        return false
    }
    return true
  }
  return route.path === url
}

function isParentActive(item: NavItem): boolean {
  if (item.items?.length) {
    const basePath = item.url.split('?')[0]
    return route.path === basePath || route.path.startsWith(`${basePath}/`)
  }
  return route.path === item.url
}
</script>

<template>
  <ShadSidebarGroup class="py-2">
    <ShadSidebarMenu class="gap-1">
      <template v-for="item in items" :key="item.title">
        <!-- Items with sub-items: Collapsible -->
        <ShadCollapsible
          v-if="item.items?.length"
          as-child
          class="group/collapsible"
          :default-open="isParentActive(item)"
        >
          <ShadSidebarMenuItem>
            <ShadCollapsibleTrigger as-child>
              <ShadSidebarMenuButton
                as-child
                class="py-2.5"
                :data-active="isActive(item.url)"
                :tooltip="item.title"
              >
                <NuxtLink :to="item.url">
                  <component
                    :is="item.icon" class="size-4 text-muted-foreground/70"
                  />
                  <span>{{ item.title }}</span>
                  <LucideChevronRight
                    class="
                      ml-auto size-4 text-muted-foreground/50
                      transition-transform duration-200
                      group-data-[state=open]/collapsible:rotate-90
                    "
                  />
                </NuxtLink>
              </ShadSidebarMenuButton>
            </ShadCollapsibleTrigger>
            <ShadCollapsibleContent>
              <ShadSidebarMenuSub>
                <ShadSidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                  <ShadSidebarMenuSubButton
                    as-child
                    :data-active="isActive(subItem.url)"
                  >
                    <NuxtLink :to="subItem.url">
                      <span>{{ subItem.title }}</span>
                    </NuxtLink>
                  </ShadSidebarMenuSubButton>
                </ShadSidebarMenuSubItem>
              </ShadSidebarMenuSub>
            </ShadCollapsibleContent>
          </ShadSidebarMenuItem>
        </ShadCollapsible>

        <!-- Items without sub-items: Direct link -->
        <ShadSidebarMenuItem v-else>
          <ShadSidebarMenuButton
            as-child
            class="py-2.5"
            :data-active="isActive(item.url)"
            :tooltip="item.title"
          >
            <NuxtLink :to="item.url">
              <component :is="item.icon" class="size-4 text-muted-foreground/70" />
              <span>{{ item.title }}</span>
            </NuxtLink>
          </ShadSidebarMenuButton>
        </ShadSidebarMenuItem>
      </template>
    </ShadSidebarMenu>
  </ShadSidebarGroup>
</template>
