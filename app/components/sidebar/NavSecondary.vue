<script setup lang="ts">
import type { Component, ConcreteComponent } from 'vue'

interface NavItem {
  title: string
  url: string
  icon: Component | ConcreteComponent | string
  external?: boolean
}

withDefaults(defineProps<{
  items: NavItem[]
}>(), {})

const route = useRoute()

function isActive(url: string): boolean {
  return route.path === url || route.path.startsWith(`${url}/`)
}
</script>

<template>
  <ShadSidebarGroup class="mt-auto">
    <ShadSidebarGroupContent>
      <ShadSidebarMenu>
        <ShadSidebarMenuItem v-for="item in items" :key="item.title">
          <ShadSidebarMenuButton
            as-child
            :data-active="isActive(item.url)"
            :tooltip="item.title"
          >
            <NuxtLink
              :target="item.external ? '_blank' : undefined"
              :to="item.url"
            >
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
              <LucideExternalLink v-if="item.external" class="ml-auto size-3" />
            </NuxtLink>
          </ShadSidebarMenuButton>
        </ShadSidebarMenuItem>
      </ShadSidebarMenu>
    </ShadSidebarGroupContent>
  </ShadSidebarGroup>
</template>
